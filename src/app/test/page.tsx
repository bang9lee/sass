"use client";

import { useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { QUESTIONS, calculateResult } from "@/lib/data";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { resolveSupportedLang } from "@/lib/site-content";

const createDeterministicShuffleSeed = (seed: string): number => {
    let hash = 2166136261;

    for (let i = 0; i < seed.length; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619) >>> 0;
    }

    return hash >>> 0;
};

const shuffleOptions = <T,>(options: T[], seed: string): T[] => {
    const indexed = options.map((option, index) => ({
        option,
        index,
        order: (createDeterministicShuffleSeed(`${seed}:${index}`) * 1664525 + 1013904223) >>> 0,
    }));

    return indexed
        .sort((left, right) => {
            if (left.order !== right.order) return left.order - right.order;
            return left.index - right.index;
        })
        .map(({ option }) => option);
};

function TestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = resolveSupportedLang(searchParams.get("lang") || "en");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];

    const shuffledOptions = useMemo(
        () => shuffleOptions(currentQuestion.options, `${currentQuestion.id}`),
        [currentQuestion.id, currentQuestion.options],
    );

    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    const handleAnswer = (optionId: string) => {
        const newAnswers = [...answers, optionId];
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
        } else {
            finishTest(newAnswers);
        }
    };

    const finishTest = async (finalAnswers: string[]) => {
        setIsSubmitting(true);
        const result = calculateResult(finalAnswers);

        if (typeof window !== "undefined") {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = result.image;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
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

    const loadingMessages = {
        en: { text: "Analyzing your unique aesthetic...", sub: "Reading your soul frequency" },
        ko: { text: "당신의 고유한 분위기를 분석 중...", sub: "영혼의 주파수를 읽는 중" },
        ja: { text: "あなただけの独自の雰囲気を分析中...", sub: "魂の周波数を読み取っています" },
        zh: { text: "正在分析您独特的氛围...", sub: "读取灵魂频率" },
    };

    const currentText = {
        ko: currentQuestion.text_ko,
        zh: currentQuestion.text_zh,
        ja: currentQuestion.text_ja,
        en: currentQuestion.text,
    }[lang] || currentQuestion.text;

    const nextQuestion = QUESTIONS[currentIndex + 1];
    const currentMsg = loadingMessages[lang];

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 flex min-h-dvh w-full flex-col overflow-hidden">
                <SiteHeader lang={lang} position="sticky" surfaceClassName="bg-black/20 backdrop-blur-xl" />

                <main className="flex flex-1 flex-col min-h-0">
                    {isSubmitting ? (
                        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                            <div className="relative mb-12 flex h-40 w-40 items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-white/10 blur-[50px] animate-pulse" />
                                <div className="absolute inset-0 rotate-45 border border-white/20 animate-spin-slow duration-[10s]" />
                                <div className="absolute inset-0 rotate-12 border border-white/20 opacity-50 animate-spin-slow duration-[15s]" />
                                <div className="absolute -inset-2.5 rounded-full border-b border-t border-pink-500/50 animate-spin duration-[3s]" />
                                <div className="absolute -inset-5 rounded-full border-l border-r border-purple-500/50 animate-spin duration-[4s] direction-reverse" />
                                <div className="relative h-16 w-16 rounded-full bg-linear-to-br from-white to-transparent opacity-90 blur-md animate-float-gentle" />
                                <div className="absolute h-32 w-2 bg-linear-to-b from-transparent via-white/50 to-transparent blur-sm animate-pulse" />
                                <div className="absolute h-2 w-32 bg-linear-to-r from-transparent via-white/50 to-transparent blur-sm animate-pulse delay-75" />
                            </div>

                            <div className="flex h-20 flex-col items-center justify-center gap-2">
                                <h2 className={`animate-in fade-in slide-in-from-bottom-2 bg-linear-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-xl font-bold text-transparent duration-300 md:text-2xl ${lang === "ko" ? "font-korean" : lang === "en" ? "font-cinzel tracking-widest" : "font-sans"}`}>
                                    {currentMsg.text}
                                </h2>
                                <p className="animate-pulse text-xs uppercase tracking-[0.3em] text-white/40">
                                    {currentMsg.sub}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
                            <div className="absolute left-0 right-0 top-0 h-1 bg-white/5">
                                <div
                                    className="h-full bg-linear-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] mobile-progress-fill mobile-gpu"
                                    style={{
                                        width: `${progress}%`,
                                        transition: "width 0.3s ease-out",
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 shrink-0">
                                <button
                                    onClick={handleBack}
                                    className="touch-optimized -ml-2 rounded-full p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <span className="text-xs font-mono tracking-widest text-white/30">
                                    {currentIndex + 1} / {QUESTIONS.length}
                                </span>
                            </div>

                            <div className="relative flex flex-1 flex-col justify-start overflow-y-auto no-scrollbar px-3 pb-10 pt-6 min-h-0 md:px-8 md:justify-center md:pt-0 md:pb-[15vh] mx-auto w-full max-w-400">
                                <div
                                    key={currentIndex}
                                    className="mobile-slide-right mobile-gpu flex w-full shrink-0 flex-col items-center space-y-6 md:items-start md:space-y-10"
                                >
                                    <div className="w-full shrink-0 px-2 text-center">
                                        <h2 className={`text-[1.1rem] md:text-3xl font-bold leading-snug tracking-tight break-keep whitespace-pre-line ${lang === "ko" ? "font-korean" : "font-serif"}`}>
                                            {currentText}
                                        </h2>
                                    </div>

                                    <div className="grid w-full flex-1 grid-cols-2 gap-2 md:flex-none md:gap-4 lg:grid-cols-4">
                                        {shuffledOptions.map((option, idx) => (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswer(option.id)}
                                                className="group mobile-hover touch-optimized mobile-gpu mobile-fade-in-scale relative aspect-3/4 w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 focus:outline-none md:aspect-4/5"
                                                style={{
                                                    animationDelay: `${idx * 0.03}s`,
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gray-900 mobile-gpu">
                                                    {option.image ? (
                                                        <Image
                                                            src={option.image}
                                                            alt={option.label}
                                                            fill
                                                            unoptimized
                                                            priority
                                                            className="object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                                                        />
                                                    ) : (
                                                        <div className={`w-full h-full bg-linear-to-br ${idx % 4 === 0 ? "from-pink-900/40 to-purple-900/40" :
                                                            idx % 4 === 1 ? "from-purple-900/40 to-indigo-900/40" :
                                                                idx % 4 === 2 ? "from-indigo-900/40 to-blue-900/40" :
                                                                    "from-blue-900/40 to-pink-900/40"
                                                            }`} />
                                                    )}
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent opacity-90" />
                                                </div>

                                                <div className="absolute bottom-0 inset-x-0 flex h-[35%] w-full flex-col items-start justify-start p-3 text-left z-10 md:h-[30%] md:p-5">
                                                    <p className={`text-[0.95rem] md:text-xl font-bold leading-tight text-white break-keep whitespace-pre-line drop-shadow-md shadow-black ${lang === "ko" ? "font-korean" : "font-serif"}`}>
                                                        {{
                                                            ko: option.label_ko,
                                                            zh: option.label_zh,
                                                            ja: option.label_ja,
                                                            en: option.label,
                                                        }[lang] || option.label}
                                                    </p>
                                                </div>

                                                <div className="pointer-events-none absolute inset-0 bg-pink-500/10 opacity-0 transition-opacity duration-100 mix-blend-overlay group-active:opacity-100" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {nextQuestion && (
                                <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                                    {nextQuestion.options.map((opt) => (
                                        opt.image && (
                                            <Image
                                                key={`preload-${opt.id}`}
                                                src={opt.image}
                                                alt="preload"
                                                width={10}
                                                height={10}
                                                unoptimized
                                                priority
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </main>

                <Footer lang={lang} />
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
