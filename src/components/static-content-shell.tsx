"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSelector } from "@/components/language-selector";
import { getFooterLabels, type SupportedLang } from "@/lib/site-content";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface StaticContentShellProps {
    lang: SupportedLang;
    title: string;
    intro: string;
    children: React.ReactNode;
}

const MENU_LABELS: Record<SupportedLang, { aesthetic: string; color: string; faceShape: string }> = {
    ko: { aesthetic: "감성 테스트", color: "퍼스널 컬러", faceShape: "AI얼굴형분석" },
    en: { aesthetic: "Aesthetic Test", color: "Personal Color", faceShape: "AI Face Shape Analysis" },
    zh: { aesthetic: "美学测试", color: "个人色彩", faceShape: "脸型分析" },
    ja: { aesthetic: "感性テスト", color: "パーソナルカラー", faceShape: "顔型分析" },
};

export function StaticContentShell({
    lang,
    title,
    intro,
    children,
}: StaticContentShellProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const footer = getFooterLabels(lang);
    const menu = MENU_LABELS[lang];

    return (
        <AuroraBackground className="justify-start pb-0">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                {/* Same header as main home pages */}
                <header className="sticky top-0 z-50 flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl shrink-0">
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
                                {menu.aesthetic}
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-pink-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {menu.color}
                            </Link>
                            <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-cyan-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {menu.faceShape}
                            </Link>
                        </nav>
                    </div>

                    {/* Language & Mobile Menu Toggle (Right) */}
                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`${window.location.pathname}?lang=${l}`)} />
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

                {/* Main Content Area - flex-1 pushes footer to the bottom */}
                <main className="relative z-10 flex-1 flex flex-col px-6 py-16 md:py-24 w-full justify-start items-center">
                    <div className="w-full max-w-5xl space-y-10">
                        <div className="space-y-6 text-center">
                            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl lg:text-6xl font-korean">{title}</h1>
                            <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 font-korean break-keep">{intro}</p>
                        </div>
                        {children}
                    </div>
                </main>

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
        </AuroraBackground>
    );
}
