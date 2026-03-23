"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { FaceShapeResultCardClient } from "./FaceShapeResultCardClient";
import {
    FACE_SHAPE_ANALYSIS_VERSION,
    type FaceShapeAnalysisResult,
} from "@/lib/face-shape-analysis-official";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "./footer";
import type { SupportedLang } from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";
import { useSearchParams } from "next/navigation";

function InnerContent() {
    const { lang } = useLanguage();
    const searchParams = useSearchParams();
    const gender = (searchParams.get("gender") as "male" | "female") || "female";
    const [result, setResult] = useState<FaceShapeAnalysisResult | null>(null);
    const [ready, setReady] = useState(false);

    const copyByLang: Record<SupportedLang, { noResultTitle: string; noResultBody: string; backToFaceShape: string }> = {
        ko: {
            noResultTitle: "분석 결과를 찾을 수 없습니다.",
            noResultBody: "얼굴형 분석은 업로드 직후 세션에 저장됩니다. 다시 업로드해서 새로 분석해 주세요.",
            backToFaceShape: "AI 얼굴형 분석으로 돌아가기",
        },
        en: {
            noResultTitle: "Analysis result not found.",
            noResultBody: "The face-shape result is stored in session right after upload. Please run a new analysis.",
            backToFaceShape: "Back to AI Face Shape Analysis",
        },
        zh: {
            noResultTitle: "找不到分析结果。",
            noResultBody: "脸型分析结果会在上传后立即保存到会话中。请重新上传照片并再次分析。",
            backToFaceShape: "返回 AI 脸型分析",
        },
        ja: {
            noResultTitle: "分析結果が見つかりません。",
            noResultBody: "顔型分析の結果はアップロード直後にセッションへ保存されます。もう一度写真をアップロードして解析してください。",
            backToFaceShape: "AI 顔型分析に戻る",
        },
    };
    const t = copyByLang[lang];

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
                <div className="relative z-10 flex min-h-dvh w-full flex-col overflow-x-hidden">
                    <SiteHeader lang={lang} position="sticky" surfaceClassName="bg-black/20 backdrop-blur-xl" />

                    <main className="flex flex-1 items-center justify-center px-4 py-10">
                        <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-black/40 p-12 text-center text-white shadow-2xl backdrop-blur-2xl">
                            <h1 className="text-2xl font-bold tracking-tight">{t.noResultTitle}</h1>
                            <p className="mt-3 text-sm text-zinc-400">{t.noResultBody}</p>
                            <Link
                                href={`/face-shape?lang=${lang}`}
                                className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                            >
                                {t.backToFaceShape}
                            </Link>
                        </div>
                    </main>

                    <Footer lang={lang} />
                </div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground className="justify-start">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                <SiteHeader lang={lang} position="sticky" surfaceClassName="bg-black/20 backdrop-blur-xl" />

                <main className="flex-1 w-full flex items-start justify-center p-4 pt-6 pb-16 md:p-10 lg:p-14">
                    <FaceShapeResultCardClient result={result} lang={lang} gender={gender} />
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
