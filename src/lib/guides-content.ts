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
        description: "FINDCORE 기능을 최적으로 활용하기 위한 정밀한 촬영 팁, 심층적인 결과 해석법, 자주 묻는 질문을 모았습니다.",
        heading: "FINDCORE 가이드 센터",
        intro: "AI 분석의 품질은 사진의 상태와 결과를 해석하는 기준에 크게 좌우됩니다. 이 가이드 센터는 당신이 가장 최적화된 환경에서 입력 이미지를 준비하고, 도출된 데이터를 바탕으로 본인만의 스타일을 완벽하게 완성할 수 있도록 돕는 전문적인 안내서입니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlightsTitle: "핵심 안내 사항",
        highlights: [
            "얼굴형 분석 정확도를 높이는 필수 촬영 기준",
            "퍼스널 컬러 진단 시 조명과 색 왜곡을 통제하는 방법",
            "정량적 측정값과 스타일 추천을 올바르게 읽어내는 순서",
            "FINDCORE의 브라우저 로컬 분석 알고리즘 원리",
            "가장 많이 접수되는 사용자 문의와 명확한 답변",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "촬영",
                title: "AI 얼굴형 촬영 가이드",
                summary: "헤어라인 노출, 올바른 턱선 프레이밍, 정면 각도 및 카메라 거리 등 분류 결과에 직접적인 영향을 미치는 핵심 조건을 디테일하게 설명합니다.",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "촬영",
                title: "퍼스널 컬러 촬영 가이드",
                summary: "조명 온도와 카메라의 자동 보정이 피부 톤의 본질을 어떻게 변화시키는지 분석하고, 가장 신뢰할 만한 촬영 환경을 구성하는 방법을 제시합니다.",
            },
            {
                href: "/guides/result-reading",
                tag: "해석",
                title: "심층 결과 해석 가이드",
                summary: "수치화된 측정값, 시스템의 품질 경고, 그리고 스타일 추천 문구를 각각 어떤 비중과 순서로 받아들여야 하는지 객관적으로 안내합니다.",
            },
            {
                href: "/guides/methodology",
                tag: "방법론",
                title: "분석 알고리즘 방법론",
                summary: "브라우저 내부에서 어떤 데이터가 추출되고, 이 신호들이 어떠한 수학적 규칙을 거쳐 최종적인 얼굴형과 컬러 지표로 변환되는지 투명하게 공개합니다.",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "자주 묻는 질문",
                summary: "데이터 보호에 대한 우려, 결과 변동성의 원인, 모바일 환경 최적화, 그리고 성별에 따른 스타일 지향점의 차이 등 고빈도 질문들을 명쾌하게 해설합니다.",
            },
        ],
    },
    en: {
        title: "Guide Center | FINDCORE",
        description: "The official FINDCORE foundation for maximizing photo precision, refining interpretation, and understanding the core mechanics behind our AI.",
        heading: "FINDCORE Guide Center",
        intro: "The sophistication of our output is deeply tied to the quality of your input. Factors such as ambient lighting, precise frame alignment, and environmental reflections heavily influence analytical accuracy. This library provides the expert context you need to master your aesthetic diagnostics.",
        updatedLabel: "Last updated: March 12, 2026",
        highlightsTitle: "Explore the Library",
        highlights: [
            "Critical protocols for frontal face-shape photography",
            "Techniques to eliminate color distortion in personal color scans",
            "The correct hierarchy for reading metrics vs. style suggestions",
            "An inside look at our in-browser computation methodology",
            "Authoritative answers to the most frequent inquiries",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "Capture",
                title: "Face Shape Photography",
                summary: "Master the optimal framing conditions—including hairline visibility, jawline contouring, and eliminating wide-angle lens distortion—to guarantee maximum classification stability.",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "Capture",
                title: "Personal Color Photography",
                summary: "Understand the profound impact of lighting temperature and software processing on your perceived skin tone, and learn how to secure the most authentic baseline photo.",
            },
            {
                href: "/guides/result-reading",
                tag: "Interpretation",
                title: "Result Interpretation Guide",
                summary: "Navigate your personalized report with expertise. Learn exactly how to weigh raw mechanical measurements against curated style recommendations.",
            },
            {
                href: "/guides/methodology",
                tag: "Methodology",
                title: "Analysis Methodology",
                summary: "Gain a transparent understanding of our localized, browser-based architecture, detailing exactly how initial visual signals are translated into definitive aesthetic coordinates.",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "Frequently Asked Questions",
                summary: "Direct, comprehensive answers covering our Zero-Data architecture, the mechanics of output variance, mobile-specific considerations, and the logic behind style-direction divergences.",
            },
        ],
    },
    zh: {
        title: "指南中心 | FINDCORE",
        description: "FINDCORE 官方指南库：掌握高精度拍摄技巧，学习深度结果解读，并深入了解我们的 AI 运行机制。",
        heading: "FINDCORE 指南中心",
        intro: "分析结果的精度，深度依赖于您所提供图像的质量。光线环境、取景框的精细校准以及反光控制，都会直接左右最终数据的可靠性。本指南库旨在为您提供专业、系统的指引，助您全面掌控个人美学探索之旅。",
        updatedLabel: "最后更新：2026年3月12日",
        highlightsTitle: "核心内容导读",
        highlights: [
            "脸型分析中不可或缺的正面拍摄规范",
            "在个人色彩扫描中彻底避免色偏的进阶技巧",
            "正确区分量化测量数据与风格推荐的优先级",
            "深入解析 FINDCORE 的本地浏览器运算逻辑",
            "针对用户高频共性问题的权威解答",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "拍摄",
                title: "AI 脸型拍摄指南",
                summary: "详细讲解发际线展示、下颌线构图以及广角畸变控制等关键拍摄条件，确保您的脸型分类获得最大程度的准确性与稳定性。",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "拍摄",
                title: "个人色彩拍摄指南",
                summary: "深度剖析光线色温与相机自动算法对肤色观感的双重影响，并教您如何构建最纯粹、最值得信赖的基准拍摄环境。",
            },
            {
                href: "/guides/result-reading",
                tag: "解读",
                title: "深度结果解读指南",
                summary: "掌握阅读个人专属报告的专业视角。明确系统测量数据与风格推荐建议之间的逻辑关系与权重分配。",
            },
            {
                href: "/guides/methodology",
                tag: "方法论",
                title: "分析算法方法论",
                summary: "以极致透明的方式，向您揭示浏览器本地运算架构的奥秘，以及视觉信号如何被严谨地转化为精确的美学坐标。",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "常见问题与解答",
                summary: "全面覆盖我们引以为傲的“零数据”安全承诺、结果波动的底层逻辑、移动端操作建议以及性别与风格倾向的差异说明。",
            },
        ],
    },
    ja: {
        title: "ガイドセンター | FINDCORE",
        description: "FINDCOREの機能を最大限に引き出すための、精確な撮影手法、深い結果解釈、そしてAIの仕組みを解説する公式ガイドライブラリです。",
        heading: "FINDCORE ガイドセンター",
        intro: "分析のクオリティは、入力となる写真の質に強く依存します。照明環境、精緻なフレーム調整、そして周囲からの色反射がデータの精度を左右します。このガイドセンターは、皆様が最適な環境で画像を準備し、ご自身のスタイルを極めるための専門的な知見を提供します。",
        updatedLabel: "最終更新日: 2026年3月12日",
        highlightsTitle: "ライブラリの主要トピック",
        highlights: [
            "顔型分類の精度を最大化する正面写真の必須条件",
            "パーソナルカラー分析における色歪みの完全な排除手法",
            "計量化されたデータとスタイル推奨文の正しい読み解き方",
            "FINDCOREのブラウザローカル計算メカニズムの深掘り",
            "ユーザーからの利便性の高い質問に対する公式回答",
        ],
        cards: [
            {
                href: "/guides/face-shape-photo",
                tag: "撮影",
                title: "AI顔型撮影ガイド",
                summary: "生え際の露出、あごのラインの適切なフレーミング、広角レンズによる歪みの抑制など、分類の安定性に直結する不可欠な条件を詳細に解説します。",
            },
            {
                href: "/guides/personal-color-photo",
                tag: "撮影",
                title: "パーソナルカラー撮影ガイド",
                summary: "照明の色温度やカメラの自動補正が肌本来の色調に与える深い影響を理解し、最も信頼性の高い撮影環境を構築する方法を提示します。",
            },
            {
                href: "/guides/result-reading",
                tag: "解釈",
                title: "深い結果解釈のためのガイド",
                summary: "ご自身のレポートを専門家の視点で読み解く方法。システムが算出する数値と、スタイリングの推奨事項との論理的なバランスの取り方を明確にします。",
            },
            {
                href: "/guides/methodology",
                tag: "方法論",
                title: "分析アルゴリズムの実態",
                summary: "ローカルブラウザ環境での動作原理を透明化し、抽出された視覚シグナルがどのようにして最終的な美学座標へと変換されるのかを明らかにします。",
            },
            {
                href: "/guides/faq",
                tag: "FAQ",
                title: "よくあるご質問",
                summary: "私たちが誇る「ゼロ・データ」アーキテクチャの安全性、結果が変動するメカニズム、モバイル環境特有の注意点について明確な回答を提供します。",
            },
        ],
    },
};

