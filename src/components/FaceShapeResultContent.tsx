"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaceShapeResultCardClient } from "./FaceShapeResultCardClient";
import type { FaceShapeAnalysisResult } from "@/lib/face-shape-analysis-official";

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
        return <div className="h-screen bg-[#efe7db]" />;
    }

    if (!result) {
        return (
            <div className="relative min-h-screen w-full overflow-hidden bg-[#efe7db] px-4 py-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,122,82,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(45,64,80,0.14),transparent_30%),linear-gradient(180deg,#f4ecdf_0%,#e7dccd_100%)]" />
                <div className="relative mx-auto flex min-h-[80vh] items-center justify-center">
                <div className="w-full max-w-xl rounded-[32px] border border-black/8 bg-white/78 p-12 text-center text-zinc-900 shadow-[0_30px_80px_rgba(41,28,17,0.12)] backdrop-blur-2xl">
                    <h1 className="text-2xl font-bold tracking-tight">{lang === "ko" ? "분석 결과를 찾을 수 없습니다." : "Analysis result not found."}</h1>
                    <p className="mt-3 text-sm text-zinc-500">
                        {lang === "ko"
                            ? "얼굴형 분석은 업로드 직후 세션에 저장됩니다. 다시 업로드해서 새로 분석해 주세요."
                            : "The face-shape result is stored in session right after upload. Please run a new analysis."}
                    </p>
                    <Link
                        href={`/face-shape?lang=${lang}`}
                        className="mt-8 inline-flex rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                    >
                        {lang === "ko" ? "AI 얼굴형 분석으로 돌아가기" : "Back to AI Face Shape Analysis"}
                    </Link>
                </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#efe7db] text-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(187,122,82,0.18),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.75),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(45,64,80,0.14),transparent_30%),linear-gradient(180deg,#f4ecdf_0%,#e7dccd_100%)]" />
            <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-white/45 blur-3xl" />
            <div className="absolute right-[-80px] top-1/3 h-96 w-96 rounded-full bg-[#c89372]/20 blur-3xl" />
            <div className="relative flex items-start justify-center p-4 md:p-10 lg:p-14">
                <FaceShapeResultCardClient result={result} lang={lang} isKo={lang === "ko"} />
            </div>
        </div>
    );
}

export default function FaceShapeResultContent() {
    return (
        <Suspense fallback={<div className="h-screen bg-black" />}>
            <InnerContent />
        </Suspense>
    );
}
