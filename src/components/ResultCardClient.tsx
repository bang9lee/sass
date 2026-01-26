"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Download, Check, Link2, RotateCcw, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ResultCardClientProps {
    resultId: string;
    title: string;
    archetype: string;
    description: string;
    image: string;
    keywords: string[];
    brandMatches: string[];
    colorPalette: string[];
    isKo: boolean;
    lang: string;
}

export function ResultCardClient({
    resultId,
    title,
    archetype,
    description,
    image,
    keywords,
    brandMatches,
    colorPalette,
    isKo,
    lang,
}: ResultCardClientProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/result/${resultId}?lang=${lang}`
        : '';

    const uiText = {
        ko: {
            shareTitle: `나의 감성 타입: ${title}`,
            shareText: '나의 감성 타입을 찾았어요! 당신도 테스트해보세요 ✨',
            copyLink: '링크를 복사하세요:',
            failedSave: '이미지 저장에 실패했습니다.',
            palette: '추천 컬러',
            brand: '추천 브랜드',
            copied: '복사됨!',
            share: '공유하기',
            save: '이미지 저장',
            retest: '처음부터 다시하기',
            adTitle: 'MOROKA',
            adDesc: '프리미엄 AI 타로',
            adCTA: 'Google Play에서 다운로드'
        },
        en: {
            shareTitle: `My Aesthetic Core: ${title}`,
            shareText: 'I found my Aesthetic Core! Take the test too ✨',
            copyLink: 'Copy this link:',
            failedSave: 'Failed to save image.',
            palette: 'Color Palette',
            brand: 'Brand Match',
            copied: 'Copied!',
            share: 'Share',
            save: 'Save Image',
            retest: 'Retest',
            adTitle: 'MOROKA',
            adDesc: 'Premium AI Tarot',
            adCTA: 'Get it on Google Play'
        },
        zh: {
            shareTitle: `我的美学类型: ${title}`,
            shareText: '我找到了我的专属美学类型！快来测测你的 ✨',
            copyLink: '复制链接:',
            failedSave: '图片保存失败。',
            palette: '推荐色盘',
            brand: '推荐品牌',
            copied: '已复制!',
            share: '分享',
            save: '保存图片',
            retest: '重新测试',
            adTitle: 'MOROKA',
            adDesc: '高级AI塔罗',
            adCTA: '在Google Play下载'
        },
        ja: {
            shareTitle: `私の感性タイプ: ${title}`,
            shareText: '私の感性タイプが見つかりました！あなたも診断してみて ✨',
            copyLink: 'リンクをコピー:',
            failedSave: '画像の保存に失敗しました。',
            palette: 'おすすめカラー',
            brand: 'おすすめブランド',
            copied: 'コピー完了!',
            share: 'シェアする',
            save: '画像を保存',
            retest: 'もう一度診断する',
            adTitle: 'MOROKA',
            adDesc: 'プレミアムAIタロット',
            adCTA: 'Google Playでダウンロード'
        }
    };

    const t = uiText[lang as keyof typeof uiText] || uiText.en;

    const handleShare = async () => {
        const shareData = {
            title: t.shareTitle,
            text: t.shareText,
            url: shareUrl,
        };

        if (navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                // Fall through to clipboard
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;

        setDownloading(true);
        try {
            const { toPng } = await import('html-to-image');

            // Capture the card with specific settings to ensure full visibility
            // We force a specific width to emulate a mobile capture that looks good
            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#000000',
                skipFonts: true,
                cacheBust: true,
                includeQueryParams: true,
                useCORS: true, // Enable CORS for images
                // Force mobile-like aspect ratio and style adjustments during capture
                style: {
                    transform: 'none',
                    margin: '0',
                    borderRadius: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: 'none',
                    overflow: 'visible'
                },
                onClone: async (_doc: Document, clonedNode: HTMLElement) => {
                    // Ensure images are fully loaded and high quality
                    const allImages = Array.from(clonedNode.querySelectorAll('img'));

                    await Promise.all(allImages.map(img => {
                        return new Promise((resolve) => {
                            if (img.complete) {
                                resolve(true);
                                return;
                            }
                            img.onload = () => resolve(true);
                            img.onerror = () => resolve(false);
                            // Force loading
                            img.loading = 'eager';
                            img.decoding = 'sync';
                            // Cross origin for canvas
                            img.crossOrigin = 'anonymous';
                            // Fix src for local dev or relative paths
                            if (img.src.startsWith('/')) {
                                img.src = window.location.origin + img.src;
                            }
                        });
                    }));

                    // Force text colors and visibility just in case
                    const texts = clonedNode.querySelectorAll('*');
                    texts.forEach((el: any) => {
                        if (el.style) {
                            el.style.visibility = 'visible';
                        }
                    });
                }
            } as any);

            const link = document.createElement('a');
            link.download = `aesthetic-core-${resultId}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to capture image:', err);
            alert(t.failedSave);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-4 pb-10">
            {/* Main Result Card - Mobile Optimized Vertical Stack */}
            <div
                ref={cardRef}
                className="relative w-full flex flex-col overflow-hidden bg-black text-white rounded-[2rem]"
                style={{
                    // Use standard mobile aspect ratio or auto height
                    boxShadow: '0 0 50px -12px rgba(255,255,255,0.1)'
                }}
            >
                {/* 1. Main Image with Overlay Text */}
                <div className="relative w-full aspect-[4/3] shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />

                    {/* Text Overlay (Moved inside image, Left aligned) */}
                    <div className="absolute top-0 left-0 w-full p-6 flex flex-col items-start z-20">
                        {/* Archetype Badge */}
                        <div className="mb-3 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg blur-md opacity-60 animate-pulse" />
                            <div className="relative px-3 py-1 bg-black/60 backdrop-blur-xl rounded-lg border border-white/20">
                                <span className="text-xs font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-widest uppercase">
                                    {archetype}
                                </span>
                            </div>
                        </div>

                        <h1 className={`text-3xl md:text-4xl font-bold leading-tight mb-3 drop-shadow-xl text-left ${isKo ? 'font-korean' : 'font-serif'}`}>
                            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                                {title}
                            </span>
                        </h1>

                        <div className="flex flex-wrap justify-start gap-1.5 mb-4">
                            {keywords.map(k => (
                                <span key={k} className="px-2 py-1 rounded bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-medium border border-white/10 shadow-sm">
                                    #{k}
                                </span>
                            ))}
                        </div>

                        {/* Color Palette (Horizontal below keywords) */}
                        <div className="flex flex-col gap-1 mt-2">
                            <span className="text-xs text-white font-bold ml-0.5 drop-shadow-md shadow-black">
                                {t.palette}
                            </span>
                            <div className="flex gap-2">
                                {colorPalette?.map((c, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border border-white/30 shadow-md" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Description & Details */}
                <div className="flex flex-col pb-6 pt-4 z-10 bg-black w-full text-left">
                    <div className="relative w-full pl-6 pr-6">
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500" />
                        <p className={`pl-4 text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line text-left ${isKo ? 'font-korean' : 'font-sans'}`}>
                            {description}
                        </p>
                    </div>

                    {/* Color & Brand Info Removed as requested */}
                </div>

                {/* 4. Advertisement Banner (Included in Screenshot) */}
                <a href="https://play.google.com/store/apps/details?id=com.chlee.morokaapp" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] p-4 flex items-center justify-between gap-3 border-t border-white/5 active:bg-[#252525] transition-colors group">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/icon.webp"
                                alt="App Icon"
                                fill
                                className="object-cover"
                            />
                            {/* NEW Badge */}
                            <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-bl-lg text-[8px] font-bold text-white shadow-sm z-10">
                                HOT
                            </div>
                        </div>
                        <div className="flex flex-col justify-center min-w-0 gap-0.5">
                            <div className="flex items-center gap-1.5">
                                <span className="text-base font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent truncate">
                                    {t.adTitle}
                                </span>
                                <span className="text-[10px] text-amber-400/80 truncate border border-amber-500/30 px-1 rounded-sm">
                                    {t.adDesc}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-[10px] text-white/80 font-medium ml-1">5.0</span>
                                </div>
                                <span className="w-0.5 h-2 bg-white/20" />
                                <span className="text-[10px] text-white/50">{t.adCTA}</span>
                            </div>
                        </div>
                    </div>
                    {/* Arrow Icon */}
                    <div className="shrink-0 text-white/30 group-hover:text-amber-400 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </a>
            </div>

            {/* Action Buttons (Outside Screenshot) */}
            <div className="grid grid-cols-2 gap-3 w-full">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md active:scale-95 border border-white/10"
                >
                    {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                    <span>{copied ? t.copied : t.share}</span>
                </button>
                <button
                    onClick={handleDownloadImage}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-bold transition-all shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {downloading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Download className="w-5 h-5" />
                    )}
                    <span>{t.save}</span>
                </button>
            </div>

            <div className="w-full">
                <Link
                    href={`/?lang=${lang}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-transparent hover:bg-white/5 text-white/40 hover:text-white/80 transition-colors text-sm font-medium"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.retest}</span>
                </Link>
            </div>
        </div>
    );
}
