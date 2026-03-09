"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Upload, Move, PenTool, ZoomIn, ZoomOut, Undo2, Check } from 'lucide-react';
import { SeasonId, SubSeasonId, analyzePersonalColor } from "@/lib/color-data";
import { analyzePersonalColorAI, preloadModel, getFaceContour } from "@/lib/face-color-analysis";
import {
    analyzeFaceShapeAI,
    getFaceShapeContour,
    preloadFaceShapeModel,
} from "@/lib/face-shape-analysis";
import { motion } from "framer-motion";

// =============================================
// Color swatches per season
// =============================================
const SEASON_SWATCHES: Record<SeasonId, string[]> = {
    // Spring (True/Light/Bright): Warm, clear, bright Coral pink, Lime Zest, Mandarin, Light Peach
    spring: [
        '#F4A772', '#F1DCA5', '#FFBF40', '#7FB80E', '#FFB3B3', // True Spring & Bright
        '#F4ABE2', '#F2ACA4', '#CC2F85', '#2ECC71', '#00BCD4', // Variations
        '#F5E68C', '#FA9072', '#FF6B4A', '#FF9E66', '#FFE5A3', // Light Spring
    ],
    // Summer (Light/True/Soft): Cool, muted, light Powder Blue, Pale Lavender, Soft Rose, Muted Turquoise
    summer: [
        '#99CCEE', '#BDA7DD', '#F3E5F5', '#8CBDBD', '#D1E6D5', // Light & True Summer
        '#A4C1F3', '#C5D8AB', '#F2EFC9', '#36454F', '#005178', // Soft & Deep
        '#B0DEF4', '#ECC8F9', '#F0B6F8', '#E6E6FA', '#87CEEB', // True Cool Summer
    ],
    // Autumn (Soft/True/Deep): Warm, muted, dark Mustard, Olive Green, Rust, Deep Teal
    autumn: [
        '#BA533A', '#E0AB3D', '#F4BB74', '#F0DC71', '#8ABF67', // True & Warm Autumn
        '#4C9150', '#A52A2A', '#D2B48C', '#8B4513', '#6B4226', // Soft & Deep Autumn
        '#347744', '#127379', '#425570', '#CD853F', '#BDB76B', // Muted Tones
    ],
    // Winter (Bright/True/Deep): Cool, clear, dark Magenta, Navy Blue, True Red, Icy White/Black
    winter: [
        '#000000', '#FFFFFF', '#1D2327', '#E4D5EE', '#CAC2CE', // True/Deep Winter & Icy 
        '#767676', '#DC143C', '#0F5C6E', '#35415E', '#191970', // Dark & Bold Colors
        '#FF00FF', '#0000CD', '#4169E1', '#8B008B', '#800020', // Clear/Bright Winter
    ],
};

// =============================================
// TRANSLATIONS
// =============================================
type Lang = 'ko' | 'en' | 'zh' | 'ja';
const UI_TEXT: Record<Lang, Record<string, string>> = {
    ko: {
        title: "퍼스널 컬러 테스트",
        subtitle: "셀카를 업로드하고 나에게 맞는\n퍼스널 컬러를 찾아보세요.",
        upload: "사진 업로드",
        uploadHint: "JPG, PNG — 자연광 권장",
        cropTitle: "얼굴 영역을 따라 그려주세요",
        cropHint: "얼굴 윤곽을 따라 그리면 배경이 제거됩니다.",
        cropDone: "자르기 완료",
        cropUndo: "다시 그리기",
        cropSkip: "건너뛰기 (원본 사용)",
        none: "원본",
        select_btn: "결과 보기",
        analyzing: "정밀 분석 중...",
        shapeTitle: "AI 얼굴형 분석",
        shapeSubtitle: "셀카를 업로드하여 당신의 얼굴형과\n가장 잘 어울리는 스타일을 찾아보세요.",
        shapeUploadHint: "정면 사진 권장 - 이마와 헤어라인, 턱선이 모두 보여야 정확도가 올라갑니다.",
        shapeCropHint: "앞머리와 이마가 보이게 맞춘 뒤 얼굴 윤곽을 따라 그려주세요.",
    },
    en: {
        title: "Personal Color Test",
        subtitle: "Upload a selfie and discover\nyour personal color.",
        upload: "Upload Photo",
        uploadHint: "JPG, PNG — Natural lighting recommended",
        cropTitle: "Trace around your face",
        cropHint: "Draw along your face outline to remove the background.",
        cropDone: "Done Cropping",
        cropUndo: "Redo",
        cropSkip: "Skip (use original)",
        none: "Original",
        select_btn: "View Result",
        analyzing: "Analyzing...",
        shapeTitle: "AI Face Shape Analysis",
        shapeSubtitle: "Upload a selfie to discover your face shape\nand the perfect styles for you.",
        shapeUploadHint: "Use a near-frontal photo with the forehead, hairline, and jawline fully visible for better accuracy.",
        shapeCropHint: "Frame the forehead and hairline clearly, then trace around the face outline.",
    },
    zh: {
        title: "个人色彩测试",
        subtitle: "上传自拍，发现\n专属个人色彩。",
        upload: "上传照片",
        uploadHint: "JPG, PNG — 建议使用自然光",
        cropTitle: "沿着脸部轮廓画线",
        cropHint: "沿脸部画线即可去除背景。",
        cropDone: "裁剪完成",
        cropUndo: "重新画",
        cropSkip: "跳过 (使用原图)",
        none: "原图",
        select_btn: "查看结果",
        analyzing: "深度分析中...",
        shapeTitle: "AI 脸型分析",
        shapeSubtitle: "上传自拍，发现您的脸型\n以及最适合您的风格。",
        shapeUploadHint: "建议上传接近正面的照片，并清楚露出额头、发际线和下颌线。",
        shapeCropHint: "先确保额头和发际线清晰可见，再沿着脸部轮廓描绘。",
    },
    ja: {
        title: "パーソナルカラーテスト",
        subtitle: "セルフィーをアップロードして\nパーソナルカラーを見つけましょう。",
        upload: "写真をアップロード",
        uploadHint: "JPG, PNG — 自然光推奨",
        cropTitle: "顔の輪郭をなぞってください",
        cropHint: "顔の輪郭に沿って描くと背景が除去されます。",
        cropDone: "切り抜き完了",
        cropUndo: "やり直す",
        cropSkip: "スキップ (元画像を使用)",
        none: "オリジナル",
        select_btn: "結果を見る",
        analyzing: "AI分析中...",
        shapeTitle: "AI 顔型分析",
        shapeSubtitle: "セルフィーをアップロードして、あなたの顔型と\n最高のスタイルを見つけましょう。",
        shapeUploadHint: "正面に近く、額と生え際、あごのラインが見える写真の方が精度が上がります。",
        shapeCropHint: "前髪や額が見えるように合わせてから、顔の輪郭をなぞってください。",
    },
};

