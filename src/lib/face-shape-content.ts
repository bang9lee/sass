import type { FaceShapeAnalysisResult, FaceShapeId } from "./face-shape-analysis-official";

type SupportedLanguage = "ko" | "en" | "zh" | "ja";

type ShapeCopy = {
    name: string;
    summary: string;
    strengths: string[];
    hairstyle: string[];
    eyewear: string[];
    contour: string[];
};

const SHAPE_COPY: Record<SupportedLanguage, Record<FaceShapeId, ShapeCopy>> = {
    ko: {
        oval: {
            name: "계란형",
            summary: "가장 이상적인 비율로, 이마와 턱의 밸런스가 좋고 부드러운 곡선 형태입니다.",
            strengths: ["헤어, 안경, 메이크업 방향 전환이 쉽습니다.", "선이 과하게 강하지 않아 다양한 무드를 소화합니다."],
            hairstyle: ["이마를 드러내는 센터 파트", "중단발 레이어드", "정수리 볼륨을 살린 롱 웨이브"],
            eyewear: ["보스턴", "슬림 스퀘어", "캣아이 포인트 프레임"],
            contour: ["광대 아래 음영은 얕게", "턱 끝 하이라이트로 세로 흐름 유지", "쉐이딩보다 피부결 정리가 더 중요"],
        },
        round: {
            name: "둥근형",
            summary: "가로와 세로 비율이 거의 비슷하며, 턱선이 둥글고 볼살이 있어 귀여운 인상을 줍니다.",
            strengths: ["친근하고 동안 이미지가 강합니다.", "부드러운 곡선 스타일과 궁합이 좋습니다."],
            hairstyle: ["정수리 볼륨을 높인 레이어드 컷", "턱 아래로 떨어지는 세로 웨이브", "사이드 파트 롱 헤어"],
            eyewear: ["직선감 있는 스퀘어", "엣지 있는 웰링턴", "위쪽 라인이 살아있는 캣아이"],
            contour: ["광대보다 턱선 바깥쪽에 가벼운 음영", "코 옆과 턱끝 하이라이트로 세로축 강조", "블러셔는 사선 방향이 유리"],
        },
        square: {
            name: "각진형",
            summary: "이마, 광대, 하관의 너비가 비슷하며, 턱선이 뚜렷하게 각져 있는 형태입니다.",
            strengths: ["골격이 또렷해 카메라에서 존재감이 강합니다.", "미니멀하고 구조적인 스타일이 잘 받습니다."],
            hairstyle: ["턱선을 스치듯 감싸는 웨이브", "옆머리 볼륨이 있는 미디엄 컷", "루즈한 컬의 롱 레이어드"],
            eyewear: ["라운드", "오벌 메탈", "곡선이 있는 하프림"],
            contour: ["턱 모서리만 과하게 누르지 말고 넓게 블렌딩", "광대 하이라이트로 중앙 집중", "입가 아래 음영은 최소화"],
        },
        heart: {
            name: "하트형",
            summary: "이마와 광대가 넓고, 턱 끝으로 갈수록 좁고 뾰족해지는 역삼각형 형태입니다.",
            strengths: ["눈과 상안부가 돋보여 인상이 선명합니다.", "포인트 액세서리와 앞머리 변화가 잘 먹힙니다."],
            hairstyle: ["턱선 근처 볼륨이 있는 보브", "시스루뱅 + 미디엄 웨이브", "하단부가 풍성한 레이어드"],
            eyewear: ["하단 무게감 있는 프레임", "림리스", "가로 폭이 넓은 라운드 스퀘어"],
            contour: ["관자놀이와 턱선 사이 밸런스를 맞추는 쉐이딩", "턱끝 하이라이트를 너무 좁게 넣지 않기", "블러셔는 볼 중앙보다 바깥쪽"],
        },
        oblong: {
            name: "긴형",
            summary: "가로보다 세로가 먼저 읽히는 긴 타원형에 가까운 형태입니다. 이마 노출이 클수록 길이감이 더 강조될 수 있습니다.",
            strengths: ["세련되고 성숙한 분위기를 만들기 쉽습니다.", "앞머리와 가르마만 잘 잡아도 인상이 빠르게 정돈됩니다."],
            hairstyle: ["앞머리를 살짝 남긴 6:4~7:3 가르마", "옆머리를 너무 짧게 밀지 않는 다운펌", "이마를 전부 열지 않는 텍스처 크롭"],
            eyewear: ["세로 깊이가 있는 웰링턴", "중간~약간 큰 보스턴", "상단선이 또렷한 브로우라인"],
            contour: ["헤어라인과 턱끝 쉐이딩으로 길이 분절", "광대 하이라이트를 수평으로 확장", "블러셔는 코 옆에서 가로로 연결"],
        },
        diamond: {
            name: "다이아몬드형",
            summary: "이마와 턱이 좁고, 가운데 광대뼈 부위가 가장 넓게 발달한 마름모 형태입니다.",
            strengths: ["입체감이 강해서 사진에서 선이 살아납니다.", "고급스럽고 유니크한 무드가 강합니다."],
            hairstyle: ["광대를 덮는 사이드 뱅", "턱선 쪽 볼륨이 있는 컷", "센터 파트보다 살짝 치우친 파트"],
            eyewear: ["타원형", "상단이 강조된 하프림", "부드러운 브로우라인"],
            contour: ["광대 최외곽은 눌러주되 중앙 볼륨은 남기기", "이마와 턱에 하이라이트를 보충", "블러셔는 광대 아래보다 안쪽 중심"],
        },
        pear: {
            name: "배형",
            summary: "턱과 하부 폭이 이마보다 넓어 하단 안정감이 더 크게 읽히는 얼굴형입니다.",
            strengths: ["강단 있고 안정적인 인상을 줍니다.", "쇼트컷과 구조적인 스타일에서 힘을 발휘합니다."],
            hairstyle: ["관자놀이 볼륨을 키운 숏컷", "상부 레이어가 살아있는 미디엄", "이마 노출이 있는 볼륨 헤어"],
            eyewear: ["상단 포인트가 있는 프레임", "브로우라인", "윗부분이 넓은 보스턴"],
            contour: ["헤어라인과 관자놀이 쪽 볼륨 보강", "턱 아래 음영은 넓고 옅게", "시선이 위로 가는 하이라이트 설계"],
        },
    },
    en: {
        oval: {
            name: "Oval",
            summary: "Forehead, cheekbone, and jaw widths stay fairly balanced with a stable length ratio.",
            strengths: ["You can shift easily between soft and structured styling.", "Most frames and hair silhouettes work without fighting your proportions."],
            hairstyle: ["Center part with exposed forehead", "Layered lob", "Long soft waves with crown lift"],
            eyewear: ["Boston", "Slim square", "Cat-eye accent frames"],
            contour: ["Keep cheek shading light", "Use chin highlight to preserve length", "Texture correction matters more than hard contour"],
        },
        round: {
            name: "Round",
            summary: "Shorter vertical length and a softer jaw create a gentle, circular outline.",
            strengths: ["Friendly, youthful impression", "Pairs naturally with soft styling language"],
            hairstyle: ["Crown-lifting layers", "Vertical waves that fall below the jaw", "Side-parted longer hair"],
            eyewear: ["Structured square", "Sharp Wellington", "Lifted cat-eye"],
            contour: ["Shade outside the jaw rather than the center of the face", "Use highlight to reinforce a vertical line", "Diagonal blush placement helps"],
        },
        square: {
            name: "Square",
            summary: "Forehead and jaw widths are close, with a stronger mandibular angle.",
            strengths: ["Strong camera presence", "Handles minimal and architectural styling well"],
            hairstyle: ["Soft waves skimming the jaw", "Medium cuts with side volume", "Loose long layers"],
            eyewear: ["Round", "Oval metal", "Softly curved half-rim"],
            contour: ["Blend the jaw broadly instead of carving only the corners", "Pull attention to the mid-face with highlight", "Keep lower-mouth shading minimal"],
        },
        heart: {
            name: "Heart",
            summary: "Upper-face width reads stronger while the chin tapers more quickly.",
            strengths: ["Eyes and upper face stand out clearly", "Works well with accessory and fringe changes"],
            hairstyle: ["Bob with volume near the jaw", "See-through bangs with medium waves", "Layers that build fullness lower down"],
            eyewear: ["Frames with lower weight", "Rimless", "Wide rounded-square shapes"],
            contour: ["Balance the temples and lower face", "Avoid an overly tiny chin highlight", "Place blush slightly outward"],
        },
        oblong: {
            name: "Oblong",
            summary: "A long-oval read where vertical length shows first. The face can read even longer when the forehead is fully exposed.",
            strengths: ["Naturally refined and mature", "Small fringe and parting changes make a visible difference quickly"],
            hairstyle: ["Soft 6:4 or 7:3 part with some fringe", "Down-perm or taper that keeps some side width", "Textured crop that avoids a fully open forehead"],
            eyewear: ["Wellington frames with lens height", "Medium-to-large Boston frames", "Strong upper-line browline"],
            contour: ["Shade the hairline and chin to shorten the read", "Stretch highlight horizontally across the cheeks", "Keep blush placement more horizontal"],
        },
        diamond: {
            name: "Diamond",
            summary: "Cheekbones dominate while forehead and jaw stay comparatively narrow.",
            strengths: ["Photogenic dimensionality", "Strong, refined uniqueness"],
            hairstyle: ["Side bangs that soften the cheek area", "Cuts with jaw-area fullness", "Slightly off-center parting"],
            eyewear: ["Oval", "Top-emphasis half-rim", "Soft browline"],
            contour: ["Refine only the outermost cheek edge", "Restore light to the forehead and chin", "Keep blush slightly inward"],
        },
        pear: {
            name: "Pear",
            summary: "The lower face reads wider than the forehead, giving more weight to the jaw area.",
            strengths: ["Stable, grounded impression", "Can look especially strong in short and structured cuts"],
            hairstyle: ["Temple-boosting short cuts", "Medium cuts with upper layering", "Volume styles that open the forehead"],
            eyewear: ["Top-heavy frames", "Browline", "Wide-top Boston"],
            contour: ["Add support around the hairline and temples", "Keep jaw shading broad and soft", "Pull light upward"],
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
        },
        round: {
            name: "圆形",
            summary: "纵向长度较短，下颌线柔和圆润，整体轮廓偏圆。",
            strengths: ["亲和力强，显得年轻。", "与柔和、曲线感强的造型语言很合拍。"],
            hairstyle: ["增加顶部高度的层次剪裁", "落在下颌以下的纵向卷度", "侧分长发"],
            eyewear: ["线条更利落的方框", "有棱角的威灵顿框", "上沿上扬的猫眼框"],
            contour: ["阴影更适合放在下颌外侧", "用提亮强化纵向线条", "腮红斜向晕染更有利"],
        },
        square: {
            name: "方形",
            summary: "额头与下颌宽度接近，下颌角更明显，骨相感更强。",
            strengths: ["上镜存在感很强。", "非常适合极简、结构感鲜明的风格。"],
            hairstyle: ["掠过下颌线的柔和卷发", "两侧带蓬松感的中长发", "松散层次长发"],
            eyewear: ["圆框", "椭圆金属框", "线条柔和的半框"],
            contour: ["不要只压下颌角，要大面积晕开", "用提亮把视线拉回中庭", "嘴角下方阴影尽量克制"],
        },
        heart: {
            name: "心形",
            summary: "上半张脸更宽，越往下巴越明显收窄，呈倒三角轮廓。",
            strengths: ["眼睛和上半张脸更容易成为视觉焦点。", "很适合用配饰与刘海变化做风格调整。"],
            hairstyle: ["下颌附近有蓬松感的波波头", "空气刘海搭配中长卷发", "下半部更丰盈的层次发"],
            eyewear: ["下半部更有重量感的镜框", "无框眼镜", "横向更宽的圆方框"],
            contour: ["重点平衡太阳穴与下半脸", "下巴提亮不要画得过窄", "腮红更适合略微往外放"],
        },
        oblong: {
            name: "长形",
            summary: "更接近长椭圆轮廓，视觉上会先感到纵向长度；额头完全露出时，脸会显得更长。",
            strengths: ["自然带有精致、成熟的气质。", "只要调整刘海和分线，整体印象就能很快变得更利落。"],
            hairstyle: ["保留一点刘海的 6:4 或 7:3 分线", "不要把两侧推得太短的服帖造型", "不过度露额的纹理短发"],
            eyewear: ["镜片高度足够的威灵顿框", "中等到偏大的波士顿框", "上沿更明确的眉线框"],
            contour: ["在发际线和下巴做轻微阴影来打断长度", "把颧骨高光横向拉开", "腮红更适合横向展开"],
        },
        diamond: {
            name: "菱形",
            summary: "颧骨最突出，额头和下颌相对更窄，整体呈菱形结构。",
            strengths: ["立体感强，非常上镜。", "自带高级又独特的气场。"],
            hairstyle: ["能柔化颧骨的侧刘海", "在下颌附近增加体积的发型", "比正中分稍微偏开的分线"],
            eyewear: ["椭圆框", "强调上沿的半框", "线条柔和的眉线框"],
            contour: ["只收最外侧颧骨边缘", "额头和下巴适度补光", "腮红位置比颧骨下方更靠内侧"],
        },
        pear: {
            name: "梨形",
            summary: "下半脸比额头更宽，视觉重量更偏向下颌区域。",
            strengths: ["给人稳定、可靠的印象。", "在短发或结构感强的造型里尤其有力量。"],
            hairstyle: ["增强太阳穴蓬松度的短发", "顶部层次更明显的中长发", "适度露额的蓬松造型"],
            eyewear: ["上半部更有存在感的镜框", "眉线框", "上宽下窄的波士顿框"],
            contour: ["重点补强发际线和太阳穴一带", "下颌阴影要大面积且柔和", "把提亮和视觉重心往上带"],
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
        },
        round: {
            name: "丸型",
            summary: "縦の長さがやや短く、あごの線が丸いため、全体にやわらかな円形の印象です。",
            strengths: ["親しみやすく、若々しく見えます。", "やわらかく曲線的なスタイルと相性が良いです。"],
            hairstyle: ["トップに高さを出すレイヤー", "あご下に落ちる縦のウェーブ", "サイドパートのロングヘア"],
            eyewear: ["直線的なスクエア", "エッジの効いたウェリントン", "上に抜け感のあるキャットアイ"],
            contour: ["シェーディングはフェイス中央よりあご外側へ", "ハイライトで縦ラインを補強", "チークは斜め方向に入れるとまとまりやすいです"],
        },
        square: {
            name: "四角型",
            summary: "額とあごの幅が近く、下顎角がやや強く出る骨格です。",
            strengths: ["写真での存在感が強いです。", "ミニマルで構築的なスタイルがよく映えます。"],
            hairstyle: ["あごに触れるやわらかなウェーブ", "サイドに厚みのあるミディアム", "ゆるいロングレイヤー"],
            eyewear: ["ラウンド", "オーバルメタル", "やわらかな曲線のハーフリム"],
            contour: ["エラだけを削らず広くなじませる", "ハイライトで視線を中顔面に戻す", "口角下の陰影は最小限に"],
        },
        heart: {
            name: "ハート型",
            summary: "上顔面の幅が強く見え、あご先に向かってシャープに細くなる逆三角形の輪郭です。",
            strengths: ["目元と上顔面が印象に残りやすいです。", "アクセサリーや前髪の変化がよく効きます。"],
            hairstyle: ["あご付近に厚みを出すボブ", "シースルーバングとミディアムウェーブ", "下にボリュームをつくるレイヤー"],
            eyewear: ["下側に重さのあるフレーム", "リムレス", "横幅のあるラウンドスクエア"],
            contour: ["こめかみと下顔面のバランスを整える", "あご先ハイライトを細く入れすぎない", "チークは少し外側に置くのが有効です"],
        },
        oblong: {
            name: "面長",
            summary: "縦の長さが先に印象づく、ロングオーバル寄りの輪郭です。額を大きく見せると、さらに面長に見えやすくなります。",
            strengths: ["洗練されて大人っぽい印象をつくりやすいです。", "前髪や分け目を少し変えるだけでも印象を整えやすいです。"],
            hairstyle: ["前髪を少し残した 6:4 から 7:3 の分け目", "サイドを刈り上げすぎないダウンスタイル", "額を全開にしない質感ショート"],
            eyewear: ["天地幅のあるウェリントン", "やや大きめのボストン", "上辺がしっかりしたブロウライン"],
            contour: ["生え際とあご先に薄く陰影を入れて長さを分断", "頬骨ハイライトは横方向に広げる", "チークは横長に入れると収まりやすいです"],
        },
        diamond: {
            name: "ひし形",
            summary: "頬骨が最も強く見え、額とあごが比較的細く見える輪郭です。",
            strengths: ["立体感が強く、写真映えします。", "洗練された個性が出しやすい骨格です。"],
            hairstyle: ["頬骨をやわらげるサイドバング", "あご周りに厚みを出すスタイル", "真ん中分けより少しずらした分け目"],
            eyewear: ["オーバル", "上辺を強調したハーフリム", "やわらかなブロウライン"],
            contour: ["頬骨の外側だけを軽く整える", "額とあごに光を補う", "チークは頬骨下よりやや内側に置く"],
        },
        pear: {
            name: "洋なし型",
            summary: "下顔面が額より広く見え、重心があご側に寄りやすい輪郭です。",
            strengths: ["安定感と落ち着きのある印象を与えます。", "ショートや構築的なスタイルで強さが出ます。"],
            hairstyle: ["こめかみにボリュームを足すショート", "上部にレイヤーを入れたミディアム", "額を少し見せるボリュームスタイル"],
            eyewear: ["上側にポイントのあるフレーム", "ブロウライン", "上幅が広いボストン"],
            contour: ["生え際とこめかみ周辺を補強する", "あご下の陰影は広くやわらかく入れる", "視線が上に上がるように光を配置する"],
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
