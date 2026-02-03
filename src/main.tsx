import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { router } from "./router";
import { ThemeProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
