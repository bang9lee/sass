import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COLOR_RESULTS, getLocalizedColorResultContent, SubSeasonId } from '@/lib/color-data';
import { ColorResultCardClient } from '@/components/ColorResultCardClient';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { LayoutShell } from '@/components/layout-shell';
import { resolveSupportedLang } from '@/lib/site-content';

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string; shape?: string; gender?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    const result = COLOR_RESULTS[id as SubSeasonId];

    if (!result) {
        return { title: 'Not Found' };
    }

    const titleMap = {
        ko: `나의 퍼스널 컬러: ${result.title_ko}`,
        en: `My Personal Color: ${result.title}`,
        zh: `我的专属色彩: ${result.title_zh}`,
        ja: `私のパーソナルカラー: ${result.title_ja}`
    };
    const title = titleMap[currentLang] || titleMap.en;

    const descMap = {
        ko: result.description_ko,
        en: result.description,
        zh: result.description_zh,
        ja: result.description_ja
    };
    const description = descMap[currentLang] || descMap.en;

    const baseUrl = 'https://findcore.me';
    const ogImageUrl = result.image.startsWith('http')
        ? result.image
        : `${baseUrl}${result.image.startsWith('/') ? '' : '/'}${result.image}`;
    const currentPath = `/color/result/${id}`;

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

export default async function ColorResultPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { lang, gender } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const selectedGender = (gender === 'male' || gender === 'female' ? gender : 'female') as 'male' | 'female';

    const resultData = COLOR_RESULTS[id as SubSeasonId];

    if (!resultData) {
        notFound();
    }

    const content = getLocalizedColorResultContent(resultData.id, currentLang, selectedGender);

    if (!content) {
        notFound();
    }

    return (
        <AuroraBackground>
            <LayoutShell lang={currentLang}>
                <div className="flex flex-col min-h-screen w-full items-center justify-start p-4 md:p-8 overflow-y-auto">
                    <ColorResultCardClient
                        resultId={content.id}
                        title={content.title}
                        description={content.description}
                        image={content.image}
                        keywords={content.keywords}
                        bestColors={content.bestColors}
                        worstColors={content.worstColors}
                        lang={currentLang}
                        celebrities={content.celebrities}
                    />
                </div>
            </LayoutShell>
        </AuroraBackground>
    );
}