type Step = 'upload' | 'crop' | 'compare' | 'analyzing';

function ColorTestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = (['ko', 'en', 'zh', 'ja'].includes(searchParams.get('lang') || '') ? searchParams.get('lang') : 'en') as Lang;
    const mode = searchParams.get('mode') || 'color';
    const isKorean = lang === 'ko';
    const t = UI_TEXT[lang];

    const [step, setStep] = useState<Step>('upload');
    const [scanningStatus, setScanningStatus] = useState(0);
    const [isAutoDetecting, setIsAutoDetecting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedSrc, setCroppedSrc] = useState<string | null>(null);
    const [activeColor, setActiveColor] = useState<string | null>(null);
    const [activeSeason, setActiveSeason] = useState<SeasonId | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Crop state
    const cropCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const sourceImgRef = useRef<HTMLImageElement | null>(null);

    // =============================================
    // Custom Cropper States
    // =============================================
    const [cropMode, setCropMode] = useState<'move' | 'draw'>('move');
    const [imgScale, setImgScale] = useState(1);
    const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
    const lastPanRef = useRef({ x: 0, y: 0 });

    // =============================================
    // Desktop Drag-to-Scroll Handlers
    // =============================================
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onScrollPointerDown = useCallback((e: React.PointerEvent) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        scrollContainerRef.current.classList.add('cursor-grabbing');
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
        // Release pointer capture so standard click events still work
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }, []);

    const onScrollPointerUp = useCallback(() => {
        isDragging.current = false;
        if (scrollContainerRef.current) scrollContainerRef.current.classList.remove('cursor-grabbing');
    }, []);

    const onScrollPointerLeave = useCallback(() => {
        isDragging.current = false;
        if (scrollContainerRef.current) scrollContainerRef.current.classList.remove('cursor-grabbing');
    }, []);

    const onScrollPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }, []);

    useEffect(() => {
        const preload = mode === 'shape' ? preloadFaceShapeModel : preloadModel;
        preload().catch(() => {
            // Keep the UI usable even if model warm-up fails.
        });
    }, [mode]);

    const seasonMeta: Record<SeasonId, { name: Record<Lang, string>, shortName: Record<Lang, string> }> = {
        spring: {
            name: { ko: "봄 웜톤", en: "Spring Warm", zh: "春季暖色", ja: "イエベ春" },
            shortName: { ko: "봄 웜", en: "Spring", zh: "春", ja: "春" }
        },
        summer: {
            name: { ko: "여름 쿨톤", en: "Summer Cool", zh: "夏季冷色", ja: "ブルベ夏" },
            shortName: { ko: "여름 쿨", en: "Summer", zh: "夏", ja: "夏" }
        },
        autumn: {
            name: { ko: "가을 웜톤", en: "Autumn Warm", zh: "秋季暖色", ja: "イエベ秋" },
            shortName: { ko: "가을 웜", en: "Autumn", zh: "秋", ja: "秋" }
        },
        winter: {
            name: { ko: "겨울 쿨톤", en: "Winter Cool", zh: "冬季冷色", ja: "ブルベ冬" },
            shortName: { ko: "겨울 쿨", en: "Winter", zh: "冬", ja: "冬" }
        },
    };

    // =============================================
    // File upload
    // =============================================
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        setImageSrc(url);
        setCroppedSrc(null);
        setActiveColor(null);
        setActiveSeason(null);
        setPoints([]);
        const img = new window.Image();
        img.onload = () => { sourceImgRef.current = img; };
        img.src = url;
        setStep('crop');
    };

    // =============================================
    // Draw crop canvas with live path
    // =============================================
    const drawCropCanvas = useCallback(() => {
        const canvas = cropCanvasRef.current;
        const img = sourceImgRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        const w = rect.width;
        const h = rect.height;

        // Draw image with pan & zoom
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;

        let baseScale;
        if (imgAspect > canvasAspect) {
            baseScale = h / img.naturalHeight;
        } else {
            baseScale = w / img.naturalWidth;
        }

        const currentScale = baseScale * imgScale;
        const drawW = img.naturalWidth * currentScale;
        const drawH = img.naturalHeight * currentScale;
        const drawX = (w - drawW) / 2 + imgOffset.x;
        const drawY = (h - drawH) / 2 + imgOffset.y;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // After drawing done: dim outside, brighten inside
        if (points.length > 5 && !isDrawing) {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            ctx.restore();
        }

        // Draw path line (visible while drawing)
        if (points.length > 1) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 4;
            ctx.setLineDash(isDrawing ? [] : [8, 5]);
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
            if (!isDrawing) ctx.closePath();
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.setLineDash([]);
        }

        // Start point indicator while actively drawing
        if (isDrawing && points.length > 0 && cropMode === 'draw') {
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }, [points, isDrawing, imgScale, imgOffset, cropMode]);

    useEffect(() => {
        if (step === 'crop') requestAnimationFrame(drawCropCanvas);
    }, [step, drawCropCanvas]);

    useEffect(() => {
        if (step === 'crop') { const t2 = setTimeout(drawCropCanvas, 50); return () => clearTimeout(t2); }
    }, [step, drawCropCanvas]);

    useEffect(() => {
        if (step !== 'crop') return;
        const h = () => drawCropCanvas();
        window.addEventListener('resize', h);
        return () => window.removeEventListener('resize', h);
    }, [step, drawCropCanvas]);

    // =============================================
    // Pointer events
    // =============================================
    const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = cropCanvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        if (cropMode === 'draw') {
            setPoints([getCanvasPoint(e)]);
        } else {
            lastPanRef.current = { x: e.clientX, y: e.clientY };
        }
        cropCanvasRef.current?.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        if (cropMode === 'draw') {
            setPoints(prev => [...prev, getCanvasPoint(e)]);
        } else {
            const dx = e.clientX - lastPanRef.current.x;
            const dy = e.clientY - lastPanRef.current.y;
            setImgOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            lastPanRef.current = { x: e.clientX, y: e.clientY };
        }
    };
    const onPointerUp = () => setIsDrawing(false);

    // =============================================
    // Apply crop → go to compare step
    // =============================================
    const applyCrop = () => {
        const img = sourceImgRef.current;
        const canvas = cropCanvasRef.current;
        if (!img || !canvas || points.length < 3) return;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        const resultCanvas = document.createElement('canvas');
        resultCanvas.width = img.naturalWidth;
        resultCanvas.height = img.naturalHeight;
        const ctx = resultCanvas.getContext('2d');
        if (!ctx) return;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;

        let baseScale;
        if (imgAspect > canvasAspect) {
            baseScale = h / img.naturalHeight;
        } else {
            baseScale = w / img.naturalWidth;
        }

        const currentScale = baseScale * imgScale;
        const drawW = img.naturalWidth * currentScale;
        const drawH = img.naturalHeight * currentScale;
        const drawX = (w - drawW) / 2 + imgOffset.x;
        const drawY = (h - drawH) / 2 + imgOffset.y;
        const sourcePoints = points.map((point) => ({
            x: Math.min(img.naturalWidth, Math.max(0, (point.x - drawX) / currentScale)),
            y: Math.min(img.naturalHeight, Math.max(0, (point.y - drawY) / currentScale)),
        }));

        ctx.beginPath();
        ctx.moveTo(sourcePoints[0].x, sourcePoints[0].y);
        for (let i = 1; i < sourcePoints.length; i++) ctx.lineTo(sourcePoints[i].x, sourcePoints[i].y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

        const croppedDataUrl = resultCanvas.toDataURL('image/png');
        setCroppedSrc(croppedDataUrl);

        if (mode === 'shape') {
            setStep('analyzing');
            const croppedImage = new window.Image();
            croppedImage.onload = () => {
                sourceImgRef.current = croppedImage;
                performAnalysis(croppedImage);
            };
            croppedImage.src = croppedDataUrl;
        } else {
            const croppedImage = new window.Image();
            croppedImage.onload = () => { sourceImgRef.current = croppedImage; };
            croppedImage.src = croppedDataUrl;
            setStep('compare');
        }
    };

    const handleAutoDetect = async () => {
        const img = sourceImgRef.current;
        if (!img || isAutoDetecting) return;

        setIsAutoDetecting(true);
        try {
            const contour = mode === 'shape' ? await getFaceShapeContour(img) : await getFaceContour(img);
            if (!contour) {
                alert(
                    isKorean
                        ? "얼굴을 찾지 못했습니다. 앞머리를 넘겨 이마와 헤어라인이 보이게 한 정면 사진으로 다시 시도하거나 직접 그려주세요."
                        : "Face not detected. Try a near-frontal photo with the forehead and hairline visible, or draw manually."
                );
                return;
            }

            const canvas = cropCanvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = w / h;

            let baseScale;
            if (imgAspect > canvasAspect) {
                baseScale = h / img.naturalHeight;
            } else {
                baseScale = w / img.naturalWidth;
            }

            const currentScale = baseScale * imgScale;
            const drawX = (w - img.naturalWidth * currentScale) / 2 + imgOffset.x;
            const drawY = (h - img.naturalHeight * currentScale) / 2 + imgOffset.y;

            // Map image-space landmarks to canvas-space points
            const canvasPoints = contour.map(p => ({
                x: drawX + p.x * currentScale,
                y: drawY + p.y * currentScale
            }));

            setPoints(canvasPoints);
        } catch (e) {
            console.error("Auto detect failed", e);
        } finally {
            setIsAutoDetecting(false);
        }
    };

    const skipCrop = () => {
        setCroppedSrc(imageSrc);
        if (mode === 'shape') {
            setStep('analyzing');
            if (sourceImgRef.current) {
                performAnalysis(sourceImgRef.current);
            }
        } else {
            setStep('compare');
        }
    };

    const handleReset = () => {
        if (imageSrc) URL.revokeObjectURL(imageSrc);
        setImageSrc(null);
        setCroppedSrc(null);
        setActiveColor(null);
        setActiveSeason(null);
        setPoints([]);
        sessionStorage.removeItem('lastFaceShapeAnalysis');
        setStep('upload');
    };

    const performAnalysis = async (img: HTMLImageElement) => {
        if (isAnalyzing) return;
        setIsAnalyzing(true);

        // Start status message cycle
        const statusInterval = setInterval(() => {
            setScanningStatus(prev => (prev + 1) % 4);
        }, 800);

        try {
            const startTime = Date.now();
            let colorResult: Awaited<ReturnType<typeof analyzePersonalColorAI>> | { season: SeasonId | SubSeasonId } | null = null;
            let shapeResult: Awaited<ReturnType<typeof analyzeFaceShapeAI>> | null = null;

            if (mode === 'shape') {
                shapeResult = await analyzeFaceShapeAI(img);
            } else {
                try {
                    colorResult = await analyzePersonalColorAI(img);
                } catch {
                    colorResult = { season: analyzePersonalColor(img) };
                }
            }

            // Ensure the scanning animation plays for at least 3.5 seconds for "feel"
            const elapsed = Date.now() - startTime;
            const minTime = 3800;
            if (elapsed < minTime) {
                await new Promise(resolve => setTimeout(resolve, minTime - elapsed));
            }

            clearInterval(statusInterval);

            if (mode === 'shape') {
                if (!shapeResult) {
                    throw new Error('Face shape analysis result is missing.');
                }
                sessionStorage.setItem('lastFaceShapeAnalysis', JSON.stringify(shapeResult));
                router.push(`/face-shape/result?lang=${lang}`);
            } else {
                if (!colorResult || !('season' in colorResult)) {
                    throw new Error('Color analysis result is missing or invalid.');
                }
                sessionStorage.setItem('lastAnalysis', JSON.stringify(colorResult));
                router.push(`/color/result/${colorResult.season}?lang=${lang}`);
            }
        } catch (e) {
            clearInterval(statusInterval);
            console.error("Analysis failed", e);
            setIsAnalyzing(false);
            if (mode === 'shape') {
                alert(
                    isKorean
                        ? "얼굴을 인식하지 못했습니다. 앞머리를 넘겨 이마와 헤어라인이 보이고, 턱선이 잘리지 않은 정면 사진으로 다시 시도해 주세요."
                        : "Face detection failed. Try again with a near-frontal photo where the forehead, hairline, and jawline are clearly visible."
                );
                setStep('crop');
            }
        }
    };

    const handleViewResult = async () => {
        const img = sourceImgRef.current;
        if (!img) return;
        await performAnalysis(img);
    };

    // =============================================
    // STEP 1: Upload
    // =============================================
    if (step === 'upload') {
        if (mode === 'shape') {
            return (
                <div className="relative min-h-dvh w-full overflow-hidden bg-[#030712] px-6 py-10 md:px-10 md:py-14">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
                        <div className="absolute -left-48 -top-32 h-120 w-120 rounded-full bg-cyan-400/10 blur-[120px]" />
                        <div className="absolute -right-40 top-1/3 h-96 w-[24rem] rounded-full bg-sky-300/8 blur-[120px]" />
                        <div className="absolute -bottom-48 left-1/2 h-112 w-md -translate-x-1/2 rounded-full bg-white/6 blur-[140px]" />
                    </div>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl items-center">
                        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                            <div className="flex flex-col justify-center">
                                <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl">
                                    Face Structure Report
                                </div>
                                <div className="mt-6 max-w-2xl space-y-6">
                                    <h1 className={`text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl ${isKorean ? 'font-korean leading-[1.15]' : 'leading-[1.02]'}`}>
                                        {t.shapeTitle}
                                    </h1>
                                    <p className={`max-w-xl text-base leading-7 text-white/58 md:text-lg ${isKorean ? 'font-korean break-keep' : ''}`}>
                                        {t.shapeSubtitle}
                                    </p>
                                </div>
                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    {[
                                        isKorean ? "이마와 헤어라인 노출" : "Visible forehead",
                                        isKorean ? "정면에 가까운 구도" : "Near-frontal angle",
                                        isKorean ? "턱선까지 모두 포함" : "Full jawline in frame",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-[1.75rem] border border-white/10 bg-white/4 px-4 py-4 text-sm font-medium text-white/72 backdrop-blur-xl"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 rounded-4xl bg-white/5 blur-3xl" />
                                <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/4.5 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-7">
                                    <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 md:p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className={`text-sm font-semibold text-white ${isKorean ? 'font-korean' : ''}`}>{t.upload}</p>
                                                <p className="mt-2 text-sm leading-6 text-white/55">{t.shapeUploadHint}</p>
                                            </div>
                                            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                                                JPG PNG
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group mt-6 flex w-full flex-col items-center justify-center gap-5 rounded-[1.75rem] border border-dashed border-white/14 bg-[#0a1220]/70 px-6 py-12 text-center transition hover:border-white/24 hover:bg-[#0d1727]"
                                        >
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 group-hover:scale-[1.03] group-hover:bg-white/10">
                                                <Upload className="h-8 w-8 text-white/70" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className={`text-xl font-semibold tracking-[-0.03em] text-white ${isKorean ? 'font-korean' : ''}`}>{t.upload}</div>
                                                <p className="text-sm text-white/48">{t.uploadHint}</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="mt-4 grid gap-3 text-sm text-white/62 md:grid-cols-2">
                                        <div className="rounded-[1.5rem] border border-white/8 bg-black/18 px-4 py-4 leading-6">
                                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                                                {isKorean ? 'Best Result' : 'Best Result'}
                                            </div>
                                            {isKorean
                                                ? "앞머리를 넘긴 밝은 정면 사진이 가장 안정적입니다."
                                                : "Bright, near-frontal photos with the hair pushed back work best."}
                                        </div>
                                        <div className="rounded-[1.5rem] border border-white/8 bg-black/18 px-4 py-4 leading-6">
                                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                                                {isKorean ? 'Avoid' : 'Avoid'}
                                            </div>
                                            {isKorean
                                                ? "광각 셀카, 강한 그림자, 이마 가림, 턱선 잘림"
                                                : "Wide-angle selfies, heavy shadows, covered forehead, cropped jawline"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-dvh w-full bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-pink-900/20 blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]" />
                </div>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <div className="relative z-10 flex flex-col items-center gap-14 max-w-3xl w-full">
                    <div className="text-center space-y-6">
                        <h1 className={`text-4xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight px-4 ${isKorean ? 'font-korean' : 'font-cinzel'}`}>
                            {mode === 'shape' ? t.shapeTitle : t.title}
                        </h1>
                        <p className={`text-zinc-400 text-sm md:text-lg leading-relaxed max-w-[300px] md:max-w-md mx-auto ${isKorean ? 'font-korean break-keep' : ''}`}>
                            {mode === 'shape' ? t.shapeSubtitle : t.subtitle}
                        </p>
                    </div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="group w-full max-w-sm aspect-square rounded-full border-2 border-dashed border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-500 flex flex-col items-center justify-center gap-6 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] hover:border-white/20"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-white/5">
                            <Upload className="w-10 h-10 text-white/40 group-hover:text-white/90 transition-colors" />
                        </div>
                        <div className="space-y-2 text-center">
                            <span className={`text-white/80 font-bold text-lg group-hover:text-white transition-colors block ${isKorean ? 'font-korean' : ''}`}>{t.upload}</span>
                            <p className="text-zinc-500 text-xs tracking-wider uppercase font-medium">{t.uploadHint}</p>
                            {mode === 'shape' && (
                                <p className={`max-w-[18rem] text-xs leading-relaxed text-cyan-200/80 ${isKorean ? 'font-korean break-keep' : ''}`}>
                                    {t.shapeUploadHint}
                                </p>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    // =============================================
    // STEP 2: Freeform Crop
    // =============================================
    if (step === 'crop') {
        return (
            <div className="min-h-dvh w-full bg-zinc-950 flex flex-col relative overflow-hidden">
                <div className="w-full p-5 z-40 flex justify-between items-center shrink-0">
                    <h2 className={`text-lg font-bold text-white ${isKorean ? 'font-korean' : ''}`}>{t.cropTitle}</h2>
                    <button onClick={handleReset} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 active:scale-95 transition-all">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
                <p className={`text-zinc-400 text-sm text-center px-6 mb-3 shrink-0 ${isKorean ? 'font-korean' : ''}`}>
                    {mode === 'shape' ? t.shapeCropHint : t.cropHint}
                </p>
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 flex items-center justify-center min-h-0">
                    <div className="w-full relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-zinc-900/40">
                        <canvas
                            ref={cropCanvasRef}
                            className="w-full h-full block touch-none cursor-crosshair opacity-100"
                            style={{ aspectRatio: sourceImgRef.current ? `${sourceImgRef.current.naturalWidth}/${sourceImgRef.current.naturalHeight}` : '1/1', maxHeight: '55vh' }}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                        />
                    </div>
                </div>
                <div className="w-full p-5 pb-8 flex flex-col gap-4 max-w-xl mx-auto shrink-0 z-10">

                    {/* Magic Auto Detect Button */}
                    <button
                        onClick={handleAutoDetect}
                        disabled={isAutoDetecting}
                        className={`w-full py-4 rounded-full bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-white/20 text-white font-bold flex items-center justify-center gap-3 hover:from-purple-500/30 hover:to-blue-500/30 transition-all shadow-lg active:scale-95 group overflow-hidden relative ${isAutoDetecting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* AI Badge on the Left */}
                        <div className="px-2 py-0.5 rounded-full bg-purple-500/30 text-[10px] font-black uppercase tracking-tighter border border-purple-500/40 z-10">AI</div>

                        {isAutoDetecting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin z-10" />}

                        <span className={`z-10 ${isKorean ? 'font-korean' : ''}`}>
                            {isAutoDetecting
                                ? (isKorean ? 'AI 분석 중...' : 'AI Analyzing...')
                                : (isKorean ? 'AI 자동 얼굴 감지' : 'AI Auto Detect')}
                        </span>
                    </button>

                    {/* Tool Bar: Pan/Zoom vs Draw */}
                    <div className="flex flex-col gap-4 mb-2">
                        <div className="flex bg-zinc-900/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md relative">
                            {/* Animated Background Pill */}
                            <motion.div
                                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                animate={{ left: cropMode === 'move' ? '6px' : 'calc(50%)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />

                            <button
                                onClick={() => setCropMode('move')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-colors relative z-10 ${cropMode === 'move' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
                            >
                                <Move className="w-4 h-4" />
                                {isKorean ? '사진 이동/확대' : 'Move & Zoom'}
                            </button>
                            <button
                                onClick={() => setCropMode('draw')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-colors relative z-10 ${cropMode === 'draw' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
                            >
                                <PenTool className="w-4 h-4" />
                                {isKorean ? '얼굴 선 그리기' : 'Draw Area'}
                            </button>
                        </div>

                        {cropMode === 'move' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 px-6 py-3 bg-zinc-900/50 rounded-full border border-white/5 backdrop-blur-sm"
                            >
                                <ZoomOut className="w-4 h-4 text-zinc-400 shrink-0" />
                                <input
                                    type="range"
                                    min="0.5" max="3" step="0.05"
                                    value={imgScale}
                                    onChange={(e) => setImgScale(parseFloat(e.target.value))}
                                    className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hover:accent-pink-300 transition-colors"
                                />
                                <ZoomIn className="w-4 h-4 text-zinc-400 shrink-0" />
                            </motion.div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => { setPoints([]); requestAnimationFrame(drawCropCanvas); }}
                            className={`flex-1 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all focus:outline-hidden ${isKorean ? 'font-korean' : ''}`}>
                            <Undo2 className="w-4 h-4" />{t.cropUndo}
                        </button>
                        <button onClick={applyCrop} disabled={points.length < 3}
                            className={`flex-1 py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all focus:outline-hidden ${isKorean ? 'font-korean' : ''}
                                ${points.length >= 3 ? 'bg-linear-to-r from-pink-500 to-purple-500 text-white shadow-[0_4px_20px_-5px_rgba(236,72,153,0.5)]' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5'}`}>
                            <Check className="w-4 h-4" />{t.cropDone}
                        </button>
                    </div>
                    <button onClick={skipCrop} className={`w-full py-2 mb-2 text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors ${isKorean ? 'font-korean' : ''}`}>
                        {t.cropSkip}
                    </button>
                </div>
            </div>
        );
    }

    // =============================================
    // STEP: Analyzing (High-Tech Scanning UI)
    // =============================================
    if (step === 'analyzing') {
        const statuses = [
            isKorean ? "안면 랜드마크 스캐닝 중..." : "Scanning facial landmarks...",
            isKorean ? "얼굴 윤곽 및 비율 분석 중..." : "Analyzing contour & proportions...",
            isKorean ? "황금 비율 매칭 시스템 가동..." : "Running Golden Ratio matching...",
            isKorean ? "최적의 스타일 가이드 생성 중..." : "Generating style guide..."
        ];

        return (
            <div className="min-h-dvh w-full bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {/* Background Tech Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-950/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[100px]" />
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                    {/* Analysis Frame */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-12">
                        {/* The User's Face */}
                        <div className="relative w-full h-full rounded-4xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-zinc-900/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={croppedSrc || imageSrc || ''}
                                alt="Scanning"
                                className="w-full h-full object-cover grayscale opacity-60"
                            />

                            {/* High-Tech Mask Overlay (SVG) */}
                            <motion.svg
                                viewBox="0 0 100 100"
                                className="absolute inset-0 w-full h-full text-cyan-400 opacity-40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <g stroke="currentColor" fill="none" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M50,10 L32,15 L20,35 L20,58 L35,85 L50,92 L65,85 L80,58 L80,35 L68,15 Z" />
                                    <path d="M25,40 L35,38 L43,40 L44,43 L35,46 L26,44 Z" />
                                    <path d="M57,40 L65,38 L75,40 L74,44 L65,46 L56,43 Z" />
                                    <path d="M44,40 L50,32 L56,40" />
                                    <path d="M42,65 L50,70 L58,65 L54,55 L46,55 Z" />
                                    <path d="M36,75 L45,78 L50,76 L55,78 L64,75 L50,85 Z" />
                                    <path d="M20,35 L42,65 M80,35 L58,65" strokeWidth="0.15" opacity="0.4" />
                                </g>
                            </motion.svg>

                            {/* Scanning Vertical Bar */}
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20"
                                initial={{ top: '0%' }}
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                            {/* Data Points (Randomly appearing dots) */}
                            <div className="absolute inset-0">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                        style={{ top: `${20 + Math.random() * 60}%`, left: `${20 + Math.random() * 60}%` }}
                                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                                        transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Outer Tech Ring */}
                        <motion.div
                            className="absolute -inset-6 border border-cyan-500/10 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -inset-4 border-t border-b border-cyan-400/20 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Status Info */}
                    <div className="space-y-4 w-full">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px flex-1 bg-linear-to-r from-transparent to-cyan-500/50" />
                            <span className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Processing Analysis</span>
                            <div className="h-px flex-1 bg-linear-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <div className="h-8 flex flex-col items-center justify-center">
                            <motion.p
                                key={scanningStatus}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-white text-lg font-bold ${isKorean ? 'font-korean' : 'font-cinzel tracking-wider'}`}
                            >
                                {statuses[scanningStatus]}
                            </motion.p>
                        </div>

                        <div className="flex justify-center gap-1.5">
                            {[0, 1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-300 ${scanningStatus === i ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'w-2 bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Tech Text Items */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 text-[10px] font-mono text-cyan-500/40">
                    <div className="flex flex-col items-start">
                        <span>SYS_AUTH: VERIFIED</span>
                        <span>LATENCY: 14ms</span>
                    </div>
                    <div className="flex flex-col items-start text-blue-500/40">
                        <span>AI_CORE: ACTIVE</span>
                        <span>PROB: 0.9982</span>
                    </div>
                </div>
            </div>
        );
    }
    const bgColor = activeColor || '#111111';
    // Determine if background is light or dark for text contrast
    const isLightBg = activeColor ? (() => {
        const hex = activeColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 150;
    })() : false;

    return (
        <div className="min-h-dvh w-full relative overflow-hidden flex flex-col transition-colors duration-500" style={{ backgroundColor: bgColor }}>
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 py-6 z-40 relative shrink-0">
                <h2 className={`text-lg font-bold tracking-widest uppercase transition-colors duration-300 font-mono drop-shadow-sm`}
                    style={{ color: isLightBg ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)' }}>
                    {activeColor ? activeColor.toUpperCase() : '#FFFFFF'}
                </h2>
                <button onClick={handleReset}
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border active:scale-95 transition-all
                        ${isLightBg ? 'bg-black/5 border-black/10 text-black/50 hover:text-black' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}>
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Face image — large, no frame */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-4">
                <motion.div layout className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={croppedSrc || imageSrc || ''} alt="Face" className="w-full h-full object-contain drop-shadow-2xl" />
                </motion.div>
            </div>

            {/* Bottom Panel */}
            <div className="z-40 shrink-0 bg-[#121212] rounded-t-[32px] pt-6 pb-10 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
                <div className="max-w-lg mx-auto flex flex-col gap-6">
                    {/* Season Tabs - Transparent with glowing border for active */}
                    <div className="bg-[#1c1c1c] rounded-full p-2 flex gap-1 shadow-inner relative z-20">
                        {(Object.keys(seasonMeta) as SeasonId[]).map((season) => {
                            const dotColors: Record<SeasonId, string> = {
                                spring: '#FF8A65', summer: '#4FC3F7', autumn: '#FFD54F', winter: '#BA68C8',
                            };
                            const glowColors: Record<SeasonId, string> = {
                                spring: 'rgba(255, 138, 101, 0.4)', summer: 'rgba(79, 195, 247, 0.4)', autumn: 'rgba(255, 213, 79, 0.4)', winter: 'rgba(186, 104, 200, 0.4)',
                            };
                            const isActive = activeSeason === season;

                            return (
                                <button key={season}
                                    onClick={() => { setActiveSeason(season); setActiveColor(SEASON_SWATCHES[season][0]); }}
                                    className={`flex-1 py-3.5 rounded-full text-[13px] md:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${isKorean ? 'font-korean tracking-wide' : 'font-cinzel tracking-wider'}
                                        ${isActive ? 'text-white bg-white/5' : 'text-white/40 hover:text-white/80 border border-transparent'}`}
                                    style={isActive ? {
                                        borderColor: dotColors[season],
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        boxShadow: `0 0 12px ${glowColors[season]}, inset 0 0 8px ${glowColors[season]}`
                                    } : {}}
                                >
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dotColors[season] }} />
                                    {seasonMeta[season].shortName[lang]}
                                </button>
                            );
                        })}
                    </div>

                    {/* Color Swatches Grid - Large Circles */}
                    <div className="h-[72px] flex items-center w-full">
                        {activeSeason ? (
                            <motion.div
                                ref={scrollContainerRef}
                                key={activeSeason}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="flex gap-4 overflow-x-auto custom-scrollbar pb-3 pt-2 w-full px-4 scroll-smooth relative z-20 cursor-grab active:cursor-grabbing touch-pan-x"
                                onPointerDown={onScrollPointerDown}
                                onPointerUp={onScrollPointerUp}
                                onPointerLeave={onScrollPointerLeave}
                                onPointerMove={onScrollPointerMove}
                            >
                                {SEASON_SWATCHES[activeSeason].map((color, i) => {
                                    const isSelected = activeColor === color;
                                    return (
                                        <button key={i} onClick={() => setActiveColor(color)}
                                            className="relative group shrink-0"
                                        >
                                            <div className={`w-14 h-14 rounded-full transition-all duration-300
                                                ${isSelected ? 'scale-100' : 'scale-90 opacity-80 group-hover:scale-95 group-hover:opacity-100'}`}
                                                style={{
                                                    backgroundColor: color,
                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                                                }}
                                            />
                                            {/* Double ring selection indicator */}
                                            {isSelected && (
                                                <motion.div
                                                    layoutId="swatch-selection"
                                                    className="absolute -inset-[3px] rounded-full border-2 border-white pointer-events-none"
                                                    style={{ boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}

                                {/* Custom Color Picker */}
                                <div className="relative group shrink-0 ml-2">
                                    <label className={`w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden border border-white/20 hover:border-white/50 bg-[#1c1c1c]
                                        ${activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? 'scale-100 ring-2 ring-white ring-offset-2 ring-offset-[#121212]' : 'scale-90 opacity-80 group-hover:scale-95 group-hover:opacity-100'}`}
                                        style={activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? { backgroundColor: activeColor } : {}}
                                    >
                                        {/* Rainbow gradient background when no custom color selected */}
                                        {!(activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor)) && (
                                            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#8b00ff)]" />
                                        )}
                                        {/* Plus Icon or Check Icon */}
                                        {activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-5 h-5 z-10"
                                                viewBox="0 0 24 24" fill="none"
                                                stroke={
                                                    // Determine contrast color
                                                    (() => {
                                                        const hex = activeColor.replace('#', '');
                                                        const lum = (parseInt(hex.substring(0, 2), 16) * 299 + parseInt(hex.substring(2, 4), 16) * 587 + parseInt(hex.substring(4, 6), 16) * 114) / 1000;
                                                        return lum > 150 ? '#000' : '#fff';
                                                    })()
                                                }
                                                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </motion.svg>
                                        ) : (
                                            <div className="w-5 h-5 relative z-10">
                                                <div className="absolute inset-x-0 inset-y-2.5 h-[2px] bg-white rounded-full" />
                                                <div className="absolute inset-y-0 inset-x-2.5 w-[2px] bg-white rounded-full" />
                                            </div>
                                        )}
                                        {/* Native color input */}
                                        <input
                                            type="color"
                                            value={activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? activeColor : '#ffffff'}
                                            onChange={(e) => setActiveColor(e.target.value)}
                                            className="absolute opacity-0 w-full h-full cursor-pointer"
                                        />
                                    </label>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-sm font-medium">
                                {isKorean ? "컬러를 확인할 시즌을 선택해주세요" : "Select a season to view colors"}
                            </div>
                        )}
                    </div>

                    {/* Result Button - Dark Premium Style */}
                    <button onClick={handleViewResult} disabled={isAnalyzing}
                        className={`w-full py-4 mt-2 rounded-full font-bold text-base transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2
                            bg-[#1c1c1c] text-white border border-white/10 hover:bg-[#252525] shadow-lg
                            ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
                            ${isKorean ? 'font-korean' : ''}`}>
                        {isAnalyzing && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        {isAnalyzing ? t.analyzing : t.select_btn}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ColorTestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ColorTestContent />
        </Suspense>
    );
}
