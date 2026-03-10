"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Upload, Move, PenTool, ZoomIn, ZoomOut, Undo2, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { LanguageSelector } from "@/components/language-selector";
import { getFooterLabels } from "@/lib/site-content";
import { SeasonId, SubSeasonId, analyzePersonalColor } from "@/lib/color-data";
import { analyzePersonalColorAI, preloadModel, getFaceContour } from "@/lib/face-color-analysis";
import {
    analyzeFaceShapeAI,
    analyzeFaceShapeFromEditor,
    buildFaceShapeEditorContour,
    getFallbackFaceShapeEditorDraft,
    getFaceShapeEditorDraft,
    getFaceShapeEditorPreview,
    getFaceShapeContour,
    type FacePoint,
    type FaceShapePreviewResult,
    preloadFaceShapeModel,
} from "@/lib/face-shape-analysis-official";
import { motion, AnimatePresence } from "framer-motion";
import { FaceShapeFrameEditor } from "@/components/FaceShapeFrameEditor";

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
        shapeFrameFallback: "AI 초안을 못 잡아도 괜찮습니다. 바깥 프레임을 직접 맞춘 뒤 그대로 분석할 수 있습니다.",
        shapeGateBlocked: "사진 또는 프레임 품질이 아직 부족합니다. 아래 품질 항목을 기준으로 프레임을 더 맞추거나 사진을 다시 선택해 주세요.",
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
        shapeFrameFallback: "If the AI draft misses, you can still place the outer frame yourself and analyze from that frame.",
        shapeGateBlocked: "The photo or frame quality is still too weak. Refine the frame using the quality panel below, or choose a better photo.",
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
        shapeFrameFallback: "即使 AI 草稿失败，您也可以手动调整外轮廓后继续分析。",
        shapeGateBlocked: "当前照片或外框质量仍然不足。请参考下方质量面板继续调整，或重新选择照片。",
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
        shapeFrameFallback: "AI 下書きに失敗しても、外側フレームを手動で合わせてそのまま分析できます。",
        shapeGateBlocked: "写真またはフレーム品質がまだ不足しています。下の品質パネルを見ながら調整するか、写真を変えてください。",
    },
};

type Step = 'upload' | 'crop' | 'shape-adjust' | 'compare' | 'analyzing';

function ColorTestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = (['ko', 'en', 'zh', 'ja'].includes(searchParams.get('lang') || '') ? searchParams.get('lang') : 'en') as Lang;
    const mode = searchParams.get('mode') || 'color';
    const isKorean = lang === 'ko';
    const t = UI_TEXT[lang];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const footer = getFooterLabels(lang);
    const MENU_LABELS: Record<Lang, { aesthetic: string; color: string; faceShape: string }> = {
        ko: { aesthetic: "감성 테스트", color: "퍼스널 컬러", faceShape: "AI얼굴형분석" },
        en: { aesthetic: "Aesthetic Test", color: "Personal Color", faceShape: "AI Face Shape Analysis" },
        zh: { aesthetic: "美学测试", color: "个人色彩", faceShape: "脸型分析" },
        ja: { aesthetic: "感性テスト", color: "パーソナルカラー", faceShape: "顔型分析" },
    };
    const menu = MENU_LABELS[lang];

    const [step, setStep] = useState<Step>('upload');
    const [scanningStatus, setScanningStatus] = useState(0);
    const [isAutoDetecting, setIsAutoDetecting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedSrc, setCroppedSrc] = useState<string | null>(null);
    const [activeColor, setActiveColor] = useState<string | null>(null);
    const [activeSeason, setActiveSeason] = useState<SeasonId | null>(null);
    const [shapeFrameHandles, setShapeFrameHandles] = useState<FacePoint[]>([]);
    const [shapeFrameDraft, setShapeFrameDraft] = useState<FacePoint[]>([]);
    const [isShapeFrameLoading, setIsShapeFrameLoading] = useState(false);
    const [shapeFrameNotice, setShapeFrameNotice] = useState<string | null>(null);
    const [shapeFramePreview, setShapeFramePreview] = useState<FaceShapePreviewResult | null>(null);
    const [isShapeFramePreviewing, setIsShapeFramePreviewing] = useState(false);
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
        setShapeFrameHandles([]);
        setShapeFrameDraft([]);
        setShapeFrameNotice(null);
        setShapeFramePreview(null);
        setIsShapeFramePreviewing(false);
        const img = new window.Image();
        img.onload = () => {
            sourceImgRef.current = img;
            if (mode === 'shape') {
                setCroppedSrc(url);
                openShapeFrameAdjuster(img);
            } else {
                setStep('crop');
            }
        };
        img.src = url;
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
            const croppedImage = new window.Image();
            croppedImage.onload = () => {
                sourceImgRef.current = croppedImage;
                openShapeFrameAdjuster(croppedImage);
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

    const openShapeFrameAdjuster = useCallback(async (img: HTMLImageElement) => {
        setStep('shape-adjust');
        setIsShapeFrameLoading(true);
        setShapeFrameNotice(null);
        setShapeFramePreview(null);
        try {
            const draft = await getFaceShapeEditorDraft(img);
            setShapeFrameHandles(draft.handles);
            setShapeFrameDraft(draft.handles);
        } catch (error) {
            console.error("Shape frame draft failed", error);
            const fallbackDraft = getFallbackFaceShapeEditorDraft();
            setShapeFrameHandles(fallbackDraft.handles);
            setShapeFrameDraft(fallbackDraft.handles);
            setShapeFrameNotice(t.shapeFrameFallback);
        } finally {
            setIsShapeFrameLoading(false);
        }
    }, [t.shapeFrameFallback]);

    useEffect(() => {
        if (step !== 'shape-adjust' || mode !== 'shape') return;
        const img = sourceImgRef.current;
        if (!img || shapeFrameHandles.length < 6) return;

        let cancelled = false;
        setIsShapeFramePreviewing(true);

        const timer = window.setTimeout(() => {
            void getFaceShapeEditorPreview(img, shapeFrameHandles)
                .then((preview) => {
                    if (cancelled) return;
                    setShapeFramePreview(preview);
                    if (preview.gate.canAnalyze) {
                        setShapeFrameNotice((previous) => (previous === t.shapeGateBlocked ? null : previous));
                    }
                })
                .catch((error) => {
                    console.error("Shape frame preview failed", error);
                    if (cancelled) return;
                    setShapeFramePreview(null);
                })
                .finally(() => {
                    if (cancelled) return;
                    setIsShapeFramePreviewing(false);
                });
        }, 120);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [mode, shapeFrameHandles, step, t.shapeGateBlocked]);

    const skipCrop = () => {
        setCroppedSrc(imageSrc);
        if (mode === 'shape') {
            if (sourceImgRef.current) {
                openShapeFrameAdjuster(sourceImgRef.current);
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
        setShapeFrameHandles([]);
        setShapeFrameDraft([]);
        setShapeFrameNotice(null);
        setIsShapeFrameLoading(false);
        setShapeFramePreview(null);
        setIsShapeFramePreviewing(false);
        sessionStorage.removeItem('lastFaceShapeAnalysis');
        setStep('upload');
    };

    const performAnalysis = async (img: HTMLImageElement, manualFrameHandles?: FacePoint[]) => {
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
                shapeResult = manualFrameHandles?.length
                    ? await analyzeFaceShapeFromEditor(img, manualFrameHandles)
                    : await analyzeFaceShapeAI(img);
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
                setStep(manualFrameHandles?.length ? 'shape-adjust' : 'crop');
            }
        }
    };

    const handleViewResult = async () => {
        const img = sourceImgRef.current;
        if (!img) return;
        await performAnalysis(img);
    };

    const handleAnalyzeAdjustedFrame = async () => {
        const img = sourceImgRef.current;
        if (!img || shapeFrameHandles.length < 6) return;
        const preview = shapeFramePreview ?? await getFaceShapeEditorPreview(img, shapeFrameHandles);
        setShapeFramePreview(preview);
        if (!preview.gate.canAnalyze) {
            setShapeFrameNotice(t.shapeGateBlocked);
            return;
        }
        setShapeFrameNotice(null);
        setStep('analyzing');
        await performAnalysis(img, shapeFrameHandles);
    };

    // =============================================
    // Content Renderer
    // =============================================
    const renderStep = () => {
        if (step === 'upload') {
            const isShape = mode === 'shape';
            return (
                <div className="flex-1 w-full bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] ${isShape ? 'bg-cyan-900/20' : 'bg-pink-900/20'}`} />
                        <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${isShape ? 'bg-blue-900/20' : 'bg-purple-900/20'}`} />
                    </div>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <div className="relative z-10 flex flex-col items-center gap-14 max-w-3xl w-full">
                        <div className="text-center space-y-6">
                            <h1 className={`text-4xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight px-4 ${isKorean ? 'font-korean' : 'font-cinzel'}`}>
                                {isShape ? t.shapeTitle : t.title}
                            </h1>
                            <p className={`text-zinc-400 text-sm md:text-lg leading-relaxed max-w-[300px] md:max-w-md mx-auto ${isKorean ? 'font-korean break-keep' : ''}`}>
                                {isShape ? t.shapeSubtitle : t.subtitle}
                            </p>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="group w-full max-w-sm aspect-square rounded-full border-2 border-dashed border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-500 flex flex-col items-center justify-center gap-6 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] hover:border-white/20"
                        >
                            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-white/5">
                                <Upload className="w-10 h-10 text-white/40 group-hover:text-white/90 transition-colors" />
                            </div>
                            <div className="space-y-2 text-center flex flex-col items-center">
                                <span className={`text-white/80 font-bold text-lg group-hover:text-white transition-colors block ${isKorean ? 'font-korean' : ''}`}>{t.upload}</span>
                                <p className="text-zinc-500 text-xs tracking-wider uppercase font-medium mt-1">{t.uploadHint}</p>
                                {isShape && (
                                    <p className={`max-w-[18rem] text-xs leading-relaxed mt-2 text-cyan-200/80 ${isKorean ? 'font-korean break-keep' : ''}`}>
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
                <div className="flex-1 w-full bg-zinc-950 flex flex-col relative overflow-hidden">
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

        if (step === 'shape-adjust') {
            const shapeImageSrc = croppedSrc || imageSrc || '';
            const shapeAspectRatio = sourceImgRef.current
                ? sourceImgRef.current.naturalWidth / sourceImgRef.current.naturalHeight
                : 3 / 4;
            const shapeContour = buildFaceShapeEditorContour(shapeFrameHandles);

            return (
                <FaceShapeFrameEditor
                    imageSrc={shapeImageSrc}
                    aspectRatio={shapeAspectRatio}
                    handles={shapeFrameHandles}
                    contour={shapeContour}
                    isKo={isKorean}
                    isLoading={isShapeFrameLoading}
                    isAnalyzing={isAnalyzing}
                    isPreviewing={isShapeFramePreviewing}
                    notice={shapeFrameNotice}
                    preview={shapeFramePreview}
                    onChangeHandles={setShapeFrameHandles}
                    onRestoreDraft={() => setShapeFrameHandles(shapeFrameDraft)}
                    onReloadDraft={() => {
                        if (sourceImgRef.current) {
                            void openShapeFrameAdjuster(sourceImgRef.current);
                        }
                    }}
                    onAnalyze={() => {
                        void handleAnalyzeAdjustedFrame();
                    }}
                    onBack={() => setStep('crop')}
                />
            );
        }

        // =============================================
        // STEP: Analyzing (High-Tech Scanning UI)
        // =============================================
        if (step === 'analyzing') {
            const statuses = [
                isKorean ? "안면 정밀 스캐닝 중..." : "Precision facial scanning...",
                isKorean ? "골든 레이쇼 랜드마크 분석..." : "Golden Ratio landmark analysis...",
                isKorean ? "패턴 매칭 및 조화도 계산..." : "Pattern matching & harmony calc...",
                isKorean ? "전문가용 스타일 리포트 생성..." : "Generating expert style report..."
            ];

            return (
                <div className="flex-1 w-full bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    {/* Background Luxe Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-cyan-900/10 blur-[150px] animate-pulse" />
                        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/10 blur-[150px]" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
                        {/* Analysis Frame - Premium Circular Mirror */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-16">
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(34,211,238,0.1)] bg-zinc-900/40 backdrop-blur-sm">
                                <div className="absolute inset-0 grayscale opacity-40 mix-blend-luminosity">
                                    <img
                                        src={croppedSrc || imageSrc || ''}
                                        alt="Scanning"
                                        className="w-full h-full object-cover scale-110 blur-[1px]"
                                    />
                                </div>
                                <div className="absolute inset-0 border-10 border-black/40 rounded-full z-10 pointer-events-none" />

                                {/* Abstract Golden Ratio Grid */}
                                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-30">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[-50%] flex items-center justify-center"
                                    >
                                        <div className="w-full h-px bg-cyan-400/30" />
                                        <div className="h-full w-px bg-cyan-400/30 absolute" />
                                        {[1, 1.618, 2.618].map((ratio, i) => (
                                            <div key={i} className="absolute rounded-full border border-cyan-400/20" style={{ width: `${ratio * 30}%`, height: `${ratio * 30}%` }} />
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Premium Scanning Bar */}
                                <motion.div
                                    className="absolute left-0 right-0 h-4 z-30 pointer-events-none"
                                    initial={{ top: '-10%' }}
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="w-full h-px bg-cyan-300 shadow-[0_0_20px_#22d3ee,0_0_40px_rgba(34,211,238,0.4)]" />
                                    <div className="w-full h-full bg-linear-to-b from-cyan-400/10 to-transparent blur-md" />
                                </motion.div>

                                {/* Particle Nebula */}
                                <div className="absolute inset-0 z-20">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_white]"
                                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                                            animate={{
                                                opacity: [0, 0.8, 0],
                                                scale: [0, 1.5, 0],
                                                transform: [`translate(0,0)`, `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`]
                                            }}
                                            transition={{ duration: 2 + Math.random() * 2, delay: i * 0.2, repeat: Infinity }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Luxury Outer Rings */}
                            <motion.div
                                className="absolute -inset-10 border-[0.5px] border-white/5 rounded-full"
                                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute -inset-8 border-t border-b border-cyan-400/10 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-400" />
                        </div>

                        {/* Status Message */}
                        <div className="space-y-6 w-full px-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-cyan-400/60 font-cinzel text-[9px] tracking-[0.5em] uppercase">Cognitive Processing</span>
                                <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />
                            </div>

                            <div className="h-10 flex flex-col items-center justify-center">
                                <motion.p
                                    key={scanningStatus}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`text-white text-xl font-medium tracking-tight ${isKorean ? 'font-korean' : 'font-cinzel tracking-wider text-2xl'}`}
                                >
                                    {statuses[scanningStatus]}
                                </motion.p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="relative">
                                        <div className={`h-[3px] rounded-full transition-all duration-700 ease-out overflow-hidden ${scanningStatus === i ? 'w-10 bg-white/20' : 'w-3 bg-white/5'}`}>
                                            {scanningStatus === i && (
                                                <motion.div
                                                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
                        <div className="px-6 py-4 rounded-2xl bg-white/3 border-white/8 backdrop-blur-xl flex justify-between items-center text-[9px] font-cinzel tracking-widest text-white/40">
                            <div className="flex flex-col gap-1 items-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                                    <span>AI_CORE_ACTIVE</span>
                                </div>
                                <span className="opacity-50">VER: 2.0.4-LUXE</span>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div className="flex flex-col gap-1 items-end">
                                <span>PROBABILITY: 0.9998</span>
                                <span className="opacity-50 text-cyan-400">SYNC_SUCCESS</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const bgColor = activeColor || '#111111';
        const isLightBg = activeColor ? (() => {
            const hex = activeColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return (r * 299 + g * 587 + b * 114) / 1000 > 150;
        })() : false;

        return (
            <div className="flex-1 w-full relative overflow-hidden flex flex-col transition-colors duration-500" style={{ backgroundColor: bgColor }}>
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

                {/* Face image */}
                <div className="flex-1 flex items-center justify-center relative z-10 px-4">
                    <motion.div layout className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
                        <img src={croppedSrc || imageSrc || ''} alt="Face" className="w-full h-full object-contain drop-shadow-2xl" />
                    </motion.div>
                </div>

                {/* Bottom Panel */}
                <div className="z-40 shrink-0 bg-[#121212] rounded-t-[32px] pt-6 pb-10 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
                    <div className="max-w-lg mx-auto flex flex-col gap-6">
                        {/* Season Tabs */}
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

                        {/* Color Swatches Grid */}
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
                                            {!(activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor)) && (
                                                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#8b00ff)]" />
                                            )}
                                            {activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? (
                                                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 z-10" viewBox="0 0 24 24" fill="none" stroke={(() => { const hex = activeColor.replace('#', ''); const lum = (parseInt(hex.substring(0, 2), 16) * 299 + parseInt(hex.substring(2, 4), 16) * 587 + parseInt(hex.substring(4, 6), 16) * 114) / 1000; return lum > 150 ? '#000' : '#fff'; })()} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </motion.svg>
                                            ) : (
                                                <div className="w-5 h-5 relative z-10">
                                                    <div className="absolute inset-x-0 inset-y-2.5 h-[2px] bg-white rounded-full" />
                                                    <div className="absolute inset-y-0 inset-x-2.5 w-[2px] bg-white rounded-full" />
                                                </div>
                                            )}
                                            <input type="color" value={activeColor && !SEASON_SWATCHES[activeSeason].includes(activeColor) ? activeColor : '#ffffff'} onChange={(e) => setActiveColor(e.target.value)} className="absolute opacity-0 w-full h-full cursor-pointer" />
                                        </label>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20 text-sm font-medium">
                                    {isKorean ? "컬러를 확인할 시즌을 선택해주세요" : "Select a season to view colors"}
                                </div>
                            )}
                        </div>

                        {/* Result Button */}
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
    }; // End of renderStep

    return (
        <div className="min-h-dvh flex flex-col relative w-full overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl shrink-0">
                <div className="flex items-center shrink-0 justify-start">
                    <Link href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                        FINDCORE
                    </Link>
                </div>
                <div className="hidden sm:flex items-center justify-center">
                    <nav className="flex items-center gap-8">
                        <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">{menu.aesthetic}</Link>
                        <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-pink-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">{menu.color}</Link>
                        <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-cyan-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">{menu.faceShape}</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-3 sm:gap-0 justify-end">
                    <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`${window.location.pathname}?lang=${l}&mode=${mode}`)} />
                    <button className="sm:hidden p-2 text-white/80 hover:text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile Full-Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl sm:hidden flex flex-col"
                    >
                        <div className="flex justify-end px-4 py-3">
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/80 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <Link href={`/?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-white/90 hover:text-white transition-colors tracking-widest uppercase">
                                    {menu.aesthetic}
                                </Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <Link href={`/color?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-pink-300 hover:text-pink-200 transition-colors tracking-widest uppercase">
                                    {menu.color}
                                </Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <Link href={`/face-shape?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-cyan-300 hover:text-cyan-200 transition-colors tracking-widest uppercase">
                                    {menu.faceShape}
                                </Link>
                            </motion.div>
                        </div>
                        <div className="pb-10 text-center">
                            <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-cinzel">FINDCORE</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            {renderStep()}

            {/* Footer */}
            <footer className="w-full shrink-0 border-t border-white/5 bg-black/20 px-8 py-6 backdrop-blur-sm mt-auto">
                <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <p className="hidden text-white/38 text-[10px] uppercase tracking-[0.2em] font-light md:block">findcore.me</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-white/48">
                        <Link href={`/about?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.about}</Link>
                        <Link href={`/guides?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.guides}</Link>
                        <Link href={`/privacy?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.privacy}</Link>
                        <Link href={`/terms?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.terms}</Link>
                    </div>
                    <div className="text-center text-[11px] text-white/44 md:text-right">
                        <a href="https://t.me/todayshelp" target="_blank" rel="noopener noreferrer" className="hover:text-white/78 transition-colors">
                            Telegram @todayshelp
                        </a>
                    </div>
                </div>
            </footer>
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
