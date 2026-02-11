import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell, TopBar, BottomNav } from "@/components/layout";
import { ConfirmDialog } from "@/components/ui";
import { useTheme } from "@/contexts";
import { useInstallPrompt, useInstallModal } from "@/features/pwa";

// Mock data
const profile = {
  fullName: "Alex Thorne",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBuHpBDCxZ-QdO6yVPsw583PtiCeFo0WTpgqrrhjdUwi18TiNnQ5e19SV08sCCd7q12KbqpPZN0oYOzM-o_xyBViyU4fQEpvhO3bm6AYpavPYw2jgcs0SfKoLKbMGqb5mLhomtemCRGczZ7d6AlHwPE_PD9VUZsfAFliQWus3wmWIxqvrlqUH6SOn0zyaAB72T8FIbcRPzh7kEliJMIKbinsHjfZsvksWq_FEZ8DvEdYGlzs8sLOaZv31zmuxqMtjSsW9edTfXu2pBW",
  tierName: "Espro Elite Member",
  memberSince: "2023",
};

const accountSettings = [
  {
    id: "personal",
    label: "Personal Information",
    iconName: "person",
    to: "/profile/edit",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "payments",
    label: "Payment Methods",
    iconName: "credit_card",
    to: "/payments",
    bgColor: "bg-green-50 dark:bg-green-500/10",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    iconName: "shield",
    to: "/settings",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400",
  },
];

