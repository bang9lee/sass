"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaceShapeResultCardClient } from "./FaceShapeResultCardClient";
import {
    FACE_SHAPE_ANALYSIS_VERSION,
    type FaceShapeAnalysisResult,
} from "@/lib/face-shape-analysis-official";
import { Menu, X } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LanguageSelector } from "@/components/language-selector";
import { getFooterLabels } from "@/lib/site-content";
import { Footer } from "./footer";
import { motion, AnimatePresence } from "framer-motion";

type Language = 'ko' | 'en' | 'zh' | 'ja';

function InnerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang") || "en";
    const lang: Language = (['ko', 'en', 'zh', 'ja'].includes(langParam) ? langParam : 'en') as Language;
    const isKorean = lang === 'ko';

    const [result, setResult] = useState<FaceShapeAnalysisResult | null>(null);
    const [ready, setReady] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = {
        ko: {
            menuAesthetic: "감성 테스트",
            menuPersonalColor: "퍼스널 컬러",
            menuFaceShape: "AI얼굴형분석",
            noResultTitle: "분석 결과를 찾을 수 없습니다.",
            noResultBody: "얼굴형 분석은 업로드 직후 세션에 저장됩니다. 다시 업로드해서 새로 분석해 주세요.",
            backToFaceShape: "AI 얼굴형 분석으로 돌아가기",
        },
        en: {
            menuAesthetic: "Aesthetic Test",
            menuPersonalColor: "Personal Color",
            menuFaceShape: "AI Face Shape Analysis",
            noResultTitle: "Analysis result not found.",
            noResultBody: "The face-shape result is stored in session right after upload. Please run a new analysis.",
            backToFaceShape: "Back to AI Face Shape Analysis",
        },
        zh: {
            menuAesthetic: "美学测试",
            menuPersonalColor: "个人色彩",
            menuFaceShape: "AI 脸型分析",
            noResultTitle: "找不到分析结果。",
            noResultBody: "脸型分析结果会在上传后立即保存到会话中。请重新上传照片并再次分析。",
            backToFaceShape: "返回 AI 脸型分析",
        },
        ja: {
            menuAesthetic: "感性テスト",
            menuPersonalColor: "パーソナルカラー",
            menuFaceShape: "AI 顔型分析",
            noResultTitle: "分析結果が見つかりません。",
            noResultBody: "顔型分析の結果はアップロード直後にセッションへ保存されます。もう一度写真をアップロードして解析してください。",
            backToFaceShape: "AI 顔型分析に戻る",
        }
    }[lang];
    const footer = getFooterLabels(lang);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("lastFaceShapeAnalysis");
            if (raw) {
                const parsed = JSON.parse(raw) as FaceShapeAnalysisResult;
                if (parsed.analysisVersion === FACE_SHAPE_ANALYSIS_VERSION) {
                    setResult(parsed);
                } else {
                    sessionStorage.removeItem("lastFaceShapeAnalysis");
                }
            }
        } catch (error) {
            console.error("Failed to restore face shape analysis", error);
        } finally {
            setReady(true);
        }
    }, []);

    if (!ready) {
        return <div className="h-screen bg-black" />;
    }

    if (!result) {
        return (
            <AuroraBackground className="justify-start">
                <div className="relative min-h-screen w-full overflow-hidden px-4 py-10 z-10 flex flex-col items-center justify-center">
                    <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-black/40 p-12 text-center text-white shadow-2xl backdrop-blur-2xl">
                        <h1 className="text-2xl font-bold tracking-tight">{t.noResultTitle ?? "Analysis result not found."}</h1>
                        <p className="mt-3 text-sm text-zinc-400">{t.noResultBody ?? "The face-shape result is stored in session right after upload. Please run a new analysis."}</p>
                        <Link
                            href={`/face-shape?lang=${lang}`}
                            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                        >
                            {t.backToFaceShape ?? "Back to AI Face Shape Analysis"}
                        </Link>
                    </div>
                </div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                {/* Navigation Bar */}
                <header className="flex items-center justify-between sm:grid sm:grid-cols-3 px-4 py-3 sm:px-6 sm:py-4 shrink-0 w-full z-50 absolute top-0 left-0 right-0 border-b border-white/5 bg-black/10 backdrop-blur-md">
                    <div className="flex items-center shrink-0 justify-start">
                        <Link href={`/?lang=${lang}`} className="text-white font-cinzel font-bold text-base sm:text-lg tracking-widest hover:text-white/80 transition-colors">
                            FINDCORE
                        </Link>
                    </div>

                    <div className="hidden sm:flex items-center justify-center">
                        <nav className="flex items-center gap-8">
                            <Link href={`/?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuAesthetic}
                            </Link>
                            <Link href={`/color?lang=${lang}`} className="text-[13px] font-medium text-white/60 hover:text-pink-300 transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuPersonalColor}
                            </Link>
                            <Link href={`/face-shape?lang=${lang}`} className="text-[13px] font-medium text-cyan-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap">
                                {t.menuFaceShape}
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-0 justify-end">
                        <LanguageSelector currentLang={lang} onSelect={(l) => router.push(`/face-shape/result?lang=${l}`)} />
                        <button className="sm:hidden p-2 text-white/80 hover:text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl sm:hidden flex flex-col">
                            <div className="flex justify-end px-4 py-3">
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/80 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                                <Link href={`/?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-white/70 hover:text-white tracking-widest uppercase">
                                    {t.menuAesthetic}
                                </Link>
                                <Link href={`/color?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-pink-300 hover:text-pink-200 tracking-widest uppercase">
                                    {t.menuPersonalColor}
                                </Link>
                                <Link href={`/face-shape?lang=${lang}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-cyan-300 hover:text-cyan-200 tracking-widest uppercase">
                                    {t.menuFaceShape}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 w-full flex items-start justify-center p-4 md:p-10 lg:p-14 pt-24 sm:pt-32 pb-16">
                    <FaceShapeResultCardClient result={result} lang={lang} isKo={isKorean} />
                </main>

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}

export default function FaceShapeResultContent() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <InnerContent />
        </Suspense>
    );
}
