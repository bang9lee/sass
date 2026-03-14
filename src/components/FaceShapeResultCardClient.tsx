"use client";

import { useRef, useState } from "react";
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
    resolvePresentedFaceShape,
} from "@/lib/face-shape-content";
import {
    getFaceStyleRecommendations,
    getFaceStyleTargetCopy,
    toFaceStyleTarget,
} from "@/lib/face-shape-style-content";
import { ReportSignatureStrip } from "@/components/report-signature-strip";
import type { SupportedLang } from "@/lib/site-content";
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

function buildFifthGuideXs(guide?: [FacePoint, FacePoint] | null) {
    if (!guide) return [];
    const [left, right] = guide[0].x <= guide[1].x ? guide : [guide[1], guide[0]];
    const width = right.x - left.x;
    if (width <= 0.02) return [];
    return [1, 2, 3, 4].map((step) => left.x + (width * step) / 5);
}

function getKeywords(shape: string, lang: string) {
    const keywords: Record<string, Record<SupportedLang, string[]>> = {
        oval: {
            ko: ["계란형", "매끄러운", "황금비율"],
            en: ["Egg-shape", "Smooth", "Golden Ratio"],
            zh: ["椭圆形", "线条柔和", "比例稳定"],
            ja: ["卵型", "なめらか", "バランス型"],
        },
        round: {
            ko: ["부드러운", "동안얼굴", "곡선미"],
            en: ["Soft", "Youthful", "Curved"],
            zh: ["柔和", "显年轻", "圆润线条"],
            ja: ["やわらかい", "若々しい", "曲線的"],
        },
        square: {
            ko: ["세련된", "이지적인", "귀족턱"],
            en: ["Sophisticated", "Intellectual", "Defined Jaw"],
            zh: ["利落", "知性", "下颌清晰"],
            ja: ["洗練", "知的", "あごライン明確"],
        },
        heart: {
            ko: ["입체적인", "샤프한턱선", "매혹적인"],
            en: ["Dimensional", "Sharp Chin", "Charming"],
            zh: ["立体感", "尖下巴", "吸睛"],
            ja: ["立体感", "シャープなあご", "華やか"],
        },
        oblong: {
            ko: ["긴 얼굴형", "긴 타원형", "성숙미"],
            en: ["Long Oval", "Refined", "Balanced"],
            zh: ["长形", "长椭圆", "成熟感"],
            ja: ["面長", "ロングオーバル", "大人っぽい"],
        },
        diamond: {
            ko: ["유니크한", "시크한", "광대매력"],
            en: ["Unique", "Chic", "Cheekbones"],
            zh: ["个性强", "利落", "颧骨突出"],
            ja: ["個性的", "シック", "頬骨が映える"],
        },
        pear: {
            ko: ["안정감있는", "부드러운턱선"],
            en: ["Stable", "Soft Jawline"],
            zh: ["稳重", "下半脸存在感"],
            ja: ["安定感", "下顔面に重心"],
        },
    };

    const safeLang: SupportedLang = lang === "ko" || lang === "en" || lang === "zh" || lang === "ja" ? lang : "en";
    return keywords[shape] ? keywords[shape][safeLang] : [];
}

function getConfidenceDotClass(confidence: number) {
    if (confidence >= 80) return "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]";
    if (confidence >= 65) return "bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]";
    return "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]";
}

interface Props {
    result: FaceShapeAnalysisResult;
    lang: SupportedLang;
    isKo: boolean;
}