const activityItems = [
  {
    id: "points",
    label: "Points History",
    iconName: "loyalty",
    to: "/rewards/history",
    subtitle: "+120 pts earned this week",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "orders",
    label: "Order History",
    iconName: "history",
    to: "/orders",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isInstalled } = useInstallPrompt();
  const { openInstallModal } = useInstallModal();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleInstallClick = () => {
    if (!isInstalled) {
      openInstallModal("manual");
    }
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    // Clear auth state here in real app
    navigate("/login");
  };

  return (
    <AppShell>
      <TopBar
        title="Profile"
        leftAction="back"
        rightAction={
          <Link to="/settings" className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </Link>
        }
      />

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-md">
          {/* Profile Header */}
          <div className="flex flex-col items-center px-6 pt-4 pb-8">
            <div className="relative mb-4">
              <div
                className="aspect-square size-28 rounded-full border-4 border-white bg-cover bg-center bg-no-repeat shadow-2xl dark:border-white/10"
                style={{ backgroundImage: `url("${profile.avatarUrl}")` }}
              />
              <div className="bg-primary dark:border-background-dark absolute right-0 bottom-0 flex items-center justify-center rounded-full border-2 border-white p-1.5 text-white shadow-md">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="font-display text-accent-dark text-2xl font-extrabold tracking-tight dark:text-white">{profile.fullName}</h1>
              <div className="bg-primary/10 dark:bg-primary/20 mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5">
                <span className="material-symbols-outlined text-primary active-icon text-[18px]">stars</span>
                <p className="text-primary text-xs font-bold tracking-wider uppercase">{profile.tierName}</p>
              </div>
              <p className="mt-3 text-xs font-medium text-[#9e7147] dark:text-white/40">Member of Espro Collective since {profile.memberSince}</p>
            </div>
          </div>

          <div className="space-y-8 px-5">
            {/* Account Settings Section */}
            <section>
              <h3 className="text-accent-dark/40 mb-3 px-1 text-[11px] font-bold tracking-[0.15em] uppercase dark:text-white/40">Account Settings</h3>
              <div className="overflow-hidden rounded-2xl border border-black/3 bg-white shadow-sm dark:border-white/3 dark:bg-white/5">
                {accountSettings.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${
                      index < accountSettings.length - 1 ? "border-b border-black/3 dark:border-white/5" : ""
                    }`}
                  >
                    <div className={`${item.bgColor} rounded-xl p-2.5 ${item.textColor}`}>
                      <span className="material-symbols-outlined text-[22px]">{item.iconName}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-accent-dark text-[15px] font-semibold dark:text-white">{item.label}</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Your Activity Section */}
            <section>
              <h3 className="text-accent-dark/40 mb-3 px-1 text-[11px] font-bold tracking-[0.15em] uppercase dark:text-white/40">Your Activity</h3>
              <div className="overflow-hidden rounded-2xl border border-black/3 bg-white shadow-sm dark:border-white/3 dark:bg-white/5">
                {activityItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${
                      index < activityItems.length - 1 ? "border-b border-black/3 dark:border-white/5" : ""
                    }`}
                  >
                    <div className={`${item.bgColor} rounded-xl p-2.5 ${item.textColor}`}>
                      <span className="material-symbols-outlined text-[22px]">{item.iconName}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-accent-dark text-[15px] font-semibold dark:text-white">{item.label}</p>
                      {item.subtitle && <p className="text-primary text-[12px] font-medium">{item.subtitle}</p>}
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Preferences Section */}
            <section>
              <h3 className="text-accent-dark/40 mb-3 px-1 text-[11px] font-bold tracking-[0.15em] uppercase dark:text-white/40">Preferences</h3>
              <div className="overflow-hidden rounded-2xl border border-black/3 bg-white shadow-sm dark:border-white/3 dark:bg-white/5">
                {/* Notifications */}
                <div className="flex cursor-pointer items-center gap-4 border-b border-black/3 px-4 py-4 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5">
                  <div className="rounded-xl bg-pink-50 p-2.5 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                    <span className="material-symbols-outlined text-[22px]">notifications</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-accent-dark text-[15px] font-semibold dark:text-white">Notifications</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotificationsEnabled(!notificationsEnabled);
                    }}
                    className={`relative flex h-6 w-10 items-center rounded-full px-1 transition-colors ${notificationsEnabled ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    <div className={`absolute h-4 w-4 rounded-full bg-white transition-all ${notificationsEnabled ? "right-1" : "left-1"}`} />
                  </button>
                </div>

                {/* Appearance */}
                <div
                  className="flex cursor-pointer items-center gap-4 border-b border-black/3 px-4 py-4 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                  onClick={toggleTheme}
                >
                  <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <span className="material-symbols-outlined text-[22px]">contrast</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-accent-dark text-[15px] font-semibold dark:text-white">Appearance</p>
                  </div>
                  <p className="text-primary text-[11px] font-bold tracking-widest">{theme.toUpperCase()}</p>
                </div>

                {/* Install App */}
                <div className={`flex items-center gap-4 px-4 py-4 transition-colors ${isInstalled ? "" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"}`} onClick={handleInstallClick}>
                  <div className="rounded-xl bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                    <span className="material-symbols-outlined text-[22px]">install_mobile</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-accent-dark text-[15px] font-semibold dark:text-white">Install App</p>
                  </div>
                  {isInstalled ? (
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-green-600 dark:text-green-400">check_circle</span>
                      <p className="text-[11px] font-bold tracking-widest text-green-600 dark:text-green-400">INSTALLED</p>
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  )}
                </div>
              </div>
            </section>

            {/* Logout Button and Footer */}
            <div className="pt-4 pb-12">
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="mb-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#ff4b4b]/10 bg-[#ff4b4b]/5 font-bold text-[#ff4b4b] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">logout</span>
                Logout Account
              </button>

              <div className="space-y-1 text-center">
                <p className="text-[11px] font-medium tracking-wide text-[#9e7147] dark:text-white/30">Version 2.4.0 (Build 884)</p>
                <p className="text-[11px] font-medium tracking-wide text-[#9e7147] dark:text-white/30">© 2024 Espro Collective LLC</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={showLogoutDialog}
        title="Logging Out?"
        description="Are you sure you want to log out of your Espro Collective account?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        icon="logout"
      />
    </AppShell>
  );
}
