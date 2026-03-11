"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Check,
    Download,
    Glasses,
    Home,
    Link2,
    RotateCcw,
    Scissors,
    Share2,
    Sparkles,
} from "lucide-react";
import {
    buildExecutiveSummary,
    getFaceShapeCopy,
} from "@/lib/face-shape-content";
import type {
    FacePoint,
    FaceShapeAnalysisResult,
} from "@/lib/face-shape-analysis-official";

function toPercent(point: FacePoint) {
    return { x: point.x * 100, y: point.y * 100 };
}

function linePath(points: FacePoint[], close = false) {
    if (!points.length) return "";
    return points
        .map((point, index) => {
            const { x, y } = toPercent(point);
            return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ")
        .concat(close ? " Z" : "");
}

function pairPath(points?: [FacePoint, FacePoint] | null) {
    if (!points) return "";
    const start = toPercent(points[0]);
    const end = toPercent(points[1]);
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function getBounds(points?: FacePoint[] | null) {
    if (!points?.length) return null;
    return points.reduce(
        (acc, point) => ({
            minX: Math.min(acc.minX, point.x),
            maxX: Math.max(acc.maxX, point.x),
            minY: Math.min(acc.minY, point.y),
            maxY: Math.max(acc.maxY, point.y),
        }),
        {
            minX: points[0].x,
            maxX: points[0].x,
            minY: points[0].y,
            maxY: points[0].y,
        },
    );
}

function getKeywords(shape: string, isKo: boolean) {
    const keywords: Record<string, { ko: string[]; en: string[] }> = {
        oval: { ko: ["계란형", "매끄러운", "황금비율"], en: ["Egg-shape", "Smooth", "Golden Ratio"] },
        round: { ko: ["부드러운", "동안얼굴", "곡선미"], en: ["Soft", "Youthful", "Curved"] },
        square: { ko: ["세련된", "이지적인", "귀족턱"], en: ["Sophisticated", "Intellectual", "Defined Jaw"] },
        heart: { ko: ["입체적인", "샤프한턱선", "매혹적인"], en: ["Dimensional", "Sharp Chin", "Charming"] },
        oblong: { ko: ["우아한", "성숙미", "슬림한"], en: ["Elegant", "Mature", "Slim"] },
        diamond: { ko: ["유니크한", "시크한", "광대매력"], en: ["Unique", "Chic", "Cheekbones"] },
        pear: { ko: ["안정감있는", "부드러운턱선"], en: ["Stable", "Soft Jawline"] },
    };

    return keywords[shape] ? (isKo ? keywords[shape].ko : keywords[shape].en) : [];
}

function getConfidenceDotClass(confidence: number) {
    if (confidence >= 80) return "bg-emerald-400";
    if (confidence >= 65) return "bg-lime-300";
    return "bg-amber-300";
}

interface Props {
    result: FaceShapeAnalysisResult;
    lang: string;
    isKo: boolean;
}

export function FaceShapeResultCardClient({ result, lang, isKo }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const isEnglish = lang === "en";

    const shapeCopy = getFaceShapeCopy(result.faceShape, lang);
    const executiveSummary = buildExecutiveSummary(result, lang);
    const keywords = getKeywords(result.faceShape, isKo).slice(0, 3);

    const locale =
        lang === "ko"
            ? "ko-KR"
            : lang === "ja"
                ? "ja-JP"
                : lang === "zh"
                    ? "zh-CN"
                    : "en-US";
    const measuredDate = Number.isNaN(Date.parse(result.measuredAt))
        ? new Date()
        : new Date(result.measuredAt);
    const localizedDate = measuredDate.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const t = isKo
        ? {
            headerTitle: "AI 얼굴형 분석",
            resultLabel: "분석 결과",
            verified: "AI Verified",
            analysisSummary: "분석 요약",
            ratio: "가로세로 비율",
            widthRatio: "상하 너비 비율",
            jawAngle: "하악각",
            thirds: "안면 3분할",
            ideal: "이상적 비율 1:1:1",
            upperThird: "상안부",
            middleThird: "중안부",
            lowerThird: "하안부",
            strengths: "잘 어울리는 포인트",
            prescriptions: "스타일 처방",
            hair: "헤어스타일",
            eyewear: "아이웨어",
            contour: "컨투어링",
            hairline: "헤어라인",
            browLine: "눈썹 하연선",
            noseBase: "코밑선",
            chinLine: "턱끝선",
            share: "공유",
            save: "저장",
            saving: "저장 중",
            home: "홈",
            retry: "다시 분석",
            copied: "링크를 복사했습니다.",
            saved: "결과 이미지를 저장했습니다.",
            shareModalTitle: "결과 링크 공유",
            copyLink: "링크 복사",
            close: "닫기",
            failedSave: "이미지 저장에 실패했습니다.",
            adPending: "광고 대기중",
        }
        : {
            headerTitle: "AI Face Shape Analysis",
            resultLabel: "Result",
            verified: "AI Verified",
            analysisSummary: "Summary",
            ratio: "Length Ratio",
            widthRatio: "Upper/Lower Width",
            jawAngle: "Jaw Angle",
            thirds: "Facial Thirds",
            ideal: "Ideal 1:1:1",
            upperThird: "Upper",
            middleThird: "Middle",
            lowerThird: "Lower",
            strengths: "Best Styling Points",
            prescriptions: "Style Prescription",
            hair: "Hairstyle",
            eyewear: "Eyewear",
            contour: "Contouring",
            hairline: "Hairline",
            browLine: "Brow Lower Line",
            noseBase: "Nose Base",
            chinLine: "Chin Line",
            share: "Share",
            save: "Save",
            saving: "Saving",
            home: "Home",
            retry: "Analyze Again",
            copied: "Link copied.",
            saved: "Result image saved.",
            shareModalTitle: "Share Result Link",
            copyLink: "Copy Link",
            close: "Close",
            failedSave: "Failed to save image.",
            adPending: "Ad Pending",
        };

    const topPoint = result.overlay.faceHeight[0];
    const chinPoint = result.overlay.faceHeight[1];
    const browPoint = result.overlay.browLine;
    const nosePoint = result.overlay.noseBase;
    const contourPath = linePath(result.overlay.contour, true);
    const axisPath = pairPath(result.overlay.centerLine);
    const contourBounds = getBounds(result.overlay.contour);
    const axisX = result.overlay.centerLine
        ? (result.overlay.centerLine[0].x + result.overlay.centerLine[1].x) / 2
        : (topPoint.x + chinPoint.x) / 2;
    const guideLabelLeft = `${clamp(((contourBounds?.minX ?? 0.18) * 100) - 13, 3.5, 10)}%`;

    const guideItems = [
        {
            key: "hairline",
            label: t.hairline,
            y: topPoint.y,
            lineColor: "#e5a321",
            chipClass: "border-[rgba(241,185,77,0.7)] bg-[rgba(0,0,0,0.72)] text-[#ffd88f]",
        },
        {
            key: "brow",
            label: t.browLine,
            y: browPoint.y,
            lineColor: "#2cb7ff",
            chipClass: "border-[rgba(91,200,255,0.7)] bg-[rgba(0,0,0,0.72)] text-[#b8ebff]",
        },
        {
            key: "nose",
            label: t.noseBase,
            y: nosePoint.y,
            lineColor: "#ff5252",
            chipClass: "border-[rgba(255,116,116,0.7)] bg-[rgba(0,0,0,0.72)] text-[#ffc5c5]",
        },
        {
            key: "chin",
            label: t.chinLine,
            y: chinPoint.y,
            lineColor: "#e5a321",
            chipClass: "border-[rgba(241,185,77,0.7)] bg-[rgba(0,0,0,0.72)] text-[#ffd88f]",
        },
    ];

    const metricCards = [
        { label: t.ratio, value: `1 : ${result.metrics.faceLengthToWidth.toFixed(2)}` },
        { label: t.widthRatio, value: `${result.metrics.foreheadToJaw.toFixed(2)} : 1` },
        { label: t.jawAngle, value: `${result.metrics.jawAngle.toFixed(1)}°` },
    ];

    const thirds = [
        { label: t.upperThird, value: result.metrics.upperThird },
        { label: t.middleThird, value: result.metrics.middleThird },
        { label: t.lowerThird, value: result.metrics.lowerThird },
    ];
    const maxThirdValue = Math.max(...thirds.map((item) => item.value), 33.3);

    const highlightPoints = shapeCopy.strengths.slice(0, 2);
    const prescriptionCards = [
        {
            key: "hair",
            title: t.hair,
            items: shapeCopy.hairstyle.slice(0, 3),
            icon: Scissors,
            iconClass: "bg-[#15263d] text-[#53a9ff]",
            bulletClass: "bg-[#53a9ff]",
        },
        {
            key: "eyewear",
            title: t.eyewear,
            items: shapeCopy.eyewear.slice(0, 3),
            icon: Glasses,
            iconClass: "bg-[#24213a] text-[#8f87ff]",
            bulletClass: "bg-[#8f87ff]",
        },
        {
            key: "contour",
            title: t.contour,
            items: shapeCopy.contour.slice(0, 3),
            icon: Sparkles,
            iconClass: "bg-[#2f2217] text-[#f0b35d]",
            bulletClass: "bg-[#f0b35d]",
        },
    ];

    const confidenceDotClass = getConfidenceDotClass(result.confidence);
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const showTemporaryToast = (message: string) => {
        setToastMessage(message);
        window.setTimeout(() => setToastMessage(null), 2500);
    };

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ url: shareUrl });
                return;
            } catch (error) {
                if ((error as Error).name === "AbortError") return;
            }
        }
        setShowShareModal(true);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowShareModal(false);
            showTemporaryToast(t.copied);
        } catch {
            try {
                const textarea = document.createElement("textarea");
                textarea.value = shareUrl;
                textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                const copied = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (copied) {
                    setShowShareModal(false);
                    showTemporaryToast(t.copied);
                    return;
                }
            } catch {
                // Fall through to prompt fallback.
            }
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const htmlToImage = await import("html-to-image");
            const dataUrl = await htmlToImage.toPng(cardRef.current, {
                backgroundColor: "#050505",
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `findcore-face-${result.faceShape}.png`;
            link.href = dataUrl;
            link.click();
            showTemporaryToast(t.saved);
        } catch (error) {
            console.error("Capture failed", error);
            alert(t.failedSave);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div
            className={`mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 pb-10 sm:px-6 ${isKo ? "font-korean" : isEnglish ? "font-cinzel" : ""}`}
        >
            {toastMessage && (
                <div className="pointer-events-none fixed left-1/2 top-8 z-50 -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(36,37,40,0.92)] px-5 py-3 shadow-2xl backdrop-blur-2xl">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                            <Check className="h-3 w-3 text-white" />
                        </span>
                        <span className="text-sm font-medium text-white">
                            {toastMessage}
                        </span>
                    </div>
                </div>
            )}

            {showShareModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.65)] backdrop-blur-sm"
                    onClick={() => setShowShareModal(false)}
                >
                    <div
                        className="w-full max-w-md rounded-t-[30px] border border-[rgba(255,255,255,0.1)] bg-[#111214] p-6 pb-8 text-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mx-auto mb-6 h-1 w-14 rounded-full bg-[rgba(255,255,255,0.15)]" />
                        <h3 className="text-center text-xl font-bold">
                            {t.shareModalTitle}
                        </h3>
                        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]">
                                URL
                            </p>
                            <p className="mt-2 break-all text-sm text-[rgba(255,255,255,0.88)]">
                                {shareUrl}
                            </p>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-[rgba(255,255,255,0.9)]"
                        >
                            <Link2 className="h-5 w-5" />
                            <span>{t.copyLink}</span>
                        </button>
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="mt-3 w-full py-3 text-sm font-medium text-[rgba(255,255,255,0.55)]"
                        >
                            {t.close}
                        </button>
                    </div>
                </div>
            )}

            <div
                ref={cardRef}
                className="overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[#050505] text-white shadow-[0_28px_120px_-40px_rgba(255,255,255,0.28)]"
            >
                <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-6 py-4 sm:px-8 sm:py-5">
                    <div className="flex items-center">
                        <span className="font-cinzel text-[13px] font-light tracking-[0.26em] text-[rgba(255,255,255,0.88)] sm:text-[18px]">
                            FINDCORE
                        </span>
                    </div>
                    <p className="text-right text-[9px] font-semibold tracking-[0.08em] text-[rgba(255,255,255,0.52)] sm:text-[12px]">
                        {t.headerTitle} · {localizedDate}
                    </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <section className="border-b border-[rgba(255,255,255,0.08)] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                        <div className="mx-auto w-full max-w-[640px]">
                            <div className="relative aspect-4/5 overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.1)] bg-black">
                                <Image
                                    src={result.imageDataUrl}
                                    alt="Face analysis"
                                    fill
                                    priority
                                    unoptimized
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.28)] via-transparent to-[rgba(0,0,0,0.82)]" />

                                <div className="absolute left-5 top-5 z-30">
                                    <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.55)] px-3 py-1.5 backdrop-blur-xl">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${confidenceDotClass}`}
                                        />
                                        <span className="font-cinzel text-[10px] font-semibold tracking-[0.04em] text-[rgba(255,255,255,0.92)]">
                                            {t.verified} {result.confidence.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                <svg
                                    className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                >
                                    {guideItems.map((guide) => (
                                        <line
                                            key={guide.key}
                                            x1="0"
                                            y1={guide.y * 100}
                                            x2="100"
                                            y2={guide.y * 100}
                                            stroke={guide.lineColor}
                                            strokeWidth="0.3"
                                        />
                                    ))}
                                    {axisPath && (
                                        <path
                                            d={axisPath}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.34)"
                                            strokeWidth="0.22"
                                            strokeDasharray="1 0.9"
                                        />
                                    )}
                                    {contourPath && (
                                        <>
                                            <path
                                                d={contourPath}
                                                fill="none"
                                                stroke="rgba(82,116,255,0.68)"
                                                strokeWidth="0.52"
                                            />
                                            <path
                                                d={contourPath}
                                                fill="none"
                                                stroke="rgba(255,255,255,0.9)"
                                                strokeWidth="0.18"
                                            />
                                        </>
                                    )}
                                    {guideItems.map((guide) => (
                                        <circle
                                            key={`${guide.key}-point`}
                                            cx={axisX * 100}
                                            cy={guide.y * 100}
                                            r="1.45"
                                            fill={guide.lineColor}
                                            stroke="rgba(255,255,255,0.95)"
                                            strokeWidth="0.34"
                                        />
                                    ))}
                                </svg>

                                <div className="pointer-events-none absolute inset-0 z-30">
                                    {guideItems.map((guide) => (
                                        <div
                                            key={`${guide.key}-chip`}
                                            className="absolute"
                                            style={{
                                                top: `${guide.y * 100}%`,
                                                left: guideLabelLeft,
                                                transform: "translateY(-50%)",
                                            }}
                                        >
                                            <span
                                                className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-tight shadow-lg ${guide.chipClass}`}
                                            >
                                                {guide.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute inset-x-0 bottom-0 z-30 bg-linear-to-t from-black via-[rgba(0,0,0,0.78)] to-transparent px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
                                    {keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {keywords.map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className="rounded-sm border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[rgba(255,255,255,0.9)]"
                                                >
                                                    #{keyword}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.38)]">
                                        {t.resultLabel}
                                    </p>
                                    <h1 className="mt-1 text-[28px] font-black tracking-tight text-white sm:text-[34px] lg:text-[40px]">
                                        {shapeCopy.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="p-5 sm:p-7 lg:p-8">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-[24px] font-black tracking-tight text-white sm:text-[28px] lg:text-[34px]">
                                    {t.analysisSummary}
                                </h2>
                                <p className="mt-2 max-w-3xl text-[12px] font-medium leading-[1.72] text-[rgba(255,255,255,0.78)] sm:text-[13px] lg:text-[15px]">
                                    {executiveSummary}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {metricCards.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-4 py-4"
                                    >
                                        <p className="text-[10px] font-semibold text-[rgba(255,255,255,0.44)]">
                                            {metric.label}
                                        </p>
                                        <p className="mt-2 text-[24px] font-black tracking-tight text-white tabular-nums sm:text-[28px]">
                                            {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-[26px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-[17px] font-black tracking-tight text-white sm:text-[19px]">
                                        {t.thirds}
                                    </h3>
                                    <span className="text-[10px] font-medium text-[rgba(255,255,255,0.42)]">
                                        {t.ideal}
                                    </span>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {thirds.map((segment) => (
                                        <div
                                            key={segment.label}
                                            className="grid grid-cols-[78px_minmax(0,1fr)_64px] items-center gap-3 sm:grid-cols-[94px_minmax(0,1fr)_78px] sm:gap-4"
                                        >
                                            <span className="text-[11px] font-semibold text-[rgba(255,255,255,0.78)] sm:text-[12px]">
                                                {segment.label}
                                            </span>
                                            <div className="h-3 overflow-hidden rounded-full bg-[rgba(0,0,0,0.7)]">
                                                <div
                                                    className="h-full rounded-full bg-linear-to-r from-[#2678ff] via-[#418fff] to-[#68bbff]"
                                                    style={{
                                                        width: `${(segment.value / maxThirdValue) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-right text-[14px] font-bold text-white tabular-nums sm:text-[16px]">
                                                {segment.value.toFixed(1)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[17px] font-black tracking-tight text-white sm:text-[19px]">
                                    {t.strengths}
                                </h3>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    {highlightPoints.map((point, index) => (
                                        <div
                                            key={point}
                                            className="flex items-start gap-3 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-4"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[10px] font-bold text-[rgba(255,255,255,0.9)]">
                                                {index + 1}
                                            </span>
                                            <p className="text-[12px] font-medium leading-relaxed text-[rgba(255,255,255,0.86)] sm:text-[13px]">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="border-t border-[rgba(255,255,255,0.08)] px-5 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
                    <h3 className="text-[24px] font-black tracking-tight text-white sm:text-[28px] lg:text-[34px]">
                        {t.prescriptions}
                    </h3>
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                        {prescriptionCards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.key}
                                    className="rounded-[26px] border border-[rgba(255,255,255,0.08)] bg-[#101114] p-5"
                                >
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconClass}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h4 className="text-[15px] font-black tracking-tight text-white sm:text-[16px]">
                                            {card.title}
                                        </h4>
                                    </div>
                                    <ul className="mt-4 space-y-2.5">
                                        {card.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-[12px] leading-relaxed text-[rgba(255,255,255,0.78)] sm:text-[13px]"
                                            >
                                                <span
                                                    className={`mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full ${card.bulletClass}`}
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <div className="border-t border-[rgba(255,255,255,0.08)] bg-[#09090a] px-6 py-7 text-center sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(255,255,255,0.34)]">
                        {t.adPending}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.08)] bg-[#050505] px-6 py-5 sm:px-8">
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.46)]">
                        FINDCORE.ME
                    </p>
                    <a
                        href="https://t.me/todayshelp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white transition hover:text-cyan-200"
                    >
                        <span className="font-cinzel text-[15px] tracking-[0.08em]">Telegram</span>
                        <span className="font-cinzel text-[11px] tracking-[0.06em] text-[rgba(255,255,255,0.72)]">
                            @todayshelp
                        </span>
                    </a>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[rgba(255,255,255,0.12)]"
                >
                    <Share2 className="h-5 w-5" />
                    <span>{t.share}</span>
                </button>
                <button
                    onClick={handleDownloadImage}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-[rgba(255,255,255,0.9)] disabled:cursor-not-allowed disabled:bg-[rgba(255,255,255,0.7)]"
                >
                    {downloading ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[rgba(0,0,0,0.2)] border-t-black" />
                    ) : (
                        <Download className="h-5 w-5" />
                    )}
                    <span>{downloading ? t.saving : t.save}</span>
                </button>
                <Link
                    href={`/?lang=${lang}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-5 py-4 text-sm font-semibold text-[rgba(255,255,255,0.82)] transition hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                >
                    <Home className="h-5 w-5" />
                    <span>{t.home}</span>
                </Link>
                <Link
                    href={`/face-shape?lang=${lang}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-5 py-4 text-sm font-semibold text-[rgba(255,255,255,0.82)] transition hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
                >
                    <RotateCcw className="h-5 w-5" />
                    <span>{t.retry}</span>
                </Link>
            </div>
        </div>
    );
}
