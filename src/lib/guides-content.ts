import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import type { SupportedLang } from "@/lib/site-content";

export type GuideIndexCard = {
    href: string;
    tag: string;
    title: string;
    summary: string;
};

export type GuideIndexCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    updatedLabel: string;
    highlightsTitle: string;
    highlights: string[];
    cards: GuideIndexCard[];
};

export type GuideSection = {
    title: string;
    body: string;
    bullets?: string[];
};

export type GuideFaqItem = {
    question: string;
    answer: string;
};

export type GuideRelatedLink = {
    href: string;
    title: string;
    summary: string;
};

export type GuideArticleCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    updatedLabel: string;
    highlights: string[];
    sections: GuideSection[];
    checklistTitle: string;
    checklistItems: string[];
    faqTitle: string;
    faqs: GuideFaqItem[];
    relatedTitle: string;
    related: GuideRelatedLink[];
};

const GUIDES_INDEX_COPY: Record<SupportedLang, GuideIndexCopy> = {
    ko: {
        title: "가이드 센터 | FINDCORE",
        description: "FINDCORE를 더 정확하게 쓰기 위한 촬영 팁, 결과 해석법, 자주 묻는 질문을 모아둔 안내 페이지입니다.",
        heading: "FINDCORE 가이드 센터",
        intro: "사진만 올리면 끝나는 도구처럼 보여도, 실제 결과는 촬영 조건과 해석 방식에 크게 좌우됩니다. 이 가이드에서는 사진을 어떻게 준비하면 좋은지, 결과는 어디까지 믿고 어떻게 활용하면 좋은지 차근차근 정리했습니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlightsTitle: "여기서 바로 확인할 수 있는 내용",
        highlights: [
            "얼굴형 사진을 찍을 때 꼭 챙겨야 할 포인트",
            "퍼스널 컬러 사진에서 색 왜곡을 줄이는 방법",
            "결과 페이지의 숫자와 추천 문구를 읽는 순서",
            "FINDCORE가 어떤 방식으로 결과를 만드는지",
            "반복해서 많이 받는 질문에 대한 짧은 답변",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "촬영",
                title: "얼굴형 분석 사진 가이드",
                summary: "헤어라인, 턱선, 정면 각도, 카메라 거리처럼 얼굴형 결과를 흔들기 쉬운 조건을 먼저 정리했습니다.",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "촬영",
                title: "퍼스널 컬러 촬영 가이드",
                summary: "조명, 화이트밸런스, 자동 보정 때문에 피부 톤이 어떻게 달라 보이는지 쉽게 설명합니다.",
            },
            {
                href: "/guides/result-reading",
                tag: "해석",
                title: "결과 해석 가이드",
                summary: "측정값, 품질 경고, 추천 문구를 한꺼번에 보지 말고 어떤 순서로 읽어야 하는지 정리했습니다.",
            },
            {
                href: "/guides/methodology",
                tag: "방법론",
                title: "분석 방법론",
                summary: "브라우저 안에서 어떤 입력을 읽고 어떤 기준으로 결과를 만드는지 이해하기 쉽게 풀었습니다.",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "자주 묻는 질문",
                summary: "사진 저장 여부, 결과가 달라지는 이유, 모바일 사용 팁처럼 자주 나오는 질문만 따로 모았습니다.",
            },
        ],
    },
    en: {
        title: "Guide Center | FINDCORE",
        description: "FINDCORE guide center for improving photo quality, interpretation, and confidence across face-shape and personal-color tools.",
        heading: "FINDCORE Guide Center",
        intro: "Output quality is not determined by the model alone. Photo conditions, retouching, frame alignment, and interpretation standards all influence whether a result is stable. This library is written as reusable reference content, not just a short help note.",
        updatedLabel: "Editorial update: March 12, 2026",
        highlightsTitle: "What this library covers",
        highlights: [
            "Frontal photo requirements for face-shape analysis",
            "How to avoid color distortion in personal-color photos",
            "How to read measured values versus style suggestions",
            "How the browser-side analysis works and where it fails",
            "Answers to the questions users ask most often",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "Capture",
                title: "Face Shape Photo Guide",
                summary: "Covers hairline visibility, jawline framing, frontal angle, camera distance, and wide-angle distortion that directly affect classification.",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "Capture",
                title: "Personal Color Photo Guide",
                summary: "Explains how lighting and camera correction shift apparent skin tone, and what makes a photo more trustworthy for analysis.",
            },
            {
                href: "/guides/result-reading",
                tag: "Interpretation",
                title: "Result Reading Guide",
                summary: "Explains why measurements, quality warnings, and recommendation text should not be treated as the same kind of signal.",
            },
            {
                href: "/guides/methodology",
                tag: "Methodology",
                title: "Analysis Methodology",
                summary: "Documents what is computed in the browser and how rule-based scoring turns those signals into face-shape and color outputs.",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "Frequently Asked Questions",
                summary: "Covers storage, result drift, mobile conditions, and gender or style-direction differences that repeatedly come up.",
            },
        ],
    },
    zh: {
        title: "指南中心 | FINDCORE",
        description: "提升 FINDCORE 脸型分析、个人色彩与结果解读质量的指南中心。",
        heading: "FINDCORE 指南中心",
        intro: "结果质量并不只由模型决定。拍摄条件、修图与否、框线校正、结果解读方式都会影响输出是否稳定。这组内容被整理成可反复查阅的参考文档，而不只是简短说明。",
        updatedLabel: "编辑更新：2026年3月12日",
        highlightsTitle: "本指南中心涵盖的内容",
        highlights: [
            "脸型分析所需的正面拍摄条件",
            "个人色彩照片中避免色偏的方法",
            "如何区分测量值与风格推荐",
            "浏览器端分析是怎样工作的，以及它的局限",
            "用户最常提出的问题与答复",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "拍摄",
                title: "脸型分析拍照指南",
                summary: "整理会直接影响脸型分类的条件，包括发际线可见度、下颌线构图、正面角度、拍摄距离与广角畸变。",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "拍摄",
                title: "个人色彩拍照指南",
                summary: "解释光线与相机校正如何改变肤色观感，以及什么样的照片更值得信任。",
            },
            {
                href: "/guides/result-reading",
                tag: "解读",
                title: "结果解读指南",
                summary: "说明为什么测量值、质量提示与推荐文字不能用同一种方式理解，以及应该按什么顺序阅读。",
            },
            {
                href: "/guides/methodology",
                tag: "方法论",
                title: "分析方法论",
                summary: "系统说明浏览器中实际计算了什么，以及这些信号如何通过规则生成脸型与色彩结果。",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "常见问题",
                summary: "汇总照片是否保存、结果为何变化、移动端使用环境，以及性别或风格推荐差异等高频问题。",
            },
        ],
    },
    ja: {
        title: "ガイドセンター | FINDCORE",
        description: "顔型分析、パーソナルカラー、結果の読み方の精度を高めるための FINDCORE ガイドセンターです。",
        heading: "FINDCORE ガイドセンター",
        intro: "結果の品質はモデルだけで決まりません。撮影条件、補正の有無、フレーム調整、結果の読み方が揃って初めて安定した出力になります。この文書群は、短いヘルプ文ではなく、繰り返し参照できる基準文書として構成しています。",
        updatedLabel: "編集更新日: 2026年3月12日",
        highlightsTitle: "この文書群で扱う内容",
        highlights: [
            "顔型分析に必要な正面写真の条件",
            "パーソナルカラー写真で色ずれを避ける方法",
            "計測値とスタイル提案文の読み分け",
            "ブラウザ内分析の仕組みと限界",
            "利用者からよく届く質問への回答",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "撮影",
                title: "顔型分析の撮影ガイド",
                summary: "生え際の見え方、あごラインの収まり、正面角度、距離感、広角歪みなど、分類に直結する条件をまとめています。",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "撮影",
                title: "パーソナルカラー撮影ガイド",
                summary: "照明やカメラ補正が肌色をどう変えるか、どんな写真ならより信頼できるかを説明します。",
            },
            {
                href: "/guides/result-reading",
                tag: "解釈",
                title: "結果の読み方ガイド",
                summary: "計測値、品質警告、提案文を同じ重みで読んではいけない理由と、読む順序を整理しています。",
            },
            {
                href: "/guides/methodology",
                tag: "方法論",
                title: "分析方法論",
                summary: "ブラウザで何を計算し、その信号をどのようなルールで顔型やカラー結果へ変換しているかを説明します。",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "よくある質問",
                summary: "画像保存の有無、結果変動の理由、モバイル環境、性別やスタイル方向の違いなどをまとめています。",
            },
        ],
    },
};

