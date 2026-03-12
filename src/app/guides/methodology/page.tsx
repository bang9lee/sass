import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getMethodologyGuideCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getMethodologyGuideCopy(currentLang), "/guides/methodology");
}

export default async function MethodologyGuidePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getMethodologyGuideCopy(currentLang);

    return <GuideArticle lang={currentLang} copy={copy} />;
}
