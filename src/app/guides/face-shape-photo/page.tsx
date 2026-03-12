import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-article";
import { getFaceShapeGuideCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getFaceShapeGuideCopy(currentLang), "/guides/face-shape-photo");
}

export default async function FaceShapeGuidePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getFaceShapeGuideCopy(currentLang);

    return <GuideArticle lang={currentLang} copy={copy} />;
}
