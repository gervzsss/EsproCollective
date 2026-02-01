import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell, TopBar, BottomNav } from "../components/layout";
import ConfirmDialog from "../components/ConfirmDialog";

// Mock data
const profile = {
  fullName: "Alex Thompson",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCLF4r43orwj-SbwVsxyf-rOjACXBi2E2r1OpQyeW75FIViZeVusu0U8yoPNAdnO_xLCTgHILKKhHKRRm3XUZFtt2uvXbp6Na4cfSDoE4QTjmTgctqjSeqnrABtl5_sINtuC1Mznr_7QTiAaKy1O4QFjFqbcgW1XhubJVFWfJqlniVspspd5VQtsHCbTKk2UNB1oiEBtWbOfMUdfIKeU-V66cexmwrzBthwvV2TtxKuPWgFdOlWFGarpHd6mrtFIYHamZ12dqhzrkn7",
  tierName: "Gold Member",
  pointsBalance: 1240,
};

const menuItems = [
  { id: "rewards", label: "Rewards History", iconName: "redeem", to: "/rewards/history" },
  { id: "payments", label: "Payment Methods", iconName: "payments", to: "/payments" },
  { id: "personal", label: "Personal Information", iconName: "person", to: "/profile/edit" },
  { id: "settings", label: "Settings", iconName: "settings", to: "/settings" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
          <Link to="/settings" className="text-accent-dark flex size-12 items-center justify-center dark:text-white">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        }
      />

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Profile Summary */}
        <div className="flex flex-col items-center px-6 py-8">
          <div className="bg-primary/20 mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <img src={profile.avatarUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
          </div>
          <h2 className="text-accent-dark text-xl font-bold dark:text-white">{profile.fullName}</h2>
          <p className="text-primary text-sm font-semibold">
            {profile.tierName} • {profile.pointsBalance.toLocaleString()} pts
          </p>
        </div>

        {/* Menu Items */}
        <div className="flex-1 space-y-4 px-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="flex h-16 items-center justify-between rounded-xl border border-[#e9dbce]/50 bg-white px-4 transition-colors hover:bg-gray-50 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">{item.iconName}</span>
                <span className="text-accent-dark font-medium dark:text-white">{item.label}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex h-16 w-full items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:hover:bg-red-900/30"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">logout</span>
              <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
            </div>
          </button>
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
