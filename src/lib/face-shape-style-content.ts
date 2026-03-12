import type { FaceShapeId, FaceStyleTarget } from "./face-shape-analysis-official";
import { getFaceShapeCopy } from "./face-shape-content";

type SupportedLanguage = "ko" | "en" | "zh" | "ja";

type FaceStyleTargetMeta = {
    label: string;
    description: string;
    badge: string;
};

type FaceStyleTargetCopy = {
    title: string;
    body: string;
    feminine: FaceStyleTargetMeta;
    masculine: FaceStyleTargetMeta;
    neutral: FaceStyleTargetMeta;
};

type StyleRecommendations = {
    hairstyle: string[];
    eyewear: string[];
    contour: string[];
};

function toSupportedLanguage(lang: string): SupportedLanguage {
    if (lang === "ko" || lang === "en" || lang === "zh" || lang === "ja") {
        return lang;
    }
    return "en";
}

export function toFaceStyleTarget(value?: string | null): FaceStyleTarget {
    if (value === "feminine" || value === "masculine" || value === "neutral") {
        return value;
    }
    return "neutral";
}

const STYLE_TARGET_COPY: Record<SupportedLanguage, FaceStyleTargetCopy> = {
    ko: {
        title: "추천 스타일 방향",
        body: "얼굴형 판정은 그대로 두고, 헤어·안경·윤곽 추천만 여성/남성/중성 기준으로 바꿉니다.",
        feminine: {
            label: "여성 스타일",
            description: "앞머리, 볼륨, 메이크업 포인트를 여성 기준으로 맞춥니다.",
            badge: "여성 스타일 기준",
        },
        masculine: {
            label: "남성 스타일",
            description: "가르마, 짧은 컷, 그루밍 포인트를 남성 기준으로 맞춥니다.",
            badge: "남성 스타일 기준",
        },
        neutral: {
            label: "중성 스타일",
            description: "성별 고정 없이 가장 범용적인 추천으로 보여줍니다.",
            badge: "중성 스타일 기준",
        },
    },
    en: {
        title: "Style Direction",
        body: "Keep the face-shape reading the same and switch only the hair, eyewear, and contour advice.",
        feminine: {
            label: "Feminine",
            description: "Bias the tips toward softer volume, fringe choices, and makeup placement.",
            badge: "Feminine Track",
        },
        masculine: {
            label: "Masculine",
            description: "Bias the tips toward parting, shorter cuts, and sharper grooming structure.",
            badge: "Masculine Track",
        },
        neutral: {
            label: "Neutral",
            description: "Keep the advice broadly wearable without locking into one presentation.",
            badge: "Neutral Track",
        },
    },
    zh: {
        title: "推荐风格方向",
        body: "脸型判定保持不变，只切换发型、眼镜与轮廓修饰建议的呈现方向。",
        feminine: {
            label: "女性风格",
            description: "将刘海、体积感与妆面重点偏向更柔和的女性化方向。",
            badge: "女性风格推荐",
        },
        masculine: {
            label: "男性风格",
            description: "将建议偏向分线、短发轮廓与更利落的修饰方式。",
            badge: "男性风格推荐",
        },
        neutral: {
            label: "中性风格",
            description: "不固定性别表达，提供最通用的推荐方向。",
            badge: "中性风格推荐",
        },
    },
    ja: {
        title: "推奨スタイル方向",
        body: "顔型判定はそのままにして、ヘア・眼鏡・輪郭の提案だけを切り替えます。",
        feminine: {
            label: "女性寄り",
            description: "前髪、ボリューム、メイクの重心をより柔らかい方向へ寄せます。",
            badge: "女性寄りの提案",
        },
        masculine: {
            label: "男性寄り",
            description: "分け目、短めのカット、シャープなグルーミング方向へ寄せます。",
            badge: "男性寄りの提案",
        },
        neutral: {
            label: "中性的",
            description: "性別表現を固定せず、最も汎用的な提案を表示します。",
            badge: "中性的な提案",
        },
    },
};