const GUIDE_FACE_SHAPE_PHOTO: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "얼굴형 분석 사진 가이드 | FINDCORE",
        description: "얼굴형 분석이 흔들리지 않도록 정면 각도, 헤어라인, 프레임 보정 기준을 쉽게 정리한 안내입니다.",
        heading: "얼굴형 분석 사진 가이드",
        intro: "얼굴형 분석은 얼굴 전체 윤곽을 보고 비율을 읽는 기능입니다. 사진 조건이 조금만 어긋나도 결과가 쉽게 흔들릴 수 있어서, 먼저 어떤 사진이 좋은지부터 잡아두는 게 중요합니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["정면 사진 우선", "이마와 헤어라인이 보여야 함", "너무 가까운 셀카 피하기", "보정 프레임은 꼭 직접 확인"],
        sections: [
            {
                title: "1. 이마와 헤어라인이 보여야 합니다",
                body: "얼굴형 결과에서 상부 폭과 세로 길이는 헤어라인이 얼마나 잘 보이느냐에 크게 영향을 받습니다. 앞머리나 그림자가 이 부분을 가리면 결과가 쉽게 달라질 수 있습니다.",
                bullets: [
                    "앞머리는 이마 중앙만 아니라 관자놀이 쪽까지 보이게 넘기는 편이 좋습니다.",
                    "헤어라인 모양이 고르지 않아도 괜찮지만 피부 경계가 가려지면 정확도는 떨어집니다.",
                    "그림자 때문에 헤어라인이 끊겨 보이면 그 사진은 다시 찍는 편이 낫습니다.",
                ],
            },
            {
                title: "2. 카메라는 너무 가까우면 안 됩니다",
                body: "셀카를 너무 가까이서 찍으면 얼굴 중앙이 커지고 바깥 윤곽은 눌려 보입니다. 그러면 실제보다 얼굴이 길거나 좁게 읽힐 수 있습니다.",
                bullets: [
                    "가능하면 팔 길이보다 약간 더 여유 있게 거리를 두고 찍으세요.",
                    "거치대나 타이머 촬영이 되면 일반 셀카보다 훨씬 안정적입니다.",
                    "턱을 앞으로 빼는 자세는 얼굴 길이를 더 길게 보이게 할 수 있습니다.",
                ],
            },
            {
                title: "3. 정면에 가까운 사진이 가장 좋습니다",
                body: "얼굴이 살짝만 돌아가도 광대 폭이나 턱 폭이 다르게 읽힐 수 있습니다. 그래서 눈썹선과 턱 중심이 크게 틀어지지 않은 정면 사진이 가장 좋습니다.",
                bullets: [
                    "한쪽 귀만 유독 많이 보이면 이미 얼굴이 돌아간 사진일 가능성이 큽니다.",
                    "고개를 들면 턱이 좁아 보이고, 숙이면 하관이 넓게 보일 수 있습니다.",
                    "업로드 전에 눈썹선이 거의 수평인지 먼저 보면 도움이 됩니다.",
                ],
            },
            {
                title: "4. 턱끝과 옆 윤곽이 모두 보여야 합니다",
                body: "얼굴형 분석은 얼굴 중앙만 보는 기능이 아닙니다. 좌우 윤곽이나 턱끝이 잘리면 광대와 턱선이 다르게 읽혀서 결과가 치우칠 수 있습니다.",
                bullets: [
                    "머리카락보다 중요한 건 피부 외곽선과 턱끝입니다.",
                    "턱끝이 프레임 끝에 걸리면 그 사진은 다시 찍는 편이 안전합니다.",
                    "좌우 여백 차이가 너무 크면 중심축도 흔들릴 수 있습니다.",
                ],
            },
            {
                title: "5. 자동 프레임은 초안일 뿐입니다",
                body: "보정 페이지의 파란 윤곽선은 최종 계산에 들어가는 작업 프레임입니다. 자동으로 잘 잡혀 보이더라도 피부 바깥으로 벗어나 있으면 그 오차가 그대로 결과에 반영됩니다.",
                bullets: [
                    "관자놀이, 광대, 턱끝 점이 실제 윤곽선과 맞는지 먼저 확인하세요.",
                    "가이드선은 괜찮은데 파란 윤곽선만 바깥으로 뜨면 점을 안쪽으로 옮겨야 합니다.",
                    "결과를 믿으려면 자동 인식보다 최종 보정 상태를 기준으로 보는 게 맞습니다.",
                ],
            },
        ],
        checklistTitle: "업로드 전 체크리스트",
        checklistItems: [
            "정면에 가까운 사진인지 확인",
            "이마와 헤어라인이 충분히 보이는지 확인",
            "턱끝과 양옆 윤곽이 잘리지 않았는지 확인",
            "강한 그림자, 역광, 뷰티 필터가 없는지 확인",
            "보정 페이지에서 파란 윤곽선이 실제 얼굴선과 맞는지 확인",
        ],
        faqTitle: "얼굴형 사진 FAQ",
        faqs: [
            {
                question: "앞머리가 조금 내려와 있어도 괜찮나요?",
                answer: "조금은 괜찮습니다. 다만 관자놀이와 윗부분 윤곽이 가려지면 결과가 흔들릴 수 있어서, 가능하면 넘긴 사진이 더 좋습니다.",
            },
            {
                question: "안경을 쓴 사진도 써도 되나요?",
                answer: "가능은 합니다. 하지만 굵은 프레임이나 반사광이 눈썹선과 옆 윤곽을 가릴 수 있어서, 얼굴형만 볼 때는 안경 없는 사진이 더 안정적입니다.",
            },
            {
                question: "셀카와 후면 카메라 중 무엇이 더 좋은가요?",
                answer: "보통은 후면 카메라가 더 낫습니다. 셀카만 가능하다면 너무 가까이서 찍는 것만 피해도 차이가 꽤 큽니다.",
            },
            {
                question: "보정 페이지에서 점을 조금만 움직여도 결과가 바뀌나요?",
                answer: "네. 관자놀이, 광대, 턱끝처럼 중요한 점은 조금만 움직여도 결과가 바뀔 수 있습니다. 그래서 보정 단계가 생각보다 중요합니다.",
            },
        ],
        relatedTitle: "같이 보면 좋은 문서",
        related: [
            { href: "/guides/result-reading", title: "결과 해석 가이드", summary: "숫자와 추천 문구를 어떤 순서로 읽어야 하는지 정리했습니다." },
            { href: "/guides/methodology", title: "분석 방법론", summary: "얼굴형 결과가 어떤 방식으로 계산되는지 쉽게 설명합니다." },
            { href: "/face-shape", title: "AI 얼굴형 분석 시작", summary: "사진 준비가 끝났다면 바로 분석을 진행할 수 있습니다." },
        ],
    },
    en: {
        title: "Face Shape Photo Guide | FINDCORE",
        description: "How to improve face-shape reliability through better angle, hairline visibility, framing, and manual correction.",
        heading: "Face Shape Photo Guide",
        intro: "Face-shape analysis reads the face as one proportion system. Hidden hairlines, very close cameras, or cropped jawlines can shift the category. The guidance below focuses on the conditions that most often justify a retake.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Use a frontal photo", "Expose forehead and hairline", "Reduce wide-angle distortion", "Correct the blue frame when needed"],
        sections: [
            {
                title: "1. Keep the forehead and hairline readable",
                body: "Upper width and vertical length depend on how clearly the hairline reads. Bangs, shadows, or hat brims can shift borderline classifications.",
                bullets: [
                    "Expose the temple area, not only the center of the forehead.",
                    "An uneven hairline is fine, but a hidden one is not.",
                    "If shadow breaks the hairline into fragments, retaking the photo is safer.",
                ],
            },
            {
                title: "2. Do not shoot from very close range",
                body: "Very close selfies enlarge the center of the face and compress the outer contour, which can make the face read longer or narrower than it is.",
                bullets: [
                    "Use slightly more distance than a typical handheld selfie.",
                    "A timer or stand is often more stable than arm-length capture.",
                    "Do not push the chin forward toward the lens.",
                ],
            },
            {
                title: "3. Stay close to frontal and keep the full contour inside the frame",
                body: "Cheekbone width and jaw width distort quickly when the face rotates or gets cropped. The brow line, jawline, and chin tip should be readable together.",
                bullets: [
                    "If one ear is much more visible, the face is already rotated.",
                    "A cropped chin or side contour reduces stability immediately.",
                    "Large left-right empty-space imbalance can also shift the center axis.",
                ],
            },
            {
                title: "4. The auto frame is a draft; manual correction is the final input",
                body: "The blue contour on the correction screen is the working frame used for the final calculation. If the blue points sit outside the real skin boundary, the result follows that mistake.",
                bullets: [
                    "Check temple, cheekbone, and chin-tip handles first.",
                    "Move the frame inward if the contour balloons outside the face.",
                    "On borderline cases, manual correction matters more than the initial auto draft.",
                ],
            },
        ],
        checklistTitle: "Checklist before upload",
        checklistItems: [
            "Use a near-frontal photo",
            "Keep the forehead and hairline visible",
            "Include the chin tip and both side contours inside the frame",
            "Avoid harsh shadow, backlight, and beauty filters",
            "Make sure the blue contour matches the actual skin boundary",
        ],
        faqTitle: "Face shape photo FAQ",
        faqs: [
            { question: "Can I use a photo with some fringe showing?", answer: "Sometimes, but if the temples and upper contour are hidden, upper-width readings become less stable. A pushed-back hair photo is safer." },
            { question: "Can I wear glasses?", answer: "You can, but thick frames or glare can interfere with the brow line and outer contour. A glasses-free photo is better for face-shape analysis." },
            { question: "Is the rear camera better than the selfie camera?", answer: "Usually yes, because distortion is lower. If you only use a selfie camera, avoid very close shots." },
        ],
        relatedTitle: "Related reading",
        related: [
            { href: "/guides/result-reading", title: "Result Reading Guide", summary: "Learn how to separate measurements from styling suggestions." },
            { href: "/guides/methodology", title: "Analysis Methodology", summary: "See how the face-shape output is created from browser-side rules and measurements." },
            { href: "/face-shape", title: "Start AI Face Shape Analysis", summary: "Use the guide criteria, then run the analysis with a cleaner input photo." },
        ],
    },
    zh: {
        title: "脸型分析拍照指南 | FINDCORE",
        description: "说明如何通过角度、发际线可见度、构图和手动校正来提升脸型分析稳定性。",
        heading: "脸型分析拍照指南",
        intro: "脸型分析会把整张脸当作一个比例结构来读取。若发际线被遮挡、镜头太近或下颌线被裁切，分类就可能漂移。下面优先说明最值得重拍的条件。",
        updatedLabel: "更新：2026年3月12日",
        highlights: ["优先正面照片", "露出额头与发际线", "减少广角自拍畸变", "必要时手动校正蓝色框线"],
        sections: [
            {
                title: "1. 先保证额头与发际线可见",
                body: "上部宽度与纵向长度的读取很依赖发际线。刘海、阴影和帽檐都可能让边界型分类变得不稳定。",
                bullets: [
                    "不仅额头中央要露出，太阳穴附近也尽量露出来。",
                    "发际线本身不规则没有问题，被遮住才是问题。",
                    "若阴影把发际线切碎，通常重拍更好。",
                ],
            },
            {
                title: "2. 不要离脸太近自拍",
                body: "距离太近会放大脸中央并压缩外轮廓，让脸看起来比实际更长或更窄。",
                bullets: [
                    "尽量比普通手持自拍再远一点拍摄。",
                    "支架或定时拍摄通常比手持更稳。",
                    "不要把下巴故意朝镜头送出去。",
                ],
            },
            {
                title: "3. 保持接近正面，并让完整轮廓进入画面",
                body: "脸部旋转或裁切会立刻影响颧骨与下颌宽度判断。眉线、下颌线和下巴尖应同时清楚可见。",
                bullets: [
                    "若一侧耳朵明显更显眼，通常已经发生旋转。",
                    "下巴尖或侧边轮廓被裁掉会马上降低稳定性。",
                    "左右留白差异过大也会影响中心轴。",
                ],
            },
            {
                title: "4. 自动框线只是草稿，手动校正才是最终输入",
                body: "校正页中的蓝色轮廓会直接进入最终计算。如果蓝色点位落在真实皮肤边界外侧，结果就会跟着偏掉。",
                bullets: [
                    "优先检查太阳穴、颧骨和下巴尖点位。",
                    "如果轮廓鼓到皮肤外面，应把点往内收。",
                    "对边界型结果来说，手动校正往往比自动初稿更重要。",
                ],
            },
        ],
        checklistTitle: "上传前检查清单",
        checklistItems: [
            "使用接近正面的照片",
            "确认额头和发际线清晰可见",
            "确保下巴尖和左右轮廓都在画面内",
            "避免强阴影、逆光和美颜滤镜",
            "确认蓝色轮廓贴合真实皮肤边界",
        ],
        faqTitle: "脸型照片 FAQ",
        faqs: [
            { question: "刘海露出一点也可以吗？", answer: "有时可以，但若太阳穴和上部轮廓被遮住，上部宽度判断会更不稳定。把头发拨开更可靠。" },
            { question: "戴眼镜的照片能用吗？", answer: "可以，但粗框和反光可能干扰眉线与外轮廓。做脸型分析时，不戴眼镜更理想。" },
            { question: "后置相机比前置更好吗？", answer: "通常更好，因为畸变更小。如果只能自拍，至少不要距离太近。" },
        ],
        relatedTitle: "相关文档",
        related: [
            { href: "/guides/result-reading", title: "结果解读指南", summary: "了解测量值与推荐文字应该怎样分开阅读。" },
            { href: "/guides/methodology", title: "分析方法论", summary: "查看脸型结果如何由浏览器端测量与规则生成。" },
            { href: "/face-shape", title: "开始 AI 脸型分析", summary: "按本指南准备好照片后，可以直接进入分析流程。" },
        ],
    },
    ja: {
        title: "顔型分析の撮影ガイド | FINDCORE",
        description: "角度、生え際の見え方、構図、手動補正によって顔型分析の安定性を上げる方法を説明します。",
        heading: "顔型分析の撮影ガイド",
        intro: "顔型分析は顔全体をひとつの比率構造として読みます。生え際が隠れていたり、カメラが近すぎたり、あごラインが切れていたりすると分類がぶれます。以下は撮り直し優先度の高い条件です。",
        updatedLabel: "更新日: 2026年3月12日",
        highlights: ["正面写真を優先", "額と生え際を見せる", "広角セルフィー歪みを減らす", "必要なら青いフレームを手動補正"],
        sections: [
            {
                title: "1. まず額と生え際を確保する",
                body: "上部幅と縦比率の読み取りは、生え際の見え方に大きく左右されます。前髪、影、帽子のつばは境界ラベルを揺らしやすくします。",
                bullets: [
                    "額の中央だけでなく、こめかみ付近まで見えるようにしてください。",
                    "生え際の形が不規則でも問題ありません。隠れていることが問題です。",
                    "影で生え際が途切れて見えるなら撮り直しが安全です。",
                ],
            },
            {
                title: "2. 顔に近すぎるセルフィーを避ける",
                body: "近距離撮影は顔の中央を大きく見せ、外輪郭を圧縮します。その結果、実際より面長または細く見えることがあります。",
                bullets: [
                    "通常のセルフィーより少し距離を取る方が安全です。",
                    "スタンドやタイマー撮影の方が安定しやすいです。",
                    "あごをレンズへ突き出す姿勢は避けてください。",
                ],
            },
            {
                title: "3. 正面に近づけ、輪郭をフレーム内に収める",
                body: "顔の回転やトリミングは頬骨幅とあご幅の判断をすぐ崩します。眉ライン、あごライン、あご先が同時に読める写真が望ましいです。",
                bullets: [
                    "片耳だけが目立つならすでに回転しています。",
                    "あご先や横輪郭が切れると安定性が下がります。",
                    "左右の余白差が大きすぎると中心軸もぶれます。",
                ],
            },
            {
                title: "4. 自動フレームは下書きで、最終入力は手動補正",
                body: "補正画面の青い輪郭は最終計算に使われる作業フレームです。青い点が実際の肌境界より外にあると、そのまま結果に影響します。",
                bullets: [
                    "こめかみ、頬骨、あご先のハンドルから確認してください。",
                    "輪郭が外側へ膨らんでいるなら内側へ寄せる必要があります。",
                    "境界ケースでは自動初稿より手動補正の方が重要です。",
                ],
            },
        ],
        checklistTitle: "アップロード前チェックリスト",
        checklistItems: [
            "正面に近い写真を使う",
            "額と生え際を見せる",
            "あご先と左右輪郭をフレーム内に入れる",
            "強い影、逆光、美肌フィルターを避ける",
            "青い輪郭が実際の肌境界に合っているか確認する",
        ],
        faqTitle: "顔型写真 FAQ",
        faqs: [
            { question: "少し前髪がかかっていても使えますか？", answer: "場合によっては可能ですが、こめかみや上部輪郭が隠れると上部幅の読み取りが不安定になります。前髪を上げた写真の方が安全です。" },
            { question: "眼鏡をかけたままでも大丈夫ですか？", answer: "可能ですが、太いフレームや反射は眉ラインと外輪郭の読み取りを邪魔することがあります。顔型分析だけなら眼鏡なしが有利です。" },
            { question: "後ろのカメラの方が良いですか？", answer: "一般的にはその方が歪みが少ないです。セルフィーしか使えないなら、近距離撮影だけ避けてください。" },
        ],
        relatedTitle: "あわせて読む",
        related: [
            { href: "/guides/result-reading", title: "結果の読み方ガイド", summary: "計測値と提案文をどう分けて読むべきかを説明します。" },
            { href: "/guides/methodology", title: "分析方法論", summary: "顔型結果がブラウザ内の計測とルールでどう作られるかを確認できます。" },
            { href: "/face-shape", title: "AI 顔型分析を始める", summary: "写真条件を整えた後、そのまま分析へ進めます。" },
        ],
    },
};

