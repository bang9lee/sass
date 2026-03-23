"use client";

import Link from "next/link";
import { Sparkles, ScanFace, Palette, ArrowRight, ChevronRight, ChevronLeft, type LucideIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Footer } from "./footer";
import { SiteHeader } from "@/components/site-header";
import { MagazineSection } from "./MagazineSection";
import type { LocalizedMagazineArticlePreview } from "@/lib/magazine-content";

type Language = "ko" | "en" | "zh" | "ja";

type HomeCategory = {
    id: string;
    title: string;
    desc: string;
    href: string;
    image: string;
    icon: LucideIcon;
    accent: string;
};

interface MainHomeClientProps {
    lang: Language;
    magazineArticles: LocalizedMagazineArticlePreview[];
}

export default function MainHomeClient({ lang, magazineArticles }: MainHomeClientProps) {
    const isKorean = lang === "ko";

    const contentByLang: Record<Language, { title: string; heroTagline: string; subtitle: string; categories: HomeCategory[]; explore: string }> = {
        ko: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AI Aesthetic & Style Platform",
            categories: [
                {
                    id: "aesthetic",
                    title: "에스테틱 코어 테스트",
                    desc: "당신의 감성과 분위기를 정의하는\n시각적 미학 타입을 찾아보세요.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "퍼스널 컬러 진단",
                    desc: "피부톤과 조화를 이루는\n당신만의 워스트 & 베스트 컬러를 발견하세요.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 얼굴형 분석",
                    desc: "이목구비 비율 분석을 통해\n최적의 헤어와 안경 스타일을 추천합니다.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    accent: "text-cyan-400",
                },
                {
                    id: "makeup",
                    title: "AI 메이크업",
                    desc: "업로드한 사진 위에 다양한\n가상 메이크업을 즉시 체험해보세요.",
                    href: "/makeup",
                    image: "/images/makeup_hero.png",
                    icon: Palette,
                    accent: "text-amber-400",
                },
            ],
            explore: "시작하기",
        },
        en: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AI Aesthetic & Style Platform",
            categories: [
                {
                    id: "aesthetic",
                    title: "Aesthetic Core Test",
                    desc: "Define your visual vibe and discover\nthe aesthetic that represents you.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "Personal Color",
                    desc: "Identify your skin tone and find\nthe colors that make you glow.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI Face Analysis",
                    desc: "Detailed facial proportion analysis\nfor perfect hair and eyewear styles.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    accent: "text-cyan-400",
                },
                {
                    id: "makeup",
                    title: "AI Makeup Simulator",
                    desc: "Apply various virtual makeup styles\ninstantly with AI-powered precision.",
                    href: "/makeup",
                    image: "/images/makeup_hero.png",
                    icon: Palette,
                    accent: "text-amber-400",
                },
            ],
            explore: "Explore",
        },
        zh: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AI Aesthetic & Style Platform",
            categories: [
                {
                    id: "aesthetic",
                    title: "美学类型测试",
                    desc: "定义您的视觉氛围，\n发现代表您的美学风格.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "个人色彩诊断",
                    desc: "识别您的肤色基调，\n找到让您焕发光彩的专属色彩.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 脸型分析",
                    desc: "详细的五官比例分析，\n为您推荐完美的发型与眼镜.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    accent: "text-cyan-400",
                },
                {
                    id: "makeup",
                    title: "AI 智能化妆",
                    desc: "在您的照片上，\n立即体验多种高精度的虚拟化妆功能.",
                    href: "/makeup",
                    image: "/images/makeup_hero.png",
                    icon: Palette,
                    accent: "text-amber-400",
                },
            ],
            explore: "开始探索",
        },
        ja: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AI Aesthetic & Style Platform",
            categories: [
                {
                    id: "aesthetic",
                    title: "感性タイプ診断",
                    desc: "あなたの雰囲気や感성을 정의하는\n시각적인 미학 타입을 찾아보세요.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "パーソナルカラー",
                    desc: "肌のトーンと調和する、\nあなただけのベストカラーを見つけましょう.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 顔型分析",
                    desc: "顔立ちの比率을 정밀하게 분석하여\n최적의 헤어와 안경 스타일을 추천합니다.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    accent: "text-cyan-400",
                },
                {
                    id: "makeup",
                    title: "AI メイク",
                    desc: "사진 위에 컬러풀한 가상 메이크업을\n즉시 시뮬레이션해 보세요.",
                    href: "/makeup",
                    image: "/images/makeup_hero.png",
                    icon: Palette,
                    accent: "text-amber-400",
                },
            ],
            explore: "はじめる",
        },
    };
    
    const t = contentByLang[lang];
    const [activeIdx, setActiveIdx] = useState(0);

    const nextSlide = useCallback(() => {
        setActiveIdx((prev) => (prev + 1) % t.categories.length);
    }, [t.categories.length]);

    const prevSlide = useCallback(() => {
        setActiveIdx((prev) => (prev - 1 + t.categories.length) % t.categories.length);
    }, [t.categories.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                <SiteHeader lang={lang} position="fixed" />

                <main className="flex-1 flex flex-col items-center px-0 sm:px-4 w-full pt-16 sm:pt-20 pb-20">
                    {/* Hero Header */}
                    <div className="max-w-4xl mx-auto text-center px-4 mb-0 sm:mb-4 mt-2 sm:mt-8 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.2em] text-white/90 font-cinzel uppercase">
                                {t.heroTagline}
                            </h1>
                            <div className="text-white/40 text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase mt-4">
                                {t.subtitle}
                            </div>
                            <div className="w-12 h-px bg-white/10 mt-6" />
                        </motion.div>
                    </div>

                    {/* Premium Center Carousel */}
                    <div className="w-full relative py-4 sm:py-12 flex flex-col items-center">
                        {/* Container for Spatial Cards */}
                        <div className="relative w-full h-120 sm:h-162.5 flex items-center justify-center overflow-visible">
                            {t.categories.map((cat, idx) => {
                                const total = t.categories.length;
                                let diff = idx - activeIdx;
                                
                                // Proper Circular Offset Math
                                if (diff > total / 2) diff -= total;
                                if (diff < -total / 2) diff += total;

                                const isActive = idx === activeIdx;
                                const isVisible = Math.abs(diff) <= 1;

                                return (
                                    <motion.div
                                        key={cat.id}
                                        initial={false}
                                        animate={{
                                            x: diff * (typeof window !== 'undefined' && window.innerWidth < 640 ? 280 : 420),
                                            scale: isActive ? 1.05 : 0.85,
                                            opacity: isActive ? 1 : (isVisible ? 0.4 : 0),
                                            filter: isActive ? "blur(0px)" : "blur(8px)",
                                            zIndex: isActive ? 20 : 10,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 20,
                                            opacity: { duration: 0.4 }
                                        }}
                                        className="absolute w-75 sm:w-100 h-112.5 sm:h-145 pointer-events-auto cursor-pointer"
                                        onClick={() => isActive ? null : setActiveIdx(idx)}
                                    >
                                        <Link href={`${cat.href}?lang=${lang}`} className="block h-full group">
                                            <div className="relative h-full rounded-[2.5rem] bg-black/40 border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-white/20 flex flex-col">
                                                {/* Image Area */}
                                                <div className="relative h-[65%] w-full overflow-hidden">
                                                    <Image 
                                                        src={cat.image} 
                                                        alt={cat.title} 
                                                        fill 
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                        priority={isActive}
                                                        sizes="(max-width: 768px) 100vw, 400px"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-8 sm:p-10 flex flex-col flex-1 bg-zinc-950/60 backdrop-blur-md group-hover:bg-zinc-950/80 transition-colors duration-700">
                                                    <div className="flex flex-col mb-5">
                                                        <h3 className={`text-2xl sm:text-3xl font-semibold tracking-wide text-white/95 ${isKorean ? "font-korean break-keep" : "font-cinzel uppercase"}`}>
                                                            {cat.title}
                                                        </h3>
                                                        <div className="w-6 h-px bg-white/20 mt-5 group-hover:w-12 group-hover:bg-white/40 transition-all duration-700 ease-out" />
                                                    </div>
                                                    <p className={`text-[13px] sm:text-sm text-white/50 leading-[1.8] font-light ${isKorean ? "font-korean" : ""}`}>
                                                        {cat.desc.split('\n').map((line, i) => (
                                                            <span key={i} className="block">{line}</span>
                                                        ))}
                                                    </p>
                                                    <div className="mt-auto pt-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 group-hover:text-white transition-colors duration-500">
                                                        <span>{t.explore}</span>
                                                        <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pagination & Arrows */}
                        <div className="relative z-30 flex items-center gap-8 mt-4">
                            <button onClick={prevSlide} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                                <ChevronLeft className="size-5" />
                            </button>
                            
                            <div className="flex gap-2">
                                {t.categories.map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setActiveIdx(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${activeIdx === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <button onClick={nextSlide} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    </div>

                    {/* Magazine Section */}
                    <MagazineSection lang={lang} articles={magazineArticles} />
                </main>

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}
