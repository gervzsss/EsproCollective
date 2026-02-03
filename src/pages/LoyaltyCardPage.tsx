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
  // Using QR Server API for a clean QR code without padding
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=ESPRO-MEMBER-12345&margin=0",
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
        <h2 className="text-accent-dark flex-1 text-center text-lg leading-tight font-bold tracking-tight dark:text-white">
          <span className="font-serif-bold italic">espro.</span> <span className="font-script font-bold not-italic">Collective</span>
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
            <label className="text-accent-dark/60 has-checked:text-accent-dark dark:has-checked:bg-accent-dark flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all has-checked:bg-white has-checked:shadow-sm dark:text-white/60 dark:has-checked:text-white">
              <span className="truncate">Card Front</span>
              <input className="invisible w-0" name="card-view" type="radio" value="front" checked={view === "front"} onChange={() => setView("front")} />
            </label>
            <label className="text-accent-dark/60 has-checked:text-accent-dark dark:has-checked:bg-accent-dark flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all has-checked:bg-white has-checked:shadow-sm dark:text-white/60 dark:has-checked:text-white">
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
                <h1 className="font-serif-bold text-4xl tracking-tight text-white">espro.</h1>
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
      <div className="mb-8 flex flex-col gap-6 px-2">
        <div>
          <h4 className="text-accent-dark/50 mb-2 px-1 py-2 text-xs leading-normal font-bold tracking-[0.2em] uppercase dark:text-white/50">Membership Details</h4>
          <div className="border-accent-dark/5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/5">
            <div className="flex items-center justify-between py-1">
              <span className="text-accent-dark/70 text-sm font-medium dark:text-white/60">Current Tier</span>
              <span className="text-primary text-sm font-bold">Espro {member.tierName}</span>
            </div>
            <div className="bg-accent-dark/5 h-px w-full dark:bg-white/10"></div>
            <div className="flex items-center justify-between py-1">
              <span className="text-accent-dark/70 text-sm font-medium dark:text-white/60">Next Tier Progress</span>
              <span className="text-accent-dark text-sm font-bold dark:text-white">550 pts remaining</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CardBack({ member }: { member: Member }) {
  return (
    <>
      <div className="mb-10 flex justify-center">
        <div className="bg-accent-dark card-shadow relative flex h-125 w-[320px] flex-col overflow-hidden rounded-4xl border border-white/10">
          {/* Topo Pattern Overlay */}
          <div className="topo-pattern pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-10 flex h-full flex-col p-8">
            {/* Top Branding */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-serif-bold text-2xl tracking-tight text-white">espro.</h1>
                <p className="font-script text-primary -mt-1 text-xl">Collective</p>
              </div>
            </div>

            {/* QR Code Section - Centered */}
            <div className="flex flex-1 flex-col items-center justify-center py-4">
              <div className="aspect-square w-full max-w-45 overflow-hidden rounded-lg bg-white">
                <img src={member.qrCodeUrl} alt="Member QR Code" className="h-full w-full object-contain" />
              </div>
              <p className="mt-5 text-center text-sm font-medium text-white/80">Scan at checkout to earn & redeem</p>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto">
              <div className="mb-5 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

              {/* Member Info Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined text-primary text-base">person</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{member.firstName}</p>
                    <p className="text-espro-cream/50 text-[9px]">Since {member.memberSince}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary text-lg font-bold">{member.pointsBalance.toLocaleString()}</p>
                  <p className="text-espro-cream/50 text-[9px] font-medium tracking-wider uppercase">points</p>
                </div>
              </div>

              {/* Footer Text */}
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-espro-cream/30 text-center text-[8px] font-medium tracking-wide uppercase">For support: help@esprocollective.com</p>
              </div>
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
