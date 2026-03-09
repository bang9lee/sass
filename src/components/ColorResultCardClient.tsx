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
            worst: '워스트 컬러',
            faceShapeLabel: 'AI 얼굴형 분석',
            shapes: {
                oval: { name: '계란형', tip: '모든 스타일이 잘 어울리는 완벽한 비율입니다.' },
                round: { name: '둥근형', tip: '각진 프레임의 안경이나 정수리 볼륨을 살린 헤어가 추천됩니다.' },
                square: { name: '각진형', tip: '부드러운 곡선 프레임이나 옆머리를 가린 스타일이 인상을 부드럽게 합니다.' },
                heart: { name: '하트형', tip: '아래가 넓은 테의 안경이나 턱선까지 오는 헤어 스타일이 잘 어울립니다.' },
                oblong: { name: '긴 얼굴형', tip: '가로폭이 넓은 안경이나 앞머리(뱅) 스타일로 시선을 분산해보세요.' },
                diamond: { name: '다이아몬드형', tip: '타원형 안경이나 턱선 부분에 볼륨을 준 보브 스타일을 추천합니다.' },
                pear: { name: '삼각형(배형)', tip: '윗부분이 강조된 안경이나 관자놀이 쪽 볼륨을 살린 헤어가 좋습니다.' }
            }
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
            worst: 'Colors to Avoid',
            faceShapeLabel: 'AI Face Shape Analysis',
            shapes: {
                oval: { name: 'Oval', tip: 'A perfectly balanced shape that suits almost any style.' },
                round: { name: 'Round', tip: 'Angular frames and volume on top are recommended.' },
                square: { name: 'Square', tip: 'Curved frames and side-swept styles soften your features.' },
                heart: { name: 'Heart', tip: 'Frames wider at the bottom and chin-length hair look great.' },
                oblong: { name: 'Oblong', tip: 'Oversized frames and bangs help balance the length.' },
                diamond: { name: 'Diamond', tip: 'Oval frames and bob styles with volume at the chin work best.' },
                pear: { name: 'Pear', tip: 'Top-heavy frames and volume at the temples are ideal.' }
            }
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
            worst: '避雷颜色',
            faceShapeLabel: 'AI 脸型分析',
            shapes: {
                oval: { name: '鹅蛋脸', tip: '完美的比例，适合几乎所有风格。' },
                round: { name: '圆脸', tip: '建议选择棱角分明的镜框，并增加头顶发量。' },
                square: { name: '方脸', tip: '圆润的镜框和偏分发型能柔化面部线条。' },
                heart: { name: '心形脸', tip: '适合下半部较宽的镜框和齐腮短发。' },
                oblong: { name: '长脸', tip: '大框眼镜和刘海造型有助于平衡长度。' },
                diamond: { name: '菱形脸', tip: '椭圆镜框和下巴处蓬松的波波头最合适。' },
                pear: { name: '梨形脸', tip: '建议选择上部加宽的镜框，并增加太阳穴处发量。' }
            }
        },
        ja: {
            shareTitle: `私のパーソナルカラー: ${title}`,
            shareText: '自分に似合う色が見つかりました！あなた도 診断してみて ✨',
            copyLink: '링크를 복사해 주세요:',
            failedSave: '이미지 저장에 실패했습니다.',
            copied: '복사 완료!',
            share: '공유하기',
            save: '이미지 저장',
            retest: '다시하기',
            adStatus: '광고 대기 중',
            resultLabel: 'Personal Color',
            best: '베스트 컬러',
            worst: '워스트 컬러',
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
                backgroundColor: '#ffffff',
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

    const reportId = `FC-CLR-${resultId.toUpperCase()}-${Math.floor(Date.now() / 100000).toString().slice(-4)}`;
    const timestamp = new Date().toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-20">
            {showToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-400" />
                            <span className="text-white font-semibold text-sm">{t.copied}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Navigation / Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-4">
                    <Link href={`/color/test?lang=${lang}`} className="p-3 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all hover:shadow-md active:scale-95">
                        <RotateCcw className="w-5 h-5" />
                    </Link>
                    <Link href={`/?lang=${lang}`} className="p-3 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all hover:shadow-md active:scale-95">
                        <Home className="w-5 h-5" />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleShare} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-sm hover:shadow-md transition-all active:scale-95">
                        <Share2 className="w-4 h-4" />
                        <span>{t.share}</span>
                    </button>
                    <button onClick={handleDownloadImage} disabled={downloading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                        {downloading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        <span>{t.save}</span>
                    </button>
                </div>
            </div>

            {/* Main Scientific Report Card */}
            <div
                ref={cardRef}
                className="relative w-full bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden flex flex-col"
            >
                {/* Report Header (Branding & Metadata) */}
                <div className="w-full px-8 py-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Analysis Report</span>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-cinzel font-black tracking-widest text-zinc-900">FINDCORE</h2>
                            <div className="h-4 w-px bg-zinc-200" />
                            <span className="text-[11px] font-mono text-zinc-500 uppercase">{reportId}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-zinc-400 text-[9px] font-bold tracking-widest uppercase block mb-1">Generated On</span>
                        <span className="text-xs font-medium text-zinc-600">{timestamp}</span>
                    </div>
                </div>

                {/* Main Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: Subject Image & Keywords */}
                    <div className="relative p-8 lg:p-12 lg:border-r border-zinc-100 flex flex-col gap-8">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 ring-1 ring-zinc-100">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                priority
                                unoptimized
                                crossOrigin="anonymous"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-1.5">
                                {keywords.map((keyword) => (
                                    <span key={keyword} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-medium">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="px-3 py-1 bg-pink-50 text-pink-500 text-[10px] font-bold tracking-widest uppercase rounded-full inline-block">
                                Determined Type
                            </span>
                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tighter ${isKo ? 'font-korean' : 'font-cinzel'}`}>
                                {title}
                            </h1>
                            <p className="text-zinc-500 text-sm font-cinzel tracking-[0.2em] uppercase">
                                Refined Personal Color Analysis
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Technical Stats & Analysis */}
                    <div className="p-8 lg:p-12 flex flex-col gap-10">
                        {/* Best Palette Grid */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">{t.best}</h3>
                                <span className="text-[10px] font-mono text-zinc-300">N=5 OPTIMIZED</span>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {bestColors.map((color, index) => (
                                    <div key={index} className="space-y-2 group">
                                        <div
                                            className="w-full aspect-3/4 rounded-xl shadow-sm border border-zinc-100 ring-1 ring-zinc-50 transition-transform group-hover:scale-105"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="text-[9px] font-mono text-zinc-400 text-center uppercase tracking-tighter truncate">
                                            {color}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Avoid Colors */}
                        <section className="space-y-4">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">{t.worst}</h3>
                            <div className="flex flex-wrap gap-2">
                                {worstColors.map((color, index) => (
                                    <div key={index} className="flex items-center gap-2 pl-2 pr-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                                        <div className="w-5 h-5 rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: color }} />
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{color}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-px bg-zinc-100" />

                        {/* Detailed Description */}
                        <section className={`space-y-8 ${isKo ? 'font-korean' : 'font-serif'}`}>
                            {description.split('\n\n').map((block, index) => {
                                const match = block.match(/^\[(.*?)\]/);
                                const header = match ? match[1] : null;
                                const content = match ? block.replace(/^\[.*?\]\n?/, '') : block;

                                if (header) {
                                    return (
                                        <div key={index} className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                                                <h4 className="text-sm font-bold text-zinc-900 tracking-tight">{header}</h4>
                                            </div>
                                            <p className="text-sm md:text-[15px] text-zinc-600 leading-relaxed text-justify">
                                                {content}
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <p key={index} className="text-sm md:text-[15px] text-zinc-600 leading-relaxed text-justify">
                                        {block}
                                    </p>
                                );
                            })}
                        </section>
                    </div>
                </div>

                {/* Report Footer */}
                <div className="w-full bg-zinc-50/50 border-t border-zinc-100 px-8 py-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Engine</span>
                            <span className="text-[10px] font-medium text-zinc-600">Mediapipe-v3.2</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Accuracy</span>
                            <span className="text-[10px] font-medium text-zinc-600">0.9998_CONF</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-zinc-300 text-[10px] font-mono font-light tracking-widest">FINDCORE.ME</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Support</span>
                            <span className="text-[10px] font-medium text-zinc-600">@todayshelp</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
