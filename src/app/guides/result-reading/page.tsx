import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getResultReadingGuideCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getResultReadingGuideCopy(currentLang), "/guides/result-reading");
}

export default async function ResultReadingGuidePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getResultReadingGuideCopy(currentLang);

    return <GuideArticle lang={currentLang} copy={copy} />;
}
