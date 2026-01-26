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

            // Capture the card as-is (preserving current layout)
            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#000000',
                skipFonts: true,
                cacheBust: true,
                onClone: (_doc: Document, clonedNode: HTMLElement) => {
                    // Ensure images are loaded
                    const allImages = clonedNode.querySelectorAll('img');
                    allImages.forEach((img: HTMLImageElement) => {
                        img.loading = 'eager';
                        img.decoding = 'sync';
                    });

                    // Expand scrollable content
                    const scrollContainer = clonedNode.querySelector('.overflow-y-auto') as HTMLElement;
                    if (scrollContainer) {
                        scrollContainer.style.overflow = 'visible';
                        scrollContainer.style.height = 'auto';
                        scrollContainer.style.maxHeight = 'none';
                    }
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
        <div className="w-full max-w-4xl mx-auto h-full max-h-[90dvh] flex flex-col gap-4">
            {/* Main Result Card */}
            <div
                ref={cardRef}
                className="relative w-full flex-1 flex flex-col overflow-hidden rounded-[2rem] bg-black border border-white/10 shadow-2xl min-h-0 shrink-0"
                style={{
                    boxShadow: '0 0 50px -12px rgba(255,192,203,0.25)'
                }}
            >
                {/* Top Section: Image and Text Content */}
                <div className="flex flex-col md:flex-row flex-1 w-full min-h-0">
                    {/* Image Section (Left on Desktop, Top on Mobile) */}
                    <div className="relative w-full md:w-1/2 h-[40%] md:h-full shrink-0">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Right Content Section (Scrollable if needed) */}
                    <div className="relative w-full md:w-1/2 flex flex-col h-[60%] md:h-full bg-black/80 backdrop-blur-3xl min-h-0 text-left">
                        {/* Scroll Container with Vertical Centering */}
                        <div className="flex-1 overflow-y-auto no-scrollbar relative p-8 flex flex-col justify-center">
                            <div className="flex flex-col items-start gap-1">
                                {/* Archetype Badge - Neon Glow Style */}
                                <div className="mb-2 relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg blur-md opacity-60 animate-pulse" />
                                    <div className="relative px-3 py-1 bg-black/60 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                        <span className="text-sm font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-widest uppercase drop-shadow-sm">
                                            {archetype}
                                        </span>
                                    </div>
                                </div>

                                <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-5 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isKo ? 'font-korean' : 'font-serif'}`}>
                                    <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                                        {title}
                                    </span>
                                </h1>

                                <div className="flex flex-wrap justify-start gap-2 mb-2">
                                    {keywords.map(k => (
                                        <span key={k} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-xs font-medium border border-white/10 transition-colors backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                            #{k}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="relative p-1 my-4">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500/50 via-purple-500/30 to-transparent" />
                                <p className={`pl-5 text-base md:text-lg text-white/95 leading-loose font-normal whitespace-pre-line tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${isKo ? 'font-korean' : 'font-sans'}`}>
                                    {description}
                                </p>
                            </div>

                            {/* Visual Info (Palette & Brands) */}
                            <div className="w-full grid grid-cols-2 gap-8 pt-8 mt-2 border-t border-white/10">
                                <div className="flex flex-col items-start gap-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">{t.palette}</p>
                                    <div className="flex justify-start gap-4">
                                        {colorPalette?.map((c, i) => (
                                            <div key={i} className="relative group">
                                                <div className="absolute -inset-1 rounded-full bg-white/20 blur-sm group-hover:bg-white/40 transition-colors" />
                                                <div className="relative w-10 h-10 rounded-full border border-white/20 shadow-inner scale-100 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: c }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">{t.brand}</p>
                                    <div className="flex flex-wrap justify-start gap-2">
                                        {brandMatches.map(b => (
                                            <span key={b} className="text-xs text-white/90 font-medium px-2 py-1 bg-gradient-to-r from-white/10 to-transparent border-l-2 border-white/40">{b}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOROKA App Banner (Full Width Footer) */}
                <div className="w-full px-4 py-3 border-t border-amber-800/30 bg-gradient-to-r from-amber-950/40 via-[#1a0f14] to-amber-950/40 z-10 overflow-hidden relative">
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 -translate-x-full animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />

                    {/* Sparkle decorations */}
                    <div className="absolute top-2 right-20 w-1 h-1 bg-amber-400/60 rounded-full animate-pulse" />
                    <div className="absolute bottom-2 right-32 w-1.5 h-1.5 bg-amber-300/40 rounded-full animate-ping" />
                    <div className="absolute top-3 right-48 w-1 h-1 bg-amber-200/50 rounded-full animate-pulse delay-300" />

                    <a
                        href="https://play.google.com/store/apps/details?id=com.chlee.morokaapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 w-full group relative"
                    >
                        {/* App Icon with glow */}
                        <div className="shrink-0 relative">
                            <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-500/30 to-amber-700/20 rounded-2xl blur-md animate-pulse" />
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] border-2 border-amber-600/50">
                                <Image
                                    src="/icon.webp"
                                    alt="MOROKA"
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            </div>
                            {/* NEW Badge */}
                            <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded text-[8px] font-bold text-white shadow-lg animate-bounce">
                                HOT
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent whitespace-nowrap">{t.adTitle}</h3>
                                <span className="text-xs text-amber-400/90 font-medium whitespace-nowrap">· {t.adDesc}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                {/* Star Rating */}
                                <div className="flex items-center gap-0.5 shrink-0">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-[10px] text-white/60 ml-0.5">5.0</span>
                                </div>
                                <span className="text-[10px] text-white/40">|</span>
                                <span className="text-[10px] text-white/60 whitespace-nowrap">{t.adCTA}</span>
                            </div>
                        </div>

                        {/* Google Play Logo */}
                        <div className="shrink-0 relative w-10 h-10 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                            <Image
                                src="/google.webp"
                                alt="Google Play"
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </div>
                    </a>
                </div>
            </div>

            {/* Action Buttons (Outside ref, so strictly not captured) */}
            <div className="w-full grid grid-cols-3 gap-3 shrink-0">
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/90 font-medium text-sm group backdrop-blur-md"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                    <span className="hidden sm:inline">{copied ? t.copied : t.share}</span>
                    <span className="sm:hidden">{t.share}</span>
                </button>

                <button
                    onClick={handleDownloadImage}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/90 font-medium text-sm group disabled:opacity-50 backdrop-blur-md"
                >
                    <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
                    <span className="hidden sm:inline">{t.save}</span>
                    <span className="sm:hidden">Save</span>
                </button>

                <Link
                    href={`/?lang=${lang}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/90 font-medium text-sm group backdrop-blur-md"
                >
                    <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                    <span className="hidden sm:inline">{t.retest}</span>
                    <span className="sm:hidden">Retest</span>
                </Link>
            </div>
        </div>
    );
}
