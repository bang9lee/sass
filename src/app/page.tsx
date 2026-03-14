import { Metadata } from 'next';
import MainHomeClient from '@/components/main-home-client';
import { resolveSupportedLang } from '@/lib/site-content';

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';

  const metadataMap = {
    ko: {
      title: 'FINDCORE | AI 감성 & 스타일 분석 플랫폼',
      description: 'AI가 제안하는 당신만의 독창적인 에스테틱과 얼굴형, 퍼스널 컬러 분석을 경험해보세요.',
    },
    en: {
      title: 'FINDCORE | AI Aesthetic & Style Platform',
      description: 'Discover your unique aesthetic, face shape, and personal color with professional AI analysis.',
    },
    zh: {
      title: 'FINDCORE | AI 美学与风格平台',
      description: '通过专业的 AI 分析，探索您独特的美学类型、脸型和个人色彩。',
    },
    ja: {
      title: 'FINDCORE | AI 感性＆スタイル分析プラットフォーム',
      description: 'AIが提案するあなただけの独創的な感성、顔型、パーソナルカラー 분석を体験してください。',
    }
  };

  const meta = metadataMap[currentLang] || metadataMap.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://findcore.me';

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "FINDCORE", "Aesthetic Test", "Face Shape Analysis", "Personal Color", "AI Style",
      "에스테틱 테스트", "얼굴형 분석", "퍼스널 컬러", "AI 분석", "감성 분석"
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/?lang=${currentLang}`,
      siteName: 'FINDCORE',
      images: [
        {
          url: `${baseUrl}/images/hero.webp`,
          width: 800,
          height: 1000,
          alt: 'FINDCORE',
        },
      ],
      locale: currentLang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/hero.webp`],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { lang } = await searchParams;
  const currentLang = resolveSupportedLang(lang);
  return <MainHomeClient lang={currentLang} />;
}