const STYLE_TARGET_OVERRIDES: Record<
    SupportedLanguage,
    Record<Exclude<FaceStyleTarget, "neutral">, Record<FaceShapeId, StyleRecommendations>>
> = {
    ko: {
        feminine: {
            oval: {
                hairstyle: ["시스루뱅이 있는 롱 레이어드", "턱선을 감싸는 C컬 보브", "사이드 볼륨이 부드러운 웨이브"],
                eyewear: ["부드러운 보스턴", "슬림 캣아이", "얇은 오벌 메탈"],
                contour: ["광대 아래 음영은 아주 얕게", "턱끝 하이라이트는 섬세하게", "블러셔는 볼 중앙보다 살짝 바깥쪽"],
            },
            round: {
                hairstyle: ["정수리 볼륨을 살린 미디엄 레이어드", "턱 아래로 떨어지는 세로 웨이브", "가벼운 앞머리가 있는 롱 레이어드"],
                eyewear: ["슬림 스퀘어", "위로 올라가는 캣아이", "상단선이 또렷한 웰링턴"],
                contour: ["턱 바깥쪽 음영으로 라인 정리", "콧대와 턱끝 하이라이트 추가", "블러셔는 사선 방향으로 연결"],
            },
            square: {
                hairstyle: ["턱선을 부드럽게 감싸는 S컬 보브", "옆선이 부드러운 미디엄 레이어드", "시스루뱅과 롱 웨이브"],
                eyewear: ["오벌 메탈", "라운드 프레임", "얇은 하프림"],
                contour: ["사각 턱 음영은 넓게 풀어주기", "광대 상단 하이라이트로 시선 올리기", "입가 아래 음영은 최소화"],
            },
            heart: {
                hairstyle: ["턱선 근처에 볼륨을 두는 보브", "커튼뱅과 미디엄 웨이브", "하단부가 풍성한 롱 레이어드"],
                eyewear: ["림리스", "하단 무게감 있는 라운드 스퀘어", "얇은 오벌 프레임"],
                contour: ["관자놀이 볼륨을 부드럽게 보강", "턱끝 하이라이트는 너무 작지 않게", "블러셔는 바깥쪽으로 살짝 빼기"],
            },
            oblong: {
                hairstyle: ["앞머리를 살린 빌드펌 또는 레이어드 웨이브", "옆 볼륨이 있는 C컬 미디엄", "정수리 높이를 눌러주는 세미롱 웨이브"],
                eyewear: ["세로 깊이 있는 보스턴", "중간 크기 웰링턴", "라운드 스퀘어"],
                contour: ["헤어라인과 턱끝에 가벼운 음영", "광대 하이라이트를 수평으로 확장", "블러셔는 가로로 넓게 연결"],
            },
            diamond: {
                hairstyle: ["광대를 덮는 사이드뱅 보브", "턱선 쪽 볼륨이 있는 미디엄", "곡선이 부드러운 롱 레이어드"],
                eyewear: ["오벌", "부드러운 캣아이", "상단선이 완만한 하프림"],
                contour: ["광대 최외곽만 약하게 정리", "이마와 턱끝에 빛 보강", "블러셔는 광대 아래보다 안쪽"],
            },
            pear: {
                hairstyle: ["관자놀이 볼륨을 살린 숏보브", "상부 레이어가 있는 미디엄", "시스루뱅과 볼륨 웨이브"],
                eyewear: ["브로우라인", "상단 포인트 보스턴", "위쪽이 넓은 캣아이"],
                contour: ["관자놀이와 헤어라인을 밝게 보강", "턱 아래 음영은 넓고 옅게", "시선이 위로 가는 하이라이트 설계"],
            },
        },
        masculine: {
            oval: {
                hairstyle: ["6:4 가르마", "다운펌이 들어간 클래식 투블럭", "질감이 살아 있는 쇼트 크롭"],
                eyewear: ["직선 웰링턴", "브로우라인", "슬림 스퀘어"],
                contour: ["콧대와 턱선만 깔끔하게 정리", "광대 음영은 최소화", "눈썹 골격과 피부결 정돈에 집중"],
            },
            round: {
                hairstyle: ["윗머리 볼륨을 준 짧은 리젠트", "옆 볼륨을 남긴 가르마펌", "세로 길이감을 살리는 텍스처 크롭"],
                eyewear: ["각진 웰링턴", "두께감 있는 스퀘어", "브로우라인"],
                contour: ["턱선 바깥쪽만 짧게 정리", "콧대 하이라이트는 좁게", "윤곽 보정은 세로축 중심으로"],
            },
            square: {
                hairstyle: ["정리된 크루컷", "낮은 투블럭 가르마", "짧은 질감이 있는 리프컷"],
                eyewear: ["라운드 메탈", "오벌 프레임", "얇은 브로우라인"],
                contour: ["하관을 과하게 누르지 않기", "코 옆과 미간 위주로 정돈", "메이크업보다 피부결 정리에 집중"],
            },
            heart: {
                hairstyle: ["이마를 일부 덮는 내린 가르마", "턱선 볼륨을 살린 미디엄", "옆선을 너무 짧게 밀지 않는 리프"],
                eyewear: ["하단 무게감 있는 프레임", "라운드 스퀘어", "림리스"],
                contour: ["관자놀이 음영은 최소화", "턱끝 하이라이트는 과하게 뾰족하지 않게", "하관에는 약한 음영만 추가"],
            },
            oblong: {
                hairstyle: ["앞머리를 남긴 6:4 가르마", "옆을 너무 짧게 밀지 않는 다운펌", "올백을 피한 텍스처 크롭"],
                eyewear: ["세로폭이 있는 웰링턴", "브로우라인", "중간 크기 보스턴"],
                contour: ["헤어라인과 턱끝만 가볍게 눌러 길이 분절", "턱선 정리는 짧고 넓게", "광대 위 세로 쉐이딩은 피하기"],
            },
            diamond: {
                hairstyle: ["사이드 다운이 된 가르마", "턱선 볼륨이 있는 미디엄", "광대 읽힘을 줄이는 텍스처 크롭"],
                eyewear: ["오벌", "부드러운 브로우라인", "하프림"],
                contour: ["광대 외곽만 약하게 정리", "이마와 턱끝 쪽 중심을 보강", "수염선은 턱끝을 길게 빼지 않기"],
            },
            pear: {
                hairstyle: ["관자놀이 볼륨을 살린 숏컷", "상부 레이어를 강조한 리젠트", "이마를 일부 드러내는 가르마"],
                eyewear: ["윗선이 강조된 프레임", "브로우라인", "상단이 넓은 보스턴"],
                contour: ["관자놀이와 헤어라인 쪽 보강", "턱 음영은 넓고 옅게", "수염은 턱끝을 길게 늘리지 않기"],
            },
        },
    },
    en: {
        feminine: {
            oval: {
                hairstyle: ["See-through bangs with long layers", "Jaw-framing C-curl bob", "Side waves with soft crown volume"],
                eyewear: ["Soft Boston frames", "Slim cat-eye frames", "Thin oval metal frames"],
                contour: ["Keep cheek shading very light", "Place chin highlight with precision", "Set blush slightly outside the center of the cheek"],
            },
            round: {
                hairstyle: ["Crown-lifting layered midi cut", "Vertical waves falling below the jaw", "Long layers with light fringe"],
                eyewear: ["Slim square frames", "Lifted cat-eye frames", "Wellingtons with a firm upper line"],
                contour: ["Shade outside the jawline to slim the outline", "Add highlight on the nose bridge and chin", "Use diagonal blush placement"],
            },
            square: {
                hairstyle: ["S-curl bob that softens the jaw", "Medium layers with softer side lines", "See-through bangs with long waves"],
                eyewear: ["Oval metal frames", "Round frames", "Slim half-rim frames"],
                contour: ["Diffuse shading across the jaw corners", "Lift the mid-face with upper-cheek highlight", "Keep lower-mouth shading minimal"],
            },
            heart: {
                hairstyle: ["Bob with fullness near the jaw", "Curtain bangs with medium waves", "Long layers that build weight lower down"],
                eyewear: ["Rimless frames", "Rounded-square frames with lower weight", "Slim oval frames"],
                contour: ["Support the temples softly", "Keep the chin highlight gentle instead of tiny", "Place blush slightly outward"],
            },
            oblong: {
                hairstyle: ["Soft fringe with a build-perm or layered wave", "Medium C-curl with side fullness", "Semi-long waves with restrained crown height"],
                eyewear: ["Boston frames with lens depth", "Medium Wellington frames", "Rounded-square frames"],
                contour: ["Break length at the hairline and chin", "Spread cheek highlight horizontally", "Keep blush placement flat and wide"],
            },
            diamond: {
                hairstyle: ["Side-bang bob that covers the cheek area", "Medium cut with fullness near the jaw", "Long layers with soft curves"],
                eyewear: ["Oval frames", "Soft cat-eye frames", "Half-rim frames with a gentle upper line"],
                contour: ["Refine only the outermost cheek edge", "Restore light to the forehead and chin", "Keep blush slightly inward from the widest cheek point"],
            },
            pear: {
                hairstyle: ["Short bob with volume at the temples", "Medium cut with upper layering", "Volume waves with light see-through bangs"],
                eyewear: ["Browline frames", "Boston frames with an upper accent", "Cat-eye frames that widen the top"],
                contour: ["Build light at the hairline and temples", "Keep jaw shading broad and sheer", "Pull the visual focus upward"],
            },
        },
        masculine: {
            oval: {
                hairstyle: ["6:4 side part", "Classic two-block with a light down-perm", "Textured short crop"],
                eyewear: ["Straight-lined Wellington", "Browline frames", "Slim square frames"],
                contour: ["Keep the bridge and jaw tidy rather than heavily shaded", "Use minimal cheek shading", "Focus on brow structure and skin texture"],
            },
            round: {
                hairstyle: ["Short regent with top lift", "Parted perm that keeps some side width", "Textured crop with extra vertical read"],
                eyewear: ["Angular Wellington", "Thicker square frames", "Browline frames"],
                contour: ["Keep shading on the outer jawline", "Use a narrow nose-bridge highlight", "Push the grooming emphasis vertically"],
            },
            square: {
                hairstyle: ["Clean crew cut", "Low two-block side part", "Short textured leaf cut"],
                eyewear: ["Round metal frames", "Oval frames", "Slim browline frames"],
                contour: ["Do not over-carve the jaw", "Keep definition around the nose and brow bone", "Prioritize skin texture over obvious contour"],
            },
            heart: {
                hairstyle: ["Part that leaves some fringe over the forehead", "Medium cut with some jaw-area weight", "Leaf cut without shaving the sides too tight"],
                eyewear: ["Frames with more lower weight", "Rounded-square frames", "Rimless frames"],
                contour: ["Keep temple shading minimal", "Do not sharpen the chin highlight too much", "Use only a light shade on the lower face"],
            },
            oblong: {
                hairstyle: ["6:4 part with some fringe left down", "Down-perm that keeps the sides from going too tight", "Textured crop that avoids a slicked-back forehead"],
                eyewear: ["Wellington frames with lens height", "Browline frames", "Medium Boston frames"],
                contour: ["Shade the hairline and chin lightly", "Keep the jaw grooming short and broad", "Avoid vertical contour emphasis through the cheeks"],
            },
            diamond: {
                hairstyle: ["Side part with the temples kept down", "Medium cut with some jaw fullness", "Textured crop that softens the cheekbone read"],
                eyewear: ["Oval frames", "Soft browline frames", "Half-rim frames"],
                contour: ["Touch only the outer cheek edge lightly", "Reinforce the forehead and chin instead of hollowing the face", "Keep beard or shaving lines clean without extending the chin"],
            },
            pear: {
                hairstyle: ["Short cut with volume at the temples", "Regent style with stronger upper layering", "Parted style that shows some forehead"],
                eyewear: ["Frames with a stronger top line", "Browline frames", "Boston frames with a wider upper half"],
                contour: ["Reinforce the temple and hairline area", "Keep jaw shading wide and soft", "Do not let beard length pull the chin downward"],
            },
        },
    },
    zh: {
        feminine: {
            oval: {
                hairstyle: ["轻薄刘海搭配长层次发", "包住下颌的 C 卷波波头", "顶部柔和蓬松的侧分卷发"],
                eyewear: ["柔和波士顿框", "细窄猫眼框", "纤细椭圆金属框"],
                contour: ["颧骨下方阴影保持很轻", "下巴提亮要精致不要生硬", "腮红落点略放在苹果肌外侧"],
            },
            round: {
                hairstyle: ["增强头顶高度的中长层次发", "落到下颌以下的纵向卷度", "带轻薄刘海的长层次发"],
                eyewear: ["细窄方框", "上扬猫眼框", "上沿更明确的威灵顿框"],
                contour: ["在下颌外侧做阴影收窄轮廓", "增加鼻梁与下巴提亮", "腮红更适合斜向晕染"],
            },
            square: {
                hairstyle: ["柔化下颌线的 S 卷波波头", "两侧线条更柔和的中长层次发", "空气刘海搭配长卷发"],
                eyewear: ["椭圆金属框", "圆框", "纤细半框"],
                contour: ["下颌角阴影要大面积晕开", "用颧骨上方提亮把视线往上带", "嘴角下方阴影尽量克制"],
            },
            heart: {
                hairstyle: ["下颌附近更丰盈的波波头", "八字刘海搭配中长卷发", "下半部更有重量的长层次发"],
                eyewear: ["无框眼镜", "下半部更有重量感的圆方框", "细椭圆框"],
                contour: ["太阳穴位置柔和补量", "下巴提亮不要过小过尖", "腮红可略微往外放"],
            },
            oblong: {
                hairstyle: ["带轻刘海的蓬松烫或层次卷发", "两侧更有体积的 C 卷中发", "顶部高度克制的中长波浪"],
                eyewear: ["镜片高度足够的波士顿框", "中等尺寸威灵顿框", "圆方框"],
                contour: ["在发际线和下巴轻轻打断长度", "把颧骨高光横向拉开", "腮红以横向铺开为主"],
            },
            diamond: {
                hairstyle: ["能遮住颧骨的侧刘海波波头", "下颌附近有体积的中发", "线条柔和的长层次发"],
                eyewear: ["椭圆框", "柔和猫眼框", "上沿平缓的半框"],
                contour: ["只整理最外侧颧骨边缘", "额头与下巴适度补光", "腮红位置放在颧骨最宽点的内侧"],
            },
            pear: {
                hairstyle: ["增强太阳穴蓬松度的短波波头", "上层更明显的中发", "空气刘海搭配蓬松卷发"],
                eyewear: ["眉线框", "上沿有重点的波士顿框", "顶部更宽的猫眼框"],
                contour: ["重点提亮发际线与太阳穴", "下颌阴影保持宽而轻", "让视觉重心往上移动"],
            },
        },
        masculine: {
            oval: {
                hairstyle: ["6:4 侧分", "带轻微服帖感的经典两侧短发", "有纹理的短碎裁剪"],
                eyewear: ["线条笔直的威灵顿框", "眉线框", "细窄方框"],
                contour: ["重点整理鼻梁与下颌，不必重修容", "颧骨阴影尽量克制", "把重心放在眉骨与肤质修饰上"],
            },
            round: {
                hairstyle: ["顶部抬高的短款飞机头", "保留两侧体积感的分线烫", "增强纵向感的纹理短发"],
                eyewear: ["更有棱角的威灵顿框", "较厚的方框", "眉线框"],
                contour: ["只在下颌外缘做简短修饰", "鼻梁提亮保持窄而直", "轮廓修饰强调纵向收束"],
            },
            square: {
                hairstyle: ["利落的平头或短寸", "低层次两侧短发侧分", "短而有纹理的轻层次发"],
                eyewear: ["圆形金属框", "椭圆框", "纤细眉线框"],
                contour: ["不要过度削弱下颌角", "重点整理鼻侧与眉骨区域", "比起修容更应重视肤质与整洁感"],
            },
            heart: {
                hairstyle: ["保留部分刘海的侧分", "下颌附近稍有重量的中发", "两侧不过度推短的轻层次中发"],
                eyewear: ["下半部更有重量感的镜框", "圆方框", "无框眼镜"],
                contour: ["太阳穴阴影尽量少", "下巴提亮不要过尖", "下半脸只做很轻的修饰"],
            },
            oblong: {
                hairstyle: ["保留一点刘海的 6:4 分线", "不要把两侧推得太紧的服帖造型", "避免大面积露额的纹理短发"],
                eyewear: ["镜片高度足够的威灵顿框", "眉线框", "中等尺寸波士顿框"],
                contour: ["发际线和下巴只做轻微阴影", "下颌修饰保持短而宽", "避免沿颧骨做纵向重修容"],
            },
            diamond: {
                hairstyle: ["两侧压低的侧分", "下颌附近有体积的中短发", "弱化颧骨存在感的纹理短发"],
                eyewear: ["椭圆框", "柔和眉线框", "半框"],
                contour: ["仅轻收颧骨最外缘", "加强额头与下巴的中心感", "胡须或剃线不要把下巴拉得更长"],
            },
            pear: {
                hairstyle: ["增强太阳穴体积的短发", "上层更明显的飞机头风格", "适度露额的分线造型"],
                eyewear: ["上沿更强的镜框", "眉线框", "上宽下窄的波士顿框"],
                contour: ["重点补强太阳穴与发际线", "下颌阴影保持宽而柔和", "胡须长度不要继续往下拉重心"],
            },
        },
    },
    ja: {
        feminine: {
            oval: {
                hairstyle: ["シースルーバングのロングレイヤー", "あごを包む C カールボブ", "トップをやわらかく持ち上げたサイドウェーブ"],
                eyewear: ["やわらかなボストン", "細めのキャットアイ", "細いオーバルメタル"],
                contour: ["頬骨下の陰影はごく薄く", "あご先ハイライトは繊細に", "チークは頬の中心より少し外側へ"],
            },
            round: {
                hairstyle: ["トップに高さを出すミディアムレイヤー", "あご下に落ちる縦ウェーブ", "軽い前髪付きのロングレイヤー"],
                eyewear: ["細めのスクエア", "上向きのキャットアイ", "上辺がはっきりしたウェリントン"],
                contour: ["あご外側の陰影で輪郭を整理", "鼻筋とあご先にハイライト", "チークは斜めに流す"],
            },
            square: {
                hairstyle: ["あご線をやわらげる S カールボブ", "サイドラインがやわらかいミディアムレイヤー", "シースルーバングとロングウェーブ"],
                eyewear: ["オーバルメタル", "ラウンド", "細めのハーフリム"],
                contour: ["エラの陰影は広くぼかす", "頬上のハイライトで視線を上げる", "口角下の陰影は最小限に"],
            },
            heart: {
                hairstyle: ["あご周りに厚みを出すボブ", "カーテンバングとミディアムウェーブ", "下に重さを持たせたロングレイヤー"],
                eyewear: ["リムレス", "下側に重さのあるラウンドスクエア", "細いオーバルフレーム"],
                contour: ["こめかみをやわらかく補う", "あご先ハイライトは小さくしすぎない", "チークは少し外側へ逃がす"],
            },
            oblong: {
                hairstyle: ["軽い前髪付きのレイヤーウェーブ", "サイドに厚みを出す C カールミディアム", "トップを上げすぎないセミロングウェーブ"],
                eyewear: ["天地幅のあるボストン", "中くらいのウェリントン", "ラウンドスクエア"],
                contour: ["生え際とあご先で長さを分断", "頬骨ハイライトを横に広げる", "チークは横長に入れる"],
            },
            diamond: {
                hairstyle: ["頬骨を隠せるサイドバングボブ", "あご周りに厚みのあるミディアム", "曲線を残したロングレイヤー"],
                eyewear: ["オーバル", "やわらかなキャットアイ", "上辺が穏やかなハーフリム"],
                contour: ["頬骨の最外側だけを整える", "額とあご先に光を足す", "チークは頬骨の最外点より少し内側へ"],
            },
            pear: {
                hairstyle: ["こめかみにボリュームを足すショートボブ", "上部レイヤーが目立つミディアム", "シースルーバングのボリュームウェーブ"],
                eyewear: ["ブロウライン", "上辺にポイントのあるボストン", "上側が広いキャットアイ"],
                contour: ["生え際とこめかみを明るく補強", "あご下の陰影は広く薄く", "視線が上に上がるように光を置く"],
            },
        },
        masculine: {
            oval: {
                hairstyle: ["6:4 のサイドパート", "軽いダウンスタイルのクラシックツーブロック", "質感を出したショートクロップ"],
                eyewear: ["直線的なウェリントン", "ブロウライン", "細めのスクエア"],
                contour: ["鼻筋とあご線だけを端正に整える", "頬の陰影は最小限に", "眉骨と肌の質感整理を優先する"],
            },
            round: {
                hairstyle: ["トップを立たせた短めリーゼント", "サイド幅を少し残す分け目パーマ", "縦の印象を足す質感クロップ"],
                eyewear: ["角のあるウェリントン", "厚みのあるスクエア", "ブロウライン"],
                contour: ["あご外側だけを短く整える", "鼻筋ハイライトは細く入れる", "輪郭補正は縦の流れを意識する"],
            },
            square: {
                hairstyle: ["整えたクルーカット", "低めツーブロックのサイドパート", "短く質感を出したリーフカット"],
                eyewear: ["ラウンドメタル", "オーバル", "細めのブロウライン"],
                contour: ["エラを過度に削らない", "鼻横と眉骨周りの整えを優先", "強いコントゥアより清潔感を重視する"],
            },
            heart: {
                hairstyle: ["前髪を少し残した分け目", "あご周りに少し重さを残すミディアム", "サイドを刈り上げすぎないリーフ"],
                eyewear: ["下側に重さのあるフレーム", "ラウンドスクエア", "リムレス"],
                contour: ["こめかみの陰影は最小限に", "あご先ハイライトは尖らせすぎない", "下顔面はごく薄く整えるだけにする"],
            },
            oblong: {
                hairstyle: ["前髪を少し残した 6:4 分け", "サイドを締めすぎないダウンスタイル", "額を全開にしない質感ショート"],
                eyewear: ["天地幅のあるウェリントン", "ブロウライン", "中くらいのボストン"],
                contour: ["生え際とあご先だけを軽く抑える", "あご周りの整えは短く横に取る", "頬に縦の陰影を強く入れない"],
            },
            diamond: {
                hairstyle: ["こめかみを抑えたサイドパート", "あご周りに厚みを出すミディアム", "頬骨の印象をやわらげる質感クロップ"],
                eyewear: ["オーバル", "やわらかなブロウライン", "ハーフリム"],
                contour: ["頬骨の外縁だけを軽く整理", "額とあご先の中心感を補う", "ひげや剃りラインであごをさらに長く見せない"],
            },
            pear: {
                hairstyle: ["こめかみにボリュームを足すショート", "上部レイヤーを強めたリーゼント系", "額を少し見せる分け目スタイル"],
                eyewear: ["上辺が強いフレーム", "ブロウライン", "上部が広いボストン"],
                contour: ["こめかみと生え際を補強する", "あごの陰影は広くやわらかく入れる", "ひげで重心をさらに下へ引かない"],
            },
        },
    },
};

export function getFaceStyleTargetCopy(lang: string): FaceStyleTargetCopy {
    return STYLE_TARGET_COPY[toSupportedLanguage(lang)];
}

export function getFaceStyleRecommendations(
    shape: FaceShapeId,
    lang: string,
    styleTarget: FaceStyleTarget = "neutral"
): StyleRecommendations {
    const safeLang = toSupportedLanguage(lang);

    if (styleTarget === "neutral") {
        const base = getFaceShapeCopy(shape, safeLang);
        return {
            hairstyle: base.hairstyle,
            eyewear: base.eyewear,
            contour: base.contour,
        };
    }

    return STYLE_TARGET_OVERRIDES[safeLang][styleTarget][shape];
}
