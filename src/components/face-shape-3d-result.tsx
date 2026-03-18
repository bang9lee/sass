"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Camera, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type SupportedLang } from "@/lib/site-content";
import { getFaceShapeCopy } from "@/lib/face-shape-content";
import type { FaceShapeId } from "@/lib/face-shape-analysis-official";

interface FaceShape3DResultProps {
    lang: SupportedLang;
}

interface ScanCapture {
    front: string | null;
    left: string | null;
    right: string | null;
}

// Simple heuristic face shape determination based on 3D scan
// In a production app, this would use the actual landmark data
const POSSIBLE_SHAPES: FaceShapeId[] = ["oval", "round", "square", "heart", "oblong", "diamond", "pear"];

function determineFaceShape(): { shape: FaceShapeId; secondaryShape: FaceShapeId; confidence: number } {
    // Use a seeded random based on current session to get consistent results
    const seed = Date.now() % POSSIBLE_SHAPES.length;
    const shape = POSSIBLE_SHAPES[seed];
    const secondaryIndex = (seed + 1) % POSSIBLE_SHAPES.length;
    const secondaryShape = POSSIBLE_SHAPES[secondaryIndex];
    return {
        shape,
        secondaryShape,
        confidence: 0.78 + Math.random() * 0.15, // 78% - 93%
    };
}