export const GUIDE_FACE_SHAPE_PHOTO: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "얼굴형 분석 촬영 가이드 | FINDCORE",
        description: "최고의 정확도를 위한 얼굴형 분석 촬영 조건. 정면 각도, 헤어라인 노출, 프레임 보정의 정밀한 기준을 안내합니다.",
        heading: "얼굴형 분석 촬영 가이드",
        intro: "AI 얼굴형 분석은 얼굴 전체의 윤곽과 미세한 비율을 감지하여 당신만의 독창적인 뷰티 지표를 도출합니다. 단 한 장의 사진이라도 최적화된 조건에서 촬영된다면, 결과의 신뢰성은 기하급수적으로 상승합니다. 이 가이드는 가장 완벽한 분석을 위한 필수 촬영 기준을 제시합니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["완벽한 정면 구도", "명확한 이마 라인 확보", "광각 왜곡 최소화", "정밀한 프레임 교정"],
        sections: [
            {
                title: "1. 이마와 헤어라인의 완전한 노출",
                body: "상단부 폭과 얼굴의 세로 비율은 헤어라인의 가시성에 의해 완벽하게 좌우됩니다. 앞머리나 짙은 그림자가 이 영역을 가릴 경우, 정교한 비율 분석에 본질적인 제약이 발생합니다.",
                bullets: [
                    "얼굴 중심뿐만 아니라 양측 관자놀이 라인까지 명확하게 드러나야 합니다.",
                    "헤어라인의 형태적 불규칙성은 분석에 영향을 미치지 않으나, 윤곽 자체가 가려지는 것은 피해야 합니다.",
                    "짙은 그림자로 인해 라인이 분절되어 보인다면, 조명을 재설정하여 재촬영하는 것을 권장합니다.",
                ],
            },
            {
                title: "2. 이상적인 카메라 거리 확보",
                body: "극단적인 초근접 셀프 렌즈는 안면 중심부를 팽창시키고 외곽 윤곽을 수축하는 시각적 왜곡을 유발합니다. 이는 실제 비율을 길거나 좁게 인식하게 마드는 주요 원인입니다.",
                bullets: [
                    "일반적인 셀프 촬영보다 약간 더 넉넉한 거리를 확보하여 프्रे임에 여유를 주십시오.",
                    "타이머나 삼각대를 활용한 촬영은 물리적 왜곡을 최소화하는 가장 안정적인 방법입니다.",
                    "렌즈를 향해 턱을 의도적으로 돌출시키는 자세는 지양해야 합니다.",
                ],
            },
            {
                title: "3. 정면 각도 유지 및 온전한 윤곽 프레이밍",
                body: "미세한 각도 틀어짐조차 광대와 턱의 양감 비율을 급격하게 변형시킵니다. 양 눈썹, 하악골 라인, 턱끝이 온전히 하나의 평면에 담기는 완벽한 정면 사진이 필수적입니다.",
                bullets: [
                    "한쪽 귀만 두드러지게 보인다면 안면이 이미 회전한 상태임을 의미합니다.",
                    "턱끝이나 측면 윤곽이 프레임 밖으로 잘릴 경우 데이터의 안정성은 즉각적으로 하락합니다.",
                    "화면의 좌우 여백 불균형은 중심축 인식에 미세한 오차를 유발할 수 있습니다.",
                ],
            },
            {
                title: "4. 오토 프레임은 초안이며, 수동 교정이 최종 알고리즘입니다.",
                body: "교정 단계에서 활성화되는 푸른색 윤곽선은 실제 연산에 투입되는 최종 기준선입니다. AI의 초기 인식이 실제 피부 경계를 이탈했다면, 그 오차는 결과에 고스란히 반영됩니다.",
                bullets: [
                    "관자놀이, 광대, 그리고 턱끝 포인트가 실제 해부학적 경계와 일치하는지 최우선으로 검증하십시오.",
                    "가이드라인이 실제 볼륨을 초과하여 확장되었다면, 포인트를 내측으로 세밀하게 조정해야 합니다.",
                    "결과의 완성도를 극대화하는 것은 자동 인식 기능이 아닌 사용자의 세밀한 최종 교정입니다.",
                ],
            },
        ],
        checklistTitle: "완벽한 분석을 위한 체크리스트",
        checklistItems: [
            "카메라 렌즈와 얼굴이 완벽한 평행을 이루는지 확인",
            "이마와 전체 윤곽선이 가감 없이 노출되었는지 점검",
            "얼굴의 어떤 부위도 프레임에서 잘리지 않았는지 확인",
            "필터, 뷰티 모드 및 극단적인 조명 효과 완전 배제",
            "최종 푸른색 교정선이 해부학적 경계에 완벽히 밀착되었는지 점검",
        ],
        faqTitle: "얼굴형 분석 FAQ",
        faqs: [
            {
                question: "앞머리를 조금 내리고 촬영해도 무방한가요?",
                answer: "가능하지만 권장하지 않습니다. 관자놀이와 상단 윤곽이 부분적으로라도 가려지면 비율 데이터의 안정성이 현저히 떨어집니다. 이마를 완전히 넘긴 상태가 가장 이상적입니다.",
            },
            {
                question: "안경을 착용한 상태로 분석이 가능한가요?",
                answer: "분석 자체는 진행되나 템플 두께나 렌즈 반사광이 중요 랜드마크를 방해할 위험이 큽니다. 가장 순수한 골격 데이터를 얻으려면 안경을 제거하는 것이 바람직합니다.",
            },
            {
                question: "전면 카메라보다 후면 카메라가 우월한가요?",
                answer: "그렇습니다. 후면 카메라는 렌즈 왜곡이 적어 훨씬 더 객관적인 비율 캡처가 가능합니다. 전면 카메라를 사용해야만 한다면 렌즈 거리를 최대한 확보하십시오.",
            },
        ],
        relatedTitle: "추천 연관 문서",
        related: [
            { href: "/guides/result-reading", title: "결과 해석의 정석", summary: "정밀 데이터와 스타일링 큐레이션을 분리하여 읽어내는 전문적인 방법론." },
            { href: "/guides/methodology", title: "AI 분석 알고리즘", summary: "브라우저 기반의 정교한 연산 과정으로 얼굴형이 판독되는 원리." },
            { href: "/face-shape", title: "AI 얼굴형 진단 시작", summary: "최적화된 이미지가 준비되었다면, 지금 바로 자신만의 윤곽 데이터를 발견하세요." },
        ],
    },
    en: {
        title: "Face Shape Photography Guide | FINDCORE",
        description: "Master the optimal framing, angles, and facial exposure required for flawless, highly accurate face shape analysis.",
        heading: "Face Shape Photo Guide",
        intro: "Our AI architecture interprets your face as a cohesive ecosystem of proportions. To extract true aesthetic metrics, the foundational input must be flawless. Even minor occlusions or lens distortions can skew the computational balance. This guide outlines the paramount protocols for securing a perfect reference image.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Absolute Frontal Angle", "Full Hairline Exposure", "Zero Lens Distortion", "Precise Contour Adjustment"],
        sections: [
            {
                title: "1. Unveil the Forehead and Hairline",
                body: "The calculation of your upper cranial width and longitudinal balance is strictly dependent on hairline visibility. Fringes, stray shadows, or hats introduce analytical ambiguity that directly degenerates metric precision.",
                bullets: [
                    "Ensure not just the center, but the bilateral temporal crests (temples) are fully exposed.",
                    "An asymmetrical hairline is not an issue; an obscured boundary is.",
                    "If harsh lighting casts deep volumetric shadows over the boundary, retaking the photo is highly advised.",
                ],
            },
            {
                title: "2. Mitigate Proximity Distortion",
                body: "Ultra-close captures trigger wide-angle lens distortion—hypertrophying central features while compressing peripheral contours. This optical illusion artificially elongates or narrows the perceived cranial structure.",
                bullets: [
                    "Maintain an extended distance, surpassing the typical arm's length of a casual selfie.",
                    "Employing a stable stand or utilizing a self-timer exponentially elevates measurement fidelity.",
                    "Refrain from dramatically jutting your chin toward the lens.",
                ],
            },
            {
                title: "3. Enforce Frontal Symmetry and Comprehensive Framing",
                body: "A rotational shift of mere degrees drastically alters the perceived ratio between cheekbone expansiveness and jawline curvature. The brow ridge, full jaw contour, and chin apex must register harmoniously on a single, un-tilted axis.",
                bullets: [
                    "If one ear dominates the composition, your cranial axis is already compromised.",
                    "A cropped chin or severed lateral contour immediately sabotages calculation stability.",
                    "Significant asymmetrical negative space around the head can subtly destabilize the central vertical axis.",
                ],
            },
            {
                title: "4. The Auto-Mesh is a Proposal; Your Correction is the Master Input",
                body: "The luminescent blue wireframe rendered during the adjustment phase constitutes the definitive computational boundary. Should the AI's initial mapping deviate from your actual epidermal border, the resulting metrics will faithfully replicate that error.",
                bullets: [
                    "Prioritize the calibration of the temporal, zygomatic (cheekbone), and mental (chin tip) nodal points.",
                    "If the generated mesh balloons beyond your organic contour, retract the nodes inward.",
                    "Ultimate exactitude relies on your discerning manual refinement, not merely the automated draft.",
                ],
            },
        ],
        checklistTitle: "Pre-Analysis Verification Checklist",
        checklistItems: [
            "Confirm an absolute, un-tilted frontal posture.",
            "Verify unobstructed visibility of the entire upper hairline.",
            "Ensure the chin apex and bilateral contours are perfectly contained within the frame.",
            "Deactivate all software enhancements, beauty modes, and artificial lighting filters.",
            "Corroborate that the blue wireframe flawlessly adheres to the authentic skin perimeter.",
        ],
        faqTitle: "Face Shape Photography FAQ",
        faqs: [
            { question: "Is a sparse or wispy fringe acceptable?", answer: "Technically viable, but not optimal. Any occlusion of the temple and superior bounds diminishes the stability of the upper-width read. Sweeping the hair entirely back is the professional standard." },
            { question: "Can I undergo analysis while wearing eyewear?", answer: "While the algorithm will process the image, prominent frames or lens reflections frequently occlude the brow line and lateral boundaries. For uncorrupted structural analytics, we strongly advocate for a glasses-free capture." },
            { question: "Does utilizing the primary rear-facing camera yield superior results?", answer: "Unequivocally. Rear sensor arrays inherently exhibit less wide-angle distortion, translating to truer proportions. If restricted to a front-facing selfie camera, prioritize maximum focal distance." },
        ],
        relatedTitle: "Essential Related Reading",
        related: [
            { href: "/guides/result-reading", title: "The Art of Result Interpretation", summary: "Master the crucial distinction between raw biometric measurements and curated styling directives." },
            { href: "/guides/methodology", title: "AI Computational Methodology", summary: "A deep dive into the browser-localized logic that powers our facial architecture analysis." },
            { href: "/face-shape", title: "Initiate Aesthetic Analysis", summary: "Once your image embodies these pristine parameters, proceed directly to the analysis engine." },
        ],
    },
    zh: {
        title: "脸型分析拍摄指南 | FINDCORE",
        description: "掌握确保高阶精度的脸型分析拍摄准则：绝对正面、完整发际线及精准辅助线校正。",
        heading: "脸型分析拍摄指南",
        intro: "我们的 AI 架构将您的面部视为一个精密的比例生态系统。要提取最真实的个人美学数据，输入源必须完美无瑕。微小的遮挡或镜头畸变都会打破计算平衡。本指南为您揭示获取极致准确分析的必备拍摄规范。",
        updatedLabel: "最后更新：2026年3月12日",
        highlights: ["绝对正面视角", "发际线全貌展露", "杜绝广角畸变", "精准轮廓校正"],
        sections: [
            {
                title: "1. 彻底展露额头与发际线",
                body: "上庭宽度与面部整体纵向比例的计算，极度依赖于发际线的清晰度。刘海、投影或帽檐会引入计算歧义，直接导致数据精度受损。",
                bullets: [
                    "务必确保不仅额头中央，两侧颞部（太阳穴）区域也完全可见。",
                    "发际线的不对称不会影响分析，但边界被物理遮挡则是致命的。",
                    "如果强光造成深邃的阴影割裂了发际线边界，强烈建议重新调整光线拍摄。",
                ],
            },
            {
                title: "2. 消除近距离镜头畸变",
                body: "过于贴近镜头的自拍会引发广角畸变——中心五官被放大，而四周轮廓被极度压缩。这种光学错觉会使系统误判面部更为修长或狭窄。",
                bullets: [
                    "请保持比日常自拍更远的拍摄距离，为镜头留出充分的空间。",
                    "使用手机支架或定时拍摄，能有效规避手持带来的物理形变。",
                    "绝对避免将下颌刻意向前探出的不自然姿态。",
                ],
            },
            {
                title: "3. 维持绝对正面与完整的轮廓取景",
                body: "哪怕只有几度的角度偏转，也会彻底破坏颧骨与下颌的体积比例。您的眉骨线条、下颌轮廓以及下巴尖，必须处于一个毫无倾斜的统一平面内。",
                bullets: [
                    "若画面中一侧耳朵显得尤为突出，说明面部轴心已经发生偏移。",
                    "下巴尖或任意一侧边缘被裁切，计算的稳定性将瞬间崩塌。",
                    "画面左右两层明显的留白不均，也可能微妙地干扰垂直中轴线的判定。",
                ],
            },
            {
                title: "4. 自动识别仅为草图，您的校正是最终决策",
                body: "在校正环节出现的蓝色动态网格，是算法最终读取的绝对边界。如果 AI 的初次映射偏离了您的真实皮肤边缘，分析结果将如实反映这个错误。",
                bullets: [
                    "请优先且细致地校准太阳穴、颧骨及下巴尖的核心节点。",
                    "若网格如气球般超出了肌肤轮廓，请务必将节点向内收拢至贴合状态。",
                    "极高的数据契合度源自您精准的手动微调，绝非依赖机器的初始猜测。",
                ],
            },
        ],
        checklistTitle: "分析前的高阶核对清单",
        checklistItems: [
            "确认头部姿态为绝对平视且无任何偏转。",
            "检视上部发际线是否毫无保留地展现在镜头前。",
            "确保下颌底端与左右面颊均完美包含于画面内。",
            "彻底关闭任何附带美颜、瘦脸及滤镜特效的软件功能。",
            "确认蓝色校准线严密且精准地勾勒出真实的肌肤边缘。",
        ],
        faqTitle: "脸型拍摄权威解答",
        faqs: [
            { question: "保留轻薄的碎刘海可以进行分析吗？", answer: "技术上可行，但在专业层面不予推荐。任何对上庭边界的遮蔽都会削弱顶部宽度测量的严谨性。将头发完全束起是获得纯粹数据的唯一标准。" },
            { question: "佩戴框架眼镜会影响脸型判断吗？", answer: "算法能够执行，但镜框的实体线条与镜片反光极易干扰对眉骨及外侧轮廓的精准定位。为了解构最纯粹的骨相，我们强烈建议摘除眼镜。" },
            { question: "使用手机后置摄像头是否优于前置？", answer: "毫无疑问。后置镜头模组天生具备更低的光学畸变率，能还原更真实的三维比例。若由于条件限制仅能使用前置镜头，请务必将距离拉至最远。" },
        ],
        relatedTitle: "核心延伸阅读",
        related: [
            { href: "/guides/result-reading", title: "结果解读的艺术", summary: "掌握如何将冰冷的生物识别数据与高级定制的美学建议区分开来。" },
            { href: "/guides/methodology", title: "AI 运算方法论", summary: "深度探究在您的浏览器本地，面部结构是如何被转化为美学坐标的。" },
            { href: "/face-shape", title: "开启美学分析", summary: "当您的影像完全符合这些严苛标准时，即可步入专属的分析流程。" },
        ],
    },
    ja: {
        title: "顔型分析 撮影ガイド | FINDCORE",
        description: "最高精度の顔型分析を実現するための撮影条件。完璧な正面角度、ヘアラインの露出、フレーム補正の緻密な基準をご案内します。",
        heading: "顔型分析 撮影ガイド",
        intro: "当AIアーキテクチャは、あなたの顔を一つの緻密な比率の生態系として読み解きます。真に価値ある美学データを抽出するためには、入力される画像が完璧でなければなりません。わずかな遮蔽やレンズの歪みが、計算の調和を大きく崩す要因となります。このガイドは、最も純粋な分析結果を得るための絶対的な撮影基準を提示します。",
        updatedLabel: "最終更新日: 2026年3月12日",
        highlights: ["完全な正面アングル", "ヘアラインの完全露出", "レンズ歪みの排除", "緻密なフレーム手動補正"],
        sections: [
            {
                title: "1. 額とヘアラインの完全な開放",
                body: "上部幅および顔の縦比率の算出は、ヘアラインの視認性に絶対的に依存します。前髪や深い影がこの境界を覆うと、分析アルゴリズムに大きな曖昧さが生じます。",
                bullets: [
                    "額の中央のみならず、両サイドのこめかみラインまで明確に露出させてください。",
                    "ヘアラインの不規則な形状は問題ではありませんが、境界そのものが隠れることは避けるべきです。",
                    "強い光源による深い影で境界が分断される場合は、照明条件を見直して再撮影することを推奨します。",
                ],
            },
            {
                title: "2. 近距離撮影によるレンズ歪みの抑制",
                body: "極端に接近したセルフィーは、広角レンズ特有の歪みを誘発します。顔の中心部が肥大化し輪郭が収縮することで、顔立ちが不自然に長く、または狭く認識されてしまいます。",
                bullets: [
                    "一般的な手持ちセルフィーよりも、意図的に距離を長区保って撮影してください。",
                    "スマートフォン用のスタンドやタイマー機能を活用することが、物理的歪みを排除する最も確実な方法です。",
                    "レンズに向かってあごを突き出すような姿勢は、絶対におやめください。",
                ],
            },
            {
                title: "3. 絶対的な正面性と完全なフレームイン",
                body: "数度のアングルずれでさえ、頬骨とあごの比率データを決定的に狂わせます。眉のライン、あごの輪郭、そしてあご先が、完全に歪みのない一つの平面に収められている必要があります。",
                bullets: [
                    "片側の耳だけが過度に目視できる場合、それは顔が既に回転している明確なサインです。",
                    "あご先や側面の輪郭がわずかでもフレームアウトすると、計算の安定性は即座に失われます。",
                    "画像の左右の余白が極端にアンバランスな場合、中心軸の判定に微細なノイズを混入させる恐れがあります。",
                ],
            },
            {
                title: "4. AIは下書きに過ぎない。最終決定はあなたの補正です",
                body: "補正画面に展開される青色のワイヤーフレームこそが、最終的な演算を支配する入力データです。AIの初期マッピングが実際の肌の境界を逸脱している場合、そのエラーは結果へそのまま反映されます。",
                bullets: [
                    "こめかみ、頬骨、そしてあご先のノード（点）が、解剖学的な輪郭と一致しているかを最優先で確認してください。",
                    "ワイヤーフレームが実際の顔のボリュームを超えて膨らんでいる場合は、直ちに内側へ修正する必要があります。",
                    "最高精度の分析結果は、AIの推測ではなく、あなたの緻密な手動補正によってのみ完成します。",
                ],
            },
        ],
        checklistTitle: "高品質な分析のためのチェックリスト",
        checklistItems: [
            "頭部がレンズに対して完全に平行かつ正面を向いているか",
            "上部のヘアライン全体が一切の遮蔽なく露出しているか",
            "あごの最下部および左右の頬の輪郭が完全にフレーム内に収まっているか",
            "フィルター機能や過度な美肌補正がバックグラウンドで稼働していないか",
            "青色の補正フレームが、実際の肌の境界線と完璧に同期しているか",
        ],
        faqTitle: "顔型撮影に関するご質問",
        faqs: [
            { question: "薄い前髪を下ろしたままでの分析は可能ですか？", answer: "システム上は処理されますが、推奨はいたしません。こめかみや上部境界へのいかなる遮蔽も、上部幅計測の厳密性を低下させます。髪を完全に後ろにまとめるのがプロトコルです。" },
            { question: "メガネを着用したままでは不都合がありますか？", answer: "はい。太いフレームやレンズの反射光は、眉のラインや外郭の正確な読み取りを著しく阻害します。純粋な骨格データを取得するため、アイウェアは取り外すことを強くお勧めします。" },
            { question: "フロントカメラよりも背面カメラの方が適していますか？", answer: "間違いありません。背面カメラは根本的に広角歪みが少なく、より真実に近い立体比率を捉えます。フロントカメラを使用せざるを得ない場合は、可能な限り最大限の距離を確保してください。" },
        ],
        relatedTitle: "関連文書",
        related: [
            { href: "/guides/result-reading", title: "結果解釈のアート", summary: "冷徹な計測データと、洗練されたスタイル提案を完璧に切り分けて理解する技術。" },
            { href: "/guides/methodology", title: "AI分析メソドロジー", summary: "ブラウザ上で顔の構造データがどのようにして抽出されるのか、そのロジックを深掘りします。" },
            { href: "/face-shape", title: "美学分析を起動する", summary: "すべての撮影基準を満たした画像が用意できたら、専用ツールを起動してください。" },
        ],
    },
};

