"use client";

import NextLink from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSelector } from "./language-selector";
import { Footer } from "./footer";
import { getFooterLabels } from "@/lib/site-content";

type Language = 'ko' | 'en' | 'zh' | 'ja';

interface LayoutShellProps {
    children: React.ReactNode;
    lang: Language;
}

export function LayoutShell({ children, lang }: LayoutShellProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = {
        ko: {
            menuPersonalColor: "퍼스널 컬러",
            menuAesthetic: "감성 테스트",
            menuFaceShape: "AI얼굴형분석"
        },
        en: {
            menuPersonalColor: "Personal Color",
            menuAesthetic: "Aesthetic Test",
            menuFaceShape: "AI Face Shape Analysis"
        },
        zh: {
            menuPersonalColor: "个人色彩",
            menuAesthetic: "美学测试",
            menuFaceShape: "脸型分析"
        },
        ja: {
            menuPersonalColor: "パーソナルカラー",
            menuAesthetic: "感性テスト",
            menuFaceShape: "顔型分析"
        }
    }[lang];

    const footer = getFooterLabels(lang);

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col pt-16">
            {/* Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/10 backdrop-blur-md">
                <div className="flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 w-full">
                    {/* Brand / Logo (Left) */}
                    <div className="flex items-center shrink-0 justify-start">
                        <NextLink href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                            FINDCORE
                        </NextLink>
                    </div>

                    {/* Navigation Links (Center - Desktop Only) */}
                    <div className="hidden sm:flex items-center justify-center">
                        <nav className="flex items-center gap-8">
                            <NextLink href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuAesthetic}
                            </NextLink>
                            <NextLink href={`/color?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-pink-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuPersonalColor}
                            </NextLink>
                            <NextLink href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-cyan-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuFaceShape}
                            </NextLink>
                        </nav>
                    </div>

                    {/* Language & Mobile Menu Toggle (Right) */}
                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`?lang=${l}`)} />

                        {/* Mobile Menu Toggle */}
                        <button
                            className="sm:hidden p-2 text-white/80 hover:text-white ml-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl sm:hidden flex flex-col"
                    >
                        <div className="flex justify-end px-4 py-3 pt-4">
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/80">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-8">
                            <NextLink href={`/?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-white/60 uppercase tracking-widest">{t.menuAesthetic}</NextLink>
                            <NextLink href={`/color?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-pink-300 uppercase tracking-widest">{t.menuPersonalColor}</NextLink>
                            <NextLink href={`/face-shape?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-cyan-300 uppercase tracking-widest">{t.menuFaceShape}</NextLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>

            <Footer lang={lang} />
        </div>
    );
}
