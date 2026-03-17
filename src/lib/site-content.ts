import type { Metadata } from "next";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";

export type SupportedLang = "ko" | "en" | "zh" | "ja";
export type NavigationLabels = {
    home: string;
    aesthetic: string;
    color: string;
    faceShape: string;
};

const SUPPORTED_LANGS: SupportedLang[] = ["ko", "en", "zh", "ja"];
const BASE_URL = "https://findcore.me";
const LOCALE_BY_LANG: Record<SupportedLang, string> = {
    ko: "ko_KR",
    en: "en_US",
    zh: "zh_CN",
    ja: "ja_JP",
};

export function resolveSupportedLang(lang?: string): SupportedLang {
    return SUPPORTED_LANGS.includes((lang || "") as SupportedLang) ? (lang as SupportedLang) : "en";
}

type FooterLabels = {
    about: string;
    privacy: string;
    terms: string;
    guides: string;
};

type ContentSection = {
    title: string;
    body: string;
};

export type CookieConsentLabels = {
    title: string;
    description: string;
    accept: string;
    decline: string;
    privacy: string;
};

type PageCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    updatedLabel?: string;
    sections: ContentSection[];
};

const FOOTER_LABELS: Record<SupportedLang, FooterLabels> = {
    ko: { about: "소개", privacy: "개인정보처리방침", terms: "이용약관", guides: "가이드" },
    en: { about: "About", privacy: "Privacy", terms: "Terms", guides: "Guides" },
    zh: { about: "关于", privacy: "隐私政策", terms: "服务条款", guides: "指南" },
    ja: { about: "紹介", privacy: "プライバシー", terms: "利用規約", guides: "ガイド" },
};

const NAVIGATION_LABELS: Record<SupportedLang, NavigationLabels> = {
    ko: { home: "홈", aesthetic: "감성 테스트", color: "퍼스널 컬러", faceShape: "AI 얼굴형 분석" },
    en: { home: "Home", aesthetic: "Aesthetic Test", color: "Personal Color", faceShape: "AI Face Shape Analysis" },
    zh: { home: "首页", aesthetic: "美学测试", color: "个人色彩", faceShape: "AI 脸型分析" },
    ja: { home: "ホーム", aesthetic: "感性テスト", color: "パーソナルカラー", faceShape: "AI 顔型分析" },
};

