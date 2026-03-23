export type MagazineSection = {
    subtitle?: { ko: string; en: string; zh: string; ja: string };
    text: { ko: string; en: string; zh: string; ja: string };
    image?: string;
    imageCaption?: { ko: string; en: string; zh: string; ja: string };
    list?: { ko: string[]; en: string[]; zh: string[]; ja: string[] };
};

export type MagazineArticle = {
    id: string;
    title: { ko: string; en: string; zh: string; ja: string };
    description: { ko: string; en: string; zh: string; ja: string };
    metaTitle: { ko: string; en: string; zh: string; ja: string };
    metaDescription: { ko: string; en: string; zh: string; ja: string };
    image: string;
    category: { ko: string; en: string; zh: string; ja: string };
    date: string;
    author: { ko: string; en: string; zh: string; ja: string };
    content: MagazineSection[];
};

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: "bloom-skin-2026",
    title: {
      ko: "2026 뷰티 트렌드, '블룸 스킨'이 글래스 스킨을 대체한다",
      en: "2026 Beauty Trend - 'Bloom Skin' Overtakes Glass Skin",
      zh: "2026 美容趋势，'花绽肌'取代玻璃肌",
      ja: "2026年ビューティートレンド、「ブルームスキン」がガラス肌に取って代わる"
    },
    description: {
      ko: "인위적인 광택 대신 피부 장벽을 기반으로 한 건강한 발광감. Refinery29·Cosmopolitan이 선정한 2026년 최대 스킨케어 트렌드를 해설합니다.",
      en: "Healthy luminosity rooted in skin barrier strength, not artificial gloss. Breaking down the biggest 2026 skincare trend as named by Refinery29 and Cosmopolitan.",
      zh: "以肌肤屏障为基础的健康光泽，而非人造光芒。解读 Refinery29 和 Cosmopolitan 评选的 2026 年最大护肤趋势。",
      ja: "人工的なツヤではなく、肌バリアを基盤とした健康的な発光感。Refinery29とCosmopolitanが選ぶ2026年最大のスキンケアトレンドを解説。"
    },
    metaTitle: {
      ko: "블룸 스킨, 2026년 글래스 스킨 이후의 뷰티 트렌드 | FINDCORE",
      en: "Bloom Skin, The 2026 Beauty Trend After Glass Skin | FINDCORE",
      zh: "花绽肌，玻璃肌之后的 2026 美容趋势 | FINDCORE",
      ja: "ブルームスキン ガラス肌の次、2026年ビューティートレンド | FINDCORE"
    },
    metaDescription: {
      ko: "Refinery29·Cosmopolitan이 선정한 2026년 핵심 스킨케어 트렌드 '블룸 스킨'. 세라마이드, 프리바이오틱스, 바이오리퍼멘트 성분과 간소화된 루틴으로 피부 장벽을 회복하는 방법을 알아보세요.",
      en: "Bloom Skin is 2026's defining skincare trend named by Refinery29 and Cosmopolitan. Discover how ceramides, prebiotics, and bio-fermented actives rebuild your barrier.",
      zh: "花绽肌是 Refinery29 和 Cosmopolitan 命名的 2026 年核心护肤趋势。了解神经酰胺、益生元和生物发酵成分如何修复您的肌肤屏障。",
      ja: "ブルームスキンはRefinery29とCosmopolitanが命名した2026年の中心的スキンケアトレンド。セラミド、プレバイオティクス、バイオ発酵成分で肌バリアを再建する方法を学ぼう。"
    },
    image: "/bloom_skin_2026.png",
    category: { ko: "뷰티", en: "Beauty", zh: "美容", ja: "뷰티" },
    date: "2026.03.17",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: {
          ko: "글래스 스킨은 왜 저물고 있는가",
          en: "Why Glass Skin Is Fading",
          zh: "玻璃肌为何正在消退",
          ja: "ガラス肌はなぜ終わりを迎えているのか"
        },
        text: {
          ko: "2024-2025년을 휩쓴 글래스 스킨은 강력한 필링제와 고광 세럼으로 만들어낸 반사광을 목표로 했습니다. 그러나 피부과 전문의들은 이 접근 방식이 각질층 손상과 피부 민감도 상승을 야기한다고 경고해 왔습니다.\n\n반면 '블룸 스킨'은 피부 장벽(skin barrier)의 온전한 기능 회복을 출발점으로 삼습니다. 미국 Refinery29, 영국 Cosmopolitan 등 주요 뷰티 미디어가 2026년 No.1 스킨케어 트렌드로 선정한 이 개념은, 안에서 밖으로 배어 나오는 자연스러운 발광감을 추구합니다.\n\n핵심 차이는 인위적 도구의 사용 여부입니다. 블룸 스킨은 충분한 수면, 균형 잡힌 식단, 그리고 피부 본래의 방어 기능 지원을 통해 완성됩니다. 반짝이는 마무리는 결과이지, 목표가 아닙니다.",
          en: "Glass Skin, which dominated 2024-2025, targeted a mirror-like reflective finish using aggressive exfoliants and high-shine serums. Dermatologists have consistently warned that this approach damages the stratum corneum and increases skin sensitivity.\n\nBy contrast, 'Bloom Skin' starts with restoring the skin barrier's intact function. Named the No.1 skincare trend of 2026 by major beauty media including US Refinery29 and UK Cosmopolitan, this concept pursues a natural glow that radiates from within.\n\nThe core difference is the reliance on artificial tools. Bloom Skin is achieved through adequate sleep, a balanced diet, and supporting the skin's own defence mechanisms. A luminous finish is the result, not the goal.",
          zh: "席卷 2024-2025 年的玻璃肌以强力去角质剂和高光精华制造的镜面反光为目标。皮肤科专家一直警告，这种方式会损伤角质层，提高皮肤敏感度。\n\n相比之下，'花绽肌'的出发点在于恢复肌肤屏障的完整功能。美国 Refinery29、英国 Cosmopolitan 等主要美容媒体将其评为 2026 年第一大护肤趋势，追求的是从内而外散发出的自然光泽。\n\n核心区别在于是否依赖人工手段。花绽肌通过充足的睡眠、均衡的饮食以及支持皮肤自身防御机能来实现。焕发光彩是结果，而非目标。",
          ja: "2024〜2025年を席巻したガラス肌は、強力なピーリング剤や高光沢セラムを使った鏡のような反射光を目指すものでした。皮膚科専門医は一貫して、このアプローチが角質層を傷つけ、肌の敏感度を高めると警告してきました。\n\n一方「ブルームスキン」は、肌バリア機能の完全な回復を起点とします。米Refinery29、英Cosmopolitanなど主要ビューティーメディアが2026年No.1スキンケアトレンドに選んだこのコンセプトは、内側から溢れ出る自然な発光感を追求します。\n\n核心的な違いは、人工的な手段への依存度です。ブルームスキンは十分な睡眠、バランスの良い食事、そして肌本来の防御機能のサポートによって完成します。輝きは結果であり、目標ではないのです。"
        }
      },
      {
        subtitle: {
          ko: "블룸 스킨을 완성하는 핵심 성분 3가지",
          en: "3 Key Ingredients Behind Bloom Skin",
          zh: "打造花绽肌的 3 大核心成分",
          ja: "ブルームスキンを完成させる核心成分 3 選"
        },
        text: {
          ko: "피부과·뷰티 연구기관들이 공통적으로 강조하는 블룸 스킨의 핵심 성분은 세 가지입니다.\n\n첫째, 세라마이드(Ceramide). 피부 지질층의 50% 이상을 구성하는 세라마이드는 장벽 기능의 직접적인 원료입니다. Healthline과 Forbes Beauty 모두 2025-2026년 장벽 케어 필수 성분 1위로 선정했습니다.\n\n둘째, 프리바이오틱스·포스트바이오틱스. 피부 마이크로바이옴(상주 유익균 생태계) 균형을 지원합니다. America's Beauty Show(2026)는 '마이크로바이옴 피부 케어'를 장벽 트렌드의 핵심 축으로 분류했습니다.\n\n셋째, 바이오 발효 활성 성분(Bio-fermented Actives). K-뷰티 브랜드들이 주도하는 성분으로, 발효 공정을 통해 분자 크기를 줄여 피부 깊이 침투하고 항산화·진정 효과를 극대화합니다. Beautyindependent.com(2026)은 이를 차세대 장벽 강화의 핵심으로 분류했습니다.",
          en: "Dermatology and beauty research institutions consistently highlight three key ingredients for Bloom Skin.\n\nFirst, Ceramides. Making up more than 50% of the skin's lipid layer, ceramides are the direct building blocks of barrier function. Both Healthline and Forbes Beauty ranked them as the No.1 must-have ingredient for barrier care in 2025-2026.\n\nSecond, Prebiotics & Postbiotics. These support the balance of the skin microbiome — the ecosystem of beneficial resident bacteria. America's Beauty Show (2026) listed 'Microbiome Skincare' as a central pillar of the barrier trend.\n\nThird, Bio-fermented Actives. Led by K-beauty brands, these ingredients are processed through fermentation to reduce molecular size, enabling deeper skin penetration and maximising antioxidant and calming effects. Beautyindependent.com (2026) classified these as the core of next-generation barrier strengthening.",
          zh: "皮肤科和美容研究机构共同强调的花绽肌三大核心成分如下。\n\n第一，神经酰胺。作为皮肤脂质层 50% 以上的组成成分，神经酰胺是屏障功能的直接原料。Healthline 和 Forbes Beauty 均将其评为 2025-2026 年屏障护理必备成分第一名。\n\n第二，益生元与后生元。支持皮肤微生态（常驻有益菌生态系统）的平衡。America's Beauty Show（2026）将'微生态护肤'列为屏障趋势的核心支柱。\n\n第三，生物发酵活性成分。由 K-beauty 品牌主导，通过发酵工艺缩小分子体积，实现更深层的皮肤渗透，并最大化抗氧化和舒缓效果。Beautyindependent.com（2026）将其归类为下一代屏障强化的核心所在。",
          ja: "皮膚科・ビューティー研究機関が共通して強調するブルームスキンの核心成分は3つです。\n\n第1に、セラミド。皮膚脂質層の50%以上を構成するセラミドは、バリア機能の直接的な構成要素です。HealthlineとForbes Beautyはともに2025-2026年のバリアケア必須成分No.1に選出しています。\n\n第2に、プレビオティクス・ポストバイオティクス。皮膚マイクロバイオーム（常在有益菌の生態系）のバランスをサポートします。America's Beauty Show（2026）は「マイクロバイオームスキンケア」をバリアトレンドの中心軸に分類しました。\n\n第3に、バイオ発酵活性成分。K-ビューティーブランドが牽引するこの成分は、発酵プロセスにより分子サイズを小さくし、肌の深部への浸透力と抗酸化・鎮静効果を最大化します。Beautyindependent.com（2026）はこれを次世代バリア強化の核心と分類しています。"
        },
        image: "/bloom_skin_barrier.png",
        imageCaption: {
          ko: "2026년 '어댑티브 배리어 사이언스' — 피부 반응을 감지해 성분 배합을 조절하는 차세대 포뮬러 기술 (출처: GrandIngredients, 2026)",
          en: "'Adaptive Barrier Science' 2026 — next-gen formulation tech that senses skin responses and adjusts ingredient ratios accordingly (Source: GrandIngredients, 2026)",
          zh: "2026 年'自适应屏障科学'——感知皮肤反应并相应调节成分配比的次世代配方技术（来源：GrandIngredients，2026）",
          ja: "2026年「アダプティブバリアサイエンス」——肌の反応を感知して成分配合を調整する次世代フォーミュラ技術（出典：GrandIngredients、2026）"
        }
      },
      {
        subtitle: {
          ko: "실전 루틴, 간소화가 핵심이다",
          en: "Practical Routine, Simplification Is the Key",
          zh: "实战流程，精简才是核心",
          ja: "実践ルーティン シンプル化が鍵"
        },
        text: {
          ko: "블룸 스킨의 또 다른 특징은 단계 축소입니다. 2026년 글로벌 스킨케어 시장 보고서(Longevity.Technology)에 따르면, 소비자들은 10-12단계 루틴에서 4-6단계의 핵심 중심 루틴으로 이동하고 있습니다.\n\n추천 기본 루틴은 다음과 같습니다. 약산성 클렌저로 pH 밸런스 유지 → 세라마이드·히알루론산 기반 에센스 → 프리바이오틱 보습제 → SPF 50+ 자외선 차단.\n\n핵심은 과도한 박피나 자극 성분(고농도 레티놀, 산 성분의 과용)을 피하는 것입니다. Optimadermatology.com(2026)은 '장벽이 온전할 때 피부는 스스로 회복한다'는 원칙을 마이크로바이옴 케어의 중심으로 강조합니다.",
          en: "Another key feature of Bloom Skin is step reduction. According to the 2026 global skincare market report by Longevity.Technology, consumers are moving from 10-12 step routines to a core-focused 4-6 step routine.\n\nThe recommended basic routine is as follows. Maintain pH balance with a sub-acidic cleanser → ceramide and hyaluronic acid-based essence → prebiotic moisturiser → SPF 50+ sun protection.\n\nThe key is avoiding excessive exfoliation and irritating ingredients (high-concentration retinol, overuse of acid ingredients). Optimadermatology.com (2026) emphasises the principle that 'when the barrier is intact, skin heals itself' as central to microbiome care.",
          zh: "花绽肌的另一大特点是步骤精简。根据 Longevity.Technology 2026 年全球护肤市场报告，消费者正从 10-12 步流程转向以核心为重的 4-6 步流程。\n\n推荐的基础流程如下。用弱酸性洁面产品维持 pH 平衡 → 神经酰胺和透明质酸精华 → 益生元保湿霜 → SPF 50+ 防晒。\n\n关键在于避免过度去角质和刺激性成分（高浓度视黄醇、过度使用酸性成分）。Optimadermatology.com（2026）将'屏障完好时肌肤能自我修复'这一原则作为微生态护理的核心加以强调。",
          ja: "ブルームスキンのもう一つの特徴はステップ削減です。Longevity.Technologyの2026年グローバルスキンケア市場レポートによれば、消費者は10〜12ステップのルーティンから、核心重視の4〜6ステップへと移行しています。\n\n推奨される基本ルーティンは以下の通りです。弱酸性クレンザーでpHバランスを維持 → セラミド・ヒアルロン酸基剤のエッセンス → プレバイオティクス保湿剤 → SPF50+日焼け止め。\n\n重要なのは、過度なピーリングや刺激成分（高濃度レチノール、酸性成分の過用）を避けることです。Optimadermatology.com（2026）は「バリアが健全なとき、肌は自ら回復する」という原則をマイクロバイオームケアの中心として強調しています。"
        },
        list: {
          ko: ["세라마이드 함유 보습제: 피부 지질층을 직접 보완하는 장벽의 핵심 원료", "프리바이오틱스: 유익한 피부 상주균의 먹이가 되어 마이크로바이옴 균형을 유지", "바이오 발효 활성 성분: 발효를 통해 흡수율과 효능을 극대화한 차세대 K-뷰티 성분", "SPF 50+ 자외선 차단: 장벽 손상의 가장 큰 원인인 UV 차단이 블룸 스킨의 전제 조건"],
          en: ["Ceramide moisturiser: direct replenishment of the skin's lipid layer — the barrier's primary material", "Prebiotics: feed beneficial resident skin bacteria to maintain microbiome balance", "Bio-fermented actives: next-gen K-beauty ingredients with maximised absorption and efficacy via fermentation", "SPF 50+ sun protection: blocking UV — the leading cause of barrier damage — is a prerequisite for Bloom Skin"],
          zh: ["含神经酰胺的保湿霜：直接补充皮肤脂质层——屏障的核心原料", "益生元：为皮肤常驻有益菌提供养分，维持微生态平衡", "生物发酵活性成分：通过发酵最大化吸收率和功效的新一代 K-beauty 成分", "SPF 50+ 防晒：阻挡造成屏障损伤的最大元凶 UV 是花绽肌的前提条件"],
          ja: ["セラミド保湿剤：皮膚の脂質層を直接補うバリアの核心原料", "プレバイオティクス：皮膚の有益な常在菌のエサとなりマイクロバイオームバランスを維持", "バイオ発酵活性成分：発酵によって吸収率と有効性を最大化した次世代K-beauty成分", "SPF50+日焼け止め：バリア損傷の最大原因であるUVをブロックすることがブルームスキンの前提条件"]
        }
      }
    ]
  },
  {
    id: "glamoratti-style",
    title: {
      ko: "글래모라티, 2026년 패션이 80년대 파워 드레싱을 소환하는 법",
      en: "Glamoratti - How 2026 Fashion Is Summoning 80s Power Dressing",
      zh: "Glamoratti，2026 年时尚如何唤醒 80 年代的力量穿搭",
      ja: "グラモラッティ、2026年ファッションが80年代パワードレッシングを呼び起こす方法"
    },
    description: {
      ko: "Marie Claire와 Who What Wear이 선정한 2026년 최대 패션 키워드. 파워 숄더, 골드 액세서리, 과감한 실루엣으로 완성되는 글래모라티 룩을 분석합니다.",
      en: "The biggest 2026 fashion keyword named by Marie Claire and Who What Wear. Analysing the Glamoratti look built on power shoulders, gold accessories, and bold silhouettes.",
      zh: "Marie Claire 和 Who What Wear 评选的 2026 年最大时尚关键词。分析以权力肩、金色配饰和大胆轮廓构成的 Glamoratti 造型。",
      ja: "Marie ClaireとWho What Wearが選ぶ2026年最大のファッションキーワード。パワーショルダー、ゴールドアクセサリー、大胆なシルエットで完成するグラモラッティを分析します。"
    },
    metaTitle: {
      ko: "글래모라티 2026, 80년대 파워 드레싱의 귀환 | FINDCORE",
      en: "Glamoratti 2026, The Return of 80s Power Dressing | FINDCORE",
      zh: "Glamoratti 2026，80 年代力量穿搭的回归 | FINDCORE",
      ja: "グラモラッティ 2026：80年代パワードレッシングの귀환 | FINDCORE"
    },
    metaDescription: {
      ko: "조용한 럭셔리가 저물고 맥시멀리즘이 부상합니다. Marie Claire가 명명한 '글래모라티' 트렌드를 통해 2026년 파워 드레싱의 실체를 확인하세요.",
      en: "Quiet Luxury fades as maximalism rises. Discover the real shape of 2026 power dressing through the 'Glamoratti' trend named by Marie Claire.",
      zh: "随着极简主义崛起，静奢风正在消退。通过 Marie Claire 命名的'Glamoratti'趋势，了解 2026 年力量穿搭的真实样貌。",
      ja: "クワイエット・ラグジュアリーが退潮し、マキシマリズムが台頭します。Marie Claireが命名した「グラモラッティ」トレンドで2026年パワードレッシングの実態を確認してください。"
    },
    image: "/glamoratti_fashion_2026.png",
    category: { ko: "패션", en: "Fashion", zh: "时尚", ja: "ファッション" },
    date: "2026.03.17",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: {
          ko: "조용한 럭셔리의 종말, 글래모라티의 시작",
          en: "The End of Quiet Luxury, The Rise of Glamoratti",
          zh: "静奢风的终结，Glamoratti 的开始",
          ja: "クワイエット・ラグジュアリーの終焉、グラモラッティの始まり"
        },
        text: {
          ko: "2023-2024년을 지배했던 '조용한 럭셔리(Quiet Luxury)' 트렌드 — 브랜드 로고를 드러내지 않는 절제된 고급스러움 — 가 빠르게 퇴조하고 있습니다. 그 자리를 채우는 것은 '글래모라티(Glamoratti)'입니다.\n\nMarie Claire(2026년 3월호)는 이 트렌드를 1980년대 파워 드레싱의 DNA를 지닌 현대적 맥시멀리즘으로 정의했습니다. Who What Wear는 2026년 봄·여름 런웨이에서 발렌시아가, 베르사체, 생 로랑이 공통적으로 과장된 숄더 라인과 금속 디테일을 전면에 내세웠음을 보도했습니다.\n\n이 흐름의 배경에는 세대 변화가 있습니다. MZ세대와 Z세대 소비자들이 '자기표현'을 패션의 핵심 가치로 삼으며 절제보다 강렬한 개성을 선호하고 있습니다(Istituto Marangoni 2026 트렌드 보고서).",
          en: "The 'Quiet Luxury' trend that dominated 2023-2024 — restrained sophistication that avoids visible brand logos — is retreating quickly. Taking its place is 'Glamoratti.'\n\nMarie Claire (March 2026 issue) defined this trend as a modern maximalism carrying the DNA of 1980s power dressing. Who What Wear reported that Balenciaga, Versace, and Saint Laurent all prominently featured exaggerated shoulder lines and metallic details on the Spring/Summer 2026 runway.\n\nGenerational change underpins this shift. Millennial and Gen Z consumers are prioritising 'self-expression' as fashion's core value, preferring intense individuality over restraint (Istituto Marangoni 2026 Trend Report).",
          zh: "主宰 2023-2024 年的'静奢风（Quiet Luxury）'趋势——不显露品牌 logo 的克制高级感——正在迅速退潮。取而代之的是'Glamoratti'。\n\nMarie Claire（2026 年 3 月刊）将这一趋势定义为承载 20 世纪 80 年代力量穿搭 DNA 的现代极简主义。Who What Wear 报道称，巴黎世家、范思哲和圣罗兰在 2026 春夏秀场上都将夸张的肩线和金属细节置于最显眼的位置。\n\n这一趋势变化的背后是世代更替。千禧一代和 Z 世代消费者将'自我表达'视为时尚的核心价值，相比克制，更偏好鲜明的个性（Istituto Marangoni 2026 趋势报告）。",
          ja: "2023〜2024年を支配した「クワイエット・ラグジュアリー」トレンド——ブランドロゴを見せない抑制された高級感——が急速に退いています。その座を占めるのが「グラモラッティ（Glamoratti）」です。\n\nMarie Claire（2026年3月号）は、このトレンドを1980年代パワードレッシングのDNAを持つ現代的マキシマリズムと定義しました。Who What Wearは、バレンシアガ、ヴェルサーチェ、サンローランが2026年春夏ランウェイで揃って誇張されたショルダーラインとメタリックディテールを前面に打ち出したと報じています。\n\nこの流れの背景には世代交代があります。ミレニアル世代とZ世代の消費者が「自己表現」をファッションの中心的価値とし、抑制よりも強烈な個性を好んでいます（Istituto Marangoni 2026トレンドレポート）。"
        }
      },
      {
        subtitle: {
          ko: "글래모라티를 구성하는 4가지 요소",
          en: "The 4 Elements That Define Glamoratti",
          zh: "构成 Glamoratti 的 4 大要素",
          ja: "グラモラッティを構成する4つの要素"
        },
        text: {
          ko: "Marie Claire와 DesignScene이 분석한 2026 글래모라티 룩의 핵심 요소는 다음과 같습니다.\n\n첫째, 파워 숄더(Power Shoulders). 어깨선을 과장시킨 구조적인 재킷과 블레이저가 가장 상징적인 아이템입니다. 80년대의 숄더 패드와 달리, 2026년 버전은 소재가 가볍고 드레이프 감각이 가미되었습니다.\n\n둘째, 청키 골드 액세서리. Who What Wear는 도어 노커 이어링, 와이드 골드 뱅글, 레이어드 체인이 글래모라티 룩의 완성 요소라고 보도했습니다. 금색보다는 실버 계열도 함께 부상 중입니다.\n\n셋째, 메탈릭 텍스처. 쉬머 소재의 수트, 시퀸 디테일의 블레이저가 런웨이와 스트릿 모두에서 핵심 아이템으로 등장했습니다.\n\n넷째, 선명한 허리 라인. 오버사이즈 실루엣이면서도 와이드 벨트나 코르셋 디테일로 허리를 강조해 여성성과 권위를 동시에 표현합니다.",
          en: "The core elements of the 2026 Glamoratti look, as analysed by Marie Claire and DesignScene, are as follows.\n\nFirst, Power Shoulders. Structured jackets and blazers with exaggerated shoulder lines are the most iconic items. Unlike the shoulder pads of the 80s, the 2026 version uses lighter materials with a draped sensibility.\n\nSecond, Chunky Gold Accessories. Who What Wear reported that door knocker earrings, wide gold bangles, and layered chains are the finishing elements of the Glamoratti look. Silver tones are also rising alongside gold.\n\nThird, Metallic Textures. Shimmer fabric suits and sequin-detailed blazers have emerged as key items both on the runway and in street fashion.\n\nFourth, A Defined Waist. Oversized silhouettes paired with wide belts or corset detailing to emphasise the waist, expressing both femininity and authority simultaneously.",
          zh: "Marie Claire 和 DesignScene 分析的 2026 Glamoratti 造型核心要素如下。\n\n第一，权力肩（Power Shoulders）。肩线夸张的结构性夹克和西装是最具标志性的单品。与 80 年代的垫肩不同，2026 年版本材质更轻盈，融入了垂坠感。\n\n第二，粗犷金色配饰。Who What Wear 报道称，门环耳环、宽金手镯和叠戴项链是 Glamoratti 造型的点睛之笔。银色系也在随金色同步兴起。\n\n第三，金属质感面料。闪光面料西装和亮片细节西装外套既出现在秀场，也成为街头时尚的核心单品。\n\n第四，鲜明的腰线。廓形宽大，同时用宽腰带或束腰细节强调腰身，同时彰显女性气质与权威感。",
          ja: "Marie ClaireとDesignSceneが分析した2026年グラモラッティルックの核心要素は以下の通りです。\n\n第1に、パワーショルダー。肩線を誇張した構造的なジャケットとブレザーが最も象徴的なアイテムです。80年代のショルダーパッドとは異なり、2026年版は素材が軽くドレープ感覚が加わっています。\n\n第2に、チャンキーゴールドアクセサリー。Who What Wearは、ドアノッカーイヤリング、ワイドゴールドバングル、レイヤードチェーンがグラモラッティルックの仕上げ要素だと報じました。金色に加えシルバー系も台頭しています。\n\n第3に、メタリックテクスチャー。シマーファブリックのスーツ、スパンコールディテールのブレザーがランウェイとストリート両方で核心アイテムとして登場しました。\n\n第4に、明確なウエストライン。オーバーサイズシルエットながら、ワイドベルトやコルセットディテールでウエストを強調し、女性らしさと権威を同時に表現します。"
        },
        image: "/glamoratti_accessories.png",
        imageCaption: {
          ko: "Balenciaga·Versace 2026 S/S 런웨이에서 공통적으로 포착된 청키 골드 액세서리 레이어링 (출처: Who What Wear, 2026)",
          en: "Chunky gold accessory layering spotted on both Balenciaga and Versace 2026 S/S runways (Source: Who What Wear, 2026)",
          zh: "在巴黎世家和范思哲 2026 春夏秀场共同捕捉到的粗犷金色配饰叠戴（来源：Who What Wear，2026）",
          ja: "バレンシアガとヴェルサーチェ両方の2026年S/Sランウェイで共通して捉えられたチャンキーゴールドアクセサリーのレイヤリング（出典：Who What Wear、2026）"
        }
      }
    ]
  },
  {
    id: "tech-skincare-korea",
    title: {
      ko: "K-뷰티 4.0, AI 디바이스가 만드는 초개인화 스킨케어 혁명",
      en: "K-Beauty 4.0 - The Hyper-Personalized Skincare Revolution Made by AI Devices",
      zh: "K-beauty 4.0，AI 设备开创超个性化护肤革命",
      ja: "Kビューティー4.0、AIデバイスが生み出す超個別化スキンケア革命"
    },
    description: {
      ko: "Amorepacific의 CES 2026 혁신상 수상작 'Skinsight', APR의 Medicube AGE-R 라인. 한국이 선도하는 AI 스킨케어 디바이스 시장의 현주소를 짚습니다.",
      en: "Amorepacific's CES 2026 Innovation Award winner 'Skinsight', APR's Medicube AGE-R line. Examining the current state of the AI skincare device market that Korea is leading.",
      zh: "爱茉莉太平洋荣获 CES 2026 创新奖的'Skinsight'、APR 的 Medicube AGE-R 系列。聚焦韩国引领的 AI 护肤设备市场现状。",
      ja: "アモーレパシフィックのCES 2026革新賞受賞作「Skinsight」、APRのMedicube AGE-Rライン。韓国が主導するAIスキンケアデバイス市場の現状を検証します。"
    },
    metaTitle: {
      ko: "K-뷰티 AI 스킨케어 디바이스 2026, Skinsight·Medicube AGE-R 분석 | FINDCORE",
      en: "K-Beauty AI Skincare Device 2026, Skinsight & Medicube AGE-R | FINDCORE",
      zh: "K-beauty AI 护肤设备 2026，Skinsight·Medicube AGE-R 分析 | FINDCORE",
      ja: "Kビューティー AIスキンケアデバイス2026 Skinsight·Medicube AGE-R | FINDCORE"
    },
    metaDescription: {
      ko: "글로벌 뷰티 디바이스 시장은 2030년 898억 달러 규모로 성장이 전망됩니다. CES 2026 혁신상 수상 기술 'Skinsight'부터 가정용 마이크로커런트 디바이스까지, K-뷰티 AI 기술의 최전선을 탐구합니다.",
      en: "The global beauty device market is forecast to grow to .8 billion by 2030. Explore the frontier of K-beauty AI technology, from CES 2026 Innovation Award winner Skinsight to at-home microcurrent devices.",
      zh: "全球美容设备市场预计到 2030 年将增长至 898 亿美元。从 CES 2026 创新奖得主 Skinsight 到家用微电流设备，探索 K-beauty AI 技术的最前沿。",
      ja: "グローバル美容デバイス市場は2030年までに898億ドル規模への成長が見込まれます。CES 2026革新賞受賞技術「Skinsight」から家庭用マイクロカレントデバイスまで、Kビューティー AI技術の最前線を探ります。"
    },
    image: "/tech_kbeauty_2026.png",
    category: { ko: "테크", en: "Tech", zh: "科技", ja: "テクノロジー" },
    date: "2026.03.17",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: {
          ko: "CES 2026이 증명한 K-뷰티 AI의 현재",
          en: "What CES 2026 Proved About K-Beauty AI",
          zh: "CES 2026 证明的 K-beauty AI 现状",
          ja: "CES 2026が証明したKビューティーAIの現在"
        },
        text: {
          ko: "2026년 1월 라스베이거스 CES에서 한국 뷰티 기업들은 주요 혁신 부문을 장악했습니다. 그 중심에는 아모레퍼시픽의 'Skinsight'가 있었습니다.\n\nBeautymatter.com에 따르면, Skinsight는 초박형 웨어러블 센서 패치로, 피부 탄력, UV·블루라이트 노출량, 체온, 수분 변화를 실시간으로 감지합니다. 수집된 데이터는 AI 기반 앱에서 분석되어 개인 맞춤형 스킨케어 루틴을 생성합니다. CES 2026 혁신상(Innovation Award Honoree)을 수상했습니다.\n\n한편 APR(에이프릴스킨 모회사)의 Medicube AGE-R 라인은 가정용 마이크로커런트 디바이스와 LED 마스크 시장에서 글로벌 1위를 목표로 공격적으로 확장 중입니다. Korea Herald(2026)는 APR을 K-뷰티 디바이스 시장의 핵심 주자로 명명했습니다.",
          en: "At CES in Las Vegas in January 2026, Korean beauty companies dominated major innovation categories. At the forefront was Amorepacific's 'Skinsight.'\n\nAccording to Beautymatter.com, Skinsight is an ultra-thin wearable sensor patch that detects changes in skin tightness, UV and blue light exposure, body temperature, and hydration in real time. The collected data is analysed in an AI-powered app to generate personalised skincare routines. It was recognised as a CES 2026 Innovation Award Honoree.\n\nMeanwhile, APR (parent company of April Skin) is aggressively expanding its Medicube AGE-R line, targeting global no.1 in the at-home microcurrent device and LED mask market. The Korea Herald (2026) named APR as a key player in the K-beauty device market.",
          zh: "2026 年 1 月，在拉斯维加斯举办的 CES 上，韩国美容企业主导了多个主要创新类别。其中心正是爱茉莉太平洋的'Skinsight'。\n\n据 Beautymatter.com 报道，Skinsight 是一款超薄可穿戴传感器贴片，可实时感知皮肤弹性、UV 及蓝光照射量、体温和水分变化。收集到的数据由 AI 应用程序分析，生成个性化护肤方案。该产品荣获 CES 2026 创新奖（Innovation Award Honoree）。\n\n与此同时，APR（爱彼丝母公司）正积极扩展 Medicube AGE-R 系列，目标是夺得家用微电流设备和 LED 面膜市场的全球第一。Korea Herald（2026）将 APR 列为 K-beauty 设备市场的核心玩家。",
          ja: "2026年1月のラスベイガスCESで、韓国ビューティー企業は主要な革新部門を席巻しました。その中心にあったのがアモーレパシフィックの「Skinsight」です。\n\nBeautymatter.comによれば、Skinsightは超薄型ウェアラブルセンサーパッチで、皮膚の弾力、UV・ブルーライト露光量、体温、水分変化をリアルタイムで感知します。収集されたデータはAI搭載アプリで分析され、パーソナライズされたスキンケアルーティンを生成します。CES 2026 Innovation Award Honoreeを受賞しました。\n\n一方、APR（エイプリルスキンの親会社）のMedicube AGE-Rラインは、家庭用マイクロカレントデバイスとLEDマスク市場でグローバル1位を目指し積極的に拡大中です。Korea Herald（2026）はAPRをKビューティーデバイス市場の核心的プレイヤーと命名しました。"
        }
      },
      {
        subtitle: {
          ko: "AI 스킨케어 디바이스 시장, 2030년까지 898억 달러",
          en: "The AI Skincare Device Market, $89.8 Billion by 2030",
          zh: "AI 护肤设备市场，2030 年达 898 亿美元",
          ja: "AIスキンケアデバイス市場 2030年までに898億ドル"
        },
        text: {
          ko: "Korea Herald가 인용한 시장 조사에 따르면, 글로벌 뷰티 디바이스 시장은 2022년 140억 달러에서 2030년 898억 달러로 성장이 전망됩니다. 연평균 성장률(CAGR)은 약 26%입니다.\n\n이 성장을 이끄는 핵심 기술로는 네 가지가 있습니다. ① 실시간 피부 스캐닝 AI(수분·색소·탄력·모공 동시 분석), ② 적응형 파장 LED 마스크(피부 상태에 따라 파장 자동 조절), ③ 마이크로커런트 디바이스(피부 근육 자극 및 제품 흡수 촉진), ④ 초음파 인퓨전 툴(세럼을 피부 깊이 침투시키는 가정용 기기).\n\n⑤ Genesiscosmotech.com(2026)은 AI 피부 스캐너가 단순한 진단 도구를 넘어 바이오테크 성분 활용 최적화 플랫폼으로 진화하고 있다고 분석했습니다. PDRN·엑소좀·바이오 발효 성분의 개인 맞춤 적용이 AI 알고리즘으로 결정된다는 것입니다.",
          en: "According to market research cited by the Korea Herald, the global beauty device market is projected to grow from  billion in 2022 to .8 billion by 2030 — a compound annual growth rate (CAGR) of approximately 26%.\n\nThere are four key technologies driving this growth: ① Real-time AI skin scanning (simultaneous analysis of hydration, pigmentation, elasticity, and pores), ② Adaptive wavelength LED masks (automatically adjusting wavelengths based on skin condition), ③ Microcurrent devices (stimulating skin muscles and promoting product absorption), ④ Ultrasound infusion tools (home devices that drive serums deep into the skin).\n\nGenesiscosmotech.com (2026) analysed that AI skin scanners are evolving beyond simple diagnostic tools into platforms that optimise the application of biotech ingredients. Individual application of PDRN, exosomes, and bio-fermented actives is being determined by AI algorithms.",
          zh: "据 Korea Herald 引用的市场调研显示，全球美容设备市场预计将从 2022 年的 140 亿美元增长至 2030 年的 898 亿美元，复合年均增长率约为 26%。\n\n推动这一增长的四大核心技术分别为：①实时 AI 皮肤扫描（同步分析水分、色素、弹性和毛孔），②自适应波长 LED 面膜（根据皮肤状态自动调节波长），③微电流设备（刺激皮肤肌肉，促进产品吸收），④超声波导入仪（将精华送入皮肤深层的家用设备）。\n\nGenesiscosmotech.com（2026）分析称，AI 皮肤扫描仪正在超越单纯的诊断工具，进化为优化生物科技成分应用的平台。PDRN、外泌体和生物发酵成分的个性化应用，已由 AI 算法来决定。",
          ja: "Korea Heraldが引用した市場調査によれば、グローバル美容デバイス市場は2022年の140億ドルから2030年の898億ドルへ成長が見込まれます。年平均成長率(CAGR)は約26%です。\n\nこの成長を牽引する核心技術は4つあります：①リアルタイムAI肌スキャン（水分・色素・弾力・毛穴の同時分析）、②適応型波長LEDマスク（肌状態に応じた波長自動調整）、③マイクロカレントデバイス（皮膚筋肉刺激と製品吸収促進）、④超音波インフュージョンツール（セラムを肌深部に浸透させる家庭用機器）。\n\nGenesiscosmotech.com（2026）は、AIスキャナーが単純な診断ツールを超え、バイオテク成分活用最適化プラットフォームへと進化していると分析しました。PDRN・エクソソーム・バイオ発酵成分の個人別適用がAIアルゴリズムで決定されるということです。"
        },
        image: "/tech_beauty_device.png",
        imageCaption: {
          ko: "Amorepacific Skinsight — 피부 상태를 실시간 모니터링하는 초박형 웨어러블 센서. CES 2026 혁신상 수상 (출처: Beautymatter.com)",
          en: "Amorepacific Skinsight — ultra-thin wearable sensor monitoring skin condition in real time. CES 2026 Innovation Award Honoree (Source: Beautymatter.com)",
          zh: "Amorepacific Skinsight——实时监测皮肤状态的超薄可穿戴传感器。CES 2026 创新奖（来源：Beautymatter.com）",
          ja: "アモーレパシフィック Skinsight——肌状態をリアルタイムモニタリングする超薄型ウェアラブルセンサー。CES 2026 Innovation Award Honoree（出典：Beautymatter.com）"
        }
      }
    ]
  },
  {
    id: "watercolour-makeup",
    title: {
      ko: "수채화 메이크업, 2026 봄의 가장 시적인 눈 표현법",
      en: "Watercolour Makeup - The Most Poetic Eye Look of Spring 2026",
      zh: "水彩妆容，2026 年春季最诗意的眼妆表现",
      ja: "水彩メイク、2026年春の最も詩的なアイメイク表現"
    },
    description: {
      ko: "Marie Claire UK·Cosmopolitan이 주목한 2026 봄 메이크업. 투명하게 겹치는 파스텔 아이섀도우로 수채화처럼 번지는 눈매 표현 가이드.",
      en: "2026 spring makeup highlighted by Marie Claire UK and Cosmopolitan. A guide to watercolour-like eye expressions using translucent layered pastel eyeshadow.",
      zh: "Marie Claire UK 和 Cosmopolitan 关注的 2026 春季妆容。用透明叠加的马卡龙色眼影打造水彩晕染眼妆的指南。",
      ja: "Marie Claire UKとCosmopolitanが注目する2026年春メイク。透明感を重ねるパステルアイシャドウで水彩画のように滲むアイメイクのガイド。"
    },
    metaTitle: {
      ko: "수채화 아이 메이크업 2026 봄 트렌드 가이드 | FINDCORE",
      en: "Watercolour Eye Makeup 2026 Spring Trend Guide | FINDCORE",
      zh: "水彩眼妆 2026 春季趋势指南 | FINDCORE",
      ja: "水彩アイメイク 2026春トレンドガイド | FINDCORE"
    },
    metaDescription: {
      ko: "Marie Claire UK·Vogue Scandinavia가 2026 봄 트렌드로 선정한 수채화 아이 메이크업. 베이비 블루, 라일락, 소프트 핑크 파스텔 표현 방법부터 베이스 세팅 팁까지 완벽 가이드.",
      en: "Watercolour eye makeup selected as a 2026 spring trend by Marie Claire UK and Vogue Scandinavia. A complete guide from baby blue, lilac, and soft pink pastel expression to base setting tips.",
      zh: "被 Marie Claire UK 和 Vogue Scandinavia 评选为 2026 春季趋势的水彩眼妆。从宝宝蓝、丁香紫和柔粉马卡龙色表现到底妆定妆技巧的完整指南。",
      ja: "Marie Claire UKとVogue Scandinaviaが2026年春のトレンドに選んだ水彩アイメイク。ベビーブルー、ライラック、ソフトピンクのパステル表現からベースセッティングのヒントまでの完全ガイド。"
    },
    image: "/watercolour_makeup_2026.png",
    category: { ko: "메이크업", en: "Makeup", zh: "彩妆", ja: "메이크업" },
    date: "2026.03.17",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: {
          ko: "투명하게 겹치는 파스텔, 수채화의 원리",
          en: "Translucent Layered Pastels, The Watercolour Principle",
          zh: "透明叠加马卡龙色，水彩原理",
          ja: "透明感を重ねるパステル 水彩の原理"
        },
        text: {
          ko: "Marie Claire UK(2026년 봄 메이크업 특집)에서 셀레브리티 메이크업 아티스트 크리스티안 브리세노는 수채화 아이 메이크업을 이렇게 정의합니다. '색을 어느 정도 투명하게 유지하는 것이 표현력과 착용감을 동시에 높이는 비결입니다.'\n\n이 트렌드는 고체이지만 불투명한 기존 아이섀도우 활용 방식에서 벗어납니다. 크림 또는 액체 아이섀도우를 손가락이나 넓은 브러시로 살짝 두드려 번지게 하고, 그 위에 반투명한 파스텔 파우더를 얹어 깊이감을 더합니다.\n\nVogue Scandinavia(2026)는 이 룩을 '예술적인 불완전함을 허용하는 메이크업'이라 묘사했습니다. 완벽한 경계선보다는 자연스럽게 번진 가장자리가 오히려 완성도를 높입니다.",
          en: "In Marie Claire UK (2026 spring makeup special), celebrity makeup artist Christian Briceno defines watercolour eye makeup as follows. 'Keeping the colour somewhat transparent is the key to enhancing both expressiveness and wearability.'\n\nThis trend breaks away from the traditional use of eyeshadow as a solid, opaque application. A cream or liquid eyeshadow is gently tapped and diffused with fingers or a wide brush, then a translucent pastel powder is layered on top to add depth.\n\nVogue Scandinavia (2026) described this look as 'makeup that allows for artistic imperfection.' Naturally diffused edges, rather than perfect lines, actually elevate the final result.",
          zh: "在 Marie Claire UK（2026 年春季彩妆专题）中，明星彩妆师 Christian Briceno 这样定义水彩眼妆。'让色彩保持一定透明度，是同时提升表现力和持妆感的关键。'\n\n这一趋势打破了传统眼影厚涂不透明的使用方式。用手指或宽毛刷轻轻拍打晕染膏状或液态眼影，再叠上半透明的马卡龙色散粉，增添层次感。\n\nVogue Scandinavia（2026）将这种妆容描述为'允许艺术性不完美的彩妆'。自然晕染的边缘，反而比完美的轮廓线更能提升完成度。",
          ja: "Marie Claire UK（2026年春メイク特集）でセレブリティメイクアップアーティストのChristian Bricenoは水彩アイメイクをこう定義しています。「色をある程度透明に保つことが、表現力と着用感の両方を高める秘訣です。」\n\nこのトレンドは、従来の固形で不透明なアイシャドウの使い方から脱却します。クリームまたはリキッドアイシャドウを指や幅広ブラシで軽くたたきながら広げ、その上から半透明のパステルパウダーを重ねて深みを出します。\n\nVogue Scandinavia（2026）はこのルックを「芸術的な不完全さを許容するメイク」と表現しました。完璧なラインよりも自然に滲んだエッジがむしろ完成度を高めます。"
        }
      },
      {
        subtitle: {
          ko: "베이비 블루·라일락·소프트 핑크, 2026 파스텔 3색 가이드",
          en: "Baby Blue, Lilac & Soft Pink, 2026's Pastel Trio Guide",
          zh: "宝宝蓝·丁香紫·柔粉，2026 马卡龙三色指南",
          ja: "ベビーブルー・ライラック・ソフトピンク 2026年パステル三色ガイド"
        },
        text: {
          ko: "Cosmopolitan(2026)과 Voir Fashion UK는 수채화 아이 메이크업에서 세 가지 파스텔 컬러를 핵심으로 꼽았습니다.\n\n베이비 블루(Baby Blue): 맑고 차가운 하늘색 계열로, 흰 피부톤부터 중간 피부톤에 가장 잘 어울립니다. 하이라이터와 함께 쓰면 눈매가 더 또렷해 보입니다.\n\n라일락(Lilac): 연보라는 2026 봄 아이메이크업에서 가장 다재다능한 컬러입니다. Cosmopolitan은 피부 섀이드에 관계없이 라일락이 생기 있고 몽환적인 눈매를 만든다고 보도했습니다.\n\n소프트 핑크(Soft Pink): 블러셔 컬러와 통일했을 때 완벽한 모노크로매틱 룩이 완성됩니다. 로맨틱하고 애틋한 봄 분위기를 연출합니다.\n\n중요한 팁: Cosmopolitan(2026)은 깊은 피부톤을 가진 사람에게는 리퀴드·크림 포뮬러나 파스텔 시머 아이섀도우가 발색력을 높인다고 조언합니다.",
          en: "Cosmopolitan (2026) and Voir Fashion UK identified three pastel colours as core to watercolour eye makeup.\n\nBaby Blue: A clear, cool sky-blue tone that suits fair to medium skin tones best. Paired with highlighter, it makes the eye area look even more defined.\n\nLilac: Soft purple is the most versatile colour in 2026 spring eye makeup. Cosmopolitan reported that regardless of skin shade, lilac creates a vibrant and dreamy-looking eye.\n\nSoft Pink: When matched with blush colour, it creates a perfect monochromatic look, evoking a romantic and tender spring atmosphere.\n\nImportant tip: Cosmopolitan (2026) advises that for deeper skin tones, liquid or cream formulas, or shimmer pastel eyeshadows, improve colour payoff.",
          zh: "Cosmopolitan（2026）和 Voir Fashion UK 将三种马卡龙色列为水彩眼妆的核心。\n\n宝宝蓝（Baby Blue）：清澈凉爽的天空蓝系，最适合白皙至中等肤色。搭配提亮产品使用，眼神更加明亮清晰。\n\n丁香紫（Lilac）：浅紫色是 2026 春季眼妆中最万能的颜色。Cosmopolitan 报道称，丁香紫无论深浅肤色都能打造出有活力又梦幻的眼神。\n\n柔粉（Soft Pink）：与腮红颜色统一时，能打造出完美的单色系妆容，营造浪漫温柔的春日氛围。\n\n重要提示：Cosmopolitan（2026）建议，深肤色人士使用液态或膏状配方，或珠光马卡龙色眼影，可提升显色度。",
          ja: "Cosmopolitan（2026）とVoir Fashion UKは、水彩アイメイクにおいて3つのパステルカラーを核心に挙げました。\n\nベビーブルー：澄んでひんやりとした空色系で、白い肌から中間の肌色に最もよく合います。ハイライターと合わせると目元がより際立ちます。\n\nライラック：薄紫は2026年春アイメイクで最も汎用性の高いカラーです。Cosmopolitanは肌の色調に関わらず、ライラックが生き生きとした幻想的な目元を作ると報じました。\n\nソフトピンク：チークカラーと合わせると完璧なモノクロマティックルックが完成し、ロマンティックで切ない春の雰囲気を演出します。\n\n重要なヒント：Cosmopolitan（2026）は、深い肌色の方にはリキッド・クリームフォーミュラや、パステルシマーアイシャドウが発色力を高めると助言しています。"
        },
        image: "/watercolour_palette.png",
        imageCaption: {
          ko: "2026 봄 핵심 파스텔 팔레트. 왼쪽부터 베이비 블루, 라일락, 소프트 핑크 (참고: Cosmopolitan, Voir Fashion UK 2026)",
          en: "2026 Spring core pastel palette. From left: Baby Blue, Lilac, Soft Pink (Reference: Cosmopolitan, Voir Fashion UK 2026)",
          zh: "2026 年春季核心马卡龙调色盘。从左起：宝宝蓝、丁香紫、柔粉（参考：Cosmopolitan、Voir Fashion UK 2026）",
          ja: "2026年春の核心パステルパレット。左からベビーブルー、ライラック、ソフトピンク（参考：Cosmopolitan、Voir Fashion UK 2026）"
        }
      }
    ]
  },
  {
    id: "peanut-butter-lips",
    title: {
      ko: "피너츠 버터 립, 2026년 K-뷰티가 정의하는 쿨톤 누드",
      en: "Peanut Butter Lips - The Cool-Toned Nude Redefined by K-Beauty 2026",
      zh: "花生酱唇，K-beauty 2026 重新定义的冷调裸色",
      ja: "ピーナッツバターリップ、Kビューティー2026が定義するクールトーンヌード"
    },
    description: {
      ko: "Bustle·Coveteur가 주목한 2026년 K-뷰티 립 트렌드. 베이지-브라운에 회색 언더톤을 더한 '뮤트(Mute)' 립 메이크업의 매력과 블러드 립 기법을 해설합니다.",
      en: "The 2026 K-beauty lip trend highlighted by Bustle and Coveteur. Explaining the charm of 'muted' lip makeup with a grey undertone added to beige-brown, and the blurred lip technique.",
      zh: "Bustle 和 Coveteur 关注的 2026 年 K-beauty 唇妆趋势。解析在米-棕色中加入灰色调的'低饱和（Muted）'唇妆的魅力及晕染唇技巧。",
      ja: "BustleとCoveteurが注目する2026年Kビューティーリップトレンド。ベージュブラウンにグレーのアンダートーンを加えた「ミュート（Muted）」リップの魅力とブラードリップテクニックを解説。"
    },
    metaTitle: {
      ko: "피너츠 버터 립 2026, K-뷰티 블러 립 완벽 가이드 | FINDCORE",
      en: "Peanut Butter Lips 2026, K-Beauty Blurred Lip Complete Guide | FINDCORE",
      zh: "花生酱唇 2026, K-beauty 晕染唇完整指南 | FINDCORE",
      ja: "ピーナッツバターリップ2026 Kビューティーブラードリップ完全ガイド | FINDCORE"
    },
    metaDescription: {
      ko: "2026년 Pantone 컬러 '모카 무스(Mocha Mousse 17-1230)'의 가벼운 진화형. Bustle·Marie Claire UK가 분석한 피너츠 버터 브라운 누드와 블러드 립 기법의 완벽한 실전 가이드.",
      en: "A lighter evolution of Pantone's 2026 colour 'Mocha Mousse 17-1230'. A complete practical guide to peanut butter brown nude and blurred lip technique, as analysed by Bustle and Marie Claire UK.",
      zh: "2026 年潘通年度色'摩卡慕斯（Mocha Mousse 17-1230）'的轻盈进化版。由 Bustle 和 Marie Claire UK 分析的花生酱棕色裸色及晕染唇技巧完整实战指南。",
      ja: "2026年パントン・カラー「モカムース（Mocha Mousse 17-1230）」の軽やかな進化形。BustleとMarie Claire UKが分析したピーナッツバターブラウンヌードとブラードリップテクニックの完全実践ガイド。"
    },
    image: "/peanut_butter_lips_2026.png",
    category: { ko: "뷰티", en: "Beauty", zh: "美容", ja: "ビューティー" },
    date: "2026.03.17",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: {
          ko: "모카 무스의 진화, 왜 피너츠 버터인가",
          en: "The Evolution of Mocha Mousse, Why Peanut Butter?",
          zh: "摩卡慕斯的进化，为什么是花生酱？",
          ja: "モカムースの進化 なぜピーナッツバターなのか"
        },
        text: {
          ko: "2026년 팬톤(Pantone)이 올해의 컬러로 선정한 '모카 무스(Mocha Mousse, 17-1230)'는 따뜻하고 포근한 카카오 브라운입니다. 그런데 K-뷰티는 이를 그대로 수용하지 않고 독자적인 방향으로 진화시켰습니다.\n\nBustle.com(2026)이 분석한 'K-뷰티 피너츠 버터 립'은 모카 무스보다 더 밝고 쿨한 방향의 베이지-브라운으로, 회색빛 언더톤이 가미되어 있습니다. 한국 뷰티 씬에서는 이를 '뮤트톤(Muted-tone) 메이크업' 혹은 '애쉬 누드(Ash Nude)'라 부르며, 특유의 '세련되고 도회적인 분위기'를 뜻합니다.\n\n캐러멜이나 웜 브라운과 명확히 구분되며, 채도를 낮추고 쿨한 회색조를 섞어 피부와 낮은 대비(Low-contrast)를 만드는 것이 핵심 특징입니다.",
          en: "Pantone's Colour of the Year for 2026, 'Mocha Mousse (17-1230)', is a warm, cosy cacao brown. However, K-beauty did not adopt this directly, but evolved it in its own direction.\n\nThe 'K-beauty Peanut Butter Lips' analysed by Bustle.com (2026) is a beige-brown that is brighter and cooler than Mocha Mousse, with a grey undertone added. In the Korean beauty scene, this is referred to as 'Muted-tone makeup' or 'Ash Nude,' signifying a uniquely 'refined and metropolitan atmosphere.'\n\nClearly distinguished from caramel or warm browns, the core characteristic is creating a low contrast with the skin by lowering saturation and mixing in a cool grey tone.",
          zh: "潘通（Pantone）评选的 2026 年年度色'摩卡慕斯（Mocha Mousse，17-1230）'是温暖舒适的可可棕。然而，K-beauty 并未原封不动地接受，而是向独特方向进行了进化。\n\nBustle.com（2026）分析的'K-beauty 花生酱唇'，是比摩卡慕斯更明亮、更冷调的米棕色，并加入了灰色调。在韩国美容圈，这被称为'低饱和（Muted-tone）妆容'或'灰调裸色（Ash Nude）'，代表着一种特有的'精致都市感氛围'。\n\n它与焦糖色或暖棕色有明显区别，核心特征是降低饱和度、混入冷灰调，与肤色形成低对比（Low-contrast）。",
          ja: "2026年のパントン・カラー・オブ・ザ・イヤー「モカムース（Mocha Mousse、17-1230）」は温かく心地よいカカオブラウンです。しかしKビューティーはこれをそのまま採用せず、独自の方向に進化させました。\n\nBustle.com（2026）が分析した「Kビューティーピーナッツバターリップ」は、モカムースより明るくクールな方向のベージュブラウンで、グレーのアンダートーンが加わっています。韓国ビューティーシーンではこれを「ミュートトーン（Muted-tone）メイク」または「アッシュヌード（Ash Nude）」と呼び、特有の「洗練された都会的な雰囲気」を意味します。\n\nキャラメルやウォームブラウンとは明確に区別され、彩度を下げクールなグレー調を混ぜることで肌との低コントラスト（Low-contrast）を作り出すのが核心的な特徴です。"
        }
      },
      {
        subtitle: {
          ko: "블러드 립(Blurred Lip), 경계를 지우는 기술",
          en: "Blurred Lip, The Technique of Erasing Boundaries",
          zh: "晕染唇（Blurred Lip），消除轮廓的技巧",
          ja: "ブラードリップ 境界を消す技術"
        },
        text: {
          ko: "피너츠 버터 립 트렌드의 또 다른 핵심은 적용 기법입니다. Coveteur, Marie Claire UK, Confaloniericosmetica 등이 공통적으로 주목한 것은 '블러드 립(Blurred Lip)' 기법입니다.\n\n블러드 립은 립라이너를 먼저 바르고 그 경계를 손가락이나 면봉으로 부드럽게 번지게 한 후, 립 컬러를 그 위에 가볍게 얹는 방식입니다. 선명한 윤곽선 대신 자연스럽게 퍼진 가장자리가 '생활감 있는(lived-in)' 입술을 만들어냅니다.\n\nNSS Magazine(2026)은 이 기법이 '정밀함보다 즉흥성을 중시하는 Z세대의 미적 감수성'과 맥을 같이 한다고 분석했습니다. 완벽하게 채워진 립보다 살짝 바랜 듯한 자연스러운 마무리가 오히려 더 세련되게 보입니다.",
          en: "Another core element of the Peanut Butter Lip trend is the application technique. What Coveteur, Marie Claire UK, and Confaloniericosmetica all highlighted is the 'Blurred Lip' technique.\n\nThe blurred lip involves first applying a lip liner, then gently diffusing the edges with a finger or cotton swab, before lightly layering the lip colour on top. Instead of a sharp outline, naturally spread edges create a 'lived-in' lip.\n\nNSS Magazine (2026) analysed that this technique aligns with 'Gen Z's aesthetic sensibility that values spontaneity over precision.' A naturally faded, slightly worn finish appears more refined than a perfectly filled-in lip.",
          zh: "花生酱唇趋势的另一核心在于涂抹技巧。Coveteur、Marie Claire UK 和 Confaloniericosmetica 共同关注的是'晕染唇（Blurred Lip）'技巧。\n\n晕染唇是先涂上唇线笔，再用手指或棉签轻柔地将边缘晕染开来，然后将唇色轻轻叠加在上面。用自然晕开的边缘代替清晰的轮廓线，打造出'生活感（lived-in）'唇妆。\n\nNSS Magazine（2026）分析称，这一技巧与'Z 世代重视即兴感而非精准度的审美感受力'一脉相承。比起完美填满的唇妆，略显自然褪色感的妆效看起来反而更加精致。",
          ja: "ピーナッツバターリップトレンドのもう一つの核心は塗り方にあります。Coveteur、Marie Claire UK、Confaloniericosmeticaが共通して注目したのは「ブラードリップ（Blurred Lip）」テクニックです。\n\nブラードリップはリップライナーを先に塗り、その境界を指や綿棒で柔らかく滲ませた後、リップカラーを軽くその上に乗せる方法です。鮮明なアウトラインの代わりに自然に広がったエッジが「生活感のある（lived-in）」唇を作り出します。\n\nNSS Magazine（2026）は、このテクニックが「精密さより即興性を重視するZ世代の美的感受性」と軌を一にすると分析しました。完璧に塗り込まれたリップより、少し色褪せたような自然な仕上がりがむしろ洗練されて見えます。"
        },
        image: "/peanut_butter_blurred_lip.png",
        imageCaption: {
          ko: "블러드 립 기법으로 경계를 부드럽게 풀어낸 쿨톤 누드 립 메이크업",
          en: "Cool-toned nude lip makeup with blurred edges",
          zh: "使用晕染技巧打造边缘柔和的冷调裸色唇妆",
          ja: "ブラードリップテクニックで境界をふんわりとぼかしたクールトーンヌードリップ"
        },
        list: {
          ko: ["립라이너를 입술 경계에 바른 뒤 손가락으로 안쪽으로 두드려 스며들게 한다", "피너츠 버터 계열의 쿨톤 누드 립스틱을 손가락으로 가운데부터 가볍게 두드려 발색", "입술 중앙에만 살짝 글로스를 추가해 입체감을 주되, 가장자리에는 묻히지 않는다", "매칭 베이지 블러셔로 모노크로매틱 룩 완성 — 눈·볼·입술이 같은 색조 계열로 통일"],
          en: ["Apply lip liner to the lip line, then tap inward with a finger to blend it in", "Pat a cool-toned nude peanut butter-shade lipstick lightly from the centre using a finger", "Add a small amount of gloss only to the centre of the lips for dimension, without touching the edges", "Complete the monochromatic look with a matching beige blush — unifying eyes, cheeks, and lips in the same colour family"],
          zh: ["将唇线笔涂于唇部轮廓后，用手指向内轻拍使其融合", "用手指将冷调裸色花生酱系唇膏从中心轻轻拍开显色", "只在嘴唇中央轻点少量唇蜜以增加立体感，注意不要碰到边缘", "搭配同色系米色腮红完成单色系妆容——眼、颊、唇统一在同一色调系列"],
          ja: ["リップライナーを唇の輪郭に塗った後、指で内側に向かってたたき込む", "クールトーンのヌードピーナッツバター系リップスティックを指で中心から軽くたたいて発色させる", "唇の中央だけに少量グロスを加えて立体感を出し、フチには付けない", "マッチングのベージュチークでモノクロマティックルックを完成——目・頰・唇を同じカラートーン系列で統一"]
        }
      }
    ]
  },
  {
    id: "sunscreen-trends-2026",
    title: {
      ko: "선크림의 진화, 미네랄 vs 케미컬 자외선 차단의 과학",
      en: "The Evolution of Sunscreen, Mineral vs Chemical UV Protection Science",
      zh: "防晒霜的进化，物理防晒 vs 化学防晒的科学",
      ja: "日焼け止めの進化、ミネラル vs ケミカルUVプロテクションの科学"
    },
    description: {
      ko: "자외선 차단 성분의 과학적 원리와 최신 트렌드. 징크옥사이드와 화학 필터의 차이, 리프세이프 포뮬러, FDA 규제 변화까지 정리합니다.",
      en: "The science behind UV protection ingredients and latest trends. From zinc oxide vs chemical filters to reef-safe formulas and FDA regulatory changes.",
      zh: "紫外线防护成分的科学原理与最新趋势。从氧化锌与化学防晒剂的区别到珊瑚友好配方和FDA法规变化。",
      ja: "紫外線防御成分の科学的原理と最新トレンド。酸化亜鉛とケミカルフィルターの違い、リーフセーフ処方、FDA規制変更まで。"
    },
    metaTitle: { ko: "선크림 미네랄 vs 케미컬 과학 가이드 | FINDCORE", en: "Sunscreen Mineral vs Chemical Science Guide | FINDCORE", zh: "防晒霜物理 vs 化学防晒科学指南 | FINDCORE", ja: "日焼け止めミネラル vs ケミカル科学ガイド | FINDCORE" },
    metaDescription: { ko: "징크옥사이드·티타늄디옥사이드의 물리적 차단 원리부터 최신 하이브리드 포뮬러, 2025년 미국 SAFE Sunscreen Standards Act까지 정리한 완벽 가이드.", en: "Complete guide from zinc oxide and titanium dioxide physical blocking to hybrid formulas and the 2025 US SAFE Sunscreen Standards Act.", zh: "从氧化锌和二氧化钛的物理阻隔原理到混合配方及2025年美国SAFE防晒标准法案的完整指南。", ja: "酸化亜鉛・二酸化チタンの物理ブロック原理から最新ハイブリッド処方、2025年米国SAFEサンスクリーン基準法まで。" },
    image: "/sunscreen_trends_2026.png",
    category: { ko: "뷰티", en: "Beauty", zh: "美容", ja: "ビューティー" },
    date: "2026.03.18",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "미네랄 vs 케미컬, 자외선 차단의 두 가지 원리", en: "Mineral vs Chemical, Two Principles of UV Protection", zh: "物理 vs 化学，紫外线防护的两大原理", ja: "ミネラル vs ケミカル 紫外線防御の2つの原理" },
        text: {
          ko: "자외선 차단제는 크게 미네랄(물리적)과 케미컬(화학적) 두 가지로 나뉩니다. 미네랄 자외선 차단제는 징크옥사이드(Zinc Oxide)와 티타늄디옥사이드(Titanium Dioxide) 두 가지 성분을 사용합니다. 이 성분들은 FDA가 GRASE(Generally Recognized as Safe and Effective)로 분류한 유일한 두 가지 자외선 차단 성분입니다.\n\n미네랄 필터는 피부 표면에 물리적 막을 형성하여 UV를 반사·산란시키는 원리로 작동합니다. 반면 케미컬 필터(아보벤존, 옥시벤존, 옥티녹세이트 등)는 UV를 흡수하여 열에너지로 변환합니다. 각각 장단점이 있는데, 미네랄 필터는 바르자마자 즉시 효과가 나타나고 자극이 적지만 백탁 현상이 있을 수 있고, 케미컬 필터는 텍스처가 가볍지만 도포 후 약 15-30분 후에 효과가 시작됩니다.\n\n최근에는 두 방식을 결합한 '하이브리드 시스템'이 주목받고 있습니다. 미네랄과 케미컬 필터를 함께 사용하면서 항산화 성분, 안티폴루션 성분을 추가하여 UV뿐 아니라 블루라이트(HEV)까지 방어하는 종합적 광보호 포뮬러가 등장하고 있습니다.",
          en: "Sunscreens are broadly divided into mineral (physical) and chemical types. Mineral sunscreens use two ingredients: zinc oxide and titanium dioxide. These are the only two UV filter ingredients classified as GRASE (Generally Recognized as Safe and Effective) by the FDA.\n\nMineral filters work by forming a physical film on the skin surface that reflects and scatters UV rays. Chemical filters (avobenzone, oxybenzone, octinoxate, etc.) absorb UV and convert it into heat energy. Each has pros and cons: mineral filters work immediately upon application and have lower irritation potential but may leave a white cast, while chemical filters have lighter textures but take approximately 15-30 minutes after application to become effective.\n\nRecently, 'hybrid systems' combining both approaches have gained attention. By using mineral and chemical filters together with antioxidants and anti-pollution ingredients, comprehensive photoprotection formulas that defend against not only UV but also blue light (HEV) have emerged.",
          zh: "防晒霜大致分为物理（矿物）和化学两种类型。物理防晒霜使用两种成分：氧化锌和二氧化钛。这是FDA认定为GRASE（公认安全有效）的仅有的两种紫外线过滤成分。\n\n物理过滤剂通过在皮肤表面形成物理薄膜来反射和散射紫外线。化学过滤剂（阿伏苯宗、二苯酮-3、甲氧基肉桂酸辛酯等）则吸收紫外线并将其转化为热能。两者各有优缺点：物理过滤剂涂抹后立即生效、刺激性低，但可能出现泛白现象；化学过滤剂质地轻薄，但涂抹后约15-30分钟才开始生效。\n\n近年来，结合两种方式的'混合系统'备受关注。将物理和化学过滤剂与抗氧化成分、抗污染成分结合使用，出现了不仅防御紫外线还能抵御蓝光（HEV）的综合光防护配方。",
          ja: "日焼け止めは大きくミネラル（物理的）とケミカル（化学的）の2種類に分けられます。ミネラル日焼け止めは酸化亜鉛と二酸化チタンの2成分を使用します。これらはFDAがGRASE（一般的に安全かつ有効と認められた）に分類した唯一の2つのUVフィルター成分です。\n\nミネラルフィルターは肌表面に物理的な膜を形成してUVを反射・散乱させる原理で作動します。一方、ケミカルフィルター（アボベンゾン、オキシベンゾン、オクチノキサートなど）はUVを吸収して熱エネルギーに変換します。それぞれ長短所があり、ミネラルフィルターは塗布直後から効果が現れ刺激が少ないですが白浮きの可能性があり、ケミカルフィルターはテクスチャーが軽いですが塗布後約15-30分で効果が始まります。\n\n最近では両方を組み合わせた「ハイブリッドシステム」が注目されています。ミネラルとケミカルフィルターを併用しながら抗酸化成分やアンチポリューション成分を追加し、UVだけでなくブルーライト（HEV）まで防御する総合的な光保護フォーミュラが登場しています。"
        }
      },
      {
        subtitle: { ko: "규제 변화와 리프세이프 포뮬러의 부상", en: "Regulatory Changes and the Rise of Reef-Safe Formulas", zh: "法规变化与珊瑚友好配方的崛起", ja: "規制変化とリーフセーフ処方の台頭" },
        text: {
          ko: "자외선 차단제 산업에 큰 변화를 가져온 것은 환경 규제와 신성분 승인 절차의 개혁입니다. 2025년 11월 미국에서 'SAFE Sunscreen Standards Act'가 통과되면서, 새로운 자외선 차단 성분의 심사 프로세스가 간소화되었습니다. 이 법안은 유럽과 아시아에서 이미 사용되고 있지만 미국에서 승인되지 않았던 혁신적 필터 성분이 시장에 진입할 수 있는 길을 열었습니다.\n\n환경 면에서는 하와이, 팔라우, 미국 버진아일랜드 등에서 옥시벤존과 옥티녹세이트를 금지한 것이 결정적이었습니다. 이들 성분이 산호초 백화 현상에 기여한다는 연구 결과가 축적되면서 '리프세이프(Reef-Safe)' 포뮬러가 대세가 되었습니다. 리프세이프 선크림은 주로 징크옥사이드, 티타늄디옥사이드 같은 미네랄 성분을 기본으로 하며, 생분해성 포뮬러를 채택합니다.\n\n또한 '스킨화(Skinification)' 트렌드에 따라 자외선 차단제가 단순 보호를 넘어 나이아신아마이드, 세라마이드, 비타민 C·E 등 스킨케어 활성 성분을 포함하는 '하이브리드 스킨케어-선크림'으로 진화하는 흐름이 뚜렷합니다. 마이크로화된 징크옥사이드 기술의 발전으로 백탁 현상도 크게 개선되어, 모든 피부톤에서 자연스러운 마무리가 가능해졌습니다.",
          en: "The sunscreen industry has been transformed by environmental regulation and reform of new ingredient approval processes. In November 2025, the US passed the 'SAFE Sunscreen Standards Act,' streamlining the review process for new sunscreen ingredients. This legislation opened the door for innovative filter ingredients already used in Europe and Asia but not yet approved in the US.\n\nEnvironmentally, the banning of oxybenzone and octinoxate in Hawaii, Palau, and the US Virgin Islands was decisive. As research accumulated showing these ingredients contribute to coral reef bleaching, 'reef-safe' formulas became the dominant trend. Reef-safe sunscreens primarily use mineral ingredients like zinc oxide and titanium dioxide as their base and adopt biodegradable formulas.\n\nAdditionally, the 'skinification' trend has driven a clear evolution of sunscreens beyond simple protection into 'hybrid skincare-sunscreens' incorporating active skincare ingredients such as niacinamide, ceramides, and vitamins C and E. Advances in micronised zinc oxide technology have also significantly reduced white cast issues, enabling a natural finish on all skin tones.",
          zh: "防晒行业的重大变革源于环境法规和新成分审批流程的改革。2025年11月，美国通过了'SAFE防晒标准法案'，简化了新防晒成分的审查流程。该法案为已在欧洲和亚洲使用但尚未在美国获批的创新过滤成分打开了市场大门。\n\n在环保方面，夏威夷、帕劳、美属维尔京群岛等地禁用二苯酮-3和甲氧基肉桂酸辛酯起到了决定性作用。随着研究证据表明这些成分加剧珊瑚白化，'珊瑚友好（Reef-Safe）'配方成为主流趋势。珊瑚友好防晒霜主要以氧化锌、二氧化钛等矿物成分为基础，并采用可生物降解配方。\n\n此外，'护肤化（Skinification）'趋势推动防晒霜超越单纯防护，进化为含烟酰胺、神经酰胺、维生素C和E等活性护肤成分的'混合护肤型防晒'。微粒化氧化锌技术的进步也大幅改善了泛白问题，使所有肤色都能实现自然妆效。",
          ja: "日焼け止め産業に大きな変化をもたらしたのは環境規制と新成分承認プロセスの改革です。2025年11月、米国で「SAFEサンスクリーン基準法」が通過し、新しい日焼け止め成分の審査プロセスが簡素化されました。この法案はヨーロッパやアジアですでに使用されていますが米国では未承認だった革新的フィルター成分の市場参入の道を開きました。\n\n環境面では、ハワイ、パラオ、米領ヴァージン諸島などでオキシベンゾンとオクチノキサートが禁止されたことが決定的でした。これらの成分がサンゴの白化現象に寄与するという研究結果が蓄積され、「リーフセーフ」フォーミュラが主流となりました。リーフセーフ日焼け止めは主に酸化亜鉛、二酸化チタンなどのミネラル成分をベースに、生分解性フォーミュラを採用しています。\n\nまた「スキニフィケーション」トレンドに伴い、日焼け止めが単純な保護を超えてナイアシンアミド、セラミド、ビタミンC・Eなどのスキンケア活性成分を含む「ハイブリッドスキンケア日焼け止め」へと進化する流れが明確です。マイクロ化された酸化亜鉛技術の進歩により白浮き問題も大幅に改善され、すべての肌色で自然な仕上がりが可能になりました。"
        }
      }
    ]
  },
  {
    id: "retinol-vs-bakuchiol",
    title: { ko: "레티놀 vs 바쿠치올, 임상연구로 본 안티에이징 성분 비교", en: "Retinol vs Bakuchiol, Anti-Ageing Ingredients Compared by Clinical Research", zh: "视黄醇 vs 补骨脂酚，临床研究揭示的抗衰成分对比", ja: "レチノール vs バクチオール 臨床研究で見る抗エイジング成分比較" },
    description: { ko: "British Journal of Dermatology에 발표된 임상연구를 기반으로, 레티놀과 바쿠치올의 효능·자극도·안전성을 객관적으로 비교합니다.", en: "Based on clinical research published in the British Journal of Dermatology, objectively comparing retinol and bakuchiol in efficacy, irritation, and safety.", zh: "基于《英国皮肤病学杂志》发表的临床研究，客观对比视黄醇与补骨脂酚的功效、刺激性和安全性。", ja: "British Journal of Dermatologyに発表された臨床研究に基づき、レチノールとバクチオールの効能・刺激性・安全性を客観比較。" },
    metaTitle: { ko: "레티놀 vs 바쿠치올 임상연구 비교 | FINDCORE", en: "Retinol vs Bakuchiol Clinical Research Comparison | FINDCORE", zh: "视黄醇 vs 补骨脂酚临床研究对比 | FINDCORE", ja: "レチノール vs バクチオール臨床研究比較 | FINDCORE" },
    metaDescription: { ko: "British Journal of Dermatology 임상연구 기반, 레티놀과 바쿠치올의 주름 개선·색소침착·자극도를 비교한 객관적 가이드.", en: "Based on British Journal of Dermatology clinical studies. Objective guide comparing retinol and bakuchiol for wrinkles, pigmentation, and irritation.", zh: "基于《英国皮肤病学杂志》临床研究，客观对比视黄醇与补骨脂酚在皱纹改善、色素沉着和刺激性方面的表现。", ja: "British Journal of Dermatology臨床研究に基づく、レチノールとバクチオールのシワ改善・色素沈着・刺激性の客観的比較ガイド。" },
    image: "/retinol_bakuchiol_2026.png",
    category: { ko: "뷰티", en: "Beauty", zh: "美容", ja: "ビューティー" },
    date: "2026.03.18",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "레티놀, 수십 년간 검증된 안티에이징 표준 성분", en: "Retinol, The Gold Standard Anti-Ageing Ingredient Backed by Decades of Research", zh: "视黄醇，数十年验证的抗衰黄金标准成分", ja: "レチノール 数十年のリサーチに裏付けられたアンチエイジングの標準成分" },
        text: {
          ko: "레티놀(Retinol)은 비타민 A의 유도체로, 피부 내에서 레티노산(Retinoic Acid)으로 전환되어 효과를 발휘합니다(Journal of Clinical and Aesthetic Dermatology). 그 작용 메커니즘은 세포 증식률을 높이고, 표피를 두텁게 하며, 콜라겐 합성을 촉진하고 분해를 억제하는 것입니다.\n\nDermatology Times에 보도된 임상연구에서 0.1% 레티놀을 12주간 사용한 결과, 눈가 주름(crow's feet), 안면 주름, 불균일한 피부톤, 갈색 반점, 전반적 광노화 징후 모두에서 통계적으로 유의미한 개선이 관찰되었으며, 일부 효과는 4주 만에 시각적으로 확인되었습니다.\n\n다만 레티놀의 단점도 명확합니다. 사용 초기에 피부 각질 벗겨짐(peeling), 따가움(stinging), 건조, 화끈거림이 나타날 수 있으며, 자외선 민감도가 증가하므로 반드시 자외선 차단제와 함께 사용해야 합니다. 또한 임신 중에는 사용이 금지되는 성분입니다.",
          en: "Retinol is a vitamin A derivative that converts into retinoic acid within the skin to exert its effects (Journal of Clinical and Aesthetic Dermatology). Its mechanisms include increasing cell proliferation rates, thickening the epidermis, stimulating collagen synthesis, and inhibiting collagen breakdown.\n\nA clinical study reported by Dermatology Times showed that 12 weeks of 0.1% retinol use produced statistically significant improvements in crow's feet, facial wrinkles, uneven skin tone, brown spots, and overall photoaging signs, with some results visible as early as four weeks.\n\nHowever, retinol's drawbacks are clear. Initial use can cause skin peeling, stinging, dryness, and burning, and it increases UV sensitivity, making sunscreen an absolute necessity. Additionally, retinol is contraindicated during pregnancy.",
          zh: "视黄醇是维生素A的衍生物，在皮肤内转化为维甲酸（Retinoic Acid）后发挥作用（《临床与美容皮肤病学杂志》）。其作用机制包括提高细胞增殖率、增厚表皮、促进胶原蛋白合成并抑制其分解。\n\nDermatology Times报道的一项临床研究显示，使用0.1%视黄醇12周后，在鱼尾纹、面部皱纹、肤色不均、褐色斑点和整体光老化迹象方面均观察到统计学上显著的改善，部分效果在4周内即可肉眼观察到。\n\n然而视黄醇的缺点也很明显。使用初期可能出现脱皮、刺痛、干燥和灼热感，且会增加紫外线敏感性，必须配合防晒使用。此外，妊娠期间禁止使用该成分。",
          ja: "レチノールはビタミンA誘導体で、肌内でレチノイン酸に変換されて効果を発揮します（Journal of Clinical and Aesthetic Dermatology）。その作用メカニズムは細胞増殖率を高め、表皮を厚くし、コラーゲン合成を促進し分解を抑制することです。\n\nDermatology Timesに報告された臨床研究では、0.1%レチノールを12週間使用した結果、目尻のシワ、顔面のシワ、不均一な肌トーン、茶色い斑点、全体的な光老化の兆候すべてで統計的に有意な改善が観察され、一部の効果は4週間で視覚的に確認されました。\n\nただしレチノールの短所も明確です。使用初期に皮膚の剥離、チクチク感、乾燥、ヒリヒリ感が出る可能性があり、紫外線感受性が増加するため必ず日焼け止めと併用する必要があります。また妊娠中は使用禁忌の成分です。"
        }
      },
      {
        subtitle: { ko: "바쿠치올, 식물 유래의 레티놀 대안", en: "Bakuchiol, The Plant-Derived Retinol Alternative", zh: "补骨脂酚，植物来源的视黄醇替代品", ja: "バクチオール 植物由来のレチノール代替成分" },
        text: {
          ko: "바쿠치올(Bakuchiol)은 포랄레아 코릴리폴리아(Psoralea corylifolia, 보골지)라는 식물에서 추출한 천연 성분입니다. 레티놀과 화학적 구조는 전혀 다르지만, 피부에서 유사한 유전자 발현 패턴을 유도한다는 의미에서 '기능적 유사체(functional analogue)'로 분류됩니다(NIH/PubMed).\n\nBritish Journal of Dermatology에 발표된 비교 임상연구에서, 바쿠치올과 레티놀은 주름 면적 감소와 색소침착 개선 모두에서 통계적으로 유의미한 차이가 없는 것으로 나타났습니다. 바쿠치올은 I형, III형, IV형 콜라겐을 상향 조절하여 피부 탄력과 밀도를 개선하는 것으로 확인되었습니다.\n\n가장 중요한 차이는 내약성(tolerability)입니다. 같은 연구에서 레티놀 사용자들은 바쿠치올 사용자 대비 유의하게 더 많은 각질 벗겨짐과 따가움을 보고했습니다. 바쿠치올은 민감성 피부에도 잘 맞고, 임신 중에도 안전한 것으로 간주됩니다(Women's Health Magazine). 다만 바쿠치올에 대한 대규모 장기 임상연구는 레티놀에 비해 아직 적으므로, 장기적 효능에 대해서는 추가 연구가 필요합니다.",
          en: "Bakuchiol is a natural compound extracted from the plant Psoralea corylifolia. While structurally unrelated to retinol, it is classified as a 'functional analogue' because it induces similar gene expression patterns in the skin (NIH/PubMed).\n\nA comparative clinical study published in the British Journal of Dermatology found no statistically significant differences between bakuchiol and retinol in reducing wrinkle surface area and improving hyperpigmentation. Bakuchiol was confirmed to upregulate types I, III, and IV collagen, improving skin elasticity and density.\n\nThe most important difference is tolerability. In the same study, retinol users reported significantly more scaling and stinging than bakuchiol users. Bakuchiol is well-suited for sensitive skin and is considered safe during pregnancy (Women's Health Magazine). However, large-scale long-term clinical studies on bakuchiol remain fewer compared to retinol, so further research on long-term efficacy is needed.",
          zh: "补骨脂酚是从补骨脂（Psoralea corylifolia）植物中提取的天然成分。虽然与视黄醇的化学结构完全不同，但因其在皮肤中诱导相似的基因表达模式，被归类为'功能类似物（functional analogue）'（NIH/PubMed）。\n\n发表在《英国皮肤病学杂志》上的对比临床研究发现，补骨脂酚与视黄醇在减少皱纹面积和改善色素沉着方面均无统计学上的显著差异。补骨脂酚被证实能上调I型、III型和IV型胶原蛋白，改善皮肤弹性和致密度。\n\n最重要的区别在于耐受性。同一研究中，视黄醇使用者报告的脱皮和刺痛现象显著多于补骨脂酚使用者。补骨脂酚适合敏感性皮肤，且在妊娠期间也被认为是安全的（Women's Health Magazine）。但补骨脂酚的大规模长期临床研究相比视黄醇仍然较少，长期功效仍需进一步研究证实。",
          ja: "バクチオールはナンキンハゼ（Psoralea corylifolia）という植物から抽出された天然成分です。レチノールとは化学構造が全く異なりますが、皮膚で類似した遺伝子発現パターンを誘導するという意味で「機能的類似体（functional analogue）」と分類されます（NIH/PubMed）。\n\nBritish Journal of Dermatologyに発表された比較臨床研究では、バクチオールとレチノールはシワ面積の減少と色素沈着改善の両方で統計的に有意な差がないことが分かりました。バクチオールはI型、III型、IV型コラーゲンをアップレギュレートし、肌の弾力と密度を改善することが確認されました。\n\n最も重要な違いは忍容性です。同じ研究でレチノール使用者はバクチオール使用者と比較して有意に多くの角質剥離とチクチク感を報告しました。バクチオールは敏感肌にも適しており、妊娠中も安全とされています（Women's Health Magazine）。ただしバクチオールに対する大規模長期臨床研究はレチノールに比べてまだ少ないため、長期的な効能については追加研究が必要です。"
        }
      }
    ]
  },
  {
    id: "face-shape-eyeglasses-guide",
    title: { ko: "얼굴형별 안경테 가이드, 검안 전문가의 조언", en: "Face Shape Eyeglasses Guide, Expert Optometrist Advice", zh: "脸型配眼镜指南，视光专家建议", ja: "顔型別メガネフレームガイド 検眼専門家のアドバイス" },
    description: { ko: "All About Vision, Warby Parker 등 검안 전문 매체의 가이드를 기반으로, 얼굴형별 최적의 안경테를 정리합니다.", en: "Based on guides from optometry sources like All About Vision and Warby Parker, the optimal frames for each face shape.", zh: "基于All About Vision、Warby Parker等视光专业媒体的指南，整理各脸型的最佳镜框。", ja: "All About Vision、Warby Parker等の検眼専門メディアのガイドに基づく、顔型別最適フレームまとめ。" },
    metaTitle: { ko: "얼굴형별 안경테 완벽 가이드 | FINDCORE", en: "Face Shape Eyeglasses Complete Guide | FINDCORE", zh: "脸型配眼镜完美指南 | FINDCORE", ja: "顔型別メガネフレーム完全ガイド | FINDCORE" },
    metaDescription: { ko: "둥근형·타원형·각진형·하트형·다이아몬드형·긴형 등 6가지 얼굴형별 프레임 추천. 검안 전문 매체 기반 가이드.", en: "Frame recommendations for 6 face shapes: round, oval, square, heart, diamond, and oblong. Based on optometry expert sources.", zh: "圆形、椭圆形、方形、心形、菱形、长形等6种脸型的镜框推荐。基于视光专业媒体指南。", ja: "丸顔・卵型・四角・ハート・ダイヤモンド・長顔の6つの顔型別フレーム推薦。検眼専門メディア基盤ガイド。" },
    image: "/eyeglasses_faceshape_2026.png",
    category: { ko: "스타일", en: "Style", zh: "风格", ja: "スタイル" },
    date: "2026.03.18",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "둥근형·타원형·각진형, 기본 3가지 얼굴형의 안경 선택법", en: "Round, Oval, and Square, Choosing Glasses for Three Basic Face Shapes", zh: "圆形、椭圆形、方形，三种基本脸型的选镜法", ja: "丸顔・卵型・四角 基本3つの顔型のメガネ選び" },
        text: {
          ko: "검안 전문 매체 All About Vision과 미국검안사협회(Optometrists.org)에 따르면, 안경테 선택의 핵심 원칙은 '대비(contrast)'입니다. 얼굴의 자연스러운 선과 반대되는 프레임을 선택하면 균형 잡힌 인상을 만들 수 있습니다.\n\n둥근형 얼굴(폭과 길이가 비슷하고 곡선이 부드러운 형태)에는 각진 프레임이 어울립니다. 직사각형, 정사각형, 기하학적 프레임이 부드러운 이목구비에 구조감을 더합니다. 캣아이 프레임도 시선을 위로 끌어올려 좋은 선택입니다. 반면 둥근 프레임은 얼굴의 둥근 인상을 강조하므로 피하는 것이 좋습니다(Heartland Optical).\n\n타원형 얼굴은 비율이 가장 균형 잡힌 형태로, 대부분의 프레임이 잘 어울립니다. Warby Parker는 타원형 얼굴에 정사각형, 직사각형, 기하학적 프레임으로 자연스러운 균형 위에 구조감을 더할 것을 추천합니다. 얼굴의 가장 넓은 부분과 같거나 약간 넓은 프레임을 선택하는 것이 핵심입니다.\n\n각진형(사각형) 얼굴은 강한 턱선과 넓은 이마가 특징입니다. 이 경우 둥근 또는 타원형 프레임이 강한 각도를 부드럽게 완화합니다. 얇은 프레임이 광대뼈보다 약간 넓으면 자연스러운 중화 효과를 줍니다. 에비에이터 프레임도 각진 인상을 부드럽게 만드는 좋은 선택입니다(LensDirect, Optica Optometry).",
          en: "According to All About Vision and the American Optometric Association (Optometrists.org), the core principle of frame selection is 'contrast.' Choosing frames that oppose your face's natural lines creates a balanced impression.\n\nFor round faces (similar width and length with soft curves), angular frames are ideal. Rectangular, square, and geometric frames add structure to soft features. Cat-eye frames also work well by drawing the eye upward. Round frames should be avoided as they emphasise the face's roundness (Heartland Optical).\n\nOval faces have the most balanced proportions, and most frame styles suit them well. Warby Parker recommends square, rectangular, or geometric frames to add structure atop natural balance. The key is selecting frames that are as wide as or slightly wider than the face's broadest part.\n\nSquare faces feature a strong jawline and broad forehead. Round or oval frames effectively soften angular features. Thin frames slightly wider than the cheekbones provide a natural counterbalance. Aviator frames are also a great choice for softening angular impressions (LensDirect, Optica Optometry).",
          zh: "根据All About Vision和美国验光师协会（Optometrists.org），镜框选择的核心原则是'对比（contrast）'。选择与面部自然线条相反的镜框可以营造平衡的印象。\n\n圆形脸（宽度和长度相近，曲线柔和）适合棱角分明的镜框。长方形、正方形和几何形镜框能为柔和的五官增添结构感。猫眼镜框也是不错的选择，能将视线引向上方。应避免圆形镜框，因为它们会强调脸部的圆润感（Heartland Optical）。\n\n椭圆形脸比例最均衡，大多数镜框都适合。Warby Parker建议使用正方形、长方形或几何形镜框在自然平衡的基础上增添结构感。关键是选择与面部最宽处等宽或略宽的镜框。\n\n方形脸的特征是棱角分明的下颌线和宽阔的额头。圆形或椭圆形镜框能有效柔化强硬的线条。略宽于颧骨的细框能提供自然的中和效果。飞行员镜框也是柔化方形印象的好选择（LensDirect, Optica Optometry）。",
          ja: "検眼専門メディアAll About Visionと米国検眼士協会（Optometrists.org）によれば、フレーム選択の核心原則は「コントラスト」です。顔の自然なラインと対照的なフレームを選ぶことで、バランスの取れた印象を作ることができます。\n\n丸顔（幅と長さが似ていて曲線が柔らかい形）には角のあるフレームが合います。長方形、正方形、幾何学的フレームが柔らかい目鼻立ちに構造感を加えます。キャットアイフレームも視線を上に引き上げて良い選択です。一方、丸いフレームは顔の丸い印象を強調するため避けた方が良いです（Heartland Optical）。\n\n卵型顔はプロポーションが最もバランスの取れた形で、ほとんどのフレームが似合います。Warby Parkerは卵型顔にスクエア、レクタングル、幾何学的フレームで自然なバランスの上に構造感を加えることを推奨しています。顔の最も広い部分と同じか少し広いフレームを選ぶのがポイントです。\n\n四角い顔は強い顎のラインと広い額が特徴です。この場合、丸いまたは楕円形のフレームが強い角度を柔らかく和らげます。頬骨より少し広い薄いフレームが自然な中和効果を与えます。アビエーターフレームも角張った印象を柔らかくする良い選択です（LensDirect, Optica Optometry）。"
        }
      },
      {
        subtitle: { ko: "하트형·다이아몬드형·긴형, 특수 얼굴형의 프레임 선택", en: "Heart, Diamond, and Oblong, Frame Selection for Special Face Shapes", zh: "心形、菱形、长形，特殊脸型的镜框选择", ja: "ハート型・ダイヤモンド型・面長 特殊顔型のフレーム選択" },
        text: {
          ko: "하트형 얼굴은 이마가 가장 넓고 턱이 좁아지는 형태입니다. All About Vision은 하단이 넓거나 밝은 색상의 림을 가진 프레임, 세미리밀리스(반무테) 또는 리밀리스(무테) 안경을 추천합니다. 이는 넓은 이마에서 시선을 분산하고 좁은 턱 부근에 시각적 무게를 더합니다. 캣아이 프레임도 광대뼈를 강조하고 얼굴을 리프팅합니다. 반면 과도하게 두꺼운 상단 프레임은 이마를 더 넓어 보이게 할 수 있으므로 주의합니다(Warby Parker).\n\n다이아몬드형 얼굴은 가장 희귀한 얼굴형 중 하나로, 이마와 턱이 좁고 광대뼈가 넓고 돋보이는 형태입니다. 캣아이나 타원형 프레임이 광대뼈를 강조하면서도 좁은 이마·턱과 조화를 이룹니다. 리밀리스 안경은 섬세한 이목구비를 압도하지 않으면서 깔끔한 인상을 줍니다(Zenni Optical, EyeBuyDirect).\n\n긴형(직사각형/장타원형) 얼굴은 세로 길이가 가로보다 긴 형태입니다. 오버사이즈 프레임이 시각적 넓이감을 더하고, 둥근 또는 정사각형 렌즈가 얼굴 비율의 균형을 잡아줍니다. 렌즈 높이가 큰 딥 프레임이 주요 포인트입니다. 반면 좁거나 직사각형의 세로가 짧은 프레임은 얼굴이 더 길어 보이게 할 수 있으므로 피합니다(Visionworks, All About Vision).",
          en: "Heart-shaped faces are widest at the forehead and taper to a narrow chin. All About Vision recommends frames with wider bottoms or light-coloured rims, semi-rimless, or rimless glasses. These disperse attention from a broad forehead and add visual weight near the narrow chin. Cat-eye frames also highlight cheekbones and lift the face. However, excessively thick upper frames may make the forehead appear wider (Warby Parker).\n\nDiamond-shaped faces are among the rarest, with narrow foreheads and chins and broad, prominent cheekbones. Cat-eye or oval frames highlight cheekbones while harmonising with the narrow forehead and chin. Rimless glasses give a clean look without overpowering delicate features (Zenni Optical, EyeBuyDirect).\n\nOblong (rectangular) faces are longer than they are wide. Oversized frames add visual width, and round or square lenses balance facial proportions. Deep frames with tall lenses are key. Narrow or short rectangular frames should be avoided as they can make the face appear even longer (Visionworks, All About Vision).",
          zh: "心形脸的特征是额头最宽，下巴逐渐变窄。All About Vision建议选择下部较宽或浅色镜框的眼镜、半框或无框眼镜。这有助于分散对宽额的注意力，并在窄下巴附近增加视觉重量。猫眼镜框也能突出颧骨并提升面部轮廓。但过于厚重的上框可能使额头显得更宽（Warby Parker）。\n\n菱形脸是最稀有的脸型之一，额头和下巴较窄，颧骨宽阔突出。猫眼或椭圆形镜框能突出颧骨，同时与窄额和窄下巴协调。无框眼镜既不会压制精致的五官，又能营造干净的印象（Zenni Optical, EyeBuyDirect）。\n\n长形（长方形）脸的纵向长度大于横向宽度。大号镜框能增加视觉宽度，圆形或正方形镜片能平衡面部比例。高镜片的深框是关键。应避免窄或纵向较短的长方形镜框，因为它们会使脸看起来更长（Visionworks, All About Vision）。",
          ja: "ハート型顔は額が最も広く、顎に向かって細くなる形です。All About Visionは下部が広いフレームや明るい色のリム、セミリムレスまたはリムレスメガネを推奨します。広い額から視線を分散し、細い顎付近に視覚的な重さを加えます。キャットアイフレームも頬骨を強調し顔をリフトアップします。一方、過度に厚い上部フレームは額をより広く見せる可能性があるため注意が必要です（Warby Parker）。\n\nダイヤモンド型顔は最も珍しい顔型の一つで、額と顎が狭く頬骨が広く目立つ形です。キャットアイや楕円形フレームが頬骨を強調しながら狭い額・顎と調和します。リムレスメガネは繊細な目鼻立ちを圧倒せずにすっきりした印象を与えます（Zenni Optical, EyeBuyDirect）。\n\n面長（長方形/楕円形）顔は縦の長さが横より長い形です。オーバーサイズフレームが視覚的な幅感を加え、丸いまたはスクエアレンズが顔の比率のバランスを取ります。レンズの高さが大きいディープフレームがポイントです。逆に狭いまたは縦の短い長方形フレームは顔をさらに長く見せる可能性があるため避けます（Visionworks, All About Vision）。"
        }
      }
    ]
  },
  {
    id: "personal-color-wardrobe-2026",
    title: {
      ko: "퍼스널 컬러별 봄 옷장 정리법, 타입별 머스트 해브 컬러",
      en: "Spring Wardrobe by Personal Colour, Must-Have Colours for Every Type",
      zh: "按个人色彩整理春季衣橱，各类型必备色彩",
      ja: "パーソナルカラー別 春のワードローブ整理法 タイプ別マストハブカラー"
    },
    description: { ko: "Johannes Itten의 색채 이론과 Munsell 색 체계에 기반한 퍼스널 컬러의 과학적 원리. 4시즌 체계의 작동 방식과 옷장 정리에 활용하는 방법을 정리합니다.", en: "The scientific principles of personal colour based on Johannes Itten's colour theory and the Munsell colour system. How the 4-season system works and how to apply it to wardrobe curation.", zh: "基于Johannes Itten色彩理论和Munsell色彩体系的个人色彩科学原理。四季体系的运作方式及其在衣橱整理中的应用。", ja: "Johannes Ittenの色彩理論とMunsell色体系に基づくパーソナルカラーの科学的原理。4シーズン体系の仕組みとワードローブ整理への活用法。" },
    metaTitle: {
      ko: "퍼스널 컬러별 봄 옷장 정리 가이드 2026 | FINDCORE",
      en: "Spring Wardrobe Guide by Personal Colour 2026 | FINDCORE",
      zh: "按个人色彩整理春季衣橱指南 2026 | FINDCORE",
      ja: "パーソナルカラー別 春のワードローブガイド 2026 | FINDCORE"
    },
    metaDescription: {
      ko: "봄웜·여름쿨·가을웜·겨울쿨 4시즌 타입별 2026 봄 옷장 필수 컬러. FINDCORE 퍼스널 컬러 진단으로 나에게 맞는 봄 팔레트를 발견하세요.",
      en: "Must-have spring 2026 wardrobe colours for all 4 seasonal types. Discover your spring palette with FINDCORE's personal colour diagnosis.",
      zh: "春暖·夏冷·秋暖·冬冷四季型 2026 春季衣橱必备色彩。用 FINDCORE 个人色彩诊断发现适合你的春季调色板。",
      ja: "スプリング・サマー・オータム・ウィンター4シーズンタイプ別2026年春ワードローブ必須カラー。FINDCOREパーソナルカラー診断で最適な春パレットを発見。"
    },
    image: "/personal_color_wardrobe_2026.png",
    category: { ko: "스타일", en: "Style", zh: "风格", ja: "スタイル" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "퍼스널 컬러의 과학적 기반, 색상·명도·채도", en: "The Scientific Foundation of Personal Colour, Hue, Value, and Chroma", zh: "个人色彩的科学基础，色相、明度、彩度", ja: "パーソナルカラーの科学的基盤 色相・明度・彩度" },
        text: {
          ko: "퍼스널 컬러 분석의 이론적 토대는 스위스 예술가 Johannes Itten의 색채 이론과 미국 예술가 Albert H. Munsell의 색 체계에 뿌리를 두고 있습니다(IED Milano, Wikipedia). Itten은 색의 온도(난색/한색)와 명도(밝기/어두움)를 고려한 색채 이론을 개발했고, Munsell은 색상(Hue), 명도(Value), 채도(Chroma) 세 가지 차원으로 색을 정의하는 체계를 만들었습니다.\n\n퍼스널 컬러 분석에서 핵심이 되는 세 가지 요소는 다음과 같습니다. 첫째, 색상 온도(Hue/Temperature)는 피부·머리카락·눈의 웜(황색 기반) 또는 쿨(청색 기반) 언더톤을 의미합니다. 둘째, 명도(Value)는 전체적인 컬러링이 얼마나 밝거나 어두운지를 측정합니다. 셋째, 채도(Chroma)는 이목구비 색의 선명도나 채도를 의미하며, 뮤트한 색이 어울리는지 선명한 색이 어울리는지를 결정합니다.\n\n가장 널리 알려진 4시즌 체계는 개인을 봄(웜·밝음·선명), 여름(쿨·밝음·뮤트), 가을(웜·어두움·뮤트), 겨울(쿨·어두움·선명)로 분류합니다. 더 세밀한 분석을 위해 12시즌, 16시즌 체계도 있으며, 주된 특성(밝기·깊이·선명도·부드러움)에 따라 하위 카테고리를 제공합니다(The Concept Wardrobe, Camille Styles).",
          en: "The theoretical foundation of personal colour analysis is rooted in Swiss artist Johannes Itten's colour theory and American artist Albert H. Munsell's colour system (IED Milano, Wikipedia). Itten developed a colour theory considering temperature (warm/cool) and value (light/dark), while Munsell created a system defining colour by three dimensions: Hue, Value, and Chroma.\n\nThree core elements in personal colour analysis are: First, hue/temperature refers to the warm (yellow-based) or cool (blue-based) undertones in skin, hair, and eyes. Second, value measures how light or dark one's overall colouring is. Third, chroma describes the clarity or saturation of features, determining whether muted or vivid colours are most flattering.\n\nThe most widely known 4-season system classifies individuals as Spring (warm, light, bright), Summer (cool, light, muted), Autumn (warm, dark, muted), or Winter (cool, dark, bright). For more nuanced analysis, 12-season and 16-season systems exist, providing subcategories based on dominant characteristics like lightness, depth, clarity, or softness (The Concept Wardrobe, Camille Styles).",
          zh: "个人色彩分析的理论基础植根于瑞士艺术家Johannes Itten的色彩理论和美国艺术家Albert H. Munsell的色彩体系（IED Milano, Wikipedia）。Itten开发了考虑色温（暖/冷）和明度（亮/暗）的色彩理论，Munsell则创建了通过色相（Hue）、明度（Value）和彩度（Chroma）三个维度定义颜色的体系。\n\n个人色彩分析的三个核心要素：第一，色相温度指皮肤、头发、眼睛的暖色（黄色基调）或冷色（蓝色基调）底色调。第二，明度衡量整体配色的明暗程度。第三，彩度描述五官色彩的清晰度或饱和度，决定柔和色还是鲜明色更适合。\n\n最广为人知的四季体系将个人分为春季型（暖·亮·鲜明）、夏季型（冷·亮·柔和）、秋季型（暖·深·柔和）和冬季型（冷·深·鲜明）。更精细的分析还有12季和16季体系，根据主要特征（明亮度、深度、清晰度、柔和度）提供子类别（The Concept Wardrobe, Camille Styles）。",
          ja: "パーソナルカラー分析の理論的基盤は、スイスの芸術家Johannes Ittenの色彩理論と米国の芸術家Albert H. Munsellの色体系に根ざしています（IED Milano, Wikipedia）。Ittenは色の温度（暖色/寒色）と明度（明暗）を考慮した色彩理論を開発し、Munsellは色相（Hue）、明度（Value）、彩度（Chroma）の3次元で色を定義する体系を作りました。\n\nパーソナルカラー分析の核心となる3要素は次の通りです。第1に、色相温度は肌・髪・目のウォーム（黄色ベース）またはクール（青ベース）のアンダートーンを指します。第2に、明度は全体的なカラーリングがどれほど明るいか暗いかを測定します。第3に、彩度は目鼻立ちの色の鮮明度や彩度を意味し、ミュートな色が似合うか鮮やかな色が似合うかを決定します。\n\n最も広く知られた4シーズン体系は個人をスプリング（ウォーム・明るい・鮮やか）、サマー（クール・明るい・ミュート）、オータム（ウォーム・暗い・ミュート）、ウィンター（クール・暗い・鮮やか）に分類します。より細かい分析のために12シーズン、16シーズン体系もあり、主な特性（明るさ・深さ・鮮明度・柔らかさ）によってサブカテゴリーを提供します（The Concept Wardrobe, Camille Styles）。"
        }
      },
      {
        subtitle: { ko: "시즌별 옷장 정리 실전 가이드", en: "Practical Wardrobe Curation Guide by Season", zh: "按季型整理衣橱实战指南", ja: "シーズン別ワードローブ整理実践ガイド" },
        text: {
          ko: "퍼스널 컬러를 옷장 정리에 적용하면 쇼핑 실수를 줄이고 응집력 있는 옷장을 구축할 수 있습니다(The Poised Presence, C&A). 핵심은 자신의 시즌 팔레트에 맞는 색상을 얼굴 가까이 배치하는 것입니다.\n\n웜톤 언더톤(봄/가을 타입)이라면 복숭아색, 황색, 올리브 그린, 테라코타 같은 황색 기반의 따뜻한 색상이 피부를 건강하게 밝혀줍니다. 봄 타입은 밝고 선명한 산호색, 터쿼이즈, 밝은 카멜이 특히 잘 어울리며, 가을 타입은 깊고 풍부한 머스타드, 버건디, 올리브가 최적입니다.\n\n쿨톤 언더톤(여름/겨울 타입)이라면 핑크, 보라, 블루 기반의 시원한 색상이 이목구비를 또렷하게 만듭니다. 여름 타입은 라벤더, 로즈핑크, 소프트 네이비 같은 부드러운 색이 조화롭고, 겨울 타입은 순백, 로열블루, 에메랄드, 진분홍 같은 높은 채도의 선명한 색이 돋보입니다.\n\n언더톤 확인 방법으로는 손목 혈관 색 확인(청보라색이면 쿨톤, 초록색이면 웜톤), 골드/실버 주얼리 대비 테스트, 순백색 종이 옆에 얼굴을 대어 보는 방법 등이 있습니다(NMSU, Camille Styles). 이러한 원리를 이해하면 충동 구매를 줄이고, 기존 옷과 자연스럽게 어울리는 아이템만 선별적으로 추가할 수 있습니다.",
          en: "Applying personal colour to wardrobe curation reduces shopping mistakes and builds a cohesive closet (The Poised Presence, C&A). The key is placing colours from your seasonal palette close to your face.\n\nFor warm undertones (Spring/Autumn types), warm yellow-based colours like peach, gold, olive green, and terracotta illuminate the skin healthily. Spring types look especially great in bright, vivid coral, turquoise, and light camel, while Autumn types are best in deep, rich mustard, burgundy, and olive.\n\nFor cool undertones (Summer/Winter types), cool pink, purple, and blue-based colours make features appear more defined. Summer types harmonise with soft lavender, rose pink, and soft navy, while Winter types stand out in high-chroma vivid colours like pure white, royal blue, emerald, and hot pink.\n\nMethods for checking your undertone include: examining wrist vein colours (blue-purple suggests cool, green suggests warm), comparing gold vs silver jewellery, and holding a pure white paper next to your face (NMSU, Camille Styles). Understanding these principles reduces impulse purchases and enables selective additions of items that naturally coordinate with existing pieces.",
          zh: "将个人色彩应用于衣橱整理可以减少购物失误，打造有凝聚力的衣橱（The Poised Presence, C&A）。关键是将符合自己季型色板的颜色放在靠近面部的位置。\n\n暖色调底色（春季/秋季型）适合桃色、金色、橄榄绿、赤陶色等黄色基调的暖色，能让皮肤看起来健康明亮。春季型特别适合明亮鲜艳的珊瑚色、绿松石色和浅驼色；秋季型则最适合深邃丰富的芥末黄、酒红和橄榄绿。\n\n冷色调底色（夏季/冬季型）适合粉色、紫色、蓝色基调的冷色，能使五官显得更加清晰。夏季型与薰衣草、玫瑰粉、柔和海军蓝等柔和色调最为协调；冬季型则适合纯白、皇家蓝、翡翠绿、亮粉红等高彩度鲜明色。\n\n确认底色调的方法包括：观察手腕血管颜色（蓝紫色为冷色调，绿色为暖色调）、金/银首饰对比测试、将纯白色纸张放在脸旁观察等（NMSU, Camille Styles）。理解这些原理后，可以减少冲动消费，只选择性地添加与现有衣物自然搭配的单品。",
          ja: "パーソナルカラーをワードローブ整理に適用すれば、買い物の失敗を減らし統一感のあるクローゼットを構築できます（The Poised Presence, C&A）。ポイントは自分のシーズンパレットに合う色を顔の近くに配置することです。\n\nウォームトーンのアンダートーン（スプリング/オータムタイプ）なら、ピーチ、ゴールド、オリーブグリーン、テラコッタなど黄色ベースの暖かい色が肌を健康的に明るく見せます。スプリングタイプは明るく鮮やかなコーラル、ターコイズ、ライトキャメルが特に似合い、オータムタイプは深く豊かなマスタード、バーガンディ、オリーブが最適です。\n\nクールトーンのアンダートーン（サマー/ウィンタータイプ）なら、ピンク、パープル、ブルーベースの涼しい色が目鼻立ちをくっきりさせます。サマータイプはラベンダー、ローズピンク、ソフトネイビーなど柔らかい色が調和し、ウィンタータイプは純白、ロイヤルブルー、エメラルド、ホットピンクなど高彩度の鮮やかな色が映えます。\n\nアンダートーンの確認方法には、手首の血管の色確認（青紫ならクール、緑ならウォーム）、ゴールド/シルバーのジュエリー比較テスト、純白の紙を顔の横に当てる方法などがあります（NMSU, Camille Styles）。これらの原理を理解すれば衝動買いを減らし、既存の服と自然にコーディネートできるアイテムだけを選択的に追加できます。"
        }
      }
    ]
  },
  {
    id: "ai-skin-analysis-science",
    title: {
      ko: "AI 피부 분석의 원리, 카메라가 피부톤을 읽는 방법",
      en: "The Science of AI Skin Analysis, How Cameras Read Your Skin Tone",
      zh: "AI 皮肤分析的原理，相机如何读取肤色",
      ja: "AI肌分析の原理、カメラが肌色を読み取る仕組み"
    },
    description: {
      ko: "MIT Media Lab·Stanford 연구를 기반으로 한 AI 피부 분석 기술의 과학적 배경. 컬러 스페이스, 광원 보정, 마이크로바이옴 분석까지 차세대 뷰티 테크를 해설합니다.",
      en: "The scientific background of AI skin analysis technology based on MIT Media Lab and Stanford research. Explaining next-gen beauty tech from colour spaces to light calibration and microbiome analysis.",
      zh: "基于 MIT Media Lab 和斯坦福研究的 AI 皮肤分析技术科学背景。从色彩空间、光源校正到微生态分析，解读次世代美容科技。",
      ja: "MIT Media Lab・Stanford研究に基づくAI肌分析技術の科学的背景。カラースペースから光源補正、マイクロバイオーム分析まで次世代ビューティーテクを解説。"
    },
    metaTitle: {
      ko: "AI 피부 분석 기술의 과학, 퍼스널 컬러 진단의 원리 | FINDCORE",
      en: "The Science of AI Skin Analysis, How Personal Colour Diagnosis Works | FINDCORE",
      zh: "AI 皮肤分析技术的科学，个人色彩诊断原理 | FINDCORE",
      ja: "AI肌分析技術の科学 パーソナルカラー診断の原理 | FINDCORE"
    },
    metaDescription: {
      ko: "AI가 피부톤을 분석하는 과학적 원리. Lab 색 공간, 광원 교정, 피부 색소 추출 알고리즘까지 FINDCORE 퍼스널 컬러 기술의 배경을 해설합니다.",
      en: "The scientific principles behind AI skin tone analysis. From Lab colour space to light calibration and pigment extraction algorithms — the tech behind FINDCORE personal colour.",
      zh: "AI 分析肤色的科学原理。从 Lab 色彩空间到光源校正和色素提取算法——FINDCORE 个人色彩技术的背景解读。",
      ja: "AIが肌色を分析する科学的原理。Lab色空間から光源補正、色素抽出アルゴリズムまで、FINDCOREパーソナルカラー技術の背景を解説。"
    },
    image: "/ai_skin_analysis_2026.png",
    category: { ko: "테크", en: "Tech", zh: "科技", ja: "テクノロジー" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "CIE Lab 색 공간과 피부톤 측정의 과학", en: "CIE Lab Colour Space and the Science of Skin Tone Measurement", zh: "CIE Lab色彩空间与肤色测量科学", ja: "CIE Lab色空間と肌色測定の科学" },
        text: {
          ko: "AI 피부 분석의 핵심 기술은 국제조명위원회(CIE)가 개발한 CIE Lab 색 공간입니다. 이 장치 독립적 3차원 색 모델은 L*(명도), a*(적록 축), b*(황청 축) 세 값으로 인간이 인지할 수 있는 모든 색을 측정합니다(HunterLab, Konica Minolta).\n\nCIE Lab이 피부과학에서 중요한 이유는 인간의 시각 인지와 밀접하게 맞아있어 색 차이를 정밀하게 정량화할 수 있기 때문입니다. 피부톤 측정에 널리 사용되는 ITA(Individual Typology Angle) 방법은 CIE Lab에서 직접 계산됩니다. ITA는 L*와 b* 값 사이의 각도를 계산하여 매우 밝은 톤부터 어두운 톤까지 피부색을 객관적으로 분류합니다(NIH/PubMed, 상파울루대학교 연구).\n\nITA의 중요한 의의는 기존의 피츠패트릭 척도(Fitzpatrick Scale)가 주관적 자가 보고에 의존하는 한계를 극복하고, 하드웨어 기반의 객관적 측정을 가능하게 한다는 점입니다. RGB 색 공간은 디스플레이 장치에 따라 다르게 표시되지만, CIE Lab은 장치 독립적이므로 일관된 분석이 가능합니다.",
          en: "The core technology of AI skin analysis is the CIE Lab colour space developed by the International Commission on Illumination (CIE). This device-independent, three-dimensional colour model measures all perceptible colours using three values: L* (lightness), a* (red-green axis), and b* (yellow-blue axis) (HunterLab, Konica Minolta).\n\nCIE Lab is crucial in dermatology because it closely aligns with human visual perception and allows precise quantification of colour differences. The ITA (Individual Typology Angle) method, widely used for skin tone measurement, is calculated directly from CIE Lab. ITA computes the angle between L* and b* values to objectively classify skin colour from very light to dark tones (NIH/PubMed, University of São Paulo research).\n\nITA's significance lies in overcoming the limitations of the subjective Fitzpatrick Scale, which relies on self-reporting, by enabling objective, hardware-based measurements. While RGB colour space displays differently across devices, CIE Lab is device-independent, ensuring consistent analysis.",
          zh: "AI皮肤分析的核心技术是国际照明委员会（CIE）开发的CIE Lab色彩空间。这种设备无关的三维色彩模型使用三个值测量人类可感知的所有颜色：L*（明度）、a*（红绿轴）和b*（黄蓝轴）（HunterLab, Konica Minolta）。\n\nCIE Lab在皮肤科学中至关重要，因为它与人类视觉感知紧密吻合，能精确量化色差。广泛用于肤色测量的ITA（个体类型角度）方法直接从CIE Lab计算得出。ITA通过计算L*和b*值之间的角度，将肤色从极浅到深色进行客观分类（NIH/PubMed, 圣保罗大学研究）。\n\nITA的重要意义在于克服了菲兹帕特里克分类法（Fitzpatrick Scale）依赖主观自我报告的局限性，实现了基于硬件的客观测量。RGB色彩空间在不同设备上显示不同，而CIE Lab是设备无关的，确保分析的一致性。",
          ja: "AI肌分析の核心技術は国際照明委員会（CIE）が開発したCIE Lab色空間です。このデバイス非依存の3次元カラーモデルはL*（明度）、a*（赤緑軸）、b*（黄青軸）の3つの値で人間が知覚できるすべての色を測定します（HunterLab, Konica Minolta）。\n\nCIE Labが皮膚科学で重要な理由は、人間の視覚認知と密接に合致しており、色差を精密に定量化できるためです。肌色測定に広く使用されるITA（Individual Typology Angle）方法はCIE Labから直接計算されます。ITAはL*とb*の値の間の角度を計算して、非常に明るいトーンから暗いトーンまで肌色を客観的に分類します（NIH/PubMed, サンパウロ大学研究）。\n\nITAの重要な意義は、従来のフィッツパトリックスケールが主観的な自己申告に依存する限界を克服し、ハードウェアベースの客観的測定を可能にした点です。RGB色空間はデバイスによって異なりますが、CIE Labはデバイス非依存なので一貫した分析が可能です。"
        }
      },
      {
        subtitle: { ko: "브라우저 기반 AI 분석과 프라이버시", en: "Browser-Based AI Analysis and Privacy", zh: "基于浏览器的AI分析与隐私", ja: "ブラウザベースAI分析とプライバシー" },
        text: {
          ko: "최근 뷰티 테크 분야에서 주목받는 접근법은 사용자의 브라우저 내에서 모든 분석을 완결하는 '클라이언트 사이드 AI'입니다. 이 방식에서는 사용자가 업로드한 사진이 외부 서버로 전송되지 않습니다.\n\n기술적으로는 WebAssembly(Wasm) 기반의 경량 머신러닝 추론 엔진이 활용됩니다. Google의 오픈소스 프레임워크인 MediaPipe는 브라우저 환경에서 실시간 얼굴 메쉬(468개 랜드마크 포인트)를 생성할 수 있으며, TensorFlow.js는 브라우저 내에서 학습된 모델을 실행합니다. 이를 통해 얼굴 영역을 감지하고, 해당 영역의 색 히스토그램을 CIE Lab으로 변환하여 피부톤을 분석합니다.\n\n이러한 '프라이버시 우선 설계'는 생체 데이터를 다루는 뷰티·헬스 서비스에서 특히 중요합니다. GDPR(유럽 일반 데이터 보호 규정)과 같은 개인정보 보호 법규가 강화되면서, 사용자 데이터를 수집하지 않는 로컬 연산 방식이 소비자 신뢰를 높이는 핵심 요소가 되고 있습니다. 실제로 haut.ai, L'Oréal Paris 등의 AI 피부 분석 서비스도 이 방향으로 진화하고 있습니다.",
          en: "A notable approach in beauty tech is 'client-side AI,' where all analysis is completed within the user's browser. In this model, user-uploaded photos are never transmitted to external servers.\n\nTechnically, lightweight ML inference engines based on WebAssembly (Wasm) are utilised. Google's open-source MediaPipe framework can generate real-time facial meshes (468 landmark points) in browser environments, and TensorFlow.js runs trained models within the browser. This detects facial regions, converts the colour histograms of those regions to CIE Lab, and analyses skin tone.\n\nThis 'privacy-first design' is especially important for beauty and health services handling biometric data. As privacy regulations like GDPR (General Data Protection Regulation) strengthen, local computation methods that don't collect user data have become a key factor for building consumer trust. Services like haut.ai and L'Oréal Paris AI skin analysis are also evolving in this direction.",
          zh: "美容科技领域备受关注的一种方法是'客户端AI'——所有分析都在用户浏览器内完成。在这种模式下，用户上传的照片不会传输到外部服务器。\n\n技术上利用基于WebAssembly（Wasm）的轻量级机器学习推理引擎。Google的开源框架MediaPipe可在浏览器环境中实时生成面部网格（468个地标点），TensorFlow.js则在浏览器内运行训练好的模型。通过检测面部区域、将该区域的色彩直方图转换为CIE Lab来分析肤色。\n\n这种'隐私优先设计'对处理生物识别数据的美容健康服务尤为重要。随着GDPR（通用数据保护条例）等隐私法规的加强，不收集用户数据的本地计算方式成为建立消费者信任的关键因素。haut.ai、L'Oréal Paris等AI皮肤分析服务也在朝这个方向发展。",
          ja: "ビューティーテック分野で注目されているアプローチは、ユーザーのブラウザ内ですべての分析を完結する「クライアントサイドAI」です。この方式ではユーザーがアップロードした写真は外部サーバーに送信されません。\n\n技術的にはWebAssembly（Wasm）ベースの軽量ML推論エンジンが活用されます。GoogleのオープンソースフレームワークであるMediaPipeはブラウザ環境でリアルタイムに顔メッシュ（468ランドマークポイント）を生成でき、TensorFlow.jsはブラウザ内で学習済みモデルを実行します。これにより顔領域を検出し、その領域のカラーヒストグラムをCIE Labに変換して肌色を分析します。\n\nこの「プライバシーファースト設計」は生体データを扱うビューティー・ヘルスサービスで特に重要です。GDPR（一般データ保護規則）などのプライバシー規制が強化される中、ユーザーデータを収集しないローカル演算方式が消費者信頼を高める重要な要素となっています。実際にhaut.ai、L'Oréal ParisなどのAI肌分析サービスもこの方向に進化しています。"
        }
      }
    ]
  },
  {
    id: "color-psychology-emotions",
    title: { ko: "컬러 심리학, 색이 감정과 퍼스널 브랜딩에 미치는 영향", en: "Colour Psychology, How Colour Affects Emotions and Personal Branding", zh: "色彩心理学，颜色如何影响情绪与个人品牌", ja: "カラー心理学 色が感情とパーソナルブランディングに与える影響" },
    description: { ko: "색채 심리학이 첫인상과 감정에 미치는 영향에 대한 과학적 연구. '입는 인지(Enclothed Cognition)' 이론과 색상별 심리적 반응을 분석합니다.", en: "Scientific research on how colour psychology influences first impressions and emotions. Analysing the 'Enclothed Cognition' theory and psychological responses to different hues.", zh: "色彩心理学对第一印象和情绪影响的科学研究。分析'穿衣认知'理论以及不同颜色引起的心理反应。", ja: "色彩心理学が第一印象や感情に与える影響に関する科学的研究。「着衣認知（Enclothed Cognition）」理論と色別の心理的反応を分析します。" },
    metaTitle: { ko: "컬러 심리학 가이드, 색이 감정에 미치는 영향 | FINDCORE", en: "Colour Psychology Guide, How Colour Affects Emotions | FINDCORE", zh: "色彩心理学指南，颜色如何影响情绪 | FINDCORE", ja: "カラー心理学ガイド 色が感情に与える影響 | FINDCORE" },
    metaDescription: { ko: "빨강·파랑·초록·노랑 등 주요 색의 심리적 효과와 퍼스널 브랜딩 활용법. 퍼스널 컬러 진단 결과를 일상에 적용하는 심층 가이드.", en: "Psychological effects of key colours and personal branding applications. An in-depth guide to applying personal colour diagnosis results to daily life.", zh: "主要颜色的心理效应与个人品牌应用。将个人色彩诊断结果应用于日常的深度指南。", ja: "主要カラーの心理的効果とパーソナルブランディング活用法。パーソナルカラー診断結果を日常に適用する深掘りガイド。" },
    image: "/color_psychology_2026.png",
    category: { ko: "라이프스타일", en: "Lifestyle", zh: "生活方式", ja: "ライフスタイル" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "색상과 첫인상의 과학, 90%의 법칙", en: "The Science of Colour and First Impressions, The 90% Rule", zh: "色彩与第一印象的科学，90%法则", ja: "色と第一印象の科学 90%の法則" },
        text: {
          ko: "색채 심리학(Color Psychology)은 특정 색상이 인간의 행동과 감정에 어떻게 영향을 미치는지 연구하는 학문입니다. 연구에 따르면, 타인에 대한 첫인상을 형성하는 데 걸리는 시간은 90초 이내이며, 이 과정에서 색상이 판단의 최대 90%를 차지한다는 결과가 있습니다(Medium, The Art Logic).\n\n이 중 '입는 인지(Enclothed Cognition)'라는 개념이 특히 중요합니다. 2012년 하트퍼드셔 대학교의 연구에 따르면, 우리가 입는 옷의 색상과 스타일은 타인의 시선뿐 아니라 우리 자신의 심리 상태, 자신감, 심지어 인지 능력에도 영향을 미칩니다. 특정 감정을 유발하는 색을 입음으로써 스스로의 기분과 성과를 조절할 수 있다는 것입니다.\n\n대표적인 색상별 심리적 반응은 다음과 같습니다. 빨강은 에너지, 자신감, 추진력을 상징하며 심박수를 약간 높이는 효과가 있습니다. 파랑은 신뢰, 전문성, 안정감을 주어 기업 면접이나 비즈니스 미팅에서 선호됩니다. 검정은 권위와 전문성, 우아함을 나타내며 지적인 인상을 주는 데 효과적입니다(Ape to Gentleman).",
          en: "Colour psychology studies how different hues influence human behaviour and emotions. Research suggests that first impressions are formed within 90 seconds, and colour can account for up to 90% of that initial judgement (Medium, The Art Logic).\n\nA particularly important concept is 'Enclothed Cognition.' A 2012 study (University of Hertfordshire context) suggests that the clothes we wear—including their colours—influence not just how others see us, but our own psychological state, confidence, and cognitive performance. By wearing colours associated with specific emotions, we can regulate our own mood and performance.\n\nKey psychological responses to colours include: Red symbolises energy, confidence, and determination, potentially slightly increasing heart rate. Blue evokes trust, professionalism, and stability, making it a preferred choice for interviews and business meetings. Black represents authority, professionalism, and elegance, often associated with perceived intelligence (Ape to Gentleman).",
          zh: "色彩心理学是研究特定颜色如何影响人类行为和情绪的学科。研究表明，形成对他人的第一印象只需不到90秒，而在这一过程中，色彩占据了判断依据的90%以上（Medium, The Art Logic）。\n\n其中'穿衣认知（Enclothed Cognition）'的概念尤为重要。根据2012年的研究，我们所穿衣服的颜色和款式不仅会影响他人的眼光，还会影响我们自身的心理状态、自信心甚至认知能力。穿上引发特定情绪的颜色可以调节自己的心情和表现。\n\n典型的颜色心理反应包括：红色象征能量、自信和行动力，有略微提高心率的效果。蓝色给人以信任、专业和稳定感，是面试及商务会议的首选。黑色代表权威、专业和优雅，能有效地营造智慧的印象（Ape to Gentleman）。",
          ja: "色彩心理学（Color Psychology）は、特定の色が人間の行動や感情にどのように影響するかを研究する学問です。研究によると、他人に対する第一印象を形成するのにかかる時間は90秒以内で、この過程で色が判断の最大90%を占めるという結果があります（Medium, The Art Logic）。\n\nこのうち「着衣認知（Enclothed Cognition）」という概念が特に重要です。2012年の研究によれば、私たちが着る服の色やスタイルは、他人の視線だけでなく自分自身の心理状態、自信、さらには認知能力にも影響を与えます。特定の感情を誘発する色を着ることで、自らの気分やパフォーマンスを調節できるということです。\n\n代表的な色別の心理的反応は以下の通りです。赤はエネルギー、自信、推進力を象徴し、心拍数をわずかに高める効果があります。青は信頼、専門性、安定感を与え、企業の面接やビジネスミーティングで好まれます。黒は権威と専門性、エレガンスを表し、知的な印象を与えるのに効果的です（Ape to Gentleman）。"
        }
      }
    ]
  },
  {
    id: "cleansing-oil-guide-2026",
    title: { ko: "피부 타입별 클렌징 오일 선택법, 더블 클렌징의 과학", en: "Choosing Cleansing Oil by Skin Type, The Science of Double Cleansing", zh: "按肤质选择卸妆油，双重清洁的科学", ja: "肌タイプ別クレンジングオイルの選び方 ダブル洗顔の科学" },
    description: { ko: "피부과 전문의들이 권장하는 더블 클렌징의 과학적 근거. '유유상종(Like Dissolves Like)' 원리에 기반한 세정 메커니즘과 피부 타입별 오일 선택법을 정리합니다.", en: "The scientific basis of double cleansing recommended by dermatologists. Explaining the cleaning mechanism based on the 'Like Dissolves Like' principle and how to choose oils by skin type.", zh: "皮肤科专家建议的双重清洁科学依据。基于'类以类溶'原理的清洁机制及按肤质选择卸妆油的方法。", ja: "皮膚科専門医が推奨するダブル洗顔の科学的根拠。「類は友を呼ぶ（Like Dissolves Like）」の原理に基づく洗浄メカニズムと肌タイプ別オイル選択法をまとめます。" },
    metaTitle: { ko: "클렌징 오일 가이드 2026, 피부 타입별 선택법 | FINDCORE", en: "Cleansing Oil Guide 2026, How to Choose by Skin Type | FINDCORE", zh: "卸妆油指南 2026，按肤质选择 | FINDCORE", ja: "クレンジングオイルガイド 2026 肌タイプ別選択法 | FINDCORE" },
    metaDescription: { ko: "지성·건성·복합성 피부별 최적 클렌징 오일 성분과 더블 클렌징의 과학적 근거. 2026년 K-뷰티 클렌징 트렌드 완벽 가이드.", en: "Optimal cleansing oil ingredients by skin type and the science of double cleansing. Complete guide to 2026 K-beauty cleansing trends.", zh: "按肤质推荐最佳卸妆油成分与双重清洁的科学依据。2026 年 K-beauty 清洁趋势完整指南。", ja: "肌タイプ別最適クレンジングオイル成分とダブル洗顔の科学的根拠。2026年Kビューティークレンジングトレンド完全ガイド。" },
    image: "/cleansing_oil_2026.png",
    category: { ko: "뷰티", en: "Beauty", zh: "美容", ja: "ビューティー" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "더블 클렌징의 과학, 왜 오일이 필요한가", en: "The Science of Double Cleansing, Why You Need Oil", zh: "双重清洁的科学，为什么需要深层清洁油", ja: "ダブル洗顔の科学 なぜオイルが必要なのか" },
        text: {
          ko: "더블 클렌징은 K-뷰티에서 시작되어 글로벌 피부과학계가 인정한 클렌징 기법입니다. 핵심 원리는 '유유상종(Like Dissolves Like)'입니다(Cleveland Clinic, CeraVe). 피지, 메이크업, 대부분의 자외선 차단제는 오일 기반의 불순물입니다. 이들은 물만으로는 제거되지 않으며, 클렌징 오일이나 밤이 이 성분들을 효과적으로 녹여낼 수 있습니다.\n\n첫 번째 단계인 오일 클렌징은 피부 표면의 유분기 있는 노폐물을 용해합니다. 두 번째 단계인 수성 클렌징(폼/젤)은 땀, 먼지 등 수용성 노폐물과 오일 잔여물을 제거합니다. 이 과정은 모공 막힘을 방지하여 트러블을 예방하고, 이후 바르는 스킨케어 제품의 흡수율을 높여줍니다(Healthline, Paula's Choice).\n\n지성 피부가 오일을 사용하는 것에 대한 우려가 있지만, 적절한 비코메도제닉(Non-comedogenic) 오일은 과도한 피지를 조절하는 데 오히려 도움을 줍니다. 조조바 오일, 포도씨유 등 가벼운 식물성 오일은 피지를 부드럽게 녹여내어 모공을 깨끗하게 유지해 줍니다.",
          en: "Double cleansing is a technique that originated in K-beauty and is now recognised by the global dermatological community. The core principle is 'Like Dissolves Like' (Cleveland Clinic, CeraVe). Sebum, makeup, and most sunscreens are oil-based impurities. These cannot be effectively removed by water alone; cleansing oils or balms are required to dissolve them.\n\nThe first step, oil cleansing, dissolves oil-based residue on the skin surface. The second step, water-based cleansing (foam/gel), removes water-soluble impurities like sweat and dust along with any oil residue. This process prevents clogged pores, reduces breakouts, and enhances the absorption efficacy of subsequent skincare products (Healthline, Paula's Choice).\n\nWhile oily skin types often worry about using oil, appropriate non-comedogenic oils actually help regulate excess sebum. Lightweight plant oils like jojoba or grapeseed oil gently dissolve sebum, keeping pores clean without stripping the skin.",
          zh: "双重清洁起源于K-beauty，是全球皮肤科学界认可的清洁技术。其核心原理是'类以类溶'（Cleveland Clinic, CeraVe）。皮脂、化妆品和大多数防晒霜都是油性杂质。这些无法仅靠水分清除，卸妆油或卸妆膏能有效地溶解这些成分。\n\n第一步油性清洁可溶解皮肤表面的油性废弃物。第二步水性清洁（泡沫/啫喱）则清除汗水、灰尘等水溶性废弃物及油性残留。这一过程可防止毛孔堵塞从而预防皮肤问题，并提高后续护肤品的吸收率（Healthline, Paula's Choice）。\n\n虽然油性皮肤对使用油类有所顾虑，但合适的非致痘性（Non-comedogenic）油类反而有助于调节过量皮脂。荷荷巴油、葡萄籽油等轻盈的植物油可以温柔地溶解皮脂，保持毛孔清洁。",
          ja: "ダブル洗顔はKビューティーから始まり、世界の皮膚科学界が認めたクレンジング技法です。核心的な原理は「類は友を呼ぶ（Like Dissolves Like）」です（Cleveland Clinic, CeraVe）。皮脂、メイク、ほとんどの日焼け止めはオイルベースの不純物です。これらは水だけでは除去されず、クレンジングオイルやバームがこれらの成分を効果的に溶かすことができます。\n\n第1段階のオイルクレンジングは肌表面の油分を含む老廃物を溶解します。第2段階の水性クレンジング（フォーム/ジェル）は汗、埃などの水溶性老廃物とオイルの残余物を除去します。この過程は毛孔の詰まりを防いでトラブルを予防し、その後に塗るスキンケア製品の吸収率を高めてくれます（Healthline, Paula's Choice）。\n\n脂性肌がオイルを使用することへの懸念がありますが、適切なノンコメドジェニック（Non-comedogenic）オイルは、過剰な皮脂を調節するのにむしろ役立ちます。ホホバオイル、グレープシードオイルなどの軽い植物性オイルは皮脂を優しく溶かし出し、毛穴を清潔に保ってくれます。"
        }
      }
    ]
  },
  {
    id: "minimalism-vs-maximalism-2026",
    title: { ko: "미니멀리즘 vs 맥시멀리즘, 2026 스타일 정체성 찾기", en: "Minimalism vs Maximalism, Finding Your 2026 Style Identity", zh: "极简主义 vs 极繁主义，找到你的 2026 风格定位", ja: "ミニマリズム vs マキシマリズム 2026年スタイルアイデンティティを見つける" },
    description: { ko: "2024-2025년을 지배한 '조용한 럭셔리(Quiet Luxury)'에서 2026년 화려한 '맥시멀리즘'으로의 패션 패러다임 변화를 분석합니다.", en: "Analysing the fashion paradigm shift from the 'Quiet Luxury' that dominated 2024-2025 to the vibrant 'Maximalism' of 2026.", zh: "分析从主宰2024-2025年的'静奢风'到2026年华丽'极繁主义'的时尚范式转变。", ja: "2024-2025年を支配した「クワイエット・ラグジュアリー」から2026年の華やかな「マキシマリズム」へのファッションパラダイムの変化を分析します。" },
    metaTitle: { ko: "미니멀리즘 vs 맥시멀리즘 2026, 나만의 스타일 가이드 | FINDCORE", en: "Minimalism vs Maximalism 2026, Your Style Identity Guide | FINDCORE", zh: "极简 vs 极繁 2026，你的个人风格指南 | FINDCORE", ja: "ミニマル vs マキシマル 2026 スタイルアイデンティティガイド | FINDCORE" },
    metaDescription: { ko: "2026년 패션의 양극화 트렌드. 에스테틱 코어 테스트로 자신의 감성 유형을 파악하고 미니멀/맥시멀 스펙트럼에서 위치를 찾는 방법.", en: "2026 fashion polarisation trend. Discover where you sit on the minimal/maximal spectrum with the aesthetic core test.", zh: "2026 时尚两极化趋势。通过美学类型测试了解自己在极简/极繁光谱中的位置。", ja: "2026年ファッション両極化トレンド。エステティックコアテストで自分のミニマル/マキシマルスペクトラム上の位置を発見。" },
    image: "/minimalism_maximalism_2026.png",
    category: { ko: "패션", en: "Fashion", zh: "时尚", ja: "ファッション" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "콰이어트 럭셔리의 퇴조와 맥시멀리즘의 부활", en: "The Decline of Quiet Luxury and the Resurgence of Maximalism", zh: "静奢风的退潮与极繁主义的复活", ja: "クワイエット・ラグジュアリーの退潮とマキシマリズムの復活" },
        text: {
          ko: "2020년대 초반을 지배했던 '조용한 럭셔리(Quiet Luxury)' 트렌드가 2025년과 2026년을 지나며 커다란 변화를 맞이하고 있습니다. 로고가 드러나지 않는 절제된 우아함과 뉴트럴 톤의 미니멀리즘이 대중화되면서, 패션계는 다시 한번 자기표현과 개성을 강조하는 '맥시멀리즘'으로 회귀하고 있습니다(Who What Wear, Marie Claire).\n\n2025년 하반기부터 런웨이에는 강렬한 컬러, 화려한 프린트, 대담한 실루엣이 다시 등장하기 시작했습니다. 이는 획일화된 미니멀리즘에 대한 '문화적 피로감'과 자신의 개성을 더 뚜렷하게 드러내고자 하는 욕구가 반영된 결과입니다. 80년대의 고전적인 글래머러스함과 Y2K의 실험적인 정신이 결합된 '카오틱 맥시멀리즘(Chaotic Maximalism)'이 2026년의 주요 키워드로 부상했습니다.\n\n다만, 2026년의 맥시멀리즘은 단순히 복잡한 것이 아닙니다. 자신의 가치관과 스타일을 전략적으로 드러내는 '의도적인 화려함'에 가깝습니다. 대담한 골드 액세서리, 오버사이즈 실루엣, 그리고 강렬한 체리 레드와 푸시아 핑크 같은 색상의 조합이 이를 상징합니다(Harpers Bazaar, Forbes).",
          en: "The 'Quiet Luxury' trend that dominated the early 2020s is undergoing a major shift through 2025 and 2026. As understated elegance with no logos and neutral-toned minimalism became ubiquitous, the fashion world is once again swinging back toward 'Maximalism,' emphasising self-expression and individuality (Who What Wear, Marie Claire).\n\nSince late 2025, vibrant colours, bold prints, and daring silhouettes have re-emerged on the runways. This reflects a 'cultural fatigue' with uniform minimalism and a desire to display one's personality more distinctly. 'Chaotic Maximalism,' which combines classic 80s glamour with the experimental spirit of Y2K, has emerged as a key 2026 keyword.\n\nHowever, 2026's maximalism isn't just about complexity. It is an 'intentional opulence' used to strategically showcase one's values and style. This is symbolised by bold gold accessories, oversized silhouettes, and combinations of intense colours like cherry red and fuchsia pink (Harpers Bazaar, Forbes).",
          zh: "主导2020年代初期的'静奢风（Quiet Luxury）'趋势在经历2025年和2026年时正迎来重大变革。随着不显露标志的节制优雅和中性色调的极简主义变得大众化，时尚界再次回到了强调自我表达和个性的'极繁主义'（Who What Wear, Marie Claire）。\n\n从2025年下半年开始，秀场上重新出现了强烈的色彩、华丽的印花和大胆的轮廓。这是对雷同的极简主义产生的'文化疲劳感'以及想要更鲜明地展现个性的欲望共同作用的结果。结合了80年代经典华丽感和Y2K实验精神的'混沌极繁主义（Chaotic Maximalism）'成为2026年的主要关键词。\n\n但2026年的极繁主义并非单纯的复杂，更接近于战略性地展现个人价值观和风格的'刻意的华丽'。大胆的金色配饰、大廓形设计以及强烈的樱桃红和玫粉色组合正是其象征（Harpers Bazaar, Forbes）。",
          ja: "2020年代初頭を支配した「クワイエット・ラグジュアリー」トレンドが、2025年と2026年を経て大きな変化を迎えています。ロゴを表に出さない抑制された優雅さとニュートラルトーンのミニマリズムが一般化したことで、ファッション界は再び自己表現と個性を強調する「マキシマリズム」へと回帰しています（Who What Wear, Marie Claire）。\n\n2025年後半からランウェイには強烈なカラー、華やかなプリント、大胆なシルエットが再び登場し始めました。これは一律化されたミニマリズムに対する「文化的疲労感」と、自らの個性をより鮮明に表したいという欲求が反映された結果です。80年代の古典的なグラマラスさとY2Kの実験的な精神が結合した「カオティック・マキシマリズム（Chaotic Maximalism）」が2026年の主要キーワードとして浮상しました。\n\nただし、2026年のマキシマリズムは単に複雑なだけではありません。自らの価値관とスタイルを戦略的に表す「意図的な華やかさ」に近いです。大胆なゴールドアクセサリー、オーバーサイズシルエット、そして強烈なチェ리レッドやフューシャピンクのような色の組み合わせがこれを象徴しています（Harpers Bazaar, Forbes）。"
        }
      }
    ]
  },
  {
    id: "led-beauty-device-guide",
    title: { ko: "홈 뷰티 디바이스 구매 가이드, LED 마스크부터 갈바닉까지", en: "Home Beauty Device Buying Guide, From LED Masks to Galvanic", zh: "家用美容仪购买指南，从 LED 面膜到微电流仪", ja: "ホームビューティーデバイス購入ガイド LEDマスクからガルバニックまで" },
    description: { ko: "홈 뷰티 디바이스의 과학: LED, RF, 갈바닉의 원리와 효과. 피부과 전문의들이 강조하는 파장별 차이와 안전한 사용법을 정리합니다.", en: "The Science of Home Beauty Devices: Principles and Effects of LED, RF, and Galvanic. Explaining wavelength differences and safe usage methods emphasised by dermatologists.", zh: "家用美容仪的科学：LED、RF、伽伐尼电流的原理与效果。整理皮肤科专家强调的波长差异及安全使用方法。", ja: "ホームビューティーデバイスの科学：LED、RF、ガルバニックの原理と効果。皮膚科専門医が強調する波長別の違いと安全な使用法をまとめます。" },
    metaTitle: { ko: "홈 뷰티 디바이스 가이드 2026, LED·RF·갈바닉 완벽 비교 | FINDCORE", en: "Home Beauty Device Guide 2026, LED, RF, Galvanic Comparison | FINDCORE", zh: "家用美容仪指南 2026，LED·RF·微电流完全对比 | FINDCORE", ja: "ホームビューティーデバイスガイド 2026 LED・RF・ガルバニック完全比較 | FINDCORE" },
    metaDescription: { ko: "LED 마스크·RF 고주파·갈바닉 이온토포레시스의 작동 원리와 피부 타입별 추천. FDA 승인 디바이스 기준 2026 완벽 가이드.", en: "How LED masks, RF devices, and galvanic iontophoresis work, with recommendations by skin type. Complete 2026 guide based on FDA-approved devices.", zh: "LED 面膜·RF 射频·微电流导入的工作原理及按肤质推荐。基于 FDA 认证设备的 2026 完整指南。", ja: "LEDマスク・RF高周波・ガルバニックの作動原理と肌タイプ別推薦。FDA承認デバイス基準2026完全ガイド。" },
    image: "/led_beauty_device_2026.png",
    category: { ko: "테크", en: "Tech", zh: "科技", ja: "テクノロジー" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "LED 광치료의 원리, 적색광과 청색광의 차이", en: "Principles of LED Phototherapy, Red vs Blue Light", zh: "LED光疗原理，红光与蓝光的区别", ja: "LED光治療の原理 赤色光と青色光の違い" },
        text: {
          ko: "LED 광치료(Phototherapy)는 특정 파장의 빛을 피부에 조사하여 세포 활성화를 돕는 비침습적 치료법입니다. 가장 널리 사용되는 파장은 적색광(Red Light)과 청색광(Blue Light)입니다(Cleveland Clinic, NIH).\n\n적색광(약 630-660nm)은 피부 진피층까지 깊숙이 침투합니다. 세포 내 미토콘드리아를 자극하여 ATP(세포 에너지) 생산을 높이고, 콜라겐과 엘라스틴 합성을 촉진하여 잔주름 개선과 피부 탄력 향상에 도움을 줍니다. 반면 청색광(약 415nm)은 피부 표면층에 작용하여 여드름의 원인균인 '쿠티바테리움 아크네스(C. acnes)'를 박멸하는 항균 효과가 탁월합니다(American Academy of Dermatology).\n\n최신 홈 디바이스들은 이 두 파장을 결합하여 복합적인 피부 고민을 해결합니다. 다만, 안전한 사용을 위해 반드시 FDA 승인을 받은 기기를 선택해야 하며, 특히 망막 보호를 위해 전용 안대나 보호 안경을 착용하는 것이 필수적입니다.",
          en: "LED phototherapy is a non-invasive treatment that uses specific light wavelengths to help activate cells. The most widely used wavelengths are red light and blue light (Cleveland Clinic, NIH).\n\nRed light (approx. 630-660nm) penetrates deep into the dermal layer. It stimulates mitochondria to increase ATP (cellular energy) production and promotes collagen and elastin synthesis, helping improve fine lines and elasticity. In contrast, blue light (approx. 415nm) acts on the surface layer to eliminate 'Cutibacterium acnes' (C. acnes), offering powerful antibacterial effects against acne (American Academy of Dermatology).\n\nModern home devices often combine these wavelengths to address multiple skin concerns. For safety, always choose FDA-cleared devices and use eye protection to prevent retinal damage during use.",
          zh: "LED光疗（Phototherapy）是通过向皮肤照射特定波长的光来帮助激活细胞的非侵入性治疗方法。最广泛使用的波长是红光和蓝光（Cleveland Clinic, NIH）。\n\n红光（约630-660nm）能深入渗透至皮肤真皮层。它刺激细胞内的线粒体以增加ATP（细胞能量）产生，并促进胶原蛋白和弹性蛋白合成，有助于改善细纹和提高皮肤弹性。相比之下，蓝光（约415nm）作用于皮肤表层，能杀灭导致痤疮的'痤疮丙酸杆菌（C. acnes）'，具有卓越的抗菌效果（美国皮肤病学会）。\n\n最新的家用仪器结合了这两种波长来解决复合性皮肤问题。为了安全使用，必须选择获得FDA认证的设备，并佩戴专用眼罩或防护眼镜以保护视网膜。",
          ja: "LED光治療（Phototherapy）は、特定の波長の光を肌に照射して細胞の活性化を助ける非侵襲的な治療法です。最も広く使用されている波長は赤色光（Red Light）と青色光（Blue Light）です（Cleveland Clinic, NIH）。\n\n赤色光（約630-660nm）は肌の真皮層まで深く浸透します。細胞内のミトコンドリアを刺激してATP（細胞エネルギー）の生産を高め、コラーゲンとエラスチンの合成を促進して小じわの改善と肌の弾力向上に役立ちます。一方、青色光（約415nm）は肌の表面層に作用し、ニキビの原因菌である「クティバテリウム・アクネス（C. acnes）」を死멸させる抗菌効果に優れています（米国皮膚科学会）。\n\n最新のホームデバイスはこれら2つの波長を組み合わせて複合的な肌の悩みを解決します。ただし、安全な使用のために必ずFDA承認を受けた機器を選択すべきであり、特に網膜保護のために専用のアイマスクや保護メガネを着用することが必須です。"
        }
      }
    ]
  },
  {
    id: "personal-color-interior-design",
    title: { ko: "퍼스널 컬러와 인테리어, 나에게 어울리는 공간 컬러 팔레트", en: "Personal Colour and Interior Design, Finding Your Space Palette", zh: "个人色彩与室内设计，找到属于你的空间配色", ja: "パーソナルカラーとインテリア 自分に合う空間カラーパレット" },
    description: { ko: "퍼스널 컬러를 넘은 '컬러 하모니' 인테리어 가이드. 거주자의 피부 언더톤과 조화를 이루는 공간 컬러 설계법과 색채 심리학의 실제 사례를 소개합니다.", en: "Beyond Personal Colour: An Interior Colour Harmony Guide. Designing space colours that harmonise with the resident's skin undertone and actual examples of colour psychology.", zh: "超越个人色彩的'色彩和谐'室内设计指南。介绍与居住者肤色底调协调的空间色彩设计法及色彩心理学的实际案例。", ja: "パーソナルカラーを超えた「カラーハーモニー」インテリアガイド。居住者の肌のアンダートーンと調和する空間カラー設計法と色彩心理学の実例を紹介します。" },
    metaTitle: { ko: "퍼스널 컬러 인테리어 가이드, 나에게 맞는 공간 색 | FINDCORE", en: "Personal Colour Interior Guide, Space Colours for You | FINDCORE", zh: "个人色彩室内设计指南，适合你的空间配色 | FINDCORE", ja: "パーソナルカラーインテリアガイド 自分に合う空間の色 | FINDCORE" },
    metaDescription: { ko: "퍼스널 컬러 진단 결과를 인테리어에 적용하는 방법. 봄웜·여름쿨·가을웜·겨울쿨 타입별 거실·침실 컬러 팔레트 가이드.", en: "How to apply personal colour diagnosis to interior design. Living room and bedroom colour palette guide by seasonal type.", zh: "将个人色彩诊断结果应用于室内设计的方法。按季型推荐客厅·卧室配色指南。", ja: "パーソナルカラー診断結果をインテリアに適用する方法。シーズンタイプ別リビング・寝室カラーパレットガイド。" },
    image: "/interior_color_palette_2026.png",
    category: { ko: "라이프스타일", en: "Lifestyle", zh: "生活方式", ja: "ライフスタイル" },
    date: "2026.03.19",
    author: { ko: "FINDCORE 에디토리얼", en: "FINDCORE Editorial", zh: "FINDCORE 编辑部", ja: "FINDCORE エディトリアル" },
    content: [
      {
        subtitle: { ko: "공간과 인체의 색채 조화, 언더톤 매칭", en: "Colour Harmony Between Space and Body, Undertone Matching", zh: "空间与人体的色彩和谐，底调匹配", ja: "空間と人体の色彩調和 アンダートーンマッチング" },
        text: {
          ko: "퍼스널 컬러는 패션에만 국한되지 않습니다. 인테리어 설계에서도 거주자의 피부 언더톤(Warm/Cool)과 공간의 베이스 컬러를 맞추는 것이 심리적 안정감에 큰 영향을 미칩니다(Research Trends Journal).\n\n웜톤 거주자가 차가운 파란색이나 회색 기반의 공간에 있으면 피부가 칙칙해 보이고 무의식적인 불편함을 느낄 수 있습니다. 반면 쿨톤 거주자가 노란기가 강한 조명이나 벽지 속에서 생활하면 피부가 누렇게 떠 보이는 현상이 발생합니다. 인테리어 전문 매체들은 이를 '스킨-스페이스 하모니'라 부르며, 거주자가 가장 매력적이고 편안하게 보일 수 있는 색상 팔레트 구성을 강조합니다.\n\n공간 연출에는 '60-30-10 법칙'을 활용하는 것이 좋습니다. 주조색(벽·바닥) 60%, 보조색(가구·커튼) 30%, 강조색(소품·액자) 10%의 비율로 색을 배분합니다. 웜톤 공간이라면 크림 화이트, 베이지, 테라코타를 베이스로 하고 오크 원목을 매치하면 따뜻한 조화를 이룹니다. 쿨톤 공간이라면 화이트, 그레이, 쿨 네이비를 베이스로 하고 실버나 크롬 소재를 활용하여 세련된 분위기를 연출할 수 있습니다(Architectural Digest, Swatchbox).",
          en: "Personal colour is not limited to fashion. In interior design, aligning the resident's skin undertone (Warm/Cool) with the space's base colours significantly affects psychological comfort (Research Trends Journal).\n\nA warm-toned individual in a space with cool blue or grey bases may appear dull and feel subconscious discomfort. Conversely, a cool-toned person living among strong yellow-toned lighting or wallpaper may experience a sallow, washed-out look. Interior media calls this 'Skin-Space Harmony,' emphasising colour palettes that make residents look and feel their best.\n\nFor spatial styling, use the '60-30-10 rule': 60% dominant colour (walls/floors), 30% secondary colour (furniture/curtains), and 10% accent colour (decor). A warm-toned space thrives on bases like cream white, beige, or terracotta matched with oak wood for a welcoming harmony. A cool-toned space benefits from white, grey, or cool navy bases paired with silver or chrome accents for a sophisticated atmosphere (Architectural Digest, Swatchbox).",
          zh: "个人色彩不仅限于时尚。在室内设计中，居住者的肤色底调（暖/冷）与空间的基调色协调一致，对心理稳定性有很大影响（Research Trends Journal）。\n\n暖色调居住者如果长时间待在冷蓝色或灰色调的空间中，肤色会显得暗沉，并可能感到无意识的不适。相反，冷色调居住者在黄调较重的照明或墙纸中生活，肤色会出现泛黄现象。室内设计媒体将其称为'肤色-空间和谐（Skin-Space Harmony）'，强调构建能让居住者呈现最完美、最舒适状态的色板。\n\n空间布置建议参考'60-30-10法则'：主色调（墙面/地板）占60%，辅助色（家具/窗帘）占30%，点缀色（饰品/画框）占10%。暖色调空间推荐以奶油白、米色、赤陶色为基调，搭配橡木，营造温暖和谐感。冷色调空间则推荐以白色、灰色、冷海军蓝为基调，利用银色或铬金属材质营造洗练的氛围（Architectural Digest, Swatchbox）。",
          ja: "パーソナルカラーはファッションに限定されません。インテリア設計でも居住者の肌のアンダートーン（ウォーム/クール）と空間のベースカラーを合わせることは、心理的安定感に大きな影響を与えます（Research Trends Journal）。\n\nウォームトーンの居住者が冷たい青色やグレーベースの空間にいると肌がくすんで見え、無意識の不快感を感じることがあります。逆にクールトーンの居住者が黄みの強い照明や壁紙の中で生活すると、肌が黄ばんで浮いて見える現象が発生します。インテリア専門メディアはこれを「スキン・スペース・ハモニー」と呼び、居住者が最も魅力的でリラックスして見えるカラーパレット構成を強調しています。\n\n空間演出には「60-30-10の法則」を活用するのが良いでしょう。主調色（壁・床）60%、補助色（家具・カーテン）30%、強調色（小物・額縁）10%の比率で色を配分します。ウォームトーンの空間ならクリームホワイト、ベージュ、テラコッタをベースにし、オーク材をマッチさせれば暖かい調和を成します。クールトーンの空間ならホワイト、グレー、クールネイビーをベースにし、シルバーやクロム素材を活用して洗練された雰囲気を演出できます（Architectural Digest, Swatchbox）。"
        }
      }
    ]
  },
];
