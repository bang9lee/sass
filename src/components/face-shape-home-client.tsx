"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Menu, X, Play } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LanguageSelector } from "@/components/language-selector";
import { getFooterLabels } from "@/lib/site-content";
import { motion, AnimatePresence } from "framer-motion";

type Language = 'ko' | 'en' | 'zh' | 'ja';

function FaceShapeHomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = {
        ko: {
            title1: "정밀한 AI",
            title2: "AI얼굴형분석",
            subtitle: "당신의 이목구비 비율을 AI가 정교하게 분석하여\n가장 잘 어울리는 헤어스타일과 안경테를 제안해 드립니다.",
            button: "시작하기",
            menuAesthetic: "감성 테스트",
            menuPersonalColor: "퍼스널 컬러",
            menuFaceShape: "AI얼굴형분석"
        },
        en: {
            title1: "Precision AI",
            title2: "AI Face Shape Analysis",
            subtitle: "Our AI meticulously analyzes your facial proportions\nto suggest the perfect hairstyles and eyewear just for you.",
            button: "Get Started",
            menuAesthetic: "Aesthetic Test",
            menuPersonalColor: "Personal Color",
            menuFaceShape: "AI Face Shape Analysis"
        },
        zh: {
            title1: "精准 AI",
            title2: "脸型分析",
            subtitle: "AI 精确分析您的五官比例，\n为您推荐最适合的发型和眼镜框。",
            button: "开始测试",
            menuAesthetic: "美学测试",
            menuPersonalColor: "个人色彩",
            menuFaceShape: "脸型分析"
        },
        ja: {
            title1: "精密 AI",
            title2: "顔型分析",
            subtitle: "AIがあなたの顔のパーツ比率を精巧に分析し、\n最も似合うヘアスタイルとメガネをご提案します。",
            button: "診断を始める",
            menuAesthetic: "感性テスト",
            menuPersonalColor: "パーソナルカラー",
            menuFaceShape: "顔型分析"
        }
    }[lang];
    const footer = getFooterLabels(lang);

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full h-dvh flex flex-col overflow-hidden">
                {/* Navigation Bar */}
                <header className="flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 shrink-0 w-full z-50 absolute top-0 left-0 right-0 border-b border-white/5 bg-black/10 backdrop-blur-md">
                    <div className="flex items-center shrink-0 justify-start">
                        <Link href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                            FINDCORE
                        </Link>
                    </div>

                    <div className="hidden sm:flex items-center justify-center">
                        <nav className="flex items-center gap-8">
                            <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuAesthetic}
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-pink-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuPersonalColor}
                            </Link>
                            <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-cyan-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuFaceShape}
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/face-shape?lang=${l}`)} />
                        <button className="sm:hidden p-2 text-white/80 hover:text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl sm:hidden flex flex-col">
                            <div className="flex justify-end px-4 py-3">
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/80 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                <Link href={`/?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-white/70 hover:text-white tracking-widest uppercase">
                                    {t.menuAesthetic}
                                </Link>
                                <Link href={`/color?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-pink-300 hover:text-pink-200 tracking-widest uppercase">
                                    {t.menuPersonalColor}
                                </Link>
                                <Link href={`/face-shape?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-cyan-300 hover:text-cyan-200 tracking-widest uppercase">
                                    {t.menuFaceShape}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 lg:gap-16 pt-20 sm:pt-40 lg:pt-0 pb-4 lg:pb-0">
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-6 shrink-0 z-10">
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${isKorean ? 'font-korean' : 'font-serif'}`}>
                                <span className="block text-white mobile-slide-up">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 gradient-text-animated mobile-slide-up drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" style={{ animationDelay: '0.1s' }}>
                                    {t.title2}
                                </span>
                            </h1>
                            <p className={`text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed whitespace-pre-line max-w-lg lg:mx-0 mobile-slide-up ${isKorean ? 'font-korean word-keep-all' : ''}`} style={{ animationDelay: '0.2s' }}>
                                {t.subtitle}
                            </p>
                            <div className="hidden lg:block w-full max-w-sm mt-8">
                                <Link href={`/color/test?lang=${lang}&mode=shape`} className="group relative block w-full">
                                    <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                    <motion.div
                                        animate={{ scale: [1, 1.02, 1], backgroundColor: ["#000000", "#082f49", "#000000"], borderColor: ["rgba(255,255,255,0.2)", "rgba(34,211,238,0.5)", "rgba(255,255,255,0.2)"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="cta-play-btn relative flex items-center justify-center py-5 px-10 rounded-full border border-white/20 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        <Play className="w-5 h-5 fill-white text-white" />
                                    </motion.div>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center min-h-0 lg:h-auto lg:w-1/2 lg:max-w-none py-2 lg:py-0 shrink">
                            <div className="relative w-full h-full max-h-[45vh] lg:max-h-none aspect-square max-w-sm lg:max-w-md mobile-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                                <div className="relative w-full h-full overflow-hidden rounded-full border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.2)] bg-black">
                                    <Image src="/images/face_shape_hero_v6.png" alt="Face Shape Analysis" fill className="object-cover grayscale-[0.25] contrast-[1.1]" priority sizes="(max-width: 768px) 100vw, 50vw" />

                                    {/* High-Fidelity Marquardt Beauty Mask (PHI) Overlay */}
                                    <motion.svg
                                        viewBox="0 0 100 100"
                                        className="absolute inset-0 w-full h-full text-cyan-400 opacity-60 mix-blend-screen"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: [0.4, 0.7, 0.4], scale: 1 }}
                                        transition={{
                                            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                            scale: { duration: 1.5, ease: "easeOut" }
                                        }}
                                    >
                                        <g stroke="currentColor" fill="none" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round">
                                            {/* Outer Face Boundary (Pentagonal/Decagonal) */}
                                            <path d="M50,10 L32,15 L20,35 L20,58 L35,85 L50,92 L65,85 L80,58 L80,35 L68,15 Z" />

                                            {/* Top Forehead / hairline guides */}
                                            <path d="M32,15 L50,18 L68,15" strokeWidth="0.1" opacity="0.4" />
                                            <path d="M20,35 L50,10 L80,35" strokeWidth="0.1" opacity="0.4" />

                                            {/* Eye Line & Eyebrows guides */}
                                            <path d="M20,38 L80,38" strokeWidth="0.15" opacity="0.5" />
                                            <path d="M22,34 L45,34 L50,30 L55,34 L78,34" strokeWidth="0.2" />

                                            {/* Detailed Eyes (Geometric Polygons) */}
                                            <g strokeWidth="0.35">
                                                {/* Left Eye */}
                                                <path d="M25,40 L35,38 L43,40 L44,43 L35,46 L26,44 Z" />
                                                <circle cx="35" cy="42" r="1.2" />
                                                <path d="M28,42 L42,42" strokeWidth="0.1" opacity="0.3" />

                                                {/* Right Eye */}
                                                <path d="M57,40 L65,38 L75,40 L74,44 L65,46 L56,43 Z" />
                                                <circle cx="65" cy="42" r="1.2" />
                                                <path d="M58,42 L72,42" strokeWidth="0.1" opacity="0.3" />
                                            </g>

                                            {/* Nose Bridge and Base (Complex Triangle) */}
                                            <path d="M44,40 L50,32 L56,40" strokeWidth="0.2" />
                                            <path d="M46,55 L50,50 L54,55" strokeWidth="0.2" />
                                            <path d="M42,65 L50,70 L58,65 L54,55 L46,55 Z" strokeWidth="0.3" />
                                            <path d="M42,65 L35,85 M58,65 L65,85" strokeWidth="0.1" opacity="0.3" />

                                            {/* Mouth Region (Geometric "M" shape) */}
                                            <path d="M36,75 L45,78 L50,76 L55,78 L64,75 L50,85 Z" strokeWidth="0.35" />
                                            <path d="M36,75 Q50,82 64,75" strokeWidth="0.1" opacity="0.5" />

                                            {/* Connection web (Cheekbones to Jaw) */}
                                            <path d="M20,35 L42,65 M80,35 L58,65" strokeWidth="0.1" opacity="0.4" />
                                            <path d="M20,58 L42,65 L50,92 L58,65 L80,58" strokeWidth="0.1" opacity="0.4" />
                                            <path d="M20,35 L20,58 L35,85 M80,35 L80,58 L65,85" strokeWidth="0.2" />
                                        </g>

                                        {/* Data nodes at intersections */}
                                        <g fill="currentColor">
                                            <circle cx="20" cy="35" r="0.6" />
                                            <circle cx="80" cy="35" r="0.6" />
                                            <circle cx="50" cy="10" r="0.6" />
                                            <circle cx="50" cy="92" r="0.8" />
                                            <circle cx="42" cy="65" r="0.5" />
                                            <circle cx="58" cy="65" r="0.5" />
                                        </g>
                                    </motion.svg>

                                    {/* Sub-Data Display Overlay (Static Tech Feel) */}
                                    <div className="absolute top-1/4 left-6 hidden lg:flex flex-col gap-1 text-[8px] font-mono text-cyan-400 opacity-60">
                                        <div>POINT_A: (PHI) 1.618</div>
                                        <div>PHI_GRID: ACTIVE</div>
                                    </div>
                                    <div className="absolute bottom-1/4 right-6 hidden lg:flex flex-col gap-1 text-[8px] font-mono text-cyan-400 opacity-60 text-right">
                                        <div>SYMMETRY_IDX: 0.98</div>
                                        <div>ANALYSIS: PENDING</div>
                                    </div>

                                    {/* Scanning laser line effect */}
                                    <motion.div
                                        className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20 opacity-40"
                                        initial={{ top: '15%' }}
                                        animate={{ top: ['15%', '85%', '15%'] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-b from-cyan-900/10 via-transparent to-black/20" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:hidden w-full max-w-sm shrink-0 z-20 mobile-slide-up mt-auto" style={{ animationDelay: '0.4s' }}>
                            <Link href={`/color/test?lang=${lang}&mode=shape`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                <motion.div
                                    animate={{ scale: [1, 1.02, 1], backgroundColor: ["#000000", "#082f49", "#000000"], borderColor: ["rgba(255,255,255,0.2)", "rgba(34,211,238,0.5)", "rgba(255,255,255,0.2)"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="cta-play-btn relative flex items-center justify-center py-4 px-8 rounded-full border border-white/20 text-white shadow-xl active:scale-95 transition-all"
                                >
                                    <Play className="w-5 h-5 fill-white text-white" />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </main>

                <footer className="w-full shrink-0 border-t border-white/5 bg-black/20 px-8 py-6 backdrop-blur-sm relative">
                    <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                        <p className="hidden text-white/38 text-[10px] uppercase tracking-[0.2em] font-light md:block">findcore.me</p>
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-white/48">
                            <Link href={`/about?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.about}</Link>
                            <Link href={`/guides?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.guides}</Link>
                            <Link href={`/privacy?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.privacy}</Link>
                            <Link href={`/terms?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.terms}</Link>

                        </div>
                        <div className="text-center md:text-right">
                            <a href="https://t.me/todayshelp" target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/44 transition-colors hover:text-white/78">
                                Telegram @todayshelp
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </AuroraBackground>
    );
}

export default function FaceShapeHomeClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <FaceShapeHomeContent />
        </Suspense>
    );
}
