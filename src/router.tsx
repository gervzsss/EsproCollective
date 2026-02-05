import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, SignupPage, ForgotPasswordPage } from "@/features/auth";
import { HomePage } from "@/features/home";
import { ProfilePage, EditProfilePage, SettingsPage } from "@/features/profile";
import { LoyaltyCardPage, TierProgressionPage } from "@/features/loyalty";
import { RewardsMarketplacePage, RewardsHistoryPage } from "@/features/rewards";
import { GamesPage } from "@/features/games";
import { PaymentsPage } from "@/features/payments";
import { LayoutWrapper } from "@/components/layout";

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
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
