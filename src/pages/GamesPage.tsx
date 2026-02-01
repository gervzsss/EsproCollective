import { useState } from "react";
import toast from "react-hot-toast";
import { AppShell, TopBar, BottomNav } from "../components/layout";

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
  { id: 1, name: "First Purchase", iconName: "shopping_cart_checkout", completed: true },
  { id: 2, name: "Weekly Streak", iconName: "local_fire_department", completed: true },
  { id: 3, name: "Coffee Master", iconName: "emoji_events", completed: false },
  { id: 4, name: "Social Share", iconName: "share", completed: false },
  { id: 5, name: "Referral King", iconName: "group_add", completed: false },
  { id: 6, name: "Top Spender", iconName: "payments", completed: false },
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
      <TopBar
        title="Games & Badges"
        leftAction="back"
        rightAction={
          <button className="text-accent-dark flex size-12 items-center justify-center rounded-xl bg-transparent dark:text-white">
            <span className="material-symbols-outlined">help</span>
          </button>
        }
      />

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
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 p-3 ${
                  badge.completed ? "border-primary/30 bg-primary/10 dark:bg-primary/20" : "border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full shadow-md ${
                    badge.completed ? "bg-primary text-white" : "bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/40"
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{badge.iconName}</span>
                </div>
                {badge.completed && (
                  <div className="dark:border-background-dark absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 p-0.5 text-white">
                    <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                  </div>
                )}
              </div>
              <p className={`text-center text-[10px] font-bold tracking-tight uppercase ${badge.completed ? "text-accent-dark dark:text-white" : "text-gray-400 dark:text-white/40"}`}>{badge.name}</p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
