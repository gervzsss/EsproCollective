import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollToTop, InstallAppModal } from "@/components";
import { useInstallPrompt } from "@/features/pwa";

// Routes where we don't show the install prompt
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/"];

export function LayoutWrapper() {
  const location = useLocation();
  const { platform, canPrompt, shouldShowInstallUI, promptInstall, dismiss } = useInstallPrompt();

  const [hasDelayPassed, setHasDelayPassed] = useState(false);

  // Determine if we're on an auth route
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  // Derive showModal from other state (no setState in effect)
  const showModal = useMemo(() => {
    return !isAuthRoute && shouldShowInstallUI && hasDelayPassed;
  }, [isAuthRoute, shouldShowInstallUI, hasDelayPassed]);

  // Trigger delay timer when conditions are met
  useEffect(() => {
    if (!isAuthRoute && shouldShowInstallUI && !hasDelayPassed) {
      const timer = setTimeout(() => {
        setHasDelayPassed(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthRoute, shouldShowInstallUI, hasDelayPassed]);

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      // Modal will close automatically via shouldShowInstallUI becoming false
    }
  };

  const handleClose = () => {
    dismiss();
    // Modal will close automatically via shouldShowInstallUI becoming false
  };

  return (
    <>
      <ScrollToTop />
      <Outlet />
      <InstallAppModal open={showModal} platform={platform} canInstall={canPrompt} onInstall={handleInstall} onClose={handleClose} />
    </>
  );
}
