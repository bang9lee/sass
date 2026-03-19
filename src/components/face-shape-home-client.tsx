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

interface FaceShapeHomeClientProps {
    lang: Language;
}

export default function FaceShapeHomeClient({ lang: propLang }: FaceShapeHomeClientProps) {
    const { lang: ctxLang } = useLanguage();
    const lang = ctxLang ?? propLang;
    const isKorean = lang === 'ko';
    const isEnglish = lang === 'en';

    const t = {
        ko: {
            title1: "나만의 매력을 찾는",
            title2: "AI 얼굴형 분석",
            subtitle: "당신의 이목구비 비율을 정교하게 측정하여\n가장 잘 어울리는 스타일을 제안해 드립니다.",
        },
        en: {
            title1: "Precision AI",
            title2: "AI Face Shape Analysis",
            subtitle: "Our AI meticulously analyzes your facial proportions\nto suggest the perfect hairstyles and eyewear just for you.",
        },
        zh: {
            title1: "精准 AI",
            title2: "AI 脸型分析",
            subtitle: "AI 精确分析您的五官比例，\n为您推荐最适合的发型和眼镜框。",
        },
        ja: {
            title1: "精密 AI",
            title2: "AI 顔型分析",
            subtitle: "AIが顔のバランスを精密に分析し、\n最も似合うヘアスタイルとメガネをご提案します。",
        }
    }[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col">
                <SiteHeader lang={lang} position="absolute" />

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
                                    <Image src="/images/face_shape_hero_v7.webp" alt="Face Shape Analysis" fill className="object-cover" priority placeholder="empty" sizes="(max-width: 768px) 100vw, 50vw" />
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
