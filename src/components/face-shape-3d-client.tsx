"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, ChevronLeft, ChevronRight, Check, AlertCircle, RotateCcw } from "lucide-react";
import { type SupportedLang } from "@/lib/site-content";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

interface FaceShape3DClientProps {
    lang: SupportedLang;
}

type ScanStep = "init" | "loading-model" | "ready" | "scanning-front" | "scanning-left" | "scanning-right" | "calculating" | "result";

interface ScanCapture {
    front: string | null;
    left: string | null;
    right: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlazeFaceModel = any;

export function FaceShape3DClient({ lang }: FaceShape3DClientProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<BlazeFaceModel>(null);
    const requestRef = useRef<number | null>(null);
    const capturesRef = useRef<ScanCapture>({ front: null, left: null, right: null });
    
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<ScanStep>("init");
    const [progress, setProgress] = useState(0);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDemo, setIsDemo] = useState(false);
    const [yaw, setYaw] = useState(0);
    const [faceDetected, setFaceDetected] = useState(false);
    const [holdTimer, setHoldTimer] = useState(0); // frames held in correct position

    const t = {
        ko: {
            title: "3D 입체 얼굴형 분석",
            init: "카메라를 연결하는 중...",
            loadingModel: "AI 분석 모델을 준비하는 중...",
            ready: "얼굴을 원 안에 맞춘 후 시작하세요.",
            start: "스캔 시작",
            front: "정면을 바라봐 주세요 — 잠시 유지",
            left: "고개를 왼쪽으로 돌려주세요",
            right: "고개를 오른쪽으로 돌려주세요",
            calculating: "3D 좌표 기반 입체 분석 중...",
            success: "분석 완료!",
            cameraError: "카메라를 사용할 수 없습니다. 권한을 허용해 주세요.",
            modelError: "AI 모델 로딩 실패",
            insecureError: "보안 연결(HTTPS)이 필요합니다.",
            instruction: "안내에 따라 고개를 천천히 돌려주세요.",
            noFace: "얼굴이 감지되지 않습니다",
            retry: "다시 시작",
            viewResult: "결과 보기",
            demoMode: "데모 모드로 체험하기",
        },
        en: {
            title: "3D Face Shape Analysis",
            init: "Connecting to camera...",
            loadingModel: "Preparing AI model...",
            ready: "Center your face in the circle to start.",
            start: "Start Scan",
            front: "Look straight ahead — hold still",
            left: "Turn your head to the left",
            right: "Turn your head to the right",
            calculating: "Analyzing 3D spatial data...",
            success: "Analysis Complete!",
            cameraError: "Camera access denied. Please allow camera permission.",
            modelError: "AI model loading failed",
            insecureError: "HTTPS connection required.",
            instruction: "Follow the guide and slowly turn your head.",
            noFace: "No face detected",
            retry: "Try Again",
            viewResult: "View Result",
            demoMode: "Try Demo Mode",
        }
    }[lang === 'ko' ? 'ko' : 'en'];

    useEffect(() => {
        setMounted(true);
    }, []);

    // Load BlazeFace model
    useEffect(() => {
        if (!mounted || step !== "loading-model") return;

        const loadModel = async () => {
            try {
                await tf.setBackend("webgl");
                await tf.ready();
                
                // dynamically import blazeface
                const blazeface = await import("@tensorflow-models/blazeface");
                const model = await blazeface.load();
                modelRef.current = model;
                setStep("ready");
            } catch (err) {
                console.error("BlazeFace load error:", err);
                const msg = err instanceof Error ? err.message : String(err);
                setError(`${t.modelError}: ${msg.substring(0, 80)}`);
            }
        };

        loadModel();
    }, [step, mounted, t.modelError]);

