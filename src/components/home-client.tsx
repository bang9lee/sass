"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ============================================
// TYPES
// ============================================
type Language = 'ko' | 'en' | 'zh' | 'ja';

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

    // 실시간 카운트 증가 효과
    useEffect(() => {
        const interval = setInterval(() => {
            setTestCount(prev => prev + 2);
        }, 10000); // 10초마다 2명씩 증가

        return () => clearInterval(interval);
    }, []);

    const t = {
        ko: {
            title1: "나의 감성은",
            title2: "어떤 무드일까?",
            subtitle: "당신만의 특별한 분위기와\n딱 맞는 감성 타입(Aesthetic)을 찾아보세요.",
            button: "테스트 시작하기",
            count: `${testCount.toLocaleString()}명 테스트`
        },
        en: {
            title1: "Find Your",
            title2: "Aesthetic Soul",
            subtitle: "Discover your unique vibe\nand the perfect Aesthetic type for you.",
            button: "Start the Journey",
            count: `${testCount.toLocaleString()} tested`
        },
        zh: {
            title1: "寻找你的",
            title2: "专属美学氛围",
            subtitle: "探索你独特的氛围，\n找到最适合你的美学类型 (Aesthetic)。",
            button: "开始测试",
            count: `${testCount.toLocaleString()} 人已测试`
        },
        ja: {
            title1: "私の感性は",
            title2: "どんなムード？",
            subtitle: "あなただけの特別な雰囲気と\nぴったりの感性タイプ(Aesthetic)を見つけましょう。",
            button: "診断を始める",
            count: `${testCount.toLocaleString()}人が診断`
        }
    }[lang];

    return (
        <AuroraBackground>
            <div className="relative z-10 w-full min-h-screen flex flex-col overflow-x-hidden">
                {/* 헤더 - 언어 선택 */}
                <header className="flex justify-end p-4 shrink-0 w-full z-50">
                    <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/?lang=${l}`)} />
                </header>

                {/* 메인 콘텐츠 */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:px-8 lg:px-16 w-full">

                    {/* 
            모바일: 세로 스택
            데스크탑(lg+): 가로 2분할 (텍스트 왼쪽, 이미지 오른쪽)
          */}
                    <div className="w-full max-w-6xl mx-auto
                         flex flex-col lg:flex-row items-center justify-center lg:justify-between
                         gap-8 lg:gap-16">

                        {/* ===== 왼쪽: 텍스트 + CTA ===== */}
                        <div className="w-full lg:w-1/2 
                           flex flex-col items-center lg:items-start 
                           text-center lg:text-left
                           gap-4 shrink-0">

                            {/* 타이틀 */}
                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 
                           font-bold leading-tight tracking-tight mobile-slide-right mobile-gpu
                           ${isKorean ? 'font-korean' : 'font-serif'}`}
                            >
                                <span className="block text-white">{t.title1}</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-[length:200%_auto] gradient-text-animated">
                                    {t.title2}
                                </span>
                            </h1>

                            {/* 서브타이틀 */}
                            <p className={`text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed whitespace-pre-line mobile-slide-right mobile-gpu max-w-md
                           ${isKorean ? 'font-korean' : ''}`}
                                style={{ animationDelay: '0.1s' }}
                            >
                                {t.subtitle}
                            </p>

                            {/* CTA 버튼 - 데스크탑 */}
                            <div className="hidden lg:block w-full max-w-sm mt-8 mobile-fade-in-scale mobile-gpu">
                                <Link href={`/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                    {/* 강력한 백그라운드 글로우 */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>

                                    {/* 실제 버튼 */}
                                    <div className={`relative flex items-center justify-center gap-3
                                 py-5 px-10 rounded-full
                                 bg-black leading-none
                                 border border-white/20
                                 text-white text-xl font-bold
                                 shadow-[0_0_20px_rgba(168,85,247,0.3)]
                                 group-hover:text-white transition-all duration-200
                                 ${isKorean ? 'font-korean' : ''}`}>
                                        {t.button}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* ===== 오른쪽: 이미지 ===== */}
                        <div className="w-full max-w-[280px] sm:max-w-sm lg:w-1/2 lg:max-w-none flex items-center justify-center mt-4 lg:mt-0">
                            <div className="relative w-full aspect-[4/5] mobile-fade-in-scale mobile-gpu" style={{ animationDelay: '0.1s' }}>
                                {/* 글로우 */}
                                <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-purple-500/30 via-pink-500/25 to-indigo-500/30 
                               rounded-[2.5rem] blur-2xl opacity-60" />

                                {/* 이미지 카드 */}
                                <div className="relative w-full h-full overflow-hidden
                               rounded-[2rem] lg:rounded-[2.5rem]
                               border-2 border-white/20
                               shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
                                    <Image src="/images/hero.webp" alt="Aesthetic" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* 배지 */}
                                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2
                                 flex items-center justify-center gap-2 px-4 py-2 w-max max-w-[90%]
                                 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-lg z-10 whitespace-nowrap">
                                        <span className="relative flex h-2 w-2 shrink-0">
                                            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
                                            <span className="relative rounded-full h-full w-full bg-emerald-400"></span>
                                        </span>
                                        <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">{t.count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA 버튼 - 모바일 */}
                        <div className="lg:hidden w-full max-w-xs shrink-0 mt-6 mobile-fade-in-scale mobile-gpu" style={{ animationDelay: '0.2s' }}>
                            <Link href={`/test?lang=${lang}`} className="group relative block w-full touch-optimized">
                                {/* 강력한 백그라운드 글로우 */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt"></div>

                                {/* 실제 버튼 */}
                                <div className={`relative flex items-center justify-center gap-2
                                 py-4 px-8 rounded-full
                                 bg-black leading-none
                                 border border-white/20
                                 text-white text-lg font-bold
                                 shadow-[0_0_15px_rgba(236,72,153,0.3)]
                                 ${isKorean ? 'font-korean' : ''}`}>
                                    {t.button}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
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
