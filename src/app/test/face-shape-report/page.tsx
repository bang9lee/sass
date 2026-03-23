"use client";

import { useEffect, useState } from "react";
import { FaceShapeResultCardClient } from "@/components/FaceShapeResultCardClient";
import {
    analyzeFaceShapeAI,
    preloadFaceShapeModel,
    type FaceShapeAnalysisResult,
} from "@/lib/face-shape-analysis-official";

type State =
    | { status: "loading"; stage: string }
    | { status: "error"; message: string }
    | { status: "done"; result: FaceShapeAnalysisResult };

export default function FaceShapeReportPreviewPage() {
    const [state, setState] = useState<State>({ status: "loading", stage: "boot" });

    useEffect(() => {
        let cancelled = false;
        const imageUrl = `/api/debug-image?name=4.jpg&t=${Date.now()}`;
        const image = new window.Image();
        image.crossOrigin = "anonymous";

        image.onload = async () => {
            try {
                setState({ status: "loading", stage: "preload" });
                await preloadFaceShapeModel();
                if (cancelled) return;

                setState({ status: "loading", stage: "analyze" });
                const result = await analyzeFaceShapeAI(image, "balanced", imageUrl);
                if (cancelled) return;

                setState({ status: "done", result });
            } catch (error) {
                if (cancelled) return;
                setState({
                    status: "error",
                    message: error instanceof Error ? error.message : "Unknown preview failure",
                });
            }
        };

        image.onerror = () => {
            if (cancelled) return;
            setState({ status: "error", message: "Failed to load preview image." });
        };

        image.src = imageUrl;

        return () => {
            cancelled = true;
        };
    }, []);

    if (state.status === "loading") {
        return (
            <div className="min-h-screen bg-[#efe7db] text-zinc-900 flex items-center justify-center">
                <div className="rounded-[28px] border border-black/8 bg-white/75 px-8 py-6 shadow-xl backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Face Report Preview</p>
                    <p className="mt-3 text-lg font-semibold">Loading: {state.stage}</p>
                </div>
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="min-h-screen bg-[#efe7db] text-zinc-900 flex items-center justify-center">
                <div className="rounded-[28px] border border-rose-200 bg-white/80 px-8 py-6 shadow-xl backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Face Report Preview</p>
                    <p className="mt-3 text-lg font-semibold">{state.message}</p>
                </div>
            </div>
        );
    }

    return <FaceShapeResultCardClient result={state.result} lang="ko" />;
}
