"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Check,
    Download,
    Home,
    Link2,
    RotateCcw,
    Share2,
    Scissors,
    Glasses,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { getFaceShapeCopy } from "@/lib/face-shape-content";
import type {
    FacePoint,
    FaceShapeAnalysisResult,
    FaceShapeQuality,
    FaceShapeQualityFlag,
} from "@/lib/face-shape-analysis-official";

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function deriveLegacyQuality(result: FaceShapeAnalysisResult): FaceShapeQuality {
    const confidence = result.confidence ?? 76;
    const symmetry = result.metrics?.symmetry ?? 88;
    const hairline = typeof result.overlay?.hairlineReliability === "number" ? result.overlay.hairlineReliability : 64;
    const classification = clamp(Math.round(confidence + 6), 58, 99);
    const image = clamp(Math.round(confidence * 0.9), 52, 92);
    const frame = clamp(Math.round(hairline * 0.72 + symmetry * 0.18), 48, 95);
    const measurement = clamp(Math.round(frame * 0.58 + image * 0.42), 50, 96);
    const margin = clamp(Math.round(confidence + 12), 55, 99);
    const pose = clamp(Math.round(symmetry * 0.96), 60, 99);
    const sharpness = clamp(image - 8, 45, 90);
    const lighting = clamp(image + 4, 50, 95);
    const coverage = clamp(image - 6, 48, 90);
    const flags: FaceShapeQualityFlag[] = [];
    return { classification, measurement, image, frame, margin, pose, sharpness, lighting, coverage, flags };
}

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
    const [start, end] = points;
    const a = toPercent(start);
    const b = toPercent(end);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

function getKeywords(shape: string, isKo: boolean) {
    const keywords: Record<string, { ko: string[], en: string[] }> = {
        oval: { ko: ["계란형", "매끄러운", "황금비율"], en: ["EggShape", "Smooth", "GoldenRatio"] },
        round: { ko: ["부드러운", "동안얼굴", "곡선미"], en: ["Soft", "Youthful", "Curved"] },
        square: { ko: ["세련된", "이지적인", "귀족턱"], en: ["Sophisticated", "Intellectual", "DefinedJaw"] },
        heart: { ko: ["입체적인", "샤프한턱선", "매혹적인"], en: ["Dimensional", "SharpChin", "Charming"] },
        oblong: { ko: ["우아한", "성숙미", "슬림한"], en: ["Elegant", "Mature", "Slim"] },
        diamond: { ko: ["유니크한", "시크한", "광대매력"], en: ["Unique", "Chic", "AttractiveCheekbones"] },
        pear: { ko: ["안정감있는", "부드러운턱선"], en: ["Stable", "SoftJawline"] }
    };
    return keywords[shape] ? (isKo ? keywords[shape].ko : keywords[shape].en) : [];
}

interface FaceShapeResultCardProps {
    result: FaceShapeAnalysisResult;
    lang: string;
    isKo: boolean;
}

