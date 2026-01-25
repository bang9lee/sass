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
    archetype: string;
    archetype_ko: string;
    description: string;
    description_ko: string;
    keywords: string[];
    keywords_ko: string[];
    brandMatches: string[];
    colorPalette: string[];
    image: string;
}

export const AESTHETICS: Record<AestheticId, Aesthetic> = {
    whimsigoth: {
        id: 'whimsigoth',
        title: 'Celestial Whimsigoth',
        title_ko: '윌지가스',
        archetype: 'The Boundary Keeper',
        archetype_ko: '경계선의 감시자',
        description: `Others see you as mysterious and untouchable. Your attraction to the mystical is a way to protect yourself from a world that drains you. This dark aesthetic is your sanctuary.`,
        description_ko: `윌지가스는 달, 타로, 마법 같은 신비로운 분위기를 사랑하는 당신의 스타일입니다.

사람들은 당신을 신비롭고 왠지 모르게 끌리는 사람이라고 느낍니다. 남들보다 예민한 감각을 타고났고, 시끄러운 인간관계보다는 깊이 있는 대화를 선호하시죠.

신비로운 것에 끌리는 건, 누구도 함부로 침범할 수 없는 당신만의 소중한 세계를 지키고 싶기 때문일 거예요.`,
        keywords: ['Mystery', 'Intuition', 'Moon', 'Magic', 'Night'],
        keywords_ko: ['신비', '직감', '달', '마법', '밤'],
        brandMatches: ['Anna Sui', 'Free People', 'Lush'],
        colorPalette: ['#2E1A47', '#D4AF37', '#1A1A1A'],
        image: '/images/aesthetics/whimsigoth.png'
    },
    clean_girl: {
        id: 'clean_girl',
        title: 'That Clean Girl',
        title_ko: '클린걸',
        archetype: 'The Perfectionist',
        archetype_ko: '완벽한 통제자',
        description: `You appear effortlessly put-together. But the truth is you're terrified of being seen as a mess. Your minimalism is about controlling what you can.`,
        description_ko: `클린걸은 미니멀한 무드와 자기관리 루틴을 중요하게 생각하는 당신의 스타일입니다.

당신은 복잡한 것보다 단순한 것에서 진정한 아름다움을 찾고, 잘 정돈된 환경에서 마음의 평화를 느끼는 분이에요. 겉보기엔 힘들이지 않고 완벽해 보이지만, 사실 모든 것을 세심하게 계획하는 노력파이시죠.

통제할 수 있는 것들에 집중하며 내면의 평온을 지켜내는 사람, 그게 바로 당신입니다.`,
        keywords: ['Control', 'Order', 'Calm', 'Glow', 'Minimal'],
        keywords_ko: ['통제', '질서', '평온', '윤광', '미니멀'],
        brandMatches: ['Rhode', 'Alo Yoga', 'Dyson'],
        colorPalette: ['#F5F5F0', '#E3E3E3', '#6B705C'],
        image: '/images/aesthetics/clean_girl.png'
    },
    y2k: {
        id: 'y2k',
        title: 'Digital Y2K Angel',
        title_ko: 'Y2K',
        archetype: 'The Lost Optimist',
        archetype_ko: '잃어버린 낙관주의자',
        description: `You're the fun one who keeps things light. You're drawn to Y2K because it represents hope - the belief that the future would be exciting.`,
        description_ko: `Y2K는 2000년대 초반의 설렘과 기대감을 간직한 당신의 스타일입니다. 
        핑크, 실버, 반짝이는 소재들이 당신을 가장 잘 표현하죠.

혹시 우울한 세상 속에서도 어떻게든 재미와 기쁨을 찾으려 노력하시나요? 당신의 밝은 에너지는 주변 사람들까지 환하게 밝혀주는 힘이 있습니다.

세상의 기준보다는 자신만의 방식으로 즐거움을 선택할 줄 아는 용기 있는 사랑스러움이 당신의 매력입니다.`,
        keywords: ['Hope', 'Fun', 'Pink', 'Bling', 'Cyber'],
        keywords_ko: ['희망', '재미', '핑크', '블링', '사이버'],
        brandMatches: ['Diesel', 'Blumarine', 'Gentle Monster'],
        colorPalette: ['#FF69B4', '#00FFFF', '#C0C0C0'],
        image: '/images/aesthetics/y2k.png'
    },
    dark_academia: {
        id: 'dark_academia',
        title: 'Dark Academia Poet',
        title_ko: '다크 아카데미아',
        archetype: 'The Lonely Observer',
        archetype_ko: '고독한 관찰자',
        description: `You're the deep one. People respect your thoughts but struggle to get close. You romanticize melancholy because it feels safer than facing your own sadness.`,
        description_ko: `다크 아카데미아는 오래된 도서관, 타닥거리는 빗소리, 깊은 사색을 사랑하는 당신의 스타일입니다.

당신은 생각이 깊고 풍부한 내면을 가진 분이시군요. 가벼운 수다보다는 의미 있는 대화를 원하고, 피상적인 관계보다는 깊이 있는 연결을 소중히 여깁니다.

남들이 "너무 생각이 많다"고 할 수도 있겠지만, 그 섬세한 감수성이야말로 당신이 가진 가장 아름다운 재능입니다.`,
        keywords: ['Depth', 'Poetry', 'Rain', 'Books', 'Coffee'],
        keywords_ko: ['깊이', '시', '비', '책', '커피'],
        brandMatches: ['Ralph Lauren', 'Moleskine', 'Burberry'],
        colorPalette: ['#3E2723', '#1C1C1C', '#A1887F'],
        image: '/images/aesthetics/dark_academia.png'
    },
    cottagecore: {
        id: 'cottagecore',
        title: 'Cottagecore Dreamer',
        title_ko: '코티지코어',
        archetype: 'The Nostalgic Healer',
        archetype_ko: '회귀하는 치유자',
        description: `You're the gentle one. People feel safe around you. Your love of simple living isn't cute - it's a cry for rest from a world demanding constant productivity.`,
        description_ko: `코티지코어는 따스한 햇살, 자연의 평화, 소박한 삶을 동경하는 당신의 스타일입니다.

사람들은 당신 곁에 있으면 마음이 편안해진다고 말할 거예요. 경쟁적이고 빠르게 돌아가는 세상 속에서 조금 지치셨을지도 모르겠네요.

"가끔은 멈춰 서서 쉬어가도 괜찮아"라고 스스로에게, 그리고 타인에게 말해줄 수 있는 따뜻한 치유자가 바로 당신입니다.`,
        keywords: ['Rest', 'Nature', 'Slow', 'Gentle', 'Warm'],
        keywords_ko: ['휴식', '자연', '느림', '다정함', '따뜻함'],
        brandMatches: ['LoveShackFancy', 'Le Creuset', 'Cath Kidston'],
        colorPalette: ['#7BA05B', '#FADADD', '#FFF8E7'],
        image: '/images/aesthetics/cottagecore.png'
    },
    cyberpunk: {
        id: 'cyberpunk',
        title: 'Neon Cyberpunk',
        title_ko: '사이버펑크',
        archetype: 'The System Rebel',
        archetype_ko: '시스템의 반역자',
        description: `You're the rebellious one who sees through the bullshit. Your attraction to chaos isn't edginess - it's because order always felt like a cage made by people who don't care.`,
        description_ko: `사이버펑크는 네온 사인, 미래적인 분위기, 틀을 깨는 자유로움을 사랑하는 당신의 스타일입니다.

당신은 불합리한 규칙이나 위선적인 권위에 타협하지 않는 곧은 마음을 가졌습니다. 남들의 시선보다는 자신의 소신대로 사는 것이 가장 중요하다고 생각하시죠.

"남들처럼 살아"라는 압박 속에서도 "나는 나대로 살 거야"라고 당당히 말할 줄 아는 당신의 용기는 정말 멋집니다.`,
        keywords: ['Rebellion', 'Freedom', 'Neon', 'Night', 'Glitch'],
        keywords_ko: ['반항', '자유', '네온', '밤', '글리치'],
        brandMatches: ['Acronym', 'Razer', 'Balenciaga'],
        colorPalette: ['#00FF41', '#FF00FF', '#0D0D0D'],
        image: '/images/aesthetics/cyberpunk.png'
    },
    old_money: {
        id: 'old_money',
        title: 'Old Money Heiress',
        title_ko: '올드머니',
        archetype: 'The Silent Aristocrat',
        archetype_ko: '침묵하는 귀족',
        description: `You have natural elegance. Quality speaks for itself. Your attraction to quiet luxury is about control - loud displays feel desperate.`,
        description_ko: `올드머니는 유행을 타지 않는 클래식함과 조용한 고급스러움을 추구하는 당신의 스타일입니다.

당신은 타고난 안목과 기품이 있는 분이시네요. 굳이 화려하게 꾸미거나 과시하지 않아도, 당신만의 아우라는 자연스럽게 빛이 납니다.

자신의 가치를 누구보다 잘 알기에, 굳이 세상에 증명하려 애쓸 필요가 없다는 여유로움이 당신의 가장 큰 매력입니다.`,
        keywords: ['Elegance', 'Classic', 'Quiet', 'Quality', 'Grace'],
        keywords_ko: ['우아함', '클래식', '조용함', '품격', '품위'],
        brandMatches: ['Loro Piana', 'Chanel', 'Hermes'],
        colorPalette: ['#002147', '#F5F5DC', '#FFFFFF'],
        image: '/images/aesthetics/old_money.png'
    },
    coquette: {
        id: 'coquette',
        title: 'Romantic Coquette',
        title_ko: '코케트',
        archetype: 'The Tender Warrior',
        archetype_ko: '부드러움의 전사',
        description: `You're the soft one. People see you as delicate. But your love of bows isn't naive - it's strategic. You've learned softness can be a weapon.`,
        description_ko: `코케트는 리본, 레이스, 부드러운 로맨틱함을 사랑하는 당신의 스타일입니다.

당신은 부드럽고 다정한 마음씨를 가진 분이군요. 하지만 그 부드러움은 결코 약함이 아닙니다. 차가운 세상 속에서도 다정함을 잃지 않기로 선택한 당신만의 강인함이죠.

다정함이야말로 가장 강력한 힘이 될 수 있다는 사실을 당신은 이미 알고 계시는군요.`,
        keywords: ['Soft', 'Romance', 'Ribbon', 'Pink', 'Sweet'],
        keywords_ko: ['부드러움', '로맨스', '리본', '핑크', '달콤함'],
        brandMatches: ['Miu Miu', 'Selkie', 'Dior'],
        colorPalette: ['#FFC1CC', '#FFFFFF', '#FFB7C5'],
        image: '/images/aesthetics/coquette.png'
    }
};

