"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type SupportedLang } from "@/lib/site-content";
import { Upload, RotateCcw, Download, Sliders, Eye, Palette, Droplet, Heart, Circle, Brush, Pen, PenLine, Aperture, Loader2 } from "lucide-react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import type { FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";

// MediaPipe FaceMesh landmark indices for makeup regions
const OUTER_LIP_INDICES = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];
const INNER_LIP_INDICES = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191];
const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173, 133];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398, 362];
const LEFT_EYEBROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];
const RIGHT_EYEBROW = [300, 293, 334, 296, 336, 285, 295, 282, 283, 276];

// Features polygons
const LEFT_CHEEK = [116, 117, 118, 119, 100, 126, 209, 49, 129, 203, 205, 206];
const RIGHT_CHEEK = [345, 346, 347, 348, 329, 355, 429, 279, 358, 423, 425, 426];
const JAW_LEFT = [172, 136, 150, 149, 176, 148, 152];
const JAW_RIGHT = [397, 365, 379, 378, 400, 377, 152];
const TEMPLE_LEFT = [21, 54, 103, 67, 109];
const TEMPLE_RIGHT = [251, 284, 332, 297, 338];
const CHEEK_HOLLOW_LEFT = [123, 147, 213, 192, 214];
const CHEEK_HOLLOW_RIGHT = [352, 376, 433, 416, 434];

