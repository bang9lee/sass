import type { FaceShapeAnalysisResult, FaceShapeId } from "./face-shape-analysis-official";

type SupportedLanguage = "ko" | "en";

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
            name: "긴 얼굴형",
            summary: "가로 너비보다 세로 길이가 눈에 띄게 길고, 전체적으로 폭이 좁은 형태입니다.",
            strengths: ["세방드고 성숙한 분위기를 만들기 쉽습니다.", "에디토리얼한 실루엣을 잘 소화합니다."],
            hairstyle: ["앞머리로 세로 길이를 분절", "옆볼륨이 있는 레이어드", "턱선 옆으로 퍼지는 미디엄 컬"],
            eyewear: ["세로 깊이가 있는 오버사이즈", "굵은 브로우라인", "가로폭 넓은 프레임"],
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
            summary: "A longer vertical read, often with stronger lower-third length.",
            strengths: ["Naturally refined and mature", "Excellent for editorial silhouettes"],
            hairstyle: ["Bangs to break vertical length", "Side volume layers", "Medium curls that widen near the jaw"],
            eyewear: ["Oversized frames with height", "Bold browline", "Wide-set shapes"],
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
};

export function getFaceShapeCopy(shape: FaceShapeId, lang: string) {
    const safeLang: SupportedLanguage = lang === "ko" ? "ko" : "en";
    return SHAPE_COPY[safeLang][shape];
}

export function buildExecutiveSummary(result: FaceShapeAnalysisResult, lang: string) {
    const safeLang: SupportedLanguage = lang === "ko" ? "ko" : "en";
    const shapeCopy = getFaceShapeCopy(result.faceShape, safeLang);
    const metrics = result.metrics;

    const lengthLead =
        metrics.faceLengthToWidth >= 1.42
            ? safeLang === "ko"
                ? "가로보다 세로가 확실히 길게 읽히고"
                : "The vertical read is clearly longer than the width"
            : metrics.faceLengthToWidth >= 1.28
                ? safeLang === "ko"
                    ? "가로보다 세로가 조금 더 길게 읽히고"
                    : "The vertical read is slightly longer than the width"
                : metrics.faceLengthToWidth <= 1.16
                    ? safeLang === "ko"
                        ? "세로 길이보다 가로 폭이 더 도드라지고"
                        : "The width reads slightly stronger than the vertical length"
                    : safeLang === "ko"
                        ? "세로 길이와 가로 폭의 균형이 비교적 안정적이고"
                        : "Length and width stay comparatively balanced";

    const widthLead =
        metrics.foreheadToJaw >= 1.08
            ? safeLang === "ko"
                ? "상부 폭이 하부보다 조금 더 넓은 편입니다."
                : "The upper face reads a little wider than the lower face."
            : metrics.foreheadToJaw <= 0.95
                ? safeLang === "ko"
                    ? "하부 폭이 상부보다 더 강하게 읽힙니다."
                    : "The lower face reads a bit stronger than the upper face."
                : safeLang === "ko"
                    ? "상하 폭의 균형은 비교적 안정적입니다."
                    : "Upper and lower widths stay comparatively stable.";

    return safeLang === "ko"
        ? `${lengthLead}, ${widthLead} ${shapeCopy.summary}`
        : `${lengthLead}, ${widthLead} ${shapeCopy.summary}`;
}

export function getMetricSummary(result: FaceShapeAnalysisResult, lang: string) {
    const isKo = lang === "ko";
    const metrics = result.metrics;

    const lengthSummary =
        metrics.faceLengthToWidth > 1.5
            ? isKo
                ? "얼굴 길이가 긴 편으로 보입니다."
                : "Your vertical length reads distinctly longer."
            : metrics.faceLengthToWidth < 1.22
                ? isKo
                    ? "얼굴 길이가 짧고 폭이 넓게 보입니다."
                    : "Your face reads relatively short against its width."
                : isKo
                    ? "얼굴 길이와 폭이 비교적 균형 있게 보입니다."
                    : "Length and width read comparatively balanced.";

    const widthSummary =
        metrics.foreheadToJaw > 1.1
            ? isKo
                ? "이마 쪽이 턱보다 조금 더 넓게 보입니다."
                : "Upper-face width is stronger than the jaw."
            : metrics.foreheadToJaw < 0.95
                ? isKo
                    ? "턱 쪽이 이마보다 더 넓게 보입니다."
                    : "Lower-face width is comparatively stronger."
                : isKo
                    ? "이마와 턱 폭 차이가 크지 않습니다."
                    : "Forehead and jaw widths stay fairly close.";

    const jawSummary =
        metrics.jawAngle < 118
            ? isKo
                ? "턱선이 비교적 각져 보입니다."
                : "Your jaw angle reads more defined."
            : metrics.jawAngle > 132
                ? isKo
                    ? "턱선이 부드럽고 둥글게 보입니다."
                    : "Your jawline reads softer and rounder."
                : isKo
                    ? "턱선은 각짐과 부드러움이 중간 정도입니다."
                    : "Your jawline sits in a moderate definition range.";

    return [lengthSummary, widthSummary, jawSummary];
}
