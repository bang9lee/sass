"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { type SupportedLang } from "@/lib/site-content";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

interface FaceShape3DClientProps {
    lang: SupportedLang;
}

type ScanStep = "init" | "loading-model" | "ready" | "scanning-front" | "scanning-left" | "scanning-right" | "calculating" | "result";

export function FaceShape3DClient({ lang }: FaceShape3DClientProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const landmarkerRef = useRef<FaceLandmarker | null>(null);
    const requestRef = useRef<number>(null);
    
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<ScanStep>("init");
    const [progress, setProgress] = useState(0);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDemo, setIsDemo] = useState(false);
    const [yaw, setYaw] = useState(0); // -1 to 1 (left to right)

    const t = {
        ko: {
            title: "3D 입체 얼굴형 분석",
            init: "카메라를 연결하는 중...",
            loadingModel: "AI 분석 모델을 불러오고 있습니다...",
            ready: "얼굴을 원 안에 맞춘 후 시작하세요.",
            start: "스캔 시작",
            front: "정면을 응시해 주세요.",
            left: "얼굴을 왼쪽으로 충분히 돌려주세요.",
            right: "얼굴을 오른쪽으로 충분히 돌려주세요.",
            calculating: "3D 좌표 기반 입체 분석 중...",
            success: "분석 완료",
            cameraError: "카메라를 사용할 수 없습니다. 권한 설정을 확인해 주세요.",
            modelError: "분석 모델(AI) 로딩 중 오류가 발생했습니다. 새로고침 후 다시 시도해 주세요.",
            insecureError: "보안 연결(HTTPS)이 필요합니다. 모바일 기기에서는 주소창에 'https://'가 포함되어야 카메라 권한을 얻을 수 있습니다.",
            instruction: "정면박스에 얼굴을 맞추고 안내에 따라 고개를 돌려주세요."
        },
        en: {
            title: "3D Face Shape Analysis",
            init: "Connecting to camera...",
            loadingModel: "Loading AI model...",
            ready: "Center your face in the circle to start.",
            start: "Start Scan",
            front: "Please look straight ahead.",
            left: "Turn your head fully to the left.",
            right: "Turn your head fully to the right.",
            calculating: "Analyzing 3D spatial data...",
            success: "Analysis Complete",
            cameraError: "Camera access denied. Please check permissions.",
            modelError: "AI model loading failed. Please refresh and try again.",
            insecureError: "HTTPS is required for camera access on mobile devices.",
            instruction: "Align your face and follow the instructions to turn your head."
        }
    }[lang === 'ko' ? 'ko' : 'en'];

    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize MediaPipe
    useEffect(() => {
        if (!mounted) return;

        const initMediaPipe = async (delegate: "GPU" | "CPU" = "GPU") => {
            try {
                const filesetResolver = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
                );
                const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: delegate
                    },
                    runningMode: "VIDEO",
                    numFaces: 1
                });
                landmarkerRef.current = landmarker;
                setStep("ready");
            } catch (err) {
                console.error(`MediaPipe ${delegate} initialization error:`, err);
                if (delegate === "GPU") {
                    console.log("Retrying with CPU delegate...");
                    initMediaPipe("CPU");
                } else {
                    setError(t.modelError);
                }
            }
        };

        if (step === "loading-model") {
            initMediaPipe();
        }
    }, [step, mounted, t.modelError]);

    // Camera Access
    const startCamera = async () => {
        try {
            // Check for Secure Context
            if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
                setError(t.insecureError);
                return;
            }

            if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("MediaDevices API not available");
            }
            
            // Simplified constraints for mobile devices
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: "user",
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                } 
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
    };

    const detect = async () => {
        if (!videoRef.current || !landmarkerRef.current || step === "init" || step === "loading-model" || step === "result") {
            requestRef.current = requestAnimationFrame(detect);
            return;
        }

        if (videoRef.current.readyState >= 2) {
            const results = landmarkerRef.current.detectForVideo(videoRef.current, performance.now());
            
            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                const landmarks = results.faceLandmarks[0];
                const nose = landmarks[1];
                const rightSide = landmarks[234];
                const leftSide = landmarks[454];
                
                const distRight = Math.abs(nose.x - rightSide.x);
                const distLeft = Math.abs(nose.x - leftSide.x);
                
                const currentYaw = (distLeft - distRight) / (distLeft + distRight);
                setYaw(currentYaw);

                if (step === "scanning-front") {
                    if (Math.abs(currentYaw) < 0.1) {
                        setProgress((prev: number) => Math.min(prev + 1, 33));
                        if (progress >= 32) setStep("scanning-left");
                    }
                } else if (step === "scanning-left") {
                    if (currentYaw < -0.2) {
                        setProgress((prev: number) => Math.min(prev + 0.5, 66));
                        if (progress >= 65) setStep("scanning-right");
                    }
                } else if (step === "scanning-right") {
                    if (currentYaw > 0.2) {
                        setProgress((prev: number) => Math.min(prev + 0.5, 99));
                        if (progress >= 98) {
                            setStep("calculating");
                            setTimeout(() => setStep("result"), 2500);
                        }
                    }
                }
            }
        }
        
        requestRef.current = requestAnimationFrame(detect);
    };

    useEffect(() => {
        if (stream && !isDemo) {
            requestRef.current = requestAnimationFrame(detect);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [stream, step, progress, isDemo]);

    useEffect(() => {
        if (mounted) {
            startCamera();
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [mounted]);

    const startScan = async () => {
        if (isDemo) {
            runSimulation();
        } else {
            setStep("scanning-front");
            setProgress(0);
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
        setTimeout(() => setStep("result"), 2500);
    };

    const simulateProgress = (target: number, duration: number) => {
        return new Promise<void>((resolve) => {
            const start = progress;
            const diff = target - start;
            const startTime = performance.now();

            const update = (now: number) => {
                const elapsed = now - startTime;
                const p = Math.min(elapsed / duration, 1);
                setProgress(start + diff * p);
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
            {/* Background Atmosphere */}
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
                <div className="relative w-full aspect-square max-w-[450px]">
                    <div className="absolute inset-0 rounded-full border border-white/10 p-4">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
                            {/* Video Feed / Placeholder */}
                            {stream ? (
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    muted 
                                    className={`w-full h-full object-cover transition-opacity duration-700 ${step === 'init' ? 'opacity-0' : 'opacity-100'}`}
                                />
                            ) : (
                                <div className={`w-full h-full bg-linear-to-b from-zinc-900 to-black flex items-center justify-center transition-opacity duration-700 ${step === 'init' ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="relative w-48 h-48 rounded-full border border-cyan-500/10 flex items-center justify-center">
                                        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-pulse" />
                                        <Camera className="w-12 h-12 text-cyan-500/20" />
                                    </div>
                                </div>
                            )}
                            
                            {/* Loading Model Overlay */}
                            {step === 'loading-model' && (
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                                    <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                                    <p className="text-white font-medium animate-pulse">{t.loadingModel}</p>
                                </div>
                            )}

                            {/* HUD Indicators */}
                            <AnimatePresence>
                                {(step.startsWith('scanning') || step === 'ready') && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full border-dashed animate-spin-slow" />
                                        <div className="absolute inset-[10%] border border-white/5 rounded-full" />
                                        
                                        {/* Real-time Yaw Indicator */}
                                        {!isDemo && (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                                <motion.div 
                                                    animate={{ x: yaw * 100 }}
                                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-cyan-400/30 shadow-[0_0_10px_#22d3ee]"
                                                />
                                            </div>
                                        )}

                                        {/* Step Progress Dots */}
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'scanning-left' ? 'bg-cyan-400 scale-150 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`} />
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'scanning-front' ? 'bg-cyan-400 scale-150 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`} />
                                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'scanning-right' ? 'bg-cyan-400 scale-150 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Scanning Line Overlay */}
                            <AnimatePresence>
                                {step.startsWith('scanning') && (
                                    <motion.div 
                                        initial={{ top: "-10%" }}
                                        animate={{ top: "110%" }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-px bg-cyan-400/80 shadow-[0_0_15px_#22d3ee] z-20"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Calculating Overlay */}
                            <AnimatePresence>
                                {step === 'calculating' && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
                                    >
                                        <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                                        <p className="text-white font-medium animate-pulse">{t.calculating}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Success Overlay */}
                            <AnimatePresence>
                                {step === 'result' && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-cyan-500/20 backdrop-blur-xl"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center mb-4 shadow-[0_0_30px_#22d3ee]">
                                            <Check className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="text-white text-xl font-bold">{t.success}</p>
                                        <button 
                                            onClick={() => setStep("ready")}
                                            className="mt-6 text-sm text-cyan-200 underline underline-offset-4"
                                        >
                                            다시 시작하기
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error Message */}
                            {error && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 p-8 text-center z-50">
                                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                    <p className="text-white/80 mb-6">{error}</p>
                                    <button 
                                        onClick={() => {
                                            setError(null);
                                            setIsDemo(true);
                                            setStep("ready");
                                        }}
                                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all text-sm font-medium"
                                    >
                                        시뮬레이션 모드로 계속하기 (데모)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instruction Box */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[320px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center shadow-2xl z-50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center gap-2"
                            >
                                {step === 'scanning-left' && <ChevronLeft className="w-5 h-5 text-cyan-400 animate-bounce-x" />}
                                {step === 'scanning-right' && <ChevronRight className="w-5 h-5 text-cyan-400 animate-bounce-x" />}
                                <p className="text-sm font-medium text-white/90">
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
                    <div className="w-full max-w-sm h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-linear-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_#22d3ee]"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col items-center gap-4 w-full">
                    {step === 'ready' && (
                        <button
                            onClick={startScan}
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
                .animate-bounce-x {
                    animation: bounce-x 1s infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
