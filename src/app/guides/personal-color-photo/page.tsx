import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getPersonalColorGuideCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getPersonalColorGuideCopy(currentLang), "/guides/personal-color-photo");
}

export default async function PersonalColorGuidePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getPersonalColorGuideCopy(currentLang);

    return <GuideArticle lang={currentLang} copy={copy} />;
}
