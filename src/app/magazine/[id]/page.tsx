import { getLocalizedMagazineArticle } from "@/lib/magazine-content";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MagazineArticleClient } from "@/components/magazine-article-client";
import { resolveSupportedLang } from "@/lib/site-content";

interface MagazinePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: MagazinePageProps): Promise<Metadata> {
    const { id } = await params;
    const { lang: langParam } = await searchParams;
    const lang = resolveSupportedLang(langParam);
    const article = getLocalizedMagazineArticle(id, lang);

    if (!article) return { title: 'Article Not Found' };

    return {
        title: article.metaTitle,
        description: article.metaDescription,
        openGraph: {
            title: article.metaTitle,
            description: article.metaDescription,
            images: [{ url: article.image }],
        },
    };
}

export default async function MagazineArticlePage({ params, searchParams }: MagazinePageProps) {
    const { id } = await params;
    const { lang: langParam } = await searchParams;
    const lang = resolveSupportedLang(langParam);
    const article = getLocalizedMagazineArticle(id, lang);

    if (!article) {
        notFound();
    }

    return <MagazineArticleClient article={article} lang={lang} />;
}