export function FaceShapeResultCardClient({ result, lang, isKo }: FaceShapeResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(3 / 4); // Default portrait
    const contourGradientId = useId().replace(/:/g, "");

    // Measure natural image aspect ratio to prevent SVG distortion
    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                setImageAspectRatio(img.naturalWidth / img.naturalHeight);
            }
        };
        img.src = result.imageDataUrl;
    }, [result.imageDataUrl]);

    const shapeCopy = getFaceShapeCopy(result.faceShape, lang);
    const quality = result.quality ?? deriveLegacyQuality(result);
    const overlayContour = linePath(result.overlay.contour, true);
    const hairlineReliability = typeof result.overlay.hairlineReliability === "number" ? result.overlay.hairlineReliability : 64;
    const hairlinePath = linePath(result.overlay.hairlineContour ?? []);
    const facialFeaturePaths = [
        { key: "leftEyebrow", path: linePath(result.overlay.leftEyebrow ?? []) },
        { key: "rightEyebrow", path: linePath(result.overlay.rightEyebrow ?? []) },
        { key: "leftEye", path: linePath(result.overlay.leftEye ?? [], true) },
        { key: "rightEye", path: linePath(result.overlay.rightEye ?? [], true) },
        { key: "noseBridge", path: linePath(result.overlay.noseBridge ?? []) },
        { key: "noseBaseGuide", path: linePath(result.overlay.noseBaseGuide ?? []) },
        { key: "mouthOuter", path: linePath(result.overlay.mouthOuter ?? [], true) },
    ].filter((item) => item.path);
    const overlayGuides = [
        { key: "faceHeight", path: pairPath(result.overlay.faceHeight), stroke: "rgba(255,255,255,0.5)", width: 0.35, dash: "1.8 1.3" },
        { key: "centerLine", path: pairPath(result.overlay.centerLine), stroke: "rgba(255,255,255,0.25)", width: 0.25, dash: "1.1 1.1" },
        { key: "foreheadWidth", path: pairPath(result.overlay.foreheadWidth), stroke: "rgba(255,255,255,0.55)", width: 0.32 },
        { key: "cheekboneWidth", path: pairPath(result.overlay.cheekboneWidth), stroke: "rgba(255,255,255,0.55)", width: 0.32 },
        { key: "jawWidth", path: pairPath(result.overlay.jawWidth), stroke: "rgba(255,255,255,0.55)", width: 0.32 },
        { key: "chinWidth", path: pairPath(result.overlay.chinWidth), stroke: "rgba(255,255,255,0.45)", width: 0.3 },
        { key: "upperThirdGuide", path: pairPath(result.overlay.upperThirdGuide), stroke: "rgba(255,255,255,0.3)", width: 0.24, dash: "1.1 1.2" },
        { key: "middleThirdGuide", path: pairPath(result.overlay.middleThirdGuide), stroke: "rgba(255,255,255,0.3)", width: 0.24, dash: "1.1 1.2" },
    ].filter((guide) => guide.path);

    const locale = lang === "ko" ? "ko-KR" : lang === "ja" ? "ja-JP" : lang === "zh" ? "zh-CN" : "en-US";
    const measuredDate = Number.isNaN(Date.parse(result.measuredAt)) ? new Date() : new Date(result.measuredAt);
    const timestamp = measuredDate.toLocaleString(locale, {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const keywords = getKeywords(result.faceShape, isKo);
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const uiText = {
        ko: {
            shareTitle: `나의 얼굴형 분석: ${shapeCopy.name} ✨`,
            shareText: `저의 얼굴형은 "${shapeCopy.name}"이에요!\n\n당신만의 골격을 파악하고 스타일링을 추천받으세요 👇\nhttps://findcore.me/face-shape`,
            copied: "복사됨!",
            share: "공유하기",
            save: "이미지 저장",
            reportTitle: "AI 얼굴형 분석",
            generatedOn: "분석 일시",
            determinedType: "분석 결과",
            probLabel: "분석 정확도",
            structAnalysis: "골격 수치",
            ratio: "가로세로 비율",
            widthRatio: "상하 너비 비율",
            jawAngle: "하악각",
            thirds: "안면 3분할",
            upperThird: "상안부",
            middleThird: "중안부",
            lowerThird: "하안부",
            prescriptions: "스타일 처방",
            hair: "헤어스타일",
            eye: "아이웨어",
            contour: "컨투어링",
            confidenceLevel: "분석 점수",
            symmetryLabel: "대칭성",
            hairlineLabel: "헤어라인 신뢰도",
            summaryLabel: "분석 요약",
            strengthsLabel: "핵심 강점",
            retest: "다시하기",
            ideal: "이상적 비율 1:1:1",
            adStatus: "광고대기중",
            copyLink: "링크를 복사하세요:",
            failedSave: "이미지 저장에 실패했습니다.",
        },
        en: {
            shareTitle: `My Face Shape: ${shapeCopy.name} ✨`,
            shareText: `My face shape is "${shapeCopy.name}"!\n\nFind out your face shape and get styling tips 👇\nhttps://findcore.me/face-shape`,
            copied: "Copied!",
            share: "Share",
            save: "Save Image",
            reportTitle: "AI Face Architecture",
            generatedOn: "Analyzed",
            determinedType: "Result",
            probLabel: "Analysis Confidence",
            structAnalysis: "Structural Metrics",
            ratio: "Length : Width",
            widthRatio: "Forehead : Jaw",
            jawAngle: "Jaw Angle",
            thirds: "Facial Thirds",
            upperThird: "Upper",
            middleThird: "Middle",
            lowerThird: "Lower",
            prescriptions: "Style Guide",
            hair: "Hairstyle",
            eye: "Eyewear",
            contour: "Contouring",
            confidenceLevel: "Confidence",
            symmetryLabel: "Symmetry",
            hairlineLabel: "Hairline",
            summaryLabel: "Summary",
            strengthsLabel: "Key Strengths",
            retest: "Retest",
            ideal: "Ideal 1:1:1",
            adStatus: "Ad Pending",
            copyLink: "Copy this link:",
            failedSave: "Failed to save image.",
        },
        zh: {
            shareTitle: `我的脸型: ${shapeCopy.name} ✨`,
            shareText: `我的脸型是 "${shapeCopy.name}"!\n\n快来测试你的专属脸型 👇\nhttps://findcore.me/face-shape`,
            copied: "已复制!",
            share: "分享",
            save: "保存图片",
            reportTitle: "AI 面部轮廓分析",
            generatedOn: "分析时间",
            determinedType: "分析结果",
            probLabel: "分析准确度",
            structAnalysis: "骨骼比例",
            ratio: "长宽比",
            widthRatio: "额颌比",
            jawAngle: "下颌角",
            thirds: "面部三庭",
            upperThird: "上庭",
            middleThird: "中庭",
            lowerThird: "下庭",
            prescriptions: "造型建议",
            hair: "发型",
            eye: "眼镜",
            contour: "修容",
            confidenceLevel: "分析得分",
            symmetryLabel: "对称性",
            hairlineLabel: "发际线",
            summaryLabel: "分析摘要",
            strengthsLabel: "核心优势",
            retest: "重新测试",
            ideal: "理想比例 1:1:1",
            adStatus: "广告待处理",
            copyLink: "复制链接:",
            failedSave: "图片保存失败。",
        },
        ja: {
            shareTitle: `私の顔型: ${shapeCopy.name} ✨`,
            shareText: `私の顔型は「${shapeCopy.name}」でした！\n\n診断してスタイリング提案を受けましょう 👇\nhttps://findcore.me/face-shape`,
            copied: "コピー完了!",
            share: "共有する",
            save: "画像保存",
            reportTitle: "AI 顔型分析",
            generatedOn: "分析日時",
            determinedType: "分析結果",
            probLabel: "分析信頼度",
            structAnalysis: "骨格数値",
            ratio: "縦横比",
            widthRatio: "額顎比",
            jawAngle: "顎の角度",
            thirds: "顔の3分位",
            upperThird: "上部",
            middleThird: "中部",
            lowerThird: "下部",
            prescriptions: "スタイルガイド",
            hair: "ヘアスタイル",
            eye: "眼鏡",
            contour: "メイク",
            confidenceLevel: "スコア",
            symmetryLabel: "対称性",
            hairlineLabel: "ヘアライン",
            summaryLabel: "分析サマリー",
            strengthsLabel: "強み",
            retest: "もう一度",
            ideal: "理想比率 1:1:1",
            adStatus: "広告待機中",
            copyLink: "リンクをコピー:",
            failedSave: "画像の保存に失敗しました。",
        }
    };

    const t = uiText[lang as keyof typeof uiText] || uiText.en;

    const heroMetrics = [
        { label: t.ratio, value: `1 : ${result.metrics.faceLengthToWidth.toFixed(2)}` },
        { label: t.widthRatio, value: `${result.metrics.foreheadToJaw.toFixed(2)} : 1` },
        { label: t.jawAngle, value: `${result.metrics.jawAngle.toFixed(1)}°` },
    ];

    const qualityMetrics = [
        { label: t.probLabel, value: `${quality.frame.toFixed(1)}%` },
        { label: t.confidenceLevel, value: `${result.confidence.toFixed(1)}%` },
        { label: t.symmetryLabel, value: `${result.metrics.symmetry.toFixed(1)}%` },
        { label: t.hairlineLabel, value: `${hairlineReliability.toFixed(1)}%` },
    ];

    const thirds = [
        { label: t.upperThird, value: result.metrics.upperThird },
        { label: t.middleThird, value: result.metrics.middleThird },
        { label: t.lowerThird, value: result.metrics.lowerThird },
    ];

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
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setShowShareModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
                return;
            } catch { }
        }
        try {
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            textArea.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (ok) {
                setShowShareModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            } else {
                prompt(t.copyLink, shareUrl);
            }
        } catch {
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const mod = await import("html-to-image");
            // Find the image wrapper inside to get its dimensions
            const dataUrl = await mod.toPng(cardRef.current, {
                backgroundColor: "#000000",
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `findcore-face-${result.faceShape}.png`;
            link.href = dataUrl;
            link.click();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (error) {
            console.error("Capture failed", error);
            alert(t.failedSave);
        } finally {
            setDownloading(false);
        }
    };

    const prescriptionIcons = [Scissors, Glasses, Sparkles];

    return (
        <div className="w-full bg-[#161618] min-h-screen py-10 px-4 md:px-8">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#2C2C2E]/90 backdrop-blur-3xl px-6 py-4 rounded-full border border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-white font-medium text-[15px]">{t.copied}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowShareModal(false)}>
                    <div
                        className="w-full max-w-sm bg-[#1C1C1E] rounded-[32px] p-8 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-white font-semibold text-xl text-center mb-6">{t.share}</h3>
                        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5">
                            <p className="text-white/90 text-sm truncate font-medium text-center">{shareUrl}</p>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="w-full py-4 rounded-2xl bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-600"
                        >
                            <Link2 className="w-5 h-5" />
                            <span className="text-[15px]">{lang === 'ko' ? '링크 복사' : lang === 'ja' ? 'リンクをコピー' : lang === 'zh' ? '复制链接' : 'Copy Link'}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* ═══════════════ MAIN WIDE CARD (Apple Style) ═══════════════ */}
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

                <div
                    ref={cardRef}
                    className="relative w-full flex flex-col overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl"
                >
                    {/* Header Strip inside Card */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/50 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <h2 className="text-sm font-cinzel tracking-[0.2em] font-medium text-white/50">FINDCORE</h2>
                        </div>
                        <p className="text-[11px] text-white/50 font-medium uppercase tracking-wider">{t.reportTitle} &bull; {timestamp.split("오")[0]}</p>
                    </div>

                    {/* HORIZONTAL GRID SPLIT */}
                    <div className="flex flex-col md:flex-row w-full h-full">

                        {/* ── LEFT COLUMN: Image & Tags (Perfect Aspect Ratio) ── */}
                        <div className="w-full md:w-[45%] flex flex-col bg-black border-r border-white/5 relative items-center justify-center p-6 md:p-8">

                            {/* The Image Container locking to exact aspect ratio to prevent SVG distortion */}
                            <div
                                className="relative w-full rounded-[24px] overflow-hidden bg-[#161618] border border-white/10 shadow-xl"
                                style={{ aspectRatio: imageAspectRatio }}
                            >
                                <Image
                                    src={result.imageDataUrl}
                                    alt="Face Scan"
                                    fill
                                    priority
                                    unoptimized
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />

                                {/* Perfect 1:1 mapped SVG overlay */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={contourGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                                        </linearGradient>
                                    </defs>
                                    {overlayContour && (
                                        <path d={overlayContour} fill="rgba(59,130,246,0.05)" stroke={`url(#${contourGradientId})`} strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                                    )}
                                    {hairlinePath && (
                                        <path d={hairlinePath} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="2 2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                                    )}
                                    {overlayGuides.map((guide) => (
                                        <path key={guide.key} d={guide.path} fill="none" stroke={guide.stroke} strokeWidth={guide.width} strokeDasharray={guide.dash} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                    ))}
                                    {facialFeaturePaths.map((feature) => (
                                        <path key={feature.key} d={feature.path} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                                    ))}
                                </svg>

                                {/* Badges */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between z-30">
                                    <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        <span className="text-[10px] font-medium text-white/90">AI Verified {result.confidence.toFixed(0)}%</span>
                                    </div>
                                </div>

                                {/* Text embedded in image */}
                                <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {keywords.map((k) => (
                                            <span key={k} className="px-2.5 py-1 rounded-md text-[11px] font-medium backdrop-blur-md bg-white/10 text-white/90 border border-white/10">
                                                #{k}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className={`text-4xl font-bold tracking-tight text-white drop-shadow-md`}>
                                        {shapeCopy.name}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN: Tight Apple-Style Grid ── */}
                        <div className={`w-full md:w-[55%] flex flex-col justify-between p-6 md:p-8 md:pl-10 lg:p-12 gap-8 ${isKo ? 'font-korean' : 'font-sans'}`}>

                            {/* Summary Core Block */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-white text-xl font-bold">{t.summaryLabel}</h3>
                                <p className="text-[15px] md:text-base text-white/80 leading-relaxed font-medium">
                                    {shapeCopy.summary}
                                </p>
                            </div>

                            {/* Metrics Grid (Compact) */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                {heroMetrics.map((metric) => (
                                    <div key={metric.label} className="flex flex-col p-4 rounded-3xl bg-[#1C1C1E] border border-white/5 items-center justify-center text-center gap-1">
                                        <p className="text-[11px] text-white/50 font-semibold">{metric.label}</p>
                                        <p className="text-xl font-bold text-white tracking-tight">{metric.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Thirds Bar */}
                            <div className="p-5 rounded-3xl bg-[#1C1C1E] border border-white/5 flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/80 font-semibold text-sm">{t.thirds}</span>
                                    <span className="text-white/40 text-[10px] font-semibold tracking-wider uppercase">{t.ideal}</span>
                                </div>
                                <div className="flex flex-col gap-3.5">
                                    {thirds.map((third, index) => (
                                        <div key={third.label} className="flex items-center gap-3">
                                            <span className="text-xs text-white/60 w-12 shrink-0 font-medium">{third.label}</span>
                                            <div className="flex-1 h-2.5 rounded-full bg-black border border-white/10 overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${third.value}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-white/90 w-10 text-right tabular-nums">{third.value.toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Strengths Grid */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-white text-base font-bold">{t.strengthsLabel}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {shapeCopy.strengths.map((str, i) => (
                                        <div key={str} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-[11px] font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <p className="text-[13px] text-white/80 font-medium leading-tight">{str}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* ── BOTTOM ROW: Style Prescriptions (3-Column Layout) ── */}
                    <div className="p-6 md:p-8 lg:px-12 bg-[#0C0C0E] border-t border-white/5">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-white text-xl font-bold">{t.prescriptions}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: t.hair, txt: shapeCopy.hairstyle, icon: 0, color: "text-blue-400" },
                                    { title: t.eye, txt: shapeCopy.eyewear, icon: 1, color: "text-indigo-400" },
                                    { title: t.contour, txt: shapeCopy.contour, icon: 2, color: "text-purple-400" },
                                ].map((sec) => {
                                    const Icon = prescriptionIcons[sec.icon];
                                    return (
                                        <div key={sec.title} className="flex flex-col p-5 rounded-3xl bg-[#1C1C1E] border border-white/5 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                    <Icon className={`w-4 h-4 ${sec.color}`} />
                                                </div>
                                                <h4 className="text-[15px] font-bold text-white/95">{sec.title}</h4>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {sec.txt.map((item) => (
                                                    <div key={item} className="flex items-start gap-2 text-[13px] text-white/70 font-medium leading-relaxed">
                                                        <span className="text-white/30 text-[10px] mt-1">&bull;</span>
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Ad Placeholder inside card */}
                    <div className="w-full bg-white/5 py-4 border-t border-white/5 flex items-center justify-center">
                        <p className="text-[11px] text-white/40 tracking-widest font-semibold uppercase">{t.adStatus}</p>
                    </div>

                    {/* Premium Footer */}
                    <div className="w-full bg-[#050505] py-5 px-8 md:px-12 flex items-center justify-between border-t border-white/5">
                        <p className="text-white text-[10px] uppercase tracking-[0.2em] font-light">
                            findcore.me
                        </p>
                        <a
                            href="https://t.me/todayshelp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors duration-300"
                        >
                            <span className="font-serif text-[15px] italic tracking-wide group-hover:tracking-wider transition-all">Telegram</span>
                            <span className="font-serif italic text-[11px] font-light opacity-90 group-hover:opacity-100">@todayshelp</span>
                        </a>
                    </div>

                </div>

                {/* ═══════════════ ACTION BUTTONS ═══════════════ */}
                <div className="flex items-center justify-end gap-3 px-2">
                    <Link
                        href={`/?lang=${lang}`}
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white/70 hover:text-white transition-colors border border-white/10 shadow-lg active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/face-shape?lang=${lang}`}
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white/70 hover:text-white transition-colors border border-white/10 shadow-lg active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white/70 hover:text-white transition-colors border border-white/10 shadow-lg active:scale-95"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        disabled={downloading}
                        className="flex items-center justify-center px-6 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] active:scale-95 disabled:opacity-50"
                    >
                        {downloading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        ) : (
                            <Download className="w-5 h-5 mr-2" />
                        )}
                        <span className="text-[15px]">{t.save}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
