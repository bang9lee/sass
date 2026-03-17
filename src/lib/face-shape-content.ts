import type { FaceShapeAnalysisResult, FaceShapeId } from "./face-shape-analysis-official";

type SupportedLanguage = "ko" | "en" | "zh" | "ja";

type ShapeCopy = {
    name: string;
    summary: string;
    strengths: string[];
    hairstyle: string[];
    eyewear: string[];
    contour: string[];
    celebrities_male: string[];
    celebrities_female: string[];
};

const SHAPE_COPY: Record<SupportedLanguage, Record<FaceShapeId, ShapeCopy>> = {
    ko: {
        oval: {
            name: "계란형",
            summary: "가장 이상적인 비율로 인정받는 계란형은 이마와 턱의 밸런스가 완벽하며, 얼굴 외곽선이 부드러운 곡선을 그립니다. 어떤 스타일이든 무난하게 소화할 수 있는 축복받은 얼굴형입니다.",
            strengths: ["헤어스타일, 안경 프레임, 메이크업 기법의 변화를 가장 자유롭게 시도할 수 있습니다.", "얼굴 선이 과하게 강하거나 날카롭지 않아 우아함부터 힙한 무드까지 폭넓게 소화 가능합니다.", "비율이 안정적이어서 특별한 보정 없이도 사진이 잘 나옵니다."],
            hairstyle: ["이마를 드러내는 센터 파트", "중단발 레이어드", "정수리 볼륨을 살린 롱 웨이브"],
            eyewear: ["보스턴", "슬림 스퀘어", "캣아이 포인트 프레임"],
            contour: ["광대 아래 음영은 얕게", "턱 끝 하이라이트로 세로 흐름 유지", "쉐이딩보다 피부결 정리가 더 중요"],
            celebrities_male: ['차은우', '박보검', '임시완'],
            celebrities_female: ['한예슬', '김태희', '전지현']
        },
        round: {
            name: "둥근형",
            summary: "가로와 세로 비율이 거의 비슷하며, 턱선이 둥글고 볼살이 있어 귀엽고 친근한 인상을 줍니다. 실제 나이보다 어려 보이는 '동안'의 대표적인 얼굴형입니다.",
            strengths: ["어려 보이고 상냥한 이미지를 주어 대인 관계에서 긍정적인 첫인상을 만듭니다.", "부드러운 곡선 위주의 페미닌하거나 내추럴한 스타일과 궁합이 매우 좋습니다.", "볼의 볼륨감이 입체감을 만들어주어 생기 있어 보입니다."],
            hairstyle: ["정수리 볼륨을 높인 레이어드 컷", "턱 아래로 떨어지는 세로 웨이브", "사이드 파트 롱 헤어"],
            eyewear: ["직선감 있는 스퀘어", "엣지 있는 웰링턴", "위쪽 라인이 살아있는 캣아이"],
            contour: ["광대보다 턱선 바깥쪽에 가벼운 음영", "코 옆과 턱끝 하이라이트로 세로축 강조", "블러셔는 사선 방향이 유리"],
            celebrities_male: ['백현', '정국', '지민'],
            celebrities_female: ['제니', '장원영', '츄']
        },
        square: {
            name: "각진형",
            summary: "이마, 광대, 하관의 너비가 비슷하며, 턱선이 뚜렷하게 각져 있어 신뢰감 있고 이지적인 느낌을 줍니다. 서구권에서는 가장 매력적이고 섹시한 얼굴형으로 꼽힙니다.",
            strengths: ["골격이 또렷하고 눈에 띄어 카메라 앞이나 무대에서 독보적인 존재감을 발휘합니다.", "미니멀하고 세련된 스타일, 혹은 매니시하고 구조적인 룩이 누구보다 잘 어울립니다.", "나이가 들어도 턱선이 무너지지 않아 오랜 시간 탄력 있는 인상을 유지할 수 있습니다."],
            hairstyle: ["턱선을 스치듯 감싸는 웨이브", "옆머리 볼륨이 있는 미디엄 컷", "루즈한 컬의 롱 레이어드"],
            eyewear: ["라운드", "오벌 메탈", "곡선이 있는 하프림"],
            contour: ["턱 모서리만 과하게 누르지 말고 넓게 블렌딩", "광대 하이라이트로 중앙 집중", "입가 아래 음영은 최소화"],
            celebrities_male: ['이병헌', '정우성', '옥택연'],
            celebrities_female: ['김태리', '정유미', '나나']
        },
        heart: {
            name: "하트형",
            summary: "이마와 광대가 넓고, 턱 끝으로 갈수록 좁고 뾰족해지는 역삼각형 형태입니다. 사랑스럽고 이지적인 분위기를 동시에 풍기며 시선을 상안부로 집중시키는 특징이 있습니다.",
            strengths: ["눈과 눈썹, 이마 라인이 돋보여 인상이 선명하고 명확하게 기억됩니다.", "화려한 앞머리 변화나 눈을 강조하는 메이크업, 포인트 액세서리가 누구보다 잘 어울립니다.", "턱 선이 갸름하고 날렵해 세련된 도회적 이미지를 연출하기 유리합니다."],
            hairstyle: ["턱선 근처 볼륨이 있는 보브", "시스루뱅 + 미디엄 웨이브", "하단부가 풍성한 레이어드"],
            eyewear: ["하단 무게감 있는 프레임", "림리스", "가로 폭이 넓은 라운드 스퀘어"],
            contour: ["관자놀이와 턱선 사이 밸런스를 맞추는 쉐이딩", "턱끝 하이라이트를 너무 좁게 넣지 않기", "블러셔는 볼 중앙보다 바깥쪽"],
            celebrities_male: ['송강', '뷔', '황민현'],
            celebrities_female: ['신민아', '사나', '강미나']
        },
        oblong: {
            name: "긴 얼굴형",
            summary: "얼굴의 가로 너비보다 세로 길이가 먼저 눈에 띄는 형태입니다. 지적이고 성숙하며, 우아한 분위기를 자아내기에 가장 적합한 얼굴형입니다.",
            strengths: ["세련되고 이지적인 '커리어 우먼' 혹은 '성숙한 미남' 이미지를 구축하기에 매우 유리합니다.", "앞머리의 유무나 가르마 방향 결정만으로도 인상이 드라마틱하게 정돈되는 보람이 큰 얼굴형입니다.", "수직적인 깊이감이 있어 분위기 있는 사진 연출이 가능합니다."],
            hairstyle: ["앞머리를 살짝 남긴 6:4~7:3 가르마", "옆머리를 너무 짧게 밀지 않는 다운펌", "이마를 전부 열지 않는 텍스처 크롭"],
            eyewear: ["세로 깊이가 있는 웰링턴", "중간~약간 큰 보스턴", "상단선이 또렷한 브로우라인"],
            contour: ["헤어라인과 턱끝 쉐이딩으로 길이 분절", "광대 하이라이트를 수평으로 확장", "블러셔는 코 옆에서 가로로 연결"],
            celebrities_male: ['남주혁', '로운', '최우식'],
            celebrities_female: ['로제', '선미', '정려원']
        },
        diamond: {
            name: "다이아몬드형",
            summary: "이마와 턱이 좁고 광대뼈 부위가 가장 넓은 마름모 형태입니다. 입체감이 뚜렷하여 세련되면서도 신비로운 무드를 풍기는 유니크한 얼굴형입니다.",
            strengths: ["얼굴의 굴곡이 살아있어 조명을 받았을 때 입체감이 극대화되어 사진이 매우 잘 나옵니다.", "고급스럽고 이지적인 이미지를 주며, 중성적이거나 시크한 스타일을 완벽하게 소화합니다.", "광대를 장점으로 승화시키면 독보적인 아우라를 만들 수 있습니다."],
            hairstyle: ["광대를 덮는 사이드 뱅", "턱선 쪽 볼륨이 있는 컷", "센터 파트보다 살짝 치우친 파트"],
            eyewear: ["타원형", "상단이 강조된 하프림", "부드러운 브로우라인"],
            contour: ["광대 최외곽은 눌러주되 중앙 볼륨은 남기기", "이마와 턱에 하이라이트를 보충", "블러셔는 광대 아래보다 안쪽 중심"],
            celebrities_male: ['김영광', '윤균상'],
            celebrities_female: ['김서형', '천우희']
        },
        pear: {
            name: "배형",
            summary: "턱과 하부 폭이 이마보다 넓어 하단에서 오는 안정감이 특징인 얼굴형입니다. 강단 있고 부드러운 카리스마가 느껴지는 인상입니다.",
            strengths: ["차분하고 신뢰감 있는 인상을 주어 전문적인 포스가 느껴지게 합니다.", "구조적인 스타일이나 짧은 헤어스타일에서 누구보다 강한 존재감을 발휘합니다.", "얼굴 하단의 볼륨이 관리가 잘 될수록 우아한 귀부인 혹은 귀공자 같은 분위기가 납니다."],
            hairstyle: ["관자놀이 볼륨을 키운 숏컷", "상부 레이어가 살아있는 미디엄", "이마 노출이 있는 볼륨 헤어"],
            eyewear: ["상단 포인트가 있는 프레임", "브로우라인", "윗부분이 넓은 보스턴"],
            contour: ["헤어라인과 관자놀이 쪽 볼륨 보강", "턱 아래 음영은 넓고 옅게", "시선이 위로 가는 하이라이트 설계"],
            celebrities_male: ['정해인', '곽동연'],
            celebrities_female: ['정채연', '강민경']
        },
    },
    en: {
        oval: {
            name: "Oval",
            summary: "Widely considered the most balanced and ideal face shape, the Oval face features a forehead and jaw that are perfectly proportional with a gently curved jawline. It serves as a versatile canvas for any style.",
            strengths: ["Infinite flexibility to experiment with diverse hairstyles, eyewear frames, and makeup techniques.", "A soft, balanced outline that effortlessly carries everything from elegant classics to edgy, modern looks.", "Photogenic proportions that require minimal corrective styling to look high-end."],
            hairstyle: ["Center part with exposed forehead", "Layered lob", "Long soft waves with crown lift"],
            eyewear: ["Boston", "Slim square", "Cat-eye accent frames"],
            contour: ["Keep cheek shading light", "Use chin highlight to preserve length", "Texture correction matters more than hard contour"],
            celebrities_male: ['George Clooney', 'Chris Pine', 'Adam Levine'],
            celebrities_female: ['Jessica Alba', 'Blake Lively', 'Rihanna']
        },
        round: {
            name: "Round",
            summary: "With fairly equal width and length and a soft, curved jawline, the Round face shape exudes a youthful, friendly, and approachable energy. It is the hallmark of a 'baby face' that stays young-looking for years.",
            strengths: ["A naturally kind and inviting aura that creates a positive, warming first impression.", "Complements soft, feminine, or natural styling languages beautifully.", "Healthy fullness in the cheeks provides a vibrant, lively dimensionality."],
            hairstyle: ["Crown-lifting layers", "Vertical waves that fall below the jaw", "Side-parted longer hair"],
            eyewear: ["Structured square", "Sharp Wellington", "Lifted cat-eye"],
            contour: ["Shade outside the jaw rather than the center of the face", "Use highlight to reinforce a vertical line", "Diagonal blush placement helps"],
            celebrities_male: ['Leonardo DiCaprio', 'Jack Black', 'Niall Horan'],
            celebrities_female: ['Selena Gomez', 'Miranda Kerr', 'Gryffen']
        },
        square: {
            name: "Square",
            summary: "A strong, chiseled face shape where the forehead and jaw are similar in width. The defined mandibular angle provides a look of reliability, confidence, and sophisticated maturity.",
            strengths: ["Architectural bone structure that commands attention and looks exceptionally powerful on camera.", "Carries minimal, structured, or 'androgynous' looks better than any other face shape.", "A resilient jawline that preserves a youthful, taut appearance as you age."],
            hairstyle: ["Soft waves skimming the jaw", "Medium cuts with side volume", "Loose long layers"],
            eyewear: ["Round", "Oval metal", "Softly curved half-rim"],
            contour: ["Blend the jaw broadly instead of carving only the corners", "Pull attention to the mid-face with highlight", "Keep lower-mouth shading minimal"],
            celebrities_male: ['Brad Pitt', 'Henry Cavill', 'David Beckham'],
            celebrities_female: ['Angelina Jolie', 'Olivia Wilde', 'Margot Robbie']
        },
        heart: {
            name: "Heart",
            summary: "Characterized by a wider forehead and cheekbones that taper into a narrow, pointed chin. This shape creates a lovely, intelligent impression that naturally draws eyes to the upper face.",
            strengths: ["The eyes and forehead are highlighted, making for a clear and memorable facial focus.", "Fringe changes, eye-focused makeup, and statement accessories are incredibly flattering.", "A slender, chiseled lower face that creates a refined and modern urban aesthetic."],
            hairstyle: ["Bob with volume near the jaw", "See-through bangs with medium waves", "Layers that build fullness lower down"],
            eyewear: ["Frames with lower weight", "Rimless", "Wide rounded-square shapes"],
            contour: ["Balance the temples and lower face", "Avoid an overly tiny chin highlight", "Place blush slightly outward"],
            celebrities_male: ['Tom Cruise', 'Ryan Gosling', 'Bradley Cooper'],
            celebrities_female: ['Reese Witherspoon', 'Scarlett Johansson', 'Chloë Grace Moretz']
        },
        oblong: {
            name: "Oblong",
            summary: "Vertical length is the most prominent feature here. This face shape is ideal for crafting a highly sophisticated, intellectual, and gracefully mature presence.",
            strengths: ["Perfectly suited for a refined 'career-driven' or elegantly mature identity.", "Minor changes in fringe or parting produce immediate, dramatic improvements in facial balance.", "Vertical depth allows for a cinematic and atmospheric presence in photography."],
            hairstyle: ["Soft 6:4 or 7:3 part with some fringe", "Down-perm or taper that keeps some side width", "Textured crop that avoids a fully open forehead"],
            eyewear: ["Wellington frames with lens height", "Medium-to-large Boston frames", "Strong upper-line browline"],
            contour: ["Shade the hairline and chin to shorten the read", "Stretch highlight horizontally across the cheeks", "Keep blush placement more horizontal"],
            celebrities_male: ['Benedict Cumberbatch', 'Ryan Reynolds', 'Adam Driver'],
            celebrities_female: ['Sarah Jessica Parker', 'Liv Tyler', 'Gisele Bündchen']
        },
        diamond: {
            name: "Diamond",
            summary: "A unique and high-fashion shape where the cheekbones are the widest point, tapering to both a narrow forehead and chin. It radiates a mysterious, refined, and elite aura.",
            strengths: ["Distinct dimensionality that creates stunning light and shadow play in photography.", "A sophisticated, 'editorial' look that masters avant-garde and chic styles flawlessly.", "Prominent cheekbones serve as a unique asset for a powerful, one-of-a-kind presence."],
            hairstyle: ["Side bangs that soften the cheek area", "Cuts with jaw-area fullness", "Slightly off-center parting"],
            eyewear: ["Oval", "Top-emphasis half-rim", "Soft browline"],
            contour: ["Refine only the outermost cheek edge", "Restore light to the forehead and chin", "Keep blush slightly inward"],
            celebrities_male: ['Robert Pattinson', 'Cillian Murphy', 'Johnny Depp'],
            celebrities_female: ['Megan Fox', 'Jennifer Lopez', 'Halle Berry']
        },
        pear: {
            name: "Pear",
            summary: "The jaw area is wider than the forehead, giving the face a grounded and stable feel. It conveys an image of resilience, strength, and soft charisma.",
            strengths: ["A grounded and dependable aura that exudes professional authority and trust.", "Gains immense presence from structured silhouettes and bold, short hairstyles.", "The volume of the lower face provides a dignified, aristocratic vibe when styled correctly."],
            hairstyle: ["Temple-boosting short cuts", "Medium cuts with upper layering", "Volume styles that open the forehead"],
            eyewear: ["Top-heavy frames", "Browline", "Wide-top Boston"],
            contour: ["Add support around the hairline and temples", "Keep jaw shading broad and soft", "Pull light upward"],
            celebrities_male: ['Justin Theroux', 'Billie Joe Armstrong'],
            celebrities_female: ['Kelly Osbourne', 'Lucy Liu', 'Billie Eilish']
        },
    },
    zh: {
        oval: {
            name: "椭圆形",
            summary: "额头、颧骨与下颌宽度较为均衡，整体线条柔和流畅。",
            strengths: ["发型、镜框与妆容方向都很容易切换。", "线条不过分强势，能驾驭多种风格氛围。"],
            hairstyle: ["露出额头的中分", "中长层次发", "顶部带蓬松感的长卷发"],
            eyewear: ["波士顿框", "细窄方框", "带猫眼重点的镜框"],
            contour: ["颧骨下方阴影要轻", "用下巴提亮维持纵向流线", "相比重修容，更该重视肤质与质感整理"],
            celebrities_male: ['杨洋', '任嘉伦', '李现'],
            celebrities_female: ['刘亦菲', '刘诗诗', '唐嫣']
        },
        round: {
            name: "圆形",
            summary: "纵向长度较短，下颌线柔和圆润，整体轮廓偏圆。",
            strengths: ["亲和力强，显得年轻。", "与柔和、曲线感强的造型语言很合拍。"],
            hairstyle: ["增加顶部高度的层次剪裁", "落在下颌以下的纵向卷度", "侧分长发"],
            eyewear: ["线条更利落的方框", "有棱角的威灵顿框", "上沿上扬的猫眼框"],
            contour: ["阴影更适合放在下颌外侧", "用提亮强化纵向线条", "腮红斜向晕染更有利"],
            celebrities_male: ['鹿晗', '王源', '魏大勋'],
            celebrities_female: ['赵丽颖', '谭松韵', '虞书欣']
        },
        square: {
            name: "方形",
            summary: "额头与下颌宽度接近，下颌角更明显，骨相感更强。",
            strengths: ["上镜存在感很强。", "非常适合极简、结构感鲜明的风格。"],
            hairstyle: ["掠过下颌线的柔和卷发", "两侧带蓬松感的中长发", "松散层次长发"],
            eyewear: ["圆框", "椭圆金属框", "线条柔和的半框"],
            contour: ["不要只压下颌角，要大面积晕开", "用提亮把视线拉回中庭", "嘴角下方阴影尽量克制"],
            celebrities_male: ['胡歌', '霍建华', '陈伟霆'],
            celebrities_female: ['倪妮', '李宇春', '舒淇']
        },
        heart: {
            name: "心形",
            summary: "上半张脸更宽，越往下巴越明显收窄，呈倒三角轮廓。",
            strengths: ["眼睛和上半张脸更容易成为视觉焦点。", "很适合用配饰与刘海变化做风格调整。"],
            hairstyle: ["下颌附近有蓬松感的波波头", "空气刘海搭配中长卷发", "下半部更丰盈的层次发"],
            eyewear: ["下半部更有重量感的镜框", "无框眼镜", "横向更宽的圆方框"],
            contour: ["重点平衡太阳穴与下半脸", "下巴提亮不要画得过窄", "腮红更适合略微往外放"],
            celebrities_male: ['肖战', '王俊凯', '蔡徐坤'],
            celebrities_female: ['范冰冰', '唐嫣', 'Angelababy']
        },
        oblong: {
            name: "长形",
            summary: "更接近长椭圆轮廓，视觉上会先感到纵向长度；额头完全露出时，脸会显得更长。",
            strengths: ["自然带有精致、成熟的气质。", "只要调整刘海和分线，整体印象就能很快变得更利落。"],
            hairstyle: ["保留一点刘海的 6:4 或 7:3 分线", "不要把两侧推得太短的服帖造型", "不过度露额的纹理短发"],
            eyewear: ["镜片高度足够的威灵顿框", "中等到偏大的波士顿框", "上沿更明确的眉线框"],
            contour: ["在发际线和下巴做轻微阴影来打断长度", "把颧骨高光横向拉开", "腮红更适合横向展开"],
            celebrities_male: ['吴尊', '张亮', '张翰'],
            celebrities_female: ['莫文蔚', '张钧甯', '梁洛施']
        },
        diamond: {
            name: "菱形",
            summary: "颧骨最突出，额头和下颌相对更窄，整体呈菱形结构。",
            strengths: ["立体感强，非常上镜。", "自带高级又独特的气场。"],
            hairstyle: ["能柔化颧骨的侧刘海", "在下颌附近增加体积的发型", "比正中分稍微偏开的分线"],
            eyewear: ["椭圆框", "强调上沿的半框", "线条柔和的眉线框"],
            contour: ["只收最外侧颧骨边缘", "额头和下巴适度补光", "腮红位置比颧骨下方更靠内侧"],
            celebrities_male: ['井柏然', '张艺兴', '华晨宇'],
            celebrities_female: ['章子怡', '钟楚曦', '万茜']
        },
        pear: {
            name: "梨形",
            summary: "下半脸比额头更宽，视觉重量更偏向下颌区域。",
            strengths: ["给人稳定、可靠的印象。", "在短发或结构感强的造型里尤其有力量。"],
            hairstyle: ["增强太阳穴蓬松度的短发", "顶部层次更明显的中长发", "适度露额的蓬松造型"],
            eyewear: ["上半部更有存在感的镜框", "眉线框", "上宽下窄的波士顿框"],
            contour: ["重点补强发际线和太阳穴一带", "下颌阴影要大面积且柔和", "把提亮和视觉重心往上带"],
            celebrities_male: ['王大陆', '陈赫'],
            celebrities_female: ['秦海璐', '容祖儿']
        },
    },
    ja: {
        oval: {
            name: "卵型",
            summary: "額、頬骨、あごの幅が比較的整っていて、全体の線がなめらかな輪郭です。",
            strengths: ["ヘア、眼鏡、メイクの方向転換がしやすいです。", "線が強すぎないので、さまざまなムードを自然にこなせます。"],
            hairstyle: ["額を見せるセンターパート", "ミディアムのレイヤー", "トップにボリュームを持たせたロングウェーブ"],
            eyewear: ["ボストン", "細めのスクエア", "アクセントの効いたキャットアイ"],
            contour: ["頬骨下のシェーディングは薄めに", "あご先のハイライトで縦の流れを維持", "強いシェーディングより質感調整が重要です"],
            celebrities_male: ['木村拓哉', '福山雅治', '竹野内豊'],
            celebrities_female: ['石原さとみ', '北川景子', '綾瀬はるか']
        },
        round: {
            name: "丸型",
            summary: "縦の長さがやや短く、あごの線が丸いため、全体にやわらかな円形の印象です。",
            strengths: ["親しみやすく、若々しく見えます。", "やわらかく曲線的なスタイルと相性が良いです。"],
            hairstyle: ["トップに高さを出すレイヤー", "あご下に落ちる縦のウェーブ", "サイドパートのロングヘア"],
            eyewear: ["直線的なスクエア", "エッジの効いたウェリントン", "上に抜け感のあるキャットアイ"],
            contour: ["シェーディングはフェイス中央よりあご外側へ", "ハイライトで縦ラインを補強", "チークは斜め方向に入れるとまとまりやすいです"],
            celebrities_male: ['櫻井翔', '二宮和也', '千葉雄大'],
            celebrities_female: ['有村架純', '佐々木希', '橋本環奈']
        },
        square: {
            name: "四角型",
            summary: "額とあごの幅が近く、下顎角がやや強く出る骨格です。",
            strengths: ["写真での存在感が強いです。", "ミニマルで構築的なスタイルがよく映えます。"],
            hairstyle: ["あごに触れるやわらかなウェーブ", "サイドに厚みのあるミディアム", "ゆるいロングレイヤー"],
            eyewear: ["ラウンド", "オーバルメタル", "やわらかな曲線のハーフリム"],
            contour: ["エラだけを削らず広くなじませる", "ハイライトで視線を中顔面に戻す", "口角下の陰影は最小限に"],
            celebrities_male: ['長瀬智也', '鈴木亮平', '松本潤'],
            celebrities_female: ['土屋太鳳', '長澤まさみ', '前田敦子']
        },
        heart: {
            name: "ハート型",
            summary: "上顔面の幅が強く見え、あご先に向かってシャープに細くなる逆三角形の輪郭です。",
            strengths: ["目元と上顔面が印象に残りやすいです。", "アクセサリーや前髪の変化がよく効きます。"],
            hairstyle: ["あご付近に厚みを出すボブ", "シースルーバングとミディアムウェーブ", "下にボリュームをつくるレイヤー"],
            eyewear: ["下側に重さのあるフレーム", "リムレス", "横幅のあるラウンドスクエア"],
            contour: ["こめかみと下顔面のバランスを整える", "あご先ハイライトを細く入れすぎない", "チークは少し外側に置くのが有効です"],
            celebrities_male: ['千葉雄大', '志尊淳', '瀬戸康史'],
            celebrities_female: ['広瀬すず', '今田美桜', '多部未華子']
        },
        oblong: {
            name: "面長",
            summary: "縦の長さが先に印象づく、ロングオーバル寄りの輪郭です。額を大きく見せると、さらに面長に見えやすくなります。",
            strengths: ["洗練されて大人っぽい印象をつくりやすいです。", "前髪や分け目を少し変えるだけでも印象を整えやすいです。"],
            hairstyle: ["前髪を少し残した 6:4 から 7:3 の分け目", "サイドを刈り上げすぎないダウンスタイル", "額を全開にしない質感ショート"],
            eyewear: ["天地幅のあるウェリントン", "やや大きめのボストン", "上辺がしっかりしたブロウライン"],
            contour: ["生え際とあご先に薄く陰影を入れて長さを分断", "頬骨ハイライトは横方向に広げる", "チークは横長に入れると収まりやすいです"],
            celebrities_male: ['阿部寛', '小栗旬', '松坂桃李'],
            celebrities_female: ['水原希子', '菜々緒', '松雪泰子']
        },
        diamond: {
            name: "ひし形",
            summary: "頬骨が最も強く見え、額とあごが比較的細く見える輪郭です。",
            strengths: ["立体感が強く、写真映えします。", "洗練された個性が出しやすい骨格です。"],
            hairstyle: ["頬骨をやわらげるサイドバング", "あご周りに厚みを出すスタイル", "真ん中分けより少しずらした分け目"],
            eyewear: ["オーバル", "上辺を強調したハーフリム", "やわらかなブロウライン"],
            contour: ["頬骨の外側だけを軽く整える", "額とあごに光を補う", "チークは頬骨下よりやや内側に置く"],
            celebrities_male: ['菅田将暉', '綾野剛', '成田凌'],
            celebrities_female: ['柴咲コウ', '小松菜奈', '中条あやみ']
        },
        pear: {
            name: "洋なし型",
            summary: "下顔面が額より広く見え、重心があご側に寄りやすい輪郭です。",
            strengths: ["安定感と落ち着きのある印象を与えます。", "ショートや構築的なスタイルで強さが出ます。"],
            hairstyle: ["こめかみにボリュームを足すショート", "上部にレイヤーを入れたミディアム", "額を少し見せるボリュームスタイル"],
            eyewear: ["上側にポイントのあるフレーム", "ブロウライン", "上幅が広いボストン"],
            contour: ["生え際とこめかみ周辺を補強する", "あご下の陰影は広くやわらかく入れる", "視線が上に上がるように光を配置する"],
            celebrities_male: ['香取慎吾', '草彅剛'],
            celebrities_female: ['有村架純', '安藤サクラ']
        },
    },
};

