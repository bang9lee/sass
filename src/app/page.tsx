import { Metadata } from 'next';
import HomeClient from '@/components/home-client';
import { resolveSupportedLang } from '@/lib/site-content';

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const currentLang = (['ko', 'en', 'zh', 'ja'].includes(lang || '') ? lang : 'en') as 'ko' | 'en' | 'zh' | 'ja';

  const metadataMap = {
    ko: {
      title: '나의 감성 타입 찾기 테스트',
      description: '나만의 시각적 분위기와 감성 타입을 찾아보세요.',
    },
    en: {
      title: 'Find My Aesthetic Core Test',
      description: 'Discover your unique visual atmosphere.',
    },
    zh: {
      title: '寻找我的美学类型 (Aesthetic Core Test)',
      description: '探索你独特的视觉氛围。',
    },
    ja: {
      title: '私の感性タイプ診断 (Aesthetic Core Test)',
      description: 'あなただけの視覚的な雰囲気を発見しましょう。',
    }
  };

  const meta = metadataMap[currentLang] || metadataMap.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://findcore.me';

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "Aesthetic Test", "Core Test", "미학 테스트", "감성 테스트", "분위기 테스트",
      "Dark Academia", "Cottagecore", "Y2K", "Cyberpunk", "Minimalism",
      "심리테스트", "MBTI", "성격테스트"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
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
          url: `${baseUrl}/images/hero.webp`,
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

export default async function Page({ searchParams }: Props) {
  const { lang } = await searchParams;
  const currentLang = resolveSupportedLang(lang);
  return <HomeClient lang={currentLang} />;
}
