import type { Metadata } from "next";
import FaceShapeHomeClient from "@/components/face-shape-home-client";

interface Props {
    searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = (["ko", "en", "zh", "ja"].includes(lang || "") ? lang : "en") as "ko" | "en" | "zh" | "ja";

    const content = {
        ko: {
            title: "AI 얼굴형 분석 | FINDCORE",
            description: "사진을 업로드해 비율, 랜드마크, 스타일 가이드를 포함한 AI 얼굴형 분석을 받아보세요.",
        },
        en: {
            title: "AI Face Shape Analysis | FINDCORE",
            description: "Upload your photo for detailed AI face shape analysis with measured proportions, landmarks, and style guidance.",
        },
        zh: {
            title: "AI 脸型分析 | FINDCORE",
            description: "上传照片，获取包含比例测量、关键点与造型建议的 AI 脸型分析报告。",
        },
        ja: {
            title: "AI 顔型分析 | FINDCORE",
            description: "写真をアップロードして、比率計測・ランドマーク・スタイル提案を含む AI 顔型分析を受け取りましょう。",
        },
    }[currentLang];

    return {
        title: content.title,
        description: content.description,
    };
}

export default function FaceShapePage() {
    return <FaceShapeHomeClient />;
}
