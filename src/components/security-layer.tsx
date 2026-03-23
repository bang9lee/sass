"use client";

import React, { useEffect } from "react";

/**
 * Advanced SecurityLayer Component
 * 1. Loalhost Bypass: Disables all blocking for the developer on local machine.
 * 2. Shortcut/ContextMenu Blocker: Standard deterrents.
 * 3. Debugger Guard: Constantly pauses execution if DevTools is open.
 */
export const SecurityLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // SECURITY CHECK: Skip all security measures if on localhost (Developer Friendly)
    const isLocalhost = 
      typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname.includes('192.168.'));

    if (isLocalhost) {
      console.log("🛡️ SECURITY LAYER: Local environment detected. Security measures DISABLED.");
      return;
    }

    // --- FROM THIS POINT: PRODUCTION SECURITY MEASURES ---

    // 1. Disable Right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable common DevTools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl+Shift+I (DevTools)
      // Ctrl+Shift+J (Console)
      // Ctrl+Shift+C (Inspect Element)
      // Ctrl+U (View Source)
      if (
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };

    // 3. Debugger Guard: Pauses the browser if DevTools is open.
    // This makes the site unusable for anyone trying to inspect the logic.
    const debuggerInterval = setInterval(() => {
      (function() {
        // Obfuscated execution to deter simple searching
        (function() {
          const startTime = new Date().getTime();
          debugger;
          const endTime = new Date().getTime();
          // If the difference is > 100ms, it likely means they were paused by the debugger
          if (endTime - startTime > 100) {
            // They are actively debugging
          }
        })();
      })();
    }, 1000);

    // 4. Console Cleansing
    const consoleInterval = setInterval(() => {
      console.clear();
      console.log("%c🛑 ATTENTION", "color: red; font-size: 30px; font-weight: bold;");
      console.log("%cThis area is restricted. Any attempt to inspect the source code is prohibited.", "font-size: 16px;");
    }, 2000);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(debuggerInterval);
      clearInterval(consoleInterval);
    };
  }, []);

  return <>{children}</>;
};
