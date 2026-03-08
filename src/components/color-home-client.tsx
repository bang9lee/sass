"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LanguageSelector } from "@/components/language-selector";
import { motion } from "framer-motion";

type Language = 'ko' | 'en' | 'zh' | 'ja';

function ColorHomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';

    const t = {
        ko: {
            title1: "나만의",
            title2: "퍼스널 컬러 찾기",
            subtitle: "셀카 한 장으로 당신의 피부 톤에 완벽하게 맞는\n퍼스널 컬러 계절과 찰떡 팔레트를 즉시 알아보세요.",
            button: "사진 업로드 & 시작",
        },
        en: {
            title1: "Find Your",
            title2: "True Colors",
            subtitle: "Upload a selfie to instantly discover your\npersonal color season and perfect palette.",
            button: "Upload & Start",
        },
        zh: {
            title1: "寻找你的",
            title2: "专属色彩",
            subtitle: "上传一张自拍，立即发现你的\n专属四季色彩与完美色盘。",
            button: "上传并开始",
        },
        ja: {
            title1: "あなただけの",
            title2: "パーソナルカラー",
            subtitle: "自撮り写真をアップロードして、あなたの\nパーソナルカラーと完璧なパレットをすぐに見つけましょう。",
            button: "アップロード＆スタート",
        }
    }[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full h-dvh flex flex-col overflow-hidden">
                {/* E-Commerce Style Navigation Bar */}
                <header className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0 w-full z-50 absolute top-0 left-0 right-0 border-b border-white/5 bg-black/10 backdrop-blur-md">
                    <div className="flex items-center shrink-0">
                        <Link href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                            FINDCORE
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <nav className="hidden sm:flex items-center gap-6">
                            <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                Aesthetic Test
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-pink-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                Personal Color
                            </Link>
                        </nav>

                        <Link href={`/?lang=${lang}`} className="sm:hidden text-[10px] font-medium text-white/60 hover:text-white transition-colors tracking-wider uppercase whitespace-nowrap shrink-0">
                            Aesthetic Test
                        </Link>

                        <div className="w-px h-4 bg-white/20 hidden sm:block" />
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/color?lang=${l}`)} />
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-6 lg:gap-16 py-safe-top pt-32 sm:pt-40 lg:pt-0 pb-6 lg:pb-0">

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
                                <Link href={`/color/test?lang=${lang}`} className="group relative block w-full">
                                    <div className="absolute -inset-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                            borderColor: ["rgba(255,255,255,0.2)", "rgba(236,72,153,0.5)", "rgba(255,255,255,0.2)"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className={`relative flex items-center justify-center gap-3 py-5 px-10 rounded-full border border-white/20 text-white text-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${isKorean ? 'font-korean' : ''}`}
                                    >
                                        <span className="tracking-wide">{t.button}</span>
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
                            <Link href={`/color/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                        borderColor: ["rgba(255,255,255,0.2)", "rgba(236,72,153,0.5)", "rgba(255,255,255,0.2)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className={`relative flex items-center justify-center gap-2 py-4 px-8 rounded-full border border-white/20 text-white text-lg font-bold shadow-xl active:scale-95 transition-all ${isKorean ? 'font-korean' : ''}`}
                                >
                                    <span className="tracking-wide">{t.button}</span>
                                </motion.div>
                            </Link>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full shrink-0 py-6 px-8 flex items-center justify-between z-50 border-t border-white/5 bg-black/20 backdrop-blur-sm relative">
                    <p className="text-white text-[10px] uppercase tracking-[0.2em] font-light">
                        findcore.me
                    </p>
                    <a
                        href="https://t.me/todayshelp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-white hover:text-cyan-200 transition-colors duration-300"
                    >
                        <span className="font-serif text-sm italic tracking-wide group-hover:tracking-wider transition-all">Telegram</span>
                        <span className="text-[10px] font-light opacity-90 group-hover:opacity-100">@todayshelp</span>
                    </a>
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