function toSupportedLanguage(lang: string): SupportedLanguage {
    if (lang === "ko" || lang === "en" || lang === "zh" || lang === "ja") {
        return lang;
    }
    return "en";
}

export function getFaceShapeCopy(shape: FaceShapeId, lang: string) {
    const safeLang = toSupportedLanguage(lang);
    return SHAPE_COPY[safeLang][shape];
}

export function resolvePresentedFaceShape(
    result: Pick<FaceShapeAnalysisResult, "faceShape" | "secondaryShape" | "metrics">
): FaceShapeId {
    if (result.faceShape !== "diamond") {
        return result.faceShape;
    }

    const { metrics, secondaryShape } = result;
    const middleLead = metrics.middleThird - (metrics.upperThird + metrics.lowerThird) / 2;
    const longFaceSignal =
        metrics.faceLengthToWidth >= 1.26 &&
        middleLead >= 2.6 &&
        metrics.cheekboneToJaw <= 1.2;
    const strongDiamondSignal =
        metrics.cheekboneToJaw >= 1.18 &&
        metrics.foreheadToJaw <= 0.9 &&
        metrics.chinToJaw <= 0.78;

    if (!strongDiamondSignal && (secondaryShape === "oblong" || longFaceSignal)) {
        return "oblong";
    }

    return result.faceShape;
}

