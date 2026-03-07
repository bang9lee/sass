"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, RotateCcw, Layers, Check, Undo2 } from "lucide-react";
import { COLOR_RESULTS, SeasonId } from "@/lib/color-data";
import { analyzePersonalColorAI, preloadModel } from "@/lib/face-color-analysis";
import { motion } from "framer-motion";

// =============================================
// Color swatches per season
// =============================================
const SEASON_SWATCHES: Record<SeasonId, string[]> = {
    spring: [
        '#FFB6C1', '#FFA07A', '#FFD700', '#98FB98', '#FFDAB9',
        '#F0E68C', '#FA8072', '#FF6347', '#FFC0CB', '#FF7F50',
        '#FFEC8B', '#EEE8AA', '#FAFAD2', '#F5DEB3', '#FFE4B5',
    ],
    summer: [
        '#E6E6FA', '#ADD8E6', '#FFB6C1', '#D8BFD8', '#B0C4DE',
        '#C8A2C8', '#87CEEB', '#AFEEEE', '#DDA0DD', '#E0BBE4',
        '#D4E6F1', '#AED6F1', '#A9CCE3', '#FADBD8', '#F5B7B1',
    ],
    autumn: [
        '#8B4513', '#DAA520', '#556B2F', '#A52A2A', '#D2B48C',
        '#B8860B', '#CD853F', '#BC8F8F', '#A0522D', '#6B4226',
        '#808000', '#9ACD32', '#BDB76B', '#8B7355', '#C04000',
    ],
    winter: [
        '#000000', '#FFFFFF', '#DC143C', '#0000CD', '#FF00FF',
        '#4169E1', '#8B008B', '#191970', '#C71585', '#00008B',
        '#800020', '#E0E0E0', '#483D8B', '#1C1C1C', '#FF1493',
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
    },
};

type Step = 'upload' | 'crop' | 'compare';

function ColorTestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = (['ko', 'en', 'zh', 'ja'].includes(searchParams.get('lang') || '') ? searchParams.get('lang') : 'en') as Lang;
    const isKorean = lang === 'ko';
    const t = UI_TEXT[lang];

    const [step, setStep] = useState<Step>('upload');
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

    useEffect(() => {
        preloadModel().catch(console.error);
    }, []);

    const seasonMeta: Record<SeasonId, { name: Record<Lang, string> }> = {
        spring: { name: { ko: "봄 웜톤", en: "Spring", zh: "春季暖色", ja: "イエベ春" } },
        summer: { name: { ko: "여름 쿨톤", en: "Summer", zh: "夏季冷色", ja: "ブルベ夏" } },
        autumn: { name: { ko: "가을 웜톤", en: "Autumn", zh: "秋季暖色", ja: "イエベ秋" } },
        winter: { name: { ko: "겨울 쿨톤", en: "Winter", zh: "冬季冷色", ja: "ブルベ冬" } },
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

        // Draw image cover
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;
        let drawW: number, drawH: number, drawX: number, drawY: number;
        if (imgAspect > canvasAspect) {
            drawH = h; drawW = h * imgAspect; drawX = (w - drawW) / 2; drawY = 0;
        } else {
            drawW = w; drawH = w / imgAspect; drawX = 0; drawY = (h - drawH) / 2;
        }
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
        if (isDrawing && points.length > 0) {
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }, [points, isDrawing]);

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
        setPoints([getCanvasPoint(e)]);
        cropCanvasRef.current?.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        setPoints(prev => [...prev, getCanvasPoint(e)]);
    };
    const onPointerUp = () => setIsDrawing(false);

    // =============================================
    // Apply crop → go to compare step
    // =============================================
    const applyCrop = useCallback(() => {
        const img = sourceImgRef.current;
        const canvas = cropCanvasRef.current;
        if (!img || !canvas || points.length < 3) return;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const dpr = window.devicePixelRatio || 1;

        const resultCanvas = document.createElement('canvas');
        resultCanvas.width = w * dpr;
        resultCanvas.height = h * dpr;
        const ctx = resultCanvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(dpr, dpr);

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;
        let drawW: number, drawH: number, drawX: number, drawY: number;
        if (imgAspect > canvasAspect) {
            drawH = h; drawW = h * imgAspect; drawX = (w - drawW) / 2; drawY = 0;
        } else {
            drawW = w; drawH = w / imgAspect; drawX = 0; drawY = (h - drawH) / 2;
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        setCroppedSrc(resultCanvas.toDataURL('image/png'));
        setStep('compare');
    }, [points]);

    const skipCrop = () => {
        setCroppedSrc(imageSrc);
        setStep('compare');
    };

    const handleReset = () => {
        if (imageSrc) URL.revokeObjectURL(imageSrc);
        setImageSrc(null);
        setCroppedSrc(null);
        setActiveColor(null);
        setActiveSeason(null);
        setPoints([]);
        setStep('upload');
    };

    const handleViewResult = async () => {
        const img = sourceImgRef.current;
        if (!img || isAnalyzing) return;

        setIsAnalyzing(true);
        try {
            const result = await analyzePersonalColorAI(img);
            // Save full result temporarily to sessionStorage to display later if needed
            sessionStorage.setItem('lastAnalysis', JSON.stringify(result));
            router.push(`/color/result/${result.season}?lang=${lang}`);
        } catch (e) {
            console.error("Analysis failed", e);
            setIsAnalyzing(false);
        }
    };

    // =============================================
    // STEP 1: Upload
    // =============================================
    if (step === 'upload') {
        return (
            <div className="min-h-dvh w-full bg-black flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-pink-900/20 blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]" />
                </div>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg w-full">
                    <div className="text-center space-y-4">
                        <h1 className={`text-4xl md:text-5xl font-bold text-white tracking-tight ${isKorean ? 'font-korean' : 'font-cinzel'}`}>{t.title}</h1>
                        <p className={`text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line ${isKorean ? 'font-korean word-keep-all' : ''}`}>{t.subtitle}</p>
                    </div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="group w-full max-w-sm aspect-square rounded-3xl border-2 border-dashed border-white/15 bg-white/3 hover:bg-white/6 transition-all duration-300 flex flex-col items-center justify-center gap-5"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-9 h-9 text-white/50 group-hover:text-white/80 transition-colors" />
                        </div>
                        <div className="space-y-1 text-center">
                            <span className={`text-white/70 font-semibold text-base group-hover:text-white transition-colors ${isKorean ? 'font-korean' : ''}`}>{t.upload}</span>
                            <p className="text-zinc-500 text-xs">{t.uploadHint}</p>
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
                <p className={`text-zinc-400 text-sm text-center px-6 mb-3 shrink-0 ${isKorean ? 'font-korean' : ''}`}>{t.cropHint}</p>
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 flex items-center justify-center min-h-0">
                    <canvas
                        ref={cropCanvasRef}
                        className="w-full rounded-2xl border border-white/10 touch-none cursor-crosshair"
                        style={{ aspectRatio: sourceImgRef.current ? `${sourceImgRef.current.naturalWidth}/${sourceImgRef.current.naturalHeight}` : '1/1', maxHeight: '55vh' }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                    />
                </div>
                <div className="w-full p-5 pb-8 flex flex-col gap-3 max-w-xl mx-auto shrink-0">
                    <div className="flex gap-3">
                        <button onClick={() => { setPoints([]); requestAnimationFrame(drawCropCanvas); }}
                            className={`flex-1 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${isKorean ? 'font-korean' : ''}`}>
                            <Undo2 className="w-4 h-4" />{t.cropUndo}
                        </button>
                        <button onClick={applyCrop} disabled={points.length < 3}
                            className={`flex-1 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${isKorean ? 'font-korean' : ''}
                                ${points.length >= 3 ? 'bg-white text-black shadow-lg' : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'}`}>
                            <Check className="w-4 h-4" />{t.cropDone}
                        </button>
                    </div>
                    <button onClick={skipCrop} className={`w-full py-3 text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors ${isKorean ? 'font-korean' : ''}`}>
                        {t.cropSkip}
                    </button>
                </div>
            </div>
        );
    }

    // =============================================
    // STEP 3: Compare — cropped face on colored bg
    // =============================================
    const bgColor = activeColor || '#111111';
    const isDark = !activeColor;

    return (
        <div className="min-h-dvh w-full relative overflow-hidden transition-colors duration-500 flex flex-col" style={{ backgroundColor: bgColor }}>
            {/* Top Bar */}
            <div className="flex justify-between items-center p-5 z-40 relative shrink-0">
                <h2 className={`text-lg font-bold drop-shadow-md transition-colors duration-300 ${isKorean ? 'font-korean' : ''}`}
                    style={{ color: isDark ? '#fff' : '#333' }}>
                    {activeSeason ? seasonMeta[activeSeason].name[lang] : t.none}
                </h2>
                <button onClick={handleReset}
                    className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border active:scale-95 transition-all
                        ${isDark ? 'bg-white/10 border-white/20 text-white/80' : 'bg-black/10 border-black/10 text-black/60 hover:text-black'}`}>
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Cropped face image */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-4">
                <motion.div layout className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={croppedSrc || imageSrc || ''} alt="Face" className="w-full h-full object-contain drop-shadow-2xl" />
                </motion.div>
            </div>

            {/* Bottom: Season tabs + Swatches + Result button */}
            <div className={`z-40 p-5 pb-8 backdrop-blur-xl border-t transition-colors duration-500 shrink-0
                ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/60 border-black/5'}`}>
                <div className="max-w-2xl mx-auto flex flex-col gap-4">
                    {/* Season tabs */}
                    <div className="flex gap-2 justify-center flex-wrap">
                        <button onClick={() => { setActiveSeason(null); setActiveColor(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isKorean ? 'font-korean' : ''}
                                ${!activeSeason ? 'bg-white text-black shadow-lg' : isDark ? 'bg-white/10 text-white/60 hover:text-white' : 'bg-black/10 text-black/60 hover:text-black'}`}>
                            <Layers className="w-4 h-4 inline mr-1" />{t.none}
                        </button>
                        {(Object.keys(seasonMeta) as SeasonId[]).map((season) => (
                            <button key={season}
                                onClick={() => { setActiveSeason(season); setActiveColor(SEASON_SWATCHES[season][0]); }}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isKorean ? 'font-korean' : ''}
                                    ${activeSeason === season ? 'bg-white text-black shadow-lg' : isDark ? 'bg-white/10 text-white/60 hover:text-white' : 'bg-black/10 text-black/60 hover:text-black'}`}>
                                {seasonMeta[season].name[lang]}
                            </button>
                        ))}
                    </div>

                    {/* Individual color swatches */}
                    {activeSeason && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                            className="flex gap-2 justify-center flex-wrap">
                            {SEASON_SWATCHES[activeSeason].map((color, i) => (
                                <button key={i} onClick={() => setActiveColor(color)}
                                    className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 hover:scale-110
                                        ${activeColor === color ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.5)]' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }} />
                            ))}
                        </motion.div>
                    )}

                    {/* Result button — always enabled, result comes from image analysis */}
                    <button onClick={handleViewResult} disabled={isAnalyzing}
                        className={`w-full py-4 rounded-full font-bold text-base transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2
                            ${isAnalyzing ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-900'}
                            ${isKorean ? 'font-korean' : ''}`}>
                        {isAnalyzing && <span className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />}
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
