import { useState } from "react";
import { AppShell, BottomNav } from "../components/layout";

// Member type
interface Member {
  firstName: string;
  tierName: string;
  tierIcon: string;
  pointsBalance: number;
  pointsProgressPct: number;
  benefits: string[];
  memberSince: string;
  rewardsAvailableCount: number;
  pointsValidityText: string;
  qrCodeUrl: string;
}

// Mock data
const member: Member = {
  firstName: "Alex",
  tierName: "Elite",
  tierIcon: "workspace_premium",
  pointsBalance: 1250,
  pointsProgressPct: 69,
  benefits: ["Free Add-on", "Espro Elite"],
  memberSince: "Nov 2023",
  rewardsAvailableCount: 4,
  pointsValidityText: "Points valid for 12 months",
  qrCodeUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDzo97nS-q011zuErdT-VPgkK0Fv-AWujSuQzbof2x8IL4eHuEf2FDta8OpBEM2HaZJDcXZki8Dfn5ZfT1YNTjXr7dreGVgHMlqI45xpqdpWYAu1uNCTm_yygxvoMm4Xw17OjsjTKi0ODT_TMPU33JL-gaf97lv28KGC4NNpPCnQ1j7I9W1FjtROa8Q0a_EEc-YosDKXUv8jWHp8toNKIZgkAetldo1gXV7GPWNPglfmRgloEOG87jpWzG1e8mr7UzUvrEZLxn6d5h_",
};

export default function LoyaltyCardPage() {
  const [view, setView] = useState<"front" | "back">("front");

  return (
    <AppShell>
      {/* Header */}
      <header className="bg-background-light dark:bg-background-dark sticky top-0 z-30 flex items-center justify-between p-4 pb-2">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <button onClick={() => window.history.back()} className="text-accent-dark dark:text-white">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
        </div>
        <h2 className="text-accent-dark flex-1 text-center text-lg leading-tight font-bold tracking-tight italic dark:text-white">
          espro. <span className="font-script text-primary not-italic">Collective</span>
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="text-accent-dark flex size-12 items-center justify-center rounded-xl bg-transparent dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-y-auto px-4 pt-4 pb-32">
        {/* Toggle */}
        <div className="mb-6 flex px-4 py-3">
          <div className="border-accent-dark/5 bg-accent-dark/5 flex h-12 flex-1 items-center justify-center rounded-xl border p-1 dark:border-white/5 dark:bg-white/10">
            <label className="has-checked:text-accent-dark dark:has-checked:bg-accent-dark ddark:has-checked:text-white flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all has-checked:bg-white has-checked:shadow-sm">
              <span className="truncate">Card Front</span>
              <input className="invisible w-0" name="card-view" type="radio" value="front" checked={view === "front"} onChange={() => setView("front")} />
            </label>
            <label className="has-checked:text-accent-dark dark:has-checked:bg-accent-dark ddark:has-checked:text-white flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all has-checked:bg-white has-checked:shadow-sm">
              <span className="truncate">Card Back</span>
              <input className="invisible w-0" name="card-view" type="radio" value="back" checked={view === "back"} onChange={() => setView("back")} />
            </label>
          </div>
        </div>

        {/* Card */}
        {view === "front" ? <CardFront member={member} /> : <CardBack member={member} />}
      </main>

      <BottomNav />
    </AppShell>
  );
}