const ABOUT_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "FINDCORE 소개",
        description: "FINDCORE - 감성 코어, 퍼스널 컬러, 그리고 AI 얼굴형 분석을 위한 프리미엄 가이드.",
        heading: "FINDCORE",
        intro: "FINDCORE는 Today's Studio가 선보이는 세련된 스타일 탐색 플랫폼입니다. 정교한 감성 코어 테스트, 정밀한 퍼스널 컬러 분석, 그리고 고도화된 AI 얼굴형 측정 도구를 제공합니다. 우리의 목표는 단순히 빠른 결과를 도출하는 것을 넘어, 당신이 가진 고유한 미학을 깊이 있게 이해하고 완성할 수 있도록 돕는 데 있습니다.",
        sections: [
            {
                title: "우리가 제공하는 경험",
                body: "FINDCORE는 직관적인 감성 코어 진단부터 사진 기반의 심도 있는 퍼스널 컬러 분석, 그리고 정밀한 AI 얼굴형 측정까지 통합된 도구를 제공합니다. 또한, 측정의 정확도를 높이고 결과를 완벽하게 실생활에 적용할 수 있도록 상세하고 전문적인 가이드 문서를 함께 지원합니다.",
            },
            {
                title: "분석 프로세스",
                body: "당신의 프라이버시를 완벽히 보호하기 위해 모든 사진 분석은 브라우저 내부에서만 독립적으로 실행됩니다. AI 엔진은 정밀한 안면 랜드마크를 기반으로 비율과 색상 신호를 분석합니다. 얼굴형 분석은 사용자의 섬세한 프레임 조정을 실시간으로 반영하며, 퍼스널 컬러 분석은 주변 조명과 카메라의 색온도 변화를 예민하게 감지하여 피부 톤의 본질을 읽어냅니다.",
            },
            {
                title: "결과의 올바른 활용",
                body: "FINDCORE의 분석은 당신의 매력을 발견하기 위한 나침반과 같습니다. 제공된 결과는 패션과 뷰티 스타일링을 위한 훌륭한 영감이 되지만, 이것이 개인의 외모에 대한 절대적인 평가나 전문적인 진단(의료, 채용, 심리 등)을 대체할 수는 없습니다.",
            },
            {
                title: "운영 및 문의 안내",
                body: `${PUBLISHER_PROFILE.operatorName} 운영 · 공식 사이트: https://findcore.me · 텔레그램: ${PUBLISHER_PROFILE.telegramHandle} · 이메일: ${PUBLISHER_PROFILE.email}`,
            },
        ],
    },
    en: {
        title: "About FINDCORE",
        description: "FINDCORE - Your premium companion for Aesthetic Core, Personal Color, and AI Face Shape Analysis.",
        heading: "FINDCORE",
        intro: "FINDCORE is an advanced style discovery platform crafted by Today's Studio. We offer highly precise Aesthetic Core Tests, Personal Color Analysis, and AI Face Shape Measurements. Our philosophy is rooted in providing not just rapid results, but comprehensive, curated guidance to help you master your unique aesthetic.",
        sections: [
            {
                title: "Our Offerings",
                body: "FINDCORE provides a curated suite of tools: an intuitive Aesthetic Core Test, an intricate photo-based Personal Color Analysis, and a sophisticated AI Face Shape Measurement tool. Alongside these, we maintain detailed guides to empower you to optimize your photo inputs and interpret the results with confidence.",
            },
            {
                title: "How It Works",
                body: "Our photo-analysis tools run entirely within your browser for complete privacy. The engine calculates proportions and color profiles based on advanced facial landmarking. Face shape analysis incorporates your manual frame alignments, while the personal color engine analyzes skin tone dynamics, remaining highly sensitive to ambient lighting and camera processing.",
            },
            {
                title: "The Scope of Analysis",
                body: "FINDCORE is designed as an inspiring compass for your personal style journey, not an absolute aesthetic judgement or a rigid diagnostic tool. The resulting coordinates are meant to guide your fashion and beauty choices, and should not replace professional medical, hiring, or psychological evaluations.",
            },
            {
                title: "Operations & Contact",
                body: `Website: https://findcore.me · Telegram: ${PUBLISHER_PROFILE.telegramHandle} · Email: ${PUBLISHER_PROFILE.email}`,
            },
        ],
    },
    zh: {
        title: "关于 FINDCORE",
        description: "FINDCORE - 致力于美学类型、个人色彩及 AI 脸型分析的高级探索平台。",
        heading: "FINDCORE",
        intro: "FINDCORE 是由 Today's Studio 倾力打造的先锋风格探索网站。我们提供高精度的美学类型诊断、专业的个人色彩分析以及先进的 AI 脸型深度测量。我们追求的不仅是迅速得出结论，更是提供详尽、权威的解读指南，协助您真正掌握属于自己的美学密码。",
        sections: [
            {
                title: "探索体验",
                body: "FINDCORE 集成了一系列创新工具：直观的美学类型测试、基于照片的精细个人色彩剖析，以及运用 AI 技术的面部比例测量。为了确保每次分析的严谨性，我们还配备了深入浅出的专业指南，助您优化输入质量，并以更全局的视角解读每一项数据。",
            },
            {
                title: "隐私与技术核心",
                body: "为提供绝对安心的体验，所有图像分析均 100% 在您的本地浏览器内完成。AI 引擎通过精准提取面部关键点来计算比例与色彩特征。不仅如此，脸型分析会实时响应您的手动框线微调；而个人色彩引擎则能敏锐捕捉光线环境与设备色彩空间的微妙变化，呈现最真实的肤色基调。",
            },
            {
                title: "理性的分析边界",
                body: "FINDCORE 旨在为您个人的时尚与美妆探索提供具有启发性的风格坐标，而非外貌的绝对标准或冰冷的诊断工具。所有输出结果仅供发现个性之美，不可替代任何专业的医疗、心理或人力资源评估。",
            },
            {
                title: "运营与服务支持",
                body: `官方网站: https://findcore.me · 官方 Telegram: ${PUBLISHER_PROFILE.telegramHandle} · 电子邮件: ${PUBLISHER_PROFILE.email}`,
            },
        ],
    },
    ja: {
        title: "FINDCOREについて",
        description: "FINDCORE - 感性コア、パーソナルカラー、そしてAI顔型分析のためのプレミアムガイド。",
        heading: "FINDCORE",
        intro: "FINDCOREは、Today's Studioが手がける洗練されたスタイル探索プラットフォームです。高精度な感性タイプ診断、緻密なパーソナルカラー分析、そして最先端のAI顔型測定を提供しています。単に結果を素早く提示するだけではなく、皆様がご自身の美学を深く理解し、主体的に活かせるよう充実したガイドラインをご用意しています。",
        sections: [
            {
                title: "私たちが提供する体験",
                body: "FINDCOREでは、直感的な感性テスト、写真ベースの本格的なパーソナルカラー分析、そしてAIによる精密な顔型測定といったツールを統合して提供しています。診断結果で終わらせず、入力画像の最適化や結果の解釈を補助する専門的なガイド文書を通じて、より精度の高い発見をサポートします。",
            },
            {
                title: "分析プロセスの仕組み",
                body: "プライバシーを完全に保護するため、顔型やカラーの分析プロセスはすべてお使いのブラウザ内でのみ実行されます。AIエンジンが顔のランドマークを精緻に抽出し、手動のフレーム微調整をリアルタイムに反映させます。パーソナルカラー分析では、光の環境やカメラの色温度の変化を敏感に捉え、肌本来の色調を読み取ります。",
            },
            {
                title: "結果の適切なご活用について",
                body: "FINDCOREの提供する分析データは、皆様のファッションや美容における新たなインスピレーションとしてのスタイル座標です。外見に対する絶対的な評価や、医療・採用・心理状態に関する専門的な診断を代替するものではありません。",
            },
            {
                title: "運営およびお問い合わせ",
                body: `公式サイト: https://findcore.me · 公式Telegram: ${PUBLISHER_PROFILE.telegramHandle} · メール: ${PUBLISHER_PROFILE.email}`,
            },
        ],
    },
};

