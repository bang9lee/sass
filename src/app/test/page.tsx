"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { QUESTIONS, calculateResult } from "@/lib/data";
import { AuroraBackground } from "@/components/ui/aurora-background";

function TestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');
    const lang = (['ko', 'en', 'zh', 'ja'].includes(langParam || '') ? langParam : 'en') as 'ko' | 'en' | 'zh' | 'ja';

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];

    // Server-side / Hydration match: Use default order
    // Client-side mounted: Shuffle
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    const shuffledOptions = useMemo(() => {
        if (!isClient) return currentQuestion.options;
        return [...currentQuestion.options].sort(() => Math.random() - 0.5);
    }, [currentQuestion, isClient]);

    // Progress for visual bar
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    const handleAnswer = (optionId: string) => {
        const newAnswers = [...answers, optionId];
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            // Faster transition for mobile
            setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
        } else {
            finishTest(newAnswers);
        }
    };

    const finishTest = async (finalAnswers: string[]) => {
        setIsSubmitting(true);
        // Simulate deeper calculation delay for effect
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const result = calculateResult(finalAnswers);
        router.push(`/result/${result.id}?lang=${lang}`);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setAnswers(answers.slice(0, -1));
            setCurrentIndex(currentIndex - 1);
        } else {
            router.back();
        }
    };

    // Loading Text Cycle
    const loadingMessages = {
        en: { text: "Analyzing your unique aesthetic...", sub: "Reading your soul frequency" },
        ko: { text: "당신의 고유한 분위기를 분석 중...", sub: "영혼의 주파수를 읽는 중" },
        ja: { text: "あなただけの独自の雰囲気を分析中...", sub: "魂の周波数を読み取っています" },
        zh: { text: "正在分析您独特的氛围...", sub: "读取灵魂频率" },
    };

    if (isSubmitting) {
        const currentMsg = loadingMessages[lang];
        return (
            <AuroraBackground>
                <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full">
                    {/* Abstract Sacred Geometry Loader */}
                    <div className="relative w-40 h-40 flex items-center justify-center mb-12">
                        {/* Core Light */}
                        <div className="absolute inset-0 bg-white/10 blur-[50px] rounded-full animate-pulse" />

                        {/* 1. Outer Star Geometry (Spinning) */}
                        <div className="absolute inset-0 border border-white/20 rotate-45 animate-spin-slow duration-[10s]" />
                        <div className="absolute inset-0 border border-white/20 rotate-12 animate-spin-slow duration-[15s] opacity-50" />

                        {/* 2. Gyroscopic Rings */}
                        <div className="absolute inset-[-10px] rounded-full border-t border-b border-pink-500/50 animate-spin duration-[3s]" />
                        <div className="absolute inset-[-20px] rounded-full border-r border-l border-purple-500/50 animate-spin duration-[4s] direction-reverse" />

                        {/* 3. Central Core Prism */}
                        <div className="relative w-16 h-16 bg-gradient-to-br from-white to-transparent opacity-90 blur-md rounded-full animate-float-gentle" />
                        <div className="absolute w-2 h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent blur-sm animate-pulse" />
                        <div className="absolute w-32 h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm animate-pulse delay-75" />
                    </div>

                    {/* Multilingual Text Display */}
                    <div className="flex flex-col gap-2 h-20 items-center justify-center">
                        <h2 className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 animate-in fade-in slide-in-from-bottom-2 duration-300
                            ${lang === 'ko' ? 'font-korean' : lang === 'en' ? 'font-cinzel tracking-widest' : 'font-sans'}`}>
                            {currentMsg.text}
                        </h2>
                        <p className="text-white/40 text-xs uppercase tracking-[0.3em] animate-pulse">
                            {currentMsg.sub}
                        </p>
                    </div>
                </div>
            </AuroraBackground>
        );
    }

    const currentText = {
        ko: currentQuestion.text_ko,
        zh: currentQuestion.text_zh,
        ja: currentQuestion.text_ja,
        en: currentQuestion.text
    }[lang] || currentQuestion.text;

    const nextQuestion = QUESTIONS[currentIndex + 1];

    return (
        <AuroraBackground className="justify-start">
            <div className="flex flex-col h-dvh w-full relative z-10 overflow-hidden">
                {/* Progress Bar (Top Fixed) - Mobile Optimized */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] mobile-progress-fill mobile-gpu"
                        style={{
                            width: `${progress}%`,
                            transition: 'width 0.3s ease-out'
                        }}
                    />
                </div>

                {/* Header Navigation - Touch Optimized */}
                <div className="flex items-center justify-between p-4 shrink-0">
                    <button
                        onClick={handleBack}
                        className="text-white/50 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5 touch-optimized"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xs font-mono text-white/30 tracking-widest">
                        {currentIndex + 1} / {QUESTIONS.length}
                    </span>
                </div>

                {/* Question Area - Mobile Optimized */}
                {/* Mobile: Top-aligned with scroll (safe) | Desktop: High-Center fixed */}
                <div className="flex-1 max-w-[1600px] mx-auto w-full px-3 md:px-8 min-h-0 relative flex flex-col justify-start md:justify-center overflow-y-auto no-scrollbar pt-6 md:pt-0 pb-10 md:pb-[15vh]">
                    <div
                        key={currentIndex}
                        className="flex flex-col w-full mobile-slide-right mobile-gpu items-center md:items-start space-y-6 md:space-y-10 shrink-0"
                    >
                        {/* Question Title - Consistent Typography */}
                        <div className="w-full text-center shrink-0 px-2">
                            <h2 className={`text-[1.1rem] md:text-3xl font-bold leading-snug tracking-tight break-keep whitespace-pre-line ${lang === 'ko' ? 'font-korean' : 'font-serif'}`}>
                                {currentText}
                            </h2>
                        </div>

                        {/* Grid - maximized width for text */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 w-full flex-1 md:flex-none">
                            {shuffledOptions.map((option, idx) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    className={`group relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/20 mobile-hover touch-optimized mobile-gpu mobile-fade-in-scale focus:outline-none`}
                                    style={{
                                        animationDelay: `${idx * 0.03}s`
                                    }}
                                >
                                    {/* Image Background - Optimized */}
                                    <div className="absolute inset-0 bg-gray-900 mobile-gpu">
                                        {option.image ? (
                                            <Image
                                                src={option.image}
                                                alt={option.label}
                                                fill
                                                priority={idx < 4} // Prioritize visible images
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${idx % 4 === 0 ? 'from-pink-900/40 to-purple-900/40' :
                                                idx % 4 === 1 ? 'from-purple-900/40 to-indigo-900/40' :
                                                    idx % 4 === 2 ? 'from-indigo-900/40 to-blue-900/40' :
                                                        'from-blue-900/40 to-pink-900/40'
                                                }`} />
                                        )}
                                        {/* Gradient Overlay - Stronger at bottom for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90" />
                                    </div>

                                    {/* Content - Fixed height container for consistent text start position */}
                                    <div className="absolute bottom-0 inset-x-0 h-[35%] md:h-[30%] p-3 md:p-5 text-left z-10 w-full flex flex-col justify-start items-start">
                                        <p className={`text-[0.95rem] md:text-xl font-bold text-white leading-tight break-keep whitespace-pre-line shadow-black drop-shadow-md ${lang === 'ko' ? 'font-korean' : 'font-serif'}`}>
                                            {{
                                                ko: option.label_ko,
                                                zh: option.label_zh,
                                                ja: option.label_ja,
                                                en: option.label
                                            }[lang] || option.label}
                                        </p>
                                    </div>

                                    {/* Mobile Optimized Active Effect - Fast transition */}
                                    <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none mix-blend-overlay" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hidden Image Preloader for Next Question - Optimized */}
                {nextQuestion && (
                    <div className="hidden absolute w-0 h-0 overflow-hidden pointer-events-none">
                        {nextQuestion.options.map((opt) => (
                            opt.image && (
                                <Image
                                    key={`preload-${opt.id}`}
                                    src={opt.image}
                                    alt="preload"
                                    width={1}
                                    height={1}
                                    priority={true}
                                    loading="eager"
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </AuroraBackground>
    );
}

export default function TestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <TestContent />
        </Suspense>
    );
}