export function buildExecutiveSummary(result: FaceShapeAnalysisResult, lang: string) {
    const safeLang = toSupportedLanguage(lang);
    const presentedShape = resolvePresentedFaceShape(result);
    const shapeCopy = getFaceShapeCopy(presentedShape, safeLang);
    const metrics = result.metrics;
    const borderlineLongOval =
        presentedShape === "oblong" &&
        (result.faceShape === "diamond" || result.secondaryShape === "diamond") &&
        metrics.faceLengthToWidth >= 1.26;

    const lengthLead =
        metrics.faceLengthToWidth >= 1.42
            ? safeLang === "ko"
                ? "가로보다 세로가 확실히 길게 읽히고"
                : safeLang === "zh"
                    ? "纵向长度明显强于横向宽度，"
                    : safeLang === "ja"
                        ? "横幅より縦の長さがはっきり強く見え、"
                        : "The vertical read is clearly longer than the width"
            : metrics.faceLengthToWidth >= 1.28
                ? safeLang === "ko"
                    ? "가로보다 세로가 조금 더 길게 읽히고"
                    : safeLang === "zh"
                        ? "纵向长度略长于横向宽度，"
                        : safeLang === "ja"
                            ? "横幅より縦の長さがやや長く見え、"
                            : "The vertical read is slightly longer than the width"
                : metrics.faceLengthToWidth <= 1.16
                    ? safeLang === "ko"
                        ? "세로 길이보다 가로 폭이 더 도드라지고"
                        : safeLang === "zh"
                            ? "横向宽度比纵向长度更突出，"
                            : safeLang === "ja"
                                ? "縦の長さより横幅がやや強く見え、"
                                : "The width reads slightly stronger than the vertical length"
                    : safeLang === "ko"
                        ? "세로 길이와 가로 폭의 균형이 비교적 안정적이고"
                        : safeLang === "zh"
                            ? "纵向长度与横向宽度的平衡相对稳定，"
                            : safeLang === "ja"
                                ? "縦の長さと横幅のバランスは比較的安定していて、"
                                : "Length and width stay comparatively balanced";

    const widthLead =
        metrics.foreheadToJaw >= 1.1
            ? safeLang === "ko"
                ? "상부 폭이 하부보다 조금 더 넓은 편입니다."
                : safeLang === "zh"
                    ? "上半脸的宽度略强于下半脸。"
                    : safeLang === "ja"
                        ? "上顔面の幅が下顔面よりやや強く見えます。"
                        : "The upper face reads a little wider than the lower face."
            : metrics.foreheadToJaw <= 0.91
                ? safeLang === "ko"
                    ? "하부 폭이 상부보다 더 강하게 읽힙니다."
                    : safeLang === "zh"
                        ? "下半脸的宽度比上半脸更明显。"
                        : safeLang === "ja"
                            ? "下顔面の幅が上顔面よりやや強く見えます。"
                            : "The lower face reads a bit stronger than the upper face."
                : safeLang === "ko"
                    ? "상하 폭의 균형은 비교적 안정적입니다."
                    : safeLang === "zh"
                        ? "上下宽度的平衡整体较稳定。"
                        : safeLang === "ja"
                            ? "上下の幅バランスは比較的安定しています。"
                            : "Upper and lower widths stay comparatively stable.";

    const shapeSummary = borderlineLongOval
        ? safeLang === "ko"
            ? "광대가 약간 도드라져도 기본 골격은 다이아몬드형보다 긴 타원형에 더 가깝습니다."
            : safeLang === "zh"
                ? "即使颧骨略有存在感，基础骨相也更接近长椭圆而不是菱形。"
                : safeLang === "ja"
                    ? "頬骨にやや存在感があっても、骨格の軸はひし形より面長寄りです。"
                    : "Even with slight cheekbone emphasis, the base structure reads closer to a long oval than a diamond."
        : shapeCopy.summary;

    if (borderlineLongOval && safeLang === "ko") {
        return `${lengthLead} ${widthLead}\n${shapeSummary}`.trim();
    }
    return `${lengthLead} ${widthLead} ${shapeSummary}`.trim();
}