const PRIVACY_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "개인정보처리방침 | FINDCORE",
        description: "FINDCORE 개인정보처리방침",
        heading: "개인정보처리방침",
        intro: "FINDCORE는 철저한 '100% Zero-Data' 아키텍처를 기반으로 설계되었습니다. 사용자 데이터를 수집하는 구조 자체를 원천적으로 배제하여 완벽한 프라이버시를 보장합니다.",
        updatedLabel: "Today's Studio 운영 · 2026년 3월 10일 업데이트",
        sections: [
            {
                title: "1. 100% 브라우저 로컬 구동",
                body: "프라이버시는 단순한 정책이 아닌 FINDCORE의 핵심 설계 철학입니다. 얼굴형 구별 및 퍼스널 컬러 등 모든 분석 연산은 오직 사용자의 브라우저 내부에서만 실행됩니다. 업로드된 사진을 전송받거나 처리하기 위한 백엔드 서버 자체가 존재하지 않으며, 페이지를 새로고침하거나 종료하는 즉시 메모리에서 영구적으로 소멸됩니다.",
            },
            {
                title: "2. 데이터베이스 및 추적 스크립트 전면 배제",
                body: "우리의 소스 코드에는 어떠한 백엔드 데이터베이스 모듈도 포함되어 있지 않으며, Google Analytics와 같은 사용자 행동 추적 스크립트의 사용을 원천적으로 거부합니다. 따라서 접속 로그, 텔레메트리, 방문자 행동 패턴 등 어떠한 데이터도 수집되거나 저장되지 않습니다.",
            },
            {
                title: "3. 광고 송출 및 제3자 쿠키 (Google AdSense)",
                body: "안정적인 무료 서비스 제공을 위해 유일하게 허용된 외부 스크립트는 'Google AdSense'입니다. FINDCORE 자체는 어떠한 쿠키나 로컬 스토리지도 생성하지 않지만, Google AdSense는 광고 송출 목적에 한해 제3자 쿠키를 사용합니다. 사용자는 언제든 브라우저의 기본 개인정보 설정을 통해 이를 자유롭게 차단할 수 있습니다.",
            },
            {
                title: "4. 구조적으로 불가능한 데이터 수집",
                body: "사용자의 입력을 처리할 수 있는 서버 측 API 자체가 존재하지 않으므로, 일반 사용자는 물론 미성년자의 개인정보를 탈취하거나 수집할 수 있는 기술적 가능성은 수학적으로 '0%'입니다. 당신의 개인정보는 시스템 구조 자체로 안전하게 보호됩니다.",
            },
        ],
    },
    en: {
        title: "Privacy Policy | FINDCORE",
        description: "FINDCORE Privacy Policy",
        heading: "Privacy Policy",
        intro: "FINDCORE is engineered with a strict 100% Zero-Data architecture. We prioritize absolute user privacy by entirely eliminating data collection from our infrastructure.",
        updatedLabel: "Last updated: March 10, 2026",
        sections: [
            {
                title: "1. 100% Local In-Browser Processing",
                body: "Privacy is not just a policy; it is built into our core engineering. All analysis computations—whether for face shape or personal color—are executed entirely within your active browser instance. We have no backend code designed to receive or process your uploaded photos. The moment you refresh or navigate away, the images are instantly wiped from memory.",
            },
            {
                title: "2. Zero Databases. Zero Tracking.",
                body: "Our underlying source code hosts no backend database modules, and we actively refuse to operate standard behavioral tracking scripts like Google Analytics. Because we have fundamentally removed these mechanisms, zero connection logs, telemetry data, or behavioral profiles are captured by Today's Studio.",
            },
            {
                title: "3. Advertisements & Third-Party Cookies",
                body: "To sustain our free service infrastructure, the only external script integrated is 'Google AdSense'. While FINDCORE fundamentally does not write any cookies or localStorage strings directly, Google AdSense utilizes third-party cookies strictly for the delivery of advertisements. You maintain full control and can easily restrict this activity via your browser's standard privacy configurations.",
            },
            {
                title: "4. Data Capture is Structurally Impossible",
                body: "By omitting entirely any server-side APIs capable of handling user inputs, the technical possibility of harvesting personal information from our visitors—including minors—is mathematically zero. Your privacy is structurally guaranteed.",
            },
        ],
    },
    zh: {
        title: "隐私政策 | FINDCORE",
        description: "FINDCORE 隐私政策",
        heading: "隐私政策",
        intro: "FINDCORE 建立在严苛的“100% 零数据”架构之上。我们通过在底层代码中彻底剔除数据收集机制，为您提供毫无保留的隐私保障。",
        updatedLabel: "最后更新：2026年3月10日",
        sections: [
            {
                title: "1. 100% 本地浏览器处理",
                body: "隐私不仅是承诺，更是我们设计的基石。所有的分析运算——包括脸型测绘与色彩提取——均在您当前浏览器的内存中独立运行。我们没有部署任何用于接收您照片的后端服务器。当您刷新或离开页面时，一切图像数据即刻从内存中永久销毁。",
            },
            {
                title: "2. 拒绝数据库与隐形追踪",
                body: "我们的系统内核完全剥离了任何形式的后端数据库，并主动拒绝引入如 Google Analytics 等常见的用户行为追踪脚本。得益于这种极简而严谨的架构，我们从未、也无法收集您的任何连接日志、遥测数据或访问行为轮廓。",
            },
            {
                title: "3. 第三方广告与 Cookie (Google AdSense)",
                body: "为维持这一高质量免费服务的持续运营，本站唯一接入的外部服务是 'Google AdSense'。FINDCORE 平台本身绝对不会主动写入或读取任何 Cookie 及本地存储。仅 Google AdSense 出于广告投放之需使用第三方 Cookie。您完全享有自主权，可随时通过浏览器设置对其进行限制或屏蔽。",
            },
            {
                title: "4. 从物理与结构上杜绝数据获取",
                body: "由于整个产品架构中根本不存在处理用户输入的服务器 API，因此在这个平台上，收集任何普通用户，尤其是未成年人的个人隐私数据，在技术上具有“0%”的可能性。您的安全，由代码结构本身捍卫。",
            },
        ],
    },
    ja: {
        title: "プライバシーポリシー | FINDCORE",
        description: "FINDCORE プライバシーポリシー",
        heading: "プライバシーポリシー",
        intro: "FINDCOREは、厳格な「100% Zero-Data」アーキテクチャに基づいて設計されています。ユーザーデータを収集する仕組みそのものを根本から排除することで、完全なプライバシーをお約束します。",
        updatedLabel: "最終更新日: 2026年3月10日",
        sections: [
            {
                title: "1. 100％ブラウザ内ローカル処理",
                body: "プライバシーの保護は、FINDCOREの最優先事項です。顔型やパーソナルカラーといったすべての分析処理は、お使いのブラウザ内部でのみ完結します。アップロードされた画像をサーバーへ送信、あるいは保存するためのバックエンドシステムは一切存在せず、ページを更新・離脱した瞬間に画像データはメモリから永久に消去されます。",
            },
            {
                title: "2. データベースおよびトラッキングの完全排除",
                body: "私たちのソースコードには、バックエンドのデータベースモジュールが含まれていないだけでなく、Google Analyticsなどの一般的な行動追跡スクリプトの導入も意図的に拒否しています。この設計により、アクセスログ、テレメトリ、ユーザーの行動履歴といった情報は一切収集されることがありません。",
            },
            {
                title: "3. 広告配信とサードパーティCookie (Google AdSense)",
                body: "無料サービスを維持するための唯一の外部連携として「Google AdSense」を導入しています。FINDCORE自体がCookieやローカルストレージにデータを書き込むことはありませんが、Google AdSenseは広告配信の目的に限定してサードパーティCookieを使用します。これらは、お使いのブラウザ設定からいつでも容易に制限またはブロックすることが可能です。",
            },
            {
                title: "4. 構造的に不可能なデータ収集",
                body: "ユーザーが入力したデータを処理するサーバー側APIが実装されていないため、一般の皆様はもちろん、未成年者の個人情報などの機密データを収集できる物理的・技術的な可能性は「完全なゼロ」です。皆様の安全は、システムの構造そのものによって担保されています。",
            },
        ],
    },
};

