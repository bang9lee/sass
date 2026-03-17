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
      ko: "블룸 스킨: 2026년 글래스 스킨 이후의 뷰티 트렌드 | FINDCORE",
      en: "Bloom Skin: The 2026 Beauty Trend After Glass Skin | FINDCORE",
      zh: "花绽肌：玻璃肌之后的 2026 美容趋势 | FINDCORE",
      ja: "ブルームスキン：ガラス肌の次、2026年ビューティートレンド | FINDCORE"
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
          ko: "실전 루틴: 간소화가 핵심이다",
          en: "Practical Routine: Simplification Is the Key",
          zh: "实战流程：精简才是核心",
          ja: "実践ルーティン：シンプル化が鍵"
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
      ko: "글래모라티 2026: 80년대 파워 드레싱의 귀환 | FINDCORE",
      en: "Glamoratti 2026: The Return of 80s Power Dressing | FINDCORE",
      zh: "Glamoratti 2026：80 年代力量穿搭的回归 | FINDCORE",
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
      ko: "K-뷰티 AI 스킨케어 디바이스 2026: Skinsight·Medicube AGE-R 분석 | FINDCORE",
      en: "K-Beauty AI Skincare Device 2026: Skinsight & Medicube AGE-R | FINDCORE",
      zh: "K-beauty AI 护肤设备 2026：Skinsight·Medicube AGE-R 分析 | FINDCORE",
      ja: "Kビューティー AIスキンケアデバイス2026：Skinsight·Medicube AGE-R | FINDCORE"
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
          ko: "AI 스킨케어 디바이스 시장: 2030년까지 898억 달러",
          en: "The AI Skincare Device Market: $89.8 Billion by 2030",
          zh: "AI 护肤设备市场：2030 年达 898 亿美元",
          ja: "AIスキンケアデバイス市場：2030年までに898億ドル"
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
          en: "Translucent Layered Pastels: The Watercolour Principle",
          zh: "透明叠加马卡龙色：水彩原理",
          ja: "透明感を重ねるパステル：水彩の原理"
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
          ko: "베이비 블루·라일락·소프트 핑크: 2026 파스텔 3색 가이드",
          en: "Baby Blue, Lilac & Soft Pink: 2026's Pastel Trio Guide",
          zh: "宝宝蓝·丁香紫·柔粉：2026 马卡龙三色指南",
          ja: "ベビーブルー・ライラック・ソフトピンク：2026年パステル三色ガイド"
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
      ko: "피너츠 버터 립 2026: K-뷰티 블러 립 완벽 가이드 | FINDCORE",
      en: "Peanut Butter Lips 2026: K-Beauty Blurred Lip Complete Guide | FINDCORE",
      zh: "花生酱唇 2026：K-beauty 晕染唇完整指南 | FINDCORE",
      ja: "ピーナッツバターリップ2026：Kビューティーブラードリップ完全ガイド | FINDCORE"
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
          ko: "모카 무스의 진화: 왜 피너츠 버터인가",
          en: "The Evolution of Mocha Mousse: Why Peanut Butter?",
          zh: "摩卡慕斯的进化：为什么是花生酱？",
          ja: "モカムースの進化：なぜピーナッツバターなのか"
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
          ko: "블러드 립(Blurred Lip): 경계를 지우는 기술",
          en: "Blurred Lip: The Technique of Erasing Boundaries",
          zh: "晕染唇（Blurred Lip）：消除轮廓的技巧",
          ja: "ブラードリップ：境界を消す技術"
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
  }
];
