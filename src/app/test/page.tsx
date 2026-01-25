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
    const lang = searchParams.get('lang') === 'ko' ? 'ko' : 'en';

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
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4 animate-pulse">
                        {lang === 'ko' ? '당신의 무드를 분석하고 있어요...' : 'Analyzing your aesthetic source...'}
                    </h2>
                    <p className="text-white/50 text-sm font-light">
                        {lang === 'ko' ? '잠시만 기다려주세요.' : 'Please wait a moment.'}
                    </p>
                </div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground>
            <div className="flex flex-col min-h-screen w-full relative z-10">
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
                <div className="flex items-center justify-between p-6">
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
                <div className="flex-1 flex flex-col justify-center max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-6 overflow-hidden min-h-0">
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
                            <div className="mb-6 md:mb-8 text-center md:text-left shrink-0">
                                <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold leading-tight break-keep ${lang === 'ko' ? 'font-korean' : 'font-serif'}`}>
                                    {lang === 'ko' ? currentQuestion.text_ko : currentQuestion.text}
                                </h2>
                            </div>

                            {/* Options Grid - 4 Columns on Desktop to fit height, 2 on mobile */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full max-h-[65vh]">
                                {shuffledOptions.map((option, idx) => (
                                    <motion.button
                                        key={option.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.05 * idx, duration: 0.3 }}
                                        onClick={() => handleAnswer(option.id)}
                                        className="group relative w-full h-full aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black/20 hover:border-pink-500/50 transition-all duration-300 focus:outline-none flex flex-col"
                                    >
                                        {/* Image Background - Absolute Cover - 3:4 Ratio enforced via container or object-cover */}
                                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                            {option.image ? (
                                                <Image
                                                    src={option.image}
                                                    alt={option.label}
                                                    fill
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
                                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-left">
                                            <p className={`text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight break-keep shadow-black drop-shadow-md ${lang === 'ko' ? 'font-korean' : 'font-sans'}`}>
                                                {lang === 'ko' ? option.label_ko : option.label}
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
