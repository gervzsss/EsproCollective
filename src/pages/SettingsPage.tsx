import { Link } from "react-router-dom";
import { AppShell, TopBar, BottomNav } from "../components/layout";

export default function SettingsPage() {
  return (
    <AppShell>
      <TopBar title="Settings" leftAction="back" />

      <main className="flex flex-1 flex-col items-center justify-center pb-32">
        <span className="material-symbols-outlined text-charcoal/20 mb-4 text-6xl">settings</span>
        <h2 className="text-charcoal mb-2 text-xl font-bold dark:text-white">Settings</h2>
        <p className="text-charcoal/60 mb-6 text-center text-sm dark:text-white/60">This page is coming soon.</p>
        <Link to="/profile" className="bg-primary rounded-xl px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          Back to Profile
        </Link>
      </main>

      <BottomNav />
    </AppShell>
  );
}
