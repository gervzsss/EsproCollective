import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import { ThemeProvider } from "./contexts";

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