    // Camera access
    const startCamera = useCallback(async () => {
        try {
            if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
                setError(t.insecureError);
                return;
            }
            if (!navigator?.mediaDevices?.getUserMedia) {
                throw new Error("Camera API not available");
            }
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStep("loading-model");
        } catch (err) {
            console.error("Camera error:", err);
            setError(t.cameraError);
        }
    }, [t.cameraError, t.insecureError]);

    // Capture frame from video
    const captureFrame = useCallback((): string | null => {
        if (!videoRef.current || !canvasRef.current) return null;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.85);
    }, []);

    // Calculate yaw from BlazeFace landmarks
    // BlazeFace landmarks: [rightEye, leftEye, nose, mouth, rightEar, leftEar]
    const calculateYaw = useCallback((landmarks: [number, number][]): number => {
        if (landmarks.length < 6) return 0;
        
        const nose = landmarks[2];
        const rightEar = landmarks[4];
        const leftEar = landmarks[5];
        
        const distToRight = Math.abs(nose[0] - rightEar[0]);
        const distToLeft = Math.abs(nose[0] - leftEar[0]);
        const total = distToRight + distToLeft;
        
        if (total < 1) return 0;
        return (distToLeft - distToRight) / total; // negative = looking left, positive = looking right
    }, []);

    // Detection loop
    const detect = useCallback(async () => {
        if (!videoRef.current || !modelRef.current || videoRef.current.readyState < 2) {
            requestRef.current = requestAnimationFrame(detect);
            return;
        }

        if (step === "init" || step === "loading-model" || step === "result" || step === "calculating") {
            requestRef.current = requestAnimationFrame(detect);
            return;
        }

        try {
            const predictions = await modelRef.current.estimateFaces(videoRef.current, false);
            
            if (predictions.length > 0) {
                setFaceDetected(true);
                const pred = predictions[0];
                const currentYaw = calculateYaw(pred.landmarks);
                setYaw(currentYaw);

                if (step === "scanning-front") {
                    if (Math.abs(currentYaw) < 0.15) {
                        setHoldTimer(prev => {
                            const next = prev + 1;
                            if (next >= 30) { // ~1 second at 30fps
                                capturesRef.current.front = captureFrame();
                                setProgress(33);
                                setStep("scanning-left");
                                return 0;
                            }
                            setProgress(Math.min((next / 30) * 33, 33));
                            return next;
                        });
                    } else {
                        setHoldTimer(0);
                    }
                } else if (step === "scanning-left") {
                    if (currentYaw < -0.25) {
                        setHoldTimer(prev => {
                            const next = prev + 1;
                            if (next >= 25) {
                                capturesRef.current.left = captureFrame();
                                setProgress(66);
                                setStep("scanning-right");
                                return 0;
                            }
                            setProgress(33 + Math.min((next / 25) * 33, 33));
                            return next;
                        });
                    } else {
                        setHoldTimer(0);
                    }
                } else if (step === "scanning-right") {
                    if (currentYaw > 0.25) {
                        setHoldTimer(prev => {
                            const next = prev + 1;
                            if (next >= 25) {
                                capturesRef.current.right = captureFrame();
                                setProgress(100);
                                setStep("calculating");
                                return 0;
                            }
                            setProgress(66 + Math.min((next / 25) * 33, 33));
                            return next;
                        });
                    } else {
                        setHoldTimer(0);
                    }
                }
            } else {
                setFaceDetected(false);
            }
        } catch {
            // Silently ignore detection errors during scan
        }

        requestRef.current = requestAnimationFrame(detect);
    }, [step, calculateYaw, captureFrame]);

    // Start/stop detection loop
    useEffect(() => {
        if (stream && !isDemo && mounted) {
            requestRef.current = requestAnimationFrame(detect);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [stream, step, isDemo, mounted, detect]);

    // Initialize camera on mount
    useEffect(() => {
        if (mounted) startCamera();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [mounted]);

    // Handle calculating -> result transition
    useEffect(() => {
        if (step === "calculating") {
            const timer = setTimeout(() => {
                // Save captures to sessionStorage for the result page
                try {
                    sessionStorage.setItem("face3d_captures", JSON.stringify(capturesRef.current));
                } catch { /* quota exceeded, etc. */ }
                setStep("result");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const startScan = () => {
        if (isDemo) {
            runSimulation();
        } else {
            capturesRef.current = { front: null, left: null, right: null };
            setProgress(0);
            setHoldTimer(0);
            setStep("scanning-front");
        }
    };

    const runSimulation = async () => {
        setStep("scanning-front");
        setProgress(0);
        await simulateProgress(33, 2000);
        setStep("scanning-left");
        await simulateProgress(66, 3000);
        setStep("scanning-right");
        await simulateProgress(100, 3000);
        setStep("calculating");
    };

    const simulateProgress = (target: number, duration: number) => {
        return new Promise<void>((resolve) => {
            const startVal = progress;
            const diff = target - startVal;
            const startTime = performance.now();
            const update = (now: number) => {
                const elapsed = now - startTime;
                const p = Math.min(elapsed / duration, 1);
                setProgress(startVal + diff * p);
                if (p < 1) requestAnimationFrame(update);
                else resolve();
            };
            requestAnimationFrame(update);
        });
    };

    if (!mounted) {
        return <div className="min-h-[80vh] flex items-center justify-center bg-zinc-950">
            <RefreshCw className="w-8 h-8 text-cyan-500 animate-spin" />
        </div>;
    }

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Hidden canvas for captures */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-cinzel"
                    >
                        {t.title}
                    </motion.h2>
                    <p className="text-cyan-400/60 text-sm uppercase tracking-[0.2em] font-medium">Experimental Beta</p>
                </div>

                {/* Camera Container */}
                <div className="relative w-full aspect-square max-w-[400px]">
                    <div className="absolute inset-0 rounded-full border border-white/10 p-3">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
                            {/* Video */}
                            {stream ? (
                                <video 
                                    ref={videoRef} autoPlay playsInline muted 
                                    className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${step === 'init' ? 'opacity-0' : 'opacity-100'}`}
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-b from-zinc-900 to-black flex items-center justify-center">
                                    <Camera className="w-12 h-12 text-cyan-500/20" />
                                </div>
                            )}

                            {/* Loading Model */}
                            {step === 'loading-model' && (
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
                                    <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
                                    <p className="text-white/90 text-sm font-medium animate-pulse">{t.loadingModel}</p>
                                </div>
                            )}

                            {/* Scanner HUD */}
                            <AnimatePresence>
                                {(step.startsWith('scanning') || step === 'ready') && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full border-dashed animate-spin-slow" />
                                        <div className="absolute inset-[10%] border border-white/5 rounded-full" />

                                        {/* Real-time Yaw Bar (only during scanning) */}
                                        {!isDemo && step.startsWith('scanning') && (
                                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ left: `${50 + yaw * 50}%` }}
                                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                                    className="absolute top-0 w-3 h-full -ml-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                                                />
                                            </div>
                                        )}

                                        {/* Face not detected warning */}
                                        {!isDemo && step.startsWith('scanning') && !faceDetected && (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                                <p className="text-red-400 text-xs font-medium">{t.noFace}</p>
                                            </div>
                                        )}

                                        {/* Step dots */}
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
                                            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'scanning-front' ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#22d3ee]' : progress >= 33 ? 'bg-cyan-400/50' : 'bg-white/20'}`} />
                                            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'scanning-left' ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#22d3ee]' : progress >= 66 ? 'bg-cyan-400/50' : 'bg-white/20'}`} />
                                            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === 'scanning-right' ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#22d3ee]' : progress >= 100 ? 'bg-cyan-400/50' : 'bg-white/20'}`} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Scanning line */}
                            <AnimatePresence>
                                {step.startsWith('scanning') && (
                                    <motion.div 
                                        initial={{ top: "-10%" }} animate={{ top: "110%" }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-px bg-cyan-400/80 shadow-[0_0_15px_#22d3ee] z-20"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Calculating */}
                            <AnimatePresence>
                                {step === 'calculating' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
                                    >
                                        <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
                                        <p className="text-white font-medium animate-pulse text-sm">{t.calculating}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Success */}
                            <AnimatePresence>
                                {step === 'result' && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-500/20 backdrop-blur-xl"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                            <Check className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-white text-lg font-bold">{t.success}</p>
                                        <div className="flex flex-col gap-3 mt-6">
                                            <a 
                                                href={`/face-shape-3d/result?lang=${lang}`}
                                                className="px-8 py-3 bg-white text-black font-bold rounded-full text-sm hover:scale-105 active:scale-95 transition-all shadow-lg text-center"
                                            >
                                                {t.viewResult}
                                            </a>
                                            <button onClick={() => { setStep("ready"); setProgress(0); }}
                                                className="text-white/50 text-xs underline underline-offset-4 flex items-center gap-1 justify-center"
                                            >
                                                <RotateCcw className="w-3 h-3" /> {t.retry}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error */}
                            {error && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 p-6 text-center z-50">
                                    <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                                    <p className="text-white/80 mb-5 text-sm leading-relaxed">{error}</p>
                                    <button 
                                        onClick={() => { setError(null); setIsDemo(true); setStep("ready"); }}
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all text-sm font-medium"
                                    >
                                        {t.demoMode}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instruction Box */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[300px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-center shadow-2xl z-50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                className="flex items-center justify-center gap-2"
                            >
                                {step === 'scanning-left' && <ChevronLeft className="w-4 h-4 text-cyan-400 animate-bounce-x" />}
                                {step === 'scanning-right' && <ChevronRight className="w-4 h-4 text-cyan-400 animate-bounce-x" />}
                                <p className="text-xs font-medium text-white/90">
                                    {step === 'init' && t.init}
                                    {step === 'loading-model' && t.loadingModel}
                                    {step === 'ready' && t.ready}
                                    {step === 'scanning-front' && t.front}
                                    {step === 'scanning-left' && t.left}
                                    {step === 'scanning-right' && t.right}
                                    {step === 'calculating' && t.calculating}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress Bar */}
                {step.startsWith('scanning') && (
                    <div className="w-full max-w-sm h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                        <motion.div animate={{ width: `${progress}%` }}
                            className="h-full bg-linear-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_#22d3ee]"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col items-center gap-3 w-full">
                    {step === 'ready' && (
                        <button onClick={startScan}
                            className="group relative px-12 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        >
                            <span className="relative z-10">{t.start}</span>
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    )}
                    <p className="text-white/30 text-xs max-w-[280px] text-center leading-relaxed font-light">
                        {t.instruction}
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(-5px); }
                }
                .animate-bounce-x { animation: bounce-x 1s infinite; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
            `}</style>
        </div>
    );
}
