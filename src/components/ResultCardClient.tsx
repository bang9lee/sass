"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Download, Check, Link2, RotateCcw, Share2, Home } from 'lucide-react';
import type { SupportedLang } from "@/lib/site-content";
import { ReportSignatureStrip } from "@/components/report-signature-strip";
import Link from 'next/link';

interface ResultCardClientProps {
    resultId: string;
    title: string;
    archetype: string;
    description: string;
    image: string;
    keywords: string[];
    colorPalette: string[];
    isKo: boolean;
    lang: SupportedLang;
}

export function ResultCardClient({
    resultId,
    title,
    archetype,
    description,
    image,
    keywords,
    colorPalette,
    isKo,
    lang,
}: ResultCardClientProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/result/${resultId}?lang=${lang}`
        : '';

    const uiText = {
        ko: {
            shareTitle: `나의 에스테틱 코어: ${title} 🔮`,
            shareText: `저의 감성 분위기는 "${title}"이에요! ✨\n\n당신만의 에스테틱 코어도 찾아보세요 👇\nhttps://findcore.me`,
            copyLink: '링크를 복사하세요:',
            failedSave: '이미지 저장에 실패했습니다.',
            palette: '추천 컬러',
            brand: '추천 브랜드',
            copied: '복사됨!',
            share: '공유하기',
            save: '이미지 저장',
            retest: '다시하기',
            adStatus: '광고대기중'
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
            adStatus: 'Ad Pending'
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
            adStatus: '广告待处理'
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
            adStatus: '広告待機中'
        }
    };

    const t = uiText[lang as keyof typeof uiText] || uiText.en;

    const handleShare = async () => {
        const shareData = {
            url: shareUrl,
        };

        // 1. Try Native Share (Prioritize)
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                // canShare check is optional but good; if it fails, just try sharing anyway
                await navigator.share(shareData);
                return;
            } catch (err) {
                // AbortError means user cancelled, don't show modal
                if ((err as Error).name === 'AbortError') return;

                // Other errors (like insecure context) fall back to modal
                console.error('Native share failed:', err);
            }
        }

        // 2. Fallback to Custom Modal
        setShowShareModal(true);
    };

    const handleCopyLink = async () => {
        // 1. Try Modern API (HTTPS)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setShowShareModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
                return;
            } catch {
                // Ignore error and try fallback
            }
        }

        // 2. Fallback for HTTP / Older Browsers (execCommand)
        try {
            const textArea = document.createElement("textarea");
            textArea.value = shareUrl;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

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
                // Really failed
                prompt(t.copyLink, shareUrl);
            }
        } catch {
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;

        setDownloading(true);
        const ua = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isMobile = /android|iphone|ipad|ipod/i.test(ua);

        // Capture Container Setup
        const captureContainer = document.createElement('div');
        captureContainer.style.position = 'fixed';
        captureContainer.style.left = '-9999px';
        captureContainer.style.top = '0';
        captureContainer.style.width = '100vw'; // Important for layout
        document.body.appendChild(captureContainer);

        let clone: HTMLElement | undefined;

        try {
            const mod = await import('html-to-image');

            // 1. Clone & Style (Fixed 1200px Width - Restore)
            const CAPTURE_WIDTH = 1200;

            clone = cardRef.current.cloneNode(true) as HTMLElement;
            clone.style.width = `${CAPTURE_WIDTH}px`;
            clone.style.height = 'auto';
            clone.style.maxWidth = 'none';
            clone.style.minWidth = `${CAPTURE_WIDTH}px`;
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.borderRadius = '0';
            clone.style.backgroundColor = '#000000'; // Force black background
            clone.style.color = '#ffffff'; // Force white text

            // Fix: Enforce "No Wrap" on Tags for straight line layout
            const keywordsContainer = clone.querySelector('.keywords-container') as HTMLElement;
            if (keywordsContainer) {
                keywordsContainer.style.flexWrap = 'nowrap';
                keywordsContainer.style.gap = '16px';
                // Also prevent text wrapping inside the tags
                const keywordSpans = keywordsContainer.querySelectorAll('span');
                keywordSpans.forEach(s => {
                    s.style.whiteSpace = 'nowrap';
                    s.style.flexShrink = '0'; // Prevent shrinking
                    s.style.fontSize = '32px'; // Massively increase tag size for 1200px
                    s.style.lineHeight = '1.5';
                    s.style.padding = '8px 24px'; // More padding for rounded shape
                    s.style.borderRadius = '9999px'; // Force rounded-full
                });
            }

            // --- USER REQUEST: MAXIMIZE Internal Font Sizes ---
            // 1. Archetype Badge (The small pill ABOVE title)
            const archetypeWrapper = clone.querySelector('.archetype-wrapper');
            const archetypeInner = clone.querySelector('.archetype-inner');
            const archetypeText = clone.querySelector('.archetype-text');
            const archetypeIcon = clone.querySelector('.archetype-inner svg');

            if (archetypeWrapper) {
                (archetypeWrapper as HTMLElement).style.padding = '3px'; // Thicker gradient border
                (archetypeWrapper as HTMLElement).style.borderRadius = '9999px';
                (archetypeWrapper as HTMLElement).style.boxShadow = '0 0 40px rgba(255,255,255,0.6)'; // Stronger glow
            }

            if (archetypeInner) {
                (archetypeInner as HTMLElement).style.padding = '12px 32px'; // Bulkier pill
                (archetypeInner as HTMLElement).style.borderRadius = '9999px';
                (archetypeInner as HTMLElement).style.background = 'rgba(0,0,0,0.85)'; // Darker background
                (archetypeInner as HTMLElement).style.gap = '16px';
                (archetypeInner as HTMLElement).style.display = 'flex';
                (archetypeInner as HTMLElement).style.justifyContent = 'center';
                (archetypeInner as HTMLElement).style.alignItems = 'center';
            }

            if (archetypeIcon) {
                (archetypeIcon as HTMLElement).style.width = '24px';
                (archetypeIcon as HTMLElement).style.height = '24px';
            }

            if (archetypeText) {
                (archetypeText as HTMLElement).style.fontSize = '34px'; // Scaled for 1200px
                (archetypeText as HTMLElement).style.fontWeight = '800'; // Thicker font
                (archetypeText as HTMLElement).style.letterSpacing = '0.2em';
                (archetypeText as HTMLElement).style.marginRight = '-0.2em'; // Offset letter-spacing visual imbalance
                (archetypeText as HTMLElement).style.textShadow = '0 0 15px rgba(255,255,255,0.8)'; // Text glow
            }

            // 2. Title (e.g. "Y2K") - FORCE CINZEL
            const titleText = clone.querySelector('h1 span');
            if (titleText) {
                (titleText as HTMLElement).style.fontFamily = '"Cinzel", serif'; // FORCE CINZEL
                (titleText as HTMLElement).style.fontSize = '140px'; // Scaled for 1200px
                (titleText as HTMLElement).style.lineHeight = '1';
                (titleText as HTMLElement).style.marginTop = '16px';
                (titleText as HTMLElement).style.display = 'inline-block';
            }

            // 3. Description Headers & Text
            const descHeaders = clone.querySelectorAll('h3');
            descHeaders.forEach(h => {
                (h as HTMLElement).style.fontSize = '40px'; // Scaled for 1200px
                (h as HTMLElement).style.marginBottom = '0'; // Gap handled by wrapper
            });

            // 3.1 Section Headers (Pink Bar & Gap)
            const sectionBars = clone.querySelectorAll('.section-color-bar');
            sectionBars.forEach(bar => {
                (bar as HTMLElement).style.width = '12px'; // 1 -> 12px
                (bar as HTMLElement).style.height = '48px'; // 4 -> 48px
                (bar as HTMLElement).style.borderRadius = '9999px';
            });
            const sectionWrappers = clone.querySelectorAll('.section-header-wrapper');
            sectionWrappers.forEach(wrapper => {
                (wrapper as HTMLElement).style.gap = '24px'; // 2 -> 24px
                (wrapper as HTMLElement).style.marginBottom = '20px'; // 1 -> 20px
            });

            const descParagraphs = clone.querySelectorAll('p');
            descParagraphs.forEach(p => {
                // Exclude footer/misc small text if needed, but main desc is p
                if (p.textContent?.length && p.textContent.length > 10) {
                    (p as HTMLElement).style.fontSize = '32px'; // Scaled for 1200px
                    (p as HTMLElement).style.lineHeight = '1.7';
                }
            });

            // 4. Footer domain & Telegram
            const footerDomain = clone.querySelector('.footer-domain');
            const footerTgLabel = clone.querySelector('.footer-telegram-label');
            const footerTgId = clone.querySelector('.footer-telegram-id');
            const footerIcon = clone.querySelector('.footer-telegram-icon');

            if (footerDomain) (footerDomain as HTMLElement).style.fontSize = '24px'; // 10 -> 24

            if (footerTgLabel) {
                (footerTgLabel as HTMLElement).style.fontSize = '32px'; // Italic label
            }
            if (footerTgId) {
                (footerTgId as HTMLElement).style.fontSize = '26px'; // @todayshelp
            }
            if (footerIcon) { // If there's an icon wrapper or svg
                // Ensure icon scales if needed, though usually font-size affects em-based icons
            }

            captureContainer.style.width = `${CAPTURE_WIDTH}px`;
            captureContainer.appendChild(clone);

            let blob: Blob | null = null;

            const captureOptions = {
                quality: 1.0,
                pixelRatio: 1,
                backgroundColor: '#000000',
                width: CAPTURE_WIDTH,
                style: {
                    transform: 'none',
                    margin: '0',
                }
            };

            // --- iOS SPECIFIC LOGIC (RESTORED FROM PROVEN LEGACY) ---
            if (isIOS) {
                // Heavy Processing: Base64 Padding for Safari
                const images = Array.from(clone.querySelectorAll('img'));
                await Promise.all(images.map(async (img) => {
                    try {
                        if (img.src.startsWith('data:')) return;

                        // Proven Logic: mode: 'cors', cache: 'no-cache'
                        const fetchUrl = img.src.includes('?') ? `${img.src}&t=${Date.now()}` : `${img.src}?t=${Date.now()}`;
                        const response = await fetch(fetchUrl, { mode: 'cors', cache: 'no-cache' });
                        if (!response.ok) throw new Error('Fetch failed');

                        const b = await response.blob();
                        await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = async () => {
                                let b64 = reader.result as string;
                                // Safari padding fix (Critical)
                                const parts = b64.split(',');
                                if (parts[1]) {
                                    let content = parts[1];
                                    while (content.length % 4 !== 0) content += '=';
                                    b64 = `${parts[0]},${content}`;
                                }
                                img.src = b64;
                                try { await img.decode(); } catch { }
                                resolve(true);
                            };
                            reader.readAsDataURL(b);
                        });
                    } catch {
                        img.crossOrigin = 'anonymous';
                    }
                }));

                // Wait for stability
                await new Promise(resolve => setTimeout(resolve, 300));

                // 5-Stage Retry Loop (Proven Fix for Safari Canvas)
                let dataUrl = '';
                let lastLen = 0;
                for (let i = 0; i < 5; i++) {
                    dataUrl = await mod.toPng(clone, captureOptions);
                    if (dataUrl.length > 10000 && dataUrl.length >= lastLen) {
                        await new Promise(resolve => setTimeout(resolve, 200));
                        dataUrl = await mod.toPng(clone, captureOptions);
                        break;
                    }
                    lastLen = dataUrl.length;
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                // Convert back to Blob for generic share handling
                if (dataUrl) {
                    const res = await fetch(dataUrl);
                    blob = await res.blob();
                }
            }
            // --- ANDROID / PC SPECIFIC LOGIC ---
            else {
                // Lightweight - just crossOrigin
                const images = clone.querySelectorAll('img');
                images.forEach(img => { img.crossOrigin = 'anonymous'; });

                await new Promise(resolve => setTimeout(resolve, 500));

                blob = await mod.toBlob(clone, captureOptions);
            }

            if (!blob) throw new Error('Blob generation failed');

            // 3. Share (Mobile Priority - Modern Fix)
            const file = new File([blob], `aesthetic-core-${resultId}.png`, { type: 'image/png' });
            let shareSuccess = false;

            if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: t.shareTitle,
                        text: t.shareText,
                        // url: shareUrl, // Some apps fail if URL + File are sent together, but Text usually works
                    });
                    shareSuccess = true;
                } catch (shareError) {
                    if ((shareError as Error).name !== 'AbortError') {
                        console.error('Share failed', shareError);
                    } else {
                        setDownloading(false);
                        return; // User cancelled
                    }
                }
            }

            // 4. Fallback or PC: Manual Download
            if (!shareSuccess) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `aesthetic-core-${resultId}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            }

        } catch (err) {
            console.error('Capture failed:', err);
            alert(t.failedSave);
        } finally {
            if (clone) clone.remove();
            captureContainer.remove();
            setDownloading(false);
        }
    };

    return (
        <>
            {/* Toast Notification */}
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

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
                    <div
                        className="w-full max-w-md bg-[#1a1a1a] rounded-t-3xl p-6 pb-10 animate-in slide-in-from-bottom duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Handle Bar */}
                        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                        {/* Title */}
                        <h3 className="text-white font-bold text-lg text-center mb-6">{t.share}</h3>

                        {/* Link Preview */}
                        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                            <p className="text-white/50 text-xs mb-1">URL</p>
                            <p className="text-white text-sm truncate">{shareUrl}</p>
                        </div>

                        {/* Copy Link Button */}
                        <button
                            onClick={handleCopyLink}
                            className="w-full py-4 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
                        >
                            <Link2 className="w-5 h-5" />
                            <span>{lang === 'ko' ? '링크 복사하기' : lang === 'ja' ? 'リンクをコピー' : lang === 'zh' ? '复制链接' : 'Copy Link'}</span>
                        </button>

                        {/* Close */}
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
                {/* Main Result Card - Mobile Optimized Vertical Stack */}
                <div
                    ref={cardRef}
                    className={`relative w-full flex flex-col overflow-hidden bg-black text-white rounded-4xl ${isKo ? '' : 'font-cinzel'}`}
                    style={{
                        // Use standard mobile aspect ratio or auto height
                        boxShadow: '0 0 50px -12px rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Main Image with Premium Overlay Text */}
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
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/95 z-10" />

                        {/* Text Overlay */}
                        <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-between z-20">

                            {/* TOP RIGHT: Color Palette */}
                            <div className="flex justify-end">
                                <div className="flex gap-2 p-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                                    {colorPalette?.map((c, i) => (
                                        <div
                                            key={i}
                                            className="w-5 h-5 rounded-full ring-1 ring-white/20"
                                            style={{
                                                backgroundColor: c,
                                                boxShadow: `0 0 10px ${c}50`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* BOTTOM LEFT: Archetype, Title, Keywords */}
                            <div className="flex flex-col items-start gap-2">
                                {/* Archetype Details - PREMIUM CRYSTAL */}
                                <div className="archetype-wrapper p-0.5 rounded-full bg-linear-to-r from-rose-200 via-white to-sky-200 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                    <div className="archetype-inner px-5 py-1.5 bg-black/80 backdrop-blur-2xl rounded-full flex items-center gap-2">
                                        <span className={`archetype-text text-[11px] md:text-sm font-bold text-white tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-sm ${isKo ? '' : 'font-cinzel'}`}>
                                            {archetype}
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className={`font-black leading-none tracking-tight font-cinzel z-0`}>
                                    <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] whitespace-nowrap text-2xl sm:text-3xl md:text-4xl">
                                        {title}
                                    </span>
                                </h1>

                                {/* Keywords */}
                                <div className="flex flex-wrap gap-1.5 pt-1 keywords-container">
                                    {keywords.map((k) => (
                                        <span
                                            key={k}
                                            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md ${isKo ? 'font-korean' : 'font-sans'} bg-zinc-900/60 border-white/20 text-white tracking-wide shadow-sm`}
                                        >
                                            #{k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Description & Details - REDESIGNED for Readability */}
                    <div className="flex flex-col px-6 py-6 z-10 bg-black w-full text-left" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                        {/* Psychological Analysis Section */}
                        <div className={`flex flex-col gap-6 ${isKo ? 'font-korean' : 'font-serif'}`}>
                            {description.split('\n\n').map((block, index) => {
                                // Check for Headers like [Title]
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

                                // Fallback for unstructured text (or intro lines)
                                return (
                                    <p key={index} className="text-sm md:text-[15px] text-white/95 leading-7 font-normal tracking-wide text-justify">
                                        {block}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3.5. Ad Placeholder */}
                    <div className="w-full bg-[#1A1A1A] border-t border-white/5 py-3 px-6">
                        <p className="text-xs text-center text-white/50 font-semibold">{t.adStatus}</p>
                    </div>

                    {/* 4. Report Signature */}
                    <ReportSignatureStrip lang={lang} />
                </div>

                {/* Action Buttons (Outside Screenshot) */}
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
                        href={`/test?lang=${lang}`}
                        className="flex items-center justify-center w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/5 active:scale-95"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </>
    );
}
