"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Menu, X, Play } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LanguageSelector } from "@/components/language-selector";
import { Footer } from "./footer";
import { getFooterLabels } from "@/lib/site-content";
import { motion, AnimatePresence } from "framer-motion";

type Language = 'ko' | 'en' | 'zh' | 'ja';

function FaceShapeHomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';
    const isEnglish = lang === 'en';

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
            title2: "AI 脸型分析",
            subtitle: "AI 精确分析您的五官比例，\n为您推荐最适合的发型和眼镜框。",
            button: "开始测试",
            menuAesthetic: "美学测试",
            menuPersonalColor: "个人色彩",
            menuFaceShape: "AI 脸型分析"
        },
        ja: {
            title1: "精密 AI",
            title2: "AI 顔型分析",
            subtitle: "AI가 얼굴의 밸런스를 정밀하게 분석하여,\n가장 어울리는 헤어스타일과 안경을 제안합니다.",
            button: "진단을 시작하기",
            menuAesthetic: "감성 테스트",
            menuPersonalColor: "퍼스널 컬러",
            menuFaceShape: "AI 얼굴형 분석"
        }
    }[lang];

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
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${isKorean ? 'font-korean' : isEnglish ? 'font-serif' : ''}`}>
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
                                    <Image src="/images/face_shape_hero_v7.png" alt="Face Shape Analysis" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
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

                <Footer lang={lang} />
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
