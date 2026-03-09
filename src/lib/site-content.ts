import type { Metadata } from "next";

export type SupportedLang = "ko" | "en" | "zh" | "ja";

export function resolveSupportedLang(lang?: string): SupportedLang {
    return ["ko", "en", "zh", "ja"].includes(lang || "") ? (lang as SupportedLang) : "en";
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

type PageCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    updatedLabel?: string;
    sections: ContentSection[];
};

type GuideIndexCard = {
    href: string;
    title: string;
    summary: string;
};

type GuideIndexCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    cards: GuideIndexCard[];
};

type GuidePageCopy = {
    title: string;
    description: string;
    heading: string;
    intro: string;
    sections: ContentSection[];
};

const FOOTER_LABELS: Record<SupportedLang, FooterLabels> = {
    ko: { about: "소개", privacy: "개인정보처리방침", terms: "이용약관", guides: "가이드" },
    en: { about: "About", privacy: "Privacy", terms: "Terms", guides: "Guides" },
    zh: { about: "关于", privacy: "隐私政策", terms: "服务条款", guides: "指南" },
    ja: { about: "紹介", privacy: "プライバシー", terms: "利用規約", guides: "ガイド" },
};

const ABOUT_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "FINDCORE 소개",
        description: "FINDCORE - 감성 테스트, 퍼스널 컬러, 얼굴형 분석 도구",
        heading: "FINDCORE",
        intro: "감성 타입 진단, 퍼스널 컬러 분석, AI 얼굴형 분석을 제공하는 스타일 탐색 사이트입니다.",
        sections: [
            {
                title: "제공 기능",
                body: "사진 업로드 또는 질문 응답을 통해 나만의 감성 타입, 퍼스널 컬러 시즌, 얼굴형 분석 결과를 확인할 수 있습니다. 일부 기능은 브라우저에서 직접 얼굴 랜드마크를 검출하여 비율을 계산합니다.",
            },
            {
                title: "문의",
                body: "https://findcore.me · 텔레그램 : @todayshelp",
            },
        ],
    },
    en: {
        title: "About FINDCORE",
        description: "FINDCORE - Aesthetic test, personal color analysis, and AI face shape tools.",
        heading: "FINDCORE",
        intro: "A style discovery site offering aesthetic type diagnosis, personal color analysis, and AI face shape measurement.",
        sections: [
            {
                title: "Features",
                body: "Upload a photo or answer prompts to discover your aesthetic type, personal color season, or face shape analysis. Some features detect facial landmarks directly in the browser to calculate proportions.",
            },
            {
                title: "Contact",
                body: "Website: https://findcore.me · Telegram: @todayshelp",
            },
        ],
    },
    zh: {
        title: "关于 FINDCORE",
        description: "FINDCORE - 美学测试、个人色彩分析、AI脸型分析工具。",
        heading: "FINDCORE",
        intro: "提供美学类型诊断、个人色彩分析和 AI 脸型测量的风格探索网站。",
        sections: [
            {
                title: "功能介绍",
                body: "通过上传照片或回答问题，发现您的美学类型、个人色彩季节或脸型分析结果。部分功能在浏览器中直接检测面部特征点并计算比例。",
            },
            {
                title: "联系方式",
                body: "网站: https://findcore.me · Telegram: @todayshelp",
            },
        ],
    },
    ja: {
        title: "FINDCOREについて",
        description: "FINDCORE - 感性テスト、パーソナルカラー分析、AI顔型分析ツール。",
        heading: "FINDCORE",
        intro: "感性タイプ診断、パーソナルカラー分析、AI顔型測定を提供するスタイル探索サイトです。",
        sections: [
            {
                title: "機能紹介",
                body: "写真アップロードまたは質問への回答で、感性タイプ、パーソナルカラーシーズン、顔型分析の結果を確認できます。一部の機能はブラウザ上で顔のランドマークを検出し比率を算出します。",
            },
            {
                title: "お問い合わせ",
                body: "サイト: https://findcore.me · Telegram: @todayshelp",
            },
        ],
    },
};

