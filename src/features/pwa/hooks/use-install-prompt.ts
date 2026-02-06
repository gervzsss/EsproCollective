import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const DISMISS_KEY = "espro-install-dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Detects if the app is running in standalone mode (installed PWA)
 */
function isStandalone(): boolean {
  // Check display-mode media query (works on most browsers)
  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;

  // iOS Safari fallback
  const iosStandalone = "standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true;

  return displayModeStandalone || iosStandalone;
}

/**
 * Detects if the user is on iOS (Safari)
 */
function isIOS(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) && !/crios|fxios|edgios|opr\//.test(userAgent);
}

/**
 * Checks if the user dismissed the prompt recently
 */
function isDismissedRecently(): boolean {
  const dismissedAt = localStorage.getItem(DISMISS_KEY);
  if (!dismissedAt) return false;

  const dismissedTime = parseInt(dismissedAt, 10);
  const now = Date.now();

  return now - dismissedTime < DISMISS_DURATION_MS;
}

/**
 * Hook for managing PWA install prompt
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Use lazy initialization to avoid setState in effects
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;
    return isStandalone();
  });

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return isDismissedRecently();
  });

  const [platform] = useState<"ios" | "android" | "unknown">(() => {
    if (typeof window === "undefined") return "unknown";
    if (isIOS()) return "ios";
    return "android"; // Treat all non-iOS as "android" (Chromium-based)
  });

  // Listen for beforeinstallprompt event (Android/Chromium)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Trigger the install prompt (Android/Chromium only)
  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
      }

      // Clear the deferred prompt (can only be used once)
      setDeferredPrompt(null);

      return choiceResult.outcome === "accepted";
    } catch {
      return false;
    }
  }, [deferredPrompt]);

  // Dismiss the prompt for 7 days
  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setIsDismissed(true);
  }, []);

  // Can we show the install prompt?
  const canPrompt = deferredPrompt !== null;

  // Should we show the install UI?
  const shouldShowInstallUI = !isInstalled && !isDismissed && (platform === "ios" || canPrompt);

  return {
    platform,
    canPrompt,
    isInstalled,
    isDismissed,
    shouldShowInstallUI,
    promptInstall,
    dismiss,
  };
}
