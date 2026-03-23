import { Metadata } from 'next';
import HomeClient from '@/components/home-client';
import { buildPageMetadata, resolveSupportedLang } from '@/lib/site-content';

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const currentLang = resolveSupportedLang(lang);

  const metadataMap = {
    ko: {
      title: '에스테틱 코어 테스트 | FINDCORE',
      description: '나만의 시각적 분위기와 감성 타입을 찾아보세요.',
    },
    en: {
      title: 'Aesthetic Core Test | FINDCORE',
      description: 'Discover your unique visual atmosphere.',
    },
    zh: {
      title: '美学类型测试 | FINDCORE',
      description: '探索你独特的视觉氛围。',
    },
    ja: {
      title: '感性タイプ診断 | FINDCORE',
      description: 'あなただけの視覚的な雰囲気を見つけましょう。',
    }
  };

  const meta = metadataMap[currentLang] || metadataMap.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://findcore.me';
  const base = buildPageMetadata(currentLang, meta, "/aesthetic");

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [`${baseUrl}/images/hero.webp`],
    },
    twitter: {
      ...base.twitter,
      images: [`${baseUrl}/images/hero.webp`],
    },
  };
}

export default async function AestheticPage({ searchParams }: Props) {
  const { lang } = await searchParams;
  const currentLang = resolveSupportedLang(lang);
  return (
    <div className="bg-black min-h-screen">
      <HomeClient lang={currentLang} />
    </div>
  );
}