const PRIVACY_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "개인정보처리방침 | FINDCORE",
        description: "FINDCORE 개인정보처리방침",
        heading: "개인정보처리방침",
        intro: "FINDCORE는 실제 코드 아키텍처 상 데이터 수집이 물리적으로 불가능한 '100% 무수집(Zero-Data)' 정적 웹사이트입니다.",
        updatedLabel: "최종 업데이트: 2026년 3월 10일",
        sections: [
            {
                title: "1. 브라우저 기반 100% 로컬 처리",
                body: "FINDCORE의 모든 분석(얼굴형, 퍼스널 컬러) 모델은 오직 사용자의 브라우저 내에서만 구동됩니다. 사용자가 등록한 이미지는 저희 서버로 전송(POST API)되는 로직 자체가 코드에 단 하나도 존재하지 않으며, 페이지를 벗어나는 즉시 브라우저 메모리에서 사라집니다.",
            },
            {
                title: "2. 데이터베이스 및 트래커 무존재",
                body: "당사 소스 코드에는 사용자 행동이나 로그를 추적하는 흔한 분석 툴(예: Google Analytics 등)이나, 데이터를 저장할 수 있는 형태의 백엔드 데이터베이스 모듈이 아예 설치되어 있지 않습니다. 따라서 접속 기록이나 식별 정보 수집은 시스템적으로 완전히 제로(0)입니다.",
            },
            {
                title: "3. 광고용 제3자 쿠키(Google AdSense)",
                body: "서버 유지비 충당을 위해 화면에 적용된 유일한 외부 스크립트는 '구글 애드센스(Google AdSense)' 배너뿐입니다. 사이트 자체는 어떠한 쿠키나 로컬스토리지를 사용하지 않으나, 구글 애드센스 모듈만이 광고 송출 목적으로 제3자 쿠키를 활용합니다. 원치 않으실 경우 언제든 브라우저에서 쿠키를 차단하실 수 있습니다.",
            },
            {
                title: "4. 수집 불가 원칙 및 아동 보호",
                body: "입력 데이터를 전달받을 어떠한 서버 API가 시스템에 구현조차 되어있지 않기 때문에, 아동의 정보는 물론 그 어떤 서비스 이용자의 어떠한 민감 데이터도 당사가 수집할 물리적, 구조적 방법이 전혀 없습니다.",
            },
        ],
    },
    en: {
        title: "Privacy Policy | FINDCORE",
        description: "FINDCORE Privacy Policy",
        heading: "Privacy Policy",
        intro: "FINDCORE operates exclusively as a static architecture where data collection is physically and structurally impossible.",
        updatedLabel: "Last updated: March 10, 2026",
        sections: [
            {
                title: "1. 100% Local In-Browser Processing",
                body: "All of FINDCORE's analysis tools compute everything directly inside your active browser instance. Your uploaded photos are never POST-requested to our servers, as there is absolutely zero backend code to receive them. The images literally wipe from memory once you reload.",
            },
            {
                title: "2. No Database & No Analytics Trackers",
                body: "We do not host any backend database modules, nor do we run standard tracking tools (like Google Analytics) inside our underlying source code. Because of this architectural choice, zero connection logs, telemetry, or behavioral data is captured or saved by us.",
            },
            {
                title: "3. Google AdSense & Third-Party Cookies",
                body: "The only external script integrated into this static application is 'Google AdSense' for ad monetization. While FINDCORE itself writes absolutely no cookies or localStorage variables, Google AdSense uses third-party cookies strictly to serve ads. You may easily block this via your standard browser configurations.",
            },
            {
                title: "4. Structurally Impossible to Collect Data",
                body: "Since our entire codebase lacks server APIs entirely for handling user input, the technical capability to harvest your personal information, or any minors' information, literally stands at zero percent. ",
            },
        ],
    },
    zh: {
        title: "隐私政策 | FINDCORE",
        description: "FINDCORE 隐私政策",
        heading: "隐私政策",
        intro: "FINDCORE 是一个从代码架构层面在物理上无法进行数据收集的“100%零数据”静态网站。",
        updatedLabel: "最后更新：2026年3月10日",
        sections: [
            {
                title: "1. 100%浏览器本地处理",
                body: "FINDCORE的所有核心分析（如脸型、个人色彩）均完全在您的浏览器端驱动。代码库中没有任何将照片上传到服务器（POST 请求）的逻辑，只要您离开页面，内存即立刻清空重置。",
            },
            {
                title: "2. 无数据库与跟踪器",
                body: "在我们的实际源代码中，既没有部署例如 Google Analytics 这样的用户行为追踪脚本，也绝对没有连接任何用于存储数据的后端数据库。因此，对访问日志或识别信息的收集确确实实是零（0）。",
            },
            {
                title: "3. 第三方广告 Cookie (Google AdSense)",
                body: "由于网站性质为免费服务，源代码中唯一引入的外部网络脚本仅有“Google AdSense”。本站自身绝不读写任何 Cookie 与 LocalStorage，但仅 Google AdSense 出于投放广告需要会涉及第三方 Cookie，您随时可在浏览器设置中直接屏蔽。",
            },
            {
                title: "4. 数据截获之结构性不可能",
                body: "由于整个系统中根本不存在接收用户照片数据的后端 API，系统在物理、结构上根本不可能存储有关儿童或任何普通用户的敏感数据隐私。",
            },
        ],
    },
    ja: {
        title: "プライバシーポリシー | FINDCORE",
        description: "FINDCORE プライバシーポリシー",
        heading: "プライバシーポリシー",
        intro: "FINDCOREは、コードのアーキテクチャ上前、データ収集自体が物理的に不可能な「100%完全ゼロデータ」の静的ウェブサイトです。",
        updatedLabel: "最終更新日: 2026年3月10日",
        sections: [
            {
                title: "1. 100％ブラウザ内ローカル処理",
                body: "当サイトの分析機能（顔型測定やカラー分析等）はすべてユーザーの実行ブラウザ環境のみで処理されます。アップロード画像を弊社のサーバーへ送信（POST API）するコードロジック自体がソース内に一切存在せず、分析後はメモリから直ちに消去されます。",
            },
            {
                title: "2. データベースおよびトラッカーの非実装",
                body: "実際のソースコード内において、Google Analyticsなどの一般的な行動追跡ツールや、データを格納するバックエンド・データベースモジュールは一切組み込まれていません。したがって、アクセスログや識別情報の収集量は完全にゼロ（0）です。",
            },
            {
                title: "3. 広告用サードパーティCookie (Google AdSense)",
                body: "サーバー維持費用のために唯一導入されている外部スクリプトは、「Google AdSense (グーグルアドセンス)」のみです。サイト自身は一切のCookieやローカルストレージを使用しませんが、Google AdSenseのみが広告配信用にサードパーティのCookieを使用します。設定によりいつでもこのCookieはブロック可能です。",
            },
            {
                title: "4. データ収集の物理的不可能性",
                body: "システム全体に入力データを受け取るサーバーのAPI自体が実装すらされていないため、未成年者のみならず全てのユーザーの情報を当社が収集する物理的・構造的な方法は皆無です。安心してご利用ください。",
            },
        ],
    },
};