// Advanced Features
const FACE_SILHOUETTE = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
    172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109
];
const LEFT_EYELINER = [133, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYELINER = [362, 398, 384, 385, 386, 387, 388, 466];

interface MakeupClientProps {
    lang: SupportedLang;
}

interface MakeupSettings {
    foundation: { color: string; opacity: number; enabled: boolean; style: string };
    lip: { color: string; opacity: number; enabled: boolean; style: string };
    blush: { color: string; opacity: number; enabled: boolean; style: string };
    contour: { color: string; opacity: number; enabled: boolean; style: string };
    eyeshadow: { color: string; opacity: number; enabled: boolean; style: string };
    eyeliner: { color: string; opacity: number; enabled: boolean; style: string };
    eyebrow: { color: string; opacity: number; enabled: boolean; style: string };
    lens: { color: string; opacity: number; enabled: boolean; style: string };
}

type MakeupCategory = keyof MakeupSettings;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Landmarks = any[];

type PresetData = { [K in MakeupCategory]: { color: string; style: string } };

const PRESET_PALETTES: Record<string, PresetData> = {
    natural: { 
        foundation: { color: "#F5E6DA", style: "default" }, 
        lip: { color: "#C4776E", style: "matte" }, 
        blush: { color: "#E8A090", style: "apple" }, 
        contour: { color: "#A07050", style: "default" }, 
        eyeshadow: { color: "#C9A892", style: "base" }, 
        eyeliner: { color: "#332222", style: "natural" }, 
        eyebrow: { color: "#4A362B", style: "natural" }, 
        lens: { color: "#AAB39A", style: "natural" } 
    },
    coral: { 
        foundation: { color: "#F5E6DA", style: "default" }, 
        lip: { color: "#E8735A", style: "glossy" }, 
        blush: { color: "#F09080", style: "apple" }, 
        contour: { color: "#B08060", style: "default" }, 
        eyeshadow: { color: "#F0C0A0", style: "shimmer" }, 
        eyeliner: { color: "#221111", style: "natural" }, 
        eyebrow: { color: "#4A362B", style: "natural" }, 
        lens: { color: "#DDBB99", style: "natural" } 
    },
    rose: { 
        foundation: { color: "#FAEDF0", style: "default" }, 
        lip: { color: "#B04060", style: "gradient" }, 
        blush: { color: "#D08090", style: "cheekbone" }, 
        contour: { color: "#906070", style: "default" }, 
        eyeshadow: { color: "#C090A0", style: "base" }, 
        eyeliner: { color: "#111111", style: "cat-eye" }, 
        eyebrow: { color: "#382924", style: "arched" }, 
        lens: { color: "#99AADB", style: "natural" } 
    },
    berry: { 
        foundation: { color: "#F3E8EB", style: "default" }, 
        lip: { color: "#8B2252", style: "matte" }, 
        blush: { color: "#C06080", style: "under-eye" }, 
        contour: { color: "#805060", style: "default" }, 
        eyeshadow: { color: "#9070A0", style: "winged" }, 
        eyeliner: { color: "#000000", style: "bold" }, 
        eyebrow: { color: "#2A1F1C", style: "straight" }, 
        lens: { color: "#8899CC", style: "natural" } 
    },
    brick: { 
        foundation: { color: "#F0E0D6", style: "default" }, 
        lip: { color: "#A0422D", style: "matte" }, 
        blush: { color: "#C07060", style: "cheekbone" }, 
        contour: { color: "#8B5A3A", style: "default" }, 
        eyeshadow: { color: "#B09080", style: "base" }, 
        eyeliner: { color: "#2F1A12", style: "natural" }, 
        eyebrow: { color: "#3F261B", style: "natural" }, 
        lens: { color: "#A68672", style: "natural" } 
    },
    plum: { 
        foundation: { color: "#F2E8FA", style: "default" }, 
        lip: { color: "#6B2D5B", style: "glossy" }, 
        blush: { color: "#A06080", style: "under-eye" }, 
        contour: { color: "#704050", style: "default" }, 
        eyeshadow: { color: "#806090", style: "shimmer" }, 
        eyeliner: { color: "#1A0F1A", style: "cat-eye" }, 
        eyebrow: { color: "#1F1A24", style: "curved" }, 
        lens: { color: "#8A799E", style: "natural" } 
    },
    peach: { 
        foundation: { color: "#FBE8D3", style: "default" }, 
        lip: { color: "#E88B6A", style: "gradient" }, 
        blush: { color: "#F5A08A", style: "apple" }, 
        contour: { color: "#C08A6A", style: "default" }, 
        eyeshadow: { color: "#EDCBB0", style: "base" }, 
        eyeliner: { color: "#3A2218", style: "natural" }, 
        eyebrow: { color: "#5A3E2B", style: "straight" }, 
        lens: { color: "#B5D4A0", style: "natural" } 
    },
    mauve: { 
        foundation: { color: "#F2EBEB", style: "default" }, 
        lip: { color: "#9E7676", style: "matte" }, 
        blush: { color: "#B19090", style: "cheekbone" }, 
        contour: { color: "#8B7272", style: "default" }, 
        eyeshadow: { color: "#8B7272", style: "shimmer" }, 
        eyeliner: { color: "#2D2424", style: "natural" }, 
        eyebrow: { color: "#4A3B3B", style: "natural" }, 
        lens: { color: "#9090A0", style: "natural" } 
    },
    sunset: { 
        foundation: { color: "#F5ECD5", style: "default" }, 
        lip: { color: "#D45D31", style: "glossy" }, 
        blush: { color: "#E88D67", style: "apple" }, 
        contour: { color: "#9E6F4B", style: "default" }, 
        eyeshadow: { color: "#D49B6A", style: "winged" }, 
        eyeliner: { color: "#3E2723", style: "cat-eye" }, 
        eyebrow: { color: "#5D4037", style: "arched" }, 
        lens: { color: "#B1A78C", style: "natural" } 
    },
    nude: { 
        foundation: { color: "#F2E4D8", style: "default" }, 
        lip: { color: "#A67C5B", style: "matte" }, 
        blush: { color: "#C09378", style: "cheekbone" }, 
        contour: { color: "#8D6E63", style: "default" }, 
        eyeshadow: { color: "#D7B59A", style: "base" }, 
        eyeliner: { color: "#211A11", style: "natural" }, 
        eyebrow: { color: "#3E2723", style: "straight" }, 
        lens: { color: "#968E85", style: "natural" },
    },
};


const STYLE_OPTIONS: Record<string, { id: string; name: { [key: string]: string } }[]> = {
    lip: [
        { id: "matte", name: { ko: "매트", en: "Matte", zh: "哑光", ja: "マット" } },
        { id: "glossy", name: { ko: "글로시", en: "Glossy", zh: "亮光", ja: "グロッシー" } },
        { id: "gradient", name: { ko: "그라데이션", en: "Gradient", zh: "渐变", ja: "グラデーション" } },
    ],
    blush: [
        { id: "apple", name: { ko: "애플존", en: "Apple", zh: "苹果肌", ja: "アップル" } },
        { id: "cheekbone", name: { ko: "광대", en: "Cheekbone", zh: "颧骨", ja: "頬骨" } },
        { id: "under-eye", name: { ko: "숙취", en: "Under-eye", zh: "眼下", ja: "目の下" } },
    ],
    eyebrow: [
        { id: "natural", name: { ko: "내추럴", en: "Natural", zh: "自然", ja: "ナチュラル" } },
        { id: "straight", name: { ko: "일자", en: "Straight", zh: "平眉", ja: "平行" } },
        { id: "arched", name: { ko: "아치", en: "Arched", zh: "挑眉", ja: "アー치" } },
        { id: "curved", name: { ko: "둥근", en: "Curved", zh: "弧形", ja: "カーブ" } },
    ],
    eyeshadow: [
        { id: "base", name: { ko: "기본", en: "Base", zh: "基础", ja: "ベース" } },
        { id: "winged", name: { ko: "윙", en: "Winged", zh: "翼状", ja: "ウィング" } },
        { id: "shimmer", name: { ko: "쉬머", en: "Shimmer", zh: "闪粉", ja: "シマー" } },
    ],
    eyeliner: [
        { id: "natural", name: { ko: "내추럴", en: "Natural", zh: "自然", ja: "ナチュラル" } },
        { id: "cat-eye", name: { ko: "캣아이", en: "Cat-eye", zh: "猫眼", ja: "キャット" } },
        { id: "puppy", name: { ko: "강아지", en: "Puppy", zh: "下至", ja: "たれ目" } },
        { id: "bold", name: { ko: "볼드", en: "Bold", zh: "浓密", ja: "ボールド" } },
    ],
    lens: [
        { id: "natural", name: { ko: "내추럴", en: "Natural", zh: "自然", ja: "ナチュラル" } },
        { id: "shimmer", name: { ko: "반짝이", en: "Shimmer", zh: "闪耀", ja: "キラキラ" } },
    ],
    foundation: [{ id: "default", name: { ko: "기본", en: "Glow", zh: "光泽", ja: "ツヤ" } }],
    contour: [{ id: "default", name: { ko: "기본", en: "Deep", zh: "深邃", ja: "ディープ" } }],
};

export function MakeupClient({ lang }: MakeupClientProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const originalCanvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const landmarksRef = useRef<Landmarks | null>(null);
    const faceLandmarkerRef = useRef<FaceLandmarksDetector | null>(null);
    const uploadedImageRef = useRef<HTMLImageElement | null>(null);
    const isInitializing = useRef(false);

    const [mounted, setMounted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState<MakeupCategory>("lip");
    const [compareMode, setCompareMode] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageSize, setImageSize] = useState({ w: 0, h: 0 });

    const [settings, setSettings] = useState<MakeupSettings>({
        foundation: { color: "#F5E6DA", opacity: 20, enabled: false, style: "default" },
        lip: { color: "#C4776E", opacity: 60, enabled: false, style: "matte" },
        blush: { color: "#E8A090", opacity: 45, enabled: false, style: "apple" },
        contour: { color: "#A07050", opacity: 25, enabled: false, style: "default" },
        eyeshadow: { color: "#C9A892", opacity: 30, enabled: false, style: "base" },
        eyeliner: { color: "#222222", opacity: 60, enabled: false, style: "natural" },
        eyebrow: { color: "#4A362B", opacity: 50, enabled: false, style: "natural" },
        lens: { color: "#88BBAA", opacity: 0, enabled: false, style: "natural" },
    });

    const t = {
        ko: {
            title: "AI 메이크업 시뮬레이터",
            subtitle: "AI와 함께 나만의 완벽한 스타일을 발견해보세요",
            upload: "사진 업로드",
            dragDrop: "사진을 드래그하거나 클릭하여 업로드하세요",
            analyzing: "얼굴형 분석 중...",
            noFace: "사진에서 얼굴을 찾을 수 없습니다.",
            foundation: "파데", lip: "립", blush: "블러셔", contour: "컨투어", eyeshadow: "섀도우", eyeliner: "라인", eyebrow: "눈썹", lens: "렌즈",
            opacity: "강도", enabled: "적용", style: "스타일",
            presets: "프리셋", save: "저장하기", reset: "초기화", compare: "비교하기",
            natural: "내추럴", coral: "코랄", rose: "로제", berry: "베리", brick: "브릭", plum: "플럼", peach: "피치", mauve: "모브", sunset: "선셋", nude: "누드",
            // Style labels
            default: "기본", matte: "매트", glossy: "글로시", gradient: "그라데이션",
            apple: "애플", cheekbone: "치크본", "under-eye": "언더아이",
            base: "베이스", shimmer: "쉬머", winged: "윙드",
            "cat-eye": "캣아이", bold: "볼드", puppy: "강아지",
            arched: "아치형", curved: "곡선형", straight: "일자형",
        },
        en: {
            title: "AI Makeup Simulator",
            subtitle: "Find your own perfect style with AI technology",
            upload: "Upload Photo",
            dragDrop: "Drag & drop or click to upload",
            analyzing: "Analyzing Face...",
            noFace: "Face not detected. Please use a clear, front-facing photo.",
            foundation: "Base", lip: "Lips", blush: "Blush", contour: "Contour", eyeshadow: "Shadow", eyeliner: "Liner", eyebrow: "Brows", lens: "Lens",
            opacity: "Intensity", enabled: "Active", style: "Style",
            presets: "Presets", save: "Save", reset: "Reset", compare: "Compare",
            natural: "Natural", coral: "Coral", rose: "Rose", berry: "Berry", brick: "Brick", plum: "Plum", peach: "Peach", mauve: "Mauve", sunset: "Sunset", nude: "Nude",
            default: "Default", matte: "Matte", glossy: "Glossy", gradient: "Gradient",
            apple: "Apple", cheekbone: "Cheekbone", "under-eye": "Under-eye",
            base: "Base", shimmer: "Shimmer", winged: "Winged",
            "cat-eye": "Cat-eye", bold: "Bold", puppy: "Puppy",
            arched: "Arched", curved: "Curved", straight: "Straight",
        },
        zh: {
            title: "AI 智能化妆模拟器",
            subtitle: "利用AI技术打造属于您的完美风格",
            upload: "上传照片",
            dragDrop: "拖拽或点击上传照片",
            analyzing: "正在精密分析面部...",
            noFace: "未检测到人脸，请使用清晰的正面照片。",
            foundation: "底妆", lip: "唇妆", blush: "腮红", contour: "修容", eyeshadow: "眼影", eyeliner: "眼线", eyebrow: "眉毛", lens: "美瞳",
            opacity: "强度", enabled: "应用", style: "风格",
            presets: "预设品", save: "保存", reset: "重置", compare: "对比",
            natural: "自然", coral: "珊瑚", rose: "玫瑰", berry: "浆果", brick: "砖红", plum: "梅紫", peach: "蜜桃", mauve: "藕粉", sunset: "夕阳", nude: "裸色",
            default: "默认", matte: "哑光", glossy: "水光", gradient: "渐变",
            apple: "苹果肌", cheekbone: "颧骨", "under-eye": "眼下",
            base: "基础", shimmer: "珠光", winged: "翼状",
            "cat-eye": "猫眼", bold: "强力", puppy: "下至",
            arched: "挑眉", curved: "弯眉", straight: "一字眉",
        },
        ja: {
            title: "AI メイクシミュレーター",
            subtitle: "AIで自分だけのスタイルを完成させましょう",
            upload: "写真をアップロード",
            dragDrop: "ドラッグ＆ドロップまたはタップ",
            analyzing: "顔を精密に分析中...",
            foundation: "ファンデ",
            lip: "リップ",
            blush: "チーク",
            contour: "コントゥア",
            eyeshadow: "アイシャドウ",
            eyeliner: "アイライン",
            eyebrow: "アイブロウ",
            lens: "カラコン",
            opacity: "強度",
            compare: "比較",
            reset: "リセット",
            save: "保存",
            presets: "プリセット",
            enabled: "適用",
            natural: "ナチュラル", coral: "コーラル", rose: "ロゼ", berry: "ベリー", brick: "ブリック", plum: "プラム",
            peach: "ピーチ", mauve: "モーヴ", sunset: "サンセット", nude: "ヌード",
            arched: "アーチ", curved: "アーチ眉", straight: "平行眉",
            reshape: "整形", beauty: "美肌",
            vLine: "Vライン", chinLength: "顎の長さ", chinWidth: "顎の幅", forehead: "おでこ", cheekbones: "頬骨",
            eyeSize: "デカ目", eyeDistance: "目の間隔", eyeAngle: "タレ目/ツリ目",
            noseBridge: "鼻筋", noseAlar: "小鼻", noseLength: "鼻の長さ",
            mouthSize: "口の大きさ", smile: "口角",
            smooth: "美肌", toneUp: "トーンアップ", laughLines: "ほうれい線",
            noFace: "顔が検出されませんでした。明るい場所で正面を向いた写真をアップロードしてください。"
        }
    }[lang === "ko" ? "ko" : lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en"];

    useEffect(() => {
        setMounted(true);
        if (isInitializing.current || faceLandmarkerRef.current) return;
        isInitializing.current = true;

        const initTFJS = async () => {
            try {
                const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
                const detectorConfig = {
                    runtime: "tfjs", 
                    refineLandmarks: true, 
                    maxFaces: 1,
                };
                faceLandmarkerRef.current = await faceLandmarksDetection.createDetector(model, detectorConfig as any);
            } catch (err) {
                console.error("Failed to initialize TFJS detector:", err);
            }
        };
        initTFJS();
    }, []);

    const renderMakeup = useCallback(() => {
        const canvas = canvasRef.current;
        const origCanvas = originalCanvasRef.current;
        if (!canvas || !origCanvas || !landmarksRef.current) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const landmarks = landmarksRef.current;
        const w = canvas.width;
        const h = canvas.height;

        const getBasePoint = (idx: number) => {
            const lm = landmarksRef.current?.[idx];
            if (!lm) return { x: 0, y: 0 };
            const isNorm = lm.x <= 1 && lm.y <= 1 && w > 1;
            return { x: isNorm ? lm.x * w : lm.x, y: isNorm ? lm.y * h : lm.y };
        };

        const drawSplineFromPoints = (points: {x:number, y:number}[], closePath: boolean = true) => {
            if (points.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length - 1; i++) {
                const curr = points[i];
                const next = points[i+1];
                const mid = { x: (curr.x + next.x) / 2, y: (curr.y + next.y) / 2 };
                ctx.quadraticCurveTo(curr.x, curr.y, mid.x, mid.y);
            }
            const last = points[points.length - 1];
            ctx.lineTo(last.x, last.y);
            if (closePath) ctx.closePath();
        };

        const fillRegionFromPoints = (points: {x:number, y:number}[], color: string, opacity: number, blur: number = 0, composite: GlobalCompositeOperation = "multiply") => {
            if (points.length < 3) return;
            ctx.save();
            ctx.globalAlpha = opacity / 100;
            ctx.globalCompositeOperation = composite;
            if (blur > 0) ctx.filter = `blur(${blur}px)`;
            ctx.fillStyle = color;
            drawSplineFromPoints(points, true);
            ctx.fill();
            ctx.restore();
        };

        const drawLineFromPoints = (points: {x:number, y:number}[], color: string, opacity: number, blur: number = 0, lineWidth: number = 10, composite: GlobalCompositeOperation = "multiply") => {
            if (points.length < 2) return;
            ctx.save();
            ctx.globalAlpha = opacity / 100;
            ctx.globalCompositeOperation = composite;
            if (blur > 0) ctx.filter = `blur(${blur}px)`;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            drawSplineFromPoints(points, false);
            ctx.stroke();
            ctx.restore();
        };

        const getPoint = getBasePoint;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(origCanvas, 0, 0);

        if (compareMode) return; 


        // Foundation
        if (settings.foundation.enabled) {
            const silhouette = FACE_SILHOUETTE.map(idx => getPoint(idx));
            fillRegionFromPoints(silhouette, settings.foundation.color, settings.foundation.opacity, Math.max(15, w * 0.05), "soft-light");
        }

        // Lens
        if (settings.lens.enabled && settings.lens.opacity > 0) {
            const irises = landmarks.length >= 478 ? [{c:468, r:469}, {c:473, r:474}] : [];
            irises.forEach(iris => {
                const c = getPoint(iris.c);
                const radius = Math.hypot(c.x - getPoint(iris.r).x, c.y - getPoint(iris.r).y) * 1.5;
                ctx.save();
                ctx.globalAlpha = (settings.lens.opacity / 100) * 0.7;
                ctx.globalCompositeOperation = "overlay";
                ctx.fillStyle = settings.lens.color;
                ctx.beginPath(); ctx.arc(c.x, c.y, radius, 0, Math.PI * 2); ctx.fill();
                if (settings.lens.style === "shimmer") {
                    ctx.strokeStyle = "rgba(255,255,255,0.3)";
                    ctx.lineWidth = 1;
                    for(let i=0; i<8; i++) {
                        ctx.beginPath();
                        ctx.moveTo(c.x, c.y);
                        const ang = (i / 8) * Math.PI * 2;
                        ctx.lineTo(c.x + Math.cos(ang) * radius, c.y + Math.sin(ang) * radius);
                        ctx.stroke();
                    }
                }
                ctx.restore();
            });
        }

        // Eyebrows with Shape Warping
        if (settings.eyebrow.enabled) {
            const warpEyebrow = (indices: number[], isRight: boolean) => {
                const pts = indices.map(idx => getPoint(idx));
                if (settings.eyebrow.style === "natural") return pts;
                
                const midX = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
                const midY = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
                
                return pts.map((p, i) => {
                    let dx = 0, dy = 0;
                    const relX = (p.x - midX) / (w * 0.05); // normalized relative x
                    if (settings.eyebrow.style === "straight") {
                        dy = (midY - p.y) * 0.4;
                    } else if (settings.eyebrow.style === "arched") {
                        if (i > 2 && i < 7) dy = -h * 0.008; // lift arch
                    } else if (settings.eyebrow.style === "curved") {
                        dy = Math.sin(relX) * h * 0.005;
                    }
                    return { x: p.x + dx, y: p.y + dy };
                });
            };

            const leftPts = warpEyebrow(LEFT_EYEBROW, false);
            const rightPts = warpEyebrow(RIGHT_EYEBROW, true);
            [leftPts, rightPts].forEach(pts => {
                fillRegionFromPoints(pts, settings.eyebrow.color, settings.eyebrow.opacity * 0.4, 6, "multiply");
                fillRegionFromPoints(pts, settings.eyebrow.color, settings.eyebrow.opacity * 0.6, 2, "multiply");
                fillRegionFromPoints(pts, settings.eyebrow.color, settings.eyebrow.opacity * 0.3, 1, "overlay");
            });
        }

        // Eyeshadow
        if (settings.eyeshadow.enabled) {
            const shadowThickness = Math.max(16, Math.round(w * 0.045));
            const shadowBlur = Math.max(12, Math.round(w * 0.03));
            const leftLid = LEFT_EYE_UPPER.map(idx => getPoint(idx));
            const rightLid = RIGHT_EYE_UPPER.map(idx => getPoint(idx));
            
            if (settings.eyeshadow.style === "winged") {
                const wingL = getPoint(LEFT_EYELINER[0]);
                leftLid.push({ x: wingL.x - w*0.02, y: wingL.y - h*0.01 });
                const wingR = getPoint(RIGHT_EYELINER[0]);
                rightLid.push({ x: wingR.x + w*0.02, y: wingR.y - h*0.01 });
            }

            drawLineFromPoints(leftLid, settings.eyeshadow.color, settings.eyeshadow.opacity, shadowBlur, shadowThickness, "multiply");
            drawLineFromPoints(rightLid, settings.eyeshadow.color, settings.eyeshadow.opacity, shadowBlur, shadowThickness, "multiply");
        }

        // Eyeliner
        if (settings.eyeliner.enabled) {
            const thickness = Math.max(2, Math.round(w * 0.006));
            const leftLine = LEFT_EYELINER.map(idx => getPoint(idx));
            const rightLine = RIGHT_EYELINER.map(idx => getPoint(idx));

            if (settings.eyeliner.style === "cat-eye") {
                const endL = leftLine[0]; leftLine.unshift({ x: endL.x - w*0.015, y: endL.y - h*0.01 });
                const endR = rightLine[0]; rightLine.unshift({ x: endR.x + w*0.015, y: endR.y - h*0.01 });
            } else if (settings.eyeliner.style === "puppy") {
                const endL = leftLine[0]; leftLine.unshift({ x: endL.x - w*0.01, y: endL.y + h*0.005 });
                const endR = rightLine[0]; rightLine.unshift({ x: endR.x + w*0.01, y: endR.y + h*0.005 });
            }

            drawLineFromPoints(leftLine, settings.eyeliner.color, settings.eyeliner.opacity, 1, thickness, "multiply");
            drawLineFromPoints(rightLine, settings.eyeliner.color, settings.eyeliner.opacity, 1, thickness, "multiply");
        }

        // Lips
        if (settings.lip.enabled) {
            const outer = OUTER_LIP_INDICES.map(idx => getPoint(idx));
            const inner = INNER_LIP_INDICES.map(idx => getPoint(idx));

            if (settings.lip.style === "gradient") {
                ctx.save();
                ctx.globalAlpha = settings.lip.opacity / 100;
                ctx.globalCompositeOperation = "multiply";
                const center = getPoint(14); 
                const gradL = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, w * 0.1);
                gradL.addColorStop(0, settings.lip.color);
                gradL.addColorStop(1, "transparent");
                ctx.fillStyle = gradL;
                
                ctx.beginPath();
                ctx.moveTo(outer[0].x, outer[0].y);
                outer.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.closePath();
                
                ctx.moveTo(inner[0].x, inner[0].y);
                inner.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.closePath();
                
                ctx.fill("evenodd");
                ctx.restore();
            } else {
                ctx.save();
                ctx.globalAlpha = settings.lip.opacity / 100;
                ctx.globalCompositeOperation = "multiply";
                ctx.fillStyle = settings.lip.color;
                
                ctx.beginPath();
                ctx.moveTo(outer[0].x, outer[0].y);
                outer.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.closePath();
                
                ctx.moveTo(inner[0].x, inner[0].y);
                inner.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.closePath();
                
                ctx.fill("evenodd");
                ctx.restore();
                
                if (settings.lip.style === "glossy") {
                    ctx.save();
                    ctx.globalAlpha = 0.4; 
                    ctx.globalCompositeOperation = "overlay"; 
                    ctx.filter = "blur(4px)";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.beginPath();
                    const highlightPts = [getPoint(312), getPoint(311), getPoint(310), getPoint(13), getPoint(80), getPoint(81), getPoint(82)];
                    ctx.moveTo(highlightPts[0].x, highlightPts[0].y);
                    highlightPts.forEach(p => ctx.lineTo(p.x, p.y));
                    ctx.fill();
                    ctx.restore();
                }
            }
        }

        // Blush
        if (settings.blush.enabled) {
            const blur = Math.max(15, w * 0.05);
            const getCheekPts = (indices: number[], isRight: boolean) => {
                let pts = indices.map(idx => getPoint(idx));
                const mid = pts[0];
                if (settings.blush.style === "cheekbone") {
                    pts = pts.map(p => ({ x: p.x + (isRight ? w*0.01 : -w*0.01), y: p.y - h*0.02 }));
                } else if (settings.blush.style === "under-eye") {
                    pts = pts.map(p => ({ x: p.x, y: p.y - h*0.04 }));
                }
                return pts;
            };
            fillRegionFromPoints(getCheekPts(LEFT_CHEEK, false), settings.blush.color, settings.blush.opacity, blur, "multiply");
            fillRegionFromPoints(getCheekPts(RIGHT_CHEEK, true), settings.blush.color, settings.blush.opacity, blur, "multiply");
        }

        // Contour
        if (settings.contour.enabled) {
            const blur = Math.max(12, w * 0.04);
            const thick = Math.max(16, w * 0.06);
            [JAW_LEFT, JAW_RIGHT, TEMPLE_LEFT, TEMPLE_RIGHT, CHEEK_HOLLOW_LEFT, CHEEK_HOLLOW_RIGHT].forEach(idxArr => {
                drawLineFromPoints(idxArr.map(idx => getPoint(idx)), settings.contour.color, settings.contour.opacity, blur, thick, "multiply");
            });
        }
    }, [settings, compareMode]);

    useEffect(() => {
        if (imageLoaded) renderMakeup();
    }, [settings, compareMode, imageLoaded, renderMakeup]);

    const handleImage = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            setAnalyzing(true);
            const src = e.target?.result as string;

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = async () => {
                uploadedImageRef.current = img;
                try {
                    // Start decoding immediately to prevent WASM blocking bugs
                    await img.decode();
                } catch (e) {
                    console.error("Image decode error", e);
                }

                const w = Math.min(img.naturalWidth, 1024);
                const h = Math.round(img.naturalHeight * (w / img.naturalWidth));
                setImageSize({ w, h });

                const origCanvas = originalCanvasRef.current!;
                origCanvas.width = w;
                origCanvas.height = h;
                const origCtx = origCanvas.getContext("2d", { willReadFrequently: true })!;
                origCtx.drawImage(img, 0, 0, w, h);

                const canvas = canvasRef.current!;
                canvas.width = w;
                canvas.height = h;

                try {
                    // Wait for AI engine to finish loading (up to 10s) instead of showing an alert
                    if (!faceLandmarkerRef.current) {
                        let waited = 0;
                        while (!faceLandmarkerRef.current && waited < 10000) {
                            await new Promise(r => setTimeout(r, 300));
                            waited += 300;
                        }
                        if (!faceLandmarkerRef.current) {
                            setAnalyzing(false);
                            alert(lang === "ko" ? "AI 엔진 초기화에 실패했습니다. 페이지를 새로고침해 주세요." : "AI engine failed to initialize. Please refresh the page.");
                            return;
                        }
                    }

                    // Extract pure ImageData (Uint8ClampedArray) to eliminate all canvas taint bugs
                    const imageData = origCtx.getImageData(0, 0, w, h);
                    
                    // Native TFJS seamlessly processes ImageData entirely on the GPU without WASM lockups
                    const faces = await faceLandmarkerRef.current.estimateFaces(imageData, { flipHorizontal: false });

                    if (faces && faces.length > 0) {
                        landmarksRef.current = faces[0].keypoints as Landmarks;
                        setImageLoaded(true);
                        setAnalyzing(false);
                        renderMakeup();
                    } else {
                        setAnalyzing(false);
                        alert(t.noFace);
                    }
                } catch (err) {
                    console.error("Face detection error:", err);
                    setAnalyzing(false);
                    alert("사진 분석 중 오류가 발생했습니다. 다른 사진으로 시도해 주세요.");
                }
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) handleImage(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImage(file);
    };

    const applyPreset = (name: string) => {
        const palette = PRESET_PALETTES[name];
        if (!palette) return;
        setSettings({
            foundation: { color: palette.foundation.color, opacity: 15, enabled: true, style: palette.foundation.style ?? "default" },
            lip: { color: palette.lip.color, opacity: 20, enabled: true, style: palette.lip.style ?? "matte" },
            blush: { color: palette.blush.color, opacity: 25, enabled: true, style: palette.blush.style ?? "apple" },
            eyeshadow: { color: palette.eyeshadow.color, opacity: 15, enabled: true, style: palette.eyeshadow.style ?? "base" },
            eyeliner: { color: palette.eyeliner.color, opacity: 40, enabled: true, style: palette.eyeliner.style ?? "natural" },
            contour: { color: palette.contour.color, opacity: 20, enabled: true, style: palette.contour.style ?? "default" },
            eyebrow: { color: palette.eyebrow.color, opacity: 15, enabled: true, style: palette.eyebrow.style ?? "natural" },
            lens: { color: palette.lens.color, opacity: 35, enabled: true, style: palette.lens.style ?? "natural" },
        });
    };

    const resetSettings = () => {
        setSettings({
            foundation: { color: "#F5E6DA", opacity: 20, enabled: false, style: "default" },
            lip: { color: "#C4776E", opacity: 60, enabled: false, style: "matte" },
            blush: { color: "#E8A090", opacity: 45, enabled: false, style: "apple" },
            contour: { color: "#A07050", opacity: 25, enabled: false, style: "default" },
            eyeshadow: { color: "#C9A892", opacity: 30, enabled: false, style: "base" },
            eyeliner: { color: "#222222", opacity: 60, enabled: false, style: "natural" },
            eyebrow: { color: "#4A362B", opacity: 50, enabled: false, style: "natural" },
            lens: { color: "#88BBAA", opacity: 0, enabled: false, style: "natural" },
        });
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "findcore-makeup-pro.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const updateSetting = (cat: MakeupCategory, key: string, value: string | number | boolean) => {
        if (cat === "lens" && key === "enabled" && value === true && settings.lens.opacity === 0) {
            setSettings(prev => ({ ...prev, lens: { ...prev.lens, enabled: true, opacity: 50 } }));
            return;
        }
        setSettings(prev => ({
            ...prev,
            [cat]: { ...prev[cat], [key]: value }
        }));
    };

            const CategoryIcons: Record<string, React.ElementType> = {
                foundation: Droplet, lip: Heart, blush: Circle, contour: Brush,
                eyeshadow: Eye, eyeliner: Pen, eyebrow: PenLine, lens: Aperture
            };

            const presetNames = Object.keys(PRESET_PALETTES) as string[];
            const presetLabels: Record<string, string> = {
                natural: t.natural, coral: t.coral, rose: t.rose, berry: t.berry, brick: t.brick, plum: t.plum,
                peach: t.peach, mauve: t.mauve, sunset: t.sunset, nude: t.nude
            };

            return (
                <div className="relative min-h-[80vh] py-10 px-4 sm:px-6">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-pink-500/10 blur-[120px] rounded-full" />
                        <div className="absolute top-3/4 left-1/4 -translate-x-1/2 w-[50vw] h-[50vw] bg-purple-500/10 blur-[100px] rounded-full" />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                        {!imageLoaded && (
                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                                <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/70 font-sans tracking-tight drop-shadow-sm py-2 leading-relaxed">{t.title}</h1>
                                <p className="text-white/50 text-sm tracking-wide font-medium">{t.subtitle}</p>
                            </motion.div>
                        )}

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 min-w-0 flex items-start justify-center">
                                {!imageLoaded && !analyzing ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="w-full max-w-md aspect-3/4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/40 hover:bg-pink-500/5 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] transition-all group"
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
                                            <Upload className="w-8 h-8 text-white/50 group-hover:text-pink-400 transition-colors" />
                                        </div>
                                        <p className="text-white/60 text-sm font-medium tracking-wide">{t.dragDrop}</p>
                                        <button className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-medium border border-white/10 hover:border-white/20 transition-all backdrop-blur-md shadow-lg">
                                            {t.upload}
                                        </button>
                                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </motion.div>
                                ) : (
                                    <div className="relative w-full max-w-[600px]">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                                            className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl ring-1 ring-white/5"
                                        >
                                            <canvas
                                                ref={canvasRef}
                                                className="w-full h-auto max-h-[75vh]"
                                                style={{ objectFit: "contain" }}
                                            />
                                        </motion.div>

                                        <AnimatePresence>
                                            {analyzing && (
                                                <motion.div
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-white/5"
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 ring-1 ring-white/10">
                                                        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                                                    </div>
                                                    <p className="text-white/80 font-medium text-sm tracking-widest uppercase animate-pulse">{t.analyzing}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {imageLoaded && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-black/50 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl"
                                            >
                                                <button
                                                    onPointerDown={() => setCompareMode(true)}
                                                    onPointerUp={() => setCompareMode(false)}
                                                    onPointerLeave={() => setCompareMode(false)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95"
                                                    title={t.compare}
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button onClick={saveImage}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95"
                                                    title={t.save}
                                                >
                                                    <Download className="w-5 h-5" />
                                                </button>
                                                <div className="w-px h-6 bg-white/10 mx-1" />
                                                <button onClick={() => { setImageLoaded(false); landmarksRef.current = null; }}
                                                    className="w-10 h-10 flex items-center justify-center bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 rounded-full text-pink-300 hover:text-pink-200 transition-all hover:scale-105 active:scale-95"
                                                    title={t.reset}
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {imageLoaded && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100 }}
                                    className="lg:w-[340px] shrink-0 space-y-5 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar pb-6"
                                >
                                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 space-y-4 shadow-xl">
                                        <h3 className="text-white/60 text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2">
                                            <Palette className="w-4 h-4 text-pink-400" /> {t.presets}
                                        </h3>
                                        <div className="grid grid-cols-5 gap-2">
                                            {presetNames.map(name => (
                                                <button
                                                    key={name}
                                                    onClick={() => applyPreset(name)}
                                                    className="flex flex-col items-center gap-2 py-3 px-1 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/30 transition-all group shrink-0"
                                                >
                                                    <div className="flex -space-x-1">
                                                        <div className="w-4 h-4 rounded-full border border-zinc-900 group-hover:scale-110 transition-transform shadow-lg" style={{ backgroundColor: PRESET_PALETTES[name].lip.color }} />
                                                        <div className="w-4 h-4 rounded-full border border-zinc-900 group-hover:scale-110 transition-transform shadow-lg" style={{ backgroundColor: PRESET_PALETTES[name].eyeshadow.color }} />
                                                    </div>
                                                    <span className="text-white/60 group-hover:text-white text-[10px] font-medium transition-colors whitespace-nowrap">{presetLabels[name]}</span>
                                                </button>
                                            ))}
                                        </div>

                                    </div>

                                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 space-y-6 shadow-xl">
                                        <div className="grid grid-cols-4 gap-2">
                                            {(["foundation", "lip", "blush", "contour", "eyeshadow", "eyeliner", "eyebrow", "lens"] as MakeupCategory[]).map(cat => {
                                                const Icon = CategoryIcons[cat];
                                                return (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveTab(cat)}
                                                    className={`flex flex-col items-center gap-2 py-3 px-1 rounded-2xl border transition-all ${
                                                        activeTab === cat 
                                                            ? "bg-linear-to-br from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.15)]" 
                                                            : "bg-white/5 border-transparent text-white/40 hover:text-white/80 hover:bg-white/10"
                                                    }`}
                                                >
                                                    <Icon className={`w-5 h-5 ${activeTab === cat ? 'drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]' : ''}`} strokeWidth={activeTab === cat ? 2.5 : 1.5} />
                                                    <span className="text-[10px] font-medium tracking-tight whitespace-nowrap scale-90 sm:scale-100">{(t as any)[cat] || cat}</span>
                                                </button>
                                            )})}
                                        </div>

                                        <div className="space-y-5 pt-2 border-t border-white/5">
                                                <>
                                                    <label className="flex items-center justify-between cursor-pointer group">
                                                        <span className="text-white/80 text-sm font-medium tracking-wide group-hover:text-white transition-colors">{t[activeTab as keyof typeof t]} {t.enabled}</span>
                                                        <div
                                                            onClick={() => updateSetting(activeTab, "enabled", !settings[activeTab].enabled)}
                                                            className={`w-11 h-6 rounded-full transition-all duration-300 cursor-pointer flex items-center p-1 border ${settings[activeTab].enabled ? "bg-linear-to-r from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] border-pink-400/50" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                                                        >
                                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${settings[activeTab].enabled ? "translate-x-5" : "translate-x-0"}`} />
                                                        </div>
                                                    </label>

                                                    {STYLE_OPTIONS[activeTab] && (
                                                        <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group">
                                                            <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors">{t.style}</span>
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                                                {STYLE_OPTIONS[activeTab].map(opt => (
                                                                    <button
                                                                        key={opt.id}
                                                                        onClick={() => updateSetting(activeTab, "style", opt.id)}
                                                                        className={`py-2 px-1 rounded-xl text-[10px] font-medium border transition-all ${
                                                                            settings[activeTab].style === opt.id
                                                                                ? "bg-pink-500/20 border-pink-500/50 text-pink-200"
                                                                                : "bg-white/5 border-transparent text-white/40 hover:bg-white/10"
                                                                        }`}
                                                                    >
                                                                        {opt.name[lang] || opt.name.en}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner group">
                                                        <span className="text-white/50 text-[11px] font-semibold uppercase tracking-widest group-hover:text-white/70 transition-colors">Color</span>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-white/40 text-[11px] font-mono tracking-widest">{settings[activeTab].color}</span>
                                                            <div className="relative w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-white/20 ring-2 ring-zinc-900 group-hover:ring-pink-500/50 transition-all overflow-hidden shrink-0">
                                                                <input
                                                                    type="color"
                                                                    value={settings[activeTab].color}
                                                                    onChange={(e) => updateSetting(activeTab, "color", e.target.value)}
                                                                    className="absolute -top-4 -left-4 w-16 h-16 cursor-pointer opacity-0"
                                                                />
                                                                <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings[activeTab].color }} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors">{t.opacity}</span>
                                                            <span className="text-pink-300 text-[12px] font-mono font-bold tracking-wider">{settings[activeTab].opacity}%</span>
                                                        </div>
                                                        <div className="relative pt-1 pb-2 flex items-center">
                                                            <input
                                                                type="range" min="0" max="100"
                                                                value={settings[activeTab].opacity}
                                                                onChange={(e) => updateSetting(activeTab, "opacity", Number(e.target.value))}
                                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none transition-all custom-range-slider"
                                                                style={{
                                                                    background: `linear-gradient(to right, rgb(236,72,153) ${settings[activeTab].opacity}%, rgba(255,255,255,0.05) ${settings[activeTab].opacity}%)`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                        </div>

                                        <button onClick={resetSettings}
                                            className="w-full py-3.5 text-[11px] font-semibold tracking-widest text-white/40 hover:text-white/80 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-2xl transition-all flex items-center justify-center gap-2 mt-2"
                                        >
                                            <Sliders className="w-3.5 h-3.5" /> {t.reset}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <canvas ref={originalCanvasRef} className="hidden" />
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                    {/* Custom Scrollbar and Range Slider Styles */}
                    <style jsx global>{`
                        .custom-range-slider::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background: white;
                            box-shadow: 0 0 10px rgba(236,72,153,0.8), 0 0 20px rgba(236,72,153,0.4);
                            cursor: pointer;
                            transition: transform 0.1s, box-shadow 0.1s;
                            border: 2px solid white;
                        }
                        .custom-range-slider::-webkit-slider-thumb:hover {
                            transform: scale(1.2);
                            box-shadow: 0 0 15px rgba(236,72,153,1), 0 0 25px rgba(236,72,153,0.6);
                        }
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; border: 1px solid transparent; background-clip: content-box; }
                        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border: 1px solid transparent; background-clip: content-box; }
                    `}</style>
                </div>
            );
        }
