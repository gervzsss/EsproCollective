import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { InstallAppModal } from "@/components";
import { useInstallPrompt } from "../hooks";

// Routes where we don't show the auto-install prompt
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/"];

type OpenReason = "auto" | "manual";

interface InstallModalContextValue {
  openInstallModal: (reason: OpenReason) => void;
  closeInstallModal: () => void;
}

const InstallModalContext = createContext<InstallModalContextValue | undefined>(undefined);

export function InstallModalProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { platform, canPrompt, shouldShowInstallUI, promptInstall, dismiss } = useInstallPrompt();

  const [openReason, setOpenReason] = useState<OpenReason | null>(null);
  const [hasDelayPassed, setHasDelayPassed] = useState(false);

  // Determine if we're on an auth route
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  // Auto-open eligibility (respects dismissal)
  const autoEligible = useMemo(() => {
    return !isAuthRoute && shouldShowInstallUI && hasDelayPassed;
  }, [isAuthRoute, shouldShowInstallUI, hasDelayPassed]);

  // Modal is open if either auto-eligible or manually opened
  const isOpen = useMemo(() => {
    if (openReason === "manual") return true;
    if (openReason === "auto") return autoEligible;
    return autoEligible; // Default: show if auto-eligible
  }, [openReason, autoEligible]);

  // Trigger delay timer when auto conditions are met
  useEffect(() => {
    if (!isAuthRoute && shouldShowInstallUI && !hasDelayPassed) {
      const timer = setTimeout(() => {
        setHasDelayPassed(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthRoute, shouldShowInstallUI, hasDelayPassed]);

  const openInstallModal = useCallback((reason: OpenReason) => {
    setOpenReason(reason);
  }, []);

  const closeInstallModal = useCallback(() => {
    // Only dismiss (suppress for 7 days) if this was an auto-open
    if (openReason === "auto") {
      dismiss();
    }
    setOpenReason(null);
  }, [openReason, dismiss]);

  const handleInstall = useCallback(async () => {
    const installed = await promptInstall();
    if (installed) {
      setOpenReason(null);
    }
  }, [promptInstall]);

  const contextValue = useMemo(
    () => ({
      openInstallModal,
      closeInstallModal,
    }),
    [openInstallModal, closeInstallModal],
  );

  return (
    <InstallModalContext.Provider value={contextValue}>
      {children}
      <InstallAppModal open={isOpen} platform={platform} canInstall={canPrompt} onInstall={handleInstall} onClose={closeInstallModal} />
    </InstallModalContext.Provider>
  );
}

export function useInstallModal() {
  const context = useContext(InstallModalContext);
  if (!context) {
    throw new Error("useInstallModal must be used within InstallModalProvider");
  }
  return context;
}
