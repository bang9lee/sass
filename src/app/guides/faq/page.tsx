import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getFaqGuideCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getFaqGuideCopy(currentLang), "/guides/faq");
}

export default async function GuidesFaqPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getFaqGuideCopy(currentLang);

    return <GuideArticle lang={currentLang} copy={copy} />;
}
