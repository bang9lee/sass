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
    const [showToast, setShowToast] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
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
            // text: t.shareText, // 텍스트 제거 (링크만 깔끔하게)
            url: shareUrl,
        };

        // 모바일인지 체크
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // 1. 모바일이면서 공유 기능 지원 시 -> 네이티브 공유 (전달하기)
        // (주의: 로컬 HTTP 환경에서는 모바일이어도 보안상 이 기능이 작동 안 할 수 있음 -> 배포 후엔 됨)
        if (isMobile && navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    setShowShareModal(true);
                }
            }
        } else {
            // 2. PC이거나 공유 미지원 환경 -> 커스텀 모달 무조건 표시
            setShowShareModal(true);
        }
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
            } catch (err) {
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
        } catch (err) {
            prompt(t.copyLink, shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;

        setDownloading(true);
        const ua = navigator.userAgent.toLowerCase();
        const isAndroid = ua.includes('android');
        const isIOS = /iphone|ipad|ipod/.test(ua);

        // Capture Container Setup (Fixed position to avoid layout shifts)
        const captureContainer = document.createElement('div');
        captureContainer.style.position = 'fixed';
        captureContainer.style.left = '-9999px';
        captureContainer.style.top = '0';
        captureContainer.style.width = '100vw'; // Important for layout
        document.body.appendChild(captureContainer);

        let toPng: typeof import('html-to-image').toPng | undefined;
        let clone: HTMLElement | undefined;
        let captureOptions: any;

        try {
            const mod = await import('html-to-image');
            toPng = mod.toPng;

            // 1. Clone the element (Common step for both to avoid flickering on live UI)
            // Explicitly set width to prevent "collapsed text" issue on Android
            const originalWidth = cardRef.current.offsetWidth;
            clone = cardRef.current.cloneNode(true) as HTMLElement;
            clone.style.width = `${originalWidth}px`;
            clone.style.maxWidth = 'none';
            captureContainer.appendChild(clone);

            captureOptions = {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#000000',
                skipFonts: false,
                cacheBust: true,
                style: {
                    transform: 'none',
                    margin: '0',
                    borderRadius: '0',
                }
            };

            // --- iOS SPECIFIC LOGIC (Robust) ---
            if (isIOS) {
                // Heavy Processing: Base64 Padding for Safari
                const images = Array.from(clone.querySelectorAll('img'));
                await Promise.all(images.map(async (img) => {
                    try {
                        const fetchUrl = img.src.includes('?') ? `${img.src}&t=${Date.now()}` : `${img.src}?t=${Date.now()}`;
                        const response = await fetch(fetchUrl, { mode: 'cors', cache: 'no-cache' });
                        if (!response.ok) throw new Error('Fetch failed');
                        const blob = await response.blob();
                        await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = async () => {
                                let b64 = reader.result as string;
                                // Safari padding fix
                                const parts = b64.split(',');
                                if (parts[1]) {
                                    let content = parts[1];
                                    while (content.length % 4 !== 0) content += '=';
                                    b64 = `${parts[0]},${content}`;
                                }
                                img.src = b64;
                                try { await img.decode(); } catch (e) { }
                                resolve(true);
                            };
                            reader.readAsDataURL(blob);
                        });
                    } catch (e) {
                        img.crossOrigin = 'anonymous';
                    }
                }));

                // Wait for stability
                await new Promise(resolve => setTimeout(resolve, 300));

                // 5-Stage Retry Loop
                let dataUrl = '';
                let lastLen = 0;
                for (let i = 0; i < 5; i++) {
                    dataUrl = await toPng(clone, captureOptions);
                    if (dataUrl.length > 10000 && dataUrl.length >= lastLen) {
                        await new Promise(resolve => setTimeout(resolve, 200));
                        dataUrl = await toPng(clone, captureOptions);
                        break;
                    }
                    lastLen = dataUrl.length;
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
                downloadFile(dataUrl);
            }

            // --- ANDROID / PC SPECIFIC LOGIC (Lightweight) ---
            else {
                // FAST TRACK: "Raw Clone"
                // No Base64 conversion loop. No decoding wait.
                // Just use the cloned DOM (which isolates flicker) and capture immediately.
                // Modern Android Chrome handles 'img' tags in clones very well without manual Base64.

                await new Promise(resolve => setTimeout(resolve, 100)); // Minimal settle time

                let dataUrl = await toPng(clone, captureOptions);

                // One simple retry if it looks broken (just in case)
                if (dataUrl.length < 5000) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    dataUrl = await toPng(clone, captureOptions);
                }

                downloadFile(dataUrl);
            }

        } catch (err) {
            console.error('Capture failed first attempt:', err);

            // Retry with skipFonts if it was likely a CORS/StyleSheet error
            if (toPng && clone) {
                try {
                    const fallbackOptions = { ...captureOptions, skipFonts: true };
                    const dataUrl = await toPng(clone, fallbackOptions);
                    downloadFile(dataUrl);
                } catch (retryErr) {
                    console.error('Capture failed retry:', retryErr);
                    alert(t.failedSave);
                }
            } else {
                alert(t.failedSave);
            }
        } finally {
            if (document.body.contains(captureContainer)) {
                document.body.removeChild(captureContainer);
            }
            setDownloading(false);
        }
    };

    const downloadFile = (dataUrl: string) => {
        const link = document.createElement('a');
        link.download = `aesthetic-core-${resultId}.png`;
        link.href = dataUrl;
        link.click();
    };

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
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
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
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
                    className="relative w-full flex flex-col overflow-hidden bg-black text-white rounded-[2rem]"
                    style={{
                        // Use standard mobile aspect ratio or auto height
                        boxShadow: '0 0 50px -12px rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Main Image with Premium Overlay Text */}
                    <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                            loading="eager"
                        />
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 z-10" />

                        {/* Text Overlay */}
                        <div className="absolute inset-0 px-6 pt-6 pb-4 flex flex-col justify-between z-20">

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
                                {/* Archetype Pill */}
                                <div className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[11px] md:text-sm font-bold text-white/90 tracking-wider uppercase">
                                        {archetype}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className={`font-black leading-none tracking-tight ${isKo ? 'font-korean' : ''} z-0`}>
                                    <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] whitespace-nowrap text-4xl sm:text-5xl md:text-6xl">
                                        {title}
                                    </span>
                                </h1>

                                {/* Keywords */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {keywords.map((k, i) => (
                                        <span
                                            key={k}
                                            className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium border backdrop-blur-md
                                                ${i === 0 ? 'bg-pink-500/20 border-pink-500/30 text-pink-200' :
                                                    i === 1 ? 'bg-purple-500/20 border-purple-500/30 text-purple-200' :
                                                        'bg-white/10 border-white/10 text-white/70'}`}
                                        >
                                            #{k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Description & Details - REDESIGNED for Readability */}
                    <div className="flex flex-col px-6 py-6 z-10 bg-black w-full text-left">
                        {/* Psychological Analysis Section */}
                        <div className={`flex flex-col gap-6 ${isKo ? 'font-korean' : 'font-sans'}`}>
                            {description.split('\n\n').map((block, index) => {
                                // Check for Headers like [Title]
                                const match = block.match(/^\[(.*?)\]/);
                                const header = match ? match[1] : null;
                                const content = match ? block.replace(/^\[.*?\]\n?/, '') : block;

                                if (header) {
                                    return (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1 h-4 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
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

                    {/* 3.5. Moroka Banner (Restored) */}
                    <a href="https://play.google.com/store/apps/details?id=com.chlee.morokaapp" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] p-4 flex items-center justify-between gap-3 border-t border-white/5 active:bg-[#252525] transition-colors group">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src="/icon.webp"
                                    alt="App Icon"
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
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

                    {/* 4. Footer: Domain & Telegram */}
                    <div className="w-full bg-[#050505] py-4 px-6 flex items-center justify-between border-t border-white/5">
                        <p className="text-white text-[10px] uppercase tracking-[0.2em] font-light">
                            findcore.me
                        </p>
                        <a
                            href="https://t.me/todayshelp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 text-white hover:text-cyan-200 transition-colors duration-300"
                        >
                            <span className="font-serif text-sm italic tracking-wide group-hover:tracking-wider transition-all">Telegram</span>
                            <span className="text-[10px] font-light opacity-90 group-hover:opacity-100">@todayshelp</span>
                        </a>
                    </div>
                </div>

                {/* Action Buttons (Outside Screenshot) */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md active:scale-95 border border-white/10"
                    >
                        <Share2 className="w-5 h-5" />
                        <span>{t.share}</span>
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
        </>
    );
}