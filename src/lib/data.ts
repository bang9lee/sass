
export type AestheticId =
    | 'whimsigoth'
    | 'clean_girl'
    | 'y2k'
    | 'dark_academia'
    | 'cottagecore'
    | 'cyberpunk'
    | 'old_money'
    | 'coquette';

// Big 5 Traits
export type TraitId = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

interface TraitProfile {
    openness: number;         // O: Imagination, Insight
    conscientiousness: number;// C: Thoughtfulness, Impulse Control
    extraversion: number;     // E: Sociability, Expressiveness
    agreeableness: number;    // A: Altruism, Kindness
    neuroticism: number;      // N: Emotional Instability, Stress
}

export interface Aesthetic {
    id: AestheticId;
    title: string;
    title_ko: string;
    title_zh: string;
    title_ja: string;
    archetype: string;
    archetype_ko: string;
    archetype_zh: string;
    archetype_ja: string;
    description: string;
    description_ko: string;
    description_zh: string;
    description_ja: string;
    keywords: string[];
    keywords_ko: string[];
    keywords_zh: string[];
    keywords_ja: string[];
    brandMatches: string[];
    colorPalette: string[];
    image: string;
    // Target psychological profile for this aesthetic
    targetTraits: TraitProfile;
}

export const AESTHETICS: Record<AestheticId, Aesthetic> = {
    whimsigoth: {
        id: 'whimsigoth',
        title: 'Whimsigoth',
        title_ko: '윔지가스',
        title_zh: 'Whimsigoth',
        title_ja: 'Whimsigoth',
        archetype: 'The Mystic',
        archetype_ko: '신비주의자',
        archetype_zh: '神秘主义者',
        archetype_ja: '神秘主義者',
        description: `[Personality Analysis]\nYou feel the world deeply.\nWhile others stick to the boring facts, you notice the magic and hidden meanings in everyday life.\nPeople might call you "dreamy," but that's just because your imagination is too big for this small world.\n\n[Why this Result?]\nWhimsigoth is your armor.\nThe dark, mystical vibe protects your sensitive heart.\nYou love tarot and magic not just for fun, but because you crave a world that is as deep and meaningful as you are.`,
        description_ko: `[성격 분석]\n남들보다 훨씬 예민하고 섬세한 감각을 타고나셨군요.\n딱딱한 현실보다는 꿈꾸는 듯한 신비로운 분위기에서 편안함을 느낍니다.\n"생각이 너무 많다"는 말을 듣기도 하지만, 사실 그건 당신이 세상을 더 깊이 있게 바라보기 때문이에요.\n\n[왜 이 결과가 나왔을까?]\n윔지가스는 당신의 여린 마음을 지켜주는 갑옷입니다.\n어둡고 신비로운 스타일은 예민한 당신을 숨겨주고 보호해줍니다.\n당신이 마법이나 타로에 끌리는 건, 뻔하고 지루한 현실이 당신의 거대한 상상력을 담기엔 너무 좁기 때문일 거예요.`,
        description_zh: `[性格分析]\n你感受世界的方式很特别。\n当别人只关注枯燥的事实时，你却能发现生活中的魔法和隐喻。\n别人也许觉得你“爱做梦”，但那只是因为现实世界对你丰富的想象力来说太狭隘了。\n\n[为什么是这个结果？]\nWhimsigoth 是你的盔甲。\n那种黑暗神秘的氛围保护着你敏感的内心。\n你喜欢塔罗和魔法，是因为你渴望一个像你的灵魂一样深邃、充满意义的世界。`,
        description_ja: `【性格分析】\nあなたは誰よりも繊細な心の持ち主です。\n現実的なことよりも、夢のような神秘的な世界に惹かれます。\n「考えすぎ」と言われることもありますが、それはあなたが世界を深く感じ取っている証拠です。\n\n【なぜこの結果なのか？】\nWhimsigothは、あなたを守る鎧です。\nダークで神秘的な雰囲気は、あなたの傷つきやすい心を守ってくれます。\n魔法やタロットに惹かれるのは、平凡な現実があなたの豊かな想像力には退屈すぎるからでしょう。`,
        keywords: ['Intuition', 'Depth', 'Symbolism', 'Sensitivity', 'Magic'],
        keywords_ko: ['직관', '깊이', '상징', '예민함', '마법'],
        keywords_zh: ['直觉', '深度', '象征', '敏感', '魔法'],
        keywords_ja: ['直感', '深み', '象徴', '繊細', '魔法'],
        brandMatches: ['Anna Sui', 'Free People', 'Lush'],
        colorPalette: ['#2E1A47', '#D4AF37', '#1A1A1C'],
        image: '/images/aesthetics/whimsigoth.webp',
        targetTraits: { openness: 2, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 2 }
    },
    clean_girl: {
        id: 'clean_girl',
        title: 'Clean Girl',
        title_ko: '클린걸',
        title_zh: 'Clean Girl',
        title_ja: 'Clean Girl',
        archetype: 'The Perfectionist',
        archetype_ko: '완벽주의자',
        archetype_zh: '完美主义者',
        archetype_ja: '完璧主義者',
        description: `[Personality Analysis]\nYou are the master of self-control.\nYou hate chaos. You need everything around you to be organized to feel calm.\nYou make hard work look effortless, but we know you work harder than anyone else behind the scenes.\n\n[Why this Result?]\nThe 'Clean Girl' look is the mirror of your tidy mind.\nSlick hair, simple clothes, planned schedule—these are your rituals to keep stress away.\nIn a messy world, your ability to create order is your superpower.`,
        description_ko: `[성격 분석]\n당신은 자기관리의 끝판왕이시군요.\n주변이 어지러우면 머릿속까지 복잡해져서, 깔끔하게 정리된 환경에서 안정을 찾습니다.\n겉으로는 여유로워 보이지만, 사실은 물 밑에서 치열하게 발을 젓는 백조처럼 보이지 않는 곳에서 엄청난 노력을 하는 타입이에요.\n\n[왜 이 결과가 나왔을까?]\n클린걸 스타일은 당신의 깔끔한 성격을 그대로 보여줍니다.\n단정한 머리와 옷차림, 규칙적인 생활은 당신의 마음을 평온하게 만드는 의식과도 같아요.\n혼란스러운 세상 속에서 흔들리지 않고 나만의 질서를 유지하는 능력, 정말 대단합니다.`,
        description_zh: `[性格分析]\n你是自律的大师。\n你讨厌混乱。只有周围井井有条，你的内心由于才会平静。\n你表面看起来毫不费力，其实在背后比谁都努力。\n\n[为什么是这个结果？]\n‘Clean Girl’ 风格是你整洁内心的写照。\n利落的发型、极简的穿搭、规划好的日程——这些都是你对抗压力的仪式。\n在一个混乱的世界里，能够建立只需，是你的超能力。`,
        description_ja: `【性格分析】\nあなたは自己管理の達人です。\n散らかっているのが大嫌いで、身の回りが整っていないと落ち着きません。\n表面的には余裕そうに見えますが、影では誰よりも努力している人です。\n\n【なぜこの結果なのか？】\n「Clean Girl」スタイルは、あなたの几帳面な性格を映し出しています。\n整った髪、シンプルな服装、計画的な生活。これらはあなたの心を守る儀式です。\n混沌とした世界で、自分だけの秩序を作れるのは素晴らしい才能です。`,
        keywords: ['Control', 'Efficiency', 'Clarity', 'Discipline', 'Order'],
        keywords_ko: ['통제', '효율', '명료함', '규율', '질서'],
        keywords_zh: ['掌控', '效率', '清晰', '自律', '秩序'],
        keywords_ja: ['統制', '効率', '明晰', '自律', '秩序'],
        brandMatches: ['Rhode', 'Alo Yoga', 'Dyson'],
        colorPalette: ['#F5F5F0', '#E3E3E3', '#6B705C'],
        image: '/images/aesthetics/clean_girl.webp',
        targetTraits: { openness: -1, conscientiousness: 2, extraversion: 0, agreeableness: 1, neuroticism: -2 }
    },
    dark_academia: {
        id: 'dark_academia',
        title: 'Dark Academia',
        title_ko: '다크 아카데미아',
        title_zh: 'Dark Academia',
        title_ja: 'Dark Academia',
        archetype: 'The Scholar',
        archetype_ko: '학자',
        archetype_zh: '学者',
        archetype_ja: '探求者',
        description: `[Personality Analysis]\nYou recharge your energy when you are alone.\nLoud parties drain you; quiet cafes or libraries heal you.\nYou aren't just "quiet"—you are deep. You love talking about life, secrets, and philosophy.\n\n[Why this Result?]\nDark Academia validates your need for solitude.\nOld books, rain, silence... these aren't gloomy to you; they are peaceful.\nYou don't need to be loud to be heard. Your depth speaks for itself.`,
        description_ko: `[성격 분석]\n시끄러운 모임보다는 혼자 카페에서 책을 읽을 때 에너지가 충전되는 분이시군요.\n단순히 "조용하다"는 말로는 부족해요. 당신은 생각이 깊고 진지한 사람입니다.\n가벼운 농담보다는 인생의 의미나 철학적인 주제로 대화할 때 눈이 반짝이죠.\n\n[왜 이 결과가 나왔을까?]\n다크 아카데미아는 당신의 '지적인 고독'을 가장 우아하게 표현해줍니다.\n오래된 도서관, 빗소리, 차분한 공기... 남들은 우울하다고 할지 몰라도 당신에겐 가장 편안한 분위기죠.\n굳이 큰 소리로 말하지 않아도 됩니다. 당신의 깊이 있는 내면은 이미 충분히 매력적이니까요.`,
        description_zh: `[性格分析]\n独处能让你恢复能量。\n吵闹的聚会让你疲惫，安静的咖啡馆或图书馆能治愈你。\n你不仅仅是“安静”，你是深沉。你喜欢探讨人生、秘密和哲学。\n\n[为什么是这个结果？]\nDark Academia 证明了你对独处的需求是正当且迷人的。\n古书、雨天、寂静……对别人来说可能沉闷，对你却是享受。\n你不需要大声喧哗。你的深度本身就是一种力量。`,
        description_ja: `【性格分析】\nあなたは一人でいる時にエネルギーを回復します。\n騒がしいパーティーは苦手で、静かなカフェや図書館が安らぎの場所です。\nただ「静か」なだけではありません。あなたは思慮深い人です。\n\n【なぜこの結果なのか？】\nDark Academiaは、あなたの「知的な孤独」を肯定します。\n古い本、雨音、静寂…これらはあなたにとって最高の癒しです。\n大声を出す必要はありません。あなたの深みは、それだけで十分魅力的です。`,
        keywords: ['Intellect', 'Solitude', 'Melancholy', 'Curiosity', 'Legacy'],
        keywords_ko: ['지성', '고독', '멜랑꼴리', '탐구', '유산'],
        keywords_zh: ['智力', '独处', '忧郁', '好奇', '传承'],
        keywords_ja: ['知性', '孤独', '憂鬱', '探求', '遺産'],
        brandMatches: ['Ralph Lauren', 'Moleskine', 'Burberry'],
        colorPalette: ['#3E2723', '#1C1C1C', '#A1887F'],
        image: '/images/aesthetics/dark_academia.webp',
        targetTraits: { openness: 2, conscientiousness: 1, extraversion: -2, agreeableness: -1, neuroticism: 0 }
    },
    y2k: {
        id: 'y2k',
        title: 'Y2K',
        title_ko: 'Y2K',
        title_zh: 'Y2K',
        title_ja: 'Y2K',
        archetype: 'The Star',
        archetype_ko: '주인공',
        archetype_zh: '大明星',
        archetype_ja: 'スター',
        description: `[Personality Analysis]\nYou have "Main Character Energy."\nYou hate being bored and always look for the next excitement.\nYou aren't afraid of attention—you love it. And honestly? You deserve it.\n\n[Why this Result?]\nY2K is the spotlight you were born for.\nBright pinks, sparkles, bold logos—they shout "Look at me!" just like your soul does.\nYour confidence makes people smile. Never dim your light for anyone.`,
        description_ko: `[성격 분석]\n어딜 가나 시선을 끄는 '주인공' 에너지를 타고나셨네요!\n지루한 건 딱 질색이고, 항상 새롭고 짜릿한 걸 찾아다니는 모험가 같아요.\n남의 눈치를 보기보다는 "나 좀 봐! 멋지지 않아?" 하고 당당하게 자신을 드러내는 모습이 정말 매력적이에요.\n\n[왜 이 결과가 나왔을까?]\nY2K는 당신의 넘치는 끼를 발산하기 위한 최고의 무대예요.\n튀는 색감, 반짝이는 액세서리는 당신의 자신감을 그대로 보여주는 도구입니다.\n당신의 밝은 에너지는 주변 사람까지 기분 좋게 만드는 힘이 있어요. 절대 그 빛을 잃지 마세요!`,
        description_zh: `[性格分析]\n你天生自带“主角光环”。\n你最受不了无聊，总是在寻找下一个刺激点。\n你不害怕被注视——相反，你享受它。而且说实话，你值得被关注。\n\n[为什么是这个结果？]\nY2K 是为你量身打造的聚光灯。\n亮粉色、闪粉、大Logo——它们和你一样在呐喊“看着我！”。\n你的自信能感染周围的人。永远不要为了任何人掩盖你的光芒。`,
        description_ja: `【性格分析】\nあなたは「主人公エネルギー」の持ち主です。\n退屈なのは大嫌い、常に新しい刺激を探しています。\n注目されることを恐れず、むしろ楽しんでいますね。\n\n【なぜこの結果なのか？】\nY2Kは、あなたのためのスポットライトです。\n鮮やかなピンク、キラキラ、大胆なロゴ。これらはあなたの魂のように「私を見て！」と叫んでいます。\nあなたの自信は周りの人を笑顔にします。その輝きを失わないで。`,
        keywords: ['Energy', 'Attention', 'Optimism', 'Play', 'Main Character'],
        keywords_ko: ['에너지', '관종', '낙관', '놀이', '주인공'],
        keywords_zh: ['能量', '焦点', '乐观', '玩乐', '大女主'],
        keywords_ja: ['活力', '注目', '楽観', '遊び', '主人公'],
        brandMatches: ['Diesel', 'Blumarine', 'Gentle Monster'],
        colorPalette: ['#FF69B4', '#00FFFF', '#C0C0C0'],
        image: '/images/aesthetics/y2k.webp',
        targetTraits: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 1, neuroticism: 0 }
    },
    cottagecore: {
        id: 'cottagecore',
        title: 'Cottagecore',
        title_ko: '코티지코어',
        title_zh: 'Cottagecore',
        title_ja: 'Cottagecore',
        archetype: 'The Healer',
        archetype_ko: '치유자',
        archetype_zh: '治愈者',
        archetype_ja: '癒し手',
        description: `[Personality Analysis]\nYou have a gentle and kind heart.\nYou dislike fighting and competition. You dream of a peaceful life where everyone is happy.\nYou feel other people's pain deeply, so sometimes the world feels too heavy for you.\n\n[Why this Result?]\nCottagecore is medicine for your tired soul.\nSunlight, flowers, nature... these things make you feel safe.\nWanting a slow life isn't running away. It's your way of protecting your innocence in a harsh world.`,
        description_ko: `[성격 분석]\n마음씨가 정말 따뜻하고 다정한 분이시네요.\n싸우고 경쟁하는 걸 싫어하고, 모두가 평화롭게 지내는 세상을 꿈꾸시죠?\n공감 능력이 너무 좋아서, 남의 아픔까지 내 것처럼 느끼느라 가끔은 세상살이가 버겁기도 할 거예요.\n\n[왜 이 결과가 나왔을까?]\n코티지코어는 지친 당신의 마음에 주는 '휴식'입니다.\n따스한 햇살, 예쁜 꽃, 자연... 상상만 해도 마음이 놓이죠?\n당신이 이런 포근함을 찾는 건 도피가 아니에요. 삭막한 세상에서도 순수함과 여유를 잃지 않으려는 본능이랍니다.`,
        description_zh: `[性格分析]\n你有一颗温柔善良的心。\n你讨厌争吵和竞争，梦想着大家都幸福的和平生活。\n你能深刻感受他人的痛苦，所以有时会觉得这个世界太沉重。\n\n[为什么是这个结果？]\nCottagecore 是给你疲惫心灵的一剂良药。\n阳光、鲜花、大自然……这些让你感到安全。\n向往慢生活不是逃避，而是你在用自己的方式守护那份纯真。`,
        description_ja: `【性格分析】\nあなたはとても優しく温かい心の持ち主です。\n争いや競争が嫌いで、みんなが幸せに暮らす世界を夢見ています。\n共感力が高いので、他人の痛みを敏感に感じ取り、疲れてしまうこともあるでしょう。\n\n【なぜこの結果なのか？】\nCottagecoreは、疲れた心への薬です。\n日差し、花、自然…これらはあなたを安心させてくれます。\nスローライフを求めるのは逃げではありません。厳しい世界で純粋さを守るための、あなたなりの方法なのです。`,
        keywords: ['Empathy', 'Safety', 'Nature', 'Gentleness', 'Harmony'],
        keywords_ko: ['공감', '안전', '자연', '다정함', '조화'],
        keywords_zh: ['共情', '安全', '自然', '温柔', '和谐'],
        keywords_ja: ['共感', '安全', '自然', '優しさ', '調和'],
        brandMatches: ['LoveShackFancy', 'Le Creuset', 'Cath Kidston'],
        colorPalette: ['#7BA05B', '#FADADD', '#FFF8E7'],
        image: '/images/aesthetics/cottagecore.webp',
        targetTraits: { openness: -1, conscientiousness: 0, extraversion: -1, agreeableness: 2, neuroticism: 1 }
    },
    cyberpunk: {
        id: 'cyberpunk',
        title: 'Cyberpunk',
        title_ko: '사이버펑크',
        title_zh: 'Cyberpunk',
        title_ja: 'Cyberpunk',
        archetype: 'The Rebel',
        archetype_ko: '반항아',
        archetype_zh: '反叛者',
        archetype_ja: '反逆者',
        description: `[Personality Analysis]\nYou hate being told "Just do it like everyone else."\nYou question rules that don't make sense.\nYou prefer harsh truths over sweet lies.\n\n[Why this Result?]\nCyberpunk matches your rebellious spirit.\nYou see the cracks in the system that others ignore.\nYour courage to be your real self, even when it's weird or different, is your greatest strength.`,
        description_ko: `[성격 분석]\n"남들 다 하니까 너도 해"라는 말이 제일 싫으시죠?\n이해 안 가는 규칙은 따르기 싫고, 꼰대 같은 권위에는 본능적으로 반감을 느끼는 '사이다' 성격이에요.\n가식적인 칭찬보다는 차라리 솔직한 비판을 선호하는, 쿨내 진동하는 타입이시군요.\n\n[왜 이 결과가 나왔을까?]\n사이버펑크는 당신의 '삐딱한 시선'과 잘 어울려요.\n당신은 남들이 외면하는 세상의 불편한 진실을 꿰뚫어 보는 눈을 가졌거든요.\n남들과 똑같이 되기를 거부하고 '진짜 나'로 살겠다는 그 용기, 정말 멋집니다.`,
        description_zh: `[性格分析]\n你讨厌听到“别人都这么做，你也这么做吧”。\n你质疑那些毫无意义的规则。\n比起甜蜜的谎言，你宁愿面对残酷的真相。\n\n[为什么是这个结果？]\n赛博朋克完全契合你的叛逆精神。\n你能看到别人选择忽视的系统漏洞。\n即使被视为异类，也要坚持做真实的自己，这是你最大的力量。`,
        description_ja: `【性格分析】\n「みんなやってるから」と言われるのが大嫌いですよね？\n納得できないルールには従いたくない、反骨精神の持ち主です。\n甘い嘘よりも、厳しい真実の方を好みます。\n\n【なぜこの結果なのか？】\nサイバーパンクは、あなたの反逆精神にマッチします。\nあなたは、他の人が無視する社会の歪みを見抜く目を持っています。\n変人扱いされても「本当の自分」でいようとする勇気、それがあなたの最大の武器です。`,
        keywords: ['Rebellion', 'Truth', 'Future', 'Tech', 'Cynicism'],
        keywords_ko: ['반항', '진실', '미래', '기술', '냉소'],
        keywords_zh: ['反叛', '真相', '未来', '科技', '愤世嫉俗'],
        keywords_ja: ['反逆', '真実', '未来', '技術', '冷笑'],
        brandMatches: ['Acronym', 'Razer', 'Balenciaga'],
        colorPalette: ['#00FF41', '#FF00FF', '#0D0D0D'],
        image: '/images/aesthetics/cyberpunk.webp',
        targetTraits: { openness: 2, conscientiousness: 0, extraversion: 0, agreeableness: -2, neuroticism: 0 }
    },
    old_money: {
        id: 'old_money',
        title: 'Old Money',
        title_ko: '올드머니',
        title_zh: 'Old Money',
        title_ja: 'Old Money',
        archetype: 'The Sovereign',
        archetype_ko: '통치자',
        archetype_zh: '君主',
        archetype_ja: '君主',
        description: `[Personality Analysis]\nYou are steady like a rock.\nYou don't chase fast trends. You like things that are proven and last a long time.\nYou have a quiet confidence that doesn't need to show off.\n\n[Why this Result?]\nOld Money shows your love for "Quality."\nYou know that true luxury comes from good character, not flashy logos.\nIn a world that changes too fast, you stand firm with dignity. That is your power.`,
        description_ko: `[성격 분석]\n당신은 쉽게 흔들리지 않는 바위 같은 분이군요.\n유행 따라 우르르 몰려다니는 건 좀 가벼워 보인다고 생각하시나요?\n검증되지 않은 모험보다는 확실하고 안정적인 길을 선호하는 신중한 성격입니다.\n\n[왜 이 결과가 나왔을까?]\n올드머니 룩은 당신이 추구하는 '변치 않는 가치'를 보여줍니다.\n시끄럽게 자랑하지 않아도 은은하게 배어 나오는 기품이 있어요.\n세상이 아무리 빠르게 변해도, 당신만은 묵묵히 자신의 자리를 지킬 것 같네요.`,
        description_zh: `[性格分析]\n你像岩石一样稳重。\n你不追逐快时尚，喜欢那些经久考验、能够长存的事物。\n你有一种无需炫耀的静谧自信。\n\n[为什么是这个结果？]\nOld Money 展现了你对“品质”的追求。\n你深知真正的奢华源于内在的底蕴，而非浮夸的Logo。\n在这个瞬息万变的世界里，你保持着尊严屹立不倒。这就是你的力量。`,
        description_ja: `【性格分析】\nあなたは岩のように揺るぎない人です。\n流行を追いかけることはしません。確実で長く続くものを好みます。\n見せびらかす必要のない、静かな自信を持っています。\n\n【なぜこの結果なのか？】\nOld Moneyは、あなたの「質」へのこだわりを表しています。\n本当の贅沢とは、派手なロゴではなく、品格から来ることを知っています。\n変化の激しい世界で、威厳を持って立ち続ける。それがあなたの力です。`,
        keywords: ['Status', 'Stability', 'Legacy', 'Dignity', 'Tradition'],
        keywords_ko: ['지위', '안정', '유산', '품위', '전통'],
        keywords_zh: ['地位', '稳定', '传承', '尊严', '传统'],
        keywords_ja: ['地位', '安定', '遺産', '品格', '伝統'],
        brandMatches: ['Loro Piana', 'Chanel', 'Hermes'],
        colorPalette: ['#002147', '#F5F5DC', '#FFFFFF'],
        image: '/images/aesthetics/old_money.webp',
        targetTraits: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1 }
    },
    coquette: {
        id: 'coquette',
        title: 'Coquette',
        title_ko: '코케트',
        title_zh: 'Coquette',
        title_ja: 'Coquette',
        archetype: 'The Lover',
        archetype_ko: '연인',
        archetype_zh: '恋人',
        archetype_ja: '愛する者',
        description: `[Personality Analysis]\nYou have so much love to give.\nYou get moved easily by small things, and rejection hurts you deeply.\nBut staying soft in a hard world is brave, not weak.\n\n[Why this Result?]\nCoquette is your way of being loved.\nRibbons and pink aren't just cute; they make you look harmless and sweet.\nYou chose to survival by being adorable. And honestly? It works.`,
        description_ko: `[성격 분석]\n사랑받고 싶은 마음도 크지만, 그만큼 사랑을 줄 줄도 아는 '사랑둥이'시네요.\n작은 일에도 감동하고, 남의 말에 상처도 잘 받지만 그만큼 마음이 순수하다는 뜻이에요.\n차가운 세상에서 다정함을 잃지 않는 것, 그건 정말 대단한 용기랍니다.\n\n[왜 이 결과가 나왔을까?]\n코케트는 당신의 사랑스러움을 극대화하는 무기예요.\n리본, 핑크, 레이스... 이런 것들은 당신을 무해하고 지켜주고 싶은 존재로 보이게 하죠.\n"나를 사랑해줘"라고 말하는 대신, 존재 자체로 사랑받기를 선택한 당신. 삭막한 세상엔 당신 같은 로맨티스트가 꼭 필요해요.`,
        description_zh: `[性格分析]\n你拥有满满的爱。\n你会为小事感动，也会因拒绝而深受伤害。\n但在坚硬的世界里保持柔软，是勇敢，而不是软弱。\n\n[为什么是这个结果？]\nCoquette 是你获得爱的方式。\n蝴蝶结和粉色不仅仅是可爱，它们让你看起来无害又甜美。\n你选择通过变得惹人怜爱来生存。说实话？这招很管用。`,
        description_ja: `【性格分析】\nあなたは溢れるほどの愛を持っています。\n些細なことに感動し、拒絶されると深く傷つきます。\nしかし、厳しい世界で柔らかいままでいることは、弱さではなく勇気です。\n\n[なぜこの結果なのか？]\nCoquetteは、あなたが愛されるための方法です。\nリボンやピンクは単に可愛いだけでなく、あなたを無害で愛らしく見せます。\n愛らしくあることで生き残ることを選んだあなた。正直、その戦略は効果的です。`,
        keywords: ['Romance', 'Affection', 'Softness', 'Desire', 'Charm'],
        keywords_ko: ['로맨스', '애정', '부드러움', '욕망', '매력'],
        keywords_zh: ['浪漫', '深情', '柔软', '渴望', '魅力'],
        keywords_ja: ['ロマンス', '愛情', '柔らかさ', '欲望', '魅力'],
        brandMatches: ['Miu Miu', 'Selkie', 'Dior'],
        colorPalette: ['#FFC1CC', '#FFFFFF', '#FFB7C5'],
        image: '/images/aesthetics/coquette.webp',
        targetTraits: { openness: 0, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 2 }
    }
};