const GUIDE_PERSONAL_COLOR: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "퍼스널 컬러 촬영 가이드 | FINDCORE",
        description: "퍼스널 컬러 결과가 흔들리지 않도록 조명, 배경, 자동 보정 체크포인트를 정리한 안내입니다.",
        heading: "퍼스널 컬러 촬영 가이드",
        intro: "퍼스널 컬러는 얼굴형보다 조명 영향을 더 많이 받습니다. 사진이 예쁘게 나온 것보다, 피부 색이 덜 왜곡된 사진을 쓰는 게 훨씬 중요합니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["자연광 우선", "자동 보정 끄기", "강한 색 반사 피하기", "같은 조건으로 다시 확인"],
        sections: [
            {
                title: "1. 조명부터 맞추는 게 제일 중요합니다",
                body: "퍼스널 컬러는 피부가 따뜻해 보이는지, 차갑게 보이는지, 맑아 보이는지 같은 인상을 읽습니다. 조명 색이 바뀌면 결과도 바로 흔들립니다.",
                bullets: [
                    "창가 자연광이나 균일한 화이트 조명이 가장 무난합니다.",
                    "노란 실내등, 네온 조명, 색 조명은 피부를 실제보다 다르게 보이게 할 수 있습니다.",
                    "아침에 찍은 사진과 밤에 찍은 사진 결과가 다르게 나오는 건 이상한 일이 아닙니다.",
                ],
            },
            {
                title: "2. 자동 보정은 최대한 꺼두세요",
                body: "뷰티 모드, HDR, 피부 보정은 피부 밝기와 색감을 바꿉니다. 보기엔 자연스러워도 분석에는 오차가 됩니다.",
                bullets: [
                    "뷰티, 피부 보정, 색 필터는 가능한 모두 끄세요.",
                    "SNS에 저장한 사진보다 원본 촬영본이 더 낫습니다.",
                    "기본 카메라가 너무 세게 보정하면 다른 카메라 앱을 써보는 것도 방법입니다.",
                ],
            },
            {
                title: "3. 배경색과 옷 색도 영향을 줍니다",
                body: "강한 배경색이나 채도 높은 옷은 얼굴로 색이 반사돼서 피부 톤이 달라 보이게 만듭니다. 생각보다 영향이 큽니다.",
                bullets: [
                    "회색, 흰색, 베이지처럼 중성적인 배경이 가장 안전합니다.",
                    "진한 빨강, 형광색, 선명한 파랑 옷은 피부 인상을 쉽게 바꿉니다.",
                    "색 반사가 강한 유리나 거울 근처도 피하는 편이 좋습니다.",
                ],
            },
            {
                title: "4. 한 번보다 반복 결과를 보세요",
                body: "퍼스널 컬러는 한 장의 잘 나온 사진보다, 같은 조건에서 두세 번 했을 때 비슷한 결과가 나오는지가 더 중요합니다.",
                bullets: [
                    "조건이 다른 사진을 섞어 비교하면 오히려 더 헷갈립니다.",
                    "경계 시즌은 하나의 이름보다 반복해서 나오는 톤 경향을 먼저 보세요.",
                    "실제 쇼핑에서는 시즌명보다 자주 잘 받는 밝기와 채도를 쓰는 편이 더 실용적입니다.",
                ],
            },
        ],
        checklistTitle: "퍼스널 컬러 업로드 체크리스트",
        checklistItems: [
            "자연광 또는 균일한 화이트 조명인지 확인",
            "뷰티 모드, HDR, 필터가 꺼져 있는지 확인",
            "배경과 옷 색이 너무 강하지 않은지 확인",
            "얼굴 피부가 충분히 보이고 그림자가 심하지 않은지 확인",
            "같은 조건으로 다시 해도 비슷한 결과가 나오는지 확인",
        ],
        faqTitle: "퍼스널 컬러 사진 FAQ",
        faqs: [
            { question: "메이크업한 사진도 써도 되나요?", answer: "가능은 합니다. 다만 베이스나 립, 블러셔가 피부 인상을 바꾸기 때문에 맨얼굴이나 가벼운 메이크업 사진이 더 안정적입니다." },
            { question: "흰 배경이 꼭 필요하나요?", answer: "꼭 그렇지는 않습니다. 중요한 건 흰 배경 자체보다 색 반사가 적은 중성 환경입니다." },
            { question: "같은 사람인데 여름이 나오기도 하고 겨울이 나오기도 해요. 왜 그런가요?", answer: "조명 색, 화이트밸런스, 피부 보정 차이만으로도 충분히 달라질 수 있습니다. 같은 조건으로 다시 해봐야 방향이 보입니다." },
        ],
        relatedTitle: "같이 보면 좋은 문서",
        related: [
            { href: "/guides/result-reading", title: "결과 해석 가이드", summary: "시즌 결과와 추천 문구를 어느 정도 무게로 봐야 하는지 정리했습니다." },
            { href: "/guides/methodology", title: "분석 방법론", summary: "퍼스널 컬러 결과가 어떤 입력을 바탕으로 만들어지는지 설명합니다." },
            { href: "/color", title: "퍼스널 컬러 분석 시작", summary: "사진 준비가 끝났다면 바로 분석을 진행할 수 있습니다." },
        ],
    },
    en: {
        title: "Personal Color Photo Guide | FINDCORE",
        description: "How to reduce skin-tone distortion and get more stable personal-color results from photo-based analysis.",
        heading: "Personal Color Photo Guide",
        intro: "Personal color usually shifts even more easily than face shape. Lighting temperature, camera correction, and reflected surrounding color can all change how skin reads. A clean photo is usually more useful than a flattering one.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Prioritize natural light", "Disable beauty filters", "Avoid strong color casts", "Compare repeat runs under the same condition"],
        sections: [
            {
                title: "1. Stable lighting temperature matters most",
                body: "Personal color tries to read warmth, coolness, brightness, and softness from skin appearance. If the light source shifts color, the result can shift with it.",
                bullets: [
                    "Window light or balanced white light is usually safest.",
                    "Yellow indoor light and neon light can make skin look warmer or duller than it is.",
                    "Morning and night photos of the same face can reasonably produce different outputs.",
                ],
            },
            {
                title: "2. Turn off automatic correction",
                body: "Beauty mode, HDR, and skin smoothing all change brightness and color. They may still look natural, but they contaminate analysis.",
                bullets: [
                    "Disable beauty, skin smoothing, and color filters when possible.",
                    "Original captures are better than social-media exports.",
                    "If your default camera app heavily edits images, try a more neutral camera app.",
                ],
            },
            {
                title: "3. Reduce color reflection from the environment",
                body: "Strong wall colors and saturated clothing can cast color back onto the face and move apparent undertone.",
                bullets: [
                    "Neutral backgrounds such as gray, white, or beige are safer.",
                    "Deep red, neon, and vivid blue clothing can contaminate skin appearance.",
                    "Avoid reflective colored glass or mirrors nearby.",
                ],
            },
            {
                title: "4. Look for repeated consistency",
                body: "A single attractive upload matters less than two or three runs under the same conditions pointing in a similar direction.",
                bullets: [
                    "Do not mix very different lighting conditions when comparing results.",
                    "For borderline seasons, look for recurring tone tendencies first.",
                    "In shopping practice, repeated brightness and saturation patterns matter more than one exact season word.",
                ],
            },
        ],
        checklistTitle: "Personal color upload checklist",
        checklistItems: [
            "Use natural light or balanced white light",
            "Turn off beauty mode, HDR, and filters",
            "Choose a neutral background and non-distracting clothing",
            "Keep enough visible skin and avoid harsh shadow",
            "Check whether repeated tests under the same condition point in a similar direction",
        ],
        faqTitle: "Personal color FAQ",
        faqs: [
            { question: "Can I use a photo with makeup?", answer: "You can, but base makeup, lipstick, and blush can shift how the skin reads. Bare skin or light makeup is more reliable." },
            { question: "Do I need a pure white background?", answer: "No. A neutral background matters more than a perfectly white one." },
            { question: "Why do I alternate between Summer and Winter?", answer: "Lighting color, white balance, and skin correction can all cause that. Compare repeated runs under matched conditions instead of mixing photos." },
        ],
        relatedTitle: "Related reading",
        related: [
            { href: "/guides/result-reading", title: "Result Reading Guide", summary: "Learn how much weight to place on season labels versus recommendation text." },
            { href: "/guides/methodology", title: "Analysis Methodology", summary: "See which input conditions and rules drive personal-color outputs." },
            { href: "/color", title: "Start Personal Color Analysis", summary: "Once the photo conditions are clean, you can go straight into the tool." },
        ],
    },
    zh: {
        title: "个人色彩拍照指南 | FINDCORE",
        description: "说明如何减少肤色失真，并让基于照片的个人色彩结果更稳定。",
        heading: "个人色彩拍照指南",
        intro: "个人色彩比脸型更容易波动，因为光线色温、相机修正和周围颜色反射都会改变肤色观感。比起一张好看的照片，更重要的是一张色偏更少的照片。",
        updatedLabel: "更新：2026年3月12日",
        highlights: ["优先自然光", "关闭美颜滤镜", "避免强烈色偏环境", "在相同条件下重复比较"],
        sections: [
            {
                title: "1. 先保证光线色温稳定",
                body: "个人色彩会读取皮肤给人的冷暖、明暗与柔和感。只要光源颜色变化，结果也会跟着变化。",
                bullets: [
                    "窗边自然光或均衡白光通常最稳妥。",
                    "偏黄室内灯和霓虹灯会让皮肤显得更暖或更浑。",
                    "同一个人在早晨和夜晚拍摄，结果不同并不奇怪。",
                ],
            },
            {
                title: "2. 关闭自动修图",
                body: "美颜、HDR 与磨皮会改变皮肤的亮度和色彩。即使看起来自然，对分析来说仍是噪声。",
                bullets: [
                    "尽量关闭美颜、皮肤修正和色彩滤镜。",
                    "原始拍摄图通常比社交平台导出图更可靠。",
                    "若默认相机修得很重，可以换更中性的相机应用。",
                ],
            },
            {
                title: "3. 减少环境颜色反射",
                body: "强烈背景色和高饱和衣服会把颜色反射到脸上，改变肤色冷暖感。",
                bullets: [
                    "灰色、白色、米色等中性背景更安全。",
                    "深红、荧光色、鲜蓝色衣服容易污染肤色观感。",
                    "尽量避开彩色玻璃与强反光镜面附近。",
                ],
            },
            {
                title: "4. 看重复一致性",
                body: "比起一次看起来漂亮的上传图，更重要的是在同样条件下做两三次测试时，方向是否接近。",
                bullets: [
                    "比较时不要混用完全不同光线条件的照片。",
                    "边界季型应先看反复出现的色调倾向。",
                    "实际购物时，比起死抓季型名称，更该看重复出现的明度与饱和度倾向。",
                ],
            },
        ],
        checklistTitle: "个人色彩上传检查清单",
        checklistItems: [
            "使用自然光或均衡白光",
            "关闭美颜、HDR 和滤镜",
            "选择中性背景与不过分抢眼的衣服",
            "保证皮肤区域足够可见并避免强阴影",
            "确认相同条件下重复测试方向是否相近",
        ],
        faqTitle: "个人色彩 FAQ",
        faqs: [
            { question: "化妆照片可以用吗？", answer: "可以，但底妆、口红和腮红都会改变肤色观感。素颜或淡妆更稳定。" },
            { question: "一定要纯白背景吗？", answer: "不一定。比纯白更重要的是环境中性且色反射弱。" },
            { question: "为什么同一个人会在夏季型和冬季型之间来回跳？", answer: "光线颜色、白平衡和皮肤修正都可能造成这种情况。应优先比较相同条件下的重复结果。" },
        ],
        relatedTitle: "相关文档",
        related: [
            { href: "/guides/result-reading", title: "结果解读指南", summary: "了解季型标签与推荐文字各自应该占多大权重。" },
            { href: "/guides/methodology", title: "分析方法论", summary: "查看个人色彩结果是由哪些输入条件与规则驱动的。" },
            { href: "/color", title: "开始个人色彩分析", summary: "拍摄条件整理好后，可以直接进入分析工具。" },
        ],
    },
    ja: {
        title: "パーソナルカラー撮影ガイド | FINDCORE",
        description: "肌色の歪みを減らし、写真ベースのパーソナルカラー結果をより安定させるための撮影ガイドです。",
        heading: "パーソナルカラー撮影ガイド",
        intro: "パーソナルカラーは顔型よりさらにぶれやすい傾向があります。照明の色温度、カメラ補正、周囲の色反射が肌印象を変えるためです。きれいな写真より、色ずれの少ない写真の方が重要です。",
        updatedLabel: "更新日: 2026年3月12日",
        highlights: ["自然光を優先", "美肌フィルターを切る", "強い色かぶりを避ける", "同条件で繰り返し比較する"],
        sections: [
            {
                title: "1. まず光の色温度を安定させる",
                body: "パーソナルカラーは肌の暖かさ、冷たさ、明るさ、柔らかさの印象を読み取ります。光源の色が変われば結果も変わります。",
                bullets: [
                    "窓際の自然光や均一な白色照明が最も無難です。",
                    "黄色い室内灯やネオンは肌をより暖かく、または濁って見せます。",
                    "同じ人でも朝と夜で結果が変わることは十分あります。",
                ],
            },
            {
                title: "2. 自動補正を切る",
                body: "美肌、HDR、肌補正は明るさと色を変えます。自然に見えても分析にはノイズです。",
                bullets: [
                    "可能なら美肌、肌補正、色フィルターをオフにしてください。",
                    "SNS保存版より元画像の方が信頼しやすいです。",
                    "標準カメラが強く補正するなら、より中立的なカメラアプリを試してください。",
                ],
            },
            {
                title: "3. 周囲からの色反射を減らす",
                body: "強い背景色や彩度の高い服は顔へ色を反射し、肌の見え方を変えます。",
                bullets: [
                    "グレー、白、ベージュなど中立的な背景が安全です。",
                    "深い赤、蛍光色、鮮やかな青の服は肌印象を汚しやすいです。",
                    "色付きガラスや強い反射面の近くは避けてください。",
                ],
            },
            {
                title: "4. 繰り返しの一貫性を見る",
                body: "一度のきれいな写真より、同条件で2〜3回試したときに近い方向が出るかの方が重要です。",
                bullets: [
                    "比較時に大きく異なる照明条件の写真を混ぜないでください。",
                    "境界シーズンでは、繰り返し出るトーン傾向を優先してください。",
                    "買い物ではシーズン名より、繰り返し現れる明度と彩度傾向の方が実用的です。",
                ],
            },
        ],
        checklistTitle: "パーソナルカラー用チェックリスト",
        checklistItems: [
            "自然光または均一な白色照明を使う",
            "美肌モード、HDR、フィルターを切る",
            "中立的な背景と主張の強すぎない服を選ぶ",
            "肌が十分見えていて強い影がないことを確認する",
            "同条件で繰り返した時に近い方向が出るか確認する",
        ],
        faqTitle: "パーソナルカラー FAQ",
        faqs: [
            { question: "メイクありの写真でも使えますか？", answer: "使えますが、ベースやリップ、チークが肌印象を変えます。素肌または薄いメイクの方が安定します。" },
            { question: "白背景でないとだめですか？", answer: "必須ではありません。真っ白であることより、中立的で色反射の少ない環境が重要です。" },
            { question: "なぜサマーとウィンターが行き来するのですか？", answer: "光の色、ホワイトバランス、肌補正の違いで起こり得ます。同条件での反復結果を優先してください。" },
        ],
        relatedTitle: "あわせて読む",
        related: [
            { href: "/guides/result-reading", title: "結果の読み方ガイド", summary: "シーズンラベルと提案文をどの程度の重みで見るべきかを説明します。" },
            { href: "/guides/methodology", title: "分析方法論", summary: "パーソナルカラー結果を動かす入力条件とルールを確認できます。" },
            { href: "/color", title: "パーソナルカラー分析を始める", summary: "撮影条件を整えた後、そのまま分析へ進めます。" },
        ],
    },
};

