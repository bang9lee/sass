export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export type SubSeasonId =
    | 'spring-light' | 'spring-true' | 'spring-bright'
    | 'summer-light' | 'summer-true' | 'summer-soft'
    | 'autumn-soft' | 'autumn-true' | 'autumn-deep'
    | 'winter-deep' | 'winter-true' | 'winter-bright';

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
    palette: string[]; // Adding explicitly for the live camera UI
    image: string; // We'll need to generate these or use placeholders
}

export const COLOR_RESULTS: Record<SubSeasonId, ColorResult> = {
    // ================== SPRING ==================
    'spring-light': {
        id: 'spring-light',
        baseSeason: 'spring',
        title: 'Light Spring',
        title_ko: '봄 라이트',
        title_zh: '浅春季',
        title_ja: 'ライトスプリング',
        description: `[Analysis]\nYour bright and sheer energy shines best in light, pastel warm colors.\nYou have a delicate and lively vibe that brings a soft glow.\n\n[Styling Tips]\nPale warm pastels like light peach, soft yellow, and mint suit you best.\nAvoid heavy, dark shades or high-contrast icy tones.`,
        description_ko: `[분석 결과]\n당신의 투명하고 맑은 에너지는 밝고 부드러운 파스텔 웜톤에서 가장 빛납니다.\n여리여리하면서도 생기 있는 사랑스러운 분위기를 가지셨군요.\n\n[스타일링 팁]\n라이트 피치, 페일 옐로우, 밀키한 민트 등 명도가 높고 채도가 낮은 맑은 색상이 베스트입니다.\n어둡고 무거운 색이나 강한 대비감은 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你清透的能量在浅色、柔和的暖色调中最为闪耀。\n你自带一种娇柔活泼的可爱氛围。\n\n[穿搭建议]\n浅桃色、柔黄色和薄荷绿等高明度的浅色系最适合你。\n避免沉重、暗哑的色系或高对比度的冰冷色。`,
        description_ja: `[分析結果]\nあなたの透明感のあるエネルギーは、明るく柔らかなパステルウォームトーンで最も輝きます。\n繊細で生き生きとした愛らしい雰囲気を持っています。\n\n[スタイリングのヒント]\nライトピーチ、ペールイエロー、ミルキーミンなど、明度が高く澄んだ色がベストです。\n暗く重い色や強いコントラストは避けたほうがよいでしょう。`,
        keywords: ['Delicate', 'Clear', 'Soft', 'Fresh', 'Warm'],
        keywords_ko: ['여리여리', '투명함', '부드러움', '프레시', '따뜻함'],
        keywords_zh: ['娇柔', '清透', '柔和', '清新', '温暖'],
        keywords_ja: ['繊細', '透明感', 'ソフト', 'フレッシュ', '暖かい'],
        bestColors: ['#F5E68C', '#FA9072', '#FF6B4A', '#FF9E66', '#FFE5A3'],
        worstColors: ['#000000', '#000080', '#4B0082'],
        palette: ['#F5E68C', '#FA9072', '#FF9E66', '#FFE5A3'],
        image: '/images/color-v3/spring.png'
    },
    'spring-true': {
        id: 'spring-true',
        baseSeason: 'spring',
        title: 'True Spring',
        title_ko: '봄 트루 (봄 웜톤)',
        title_zh: '真春季',
        title_ja: 'トゥルースプリング',
        description: `[Analysis]\nYour vibrant energy shines best in clear, warm, and sunny colors.\nYou have a lively and lovely vibe that makes people smile.\n\n[Styling Tips]\nCoral, golden yellow, and spring green suit you best.\nAvoid muted, cold grayish tones that can wash you out.`,
        description_ko: `[분석 결과]\n당신의 맑고 생기 있는 에너지는 따뜻하고 화사한 원색 컬러에서 가장 빛납니다.\n주변을 환하게 만드는 통통 튀고 발랄한 분위기를 가지셨군요.\n\n[스타일링 팁]\n코랄, 골든 옐로우, 맑은 연두색 등 화사한 웜톤이 베스트입니다.\n탁하고 차가운 회끼 도는 색상이나 탁색은 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你充满活力的能量在清透、温暖明媚的颜色中最为闪耀。\n你自带一种活泼可爱、让人忍不住微笑的氛围。\n\n[穿搭建议]\n珊瑚色、金黄色和春季绿最适合你。\n避免会让你显得灰暗的浑浊冷色调。`,
        description_ja: `[分析結果]\nあなたの活気あるエネルギーは、クリアで暖かく、日差しのような色で最も輝きます。\n周りを笑顔にする、生き生きとした雰囲気を持っています。\n\n[スタイリングのヒント]\nコーラル、ゴールデンイエロー、スプリンググリーンがベストです。\n肌をくすませる、冷たく濁ったグレーがかった色は避けましょう。`,
        keywords: ['Lively', 'Warm', 'Clear', 'Lovely', 'Vibrant'],
        keywords_ko: ['생기', '따뜻함', '맑음', '발랄함', '화사함'],
        keywords_zh: ['活泼', '温暖', '清透', '可爱', '充满活力'],
        keywords_ja: ['生き生き', '暖かい', 'クリア', '愛らしい', '鮮やか'],
        bestColors: ['#F4A772', '#F1DCA5', '#FFBF40', '#7FB80E', '#FFB3B3'],
        worstColors: ['#808080', '#708090', '#36454F'],
        palette: ['#F4A772', '#FFBF40', '#7FB80E', '#FFB3B3'],
        image: '/images/color-v3/spring.png'
    },
    'spring-bright': {
        id: 'spring-bright',
        baseSeason: 'spring',
        title: 'Bright Spring',
        title_ko: '봄 브라이트',
        title_zh: '亮春季',
        title_ja: 'ブライトスプリング',
        description: `[Analysis]\nYou have a striking and sparkling aura. Highly saturated, vivid warm colors amplify your energetic presence.\n\n[Styling Tips]\nVivid coral, bright turquoise, and hot warm pinks look stunning.\nAvoid muted, dusty pastels that dull your natural shine.`,
        description_ko: `[분석 결과]\n톡톡 튀고 반짝이는 화려한 아우라를 지니셨네요. 채도가 높은 비비드한 웜톤 컬러가 당신의 에너제틱한 존재감을 돋보이게 합니다.\n\n[스타일링 팁]\n비비드 코랄, 브라이트 터콰이즈, 웜 마젠타 등 선명하고 쨍한 색이 찰떡입니다.\n뿌옇고 흐릿한 뮤트톤이나 탁색을 입으면 매력이 반감될 수 있습니다.`,
        description_zh: `[分析结果]\n你拥有一种出众且闪耀的光环。高饱和、生动的暖色调能放大你充满存在的能量。\n\n[穿搭建议]\n生动的珊瑚色、亮绿松石色和亮暖粉色非常迷人。\n避免会掩盖你自然光彩的浑浊、灰暗马卡龙色。`,
        description_ja: `[分析結果]\n際立ってキラキラしたオーラを持っています。彩度の高い鮮やかな暖色が、あなたのエネルギッシュな存在感を引き立てます。\n\n[スタイリングのヒント]\nビビッドなコーラル、明るいターコイズ、ホットウォームピンクが素敵です。\n本来の輝きを鈍らせる、くすんだ濁ったパステルは避けましょう。`,
        keywords: ['Sparkling', 'Vivid', 'Energetic', 'Striking', 'Clear'],
        keywords_ko: ['반짝임', '비비드', '에너제틱', '화려함', '선명함'],
        keywords_zh: ['闪耀', '生动', '充满活力', '引人注目', '清透'],
        keywords_ja: ['キラキラ', 'ビビッド', 'エネルギッシュ', '印象的', 'クリア'],
        bestColors: ['#F4ABE2', '#F2ACA4', '#CC2F85', '#2ECC71', '#00BCD4'],
        worstColors: ['#BDB76B', '#8FBC8F', '#BC8F8F'],
        palette: ['#F4ABE2', '#CC2F85', '#2ECC71', '#00BCD4'],
        image: '/images/color-v3/spring.png'
    },

    // ================== SUMMER ==================
    'summer-light': {
        id: 'summer-light',
        baseSeason: 'summer',
        title: 'Light Summer',
        title_ko: '여름 라이트',
        title_zh: '浅夏季',
        title_ja: 'ライトサマー',
        description: `[Analysis]\nYour aesthetic is ethereal and delicate. Pale, cool pastels perfectly complement your airy vibe.\n\n[Styling Tips]\nPowder blue, icy pink, and soft lavender make you look flawlessly clear.\nAvoid dark, heavy earth tones or high-contrast warm colors.`,
        description_ko: `[분석 결과]\n마치 수채화처럼 맑고 여리여리한 분위기입니다. 흰기가 많이 섞인 쿨톤 파스텔이 가벼우면서도 청초한 매력을 극대화합니다.\n\n[스타일링 팁]\n파우더 블루, 아이시 핑크, 페일 라벤더 색상을 입으면 피부가 투명해 보입니다.\n어둡고 탁한 가을 색이나 쨍하고 대비가 강한 색상은 피하세요.`,
        description_zh: `[分析结果]\n你的美感如仙境般娇柔。苍白的冷调马卡龙色完美衬托你空灵的气质。\n\n[穿搭建议]\n粉蓝色、冰粉色和柔和薰衣草紫让你看起来无瑕纯净。\n避免深沉的大地色系或高对比度的暖色调。`,
        description_ja: `[分析結果]\n水彩画のように澄んだ、儚げな美しさがあります。白みの強いクールなパステルが、ふんわりとした魅力を極限まで高めます。\n\n[スタイリングのヒント]\nパウダーブルー、アイシーピンク、ペールラベンダーを着ると肌が透明に見えます。\n暗く重いアースカラーや、コントラストの強すぎる暖色は避けましょう。`,
        keywords: ['Ethereal', 'Delicate', 'Airy', 'Cool', 'Pale'],
        keywords_ko: ['청초함', '여리여리', '가벼움', '시원함', '페일'],
        keywords_zh: ['空灵', '娇柔', '轻盈', '清冷', '苍白'],
        keywords_ja: ['儚げ', '繊細', 'エアリー', '涼しげ', 'ペール'],
        bestColors: ['#99CCEE', '#BDA7DD', '#F3E5F5', '#8CBDBD', '#D1E6D5'],
        worstColors: ['#8B4513', '#6B4226', '#FF8C00'],
        palette: ['#99CCEE', '#BDA7DD', '#F3E5F5', '#8CBDBD'],
        image: '/images/color-v3/summer.png'
    },
    'summer-true': {
        id: 'summer-true',
        baseSeason: 'summer',
        title: 'True Summer',
        title_ko: '여름 트루 (여름 쿨톤)',
        title_zh: '真夏季',
        title_ja: 'トゥルーサマー',
        description: `[Analysis]\nYou have an elegant and refreshingly cool aura.\nClassic cool tones harmonize perfectly with your clean and sophisticated vibe.\n\n[Styling Tips]\nSoft cool pinks, cornflower blue, and slate gray are your best friends.\nAvoid warm, yellowish browns or vivid neon colors.`,
        description_ko: `[분석 결과]\n우아하면서도 시원하고 청량한 정석 쿨톤 아우라를 가지셨군요.\n노란기가 쏙 빠진 깨끗하고 세련된 차가운 색이 당신과 완벽하게 어우러집니다.\n\n[스타일링 팁]\n쿨 핑크, 콘플라워 블루, 슬레이트 그레이, 라일락 색상이 베스트입니다.\n오렌지, 머스타드 같은 더운 웜 브라운이나 쨍한 네온은 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你散发着优雅清冷、宛如夏日微风的氛围。\n经典的冷色调与你干净精致的形象完美契合。\n\n[穿搭建议]\n柔和的冷粉色、矢车菊蓝和石板灰是你的最佳搭档。\n避免偏黄的暖棕色或极度刺眼的霓虹色。`,
        description_ja: `[分析結果]\nエレガントで涼しげな大人のクールトーンオーラを持っています。\n黄みを排除した清潔感のある洗練された冷たい色が完璧に調和します。\n\n[スタイリングのヒント]\nクールピンク、コーンフラワーブルー、スレートグレー、ライラックがベストです。\nオレンジやマスタードのような暑苦しいブラウン、鮮やかなネオンカラーは避けましょう。`,
        keywords: ['Elegant', 'Cool', 'Classic', 'Clean', 'Sophisticated'],
        keywords_ko: ['우아함', '시원함', '클래식', '깨끗함', '세련됨'],
        keywords_zh: ['优雅', '清冷', '经典', '干净', '精致'],
        keywords_ja: ['上品', '涼しげ', 'クラシック', '清潔感', '洗練'],
        bestColors: ['#B0DEF4', '#ECC8F9', '#F0B6F8', '#E6E6FA', '#87CEEB'],
        worstColors: ['#FFA500', '#FF8C00', '#DAA520'],
        palette: ['#B0DEF4', '#ECC8F9', '#E6E6FA', '#87CEEB'],
        image: '/images/color-v3/summer.png'
    },
    'summer-soft': {
        id: 'summer-soft',
        baseSeason: 'summer',
        title: 'Soft Summer',
        title_ko: '여름 뮤트 (소프트)',
        title_zh: '柔夏季',
        title_ja: 'ソフトサマー',
        description: `[Analysis]\nYour vibe is effortlessly chic, romantic, and gracefully muted.\nDusty, grayish tones wrap elegantly around your natural complexion.\n\n[Styling Tips]\nDusty rose, sage green, and muted grayish blue look luxurious on you.\nAvoid highly saturated primary colors or pure, glaring white.`,
        description_ko: `[분석 결과]\n특유의 퇴폐미와 로맨틱함을 동시에 지닌 고급스럽고 세련된 뮤트톤입니다.\n잿빛(그레이)이 섞인 차분하고 탁한 컬러들이 피부를 고급 코팅한 듯 우아하게 감싸줍니다.\n\n[스타일링 팁]\n더스티 로즈, 모브, 세이지 그린, 회끼 도는 푸른색을 입었을 때 가장 귀티가 납니다.\n눈이 시린 선명한 원색이나 아예 새하얀 순백색은 피부와 분리되어 보입니다.`,
        description_zh: `[分析结果]\n你的气质慵懒时尚、浪漫且优雅低调。\n带灰调的莫兰迪色系能高贵地包裹你本身的肤色。\n\n[穿搭建议]\n灰粉色、灰绿色和低饱和灰蓝色在你身上显尽奢华。\n避免极度饱和的亮色或刺眼的纯白色。`,
        description_ja: `[分析結果]\n気だるげな色気とロマンチックさを兼ね備えた、高級感のある洗練されたミュートトーンです。\n灰色がかった落ち着いたくすみカラーが、肌を上品に包み込みます。\n\n[スタイリングのヒント]\nダスティローズ、モーブ、セージグリーン、グレーがかったブルーを着ると気品が出ます。\n鮮やかな原色や真っ白は、肌から浮いて見えやすいので注意です。`,
        keywords: ['Muted', 'Chic', 'Romantic', 'Dusty', 'Graceful'],
        keywords_ko: ['차분함', '시크함', '로맨틱', '더스티', '우아함'],
        keywords_zh: ['低调', '别致', '浪漫', '灰调', '优雅'],
        keywords_ja: ['落ち着き', 'シック', 'ロマンチック', 'くすみ', '優雅'],
        bestColors: ['#A4C1F3', '#C5D8AB', '#F2EFC9', '#36454F', '#005178'],
        worstColors: ['#FF0000', '#0000FF', '#00FF00'],
        palette: ['#A4C1F3', '#C5D8AB', '#F2EFC9', '#36454F'],
        image: '/images/color-v3/summer.png'
    },

    // ================== AUTUMN ==================
    'autumn-soft': {
        id: 'autumn-soft',
        baseSeason: 'autumn',
        title: 'Soft Autumn',
        title_ko: '가을 뮤트 (소프트)',
        title_zh: '柔秋季',
        title_ja: 'ソフトオータム',
        description: `[Analysis]\nYour aesthetic is cozy, blended, and elegantly subdued.\nWarm muted tones with a touch of gray perfectly frame your gentle softness.\n\n[Styling Tips]\nMoss green, soft terracotta, and warm oatmeals are wonderfully harmonized.\nAvoid icy, artificial bright colors or intense blacks.`,
        description_ko: `[분석 결과]\n포근하고 포드득한 니트가 연상되는 부드럽고 차분한 분위기입니다.\n노란기와 회끼가 적절히 섞인 웜 뮤트톤이 당신의 온화하고 내추럴한 매력을 살려줍니다.\n\n[스타일링 팁]\n모스 그린, 소프트 테라코타, 오트밀, 베이지, 밀크티 색상이 피부에 스며들듯 어울립니다.\n형광기가 도는 인공적인 색상이나 쌩블랙, 쨍한 쿨톤 병아리색은 칙칙함을 유발합니다.`,
        description_zh: `[分析结果]\n你的美学充满温馨、融合且优雅内敛的感觉。\n带灰调的暖莫兰迪色完美勾勒出你温柔的软糯感。\n\n[穿搭建议]\n苔藓绿、柔和红陶色和暖燕麦色与你绝妙和谐。\n避免冰冷的人造亮色或深邃死板的黑色。`,
        description_ja: `[分析結果]\n温もりのある柔らかいニットを思わせる、優しく落ち着いた雰囲気です。\n黄みと灰みが程よく混ざったウォームミュートトーンが、穏やかでナチュラルな魅力を引き立てます。\n\n[スタイリングのヒント]\nモスグリーン、テラコッタ、オートミール、ベージュが肌に溶け込むように似合います。\n人工的なネオンカラーや真っ黒、冷たい色は肌をくすませてしまいます。`,
        keywords: ['Cozy', 'Muted', 'Subdued', 'Earthy', 'Gentle'],
        keywords_ko: ['포근함', '차분함', '내추럴', '어스컬러', '온화함'],
        keywords_zh: ['温馨', '柔和', '内敛', '大地色', '温柔'],
        keywords_ja: ['温もり', '落ち着き', 'ナチュラル', 'アースカラー', '穏やか'],
        bestColors: ['#347744', '#127379', '#425570', '#CD853F', '#BDB76B'],
        worstColors: ['#FF00FF', '#00FFFF', '#000000'],
        palette: ['#347744', '#127379', '#CD853F', '#BDB76B'],
        image: '/images/color-v3/autumn.png'
    },
    'autumn-true': {
        id: 'autumn-true',
        baseSeason: 'autumn',
        title: 'True Autumn',
        title_ko: '가을 트루 (가을 웜톤)',
        title_zh: '真秋季',
        title_ja: 'トゥルーオータム',
        description: `[Analysis]\nYou possess a rich, spicy, and gorgeous golden atmosphere.\nClassic warm earthy tones bring out your natural maturity and fiery glow.\n\n[Styling Tips]\nMustard, copper, rich pumpkin, and olive green are stunning on you.\nAvoid cool pastels like icy blue, which clash with your natural warmth.`,
        description_ko: `[분석 결과]\n황금빛 가을 들녘처럼 풍성하고 그윽한 정석 가을 웜톤 아우라를 지니셨네요.\n따뜻하고 깊이 있는 어스 컬러들이 당신의 무르익은 화려한 매력을 극대화합니다.\n\n[스타일링 정석]\n머스타드, 구리색(카퍼), 펌킨, 올리브 그린, 웜 브라운 등 단풍과 같은 색채가 베스트입니다.\n차가운 아이시 블루나 페일 핑크 등 극단적인 쿨 파스텔은 핏기를 빼앗아 갑니다.`,
        description_zh: `[分析结果]\n你拥有一种浓郁、辛辣且迷人的金色深秋氛围。\n经典的温暖大地色系能唤出你本身的成熟与热情光辉。\n\n[穿搭建议]\n芥末黄、铜色、浓郁南瓜色和橄榄绿在你身上格外迷人。\n避免像冰蓝色那样与你天生温暖感冲突的冷色马卡龙。`,
        description_ja: `[分析結果]\n黄金色の秋の野原のような、豊かで深みのある真のオータムオーラを持っています。\n暖かく深みのあるアースカラーが、あなたの成熟した華やかな魅力を最大限に引き出します。\n\n[スタイリングのヒント]\nマスタード、コッパー、パンプキン、オリーブグリーンなど、紅葉のような色彩がベストです。\n冷たいアイシーブルーなどの極端なクールパステルは、血色感や活力を奪ってしまいます。`,
        keywords: ['Rich', 'Golden', 'Spicy', 'Earthy', 'Gorgeous'],
        keywords_ko: ['풍성함', '황금빛', '깊이감', '어스컬러', '고혹적'],
        keywords_zh: ['浓郁', '金黄', '辛辣', '大地色', '迷人'],
        keywords_ja: ['豊か', '黄金', '深み', 'アースカラー', 'ゴージャス'],
        bestColors: ['#BA533A', '#E0AB3D', '#F4BB74', '#F0DC71', '#8ABF67'],
        worstColors: ['#E6E6FA', '#87CEEB', '#ADD8E6'],
        palette: ['#BA533A', '#E0AB3D', '#F4BB74', '#8ABF67'],
        image: '/images/color-v3/autumn.png'
    },
    'autumn-deep': {
        id: 'autumn-deep',
        baseSeason: 'autumn',
        title: 'Deep Autumn',
        title_ko: '가을 딥 (다크)',
        title_zh: '深秋季',
        title_ja: 'ディープオータム',
        description: `[Analysis]\nYour presence is intensely dramatic, mysterious, and luxurious.\nDark, saturated warm tones ground your look and make your features powerfully pop.\n\n[Styling Tips]\nDeep chocolate, espresso brown, mahogany, and dark olive are your power colors.\nAvoid light, washed-out pale colors that lack enough depth to balance your features.`,
        description_ko: `[분석 결과]\n다크 초콜릿처럼 진하고 치명적이며 무게감 있는 럭셔리한 분위기입니다.\n명도가 낮고 딥한 웜톤 컬러가 당신의 이목구비를 또렷하고 드라마틱하게 살려줍니다.\n\n[스타일링 팁]\n딥 초콜릿 브라운, 다크 구리색, 카키, 버건디 섞인 마호가니 색상이 최고의 파워 컬러입니다.\n가볍고 흐리멍덩한 페일 톤이나 채도가 너무 높은 형광색은 무게감을 깨뜨려 아쉽습니다.`,
        description_zh: `[分析结果]\n你的气场极具戏剧张力、神秘且极致奢华。\n深沉、高饱和的大地暖色能稳住你的造型并让五官高级立体。\n\n[穿搭建议]\n深黑巧色、浓缩咖啡棕、桃花心木色和深橄榄色是你的力量色。\n避免轻质、水洗感重的浅色系，它们缺乏足够的深度来平衡你的骨相。`,
        description_ja: `[分析結果]\nダークチョコレートのように濃密で、ミステリアスかつ重厚感のあるラグジュアリーな雰囲気です。\n明度が低く深いウォームトーンカラーが、顔立ちをくっきりとドラマチックに際立たせます。\n\n[スタイリングのヒント]\nディープチョコブラウン、ダークコッパー、カーキ、マホガニーが最強のパワーカラーです。\n軽くてぼんやりしたペールトーンや、彩度が高すぎるネオンカラーは不釣り合いになりがちです。`,
        keywords: ['Dark', 'Intense', 'Mysterious', 'Luxurious', 'Dramatic'],
        keywords_ko: ['다크', '치명적', '미스테리', '럭셔리', '드라마틱'],
        keywords_zh: ['深邃', '强烈', '神秘', '奢华', '戏剧张力'],
        keywords_ja: ['ダーク', '強烈', 'ミステリアス', 'ラグジュアリー', 'ドラマチック'],
        bestColors: ['#4C9150', '#A52A2A', '#D2B48C', '#8B4513', '#6B4226'],
        worstColors: ['#FFB6C1', '#F08080', '#E0FFFF'],
        palette: ['#4C9150', '#A52A2A', '#8B4513', '#6B4226'],
        image: '/images/color-v3/autumn.png'
    },

    // ================== WINTER ==================
    'winter-deep': {
        id: 'winter-deep',
        baseSeason: 'winter',
        title: 'Deep Winter',
        title_ko: '겨울 딥 (다크)',
        title_zh: '深冬季',
        title_ja: 'ディープウィンター',
        description: `[Analysis]\nYour charisma is commanding, cool, and highly nocturnal.\nExtremely dark, cool tones matched with sharp contrasts bring out an elite, cinematic vibe.\n\n[Styling Tips]\nMidnight blue, dark plum, pine tree green, and pure black are exquisite.\nAvoid golden-browns, warm oranges, or muted dusty tones.`,
        description_ko: `[분석 결과]\n한밤중처럼 서늘하고 압도적이며 다크한 카리스마를 가졌습니다.\n차가우면서 극단적으로 어두운 톤이나 대비감이 센 스타일링을 했을 때 포스가 터져 나옵니다.\n\n[스타일링 팁]\n미드나잇 네이비, 다크 플럼(자두색), 딥 파인 그린, 그리고 칠흑 같은 리얼 블랙이 매우 우아합니다.\n카라멜 브라운, 웜 오렌지, 혹은 탁한 뮤트톤은 당신의 이목구비를 답답하게 만듭니다.`,
        description_zh: `[分析结果]\n你的魅力是主导一切、冷艳且充满夜之深邃的。\n极致暗黑的冷色调配上利落的对比，能激发你如电影大片般的高级精英感。\n\n[穿搭建议]\n午夜蓝、深李子紫、松树绿和纯黑色对你而言绝美透顶。\n避免金棕色、暖橘色或浑浊灰暗的大地色。`,
        description_ja: `[分析結果]\n真夜中のように冷涼で圧倒的、ダークなカリスマ性を持っています。\n冷たく極端に暗いトーンや、コントラストの強いスタイリングで圧倒的なオーラを放ちます。\n\n[スタイリングのヒント]\nミッドナイトネイビー、ダークプラム、ディープパイングリーン、漆黒のブラックが最高にエレガントです。\nキャラメルブラウン、ウォームオレンジ、くすんだアースカラーは顔立ちをぼやけさせます。`,
        keywords: ['Commanding', 'Nocturnal', 'Dark', 'Elite', 'Charismatic'],
        keywords_ko: ['압도적', '서늘함', '다크', '포스', '카리스마'],
        keywords_zh: ['霸气', '夜之深邃', '暗黑', '精英', '魅力四射'],
        keywords_ja: ['圧倒的', '冷涼', 'ダーク', 'オーラ', 'カリスマ'],
        bestColors: ['#767676', '#DC143C', '#0F5C6E', '#35415E', '#191970'],
        worstColors: ['#FFA500', '#DAA520', '#D2B48C'],
        palette: ['#DC143C', '#0F5C6E', '#35415E', '#191970'],
        image: '/images/color-v3/winter.png'
    },
    'winter-true': {
        id: 'winter-true',
        baseSeason: 'winter',
        title: 'True Winter',
        title_ko: '겨울 트루 (겨울 쿨톤)',
        title_zh: '真冬季',
        title_ja: 'トゥルーウィンター',
        description: `[Analysis]\nYou have a striking, pure, and flawlessly modern presence.\nHigh-contrast, icy, and starkly cool colors amplify your unique and captivating aura.\n\n[Styling Tips]\nPure stark white, royal blue, true red, and bold magenta are your power colors.\nAvoid washed-out, dusty warm colors like beige or terra-cotta.`,
        description_ko: `[분석 결과]\n마치 백설공주처럼 새하얀 눈빛과 대비되는 뚜렷하고 모던한 존재감을 가지셨군요.\n탁기가 하나도 섞이지 않은 쨍하고 차가운 원색 계열이 당신의 유니크한 아우라를 살려줍니다.\n\n[스타일링 팁]\n형광빛 도는 티타늄 화이트, 투루 초록/레드, 마젠타, 로열 블루 원색들이 강력한 베스트입니다.\n누런기가 도는 베이지, 벽돌색(테라코타), 탁색 웜톤은 무조건 피하는 것을 권장합니다.`,
        description_zh: `[分析结果]\n你拥有一种极其引人注目、纯粹且无瑕现代感的存在。\n高对比度、冰冷凌厉的纯正冷色能放大你独特迷人的光环。\n\n[穿搭建议]\n纯极致白、宝蓝色、正红色和亮洋红色是你的力量本命色。\n避免水洗感重、掺灰的暖色调，如米色或红陶色。`,
        description_ja: `[分析結果]\n白雪姫のように、白と黒のコントラストが際立つモダンで澄んだ存在感を持っています。\n濁りのない、ぱきっとした冷たい原色が、あなたのユニークなオーラを引き立てます。\n\n[スタイリングのヒント]\n蛍光色に近いチタンホワイト、トゥルーレッド、マゼンタ、ロイヤルブルーが最強のベストカラーです。\n黄みのあるベージュ、レンガ色（テラコッタ）、濁ったウォームトーンは絶対に避けましょう。`,
        keywords: ['Striking', 'Pure', 'Contrast', 'Modern', 'Unique'],
        keywords_ko: ['강렬함', '순백', '대비', '모던함', '유니크'],
        keywords_zh: ['引人注目', '纯粹', '强烈对比', '现代感', '独特'],
        keywords_ja: ['印象的', 'ピュア', 'コントラスト', 'モダン', '個性的'],
        bestColors: ['#000000', '#FFFFFF', '#1D2327', '#E4D5EE', '#CAC2CE'],
        worstColors: ['#D2B48C', '#BDB76B', '#8B4513'],
        palette: ['#000000', '#FFFFFF', '#1D2327', '#E4D5EE'],
        image: '/images/color-v3/winter.png'
    },
    'winter-bright': {
        id: 'winter-bright',
        baseSeason: 'winter',
        title: 'Bright Winter',
        title_ko: '겨울 브라이트 (클리어)',
        title_zh: '亮冬季',
        title_ja: 'ブライトウィンター',
        description: `[Analysis]\nYour energy is sharp, jewel-like, and highly electrifying.\nVivid, cool jewel tones paired with dazzling contrast make you an absolute standout.\n\n[Styling Tips]\nNeon pink, emerald green, and electric sapphire blue suit you flawlessly.\nAvoid muddy, muted, or very soft warm pastels.`,
        description_ko: `[분석 결과]\n베일 듯이 날카롭고 보석처럼 반짝이며 전기가 통할 듯 통통 튀는 화려한 인상입니다.\n형광기가 가득한 차갑고 비비드한 반짝이는 톤들이 이목구비에 형광등을 켜줍니다.\n\n[스타일링 팁]\n완전한 네온 핫핑크, 청록색, 에메랄드 그린, 일렉트릭 블루 등 가장 쨍한 보석색이 찰떡입니다.\n뿌옇고 흐리멍덩하거나 부드럽고 따뜻한 소프트톤은 얼굴의 영혼을 가져갑니다.`,
        description_zh: `[分析结果]\n你的能量宛如利刃般锐利、如宝石般璀璨、充满着极具电击感的张力。\n生动高亮的冷调宝石色加上夺目的对比度，能让你一秒脱颖而出星光四射。\n\n[穿搭建议]\n霓虹热粉色、祖母绿和电光蓝简直就像为你量身定制。\n绝对要避开一切浑浊、暗哑或软塌塌的暖色马卡龙。`,
        description_ja: `[分析結果]\n鋭く、宝石のようにきらめき、電気が走るような弾ける華やかさを持っています。\n蛍光色に近いクールでビビッドな輝くトーンが、顔立ちに蛍光灯を点けたように輝かせます。\n\n[スタイリングのヒント]\n完全なネオンホットピンク、青緑色、エメラルドグリーン、エレクトリックブルーなど、一番鮮やかな宝石色がぴったりです。\nくすんでぼやけた色や、柔らかく暖かいソフトトーンは顔色を沈ませてしまいます。`,
        keywords: ['Electrifying', 'Jewel-like', 'Sharp', 'Dazzling', 'Standout'],
        keywords_ko: ['화려함', '보석같음', '선명함', '눈부심', '핫함'],
        keywords_zh: ['电击感', '璀璨宝石', '锐利', '夺目', '出众脱颖'],
        keywords_ja: ['華やか', '宝石のよう', '鮮やか', '眩い', 'ホット'],
        bestColors: ['#FF00FF', '#0000CD', '#4169E1', '#8B008B', '#800020'],
        worstColors: ['#FFDAB9', '#F5DEB3', '#D2B48C'],
        palette: ['#FF00FF', '#0000CD', '#4169E1', '#8B008B'],
        image: '/images/color-v3/winter.png'
    }
};

export function analyzePersonalColor(imageElement: HTMLImageElement): SubSeasonId {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return 'spring-true'; // Fallback

    // Scale down to a small resolution for faster processing and averaging
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
