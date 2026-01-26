import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AESTHETICS, AestheticId } from '@/lib/data';
import { ResultCardClient } from '@/components/ResultCardClient';
import { AuroraBackground } from '@/components/ui/aurora-background';

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';

    const aesthetic = AESTHETICS[id as AestheticId];

    if (!aesthetic) {
        return { title: 'Not Found' };
    }

    const titleMap = {
        ko: `나의 감성 타입: ${aesthetic.title_ko}`,
        en: `My Aesthetic Core is: ${aesthetic.title}`,
        zh: `我的美学类型: ${aesthetic.title_zh}`,
        ja: `私の感性タイプ: ${aesthetic.title_ja}`
    };
    const title = titleMap[currentLang] || titleMap.en;

    const descMap = {
        ko: aesthetic.description_ko,
        en: aesthetic.description,
        zh: aesthetic.description_zh,
        ja: aesthetic.description_ja
    };
    const description = descMap[currentLang] || descMap.en;

    // Use English title for OG Image for better compatibility, or localized if supported
    const ogTitle = currentLang === 'ko' ? aesthetic.title_ko : aesthetic.title;
    const ogImage = `/api/og?id=${id}&title=${encodeURIComponent(ogTitle)}`;
    const baseUrl = 'https://aesthetic-core.vercel.app';
    const currentPath = `/result/${id}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}${currentPath}`,
            languages: {
                'ko': `${baseUrl}${currentPath}?lang=ko`,
                'en': `${baseUrl}${currentPath}?lang=en`,
                'zh': `${baseUrl}${currentPath}?lang=zh`,
                'ja': `${baseUrl}${currentPath}?lang=ja`,
            },
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function ResultPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';
    const isKo = currentLang === 'ko';

    const aesthetic = AESTHETICS[id as AestheticId];

    if (!aesthetic) {
        notFound();
    }

    const content = {
        title: { ko: aesthetic.title_ko, zh: aesthetic.title_zh, ja: aesthetic.title_ja, en: aesthetic.title }[currentLang] || aesthetic.title,
        archetype: { ko: aesthetic.archetype_ko, zh: aesthetic.archetype_zh, ja: aesthetic.archetype_ja, en: aesthetic.archetype }[currentLang] || aesthetic.archetype,
        description: { ko: aesthetic.description_ko, zh: aesthetic.description_zh, ja: aesthetic.description_ja, en: aesthetic.description }[currentLang] || aesthetic.description,
        keywords: { ko: aesthetic.keywords_ko, zh: aesthetic.keywords_zh, ja: aesthetic.keywords_ja, en: aesthetic.keywords }[currentLang] || aesthetic.keywords,
    };

    return (
        <AuroraBackground>
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8 w-full z-10">
                <ResultCardClient
                    resultId={aesthetic.id}
                    title={content.title}
                    archetype={content.archetype}
                    description={content.description}
                    image={aesthetic.image}
                    keywords={content.keywords}
                    brandMatches={aesthetic.brandMatches}
                    colorPalette={aesthetic.colorPalette}
                    isKo={isKo}
                    lang={currentLang}
                />
            </div>
        </AuroraBackground>
    );
}
