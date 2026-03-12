import type { Metadata } from "next";
import FaceShapeResultContent from "@/components/FaceShapeResultContent";

interface Props {
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = (["ko", "en", "zh", "ja"].includes(lang || "") ? lang : "en") as "ko" | "en" | "zh" | "ja";

    const content = {
        ko: {
            title: "AI 얼굴형 분석 결과 | FINDCORE",
            description: "AI가 분석한 얼굴형 결과와 개인별 스타일 가이드를 확인하세요.",
        },
        en: {
            title: "AI Face Shape Result | FINDCORE",
            description: "View your AI-analyzed face shape and personalized style guide.",
        },
        zh: {
            title: "AI 脸型分析结果 | FINDCORE",
            description: "查看 AI 分析出的脸型结果与专属造型建议。",
        },
        ja: {
            title: "AI 顔型分析結果 | FINDCORE",
            description: "AI が分析した顔型結果と、あなた向けのスタイルガイドを確認できます。",
        },
    }[currentLang];

    return {
        title: content.title,
        description: content.description,
    };
}

export default function FaceShapeResultPage() {
    return <FaceShapeResultContent />;
}