export const GUIDE_PERSONAL_COLOR: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "퍼스널 컬러 촬영 가이드 | FINDCORE",
        description: "정확한 퍼스널 컬러 진단을 위한 촬영 조건. 조명 온도, 카메라 자동 보정, 주변 사물의 색 간섭을 제어하는 기준을 안내합니다.",
        heading: "퍼스널 컬러 촬영 가이드",
        intro: "퍼스널 컬러 분석은 얼굴형보다 주변 환경에 훨씬 더 민감하게 반응합니다. 조명의 색온도, 카메라의 소프트웨어 보정, 그리고 주변 사물의 반사광은 피부색을 근본적으로 다르게 읽히게 만듭니다. 이 가이드는 가장 객관적이고 신뢰할 수 있는 컬러 데이터를 얻기 위한 필수 기준을 제시합니다.",
        updatedLabel: `${PUBLISHER_PROFILE.editorialOwnerLabelKo} · 2026년 3월 12일 업데이트`,
        highlights: ["자연광 환경 우선", "뷰티 필터 해제", "색 사물 간섭 차단", "동일 조건 반복 검증"],
        sections: [
            {
                title: "1. 안정적인 조명 색온도가 가장 중요합니다",
                body: "알고리즘은 피부에서 반사되는 따뜻함, 차가움, 밝기, 탁함의 미세한 파장을 읽습니다. 광원의 색온도가 흔들리면 분석 결과인 계절 진단도 그에 비례해 바뀔 수밖에 없습니다.",
                bullets: [
                    "창을 통해 들어오는 부드러운 직사광선이 없는 자연광이 가장 표준적인 기준입니다.",
                    "노란 전구색 조명이나 푸른 형광등 조명은 피부 본연의 색조를 인위적으로 왜곡합니다.",
                    "같은 사람이라도 아침 조명과 저녁 조명 아래서 찍은 사진은 결과가 다르게 나오는 것이 광학적으로 정상입니다.",
                ],
            },
            {
                title: "2. 카메라의 자동 보정 기능 해제의 필수성",
                body: "스마트폰 카메라는 자체적으로 HDR, 피부 보정, 색 균형 연산을 수행합니다. 이는 보기 좋은 사진을 만들지만, 분석 엔진이 필요로 하는 순수한 색상 데이터는 파괴합니다.",
                bullets: [
                    "모든 '뷰티 모드', '매끄럽게', '톤업' 필터를 엄격하게 꺼주십시오.",
                    "소셜 앱의 카메라보다 기본 카메라 앱으로 촬영한 무압축 원본이 훨씬 더 우수합니다.",
                    "기본 카메라의 보정이 너무 강하다면, 중립적인 서드파티 카메라 앱을 사용하는 것도 방법입니다.",
                ],
            },
            {
                title: "3. 주변 사물에 의한 색 왜곡(Color Cast) 격리",
                body: "색이 강한 배경이나 옷은 반사판처럼 작동하여 당신의 얼굴에 원치 않는 색감을 투사합니다. 이를 광학 용어로 '컬러 캐스트'라고 하며, 분석 결과에 치명적인 영향을 줍니다.",
                bullets: [
                    "흰색, 회색, 연한 베이지색 같은 무채색 배경에서 촬영하는 것을 권장합니다.",
                    "형광색, 짙은 빨강, 진한 파랑 등의 옷은 피부의 맑기를 판단하는 데 방해가 됩니다.",
                    "색유리, 원색의 그림, 혹은 커다란 색상이 있는 물체 근처는 피해야 합니다.",
                ],
            },
            {
                title: "4. 진정한 정체성은 반복된 재현성 안에서 발견됩니다",
                body: "단 한 번의 보기에 좋은 사진으로 결과를 확정 짓기보다는, 통제된 동일 환경에서 2~3회 반복 테스트를 통해 도출되는 공통된 방향성을 신뢰하십시오.",
                bullets: [
                    "전혀 다른 조명 조건에서 나온 결과들을 단순 비교하는 것은 분석의 의미가 없습니다.",
                    "계절의 경계에 있는 분들은 시즌의 명칭 자체보다 반복적으로 나타나는 '명도와 채도의 성질'에 주목하십시오.",
                    "스타일링 실전에서는 단순히 '여름'이라는 이름보다 '고명도 저채도가 어울린다'는 지표가 더 강력한 가이드가 됩니다.",
                ],
            },
        ],
        checklistTitle: "정밀 분석을 위한 최종 체크리스트",
        checklistItems: [
            "가장 표준적인 자연광 혹은 중립적인 실내 조명 확보 여부",
            "소프트웨어 기반의 뷰티 필터 및 HDR 기능 해제 확인",
            "무채색 의상과 배경을 통한 주변 색 간섭 차단",
            "얼굴에 강한 그림자나 눈부신 하이라이트가 없는지 확인",
            "동일 환경에서 여러 번 테스트했을 때 결과가 수렴하는지 검증",
        ],
        faqTitle: "컬러 분석 FAQ",
        faqs: [
            { question: "화장을 한 상태로 분석하면 결과가 부정확해지나요?", answer: "시스템은 동작하지만, 당신의 피부가 아닌 화장품의 색을 분석하게 됩니다. 파운데이션은 본연의 명도를 가리고, 립스틱의 채도는 시스템 판단을 왜곡할 수 있습니다. 가장 정확한 생체 데이터를 얻으려면 완전무결한 민낯 상태가 필수입니다." },
            { question: "배경이 반드시 스튜디오처럼 완벽한 흰색이어야 하나요?", answer: "그렇지 않습니다. 핵심은 '색의 중립성'입니다. 배경의 색이 얼굴에 반사되어 보일 정도로 강렬하지만 않다면 무채색 계열의 벽이나 공간이면 충분합니다." },
            { question: "어제는 여름형이었는데 오늘은 왜 겨울형으로 나오나요?", answer: "이는 입력 데이터의 변동에 따른 정상적인 반응입니다. 미세하게 바뀐 화이트 밸런스나 조도 차이가 원인이 될 수 있습니다. 단일 라벨에 집착하기보다, 안정적인 조건에서 반복적으로 도출되는 공통된 데이터를 우선하십시오." },
        ],
        relatedTitle: "추천 연관 가이드",
        related: [
            { href: "/guides/result-reading", title: "결과 해석의 정석", summary: "알고리즘의 원시 데이터와 스타일 제안을 구분하여 읽어내는 전문적인 방법론." },
            { href: "/guides/methodology", title: "AI 분석 알고리즘", summary: "브라우저 안에서 당신의 색상 코드가 어떻게 변환되는지 깊이 있게 설명합니다." },
            { href: "/color", title: "퍼스널 컬러 진단 시작", summary: "모든 촬영 조건이 준비되었다면, 지금 바로 당신의 퍼스널 컬러를 발견하세요." },
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
                body: "The system registers the delicate interplay of warmth, coolness, depth, and clarity resonating from your epidermis. If the color temperature of your light source fluctuates, the algorithm's seasonal output will shift in direct correlation.",
                bullets: [
                    "Soft, diffused natural daylight penetrating a window is the unparalleled gold standard.",
                    "Incandescent (yellow) tungsten or harsh fluorescent (blue) lighting artificially corrupts the organic undertone.",
                    "It is entirely expected that captures of the same individual at dawn versus dusk yield divergent categorizations.",
                ],
            },
            {
                title: "2. The Imperative of Disabling Algorithmic Editing",
                body: "Smartphones intrinsically apply HDR, smoothing, and color-balancing computations. While these produce aesthetic images, they fundamentally obliterate the raw chromatic data the analysis engine requires.",
                bullets: [
                    "Rigorously disable any 'beauty', 'smoothing', or automated 'tone-up' filters.",
                    "Uncompressed, raw captures from your native camera app are infinitely superior to images exported from social platforms.",
                    "If your native camera aggressively processes images, utilize a neutral, pro-grade third-party application.",
                ],
            },
            {
                title: "3. Quarantine from Environmental Color Contamination",
                body: "Vibrant backgrounds and highly saturated garments act as chromatic reflectors, projecting profound, unwanted hues onto your facial planes. This distortion is known in optics as a 'color cast'.",
                bullets: [
                    "A visually sterile, neutral background—pure white, stark gray, or muted beige—is strongly advised.",
                    "Apparel in neon, deep crimson, or hyper-blue will severely contaminate the perception of your skin's clarity.",
                    "Strictly avoid capturing near stained glass, vivid artwork, or massive reflective surfaces.",
                ],
            },
            {
                title: "4. True Identity is Found in Analyzed Replication",
                body: "Rather than seeking validation from a single aesthetically pleasing upload, establishing a baseline through repeated testing under strictly controlled parameters reveals your true chromatic trajectory.",
                bullets: [
                    "Comparing results derived from diametrically opposed lighting environments invalidates the process.",
                    "For borderline seasonal profiles, the consistency of the suggested underlying tone is far more valuable than the nomenclature of the season itself.",
                    "In practical styling, understanding “high value, low chroma” provides superior direction than merely chasing a “Summer” label.",
                ],
            },
        ],
        checklistTitle: "Pre-Flight Verification Architecture",
        checklistItems: [
            "Source unparalleled natural daylight or strictly neutral, balanced architectural lighting",
            "Confirm total deactivation of all software-driven beauty modifiers and HDR processing",
            "Establish a chromatically sterile environment via neutral wardrobe and backgrounds",
            "Verify the absence of extreme, high-contrast shadows intersecting the facial plains",
            "Corroborate results via multipole iterations under identical environmental constraints",
        ],
        faqTitle: "Color Analytics FAQ",
        faqs: [
            { question: "Is the analysis compromised if I am wearing makeup?", answer: "While the engine will process the file, foundation alters your overtone, and cosmetic pigmentation skews systemic reading. For unadulterated biometric precision, a completely bare face is mandatory." },
            { question: "Must my background be a pure studio white devoid of any texture?", answer: "Not strictly. The objective isn’t pure white, but absolute neutrality. The environment simply must lack any chromatic vibrancy capable of reflecting onto the subject." },
            { question: "Why am I classified as a Summer today, but a Winter yesterday?", answer: "This is a standard manifestation of shifting environmental inputs—fluctuating white balance, disparate lighting conditions, or algorithmic camera updates. Prioritize the consistency found under controlled, repeatable paradigms." },
        ],
        relatedTitle: "Advanced Analytical Reading",
        related: [
            { href: "/guides/result-reading", title: "The Art of Result Parsing", summary: "Learn to systematically dissect the algorithm’s raw measurements from its curated styling edicts." },
            { href: "/guides/methodology", title: "Algorithmic Operations", summary: "A deep dive into the browser-localized neural logic governing personal color extraction." },
            { href: "/color", title: "Initiate Chromatic Analysis", summary: "Once your parameters are pristine, engage the core analysis engine." },
        ],
    },
    zh: {
        title: "个人色彩高阶拍摄指南 | FINDCORE",
        description: "掌控能够决定个人色彩分析精度的核心因子：光源色温、相机算法屏蔽及环境色彩隔离。",
        heading: "个人色彩拍摄指南",
        intro: "个人色彩的算法推演，比面部轮廓分析对外界环境更为苛刻。光线的冷暖、相机底层的自动修图、周遭物体的色彩折射——任何微小的扰动都会重构系统对您肤色的认知。这份指南，旨在帮助您剥离一切视觉噪音，提取最纯粹真实的色彩数据。",
        updatedLabel: "最后修订：2026年3月12日",
        highlights: ["自然光的绝对统治", "剥离一切算力修饰", "物理隔绝色彩污染", "受控环境下的交叉验证"],
        sections: [
            {
                title: "1. 光源色温决定分析命脉",
                body: "算法在捕捉肌肤散发的冷暖、明暗与浑浊度的微观特征。一旦光源的色温发生偏移，系统所判定的核心季型也必将随之漂移。",
                bullets: [
                    "无直射阳光的明亮窗边自然光，是无懈可击的完美光源。",
                    "暖黄的白炽灯或惨白的荧光灯，会对抗并覆写您肤色中真实的底色。",
                    "同一对象在清晨与黄昏所得出的分歧结果，完全符合光学逻辑。",
                ],
            },
            {
                title: "2. 拒绝任何形式的数字美化",
                body: "现代智能手机强制介入的 HDR 曝光、皮肤平滑及色彩讨喜算法，是破坏数据客观性的致命毒药。一张符合大众审美的精修图，对分析系统而言往往是充满噪音的废片。",
                bullets: [
                    "请以最严苛的标准，关闭所有的美颜、磨皮及色调滤镜。",
                    "原生相机直出的无压缩图像，其数据价值远超经由社交软件处理过的图片。",
                    "若您的手机自带过度强烈的默认修图，请使用更为中性的专业第三方相机应用。",
                ],
            },
            {
                title: "3. 建立色彩折射的物理隔离区",
                body: "高饱和度的背景或衣物，如同巨大的反光板，会将其色彩强行投射在您的面部。在专业领域，这被称为毁灭性的“色彩侵染”。",
                bullets: [
                    "纯白、高级灰或极简的米色，是保证视觉环境绝对中立的安全港。",
                    "荧光色、深酒红或高饱和的宝蓝色衣物，将严重干扰系统对面部净度的评判。",
                    "拍摄时，请彻底远离彩色玻璃、巨型画作及任何高反光介质。",
                ],
            },
            {
                title: "4. 在受控变量下的持续一致性",
                body: "切勿迷信单次测量的偶然偏差。在近乎苛刻的相同受控条件下，进行2-3次独立分析所呈现出的统一指向，才是您真正的色彩归属。",
                bullets: [
                    "将不同极端光线条件下的结果进行横向对比，毫无科学意义。",
                    "对于处于季型边缘的区间人群（Borderline），重复出现的核心色彩属性远比一个单纯的季型头衔重要。",
                    "在高级定制与日常穿搭中，理解“适合高明度低饱和”的指导意义，远胜于死记“夏日型人”四个字。",
                ],
            },
        ],
        checklistTitle: "数据提取前的严苛自检清单",
        checklistItems: [
            "确立并锁定最高质量的漫反射自然光源",
            "彻底排查并关闭终端设备的一切美化及调色算法",
            "构建无色彩干扰的纯净拍摄环境（中性衣物与背景）",
            "检查面部是否受力均匀，排除高耸的阴影与刺眼的高光",
            "在参数恒定的条件下，复测验证数据的收敛性",
        ],
        faqTitle: "色彩分析深度解答",
        faqs: [
            { question: "带妆状态下进行分析，结果具有参考性吗？", answer: "系统能够读取，但在专业视角下这是在分析您的化妆品而非您本人。底妆的色号掩盖了真实的皮下色阶，唇膏的饱和度干扰了色彩中枢的判断。若渴求极致的生物学精准度，绝对素颜是不可逾越的底线。" },
            { question: "是否必须在影棚级别的纯白背景下拍摄？", answer: "并非绝对。纯白只是一种手段，核心诉求是“色彩中立”。只要背景不具备足以反光至面部的色彩能量（如素面灰墙），即刻视为合格环境。" },
            { question: "为什么诊断结果会在夏季型与冬季型之间跳跃？", answer: "这是输入变量波动的直接映射。白平衡的细微偏移或光源照度的改变，都是诱因。我们强烈建议您抛弃对单一标签的执念，转而关注在稳定光源下持续呈现的共性数据。" },
        ],
        relatedTitle: "进阶阅读推荐",
        related: [
            { href: "/guides/result-reading", title: "解读报告的艺术层级", summary: "学习如何像专家一样，将冷酷的测算数据与感性的造型指导分离解析。" },
            { href: "/guides/methodology", title: "算法运算白皮书", summary: "揭开黑盒，深度洞悉浏览器引擎是如何解析您的色素密码的。" },
            { href: "/color", title: "唤醒个人色彩矩阵", summary: "若环境参数已调校至巅峰状态，现在，请即刻启动分析。" },
        ],
    },
    ja: {
        title: "パーソナルカラー分析の撮影プロトコル | FINDCORE",
        description: "最も緻密なパーソナルカラー診断を実現するための、照明・環境・レンズ設定のマスタークラス。",
        heading: "パーソナルカラー撮影ガイド",
        intro: "当パーソナルカラーアルゴリズムは、顔型分析よりも遥かに環境の変化に対して繊細です。光の色温度、カメラの自動補正、そして背景の反射光。これら全ての要素が、あなたの肌の色彩情報を再定義してしまいます。最も無垢で正確なカラーデータを抽出するための、完璧な撮影プロトコルをご案内します。",
        updatedLabel: "最終更新日: 2026年3月12日",
        highlights: ["自然光の絶対的優位性", "一切の補正アルゴリズムを排除", "色彩的ノイズの完全な遮断", "同一条件下でのクロスバリデーション"],
        sections: [
            {
                title: "1. 光の色温度が結果を支配する",
                body: "システムは、あなたの肌が放つ「暖かさ」「冷たさ」「濁り」の極めて微細な波長を読み取ります。光源の温度が少しでもブレれば、システムが認識するあなたのシーズンも即座に移動します。",
                bullets: [
                    "最も理想的なのは、曇りのない日の窓際から差し込む、柔らかい自然光です。",
                    "黄色がかった白熱灯や、青白い蛍光灯は、肌本来のアンダートーンを深刻に汚染します。",
                    "同じ人物であっても、朝と夜で撮影した際の結果が異なるのは、光学的に完全な正常です。",
                ],
            },
            {
                title: "2. 自動補正との妥協は許されない",
                body: "スマートフォンのカメラに標準搭載されたソフトウェア補正（HDR、美肌効果、トーンアップ）は、データの純粋性を破壊する最大の脅威です。視覚的に美しい写真が、機械分析に最適な写真であるとは限りません。",
                bullets: [
                    "カメラアプリの「ビューティー」「肌補正」「色調フィルター」機能は、強制的に無効化してください。",
                    "SNSを経由して圧縮・加工された画像よりも、標準カメラで撮影されたRawデータに近い画像が圧倒的に優れています。",
                    "標準カメラの自動補正が強すぎる場合、プロモードやより中立的なサードパーティ製アプリの使用を推奨します。",
                ],
            },
            {
                title: "3. 環境からのカラーキャスト（色被り）を遮断せよ",
                body: "高彩度の背景や衣服は、巨大なレフ板のように機能し、あなたの肌の上に望まない色調を強制的に反射させます。これは専門分野で「カラーキャスト」と呼ばれる致命的な現象です。",
                bullets: [
                    "純白、ニュートラルグレー、静かなベージュなど、視覚的干渉が一切ない無彩色の背景を強く推奨します。",
                    "ネオンカラーや深いワインレッド、極端に鮮やかな青色の衣服は、顔の透明感の判定を著しく狂わせます。",
                    "強い色彩を放つオブジェや、色付きガラスの近くでの撮影は絶対に避けてください。",
                ],
            },
            {
                title: "4. 真のアイデンティティは「反復の再現性」に宿る",
                body: "一度きりの偶然の見栄えの良い結果を盲信するのではなく、厳格に統制された同一環境で2〜3回テストを繰り返し、継続して示される「方向性」こそを信頼してください。",
                bullets: [
                    "全く異なる極端な照明条件での結果を単純比較することには、いかなる分析的価値もありません。",
                    "境界線上にあるシーズン（Borderline Season）の場合、絶対的な名称よりも、反復して提案される「明度・彩度の傾向」に注視してください。",
                    "実際のスタイリングにおいては、「サマー」という肩書きよりも、「高明度・低彩度が最適」というデータに基づく方向性の方が遥かに有用です。",
                ],
            },
        ],
        checklistTitle: "完璧な分析のための最終チェックリスト",
        checklistItems: [
            "最も純粋な自然光、または完全に中立的な照明環境の確保",
            "デバイスのあらゆる美肌アルゴリズムおよび色調フィルターの完全排除",
            "色被りを引き起こさない無彩色の背景・衣服のセッティング完了",
            "顔に極端な陰影が落ちていない、均一な照射状態の確認",
            "同一の環境下で複数回テストを行った際の、結果の収束性の検証",
        ],
        faqTitle: "パーソナルカラー分析 プロフェッショナルFAQ",
        faqs: [
            { question: "メイクをした状態での分析は精度に影響しますか？", answer: "システムは処理を実行しますが、分析の視点からは「あなた」ではなく「コスメ」を分析しているに過ぎません。ファンデーションは顔の明度を覆い隠し、リップは彩度の判定を瞬時に狂わせます。究極の生体学的な精度を求めるのであれば、完全なノーメイク状態が絶対条件です。" },
            { question: "必ずスタジオのような真っ白な背景である必要がありますか？", answer: "必須ではありません。「純白」であることよりも、周囲のオブジェクトの色が肌に反射しない「視覚的に完全に中立な環境」であることが分析の中核です。" },
            { question: "昨日はサマー、今日はウィンターと判定されるのはなぜですか？", answer: "光の波長、レンズのホワイトバランス、微小な照度変化に対する正常な反応です。あなたの肌が変わったのではなく、入力された環境変数が変わったのです。単一のラベルへの執着を捨て、共通して現れるトーンの基盤を見極めてください。" },
        ],
        relatedTitle: "洗練された応用知識",
        related: [
            { href: "/guides/result-reading", title: "結果解読のフィロソフィー", summary: "計算された数値データと、感覚的なスタイル提案を完全に分離して読み解く技法。" },
            { href: "/guides/methodology", title: "AI分析アルゴリズム", summary: "ブラウザエンジン上で、あなたの色彩データがどのようにして抽出されるのかを深く理解する。" },
            { href: "/color", title: "パーソナルカラー診断を起動する", summary: "上記の全ての統制要件をクリアしたなら、いよいよ真の色彩を分析する時間です。" },
        ],
    },
};

