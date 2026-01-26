"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Download, Check, Link2, RotateCcw, Share2 } from 'lucide-react';
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
            retest: '처음부터 다시하기'
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
            retest: 'Retest'
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
            retest: '重新测试'
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
            retest: 'もう一度診断する'
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

            // Capture the result card as PNG with high quality
            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#000000', // Match background color
                skipFonts: true,
                filter: (node: HTMLElement) => {
                    // Exclude elements with 'data-hide-on-capture' attribute
                    return !node.classList?.contains('hide-on-capture');
                },
            });

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
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
            {/* Main Result Card */}
            <div
                ref={cardRef}
                className="relative w-full overflow-hidden rounded-[2rem] bg-black border border-white/10 shadow-2xl"
                style={{
                    boxShadow: '0 0 50px -12px rgba(255,192,203,0.25)'
                }}
            >
                {/* Card Background Effects (Holographic) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 pointer-events-none" />

                {/* Image Section - Contains Visual Identity */}
                <div className="relative aspect-[4/5] w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 500px"
                    />
                    {/* 1. Subtle Gradient for Text Readability - Only at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 space-y-4">
                        {/* Title Group */}
                        <div className="space-y-2">
                            {/* Archetype Badge - Moved above title */}
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/20 backdrop-blur-md shadow-lg w-fit">
                                <span className="text-sm font-bold text-white uppercase tracking-widest drop-shadow-md">
                                    {archetype}
                                </span>
                            </div>

                            <h1 className={`text-4xl md:text-5xl font-bold text-white leading-tight break-keep drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] ${isKo ? 'font-korean' : 'font-serif'}`}>
                                {title}
                            </h1>
                            {/* Keywords Tag Cloud */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {keywords.map(keyword => (
                                    <span key={keyword} className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-md text-sm font-medium text-white/90 border border-white/20">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Visual Info Block (Palette & Brands) - Moved Inside Image */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 mt-2">
                            {/* Color Palette */}
                            {colorPalette && colorPalette.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-widest text-white/80 font-mono shadow-black drop-shadow-sm">
                                        {t.palette}
                                    </p>
                                    <div className="flex gap-2">
                                        {colorPalette.map((color, idx) => (
                                            <div key={idx} className="group relative flex flex-col items-center gap-1">
                                                <div
                                                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 shadow-md transition-transform group-hover:scale-110"
                                                    style={{ backgroundColor: color }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Brand Matches */}
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-widest text-white/80 font-mono shadow-black drop-shadow-sm">
                                    {t.brand}
                                </p>
                                <div className="flex flex-wrap gap-x-2 gap-y-1">
                                    {brandMatches.map(brand => (
                                        <span key={brand} className="text-sm text-white font-medium drop-shadow-md">
                                            {brand},
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section: Description (Moved Below Image) */}
                <div className="relative p-6 md:p-8 bg-white/5 backdrop-blur-3xl border-t border-white/10">
                    <div className="space-y-4">
                        <p className={`text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line break-keep font-light ${isKo ? 'font-korean' : 'font-sans'}`}>
                            {description}
                        </p>

                        {/* Waterproof Mark */}
                        <div className="pt-6 mt-2 border-t border-white/5 flex justify-between items-center opacity-40">
                            <span className="text-[10px] font-mono tracking-widest uppercase">Aesthetic Core Test</span>
                            <span className="text-[10px] font-mono">aesthetic-core.vercel.app</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons (Hidden on Capture) */}
            <div className="grid grid-cols-2 gap-3 w-full hide-on-capture">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white font-medium active:scale-95"
                >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5 text-white" />}
                    <span>{copied ? t.copied : t.share}</span>
                </button>
                <button
                    onClick={handleDownloadImage}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    {downloading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Download className="w-5 h-5" />
                    )}
                    <span>{t.save}</span>
                </button>
            </div>

            {/* Retest Link */}
            <Link
                href={`/?lang=${lang}`}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm py-2 hide-on-capture"
            >
                <RotateCcw className="w-4 h-4" />
                <span>{t.retest}</span>
            </Link>
        </div>
    );
}
