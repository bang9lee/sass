import type { Metadata } from "next";
import ColorHomeClient from "@/components/color-home-client";
import { resolveSupportedLang } from "@/lib/site-content";

export const metadata: Metadata = {
    title: "Personal Color Test | findcore.me",
    description: "Discover your true personal color season.",
};

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export default async function ColorLandingPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return <ColorHomeClient lang={currentLang} />;
}
