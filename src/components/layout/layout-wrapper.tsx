import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components";

export function LayoutWrapper() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
