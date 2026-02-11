/**
 * Shared mock user data for the entire application.
 * This ensures consistent sample data across all features/pages.
 * TODO: Replace with real user data from authentication/profile context.
 */

export const mockUser = {
  firstName: "Gervy",
  lastName: "Masbate",
  fullName: "Gervy Masbate",
  email: "gervy.masbate@espro.com",
  phone: "+1 (555) 234-5678",
  birthday: "12 / 05 / 1994",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBuHpBDCxZ-QdO6yVPsw583PtiCeFo0WTpgqrrhjdUwi18TiNnQ5e19SV08sCCd7q12KbqpPZN0oYOzM-o_xyBViyU4fQEpvhO3bm6AYpavPYw2jgcs0SfKoLKbMGqb5mLhomtemCRGczZ7d6AlHwPE_PD9VUZsfAFliQWus3wmWIxqvrlqUH6SOn0zyaAB72T8FIbcRPzh7kEliJMIKbinsHjfZsvksWq_FEZ8DvEdYGlzs8sLOaZv31zmuxqMtjSsW9edTfXu2pBW",
  tierName: "Espro Elite Member",
  memberSince: "2023",
};

export const mockMember = {
  ...mockUser,
  tierIcon: "workspace_premium",
  pointsBalance: 1250,
  pointsProgressPct: 69,
  nextLevelPoints: 1300,
  progressPct: 80,
  benefits: ["Free Add-on", "Espro Elite"],
  rewardsAvailableCount: 4,
  pointsValidityText: "Points valid for 12 months",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=ESPRO-MEMBER-12345&margin=0",
  levelStatus: "Level 3 Status",
  ptsToNextLevel: 250,
  nextRewardHint: "50 points away from a Free Latte!",
  bannerImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNlmaM9tQ6yvVvenQn7o_z-6n2_jUv-4tyNt1j_NIyq5XLdG24MqP5-yWEP9RbJw41x8nTR8_O1JiN4Ft3sBVQ4S7yunt72OWph2iLpM9lxMeI3FuyWFAwnui9fQZxoMLzUgwdxJLZDV0vpfsZHsmzaVayYFU0ky5kXcY501tFGFUbSG9bBGpUQINQZWHALUcxu9LugjqQl1sVMnFnOQXtpdcXzsW8_pYZ_ysls_57tfvaH6iJCW6dqyOR0Hf6BrJnbCWV8VQsCDVc",
};