export interface Question {
    id: number;
    text: string;
    text_ko: string;
    subtext?: string;
    subtext_ko?: string;
    options: {
        id: string;
        label: string;
        label_ko: string;
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
        options: [
            {
                id: 'A',
                label: 'An old library no one knows',
                label_ko: '아무도 모르는 오래된 도서관',
                imagePrompt: 'dark_library',
                image: '/images/q1_library.png',
                scores: { dark_academia: 4, whimsigoth: 2, old_money: 1, y2k: -2, cyberpunk: -1 }
            },
            {
                id: 'B',
                label: 'A clean hotel room',
                label_ko: '깔끔한 호텔 방',
                imagePrompt: 'hotel',
                image: '/images/q1_hotel.jpg',
                scores: { clean_girl: 4, old_money: 2, cyberpunk: 1, cottagecore: -2, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: 'A quiet countryside',
                label_ko: '조용한 시골',
                imagePrompt: 'cottage',
                image: '/images/q1_picnic.jpg',
                scores: { cottagecore: 4, coquette: 2, whimsigoth: 1, cyberpunk: -2, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'A neon city at night',
                label_ko: '밤의 네온 도시',
                imagePrompt: 'neon_city',
                image: '/images/q1_neon.jpg',
                scores: { cyberpunk: 4, y2k: 3, whimsigoth: 1, cottagecore: -2, old_money: -1 }
            }
        ]
    },
    {
        id: 2,
        text: "What do you hide from the world?",
        text_ko: "절대 들키고 싶지 않은 모습은 무엇인가요?",
        options: [
            {
                id: 'A',
                label: 'Overthinking everything',
                label_ko: '사소한 것까지 고민하는 모습',
                imagePrompt: 'overthinking',
                image: '/images/q2_overthinking.jpg',
                scores: { dark_academia: 3, whimsigoth: 2, clean_girl: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: 'Anxiety when things are messy',
                label_ko: '정리 안 되면 불안한 모습',
                imagePrompt: 'anxiety',
                image: '/images/q2_anxiety.png',
                scores: { clean_girl: 4, old_money: 2, dark_academia: 1, cyberpunk: -2 }
            },
            {
                id: 'C',
                label: 'Being exhausted from pretending',
                label_ko: '괜찮은 척하느라 지친 모습',
                imagePrompt: 'exhausted',
                image: '/images/q2_exhausted.jpg',
                scores: { coquette: 3, cottagecore: 2, whimsigoth: 1, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'The anger underneath',
                label_ko: '마음 깊은 곳의 분노',
                imagePrompt: 'anger',
                image: '/images/q2_anger.jpg',
                scores: { cyberpunk: 4, y2k: 2, whimsigoth: 2, coquette: -2 }
            }
        ]
    },
    {
        id: 3,
        text: "What criticism hurts you most?",
        text_ko: "가장 상처가 되는 말은 무엇인가요?",
        options: [
            {
                id: 'A',
                label: '"Why so serious?"',
                label_ko: '"왜 혼자 그렇게 심각하세요?"',
                imagePrompt: 'intense',
                image: '/images/q3_serious.jpg',
                scores: { dark_academia: 4, whimsigoth: 2, old_money: 2, y2k: -2 }
            },
            {
                id: 'B',
                label: '"You\'re a mess"',
                label_ko: '"정말 정리가 안 되시네요"',
                imagePrompt: 'mess',
                image: '/images/q3_mess.jpg',
                scores: { clean_girl: 4, old_money: 2, coquette: 1, cyberpunk: -1 }
            },
            {
                id: 'C',
                label: '"You\'re too sensitive"',
                label_ko: '"너무 예민하시네요"',
                imagePrompt: 'sensitive',
                image: '/images/q3_sensitive.jpg',
                scores: { coquette: 4, cottagecore: 2, whimsigoth: 2, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: '"You\'re not special"',
                label_ko: '"그냥 평범하시네요"',
                imagePrompt: 'ordinary',
                image: '/images/q3_ordinary.jpg',
                scores: { y2k: 4, cyberpunk: 2, dark_academia: 1, old_money: -2 }
            }
        ]
    },
    {
        id: 4,
        text: "Secret desire you can't admit?",
        text_ko: "창피해서 말 못 하는 욕망은 무엇인가요?",
        options: [
            {
                id: 'A',
                label: 'To seem brilliant effortlessly',
                label_ko: '노력 없이 천재로 보이기',
                imagePrompt: 'brilliant',
                image: '/images/q4_brilliant.jpg',
                scores: { old_money: 4, dark_academia: 3, y2k: 1, cottagecore: -1 }
            },
            {
                id: 'B',
                label: 'To be completely taken care of',
                label_ko: '완전히 보살핌받기',
                imagePrompt: 'care',
                image: '/images/q4_care.jpg',
                scores: { coquette: 4, cottagecore: 3, clean_girl: 1, cyberpunk: -2 }
            },
            {
                id: 'C',
                label: 'To be feared, not just respected',
                label_ko: '존경 말고 두려움 주기',
                imagePrompt: 'fear',
                image: '/images/q4_fear.jpg',
                scores: { cyberpunk: 4, whimsigoth: 3, dark_academia: 1, coquette: -2 }
            },
            {
                id: 'D',
                label: 'To be absolutely adored',
                label_ko: '완전히 숭배받기',
                imagePrompt: 'adored',
                image: '/images/q4_adored.jpg',
                scores: { y2k: 4, coquette: 2, clean_girl: 1, dark_academia: -1 }
            }
        ]
    },
    {
        id: 5,
        text: "How do you cope when powerless?",
        text_ko: "무력할 때 어떻게 버티세요?",
        options: [
            {
                id: 'A',
                label: 'Retreat into my own world',
                label_ko: '내 세계 속으로 숨어요',
                imagePrompt: 'retreat',
                image: '/images/q5_retreat.jpg',
                scores: { whimsigoth: 4, dark_academia: 2, cottagecore: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: 'Clean and organize',
                label_ko: '정리하고 청소해요',
                imagePrompt: 'organize',
                image: '/images/q5_organize.png',
                scores: { clean_girl: 4, old_money: 2, dark_academia: 1, cyberpunk: -1 }
            },
            {
                id: 'C',
                label: 'Daydream about simpler life',
                label_ko: '단순한 삶을 상상해요',
                imagePrompt: 'daydream',
                image: '/images/q5_daydream.jpg',
                scores: { cottagecore: 4, coquette: 2, whimsigoth: 1, clean_girl: -1 }
            },
            {
                id: 'D',
                label: 'Get angry and want to break things',
                label_ko: '화가 나서 다 부수고 싶어요',
                imagePrompt: 'burn',
                image: '/images/q5_burn.jpg',
                scores: { cyberpunk: 4, y2k: 2, whimsigoth: 1, coquette: -2 }
            }
        ]
    },
    {
        id: 6,
        text: "When do you feel most like yourself?",
        text_ko: "가장 나다운 시간은 언제인가요?",
        options: [
            {
                id: 'A',
                label: 'Late night alone',
                label_ko: '새벽 혼자 있을 때',
                imagePrompt: 'night',
                image: '/images/q6_night_real.png',
                scores: { whimsigoth: 4, dark_academia: 2, cyberpunk: 1, clean_girl: -1 }
            },
            {
                id: 'B',
                label: 'Early morning routine',
                label_ko: '이른 아침 루틴',
                imagePrompt: 'morning',
                image: '/images/q6_morning.png',
                scores: { clean_girl: 4, old_money: 3, cottagecore: 1, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: 'Golden hour outside',
                label_ko: '노을 지는 야외에서',
                imagePrompt: 'sunset',
                image: '/images/q6_sunset.jpg',
                scores: { cottagecore: 3, coquette: 3, old_money: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: 'Midnight in the city',
                label_ko: '도심 한복판 자정',
                imagePrompt: 'midnight',
                image: '/images/q6_midnight.jpg',
                scores: { y2k: 4, cyberpunk: 3, whimsigoth: 1, cottagecore: -2 }
            }
        ]
    },
    {
        id: 7,
        text: "What does your inner child need to hear?",
        text_ko: "어린 내게 해주고 싶은 말은 무엇인가요?",
        options: [
            {
                id: 'A',
                label: '"Someone will understand you"',
                label_ko: '"언젠간 이해해주는 사람 생겨"',
                imagePrompt: 'understood',
                image: '/images/q7_understood.jpg',
                scores: { dark_academia: 4, whimsigoth: 3, cyberpunk: 1, y2k: -1 }
            },
            {
                id: 'B',
                label: '"You\'re doing great"',
                label_ko: '"충분히 잘 하고 있어"',
                imagePrompt: 'right',
                image: '/images/q7_great.jpg',
                scores: { clean_girl: 3, old_money: 4, cottagecore: 1, whimsigoth: -1 }
            },
            {
                id: 'C',
                label: '"It\'s okay to rest"',
                label_ko: '"이제 좀 쉬어도 괜찮아"',
                imagePrompt: 'rest',
                image: '/images/q7_rest.jpg',
                scores: { cottagecore: 4, coquette: 3, clean_girl: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: '"You are special"',
                label_ko: '"너는 특별한 존재야"',
                imagePrompt: 'matter',
                image: '/images/q7_matter.png',
                scores: { y2k: 4, cyberpunk: 2, whimsigoth: 1, old_money: -1 }
            }
        ]
    },
    {
        id: 8,
        text: "What stands out most in your wardrobe?",
        text_ko: "당신의 옷장을 열었을 때, 가장 눈에 띄는 것은?",
        options: [
            {
                id: 'A',
                label: 'Neutral colors & Quality fabrics',
                label_ko: '무채색과 고급 소재 (캐시미어, 린넨)',
                imagePrompt: 'wardrobe_neutral',
                image: '/images/q8_wardrobe_neutral.png',
                scores: { old_money: 4, clean_girl: 3, dark_academia: 2, y2k: -2 }
            },
            {
                id: 'B',
                label: 'Bold patterns & Vibrant colors',
                label_ko: '화려한 패턴, 레이스, 과감한 컬러',
                imagePrompt: 'wardrobe_bold',
                image: '/images/q8_wardrobe_bold.png',
                scores: { y2k: 4, coquette: 3, cyberpunk: 2, old_money: -2 }
            },
            {
                id: 'C',
                label: 'Comfortable knits & Cotton',
                label_ko: '편안하고 자연스러운 니트와 면 소재',
                imagePrompt: 'wardrobe_cozy',
                image: '/images/q8_wardrobe_cozy.png',
                scores: { cottagecore: 4, clean_girl: 2, coquette: 1, cyberpunk: -1 }
            },
            {
                id: 'D',
                label: 'Unique Vintage & All Black',
                label_ko: '독특한 빈티지나 검정색 계열의 룩',
                imagePrompt: 'wardrobe_vintage',
                image: '/images/q8_wardrobe_vintage.png',
                scores: { whimsigoth: 4, dark_academia: 3, cyberpunk: 2, clean_girl: -1 }
            }
        ]
    },
    {
        id: 9,
        text: "What do friends say about your personality?",
        text_ko: "친구들이 말하는 나의 평소 성격은?",
        options: [
            {
                id: 'A',
                label: '"You are disciplined"',
                label_ko: '"너는 자기 관리를 진짜 잘해"',
                imagePrompt: 'friend_disciplined',
                image: '/images/q9_friend_disciplined.png',
                scores: { clean_girl: 4, old_money: 3, dark_academia: 1, whimsigoth: -1 }
            },
            {
                id: 'B',
                label: '"You are eccentric"',
                label_ko: '"너는 엉뚱하고 4차원 같아"',
                imagePrompt: 'friend_eccentric',
                image: '/images/q9_friend_eccentric.png',
                scores: { whimsigoth: 4, y2k: 3, cyberpunk: 2, clean_girl: -2 }
            },
            {
                id: 'C',
                label: '"You are comforting"',
                label_ko: '"너랑 있으면 마음이 편해져"',
                imagePrompt: 'friend_comforting',
                image: '/images/q9_friend_comforting.png',
                scores: { cottagecore: 4, coquette: 3, old_money: 1, cyberpunk: -2 }
            },
            {
                id: 'D',
                label: '"You are cool & strong"',
                label_ko: '"너는 주관이 강하고 힙해"',
                imagePrompt: 'friend_cool',
                image: '/images/q9_friend_cool.png',
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
