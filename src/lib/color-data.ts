export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export interface ColorResult {
    id: SeasonId;
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

export const COLOR_RESULTS: Record<SeasonId, ColorResult> = {
    spring: {
        id: 'spring',
        title: 'Spring Warm',
        title_ko: '봄 웜톤',
        title_zh: '春季暖色调',
        title_ja: 'イエベ春',
        description: `[Analysis]\nYour bright and clear energy shines best in warm, sunny colors.\nYou have a lively and lovely vibe that makes people smile.\n\n[Styling Tips]\nPastels and clear bright colors like peach, coral, and warm yellow suit you best.\nAvoid heavy, dark shades or extremely cool icy colors as they might wash you out.`,
        description_ko: `[분석 결과]\n당신의 맑고 생기 있는 에너지는 따뜻하고 화사한 컬러에서 가장 빛납니다.\n주변을 환하게 만드는 사랑스럽고 통통 튀는 분위기를 가지셨군요.\n\n[스타일링 팁]\n피치, 코랄, 따뜻한 옐로우, 맑은 파스텔톤이 베스트입니다.\n너무 무겁고 칙칙한 색이나, 푸른기가 많이 도는 차가운 색은 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你明亮清透的能量在温暖明媚的颜色中最为闪耀。\n你自带一种活泼可爱的氛围，让人忍不住微笑。\n\n[穿搭建议]\n蜜桃色、珊瑚色、暖黄色和清透的马卡龙色最适合你。\n避免过于沉重暗哑的颜色，或极其冰冷的冷色调。`,
        description_ja: `[分析結果]\nあなたの明るく濁りのないエネルギーは、暖かく華やかな色で最も輝きます。\n周りを笑顔にする、愛らしくて生き生きとした雰囲気を持っています。\n\n[スタイリングのヒント]\nピーチ、コーラル、ウォームイエロー、クリアなパステルカラーがベストです。\n重くてくすんだ色や、青みの強い冷たい色は避けたほうがよいでしょう。`,
        keywords: ['Lively', 'Warm', 'Clear', 'Lovely', 'Fresh'],
        keywords_ko: ['생기', '따뜻함', '맑음', '사랑스러움', '프레시'],
        keywords_zh: ['活泼', '温暖', '清透', '可爱', '清新'],
        keywords_ja: ['生き生き', '暖かい', 'クリア', '愛らしい', 'フレッシュ'],
        bestColors: ['#FFB6C1', '#FFA07A', '#FFD700', '#98FB98', '#FF69B4'],
        worstColors: ['#000000', '#000080', '#8B008B'],
        palette: ['#FFB6C1', '#FFA07A', '#FFD700', '#98FB98'],
        image: '/images/color-v3/spring.png'
    },
    summer: {
        id: 'summer',
        title: 'Summer Cool',
        title_ko: '여름 쿨톤',
        title_zh: '夏季冷色调',
        title_ja: 'ブルベ夏',
        description: `[Analysis]\nYou have an elegant, soft, and refreshing aura.\nCool, muted colors harmonize perfectly with your clean and sophisticated vibe.\n\n[Styling Tips]\nSoft pastels, dusty pinks, lavender, and sky blue are your best friends.\nAvoid overly warm, yellowish browns or extremely vivid neon colors.`,
        description_ko: `[분석 결과]\n우아하고 부드러우면서도 청량한 아우라를 가지셨군요.\n차분하고 시원한 컬러가 당신의 깨끗하고 세련된 이미지와 완벽하게 어우러집니다.\n\n[스타일링 팁]\n부드러운 파스텔, 탁기가 섞인 더스티 핑크, 라벤더, 스카이 블루가 베스트입니다.\n노란기가 도는 더운 브라운이나 지나치게 쨍한 네온 컬러는 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你散发着一种优雅、柔和且清爽的氛围。\n偏冷、柔和的颜色与你干净精致的形象完美契合。\n\n[穿搭建议]\n柔和的马卡龙色、灰粉色、薰衣草紫和天蓝色是你的最佳选择。\n避免过于偏黄的暖棕色或极度刺眼的霓虹色。`,
        description_ja: `[分析結果]\n上品で上品で、涼しげなオーラを持っています。\n涼しげでソフトな色が、あなたの清潔感のある洗練された雰囲気に完璧に調和します。\n\n[スタイリングのヒント]\nソフトなパステル、くすみピンク、ラベンダー、スカイブルーがベストです。\n黄みの強いブラウンや、鮮やかすぎるネオンカラーは避けたほうがよいでしょう。`,
        keywords: ['Elegant', 'Soft', 'Cool', 'Clean', 'Sophisticated'],
        keywords_ko: ['우아함', '부드러움', '시원함', '깨끗함', '세련됨'],
        keywords_zh: ['优雅', '柔和', '清冷', '干净', '精致'],
        keywords_ja: ['上品', 'ソフト', '涼しげ', '清潔感', '洗練'],
        bestColors: ['#E6E6FA', '#ADD8E6', '#FFB6C1', '#D8BFD8', '#B0C4DE'],
        worstColors: ['#FFA500', '#8B4513', '#FF4500'],
        palette: ['#E6E6FA', '#ADD8E6', '#FFB6C1', '#D8BFD8'],
        image: '/images/color-v3/summer.png'
    },
    autumn: {
        id: 'autumn',
        title: 'Autumn Warm',
        title_ko: '가을 웜톤',
        title_zh: '秋季暖色调',
        title_ja: 'イエベ秋',
        description: `[Analysis]\nYou possess a deep, rich, and luxurious atmosphere.\nEarthy, muted warm colors bring out your natural maturity and gorgeousness.\n\n[Styling Tips]\nDeep khaki, mustard, brick red, and olive green are stunning on you.\nAvoid cool pastels, bright magenta, or pure white. Opt for ivory instead.`,
        description_ko: `[분석 결과]\n깊이 있고 그윽하며 고급스러운 분위기를 지니셨네요.\n자연을 닮은 따뜻하고 차분한 컬러들이 당신의 성숙하고 화려한 매력을 극대화합니다.\n\n[스타일링 팁]\n딥한 카키, 머스타드, 브릭 레드, 올리브 그린 등 가을의 색채가 베스트입니다.\n차가운 파스텔이나 쨍한 마젠타, 그리고 새하얀 화이트보다는 아이보리가 잘 어울립니다.`,
        description_zh: `[分析结果]\n你拥有一种深沉、醇厚且高级的气质。\n大地色系和柔和的暖色调能最大程度展现你的成熟与华丽。\n\n[穿搭建议]\n深卡其色、芥末黄、砖红色和橄榄绿在你身上格外迷人。\n避免冷调马卡龙色、亮洋红色或纯白色，尽量选择象牙白。`,
        description_ja: `[分析結果]\n深みがあり、落ち着いた高級感のある雰囲気を持っています。\nアースカラーや落ち着いた暖色が、あなたの成熟した華やかな魅力を引き立てます。\n\n[スタイリングのヒント]\nディープカーキ、マスタード、ブリックレッド、オリーブグリーンが最高に似合います。\n冷たいパステルカラー、鮮やかなマゼンタ、純白は避け、アイボリーを選びましょう。`,
        keywords: ['Deep', 'Gorgeous', 'Earthy', 'Mature', 'Luxurious'],
        keywords_ko: ['깊이감', '화려함', '어스컬러', '성숙함', '고급스러움'],
        keywords_zh: ['深沉', '华丽', '大地色', '成熟', '高级'],
        keywords_ja: ['深み', 'ゴージャス', 'アースカラー', '成熟', '高級感'],
        bestColors: ['#8B4513', '#DAA520', '#556B2F', '#A52A2A', '#D2B48C'],
        worstColors: ['#FF00FF', '#00FFFF', '#E6E6FA'],
        palette: ['#8B4513', '#DAA520', '#556B2F', '#A52A2A'],
        image: '/images/color-v3/autumn.png'
    },
    winter: {
        id: 'winter',
        title: 'Winter Cool',
        title_ko: '겨울 쿨톤',
        title_zh: '冬季冷色调',
        title_ja: 'ブルベ冬',
        description: `[Analysis]\nYou have a striking, charismatic, and modern presence.\nHigh-contrast, pure, and icy colors amplify your unique and captivating aura.\n\n[Styling Tips]\nPure black, stark white, magenta, royal blue, and icy tones are your power colors.\nAvoid washed-out, dusty warm colors like beige or mustard yellow.`,
        description_ko: `[분석 결과]\n눈길을 사로잡는 카리스마와 모던한 존재감을 가지셨군요.\n대비가 뚜렷하고 차가운 원색 계열이 당신의 유니크하고 도회적인 아우라를 살려줍니다.\n\n[스타일링 팁]\n순백의 화이트, 리얼 블랙, 마젠타, 로열 블루, 쨍한 아이시 톤이 베스트입니다.\n흐리멍덩한 컬러나 누런기가 도는 베이지, 머스타드 색상은 피하는 것이 좋습니다.`,
        description_zh: `[分析结果]\n你拥有一种引人注目、充满气场且充满现代感的存在。\n高对比度、纯粹冷冽的颜色能放大你独特迷人的光环。\n\n[穿搭建议]\n纯黑色、极致白、洋红色、宝蓝色和冰冷色调是你的力量色。\n避免水洗感重、掺灰的暖色调，如米色或土黄色。`,
        description_ja: `[分析結果]\n目を引くカリスマ性とモダンな存在感を持っています。\nコントラストの強い、ピュアで冷たい色が、あなたの個性的で都会的なオーラを際立たせます。\n\n[スタイリングのヒント]\nピュアブラック、純白、マゼンタ、ロイヤルブルー、アイシートーンがあなたのパワーカラーです。\n色褪せたような、くすんだ暖色（ベージュやマスタードなど）は避けましょう。`,
        keywords: ['Charisma', 'Modern', 'Striking', 'Contrast', 'Unique'],
        keywords_ko: ['카리스마', '모던함', '강렬함', '대비', '유니크'],
        keywords_zh: ['气场', '现代', '引人注目', '对比', '独特'],
        keywords_ja: ['カリスマ', 'モダン', '印象的', 'コントラスト', '個性的'],
        bestColors: ['#000000', '#FFFFFF', '#DC143C', '#0000CD', '#FF00FF'],
        worstColors: ['#BDB76B', '#D2B48C', '#FFA500'],
        palette: ['#000000', '#FFFFFF', '#DC143C', '#0000CD'],
        image: '/images/color-v3/winter.png'
    }
};

/**
 * Super basic client-side color extraction heuristic.
 * Expects an image element and extracts an average color from the center.
 */
export function analyzePersonalColor(imageElement: HTMLImageElement): SeasonId {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return 'spring'; // Fallback

    // Scale down to a small resolution for faster processing and averaging
    canvas.width = 100;
    canvas.height = 100;

    ctx.drawImage(imageElement, 0, 0, 100, 100);

    // Grab pixels from the center 30x30 to loosely target the face assuming portrait
    const imageData = ctx.getImageData(35, 35, 30, 30);
    const data = imageData.data;

    let rSum = 0, gSum = 0, bSum = 0;
    let validPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
        // Skip purely transparent pixels just in case
        if (data[i + 3] === 0) continue;
        rSum += data[i];
        gSum += data[i + 1];
        bSum += data[i + 2];
        validPixels++;
    }

    const rAvg = rSum / validPixels;
    const gAvg = gSum / validPixels;
    const bAvg = bSum / validPixels;

    // Mathematical heuristics for season
    // This is highly simplified and meant as a fun web novelty, not a scientific measure.
    // 1. Calculate Brightness (Luma)
    const brightness = 0.2126 * rAvg + 0.7152 * gAvg + 0.0722 * bAvg;

    // 2. Calculate Temperature
    // Red > Blue generally means warmer
    const isWarm = rAvg > bAvg + 15;

    // 3. Determine Season
    if (isWarm) {
        if (brightness > 130) {
            return 'spring'; // Warm & Bright
        } else {
            return 'autumn'; // Warm & Dark
        }
    } else {
        if (brightness > 130) {
            return 'summer'; // Cool & Bright (often higher brightness due to lack of deep red saturation)
        } else {
            return 'winter'; // Cool & Dark/High Contrast
        }
    }
}
