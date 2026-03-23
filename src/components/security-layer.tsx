"use client";

import React, { useEffect } from "react";

/**
 * SecurityLayer Component
 * Provides a client-side deterrent against inspection (F12, Right-click, etc.).
 */
export const SecurityLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
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

    // 3. Optional: Detection loop (causes debugger pause if DevTools is open)
    // Note: This can be annoying for some users, so we'll skip the loop for now 
    // to maintain a premium feel. We just focus on the shortcuts.

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};