const TERMS_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "이용약관 | FINDCORE",
        description: "FINDCORE 이용약관",
        heading: "이용약관",
        intro: "FINDCORE 서비스를 온전히 경험하기 위해 숙지해야 할 필수적인 가이드라인과 책임 기준입니다.",
        updatedLabel: "Today's Studio 운영 · 2026년 3월 9일 업데이트",
        sections: [
            {
                title: "분석 결과의 해석과 한계",
                body: "감성 코어, 퍼스널 컬러, 얼굴형 분석 등 FINDCORE가 제공하는 모든 결과물은 사용자에게 스타일링 영감을 주고 자가 탐색의 즐거움을 제공하기 위해 세심하게 설계되었습니다. 이는 어떠한 경우에도 의료, 심리 상담, 채용 등 전문적이고 절대적인 판단 기준을 대신할 수 없습니다.",
            },
            {
                title: "서비스 진화와 업데이트",
                body: "Today's Studio는 사용자에게 최고의 경험을 제공하기 위해 알고리즘과 인터페이스를 지속적으로 정교화하고 있습니다. 이에 따라 분석 방법론, 제공되는 기능, 디자인 레이아웃 등은 더 나은 서비스 품질을 위해 사전 예고 없이 발전하거나 변경될 수 있습니다.",
            },
        ],
    },
    en: {
        title: "Terms of Service | FINDCORE",
        description: "FINDCORE Terms of Service",
        heading: "Terms of Service",
        intro: "Essential guidelines and responsibilities to keep in mind while experiencing the FINDCORE platform.",
        updatedLabel: "Last updated: March 9, 2026",
        sections: [
            {
                title: "Intended Use and Interpretation",
                body: "All analyses provided by FINDCORE—including Aesthetic Core, Personal Color, and Face Shape results—are meticulously designed for entertainment, style inspiration, and personal reference. They do not constitute, and should never supplement, professional medical, psychological, or diagnostic advice.",
            },
            {
                title: "Service Evolution and Modifications",
                body: "Today's Studio continually refines the FINDCORE algorithm and user experience. Consequently, methodologies, features, and platform capabilities may evolve or be periodically updated without prior notice to ensure the highest standard of service.",
            },
        ],
    },
    zh: {
        title: "服务条款 | FINDCORE",
        description: "FINDCORE 服务条款",
        heading: "服务条款",
        intro: "为确保您在 FINDCORE 获得最佳体验，请仔细阅读以下核心服务准则与责任范围。",
        updatedLabel: "最后更新：2026年3月9日",
        sections: [
            {
                title: "分析结果的本质与局限",
                body: "FINDCORE 所提供的所有报告（涵盖美学核心、个人色彩及脸型分析）均旨在为您提供具有启发性的风格坐标与自我探索的乐趣。这些结果仅供参考，在任何情况下均不得替代专业的医疗诊断、心理咨询或职场评估。",
            },
            {
                title: "服务的持续进化",
                body: "为不懈追求卓越的用户体验，Today's Studio 会对分析算法及界面交互进行持续打磨。这意味着，我们的产品功能、分析方法及展现形式可能在未事先通知的情况下获得优化或调整。",
            },
        ],
    },
    ja: {
        title: "利用規約 | FINDCORE",
        description: "FINDCORE 利用規約",
        heading: "利用規約",
        intro: "FINDCOREのサービスを最大限にお楽しみいただくために、以下の基本的なガイドラインと免責事項をご確認ください。",
        updatedLabel: "最終更新日: 2026年3月9日",
        sections: [
            {
                title: "分析結果の解釈について",
                body: "FINDCOREが提供する独自の感性タイプ、パーソナルカラー、および顔型分析の結果は、皆様の自己表現とスタイル構築にインスピレーションを与えるための設計となっています。これらの情報はあくまで参考であり、医療、心理的評価、あるいは専門的な診断を目的としたものではありません。",
            },
            {
                title: "サービスの更新と変更",
                body: "Today's Studioは、常に洗練されたユーザー体験を提供するため、アルゴリズムやプラットフォームの機能を持続的に磨き上げています。それに伴い、提供する機能や分析手法は事前の予告なく拡張、変更、または更新される場合がございます。",
            },
        ],
    },
};



