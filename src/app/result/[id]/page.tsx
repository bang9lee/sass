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
    const isKo = lang === 'ko';

    const aesthetic = AESTHETICS[id as AestheticId];

    if (!aesthetic) {
        return { title: 'Not Found' };
    }

    const title = isKo
        ? `나의 감성 타입: ${aesthetic.title_ko}`
        : `My Aesthetic Core is: ${aesthetic.title}`;
    const description = isKo ? aesthetic.description_ko : aesthetic.description;
    const ogImage = `/api/og?id=${id}&title=${encodeURIComponent(isKo ? aesthetic.title_ko : aesthetic.title)}`;

    return {
        title,
        description,
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
    const isKo = lang === 'ko';

    const aesthetic = AESTHETICS[id as AestheticId];

    if (!aesthetic) {
        notFound();
    }

    return (
        <AuroraBackground>
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8 w-full z-10">
                <ResultCardClient
                    resultId={aesthetic.id}
                    title={isKo ? aesthetic.title_ko : aesthetic.title}
                    archetype={isKo ? aesthetic.archetype_ko : aesthetic.archetype}
                    description={isKo ? aesthetic.description_ko : aesthetic.description}
                    image={aesthetic.image}
                    keywords={isKo ? aesthetic.keywords_ko : aesthetic.keywords}
                    brandMatches={aesthetic.brandMatches}
                    colorPalette={aesthetic.colorPalette}
                    isKo={isKo}
                    lang={lang || 'en'}
                />
            </div>
        </AuroraBackground>
    );
}
