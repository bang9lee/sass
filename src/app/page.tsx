import { Metadata } from 'next';
import HomeClient from '@/components/home-client';

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';

  const metadataMap = {
    ko: {
      title: '나의 감성 타입 찾기 테스트 (Aesthetic Core)',
      description: '나만의 시각적 분위기와 감성 타입을 찾아보세요. 당신은 Dark Academia일까요, 아니면 Y2K일까요?',
    },
    en: {
      title: 'Find My Aesthetic Core Test',
      description: 'Discover your unique visual atmosphere. Are you Dark Academia, Cottagecore, or Y2K?',
    },
    zh: {
      title: '寻找我的美学类型 (Aesthetic Core Test)',
      description: '探索你独特的视觉氛围。你是黑暗学院风 (Dark Academia) 还是 Y2K 千禧辣妹？',
    },
    ja: {
      title: '私の感性タイプ診断 (Aesthetic Core Test)',
      description: 'あなただけの視覚的な雰囲気を発見しましょう。ダークアカデミア？それともY2K？',
    }
  };

  const meta = metadataMap[currentLang] || metadataMap.en;
  const baseUrl = 'https://aesthetic-core.vercel.app';

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: baseUrl,
      languages: {
        'ko': `${baseUrl}/?lang=ko`,
        'en': `${baseUrl}/?lang=en`,
        'zh': `${baseUrl}/?lang=zh`,
        'ja': `${baseUrl}/?lang=ja`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/?lang=${currentLang}`,
      siteName: 'Aesthetic Core Test',
      images: [
        {
          url: `${baseUrl}/images/hero.webp`, // Use optimized image
          width: 800,
          height: 1000,
          alt: meta.title,
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

export default function Page() {
  return <HomeClient />;
}