const TERMS_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "이용약관 | FINDCORE",
        description: "FINDCORE 이용약관",
        heading: "이용약관",
        intro: "FINDCORE 이용에 관한 안내입니다.",
        updatedLabel: "최종 업데이트: 2026년 3월 9일",
        sections: [
            {
                title: "결과 안내",
                body: "모든 분석 결과(감성 타입, 퍼스널 컬러, 얼굴형)는 재미와 참고를 위한 것이며, 전문적인 조언이 아닙니다.",
            },
            {
                title: "서비스 변경",
                body: "사이트의 기능은 사전 고지 없이 변경되거나 중단될 수 있습니다.",
            },
        ],
    },
    en: {
        title: "Terms of Service | FINDCORE",
        description: "FINDCORE Terms of Service",
        heading: "Terms of Service",
        intro: "Guidelines for using FINDCORE.",
        updatedLabel: "Last updated: March 9, 2026",
        sections: [
            {
                title: "About results",
                body: "All analysis results (aesthetic type, personal color, face shape) are for entertainment and reference only — not professional advice.",
            },
            {
                title: "Service changes",
                body: "Features may be changed or discontinued without prior notice.",
            },
        ],
    },
    zh: {
        title: "服务条款 | FINDCORE",
        description: "FINDCORE 服务条款",
        heading: "服务条款",
        intro: "FINDCORE 使用指南。",
        updatedLabel: "最后更新：2026年3月9日",
        sections: [
            {
                title: "关于结果",
                body: "所有分析结果（美学类型、个人色彩、脸型）仅供娱乐和参考，不构成专业建议。",
            },
            {
                title: "服务变更",
                body: "功能可能在不事先通知的情况下更改或停止。",
            },
        ],
    },
    ja: {
        title: "利用規約 | FINDCORE",
        description: "FINDCORE 利用規約",
        heading: "利用規約",
        intro: "FINDCORE のご利用にあたって。",
        updatedLabel: "最終更新日: 2026年3月9日",
        sections: [
            {
                title: "結果について",
                body: "すべての分析結果（感性タイプ、パーソナルカラー、顔型）は楽しみと参考のためであり、専門的なアドバイスではありません。",
            },
            {
                title: "サービスの変更",
                body: "機能は予告なく変更または停止されることがあります。",
            },
        ],
    },
};