export function FaceShapeResultCardClient({ result, lang, isKo }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardShellRef = useRef<HTMLDivElement>(null);
    const imagePanelRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [includePhoto, setIncludePhoto] = useState(true);
    const isEnglish = lang === "en";
    const safeLang: SupportedLang = lang === "ko" || lang === "en" || lang === "zh" || lang === "ja" ? lang : "en";
    const presentedShape = resolvePresentedFaceShape(result);
    const styleTarget = toFaceStyleTarget(result.styleTarget);
    const styleTargetCopy = getFaceStyleTargetCopy(safeLang);
    const styleRecommendations = getFaceStyleRecommendations(presentedShape, safeLang, styleTarget);

    const shapeCopy = getFaceShapeCopy(presentedShape, safeLang);
    const executiveSummary = buildExecutiveSummary(result, lang);
    const keywords = getKeywords(presentedShape, safeLang).slice(0, 3);
    const masculineContourTitle =
        styleTarget === "masculine"
            ? {
                ko: "윤곽/그루밍 포인트",
                en: "Grooming & Contour",
                zh: "轮廓修饰重点",
                ja: "輪郭とグルーミング",
            }[safeLang]
            : null;

    const t = {
        ko: {
            headerTitle: "AI 전문 얼굴형 분석 리포트",
            resultLabel: "분석 결과",
            verified: "AI 검증",
            analysisSummary: "분석 요약",
            ratio: "가로세로 비율",
            widthRatio: "상하 너비 비율",
            jawAngle: "하악각",
            thirds: "안면 3분할 치수",
            ideal: "이상 비율 1:1:1",
            upperThird: "상안부",
            middleThird: "중안부",
            lowerThird: "하안부",
            strengths: "구조적 강점",
            prescriptions: "스타일 처방",
            hair: "헤어스타일 추천",
            eyewear: "아이웨어 추천",
            contour: "컨투어링 포인트",
            hairline: "헤어라인",
            browLine: "눈썹 연선",
            noseBase: "코끝선",
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
            linkLabel: "링크",
            close: "닫기",
            failedSave: "이미지 저장에 실패했습니다.",
            adPending: "광고대기중",
            contactLabel: "문의 @todayshelp",
            includePhotoLabel: "결과 저장 시 얼굴 사진 포함하기",
        },
        en: {
            headerTitle: "Professional Face Shape Analysis",
            resultLabel: "ANALYSIS RESULT",
            verified: "AI Verified",
            analysisSummary: "Summary",
            ratio: "Length Ratio",
            widthRatio: "Width Ratio",
            jawAngle: "Jaw Angle",
            thirds: "Facial Thirds",
            ideal: "Ideal Ratio 1:1:1",
            upperThird: "Upper",
            middleThird: "Middle",
            lowerThird: "Lower",
            strengths: "Structural Strengths",
            prescriptions: "Style Prescription",
            hair: "Hairstyle",
            eyewear: "Eyewear",
            contour: "Contouring",
            hairline: "Hairline",
            browLine: "Brow Line",
            noseBase: "Nose Base",
            chinLine: "Chin Line",
            share: "Share",
            save: "Save",
            saving: "Saving",
            home: "Home",
            retry: "Retry",
            copied: "Link copied.",
            saved: "Result image saved.",
            shareModalTitle: "Share Result Link",
            copyLink: "Copy Link",
            linkLabel: "URL",
            close: "Close",
            failedSave: "Failed to save image.",
            adPending: "Ad Pending",
            contactLabel: "Contact @todayshelp",
            includePhotoLabel: "Include face photo in saved result",
        },
        zh: {
            headerTitle: "AI 专业脸型分析报告",
            resultLabel: "分析结果",
            verified: "AI 已校验",
            analysisSummary: "分析摘要",
            ratio: "长宽比例",
            widthRatio: "上下宽度比",
            jawAngle: "下颌角",
            thirds: "面部三庭比例",
            ideal: "理想比例 1:1:1",
            upperThird: "上庭",
            middleThird: "中庭",
            lowerThird: "下庭",
            strengths: "结构优势",
            prescriptions: "造型建议",
            hair: "发型建议",
            eyewear: "眼镜建议",
            contour: "修容重点",
            hairline: "发际线",
            browLine: "眉眼线",
            noseBase: "鼻底线",
            chinLine: "下巴线",
            share: "分享",
            save: "保存",
            saving: "保存中",
            home: "首页",
            retry: "重新分析",
            copied: "链接已复制。",
            saved: "结果图片已保存。",
            shareModalTitle: "分享结果链接",
            copyLink: "复制链接",
            linkLabel: "链接",
            close: "关闭",
            failedSave: "图片保存失败。",
            adPending: "广告待处理",
            contactLabel: "联系 @todayshelp",
            includePhotoLabel: "保存结果时包含脸部照片",
        },
        ja: {
            headerTitle: "AI 顔型分析レポート",
            resultLabel: "分析結果",
            verified: "AI 検証済み",
            analysisSummary: "分析要約",
            ratio: "縦横比",
            widthRatio: "上下幅の比率",
            jawAngle: "下顎角",
            thirds: "顔の三庭バランス",
            ideal: "理想比率 1:1:1",
            upperThird: "上庭",
            middleThird: "中庭",
            lowerThird: "下庭",
            strengths: "骨格の強み",
            prescriptions: "スタイル提案",
            hair: "ヘア提案",
            eyewear: "アイウェア提案",
            contour: "コントゥアのポイント",
            hairline: "生え際",
            browLine: "眉ライン",
            noseBase: "鼻下ライン",
            chinLine: "あご先ライン",
            share: "共有",
            save: "保存",
            saving: "保存中",
            home: "ホーム",
            retry: "再分析",
            copied: "リンクをコピーしました。",
            saved: "結果画像を保存しました。",
            shareModalTitle: "結果リンクを共有",
            copyLink: "リンクをコピー",
            linkLabel: "リンク",
            close: "閉じる",
            failedSave: "画像の保存に失敗しました。",
            adPending: "広告待機中",
            contactLabel: "お問い合わせ @todayshelp",
            includePhotoLabel: "結果保存時に顔写真を含める",
        },
    }[safeLang];

    const topPoint = result.overlay.faceHeight[0];
    const chinPoint = result.overlay.faceHeight[1];
    const browPoint = result.overlay.browLine;
    const nosePoint = result.overlay.noseBase;
    const contourPath = linePath(result.overlay.contour, true);
    const axisPath = pairPath(result.overlay.centerLine);
    const axisX = result.overlay.centerLine
        ? (result.overlay.centerLine[0].x + result.overlay.centerLine[1].x) / 2
        : (topPoint.x + chinPoint.x) / 2;
    const fifthGuideXs = buildFifthGuideXs(result.overlay.upperThirdGuide ?? result.overlay.cheekboneWidth);
    const fifthGuideRange = result.overlay.centerLine
        ? [result.overlay.centerLine[0], result.overlay.centerLine[1]]
        : result.overlay.faceHeight;

    const guideItems = [
        {
            key: "hairline",
            label: t.hairline,
            y: topPoint.y,
            lineColor: "#f6c453",
            chipClass: "bg-black/80 text-[#fff1c7] border-y border-r border-[#f6c453]/40",
        },
        {
            key: "brow",
            label: t.browLine,
            y: browPoint.y,
            lineColor: "#67e8f9",
            chipClass: "bg-black/80 text-[#defafe] border-y border-r border-[#67e8f9]/40",
        },
        {
            key: "nose",
            label: t.noseBase,
            y: nosePoint.y,
            lineColor: "#fb7185",
            chipClass: "bg-black/80 text-[#fecdd3] border-y border-r border-[#fb7185]/40",
        },
        {
            key: "chin",
            label: t.chinLine,
            y: chinPoint.y,
            lineColor: "#4e80ff",
            chipClass: "bg-black/80 text-[#e8f0ff] border-y border-r border-[#4e80ff]/40",
        },
    ];

    const metricCards = [
        { label: t.ratio, value: `1:${result.metrics.faceLengthToWidth.toFixed(2)}` },
        { label: t.widthRatio, value: `${result.metrics.foreheadToJaw.toFixed(2)}:1` },
        { label: t.jawAngle, value: `${result.metrics.jawAngle.toFixed(1)}°` },
    ];

    const thirds = [
        { label: t.upperThird, value: result.metrics.upperThird },
        { label: t.middleThird, value: result.metrics.middleThird },
        { label: t.lowerThird, value: result.metrics.lowerThird },
    ];
    const maxThirdValue = Math.max(...thirds.map((item) => item.value), 33.3);

    const highlightPoints = shapeCopy.strengths.slice(0, 3);
    const prescriptionCards = [
        {
            key: "hair",
            title: t.hair,
            items: styleRecommendations.hairstyle.slice(0, 3),
            icon: Scissors,
            iconClass: "bg-[#4e80ff]/10 text-[#4e80ff]",
            bulletClass: "bg-[#4e80ff]",
        },
        {
            key: "eyewear",
            title: t.eyewear,
            items: styleRecommendations.eyewear.slice(0, 3),
            icon: Glasses,
            iconClass: "bg-[#8f87ff]/10 text-[#8f87ff]",
            bulletClass: "bg-[#8f87ff]",
        },
        {
            key: "contour",
            title: masculineContourTitle ?? t.contour,
            items: styleRecommendations.contour.slice(0, 3),
            icon: Sparkles,
            iconClass: "bg-[#f0b35d]/10 text-[#f0b35d]",
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

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const restoreStyles: Array<() => void> = [];

        // 1. Thoroughly ensure all images are ready for the canvas
        const ensureImagesReady = async () => {
            const imgElements = cardRef.current?.querySelectorAll('img');
            if (!imgElements) return;

            const promises = Array.from(imgElements).map(async (img) => {
                if (!img.complete) {
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }
                try { await img.decode(); } catch (e) {}
            });
            await Promise.all(promises);
        };

        const waitForImage = (img: HTMLImageElement, timeoutMs = 12000) =>
            new Promise<void>((resolve, reject) => {
                if (img.complete && img.naturalWidth > 0) {
                    resolve();
                    return;
                }
                let done = false;
                const timer = window.setTimeout(() => {
                    if (done) return;
                    done = true;
                    reject(new Error("Image load timeout"));
                }, timeoutMs);
                img.onload = () => {
                    if (done) return;
                    done = true;
                    window.clearTimeout(timer);
                    resolve();
                };
                img.onerror = () => {
                    if (done) return;
                    done = true;
                    window.clearTimeout(timer);
                    reject(new Error("Image load error"));
                };
            });

        const drawFaceImage = async (
            ctx: CanvasRenderingContext2D,
            imgNode: HTMLImageElement | null,
            src: string,
            x: number,
            y: number,
            w: number,
            h: number
        ) => {
            if (imgNode && imgNode.complete && imgNode.naturalWidth > 0) {
                ctx.drawImage(imgNode, x, y, w, h);
                return true;
            }

            if (typeof createImageBitmap === "function") {
                try {
                    const response = await fetch(src);
                    const blob = await response.blob();
                    const bitmap = await createImageBitmap(blob);
                    ctx.drawImage(bitmap, x, y, w, h);
                    if ("close" in bitmap) bitmap.close();
                    return true;
                } catch {
                    // Fall through to HTMLImageElement loading.
                }
            }

            try {
                const faceImg = new Image();
                faceImg.crossOrigin = "anonymous";
                faceImg.src = src;
                if ("decode" in faceImg) {
                    try {
                        await faceImg.decode();
                    } catch {
                        await waitForImage(faceImg);
                    }
                } else {
                    await waitForImage(faceImg);
                }
                if (faceImg.naturalWidth > 0) {
                    ctx.drawImage(faceImg, x, y, w, h);
                    return true;
                }
            } catch {
                return false;
            }

            return false;
        };

        const clipRoundedRect = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            w: number,
            h: number,
            r: number
        ) => {
            const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2));
            if (radius === 0) return;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + w, y, x + w, y + h, radius);
            ctx.arcTo(x + w, y + h, x, y + h, radius);
            ctx.arcTo(x, y + h, x, y, radius);
            ctx.arcTo(x, y, x + w, y, radius);
            ctx.closePath();
            ctx.clip();
        };

        const setTempStyle = (el: HTMLElement | null, styles: Partial<CSSStyleDeclaration>) => {
            if (!el) return;
            const prev: any = {};
            const elStyle = el.style as any;
            const styleChanges = styles as any;
            Object.keys(styles).forEach((key) => {
                prev[key] = elStyle[key];
                elStyle[key] = styleChanges[key];
            });
            restoreStyles.push(() => {
                Object.keys(prev).forEach((key) => {
                    elStyle[key] = prev[key];
                });
            });
        };

        try {
            // 2. Extra long wait for Safari's layout engine (1200px shift + high-res stability)
            await new Promise((resolve) => setTimeout(resolve, isIOS ? 1500 : 800));
            await ensureImagesReady();

            const htmlToImage = await import("html-to-image");

            const captureOptions = {
                backgroundColor: (isIOS && includePhoto) ? "transparent" : "#03060b", 
                pixelRatio: isIOS ? 1.5 : 2,
                width: 1200,
                cacheBust: true,
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                },
                filter: (isIOS && includePhoto)
                    ? (node: Node) => {
                        if (node instanceof HTMLImageElement && node.alt === "Analyzed Face") {
                            return false;
                        }
                        return true;
                    }
                    : undefined
            };

            const imgNode = cardRef.current.querySelector('img[alt="Analyzed Face"]') as HTMLImageElement | null;

            if (isIOS && includePhoto) {
                setTempStyle(cardShellRef.current, { backgroundColor: "transparent", backgroundImage: "none" });
                setTempStyle(imagePanelRef.current, { backgroundColor: "transparent", backgroundImage: "none" });
            }
            
            const logoCore = cardRef.current?.querySelector('.logo-core') as HTMLElement;
            if (logoCore) {
                setTempStyle(logoCore, {
                    backgroundImage: 'linear-gradient(to right, #60a5fa, #a855f7, #f472b6)',
                    webkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                });
            }

            // ─── AGGRESSIVE SAFARI CAPTURE STRATEGY ───
            let capturedCanvas: HTMLCanvasElement | null = null;
            let retryCount = 0;
            const maxRetries = isIOS ? 3 : 1;

            while (retryCount < maxRetries) {
                try {
                    capturedCanvas = await htmlToImage.toCanvas(cardRef.current, captureOptions);
                    if (capturedCanvas && capturedCanvas.width > 200) break;
                } catch (e) {
                    console.warn(`Capture retry ${retryCount + 1}`, e);
                }
                retryCount++;
                await new Promise(r => setTimeout(r, 500));
            }

            if (!capturedCanvas) throw new Error("Canvas capture failed after retries");
            let finalCanvas = capturedCanvas;

            // ─── COMPOSITION STRATEGY FOR iOS ───
            if (isIOS && includePhoto && result.imageDataUrl && imgNode) {
                const compositeCanvas = document.createElement('canvas');
                compositeCanvas.width = capturedCanvas.width;
                compositeCanvas.height = capturedCanvas.height;
                const ctx = compositeCanvas.getContext('2d');

                if (ctx) {
                    const imgRect = imgNode.getBoundingClientRect();
                    const cardRect = cardRef.current.getBoundingClientRect();
                    
                    const scaleX = capturedCanvas.width / cardRect.width;
                    const scaleY = capturedCanvas.height / cardRect.height;
                    
                    const x = (imgRect.left - cardRect.left) * scaleX;
                    const y = (imgRect.top - cardRect.top) * scaleY;
                    const w = imgRect.width * scaleX;
                    const h = imgRect.height * scaleY;

                    // 1. Draw Background
                    ctx.fillStyle = "#03060b";
                    ctx.fillRect(0, 0, compositeCanvas.width, compositeCanvas.height);

                    // 2. Clip for Rounded Corners
                    let cornerRadius = 0;
                    if (imagePanelRef.current) {
                        const radiusValue = window.getComputedStyle(imagePanelRef.current).borderRadius;
                        const parsedRadius = parseFloat(radiusValue);
                        if (!Number.isNaN(parsedRadius)) {
                            cornerRadius = parsedRadius * scaleX;
                        }
                    }

                    if (cornerRadius > 0) {
                        ctx.save();
                        clipRoundedRect(ctx, x, y, w, h, cornerRadius);
                    }

                    // 3. Draw Original Photo
                    const drewPhoto = await drawFaceImage(ctx, imgNode, result.imageDataUrl, x, y, w, h);
                    if (!drewPhoto) throw new Error("Face photo failed to decode");

                    if (cornerRadius > 0) ctx.restore();

                    // 4. Draw Captured UI Overlay
                    ctx.drawImage(capturedCanvas, 0, 0);
                    finalCanvas = compositeCanvas;
                }
            }

            // 5. Convert & Download
            const dataUrl = finalCanvas.toDataURL('image/png', 1.0);
            const link = document.createElement("a");
            link.download = `findcore-face-${presentedShape}.png`;
            link.href = dataUrl;
            link.click();
            showTemporaryToast(t.saved);
        } catch (error) {
            console.error("Capture failed", error);
            alert(t.failedSave);
        } finally {
            restoreStyles.forEach((restore) => restore());
            setDownloading(false);
        }
    };

    return (


        <div
            className={`mx-auto flex w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-[1240px] flex-col gap-4 px-4 py-8 pb-10 md:px-6 lg:py-12 ${isKo ? "font-korean" : isEnglish ? "font-cinzel" : ""}`}
        >
            {/* Background ambiance */}
            <div className="pointer-events-none fixed inset-0 z-[-1]">
                <div className="absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(45,127,249,0.05),transparent_70%)]" />
            </div>

            {toastMessage && (
                <div className="pointer-events-none fixed left-1/2 top-8 z-50 -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-5 py-3 shadow-2xl backdrop-blur-2xl">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                            <Check className="h-3 w-3 text-white" />
                        </span>
                        <span className="text-[13px] font-semibold text-white">
                            {toastMessage}
                        </span>
                    </div>
                </div>
            )}

            {showShareModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowShareModal(false)}
                >
                    <div
                        className="w-full max-w-md bg-[#1a1a1a] rounded-t-3xl p-6 pb-10 animate-in slide-in-from-bottom duration-300"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                        <h3 className="text-white font-bold text-lg text-center mb-6">
                            {t.shareModalTitle}
                        </h3>
                        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                                {t.linkLabel}
                            </p>
                            <p className="text-sm text-white/90 truncate">
                                {shareUrl}
                            </p>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#4e80ff,#2d5cf9)] px-5 text-[15px] font-bold text-white transition active:scale-95 shadow-[0_0_30px_-5px_rgba(78,128,255,0.5)]"
                        >
                            <Link2 className="h-5 w-5" />
                            <span>{t.copyLink}</span>
                        </button>
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="w-full py-3 mt-3 text-[13px] font-bold text-white/40 transition hover:text-white"
                        >
                            {t.close}
                        </button>
                    </div>
                </div>
            )}

            <div 
                ref={cardRef}
                style={downloading ? { width: '1200px', minWidth: '1200px', backgroundColor: '#03060b' } : {}}
                className={`w-full flex flex-col gap-4 overflow-hidden ${downloading ? "p-10" : ""}`}
            >
                <div
                    ref={cardShellRef}
                    className={`relative w-full flex flex-col ${downloading ? "grid grid-cols-[1fr_1.1fr] gap-10" : "lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10"} bg-[#050505] lg:bg-transparent text-white rounded-[32px] sm:rounded-4xl lg:rounded-none overflow-hidden lg:overflow-visible`}
                >
                    {/* ═══ LEFT: Image Panel ═══ */}
                    <div
                        ref={imagePanelRef}
                        className={`w-full shrink-0 bg-black relative ${downloading ? "rounded-[24px] overflow-hidden" : "lg:rounded-[24px] lg:overflow-hidden lg:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.8)]"}`}
                    >
                        <div className="relative w-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={result.imageDataUrl}
                                alt="Analyzed Face"
                                crossOrigin="anonymous"
                                className={`w-full h-auto block ${(downloading && !includePhoto) ? "opacity-0 invisible" : "opacity-100"}`}
                            />
                            {/* Overlay — soft on desktop, cinematic on mobile */}
                            <div className={`absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80 ${downloading ? "to-black/20" : "lg:to-black/20"} z-10 pointer-events-none ${(downloading && !includePhoto) ? "hidden" : ""}`} />

                            {/* Verified Badge */}
                            <div className={`absolute left-3 top-3 ${downloading ? "left-4 top-4" : "lg:left-4 lg:top-4"} z-30`}>
                                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-xl shadow-lg">
                                    <span className={`h-2 w-2 rounded-full ${confidenceDotClass}`} />
                                    <span className="font-sans text-[9px] font-bold tracking-widest text-white/90 uppercase">
                                        {t.verified} {result.confidence.toFixed(0)}%
                                    </span>
                                </div>
                            </div>

                            {/* ── Technical Clinical Analysis Overlay ── */}
                            <svg
                                className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <pattern id="scanner-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#scanner-grid)" />
                                {guideItems.map((guide) => (
                                    <g key={`${guide.key}-tech`}>
                                        {/* Horizontal scan line - Increased visibility dash */}
                                        <line
                                            x1="3" y1={guide.y * 100}
                                            x2="97" y2={guide.y * 100}
                                            stroke="rgba(255,255,255,0.4)" strokeWidth="0.25"
                                            strokeDasharray="2 2"
                                        />
                                        {/* Neon Edge Ticks - High Contrast with Glow */}
                                        <line x1="0" y1={guide.y * 100} x2="3" y2={guide.y * 100} stroke={guide.lineColor} strokeWidth="0.6" className="filter drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" />
                                        <line x1="97" y1={guide.y * 100} x2="100" y2={guide.y * 100} stroke={guide.lineColor} strokeWidth="0.6" className="filter drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" />
                                        
                                        {/* Precision Crosshair Corners at edges */}
                                        <line x1="1" y1={guide.y * 100 - 1.2} x2="1" y2={guide.y * 100 + 1.2} stroke="white" strokeWidth="0.3" opacity="0.8" />
                                        <line x1="99" y1={guide.y * 100 - 1.2} x2="99" y2={guide.y * 100 + 1.2} stroke="white" strokeWidth="0.3" opacity="0.8" />
                                    </g>
                                ))}

                                {/* Center Axis (Vertical Scanner Line) */}
                                {axisPath && (
                                    <g>
                                        <path d={axisPath} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.4" />
                                        <path
                                            d={axisPath} fill="none"
                                            stroke="rgba(255,255,255,0.5)" strokeWidth="0.15"
                                            strokeDasharray="0.5 0.5"
                                        />
                                    </g>
                                )}

                                {/* Facial Fifths (Vertical Guide Lines) */}
                                {fifthGuideRange && fifthGuideXs.map((x, index) => (
                                    <path
                                        key={`fifth-${index}`}
                                        d={`M ${x * 100} ${fifthGuideRange[0].y * 100} L ${x * 100} ${fifthGuideRange[1].y * 100}`}
                                        fill="none"
                                        stroke="rgba(103,232,249,0.42)"
                                        strokeWidth="0.16"
                                        strokeDasharray="1 1"
                                    />
                                ))}

                                {/* High-Precision Face Contour (Clinical Cyan) */}
                                {contourPath && (
                                    <g>
                                        <path d={contourPath} fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />
                                        <path
                                            d={contourPath} fill="none"
                                            stroke="#4e80ff" strokeWidth="0.42"
                                            strokeLinejoin="round" strokeLinecap="round"
                                        />
                                    </g>
                                )}

                                {/* Medical Crosshair Markers (+) */}
                                {guideItems.map((guide) => (
                                    <g key={`${guide.key}-marker`}>
                                        {/* Crosshair Background Contrast */}
                                        <line
                                            x1={axisX * 100 - 2} y1={guide.y * 100}
                                            x2={axisX * 100 + 2} y2={guide.y * 100}
                                            stroke="rgba(0,0,0,0.5)" strokeWidth="0.6"
                                        />
                                        <line
                                            x1={axisX * 100} y1={guide.y * 100 - 2}
                                            x2={axisX * 100} y2={guide.y * 100 + 2}
                                            stroke="rgba(0,0,0,0.5)" strokeWidth="0.6"
                                        />
                                        {/* Crosshair Foreground */}
                                        <line
                                            x1={axisX * 100 - 1.8} y1={guide.y * 100}
                                            x2={axisX * 100 + 1.8} y2={guide.y * 100}
                                            stroke={guide.lineColor} strokeWidth="0.3"
                                        />
                                        <line
                                            x1={axisX * 100} y1={guide.y * 100 - 1.8}
                                            x2={axisX * 100} y2={guide.y * 100 + 1.8}
                                            stroke={guide.lineColor} strokeWidth="0.3"
                                        />
                                        {/* Centering Dot */}
                                        <circle cx={axisX * 100} cy={guide.y * 100} r="0.6" fill="black" opacity="0.4" />
                                        <circle cx={axisX * 100} cy={guide.y * 100} r="0.3" fill="white" />
                                    </g>
                                ))}

                                <line x1="20" y1="5" x2="80" y2="5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.15" strokeDasharray="1 1" />
                            </svg>

                            {/* Clinical Callout Labels — High Visibility Medical Aesthetic */}
                            <div className="pointer-events-none absolute inset-0 z-25">
                                {guideItems.map((guide, idx) => (
                                    <div
                                        key={`${guide.key}-label`}
                                        className="absolute"
                                        style={{
                                            top: `${guide.y * 100}%`,
                                            left: '3%',
                                            transform: 'translateY(-100%)',
                                        }}
                                    >
                                        <div className="flex flex-col items-start gap-0.5 border-l-[3px] border-white/80 pl-3 pr-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-sm ring-1 ring-white/20 shadow-2xl">
                                            <span className="text-[11px] sm:text-[13px] font-black leading-tight tracking-tight text-white uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap">
                                                {guide.label}
                                            </span>
                                            <div className="flex items-center gap-1.5 min-w-[30px]">
                                                <span className={`text-[8px] sm:text-[9px] font-mono font-black italic tracking-tighter ${idx === 0 ? 'text-blue-400' : idx === 1 ? 'text-emerald-400' : idx === 2 ? 'text-amber-400' : 'text-rose-400'}`}>
                                                    {(guide.y * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Mobile-only title overlay */}
                            {!downloading && (
                                <div className="absolute inset-0 px-5 pt-6 pb-5 flex flex-col justify-end z-30 lg:hidden">
                                    <div className="flex flex-col items-start gap-1">
                                        <h1 className="text-3xl font-black leading-none tracking-tight text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] sm:text-4xl bg-clip-text bg-linear-to-b from-white to-white/70 break-keep">
                                            {shapeCopy.name}
                                        </h1>
                                        {keywords.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-1.5 pt-2 max-w-full">
                                                {keywords.map((keyword) => (
                                                    <span key={keyword} className="px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-md bg-zinc-900/60 border-white/20 text-white tracking-wide shadow-sm whitespace-nowrap">
                                                        #{keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ═══ RIGHT: Professional Report Dashboard ═══ */}
                    <div className={`flex flex-col px-0 py-7 lg:pl-10 lg:pr-0 lg:py-0 z-10 w-full text-left bg-black lg:bg-transparent ${downloading ? "pl-10 pr-0 py-0" : ""}`} style={{ gap: '1.5rem' }}>

                        {/* ▸ Desktop Title & Metrics Block (Reverted to Right Panel) */}
                        <div className={`${downloading ? "flex" : "hidden lg:flex"} flex-col gap-6 pb-6 border-b border-white/8`}>
                            <div className="flex flex-col items-start">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/60 mb-2">
                                    {t.resultLabel}
                                </p>
                                <h1 className="text-[36px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/50 break-keep">
                                    {shapeCopy.name}
                                </h1>
                                {keywords.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2 mt-4 max-w-full">
                                        {keywords.map((keyword) => (
                                            <span key={keyword} className="px-3 py-1.5 rounded-full text-[10px] font-bold border bg-white/10 border-white/15 text-white tracking-wide shadow-xs whitespace-nowrap">
                                                #{keyword}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-2 w-full">
                                {metricCards.map((metric) => (
                                    <div key={metric.label} className="flex flex-col items-start gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                        <p className="text-[9px] font-extrabold uppercase text-white/50 tracking-[0.2em] leading-none">{metric.label}</p>
                                        <p className="text-[18px] font-mono font-black tracking-tighter text-white leading-none">{metric.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile-only metrics */}
                        {!downloading && (
                            <div className="grid grid-cols-3 gap-2 lg:hidden">
                                {metricCards.map((metric) => (
                                    <div key={metric.label} className="flex flex-col items-center justify-center rounded-xl border border-white/12 bg-white/5 p-3 shadow-sm">
                                        <p className="text-[10px] font-extrabold uppercase text-white/90 mb-1.5 text-center tracking-widest">{metric.label}</p>
                                        <p className="text-[16px] font-mono font-black tracking-tight text-white drop-shadow-sm">{metric.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ▸ Executive Summary */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(78,128,255,0.4)]" />
                                <h3 className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-blue-300">{t.analysisSummary}</h3>
                            </div>
                            <p className={`text-[15px] sm:text-[16px] ${downloading ? "text-[13.5px]" : "lg:text-[13.5px]"} text-white/90 leading-[1.7] tracking-tight break-keep whitespace-pre-line`}>
                                {executiveSummary}
                            </p>
                        </div>

                        {/* ▸ Thirds */}
                        <div className={`rounded-xl border-y border-white/8 lg:border-x lg:rounded-xl bg-white/3 py-5 px-0 ${downloading ? "px-5 border-x rounded-xl" : "lg:px-5"}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 rounded-full bg-sky-400" />
                                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-sky-300">{t.thirds}</h3>
                                </div>
                                <span className="text-[10px] font-mono font-black text-white tracking-widest bg-white/15 px-2.5 py-1 rounded-sm border border-white/10 shadow-sm">{t.ideal}</span>
                            </div>
                            <div className="space-y-3.5">
                                {thirds.map((seg) => (
                                    <div key={seg.label} className="grid grid-cols-[50px_1fr_44px] items-center gap-3">
                                        <span className="text-[12px] font-bold text-white">{seg.label}</span>
                                        <div className="relative h-[8px] overflow-hidden rounded-full bg-white/8">
                                            <div className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#4e80ff,#6b9fff)]" style={{ width: `${(seg.value / maxThirdValue) * 100}%` }} />
                                            <div className="absolute inset-y-0 left-[33.3%] w-px bg-white/25 z-10" />
                                        </div>
                                        <span className="text-right text-[12px] font-mono font-bold text-white">{seg.value.toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ▸ Strengths */}
                        <div className={`rounded-xl border-y border-white/8 lg:border-x lg:rounded-xl bg-white/3 py-5 px-0 ${downloading ? "px-5 border-x rounded-xl" : "lg:px-5"}`}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-4 rounded-full bg-emerald-400" />
                                <h3 className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-emerald-300">{t.strengths}</h3>
                            </div>
                            <div className="space-y-3">
                                {highlightPoints.map((pt) => (
                                    <div key={pt} className="flex items-start gap-2.5">
                                        <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                        <p className="text-[13px] leading-[1.7] text-white">{pt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ▸ Ad Placeholder */}
                        {!downloading && (
                            <div className="w-full bg-[#1A1A1A] border-t border-white/5 py-3 px-6 mt-auto">
                                <p className="text-xs text-center text-white/50 font-semibold">{t.adPending}</p>
                            </div>
                        )}

                        {/* ▸ Report Signature */}
                        <ReportSignatureStrip lang={safeLang} />
                    </div>
                </div>

                <div className="w-full text-white mt-4 sm:mt-6">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        <div className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                        <h3 className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-amber-300">{t.prescriptions}</h3>
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold text-amber-100/90 whitespace-nowrap">
                            {styleTargetCopy[styleTarget].badge}
                        </span>
                    </div>
                    <div className={`grid gap-4 ${downloading ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}`}>
                        {prescriptionCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div 
                                    key={card.key} 
                                    className={`rounded-2xl border border-white/15 bg-white/4 p-5 sm:p-6 ${downloading ? "p-6" : "lg:p-6"} transition-all hover:bg-white/7 hover:border-white/25`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <h4 className="text-[14px] sm:text-[15px] font-black text-white tracking-tight leading-snug break-keep">
                                            {card.title}
                                        </h4>
                                    </div>
                                    <ul className="space-y-2.5 pl-1">
                                        {card.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-[1.65] text-white break-keep">
                                                <span className={`mt-[8px] flex h-1.5 w-1.5 shrink-0 rounded-full ${card.bulletClass}`} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-auto mt-4 lg:mt-6 grid w-full max-w-md lg:max-w-lg gap-4">
                {/* Privacy Toggle */}
                {!downloading && (
                    <div className="flex items-center justify-center gap-3 py-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={includePhoto}
                                onChange={(e) => setIncludePhoto(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 group-hover:bg-white/15 transition-colors"></div>
                            <span className="ms-3 text-[13px] font-bold text-white/70 group-hover:text-white transition-colors">
                                {t.includePhotoLabel}
                            </span>
                        </label>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all backdrop-blur-md active:scale-95 border border-white/10"
                    >
                        <Share2 className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        disabled={downloading}
                        className="flex items-center justify-center py-4 rounded-full bg-linear-to-r from-[#4e80ff] to-[#2d5cf9] hover:from-[#3b6df0] hover:to-[#1a4be0] text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(78,128,255,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full mt-1">
                    <Link
                        href={`/?lang=${lang}`}
                        className="flex items-center justify-center w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/5 active:scale-95"
                    >
                        <Home className="w-6 h-6" />
                    </Link>
                    <Link
                        href={`/face-shape?lang=${lang}`}
                        className="flex items-center justify-center w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/5 active:scale-95"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