const GUIDE_RESULT_READING: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "결과 해석 가이드 | FINDCORE",
        description: "결과 페이지의 숫자, 품질 경고, 추천 문구를 어떤 순서로 봐야 하는지 정리한 안내입니다.",
        heading: "결과 해석 가이드",
        intro: "결과 페이지에는 숫자도 있고 추천도 있고 경고도 같이 보입니다. 이걸 한 덩어리로 보면 헷갈리기 쉬워서, 어떤 항목부터 봐야 하는지 먼저 정리해두는 게 좋습니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["숫자와 추천은 다름", "품질 경고 먼저 보기", "한 번보다 반복 결과가 중요", "결과는 방향으로 활용"],
        sections: [
            {
                title: "1. 숫자와 추천 문구는 성격이 다릅니다",
                body: "길이 대비 폭, 상부 대비 하부 폭, 광대 우세도 같은 값은 계산 결과입니다. 반면 헤어, 안경, 색상 추천은 그 결과를 보기 쉽게 풀어낸 해석입니다.",
                bullets: [
                    "숫자는 얼굴 구조나 색 경향을 보여줍니다.",
                    "추천은 그 결과를 어떻게 활용할지 알려줍니다.",
                    "추천이 마음에 안 든다고 숫자까지 틀렸다고 볼 필요는 없습니다.",
                ],
            },
            {
                title: "2. 품질 경고는 가장 먼저 보는 게 맞습니다",
                body: "입력이 흔들리면 숫자도 흔들립니다. 그래서 품질 경고가 남아 있으면 결과를 단정적으로 보기보다 한 번 더 점검하는 쪽이 맞습니다.",
                bullets: [
                    "헤어라인, 프레임, 커버리지 경고는 그냥 장식이 아닙니다.",
                    "경계형 얼굴은 미세 보정만으로도 결과 이름이 바뀔 수 있습니다.",
                    "퍼스널 컬러도 사진 조건이 나쁘면 시즌명보다 공통 경향을 먼저 보는 게 낫습니다.",
                ],
            },
            {
                title: "3. 한 번보다 반복 결과가 더 믿을 만합니다",
                body: "좋은 조건으로 두세 번 해봤을 때 비슷한 방향이 계속 나오면 신뢰도가 올라갑니다. 반대로 사진마다 조건이 다르면 비교 의미가 많이 줄어듭니다.",
                bullets: [
                    "같은 조명, 같은 기기, 비슷한 각도에서 비교하세요.",
                    "경계형일수록 하나의 이름보다 반복되는 패턴을 보는 편이 낫습니다.",
                    "결과는 딱 잘라 정체성처럼 보기보다 참고 기준으로 쓰는 게 현실적입니다.",
                ],
            },
        ],
        checklistTitle: "결과 읽을 때 먼저 볼 순서",
        checklistItems: [
            "품질 경고와 신뢰도부터 확인",
            "그다음 숫자가 어떤 방향을 가리키는지 확인",
            "추천 문구는 스타일 가이드로 따로 읽기",
            "같은 조건에서 반복했을 때 비슷한지 확인",
            "경계형이면 하나의 이름보다 공통 패턴을 먼저 보기",
        ],
        faqTitle: "결과 해석 FAQ",
        faqs: [
            { question: "결과 이름이 바뀌면 이전 결과는 틀린 건가요?", answer: "항상 그렇지는 않습니다. 경계형 결과는 사진 조건이나 프레임 보정에 따라 바뀔 수 있어서, 반복해서 비슷한 방향이 나오는지를 먼저 보시는 게 좋습니다." },
            { question: "추천이 마음에 안 들면 결과 자체를 무시해야 하나요?", answer: "그럴 필요는 없습니다. 추천은 해석 문구라서 취향에 맞게 조절할 수 있습니다. 숫자와 추천을 나눠서 보세요." },
            { question: "반복해서 비슷하게 나오면 그때는 믿어도 되나요?", answer: "네. 좋은 조건에서 비슷한 방향이 반복되면 참고용으로는 충분히 믿고 써도 됩니다." },
        ],
        relatedTitle: "같이 보면 좋은 문서",
        related: [
            { href: "/guides/face-shape-photo", title: "얼굴형 분석 사진 가이드", summary: "얼굴형 결과가 흔들리는 이유를 촬영 단계에서 줄이는 방법을 정리했습니다." },
            { href: "/guides/personal-color-photo", title: "퍼스널 컬러 촬영 가이드", summary: "조명과 필터 때문에 시즌 결과가 달라질 수 있는 이유를 설명합니다." },
            { href: "/guides/faq", title: "자주 묻는 질문", summary: "많이 받는 질문만 짧고 빠르게 확인할 수 있습니다." },
        ],
    },
    en: {
        title: "Result Reading Guide | FINDCORE",
        description: "How to separate measurements, quality warnings, and recommendation text when reading FINDCORE outputs.",
        heading: "Result Reading Guide",
        intro: "A tool output often looks like one statement, but it contains different layers. Measurements are computed values, quality warnings describe input stability, and recommendations are style guidance. Separating those layers prevents over-reading the result.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Measurements are not recommendations", "Quality warnings matter", "Consistency beats a single run", "Read outputs as direction"],
        sections: [
            {
                title: "1. Separate the measurements from the style text",
                body: "Length-to-width, upper-vs-lower width, and cheekbone dominance belong to the measurement layer. Hair, eyewear, or color suggestions belong to the interpretation layer.",
                bullets: [
                    "Measurements describe structure.",
                    "Recommendations describe how to use that structure.",
                    "Disliking a recommendation does not automatically mean the measurement is wrong.",
                ],
            },
            {
                title: "2. Quality warnings are the first filter",
                body: "If the input is unstable, the numbers become unstable too. When warnings remain, the output should be read more cautiously.",
                bullets: [
                    "Hairline, frame, and coverage warnings are functional signals, not decoration.",
                    "Borderline labels can move after small frame edits.",
                    "For personal color, poor conditions make broad tendencies more useful than the exact season word.",
                ],
            },
            {
                title: "3. Repeated consistency matters most",
                body: "Two or three runs under good conditions that point in a similar direction are more valuable than one attractive but isolated result.",
                bullets: [
                    "Compare results under matched lighting, device, and angle.",
                    "For borderline cases, recurring patterns matter more than one label.",
                    "Use the output as coordinates, not identity.",
                ],
            },
        ],
        checklistTitle: "Recommended reading order",
        checklistItems: [
            "Check warnings and confidence first",
            "Read the direction of the measured values next",
            "Treat recommendation text as styling guidance",
            "Compare repeated runs under matched conditions",
            "For borderline cases, prioritize recurring patterns over one label",
        ],
        faqTitle: "Result interpretation FAQ",
        faqs: [
            { question: "If the label changes, was the older result wrong?", answer: "Not always. Borderline labels can move when input quality or frame correction changes. Repeated proportion patterns matter more than one label shift." },
            { question: "If I dislike the recommendation, should I ignore the result?", answer: "No. Recommendations are an interpretation layer and can be adjusted to taste. Separate them from the measurements." },
            { question: "If similar results repeat, is that enough to trust them?", answer: "Yes. Repeated agreement under good conditions is usually the strongest practical trust signal." },
        ],
        relatedTitle: "Related reading",
        related: [
            { href: "/guides/face-shape-photo", title: "Face Shape Photo Guide", summary: "Reduce capture-side issues that make face-shape labels drift." },
            { href: "/guides/personal-color-photo", title: "Personal Color Photo Guide", summary: "See why lighting and filters make season results bounce." },
            { href: "/guides/faq", title: "Frequently Asked Questions", summary: "Find short answers to the issues that come up most often." },
        ],
    },
    zh: {
        title: "结果解读指南 | FINDCORE",
        description: "说明在阅读 FINDCORE 输出时，如何区分测量值、质量提示与推荐文字。",
        heading: "结果解读指南",
        intro: "工具结果看起来像一句完整的话，但实际上由不同层组成。测量值是计算结果，质量提示反映输入稳定性，推荐文字则是风格建议。把这些层分开理解，才能避免过度解读。",
        updatedLabel: "更新：2026年3月12日",
        highlights: ["测量值不等于推荐", "质量提示不能忽视", "重复一致性更重要", "把结果当方向而不是定论"],
        sections: [
            {
                title: "1. 把测量值和推荐文字分开看",
                body: "长宽比、上部与下部宽度、颧骨主导度属于测量层；发型、眼镜、色彩推荐属于解释层。",
                bullets: [
                    "测量值在描述结构。",
                    "推荐在说明如何使用这个结构。",
                    "不喜欢推荐并不等于测量一定错误。",
                ],
            },
            {
                title: "2. 质量提示是第一道过滤器",
                body: "只要输入不稳定，数值就会一起不稳定。警告存在时，就不适合把结果看得太绝对。",
                bullets: [
                    "发际线、框线、覆盖范围警告都是真正有意义的信号。",
                    "边界标签可能会在细小框线调整后变化。",
                    "个人色彩条件差时，大趋势往往比精确季型更有用。",
                ],
            },
            {
                title: "3. 重复一致性最重要",
                body: "在良好条件下做两三次测试且方向接近，比一次好看的孤立结果更有价值。",
                bullets: [
                    "比较时尽量统一光线、设备和角度。",
                    "边界型更应看反复出现的模式，而不是单个标签。",
                    "把结果当作坐标，而不是身份定义，会更实用。",
                ],
            },
        ],
        checklistTitle: "推荐的阅读顺序",
        checklistItems: [
            "先看警告与信心信号",
            "再看测量值指向的方向",
            "把推荐文字当作风格建议",
            "观察相同条件下重复测试是否一致",
            "边界型优先看重复模式而不是单个标签",
        ],
        faqTitle: "结果解读 FAQ",
        faqs: [
            { question: "标签变了，之前的结果就一定错了吗？", answer: "不一定。边界标签会随着输入质量和框线校正变化。比标签更重要的是重复出现的比例趋势。" },
            { question: "如果我不喜欢推荐内容，是不是就该忽略结果？", answer: "不是。推荐属于解释层，可以根据偏好调整。应先把它和测量值分开理解。" },
            { question: "如果重复出来的方向差不多，就可以信了吗？", answer: "可以。良好条件下的重复一致性通常就是最强的实际可信信号。" },
        ],
        relatedTitle: "相关文档",
        related: [
            { href: "/guides/face-shape-photo", title: "脸型分析拍照指南", summary: "从拍摄阶段减少让脸型标签漂移的因素。" },
            { href: "/guides/personal-color-photo", title: "个人色彩拍照指南", summary: "了解为什么光线和滤镜会让季型结果反复变化。" },
            { href: "/guides/faq", title: "常见问题", summary: "快速查看高频问题的简洁回答。" },
        ],
    },
    ja: {
        title: "結果の読み方ガイド | FINDCORE",
        description: "FINDCORE の出力を読むときに、計測値、品質警告、提案文をどう分けて考えるべきかを説明します。",
        heading: "結果の読み方ガイド",
        intro: "ツール結果は一文のように見えても、実際には複数の層でできています。計測値は計算結果、品質警告は入力安定性の信号、提案文はスタイルガイドです。この層を分けて読むことで過大解釈を防げます。",
        updatedLabel: "更新日: 2026年3月12日",
        highlights: ["計測値と提案文は別物", "品質警告は無視しない", "一度の結果より再現性", "結果は方向として読む"],
        sections: [
            {
                title: "1. 計測値と提案文を分けて考える",
                body: "縦横比、上部と下部の幅、頬骨優位性は計測層です。ヘア、眼鏡、色の提案は解釈層です。",
                bullets: [
                    "計測値は構造を説明します。",
                    "提案はその構造の使い方を説明します。",
                    "提案が好みに合わなくても、計測が誤りとは限りません。",
                ],
            },
            {
                title: "2. 品質警告が最初のフィルター",
                body: "入力が不安定なら数値も不安定です。警告が残る時は、結果を強く断定しない方が安全です。",
                bullets: [
                    "生え際、フレーム、カバレッジ警告には意味があります。",
                    "境界ラベルは小さなフレーム調整でも動くことがあります。",
                    "パーソナルカラーも条件が悪い時は大きな傾向を見る方が有効です。",
                ],
            },
            {
                title: "3. 最も重要なのは反復の一貫性",
                body: "良い条件で2〜3回試して近い方向が続くなら、一回の見栄えの良い結果より価値があります。",
                bullets: [
                    "比較時は照明、端末、角度を揃えてください。",
                    "境界ケースでは単一ラベルより反復パターンを重視してください。",
                    "結果はアイデンティティではなく座標として使う方が実用的です。",
                ],
            },
        ],
        checklistTitle: "結果を読む順番",
        checklistItems: [
            "最初に警告と信頼度を見る",
            "次に計測値の方向を見る",
            "提案文はスタイルガイドとして分けて読む",
            "同条件で繰り返した時に近い方向が出るか確認する",
            "境界ケースでは単一ラベルより反復パターンを優先する",
        ],
        faqTitle: "結果解釈 FAQ",
        faqs: [
            { question: "ラベルが変わったら前の結果は間違いですか？", answer: "必ずしもそうではありません。境界ラベルは入力品質やフレーム補正で動きます。反復する比率傾向を見てください。" },
            { question: "提案が好みでなければ結果を無視すべきですか？", answer: "いいえ。提案は解釈層なので好みに合わせて調整できます。計測と分けて考えてください。" },
            { question: "繰り返して似た結果が出れば信頼してよいですか？", answer: "はい。良い条件下での反復一致は、実用上もっとも強い信頼シグナルです。" },
        ],
        relatedTitle: "あわせて読む",
        related: [
            { href: "/guides/face-shape-photo", title: "顔型分析の撮影ガイド", summary: "顔型ラベルがぶれる原因を撮影段階から減らします。" },
            { href: "/guides/personal-color-photo", title: "パーソナルカラー撮影ガイド", summary: "照明やフィルターでシーズン結果が揺れる理由を説明します。" },
            { href: "/guides/faq", title: "よくある質問", summary: "高頻度の疑問に短く答えます。" },
        ],
    },
};

