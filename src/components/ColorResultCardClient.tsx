"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Check, Download, Link2, RotateCcw, Share2, Home } from 'lucide-react';
import Link from 'next/link';

interface ColorResultCardClientProps {
    resultId: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    keywords: string[];
    palette: string[];
    bestColors: string[];
    worstColors: string[];
    isKo: boolean;
    lang: string;
}

export function ColorResultCardClient({
    resultId,
    title,
    subtitle,
    description,
    image,
    keywords,
    palette,
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
            failedSave: '이미지 저장에 실패했습니다.',
            copied: '복사됨!',
            share: '공유하기',
            save: '이미지 저장',
            retest: '다시하기',
            adStatus: '광고대기중',
            resultLabel: '퍼스널 컬러',
            best: '베스트 컬러',
            worst: '워스트 컬러'
        },
        en: {
            shareTitle: `My Personal Color: ${title}`,
            shareText: 'I found my best colors! Take the test too ✨',
            copyLink: 'Copy this link:',
            failedSave: 'Failed to save image.',
            copied: 'Copied!',
            share: 'Share',
            save: 'Save Image',
            retest: 'Retest',
            adStatus: 'Ad Pending',
            resultLabel: 'Personal Color',
            best: 'Best Colors',
            worst: 'Colors to Avoid'
        },
        zh: {
            shareTitle: `我的专属色彩: ${title}`,
            shareText: '我找到了最适合我的颜色！快来测测你的 ✨',
            copyLink: '复制链接:',
            failedSave: '图片保存失败。',
            copied: '已复制!',
            share: '分享',
            save: '保存图片',
            retest: '重新测试',
            adStatus: '广告待处理',
            resultLabel: 'Personal Color',
            best: '最佳颜色',
            worst: '避雷颜色'
        },
        ja: {
            shareTitle: `私のパーソナルカラー: ${title}`,
            shareText: '自分に似合う色が見つかりました！あなたも診断してみて ✨',
            copyLink: 'リンクをコピー:',
            failedSave: '画像の保存に失敗しました。',
            copied: 'コピー完了!',
            share: 'シェアする',
            save: '画像を保存',
            retest: 'もう一度診断する',
            adStatus: '広告待機中',
            resultLabel: 'Personal Color',
            best: 'ベストカラー',
            worst: 'NGカラー'
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
                console.error('Native share failed:', err);
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
            } catch {
            }
        }

        try {
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setShowShareModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            } else {
                prompt(t.copyLink, shareUrl);
            }
        } catch {
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;

        setDownloading(true);

        try {
            const mod = await import('html-to-image');
            const dataUrl = await mod.toPng(cardRef.current, {
                backgroundColor: '#000000',
                pixelRatio: 2,
                cacheBust: true,
            });

            const link = document.createElement('a');
            link.download = `personal-color-${resultId}.png`;
            link.href = dataUrl;
            link.click();

            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch (err) {
            console.error('Capture failed:', err);
            alert(t.failedSave);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            {showToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-semibold text-sm">{t.copied}</span>
                                <span className="text-white/50 text-xs">{t.shareText}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
                    <div
                        className="w-full max-w-md bg-[#1a1a1a] rounded-t-3xl p-6 pb-10 animate-in slide-in-from-bottom duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                        <h3 className="text-white font-bold text-lg text-center mb-6">{t.share}</h3>

                        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                            <p className="text-white/50 text-xs mb-1">URL</p>
                            <p className="text-white text-sm truncate">{shareUrl}</p>
                        </div>

                        <button
                            onClick={handleCopyLink}
                            className="w-full py-4 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
                        >
                            <Link2 className="w-5 h-5" />
                            <span>{lang === 'ko' ? '링크 복사하기' : lang === 'ja' ? 'リンクをコピー' : lang === 'zh' ? '复制链接' : 'Copy Link'}</span>
                        </button>

                        <button
                            onClick={() => setShowShareModal(false)}
                            className="w-full py-3 mt-3 text-white/50 text-sm font-medium"
                        >
                            {lang === 'ko' ? '닫기' : lang === 'ja' ? '閉じる' : lang === 'zh' ? '关闭' : 'Close'}
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md mx-auto flex flex-col gap-4 pb-10">
                <div
                    ref={cardRef}
                    className={`relative w-full flex flex-col overflow-hidden bg-black text-white rounded-4xl ${isKo ? '' : 'font-cinzel'}`}
                    style={{ boxShadow: '0 0 50px -12px rgba(255,255,255,0.1)' }}
                >
                    <div className="relative w-full aspect-4/3 shrink-0 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            priority
                            unoptimized
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/95 z-10" />

                        <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-end z-20">
                            <div className="flex flex-col items-start gap-2">

                                <h1 className={`font-black leading-none tracking-tight z-0 ${isKo ? 'font-korean' : 'font-cinzel'}`}>
                                    <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] whitespace-nowrap text-2xl sm:text-3xl md:text-4xl">
                                        {title}
                                    </span>
                                </h1>

                                <div className="flex flex-wrap gap-1.5 pt-1 keywords-container">
                                    {keywords.map((keyword) => (
                                        <span
                                            key={keyword}
                                            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md ${isKo ? 'font-korean' : 'font-sans'} bg-zinc-900/60 border-white/20 text-white tracking-wide shadow-sm`}
                                        >
                                            #{keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col px-6 py-6 z-10 bg-black w-full text-left gap-8" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                        <div className="flex flex-col gap-4 min-w-0 w-full overflow-hidden">
                            <div className="flex items-center gap-2 mb-1 section-header-wrapper">
                                <div className="w-1 h-4 bg-linear-to-b from-pink-500 to-purple-500 rounded-full section-color-bar" />
                                <h3 className="text-pink-300 font-bold text-sm tracking-wide uppercase">
                                    {t.best}
                                </h3>
                            </div>
                            <div className="grid grid-cols-5 max-w-full gap-2 sm:gap-3">
                                {bestColors.map((color, index) => (
                                    <div key={`${color}-${index}`} className="flex flex-col items-center gap-1 sm:gap-2">
                                        <div
                                            className="w-full aspect-3/4 rounded-xl sm:rounded-2xl ring-1 ring-white/15"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-[9px] sm:text-[10px] text-white font-bold font-mono uppercase truncate w-full text-center drop-shadow-sm tracking-wider">
                                            {color.replace('#', '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 min-w-0 w-full overflow-hidden">
                            <div className="flex items-center gap-2 mb-1 section-header-wrapper">
                                <div className="w-1 h-4 bg-white/30 rounded-full section-color-bar" />
                                <h3 className="text-white/70 font-bold text-sm tracking-wide uppercase">
                                    {t.worst}
                                </h3>
                            </div>
                            <div className="grid grid-cols-3 max-w-full gap-2 sm:gap-3">
                                {worstColors.map((color, index) => (
                                    <div key={`${color}-${index}`} className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-2 py-2 sm:px-3 sm:py-3 min-w-0 overflow-hidden">
                                        <div
                                            className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full ring-1 ring-white/10"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-[10px] sm:text-xs text-white font-medium font-mono uppercase truncate min-w-0">
                                            {color.replace('#', '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`flex flex-col gap-6 ${isKo ? 'font-korean' : 'font-serif'}`}>
                            {description.split('\n\n').map((block, index) => {
                                const match = block.match(/^\[(.*?)\]/);
                                const header = match ? match[1] : null;
                                const content = match ? block.replace(/^\[.*?\]\n?/, '') : block;

                                if (header) {
                                    return (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-1 section-header-wrapper">
                                                <div className="w-1 h-4 bg-linear-to-b from-pink-500 to-purple-500 rounded-full section-color-bar" />
                                                <h3 className="text-pink-300 font-bold text-sm tracking-wide uppercase">
                                                    {header}
                                                </h3>
                                            </div>
                                            <p className="text-sm md:text-[15px] text-white/95 leading-7 font-normal tracking-wide text-justify">
                                                {content}
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <p key={index} className="text-sm md:text-[15px] text-white/95 leading-7 font-normal tracking-wide text-justify">
                                        {block}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full bg-[#1A1A1A] border-t border-white/5 py-3 px-6">
                        <p className="text-xs text-center text-white/50 font-semibold">{t.adStatus}</p>
                    </div>

                    <div className="w-full bg-[#050505] py-4 px-6 flex items-center justify-between border-t border-white/5">
                        <p className="footer-domain text-white text-[10px] uppercase tracking-[0.2em] font-light">
                            findcore.me
                        </p>
                        <a
                            href="https://t.me/todayshelp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors duration-300"
                        >
                            <span className="footer-telegram-label font-serif text-sm italic tracking-wide group-hover:tracking-wider transition-all">Telegram</span>
                            <span className="footer-telegram-id font-serif italic text-[10px] font-light opacity-90 group-hover:opacity-100">@todayshelp</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all backdrop-blur-md active:scale-95 border border-white/10"
                    >
                        <Share2 className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        disabled={downloading}
                        className="flex items-center justify-center py-4 rounded-full bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold transition-all shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    <Link
                        href={`/?lang=${lang}`}
                        className="flex items-center justify-center w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/5 active:scale-95"
                    >
                        <Home className="w-6 h-6" />
                    </Link>
                    <Link
                        href={`/color/test?lang=${lang}`}
                        className="flex items-center justify-center w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/5 active:scale-95"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </>
    );
}