export function getFooterLabels(lang: SupportedLang) {
    return FOOTER_LABELS[lang];
}

export function getNavigationLabels(lang: SupportedLang) {
    return NAVIGATION_LABELS[lang];
}

function buildLanguageAlternate(path: string, lang: SupportedLang) {
    return path === "/" ? `${BASE_URL}/?lang=${lang}` : `${BASE_URL}${path}?lang=${lang}`;
}

export function buildPageMetadata(lang: SupportedLang, copy: { title: string; description: string }, path = "/"): Metadata {
    const canonical = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
    const defaultOgImage = `${BASE_URL}/images/hero.webp`;

    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical,
            languages: Object.fromEntries(SUPPORTED_LANGS.map((supportedLang) => [supportedLang, buildLanguageAlternate(path, supportedLang)])),
        },
        openGraph: {
            title: copy.title,
            description: copy.description,
            url: canonical,
            siteName: "FINDCORE",
            locale: LOCALE_BY_LANG[lang],
            type: "website",
            images: [
                {
                    url: defaultOgImage,
                    width: 800,
                    height: 1000,
                    alt: "FINDCORE",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: [defaultOgImage],
        },
    };
}

export function getAboutCopy(lang: SupportedLang) {
    return ABOUT_COPY[lang];
}

export function getPrivacyCopy(lang: SupportedLang) {
    return PRIVACY_COPY[lang];
}