const GUIDES_INDEX_COPY: Record<SupportedLang, GuideIndexCopy> = {
    ko: {
        title: "가이드 | FINDCORE",
        description: "퍼스널 컬러와 얼굴형 분석 정확도를 높이기 위한 촬영 및 해석 가이드 모음입니다.",
        heading: "분석 정확도를 높이는 가이드",
        intro: "사진 업로드형 도구는 입력 품질에 크게 영향을 받습니다. 아래 가이드를 보면 결과 해석과 촬영 조건을 더 정확하게 맞출 수 있습니다.",
        cards: [
            { href: "/guides/face-shape-photo", title: "얼굴형 분석 사진 가이드", summary: "이마, 턱선, 각도, 조명 조건을 어떻게 맞춰야 하는지 설명합니다." },
            { href: "/guides/personal-color-photo", title: "퍼스널 컬러 촬영 가이드", summary: "피부 톤 왜곡을 줄이는 조명, 배경, 보정 회피 팁을 정리했습니다." },
            { href: "/guides/result-reading", title: "결과 해석 가이드", summary: "측정값이 무엇을 뜻하는지, 어디까지 신뢰해야 하는지 설명합니다." },
        ],
    },
    en: {
        title: "Guides | FINDCORE",
        description: "Guides for improving the input quality and interpretation of FINDCORE analysis tools.",
        heading: "Guides For Better Analysis Quality",
        intro: "Image-based tools depend heavily on the quality of the uploaded input. These guides explain how to improve photo conditions and interpret outputs.",
        cards: [
            { href: "/guides/face-shape-photo", title: "Face Shape Photo Guide", summary: "How to capture forehead, jawline, angle, and lighting correctly for face-shape analysis." },
            { href: "/guides/personal-color-photo", title: "Personal Color Photo Guide", summary: "How to reduce skin-tone distortion from lighting, filters, and background color." },
            { href: "/guides/result-reading", title: "Result Reading Guide", summary: "What the measurement values mean and how much confidence to place in them." },
        ],
    },
    zh: {
        title: "指南 | FINDCORE",
        description: "帮助提升 FINDCORE 分析工具输入质量与结果解读质量的指南内容。",
        heading: "提升分析准确度的指南",
        intro: "基于照片的工具很依赖输入质量。以下内容可以帮助你改进拍摄条件，并更准确地理解结果。",
        cards: [
            { href: "/guides/face-shape-photo", title: "脸型分析拍照指南", summary: "说明额头、下颌线、角度和光线应如何拍摄。" },
            { href: "/guides/personal-color-photo", title: "个人色彩拍照指南", summary: "整理减少肤色失真的光线、背景与滤镜建议。" },
            { href: "/guides/result-reading", title: "结果解读指南", summary: "解释各测量值代表什么，以及结果应如何理解。" },
        ],
    },
    ja: {
        title: "ガイド | FINDCORE",
        description: "FINDCORE の分析精度を高めるための撮影条件と結果解釈ガイドです。",
        heading: "分析精度を高めるためのガイド",
        intro: "写真アップロード型ツールは入力品質の影響を大きく受けます。以下のガイドで、撮影条件と結果の読み方を整えられます。",
        cards: [
            { href: "/guides/face-shape-photo", title: "顔型分析の撮影ガイド", summary: "額、あごのライン、角度、照明をどう整えるべきかを説明します。" },
            { href: "/guides/personal-color-photo", title: "パーソナルカラー撮影ガイド", summary: "肌色の歪みを減らす照明、背景、補正回避のポイントをまとめています。" },
            { href: "/guides/result-reading", title: "結果の読み方ガイド", summary: "計測値の意味と、どこまで信頼すべきかを説明します。" },
        ],
    },
};

