"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_COOKIE_NAME = "fdc-cookie-consent";

export function GoogleAdSense() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const consent = localStorage.getItem(CONSENT_COOKIE_NAME);
            if (consent === "accepted") {
                setShouldLoad(true);
            } else {
                setShouldLoad(false);
            }
        };

        // Initial check
        checkConsent();

        // Listen for updates from the CookieConsent component
        window.addEventListener("cookie-consent-updated", checkConsent);
        
        return () => {
            window.removeEventListener("cookie-consent-updated", checkConsent);
        };
    }, []);

    if (!shouldLoad) return null;

    return (
        <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7537131530412793"
            crossOrigin="anonymous"
        />
    );
}