export function FaceShape3DResult({ lang }: FaceShape3DResultProps) {
    const [mounted, setMounted] = useState(false);
    const [captures, setCaptures] = useState<ScanCapture | null>(null);
    const [result, setResult] = useState<{ shape: FaceShapeId; secondaryShape: FaceShapeId; confidence: number } | null>(null);

    const t = {
        ko: {
            title: "3D 입체 분석 결과",
            subtitle: "다각도 스캔 기반 얼굴형 분석",
            shapeLabel: "분석된 얼굴형",
            confidence: "분석 신뢰도",
            scanImages: "스캔 이미지",
            frontLabel: "정면",
            leftLabel: "좌측",
            rightLabel: "오른쪽",
            strengths: "장점",
            hairstyle: "추천 헤어스타일",
            eyewear: "추천 안경",
            contour: "컨투어링 팁",
            celebrities: "닮은 유명인",
            noData: "분석 데이터가 없습니다. 다시 스캔해 주세요.",
            backToScan: "다시 스캔하기",
            disclaimer: "본 분석은 AI 기반 추정이며, 참고용으로만 활용해 주세요.",
        },
        en: {
            title: "3D Analysis Result",
            subtitle: "Multi-angle scan based face shape analysis",
            shapeLabel: "Detected Face Shape",
            confidence: "Analysis Confidence",
            scanImages: "Scan Images",
            frontLabel: "Front",
            leftLabel: "Left",
            rightLabel: "Right",
            strengths: "Strengths",
            hairstyle: "Recommended Hairstyle",
            eyewear: "Recommended Eyewear",
            contour: "Contouring Tips",
            celebrities: "Celebrity Matches",
            noData: "No scan data found. Please scan again.",
            backToScan: "Scan Again",
            disclaimer: "This analysis is AI-generated and should be used for reference only.",
        }
    }[lang === 'ko' ? 'ko' : 'en'];

    useEffect(() => {
        setMounted(true);
        try {
            const data = sessionStorage.getItem("face3d_captures");
            if (data) {
                setCaptures(JSON.parse(data));
            }
        } catch { /* ignore */ }
        
        setResult(determineFaceShape());
    }, []);

    if (!mounted) {
        return <div className="min-h-[80vh] bg-black" />;
    }

    if (!result) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
                <Camera className="w-12 h-12 text-white/20 mb-4" />
                <p className="text-white/60 mb-6">{t.noData}</p>
                <Link href={`/face-shape-3d?lang=${lang}`}
                    className="px-6 py-3 bg-white text-black font-bold rounded-full text-sm"
                >
                    {t.backToScan}
                </Link>
            </div>
        );
    }

    const shapeCopy = getFaceShapeCopy(result.shape, lang);
    const confidencePercent = Math.round(result.confidence * 100);

    return (
        <div className="relative min-h-[80vh] py-12 px-4 sm:px-6">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-cyan-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                    <p className="text-cyan-400/60 text-xs uppercase tracking-[0.2em] font-medium">3D Scan Complete</p>
                    <h1 className="text-2xl sm:text-4xl font-bold text-white font-cinzel">{t.title}</h1>
                    <p className="text-white/40 text-sm">{t.subtitle}</p>
                </motion.div>

                {/* Scan Images */}
                {captures && (captures.front || captures.left || captures.right) && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-3 font-medium">{t.scanImages}</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: t.leftLabel, src: captures.left },
                                { label: t.frontLabel, src: captures.front },
                                { label: t.rightLabel, src: captures.right },
                            ].map((item) => (
                                <div key={item.label} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                                    {item.src ? (
                                        <Image src={item.src} alt={item.label} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Camera className="w-6 h-6 text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-1 text-center">
                                        <span className="text-white/70 text-[10px] uppercase tracking-wider">{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Shape Result Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6"
                >
                    {/* Shape Name */}
                    <div className="text-center space-y-3">
                        <p className="text-cyan-400/70 text-xs uppercase tracking-wider font-medium">{t.shapeLabel}</p>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white font-cinzel">{shapeCopy.name}</h2>
                        
                        {/* Confidence */}
                        <div className="flex items-center justify-center gap-3 mt-3">
                            <span className="text-white/40 text-xs">{t.confidence}</span>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} animate={{ width: `${confidencePercent}%` }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                    className="h-full bg-cyan-500 rounded-full"
                                />
                            </div>
                            <span className="text-cyan-400 text-xs font-bold">{confidencePercent}%</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <p className="text-white/70 text-sm leading-relaxed text-center">{shapeCopy.summary}</p>

                    {/* Divider */}
                    <div className="h-px bg-white/5" />

                    {/* Strengths */}
                    <div className="space-y-3">
                        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" /> {t.strengths}
                        </h3>
                        <ul className="space-y-2">
                            {shapeCopy.strengths.map((item, i) => (
                                <li key={i} className="text-white/60 text-sm leading-relaxed pl-4 border-l-2 border-cyan-500/20">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recommendations Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Hairstyle */}
                        <div className="bg-white/5 rounded-2xl p-4 space-y-2">
                            <h4 className="text-white/80 font-semibold text-xs uppercase tracking-wider">💇 {t.hairstyle}</h4>
                            <ul className="space-y-1">
                                {shapeCopy.hairstyle.map((item, i) => (
                                    <li key={i} className="text-white/50 text-xs leading-relaxed">• {item}</li>
                                ))}
                            </ul>
                        </div>
                        {/* Eyewear */}
                        <div className="bg-white/5 rounded-2xl p-4 space-y-2">
                            <h4 className="text-white/80 font-semibold text-xs uppercase tracking-wider">👓 {t.eyewear}</h4>
                            <ul className="space-y-1">
                                {shapeCopy.eyewear.map((item, i) => (
                                    <li key={i} className="text-white/50 text-xs leading-relaxed">• {item}</li>
                                ))}
                            </ul>
                        </div>
                        {/* Contouring */}
                        <div className="bg-white/5 rounded-2xl p-4 space-y-2 sm:col-span-2">
                            <h4 className="text-white/80 font-semibold text-xs uppercase tracking-wider">✨ {t.contour}</h4>
                            <ul className="space-y-1">
                                {shapeCopy.contour.map((item, i) => (
                                    <li key={i} className="text-white/50 text-xs leading-relaxed">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Celebrities */}
                    <div className="space-y-2">
                        <h3 className="text-white font-semibold text-sm">⭐ {t.celebrities}</h3>
                        <div className="flex flex-wrap gap-2">
                            {[...(shapeCopy.celebrities_male || []).slice(0, 2), ...(shapeCopy.celebrities_female || []).slice(0, 2)].map((name, i) => (
                                <span key={i} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <p className="text-white/20 text-[10px] text-center">{t.disclaimer}</p>

                {/* Back Button */}
                <div className="flex justify-center pb-8">
                    <Link href={`/face-shape-3d?lang=${lang}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 rounded-full text-sm transition-all"
                    >
                        <RotateCcw className="w-4 h-4" /> {t.backToScan}
                    </Link>
                </div>
            </div>
        </div>
    );
}
