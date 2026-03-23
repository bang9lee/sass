import type { Metadata } from "next";
import { getLocalizedMagazinePreviews, MAGAZINE_ARTICLES } from "@/lib/magazine-content";
import { MagazineIndexClient } from "@/components/magazine-index-client";
import { resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    const titles = {
        ko: "FINDCORE 매거진 — 뷰티·패션·라이프스타일 트렌드",
        en: "FINDCORE Magazine — Beauty, Fashion & Lifestyle Trends",
        zh: "FINDCORE 杂志 — 美容·时尚·生活方式趋势",
        ja: "FINDCORE マガジン — ビューティー・ファッション・ライフスタイルトレンド",
    };

    const descriptions = {
        ko: "FINDCORE가 큐레이션한 감각적인 뷰티, 패션, 라이프스타일 트렌드 리포트. AI 뷰티 테크부터 퍼스널 컬러 스타일링까지.",
        en: "Sensory beauty, fashion, and lifestyle trend reports curated by FINDCORE. From AI beauty tech to personal colour styling.",
        zh: "FINDCORE 策划的感性美容、时尚和生活方式趋势报告。从 AI 美容科技到个人色彩穿搭。",
        ja: "FINDCOREがキュレーションした感覚的なビューティー、ファッション、ライフスタイルトレンドレポート。AIビューティーテクからパーソナルカラースタイリングまで。",
    };

    return {
        title: titles[currentLang],
        description: descriptions[currentLang],
        openGraph: {
            title: titles[currentLang],
            description: descriptions[currentLang],
            images: [{ url: MAGAZINE_ARTICLES[0]?.image || "/images/hero.webp" }],
        },
    };
}

export default async function MagazinePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    return <MagazineIndexClient lang={currentLang} articles={getLocalizedMagazinePreviews(currentLang)} />;
}