const GUIDE_METHODOLOGY: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "분석 방법론 | FINDCORE",
        description: "FINDCORE가 어떤 입력을 읽고 어떤 기준으로 결과를 만드는지 정리한 설명 페이지입니다.",
        heading: "분석 방법론",
        intro: "이 문서는 FINDCORE가 실제로 무엇을 보고 결과를 만드는지 설명합니다. 결과를 더 잘 이해하려면 기능의 장점뿐 아니라 어디서 흔들릴 수 있는지도 같이 알아두는 편이 좋습니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["브라우저 안에서 계산", "프레임과 비율 기준 사용", "추천은 해석 단계", "입력 품질이 가장 중요"],
        sections: [
            {
                title: "1. 업로드 사진은 결과 계산에 쓰입니다",
                body: "FINDCORE의 업로드형 기능은 사진을 브라우저 안에서 읽고, 그 사진을 바탕으로 결과를 계산합니다. 즉 사진은 분석에 쓰이는 입력값이라고 보는 게 맞습니다.",
                bullets: [
                    "결과 품질은 사진 조건 영향을 크게 받습니다.",
                    "사진은 계산 재료이지 결과 자체는 아닙니다.",
                    "그래서 저장 여부보다 입력 품질이 더 중요합니다.",
                ],
            },
            {
                title: "2. 얼굴형 분석은 프레임과 비율을 봅니다",
                body: "헤어라인, 광대, 턱선, 턱끝을 기준으로 세로 길이와 가로 폭 관계를 계산합니다. 자동 인식은 시작점일 뿐이고, 보정 페이지에서 손본 프레임이 최종 계산에 반영됩니다.",
                bullets: [
                    "길이 대비 폭, 상부 대비 하부 폭, 광대 우세도가 핵심 신호입니다.",
                    "정면성이 무너지거나 헤어라인이 가려지면 결과가 흔들리기 쉽습니다.",
                    "수동 프레임은 보기용이 아니라 실제 분석 입력입니다.",
                ],
            },
            {
                title: "3. 퍼스널 컬러는 조명 영향을 크게 받습니다",
                body: "피부가 밝아 보이는지, 차가워 보이는지, 탁해 보이는지 같은 인상을 읽기 때문에 조명과 카메라 보정이 조금만 달라도 결과가 달라질 수 있습니다.",
                bullets: [
                    "같은 사람도 조명과 화이트밸런스가 다르면 다른 시즌 방향으로 읽힐 수 있습니다.",
                    "그래서 한 번보다 반복 결과가 더 중요합니다.",
                    "경계 시즌은 공통된 색 경향을 먼저 보는 편이 낫습니다.",
                ],
            },
            {
                title: "4. 추천 문구는 숫자를 풀어쓴 설명입니다",
                body: "결과 카드의 헤어, 안경, 색상 추천은 계산된 값을 사람이 이해하기 쉽게 풀어쓴 설명입니다. 숫자와 완전히 같은 정보라고 보면 안 됩니다.",
                bullets: [
                    "같은 구조라도 스타일 목표에 따라 추천은 달라질 수 있습니다.",
                    "추천 문구는 정답이라기보다 방향 제안에 가깝습니다.",
                    "실제 적용은 취향과 목적을 함께 보고 정하는 게 맞습니다.",
                ],
            },
        ],
        checklistTitle: "결과를 신뢰하기 전에 확인할 것",
        checklistItems: [
            "사진 조건이 가이드 기준을 만족하는지",
            "보정 프레임이 실제 피부 외곽과 맞는지",
            "품질 경고가 남아 있지 않은지",
            "같은 조건에서 반복했을 때 비슷한 방향이 나오는지",
            "추천 문구와 측정값을 구분해서 보고 있는지",
        ],
        faqTitle: "방법론 FAQ",
        faqs: [
            { question: "자동 인식이 있는데 왜 수동 보정이 필요한가요?", answer: "자동 인식은 빠르게 초안을 잡아주지만, 머리카락이나 그림자 때문에 바깥 윤곽이 어긋날 수 있습니다. 그래서 최종 프레임은 직접 확인하는 게 안전합니다." },
            { question: "퍼스널 컬러가 자꾸 바뀌는 건 모델이 약해서인가요?", answer: "보통은 조명과 카메라 보정 영향이 더 큽니다. 퍼스널 컬러는 사진 조건에 특히 민감한 기능입니다." },
            { question: "결과를 어디까지 믿어도 되나요?", answer: "좋은 조건에서 반복했을 때 비슷한 방향이 계속 나오면 참고용으로는 충분히 믿고 써도 됩니다. 다만 절대적인 판정처럼 받아들이는 건 추천하지 않습니다." },
        ],
        relatedTitle: "관련 문서",
        related: [
            { href: "/guides/face-shape-photo", title: "얼굴형 분석 사진 가이드", summary: "얼굴형 분석에서 먼저 챙겨야 할 촬영 조건을 정리했습니다." },
            { href: "/guides/personal-color-photo", title: "퍼스널 컬러 촬영 가이드", summary: "퍼스널 컬러에서 색 왜곡을 줄이는 실전 조건을 안내합니다." },
            { href: "/guides/faq", title: "자주 묻는 질문", summary: "저장 여부, 모바일 사용, 결과 변동 같은 질문을 빠르게 확인할 수 있습니다." },
        ],
    },
    en: {
        title: "Analysis Methodology | FINDCORE",
        description: "Explains what FINDCORE's face-shape and personal-color tools read in the browser, and how rule-based outputs are produced.",
        heading: "Analysis Methodology",
        intro: "This document explains what FINDCORE measures and what it does not. Reliable use requires understanding both the strengths and the limitations of the system. The focus here is browser-side processing, frame correction, and rule-based interpretation.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Browser-side processing", "Frame and landmark-based measurement", "Rule-based interpretation", "Input quality drives output quality"],
        sections: [
            {
                title: "1. Uploaded photos are analysis inputs",
                body: "The upload-based tools read the image inside the browser and use it as input for style-oriented outputs. The photo functions as analysis material rather than as long-term published content.",
                bullets: [
                    "Result quality depends heavily on the photo condition.",
                    "The image is raw material for calculation, not the result itself.",
                    "Trust depends more on input quality and rule design than on storage assumptions.",
                ],
            },
            {
                title: "2. Face-shape analysis is driven by frames and proportion rules",
                body: "The tool measures vertical length and horizontal width relationships around the hairline, cheek area, jaw contour, and chin tip. Auto detection creates a draft, but the corrected frame becomes the final input.",
                bullets: [
                    "Length-to-width, upper-vs-lower width, and cheekbone dominance are core signals.",
                    "If frontal alignment breaks or the hairline is hidden, borderline labels move easily.",
                    "The manual frame is not cosmetic; it directly affects the calculation.",
                ],
            },
            {
                title: "3. Personal color is sensitive to skin-appearance signals",
                body: "The system estimates how warm, cool, bright, or muted skin appears in the image. That makes it especially sensitive to lighting and automatic camera correction.",
                bullets: [
                    "The same person can land in different seasonal directions under different light and white balance.",
                    "This tool is often more useful for repeated tonal tendencies than for one absolute diagnosis.",
                    "For borderline seasons, the common color pattern matters more than one exact label.",
                ],
            },
            {
                title: "4. Recommendation text is an interpretation layer",
                body: "Hair, eyewear, contour, and palette suggestions translate measured structure into usable styling language. They do not have the same status as the raw measurements.",
                bullets: [
                    "The same measured structure can still produce different suggestions depending on styling goal.",
                    "Recommendation text is guidance, not fixed truth.",
                    "Practical styling still depends on taste and context.",
                ],
            },
        ],
        checklistTitle: "What to verify before trusting the output",
        checklistItems: [
            "Make sure the photo meets the guide conditions",
            "Check that the correction frame matches the actual skin boundary",
            "Look for unresolved quality warnings",
            "Compare repeated runs under matched conditions",
            "Separate recommendation text from measured values while reading the result",
        ],
        faqTitle: "Methodology FAQ",
        faqs: [
            { question: "Why offer manual correction if auto detection already exists?", answer: "Because hair, shadow, and lens distortion can push the draft away from the real boundary. Manual correction lets the user fix the final working input." },
            { question: "If personal color keeps changing, is the model weak?", answer: "Usually the bigger factor is lighting and camera correction. Personal color is especially sensitive to input condition shifts." },
            { question: "How far should I trust the output?", answer: "If the direction repeats under good conditions, the result is usually reliable enough for practical style use. It should still not be treated as a permanent identity verdict." },
        ],
        relatedTitle: "Related documents",
        related: [
            { href: "/guides/face-shape-photo", title: "Face Shape Photo Guide", summary: "See the input conditions that matter most for face-shape stability." },
            { href: "/guides/personal-color-photo", title: "Personal Color Photo Guide", summary: "Reduce real-world sources of color distortion before you upload." },
            { href: "/guides/faq", title: "Frequently Asked Questions", summary: "Find short answers about storage, mobile use, and result drift." },
        ],
    },
    zh: {
        title: "分析方法论 | FINDCORE",
        description: "说明 FINDCORE 的脸型分析与个人色彩工具在浏览器中读取什么输入，以及如何通过规则生成结果。",
        heading: "分析方法论",
        intro: "这份文档说明 FINDCORE 测量什么，以及不测量什么。想更合理地使用结果，就要同时理解系统的优势和局限。这里重点说明浏览器端处理、框线校正与规则式解释结构。",
        updatedLabel: "更新：2026年3月12日",
        highlights: ["浏览器端处理", "基于框线与关键点的测量", "规则式解释", "输入质量决定输出质量"],
        sections: [
            {
                title: "1. 上传照片是分析输入",
                body: "上传型工具会在浏览器里读取图像，并把它作为生成风格参考结果的输入。照片更像分析材料，而不是长期发布内容。",
                bullets: [
                    "结果质量高度依赖照片条件。",
                    "图片是计算原料，而不是结果本身。",
                    "可信度更依赖输入质量与规则设计，而不是存储假设。",
                ],
            },
            {
                title: "2. 脸型分析依赖框线与比例规则",
                body: "系统会围绕发际线、颧骨区域、下颌轮廓、下巴尖等位置，计算纵向长度与横向宽度关系。自动识别先给草稿，校正后的框线才是最终输入。",
                bullets: [
                    "长宽比、上部对下部宽度、颧骨主导度是核心信号。",
                    "正面性不足或发际线被遮住时，边界标签很容易变化。",
                    "手动框线不是装饰，而是会影响计算的真实输入。",
                ],
            },
            {
                title: "3. 个人色彩对皮肤观感信号很敏感",
                body: "系统会根据皮肤看起来偏暖、偏冷、偏亮、偏柔和的程度来估计方向，因此对光线与相机自动修正特别敏感。",
                bullets: [
                    "同一个人在不同光线和白平衡下，可能落到不同季型方向。",
                    "这个工具更适合看重复出现的色调趋势，而不是单次绝对诊断。",
                    "边界季型里，共同出现的颜色倾向比单一标签更重要。",
                ],
            },
            {
                title: "4. 推荐文字属于解释层",
                body: "发型、眼镜、修容与配色建议，是把结构测量翻译成更容易使用的风格语言。它和底层数值不是同一种信息。",
                bullets: [
                    "相同结构在不同风格目标下可以得到不同建议。",
                    "推荐文字是方向，不是固定真理。",
                    "真正的造型决定仍取决于偏好与场景。",
                ],
            },
        ],
        checklistTitle: "在信任结果前先确认",
        checklistItems: [
            "照片是否符合指南条件",
            "校正框线是否贴合真实皮肤边界",
            "是否仍有明显质量提示",
            "相同条件下重复测试方向是否接近",
            "阅读时是否把推荐与测量分开理解",
        ],
        faqTitle: "方法论 FAQ",
        faqs: [
            { question: "既然有自动识别，为什么还要手动校正？", answer: "头发、阴影和镜头畸变可能让自动草稿偏离真实边界。手动校正允许用户修正最终输入。" },
            { question: "个人色彩总在变化，是模型不行吗？", answer: "通常更大的原因是光线与相机修正。个人色彩对输入条件变化特别敏感。" },
            { question: "结果到底可以信到什么程度？", answer: "只要在良好条件下重复后方向一致，作为实际风格参考通常已经足够可信。但不应把它理解为永久身份标签。" },
        ],
        relatedTitle: "相关文档",
        related: [
            { href: "/guides/face-shape-photo", title: "脸型分析拍照指南", summary: "查看对脸型稳定性影响最大的输入条件。" },
            { href: "/guides/personal-color-photo", title: "个人色彩拍照指南", summary: "在上传前先减少现实环境中的色偏来源。" },
            { href: "/guides/faq", title: "常见问题", summary: "快速查看存储、移动端使用与结果波动等问题。" },
        ],
    },
    ja: {
        title: "分析方法論 | FINDCORE",
        description: "FINDCORE の顔型分析とパーソナルカラー機能がブラウザで何を読み取り、どのように結果を作るかを説明します。",
        heading: "分析方法論",
        intro: "この文書は、FINDCORE が何を測り、何を測らないのかを説明します。結果を適切に信頼するには、強みだけでなく限界も理解する必要があります。ここではブラウザ内処理、フレーム補正、ルールベース解釈を中心に整理します。",
        updatedLabel: "更新日: 2026年3月12日",
        highlights: ["ブラウザ内処理", "フレームとランドマークに基づく計測", "ルールベース解釈", "入力品質が出力品質を左右する"],
        sections: [
            {
                title: "1. アップロード写真は分析入力です",
                body: "アップロード型ツールは画像をブラウザ内で読み取り、スタイル参考結果の入力として使います。写真は分析材料であり、長期公開コンテンツではありません。",
                bullets: [
                    "結果品質は写真条件に強く依存します。",
                    "画像は計算の原料であり、結果そのものではありません。",
                    "信頼性は保存前提より入力品質とルール設計に左右されます。",
                ],
            },
            {
                title: "2. 顔型分析はフレームと比率ルールで動きます",
                body: "生え際、頬骨周辺、あごライン、あご先を軸に、縦の長さと横幅の関係を計算します。自動認識は下書きで、補正後のフレームが最終入力です。",
                bullets: [
                    "縦横比、上部対下部の幅、頬骨の優位性が核心シグナルです。",
                    "正面性が崩れたり生え際が隠れたりすると境界ラベルは動きやすくなります。",
                    "手動フレームは見た目用ではなく、計算に影響する本物の入力です。",
                ],
            },
            {
                title: "3. パーソナルカラーは肌印象シグナルに敏感です",
                body: "肌が暖かく見えるか、冷たく見えるか、明るく見えるか、柔らかく見えるかを読み取るため、照明や自動補正の影響を強く受けます。",
                bullets: [
                    "同じ人でも照明やホワイトバランスで別シーズン方向に寄ることがあります。",
                    "この機能は単発の絶対診断より、反復するトーン傾向を見るのに向いています。",
                    "境界シーズンでは、共通して出る色傾向が単一ラベルより重要です。",
                ],
            },
            {
                title: "4. 提案文は解釈層です",
                body: "ヘア、眼鏡、コントゥア、配色の提案は、測定構造を使いやすいスタイル言語へ翻訳したものです。元の数値と同じ情報ではありません。",
                bullets: [
                    "同じ構造でもスタイル目標によって提案は変わります。",
                    "提案文は方向づけであり、固定真実ではありません。",
                    "実際のスタイリングは好みや場面も一緒に考える必要があります。",
                ],
            },
        ],
        checklistTitle: "結果を信頼する前の確認項目",
        checklistItems: [
            "写真条件がガイド基準を満たしているか",
            "補正フレームが実際の肌境界に合っているか",
            "品質警告が残っていないか",
            "同条件で繰り返した時に近い方向が出るか",
            "提案文と計測値を分けて読んでいるか",
        ],
        faqTitle: "方法論 FAQ",
        faqs: [
            { question: "自動認識があるのに、なぜ手動補正が必要ですか？", answer: "髪、影、レンズ歪みで下書きが実際の境界から外れることがあるためです。手動補正で最終入力を修正できます。" },
            { question: "パーソナルカラーが頻繁に変わるのはモデルが弱いからですか？", answer: "多くの場合は照明とカメラ補正の影響です。パーソナルカラーは特に入力条件に敏感です。" },
            { question: "結果はどこまで信頼していいですか？", answer: "良い条件で繰り返して同じ方向が続くなら、実用上は十分信頼できます。ただし固定的なアイデンティティ判定として使うべきではありません。" },
        ],
        relatedTitle: "関連文書",
        related: [
            { href: "/guides/face-shape-photo", title: "顔型分析の撮影ガイド", summary: "顔型の安定性に最も影響する入力条件を確認できます。" },
            { href: "/guides/personal-color-photo", title: "パーソナルカラー撮影ガイド", summary: "アップロード前に現実の色ずれ要因を減らす方法をまとめています。" },
            { href: "/guides/faq", title: "よくある質問", summary: "保存、モバイル利用、結果変動に関する疑問に短く答えます。" },
        ],
    },
};