const GUIDE_FACE_SHAPE_PHOTO: Record<SupportedLang, GuidePageCopy> = {
    ko: {
        title: "얼굴형 분석 사진 가이드 | FINDCORE",
        description: "얼굴형 분석 정확도를 높이기 위한 사진 각도, 헤어라인, 조명, 프레임 구성 가이드입니다.",
        heading: "얼굴형 분석 사진 가이드",
        intro: "얼굴형 분석은 이마, 광대, 턱선을 안정적으로 읽을 수 있어야 정확도가 올라갑니다.",
        sections: [
            { title: "이마와 헤어라인", body: "앞머리를 넘기고 이마와 헤어라인이 보이게 촬영해야 이마 폭과 세로 비율 계산이 안정적입니다." },
            { title: "정면 각도", body: "고개를 들거나 숙이지 말고, 좌우 회전이 적은 정면에 가까운 구도가 좋습니다. 측면 회전이 크면 광대와 턱 폭이 왜곡됩니다." },
            { title: "프레임 구성", body: "턱선과 귀 옆 윤곽이 잘리지 않게 포함하세요. 너무 가까운 광각 셀카는 비율을 찌그러뜨릴 수 있습니다." },
            { title: "조명", body: "강한 그림자나 역광을 피하고 균일한 밝기의 조명을 사용하세요. 그림자가 심하면 윤곽 검출이 불안정해집니다." },
        ],
    },
    en: {
        title: "Face Shape Photo Guide | FINDCORE",
        description: "Guidance on angle, hairline visibility, lighting, and framing for more reliable face-shape analysis.",
        heading: "Face Shape Photo Guide",
        intro: "Face-shape analysis becomes more stable when the forehead, cheekbones, and jawline are clearly readable.",
        sections: [
            { title: "Forehead and hairline", body: "Push bangs back so the forehead and hairline remain visible. This improves forehead-width and vertical-ratio measurements." },
            { title: "Frontal angle", body: "Keep the head close to frontal without strong upward, downward, or side rotation. Rotated faces distort cheekbone and jaw width." },
            { title: "Framing", body: "Keep the jawline and side contour inside the frame. Very close wide-angle selfies can warp proportions." },
            { title: "Lighting", body: "Use even lighting and avoid hard shadows or strong backlight. Heavy shadowing makes contour detection less stable." },
        ],
    },
    zh: {
        title: "脸型分析拍照指南 | FINDCORE",
        description: "提升脸型分析稳定性的拍摄角度、发际线、光线与构图建议。",
        heading: "脸型分析拍照指南",
        intro: "当额头、颧骨和下颌线清晰可见时，脸型分析会更稳定。",
        sections: [
            { title: "额头与发际线", body: "请把刘海拨开，让额头和发际线露出，这样额头宽度和纵向比例会更稳定。" },
            { title: "正面角度", body: "尽量使用接近正面的角度，避免明显抬头、低头或左右偏转。侧转会影响颧骨与下颌宽度。" },
            { title: "构图", body: "请确保下颌线和脸部侧边轮廓完整出现在画面中。过近的广角自拍容易造成比例变形。" },
            { title: "光线", body: "使用均匀明亮的光线，避免强阴影和逆光。阴影过重会降低轮廓识别稳定性。" },
        ],
    },
    ja: {
        title: "顔型分析の撮影ガイド | FINDCORE",
        description: "顔型分析の安定性を高めるための角度、生え際、照明、構図のガイドです。",
        heading: "顔型分析の撮影ガイド",
        intro: "額、頬骨、あごのラインがはっきり読める写真ほど、顔型分析の安定性が上がります。",
        sections: [
            { title: "額と生え際", body: "前髪を上げて、額と生え際が見える状態で撮影してください。額幅と縦比率の計測が安定します。" },
            { title: "正面に近い角度", body: "上向き、下向き、左右の回転を強く付けず、正面に近い角度で撮影してください。回転が大きいと頬骨幅やあご幅が歪みます。" },
            { title: "構図", body: "あごのラインと顔の横輪郭が切れないように収めてください。極端に近い広角セルフィーは比率を歪めます。" },
            { title: "照明", body: "均一で明るい照明を使い、強い影や逆光は避けてください。影が強いと輪郭検出が不安定になります。" },
        ],
    },
};

