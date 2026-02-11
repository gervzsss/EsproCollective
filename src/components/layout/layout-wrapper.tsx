import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components";
import { InstallModalProvider } from "@/features/pwa";

export function LayoutWrapper() {
  return (
    <InstallModalProvider>
      <ScrollToTop />
      <Outlet />
    </InstallModalProvider>
  );
}
