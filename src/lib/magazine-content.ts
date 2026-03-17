export type MagazineArticle = {
    id: string;
    title: { ko: string; en: string; zh: string; ja: string };
    description: { ko: string; en: string; zh: string; ja: string };
    image: string;
    category: { ko: string; en: string; zh: string; ja: string };
    date: string;
};

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
    {
        id: "aesthetic-guide",
        title: {
            ko: "나만의 에스테틱 찾기: 분위기와 감성을 정의하는 법",
            en: "Finding Your Essence: A Guide to Aesthetic Personalities",
            zh: "寻找您的本质：审美个性指南",
            ja: "あなたの本質を見つけよう：感性タイプ別スタイルガイド"
        },
        description: {
            ko: "단순한 유행을 넘어 당신의 내면과 가장 잘 어울리는 고유의 스타일을 탐구합니다.",
            en: "Beyond simple trends, explore the unique style that best resonates with your inner self.",
            zh: "超越简单的流行趋势，探索最能引起您内心共鸣的独特风格。",
            ja: "単なるトレンドを超えて、あなたの内面と最も調和する独自のスタイルを探求します。"
        },
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        category: { ko: "트렌드", en: "Aesthetic", zh: "审美", ja: "トレンド" },
        date: "2024.03.15"
    },
    {
        id: "color-science",
        title: {
            ko: "색채의 심리학: 피부톤과 빛의 조화",
            en: "The Science of Color: Skin Tones & Light Harmony",
            zh: "色彩心理学：肤色与光线的和谐",
            ja: "色彩の心理学：肌のトーンと光の調和"
        },
        description: {
            ko: "퍼스널 컬러가 얼굴의 생기를 어떻게 변화시키는지 과학적인 증거를 통해 알아봅니다.",
            en: "Learn how personal color transforms facial vitality through scientific evidence.",
            zh: "通过科学证据了解个人色彩如何改变面部活力。",
            ja: "パーソナルカラーが顔の印象をどのように変えるのか、科学的な根拠から紐解きます。"
        },
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        category: { ko: "컬러", en: "Color", zh: "色彩", ja: "カラー" },
        date: "2024.03.12"
    },
    {
        id: "frame-mastering",
        title: {
            ko: "얼굴형의 완성: 안경과 주얼리 스타일링",
            en: "Mastering the Frame: Eyewear & Jewelry Styling",
            zh: "框架大师：眼镜与珠宝搭配",
            ja: "フレームを極める：メガネとジュエリーのスタイリング"
        },
        description: {
            ko: "당신의 얼굴형을 가장 아름답게 보완해 줄 액세서리 선택의 모든 것.",
            en: "Everything you need to know about choosing accessories that best complement your face shape.",
            zh: "关于选择最能衬托您脸型的配饰，您需要了解的一切。",
            ja: "あなたの顔型を最も美しく際立たせるアクセサリー選びのすべて。"
        },
        image: "https://images.unsplash.com/photo-1511499767350-a159402e5bf1?q=80&w=2070&auto=format&fit=crop",
        category: { ko: "스타일", en: "Style", zh: "风格", ja: "スタイル" },
        date: "2024.03.10"
    },
    {
        id: "minimalist-2024",
        title: {
            ko: "2024 미니멀리즘: 절제의 미학",
            en: "2024 Minimalism: The Aesthetic of Moderation",
            zh: "2024 极简主义：克制的审美",
            ja: "2024 ミニマリズム：節制の美学"
        },
        description: {
            ko: "단순함 속에 숨겨진 깊이 있는 고급스러움을 표현하는 새로운 방법.",
            en: "New ways to express deep luxury hidden within simplicity.",
            zh: "在简单中表达深层奢华的新方式。",
            ja: "シンプルさの中に隠された深みのある高級感を表現する新しいアプローチ。"
        },
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2070&auto=format&fit=crop",
        category: { ko: "디자인", en: "Design", zh: "设计", ja: "デザイン" },
        date: "2024.03.08"
    },
    {
        id: "psychology-style",
        title: {
            ko: "스타일의 심리학: 분위기에 맞는 옷 입기",
            en: "Psychology of Style: Dressing for Your Vibe",
            zh: "风格心理学：顺应氛围的穿搭",
            ja: "スタイルの心理学：気分に合わせた着こなし"
        },
        description: {
            ko: "옷이 당신의 기분과 상대방에게 전달하는 메시지에 미치는 영향.",
            en: "How clothing affects your mood and the messages you send to others.",
            zh: "服饰如何影响您的情绪以及您向他人传递的信息。",
            ja: "衣服があなたの気分や相手に伝えるメッセージに与える影響。"
        },
        image: "https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=2071&auto=format&fit=crop",
        category: { ko: "마인드", en: "Mindset", zh: "心理", ja: "マインド" },
        date: "2024.03.05"
    }
];