const GUIDE_FAQ: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "자주 묻는 질문 | FINDCORE",
        description: "FINDCORE 사용 중 자주 묻는 사진 저장 여부, 결과 변동, 모바일 환경, 추천 기준 관련 질문 모음입니다.",
        heading: "자주 묻는 질문",
        intro: "처음 쓰는 분들이 가장 많이 묻는 질문만 골라 짧게 정리했습니다. 사진이 저장되는지, 왜 결과가 달라지는지, 모바일로 써도 되는지, 추천은 어디까지 믿어야 하는지부터 먼저 확인해보세요.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["사진 저장 여부", "결과가 달라지는 이유", "모바일 사용 팁", "추천 읽는 법"],
        sections: [
            {
                title: "1. 같은 사람인데 왜 결과가 달라지나요",
                body: "도구는 실제 사람 자체가 아니라 업로드된 사진 속 얼굴을 읽습니다. 그래서 조명, 각도, 거리, 필터, 가림 요소가 달라지면 결과도 같이 달라질 수 있습니다.",
                bullets: [
                    "얼굴형은 각도와 프레임에 민감합니다.",
                    "퍼스널 컬러는 조명과 자동 보정에 더 민감합니다.",
                    "같은 조건에서 반복했을 때 비슷하게 나오면 그 결과가 더 믿을 만합니다.",
                ],
            },
            {
                title: "2. 모바일에서도 쓸 수 있지만 촬영 습관이 더 중요합니다",
                body: "모바일 사용 자체는 문제 없습니다. 다만 전면 카메라 보정이나 너무 가까운 셀카 습관 때문에 결과가 흔들리는 경우가 더 많습니다.",
                bullets: [
                    "너무 가까운 셀카는 얼굴형을 왜곡할 수 있습니다.",
                    "기본 카메라 앱이 강한 자동 보정을 넣는지 확인하세요.",
                    "가능하면 같은 기기와 같은 장소에서 다시 테스트해보세요.",
                ],
            },
            {
                title: "3. 추천은 절대 정답이 아닙니다",
                body: "스타일 추천은 측정값을 사람이 쓰기 쉽게 풀어낸 해석입니다. 취향이나 스타일 목표에 맞게 조정해서 보는 것이 자연스럽습니다.",
                bullets: [
                    "얼굴형 구조가 같아도 스타일 목표에 따라 추천은 달라질 수 있습니다.",
                    "퍼스널 컬러도 시즌명보다 실제 잘 받는 톤 범위가 더 중요할 수 있습니다.",
                    "결과는 단정적인 판정보다 방향 참고용으로 쓰는 편이 좋습니다.",
                ],
            },
        ],
        checklistTitle: "문제가 생기면 먼저 확인할 것",
        checklistItems: [
            "사진 조건이 각 가이드 기준과 맞는지",
            "필터와 자동 보정이 꺼져 있는지",
            "보정 프레임이 실제 외곽과 맞는지",
            "같은 조건으로 반복해도 비슷한 결과가 나오는지",
            "추천과 측정값을 혼동하고 있지 않은지",
        ],
        faqTitle: "짧은 답변 모음",
        faqs: [
            { question: "업로드한 사진이 서버에 저장되나요?", answer: "분석용 입력으로 쓰이는 흐름이라 장문 콘텐츠처럼 보관되는 구조로 보시면 안 됩니다. 업로드 이미지는 결과를 계산하기 위한 재료에 가깝습니다." },
            { question: "얼굴형 결과가 남녀 같으면 이상한 것 아닌가요?", answer: "얼굴형 판정은 구조 분류라서 같을 수 있습니다. 대신 헤어, 안경, 메이크업처럼 스타일 추천 층은 다르게 보는 게 맞습니다." },
            { question: "보정 페이지에서 손본 값이 실제 결과에 반영되나요?", answer: "네. 보정 후 분석을 실행하면 수동 프레임이 최종 계산 기준으로 들어갑니다. 그래서 보정 단계가 생각보다 중요합니다." },
            { question: "왜 품질 경고가 떠도 분석은 진행되나요?", answer: "경고는 해석에 주의하라는 뜻이지 무조건 분석 불가라는 뜻은 아닙니다. 다만 경고가 남아 있으면 결과를 단정적으로 읽지 않는 편이 안전합니다." },
        ],
        relatedTitle: "관련 문서",
        related: [
            { href: "/guides/methodology", title: "분석 방법론", summary: "도구가 어떤 구조로 계산되는지 먼저 이해하고 싶다면 이 문서를 보세요." },
            { href: "/guides/result-reading", title: "결과 해석 가이드", summary: "측정값과 추천 문구를 어떻게 구분해 읽어야 하는지 설명합니다." },
            { href: "/guides", title: "가이드 센터", summary: "전체 문서군을 한 번에 훑고 싶은 경우 여기서 시작하면 됩니다." },
        ],
    },
    en: {
        title: "Frequently Asked Questions | FINDCORE",
        description: "Common FINDCORE questions about photo handling, result drift, mobile use, and recommendation logic.",
        heading: "Frequently Asked Questions",
        intro: "This page collects the questions that repeat most often during real use: whether photos are kept, why outputs change, what makes a better input photo, and why recommendations may differ from expectation.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Photo handling", "Why results drift", "Mobile usage", "How to read recommendations"],
        sections: [
            {
                title: "1. Why can the same person produce different results?",
                body: "The tool reads the face as it appears in the uploaded image. Lighting, angle, distance, filters, and obstruction can all move the measured input.",
                bullets: [
                    "Face shape is sensitive to angle and framing.",
                    "Personal color is more sensitive to lighting and automatic correction.",
                    "Repeated results under matched conditions are the best trust signal.",
                ],
            },
            {
                title: "2. Mobile use is fine, but capture habits matter more",
                body: "Most users run these tools on phones. The bigger issue is usually front-camera enhancement and very close selfies rather than mobile as a platform.",
                bullets: [
                    "Very close selfies can distort face shape.",
                    "Check whether your camera app applies strong automatic enhancement.",
                    "Repeat tests on the same device and in the same place when possible.",
                ],
            },
            {
                title: "3. Recommendations are not absolute truths",
                body: "Style recommendations are an application layer built on top of measurements. It is normal to adjust them according to your styling goal and preference.",
                bullets: [
                    "The same structure can lead to different suggestions for different goals.",
                    "For personal color, a useful tone range can matter more than one exact season word.",
                    "The output works better as direction than identity.",
                ],
            },
        ],
        checklistTitle: "If something feels off, verify these first",
        checklistItems: [
            "Check whether the photo meets the relevant guide criteria",
            "Confirm that filters and automatic correction are off",
            "Make sure the correction frame matches the actual boundary",
            "Compare repeated runs under matched conditions",
            "Do not confuse recommendation text with the underlying measurement",
        ],
        faqTitle: "Short answers",
        faqs: [
            { question: "Are uploaded photos stored on the server?", answer: "From a product-use perspective, the image acts as analysis input rather than as long-form content inventory. Users interact with it as transient computation material." },
            { question: "Is it strange if face-shape labels are the same across genders?", answer: "The structural label can be the same. What should differ more clearly is the styling layer built on top of that structure." },
            { question: "Does the correction screen actually affect the final result?", answer: "Yes. If you run the analysis after correction, the manual frame becomes the final calculation input." },
            { question: "Why can analysis continue even when there is a quality warning?", answer: "A warning means interpret with caution, not always that analysis is impossible. But unresolved warnings should lower how strongly you trust the output." },
        ],
        relatedTitle: "Related documents",
        related: [
            { href: "/guides/methodology", title: "Analysis Methodology", summary: "Read this first if you want the structural explanation of how outputs are produced." },
            { href: "/guides/result-reading", title: "Result Reading Guide", summary: "Learn how to separate measurements from recommendation text." },
            { href: "/guides", title: "Guide Center", summary: "Start here if you want a map of the full document set." },
        ],
    },
    zh: {
        title: "常见问题 | FINDCORE",
        description: "汇总 FINDCORE 中关于照片处理、结果波动、移动端使用与推荐逻辑的常见问题。",
        heading: "常见问题",
        intro: "这页整理了真实使用流程中反复出现的问题，例如照片是否会被保留、为什么结果会变化、什么样的照片更好，以及推荐为什么可能与预期不同。",
        updatedLabel: "更新：2026年3月12日",
        highlights: ["照片处理方式", "结果为何波动", "移动端使用", "推荐应如何理解"],
        sections: [
            {
                title: "1. 为什么同一个人会得到不同结果？",
                body: "工具读取的是上传图像中呈现出来的脸，而不是抽象意义上的“同一个人”。光线、角度、距离、滤镜和遮挡都会改变输入。",
                bullets: [
                    "脸型对角度和构图尤其敏感。",
                    "个人色彩对光线与自动修正更敏感。",
                    "相同条件下重复得到的结果最值得信任。",
                ],
            },
            {
                title: "2. 手机端可以使用，但拍摄习惯更重要",
                body: "多数用户都会在手机上使用这类工具。更大的问题通常不是手机本身，而是前置相机修饰和近距离自拍习惯。",
                bullets: [
                    "距离太近的自拍会让脸型畸变。",
                    "先确认相机 App 是否加入了强自动美化。",
                    "如果可以，尽量在同一设备和同一地点重复测试。",
                ],
            },
            {
                title: "3. 推荐结果不是绝对答案",
                body: "风格推荐是建立在测量值上的应用层，因此根据审美目标和个人偏好进行调整是正常的。",
                bullets: [
                    "同一结构在不同风格目标下可以得到不同建议。",
                    "对个人色彩来说，实际适合的色调范围有时比单一季型名称更重要。",
                    "结果更适合作为方向，而不是身份定义。",
                ],
            },
        ],
        checklistTitle: "如果觉得结果不对，先检查这些",
        checklistItems: [
            "照片是否符合相应指南要求",
            "滤镜与自动修正是否已关闭",
            "校正框线是否贴合真实边界",
            "是否在相同条件下重复比较过",
            "是否把推荐文字误当成原始测量",
        ],
        faqTitle: "简短回答",
        faqs: [
            { question: "上传照片会保存在服务器吗？", answer: "从产品使用角度看，图片被当作浏览器端分析输入，而不是长期发布内容。用户与它的关系更像一次性计算材料。" },
            { question: "如果男女结果一样，会不会不合理？", answer: "结构型脸型标签可以相同。更应该区分的是建立在结构之上的风格推荐层。" },
            { question: "校正页面里手动改的内容真的会影响最终结果吗？", answer: "会。只要你在校正后继续分析，手动框线就会作为最终计算输入。" },
            { question: "为什么有质量提示却仍然可以继续分析？", answer: "提示的含义是“要谨慎解读”，不一定等于“无法分析”。但警告没消失时，不适合过度相信输出。" },
        ],
        relatedTitle: "相关文档",
        related: [
            { href: "/guides/methodology", title: "分析方法论", summary: "如果你想先理解输出是如何生成的，可以先读这篇。" },
            { href: "/guides/result-reading", title: "结果解读指南", summary: "了解如何区分测量值与推荐文字。" },
            { href: "/guides", title: "指南中心", summary: "想先浏览整套文档结构时，从这里开始最合适。" },
        ],
    },
    ja: {
        title: "よくある質問 | FINDCORE",
        description: "画像の扱い、結果の揺れ、モバイル利用、提案ロジックについての FINDCORE よくある質問集です。",
        heading: "よくある質問",
        intro: "このページでは、実際の利用フローで繰り返し出てくる質問を整理しています。画像は保存されるのか、なぜ結果が変わるのか、どんな写真が良いのか、提案がなぜ期待と違うのかを短く明確に答えます。",
        updatedLabel: "更新日: 2026年3月12日",
        highlights: ["画像の扱い", "結果がぶれる理由", "モバイル利用", "提案の読み方"],
        sections: [
            {
                title: "1. 同じ人なのに結果が変わるのはなぜですか",
                body: "ツールが読んでいるのは抽象的な本人像ではなく、アップロード画像に写った顔です。そのため、照明、角度、距離、フィルター、遮蔽で入力は変わります。",
                bullets: [
                    "顔型は角度と構図に特に敏感です。",
                    "パーソナルカラーは照明と自動補正により敏感です。",
                    "同条件で繰り返し出る結果が最も信頼しやすいです。",
                ],
            },
            {
                title: "2. モバイル利用は問題ないが、撮影習慣の方が重要です",
                body: "多くの利用者がスマホで使います。問題になりやすいのはモバイルそのものより、前面カメラ補正と近距離セルフィー習慣です。",
                bullets: [
                    "近すぎるセルフィーは顔型を歪めます。",
                    "カメラアプリが強い自動補正を入れていないか確認してください。",
                    "可能なら同じ端末、同じ場所で繰り返し比較してください。",
                ],
            },
            {
                title: "3. 提案結果は絶対的な正解ではありません",
                body: "スタイル提案は計測値の上に乗る応用層です。したがって、スタイル目標や好みに合わせて調整するのは自然なことです。",
                bullets: [
                    "同じ構造でも目標によって提案は変わります。",
                    "パーソナルカラーでも、厳密なシーズン名より似合うトーン範囲が重要なことがあります。",
                    "結果はアイデンティティより方向として使う方が健全です。",
                ],
            },
        ],
        checklistTitle: "違和感がある時に先に確認すること",
        checklistItems: [
            "写真が各ガイド基準を満たしているか",
            "フィルターと自動補正がオフか",
            "補正フレームが実際の境界に合っているか",
            "同条件で繰り返して比較したか",
            "提案文を元の計測と混同していないか",
        ],
        faqTitle: "短い回答集",
        faqs: [
            { question: "アップロード画像はサーバーに保存されますか？", answer: "プロダクト利用の観点では、画像はブラウザ側分析の入力として扱われます。長期公開コンテンツではなく、一時的な計算材料として使われます。" },
            { question: "男女で顔型結果が同じだと不自然ではありませんか？", answer: "構造ラベル自体は同じでも不自然ではありません。より分けて考えるべきなのは、その上に乗るスタイル提案側です。" },
            { question: "補正画面で手動調整した内容は本当に反映されますか？", answer: "はい。補正後に分析を続行すれば、手動フレームが最終計算入力として使われます。" },
            { question: "品質警告が出ていても分析できるのはなぜですか？", answer: "警告は“解釈に注意が必要”という意味であり、常に“分析不能”ではありません。ただし警告が残るなら強く信じすぎない方が安全です。" },
        ],
        relatedTitle: "関連文書",
        related: [
            { href: "/guides/methodology", title: "分析方法論", summary: "出力の作られ方を先に理解したいならこの文書が適しています。" },
            { href: "/guides/result-reading", title: "結果の読み方ガイド", summary: "計測値と提案文をどう分けて読むかを説明します。" },
            { href: "/guides", title: "ガイドセンター", summary: "文書群全体の入口としてはこちらが最適です。" },
        ],
    },
};

export function getGuidesIndexCopy(lang: SupportedLang) {
    return GUIDES_INDEX_COPY[lang];
}

export function getFaceShapeGuideCopy(lang: SupportedLang) {
    return GUIDE_FACE_SHAPE_PHOTO[lang];
}

export function getPersonalColorGuideCopy(lang: SupportedLang) {
    return GUIDE_PERSONAL_COLOR[lang];
}

export function getResultReadingGuideCopy(lang: SupportedLang) {
    return GUIDE_RESULT_READING[lang];
}

export function getMethodologyGuideCopy(lang: SupportedLang) {
    return GUIDE_METHODOLOGY[lang];
}

export function getFaqGuideCopy(lang: SupportedLang) {
    return GUIDE_FAQ[lang];
}
