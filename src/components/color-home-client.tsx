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

function ColorHomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = {
        ko: {
            title1: "나만의",
            title2: "퍼스널 컬러 찾기",
            subtitle: "셀카 한 장으로 당신의 피부 톤에 완벽하게 맞는\n퍼스널 컬러 계절과 찰떡 팔레트를 즉시 알아보세요.",
            button: "",
            menuAesthetic: "감성 테스트",
            menuPersonalColor: "퍼스널 컬러",
            menuFaceShape: "AI얼굴형분석"
        },
        en: {
            title1: "Find Your",
            title2: "True Colors",
            subtitle: "Upload a selfie to instantly discover your\npersonal color season and perfect palette.",
            button: "",
            menuAesthetic: "Aesthetic Test",
            menuPersonalColor: "Personal Color",
            menuFaceShape: "AI Face Shape Analysis"
        },
        zh: {
            title1: "寻找你的",
            title2: "专属色彩",
            subtitle: "上传一张自拍，立即发现你的\n专属四季色彩与完美色盘。",
            button: "",
            menuAesthetic: "美学测试",
            menuPersonalColor: "个人色彩",
            menuFaceShape: "脸型分析"
        },
        ja: {
            title1: "あなただけの",
            title2: "パーソナルカラー",
            subtitle: "自撮り写真をアップロードして、あなたの\nパーソナルカラーと完璧なパレットをすぐに見つけましょう。",
            button: "",
            menuAesthetic: "感性テスト",
            menuPersonalColor: "パーソナルカラー",
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
                            <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuAesthetic}
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-pink-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuPersonalColor}
                            </Link>
                            <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-cyan-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuFaceShape}
                            </Link>
                        </nav>
                    </div>

                    {/* Language & Mobile Menu Toggle (Right) */}
                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/color?lang=${l}`)} />

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
                                        className="text-xl font-medium text-white/70 hover:text-white transition-colors tracking-widest uppercase"
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

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 lg:gap-16 pt-20 sm:pt-40 lg:pt-0 pb-4 lg:pb-0">

                        {/* ===== 타이틀 그룹 ===== */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-6 shrink-0 z-10">
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${isKorean ? 'font-korean' : 'font-serif'}`}>
                                <span className="block text-white mobile-slide-up">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 gradient-text-animated mobile-slide-up drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]" style={{ animationDelay: '0.1s' }}>
                                    {t.title2}
                                </span>
                            </h1>

                            <p className={`text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed whitespace-pre-line max-w-lg lg:mx-0 mobile-slide-up ${isKorean ? 'font-korean word-keep-all' : ''}`} style={{ animationDelay: '0.2s' }}>
                                {t.subtitle}
                            </p>

                            {/* CTA 버튼 - 데스크탑 전용 */}
                            <div className="hidden lg:block w-full max-w-sm mt-8">
                                <Link href={`/color/test?lang=${lang}&mode=color`} className="group relative block w-full">
                                    <div className="absolute -inset-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                            borderColor: ["rgba(255,255,255,0.2)", "rgba(236,72,153,0.5)", "rgba(255,255,255,0.2)"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="cta-play-btn relative flex items-center justify-center py-5 px-10 rounded-full border border-white/20 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        <Play className="w-5 h-5 fill-white text-white" />
                                    </motion.div>
                                </Link>
                            </div>
                        </div>

                        {/* ===== Hero Image (중앙) ===== */}
                        <div className="w-full flex items-center justify-center min-h-0 lg:h-auto lg:w-1/2 lg:max-w-none py-2 lg:py-0 shrink">
                            <div className="relative w-full h-full max-h-[45vh] lg:max-h-none aspect-square max-w-sm lg:max-w-md mobile-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                                <div className="relative w-full h-full overflow-hidden rounded-full border border-white/20 shadow-[-10px_-10px_30px_rgba(236,72,153,0.1),10px_10px_30px_rgba(167,139,250,0.1)]">
                                    <Image src="/images/personal_color_hero_v8.png" alt="Personal Color Magic" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                            </div>
                        </div>

                        {/* CTA 버튼 - 모바일 전용 (하단 고정) */}
                        <div className="lg:hidden w-full max-w-sm shrink-0 z-20 mobile-slide-up mt-auto" style={{ animationDelay: '0.4s' }}>
                            <Link href={`/color/test?lang=${lang}&mode=color`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                        borderColor: ["rgba(255,255,255,0.2)", "rgba(236,72,153,0.5)", "rgba(255,255,255,0.2)"]
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

                {/* Footer */}
                <footer className="w-full shrink-0 border-t border-white/5 bg-black/20 px-8 py-6 backdrop-blur-sm relative">
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

export default function ColorHomeClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <ColorHomeContent />
        </Suspense>
    );
}
