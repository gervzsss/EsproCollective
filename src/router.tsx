import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import RewardsMarketplacePage from "./pages/RewardsMarketplacePage";
import RewardsHistoryPage from "./pages/RewardsHistoryPage";
import LoyaltyCardPage from "./pages/LoyaltyCardPage";
import GamesPage from "./pages/GamesPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import TierProgressionPage from "./pages/TierProgressionPage";
import SettingsPage from "./pages/SettingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      // Auth routes
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      // Main app routes
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/rewards",
        element: <RewardsMarketplacePage />,
      },
      {
        path: "/rewards/history",
        element: <RewardsHistoryPage />,
      },
      {
        path: "/rewards/:rewardId",
        element: <RewardsMarketplacePage />, // Placeholder - could be a detail page
      },
      {
        path: "/card",
        element: <LoyaltyCardPage />,
      },
      {
        path: "/games",
        element: <GamesPage />,
      },
      {
        path: "/tiers",
        element: <TierProgressionPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/edit",
        element: <EditProfilePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/payments",
        element: <PaymentsPage />,
      },
    ],
  },
]);
