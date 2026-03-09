"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaceShapeResultCardClient } from "./FaceShapeResultCardClient";
import { AuroraBackground } from "./ui/aurora-background";
import type { FaceShapeAnalysisResult } from "@/lib/face-shape-analysis";

function InnerContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "en";
    const [result, setResult] = useState<FaceShapeAnalysisResult | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("lastFaceShapeAnalysis");
            if (raw) {
                setResult(JSON.parse(raw) as FaceShapeAnalysisResult);
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
            <AuroraBackground>
                <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
                    <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-black/50 p-8 text-center text-white shadow-2xl backdrop-blur-xl">
                        <h1 className="text-2xl font-bold tracking-tight">{lang === "ko" ? "분석 결과를 찾을 수 없습니다." : "Analysis result not found."}</h1>
                        <p className="mt-3 text-sm text-white/60">
                            {lang === "ko"
                                ? "얼굴형 분석은 업로드 직후 세션에 저장됩니다. 다시 업로드해서 새로 분석해 주세요."
                                : "The face-shape result is stored in session right after upload. Please run a new analysis."}
                        </p>
                        <Link
                            href={`/face-shape?lang=${lang}`}
                            className="mt-6 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
                        >
                            {lang === "ko" ? "AI 얼굴형 분석으로 돌아가기" : "Back to AI Face Shape Analysis"}
                        </Link>
                    </div>
                </div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground>
            <div className="flex min-h-screen w-full items-start justify-center px-3 py-4 md:px-6 md:py-8">
                <FaceShapeResultCardClient result={result} lang={lang} isKo={lang === "ko"} />
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