export function getMetricSummary(result: FaceShapeAnalysisResult, lang: string) {
    const safeLang = toSupportedLanguage(lang);
    const metrics = result.metrics;

    const lengthSummary =
        metrics.faceLengthToWidth > 1.5
            ? safeLang === "ko"
                ? "얼굴 길이가 긴 편으로 보입니다."
                : safeLang === "zh"
                    ? "纵向长度读感偏长。"
                    : safeLang === "ja"
                        ? "縦の長さがやや長く見えます。"
                        : "Your vertical length reads distinctly longer."
            : metrics.faceLengthToWidth < 1.22
                ? safeLang === "ko"
                    ? "얼굴 길이가 짧고 폭이 넓게 보입니다."
                    : safeLang === "zh"
                        ? "整体更偏短宽。"
                        : safeLang === "ja"
                            ? "縦が短く、横幅がやや広く見えます。"
                            : "Your face reads relatively short against its width."
                : safeLang === "ko"
                    ? "얼굴 길이와 폭이 비교적 균형 있게 보입니다."
                    : safeLang === "zh"
                        ? "长度与宽度整体比较均衡。"
                        : safeLang === "ja"
                            ? "縦の長さと横幅は比較的バランス良く見えます。"
                            : "Length and width read comparatively balanced.";

    const widthSummary =
        metrics.foreheadToJaw > 1.12
            ? safeLang === "ko"
                ? "이마 쪽이 턱보다 조금 더 넓게 보입니다."
                : safeLang === "zh"
                    ? "额头区域看起来比下颌略宽。"
                    : safeLang === "ja"
                        ? "額側があごよりやや広く見えます。"
                        : "Upper-face width is stronger than the jaw."
            : metrics.foreheadToJaw < 0.91
                ? safeLang === "ko"
                    ? "턱 쪽이 이마보다 더 넓게 보입니다."
                    : safeLang === "zh"
                        ? "下颌区域看起来比额头更宽。"
                        : safeLang === "ja"
                            ? "あご側が額より広く見えます。"
                            : "Lower-face width is comparatively stronger."
                : safeLang === "ko"
                    ? "이마와 턱 폭 차이가 크지 않습니다."
                    : safeLang === "zh"
                        ? "额头与下颌的宽度差距不大。"
                        : safeLang === "ja"
                            ? "額とあごの幅差は大きくありません。"
                            : "Forehead and jaw widths stay fairly close.";

    const jawSummary =
        metrics.jawAngle < 118
            ? safeLang === "ko"
                ? "턱선이 비교적 각져 보입니다."
                : safeLang === "zh"
                    ? "下颌线更偏有棱角。"
                    : safeLang === "ja"
                        ? "あごの線は比較的シャープに見えます。"
                        : "Your jaw angle reads more defined."
            : metrics.jawAngle > 132
                ? safeLang === "ko"
                    ? "턱선이 부드럽고 둥글게 보입니다."
                    : safeLang === "zh"
                        ? "下颌线更柔和圆润。"
                        : safeLang === "ja"
                            ? "あごの線はやわらかく丸く見えます。"
                            : "Your jawline reads softer and rounder."
                : safeLang === "ko"
                    ? "턱선은 각짐과 부드러움이 중간 정도입니다."
                    : safeLang === "zh"
                        ? "下颌线介于锐利与柔和之间。"
                        : safeLang === "ja"
                            ? "あごの線はシャープさとやわらかさの中間です。"
                            : "Your jawline sits in a moderate definition range.";

    return [lengthSummary, widthSummary, jawSummary];
}