const GUIDE_PERSONAL_COLOR: Record<SupportedLang, GuidePageCopy> = {
    ko: {
        title: "퍼스널 컬러 촬영 가이드 | FINDCORE",
        description: "피부 톤 왜곡을 줄이기 위한 퍼스널 컬러 사진 촬영 조건 가이드입니다.",
        heading: "퍼스널 컬러 촬영 가이드",
        intro: "퍼스널 컬러는 조명과 카메라 보정의 영향을 크게 받기 때문에 촬영 조건이 중요합니다.",
        sections: [
            { title: "자연광 우선", body: "가능하면 창가 자연광이나 색온도가 균일한 조명에서 촬영하세요. 형광등, 네온 조명은 피부 색을 크게 바꿀 수 있습니다." },
            { title: "필터와 보정 금지", body: "뷰티 필터, 피부 보정, 컬러 필터를 끄고 촬영해야 실제 피부 톤과 가까운 결과를 얻을 수 있습니다." },
            { title: "배경과 의상", body: "너무 강한 색 배경이나 과한 색상의 옷은 피부 인상을 바꿔 보이게 할 수 있습니다. 가능한 중성적인 환경이 좋습니다." },
            { title: "표정과 가림 최소화", body: "강한 표정, 손, 머리카락, 큰 액세서리로 얼굴이 가려지지 않게 촬영하세요." },
        ],
    },
    en: {
        title: "Personal Color Photo Guide | FINDCORE",
        description: "How to reduce skin-tone distortion when taking photos for personal color analysis.",
        heading: "Personal Color Photo Guide",
        intro: "Personal color analysis is highly sensitive to lighting and camera correction, so photo conditions matter.",
        sections: [
            { title: "Prioritize natural light", body: "Use window light or evenly balanced lighting when possible. Fluorescent or strongly colored light can shift skin tone heavily." },
            { title: "Disable filters", body: "Turn off beauty mode, smoothing, and color filters. Edited photos make skin tone sampling less reliable." },
            { title: "Neutral background and clothing", body: "Strong background colors or highly saturated clothing can visually influence skin appearance. Neutral surroundings work better." },
            { title: "Keep the face clear", body: "Avoid heavy expressions or facial obstruction from hair, hands, or large accessories." },
        ],
    },
    zh: {
        title: "个人色彩拍照指南 | FINDCORE",
        description: "减少肤色失真的个人色彩拍照条件指南。",
        heading: "个人色彩拍照指南",
        intro: "个人色彩分析对光线和相机校正非常敏感，因此拍摄条件很重要。",
        sections: [
            { title: "优先自然光", body: "尽量使用窗边自然光或色温均匀的光线。荧光灯和强烈彩色光会明显改变肤色。" },
            { title: "关闭滤镜与美颜", body: "请关闭美颜、磨皮和色彩滤镜。经过修饰的照片会降低肤色采样的可靠性。" },
            { title: "中性背景与服装", body: "过强的背景色或高饱和服装会影响肤色观感。尽量选择中性环境。" },
            { title: "保持脸部清晰", body: "避免夸张表情以及头发、手部或大饰品遮挡脸部。" },
        ],
    },
    ja: {
        title: "パーソナルカラー撮影ガイド | FINDCORE",
        description: "肌色の歪みを減らすためのパーソナルカラー撮影条件ガイドです。",
        heading: "パーソナルカラー撮影ガイド",
        intro: "パーソナルカラー分析は照明とカメラ補正の影響を強く受けるため、撮影条件が重要です。",
        sections: [
            { title: "自然光を優先", body: "できるだけ窓際の自然光や色温度が均一な照明で撮影してください。蛍光灯や色付き照明は肌色を大きく変えます。" },
            { title: "フィルターを切る", body: "美肌補正、スムージング、色フィルターはオフにしてください。補正済み写真は肌色の取得精度が下がります。" },
            { title: "背景と服装", body: "強い背景色や彩度の高い服は肌の見え方に影響します。できるだけ中立的な環境が適しています。" },
            { title: "顔をはっきり見せる", body: "大きな表情変化や、髪・手・大きなアクセサリーによる顔の遮りは避けてください。" },
        ],
    },
};