function CardFront({ member }: { member: Member }) {
  return (
    <>
      <div className="mb-10 flex justify-center">
        <div className="bg-accent-dark card-shadow relative flex h-125 w-[320px] flex-col overflow-hidden rounded-4xl border border-white/10">
          {/* Topo Pattern Overlay */}
          <div className="topo-pattern pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-10 flex h-full flex-col p-8">
            {/* Top Section */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-espro-cream/60 text-[10px] font-bold tracking-[0.2em] uppercase">Espro Loyalty Card</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{member.firstName}</h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="material-symbols-outlined filled text-primary text-3xl">{member.tierIcon}</span>
                <span className="text-primary mt-1 text-[10px] font-black tracking-widest uppercase">{member.tierName}</span>
              </div>
            </div>

            {/* Center Brand Mark */}
            <div className="-mt-4 flex flex-1 flex-col items-center justify-center">
              <div className="relative mb-6 flex h-40 w-40 items-center justify-center">
                {/* Coffee cup illustration */}
                <svg className="stroke-espro-cream h-full w-full fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" viewBox="0 0 100 150">
                  <line stroke="#FA8112" strokeWidth="2" x1="50" x2="50" y1="0" y2="40" />
                  <path d="M35 45 Q35 65 50 65 Q65 65 65 45" stroke="#F5E7C6" />
                  <path d="M35 45 L65 45" stroke="#F5E7C6" />
                  <path d="M65 50 Q72 50 72 57 Q72 64 65 64" stroke="#F5E7C6" />
                  <path d="M30 85 Q30 75 45 75 Q55 75 55 85 L55 110 L45 110 L45 85" stroke="#F5E7C6" />
                  <path d="M40 95 Q40 85 55 85" stroke="#F5E7C6" />
                  <rect height="25" rx="2" stroke="#FA8112" strokeWidth="1.5" width="16" x="42" y="110" />
                </svg>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white">espro.</h1>
                <p className="font-script text-primary -mt-2 text-3xl">Collective</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto">
              <div className="mb-2 flex items-end justify-between">
                <p className="text-espro-cream/80 text-xs font-medium">Point Balance</p>
                <p className="text-xl font-bold text-white">
                  {member.pointsBalance.toLocaleString()} <span className="text-espro-cream/50 text-[10px] font-black tracking-widest uppercase">pts</span>
                </p>
              </div>
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(250,129,18,0.6)]" style={{ width: `${member.pointsProgressPct}%` }} />
              </div>
              <div className="flex gap-4 border-t border-white/10 pt-5">
                {member.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">{i === 0 ? "add_circle" : "verified"}</span>
                    <span className="text-espro-cream/90 text-[10px] font-bold tracking-wider uppercase">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Details */}
      <div className="px-2">
        <h4 className="text-accent-dark/50 mb-2 px-1 py-2 text-xs leading-normal font-bold tracking-[0.2em] uppercase dark:text-white/50">Membership Details</h4>
        <div className="border-accent-dark/5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/5">
          <div className="flex items-center justify-between py-1">
            <span className="text-accent-dark/60 text-sm dark:text-white/60">Member Since</span>
            <span className="text-accent-dark text-sm font-bold dark:text-white">{member.memberSince}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-accent-dark/60 text-sm dark:text-white/60">Current Tier</span>
            <span className="text-primary text-sm font-bold">{member.tierName}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-accent-dark/60 text-sm dark:text-white/60">Available Rewards</span>
            <span className="text-accent-dark text-sm font-bold dark:text-white">{member.rewardsAvailableCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function CardBack({ member }: { member: Member }) {
  return (
    <>
      <div className="bg-charcoal card-shadow relative flex aspect-[0.63] w-full flex-col items-center overflow-hidden rounded-2xl border border-white/5 p-8">
        {/* Topo overlay */}
        <div className="topo-pattern pointer-events-none absolute inset-0 scale-125 rotate-90 opacity-10 mix-blend-overlay" />

        {/* Top Header */}
        <div className="z-10 mb-4 flex w-full items-start justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
            <div className="bg-primary/80 h-2 w-2 rounded-full" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase">Loyalty Pass</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="z-10 flex w-full flex-1 flex-col items-center justify-center space-y-12">
          <div className="relative flex aspect-square w-full max-w-70 items-center justify-center rounded-3xl bg-white p-6 shadow-2xl">
            <div className="h-full w-full overflow-hidden">
              <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${member.qrCodeUrl}')` }} />
            </div>
          </div>
          <div className="space-y-4 text-center">
            <p className="text-xl font-bold tracking-tight text-white">Scan to earn Espro Points</p>
            <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2">
              <span className="bg-primary h-1.5 w-1.5 rounded-full" />
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{member.rewardsAvailableCount} REWARDS AVAILABLE</p>
              <span className="bg-primary h-1.5 w-1.5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 mt-auto flex w-full flex-col items-center pt-8">
          <div className="mb-6 h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent" />
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">Member Since</span>
              <span className="text-sm font-bold text-white">{member.memberSince}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-medium tracking-wide text-white/20 italic">{member.pointsValidityText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <button className="border-accent-dark/10 mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border bg-white py-4 transition-all active:scale-[0.98] dark:border-white/10 dark:bg-white/5">
        <span className="material-symbols-outlined text-accent-dark/60 text-xl dark:text-white/60">share</span>
        <span className="text-accent-dark/80 text-sm font-bold dark:text-white/80">Share Pass to Wallet</span>
      </button>
    </>
  );
}
