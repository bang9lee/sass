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
    onAnalyze: () => void;
    onBack: () => void;
}

function toPath(points: FacePoint[], close = false) {
    if (!points.length) return "";
    return points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x * 100} ${point.y * 100}`)
        .join(" ")
        .concat(close ? " Z" : "");
}

function averageX(points: FacePoint[]) {
    return points.reduce((sum, point) => sum + point.x, 0) / Math.max(points.length, 1);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
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
    onAnalyze,
    onBack,
}: FaceShapeFrameEditorProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [activeHandle, setActiveHandle] = useState<number | null>(null);
    const path = useMemo(() => toPath(contour, true), [contour]);

    const labels = useMemo(
        () => ({
            title: isKo ? "측정 프레임 보정" : "Adjust Measurement Frame",
            subtitle: isKo
                ? "AI 초안을 시작점으로 두고, 이마 위쪽, 옆 프레임, 턱 아래를 직접 맞춰 주세요."
                : "Use the AI draft as a starting point, then place the top hairline, side frame, and chin yourself.",
            draft: isKo ? "AI 초안 다시 잡기" : "Reload AI Draft",
            restore: isKo ? "초안으로 되돌리기" : "Restore Draft",
            analyze: isKo ? "이 프레임으로 분석" : "Analyze With This Frame",
            back: isKo ? "영역 다시 선택" : "Back To Crop",
            hint: isKo
                ? "12개의 기준점을 드래그하여 얼굴 윤곽을 잡아주세요. 이마(헤어라인)와 턱선이 프레임 안에 정확히 들어오도록 맞추면 분석 정확도가 높아집니다."
                : "Drag the 12 points to define your facial contour. Align the frame with your hairline and jawline for the most accurate analysis.",
            loading: isKo ? "AI 초안 생성 중..." : "Building AI draft...",
            ready: isKo ? "현재 프레임이 실제 측정 기준으로 사용됩니다." : "This frame becomes the actual measurement basis.",
            previewing: isKo ? "품질 재계산 중..." : "Refreshing quality...",
            liveQuality: isKo ? "실시간 품질 게이트" : "Live Quality Gate",
            readyToAnalyze: isKo ? "분석 가능" : "Ready To Analyze",
            blocked: isKo ? "분석 차단" : "Blocked",
            provisional: isKo ? "예상 얼굴형" : "Provisional Shape",
            confidence: isKo ? "예상 신뢰도" : "Expected Confidence",
            imageQuality: isKo ? "이미지 품질" : "Image Quality",
            frameQuality: isKo ? "프레임 품질" : "Frame Quality",
            classification: isKo ? "형태 판별" : "Shape Read",
            guide: isKo ? "차단 상태가 풀릴 때까지 분석 버튼이 잠깁니다." : "The analyze button stays locked until blocking issues are cleared.",
        }),
        [isKo]
    );

    const qualityFlagCopy: Record<FaceShapeQualityFlag, string> = {
        ambiguous_shape: isKo ? "1순위와 2순위 얼굴형 점수 차가 아직 작습니다." : "The top two shape candidates are still too close.",
        low_pose: isKo ? "정면 각도와 좌우 수평을 더 맞춰 주세요." : "Make the photo more level and front-facing.",
        low_sharpness: isKo ? "사진이 흐려서 경계 판독이 약합니다." : "The photo is too soft for clean edge reading.",
        low_lighting: isKo ? "조명이 고르지 않아 경계 인식이 약합니다." : "Uneven lighting weakens the boundary reading.",
        low_coverage: isKo ? "얼굴이 화면을 조금 더 크게 차지해야 합니다." : "The face should occupy more of the frame.",
        low_frame_alignment: isKo ? "이마, 옆선, 턱 아래 프레임을 더 맞춰 주세요." : "Refine the forehead, side frame, and chin frame.",
        low_hairline: isKo ? "헤어라인 경계가 아직 불안정합니다." : "The hairline boundary is still unstable.",
    };

    const liveInsights = (preview?.gate.reasons.length ? preview.gate.reasons : preview?.quality.flags ?? [])
        .slice(0, 4)
        .map((flag) => qualityFlagCopy[flag]);

    const analyzeDisabled = isLoading || isAnalyzing || (preview ? !preview.gate.canAnalyze : isPreviewing);

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
        <div className="flex-1 w-full bg-black flex flex-col items-center px-4 py-6 md:px-6 md:py-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/15 blur-[140px]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className={`text-2xl md:text-3xl font-bold text-white ${isKo ? "font-korean" : "font-cinzel"}`}>{labels.title}</h2>
                            <p className={`mt-2 text-sm md:text-base text-white/60 leading-relaxed ${isKo ? "font-korean break-keep" : ""}`}>{labels.subtitle}</p>
                        </div>
                        <button onClick={onBack} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                            {labels.back}
                        </button>
                    </div>

                    <div
                        ref={stageRef}
                        className="relative w-full overflow-hidden rounded-4xl border border-white/10 bg-zinc-950/80 shadow-2xl"
                        style={{ aspectRatio }}
                        onPointerMove={(event) => {
                            if (activeHandle === null) return;
                            updateHandle(activeHandle, event.clientX, event.clientY);
                        }}
                        onPointerUp={() => setActiveHandle(null)}
                        onPointerLeave={() => setActiveHandle(null)}
                    >
                        <Image src={imageSrc} alt={labels.title} fill unoptimized className="object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                            <path d={path} fill="rgba(255,255,255,0.06)" stroke="#ff5f5f" strokeWidth="0.55" strokeLinecap="round" strokeLinejoin="round" />
                            {handles.map((handle, index) => (
                                <g key={`${handle.x}-${handle.y}-${index}`}>
                                    <circle cx={handle.x * 100} cy={handle.y * 100} r="1.7" fill="rgba(0,0,0,0.45)" />
                                    <circle
                                        cx={handle.x * 100}
                                        cy={handle.y * 100}
                                        r={activeHandle === index ? "1.5" : "1.2"}
                                        fill="#fff"
                                        stroke="#ff5f5f"
                                        strokeWidth="0.45"
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

                        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                            {isLoading ? labels.loading : isPreviewing ? labels.previewing : labels.ready}
                        </div>
                    </div>
                </div>

                <div className="rounded-4xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-xl">
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm leading-relaxed text-cyan-50">
                            <p className={isKo ? "font-korean break-keep" : ""}>{labels.hint}</p>
                        </div>

                        {notice && (
                            <div className="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-50">
                                <p className={isKo ? "font-korean break-keep" : ""}>{notice}</p>
                            </div>
                        )}

                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white">
                            <div className="flex items-center justify-between gap-3">
                                <span className={`text-[11px] font-bold tracking-[0.18em] uppercase text-white/60 ${isKo ? "font-korean" : ""}`}>{labels.liveQuality}</span>
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${preview?.gate.canAnalyze
                                        ? "border border-emerald-300/20 bg-emerald-500/15 text-emerald-100"
                                        : "border border-rose-300/20 bg-rose-500/15 text-rose-100"
                                        }`}
                                >
                                    {preview?.gate.canAnalyze ? labels.readyToAnalyze : labels.blocked}
                                </span>
                            </div>

                            {preview && (
                                <div className="mt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                                            <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45">{labels.provisional}</span>
                                            <span className={`mt-2 block text-lg font-bold ${isKo ? "font-korean" : ""}`}>{preview.faceShape.toUpperCase()}</span>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                                            <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45">{labels.confidence}</span>
                                            <span className="mt-2 block text-lg font-bold">{preview.confidence}%</span>
                                        </div>
                                    </div>

                                    {[
                                        { label: labels.imageQuality, value: preview.quality.image },
                                        { label: labels.frameQuality, value: preview.quality.frame },
                                        { label: labels.classification, value: preview.quality.classification },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="mb-2 flex items-end justify-between">
                                                <span className="text-[11px] uppercase tracking-[0.16em] text-white/55">{item.label}</span>
                                                <span className="text-xs font-mono text-white">{item.value}%</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className={`h-full transition-all duration-300 ${item.value >= 75 ? "bg-emerald-300" : item.value >= 60 ? "bg-amber-300" : "bg-rose-300"
                                                        }`}
                                                    style={{ width: `${item.value}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {liveInsights.length > 0 && (
                                        <div className="space-y-2 border-t border-white/10 pt-4">
                                            {!preview.gate.canAnalyze && (
                                                <p className={`text-xs leading-relaxed text-rose-100/85 ${isKo ? "font-korean break-keep" : ""}`}>{labels.guide}</p>
                                            )}
                                            {liveInsights.map((text, index) => (
                                                <div key={`${text}-${index}`} className="flex items-start gap-3">
                                                    <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/55" />
                                                    <p className={`text-xs leading-relaxed text-white/72 ${isKo ? "font-korean break-keep" : ""}`}>{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <button
                                onClick={onReloadDraft}
                                disabled={isLoading || isAnalyzing}
                                className={`flex items-center justify-center gap-2 rounded-full px-5 py-4 font-bold transition-colors ${isLoading || isAnalyzing
                                    ? "cursor-not-allowed bg-white/5 text-white/30"
                                    : "bg-white/10 text-white hover:bg-white/15"
                                    } ${isKo ? "font-korean" : ""}`}
                            >
                                <Wand2 className="h-4 w-4" />
                                {labels.draft}
                            </button>

                            <button
                                onClick={onRestoreDraft}
                                disabled={isLoading || isAnalyzing}
                                className={`flex items-center justify-center gap-2 rounded-full px-5 py-4 font-bold transition-colors ${isLoading || isAnalyzing
                                    ? "cursor-not-allowed bg-white/5 text-white/30"
                                    : "bg-white/8 text-white/80 hover:bg-white/12 hover:text-white"
                                    } ${isKo ? "font-korean" : ""}`}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {labels.restore}
                            </button>

                            <button
                                onClick={onAnalyze}
                                disabled={analyzeDisabled}
                                className={`flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-5 py-4 font-bold text-black transition-transform ${analyzeDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-[1.01] active:scale-[0.99]"
                                    } ${isKo ? "font-korean" : ""}`}
                            >
                                {isAnalyzing || isPreviewing ? <Sparkles className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                {labels.analyze}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
