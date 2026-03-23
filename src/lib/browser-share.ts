export function buildAbsoluteShareUrl(path: string) {
    if (typeof window === "undefined") {
        return "";
    }

    return `${window.location.origin}${path}`;
}

export async function shareUrl(url: string) {
    if (typeof navigator === "undefined" || !navigator.share) {
        return false;
    }

    try {
        await navigator.share({ url });
        return true;
    } catch (error) {
        if ((error as Error).name === "AbortError") {
            return true;
        }
        console.error("Native share failed:", error);
        return false;
    }
}

export async function copyText(text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fall through to legacy copy path.
        }
    }

    if (typeof document === "undefined") {
        return false;
    }

    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);
        return copied;
    } catch {
        return false;
    }
}
