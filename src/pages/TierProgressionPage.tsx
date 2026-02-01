import { Link } from "react-router-dom";
import { AppShell, TopBar, BottomNav } from "../components/layout";

// Mock data
const tier = {
  currentName: "Espro Elite",
  currentIcon: "workspace_premium",
  description: "You're in the top 5% of members",
};

const ladder = [
  { name: "Member", icon: "coffee", reached: true, current: false },
  { name: "Insider", icon: "local_cafe", reached: true, current: false },
  { name: "Elite", icon: "workspace_premium", reached: true, current: true },
  { name: "Prime", icon: "military_tech", reached: false, current: false },
  { name: "Icon", icon: "diamond", reached: false, current: false },
];

const progress = {
  currentPoints: 750,
  nextTierPoints: 1000,
};

const earnMethods = [
  { id: 1, title: "$1 = 10 Points", iconName: "payments" },
  { id: 2, title: "Daily Check-in", iconName: "calendar_today" },
  { id: 3, title: "Refer a Friend", iconName: "group_add" },
];

export default function TierProgressionPage() {
  const progressPct = (progress.currentPoints / progress.nextTierPoints) * 100;
  const pointsToNext = progress.nextTierPoints - progress.currentPoints;

  return (
    <AppShell className="dark:bg-background-dark bg-white">
      <TopBar
        title="Tier Progression"
        leftAction="back"
        rightAction={
          <button className="bg-charcoal/5 flex size-10 items-center justify-center rounded-full transition-transform active:scale-95">
            <span className="material-symbols-outlined text-charcoal text-xl">info</span>
          </button>
        }
      />

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Hero Badge */}
        <div className="p-8 text-center">
          <div className="relative mb-6 inline-block">
            <div className="border-primary flex size-36 items-center justify-center rounded-full border-4 bg-white shadow-2xl">
              <span className="material-symbols-outlined filled text-primary text-7xl">{tier.currentIcon}</span>
            </div>
            <div className="bg-charcoal absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest whitespace-nowrap text-white uppercase shadow-lg">
              Current Tier
            </div>
          </div>
          <h2 className="text-charcoal mb-1 text-3xl font-extrabold">{tier.currentName}</h2>
          <p className="text-charcoal/60 text-sm font-medium">{tier.description}</p>
        </div>

        {/* Tier Ladder */}
        <div className="mb-10 px-4">
          <div className="border-charcoal/5 bg-charcoal/3 rounded-3xl border p-6">
            <div className="relative mb-12 flex items-center justify-between">
              {/* Progress Track */}
              <div className="bg-charcoal/10 absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 rounded-full" />
              <div className="bg-primary absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full" style={{ width: "62%" }} />

              {/* Tier Icons */}
              {ladder.map((item, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center rounded-full shadow-sm ring-4 ring-white ${
                      item.current
                        ? "bg-primary size-12 scale-110 text-white shadow-lg"
                        : item.reached
                          ? "bg-charcoal size-10 text-white"
                          : "border-charcoal/20 text-charcoal/40 size-10 border-2 bg-white"
                    }`}
                  >
                    <span className={`material-symbols-outlined ${item.current ? "filled text-2xl" : "text-xl"}`}>{item.icon}</span>
                  </div>
                  <span
                    className={`absolute text-center tracking-tight ${
                      item.current ? "text-primary top-14 w-16 text-[10px] font-extrabold uppercase" : "text-charcoal/40 top-12 w-12 text-[9px] font-bold uppercase"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress to Next */}
            <div className="mt-14 space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-charcoal/50 text-[10px] font-bold tracking-widest uppercase">Next Milestone</p>
                  <p className="text-charcoal text-lg leading-tight font-bold">Espro Prime</p>
                </div>
                <p className="text-primary text-sm font-black">
                  {progress.currentPoints} / {progress.nextTierPoints} PTS
                </p>
              </div>
              <div className="bg-charcoal/10 h-3 w-full overflow-hidden rounded-full p-0.5">
                <div className="bg-primary h-full rounded-full" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-charcoal/60 text-center text-xs font-medium">Earn {pointsToNext} more points to unlock Prime benefits</p>
            </div>
          </div>
        </div>

        {/* How to Earn */}
        <div className="px-4">
          <div className="mb-4 flex items-center justify-between px-2">
            <h3 className="text-charcoal text-xl font-extrabold">How to Earn</h3>
            <span className="text-primary cursor-pointer text-xs font-bold tracking-widest uppercase">Learn More</span>
          </div>
          <div className="space-y-3">
            {earnMethods.map((method) => (
              <Link
                key={method.id}
                to="#"
                className="border-charcoal/5 active:bg-charcoal/2 flex cursor-pointer items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined text-2xl">{method.iconName}</span>
                  </div>
                  <span className="text-charcoal text-base font-bold">{method.title}</span>
                </div>
                <span className="material-symbols-outlined text-charcoal/30">chevron_right</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
