import type { Metadata } from "next";
import Link from "next/link";
import { resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);

    const copy = {
        ko: {
            title: "오프라인 상태 | FINDCORE",
            description: "인터넷 연결을 확인한 뒤 다시 시도해 주세요.",
        },
        en: {
            title: "Offline | FINDCORE",
            description: "Check your connection and try again.",
        },
        zh: {
            title: "当前离线 | FINDCORE",
            description: "请检查网络连接后再试。",
        },
        ja: {
            title: "オフラインです | FINDCORE",
            description: "通信状況を確認してから再試行してください。",
        },
    }[currentLang];

    return {
        title: copy.title,
        description: copy.description,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
            },
        },
    };
}

export default async function OfflinePage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";

    const copy = {
        ko: {
            eyebrow: "PWA 오프라인 화면",
            title: "지금은 인터넷 연결이 없습니다",
            description: "이미 열어둔 페이지는 캐시로 볼 수 있지만, 새 페이지를 불러오려면 연결이 필요합니다.",
            retry: "홈으로 돌아가기",
        },
        en: {
            eyebrow: "PWA offline screen",
            title: "You appear to be offline",
            description: "Cached pages may still open, but new pages need a live connection.",
            retry: "Back to home",
        },
        zh: {
            eyebrow: "PWA 离线页面",
            title: "当前似乎处于离线状态",
            description: "已缓存页面仍可打开，但新页面需要网络连接。",
            retry: "返回首页",
        },
        ja: {
            eyebrow: "PWA オフライン画面",
            title: "現在オフラインのようです",
            description: "キャッシュ済みのページは開けますが、新しいページの読み込みには通信が必要です。",
            retry: "ホームに戻る",
        },
    }[currentLang];

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(236,72,153,0.14),transparent_30%)]" />
            <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <p className={`text-sm uppercase tracking-[0.3em] text-cyan-200/80 ${textClass}`}>{copy.eyebrow}</p>
                <h1 className={`mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${textClass}`}>{copy.title}</h1>
                <p className={`mt-4 text-base leading-7 text-white/68 ${textClass}`}>{copy.description}</p>
                <Link
                    href={`/?lang=${currentLang}`}
                    className={`mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/16 ${textClass}`}
                >
                    {copy.retry}
                </Link>
            </div>
        </main>
    );
}