export interface Question {
    id: number;
    text: string;
    text_ko: string;
    text_zh: string;
    text_ja: string;
    subtext?: string;
    subtext_ko?: string;
    subtext_zh?: string;
    subtext_ja?: string;
    options: {
        id: string;
        label: string;
        label_ko: string;
        label_zh: string;
        label_ja: string;
        imagePrompt: string;
        image?: string;
        scores: Partial<TraitProfile>;
    }[];
}

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "You are given a blank notebook.\nWhat is the first thing you do?",
        text_ko: "빈 노트가 주어지면 가장 먼저 하는 일은?",
        text_zh: "给你一本空白笔记本，你会做的第一件事是？",
        text_ja: "真っ白なノートを渡されました。最初に何をしますか？",
        options: [
            {
                id: 'A',
                label: 'Create a To-Do list or Plan',
                label_ko: '계획표나 할 일\n목록을 적는다',
                label_zh: '列出待办事项或计划表',
                label_ja: 'TODOリストや計画表を作る',
                imagePrompt: 'notebook_plan',
                image: '/images/q1_hotel.webp', // reusing valid image paths for now
                scores: { conscientiousness: 2, openness: -1 }
            },
            {
                id: 'B',
                label: 'Doodle abstract shapes',
                label_ko: '추상적인 낙서나\n그림을 그린다',
                label_zh: '随意涂鸦抽象的形状',
                label_ja: '抽象的な落書きをする',
                imagePrompt: 'notebook_doodle',
                image: '/images/q1_library.webp',
                scores: { openness: 2, conscientiousness: -1 }
            },
            {
                id: 'C',
                label: 'Write a diary entry about feelings',
                label_ko: '오늘의 기분이나\n일기를 쓴다',
                label_zh: '写下今天的感受或日记',
                label_ja: '今日の気分や日記を書く',
                imagePrompt: 'notebook_diary',
                image: '/images/q1_picnic.webp',
                scores: { neuroticism: 1, agreeableness: 1 }
            },
            {
                id: 'D',
                label: 'Pass it to a friend to write together',
                label_ko: '친구에게 보여주며\n같이 쓴다',
                label_zh: '递给朋友一起写',
                label_ja: '友達に見せて一緒に書く',
                imagePrompt: 'notebook_share',
                image: '/images/q1_neon.webp',
                scores: { extraversion: 2 }
            }
        ]
    },
    {
        id: 2,
        text: "A sudden change ruins your weekend plans.\nYour reaction?",
        text_ko: "주말 계획이 갑자기 완전히 망가졌을 때 반응은?",
        text_zh: "突发状况毁了你的周末计划。你的反应是？",
        text_ja: "急な出来事で週末の予定が台無しになりました。あなたの反応は？",
        options: [
            {
                id: 'A',
                label: 'Immediately make a new Plan B',
                label_ko: '즉시 플랜 B를 짠다',
                label_zh: '立即制定B计划',
                label_ja: 'すぐに新しいプランBを立てる',
                imagePrompt: 'plan_b',
                image: '/images/q5_organize.webp',
                scores: { conscientiousness: 2, neuroticism: -1 }
            },
            {
                id: 'B',
                label: 'Feel overwhelmed and anxious',
                label_ko: '너무 막막하고\n불안해진다',
                label_zh: '感到不知所措和焦虑',
                label_ja: 'どうしようもなく不安になる',
                imagePrompt: 'anxious',
                image: '/images/q2_anxiety.webp',
                scores: { neuroticism: 2 }
            },
            {
                id: 'C',
                label: 'Call friends to complain/hang out',
                label_ko: '친구에게 전화해서\n하소연한다',
                label_zh: '打电话给朋友吐槽或约出来',
                label_ja: '友達に電話して愚痴るか遊ぶ',
                imagePrompt: 'call_friend',
                image: '/images/q9_friend_cool.webp',
                scores: { extraversion: 2, agreeableness: 1 }
            },
            {
                id: 'D',
                label: 'Just go with the flow, maybe sleep',
                label_ko: '그냥 흐름에\n맡기고 쉰다',
                label_zh: '顺其自然，也许睡个觉',
                label_ja: '流れに身を任せて休む',
                imagePrompt: 'relax',
                image: '/images/q5_daydream.webp',
                scores: { conscientiousness: -1, neuroticism: -1 }
            }
        ]
    },
    {
        id: 3,
        text: "At a party crowded with strangers.\nHow do you act?",
        text_ko: "낯선 사람 가득한 파티장, 당신은?",
        text_zh: "在挤满陌生人的聚会上，你会...",
        text_ja: "知らない人でいっぱいのパーティー会場、あなたは...",
        options: [
            {
                id: 'A',
                label: 'In the center, energizing everyone',
                label_ko: '중심에서 분위기를\n주도한다',
                label_zh: '在中心带动全场气氛',
                label_ja: '中心で雰囲気を盛り上げる',
                imagePrompt: 'party_center',
                image: '/images/q4_adored.webp',
                scores: { extraversion: 2, openness: 1 }
            },
            {
                id: 'B',
                label: 'Finding one person to have a deep talk',
                label_ko: '한 사람을 붙잡고\n깊은 대화를 나눈다',
                label_zh: '找一个人进行深度交谈',
                label_ja: '一人を見つけて深い話をする',
                imagePrompt: 'deep_talk',
                image: '/images/q3_serious.webp',
                scores: { extraversion: -1, openness: 1 }
            },
            {
                id: 'C',
                label: 'Observing people from a corner',
                label_ko: '구석에서 사람들을\n관찰한다',
                label_zh: '在角落观察人群',
                label_ja: '隅で人々を観察する',
                imagePrompt: 'observe',
                image: '/images/q1_library.webp',
                scores: { extraversion: -2, conscientiousness: 1 }
            },
            {
                id: 'D',
                label: 'Planning my escape home',
                label_ko: '집에 언제 갈지\n탈출 계획을 세운다',
                label_zh: '策划逃跑回家的路线',
                label_ja: 'いつ帰れるか脱出計画を練る',
                imagePrompt: 'escape',
                image: '/images/q5_retreat.webp',
                scores: { extraversion: -2, neuroticism: 1 }
            }
        ]
    },
    {
        id: 4,
        text: "What drives your clothing choice today?",
        text_ko: "오늘 입을 옷을 고르는 핵심 기준은?",
        text_zh: "今天选衣服的标准是？",
        text_ja: "今日の服を選ぶ基準は？",
        options: [
            {
                id: 'A',
                label: 'Self-expression & Uniqueness',
                label_ko: '나만의 개성과\n독특함',
                label_zh: '自我表达与独特性',
                label_ja: '自分らしさとユニークさ',
                imagePrompt: 'fashion_unique',
                image: '/images/q8_wardrobe_bold.webp',
                scores: { openness: 2, conscientiousness: -1 }
            },
            {
                id: 'B',
                label: 'Appropriateness & Cleanliness',
                label_ko: '상황에 맞고\n단정한지',
                label_zh: '得体与整洁',
                label_ja: 'TPOに合っていて清潔か',
                imagePrompt: 'fashion_clean',
                image: '/images/q8_wardrobe_neutral.webp',
                scores: { conscientiousness: 2, openness: -1 }
            },
            {
                id: 'C',
                label: 'Comfort & Soft fabrics',
                label_ko: '편안함과\n부드러운 촉감',
                label_zh: '舒适与柔软的面料',
                label_ja: '快適さと肌触りの良さ',
                imagePrompt: 'fashion_comfort',
                image: '/images/q8_wardrobe_cozy.webp',
                scores: { agreeableness: 1, neuroticism: 1 }
            },
            {
                id: 'D',
                label: 'Does it make me look powerful?',
                label_ko: '나를 강해 보이게\n하는가?',
                label_zh: '能让我看起来很强势吗？',
                label_ja: '自分を強く見せてくれるか？',
                imagePrompt: 'fashion_power',
                image: '/images/q8_wardrobe_vintage.webp',
                scores: { agreeableness: -2, extraversion: 1 }
            }
        ]
    },
    {
        id: 5,
        text: "You see someone crying on the street.\nHow do you react?",
        text_ko: "길에서 우는 사람을 봤을 때 드는 감정은?",
        text_zh: "看到有人在街上哭泣。你的感受是...",
        text_ja: "道端で誰かが泣いているのを見ました。あなたの感情は...",
        options: [
            {
                id: 'A',
                label: 'My heart breaks immediately',
                label_ko: '가슴이 즉시\n미어지고 아프다',
                label_zh: '立刻感到心碎难过',
                label_ja: '胸がすぐに張り裂けそうになる',
                imagePrompt: 'crying_empathy',
                image: '/images/q7_understood.webp',
                scores: { agreeableness: 2, neuroticism: 1 }
            },
            {
                id: 'B',
                label: 'Awkward, I avoid eye contact',
                label_ko: '어색해서\n시선을 피한다',
                label_zh: '尴尬，避开眼神接触',
                label_ja: '気まずくて視線を逸らす',
                imagePrompt: 'crying_avoid',
                image: '/images/q4_fear.webp',
                scores: { agreeableness: -1, extraversion: -1 }
            },
            {
                id: 'C',
                label: 'I wonder logically why they are crying',
                label_ko: '왜 우는지\n논리적으로 궁금하다',
                label_zh: '逻辑上好奇他们为什么哭',
                label_ja: 'なぜ泣いているのか論理的に気になる',
                imagePrompt: 'crying_logic',
                image: '/images/q3_ordinary.webp',
                scores: { agreeableness: -1, conscientiousness: 1 }
            },
            {
                id: 'D',
                label: 'I want to intervene and help',
                label_ko: '다가가서\n도와주고 싶다',
                label_zh: '想要上前帮忙',
                label_ja: '近づいて助けたい',
                imagePrompt: 'crying_help',
                image: '/images/q9_friend_comforting.webp',
                scores: { agreeableness: 2, extraversion: 1 }
            }
        ]
    },
    {
        id: 6,
        text: "A project you worked on is criticized.\nWhat is your first instinct?",
        text_ko: "열심히 한 프로젝트가 비판받았을 때?",
        text_zh: "你努力做的项目受到了批评。",
        text_ja: "一生懸命やったプロジェクトが批判されました。",
        options: [
            {
                id: 'A',
                label: 'I defend my vision aggressively',
                label_ko: '나의 비전을\n공격적으로 방어한다',
                label_zh: '极力为自己的想法辩护',
                label_ja: '自分のビジョンを攻撃的に守る',
                imagePrompt: 'criticism_defend',
                image: '/images/q5_burn.webp',
                scores: { agreeableness: -2, extraversion: 1 }
            },
            {
                id: 'B',
                label: 'I analyze the feedback to improve',
                label_ko: '피드백을 분석해\n개선점을 찾는다',
                label_zh: '分析反馈以寻求改进',
                label_ja: 'フィードバックを分析して改善点を探す',
                imagePrompt: 'criticism_analyze',
                image: '/images/q1_hotel.webp',
                scores: { conscientiousness: 2, neuroticism: -1 }
            },
            {
                id: 'C',
                label: 'I feel like a total failure',
                label_ko: '완전한 실패자가\n된 기분이다',
                label_zh: '感觉自己是个彻底的失败者',
                label_ja: '完全な敗北者になった気分だ',
                imagePrompt: 'criticism_fail',
                image: '/images/q3_mess.webp',
                scores: { neuroticism: 3 }
            },
            {
                id: 'D',
                label: 'I shrug it off; haters gonna hate',
                label_ko: '신경 안 쓴다.\n싫어할 사람은 하겠지',
                label_zh: '耸耸肩，毫不在意',
                label_ja: '気にしない。嫌う人は嫌うものだ',
                imagePrompt: 'criticism_ignore',
                image: '/images/q9_friend_cool.webp',
                scores: { neuroticism: -2, openness: 1 }
            }
        ]
    },
    {
        id: 7,
        text: "What describes the usual state of your room?",
        text_ko: "평소 당신의 방 상태는?",
        text_zh: "你的房间通常是...",
        text_ja: "あなたの部屋の状態は通常...",
        options: [
            {
                id: 'A',
                label: 'Immaculate, everything has a place',
                label_ko: '먼지 한 점 없이\n모든 게 제자리에',
                label_zh: '一尘不染，井井有条',
                label_ja: '塵一つなく、すべてが定位置に',
                imagePrompt: 'room_clean',
                image: '/images/q5_organize.webp',
                scores: { conscientiousness: 3 }
            },
            {
                id: 'B',
                label: 'Organized chaos (I know where things are)',
                label_ko: '나만 아는 질서\n(어지럽혀져 있음)',
                label_zh: '乱中有序（只有我知道东西在哪）',
                label_ja: '自分だけの秩序（散らかっている）',
                imagePrompt: 'room_chaos',
                image: '/images/q2_overthinking.webp',
                scores: { conscientiousness: -1, openness: 1 }
            },
            {
                id: 'C',
                label: 'Filled with sentimental objects',
                label_ko: '추억이 담긴\n물건들로 가득함',
                label_zh: '充满情感纪念品',
                label_ja: '思い出の品でいっぱい',
                imagePrompt: 'room_sentimental',
                image: '/images/q8_wardrobe_vintage.webp',
                scores: { openness: 1, agreeableness: 1 }
            },
            {
                id: 'D',
                label: 'Minimalist, barely anything',
                label_ko: '미니멀리스트,\n물건이 거의 없음',
                label_zh: '极简主义，几乎没什么东西',
                label_ja: 'ミニマリスト、物がほとんどない',
                imagePrompt: 'room_minimal',
                image: '/images/q1_hotel.webp',
                scores: { conscientiousness: 1, openness: -1 }
            }
        ]
    },
    {
        id: 8,
        text: "In a group project,\nwhat role do you usually take?",
        text_ko: "팀 프로젝트에서 나의 주된 역할은?",
        text_zh: "在这队项目中，你自然而然会成为...",
        text_ja: "チームプロジェクトで、あなたは自然と...",
        options: [
            {
                id: 'A',
                label: 'The Leader/Director',
                label_ko: '리더 / 감독',
                label_zh: '领导者 / 导演',
                label_ja: 'リーダー / 監督',
                imagePrompt: 'role_leader',
                image: '/images/q9_friend_disciplined.webp',
                scores: { extraversion: 2, conscientiousness: 1 }
            },
            {
                id: 'B',
                label: 'The Peacemaker/Mediator',
                label_ko: '중재자 / 분위기 메이커',
                label_zh: '调解者 / 氛围组',
                label_ja: '仲裁者 / ムードメーカー',
                imagePrompt: 'role_peace',
                image: '/images/q9_friend_comforting.webp',
                scores: { agreeableness: 3 }
            },
            {
                id: 'C',
                label: 'The Creative/Idea Generator',
                label_ko: '아이디어 뱅크',
                label_zh: '创意生成器',
                label_ja: 'アイデアバンク',
                imagePrompt: 'role_idea',
                image: '/images/q9_friend_eccentric.webp',
                scores: { openness: 3 }
            },
            {
                id: 'D',
                label: 'The Critic/Editor',
                label_ko: '비평가 / 검수자',
                label_zh: '批评家 / 编辑',
                label_ja: '批評家 / チェッカー',
                imagePrompt: 'role_critic',
                image: '/images/q9_friend_cool.webp',
                scores: { agreeableness: -1, conscientiousness: 2 }
            }
        ]
    },
    {
        id: 9,
        text: "What is your relationship with 'Fantasy'?",
        text_ko: "'공상'과 '상상'은 당신에게 어떤 의미?",
        text_zh: "‘幻想’对你来说意味着什么？",
        text_ja: "あなたにとって「空想」や「想像」とは？",
        options: [
            {
                id: 'A',
                label: 'I live there. Reality is boring.',
                label_ko: '나는 그곳에 산다.\n현실은 지루하다.',
                label_zh: '我住在那里。现实太无聊了。',
                label_ja: '私はそこに住んでいる。現実は退屈だ。',
                imagePrompt: 'fantasy_live',
                image: '/images/q1_library.webp',
                scores: { openness: 3, neuroticism: 1 }
            },
            {
                id: 'B',
                label: 'A waste of time. Focus on facts.',
                label_ko: '시간 낭비다.\n팩트에 집중해야 한다.',
                label_zh: '浪费时间。专注于事实。',
                label_ja: '時間の無駄。事実に集中すべき。',
                imagePrompt: 'fantasy_waste',
                image: '/images/q6_morning.webp',
                scores: { openness: -2, conscientiousness: 2 }
            },
            {
                id: 'C',
                label: 'A useful tool for solving problems',
                label_ko: '문제 해결을 위한\n유용한 도구',
                label_zh: '解决问题的有用工具',
                label_ja: '問題解決のための有用なツール',
                imagePrompt: 'fantasy_tool',
                image: '/images/q6_midnight.webp',
                scores: { openness: 1, conscientiousness: 1 }
            },
            {
                id: 'D',
                label: 'I scare myself with dark thoughts',
                label_ko: '가끔 어두운 상상으로\n스스로를 겁준다',
                label_zh: '经常用黑暗的想法吓自己',
                label_ja: '時々暗い想像で自分を怖がらせる',
                imagePrompt: 'fantasy_dark',
                image: '/images/q2_overthinking.webp',
                scores: { neuroticism: 2, openness: 1 }
            }
        ]
    }
];

