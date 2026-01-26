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

    const loadingText = {
        ko: { title: '당신의 무드를 분석하고 있어요...', sub: '잠시만 기다려주세요.' },
        en: { title: 'Analyzing your aesthetic source...', sub: 'Please wait a moment.' },
        zh: { title: '正在分析您的美学类型...', sub: '请稍候。' },
        ja: { title: 'あなたのムードを分析中...', sub: '少々お待ちください。' }
    }[lang];

    if (isSubmitting) {
        return (
            <AuroraBackground>
                <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10">
                    <div 
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 blur-xl opacity-60 mobile-gpu"
                        style={{
                            animation: 'pulse-slow 2s ease-in-out infinite'
                        }}
                    />
                    {/* Minimalist Loading - No Text, just vibes */}
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
        <AuroraBackground>
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
                <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-4 min-h-0 relative pt-[10vh] md:pt-[5vh]">
                    <div
                        key={currentIndex}
                        className="flex flex-col w-full mobile-slide-right mobile-gpu"
                    >
                        {/* Question Title - Compact on desktop */}
                        <div className="mb-4 md:mb-8 text-center md:text-left shrink-0">
                            <h2 className={`text-xl md:text-3xl lg:text-5xl font-bold leading-tight break-keep ${lang === 'ko' ? 'font-korean' : 'font-serif'}`}>
                                {currentText}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                            {shuffledOptions.map((option, idx) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    className={`group relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/20 mobile-hover touch-optimized mobile-gpu mobile-fade-in-scale focus:outline-none`}
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
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                                    </div>

                                    {/* Content - Positioned at bottom */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-left z-10">
                                        <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white leading-tight break-keep shadow-black drop-shadow-md ${lang === 'ko' ? 'font-korean' : 'font-sans'}`}>
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