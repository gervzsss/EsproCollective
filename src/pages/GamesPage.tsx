import { useState } from "react";
import toast from "react-hot-toast";
import { AppShell, BottomNav } from "../components/layout";

// Mock data
const spinData = {
  spinsAvailable: 1,
  requirementText: "Spin 1x after every 3 purchases",
};

const mysteryBox = {
  progress: 65,
  total: 100,
  unlockText: "Unlock every 100 XP",
};

const badges = [
  { id: 1, name: "First Purchase", iconName: "shopping_cart_checkout", status: "unlocked" },
  { id: 2, name: "Explorer", iconName: "explore", status: "progress", progress: 60, progressText: "3/5 Products" },
  { id: 3, name: "Early Bird", iconName: "light_mode", status: "locked" },
  { id: 4, name: "Weekend Warrior", iconName: "weekend", status: "locked" },
  { id: 5, name: "Top Fan", iconName: "star", status: "locked" },
];

export default function GamesPage() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Simulate spin animation
    setTimeout(() => {
      setIsSpinning(false);
      const prizes = ["BONUS POINTS", "SMALL DISCOUNT", "FREE ADD-ON", "Double XP"];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      toast.success(`🎉 You won: ${prize}!`);
    }, 2000);
  };

  return (
    <AppShell>
      {/* Header */}
      <header className="nav-blur dark:bg-background-dark/80 sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/80 p-4 pb-2 dark:border-white/5">
        <div className="text-accent-dark flex size-12 shrink-0 items-center dark:text-white">
          <button onClick={() => window.history.back()}>
            <span className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
          </button>
        </div>
        <h2 className="text-accent-dark flex-1 text-center text-lg leading-tight font-bold tracking-tight dark:text-white">Games & Badges</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="text-accent-dark flex items-center justify-center rounded-xl bg-transparent dark:text-white">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Spin Wheel Section */}
        <div className="flex flex-col items-center px-4 pt-6 pb-2">
          <h2 className="text-accent-dark text-center text-[22px] leading-tight font-bold tracking-tight dark:text-white">Espro Spin Wheel</h2>
          <div className="border-primary/20 bg-primary/10 mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1">
            <span className="material-symbols-outlined text-primary text-sm">info</span>
            <p className="text-primary text-[12px] font-bold tracking-wider uppercase">{spinData.requirementText}</p>
          </div>
        </div>

        {/* Wheel */}
        <div className="flex flex-col items-center justify-center px-4 py-6">
          <div className="relative flex h-64 w-64 items-center justify-center">
            {/* Wheel Border */}
            <div className="border-primary/10 absolute inset-0 rounded-full border-10 shadow-inner" />

            {/* Wheel */}
            <div
              className={`wheel-gradient relative flex h-full w-full items-center justify-center overflow-hidden rounded-full shadow-2xl ring-4 ring-white/50 ${isSpinning ? "animate-spin" : ""}`}
              style={{ animationDuration: isSpinning ? "0.5s" : "0s" }}
            >
              {/* Wheel Labels */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <span className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center text-[10px] leading-tight font-bold text-white drop-shadow-md">
                    BONUS
                    <br />
                    POINTS
                  </span>
                  <span className="absolute top-1/2 right-[10%] -translate-y-1/2 rotate-90 text-center text-[10px] leading-tight font-bold text-white drop-shadow-md">
                    SMALL
                    <br />
                    DISCOUNT
                  </span>
                  <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 rotate-180 text-center text-[10px] leading-tight font-bold text-white drop-shadow-md">
                    FREE
                    <br />
                    ADD-ON
                  </span>
                  <span className="absolute top-1/2 left-[10%] -translate-y-1/2 -rotate-90 text-center text-[10px] leading-tight font-bold text-white uppercase drop-shadow-md">
                    Double XP
                    <br />
                    Next Order
                  </span>
                </div>
              </div>

              {/* Center Hub */}
              <div className="border-primary z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-lg">
                <div className="bg-primary h-2.5 w-2.5 rounded-full" />
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
              <div className="bg-primary h-8 w-6 shadow-md" style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }} />
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <div className="flex justify-center px-4 py-2">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="bg-primary flex h-14 w-full max-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-xl text-lg font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70"
          >
            <span className="material-symbols-outlined mr-2">refresh</span>
            <span className="truncate">{isSpinning ? "Spinning..." : "Spin Now"}</span>
          </button>
        </div>

        {/* Mystery Box */}
        <div className="mt-8 px-4">
          <div className="mystery-gradient relative overflow-hidden rounded-2xl border border-white/10 p-6 text-white">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span className="material-symbols-outlined text-[160px]">inventory_2</span>
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-white">inventory_2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mystery Box</h3>
                  <p className="text-primary text-[12px] font-bold tracking-wider uppercase">{mysteryBox.unlockText}</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/10 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium opacity-80">Progress to next box</span>
                  <span className="text-sm font-bold">
                    {mysteryBox.progress} / {mysteryBox.total} XP
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="bg-primary h-full" style={{ width: `${(mysteryBox.progress / mysteryBox.total) * 100}%` }} />
                </div>
                <p className="mt-4 text-[11px] leading-relaxed italic opacity-60">Possible rewards: Bonus points, discounts, free add-ons, or Double XP!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Collection */}
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <h2 className="text-accent-dark text-[22px] leading-tight font-bold tracking-tight dark:text-white">Badge Collection</h2>
          <button className="text-primary text-sm font-bold">View All</button>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 pb-12">
          {badges.map((badge) => (
            <div key={badge.id} className={`flex flex-col items-center gap-2 ${badge.status === "locked" ? "opacity-50" : ""}`}>
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 p-3 ${
                  badge.status === "unlocked"
                    ? "border-primary/30 bg-primary/10 dark:bg-primary/20"
                    : badge.status === "progress"
                      ? "border-primary/40 bg-primary/5 border-dashed dark:bg-white/5"
                      : "border-transparent bg-gray-100 dark:bg-white/5"
                }`}
              >
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full ${
                    badge.status === "unlocked" ? "bg-primary text-white shadow-md" : badge.status === "progress" ? "bg-primary/20 text-primary/60" : "bg-gray-200 text-gray-500 dark:bg-white/10"
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{badge.iconName}</span>
                </div>
                {badge.status === "unlocked" && (
                  <div className="dark:border-background-dark absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 p-0.5 text-white">
                    <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                  </div>
                )}
                {badge.status === "progress" && badge.progress && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-1">
                    <svg className="h-full w-full -rotate-90">
                      <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#fa8314" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={100 - badge.progress} />
                    </svg>
                  </div>
                )}
                {badge.status === "locked" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent-dark/30 text-xl dark:text-white/30">lock</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs leading-tight font-bold">{badge.name}</p>
                <p className={`mt-0.5 text-[10px] font-bold ${badge.status === "unlocked" ? "text-green-600 uppercase" : badge.status === "progress" ? "text-primary" : "text-gray-500 uppercase"}`}>
                  {badge.status === "unlocked" ? "Unlocked" : badge.status === "progress" ? badge.progressText : "Locked"}
                </p>
              </div>
            </div>
          ))}
          {/* Discover More */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
              <span className="material-symbols-outlined text-2xl text-gray-300 dark:text-white/10">more_horiz</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400">Discover More</p>
          </div>
        </div>

        {/* Special Challenge */}
        <div className="px-4 pb-6">
          <div
            className="flex min-h-40 w-full flex-col justify-end overflow-hidden rounded-2xl border border-gray-100 bg-cover bg-center bg-no-repeat px-6 py-6 dark:border-white/5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPXsE5LsIBkmlGqGSS-hYVvfMRiBpn-ixiz8sBII-UVo37NbaxvwWnwv5nurP_qyHtAHZLTUZnNJHQVtzaNmSJ2kUDQwZraE1jK9I8VOlCSNC3o-jwlmT4pQlJATbbvBY0L4RiMK3__fAG34tLySnI4IbKB0qUmllYbqPQt5P43_25tR1DbyezO-x5EO5dPxyFl-gQRph6CsJpNBG30PT2Y07cgLQgR89WovxbTMMDjAeldmE6WfuXpH50VVrahNVNj2_sZNgvmgOE")',
            }}
          >
            <h3 className="text-xl font-bold text-white">Special Challenge</h3>
            <p className="mb-3 text-sm text-white/90">Refer a friend and win 100 extra beans!</p>
            <div className="flex">
              <span className="bg-primary rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">Join Now</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
