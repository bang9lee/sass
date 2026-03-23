import type { Metadata } from "next";
import ColorHomeClient from "@/components/color-home-client";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    const content = {
        ko: {
            title: "퍼스널 컬러 테스트 | FINDCORE",
            description: "나만의 퍼스널 컬러 시즌을 발견해보세요.",
        },
        en: {
            title: "Personal Color Test | FINDCORE",
            description: "Discover your true personal color season.",
        },
        zh: {
            title: "个人色彩测试 | FINDCORE",
            description: "探索属于你的个人色彩季型。",
        },
        ja: {
            title: "パーソナルカラー診断 | FINDCORE",
            description: "あなたのパーソナルカラーシーズンを見つけましょう。",
        },
    }[currentLang];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://findcore.me";
    const base = buildPageMetadata(currentLang, content, "/color");

    return {
        ...base,
        openGraph: {
            ...base.openGraph,
            images: [`${baseUrl}/images/personal_color_hero_v8.png`],
        },
        twitter: {
            ...base.twitter,
            images: [`${baseUrl}/images/personal_color_hero_v8.png`],
        },
    };
}

export default async function ColorLandingPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return (
        <div className="bg-black min-h-screen">
            <ColorHomeClient lang={currentLang} />
        </div>
    );
}
