import { MAGAZINE_ARTICLES } from "@/lib/magazine-content";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MagazineArticleClient } from "@/components/magazine-article-client";

interface MagazinePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: MagazinePageProps): Promise<Metadata> {
    const { id } = await params;
    const { lang: langParam } = await searchParams;
    const lang = (langParam as "ko" | "en" | "zh" | "ja") || "ko";
    const article = MAGAZINE_ARTICLES.find((a) => a.id === id);

    if (!article) return { title: 'Article Not Found' };

    return {
        title: article.metaTitle[lang],
        description: article.metaDescription[lang],
        openGraph: {
            title: article.metaTitle[lang],
            description: article.metaDescription[lang],
            images: [{ url: article.image }],
        },
    };
}

export default async function MagazineArticlePage({ params }: MagazinePageProps) {
    const { id } = await params;
    const article = MAGAZINE_ARTICLES.find((a) => a.id === id);

    if (!article) {
        notFound();
    }

    return <MagazineArticleClient article={article} />;
}
