import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { AppShell, TopBar, BottomNav } from "../components/layout";

// Mock data
const initialProfile = {
  fullName: "Alex Rivera",
  email: "alex.rivera@espro.com",
  phone: "+1 (555) 234-5678",
  birthday: "12 / 05 / 1994",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQssYqP4xlgkYOJHVx2vAivyDH12wOb60PxprfOiIzG9BZlU_s8LmuxmCsw1HcHTOeMWrhZbaUh6iy6mTu_pwma3UQCPwvxvn0mz7n8SQTD1n1DTdpvzt1P0HY7sGDpkwfb2HjeEwRQwRvAVXv0wfCPTzJiV-ECUHm2MKCwKColFSSgtEVM_RIKEAfYlN7b06-3q1qBWTuRieJqhfK2m_KB9geSQzqq0dZlvTO85eq-lqh2T9EP78_We9ijFpFbAOcp_lvJGm_FWdz",
};

export default function EditProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!profile.fullName.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!profile.email.trim() || !profile.email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Profile updated successfully!");
    setIsSaving(false);
  };

  return (
    <AppShell>
      <TopBar title="Personal Information" leftAction="back" />

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-40">
        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="border-primary/20 bg-primary/10 flex size-24 items-center justify-center overflow-hidden rounded-full border-2">
              <img src={profile.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <button className="bg-primary dark:border-background-dark absolute right-0 bottom-0 rounded-full border-2 border-white p-2 text-white shadow-lg">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-accent-dark px-1 text-sm font-semibold dark:text-gray-200">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className="text-accent-dark focus:border-primary focus:ring-primary w-full rounded-xl border border-[#e9dbce] bg-white px-4 py-4 transition-all outline-none placeholder:text-[#9e7147]/60 focus:ring-1 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-accent-dark px-1 text-sm font-semibold dark:text-gray-200">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="alex.r@example.com"
              className="text-accent-dark focus:border-primary focus:ring-primary w-full rounded-xl border border-[#e9dbce] bg-white px-4 py-4 transition-all outline-none placeholder:text-[#9e7147]/60 focus:ring-1 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-accent-dark px-1 text-sm font-semibold dark:text-gray-200">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="text-accent-dark focus:border-primary focus:ring-primary w-full rounded-xl border border-[#e9dbce] bg-white px-4 py-4 transition-all outline-none placeholder:text-[#9e7147]/60 focus:ring-1 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Birthday */}
          <div className="flex flex-col gap-1.5">
            <label className="text-accent-dark px-1 text-sm font-semibold dark:text-gray-200">Birthday</label>
            <div className="relative">
              <select
                value={profile.birthday}
                onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                className="text-accent-dark focus:border-primary focus:ring-primary w-full appearance-none rounded-xl border border-[#e9dbce] bg-white px-4 py-4 transition-all outline-none focus:ring-1 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="12 / 05 / 1994">12 / 05 / 1994</option>
                <option value="edit">Edit Date...</option>
              </select>
              <div className="text-primary pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
            </div>
          </div>
        </form>

        {/* Info Callout */}
        <div className="border-primary/10 bg-primary/5 mt-8 flex items-start gap-3 rounded-xl border p-4">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="text-xs leading-relaxed text-[#9e7147] dark:text-gray-400">Your personal information is securely stored and never shared with third parties without your consent.</p>
        </div>
      </main>

      {/* Sticky Save Button */}
      <div className="nav-blur dark:bg-background-dark/80 absolute bottom-20 left-0 w-full bg-white/80 px-4 py-4">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-primary shadow-primary/20 w-full rounded-xl py-4 font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <BottomNav />
    </AppShell>
  );
}
