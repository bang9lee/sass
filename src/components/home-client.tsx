"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Footer } from "./footer";
import { SiteHeader } from "@/components/site-header";
import { motion } from "framer-motion";

type Language = "ko" | "en" | "zh" | "ja";

function HomeContent() {
    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang");
    const lang: Language = (["ko", "en", "zh", "ja"].includes(langParam || "") ? langParam : "en") as Language;
    const isKorean = lang === "ko";

    const t = {
        ko: {
            title1: "나의 감성은",
            title2: "어떤 무드일까?",
            subtitle: "당신만의 특별한 분위기와\n딱 맞는 감성 타입(Aesthetic)을 찾아보세요.",
        },
        en: {
            title1: "Find Your",
            title2: "Aesthetic Soul",
            subtitle: "Discover your unique vibe\nand the perfect Aesthetic type for you.",
        },
        zh: {
            title1: "寻找你的",
            title2: "专属美学氛围",
            subtitle: "探索你独特的氛围，\n找到最适合你的美学类型 (Aesthetic)。",
        },
        ja: {
            title1: "私の感性は",
            title2: "どんなムード？",
            subtitle: "あなただけの特別な雰囲気と\nぴったりの感性タイプ(Aesthetic)を見つけましょう。",
        },
    }[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full h-dvh flex flex-col overflow-hidden">
                <SiteHeader lang={lang} position="absolute" />

                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 lg:gap-16 pt-20 sm:pt-40 lg:pt-0 pb-4 lg:pb-0">
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-6 shrink-0 z-10">
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${isKorean ? "font-korean" : "font-serif"}`}>
                                <span className="block text-white mobile-slide-up">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-300 to-indigo-300 gradient-text-animated mobile-slide-up" style={{ animationDelay: "0.1s" }}>
                                    {t.title2}
                                </span>
                            </h1>

                            <p className={`text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed whitespace-pre-line max-w-md mobile-slide-up ${isKorean ? "font-korean" : ""}`} style={{ animationDelay: "0.2s" }}>
                                {t.subtitle}
                            </p>

                            <div className="hidden lg:block w-full max-w-sm mt-8">
                                <Link href={`/test?lang=${lang}`} className="group relative block w-full">
                                    <div className="absolute -inset-1 bg-linear-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt" />
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                            borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="cta-play-btn relative flex items-center justify-center py-5 px-10 rounded-full border border-white/20 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        <Play className="w-5 h-5 fill-white text-white" />
                                    </motion.div>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center min-h-0 lg:h-auto lg:w-1/2 lg:max-w-none py-2 lg:py-0">
                            <div className="relative w-full h-full max-h-[45vh] lg:max-h-none aspect-4/5 max-w-sm lg:max-w-md mobile-fade-in-scale" style={{ animationDelay: "0.3s" }}>
                                <div className="relative w-full h-full overflow-hidden rounded-4xl lg:rounded-[2.5rem] border border-white/20 shadow-2xl">
                                    <Image src="/images/hero.webp" alt="Aesthetic" fill className="object-cover lg:object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:hidden w-full max-w-sm shrink-0 z-20 mobile-slide-up mt-auto" style={{ animationDelay: "0.4s" }}>
                            <Link href={`/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                        borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"],
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

export default function HomeClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <HomeContent />
        </Suspense>
    );
}
