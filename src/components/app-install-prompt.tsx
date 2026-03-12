"use client";

import { useEffect, useMemo, useState } from "react";

type SupportedLang = "ko" | "en" | "zh" | "ja";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "findcore-install-dismissed-at";
const DISMISS_TTL = 1000 * 60 * 60 * 24 * 3;

function resolveLanguage(): SupportedLang {
    if (typeof window === "undefined") {
        return "en";
    }

    const lang = new URLSearchParams(window.location.search).get("lang");
    return ["ko", "en", "zh", "ja"].includes(lang || "") ? (lang as SupportedLang) : "en";
}

function isStandaloneMode() {
    if (typeof window === "undefined") {
        return false;
    }

    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

export function AppInstallPrompt() {
    const [lang] = useState<SupportedLang>(() => resolveLanguage());
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isStandaloneMode()) {
            return;
        }

        const handleBeforeInstallPrompt = (event: Event) => {
            // Re-check localStorage inside the handler to account for dismissals in other tabs
            const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
            if (dismissedAt && Date.now() - Number(dismissedAt) < DISMISS_TTL) {
                return;
            }

            event.preventDefault();
            setInstallEvent(event as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        const handleInstalled = () => {
            setInstallEvent(null);
            setIsVisible(false);
        };

        const handleFocus = () => {
            const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
            if (dismissedAt && Date.now() - Number(dismissedAt) < DISMISS_TTL) {
                setIsVisible(false);
            }
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleInstalled);
        window.addEventListener("focus", handleFocus);

        // Also check immediately in case it was already dismissed before mounting
        handleFocus();

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleInstalled);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const copy = useMemo(
        () =>
            ({
                ko: {
                    title: "FINDCORE 앱으로 설치",
                    description: "홈 화면에 추가하면 더 빠르게 열리고, 캐시된 화면은 오프라인에서도 다시 볼 수 있습니다.",
                    install: "설치",
                    dismiss: "나중에",
                },
                en: {
                    title: "Install FINDCORE",
                    description: "Add it to your home screen for faster launch and better offline reuse.",
                    install: "Install",
                    dismiss: "Later",
                },
                zh: {
                    title: "安装 FINDCORE",
                    description: "添加到主屏幕后打开更快，缓存页面也更容易离线再次使用。",
                    install: "安装",
                    dismiss: "稍后",
                },
                ja: {
                    title: "FINDCORE をインストール",
                    description: "ホーム画面に追加すると、起動が速くなりキャッシュ済み画面も再利用しやすくなります。",
                    install: "インストール",
                    dismiss: "あとで",
                },
            })[lang],
        [lang]
    );

    const handleDismiss = () => {
        window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
        setIsVisible(false);
    };

    const handleInstall = async () => {
        if (!installEvent) {
            return;
        }

        await installEvent.prompt();
        const result = await installEvent.userChoice;

        if (result.outcome === "accepted") {
            setIsVisible(false);
            setInstallEvent(null);
            return;
        }

        handleDismiss();
    };

    if (!isVisible || !installEvent) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-x-4 bottom-4 z-80 flex justify-center">
            <div className="pointer-events-auto w-full max-w-md rounded-[1.75rem] border border-white/12 bg-black/78 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <p className={`text-sm font-semibold text-white ${lang === "ko" ? "font-korean break-keep" : ""}`}>{copy.title}</p>
                <p className={`mt-2 text-sm leading-6 text-white/68 ${lang === "ko" ? "font-korean break-keep" : ""}`}>{copy.description}</p>
                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleInstall}
                        className={`inline-flex flex-1 items-center justify-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 ${lang === "ko" ? "font-korean" : ""}`}
                    >
                        {copy.install}
                    </button>
                    <button
                        type="button"
                        onClick={handleDismiss}
                        className={`inline-flex flex-1 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/12 ${lang === "ko" ? "font-korean" : ""}`}
                    >
                        {copy.dismiss}
                    </button>
                </div>
            </div>
        </div>
    );
}
