"use client";

import { useEffect } from "react";
import { AppInstallPrompt } from "@/components/app-install-prompt";
import { HERO_IMAGE_SOURCES } from "@/lib/hero-images";

export function AppRuntime() {
    useEffect(() => {
        const preloadHeroImages = () => {
            HERO_IMAGE_SOURCES.forEach((src) => {
                const image = new window.Image();
                image.decoding = "async";
                image.src = src;
            });
        };

        const idleHandle =
            typeof window.requestIdleCallback === "function"
                ? window.requestIdleCallback(preloadHeroImages, { timeout: 1500 })
                : window.setTimeout(preloadHeroImages, 250);

        if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
            window.addEventListener(
                "load",
                () => {
                    navigator.serviceWorker.register("/sw.js").catch((error) => {
                        console.warn("Service worker registration failed:", error);
                    });
                },
                { once: true }
            );
        }

        return () => {
            if (typeof idleHandle === "number") {
                if (typeof window.cancelIdleCallback === "function") {
                    window.cancelIdleCallback(idleHandle);
                } else {
                    window.clearTimeout(idleHandle);
                }
            }
        };
    }, []);

    return <AppInstallPrompt />;
}
