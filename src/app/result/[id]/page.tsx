import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AESTHETICS, AestheticId, getLocalizedAestheticContent } from '@/lib/data';
import { ResultCardClient } from '@/components/ResultCardClient';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { LayoutShell } from '@/components/layout-shell';
import { resolveSupportedLang } from '@/lib/site-content';

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

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

    // Use static image for better performance and reliability
    const baseUrl = 'https://findcore.me';
    // Remove query params if image url has them, ensure absolute url
    const ogImageUrl = aesthetic.image.startsWith('http')
        ? aesthetic.image
        : `${baseUrl}${aesthetic.image.startsWith('/') ? '' : '/'}${aesthetic.image}`;

    const currentPath = `/result/${id}`;

    return {
        metadataBase: new URL(baseUrl),
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
                    url: ogImageUrl,
                    width: 800,
                    height: 1000,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

export default async function ResultPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    const aesthetic = AESTHETICS[id as AestheticId];

    if (!aesthetic) {
        notFound();
    }

    const content = getLocalizedAestheticContent(aesthetic.id, currentLang);

    if (!content) {
        notFound();
    }

    return (
        <AuroraBackground>
            <LayoutShell lang={currentLang}>
                <div className="flex flex-col min-h-screen w-full items-center justify-start p-4 md:p-8 overflow-y-auto">
                    <ResultCardClient
                        resultId={content.id}
                        title={content.title}
                        archetype={content.archetype}
                        description={content.description}
                        image={content.image}
                        keywords={content.keywords}
                        colorPalette={content.colorPalette}
                        lang={currentLang}
                    />
                </div>
            </LayoutShell>
        </AuroraBackground>
    );
}
