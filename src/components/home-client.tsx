"use client";

import Link from "next/link";
import { Menu, X, Play } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LanguageSelector } from "@/components/language-selector";
import { getFooterLabels } from "@/lib/site-content";


// ============================================
// TYPES
// ============================================
type Language = 'ko' | 'en' | 'zh' | 'ja';

import { motion, AnimatePresence } from "framer-motion";


// ============================================
// MAIN
// ============================================
function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';

    const [isMenuOpen, setIsMenuOpen] = useState(false);



    const t = {
        ko: {
            title1: "나의 감성은",
            title2: "어떤 무드일까?",
            subtitle: "당신만의 특별한 분위기와\n딱 맞는 감성 타입(Aesthetic)을 찾아보세요.",
            button: "",
            countSuffix: "명 테스트",
            menuPersonalColor: "퍼스널 컬러",
            menuAesthetic: "감성 테스트",
            menuFaceShape: "AI얼굴형분석"
        },
        en: {
            title1: "Find Your",
            title2: "Aesthetic Soul",
            subtitle: "Discover your unique vibe\nand the perfect Aesthetic type for you.",
            button: "",
            countSuffix: " tested",
            menuPersonalColor: "Personal Color",
            menuAesthetic: "Aesthetic Test",
            menuFaceShape: "AI Face Shape Analysis"
        },
        zh: {
            title1: "寻找你的",
            title2: "专属美学氛围",
            subtitle: "探索你独特的氛围，\n找到最适合你的美学类型 (Aesthetic)。",
            button: "",
            countSuffix: " 人已测试",
            menuPersonalColor: "个人色彩",
            menuAesthetic: "美学测试",
            menuFaceShape: "脸型分析"
        },
        ja: {
            title1: "私の感性は",
            title2: "どんなムード？",
            subtitle: "あなただけの特別な雰囲気と\nぴったりの感性タイプ(Aesthetic)を見つけましょう。",
            button: "",
            countSuffix: "人が診断",
            menuPersonalColor: "パーソナルカラー",
            menuAesthetic: "感性テスト",
            menuFaceShape: "顔型分析"
        }
    }[lang];
    const footer = getFooterLabels(lang);

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full h-dvh flex flex-col overflow-hidden">
                {/* E-Commerce Style Navigation Bar */}
                <header className="flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 shrink-0 w-full z-50 absolute top-0 left-0 right-0 border-b border-white/5 bg-black/10 backdrop-blur-md">
                    {/* Brand / Logo (Left) */}
                    <div className="flex items-center shrink-0 justify-start">
                        <Link href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                            FINDCORE
                        </Link>
                    </div>

                    {/* Navigation Links (Center - Desktop Only) */}
                    <div className="hidden sm:flex items-center justify-center">
                        <nav className="flex items-center gap-8">
                            <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/90 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuAesthetic}
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-pink-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuPersonalColor}
                            </Link>
                            <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-cyan-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuFaceShape}
                            </Link>
                        </nav>
                    </div>

                    {/* Language & Mobile Menu Toggle (Right) */}
                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/?lang=${l}`)} />

                        {/* Mobile Menu Toggle */}
                        <button
                            className="sm:hidden p-2 text-white/80 hover:text-white ml-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
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
                            {/* Close button */}
                            <div className="flex justify-end px-4 py-3">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-white/80 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {/* Menu items */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        href={`/?lang=${lang}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl font-medium text-white/90 hover:text-white transition-colors tracking-widest uppercase"
                                    >
                                        {t.menuAesthetic}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link
                                        href={`/color?lang=${lang}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl font-medium text-pink-300 hover:text-pink-200 transition-colors tracking-widest uppercase"
                                    >
                                        {t.menuPersonalColor}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link
                                        href={`/face-shape?lang=${lang}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl font-medium text-cyan-300 hover:text-cyan-200 transition-colors tracking-widest uppercase"
                                    >
                                        {t.menuFaceShape}
                                    </Link>
                                </motion.div>
                            </div>
                            {/* Brand at bottom */}
                            <div className="pb-10 text-center">
                                <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-cinzel">FINDCORE</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 메인 콘텐츠 - Premium Layout with Dynamic Spacing */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 lg:gap-16 pt-20 sm:pt-40 lg:pt-0 pb-4 lg:pb-0">

                        {/* ===== 모바일: 타이틀 그룹 (상단) ===== */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-6 shrink-0 z-10">
                            {/* 타이틀 */}
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight 
                           ${isKorean ? 'font-korean' : 'font-serif'}`}>
                                <span className="block text-white mobile-slide-up">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-300 to-indigo-300 gradient-text-animated mobile-slide-up" style={{ animationDelay: '0.1s' }}>
                                    {t.title2}
                                </span>
                            </h1>
                            {/* 서브타이틀 */}
                            <p className={`text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed whitespace-pre-line max-w-md mobile-slide-up
                           ${isKorean ? 'font-korean' : ''}`} style={{ animationDelay: '0.2s' }}>
                                {t.subtitle}
                            </p>

                            {/* CTA 버튼 - 데스크탑 전용 */}
                            <div className="hidden lg:block w-full max-w-sm mt-8">
                                <Link href={`/test?lang=${lang}`} className="group relative block w-full">
                                    <div className="absolute -inset-1 bg-linear-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                            borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="cta-play-btn relative flex items-center justify-center py-5 px-10 rounded-full border border-white/20 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        <Play className="w-5 h-5 fill-white text-white" />
                                    </motion.div>
                                </Link>
                            </div>
                        </div>

                        {/* ===== 모바일: 이미지 (중앙, 가용 공간 채움) ===== */}
                        {/* Removed flex-1 so it doesn't push the title away */}
                        <div className="w-full flex items-center justify-center min-h-0 lg:h-auto lg:w-1/2 lg:max-w-none py-2 lg:py-0">
                            <div className="relative w-full h-full max-h-[45vh] lg:max-h-none aspect-4/5 max-w-sm lg:max-w-md mobile-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                                {/* Image Card */}
                                <div className="relative w-full h-full overflow-hidden rounded-4xl lg:rounded-[2.5rem] border border-white/20 shadow-2xl">
                                    <Image src="/images/hero.webp" alt="Aesthetic" fill className="object-cover lg:object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                                    {/* Badge */}

                                </div>
                            </div>
                        </div>

                        {/* ===== 모바일: CTA 버튼 (하단 고정) ===== */}
                        <div className="lg:hidden w-full max-w-sm shrink-0 z-20 mobile-slide-up mt-auto" style={{ animationDelay: '0.4s' }}>
                            <Link href={`/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                        borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="cta-play-btn relative flex items-center justify-center py-4 px-8 rounded-full border border-white/20 text-white shadow-xl active:scale-95 transition-all"
                                >
                                    <Play className="w-5 h-5 fill-white text-white" />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer - minimal full-width premium style */}
                <footer className="w-full shrink-0 border-t border-white/5 bg-black/20 px-8 py-6 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
                    <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                        <p className="hidden text-white/38 text-[10px] uppercase tracking-[0.2em] font-light md:block">
                            findcore.me
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-white/48">
                            <Link href={`/about?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.about}</Link>
                            <Link href={`/guides?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.guides}</Link>
                            <Link href={`/privacy?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.privacy}</Link>
                            <Link href={`/terms?lang=${lang}`} className="hover:text-white/78 transition-colors">{footer.terms}</Link>

                        </div>
                        <div className="text-center md:text-right">
                            <a
                                href="https://t.me/todayshelp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-white/44 transition-colors hover:text-white/78"
                            >
                                Telegram @todayshelp
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </AuroraBackground>
    );
}

export default function HomeClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <HomeContent />
        </Suspense>
    );
}
