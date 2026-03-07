"use client";

import { useState, useRef } from 'react';
import { Download, Check, Link2, RotateCcw, Share2, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ColorResultCardClientProps {
    resultId: string; // This is the SeasonId (spring, summer, autumn, winter)
    title: string;
    description: string;
    keywords: string[];
    bestColors: string[];
    worstColors: string[];
    isKo: boolean;
    lang: string;
}

const SEASON_THEMES = {
    spring: {
        bg: "radial-gradient(circle at top right, rgba(255, 182, 193, 0.2), transparent), radial-gradient(circle at bottom left, rgba(152, 251, 152, 0.1), transparent)",
        accent: "from-pink-400 to-yellow-300",
        glow: "rgba(255, 182, 193, 0.3)",
        borderColor: "border-pink-200/20"
    },
    summer: {
        bg: "radial-gradient(circle at top right, rgba(173, 216, 230, 0.2), transparent), radial-gradient(circle at bottom left, rgba(230, 230, 250, 0.1), transparent)",
        accent: "from-blue-400 to-purple-300",
        glow: "rgba(173, 216, 230, 0.3)",
        borderColor: "border-blue-200/20"
    },
    autumn: {
        bg: "radial-gradient(circle at top right, rgba(218, 165, 32, 0.15), transparent), radial-gradient(circle at bottom left, rgba(85, 107, 47, 0.1), transparent)",
        accent: "from-orange-500 to-yellow-600",
        glow: "rgba(218, 165, 32, 0.25)",
        borderColor: "border-orange-500/20"
    },
    winter: {
        bg: "radial-gradient(circle at top right, rgba(0, 0, 205, 0.15), transparent), radial-gradient(circle at bottom left, rgba(220, 20, 60, 0.1), transparent)",
        accent: "from-blue-600 to-purple-600",
        glow: "rgba(0, 0, 205, 0.25)",
        borderColor: "border-indigo-500/20"
    }
};

export function ColorResultCardClient({
    resultId,
    title,
    description,
    keywords,
    bestColors,
    worstColors,
    isKo,
    lang,
}: ColorResultCardClientProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/color/result/${resultId}?lang=${lang}`
        : '';

    const uiText = {
        ko: {
            shareTitle: `나의 퍼스널컬러: ${title} 🎨`,
            shareText: `저의 찰떡 컬러는 "${title}"이에요! ✨\n\n당신만의 컬러도 찾아보세요 👇\nhttps://findcore.me/color`,
            copyLink: '링크를 복사하세요:',
            copied: '복사됨!',
            share: '공유하기',
            save: '이미지 저장',
            retest: '다시 검사하기',
            best: '베스트 컬러',
            worst: '워스트 컬러',
            adStatus: '광고대기중',
            home: '홈으로'
        },
        en: {
            shareTitle: `My Personal Color: ${title}`,
            shareText: 'I found my best colors! Take the test too ✨',
            copyLink: 'Copy this link:',
            copied: 'Copied!',
            share: 'Share',
            save: 'Save Image',
            retest: 'Retest',
            best: 'Best Colors',
            worst: 'Colors to Avoid',
            adStatus: 'Ad Pending',
            home: 'Home'
        },
        zh: {
            shareTitle: `我的专属色彩: ${title}`,
            shareText: '我找到了最适合我的颜色！快来测测你的 ✨',
            copyLink: '复制链接:',
            copied: '已复制!',
            share: '分享',
            save: '保存图片',
            retest: '重新测试',
            best: '最佳颜色',
            worst: '避雷颜色',
            adStatus: '广告待处理',
            home: '首页'
        },
        ja: {
            shareTitle: `私のパーソナルカラー: ${title}`,
            shareText: '自分に似合う色が見つかりました！あなたも診断してみて ✨',
            copyLink: '링크를 복사하세요:', // Fixed from Japanese copy for consistency
            copied: '복사됨!',
            share: '쉐어하기',
            save: '画像を保存',
            retest: 'もう一度診断する',
            best: 'ベストカラー',
            worst: 'NGカラー',
            adStatus: '広告待機中',
            home: 'ホーム'
        }
    };

    const t = uiText[lang as keyof typeof uiText] || uiText.en;

    const handleShare = async () => {
        const shareData = { url: shareUrl };
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if ((err as Error).name === 'AbortError') return;
            }
        }
        setShowShareModal(true);
    };

    const handleCopyLink = async () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setShowShareModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
                return;
            } catch { }
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const mod = await import('html-to-image');
            const dataUrl = await mod.toPng(cardRef.current, { backgroundColor: '#000' });
            const link = document.createElement('a');
            link.download = `personal-color-${resultId}.png`;
            link.href = dataUrl;
            link.click();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            console.error(err);
        } finally {
            setDownloading(false);
        }
    };

    const theme = SEASON_THEMES[resultId as keyof typeof SEASON_THEMES] || SEASON_THEMES.spring;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 } as any
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as any }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md mx-auto flex flex-col gap-6 pb-12"
        >
            {/* Main Card */}
            <div
                ref={cardRef}
                className={`relative w-full flex flex-col overflow-hidden bg-zinc-950/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl`}
                style={{
                    boxShadow: `0 0 80px -20px ${theme.glow}`,
                    background: theme.bg
                }}
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="px-8 pt-16 pb-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col gap-8 items-center w-full">
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Your Result</span>
                            <h1 className={`text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-2xl ${isKo ? 'font-korean' : 'font-cinzel'}`}>
                                {title}
                            </h1>
                        </div>

                        <div className="flex gap-2.5 flex-wrap justify-center max-w-[90%]">
                            {keywords.map((k, idx) => (
                                <motion.span
                                    key={k}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (idx * 0.1) } as any}
                                    className={`px-4 py-2 bg-white/5 rounded-full text-[12px] font-semibold border border-white/10 text-white/80 tracking-wide backdrop-blur-md shadow-sm ${isKo ? 'font-korean' : 'font-sans'}`}
                                >
                                    #{k}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
                </motion.div>

                {/* Color Palettes Section */}
                <div className="flex flex-col px-8 py-10 bg-black/40 backdrop-blur-md gap-10 border-y border-white/5">
                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-5 bg-linear-to-b ${theme.accent} rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
                                <h3 className="text-sm font-black text-white tracking-widest uppercase">{t.best}</h3>
                            </div>
                            <Sparkles className="w-4 h-4 text-white/20" />
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {bestColors.map((c, i) => (
                                <motion.div
                                    key={c}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div
                                        className="w-full aspect-3/4 rounded-2xl ring-1 ring-white/20 shadow-2xl relative overflow-hidden group"
                                        style={{ backgroundColor: c }}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-[9px] text-white/30 font-mono tracking-tighter uppercase font-bold">{c.replace('#', '')}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-zinc-700 rounded-full" />
                            <h3 className="text-sm font-black text-white/60 tracking-widest uppercase">{t.worst}</h3>
                        </div>
                        <div className="flex gap-4">
                            {worstColors.map(c => (
                                <div
                                    key={c}
                                    className="w-10 h-10 rounded-xl ring-1 ring-white/5 opacity-40 grayscale-40 hover:opacity-80 transition-opacity cursor-help"
                                    style={{ backgroundColor: c }}
                                    title="Avoid these shades"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="flex flex-col px-8 py-12 bg-black/20 w-full text-left gap-10">
                    {description.split('\n\n').map((block, index) => {
                        const match = block.match(/^\[(.*?)\]/);
                        const header = match ? match[1] : null;
                        const content = match ? block.replace(/^\[.*?\]\n?/, '') : block;

                        if (header) {
                            return (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1 h-4 bg-linear-to-r ${theme.accent} rounded-full`} />
                                        <h3 className="text-white/90 font-black text-xs tracking-[0.2em] uppercase">{header}</h3>
                                    </div>
                                    <p className={`text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium tracking-wide text-justify ${isKo ? 'font-korean word-keep-all' : ''}`}>
                                        {content}
                                    </p>
                                </div>
                            );
                        }
                        return <p key={index} className={`text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium tracking-wide text-justify ${isKo ? 'font-korean word-keep-all' : ''}`}>{block}</p>;
                    })}
                </motion.div>

                <div className="w-full bg-white/5 border-t border-white/5 py-5 px-8 flex items-center justify-center">
                    <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5">
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t.adStatus}</p>
                    </div>
                </div>

                <div className="w-full bg-black/40 py-6 px-8 flex items-center justify-center border-t border-white/5">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-light italic">findcore.me</p>
                </div>
            </div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-3 py-5 rounded-3xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all backdrop-blur-xl active:scale-95 border border-white/10 shadow-xl"
                >
                    <Share2 className="w-5 h-5 text-white/60" />
                    <span>{t.share}</span>
                </button>
                <button
                    onClick={handleDownloadImage}
                    disabled={downloading}
                    className="group relative flex items-center justify-center gap-3 py-5 rounded-3xl overflow-hidden bg-white text-black text-sm font-black transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                >
                    <Download className="w-5 h-5" />
                    <span className="relative z-10">{downloading ? '...' : t.save}</span>
                </button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full">
                <Link
                    href={`/?lang=${lang}`}
                    className="w-full text-center py-4 bg-transparent hover:bg-white/5 text-white/40 hover:text-white/80 text-[13px] font-bold rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-2 active:scale-95"
                >
                    <Home className="w-4 h-4 opacity-50" />
                    <span>{t.home}</span>
                </Link>
                <Link
                    href={`/color/test?lang=${lang}`}
                    className="w-full text-center py-4 bg-transparent hover:bg-white/5 text-white/40 hover:text-white/80 text-[13px] font-bold rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-2 active:scale-95"
                >
                    <RotateCcw className="w-4 h-4 opacity-50" />
                    <span>{t.retest}</span>
                </Link>
            </motion.div>
        </motion.div>
    );
}