const GUIDE_RESULT_READING: Record<SupportedLang, GuideArticleCopy> = {
    ko: {
        title: "결과 해독의 철학 | FINDCORE",
        description: "정량적 데이터, 시스템 경고, 그리고 스타일 제안을 구분하여 결과를 완벽하게 통제하는 독해 가이드.",
        heading: "결과 해석 가이드",
        intro: "FINDCORE가 출력하는 하나의 결과 카드는 단순한 선고가 아닙니다. 그것은 치밀한 계측치, 데이터 품질에 대한 시스템의 경고, 그리고 고도의 스타일링 제안이 겹겹이 쌓인 다층적 건축물입니다. 각 레이어의 본질을 분리하여 읽어낼 때, 결과는 비로소 정답이 아닌 '도구'가 됩니다.",
        updatedLabel: "최종 업데이트: 2026년 3월 12일",
        highlights: ["데이터와 취향의 분리", "품질 경고의 절대성", "반복된 일관성의 승리", "정체성이 아닌 내비게이션"],
        sections: [
            {
                title: "1. '계측된 수치'와 '제안된 스타일'을 철저히 분리하십시오",
                body: "얼굴의 가로세로 비율, 상하안부의 폭, 광대의 우월성 지표는 차가운 하드 데이터(Hard Data)입니다. 반면, 어떤 헤어스타일이 어울릴지 어떠한 메인 컬러를 쓸지에 대한 문구는 그 데이터를 어떻게 요리할 것인지에 대한 소프트한 해석층입니다.",
                bullets: [
                    "숫자는 변경 불가능한 당신의 골격이자 고유한 현상입니다.",
                    "제안은 그 현상을 활용해 낼 수 있는 수많은 선택지 중 하나일 뿐입니다.",
                    "추천된 스타일이 개인의 취향에 맞지 않는다고 해서, 계측된 데이터의 정확성을 의심할 필요는 전혀 없습니다.",
                ],
            },
            {
                title: "2. 시스템이 출력한 '품질 경고'를 최우선으로 검열하십시오",
                body: "투입된 원자재(사진)의 안정성이 흔들리면, 그 결과로 산출된 수치 역시 요동치게 됩니다. 화면에 경계선 주의보나 화질 경고가 남아 있다면, 그 결과를 확정적 사실로 받아들이는 것은 극히 위험합니다.",
                bullets: [
                    "헤어라인 가림, 프레임 오차, 커버리지 경고는 알고리즘이 보내는 명백한 SOS 신호입니다.",
                    "수동 보정 단계에서 프레임을 1~2mm 조정하는 것만으로도, 경계형(Borderline) 구조의 최종 결과명은 완전히 뒤바뀔 수 있습니다.",
                    "퍼스널 컬러의 경우 촬영 조건이 열악했다면, 부여된 화려한 계절의 이름보다 제안된 공통 색채 톤에만 주목하는 것이 합리적입니다.",
                ],
            },
            {
                title: "3. 파편화된 다수의 시도보다, '통제된 환경에서의 일관성'이 압도합니다",
                body: "매번 다른 장소, 다른 조명, 다른 기기로 무수히 많은 테스트를 진행하는 것은 데이터의 신뢰도를 파괴하는 행위입니다. 엄격하게 통제된 우수한 환경에서 2~3회 반복 시 도출된 '수렴하는 방향성'이야말로 진실입니다.",
                bullets: [
                    "동일한 시간대, 동일한 조명 세팅, 동일한 디바이스 앵글을 유지하여 비교군을 만드십시오.",
                    "복합적인 구조나 경계형 피부 톤의 경우, 한 번 제시된 라벨명보다는 '반복적으로 나타나는 패턴'을 최상위 지표로 삼아야 합니다.",
                    "FINDCORE의 결과를 당신을 규정짓는 감방이 아닌, 당신을 안내하는 정밀한 나침반으로 활용하십시오.",
                ],
            },
        ],
        checklistTitle: "전문가처럼 결과를 해체하는 프로세스",
        checklistItems: [
            "가장 먼저, 시스템이 발동한 품질 경고 및 신뢰도 마커 확인",
            "둘째, 라벨명 이전에 '비율과 길이'를 나타내는 순수 수치의 지향점 파악",
            "셋째, 제안된 스타일링 텍스트를 절대값이 아닌 선택 가능한 가이드로 분리 취득",
            "넷째, 동일한 조명과 세팅 하에서 다회차 테스트 시 결과값이 수렴하는지 교차 검증",
            "마지막, 경계형 특징일 경우 단일 라벨명에 집착하지 않고 메가 트렌드(패턴) 관찰",
        ],
        faqTitle: "결과 해독 전문가 FAQ",
        faqs: [
            { question: "어제와 라벨 이름이 바뀌었습니다. 어제의 분석은 시스템 오류인가요?", answer: "아닙니다. 미세한 보정 프레임의 이동, 혹은 빛의 산란 차이로 인해 임계값을 넘나드는 '경계형 타입'에서 흔히 발생하는 지극히 정상적인 변동입니다. 라벨의 이름표보다, 지속해서 유사하게 산출되는 골격의 비율 데이터 그 자체를 신뢰하십시오." },
            { question: "추천해 준 앞머리 스타일이 제 얼굴형의 단점을 전혀 보완하지 못하는 것 같습니다.", answer: "추천 문구는 알고리즘이 제시하는 보편적인 스타일링 해석의 한 갈래입니다. 고객님께서 추구하는 미학적 목표(단점 커버 vs 개성 강조)가 다르다면, 측정된 데이터를 기반으로 얼마든지 반대의 스타일을 적용하는 것이 맞습니다." },
            { question: "여러 번 반복해도 계속 같은 결과가 나옵니다. 이 정도면 확신해도 됩니까?", answer: "그렇습니다. 통제된 환경(가이드라인 준수)에서 지속해서 동일하게 수렴하는 데이터는, 현존하는 브라우저 기반 분석 중 당신이 확보할 수 있는 가장 압도적으로 강력한 신뢰 시그널입니다." },
        ],
        relatedTitle: "추가 마스터클래스",
        related: [
            { href: "/guides/face-shape-photo", title: "얼굴형 분석 촬영 규격", summary: "얼굴형의 미세한 왜곡을 원천 봉쇄하는 촬영 각도와 프레이밍의 예술." },
            { href: "/guides/personal-color-photo", title: "퍼스널 컬러 촬영 프로토콜", summary: "당신의 색상 분석 결과를 요동치게 만드는 치명적인 조명과 환경 요소를 통제하는 법." },
            { href: "/guides/faq", title: "가장 날카로운 질문 모음", summary: "분석 구조의 맹점부터 브라우저 엔진의 한계까지, 당신이 던질 짧고 본질적인 질문들." },
        ],
    },
    en: {
        title: "The Art of Result Interpretation | FINDCORE",
        description: "Master the architecture of reading FINDCORE outputs: separating hard biometric math from curated stylistic interpretation.",
        heading: "Result Reading Guide",
        intro: "A FINDCORE output is not a homogenized verdict. It is a highly stratified document containing profound structural mathematics, system-generated quality diagnostics, and curated stylistic direction. When you learn to detach these layers, the output transforms from a rigid label into a precise navigational tool.",
        updatedLabel: "Updated: March 12, 2026",
        highlights: ["Segregate Math from Aesthetics", "Prioritize System Diagnostics", "Victory is in Replication", "Navigate, Do Not Conform"],
        sections: [
            {
                title: "1. Strictly Compartmentalize 'Metrics' and 'Directives'",
                body: "The calculation of your cheekbone dominance, jawline taper, and vertical axis expansion are cold, irrefutable biometrics. Conversely, a recommendation to sweep your hair sideways or favor silver over gold is a subjective, stylized interpretation of those metrics.",
                bullets: [
                    "Your raw measurements signify enduring physical structure.",
                    "Styling recommendations merely illustrate how to manipulate or adorn that structure.",
                    "If you vehemently disagree with a style suggestion, it does not invalidate the profound accuracy of the underlying biometric read.",
                ],
            },
            {
                title: "2. The Absolute Primacy of Quality Warnings",
                body: "When the foundational input is unstable, the resulting mathematics fracture. If the system flags an occlusion, a framing deviation, or a lighting imbalance, accepting the subsequent aesthetic categorization as absolute truth is an architectural failure.",
                bullets: [
                    "Hairline obstruction and wireframe misalignment warnings are not UI decorations; they are critical system SOS signals.",
                    "For individuals dwelling on the aesthetic borderline, a millimeter shift in the manual wireframe can radically alter the final categorical label.",
                    "In chromatic analysis, if conditions were suboptimal, prioritize the broad tonal direction presented rather than obsessing over the assigned 'season' name.",
                ],
            },
            {
                title: "3. Consistency Under Strict Constraints Annihilates Flukes",
                body: "Executing twenty tests under vastly wildly oscillating lighting and physical angles generates chaos, not truth. Absolute conviction is born when you witness a converging, stable trajectory across multiple tests conducted under rigorously controlled, identical parameters.",
                bullets: [
                    "Mandate that sequential tests share the identical lighting temperature, device, and angular alignment.",
                    "For intricate, borderline bone structures or complex skin tones, the overarching repetitive pattern eclipses a singular anomaly label.",
                    "Utilize FINDCORE as a meticulously calibrated compass guiding your choices, not as a cage restricting your identity.",
                ],
            },
        ],
        checklistTitle: "The Expert Deconstruction Protocol",
        checklistItems: [
            "First: Audit all systemic quality warnings and algorithmic confidence tiers.",
            "Second: Isolate and digest the raw dimensional trajectories independent of the final label.",
            "Third: Relegate recommendation text to its proper place as a malleable styling guide.",
            "Fourth: Cross-validate the result by mandating replication under locked environmental constraints.",
            "Fifth: For borderline morphologies, elevate the recurring thematic pattern above solitary categorization."
        ],
        faqTitle: "Expert Analytical FAQ",
        faqs: [
            { question: "My categorization shifted from yesterday. Was the algorithm mathematically wrong?", answer: "Negatory. This is the hallmark of a 'borderline morphology' hovering around a systemic threshold. Miniscule variations in input quality or your manual wireframe node placement dictate which side of the threshold you fall on. Anchor your trust to the consistently returning raw proportions, not the swinging label." },
            { question: "The recommended hairstyle actively accentuates what I consider a flaw. Why?", answer: "Our stylistic layer typically suggests harmony over concealment. If your personal aesthetic mandate is to mask rather than celebrate a strong feature, you must freely countermand the recommendation. The power lies in knowing your metrics, not obeying the style bot." },
            { question: "I've run the protocol thrice under perfect constraints, and the output is unanimous. Is it definitive?", answer: "Affirmative. When a rigorously controlled environment repeatedly yields unanimous convergence on the FINDCORE browser engine, you have secured the highest class of pragmatic, actionable truth available." },
        ],
        relatedTitle: "Advanced Analytical Reading",
        related: [
            { href: "/guides/face-shape-photo", title: "Face Shape Structural Framing", summary: "Master the geometry of capturing angles that eradicate systemic facial distortion." },
            { href: "/guides/personal-color-photo", title: "Personal Color Protocol", summary: "Neutralize the catastrophic environmental triggers that destabilize color analysis algorithms." },
            { href: "/guides/faq", title: "Systemic Interrogation FAQ", summary: "Direct, brutal answers regarding system limits, browser handling, and deep metric fluctuations." },
        ],
    },
    zh: {
        title: "解读报告的层级艺术 | FINDCORE",
        description: "掌握拆解 FINDCORE 输出结果的底层核心：精准剥离刻板冷酷的生物测算与主观感性的造型建议。",
        heading: "结果解读指南",
        intro: "任何一份高阶的 FINDCORE 的报告，绝不是一张定性判决书。它是一座精密的层级建筑：底层是不可撼动的测量数据，中层是系统对于环境干扰的质量预警，顶层则是基于数据演化出的风格指导。唯有学会分层剥离，报告才能真正化作您掌控美学的绝对武器。",
        updatedLabel: "最后修订：2026年3月12日",
        highlights: ["剥离数据与美学偏好", "敬畏系统的质量预警", "摒弃偶然，笃信共识", "是导航，而非牢笼"],
        sections: [
            {
                title: "1. 必须将“绝对参数”与“主观建议”强制物理隔离",
                body: "您的面部宽高比、下颌骨的收缩角度系数，这些是属于不可争辩的生物学参数（Hard Parameters）。而系统告诉您应该留什么长度的头发，或者佩戴什么款式的眼镜，则是对这些参数的一种感性解读策略。",
                bullets: [
                    "测量数值，是在客观定义您的骨相结构密码。",
                    "造型建议，仅仅是解读密码后提供的一种可行性解法。",
                    "即使您对某项发型建议极其反感，也完全无损于底层脸型测算数据的绝对精确性。",
                ],
            },
            {
                title: "2. 将“质量预警”视为第一决定权",
                body: "当源头数据的纯度遭到污染，随之而生的所有推算与建议都将摇摇欲坠。若系统向您发出了边界模糊、辅助线不准的红色预警，盲目采信此份报告的各种定语是极其外行的行为。",
                bullets: [
                    "发际线遮挡、动态网格未贴合的警告字眼，绝非 UI 点缀，而是系统即将过载的求救信号。",
                    "对于那些骨相或肤色本就处于边界地带（Borderline）的人群，手动校正线1毫米的偏移，就能彻底颠覆您的最终属性图谱。",
                    "当拍摄条件极度恶劣时，请直接无视花哨的季型命名，转而提取其中的“核心色调偏向性”。",
                ],
            },
            {
                title: "3. 以绝对受控环境下的“交叉验证”碾压一次性测试",
                body: "在截然不同的光线、随意的角度或不同的手机镜头下疯狂测试，只能收获混乱，而非真理。顶级的数据笃定，只诞生于完全受控的严苛环境下，且测试结果呈现出惊人的收敛性与一致性。",
                bullets: [
                    "请将每次对比测试锁定在相同光度、相同焦距及绝对一致的设备角度下。",
                    "对于混合型的外貌特征，不要被某次测试爆出的新名词所迷惑，长期反复呈现的底层特质才是灵魂。",
                    "请将 FINDCORE 当作高精度雷达去规划航线，而不是把自己锁死在某个标签里。",
                ],
            },
        ],
        checklistTitle: "顶级专家的审阅流程",
        checklistItems: [
            "首杀：扫描全局，确认系统未发出任何级别的数据污染预警",
            "进阶：悬置最终结果名称，优先汲取并咀嚼面部比例与刻度的底层意涵",
            "拆分：将所有关于衣服、妆容、发型的长篇大论，仅作为外设插件般审视",
            "复盘：在锁定所有外部干扰变量后，二次上传以确立核心数据的锚点",
            "重构：针对边缘型特征，放弃对孤立名词的狂热，整合分析其大趋势的底色",
        ],
        faqTitle: "深层解构大师 FAQ",
        faqs: [
            { question: "我刚才测是A型，现在测是B型，算法已经崩溃了吗？", answer: "完全没有。这是非常典型的“临界震荡”。意味着您的特征恰好卡在系统分类的阈值边缘。此时一张轻微曝光不足的照片，或您手指拨动网格的一个微颤，都能触发阵营转换。停止纠结 A 或 B，去寻找 A 和 B 之间共通的比例因子。" },
            { question: "系统推荐我露出高耸的颧骨，但我认为这是致命缺陷，必须遮挡。难道报告错了吗？", answer: "报告没错，您的审美也未尝不可。系统的底层逻辑是寻求骨相的自然和谐，而非掩耳盗铃式的暴力遮挡。如果您个人奉行的法则是“修饰缺陷”而非“顺应骨相”，您完全应当依据自己的意志，反向利用测量数据去进行遮盖。" },
            { question: "我在绝对一致的完美光源下测试了三次，结果丝毫不差。我可以将此视为终极结论吗？", answer: "毫无疑问。当您排除了外界所有的熵增因素，且 FINDCORE 引擎依然爆发出坚定不移的计算共识时，您便握有了当前数字美学领域最为坚固客观的真相论断。" },
        ],
        relatedTitle: "高维认知拓展",
        related: [
            { href: "/guides/face-shape-photo", title: "脸型重构摄影法", summary: "掌握抹杀一切光学畸变与三维形态折损的绝对拍摄黄金角度。" },
            { href: "/guides/personal-color-photo", title: "光子级色彩管理", summary: "摧毁会导致算法宕机与色彩重组的环境污染源，萃取最纯洁的肤色标本。" },
            { href: "/guides/faq", title: "常态化质询矩阵", summary: "抛弃废话，直击浏览器本地运算核心逻辑与特征漂移的最深层机理。" },
        ],
    },
    ja: {
        title: "結果解読のフィロソフィー | FINDCORE",
        description: "FINDCOREの出力を支配する極意：冷徹な定量的データと、主観的スタイル提案の完全なる分離。",
        heading: "結果の読み方ガイド",
        intro: "FINDCOREが提示する結果画面は、単一の最終判決ではありません。それは、精密な生体計測値、データ品質に対するシステムの重大な警告、そして研ぎ澄まされたスタイリング提案が織りなす多次元の建築物です。これら各レイヤーの性質を明確に切り分けられた時、結果はあなたを縛るレッテルではなく、洗練されたナビゲーションへと進化します。",
        updatedLabel: "最終更新日: 2026年3月12日",
        highlights: ["データと美学の完全分離", "品質警告に対する絶対的服従", "一回の奇跡より反復の一貫性", "アイデンティティではなくコンパス"],
        sections: [
            {
                title: "1. 「非情なる数値」と「解釈のスタイリング」を切り離す",
                body: "顔の縦横比、上顔面と下顔面の幅のコントラスト、頬骨の支配率。これらは変更不可能なソリッド・データ（Hard Data）です。対して、どのような髪型が似合うか、どの眼鏡をかけるべきかというテキストは、そのデータをどう演出するかという解釈のアート（Soft Interpretation）に過ぎません。",
                bullets: [
                    "計測数値は、あなたの骨格構造という動かしがたい事実を証明しています。",
                    "スタイリング提案は、その事実を最大限に利用するための一つのアプローチに過ぎません。",
                    "提案されたスタイルが自身の望む美学に反していたとしても、根底にある計測データの驚異的な精度を疑う理由にはなりません。",
                ],
            },
            {
                title: "2. システムが発する「品質警告」を最重要シグナルとして捉える",
                body: "入力される原材料（画像）の安定性が崩壊すれば、算出される黄金比もまた脆くも崩れ去ります。画面上に「ボーダーライン注意報」や「カバー率の低下」が表示されている時、その最終結果を絶対的な真実として受け入れるのは致命的な誤りです。",
                bullets: [
                    "生え際の隠蔽やワイヤーフレームの不一致を示す警告は、単なるデザインの装飾ではなく、アルゴリズムからの深刻なSOSです。",
                    "境界線上（Borderline）に位置する骨格の場合、手動補正でフレームをわずか1mm移動させるだけで、分類されるラベル名が完全に反転するほどのインパクトを与えます。",
                    "パーソナルカラー分析において照明条件が劣悪だった場合は、割り当てられた季節名などのラベルは一切無視し、根底に流れる「色の方向性」のみを採用すべきです。",
                ],
            },
            {
                title: "3. 無秩序な多数回のテストより、「統制された環境下での反復の一貫性」が圧倒する",
                body: "毎回異なる照明、異なる角度、異なるスマートフォンのレンズで無作為にテストを繰り返すことは、データの精度を自ら破壊する行為です。真実は、厳格に統制された同一のパラメーターのもとで2〜3回テストを重ねた時に、継続して描かれる「収束の軌跡」の中にのみ存在します。",
                bullets: [
                    "検証を行う際は、必ず同じ光源の温度、同じ距離、そして全く同じレンズ角度を厳守して比較群を構成してください。",
                    "複数の特徴が混在する複雑な顔型や肌色の場合は、一度きりのキャッチーなラベル名よりも、幾度も反復して抽出される「共通のパターンの傾向」こそを最優先の指標としてください。",
                    "FINDCOREの出力を、あなたを枠に閉じ込める絶対等級としてではなく、航路を描くための最高精度のレーダーとして活用してください。",
                ],
            },
        ],
        checklistTitle: "プロフェッショナルによる解読のプロトコル",
        checklistItems: [
            "第一に、システムが感知した全てのデータ品質警告と信頼度スコアを冷徹に監査する",
            "第二に、提示されたラベル名は一時保留し、その基礎となる「比率と長さ」の純粋なパラメータの真意を抽出する",
            "第三に、長文のスタイリング提案を絶対的な法則ではなく、プラグインのようなカスタマイズ可能な要素として分離する",
            "第四に、全ての環境変数を固定したロック状態で再テストを行い、初期データの着地点と完全に一致するかを交差検証する",
            "最後に、境界線上の複雑なパラメータの場合、単一の呼称への執着を捨て、大きなトレンドの波を読み取る",
        ],
        faqTitle: "深層分析エキスパート FAQ",
        faqs: [
            { question: "昨日と全く違う分類名が出ました。昨日のアルゴリズムの計算は破綻していたのでしょうか？", answer: "断じて違います。これは、あなたの骨格パラメーターがシステムの閾値の極めて「境界線上」に位置していることの証明です。画像のわずかな品質低下や、手動フレームのノード配置の微小な誤差が、閾値を跨ぐスイッチとなったに過ぎません。極端に揺れ動く表面的なラベル名ではなく、常に類似して出力される根底の比率データそのものに全幅の信頼を置いてください。" },
            { question: "アルゴリズムが推奨するヘアスタイルは、私のコンプレックスを強調しているように感じます。分析が間違っているのでは？", answer: "分析結果は完璧に機能しています。我々のスタイル解釈レイヤーは、欠点の隠蔽よりも「骨格全体の調和」を優先するよう設計されています。もしあなたの美学の絶対目標が「調和」ではなく「欠点の完全な隠蔽」であるならば、アルゴリズムの提案にあえて反旗を翻し、真逆のスタイルを選択するべきです。真の自由は、己の数値を完全に把握した上で、AIの提案を意図的に逸脱することにあります。" },
            { question: "完璧に統制された環境下で3回テストを繰り返し、全く同じ数値と結論に至りました。これを最終的な真理として受け入れて良いでしょうか？", answer: "間違いありません。全てのノイズとなる環境変数を完璧に排除し、FINDCOREのブラウザエンジンが微動だにせず完全に一致する計算結果を連続して提示した時、あなたは現在のデジタル美学領域において獲得し得る、最も強固で実践的な「真実」を手にしたことになります。" },
        ],
        relatedTitle: "更なる高みへ",
        related: [
            { href: "/guides/face-shape-photo", title: "顔型構造の完璧なるフレーミング", summary: "生体の造形データを歪ませる光学インフラの過ちを、撮影アングルによって完全に根絶する技法。" },
            { href: "/guides/personal-color-photo", title: "パーソナルカラー至高のプロトコル", summary: "色彩アルゴリズムを暴走させる致命的な環境トリガーを無力化し、無垢な肌色情報を抽出する。" },
            { href: "/guides/faq", title: "システムの限界に対する徹底尋問", summary: "アルゴリズムの盲点、ブラウザ演算の制約、そして結果の変動メカニズムについて、一切の妥協なく答える。" },
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
            { question: "업로드한 사진이 서버에 저장되나요?", answer: "아니요, 본 서비스는 상용자의 이미지를 서버에 저장하거나 전송하지 않습니다. 모든 분석은 브라우저(로컬) 내에서 즉시 수행되며, 결과 도출 후에는 어떠한 데이터도 남지 않으니 안심하고 사용하셔도 좋습니다." },
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
            { question: "Are uploaded photos stored on the server?", answer: "No, we do not store or upload your photos to the server. All analysis is performed locally within your browser, and the image data is discarded immediately after the results are calculated." },
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
            { question: "上传照片会保存在服务器吗？", answer: "不，我们不会在服务器上存储或上传您的照片。所有分析均在您的浏览器本地完成，图像数据在计算结果后会立即被丢弃，确保您的隐私安全。" },
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
