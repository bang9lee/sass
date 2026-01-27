"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";


// ============================================
// TYPES
// ============================================
type Language = 'ko' | 'en' | 'zh' | 'ja';

import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform, useMotionValue } from "framer-motion";

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value }: { value: number }) {
    const motionValue = useMotionValue(value); // Start from current value, not 0
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const displayValue = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    return <motion.span>{displayValue}</motion.span>;
}

// ============================================
// LANGUAGE SELECTOR
// ============================================
function LanguageSelector({
    currentLang,
    onSelect
}: {
    currentLang: Language;
    onSelect: (lang: Language) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const labelMap: Record<Language, string> = {
        ko: '한국어',
        en: 'English',
        zh: '中文',
        ja: '日本語'
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full
                   bg-white/10 border border-white/20
                   text-sm font-medium text-white/80 hover:text-white hover:bg-white/15
                   transition-all"
            >
                {labelMap[currentLang]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className={`absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden min-w-[120px] z-50 mobile-fade-in-scale mobile-gpu`}
                >
                    {(['ko', 'en', 'zh', 'ja'] as Language[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => { onSelect(l); setIsOpen(false); }}
                            className={`block w-full px-5 py-3 text-sm text-left mobile-hover touch-optimized 
                                       ${currentLang === l ? 'text-white bg-white/5' : 'text-white/60'}`}
                        >
                            {labelMap[l]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ============================================
// MAIN
// ============================================
function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as Language;
    const prefersReducedMotion = useReducedMotion();
    const isKorean = lang === 'ko';

    const [testCount, setTestCount] = useState(320592);

    // 실시간 카운트 증가 효과 (More realistic random growth)
    useEffect(() => {
        const interval = setInterval(() => {
            // 1~100명 사이의 랜덤한 숫자가 증가
            const randomIncrement = Math.floor(Math.random() * 100) + 1;
            setTestCount(prev => prev + randomIncrement);
        }, 10000); // 10초마다 갱신

        return () => clearInterval(interval);
    }, []);

    const t = {
        ko: {
            title1: "나의 감성은",
            title2: "어떤 무드일까?",
            subtitle: "당신만의 특별한 분위기와\n딱 맞는 감성 타입(Aesthetic)을 찾아보세요.",
            button: "테스트 시작하기",
            countSuffix: "명 테스트"
        },
        en: {
            title1: "Find Your",
            title2: "Aesthetic Soul",
            subtitle: "Discover your unique vibe\nand the perfect Aesthetic type for you.",
            button: "Start the Journey",
            countSuffix: " tested"
        },
        zh: {
            title1: "寻找你的",
            title2: "专属美学氛围",
            subtitle: "探索你独特的氛围，\n找到最适合你的美学类型 (Aesthetic)。",
            button: "开始测试",
            countSuffix: " 人已测试"
        },
        ja: {
            title1: "私の感性は",
            title2: "どんなムード？",
            subtitle: "あなただけの特別な雰囲気と\nぴったりの感性タイプ(Aesthetic)を見つけましょう。",
            button: "診断を始める",
            countSuffix: "人が診断"
        }
    }[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full h-dvh flex flex-col overflow-hidden">
                {/* 헤더 - 언어 선택 (Compact) */}
                <header className="flex justify-end p-3 shrink-0 w-full z-50 absolute top-0 right-0">
                    <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/?lang=${l}`)} />
                </header>

                {/* 메인 콘텐츠 - Premium Layout with Dynamic Spacing */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 w-full min-h-0 relative">
                    <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between lg:justify-center gap-2 lg:gap-16 py-safe-top lg:py-0">

                        {/* ===== 모바일: 타이틀 그룹 (상단) ===== */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:gap-6 shrink-0 z-10 pt-14 lg:pt-0">
                            {/* 타이틀 */}
                            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight 
                           ${isKorean ? 'font-korean' : 'font-serif'}`}>
                                <span className="block text-white mobile-slide-up">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 gradient-text-animated mobile-slide-up" style={{ animationDelay: '0.1s' }}>
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
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            backgroundColor: ["#000000", "#1e1b4b", "#000000"], // Black -> Indigo-950 -> Black
                                            borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className={`relative flex items-center justify-center gap-3 py-5 px-10 rounded-full border border-white/20 text-white text-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${isKorean ? 'font-korean' : ''}`}
                                    >

                                        <span className="tracking-wide">{t.button}</span>

                                    </motion.div>
                                </Link>
                            </div>
                        </div>

                        {/* ===== 모바일: 이미지 (중앙, 가용 공간 채움) ===== */}
                        {/* flex-1 with min-h-0 allows it to shrink to fit, object-contain preserves ratio */}
                        <div className="flex-1 w-full flex items-center justify-center min-h-0 lg:h-auto lg:w-1/2 lg:max-w-none py-2 lg:py-0">
                            <div className="relative w-full h-full max-h-[50vh] lg:max-h-none aspect-[4/5] max-w-sm lg:max-w-md mobile-fade-in-scale" style={{ animationDelay: '0.3s' }}>
                                {/* Image Card */}
                                <div className="relative w-full h-full overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 shadow-2xl">
                                    <Image src="/images/hero.webp" alt="Aesthetic" fill className="object-cover lg:object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                                    {/* Badge */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 w-max max-w-[90%] bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg z-10">
                                        <span className="relative flex h-2 w-2 shrink-0">
                                            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
                                            <span className="relative rounded-full h-full w-full bg-emerald-400"></span>
                                        </span>
                                        <span className="text-xs text-white/90 font-medium flex gap-1">
                                            <AnimatedCounter value={testCount} />
                                            <span>{t.countSuffix}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== 모바일: CTA 버튼 (하단 고정) ===== */}
                        <div className="lg:hidden w-full max-w-sm shrink-0 pb-4 z-20 mobile-slide-up" style={{ animationDelay: '0.4s' }}>
                            <Link href={`/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        backgroundColor: ["#000000", "#1e1b4b", "#000000"],
                                        borderColor: ["rgba(255,255,255,0.2)", "rgba(167,139,250,0.5)", "rgba(255,255,255,0.2)"]
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

                {/* Footer - minimal full-width premium style */}
                <footer className="w-full shrink-0 py-6 px-8 flex items-center justify-between z-50 mobile-fade-in-scale mobile-gpu border-t border-white/5 bg-black/20 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
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

export default function HomeClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <HomeContent />
        </Suspense>
    );
}
