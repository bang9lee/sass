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
    ja: { home: "ホーム", aesthetic: "感性テスト", color: "パーソ널 컬러", faceShape: "AI 顔型分析" },
};

const ABOUT_COPY: Record<SupportedLang, PageCopy> = {
    ko: {
        title: "FINDCORE 소개",
        description: "FINDCORE - 감성 테스트, 퍼스널 컬러, 얼굴형 분석 도구",
        heading: "FINDCORE",
        intro: "FINDCORE는 Today's Studio가 운영하는 스타일 탐색 사이트입니다. 감성 테스트, 퍼스널 컬러 분석, AI 얼굴형 분석을 제공하고, 결과를 더 잘 이해할 수 있도록 가이드 문서도 함께 운영합니다.",
        sections: [
            {
                title: "무엇을 제공하나요",
                body: "질문 기반 감성 테스트, 사진 기반 퍼스널 컬러 분석, AI 얼굴형 분석을 제공합니다. 단순히 결과 카드만 보여주는 데서 끝내지 않고, 촬영 조건과 해석 기준까지 함께 볼 수 있게 가이드도 같이 제공합니다.",
            },
            {
                title: "어떻게 작동하나요",
                body: "업로드형 도구는 브라우저 안에서 사진을 읽고, 프레임과 랜드마크를 바탕으로 비율이나 색 인상 신호를 계산합니다. 얼굴형은 보정 페이지에서 손본 프레임이 최종 입력으로 반영되고, 퍼스널 컬러는 조명과 자동 보정의 영향을 크게 받습니다.",
            },
            {
                title: "무엇을 약속하지 않나요",
                body: "FINDCORE는 외모에 대한 절대 평가나 전문 진단을 제공하지 않습니다. 결과는 스타일 참고와 자기 탐색을 돕기 위한 정보이며, 의료·채용·심리 같은 고위험 판단을 대신하지 않습니다.",
            },
            {
                title: "운영과 문의",
                body: `${PUBLISHER_PROFILE.operatorName} 운영 · 사이트: https://findcore.me · 텔레그램: ${PUBLISHER_PROFILE.telegramHandle}`,
            },
        ],
    },
    en: {
        title: "About FINDCORE",
        description: "FINDCORE - Aesthetic test, personal color analysis, and AI face shape tools.",
        heading: "FINDCORE",
        intro: "A style discovery site offering aesthetic diagnosis, personal color analysis, and AI face-shape measurement. The goal is not only to generate outputs quickly, but also to provide the reference material needed to interpret them well.",
        sections: [
            {
                title: "What the site offers",
                body: "FINDCORE provides a prompt-based aesthetic test, photo-based personal color analysis, and AI face-shape analysis. The site also includes guide documents so users can improve input quality and interpret results more carefully.",
            },
            {
                title: "How it works",
                body: "Upload-based tools read the image in the browser and calculate proportion or skin-appearance signals from frames and landmarks. Face-shape analysis reflects manual frame correction, while personal-color analysis is especially sensitive to lighting and automatic camera correction.",
            },
            {
                title: "What it does not promise",
                body: "FINDCORE does not provide absolute judgments on appearance or replace professional diagnosis. The outputs are style-reference coordinates, not medical, hiring, or psychological conclusions.",
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
        intro: "提供美学类型诊断、个人色彩分析和 AI 脸型测量的风格探索网站。我们的目标不只是快速给出结果，也希望提供足够的参考文档帮助用户正确理解结果。",
        sections: [
            {
                title: "网站提供什么",
                body: "FINDCORE 提供问答式美学测试、基于照片的个人色彩分析，以及 AI 脸型分析。同时也提供指南文档，帮助用户提升输入质量并更谨慎地理解结果。",
            },
            {
                title: "它如何工作",
                body: "上传型工具会在浏览器中读取图片，并根据框线、关键点或皮肤观感信号进行计算。脸型分析会把手动框线校正纳入最终输入，个人色彩分析则对光线与相机自动修正特别敏感。",
            },
            {
                title: "它不承诺什么",
                body: "FINDCORE 不提供对外貌的绝对评价，也不替代专业诊断。结果更适合作为风格参考坐标，而不是医疗、招聘或心理判断。",
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
        intro: "感性タイプ診断、パーソナルカラー分析、AI顔型測定を提供するスタイル探索サイトです。結果を素早く出すだけでなく、結果を理解するための参照文書もあわせて提供します。",
        sections: [
            {
                title: "何を提供しているか",
                body: "FINDCORE では、質問ベースの感性テスト、写真ベースのパーソナルカラー分析、AI 顔型分析を提供しています。さらに、入力条件や結果の読み方を補うためのガイド文書も公開しています。",
            },
            {
                title: "どのように動くか",
                body: "アップロード型ツールはブラウザ内で画像を読み取り、フレームやランドマーク、肌印象シグナルをもとに計算します。顔型は手動フレーム補正が最終入力に反映され、パーソナルカラーは照明と自動補正の影響を強く受けます。",
            },
            {
                title: "何を約束しないか",
                body: "FINDCORE は外見への絶対評価や専門診断を提供するものではありません。結果はスタイル参考の座標であり、医療・採用・心理判断を置き換えるものではありません。",
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
        intro: "이 문서는 FINDCORE에서 어떤 정보가 처리되는지, 그리고 운영자인 Today's Studio가 어떤 범위까지 관여하는지 설명합니다.",
        updatedLabel: "Today's Studio 운영 · 2026년 3월 10일 업데이트",
        sections: [
            {
                title: "1. 분석은 브라우저 안에서 진행됩니다",
                body: "FINDCORE의 얼굴형 분석과 퍼스널 컬러 분석은 사용자의 브라우저 안에서 실행됩니다. 업로드 이미지를 서버로 보내 처리하는 별도 API 흐름은 두고 있지 않습니다.",
            },
            {
                title: "2. 운영자가 별도 분석 추적을 두고 있지 않습니다",
                body: "현재 FINDCORE는 Today's Studio가 운영하며, 일반적인 방문 분석 툴이나 사용자 행동 추적 스크립트를 기본 구조로 두고 있지 않습니다. 또한 사용자 사진을 저장하기 위한 전용 백엔드 데이터베이스도 운영하지 않습니다.",
            },
            {
                title: "3. Google AdSense가 제3자 쿠키를 사용할 수 있습니다",
                body: "사이트 운영 과정에서 Google AdSense가 적용될 수 있으며, 이 경우 광고 송출을 위해 제3자 쿠키가 사용될 수 있습니다. 원치 않으시면 브라우저 설정에서 쿠키를 제한하거나 차단하실 수 있습니다.",
            },
            {
                title: "4. 민감한 정보 입력은 권장하지 않습니다",
                body: "분석 도구는 스타일 참고용 서비스입니다. 실명, 연락처, 건강정보처럼 민감한 정보를 이미지나 입력값에 포함해 사용하지 않으시길 권장합니다. 아동 사진을 사용할 때에도 보호자가 촬영 조건과 공개 여부를 충분히 확인해 주세요.",
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
        intro: "이 문서는 FINDCORE를 사용할 때 기본으로 알아두셔야 할 범위와 책임 기준을 정리한 안내입니다.",
        updatedLabel: "Today's Studio 운영 · 2026년 3월 9일 업데이트",
        sections: [
            {
                title: "1. 결과는 참고용입니다",
                body: "감성 테스트, 퍼스널 컬러 분석, 얼굴형 분석 결과는 스타일 참고를 위한 정보입니다. 의료, 채용, 심리 평가처럼 중요한 판단을 대신하는 용도로 사용할 수 없습니다.",
            },
            {
                title: "2. 서비스 내용은 바뀔 수 있습니다",
                body: "Today's Studio는 서비스 품질 개선이나 운영 사정에 따라 기능, 문구, 결과 표현 방식을 변경하거나 일부 기능을 중단할 수 있습니다.",
            },
            {
                title: "3. 오용과 무단 이용은 제한됩니다",
                body: "서비스를 자동화 도구로 과도하게 호출하거나, 정상 사용 범위를 벗어나 시스템에 부담을 주는 방식으로 이용하는 행위는 제한될 수 있습니다.",
            },
            {
                title: "4. 책임 범위",
                body: "운영자는 결과 해석 방식이나 촬영 조건 차이로 생기는 개인별 편차를 모두 보장할 수 없습니다. 사용자는 결과를 참고 자료로 활용하고, 실제 적용은 본인의 판단 아래 진행해야 합니다.",
            },
            {
                title: "5. 운영 주체와 문의",
                body: `${PUBLISHER_PROFILE.operatorName} 운영 · 사이트: https://findcore.me · 텔레그램: ${PUBLISHER_PROFILE.telegramHandle}`,
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
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
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
