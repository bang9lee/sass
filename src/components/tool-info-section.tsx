import React from 'react';
import { SupportedLang } from '@/lib/site-content';

interface ToolInfoSectionProps {
  lang: SupportedLang;
  type: 'aesthetic' | 'color' | 'face-shape' | 'makeup';
}

const content = {
  aesthetic: {
    ko: {
      title: "에스테틱 분석의 과학적 배경",
      subtitle: "비율과 조화의 미학",
      text: "아름다움에 대한 인식은 단순한 주관을 넘어 수학적 비율과 깊은 연관이 있습니다. 고대 그리스부터 현대 미학에 이르기까지, 인체와 얼굴의 황금비(1:1.618)는 시각적 안정감과 조화를 판단하는 주요 척도로 활용되어 왔습니다. FINDCORE의 에스테틱 분석은 얼굴의 상/중/하안부 비율(신고전주의 규범)과 이목구비의 대비감을 분석하여, 당신이 가진 고유한 시각적 분위기를 정의합니다. 이는 단순한 외모 평가가 아니라, 자신의 개성이 가장 돋보이는 스타일링 방향성을 찾기 위한 기초 자료가 됩니다.",
      details: [
        "신고전주의 안면 비율: 이마에서 눈썹, 눈썹에서 코끝, 코끝에서 턱끝까지의 1:1:1 조화",
        "대비감 분석: 피부톤과 이목구비 색의 명도 차이에 따른 이미지 유형 분류",
        "비율 기반 스타일링: 얼굴의 가로/세로 비율에 따른 최적화된 헤어 및 메이크업 가이드"
      ]
    },
    en: {
      title: "Scientific Background of Aesthetic Analysis",
      subtitle: "The Aesthetics of Proportion and Harmony",
      text: "The perception of beauty transcends simple subjectivity and is deeply linked to mathematical proportions. From ancient Greece to modern aesthetics, the Golden Ratio (1:1.618) of the human body and face has served as a primary measure of visual stability and harmony. FINDCORE's aesthetic analysis examines the proportions of the upper, middle, and lower face (Neoclassical Canons) along with the contrast of facial features to define your unique visual atmosphere. This is not a simple evaluation of appearance, but a foundational guide to finding the styling direction where your individuality shines most.",
      details: [
        "Neoclassical Facial Canons: The 1:1:1 harmony from forehead to brow, brow to nose tip, and nose tip to chin.",
        "Contrast Analysis: Classification of image types based on the value difference between skin tone and facial features.",
        "Proportion-Based Styling: Optimized hair and makeup guides based on horizontal and vertical facial ratios."
      ]
    },
    zh: {
      title: "美学分析的科学背景",
      subtitle: "比例与和谐的美学",
      text: "对美的感知不仅是主观的，还与数学比例有着深刻的联系。从古希腊到现代美学，人体和面部的黄金比例（1:1.618）一直是判断视觉稳定度与和谐感的主要尺度。FINDCORE的美学分析通过测量面部上、中、下三分之一的比例（新古典主义规范）以及五官的对比度，来定义您独特的视觉氛围。这并非简单的样貌评价，而是为您寻找最能凸显个性的造型方向而提供的基础参考资料。",
      details: [
        "新古典主义面部分区：额头到眉心、眉心到鼻尖、鼻尖到下颚的1:1:1和谐感",
        "对比度分析：根据肤色与五官色彩的明度差异进行形象类型分类",
        "基于比例的造型：根据面部横向/纵向比例提供的优化发型与妆容指南"
      ]
    },
    ja: {
      title: "感性分析の科学的背景",
      subtitle: "比率と調和の美学",
      text: "美しさに対する認識は単なる主観を超え、数学的な比率と深い関わりがあります。古代ギリシャから現代美学に至るまで、人体と顔の黄金比（1:1.618）は視覚的な安定感と調和を判断する主要な尺度として活用されてきました。FINDCOREの感性分析は、顔の上/中/下顔部の比率（新古典主義規範）と目鼻立ちのコントラストを分析し、あなたが持つ固有の視覚的な雰囲気を定義します。これは単なる外見の評価ではなく、自分の個性が最も際立つスタイリングの方向性を見つけるための基礎資料となります。",
      details: [
        "新古典主義の顔面比率：額から眉、眉から鼻先、鼻先から顎先までの1:1:1の調和",
        "コントラスト分析：肌のトーンと目鼻立ちの色の明度差によるイメージタイプの分類",
        "比率ベースのスタイリング：顔の横/縦比率に応じた最適化されたヘア＆メイクアップガイド"
      ]
    }
  },
  color: {
    ko: {
      title: "퍼스널 컬러의 과학",
      subtitle: "색채 이론과 피부 과학의 만남",
      text: "퍼스널 컬러 분석의 이론적 토대는 알버트 먼셀(Albert Munsell)의 색 체계와 요하네스 이텐(Johannes Itten)의 색채 이론입니다. 이는 개인의 피부, 머리카락, 눈동자 색상이 특정 색 팔레트와 만났을 때 생기는 광학적 현상을 활용합니다. 피부 속 멜라닌(Melanin), 헤모글로빈(Hemoglobin), 카로틴(Carotene)의 분포에 따라 결정되는 언더톤(Undertone)을 분석하여, 안색을 가장 맑고 건강하게 보이게 하는 색상을 도출합니다. 4시즌(봄, 여름, 가을, 겨울) 체계를 넘어 온도(Hue), 명도(Value), 채도(Chroma)의 세 가지 차원으로 정밀하게 분석합니다.",
      details: [
        "먼셀 색 체계 기반: 명도(Value)와 채도(Chroma)를 기준으로 한 정밀 측정",
        "피부 언더톤 과학: 광산란 원리를 이용한 웜(Warm) 및 쿨(Cool) 톤 판별",
        "광학적 조화: 색채 대비 효과를 활용하여 결점은 보완하고 장점은 강조하는 색상 매칭"
      ]
    },
    en: {
      title: "The Science of Personal Colour",
      subtitle: "Where Colour Theory Meets Dermatology",
      text: "The theoretical foundation of personal colour analysis lies in Albert Munsell's colour system and Johannes Itten's colour theory. It utilizes optical phenomena that occur when an individual's skin, hair, and eye colours interact with specific colour palettes. By analysing the Undertone determined by the distribution of melanin, hemoglobin, and carotene in the skin, we derive colours that make the complexion appear clearest and healthiest. Moving beyond the basic 4-season system (Spring, Summer, Autumn, Winter), we perform precise analysis across three dimensions: Hue (Temperature), Value (Lightness), and Chroma (Saturation).",
      details: [
        "Based on Munsell Colour System: Precise measurement using Value and Chroma as standards.",
        "Skin Undertone Science: Identification of Warm and Cool tones using light scattering principles.",
        "Optical Harmony: Colour matching that utilizes contrast effects to hide flaws and highlight strengths."
      ]
    },
    zh: {
      title: "个人色彩的科学",
      subtitle: "色彩理论与皮肤科学的结合",
      text: "个人色彩分析的理论基础源于阿尔伯特·门塞尔（Albert Munsell）的色彩体系和约翰内斯·伊顿（Johannes Itten）的色彩理论。它利用个人的皮肤、头发和眼睛颜色与特定色板结合时产生的光学现象。通过分析由皮肤内黑色素（Melanin）、血红蛋白（Hemoglobin）和胡萝卜素（Carotene）分布决定的底色调（Undertone），归纳出让气色看起来最透亮、最健康的颜色。超越传统的四季体系（春、夏、秋、冬），通过色相（温度）、明度（亮度）、彩度（饱和度）三个维度进行精确分析。",
      details: [
        "基于门塞尔色彩体系：以明度（Value）和彩度（Chroma）为基准的精确测量",
        "肤色底调科学：利用光散射原理判别暖色调（Warm）与冷色调（Cool）",
        "光学和谐：利用色彩对比效应补足缺点、强调优点的色彩搭配"
      ]
    },
    ja: {
      title: "パーソナルカラーの科学",
      subtitle: "色彩理論と皮膚科学の出会い",
      text: "パーソナルカラー分析の理論的基盤は、アルバート・マンセル（Albert Munsell）の色体系とヨハネス・イッテン（Johannes Itten）の色彩理論です。これは、個人の肌、髪、瞳の色が特定のカラーパレットと出会った時に生じる光学的現象を活用します。肌内部のメラニン（Melanin）、ヘモグロビン（Hemoglobin）、カロテン（Carotene）の分布によって決定されるアンダートーン（Undertone）を分析し、顔色を最も明るく健康に見せる色を導き出します。4シーズン（春、夏、秋、冬）体系を超え、温度（Hue）、明度（Value）、彩度（Chroma）の3つの次元で精密に分析します。",
      details: [
        "マンセル色体系ベース：明度（Value）と彩度（Chroma）を基準とした精密測定",
        "肌のアンダートーン科学：光散乱原理を利用したウォーム（Warm）及びクール（Cool）トーンの判別",
        "光学的調和：色彩対比効果を活用して欠点を補い、長所を強調するカラーマッチング"
      ]
    }
  },
  'face-shape': {
    ko: {
      title: "AI 얼굴형 분석 가이드",
      subtitle: "기하학적 분석과 스타일의 조화",
      text: "얼굴형 분석은 단순히 이미지를 분류하는 것을 넘어, 얼굴의 가로/세로 비율과 턱선, 광대의 위치 등 기하학적 요소들을 정밀하게 측정하는 과정입니다. 인간의 얼굴은 크게 7가지(타원형, 둥근형, 각진형, 하트형, 다이아몬드형, 긴형, 삼각형) 기본 형태로 나뉩니다. FINDCORE의 AI는 랜드마크 감지 기술을 통해 얼굴의 핵심 포인트를 추출하고, 각 부위 간의 비율을 계산하여 가장 정확한 얼굴형을 판별합니다. 이를 통해 당신의 장점을 살리고 단점을 보완할 수 있는 헤어스타일, 안경테, 액세서리 가이드를 제공합니다.",
      details: [
        "랜드마크 감지: 얼굴의 핵심 좌표를 추출하여 정밀한 거리 및 각도 계산",
        "기하학적 분류: 이마, 광대, 턱의 상대적 너비를 분석하여 형태 판별",
        "데이터 기반 가이드: 수만 개의 스타일링 데이터를 기반으로 한 얼굴형 맞춤 추천"
      ]
    },
    en: {
      title: "AI Face Shape Analysis Guide",
      subtitle: "Harmony Between Geometric Analysis and Style",
      text: "Face shape analysis goes beyond simple image classification; it is a process of precisely measuring geometric elements such as horizontal/vertical ratios, jawline, and cheekbone positions. Human faces are broadly divided into 7 basic shapes: Oval, Round, Square, Heart, Diamond, Oblong, and Triangle. FINDCORE's AI extracts key facial points through landmark detection technology and calculates proportions between each part to determine the most accurate face shape. This provides hair, eyewear, and accessory guides to highlight your strengths and balance your features.",
      details: [
        "Landmark Detection: Extracting key facial coordinates for precise distance and angle calculation.",
        "Geometric Classification: Analysing relative widths of forehead, cheekbones, and jaw to determine shape.",
        "Data-Driven Guide: Tailored recommendations based on tens of thousands of styling data points."
      ]
    },
    zh: {
      title: "AI 脸型分析指南",
      subtitle: "几何分析与风格的和谐",
      text: "脸型分析不仅是简单的图像分类，而是精确测量面部横向/纵向比例、下颌线、颧骨位置等几何要素的过程。人类脸型大致分为7种基本形状（椭圆形、圆形、方形、心形、菱形、长形、三角形）。FINDCORE的AI通过关键点检测技术提取面部核心点，并计算各部分之间的比例，判别出最准确的脸型。通过这些数据，为您提供能扬长避短的发型、眼镜盒装饰品指南。",
      details: [
        "关键点检测：提取面部核心坐标，进行精确的距离与角度计算",
        "几何分类：通过分析额头、颧骨、下颌的相对宽度来判定形状",
        "基于数据的指南：基于数万条造型数据提供的脸型定制化推荐"
      ]
    },
    ja: {
      title: "AI 顔型分析ガイド",
      subtitle: "幾何学的分析とスタイルの調和",
      text: "顔型分析は単にイメージを分類するだけでなく、顔の横/縦比率や顎のライン、頬骨の位置など幾何学的な要素を精密に測定するプロセスです。人間の顔は大きく7種類（卵型、丸型、四角型、ハート型、ダイヤモンド型、面長、三角形）の基本形に分けられます。FINDCOREのAIはランドマーク検出技術を通じて顔の核心ポイントを抽出し、各部位間の比率を計算して最も正確な顔型を判別します。これにより、あなたの長所を活かし短所を補うことができるヘアスタイル、メガネ、アクセサリのガイドを提供します。",
      details: [
        "ランドマーク検出：顔の核心座標を抽出して精密な距離及び角度計算",
        "幾何学的分類：額、頬骨、顎の相対的な幅を分析して形態を判別",
        "データベースガイド：数万件のスタイリングデータを基にした顔型別カスタマイズ推薦"
      ]
    }
  },
  makeup: {
    ko: {
      title: "AI 메이크업 시뮬레이터의 과학",
      subtitle: "색채 이론과 텍스처 매핑",
      text: "가상 메이크업 시뮬레이션은 정밀한 얼굴 특징 점 감지와 정교한 컬러 블렌딩 기술의 결합입니다. 보색 원리(Complementary Colors)를 활용하여 피부의 붉은기나 노란기를 중화시키고, 광원의 방향에 따른 음영 변화를 계산하여 실제 화장을 한 듯한 자연스러운 입체감을 구현합니다. 립스틱의 매트, 글로시, 벨벳 등 다양한 텍스처를 픽셀 단위로 매핑하여 현실적인 시뮬레이션 경험을 제공합니다.",
      details: [
        "보색의 원리: 피부 고민 해결을 위한 컬러 코렉팅 및 발색 최적화",
        "텍스처 렌더링: 매트, 시머, 글로시 등 화장품 고유의 질감 구현",
        "실시간 앵커링: 얼굴의 움직임에 따라 메이크업 위치가 자연스럽게 고정되는 기술"
      ]
    },
    en: {
      title: "The Science of AI Makeup Simulator",
      subtitle: "Colour Theory and Texture Mapping",
      text: "Virtual makeup simulation is a combination of precise facial feature detection and sophisticated colour blending technology. By utilizing the principle of Complementary Colors, it neutralises redness or yellowness in the skin and calculates shading changes based on light sources to create a natural, multidimensional look. Various textures—such as matte, glossy, and velvet for lipsticks—are mapped at the pixel level to provide a realistic simulation experience.",
      details: [
        "Complementary Principles: Colour correcting and pigment optimization to address skin concerns.",
        "Texture Rendering: Implementation of unique cosmetic finishes like matte, shimmer, and glossy.",
        "Real-time Anchoring: Technology that naturally fixes makeup positions according to facial movements."
      ]
    },
    zh: {
      title: "AI 虚拟彩妆模拟的科学",
      subtitle: "色彩理论与质感映射",
      text: "虚拟彩妆模拟是精确的面部特征点检测与复杂的色彩融合技术的结合。利用互补色原理（Complementary Colors）中和皮肤的红血丝或暗黄，并根据光源方向计算阴影变化，实现如同真实化妆般的自然立体感。通过在像素级别映射唇膏的哑光、水光、丝绒等多种质感，提供真实的模拟体验。",
      details: [
        "互补色原理：用于解决皮肤烦恼的色彩校正与发色优化",
        "质感渲染：实现哑光、亮片、水光等化妆品特有的质感",
        "实时定位：随着面部动作自然固定妆容位置的技术"
      ]
    },
    ja: {
      title: "AI メイクアップシミュレーターの科学",
      subtitle: "色彩理論とテクスチャーマッピング",
      text: "仮想メイクシミュレーションは、精密な顔の特徴点検出と洗練されたカラーブレンディング技術の結合です。補色原理（Complementary Colors）を活用して肌の赤みや黄みを中和させ、光源の方向に合わせた陰影の変化を計算することで、実際にメイクをしたような自然な立体感を実現します。口紅のマット、グロッシー、ベルベットなどの多様なテクスチャーをピクセル単位でマッピングし、現実的なシミュレーション体験を提供します。",
      details: [
        "補色の原理：肌の悩みを解決するためのカラーコレクティング及び発色の最適化",
        "テクスチャーレンダリング：マット、シマー、グロッシーなど化粧品固有の質感を実装",
        "リアルタイムアンカリング：顔の動きに合わせてメイクの位置が自然に固定される技術"
      ]
    }
  }
};

export const ToolInfoSection: React.FC<ToolInfoSectionProps> = ({ lang, type }) => {
  const t = content[type][lang];
  const textClassName = lang === 'ko' ? 'font-korean break-keep' : '';

  return (
    <section className="mt-16 md:mt-24 border-t border-white/10 pt-16 mb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4 mb-10">
          <h2 className={`text-2xl md:text-3xl font-medium text-white ${textClassName}`}>
            {t.title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
            <p className="text-sm font-medium uppercase tracking-widest text-white/40">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className={`text-base md:text-lg leading-relaxed text-white/60 font-light ${textClassName}`}>
              {t.text}
            </p>
          </div>

          <div className="space-y-6 bg-white/5 rounded-3xl p-8 border border-white/5 backdrop-blur-sm">
            <h3 className={`text-sm font-semibold text-white/80 uppercase tracking-tighter ${textClassName}`}>
              Key Concepts & Technology
            </h3>
            <ul className="space-y-4">
              {t.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <span className={`text-[15px] leading-relaxed text-white/50 ${textClassName}`}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
