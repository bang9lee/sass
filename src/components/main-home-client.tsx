"use client";

import Link from "next/link";
import { Sparkles, ScanFace, Palette, ArrowRight } from "lucide-react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Footer } from "./footer";
import { SiteHeader } from "@/components/site-header";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { MagazineSection } from "./MagazineSection";

type Language = "ko" | "en" | "zh" | "ja";

interface MainHomeClientProps {
    lang: Language;
}

export default function MainHomeClient({}: MainHomeClientProps) {
    const { lang } = useLanguage();
    const isKorean = lang === "ko";

    const contentByLang = {
        ko: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AI가 제안하는 당신만의\n독창적인 에스테틱과 스타일 가이드",
            categories: [
                {
                    id: "aesthetic",
                    title: "에스테틱 코어 테스트",
                    desc: "당신의 감성과 분위기를 정의하는\n시각적 미학 타입을 찾아보세요.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    color: "from-violet-500/20 to-purple-500/20",
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "퍼스널 컬러 진단",
                    desc: "피부톤과 조화를 이루는\n당신만의 워스트 & 베스트 컬러를 발견하세요.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    color: "from-pink-500/20 to-rose-500/20",
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 얼굴형 분석",
                    desc: "이목구비 비율 분석을 통해\n최적의 헤어와 안경 스타일을 추천합니다.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    color: "from-cyan-500/20 to-blue-500/20",
                    accent: "text-cyan-400",
                },
            ],
            explore: "시작하기",
        },
        en: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "Discover Your Unique Aesthetic\nwith Professional AI Analysis",
            categories: [
                {
                    id: "aesthetic",
                    title: "Aesthetic Core Test",
                    desc: "Define your visual vibe and discover\nthe aesthetic that represents you.",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    color: "from-violet-500/20 to-purple-500/20",
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "Personal Color",
                    desc: "Identify your skin tone and find\nthe colors that make you glow.",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    color: "from-pink-500/20 to-rose-500/20",
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI Face Analysis",
                    desc: "Detailed facial proportion analysis\nfor perfect hair and eyewear styles.",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    color: "from-cyan-500/20 to-blue-500/20",
                    accent: "text-cyan-400",
                },
            ],
            explore: "Explore",
        },
        zh: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "通过专业的 AI 分析\n探索您独特的美学与风格指南",
            categories: [
                {
                    id: "aesthetic",
                    title: "美学类型测试",
                    desc: "定义您的视觉氛围，\n发现代表您的美学风格。",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    color: "from-violet-500/20 to-purple-500/20",
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "个人色彩诊断",
                    desc: "识别您的肤色基调，\n找到让您焕发光彩的专属色彩。",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    color: "from-pink-500/20 to-rose-500/20",
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 脸型分析",
                    desc: "详细的五官比例分析，\n为您推荐完美的发型与眼镜。",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    color: "from-cyan-500/20 to-blue-500/20",
                    accent: "text-cyan-400",
                },
            ],
            explore: "开始探索",
        },
        ja: {
            title: "FINDCORE",
            heroTagline: "FINDCORE",
            subtitle: "AIが提案するあなただけの\n独創的な感性とスタイルガイド",
            categories: [
                {
                    id: "aesthetic",
                    title: "感性タイプ診断",
                    desc: "あなたの雰囲気や感性を定義する\n視覚的な美学タイプを見つけましょう。",
                    href: "/aesthetic",
                    image: "/images/hero.webp",
                    icon: Sparkles,
                    color: "from-violet-500/20 to-purple-500/20",
                    accent: "text-purple-400",
                },
                {
                    id: "personal-color",
                    title: "パーソナルカラー",
                    desc: "肌のトーンと調和する、\nあなただけのベストカラーを見つけましょう。",
                    href: "/color",
                    image: "/images/personal_color_hero_v8.webp",
                    icon: Palette,
                    color: "from-pink-500/20 to-rose-500/20",
                    accent: "text-rose-400",
                },
                {
                    id: "face-shape",
                    title: "AI 顔型分析",
                    desc: "顔立ちの比率を精密に分析し、\n最適なヘアとメガネスタイルを提案します。",
                    href: "/face-shape",
                    image: "/images/face_shape_hero_v7.webp",
                    icon: ScanFace,
                    color: "from-cyan-500/20 to-blue-500/20",
                    accent: "text-cyan-400",
                },
            ],
            explore: "はじめる",
        },
    };
    
    const t = contentByLang[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                <SiteHeader lang={lang} position="fixed" />

                <main className="flex-1 flex flex-col items-center px-0 sm:px-4 w-full pt-24 pb-20">
                    {/* Hero Section - Brand Identity */}
                    <div className="max-w-4xl mx-auto text-center px-4 mb-8 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-widest text-white/90 font-cinzel uppercase">
                                {t.heroTagline}
                            </h1>
                            <div className="w-16 h-px bg-white/10 mt-4" />
                        </motion.div>
                    </div>

                    {/* Services View - Horizontal Snap on Mobile, Grid on Desktop */}
                    <div className="w-full max-w-7xl mx-auto overflow-visible relative">
                        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory px-6 sm:px-0 no-scrollbar pb-8 sm:pb-0">
                            {t.categories.map((cat: { id: string; href: string; image: string; title: string; desc: string }, idx: number) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                                    className="group relative min-w-[85%] sm:min-w-0 snap-center"
                                >
                                    <Link href={`${cat.href}?lang=${lang}`} className="block h-full">
                                        <div className="relative h-full overflow-hidden rounded-4xl border border-white/10 bg-black/40 transition-all duration-500 group-hover:border-white/20 group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col">
                                            
                                            {/* Image Area */}
                                            <div className="relative aspect-4/5 overflow-hidden">
                                                <Image 
                                                    src={cat.image} 
                                                    alt={cat.title} 
                                                    fill 
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-8 flex flex-col flex-1 items-start text-left">
                                                <h3 className={`text-2xl font-bold text-white mb-3 ${isKorean ? "font-korean font-black" : ""}`}>
                                                    {cat.title}
                                                </h3>
                                                <p className={`text-sm text-white/50 leading-relaxed mb-8 whitespace-pre-line ${isKorean ? "font-korean font-medium" : ""}`}>
                                                    {cat.desc}
                                                </p>
                                                
                                                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                                    <span>{t.explore}</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>

                                            {/* Hover Glow */}
                                            <div className="absolute -inset-0.5 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {/* Magazine Section */}
                    <MagazineSection />
                </main>

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}