export function getTermsCopy(lang: SupportedLang) {
    return TERMS_COPY[lang];
}

const COOKIE_CONSENT_LABELS: Record<SupportedLang, CookieConsentLabels> = {
    ko: {
        title: "쿠키 및 프라이버시 안내",
        description: "FINDCORE는 맞춤형 광고(Google AdSense)를 제공하기 위해 쿠키를 사용합니다. 당신의 선택에 따라 서비스의 일부 기능이 제한될 수 있습니다.",
        accept: "모두 허용",
        decline: "필수 항목만",
        privacy: "자세히 보기",
    },
    en: {
        title: "Cookie & Privacy Notice",
        description: "FINDCORE uses cookies to deliver personalized advertisements (Google AdSense). Your choice may limit certain site functionalities.",
        accept: "Accept All",
        decline: "Essential Only",
        privacy: "Learn More",
    },
    zh: {
        title: "Cookie 与隐私提示",
        description: "FINDCORE 使用 Cookie 以提供个性化广告 (Google AdSense)。您的选择可能会限制某些网站功能。",
        accept: "全部接受",
        decline: "仅限必要",
        privacy: "查看详情",
    },
    ja: {
        title: "Cookieとプライバシーの通知",
        description: "FINDCOREでは、パーソナライズされた広告（Google AdSense）を提供するためにCookieを使用しています。選択により一部の機能が制限される場合があります。",
        accept: "すべて許可",
        decline: "必須のみ",
        privacy: "詳細を見る",
    },
};

export function getCookieConsentLabels(lang: SupportedLang): CookieConsentLabels {
    return COOKIE_CONSENT_LABELS[lang];
}
