export type AestheticId =
    | 'whimsigoth'
    | 'clean_girl'
    | 'y2k'
    | 'dark_academia'
    | 'cottagecore'
    | 'cyberpunk'
    | 'old_money'
    | 'coquette';

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
}

export const AESTHETICS: Record<AestheticId, Aesthetic> = {
    whimsigoth: {
        id: 'whimsigoth',
        title: 'Whimsigoth',
        title_ko: '윌지가스',
        title_zh: 'Whimsigoth',
        title_ja: 'Whimsigoth',
        archetype: 'The Boundary Keeper',
        archetype_ko: '경계선의 감시자',
        archetype_zh: '边界守护者',
        archetype_ja: '境界の守護者',
        description: `Whimsigoth is the style for those who love the mystical atmosphere of the moon, tarot, and magic.\n\nPeople find you mysterious and inexplicably drawn to you. You were born with more sensitive senses than others, preferring deep conversations over shallow socializing.\n\nYour attraction to the mystical is because you want to protect your own precious world that no one else can intrude upon.`,
        description_ko: `윌지가스는 달, 타로, 마법 같은 신비로운 분위기를 사랑하는 당신의 스타일입니다.\n\n사람들은 당신을 신비롭고 왠지 모르게 끌리는 사람이라고 느낍니다. 남들보다 예민한 감각을 타고났고, 시끄러운 인간관계보다는 깊이 있는 대화를 선호하시죠.\n\n신비로운 것에 끌리는 건, 누구도 함부로 침범할 수 없는 당신만의 소중한 세계를 지키고 싶기 때문일 거예요.`,
        description_zh: `在别人眼里，你神秘且难以捉摸。你对神秘事物的向往，其实是一种保护色，用来隔绝那个让你感到疲惫的外部世界。这种暗黑美学是你心灵的避难所。\n\n人们觉得你自带神秘气场，令人不由自主地想要靠近。你天生感知力敏锐，比起喧闹的社交，更偏爱深度的灵魂对话。\n\n你之所以迷恋神秘，是因为你想守护那个只有你才能进入的珍贵内心世界。`,
        description_ja: `周囲はあなたを神秘的で、どこか近寄りがたい存在だと感じています。あなたが神秘的なものに惹かれるのは、あなたを疲れさせる世界から自分自身を守るため。このダークな美学は、あなたの聖域なのです。\n\n人々はあなたをミステリアスで魅力的な人だと思っています。あなたは人一倍繊細な感覚を持っており、騒がしい人間関係よりも深い対話を好みます。\n\n神秘的なものに惹かれるのは、誰にも踏み込ませないあなただけの大切な世界を守りたいからでしょう。`,
        keywords: ['Mystery', 'Intuition', 'Moon', 'Magic', 'Night'],
        keywords_ko: ['신비', '직감', '달', '마법', '밤'],
        keywords_zh: ['神秘', '直觉', '月亮', '魔法', '黑夜'],
        keywords_ja: ['神秘', '直感', '月', '魔法', '夜'],
        brandMatches: ['Anna Sui', 'Free People', 'Lush'],
        colorPalette: ['#2E1A47', '#D4AF37', '#1A1A1C'],
        image: '/images/aesthetics/whimsigoth.webp'
    },
    clean_girl: {
        id: 'clean_girl',
        title: 'Clean Girl',
        title_ko: '클린걸',
        title_zh: 'Clean Girl',
        title_ja: 'Clean Girl',
        archetype: 'The Perfectionist',
        archetype_ko: '완벽한 통제자',
        archetype_zh: '完美主义者',
        archetype_ja: '完璧主義者',
        description: `Clean Girl is the style for those who value minimalist moods and self-care routines.\n\nYou find true beauty in simplicity rather than complexity, and you feel peace of mind in well-organized environments. You appear effortlessly perfect, but you're actually someone who carefully plans everything.\n\nYou are someone who maintains inner peace by focusing on what you can control.`,
        description_ko: `클린걸은 미니멀한 무드와 자기관리 루틴을 중요하게 생각하는 당신의 스타일입니다.\n\n당신은 복잡한 것보다 단순한 것에서 진정한 아름다움을 찾고, 잘 정돈된 환경에서 마음의 평화를 느끼는 분이에요. 겉보기엔 힘들이지 않고 완벽해 보이지만, 사실 모든 것을 세심하게 계획하는 노력파이시죠.\n\n통제할 수 있는 것들에 집중하며 내면의 평온을 지켜내는 사람, 그게 바로 당신입니다.`,
        description_zh: `你看起来总是那么精致、井井有条，毫不费力。但事实上，你害怕被人看到狼狈的一面。你的极简主义，其实是为了掌控生活中那些你能掌控的部分。\n\n你在简单中寻找真正的美，在整洁的环境中感受内心的平静。表面上云淡风轻，实则是精心规划的努力家。\n\n你通过专注于可控的事物来维持内心的秩序与安宁。`,
        description_ja: `あなたはいつも自然体で整っているように見えます。しかし、実は「だらしない」と思われることを何より恐れています。あなたのミニマリズムは、自分にコントロールできる範囲を守るための手段なのです。\n\nあなたは複雑さよりも単純さの中に真の美しさを見出し、整頓された環境に心の平穏を感じます。一見、努力していないように見えて、実はすべてを念入りに計画する努力家です。\n\nコントロールできることに集中し、内なる平穏を守り抜く人、それがあなたです。`,
        keywords: ['Control', 'Order', 'Calm', 'Glow', 'Minimal'],
        keywords_ko: ['통제', '질서', '평온', '윤광', '미니멀'],
        keywords_zh: ['掌控', '秩序', '平静', '水光肌', '极简'],
        keywords_ja: ['統制', '秩序', '平穏', 'ツヤ肌', 'ミニマル'],
        brandMatches: ['Rhode', 'Alo Yoga', 'Dyson'],
        colorPalette: ['#F5F5F0', '#E3E3E3', '#6B705C'],
        image: '/images/aesthetics/clean_girl.webp'
    },
    y2k: {
        id: 'y2k',
        title: 'Y2K',
        title_ko: 'Y2K',
        title_zh: 'Y2K',
        title_ja: 'Y2K',
        archetype: 'The Radiant Optimist',
        archetype_ko: '빛나는 희망주의자',
        archetype_zh: '闪耀的乐观主义者',
        archetype_ja: '輝く楽天家',
        description: `Y2K is the style that captures the excitement and anticipation of the early 2000s. Pink, silver, and sparkly materials express you best.\n\nEven in a gloomy world, you somehow find ways to seek fun and joy, don't you? Your bright energy has the power to light up everyone around you.\n\nYour charm lies in the lovable courage to choose joy in your own way, rather than following the world's standards.`,
        description_ko: `Y2K는 2000년대 초반의 설렘과 기대감을 간직한 당신의 스타일입니다. \n        핑크, 실버, 반짝이는 소재들이 당신을 가장 잘 표현하죠.\n\n혹시 우울한 세상 속에서도 어떻게든 재미와 기쁨을 찾으려 노력하시나요? 당신의 밝은 에너지는 주변 사람들까지 환하게 밝혀주는 힘이 있습니다.\n\n세상의 기준보다는 자신만의 방식으로 즐거움을 선택할 줄 아는 용기 있는 사랑스러움이 당신의 매력입니다.`,
        description_zh: `你是大家的开心果，总是让气氛轻松愉快。你之所以被 Y2K 吸引，是因为它代表着希望——那个相信未来会充满刺激与精彩的年代。\n\n无论世界多么令人沮丧，你总能找到乐趣。你的正能量有着照亮周围人的魔力。\n\n不顾世俗眼光，勇敢选择快乐，这正是你可爱迷人的地方。`,
        description_ja: `あなたはいつも場を明るくするムードメーカー。あなたがY2Kに惹かれるのは、それが「希望」を象徴しているから。未来はワクワクする場所だと信じていたあの頃のように。\n\n憂鬱な世界の中でも、なんとか楽しみや喜びを見つけようとしていませんか？あなたの明るいエネルギーは、周りの人々まで照らす力を持っています。\n\n世間の基準より自分なりのとめきを選ぶ、その勇敢な愛らしさがあなたの魅力です。`,
        keywords: ['Hope', 'Fun', 'Pink', 'Bling', 'Cyber'],
        keywords_ko: ['희망', '재미', '핑크', '블링', '사이버'],
        keywords_zh: ['希望', '乐趣', '粉色', '闪亮', '赛博'],
        keywords_ja: ['希望', '楽しい', 'ピンク', 'キラキラ', 'サイバー'],
        brandMatches: ['Diesel', 'Blumarine', 'Gentle Monster'],
        colorPalette: ['#FF69B4', '#00FFFF', '#C0C0C0'],
        image: '/images/aesthetics/y2k.webp'
    },
    dark_academia: {
        id: 'dark_academia',
        title: 'Dark Academia',
        title_ko: '다크 아카데미아',
        title_zh: 'Dark Academia',
        title_ja: 'Dark Academia',
        archetype: 'The Lonely Observer',
        archetype_ko: '고독한 관찰자',
        archetype_zh: '孤独的观察者',
        archetype_ja: '孤独な観察者',
        description: `Dark Academia is the style for those who love old libraries, the sound of rain, and deep contemplation.\n\nYou have deep thoughts and a rich inner world. You desire meaningful conversations rather than small talk, and you value deep connections over superficial relationships.\n\nOthers might say you "think too much," but that delicate sensibility is your most beautiful gift.`,
        description_ko: `다크 아카데미아는 오래된 도서관, 타닥거리는 빗소리, 깊은 사색을 사랑하는 당신의 스타일입니다.\n\n당신은 생각이 깊고 풍부한 내면을 가진 분이시군요. 가벼운 수다보다는 의미 있는 대화를 원하고, 피상적인 관계보다는 깊이 있는 연결을 소중히 여깁니다.\n\n남들이 "너무 생각이 많다"고 할 수도 있겠지만, 그 섬세한 감수성이야말로 당신이 가진 가장 아름다운 재능입니다.`,
        description_zh: `你是一个深沉的人。人们尊重你的思想，但觉得你难以亲近。你将忧郁浪漫化，因为比起直面内心的悲伤，沉浸在忧郁的美感中让你感到更安全。\n\n你拥有深邃而丰富的内心世界。比起闲聊，你渴望有深度的对谈；比起泛泛之交，你更珍视深刻的连结。\n\n虽然别人可能会说你“想太多”，但这种细腻的感受力，正是你最美的天赋。`,
        description_ja: `あなたは思慮深く、深みのある人です。人々はあなたの考えを尊重していますが、近づきがたいとも感じています。あなたが憂鬱をロマンチックに捉えるのは、自分自身の本当の悲しみと向き合うよりも、その方が安全だと感じるからです。\n\n古い図書館、雨音、深い思索。あなたは軽薄な雑談よりも意味のある対話を望み、表面的な関係よりも深い繋がりを大切にします。\n\n「考えすぎだ」と言われることもあるかもしれませんが、その繊細な感受性こそが、あなたの持つ最も美しい才能です。`,
        keywords: ['Depth', 'Poetry', 'Rain', 'Books', 'Coffee'],
        keywords_ko: ['깊이', '시', '비', '책', '커피'],
        keywords_zh: ['深度', '诗歌', '雨', '书籍', '咖啡'],
        keywords_ja: ['深み', '詩', '雨', '本', 'コーヒー'],
        brandMatches: ['Ralph Lauren', 'Moleskine', 'Burberry'],
        colorPalette: ['#3E2723', '#1C1C1C', '#A1887F'],
        image: '/images/aesthetics/dark_academia.webp'
    },
    cottagecore: {
        id: 'cottagecore',
        title: 'Cottagecore',
        title_ko: '코티지코어',
        title_zh: 'Cottagecore',
        title_ja: 'Cottagecore',
        archetype: 'The Warm Healer',
        archetype_ko: '따뜻한 치유자',
        archetype_zh: '温暖的治愈者',
        archetype_ja: '温かい癒し手',
        description: `Cottagecore is the style for those who long for warm sunlight, nature's peace, and a simple life.\n\nPeople feel at ease around you. You may be a bit tired from this competitive, fast-paced world.\n\n"It's okay to stop and rest sometimes" - you are the warm healer who can say this to yourself and to others.`,
        description_ko: `코티지코어는 따스한 햇살, 자연의 평화, 소박한 삶을 동경하는 당신의 스타일입니다.\n\n사람들은 당신 곁에 있으면 마음이 편안해진다고 말할 거예요. 경쟁적이고 빠르게 돌아가는 세상 속에서 조금 지치셨을지도 모르겠네요.\n\n"가끔은 멈춰 서서 쉬어가도 괜찮아"라고 스스로에게, 그리고 타인에게 말해줄 수 있는 따뜻한 치유자가 바로 당신입니다.`,
        description_zh: `你是温柔的那一个。在你身边，人们感到安全。你对简单生活的向往并非仅仅因为“可爱”——那是你对这个不断要求效率的世界发出的无声抗议，你在呐喊着想要休息。\n\n你向往阳光、自然和平静。在这个充满竞争的快节奏世界里，你可能感到有些疲惫。\n\n“偶尔停下来休息也没关系”，你是那个能对自己、也能对他人说出这句温暖话语的治愈者。`,
        description_ja: `あなたは穏やかな人です。人々はあなたのそばにいると安心します。あなたがシンプルな生活を愛するのは、単に「可愛いから」ではありません。常に生産性を求められる世界からの、休息を求める叫びなのです。\n\n温かい日差し、自然の安らぎ、素朴な暮らし。競争社会に少し疲れているのかもしれませんね。\n\n「たまには立ち止まって休んでもいいんだよ」と、自分自身にも、他人にも優しく言ってあげられる、温かい癒し手があなたです。`,
        keywords: ['Rest', 'Nature', 'Slow', 'Gentle', 'Warm'],
        keywords_ko: ['휴식', '자연', '느림', '다정함', '따뜻함'],
        keywords_zh: ['休息', '自然', '慢生活', '温柔', '温暖'],
        keywords_ja: ['休息', '自然', 'スロー', '優しさ', '温もり'],
        brandMatches: ['LoveShackFancy', 'Le Creuset', 'Cath Kidston'],
        colorPalette: ['#7BA05B', '#FADADD', '#FFF8E7'],
        image: '/images/aesthetics/cottagecore.webp'
    },
    cyberpunk: {
        id: 'cyberpunk',
        title: 'Cyberpunk',
        title_ko: '사이버펑크',
        title_zh: 'Cyberpunk',
        title_ja: 'Cyberpunk',
        archetype: 'The System Rebel',
        archetype_ko: '시스템의 반역자',
        archetype_zh: '系统的反叛者',
        archetype_ja: 'システムの反逆者',
        description: `Cyberpunk is the style for those who love neon signs, futuristic vibes, and the freedom of breaking boundaries.\n\nYou have a straightforward heart that doesn't compromise with unreasonable rules or hypocritical authority. You believe living by your own convictions is more important than what others think.\n\nYour courage to say "I'll live my way" even when pressured to "live like everyone else" is truly admirable.`,
        description_ko: `사이버펑크는 네온 사인, 미래적인 분위기, 틀을 깨는 자유로움을 사랑하는 당신의 스타일입니다.\n\n당신은 불합리한 규칙이나 위선적인 권위에 타협하지 않는 곧은 마음을 가졌습니다. 남들의 시선보다는 자신의 소신대로 사는 것이 가장 중요하다고 생각하시죠.\n\n"남들처럼 살아"라는 압박 속에서도 "나는 나대로 살 거야"라고 당당히 말할 줄 아는 당신의 용기는 정말 멋집니다.`,
        description_zh: `你是那个看透虚伪的叛逆者。你被混乱吸引，并非为了标新立异，而是因为所谓的“秩序”常常让你感觉像是冷漠者制造的牢笼。\n\n霓虹灯、未来感、打破常规。你不愿向不合理的规则妥协。对你来说，按照自己的信念生活远比迎合他人的目光重要。\n\n在“随大流”的压力下，依然敢于大声说出“我要做自己”，你的这份勇气令人钦佩。`,
        description_ja: `あなたは虚飾を見抜く反逆者です。あなたが混沌（カオス）に惹かれるのは、単に尖っていたいからではありません。既存の「秩序」が、冷淡な人々によって作られた檻のように感じられるからです。\n\nネオンサイン、近未来的、そして型破りな自由。あなたは不合理なルールや偽善に妥協しない真っ直ぐな心を持っています。\n\n「人と同じように生きろ」という圧力の中でも、「私は私らしく生きる」と堂々と言えるあなたの勇気は本当に素晴らしいです。`,
        keywords: ['Rebellion', 'Freedom', 'Neon', 'Night', 'Glitch'],
        keywords_ko: ['반항', '자유', '네온', '밤', '글리치'],
        keywords_zh: ['叛逆', '自由', '霓虹', '黑夜', '故障风'],
        keywords_ja: ['反逆', '自由', 'ネオン', '夜', 'グリッチ'],
        brandMatches: ['Acronym', 'Razer', 'Balenciaga'],
        colorPalette: ['#00FF41', '#FF00FF', '#0D0D0D'],
        image: '/images/aesthetics/cyberpunk.webp'
    },
    old_money: {
        id: 'old_money',
        title: 'Old Money',
        title_ko: '올드머니',
        title_zh: 'Old Money',
        title_ja: 'Old Money',
        archetype: 'The Silent Aristocrat',
        archetype_ko: '침묵하는 귀족',
        archetype_zh: '沉默的贵族',
        archetype_ja: '沈黙の貴族',
        description: `Old Money is the style for those who pursue timeless classics and quiet luxury.\n\nYou have natural discernment and elegance. Without needing to dress flashy or show off, your aura naturally shines through.\n\nBecause you know your own value better than anyone, you don't need to desperately prove yourself to the world - that ease is your greatest charm.`,
        description_ko: `올드머니는 유행을 타지 않는 클래식함과 조용한 고급스러움을 추구하는 당신의 스타일입니다.\n\n당신은 타고난 안목과 기품이 있는 분이시네요. 굳이 화려하게 꾸미거나 과시하지 않아도, 당신만의 아우라는 자연스럽게 빛이 납니다.\n\n자신의 가치를 누구보다 잘 알기에, 굳이 세상에 증명하려 애쓸 필요가 없다는 여유로움이 당신의 가장 큰 매력입니다.`,
        description_zh: `你拥有与生俱来的优雅。品质本身就是最好的证明。你对低调奢华的向往，源于对生活的掌控感——大声喧哗的炫耀在你看来显得太迫切了。\n\n经典、从容、质感。你拥有极佳的品味。不需要过度的装饰或炫耀，你自带的光环自然会闪耀。\n\n因为深知自己的价值，所以无需向世界证明什么，这份从容是你最大的魅力。`,
        description_ja: `あなたには生まれつきの気品があります。品質そのものがすべてを語ります。あなたが「クワイエット・ラグジュアリー」に惹かれるのは、コントロールへの欲求からです。派手な誇示は、必死さの現れだと感じるのでしょう。\n\n流行に左右されないクラシックさと、静かな高級感。あなたは本質を見抜く目を持っています。派手に飾らなくても、あなた自身が放つオーラは自然と輝きます。\n\n自分の価値を誰よりも理解しているからこそ、それを世間に証明しようと必死になる必要がない。その余裕こそが、あなたの最大の魅力です。`,
        keywords: ['Elegance', 'Classic', 'Quiet', 'Quality', 'Grace'],
        keywords_ko: ['우아함', '클래식', '조용함', '품격', '품위'],
        keywords_zh: ['优雅', '经典', '低调', '品质', '风度'],
        keywords_ja: ['優雅', 'クラシック', '静寂', '品質', '気品'],
        brandMatches: ['Loro Piana', 'Chanel', 'Hermes'],
        colorPalette: ['#002147', '#F5F5DC', '#FFFFFF'],
        image: '/images/aesthetics/old_money.webp'
    },
    coquette: {
        id: 'coquette',
        title: 'Coquette',
        title_ko: '코케트',
        title_zh: 'Coquette',
        title_ja: 'Coquette',
        archetype: 'The Tender Warrior',
        archetype_ko: '부드러움의 전사',
        archetype_zh: '温柔的战士',
        archetype_ja: '優しさの戦士',
        description: `Coquette is the style for those who love ribbons, lace, and soft romance.\n\nYou have a soft and kind heart. But that softness is never weakness. It's your unique strength in choosing not to lose your kindness even in a cold world.\n\nYou already know that kindness can be the most powerful force of all.`,
        description_ko: `코케트는 리본, 레이스, 부드러운 로맨틱함을 사랑하는 당신의 스타일입니다.\n\n당신은 부드럽고 다정한 마음씨를 가진 분이군요. 하지만 그 부드러움은 결코 약함이 아닙니다. 차가운 세상 속에서도 다정함을 잃지 않기로 선택한 당신만의 강인함이죠.\n\n다정함이야말로 가장 강력한 힘이 될 수 있다는 사실을 당신은 이미 알고 계시는군요.`,
        description_zh: `你是柔软的那一个。人们觉得你脆弱精致。但你对蝴蝶结的喜爱并非幼稚，而是一种策略。你早就明白，温柔甚至可以是武器。\n\n蕾丝、浪漫、少女心。你拥有一颗温柔的心。但这绝不是软弱。在冷酷的世界里选择保持温柔，这本身就是一种强大的力量。\n\n你深知，温柔有时才是最无坚不摧的力量。`,
        description_ja: `あなたは柔らかな人です。周囲はあなたを繊細だと思っています。しかし、あなたがリボンを愛するのは幼稚だからではありません。それは戦略です。あなたは「柔らかさ」が武器になることを知っているのです。\n\nリボン、レース、ロマンティック。あなたは優しい心を持っていますが、それは決して弱さではありません。冷たい世界の中でも優しさを失わないことを選んだ、あなただけの強さなのです。\n\n優しさこそが最強の力になり得ることを、あなたは既に知っているのですね。`,
        keywords: ['Soft', 'Romance', 'Ribbon', 'Pink', 'Sweet'],
        keywords_ko: ['부드러움', '로맨스', '리본', '핑크', '달콤함'],
        keywords_zh: ['柔软', '浪漫', '蝴蝶结', '粉色', '甜美'],
        keywords_ja: ['柔らかさ', 'ロマンス', 'リボン', 'ピンク', '甘美'],
        brandMatches: ['Miu Miu', 'Selkie', 'Dior'],
        colorPalette: ['#FFC1CC', '#FFFFFF', '#FFB7C5'],
        image: '/images/aesthetics/coquette.webp'
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
        scores: Partial<Record<AestheticId, number>>;
    }[];
}

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "When everything drains you, where do you escape?",
        text_ko: "모든 게 지칠 때, 어디로 도망치고 싶으세요?",
        text_zh: "当一切都让你感到疲惫时，你想逃去哪里？",
        text_ja: "すべてに疲れたとき、どこへ逃げ込みたいですか？",
        options: [
            {
                id: 'A',
                label: 'An old library no one knows',
                label_ko: '아무도 모르는 오래된 도서관',
                label_zh: '无人知晓的古老图书馆',
                label_ja: '誰も知らない古い図書館',
                imagePrompt: 'dark_library',
                image: '/images/q1_library.webp',
                scores: { dark_academia: 4, whimsigoth: 2, old_money: 1, y2k: -2, cyberpunk: -1 }
            },
            {
                id: 'B',
                label: 'A clean hotel room',
                label_ko: '깔끔한 호텔 방',
                label_zh: '一尘不染的酒店房间',
                label_ja: '清潔なホテルの部屋',
                imagePrompt: 'hotel',
                image: '/images/q1_hotel.webp',
                scores: { clean_girl: 4, old_money: 2, cyberpunk: 1, cottagecore: -2, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: 'A quiet countryside',
                label_ko: '조용한 시골',
                label_zh: '宁静的乡村',
                label_ja: '静かな田舎',
                imagePrompt: 'cottage',
                image: '/images/q1_picnic.webp',
                scores: { cottagecore: 4, coquette: 2, whimsigoth: 1, cyberpunk: -2, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'A neon city at night',
                label_ko: '밤의 네온 도시',
                label_zh: '夜晚的霓虹都市',
                label_ja: 'ネオン輝く夜の街',
                imagePrompt: 'neon_city',
                image: '/images/q1_neon.webp',
                scores: { cyberpunk: 4, y2k: 3, whimsigoth: 1, cottagecore: -2, old_money: -1 }
            }
        ]
    },
    {
        id: 2,
        text: "What do you hide from the world?",
        text_ko: "절대 들키고 싶지 않은 모습은 무엇인가요?",
        text_zh: "你向世界隐藏了什么？",
        text_ja: "世界から隠しているあなたの姿は？",
        options: [
            {
                id: 'A',
                label: 'Overthinking everything',
                label_ko: '사소한 것까지 고민하는 모습',
                label_zh: '过度思考、纠结一切',
                label_ja: '些細なことまで考えすぎる姿',
                imagePrompt: 'overthinking',
                image: '/images/q2_overthinking.webp',
                scores: { dark_academia: 3, whimsigoth: 2, clean_girl: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: 'Anxiety when things are messy',
                label_ko: '정리 안 되면 불안한 모습',
                label_zh: '面对混乱时的焦虑',
                label_ja: '散らかっていると不安になる姿',
                imagePrompt: 'anxiety',
                image: '/images/q2_anxiety.webp',
                scores: { clean_girl: 4, old_money: 2, dark_academia: 1, cyberpunk: -2 }
            },
            {
                id: 'C',
                label: 'Being exhausted from pretending',
                label_ko: '괜찮은 척하느라 지친 모습',
                label_zh: '因伪装完美而感到精疲力竭',
                label_ja: '平気なふりをして疲弊している姿',
                imagePrompt: 'exhausted',
                image: '/images/q2_exhausted.webp',
                scores: { coquette: 3, cottagecore: 2, whimsigoth: 1, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'The anger underneath',
                label_ko: '마음 깊은 곳의 분노',
                label_zh: '内心深处的愤怒',
                label_ja: '心の奥底にある怒り',
                imagePrompt: 'anger',
                image: '/images/q2_anger.webp',
                scores: { cyberpunk: 4, y2k: 2, whimsigoth: 2, coquette: -2 }
            }
        ]
    },
    {
        id: 3,
        text: "What criticism hurts you most?",
        text_ko: "가장 상처가 되는 말은 무엇인가요?",
        text_zh: "怎样的批评最让你受伤？",
        text_ja: "最も傷つく言葉は？",
        options: [
            {
                id: 'A',
                label: '"Why so serious?"',
                label_ko: '"왜 혼자 그렇게 심각해?"',
                label_zh: '"你为什么总是那么严肃？"',
                label_ja: '"なんでそんなに深刻なの？"',
                imagePrompt: 'intense',
                image: '/images/q3_serious.webp',
                scores: { dark_academia: 4, whimsigoth: 2, old_money: 2, y2k: -2 }
            },
            {
                id: 'B',
                label: '"You\'re a mess"',
                label_ko: '"정말 정리가 안 되시네요"',
                label_zh: '"你真是乱七八糟"',
                label_ja: '"本当にだらしないね"',
                imagePrompt: 'mess',
                image: '/images/q3_mess.webp',
                scores: { clean_girl: 4, old_money: 2, coquette: 1, cyberpunk: -1 }
            },
            {
                id: 'C',
                label: '"You\'re too sensitive"',
                label_ko: '"너무 예민하시네요"',
                label_zh: '"你太敏感了"',
                label_ja: '"神経質すぎるよ"',
                imagePrompt: 'sensitive',
                image: '/images/q3_sensitive.webp',
                scores: { coquette: 4, cottagecore: 2, whimsigoth: 2, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: '"You\'re not special"',
                label_ko: '"그냥 평범하시네요"',
                label_zh: '"你一点也不特别"',
                label_ja: '"君は特別じゃないよ"',
                imagePrompt: 'ordinary',
                image: '/images/q3_ordinary.webp',
                scores: { y2k: 4, cyberpunk: 2, dark_academia: 1, old_money: -2 }
            }
        ]
    },
    {
        id: 4,
        text: "Secret desire you can't admit?",
        text_ko: "창피해서 말 못 하는 욕망은 무엇인가요?",
        text_zh: "你羞于承认的秘密愿望是？",
        text_ja: "恥ずかしくて言えない秘密の願望は？",
        options: [
            {
                id: 'A',
                label: 'To seem brilliant effortlessly',
                label_ko: '노력 없이 천재로 보이기',
                label_zh: '毫不费力地看起来像个天才',
                label_ja: '努力せずに天才に見られたい',
                imagePrompt: 'brilliant',
                image: '/images/q4_brilliant.webp',
                scores: { old_money: 4, dark_academia: 3, y2k: 1, cottagecore: -1 }
            },
            {
                id: 'B',
                label: 'To be completely taken care of',
                label_ko: '완전히 보살핌받기',
                label_zh: '被完全地照顾和宠爱',
                label_ja: '誰かに完全にお世話されたい',
                imagePrompt: 'care',
                image: '/images/q4_care.webp',
                scores: { coquette: 4, cottagecore: 3, clean_girl: 1, cyberpunk: -2 }
            },
            {
                id: 'C',
                label: 'To be feared, not just respected',
                label_ko: '존경 말고 두려움 주기',
                label_zh: '让人畏惧，而不仅仅是尊敬',
                label_ja: '尊敬より、恐れられる存在になりたい',
                imagePrompt: 'fear',
                image: '/images/q4_fear.webp',
                scores: { cyberpunk: 4, whimsigoth: 3, dark_academia: 1, coquette: -2 }
            },
            {
                id: 'D',
                label: 'To be absolutely adored',
                label_ko: '완전히 숭배받기',
                label_zh: '被所有人狂热地喜爱',
                label_ja: '熱狂的に愛されたい',
                imagePrompt: 'adored',
                image: '/images/q4_adored.webp',
                scores: { y2k: 4, coquette: 2, clean_girl: 1, dark_academia: -1 }
            }
        ]
    },
    {
        id: 5,
        text: "How do you cope when powerless?",
        text_ko: "무력할 때 어떻게 버티세요?",
        text_zh: "感到无力时，你会如何应对？",
        text_ja: "無力感を感じたとき、どう対処しますか？",
        options: [
            {
                id: 'A',
                label: 'Retreat into my own world',
                label_ko: '내 세계 속으로 숨어요',
                label_zh: '躲进自己的小世界',
                label_ja: '自分の世界に引きこもる',
                imagePrompt: 'retreat',
                image: '/images/q5_retreat.webp',
                scores: { whimsigoth: 4, dark_academia: 2, cottagecore: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: 'Clean and organize',
                label_ko: '정리하고 청소해요',
                label_zh: '打扫卫生，整理房间',
                label_ja: '掃除と整理整頓する',
                imagePrompt: 'organize',
                image: '/images/q5_organize.webp',
                scores: { clean_girl: 4, old_money: 2, dark_academia: 1, cyberpunk: -1 }
            },
            {
                id: 'C',
                label: 'Daydream about simpler life',
                label_ko: '단순한 삶을 상상해요',
                label_zh: '幻想简单纯粹的生活',
                label_ja: 'シンプルな生活を夢見る',
                imagePrompt: 'daydream',
                image: '/images/q5_daydream.webp',
                scores: { cottagecore: 4, coquette: 2, whimsigoth: 1, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'Get angry and want to break things',
                label_ko: '화가 나서 다 부수고 싶어요',
                label_zh: '愤怒地想要破坏一切',
                label_ja: '怒ってすべてを壊したくなる',
                imagePrompt: 'burn',
                image: '/images/q5_burn.webp',
                scores: { cyberpunk: 4, y2k: 2, whimsigoth: 1, coquette: -2 }
            }
        ]
    },
    {
        id: 6,
        text: "When do you feel most like yourself?",
        text_ko: "가장 나다운 시간은 언제인가요?",
        text_zh: "什么时候你感觉最像自己？",
        text_ja: "一番自分らしくいられる時間は？",
        options: [
            {
                id: 'A',
                label: 'Late night alone',
                label_ko: '새벽 혼자 있을 때',
                label_zh: '深夜独自一人的时候',
                label_ja: '真夜中、独りでいるとき',
                imagePrompt: 'night',
                image: '/images/q6_night_real.webp',
                scores: { whimsigoth: 4, dark_academia: 2, cyberpunk: 1, clean_girl: -1 }
            },
            {
                id: 'B',
                label: 'Early morning routine',
                label_ko: '이른 아침 루틴',
                label_zh: '清晨的自律时刻',
                label_ja: '早朝のルーティン中',
                imagePrompt: 'morning',
                image: '/images/q6_morning.webp',
                scores: { clean_girl: 4, old_money: 3, cottagecore: 1, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: 'Golden hour outside',
                label_ko: '노을 지는 야외에서',
                label_zh: '日落时分的户外',
                label_ja: '夕暮れ時の屋外で',
                imagePrompt: 'sunset',
                image: '/images/q6_sunset.webp',
                scores: { cottagecore: 3, coquette: 3, old_money: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: 'Midnight in the city',
                label_ko: '도심 한복판 자정',
                label_zh: '午夜的城市街头',
                label_ja: '真夜中の都会の真ん中で',
                imagePrompt: 'midnight',
                image: '/images/q6_midnight.webp',
                scores: { y2k: 4, cyberpunk: 3, whimsigoth: 1, cottagecore: -2 }
            }
        ]
    },
    {
        id: 7,
        text: "What does your inner child need to hear?",
        text_ko: "어린 내게 해주고 싶은 말은 무엇인가요?",
        text_zh: "你想对内心的那个小孩说什么？",
        text_ja: "幼い頃の自分に声をかけるなら？",
        options: [
            {
                id: 'A',
                label: '"Someone will understand you"',
                label_ko: '"언젠간 이해해주는 사람 생겨"',
                label_zh: '"终会有人理解你的"',
                label_ja: '"いつか理解してくれる人が現れるよ"',
                imagePrompt: 'understood',
                image: '/images/q7_understood.webp',
                scores: { dark_academia: 4, whimsigoth: 3, cyberpunk: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: '"You\'re doing great"',
                label_ko: '"충분히 잘 하고 있어"',
                label_zh: '"你已经很棒了"',
                label_ja: '"十分よくやっているよ"',
                imagePrompt: 'right',
                image: '/images/q7_great.webp',
                scores: { clean_girl: 3, old_money: 4, cottagecore: 1, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: '"It\'s okay to rest"',
                label_ko: '"이제 좀 쉬어도 괜찮아"',
                label_zh: '"休息一下也没关系"',
                label_ja: '"もう休んでも大丈夫だよ"',
                imagePrompt: 'rest',
                image: '/images/q7_rest.webp',
                scores: { cottagecore: 4, coquette: 3, clean_girl: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: '"You are special"',
                label_ko: '"너는 특별한 존재야"',
                label_zh: '"你是独一无二的"',
                label_ja: '"君は特別な存在だよ"',
                imagePrompt: 'matter',
                image: '/images/q7_matter.webp',
                scores: { y2k: 4, cyberpunk: 2, whimsigoth: 1, old_money: -1 }
            }
        ]
    },
    {
        id: 8,
        text: "What stands out most in your wardrobe?",
        text_ko: "당신의 옷장을 열었을 때, 가장 눈에 띄는 것은?",
        text_zh: "打开你的衣橱，最引人注目的是？",
        text_ja: "クローゼット開けたとき、一番目立つのは？",
        options: [
            {
                id: 'A',
                label: 'Neutral colors & Quality fabrics',
                label_ko: '무채색과 고급 소재 (캐시미어, 린넨)',
                label_zh: '中性色调与高级面料（羊绒、亚麻）',
                label_ja: '無彩色と高級素材（カシミヤ、リネン）',
                imagePrompt: 'wardrobe_neutral',
                image: '/images/q8_wardrobe_neutral.webp',
                scores: { old_money: 4, clean_girl: 3, dark_academia: 2, y2k: -2 }
            },
            {
                id: 'B',
                label: 'Bold patterns & Vibrant colors',
                label_ko: '화려한 패턴, 레이스, 과감한 컬러',
                label_zh: '大胆的印花、蕾丝与鲜艳色彩',
                label_ja: '派手な柄、レース、大胆なカラー',
                imagePrompt: 'wardrobe_bold',
                image: '/images/q8_wardrobe_bold.webp',
                scores: { y2k: 4, coquette: 3, cyberpunk: 2, old_money: -2 }
            },
            {
                id: 'C',
                label: 'Comfortable knits & Cotton',
                label_ko: '편안하고 자연스러운 니트와 면 소재',
                label_zh: '舒适自然的针织与棉质衣物',
                label_ja: '快適で自然なニットとコットン素材',
                imagePrompt: 'wardrobe_cozy',
                image: '/images/q8_wardrobe_cozy.webp',
                scores: { cottagecore: 4, clean_girl: 2, coquette: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: 'Unique Vintage & All Black',
                label_ko: '독특한 빈티지나 검정색 계열의 룩',
                label_zh: '独特的复古单品或全黑穿搭',
                label_ja: 'ユニークなビンテージやオールブラック',
                imagePrompt: 'wardrobe_vintage',
                image: '/images/q8_wardrobe_vintage.webp',
                scores: { whimsigoth: 4, dark_academia: 3, cyberpunk: 2, clean_girl: -1 }
            }
        ]
    },
    {
        id: 9,
        text: "What do friends say about your personality?",
        text_ko: "친구들이 말하는 나의 평소 성격은?",
        text_zh: "朋友们通常怎么形容你的性格？",
        text_ja: "友達から言われるあなたの性格は？",
        options: [
            {
                id: 'A',
                label: '"You are disciplined"',
                label_ko: '"너는 자기 관리를 진짜 잘해"',
                label_zh: '"你真的非常自律"',
                label_ja: '"自己管理が本当に上手だね"',
                imagePrompt: 'friend_disciplined',
                image: '/images/q9_friend_disciplined.webp',
                scores: { clean_girl: 4, old_money: 3, dark_academia: 1, whimsigoth: -1 }
            },
            {
                id: 'B',
                label: '"You are eccentric"',
                label_ko: '"너는 엉뚱하고 4차원 같아"',
                label_zh: '"你古灵精怪，像个外星人"',
                label_ja: '"엉뚱하고 4차원 같아" (変わってるね/不思議ちゃんだね)',
                imagePrompt: 'friend_eccentric',
                image: '/images/q9_friend_eccentric.webp',
                scores: { whimsigoth: 4, y2k: 3, cyberpunk: 2, clean_girl: -2 }
            },
            {
                id: 'C',
                label: '"You are comforting"',
                label_ko: '"너랑 있으면 마음이 편해져"',
                label_zh: '"跟你在一起很安心"',
                label_ja: '"一緒にいると落ち着くよ"',
                imagePrompt: 'friend_comforting',
                image: '/images/q9_friend_comforting.webp',
                scores: { cottagecore: 4, coquette: 3, old_money: 1, cyberpunk: -2 }
            },
            {
                id: 'D',
                label: '"You are cool & strong"',
                label_ko: '"너는 주관이 강하고 힙해"',
                label_zh: '"你很有主见，很酷"',
                label_ja: '"自分の芯を持っててカッコいい"',
                imagePrompt: 'friend_cool',
                image: '/images/q9_friend_cool.webp',
                scores: { cyberpunk: 4, dark_academia: 3, y2k: 2, cottagecore: -1 }
            }
        ]
    }
];

export function calculateResult(answers: string[]): Aesthetic {
    const scores: Record<AestheticId, number> = {
        whimsigoth: 0,
        clean_girl: 0,
        y2k: 0,
        dark_academia: 0,
        cottagecore: 0,
        cyberpunk: 0,
        old_money: 0,
        coquette: 0
    };

    answers.forEach((answerId, questionIndex) => {
        const question = QUESTIONS[questionIndex];
        if (!question) return;
        const option = question.options.find(o => o.id === answerId);
        if (!option) return;

        Object.entries(option.scores).forEach(([aestheticId, score]) => {
            scores[aestheticId as AestheticId] += score || 0;
        });
    });

    let maxScore = -1;
    let resultId: AestheticId = 'clean_girl';

    Object.entries(scores).forEach(([id, score]) => {
        if (score > maxScore) {
            maxScore = score;
            resultId = id as AestheticId;
        }
    });

    return AESTHETICS[resultId];
}
