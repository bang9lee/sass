"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Check, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import type {
    FacePoint,
    FaceShapePreviewResult,
    FaceShapeQualityFlag,
} from "@/lib/face-shape-analysis-official";

interface FaceShapeFrameEditorProps {
    imageSrc: string;
    aspectRatio: number;
    handles: FacePoint[];
    contour: FacePoint[];
    isKo: boolean;
    isLoading: boolean;
    isAnalyzing: boolean;
    isPreviewing: boolean;
    notice: string | null;
    preview: FaceShapePreviewResult | null;
    onChangeHandles: (handles: FacePoint[]) => void;
    onRestoreDraft: () => void;
    onReloadDraft: () => void;
    onReset: () => void;
    onAnalyze: () => void;
}

function toPath(points: FacePoint[], close = false) {
    if (!points.length) return "";
    return points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x * 100} ${point.y * 100}`)
        .join(" ")
        .concat(close ? " Z" : "");
}

function pairPath(points?: [FacePoint, FacePoint] | null) {
    if (!points) return "";
    return `M ${points[0].x * 100} ${points[0].y * 100} L ${points[1].x * 100} ${points[1].y * 100}`;
}

function averageX(points: FacePoint[]) {
    return points.reduce((sum, point) => sum + point.x, 0) / Math.max(points.length, 1);
}

function getBounds(points?: FacePoint[] | null) {
    if (!points?.length) return null;
    return points.reduce(
        (bounds, point) => ({
            minX: Math.min(bounds.minX, point.x),
            maxX: Math.max(bounds.maxX, point.x),
            minY: Math.min(bounds.minY, point.y),
            maxY: Math.max(bounds.maxY, point.y),
        }),
        {
            minX: points[0].x,
            maxX: points[0].x,
            minY: points[0].y,
            maxY: points[0].y,
        }
    );
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function formatDelta(value: number) {
    const delta = value - 33.3;
    const prefix = delta > 0 ? "+" : "";
    return `${prefix}${delta.toFixed(1)}%`;
}

function getMeterTone(value: number) {
    if (value >= 80) return "from-emerald-300 to-cyan-300";
    if (value >= 65) return "from-amber-300 to-yellow-200";
    return "from-rose-300 to-orange-300";
}

export function FaceShapeFrameEditor({
    imageSrc,
    aspectRatio,
    handles,
    contour,
    isKo,
    isLoading,
    isAnalyzing,
    isPreviewing,
    notice,
    preview,
    onChangeHandles,
    onRestoreDraft,
    onReloadDraft,
    onReset,
    onAnalyze,
}: FaceShapeFrameEditorProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [activeHandle, setActiveHandle] = useState<number | null>(null);
    const path = useMemo(() => toPath(contour, true), [contour]);

    const labels = useMemo(
        () => ({
            title: isKo ? "측정 프레임 보정" : "Measurement Frame Calibration",
            subtitle: isKo
                ? "헤어라인, 얼굴 옆선, 턱끝만 실제 경계에 맞춰 주세요."
                : "Match the hairline, side contour, and chin tip to the real boundary.",
            loading: isKo ? "AI 초안 생성 중..." : "Building AI draft...",
            ready: isKo ? "현재 빨간선이 실제 분석 기준입니다." : "The red contour is now the live analysis frame.",
            previewing: isKo ? "실측값 재계산 중..." : "Refreshing measurements...",
            draft: isKo ? "AI 초안 다시 잡기" : "Reload AI Draft",
            restore: isKo ? "초안으로 되돌리기" : "Restore Draft",
            analyze: isKo ? "이 프레임으로 분석" : "Analyze With This Frame",
            statusReady: isKo ? "분석 가능" : "Ready",
            statusBlocked: isKo ? "보정 필요" : "Needs Refinement",
            legendContour: isKo ? "윤곽" : "Contour",
            legendHairline: isKo ? "헤어라인" : "Hairline",
            legendThirds: isKo ? "3등분" : "Thirds",
            legendFifths: isKo ? "5등분" : "Fifths",
            legendCenter: isKo ? "중심축" : "Axis",
            detectionTitle: isKo ? "분석 기준" : "Analysis Basis",
            detectionHairline: isKo ? "헤어라인 방식" : "Hairline Method",
            detectionReliability: isKo ? "감지 신뢰도" : "Reliability",
            detectionFrame: isKo ? "현재 분석 기준" : "Active Frame",
            frameAuto: isKo ? "AI 초안" : "AI Draft",
            frameManual: isKo ? "수동 보정" : "Manual Frame",
            methodSegmenter: isKo ? "세그먼트" : "Segmentation",
            methodHybrid: isKo ? "세그먼트+에지" : "Segment+Edge",
            methodFallback: isKo ? "랜드마크 추정" : "Landmark Fallback",
            methodManual: isKo ? "수동 프레임" : "Manual Frame",
            thirdsTitle: isKo ? "안면 3분할 실측" : "Measured Facial Thirds",
            thirdsTarget: isKo ? "이상 비율 1:1:1" : "Ideal 1:1:1",
            thirdsUpper: isKo ? "헤어라인-눈썹 하연선" : "Hairline-Brow Lower",
            thirdsMiddle: isKo ? "눈썹 하연선-코밑" : "Brow Lower-Nose Base",
            thirdsLower: isKo ? "코밑-턱끝" : "Nose Base-Chin",
            deltaLabel: isKo ? "이상 비율 대비" : "Vs ideal",
            qualityTitle: isKo ? "정렬 품질" : "Alignment Quality",
            actionTitle: isKo ? "지금 조정할 것" : "Adjust Now",
            guide: isKo ? "차단 상태가 풀릴 때까지 분석 버튼이 잠깁니다." : "The analyze button remains locked until the blocking issues are cleared.",
            insightEmpty: isKo ? "프레임과 사진 상태가 안정적입니다." : "The frame and image read look stable.",
            imageQuality: isKo ? "사진 경계" : "Image Edge Read",
            hairlineQuality: isKo ? "헤어라인 판독" : "Hairline Read",
            frameQuality: isKo ? "프레임 밀착" : "Frame Fit",
            noticeTitle: isKo ? "주의" : "Notice",
            changePhoto: isKo ? "다른 사진 선택" : "Choose Another Photo",
            browDivider: isKo ? "눈썹 하연선" : "Brow Lower Line",
            philtrumDivider: isKo ? "코밑선" : "Nose Base",
        }),
        [isKo]
    );

    const qualityFlagCopy: Record<FaceShapeQualityFlag, string> = {
        ambiguous_shape: isKo ? "윤곽 프레임을 실제 외곽에 더 붙여 주세요." : "Tighten the contour to the real boundary.",
        low_pose: isKo ? "정면 각도와 눈높이를 다시 맞춰 주세요." : "Level the face and eyes again.",
        low_sharpness: isKo ? "더 선명한 사진이 필요합니다." : "A sharper photo is needed.",
        low_lighting: isKo ? "이마와 턱선 조명을 더 균일하게 해주세요." : "Even out the lighting on the forehead and jaw.",
        low_coverage: isKo ? "얼굴이 화면을 더 크게 차지해야 합니다." : "The face should fill more of the frame.",
        low_frame_alignment: isKo ? "빨간선을 실제 얼굴 외곽에 더 붙여 주세요." : "Move the red contour closer to the face edge.",
        low_hairline: isKo ? "이마가 더 보이도록 맞춰 주세요." : "Expose the forehead more clearly.",
    };

    const liveInsights = (preview?.gate.reasons.length ? preview.gate.reasons : preview?.quality.flags ?? [])
        .slice(0, 4)
        .map((flag) => qualityFlagCopy[flag]);

    const hairlinePath = preview?.overlay.hairlineContour?.length ? toPath(preview.overlay.hairlineContour) : "";
    const centerLinePath = pairPath(preview?.overlay.centerLine);
    const upperThirdPath = pairPath(preview?.overlay.upperThirdGuide);
    const middleThirdPath = pairPath(preview?.overlay.middleThirdGuide);
    const leftEyeBounds = getBounds(preview?.overlay.leftEye);
    const rightEyeBounds = getBounds(preview?.overlay.rightEye);
    const fifthGuideXs =
        leftEyeBounds && rightEyeBounds
            ? [leftEyeBounds.minX, leftEyeBounds.maxX, rightEyeBounds.minX, rightEyeBounds.maxX]
            : [];
    const fifthGuideRange = preview?.overlay.faceHeight ?? null;
    const guideMarkers = [
        {
            key: "upper",
            point: preview?.overlay.upperThirdGuide?.[0] ?? null,
            label: labels.browDivider,
        },
        {
            key: "middle",
            point: preview?.overlay.middleThirdGuide?.[0] ?? null,
            label: labels.philtrumDivider,
        },
    ].filter((item) => item.point);

    const hairlineMethodLabel =
        preview?.overlay.hairlineMethod === "segmenter"
            ? labels.methodSegmenter
            : preview?.overlay.hairlineMethod === "hybrid"
                ? labels.methodHybrid
                : preview?.overlay.hairlineMethod === "fallback"
                    ? labels.methodFallback
                    : labels.methodManual;
    const frameBasisLabel = preview?.overlay.frameSource === "manual" ? labels.frameManual : labels.frameAuto;
    const analyzeDisabled = isLoading || isAnalyzing || (preview ? !preview.gate.canAnalyze : isPreviewing);
    const statusLabel = preview?.gate.canAnalyze ? labels.statusReady : labels.statusBlocked;
    const thirdRows = preview
        ? [
            { label: labels.thirdsUpper, value: preview.metrics.upperThird },
            { label: labels.thirdsMiddle, value: preview.metrics.middleThird },
            { label: labels.thirdsLower, value: preview.metrics.lowerThird },
        ]
        : [];
    const qualityRows = preview
        ? [
            { label: labels.imageQuality, value: preview.quality.image },
            { label: labels.hairlineQuality, value: preview.overlay.hairlineReliability ?? 0 },
            { label: labels.frameQuality, value: preview.quality.frame },
        ]
        : [];

    const updateHandle = (index: number, clientX: number, clientY: number) => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const nextPoint = {
            x: clamp((clientX - rect.left) / rect.width, 0.02, 0.98),
            y: clamp((clientY - rect.top) / rect.height, 0.02, 0.98),
        };
        const centerX = averageX(handles);
        const centerY = handles.reduce((sum, point) => sum + point.y, 0) / Math.max(handles.length, 1);
        const nextHandles = handles.map((handle, handleIndex) => {
            if (handleIndex !== index) return handle;
            const adjusted = { ...nextPoint };

            if (handleIndex <= 4) {
                adjusted.y = clamp(adjusted.y, 0.03, Math.min(handles[8]?.y ?? 0.9, 0.56));
            }
            if (handleIndex >= 5 && handleIndex <= 7) {
                adjusted.x = clamp(adjusted.x, centerX + 0.03, 0.98);
            }
            if (handleIndex === 8) {
                adjusted.x = clamp(adjusted.x, centerX - 0.14, centerX + 0.14);
                adjusted.y = clamp(adjusted.y, centerY + 0.12, 0.98);
            }
            if (handleIndex >= 9) {
                adjusted.x = clamp(adjusted.x, 0.02, centerX - 0.03);
            }

            return adjusted;
        });
        onChangeHandles(nextHandles);
    };

    return (
        <div className="relative flex w-full flex-1 flex-col items-center overflow-hidden bg-[#02050a] px-4 py-6 md:px-6 md:py-8">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_28%)]" />
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
            </div>

            <div className={`relative z-10 w-full max-w-7xl ${isKo ? "font-korean" : ""}`}>
                <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,24,0.96),rgba(5,8,14,0.94))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-6">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
                        <section className="rounded-[30px] border border-white/8 bg-white/3 p-4 md:p-5">
                            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className={`text-2xl font-bold tracking-tight text-white md:text-3xl ${isKo ? "" : "font-cinzel"}`}>{labels.title}</h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/62 md:text-[15px]">{labels.subtitle}</p>
                                </div>

                                <div className="rounded-[18px] border border-white/8 bg-black/24 px-4 py-3 text-left md:min-w-[180px] md:text-right">
                                    <p className="text-[11px] font-medium text-white/42">{isKo ? "현재 상태" : "Current Status"}</p>
                                    <p className={`mt-1 text-sm font-semibold ${preview?.gate.canAnalyze ? "text-emerald-100" : "text-amber-100"}`}>{statusLabel}</p>
                                </div>
                            </div>

                            <div
                                ref={stageRef}
                                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.4)]"
                                style={{ aspectRatio }}
                                onPointerMove={(event) => {
                                    if (activeHandle === null) return;
                                    updateHandle(activeHandle, event.clientX, event.clientY);
                                }}
                                onPointerUp={() => setActiveHandle(null)}
                                onPointerLeave={() => setActiveHandle(null)}
                            >
                                <Image src={imageSrc} alt={labels.title} fill unoptimized className="object-cover" />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.44))]" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_48%,rgba(0,0,0,0.18)_100%)]" />

                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                                    {centerLinePath && <path d={centerLinePath} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.22" strokeDasharray="1.6 1.2" />}
                                    {upperThirdPath && <path d={upperThirdPath} fill="none" stroke="rgba(255,255,255,0.84)" strokeWidth="0.28" strokeDasharray="1.15 0.95" />}
                                    {middleThirdPath && <path d={middleThirdPath} fill="none" stroke="rgba(255,255,255,0.84)" strokeWidth="0.28" strokeDasharray="1.15 0.95" />}
                                    {fifthGuideRange && fifthGuideXs.map((x, index) => (
                                        <path
                                            key={`fifth-${index}`}
                                            d={`M ${x * 100} ${fifthGuideRange[0].y * 100} L ${x * 100} ${fifthGuideRange[1].y * 100}`}
                                            fill="none"
                                            stroke="rgba(138,191,244,0.42)"
                                            strokeWidth="0.18"
                                            strokeDasharray="0.95 0.85"
                                        />
                                    ))}
                                    {hairlinePath && <path d={hairlinePath} fill="none" stroke="rgba(255,255,255,0.68)" strokeWidth="0.28" strokeDasharray="1.8 1.3" strokeLinecap="round" strokeLinejoin="round" />}
                                    <path d={path} fill="rgba(255,107,107,0.05)" stroke="#ff6b6b" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />

                                    {handles.map((handle, index) => (
                                        <g key={`${handle.x}-${handle.y}-${index}`}>
                                            <circle cx={handle.x * 100} cy={handle.y * 100} r="1.72" fill="rgba(0,0,0,0.46)" />
                                            <circle
                                                cx={handle.x * 100}
                                                cy={handle.y * 100}
                                                r={activeHandle === index ? "1.55" : "1.22"}
                                                fill="#ffffff"
                                                stroke="#ff6464"
                                                strokeWidth="0.46"
                                                className="cursor-pointer"
                                                onPointerDown={(event) => {
                                                    event.preventDefault();
                                                    stageRef.current?.setPointerCapture(event.pointerId);
                                                    setActiveHandle(index);
                                                    updateHandle(index, event.clientX, event.clientY);
                                                }}
                                            />
                                        </g>
                                    ))}

                                </svg>

                                <div className="absolute left-4 top-4">
                                    <div className="rounded-full border border-white/10 bg-black/46 px-3 py-1 text-[10px] font-medium text-white/72">
                                        {isLoading ? labels.loading : isPreviewing ? labels.previewing : labels.ready}
                                    </div>
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    {guideMarkers.map(({ key, point, label }) => (
                                        <div
                                            key={key}
                                            className="absolute"
                                            style={{
                                                top: `${point!.y * 100}%`,
                                                left: `${Math.max((point!.x * 100) - 8, 3)}%`,
                                                transform: "translate(-100%, -50%)",
                                            }}
                                        >
                                            <div className="rounded-md border border-white/12 bg-black/82 px-2 py-1 text-[11px] font-bold leading-none text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)]">
                                                {label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 rounded-[22px] border border-white/8 bg-black/22 p-4">
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { swatch: "bg-[#ff6b6b]", text: labels.legendContour },
                                        { swatch: "bg-white/80", text: labels.legendHairline },
                                        { swatch: "bg-white", text: labels.legendThirds },
                                        { swatch: "bg-sky-200/80", text: labels.legendFifths },
                                        { swatch: "bg-white/40", text: labels.legendCenter },
                                    ].map((item) => (
                                        <div key={item.text} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3 py-2 text-[12px] leading-none text-white/78">
                                            <span className={`h-2 w-2 shrink-0 rounded-full ${item.swatch}`} />
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <aside className="flex h-full flex-col gap-4 rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(7,12,20,0.96),rgba(4,8,14,0.98))] p-4 md:p-5">
                            {preview && (
                                <>
                                    <section className="rounded-[24px] border border-white/8 bg-black/22 p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="text-[12px] font-semibold text-white/48">{labels.detectionTitle}</p>
                                            <div className={`rounded-full border px-3 py-1 text-[10px] font-medium ${
                                                preview.gate.canAnalyze
                                                    ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
                                                    : "border-amber-300/20 bg-amber-500/10 text-amber-100"
                                            }`}>
                                                {statusLabel}
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            <div className="rounded-[18px] border border-white/8 bg-black/24 p-3">
                                                <span className="block text-[11px] text-white/42">{labels.detectionHairline}</span>
                                                <span className="mt-2 block text-sm font-semibold text-white">{hairlineMethodLabel}</span>
                                            </div>
                                            <div className="rounded-[18px] border border-white/8 bg-black/24 p-3">
                                                <span className="block text-[11px] text-white/42">{labels.detectionReliability}</span>
                                                <span className="mt-2 block text-lg font-bold text-white">{preview.overlay.hairlineReliability ?? 0}%</span>
                                            </div>
                                            <div className="rounded-[18px] border border-white/8 bg-black/24 p-3">
                                                <span className="block text-[11px] text-white/42">{labels.detectionFrame}</span>
                                                <span className="mt-2 block text-sm font-semibold text-white">{frameBasisLabel}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="rounded-[24px] border border-white/8 bg-black/22 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-[12px] font-semibold text-white/48">{labels.thirdsTitle}</p>
                                                <p className="mt-1 text-[11px] text-white/32">{labels.thirdsTarget}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-4">
                                            {thirdRows.map((item) => (
                                                <div key={item.label}>
                                                    <div className="mb-2 flex items-end justify-between gap-3">
                                                        <div>
                                                            <span className={`block text-sm text-white ${isKo ? "font-korean break-keep" : ""}`}>{item.label}</span>
                                                            <span className="text-[11px] text-white/42">{labels.deltaLabel} {formatDelta(item.value)}</span>
                                                        </div>
                                                        <span className="text-sm font-mono text-white">{item.value.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="relative h-2.5 overflow-hidden rounded-full bg-white/8">
                                                        <div className="absolute inset-y-0 left-[33.3%] w-px bg-white/28" />
                                                        <div
                                                            className={`h-full rounded-full bg-linear-to-r ${getMeterTone(item.value)}`}
                                                            style={{ width: `${item.value}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="rounded-[24px] border border-white/8 bg-black/22 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-[12px] font-semibold text-white/48">{labels.qualityTitle}</p>
                                            <span className="text-[11px] text-white/38">{isKo ? "실측 기반" : "Measured"}</span>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            {qualityRows.map((item) => (
                                                <div key={item.label}>
                                                    <div className="mb-1.5 flex items-end justify-between gap-3">
                                                        <span className="text-xs text-white/66">{item.label}</span>
                                                        <span className="text-xs font-mono text-white">{item.value}%</span>
                                                    </div>
                                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                                        <div
                                                            className={`h-full rounded-full bg-linear-to-r ${getMeterTone(item.value)}`}
                                                            style={{ width: `${item.value}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="rounded-[24px] border border-white/8 bg-black/22 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-[12px] font-semibold text-white/48">{labels.actionTitle}</p>
                                            <span className="text-[11px] text-white/38">{liveInsights.length || 1} {isKo ? "개 항목" : "items"}</span>
                                        </div>

                                        {!preview.gate.canAnalyze && (
                                            <p className="mt-3 text-[11px] leading-relaxed text-rose-100/82">{labels.guide}</p>
                                        )}

                                        <div className="mt-4 space-y-2.5">
                                            {(liveInsights.length ? liveInsights : [labels.insightEmpty]).map((text, index) => (
                                                <div key={`${text}-${index}`} className="flex items-start gap-3 rounded-[16px] border border-white/6 bg-white/2 px-3 py-3">
                                                    <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${liveInsights.length ? "bg-cyan-300" : "bg-emerald-300"}`} />
                                                    <p className="text-xs leading-relaxed text-white/76">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}

                            {notice && (
                                <section className="rounded-[22px] border border-amber-300/20 bg-amber-500/10 p-4">
                                    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/70 ${isKo ? "font-korean" : ""}`}>{labels.noticeTitle}</p>
                                    <p className={`mt-2 text-sm leading-relaxed text-amber-50 ${isKo ? "font-korean break-keep" : ""}`}>{notice}</p>
                                </section>
                            )}

                            <div className="mt-auto grid gap-3">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    <button
                                        onClick={onReloadDraft}
                                        disabled={isLoading || isAnalyzing}
                                        className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm font-semibold transition-colors ${
                                            isLoading || isAnalyzing
                                                ? "cursor-not-allowed border-white/10 bg-white/4 text-white/28"
                                                : "border-white/10 bg-white/[0.07] text-white hover:bg-white/12"
                                        } ${isKo ? "font-korean" : ""}`}
                                    >
                                        <Wand2 className="h-4 w-4" />
                                        {labels.draft}
                                    </button>

                                    <button
                                        onClick={onRestoreDraft}
                                        disabled={isLoading || isAnalyzing}
                                        className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm font-semibold transition-colors ${
                                            isLoading || isAnalyzing
                                                ? "cursor-not-allowed border-white/10 bg-white/4 text-white/28"
                                                : "border-white/10 bg-white/3 text-white/84 hover:bg-white/10 hover:text-white"
                                        } ${isKo ? "font-korean" : ""}`}
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        {labels.restore}
                                    </button>
                                </div>

                                <button
                                    onClick={onReset}
                                    disabled={isLoading || isAnalyzing || isPreviewing}
                                    className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm font-semibold transition-colors ${
                                        isLoading || isAnalyzing || isPreviewing
                                            ? "cursor-not-allowed border-white/10 bg-white/4 text-white/28"
                                            : "border-white/10 bg-white/3 text-white/72 hover:bg-white/10 hover:text-white"
                                    } ${isKo ? "font-korean" : ""}`}
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    {labels.changePhoto}
                                </button>

                                <button
                                    onClick={onAnalyze}
                                    disabled={analyzeDisabled}
                                    className={`flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#55e6ff,#2d7ff9)] px-5 py-4 text-sm font-bold text-[#031018] transition-transform ${
                                        analyzeDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-[1.01] active:scale-[0.99]"
                                    } ${isKo ? "font-korean" : ""}`}
                                >
                                    {isAnalyzing || isPreviewing ? <Sparkles className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                    {labels.analyze}
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
