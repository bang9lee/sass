"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Home, RotateCcw, ScanFace, Share2 } from "lucide-react";
import { getFaceShapeCopy, getMetricSummary } from "@/lib/face-shape-content";
import type { FacePoint, FaceShapeAnalysisResult } from "@/lib/face-shape-analysis";

interface FaceShapeResultCardProps {
    result: FaceShapeAnalysisResult;
    lang: string;
    isKo: boolean;
}

function formatPercent(value: number) {
    return `${Math.round(value)}%`;
}

function toPercent(point: FacePoint) {
    return { x: point.x * 100, y: point.y * 100 };
}

function linePath(points: FacePoint[], close = false) {
    if (points.length === 0) {
        return "";
    }

    return points
        .map((point, index) => {
            const { x, y } = toPercent(point);
            return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ")
        .concat(close ? " Z" : "");
}

function segmentLabel(start: FacePoint, end: FacePoint, label: string) {
    const startPoint = toPercent(start);
    const endPoint = toPercent(end);
    return {
        x: (startPoint.x + endPoint.x) / 2,
        y: (startPoint.y + endPoint.y) / 2,
        label,
    };
}

export function FaceShapeResultCardClient({ result, lang, isKo }: FaceShapeResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [showShareFallback, setShowShareFallback] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shapeCopy = getFaceShapeCopy(result.faceShape, lang);
    const secondaryCopy = getFaceShapeCopy(result.secondaryShape, lang);
    const summaries = getMetricSummary(result, lang);

    const labels = useMemo(
        () => ({
            title: isKo ? "AI 얼굴형 분석 리포트" : "AI Face Shape Report",
            subtitle: isKo ? "Measured from your uploaded photo" : "Measured from your uploaded photo",
            confidence: isKo ? "신뢰도" : "Confidence",
            primaryShape: isKo ? "주 얼굴형" : "Primary Shape",
            secondaryShape: isKo ? "보조 후보" : "Secondary Shape",
            coreMetrics: isKo ? "핵심 측정값" : "Core Measurements",
            structureRead: isKo ? "구조 해석" : "Structure Read",
            strengths: isKo ? "이 얼굴형의 강점" : "Strengths",
            hairstyle: isKo ? "헤어 방향" : "Hair Direction",
            eyewear: isKo ? "안경/프레임" : "Eyewear",
            contour: isKo ? "윤곽/메이크업" : "Contour / Makeup",
            symmetry: isKo ? "좌우 밸런스" : "Left-Right Balance",
            faceRatio: isKo ? "세로 대 가로" : "Length to Width",
            upperVsLower: isKo ? "이마 대 턱 폭" : "Forehead to Jaw",
            cheekDominance: isKo ? "광대 우세도" : "Cheekbone Dominance",
            jawAngle: isKo ? "턱선 각도" : "Jaw Angle",
            verticalThirds: isKo ? "상중하 비율" : "Vertical Thirds",
            methodology: isKo ? "측정 메모" : "Measurement Note",
            methodologyBody: isKo
                ? "랜드마크 기반 비율을 읽은 결과입니다. 앞머리, 각도, 렌즈 왜곡이 있으면 이마폭과 세로 비율이 흔들릴 수 있습니다."
                : "These readings come from landmark-based proportions. Bangs, camera angle, and lens distortion can shift forehead width and vertical ratios.",
            overlayTitle: isKo ? "랜드마크 오버레이" : "Landmark Overlay",
            overlayBody: isKo
                ? "실제 검출 포인트를 기준으로 윤곽, 중심축, 눈·코·입 구조를 덧그렸습니다."
                : "Contour, centerline, and facial features are drawn from detected landmarks.",
            share: isKo ? "공유" : "Share",
            save: isKo ? "이미지 저장" : "Save Image",
            home: isKo ? "홈" : "Home",
            retry: isKo ? "다시 분석" : "Retry",
            shareFallback: isKo ? "공유 기능을 사용할 수 없어 링크를 복사했습니다." : "Native share is unavailable, so the link was copied instead.",
        }),
        [isKo]
    );

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const overlayContour = linePath(result.overlay.contour, true);
    const guideLabels = [
        segmentLabel(result.overlay.foreheadWidth[0], result.overlay.foreheadWidth[1], isKo ? "이마폭" : "Forehead"),
        segmentLabel(result.overlay.cheekboneWidth[0], result.overlay.cheekboneWidth[1], isKo ? "광대폭" : "Cheekbone"),
        segmentLabel(result.overlay.jawWidth[0], result.overlay.jawWidth[1], isKo ? "턱폭" : "Jaw"),
    ];
    const facialFeaturePaths = [
        { points: result.overlay.leftEyebrow ?? [], color: "rgba(245, 208, 132, 0.92)", width: 0.4, close: false },
        { points: result.overlay.rightEyebrow ?? [], color: "rgba(245, 208, 132, 0.92)", width: 0.4, close: false },
        { points: result.overlay.leftEye ?? [], color: "rgba(191, 219, 254, 0.92)", width: 0.32, close: true },
        { points: result.overlay.rightEye ?? [], color: "rgba(191, 219, 254, 0.92)", width: 0.32, close: true },
        { points: result.overlay.noseBridge ?? [], color: "rgba(148, 163, 184, 0.86)", width: 0.28, close: false },
        { points: result.overlay.noseBaseGuide ?? [], color: "rgba(148, 163, 184, 0.78)", width: 0.28, close: false },
        { points: result.overlay.mouthOuter ?? [], color: "rgba(251, 146, 180, 0.86)", width: 0.3, close: true },
    ].filter((item) => item.points.length > 1);
    const proportionGuides = [result.overlay.upperThirdGuide, result.overlay.middleThirdGuide].filter(
        (item): item is [FacePoint, FacePoint] => Boolean(item)
    );
    const centerLine = result.overlay.centerLine ?? result.overlay.faceHeight;

    const statCards = [
        { label: labels.primaryShape, value: shapeCopy.name, accent: "text-white" },
        { label: labels.secondaryShape, value: secondaryCopy.name, accent: "text-white/82" },
        { label: labels.confidence, value: `${result.confidence}%`, accent: "text-sky-200" },
    ];

    const metricCards = [
        {
            label: labels.faceRatio,
            value: `1 : ${result.metrics.faceLengthToWidth.toFixed(2)}`,
            bar: Math.min(result.metrics.faceLengthToWidth / 1.8, 1) * 100,
            tone: "bg-sky-300",
        },
        {
            label: labels.upperVsLower,
            value: result.metrics.foreheadToJaw.toFixed(2),
            bar: Math.min(result.metrics.foreheadToJaw / 1.3, 1) * 100,
            tone: "bg-amber-300",
        },
        {
            label: labels.cheekDominance,
            value: result.metrics.cheekboneToJaw.toFixed(2),
            bar: Math.min(result.metrics.cheekboneToJaw / 1.3, 1) * 100,
            tone: "bg-emerald-300",
        },
        {
            label: labels.jawAngle,
            value: `${Math.round(result.metrics.jawAngle)}°`,
            bar: Math.min(result.metrics.jawAngle / 150, 1) * 100,
            tone: "bg-rose-300",
        },
        {
            label: labels.symmetry,
            value: `${result.metrics.symmetry}/100`,
            bar: result.metrics.symmetry,
            tone: "bg-violet-300",
        },
        {
            label: labels.verticalThirds,
            value: `${formatPercent(result.metrics.upperThird)} / ${formatPercent(result.metrics.middleThird)} / ${formatPercent(result.metrics.lowerThird)}`,
            bar: 100,
            tone: "bg-white/70",
        },
    ];

    const recommendationSections = [
        { title: labels.hairstyle, items: shapeCopy.hairstyle },
        { title: labels.eyewear, items: shapeCopy.eyewear },
        { title: labels.contour, items: shapeCopy.contour },
    ];

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: `${labels.title} - ${shapeCopy.name}`,
                    text: shapeCopy.summary,
                    url: shareUrl,
                });
                return;
            } catch (error) {
                if ((error as Error).name === "AbortError") return;
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowShareFallback(true);
            setTimeout(() => setShowShareFallback(false), 2500);
        } catch {
            setShowShareFallback(true);
            setTimeout(() => setShowShareFallback(false), 2500);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;
        setDownloading(true);

        try {
            const mod = await import("html-to-image");
            const dataUrl = await mod.toPng(cardRef.current, {
                backgroundColor: "#020617",
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `ai-face-shape-${result.faceShape}.png`;
            link.href = dataUrl;
            link.click();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2200);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            {showToast && (
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
                    <div className="rounded-full border border-white/12 bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                        {labels.save}
                    </div>
                </div>
            )}
            {showShareFallback && (
                <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
                    <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-medium text-white/82 backdrop-blur-xl">
                        {labels.shareFallback}
                    </div>
                </div>
            )}

            <div className="w-full max-w-7xl">
                <div
                    ref={cardRef}
                    className="overflow-hidden rounded-4xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.14),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,1))] text-white shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                >
                    <div className="border-b border-white/8 px-5 py-6 md:px-8 md:py-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">
                                    <ScanFace className="h-3.5 w-3.5" />
                                    {labels.subtitle}
                                </div>
                                <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">{labels.title}</h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">{shapeCopy.summary}</p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                                {statCards.map((item) => (
                                    <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/4.5 px-4 py-4 backdrop-blur-xl">
                                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">{item.label}</div>
                                        <div className={`mt-3 text-lg font-semibold tracking-[-0.03em] ${item.accent}`}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 p-4 md:p-6 xl:grid-cols-[1.05fr_0.95fr] xl:p-8">
                        <section className="space-y-4">
                            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4">
                                <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/38">
                                    <span>{labels.overlayTitle}</span>
                                    <span>{result.measuredAt.slice(0, 10)}</span>
                                </div>
                                <div className="relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={result.imageDataUrl} alt={labels.title} className="aspect-4/5 w-full object-cover" />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.42))]" />
                                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d={overlayContour} fill="rgba(125, 211, 252, 0.04)" stroke="rgba(125, 211, 252, 0.96)" strokeWidth="0.45" strokeDasharray="1.35 1.1" />
                                        {proportionGuides.map((segment, index) => {
                                            const [start, end] = segment;
                                            const startPoint = toPercent(start);
                                            const endPoint = toPercent(end);
                                            return (
                                                <line
                                                    key={`guide-${index}`}
                                                    x1={startPoint.x}
                                                    y1={startPoint.y}
                                                    x2={endPoint.x}
                                                    y2={endPoint.y}
                                                    stroke="rgba(255,255,255,0.26)"
                                                    strokeWidth="0.2"
                                                    strokeDasharray="1.1 1.25"
                                                />
                                            );
                                        })}
                                        <line
                                            x1={toPercent(centerLine[0]).x}
                                            y1={toPercent(centerLine[0]).y}
                                            x2={toPercent(centerLine[1]).x}
                                            y2={toPercent(centerLine[1]).y}
                                            stroke="rgba(226,232,240,0.34)"
                                            strokeWidth="0.2"
                                            strokeDasharray="1 1.25"
                                        />
                                        {facialFeaturePaths.map((feature, index) => (
                                            <path
                                                key={`feature-${index}`}
                                                d={linePath(feature.points, feature.close)}
                                                fill="none"
                                                stroke={feature.color}
                                                strokeWidth={feature.width}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        ))}
                                        {[
                                            { points: result.overlay.foreheadWidth, color: "rgba(245, 208, 132, 0.62)" },
                                            { points: result.overlay.cheekboneWidth, color: "rgba(134, 239, 172, 0.62)" },
                                            { points: result.overlay.jawWidth, color: "rgba(251, 146, 180, 0.58)" },
                                            { points: result.overlay.chinWidth, color: "rgba(196, 181, 253, 0.6)" },
                                            { points: result.overlay.faceHeight, color: "rgba(191, 219, 254, 0.56)" },
                                        ].map((segment, index) => {
                                            const [start, end] = segment.points;
                                            const startPoint = toPercent(start);
                                            const endPoint = toPercent(end);
                                            return (
                                                <line
                                                    key={index}
                                                    x1={startPoint.x}
                                                    y1={startPoint.y}
                                                    x2={endPoint.x}
                                                    y2={endPoint.y}
                                                    stroke={segment.color}
                                                    strokeWidth="0.34"
                                                    strokeDasharray="1.35 1.1"
                                                />
                                            );
                                        })}
                                        {[result.overlay.faceHeight[0], result.overlay.faceHeight[1], result.overlay.browLine, result.overlay.noseBase].map((point, index) => {
                                            const current = toPercent(point);
                                            return (
                                                <circle
                                                    key={`anchor-${index}`}
                                                    cx={current.x}
                                                    cy={current.y}
                                                    r="0.52"
                                                    fill="rgba(255,255,255,0.88)"
                                                    stroke="rgba(15,23,42,0.9)"
                                                    strokeWidth="0.15"
                                                />
                                            );
                                        })}
                                        {guideLabels.map((item) => (
                                            <g key={item.label}>
                                                <rect
                                                    x={item.x - 5.7}
                                                    y={item.y - 2.65}
                                                    width="11.4"
                                                    height="5.1"
                                                    rx="2.1"
                                                    fill="rgba(2, 6, 23, 0.76)"
                                                    stroke="rgba(255,255,255,0.12)"
                                                    strokeWidth="0.18"
                                                />
                                                <text x={item.x} y={item.y + 0.55} textAnchor="middle" fontSize="2.05" fill="white" letterSpacing="0.08">
                                                    {item.label}
                                                </text>
                                            </g>
                                        ))}
                                    </svg>
                                    <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                                        <div className="rounded-full border border-white/12 bg-black/42 px-3 py-1 text-xs font-semibold text-white/88 backdrop-blur-xl">
                                            {shapeCopy.name}
                                        </div>
                                        <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-xl">
                                            {labels.secondaryShape}: {secondaryCopy.name}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">{labels.methodology}</div>
                                    <p className="mt-3 text-sm leading-7 text-white/62">{labels.methodologyBody}</p>
                                </div>
                                <div className="rounded-[1.5rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">{labels.overlayTitle}</div>
                                    <p className="mt-3 text-sm leading-7 text-white/62">{labels.overlayBody}</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="rounded-[1.75rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{labels.coreMetrics}</h2>
                                    <span className="text-xs text-white/40">{labels.confidence}: {result.confidence}%</span>
                                </div>
                                <div className="mt-4 grid gap-3">
                                    {metricCards.map((item) => (
                                        <div key={item.label} className="rounded-[1.25rem] border border-white/8 bg-black/18 px-4 py-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm text-white/66">{item.label}</span>
                                                <span className="text-sm font-semibold text-white/90">{item.value}</span>
                                            </div>
                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                                                <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.bar}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{labels.structureRead}</h2>
                                <div className="mt-4 space-y-3">
                                    {summaries.map((item) => (
                                        <div key={item} className="rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-7 text-white/72">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{labels.strengths}</h2>
                                <div className="mt-4 space-y-3">
                                    {shapeCopy.strengths.map((item) => (
                                        <div key={item} className="rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-7 text-white/72">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="grid gap-4 border-t border-white/8 p-4 md:grid-cols-3 md:p-6 xl:p-8">
                        {recommendationSections.map((section) => (
                            <div key={section.title} className="rounded-[1.75rem] border border-white/10 bg-white/4.5 p-5 backdrop-blur-xl">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{section.title}</h3>
                                <div className="mt-4 space-y-3">
                                    {section.items.map((item) => (
                                        <div key={item} className="rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-7 text-white/72">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <button
                        onClick={handleShare}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/8"
                    >
                        <Share2 className="h-4 w-4" />
                        {labels.share}
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        disabled={downloading}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/18 bg-[linear-gradient(180deg,rgba(186,230,253,0.18),rgba(125,211,252,0.12))] px-4 py-3 text-sm font-semibold text-sky-50 backdrop-blur-xl transition hover:bg-[linear-gradient(180deg,rgba(186,230,253,0.24),rgba(125,211,252,0.16))] disabled:opacity-60"
                    >
                        <Download className="h-4 w-4" />
                        {downloading ? "..." : labels.save}
                    </button>
                    <Link
                        href={`/face-shape?lang=${lang}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/8"
                    >
                        <Home className="h-4 w-4" />
                        {labels.home}
                    </Link>
                    <Link
                        href={`/color/test?lang=${lang}&mode=shape`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/8"
                    >
                        <RotateCcw className="h-4 w-4" />
                        {labels.retry}
                    </Link>
                </div>
            </div>
        </>
    );
}
