import type { SupportedLang } from "@/lib/site-content";

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export type SubSeasonId =
    | 'spring-light' | 'spring-true' | 'spring-bright'
    | 'summer-light' | 'summer-true' | 'summer-soft'
    | 'autumn-soft' | 'autumn-true' | 'autumn-deep'
    | 'winter-deep' | 'winter-true' | 'winter-bright';

export interface LocalizedCelebrities {
    ko: string[];
    en: string[];
    zh: string[];
    ja: string[];
}

export interface ColorResult {
    id: SubSeasonId;
    baseSeason: SeasonId;
    title: string;
    title_ko: string;
    title_zh: string;
    title_ja: string;
    description: string;
    description_ko: string;
    description_zh: string;
    description_ja: string;
    keywords: string[];
    keywords_ko: string[];
    keywords_zh: string[];
    keywords_ja: string[];
    bestColors: string[];
    worstColors: string[];
    palette: string[];
    image: string;
    celebrities_male: LocalizedCelebrities;
    celebrities_female: LocalizedCelebrities;
}

export interface LocalizedColorResultContent {
    id: SubSeasonId;
    title: string;
    description: string;
    keywords: string[];
    bestColors: string[];
    worstColors: string[];
    image: string;
    celebrities: string[];
}

export const COLOR_RESULTS: Record<SubSeasonId, ColorResult> = {
    'spring-light': {
        id: 'spring-light',
        baseSeason: 'spring',
        title: 'Light Spring',
        title_ko: '봄 라이트',
        title_zh: '浅春季',
        title_ja: 'ライトスプリング',
        description: `Your bright and sheer energy shines best in high-luminosity, low-saturation warm colors. You have a delicate, airy, and lively vibe that brings a natural soft glow to your complexion. In color theory, your base is "Warm" but your most important feature is "Light."\n\n[Styling Tips]\nPale warm pastels like light peach, soft yellow, and milky mint suit you best. For makeup, choose "Peach-Coral" or "Juicy Pink" shades with a sheer, dewy finish. Avoid heavy, dark shades (Black, Navy) or high-contrast icy tones that can overwhelm your delicate features.`,
        description_ko: `당신의 투명하고 맑은 에너지는 채도가 낮고 명도가 높은 따뜻한 색상(High-Light, Low-Chroma)에서 가장 빛납니다. 여리여리하면서도 생기 있는 사랑스러운 분위기를 가지셨군요. 당신의 핵심 조화 요소는 '따뜻함'보다도 '밝음'에 있습니다.\n\n[스타일링 팁]\n라이트 피치, 페일 옐로우, 밀키한 민트 등 명도가 높고 채도가 낮은 맑은 색상이 베스트입니다. 메이크업의 경우, 투명한 수채화 발색의 피치 코랄이나 살구색 립 제품을 추천합니다. 검정색이나 네이비 같은 무거운 어두운 색, 혹은 차가운 아이시 톤은 당신의 섬세한 이목구비를 가릴 수 있으니 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你清透的能量在浅色、柔和的暖色调中最为闪耀。\n你自带一种娇柔活泼的可爱氛围。\n\n[穿搭建议]\n浅桃色、柔黄色和薄荷绿等高明度的浅色系最适合你。\n避免沉重、暗哑的色系或高对比度的冰冷色。`,
        description_ja: `[分析結果]\nあなたの透明感のあるエネルギーは、明るく柔らかなパステルウォームトーンで最も輝きます。\n繊細で生き生きとした愛らしい雰囲気を持っています。\n\n[スタイリングのヒント]\nライトピー치, ペールイエロー, ミルキーミントなど, 明度が高く澄んだ色がベストです。\n暗く重い色や強いコントラストは避けたほうがよいでしょう。`,
        keywords: ['Delicate', 'Clear', 'Soft', 'Fresh', 'Warm'],
        keywords_ko: ['여리여리', '투명함', '부드러움', '프레시', '따뜻함'],
        keywords_zh: ['娇柔', '清透', '柔和', '清新', '温暖'],
        keywords_ja: ['繊細', '透明感', 'ソフト', 'フレッシュ', '暖かい'],
        bestColors: ['#F5E68C', '#FA9072', '#FF6B4A', '#FF9E66', '#FFE5A3'],
        worstColors: ['#000000', '#000080', '#4B0082'],
        palette: ['#F5E68C', '#FA9072', '#FF9E66', '#FFE5A3'],
        image: '/images/color-v3/spring.png',
        celebrities_male: {
            ko: ['변우석', '박보검', '임시완'],
            en: ['Eddie Redmayne', 'Tom Holland', 'Ryan Reynolds'],
            zh: ['杨洋', '鹿晗', '王俊凯'],
            ja: ['千葉雄大', '坂口健太郎', '志尊淳']
        },
        celebrities_female: {
            ko: ['윤아', '박보영', '수지'],
            en: ['Amanda Seyfried', 'Elle Fanning', 'Taylor Swift'],
            zh: ['赵丽颖', '唐嫣', '周冬雨'],
            ja: ['橋本環奈', '佐々木希', '有村架純']
        }
    },
    'spring-true': {
        id: 'spring-true',
        baseSeason: 'spring',
        title: 'True Spring',
        title_ko: '봄 트루 (봄 웜톤)',
        title_zh: '真春季',
        title_ja: 'トゥルースプリング',
        description: `Your vibrant energy shines best in clear, warm, and highly saturated "pure" warm colors. You have a lively, sunny, and lovely vibe that radiates warmth. Your key feature is "Warm" – meaning any hint of gray or blue can make you look tired.\n\n[Styling Tips]\nCoral, golden yellow, and spring green suit you best. Use "Gold" jewelry rather than silver to boost your radiance. For makeup, "Warm Red" or "Bright Coral" lip colors work wonders. Avoid muted, dusty, or cold grayish tones that can "wash out" your natural vibrancy.`,
        description_ko: `당신의 맑고 생기 있는 에너지는 따뜻하고 화사한 원색(Vivid, Warm) 컬러에서 가장 빛납니다. 주변을 환하게 만드는 통통 튀고 발랄한 분위기를 가지셨군요. 당신의 핵심 조화 요소는 확실한 '따뜻함(Warm)'입니다. 노란기가 빠진 색이나 탁한 색을 입으면 안색이 금방 어두워질 수 있습니다.\n\n[스타일링 팁]\n코랄, 골든 옐로우, 맑은 연두색 등 화사한 웜톤이 베스트입니다. 실버보다는 골드 주얼리가 당신의 혈색을 가장 예쁘게 살려줍니다. 메이크업은 선명한 웜 레드나 브라이트 코랄 립을 사용해 보세요. 회색기가 섞인 탁한 색이나 차가운 블루 톤은 당신의 생기를 뺏어갈 수 있으니 주의하세요.`,
        description_zh: `[分析结果]\n你充满活力的能量在清透、温暖明媚的颜色中最为闪耀。\n你自带一种活泼可爱、让人忍不住微笑的氛围。\n\n[穿搭建议]\n珊瑚色、金黄色和春季绿最适合你。\n避免会让你显得灰暗的浑浊冷色调。`,
        description_ja: `[分析結果]\nあなたの活気あるエネルギーは、クリアで暖かく、日差しのような色で最も輝きます。\n周りを笑顔にする、生き生きとした雰囲気を持っています。\n\n[スタイリングのヒント]\nコーラル, ゴールデンイエロー, スプリンググリーンがベストです。\n肌をくすませる, 冷たく濁ったグレーがかった色は避けましょう。`,
        keywords: ['Lively', 'Warm', 'Clear', 'Lovely', 'Vibrant'],
        keywords_ko: ['생기', '따뜻함', '맑음', '발랄함', '화사함'],
        keywords_zh: ['活泼', '温暖', '清透', '可爱', '充滿活力'],
        keywords_ja: ['生き生き', '暖かい', 'クリア', '愛らしい', '鮮やか'],
        bestColors: ['#F4A772', '#F1DCA5', '#FFBF40', '#7FB80E', '#FFB3B3'],
        worstColors: ['#808080', '#708090', '#36454F'],
        palette: ['#F4A772', '#FFBF40', '#7FB80E', '#FFB3B3'],
        image: '/images/color-v3/spring.png',
        celebrities_male: {
            ko: ['정해인', '이준기', '황민현'],
            en: ['Bradley Cooper', 'Matthew McConaughey', 'Chris Pine'],
            zh: ['许凯', '王一博', '任嘉伦'],
            ja: ['坂口健太郎', '菅田将暉', '山崎賢人']
        },
        celebrities_female: {
            ko: ['수지', '로제', '박보영'],
            en: ['Blake Lively', 'Emma Stone', 'Cameron Diaz'],
            zh: ['赵露思', '刘诗诗', '戚薇'],
            ja: ['石原さとみ', '上野樹里', '桐谷美玲']
        }
    },
    'spring-bright': {
        id: 'spring-bright',
        baseSeason: 'spring',
        title: 'Bright Spring',
        title_ko: '봄 브라이트',
        title_zh: '亮春季',
        title_ja: 'ブライトスプリング',
        description: `You have a striking, sparkling, and high-contrast aura. Your key feature is "Clear" (Chroma). Highly saturated, vivid warm colors amplify your energetic presence. You need "Contrast" to balance your natural brightness.\n\n[Styling Tips]\nVivid coral, bright turquoise, and hot warm pinks look stunning. Don't be afraid of bold, high-contrast patterns. For makeup, a clean skin base with a "High-Saturations" lip point (Cherry Red, Vivid Orange) is best. Avoid muted, dusty, or low-contrast pastels that dull your natural high-energy shine.`,
        description_ko: `톡톡 튀고 반짝이는 화려한 아우라를 지니셨네요. 당신의 핵심 조화 요소는 '선명함(Clear)'입니다. 채도가 높은 비비드한 웜톤 컬러가 당신의 에너제틱한 존재감을 돋보이게 합니다. 이목구비의 대비감을 확실히 살려줄 수 있는 스타일이 잘 어울립니다.\n\n[스타일링 팁]\n비비드 코랄, 브라이트 터콰이즈, 웜 마젠타 등 선명하고 쨍한 색이 찰떡입니다. 무늬가 크고 대비가 강한 옷도 잘 소화합니다. 메이크업은 피부 표현을 깨끗하게 한 뒤, 체리 레드나 비비드 오렌지처럼 채도 높은 립으로 포인트를 주는 것이 베스트입니다. 뿌옇고 흐릿한 뮤트톤이나 힘 빠진 파스텔을 입으면 매력이 반감될 수 있습니다.`,
        description_zh: `[分析结果]\n你拥有一种出众且闪耀的光环. 高饱和、生动的暖色调能放大你充满存在的能量。\n\n[穿搭建议]\n生动的珊瑚色、亮绿松石色和亮暖粉色非常迷人。\n避免会掩盖你自然光彩的浑浊、灰暗马卡龙色。`,
        description_ja: `[分析結果]\n際立ってキラキラしたオーラを持っています. 彩度の高い鮮やかな暖色が、あなたのエネルギッシュな存在感を引き立てます。\n\n[スタイリングのヒント]\nビビッドなコー랄, ブ라이트 터콰이즈, 웜 마젠타 등이 베스트입니다. 대비가 강한 옷도 잘 소화합니다.\n本来の輝きを鈍らせる, くすんだ濁ったパステルは避けましょう。`,
        keywords: ['Sparkling', 'Vivid', 'Energetic', 'Striking', 'Clear'],
        keywords_ko: ['반짝임', '비비드', '에너제틱', '화려함', '선명함'],
        keywords_zh: ['闪耀', '生动', '充满活力', '引人注目', '清透'],
        keywords_ja: ['キラキラ', 'ビビッド', 'エネルギッシュ', '印象적', 'クリア'],
        bestColors: ['#F4ABE2', '#F2ACA4', '#CC2F85', '#2ECC71', '#00BCD4'],
        worstColors: ['#BDB76B', '#8FBC8F', '#BC8F8F'],
        palette: ['#F4ABE2', '#CC2F85', '#2ECC71', '#00BCD4'],
        image: '/images/color-v3/spring.png',
        celebrities_male: {
            ko: ['차은우', '백현', '육성재'],
            en: ['Chris Evans', 'Chris Pratt', 'Zac Efron'],
            zh: ['王嘉尔', '张艺兴', '黄子韬'],
            ja: ['横浜流星', '新田真剣佑', '吉沢亮']
        },
        celebrities_female: {
            ko: ['아이유', '조이', '나연'],
            en: ['Emma Watson', 'Margot Robbie', 'Miley Cyrus'],
            zh: ['Angelababy', '迪丽热巴', '虞书欣'],
            ja: ['広瀬すず', '今田美桜', '永野芽郁']
        }
    },
    'summer-light': {
        id: 'summer-light',
        baseSeason: 'summer',
        title: 'Light Summer',
        title_ko: '여름 라이트',
        title_zh: '浅夏季',
        title_ja: 'ライトサマー',
        description: `Your aesthetic is ethereal, fresh, and delicate. Your complexion shines under high-luminosity, low-saturation cool pastels. Your key feature is "Light" – meaning heavy or dark colors can make you look tired or shadowed.\n\n[Styling Tips]\nPowder blue, icy pink, and soft lavender make you look flawlessly clear. Use "Silver" or "White Gold" jewelry for a refined look. For makeup, "Lavender Pink" or "Milky Strawberry" shades with a sheer finish are perfect. Avoid dark, heavy earth tones or high-contrast warm colors that clash with your airy vibe.`,
        description_ko: `마치 수채화처럼 맑고 청초한 분위기입니다. 당신의 핵심 조화 요소는 '시원함'보다도 '밝음(Light)'에 있습니다. 흰기가 많이 섞인 쿨톤 파스텔이 가벼우면서도 깨끗한 매력을 극대화해줍니다. 조금이라도 어두운 색이 몸에 닿으면 안색에 그림자가 질 수 있습니다.\n\n[스타일링 팁]\n파우더 블루, 아이시 핑크, 페일 라벤더 색상을 입으면 피부가 투명해 보입니다. 실버나 화이트 골드 주얼리가 당신의 맑은 무드를 배가시켜줍니다. 메이크업은 라벤더 핑크나 딸기우유 색상의 투명한 립과 블러셔를 추천합니다. 어둡고 탁한 가을 색이나 노란기가 강한 색상은 당신의 청량함을 가릴 수 있으니 피하세요.`,
        description_zh: `[分析结果]\n你的美感如仙境般娇柔. 苍白的冷调马卡龙色完美衬托你空灵的气质。\n\n[穿搭建议]\n粉蓝色、冰粉色和柔和薰衣草紫让你看起来无瑕纯净。\n避免深沉的大地色系或高对比度的暖色调。`,
        description_ja: `[分析結果]\n水彩画のように澄んだ、儚げな美しさがあります. 白みの強いクールなパステルが、ふんわりとした魅力を極限まで高めます。\n\n[スタイリングのヒント]\nパウダーブルー, アイシィピンク, ペールラベンダーを입으면 피부가 투명해 보입니다.\n暗く重いアースカラーや, コントラストの強すぎる暖色は避けましょう。`,
        keywords: ['Ethereal', 'Delicate', 'Airy', 'Cool', 'Pale'],
        keywords_ko: ['청초함', '여리여리', '가벼움', '시원함', '페일'],
        keywords_zh: ['空灵', '娇柔', '轻盈', '清冷', '苍白'],
        keywords_ja: ['儚げ', '繊細', 'エアリー', '涼しげ', 'ペール'],
        bestColors: ['#99CCEE', '#BDA7DD', '#F3E5F5', '#8CBDBD', '#D1E6D5'],
        worstColors: ['#8B4513', '#6B4226', '#FF8C00'],
        palette: ['#99CCEE', '#BDA7DD', '#F3E5F5', '#8CBDBD'],
        image: '/images/color-v3/summer.png',
        celebrities_male: {
            ko: ['수호', '정우', '영훈'],
            en: ['Jude Law', 'Paul Bettany', 'Cillian Murphy'],
            zh: ['肖战', '杨洋', '王源'],
            ja: ['岡田将生', '神木隆之介', '中川大志']
        },
        celebrities_female: {
            ko: ['태연', '손예진', '김고은'],
            en: ['Reese Witherspoon', 'Margot Robbie', 'Gwyneth Paltrow'],
            zh: ['刘亦菲', '周冬雨', '祝绪丹'],
            ja: ['新垣結衣', '浜辺美波', '宮脇咲良']
        }
    },
    'summer-true': {
        id: 'summer-true',
        baseSeason: 'summer',
        title: 'True Summer',
        title_ko: '여름 트루 (여름 쿨톤)',
        title_zh: '真夏季',
        title_ja: 'トゥルーサマー',
        description: `You have an elegant and refreshingly cool aura. Your key feature is "Cool" – you need colors with a blue base to look your best. Classic cool tones harmonize perfectly with your clean and sophisticated vibe, removing any unwanted yellow from your skin tone.\n\n[Styling Tips]\nSoft cool pinks, cornflower blue, and slate gray are your best friends. Stick to "Silver" accessories to maintain your cool edge. For makeup, "Cherry Pink" or "Plum" colors with a clean finish work best. Avoid warm, yellowish browns, mustard, or vivid neon colors that can make your skin look dull.`,
        description_ko: `우아하면서도 시원하고 청량한 '정석 쿨톤' 아우라를 가지셨군요. 당신의 핵심 조화 요소는 확실한 '차가움(Cool)'입니다. 노란기가 쏙 빠진 푸른 베이스의 색상들이 당신의 피부를 가장 깨끗하고 세련되게 만들어줍니다.\n\n[스타일링 팁]\n쿨 핑크, 콘플라워 블루, 슬레이트 그레이, 라일락 색상이 베스트입니다. 액세서리는 무조건 실버 계열로 선택하여 시원한 느낌을 유지하세요. 메이크업은 체리 핑크나 플럼 계열의 색상을 깨끗하게 연출하는 것이 좋습니다. 오렌지, 머스타드 같은 더운 웜 브라운이나 쨍한 네온 컬러는 안색을 칙칙하게 만들 수 있으니 피하세요.`,
        description_zh: `[分析结果]\n你散发着优雅清冷、宛如夏日微风的氛围。\n经典的冷色调与你干净精致的形象完美契合。\n\n[穿搭建议]\n柔和的冷粉色、矢车菊蓝和石板灰是你的最佳搭档。\n避免偏黄的暖棕色或极度刺眼的霓虹色。`,
        description_ja: `[分析結果]\nエレガントで涼しげな大人のクールトーンオーラを持っています. \n黄みを排除した清潔感のある洗練された冷たい色が完璧に調和します。\n\n[スタイリングのヒント]\nクールピンク, コーンフラワーブルー, スレートグレー, ライラックがベストです。\nオレンジやマスタードのような暑苦しいブラウン, 鮮やかなネオンカラーは避けましょう。`,
        keywords: ['Elegant', 'Cool', 'Classic', 'Clean', 'Sophisticated'],
        keywords_ko: ['우아함', '시원함', '클래식', '깨끗함', '세련됨'],
        keywords_zh: ['优雅', '清冷', '经典', '干净', '精致'],
        keywords_ja: ['上品', '涼しげ', 'クラシック', '清潔感', '洗練'],
        bestColors: ['#B0DEF4', '#ECC8F9', '#F0B6F8', '#E6E6FA', '#87CEEB'],
        worstColors: ['#FFA500', '#FF8C00', '#DAA520'],
        palette: ['#B0DEF4', '#ECC8F9', '#E6E6FA', '#87CEEB'],
        image: '/images/color-v3/summer.png',
        celebrities_male: {
            ko: ['김수현', '서강준', '차은우'],
            en: ['Cillian Murphy', 'Daniel Radcliffe', 'James McAvoy'],
            zh: ['王凯', '陈晓', '朱一龙'],
            ja: ['佐藤健', '高橋一生', '三浦春馬']
        },
        celebrities_female: {
            ko: ['김혜수', '아이린', '한효주'],
            en: ['Emily Blunt', 'Cate Blanchett', 'Lupita Nyong\'o'],
            zh: ['倪妮', '古力娜扎', '张天爱'],
            ja: ['綾瀬はるか', '戸田恵梨香', '北川景子']
        }
    },
    'summer-soft': {
        id: 'summer-soft',
        baseSeason: 'summer',
        title: 'Soft Summer',
        title_ko: '여름 뮤트 (소프트)',
        title_zh: '柔夏季',
        title_ja: 'ソフトサマー',
        description: `Your vibe is effortlessly chic, romantic, and gracefully muted. Your key feature is "Soft" (Low Chroma). Dusty, grayish cool tones wrap elegantly around your complexion, smoothing out your features for a sophisticated look.\n\n[Styling Tips]\nDusty rose, sage green, and muted grayish blue look luxurious on you. "Matte Silver" or "Antique Silver" jewelry matches your soft vibe perfectly. For makeup, "Dried Rose" or "Mauve" colors with a matte finish are ideal. Avoid highly saturated primary colors or pure, glaring white which can look too harsh against your soft features.`,
        description_ko: `특유의 차분함과 지적인 분위기를 동시에 지닌 '여름 뮤트'입니다. 당신의 핵심 조화 요소는 '탁함(Soft, Low Chroma)'입니다. 회색기가 섞인 오묘한 컬러들이 당신의 이목구비를 부드럽게 감싸며 고급스러운 코팅을 한 듯한 무드를 만들어줍니다.\n\n[스타일링 팁]\n더스티 로즈, 모브, 세이지 그린, 회끼 도는 푸른색을 입었을 때 가장 귀티가 납니다. 주얼리도 광택이 너무 강한 것보다 매트 실버나 앤틱 실버가 잘 어울립니다. 메이크업은 말린 장미(MLBB)나 모브 톤의 매트한 질감을 활용해 보세요. 눈이 시린 선명한 원색이나 아예 새하얀 순백색은 피부와 따로 놀 수 있습니다.`,
        description_zh: `[分析结果]\n你的气质慵懒时尚、浪漫且优雅低调。\n带灰调的莫兰迪色系能高贵地包裹你本身的肤色。\n\n[穿搭建议]\n灰粉色、灰绿色和低饱和灰蓝色在你身上显尽奢华。\n避免极度饱和的亮色或刺眼的纯白色。`,
        description_ja: `[分析結果]\n気だるげな色気とロマンチックさを兼ね備えた、高級感のある洗練されたミュートトーンです. \n灰色がかった落ち着いたくすみカラーが、肌を上品に包み込みます。\n\n[スタイリングのヒント]\nダスティローズ, モーブ, セ이지 그린, 회끼 도는 푸른색を입었을 때 기품이 납니다.\n鮮やかな原色や真っ白は、肌から浮いて見えやすいので注意です。`,
        keywords: ['Muted', 'Chic', 'Romantic', 'Dusty', 'Graceful'],
        keywords_ko: ['차분함', '시크함', '로맨틱', '더스티', '우아함'],
        keywords_zh: ['低调', '时尚', '浪漫', '灰调', '优雅'],
        keywords_ja: ['穏やか', 'シック', 'ロマンチック', 'くすみ', '上品'],
        bestColors: ['#A4C1F3', '#C5D8AB', '#F2EFC9', '#36454F', '#005178'],
        worstColors: ['#FF0000', '#0000FF', '#00FF00'],
        palette: ['#A4C1F3', '#C5D8AB', '#F2EFC9', '#36454F'],
        image: '/images/color-v3/summer.png',
        celebrities_male: {
            ko: ['남주혁', '공유', '백현'],
            en: ['Ryan Gosling', 'Dakota Johnson', 'Jake Gyllenhaal'],
            zh: ['井柏然', '白敬亭', '邓伦'],
            ja: ['高橋一生', '松坂桃李', '向井理']
        },
        celebrities_female: {
            ko: ['김태리', '전지현', '문채원'],
            en: ['Jennifer Aniston', 'Dakota Johnson', 'Sarah Jessica Parker'],
            zh: ['高圆圆', '周迅', '汤唯'],
            ja: ['蒼井優', '宮崎あおい', '石田ゆり子']
        }
    },
    'autumn-soft': {
        id: 'autumn-soft',
        baseSeason: 'autumn',
        title: 'Soft Autumn',
        title_ko: '가을 뮤트 (소프트)',
        title_zh: '柔秋季',
        title_ja: 'ソフトオータム',
        description: `Your aesthetic is warm, cozy, and sophisticatedly understated. Your key feature is "Soft" (Low Chroma) with a warm base. Muted earth tones and sunset-inspired shades harmonize effectively with your skin, giving you a natural but expensive look.\n\n[Styling Tips]\nBeige, olive green, and terracotta are your signature colors. Choose "Matte Gold" or "Antique Gold" to enhance your understated warmth. For makeup, "Brick Orange" or "Warm Nude" shades with a soft-focus finish look best. Avoid high-contrast icy tones or neon colors that can overwhelm your balanced, peaceful energy.`,
        description_ko: `특유의 고급스럽고 편안하며 지적인 분위기를 지닌 '가을 뮤트'입니다. 당신의 핵심 조화 요소는 '탁함(Soft, Low Chroma)'입니다. 마치 필터를 씌운 듯 채도가 낮은 부드러운 컬러들이 당신의 혈색을 가장 안정감 있고 우아하게 만들어줍니다.\n\n[스타일링 팁]\n베이지, 올리브 그린, 말린 장미(MLBB) 컬러를 입었을 때 당신의 매력이 극대화됩니다. 반짝임이 심한 것보다 무광의 매트 골드나 앤틱 골드 주얼리를 추천합니다. 메이크업은 부드러운 코랄 브라운이나 누드 베이지 톤을 활용해 보세요. 너무 쨍한 원색이나 차가운 형광색은 피부톤을 칙칙하게 만들 수 있습니다.`,
        description_zh: `[分析结果]\n你的美感温暖、舒适且含蓄时尚. \n低饱和的大地色系与你的肤色有效协调, 让你看起来自然且昂贵。\n\n[穿搭建议]\n米色、橄榄绿和赤土色是你的标志性颜色。\n避免高对比度的冰冷色调或霓虹色。`,
        description_ja: `[分析結果]\n特有の高級感と落ち着き、そして知的な雰囲気を持つ「秋ミュート」です. \n彩度の低い柔らかなカラーが、あなたの肌色를 가장 안정감 있게 해줍니다.\n\n[スタイリングのヒント]\nベージュ, オリーブグリーン, ドライローズのような色がベスト입니다.\nあまりに鮮やかな原色や冷たい蛍光色は, 肌をくすませる原因になります。`,
        keywords: ['Warm', 'Cozy', 'Sophisticated', 'Understated', 'Natural'],
        keywords_ko: ['고급스러움', '편안함', '지적임', '차분함', '자연스러움'],
        keywords_zh: ['温暖', '舒适', '精致', '含蓄', '自然'],
        keywords_ja: ['高級感', '落ち着き', '知性的', 'ソフト', 'ナチュラル'],
        bestColors: ['#E2B48A', '#8D9B6A', '#D08159', '#D2B48C', '#C4A484'],
        worstColors: ['#0000FF', '#FF00FF', '#F0F8FF'],
        palette: ['#E2B48A', '#8D9B6A', '#D08159', '#D2B48C'],
        image: '/images/color-v3/autumn.png',
        celebrities_male: {
            ko: ['박해진', '공유', '강동원'],
            en: ['Chris Hemsworth', 'Eddie Redmayne', 'Chris Pratt'],
            zh: ['李现', '陈伟霆', '彭于晏'],
            ja: ['菅田将暉', '竹内涼真', '斎藤工']
        },
        celebrities_female: {
            ko: ['한소희', '송혜교', '박신혜'],
            en: ['Gigi Hadid', 'Drew Barrymore', 'Mischa Barton'],
            zh: ['汤唯', '杨幂', '刘诗诗'],
            ja: ['北川景子', '長澤まさみ', '戸田恵梨香']
        }
    },
    'autumn-true': {
        id: 'autumn-true',
        baseSeason: 'autumn',
        title: 'True Autumn',
        title_ko: '가을 트루 (가을 웜톤)',
        title_zh: '真秋季',
        title_ja: 'トゥルーオータム',
        description: `You are the human embodiment of a rich, warm autumn sunset. Your key feature is "Warm" – you shine most in colors that have a distinct yellow/golden undertone. Earthy, rich, and spice-colored tones bring a vibrant healthy glow to your complexion.\n\n[Styling Tips]\nMustard, deep orange, and mahogany are your best colors. "Yellow Gold" and "Copper" accessories are your power pieces. For makeup, "Warm Tomato Red" or "Deep Brick" lip colors look stunning. Avoid cool blue-based pinks or icy pastels which can make your skin look pale or even yellowish in a sickly way.`,
        description_ko: `풍요롭고 따뜻한 가을의 색채를 그대로 옮겨놓은 듯한 '정석 가을 웜톤'입니다. 당신의 핵심 조화 요소는 확실한 '따뜻함(Warm)'입니다. 노란 베이스의 깊이감 있는 컬러들이 당신의 피부를 가장 건강하고 탄력 있어 보이게 만들어줍니다.\n\n[스타일링 팁]\n머스터드, 카멜, 따뜻한 브라운, 딥 오렌지 컬러가 베스트입니다. 실버보다는 옐로우 골드나 동(Copper) 느낌의 주얼리가 당신의 혈색을 가장 예쁘게 살려줍니다. 메이크업은 가을 낙엽 느낌의 딥 브릭이나 칠리 레드 립을 추천합니다. 차가운 핑크, 푸른기가 도는 쿨톤 컬러는 안색을 창백하게 만들 수 있으니 피하세요.`,
        description_zh: `[分析结果]\n你就像是丰富温暖的秋日落日化身. \n泥土色、丰富且辛辣的色调为你的肤色带来活力的健康光泽。\n\n[穿搭建议]\n芥末黄、深橙色和红木色是你的最佳颜色。\n避免冷色调的粉色或冰冷的马卡龙色。`,
        description_ja: `[分析結果]\n豊かで温かみのある秋の色彩をそのまま映し出したような、「正統派秋イエベ」です. \n黄みベースの深みのあるカラーが、あなたの肌を最も健康的で弾力があるように見せてくれます。\n\n[スタイリングのヒント]\nマスタード, キャメル, ウォームブラウン, ディープオレンジがベストです。\n青みの強いピンクや冷たいパステルカラーは, 顔色를 악化させることがあります。`,
        keywords: ['Rich', 'Warm', 'Earthy', 'Healthy', 'Natural'],
        keywords_ko: ['깊이감', '따뜻함', '건강함', '성숙함', '풍요로움'],
        keywords_zh: ['丰富', '温暖', '自然', '健康', '成熟'],
        keywords_ja: ['深み', '温かみ', '健康', 'リッチ', 'ナチュラル'],
        bestColors: ['#B87333', '#8B4513', '#FF8C00', '#DAA520', '#A0522D'],
        worstColors: ['#F0F8FF', '#E0FFFF', '#B0E0E6'],
        palette: ['#B87333', '#8B4513', '#FF8C00', '#DAA520'],
        image: '/images/color-v3/autumn.png',
        celebrities_male: {
            ko: ['조인성', '이승기', '방탄소년단 뷔'],
            en: ['Hugh Jackman', 'Matthew McConaughey', 'Chris Hemsworth'],
            zh: ['陈坤', '胡歌', '张若昀'],
            ja: ['山崎賢人', '成田凌', '柳楽優弥']
        },
        celebrities_female: {
            ko: ['이성경', '수지', '이효리'],
            en: ['Jennifer Lawrence', 'Julia Roberts', 'Beyoncé'],
            zh: ['巩俐', '章子怡', '张雨绮'],
            ja: ['土屋太鳳', '柴咲コウ', '石原さとみ']
        }
    },
    'autumn-deep': {
        id: 'autumn-deep',
        baseSeason: 'autumn',
        title: 'Deep Autumn',
        title_ko: '가을 딥',
        title_zh: '深秋季',
        title_ja: '디ープオータム',
        description: `Your energy is powerful, intense, and luxuriously heavy. Your key feature is "Dark" (Low Value). Deep, weighted, and high-contrasting warm colors create a charismatic and stable presence that commands respect.\n\n[Styling Tips]\nForest green, deep chocolate brown, and burgundy look incredibly rich on you. "Bold Gold" or "Antique Bronze" jewelry is best. For makeup, "Deep Red" or "Dark Chili" colors with a weighted finish are ideal. Avoid very light pastels or bright neons that can look too "cheap" or disconnected from your powerful natural weight.`,
        description_ko: `강단 있고 깊이감 있는, 고급스러운 무게감을 지닌 '가을 딥'입니다. 당신의 핵심 조화 요소는 '어두움(Dark, Low Value)'입니다. 묵직하고 무게감 있는 어두운 컬러들이 당신의 이목구비를 선명하고 돋보이게 하며, 카리스마 있는 분위기를 만들어줍니다.\n\n[스타일링 팁]\n포레스트 그린, 딥 초콜릿, 버건디 컬러를 입었을 때 가장 귀티가 납니다. 가느다란 것보다 존재감 있는 볼드 골드나 브론즈 주얼리를 추천합니다. 메이크업은 선명한 딥 레드나 다크 브릭 컬러로 입술에 무게감을 주는 것이 베스트입니다. 너무 밝은 파스텔이나 쨍한 형광색은 특유의 고급스러운 아우라와 따로 놀 수 있으니 주의하세요.`,
        description_zh: `[分析结果]\n你的能量强大、强烈且高贵沉稳. \n深沉、有分量且高对比度的暖色调为你创造出一种富有魅力且稳定的存在感。\n\n[穿搭建议]\n森林绿、深巧克力色和勃艮第红在你身上显尽奢华。\n避免极浅的马卡龙色或亮霓虹色。`,
        description_ja: `[分析結果]\n強さと深みのある、高級感漂う重量感を持った「秋ディープ」です. \n重厚感のある暗いカラーが、あなたの目鼻立ち를 선명하게 하고, カリスマ性のある雰囲気を作ってくれます。\n\n[スタイリングのヒント]\nフォレストグリーン, ディープチョコレート, バーガンディがベスト입니다.\nあまりに明るいパステルや鮮やかな蛍光色は, 高級感のあるオーラを損なうことがあります。`,
        keywords: ['Powerful', 'Deep', 'Charismatic', 'Luxurious', 'Weighted'],
        keywords_ko: ['카리스마', '깊이감', '성숙함', '무게감', '고급스러움'],
        keywords_zh: ['强大', '深沉', '富有魅力', '奢侈', '沉稳'],
        keywords_ja: ['カリスマ', '深み', '成熟', '重量感', '高級感'],
        bestColors: ['#004225', '#3D0C02', '#800000', '#4B3621', '#5D3A1A'],
        worstColors: ['#F5F5DC', '#FFFDD0', '#EEDC82'],
        palette: ['#004225', '#3D0C02', '#800000', '#4B3621'],
        image: '/images/color-v3/autumn.png',
        celebrities_male: {
            ko: ['지진희', '하정우', '공유'],
            en: ['Jason Momoa', 'Idris Elba', 'George Clooney'],
            zh: ['胡歌', '靳东', '段奕宏'],
            ja: ['阿部寛', '西島秀俊', '竹野内豊']
        },
        celebrities_female: {
            ko: ['김혜수', '제니', '이하늬'],
            en: ['Zendaya', 'Eva Mendes', 'Penélope Cruz'],
            zh: ['迪丽热巴', '钟楚曦', '辛芷蕾'],
            ja: ['中村アン', '広瀬アリス', '長谷川京子']
        }
    },
    'winter-deep': {
        id: 'winter-deep',
        baseSeason: 'winter',
        title: 'Deep Winter',
        title_ko: '겨울 딥',
        title_zh: '深冬季',
        title_ja: 'ディープウィンター',
        description: `Your aura is majestic, mysterious, and intensely modern. Your key feature is "Dark" (Low Value) with a cool base. Deepest cool tones like black, navy, and dark plum amplify your charismatic and undeniable presence.\n\n[Styling Tips]\nBlack, charcoal navy, and deepest burgundy are your power colors. Pair them with "High-Shine Silver" for a cutting-edge look. For makeup, "Dark Plum" or "Cool Burgundy" lip colors with a sharp finish work best. Avoid muted warm browns or soft pastels that can wash out your striking natural contrast and deep energy.`,
        description_ko: `도회적이고 세련된, 동시에 오묘하고 깊은 아우라를 지닌 '겨울 딥'입니다. 당신의 핵심 조화 요소는 '어두움(Dark, Low Value)'입니다. 블랙이나 네이비처럼 깊이 있는 어두운 쿨톤 컬러들이 당신의 카리스마를 극대화하며 피부톤을 더욱 선명하게 살려줍니다.\n\n[스타일링 팁]\n블랙, 차콜 네이비, 딥 플럼 컬러가 베스트입니다. 주얼리는 광택감이 살아있는 실버나 화이트 골드를 선택하여 세련된 분위기를 유지하세요. 메이크업은 선명한 다크 체리나 버건디 립을 정교하게 표현하는 것이 좋습니다. 탁한 웜 브라운이나 힘 빠진 부드러운 파스텔은 당신 특유의 강렬한 대비감을 흐릴 수 있습니다.`,
        description_zh: `[分析结果]\n你的气场庄严、神秘且极其现代. \n如黑色、海军蓝和深李子色等最深的冷色调放大你富有魅力且不可否认的存在感。\n\n[穿搭建议]\n黑色、炭灰色和最深的勃艮第红是你的权势色彩。\n避免模糊的暖棕色或柔和的马卡龙色。`,
        description_ja: `[分析結果]\n都会的で洗練された、同時に神秘的で深いオーラを持つ「冬ディープ」です. \nブラックやネイビーのような深みのある暗いクールトーン이 당신의 카리스마를 極大化し, 肌をより鮮やかにしてくれます。\n\n[スタイリングのヒント]\nブラック, チャコールネイビー, ディーププラム가 베스트입니다。\n濁ったウォームブラウンや柔らかなパステルカラーは, あなたのハッキリとした魅力を半減させます。`,
        keywords: ['Commanding', 'Nocturnal', 'Dark', 'Elite', 'Charismatic'],
        keywords_ko: ['압도적', '어둠', '시크', '고귀함', '카리스마'],
        keywords_zh: ['威严', '神秘', '深沉', '精英', '有魅力'],
        keywords_ja: ['圧倒的', '都会的', 'クール', '知的', 'カリスマ'],
        bestColors: ['#767676', '#DC143C', '#0F5C6E', '#35415E', '#191970'],
        worstColors: ['#FFA500', '#DAA520', '#D2B48C'],
        palette: ['#DC143C', '#0F5C6E', '#35415E', '#191970'],
        image: '/images/color-v3/winter.png',
        celebrities_male: {
            ko: ['현빈', '김수현', '방탄소년단 정국'],
            en: ['Henry Cavill', 'Benedict Cumberbatch', 'Tom Hiddleston'],
            zh: ['王鹤棣', '吴磊', '张艺兴'],
            ja: ['吉沢亮', '新田真剣佑', '山下智久']
        },
        celebrities_female: {
            ko: ['김혜수', '제니', '지수'],
            en: ['Anne Hathaway', 'Viola Davis', 'Lupita Nyong\'o'],
            zh: ['范冰冰', '辛芷蕾', '张雨绮'],
            ja: ['小松菜奈', '二階堂ふみ', '菜々緒']
        }
    },
    'winter-true': {
        id: 'winter-true',
        baseSeason: 'winter',
        title: 'True Winter',
        title_ko: '겨울 트루 (겨울 쿨톤)',
        title_zh: '真冬季',
        title_ja: 'トゥルーウィンター',
        description: `You have a striking, pure, and flawlessly modern presence. Your key feature is "Cool" – you need zero yellow undertones. High-contrast, icy, and starkly cool colors amplify your unique and captivating aura, highlighting your porcelain-clear skin.\n\n[Styling Tips]\nPure stark white, royal blue, and true red are your power colors. Accessorize exclusively with "Silver." For makeup, "Magenta Pink" or "Cold Red" colors without any orange work wonder. Avoid washed-out, dusty warm colors like beige or terra-cotta that can make your skin look sallow.`,
        description_ko: `만년설처럼 차갑고 눈부시게 선명하며 도시적이고 세련된 아우라를 지닌 '겨울 트루'입니다. 당신의 핵심 조화 요소는 확실한 '차가움(Cool)'입니다. 노란기가 전혀 없는 푸른 베이스의 컬러들이 당신의 이목구비를 가장 또렷하고 깨끗하게 만들어줍니다.\n\n[스타일링 팁]\n블랙, 순백색, 로얄 블루, 선명한 레드 컬러가 베스트입니다. 액세서리는 무조건 실버 계열로 선택하여 시원한 분위기를 유지하세요. 메이크업은 푸린기가 도는 핫핑크나 쿨 레드로 확실한 포인트를 주는 것이 좋습니다. 베이지, 머스타드, 탁한 가을 색상은 안색을 칙칙하게 만들 수 있으니 피하세요.`,
        description_zh: `[分析结果]\n你拥有一种出众、纯粹且无瑕的现代存在感. \n高对比度、冰冷且极其冷峻的色调放大你独特且迷人的氛围。\n\n[穿搭建议]\n纯净的亮白色、宝蓝色和正红色是你的权势色彩。\n避免由于褪色、浑浊的暖色调让你看起来气色不好。`,
        description_ja: `[分析結果]\n万年雪のように冷たく、目が覚めるほど鮮やかで都会的なオーラを持つ「冬トゥルー」です. \n黄みがまったくない青みベースのカラーが、あなたの目鼻立ち를 가장 はっきりと清潔にしてくれます。\n\n[スタイリングのヒント]\nブラック, 純白, ロイヤルブルー, 鮮やかなレッドがベストです。\nベージュやマスタードのような濁った色は, 顔色를 くすませることがあります。`,
        keywords: ['Striking', 'Pure', 'Contrast', 'Modern', 'Unique'],
        keywords_ko: ['강렬함', '순수함', '대비감', '모던함', '유니크'],
        keywords_zh: ['引人注目', '纯粹', '对比', '现代', '独特'],
        keywords_ja: ['強烈', '純粋', 'コントラスト', 'モダン', 'ユニーク'],
        bestColors: ['#000000', '#FFFFFF', '#1D2327', '#E4D5EE', '#CAC2CE'],
        worstColors: ['#D2B48C', '#BDB76B', '#8B4513'],
        palette: ['#000000', '#FFFFFF', '#1D2327', '#E4D5EE'],
        image: '/images/color-v3/winter.png',
        celebrities_male: {
            ko: ['권현빈', '이수혁', '선우'],
            en: ['Keanu Reeves', 'Jon Hamm', 'Jennifer Connelly'],
            zh: ['张若昀', '陈晓', '黄晓明'],
            ja: ['新田真剣佑', '水嶋ヒロ', 'ディーン・フジオカ']
        },
        celebrities_female: {
            ko: ['서예지', '크리스탈', '카리나'],
            en: ['Liv Tyler', 'Jennifer Connelly', 'Courteney Cox'],
            zh: ['李冰冰', '姚晨', '万茜'],
            ja: ['黒木メイサ', '柴咲コウ', '中条あやみ']
        }
    },
    'winter-bright': {
        id: 'winter-bright',
        baseSeason: 'winter',
        title: 'Bright Winter',
        title_ko: '겨울 브라이트 (클리어)',
        title_zh: '亮冬季',
        title_ja: 'ブライトウィンター',
        description: `Your energy is sharp, jewel-like, and highly electrifying. Your key feature is "Clear" (High Chroma) with a cool base. Vivid, cool jewel tones paired with dazzling contrast make you an absolute standout. You have a high-contrast look that demands bold colors.\n\n[Styling Tips]\nNeon hot pink, emerald green, and electric sapphire blue suit you flawlessly. Glossy textures and sparkly accessories are your friends. For makeup, "Vivid Cherry" or "Cold Magenta" lip colors with a glossy finish are ideal. Avoid muddy, muted, or very soft warm pastels that can "steal the soul" from your face.`,
        description_ko: `톡톡 튀는 카리스마와 눈부신 화려함을 동시에 지닌 최고의 화려함, '겨울 브라이트'입니다. 당신의 핵심 조화 요소는 '선명함(Clear)'입니다. 채도가 높은 푸른 베이스의 컬러들이 당신의 화려한 이목구비를 더욱 반짝이게 만들어줍니다.\n\n[스타일링 팁]\n네온 핑크, 에메랄드 그린, 일렉트릭 블루처럼 선명하고 쨍한 컬러가 베스트입니다. 무광보다는 유광의 재질감이나 반짝이는 주얼리가 잘 어울립니다. 메이크업은 선명한 체리 레드나 플럼 립으로 입술에 확실한 포인트를 주는 것이 좋습니다. 탁한 뮤트톤이나 힘 빠진 부드러운 파스텔은 당신의 존재감을 가릴 수 있습니다.`,
        description_zh: `[分析结果]\n你的能量敏锐、如宝石般且极具带电感. \n生动、清冷的宝石色调配合耀眼的对比让你成为绝对的焦点。\n\n[穿搭建议]\n霓虹粉、祖母绿和萨菲尔蓝让你看起来完美无瑕。\n避免浑浊、灰暗或非常柔和的暖色马卡龙色。`,
        description_ja: `[分析結果]\n際立つカリスマ性と眩しいほどの華やかさを兼ね備えた、「冬ブライト」です. \n彩度の高い青みベースのカラーが, あなたの華やかな目鼻立ち를 さらに輝かせます。\n\n[スタイリングのヒント]\nネオンピンク, エメラルドグリーン, エレクトリックブルーのような鮮やかな色がベストです。\n濁ったミュートトーンや柔らかなパステルカラーは, あなたの存在感をつぶしてしまうことがあります。`,
        keywords: ['Electrifying', 'Jewel-like', 'Sharp', 'Dazzling', 'Standout'],
        keywords_ko: ['화려함', '선명함', '에너지', '다이아몬드', '존재감'],
        keywords_zh: ['带电', '如宝石', '敏锐', '耀眼', '出众'],
        keywords_ja: ['華やか', '鮮やか', 'エネルギー', 'ダイヤモンド', '存在感'],
        bestColors: ['#FF00FF', '#0000CD', '#4169E1', '#8B008B', '#800020'],
        worstColors: ['#FFDAB9', '#F5DEB3', '#D2B48C'],
        palette: ['#FF00FF', '#0000CD', '#4169E1', '#8B008B'],
        image: '/images/color-v3/winter.png',
        celebrities_male: {
            ko: ['박지훈', '선우', '정국'],
            en: ['Tom Hiddleston', 'Ezra Miller', 'Jared Leto'],
            zh: ['龚俊', '王源', '蔡徐坤'],
            ja: ['山下智久', '亀梨和也', '中島健人']
        },
        celebrities_female: {
            ko: ['선미', '카리나', '청하'],
            en: ['Megan Fox', 'Katy Perry', 'Alexis Bledel'],
            zh: ['宋茜', '虞书欣', '程潇'],
            ja: ['橋本愛', '今田美桜', '中条あやみ']
        }
    }
};

