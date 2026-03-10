import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COLOR_RESULTS, SubSeasonId } from '@/lib/color-data';
import { ColorResultCardClient } from '@/components/ColorResultCardClient';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { LayoutShell } from '@/components/layout-shell';

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string; shape?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const { lang } = await searchParams;
    const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';

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
    };
}

export default async function ColorResultPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { lang, shape } = await searchParams;
    const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';
    const isKo = currentLang === 'ko';

    const resultData = COLOR_RESULTS[id as SubSeasonId];

    if (!resultData) {
        notFound();
    }

    const content = {
        title: { ko: resultData.title_ko, zh: resultData.title_zh, ja: resultData.title_ja, en: resultData.title }[currentLang] || resultData.title,
        description: { ko: resultData.description_ko, zh: resultData.description_zh, ja: resultData.description_ja, en: resultData.description }[currentLang] || resultData.description,
        keywords: { ko: resultData.keywords_ko, zh: resultData.keywords_zh, ja: resultData.keywords_ja, en: resultData.keywords }[currentLang] || resultData.keywords,
        subtitle: { ko: 'Personal Color', zh: 'Personal Color', ja: 'Personal Color', en: 'Personal Color' }[currentLang] || 'Personal Color',
    };

    return (
        <AuroraBackground>
            <LayoutShell lang={currentLang}>
                <div className="flex flex-col min-h-screen w-full items-center justify-start p-4 md:p-8 overflow-y-auto">
                    <ColorResultCardClient
                        resultId={resultData.id}
                        title={content.title}
                        description={content.description}
                        image={resultData.image}
                        keywords={content.keywords}
                        bestColors={resultData.bestColors}
                        worstColors={resultData.worstColors}
                        isKo={isKo}
                        lang={currentLang}
                    />
                </div>
            </LayoutShell>
        </AuroraBackground>
    );
}