export function calculateResult(answers: string[]): Aesthetic {
    // 1. Initialize User Profile
    const userProfile: TraitProfile = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };

    // 2. Sum up scores from answers
    answers.forEach((answerId, questionIndex) => {
        const question = QUESTIONS[questionIndex];
        if (!question) return;
        const option = question.options.find(o => o.id === answerId);
        if (!option) return;

        // Add scores
        if (option.scores.openness) userProfile.openness += option.scores.openness;
        if (option.scores.conscientiousness) userProfile.conscientiousness += option.scores.conscientiousness;
        if (option.scores.extraversion) userProfile.extraversion += option.scores.extraversion;
        if (option.scores.agreeableness) userProfile.agreeableness += option.scores.agreeableness;
        if (option.scores.neuroticism) userProfile.neuroticism += option.scores.neuroticism;
    });

    // 3. Normalize User Profile (optional, but good if questions vary in weight)
    // For now we just use raw sums as vectors.

    // 4. Find closest Aesthetic using Euclidean Distance
    let bestMatchId: AestheticId = 'clean_girl';
    let minDistance = Infinity;

    Object.values(AESTHETICS).forEach((aesthetic) => {
        const target = aesthetic.targetTraits;

        // Calculate Euclidean Distance
        // Scale factors can be adjusted if we want to weight certain traits higher
        const distance = Math.sqrt(
            Math.pow(userProfile.openness - target.openness, 2) +
            Math.pow(userProfile.conscientiousness - target.conscientiousness, 2) +
            Math.pow(userProfile.extraversion - target.extraversion, 2) +
            Math.pow(userProfile.agreeableness - target.agreeableness, 2) +
            Math.pow(userProfile.neuroticism - target.neuroticism, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            bestMatchId = aesthetic.id;
        }
    });

    return AESTHETICS[bestMatchId];
}
