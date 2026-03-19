"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Footer } from "./footer";
import { SiteHeader } from "@/components/site-header";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

type Language = 'ko' | 'en' | 'zh' | 'ja';

interface ColorHomeClientProps {
    lang: Language;
}

export default function ColorHomeClient({ lang: propLang }: ColorHomeClientProps) {
    const { lang: ctxLang } = useLanguage();
    const lang = ctxLang ?? propLang;
    const isKorean = lang === 'ko';

    const t = {
        ko: {
            title1: "나만의",
            title2: "퍼스널 컬러 찾기",
            subtitle: "셀카 한 장으로 당신의 피부 톤에 완벽하게 맞는\n퍼스널 컬러 계절과 찰떡 팔레트를 즉시 알아보세요.",
        },
        en: {
            title1: "Find Your",
            title2: "True Colors",
            subtitle: "Upload a selfie to instantly discover your\npersonal color season and perfect palette.",
        },
        zh: {
            title1: "寻找你的",
            title2: "专属色彩",
            subtitle: "上传一张自拍，立即发现你的\n专属四季色彩与完美色盘。",
        },
        ja: {
            title1: "あなただけの",
            title2: "パーソナルカラー",
            subtitle: "自撮り写真をアップロードして、あなたの\nパーソナルカラーと完璧なパレットをすぐに見つけましょう。",
        }
    }[lang];
    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col">
                <SiteHeader lang={lang} position="absolute" />

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
                                    <Image src="/images/personal_color_hero_v8.webp" alt="Personal Color Magic" fill className="object-cover" priority placeholder="empty" sizes="(max-width: 768px) 100vw, 50vw" />
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

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}