export function getLocalizedColorResultContent(
    id: SubSeasonId,
    lang: SupportedLang,
    gender: "male" | "female"
): LocalizedColorResultContent | null {
    const result = COLOR_RESULTS[id];
    if (!result) {
        return null;
    }

    const celebrities =
        gender === "male"
            ? result.celebrities_male[lang] ?? result.celebrities_male.en
            : result.celebrities_female[lang] ?? result.celebrities_female.en;

    return {
        id: result.id,
        title:
            {
                ko: result.title_ko,
                en: result.title,
                zh: result.title_zh,
                ja: result.title_ja,
            }[lang] ?? result.title,
        description:
            {
                ko: result.description_ko,
                en: result.description,
                zh: result.description_zh,
                ja: result.description_ja,
            }[lang] ?? result.description,
        keywords:
            {
                ko: result.keywords_ko,
                en: result.keywords,
                zh: result.keywords_zh,
                ja: result.keywords_ja,
            }[lang] ?? result.keywords,
        bestColors: result.bestColors,
        worstColors: result.worstColors,
        image: result.image,
        celebrities,
    };
}

export function analyzePersonalColor(imageElement: HTMLImageElement): SubSeasonId {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return 'spring-true';

    canvas.width = 100;
    canvas.height = 100;

    ctx.drawImage(imageElement, 0, 0, 100, 100);

    const imageData = ctx.getImageData(35, 35, 30, 30);
    const data = imageData.data;

    let rSum = 0, gSum = 0, bSum = 0;
    let validPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue;
        rSum += data[i];
        gSum += data[i + 1];
        bSum += data[i + 2];
        validPixels++;
    }

    const rAvg = rSum / validPixels;
    const gAvg = gSum / validPixels;
    const bAvg = bSum / validPixels;

    const brightness = 0.2126 * rAvg + 0.7152 * gAvg + 0.0722 * bAvg;
    const isWarm = rAvg > bAvg + 15;

    if (isWarm) {
        if (brightness > 130) {
            return 'spring-true';
        } else {
            return 'autumn-deep';
        }
    } else {
        if (brightness > 130) {
            return 'summer-true';
        } else {
            return 'winter-deep';
        }
    }
}
