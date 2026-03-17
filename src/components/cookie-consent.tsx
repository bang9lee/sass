"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { getCookieConsentLabels } from "@/lib/site-content";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

const CONSENT_COOKIE_NAME = "fdc-cookie-consent";

export function CookieConsent() {
    const { lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const labels = getCookieConsentLabels(lang);

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_COOKIE_NAME);
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_COOKIE_NAME, "accepted");
        setIsVisible(false);
        // Dispatch custom event to trigger script loading
        window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_COOKIE_NAME, "declined");
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-100 w-full"
                >
                    <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm px-8 py-4 md:py-[18px]">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                            
                            {/* Content Side */}
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left flex-1">
                                <div className="flex items-center gap-3 h-full">
                                    <Cookie className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span className="text-[11px] font-cinzel font-bold text-white tracking-widest uppercase items-center flex gap-1.5 whitespace-nowrap leading-none pb-px">
                                        {labels.title}
                                    </span>
                                </div>
                                <span className="hidden md:block text-white/20 leading-none h-full">|</span>
                                <div className="flex flex-col md:flex-row items-center gap-2 leading-none h-full">
                                    <p className="text-[11px] text-white/70 font-medium leading-none">
                                        {labels.description}
                                    </p>
                                    <Link 
                                        href={`/privacy?lang=${lang}`}
                                        className="text-[11px] text-amber-500 hover:text-amber-400 transition-colors font-bold tracking-tight underline underline-offset-4 decoration-amber-500/30 leading-none"
                                    >
                                        {labels.privacy}
                                    </Link>
                                </div>
                            </div>

                            {/* Action Side */}
                            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:w-auto md:px-6 h-9 rounded-lg bg-white/5 border border-white/10 text-white text-[11px] font-bold tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center leading-none"
                                >
                                    {labels.decline}
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 md:w-auto md:px-6 h-9 rounded-lg bg-amber-500 text-black text-[11px] font-bold tracking-wider uppercase hover:bg-amber-400 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap leading-none"
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    {labels.accept}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
