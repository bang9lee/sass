"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
            // Small delay for ripple effect or visual feedback if needed
            setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 blur-xl opacity-60 mb-8"
                    />
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4 animate-pulse whitespace-nowrap">
                        {loadingText.title}
                    </h2>
                    <p className="text-white/50 text-sm font-light break-keep">
                        {loadingText.sub}
                    </p>
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

    return (
        <AuroraBackground>
            <div className="flex flex-col h-dvh w-full relative z-10 overflow-hidden">
                {/* Progress Bar (Top Fixed) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    />
                </div>

                {/* Header Navigation */}
                <div className="flex items-center justify-between p-4 shrink-0">
                    <button
                        onClick={handleBack}
                        className="text-white/50 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xs font-mono text-white/30 tracking-widest">
                        {currentIndex + 1} / {QUESTIONS.length}
                    </span>
                </div>

                {/* Question Area - Maximize fit within viewport */}
                <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-4 min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full justify-center"
                        >
                            {/* Question Title - Compact on desktop */}
                            <div className="mb-4 md:mb-8 text-center md:text-left shrink-0">
                                <h2 className={`text-xl md:text-3xl lg:text-5xl font-bold leading-tight break-keep ${lang === 'ko' ? 'font-korean' : 'font-serif'}`}>
                                    {currentText}
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                                {shuffledOptions.map((option, idx) => (
                                    <motion.button
                                        key={option.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.05 * idx, duration: 0.3 }}
                                        onClick={() => handleAnswer(option.id)}
                                        className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/20 hover:border-pink-500/50 transition-all duration-300 focus:outline-none"
                                    >
                                        {/* Image Background */}
                                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                            {option.image ? (
                                                <Image
                                                    src={option.image}
                                                    alt={option.label}
                                                    fill
                                                    priority={true}
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
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

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
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
