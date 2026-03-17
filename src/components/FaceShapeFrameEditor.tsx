"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Check, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import type {
    FacePoint,
    FaceShapePreviewResult,
    FaceShapeQualityFlag,
    FaceStyleTarget,
} from "@/lib/face-shape-analysis-official";
import { getFaceStyleTargetCopy } from "@/lib/face-shape-style-content";

interface FaceShapeFrameEditorProps {
    imageSrc: string;
    aspectRatio: number;
    handles: FacePoint[];
    contour: FacePoint[];
    lang: "ko" | "en" | "zh" | "ja";
    styleTarget: FaceStyleTarget;
    isLoading: boolean;
    isAnalyzing: boolean;
    isPreviewing: boolean;
    notice: string | null;
    preview: FaceShapePreviewResult | null;
    onChangeHandles: (handles: FacePoint[]) => void;
    onRestoreDraft: () => void;
    onReloadDraft: () => void;
    onReset: () => void;
    onChangeStyleTarget: (target: FaceStyleTarget) => void;
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

function buildFifthGuideXs(guide?: [FacePoint, FacePoint] | null) {
    if (!guide) return [];
    const [left, right] = guide[0].x <= guide[1].x ? guide : [guide[1], guide[0]];
    const width = right.x - left.x;
    if (width <= 0.02) return [];
    return [1, 2, 3, 4].map((step) => left.x + (width * step) / 5);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function getHandleLayout() {
    return {
        topEnd: 4,
        rightStart: 5,
        rightEnd: 7,
        chin: 8,
        leftStart: 9,
    } as const;
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
    lang,
    styleTarget,
    isLoading,
    isAnalyzing,
    isPreviewing,
    notice,
    preview,
    onChangeHandles,
    onRestoreDraft,
    onReloadDraft,
    onReset,
    onChangeStyleTarget,
    onAnalyze,
}: FaceShapeFrameEditorProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [activeHandle, setActiveHandle] = useState<number | null>(null);
    const path = useMemo(() => toPath(contour, true), [contour]);
    const isKo = lang === "ko";
    const isEnglish = lang === "en";

    const labels = useMemo(
        () =>
            ({
                ko: {
                    title: "측정 프레임 보정",
                    subtitle: "헤어라인, 얼굴 옆선, 턱끝을 실제 경계에 맞춰주세요.",
                    loading: "AI 초안 생성 중...",
                    ready: "현재 파란 윤곽선과 가이드선이 실제 분석 기준입니다.",
                    previewing: "실측값 재계산 중...",
                    draft: "초안 다시 잡기",
                    restore: "초안으로 되돌리기",
                    analyze: "이 프레임으로 분석",
                    analyzeShort: "프레임 분석",
                    statusReady: "분석 가능",
                    statusBlocked: "보정 필요",
                    legendContour: "윤곽",
                    legendHairline: "헤어라인",
                    legendThirds: "3등분",
                    legendFifths: "5등분",
                    legendCenter: "중심축",
                    detectionTitle: "감지 상태",
                    thirdsTitle: "안면 3분할 비율",
                    thirdsTarget: "이상 비율 1:1:1",
                    thirdsUpper: "상안부",
                    thirdsMiddle: "중안부",
                    thirdsLower: "하안부",
                    qualityTitle: "데이터 품질",
                    actionTitle: "조정 필요 항목",
                    guide: "차단 상태가 풀릴 때까지 분석 버튼이 잠깁니다.",
                    insightEmpty: "프레임과 사진 상태가 전문 분석에 적합합니다.",
                    imageQuality: "사진 선명도",
                    hairlineQuality: "헤어라인 식별률",
                    frameQuality: "프레임 밀착도",
                    noticeTitle: "주의",
                    changePhoto: "다른 사진 선택",
                    hairlineDivider: "헤어라인선",
                    browDivider: "눈썹 연선",
                    philtrumDivider: "코끝선",
                    chinDivider: "턱끝선",
                    itemUnit: "개",
                },
                en: {
                    title: "Measurement Calibration",
                    subtitle: "Match the hairline, side contour, and chin tip to the real boundary.",
                    loading: "Building AI draft...",
                    ready: "The blue contour and guide lines are now the live analysis frame.",
                    previewing: "Refreshing measurements...",
                    draft: "Reload AI Draft",
                    restore: "Restore Draft",
                    analyze: "Analyze With This Frame",
                    analyzeShort: "Analyze Frame",
                    statusReady: "Ready",
                    statusBlocked: "Needs Refinement",
                    legendContour: "Contour",
                    legendHairline: "Hairline",
                    legendThirds: "Thirds",
                    legendFifths: "Fifths",
                    legendCenter: "Axis",
                    detectionTitle: "Detection Status",
                    thirdsTitle: "Facial Thirds",
                    thirdsTarget: "Ideal Ratio 1:1:1",
                    thirdsUpper: "Upper",
                    thirdsMiddle: "Middle",
                    thirdsLower: "Lower",
                    qualityTitle: "Data Quality",
                    actionTitle: "Items To Fix",
                    guide: "The analyze button stays locked until the blocking issues are cleared.",
                    insightEmpty: "The current frame and photo quality are suitable for final analysis.",
                    imageQuality: "Image Sharpness",
                    hairlineQuality: "Hairline Read",
                    frameQuality: "Frame Fit",
                    noticeTitle: "Notice",
                    changePhoto: "Change Photo",
                    hairlineDivider: "Hairline",
                    browDivider: "Brow Line",
                    philtrumDivider: "Nose Base",
                    chinDivider: "Chin Line",
                    itemUnit: "items",
                },
                zh: {
                    title: "测量框校准",
                    subtitle: "请将发际线、脸部侧边与下巴尖对齐到真实边界。",
                    loading: "正在生成 AI 草稿...",
                    ready: "当前蓝色轮廓线与引导线就是实际分析基准。",
                    previewing: "正在重新计算测量值...",
                    draft: "重新生成 AI 草稿",
                    restore: "恢复为草稿",
                    analyze: "按当前框线分析",
                    analyzeShort: "框线分析",
                    statusReady: "可分析",
                    statusBlocked: "仍需调整",
                    legendContour: "轮廓",
                    legendHairline: "发际线",
                    legendThirds: "三庭",
                    legendFifths: "五眼",
                    legendCenter: "中轴",
                    detectionTitle: "检测状态",
                    thirdsTitle: "面部三庭比例",
                    thirdsTarget: "理想比例 1:1:1",
                    thirdsUpper: "上庭",
                    thirdsMiddle: "中庭",
                    thirdsLower: "下庭",
                    qualityTitle: "数据质量",
                    actionTitle: "需要调整的项目",
                    guide: "在阻塞问题解除之前，分析按钮会保持锁定。",
                    insightEmpty: "当前框线和照片条件已适合正式分析。",
                    imageQuality: "照片清晰度",
                    hairlineQuality: "发际线识别率",
                    frameQuality: "框线贴合度",
                    noticeTitle: "注意",
                    changePhoto: "更换照片",
                    hairlineDivider: "发际线",
                    browDivider: "眉线",
                    philtrumDivider: "鼻底线",
                    chinDivider: "下巴线",
                    itemUnit: "项",
                },
                ja: {
                    title: "測定フレーム補正",
                    subtitle: "生え際、顔の外側ライン、あご先を実際の境界に合わせてください。",
                    loading: "AI 下書きを作成中...",
                    ready: "現在の青い輪郭線とガイド線が実際の分析基準です。",
                    previewing: "実測値を再計算しています...",
                    draft: "AI 下書きを再生成",
                    restore: "下書きに戻す",
                    analyze: "このフレームで分析",
                    analyzeShort: "フレーム分析",
                    statusReady: "分析可能",
                    statusBlocked: "再調整が必要",
                    legendContour: "輪郭",
                    legendHairline: "生え際",
                    legendThirds: "三庭",
                    legendFifths: "五眼",
                    legendCenter: "中心軸",
                    detectionTitle: "検出状態",
                    thirdsTitle: "顔の三庭バランス",
                    thirdsTarget: "理想比率 1:1:1",
                    thirdsUpper: "上庭",
                    thirdsMiddle: "中庭",
                    thirdsLower: "下庭",
                    qualityTitle: "データ品質",
                    actionTitle: "調整が必要な項目",
                    guide: "ブロック要因が解消されるまで分析ボタンはロックされます。",
                    insightEmpty: "現在のフレームと写真状態は本分析に適しています。",
                    imageQuality: "写真の鮮明度",
                    hairlineQuality: "生え際認識率",
                    frameQuality: "フレーム適合度",
                    noticeTitle: "注意",
                    changePhoto: "別の写真を選ぶ",
                    hairlineDivider: "生え際ライン",
                    browDivider: "眉ライン",
                    philtrumDivider: "鼻下ライン",
                    chinDivider: "あご先ライン",
                    itemUnit: "件",
                },
            }[lang]),
        [lang]
    );
    const styleTargetCopy = useMemo(() => getFaceStyleTargetCopy(lang), [lang]);
    const styleOptions = useMemo(
        () =>
            (["feminine", "masculine"] as FaceStyleTarget[]).map((target) => ({
                target,
                ...styleTargetCopy[target],
            })),
        [styleTargetCopy]
    );
    const legendItems = useMemo(
        () => [
            {
                text: labels.legendContour,
                dotClass: "bg-[#4e80ff]",
                chipClass: "border-[#4e80ff]/30 bg-[#4e80ff]/12 text-[#e8f0ff]",
            },
            {
                text: labels.legendHairline,
                dotClass: "bg-[#f6c453]",
                chipClass: "border-[#f6c453]/30 bg-[#f6c453]/12 text-[#fff1c7]",
            },
            {
                text: labels.legendThirds,
                dotClass: "bg-[#34d399]",
                chipClass: "border-[#34d399]/30 bg-[#34d399]/12 text-[#dffdf2]",
            },
            {
                text: labels.legendFifths,
                dotClass: "bg-[#67e8f9]",
                chipClass: "border-[#67e8f9]/30 bg-[#67e8f9]/12 text-[#defafe]",
            },
            {
                text: labels.legendCenter,
                dotClass: "bg-[#c084fc]",
                chipClass: "border-[#c084fc]/30 bg-[#c084fc]/12 text-[#f3e8ff]",
            },
        ],
        [labels.legendCenter, labels.legendContour, labels.legendFifths, labels.legendHairline, labels.legendThirds]
    );

    const qualityFlagCopy: Record<FaceShapeQualityFlag, string> = {
        ambiguous_shape: {
            ko: "윤곽 프레임을 실제 외곽에 더 밀착해 주세요.",
            en: "Tighten the contour to the real boundary.",
            zh: "请让轮廓框更贴合真实外轮廓。",
            ja: "輪郭フレームを実際の外周にもう少し密着させてください。",
        }[lang],
        low_pose: {
            ko: "정면 각도와 눈높이를 기준선에 맞춰 주세요.",
            en: "Level the face and eyes again.",
            zh: "请重新对齐正面角度与视线高度。",
            ja: "正面角度と目線の高さをもう一度整えてください。",
        }[lang],
        low_sharpness: {
            ko: "보다 높은 해상도나 선명한 사진을 권장합니다.",
            en: "A sharper photo is recommended.",
            zh: "建议使用更清晰、分辨率更高的照片。",
            ja: "より鮮明で解像度の高い写真をおすすめします。",
        }[lang],
        low_lighting: {
            ko: "이마와 턱선 조명 대비가 심합니다.",
            en: "High contrast lighting detected on forehead and jaw.",
            zh: "额头与下颌区域的明暗反差过强。",
            ja: "額とあご周辺の光のコントラストが強すぎます。",
        }[lang],
        low_coverage: {
            ko: "얼굴이 이미지의 더 넓은 영역을 차지해야 합니다.",
            en: "The face should take up more frame space.",
            zh: "脸部需要占据画面更大的比例。",
            ja: "顔が画面内で占める割合をもう少し大きくしてください。",
        }[lang],
        low_frame_alignment: {
            ko: "현재 프레임이 얼굴 외곽과 명확히 일치하지 않습니다.",
            en: "Current frame alignment is slightly off.",
            zh: "当前框线与真实外轮廓仍有偏差。",
            ja: "現在のフレームが実際の輪郭と少しずれています。",
        }[lang],
        low_hairline: {
            ko: "이마 상단 경계를 더 명확히 지정해주세요.",
            en: "Expose and define the forehead explicitly.",
            zh: "请更明确地标出额头上缘与发际线。",
            ja: "額の上端と生え際をもう少し明確に指定してください。",
        }[lang],
    };

    const liveInsights = (preview?.gate.reasons.length ? preview.gate.reasons : preview?.quality.flags ?? [])
        .slice(0, 4)
        .map((flag) => qualityFlagCopy[flag]);
    const handleLayout = getHandleLayout();

    const hairlinePath = preview?.overlay.hairlineContour?.length ? toPath(preview.overlay.hairlineContour) : "";
    const frameGuideRange: [FacePoint, FacePoint] | null =
        preview?.overlay.centerLine && handles[handleLayout.chin]
            ? [preview.overlay.centerLine[0], handles[handleLayout.chin]]
            : preview?.overlay.faceHeight ?? null;
    const centerLinePath = pairPath(frameGuideRange);
    const upperThirdPath = pairPath(preview?.overlay.upperThirdGuide);
    const middleThirdPath = pairPath(preview?.overlay.middleThirdGuide);
    const fifthGuideXs = buildFifthGuideXs(preview?.overlay.upperThirdGuide ?? preview?.overlay.cheekboneWidth);
    const fifthGuideRange = frameGuideRange;
    const guideMarkers = [
        {
            key: "hairline",
            point: preview?.overlay.faceHeight?.[0] ?? null,
            label: labels.hairlineDivider,
            chipClass: "border-[#f6c453]/35 bg-black/82 text-[#fff1c7]",
            lineClass: "bg-[#f6c453]/80",
        },
        {
            key: "upper",
            point: preview?.overlay.upperThirdGuide?.[0] ?? null,
            label: labels.browDivider,
            chipClass: "border-[#67e8f9]/35 bg-black/82 text-[#defafe]",
            lineClass: "bg-[#67e8f9]/80",
        },
        {
            key: "middle",
            point: preview?.overlay.middleThirdGuide?.[0] ?? null,
            label: labels.philtrumDivider,
            chipClass: "border-[#fb7185]/35 bg-black/82 text-[#ffe4e8]",
            lineClass: "bg-[#fb7185]/80",
        },
        {
            key: "chin",
            point: preview?.overlay.faceHeight?.[1] ?? null,
            label: labels.chinDivider,
            chipClass: "border-[#4e80ff]/35 bg-black/82 text-[#e8f0ff]",
            lineClass: "bg-[#4e80ff]/80",
        },
    ].filter((item) => item.point !== null);

    const analyzeDisabled = isLoading || isAnalyzing || (preview ? !preview.gate.canAnalyze : isPreviewing);
    const statusLabel = preview?.gate.canAnalyze ? labels.statusReady : labels.statusBlocked;
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

            if (handleIndex <= handleLayout.topEnd) {
                adjusted.y = clamp(adjusted.y, 0.03, Math.min(handles[handleLayout.chin]?.y ?? 0.9, 0.56));
            }
            if (handleIndex >= handleLayout.rightStart && handleIndex <= handleLayout.rightEnd) {
                adjusted.x = clamp(adjusted.x, centerX + 0.03, 0.98);
            }
            if (handleIndex === handleLayout.chin) {
                adjusted.x = clamp(adjusted.x, centerX - 0.14, centerX + 0.14);
                adjusted.y = clamp(adjusted.y, centerY + 0.12, 0.98);
            }
            if (handleIndex >= handleLayout.leftStart) {
                adjusted.x = clamp(adjusted.x, 0.02, centerX - 0.03);
            }

            return adjusted;
        });
        onChangeHandles(nextHandles);
    };

    return (
        <div className={`relative flex w-full flex-1 flex-col items-center overflow-x-hidden bg-[#03060b] px-4 py-8 md:px-6 lg:py-12 ${isKo ? "font-korean" : ""}`}>
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(45,127,249,0.1),transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-[1240px]">
                {/* Header Sequence */}
                <div className="mb-6 flex flex-col gap-3 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4">
                        <div>
                            <h2 className={`text-2xl font-black tracking-tight text-white lg:text-3xl ${isEnglish ? "font-cinzel" : ""}`}>{labels.title}</h2>
                            <p className="mt-2.5 max-w-lg text-[13px] leading-relaxed text-white/50 lg:text-[14px]">{labels.subtitle}</p>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:mt-0 sm:self-center">
                            <span className={`h-2.5 w-2.5 rounded-full ${preview?.gate.canAnalyze ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" : "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]"}`} />
                            <span className="text-[12px] font-bold tracking-wide text-white/80">{statusLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid (Asymmetrical Dual-Column) */}
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:gap-8">
                    
                    {/* Left Panel: Primary Photo Stage */}
                    <div className="flex flex-col gap-4">
                        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090b0f] shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                            <div
                                ref={stageRef}
                                className="relative w-full overflow-hidden bg-black touch-none"
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

                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                                    {centerLinePath && <path d={centerLinePath} fill="none" stroke="rgba(192,132,252,0.68)" strokeWidth="0.22" strokeDasharray="1.5 1" />}
                                    {upperThirdPath && <path d={upperThirdPath} fill="none" stroke="rgba(103,232,249,0.84)" strokeWidth="0.22" strokeDasharray="1.2 1" />}
                                    {middleThirdPath && <path d={middleThirdPath} fill="none" stroke="rgba(251,113,133,0.82)" strokeWidth="0.22" strokeDasharray="1.2 1" />}
                                    {fifthGuideRange && fifthGuideXs.map((x, index) => (
                                        <path
                                            key={`fifth-${index}`}
                                            d={`M ${x * 100} ${fifthGuideRange[0].y * 100} L ${x * 100} ${fifthGuideRange[1].y * 100}`}
                                            fill="none"
                                            stroke="rgba(103,232,249,0.55)"
                                            strokeWidth="0.18"
                                            strokeDasharray="1"
                                        />
                                    ))}
                                    {hairlinePath && <path d={hairlinePath} fill="none" stroke="rgba(246,196,83,0.92)" strokeWidth="0.26" strokeDasharray="1.5 1" strokeLinecap="round" strokeLinejoin="round" />}
                                    <path d={path} fill="rgba(82,116,255,0.06)" stroke="#4e80ff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />

                                    {handles.map((handle, index) => (
                                        <g key={`${handle.x}-${handle.y}-${index}`}>
                                            <circle cx={handle.x * 100} cy={handle.y * 100} r="1.5" fill="rgba(0,0,0,0.6)" />
                                            <circle
                                                cx={handle.x * 100}
                                                cy={handle.y * 100}
                                                r={activeHandle === index ? "1.4" : "1"}
                                                fill="#ffffff"
                                                stroke="#4e80ff"
                                                strokeWidth="0.4"
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

                                <div className="absolute left-4 top-4 z-20">
                                    <div className="rounded-2xl border border-white/14 bg-black/72 px-4 py-2.5 text-[12px] font-bold leading-snug text-white shadow-xl backdrop-blur-md sm:text-[13px]">
                                        {isLoading ? labels.loading : isPreviewing ? labels.previewing : labels.ready}
                                    </div>
                                </div>

                                <div className="pointer-events-none absolute inset-0 z-10">
                                    {guideMarkers.map(({ key, point, label, chipClass, lineClass }) => (
                                        <div
                                            key={key}
                                            className="absolute flex items-center gap-2"
                                            style={{
                                                top: `${point!.y * 100}%`,
                                                left: "2.5%",
                                                right: `calc(${Math.max(100 - point!.x * 100, 4)}% + 12px)`,
                                                transform: "translateY(-50%)",
                                            }}
                                        >
                                            <div className={`rounded-lg border px-3 py-2 text-[11px] font-bold leading-none shadow-lg backdrop-blur-sm sm:text-[12px] ${chipClass}`}>
                                                {label}
                                            </div>
                                            <div className={`h-px flex-1 ${lineClass}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 lg:ml-2">
                            {legendItems.map((item) => (
                                <div
                                    key={item.text}
                                    className={`flex items-center justify-center gap-2 rounded-full border px-2.5 py-2 sm:px-4 sm:py-3 text-[11px] sm:text-[12px] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all ${item.chipClass}`}
                                >
                                    <span className={`h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.12)] ${item.dotClass}`} />
                                    <span className="leading-none">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Structured Dashboard Controls */}
                    <aside className="flex flex-col gap-4">
                        

                        <section className="rounded-[28px] border border-white/10 bg-[#070b12] p-5 shadow-xl">
                            <div className="mb-4">
                                <h3 className="text-[14px] font-bold text-white/90">{styleTargetCopy.title}</h3>
                                <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{styleTargetCopy.body}</p>
                            </div>
                            <div className="grid gap-2.5">
                                {styleOptions.map((option) => {
                                    const active = styleTarget === option.target;
                                    return (
                                        <button
                                            key={option.target}
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => onChangeStyleTarget(option.target)}
                                            className={`rounded-2xl border px-4 py-3.5 text-left transition-all ${
                                                active
                                                    ? "border-[#4e80ff]/70 bg-[linear-gradient(135deg,rgba(78,128,255,0.18),rgba(45,92,249,0.08))] shadow-[0_10px_30px_rgba(45,92,249,0.18)]"
                                                    : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/6"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className={`text-[13px] font-bold ${active ? "text-white" : "text-white/85"}`}>{option.label}</span>
                                                <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[#6b9fff] shadow-[0_0_12px_rgba(107,159,255,0.6)]" : "bg-white/20"}`} />
                                            </div>
                                            <p className={`mt-1.5 text-[11px] leading-relaxed ${active ? "text-white/78" : "text-white/52"}`}>{option.description}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>



                        {preview && (
                            <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-[#070b12] p-5 lg:p-6 shadow-xl">
                                
                                {/* AI Action Items */}
                                {!preview.gate.canAnalyze && (
                                    <div className="mb-2">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-[14px] font-bold text-white/90">{labels.actionTitle}</h3>
                                            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-white/50">{liveInsights.length || 1} {labels.itemUnit}</span>
                                        </div>
                                        <div className="mb-3 rounded-xl bg-rose-500/10 px-4 py-3 border border-rose-500/20">
                                            <p className="text-[12px] font-medium text-rose-300/90">{labels.guide}</p>
                                        </div>
                                        <div className="grid gap-2">
                                            {(liveInsights.length ? liveInsights : [labels.insightEmpty]).map((text, index) => (
                                                <div key={`${text}-${index}`} className="flex items-start gap-3 rounded-xl bg-white/2 border border-white/5 px-4 py-3.5">
                                                    <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${liveInsights.length ? "bg-[#4e80ff]" : "bg-emerald-400"}`} />
                                                    <p className="text-[12px] leading-relaxed text-white/80">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <hr className="border-white/5" />

                                <div className="py-2">
                                    <h3 className="mb-4 text-[11px] font-bold text-white/50">{labels.qualityTitle}</h3>
                                    <div className="space-y-3">
                                        {qualityRows.map((item) => (
                                            <div key={item.label}>
                                                <div className="mb-1.5 flex justify-between gap-2">
                                                    <span className="text-[11px] text-white/60">{item.label}</span>
                                                    <span className="text-[11px] font-mono font-bold text-white/90">{item.value}%</span>
                                                </div>
                                                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                                                    <div
                                                        className={`h-full rounded-full bg-linear-to-r ${getMeterTone(item.value)}`}
                                                        style={{ width: `${item.value}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}

                        {notice && (
                            <section className="rounded-[20px] border border-amber-500/20 bg-amber-500/10 p-5 mt-auto">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">{labels.noticeTitle}</p>
                                <p className="mt-1.5 text-[12px] leading-relaxed text-amber-100/90">{notice}</p>
                            </section>
                        )}

                        {/* Action Control Group */}
                        <div className="mt-auto flex flex-col gap-3">
                            {/* Secondary Actions (Draft Controls) */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={onReloadDraft}
                                    disabled={isLoading || isAnalyzing}
                                    className={`flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-[13px] font-bold transition-all ${
                                        isLoading || isAnalyzing ? "cursor-not-allowed opacity-40" : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <Wand2 className="h-4 w-4" />
                                    {labels.draft}
                                </button>
                                <button
                                    onClick={onRestoreDraft}
                                    disabled={isLoading || isAnalyzing}
                                    className={`flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-[13px] font-bold transition-all ${
                                        isLoading || isAnalyzing ? "cursor-not-allowed opacity-40" : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    {labels.restore}
                                </button>
                            </div>

                            {/* Primary Actions (Final Controls) */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={onReset}
                                    disabled={isLoading || isAnalyzing || isPreviewing}
                                    className={`flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-[13px] font-bold transition-colors hover:bg-white/5 ${
                                        (isLoading || isAnalyzing || isPreviewing) ? "cursor-not-allowed opacity-40" : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    {labels.changePhoto}
                                </button>

                                <button
                                    onClick={onAnalyze}
                                    disabled={analyzeDisabled}
                                    className={`flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#4e80ff,#2d5cf9)] px-6 py-4 text-[14px] font-bold text-white shadow-[0_10px_30px_rgba(78,128,255,0.25)] transition-transform sm:text-[15px] ${
                                        analyzeDisabled ? "cursor-not-allowed opacity-50 shadow-none" : "hover:scale-[1.02] active:scale-[0.98]"
                                    }`}
                                >
                                    {isAnalyzing || isPreviewing ? <Sparkles className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
                                    <span className="hidden whitespace-nowrap sm:inline">{labels.analyze}</span>
                                    <span className="whitespace-nowrap sm:hidden">{labels.analyzeShort}</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
