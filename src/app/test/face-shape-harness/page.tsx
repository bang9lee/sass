"use client";

import { useEffect, useMemo, useState } from "react";
import {
    analyzeFaceShapeAI,
    detectLandmarks,
    preloadFaceShapeModel,
} from "@/lib/face-shape-analysis-official";

type HarnessState =
    | { status: "loading"; stage?: string }
    | { status: "error"; message: string }
    | {
        status: "done";
        payload: {
            image: string;
            faceShape: string;
            secondaryShape: string;
            confidence: number;
            quality: Record<string, number | string[]>;
            hairlineReliability: number | null;
            hairlineMethod: string | null;
            metrics: Record<string, number>;
            contour: Array<{ x: number; y: number }>;
            hairlineContour: Array<{ x: number; y: number }>;
            contourMinY: number;
            contourMaxY: number;
            topPoint: { x: number; y: number };
            chinPoint: { x: number; y: number };
            foreheadWidth: [number, number];
            cheekboneWidth: [number, number];
            jawWidth: [number, number];
        };
    };

function round(value: number) {
    return Number(value.toFixed(4));
}

function toPath(points: Array<{ x: number; y: number }>, close = false) {
    if (!points.length) return "";
    return points
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x * 100} ${point.y * 100}`)
        .join(" ")
        .concat(close ? " Z" : "");
}

export default function FaceShapeHarnessPage() {
    const [state, setState] = useState<HarnessState>({ status: "loading", stage: "boot" });

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

                setState({ status: "loading", stage: "landmarks" });
                const landmarks = await detectLandmarks(image);
                if (cancelled) return;

                setState({ status: "loading", stage: `analyze:${landmarks.length}` });
                const result = await Promise.race([
                    analyzeFaceShapeAI(image, "balanced", imageUrl),
                    new Promise<never>((_, reject) => {
                        window.setTimeout(() => reject(new Error("Harness timeout after 60s")), 60000);
                    }),
                ]);
                if (cancelled) return;

                const contourY = result.overlay.contour.map((point) => point.y);
                document.title = "done";
                setState({
                    status: "done",
                    payload: {
                        image: imageUrl,
                        faceShape: result.faceShape,
                        secondaryShape: result.secondaryShape,
                        confidence: result.confidence,
                        quality: {
                            classification: result.quality.classification,
                            measurement: result.quality.measurement,
                            image: result.quality.image,
                            frame: result.quality.frame,
                            margin: result.quality.margin,
                            pose: result.quality.pose,
                            sharpness: result.quality.sharpness,
                            lighting: result.quality.lighting,
                            coverage: result.quality.coverage,
                            flags: result.quality.flags,
                        },
                        hairlineReliability: result.overlay.hairlineReliability ?? null,
                        hairlineMethod: result.overlay.hairlineMethod ?? null,
                        metrics: Object.fromEntries(
                            Object.entries(result.metrics).map(([key, value]) => [key, round(value)])
                        ),
                        contour: result.overlay.contour.map((point) => ({ x: round(point.x), y: round(point.y) })),
                        hairlineContour: (result.overlay.hairlineContour ?? []).map((point) => ({ x: round(point.x), y: round(point.y) })),
                        contourMinY: round(Math.min(...contourY)),
                        contourMaxY: round(Math.max(...contourY)),
                        topPoint: {
                            x: round(result.overlay.faceHeight[0].x),
                            y: round(result.overlay.faceHeight[0].y),
                        },
                        chinPoint: {
                            x: round(result.overlay.faceHeight[1].x),
                            y: round(result.overlay.faceHeight[1].y),
                        },
                        foreheadWidth: [
                            round(result.overlay.foreheadWidth[0].x),
                            round(result.overlay.foreheadWidth[1].x),
                        ],
                        cheekboneWidth: [
                            round(result.overlay.cheekboneWidth[0].x),
                            round(result.overlay.cheekboneWidth[1].x),
                        ],
                        jawWidth: [
                            round(result.overlay.jawWidth[0].x),
                            round(result.overlay.jawWidth[1].x),
                        ],
                    },
                });
            } catch (error) {
                if (cancelled) return;
                document.title = "error";
                setState({
                    status: "error",
                    message: error instanceof Error ? error.message : "Unknown analysis failure",
                });
            }
        };

        image.onerror = () => {
            if (cancelled) return;
            document.title = "error";
            setState({ status: "error", message: "Failed to load harness image." });
        };

        image.src = imageUrl;

        return () => {
            cancelled = true;
        };
    }, []);

    const body = useMemo(() => JSON.stringify(state, null, 2), [state]);

    return (
        <main style={{ background: "#111", color: "#f5f5f5", minHeight: "100vh", padding: "24px", fontFamily: "monospace" }}>
            <h1>face-shape-harness</h1>
            {state.status === "done" && (
                <div style={{ width: "min(80vw, 520px)", marginBottom: "24px" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: "24px", background: "#000" }}>
                        <img
                            src={state.payload.image}
                            alt="debug"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                            <path d={toPath(state.payload.contour, true)} fill="rgba(255,255,255,0.04)" stroke="#00e5ff" strokeWidth="0.35" strokeDasharray="1.1 1.3" />
                            <path d={toPath(state.payload.hairlineContour)} fill="none" stroke="#ffcc00" strokeWidth="0.5" />
                        </svg>
                    </div>
                </div>
            )}
            <pre id="result" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {body}
            </pre>
        </main>
    );
}