const GUIDE_RESULT_READING: Record<SupportedLang, GuidePageCopy> = {
    ko: {
        title: "결과 해석 가이드 | FINDCORE",
        description: "측정값과 추천 문구를 어디까지 신뢰하고 어떻게 읽어야 하는지 설명합니다.",
        heading: "결과 해석 가이드",
        intro: "도구형 결과는 숫자, 규칙, 입력 품질이 함께 작동합니다. 결과를 읽을 때는 측정값과 해석 문구를 구분하는 것이 중요합니다.",
        sections: [
            { title: "측정값은 무엇인가요", body: "얼굴형 분석의 길이 대비 폭, 이마 대비 턱 폭, 광대 우세도 같은 값은 실제 랜드마크 검출을 바탕으로 계산됩니다." },
            { title: "추천 문구는 무엇인가요", body: "헤어, 안경, 컨투어 추천은 측정값을 바탕으로 한 스타일 가이드입니다. 절대적인 정답이 아니라 방향 제안에 가깝습니다." },
            { title: "결과가 흔들리는 경우", body: "앞머리, 그림자, 측면 각도, 광각 왜곡, 보정 필터는 수치와 분류 결과를 흔들 수 있습니다." },
            { title: "가장 좋은 활용법", body: "한 장의 결과를 절대값으로 보기보다, 좋은 조건의 사진으로 다시 촬영해 일관성이 나오는지 확인하는 것이 좋습니다." },
        ],
    },
    en: {
        title: "Result Reading Guide | FINDCORE",
        description: "How to interpret measurements, confidence, and recommendation text in FINDCORE tool outputs.",
        heading: "Result Reading Guide",
        intro: "Tool outputs combine measurements, rule-based scoring, and input quality. It helps to separate measured values from recommendation text.",
        sections: [
            { title: "What the measurements are", body: "Values such as length-to-width ratio, forehead-to-jaw ratio, and cheekbone dominance are calculated from detected facial landmarks." },
            { title: "What the recommendations are", body: "Hair, eyewear, and contour suggestions are style guidance derived from those measurements. They are not absolute truths." },
            { title: "When results shift", body: "Bangs, shadows, side angle, wide-angle distortion, and beauty filters can all move the measured values and classification outcome." },
            { title: "Best way to use the result", body: "Do not treat one upload as a fixed identity. Repeating the test with better photos and checking consistency gives a better signal." },
        ],
    },
    zh: {
        title: "结果解读指南 | FINDCORE",
        description: "说明如何理解 FINDCORE 输出中的测量值、置信度和推荐文字。",
        heading: "结果解读指南",
        intro: "工具输出结合了测量值、规则评分和输入质量。解读时，最好把测量值与推荐文字分开理解。",
        sections: [
            { title: "什么是测量值", body: "例如长宽比、额头与下颌比、颧骨主导度等，都是基于检测到的人脸关键点计算得出的。" },
            { title: "什么是推荐内容", body: "发型、眼镜和修容建议属于基于测量值的风格指导，并不是绝对结论。" },
            { title: "结果何时会波动", body: "刘海、阴影、侧脸角度、广角畸变和美颜滤镜都可能影响测量值和分类结果。" },
            { title: "最佳使用方式", body: "不要把单次上传视为固定结论。用更好的照片重复测试并观察结果是否一致，会更有参考价值。" },
        ],
    },
    ja: {
        title: "結果の読み方ガイド | FINDCORE",
        description: "FINDCORE の出力にある計測値、信頼度、提案文をどう読むべきかを説明します。",
        heading: "結果の読み方ガイド",
        intro: "ツールの結果は、計測値、ルールベースの評価、入力品質が組み合わさって作られます。数値と提案文は分けて読むのが有効です。",
        sections: [
            { title: "計測値とは", body: "縦横比、額とあごの比率、頬骨の優位性などの値は、検出された顔ランドマークから計算されています。" },
            { title: "提案文とは", body: "ヘア、眼鏡、コントゥアの提案は、計測値をもとにしたスタイルガイドです。絶対的な正解ではありません。" },
            { title: "結果がぶれる場合", body: "前髪、影、横向きの角度、広角歪み、美肌フィルターは、数値や分類結果を変動させる要因になります。" },
            { title: "おすすめの使い方", body: "1回のアップロード結果を固定的に捉えず、条件の良い写真で再試行し、一貫性があるか確認するのが有効です。" },
        ],
    },
};

export function getFooterLabels(lang: SupportedLang) {
    return FOOTER_LABELS[lang];
}

export function buildPageMetadata(lang: SupportedLang, copy: PageCopy | GuideIndexCopy | GuidePageCopy): Metadata {
    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical: `https://findcore.me`,
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
