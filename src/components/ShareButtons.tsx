"use client";

import { useState } from 'react';
import { Download, Check, Link2 } from 'lucide-react';

interface ShareButtonsProps {
    resultId: string;
    title: string;
    isKo: boolean;
    aestheticImage: string;
}

export function ShareButtons({ resultId, title, isKo, aestheticImage }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/result/${resultId}?lang=${isKo ? 'ko' : 'en'}`
        : '';

    const handleShare = async () => {
        const shareData = {
            title: isKo ? `나의 에스테틱 코어: ${title}` : `My Aesthetic Core: ${title}`,
            url: shareUrl,
        };

        // Try native share first (mobile)
        if (navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // User cancelled or error - fall through to clipboard
            }
        }

        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Last resort: show prompt
            prompt(isKo ? '링크를 복사하세요:' : 'Copy this link:', shareUrl);
        }
    };

    const handleDownloadImage = async () => {
        setDownloading(true);
        try {
            // Fetch the actual aesthetic result image
            const response = await fetch(aestheticImage);
            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aesthetic-core-${resultId}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch {
            console.error('Download failed');
            // Fallback: open image in new tab
            window.open(aestheticImage, '_blank');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className={`grid grid-cols-2 gap-3 ${isKo ? '' : 'font-cinzel'}`}>
            {/* Share Link Button */}
            <button
                onClick={handleShare}
                className="col-span-1 py-3 px-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors active:scale-95"
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{isKo ? '복사됨!' : 'Copied!'}</span>
                    </>
                ) : (
                    <>
                        <Link2 className="w-4 h-4" />
                        <span>{isKo ? '링크 공유' : 'Share Link'}</span>
                    </>
                )}
            </button>

            {/* Download Image Button */}
            <button
                onClick={handleDownloadImage}
                disabled={downloading}
                className="col-span-1 py-3 px-4 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
            >
                <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                <span>{downloading ? (isKo ? '저장중...' : 'Saving...') : (isKo ? '이미지 저장' : 'Save Image')}</span>
            </button>
        </div>
    );
}
