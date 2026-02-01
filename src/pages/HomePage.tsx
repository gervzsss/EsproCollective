import { AppShell, BottomNav } from "../components/layout";
import { Link } from "react-router-dom";

// Mock data
const member = {
  name: "Alex Sterling",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxVO_MTA150ewsjJQ_Xv9ZX-5N3hYLNuHcpZMDlH1h7HBndujJ-05QWuU-qFV-albOwLj8JwOAKNCP-3DjNEQVX9b00yHbCKm_XuGtaCI0SuE4DDo8ll_AQzO-YD7l26QlzoYaxAIzVFN0NaJfGxjRCLvbcj2i8XzUo2CGFj281_jcwPxtZv3tKOxFailNfSxWF0zFZazJrsQn2nPzOj9aO2ILyfW-Y1dEa794PvyW7_lV6UfF4KP7757pYjrCVjf8QKtVQStvC49G",
};

const tierSummary = {
  tierName: "Espro Elite",
  pointsBalance: 1250,
  progressPct: 75,
  bannerImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNlmaM9tQ6yvVvenQn7o_z-6n2_jUv-4tyNt1j_NIyq5XLdG24MqP5-yWEP9RbJw41x8nTR8_O1JiN4Ft3sBVQ4S7yunt72OWph2iLpM9lxMeI3FuyWFAwnui9fQZxoMLzUgwdxJLZDV0vpfsZHsmzaVayYFU0ky5kXcY501tFGFUbSG9bBGpUQINQZWHALUcxu9LugjqQl1sVMnFnOQXtpdcXzsW8_pYZ_ysls_57tfvaH6iJCW6dqyOR0Hf6BrJnbCWV8VQsCDVc",
};

const missions = [
  {
    id: 1,
    title: "Check-in Today",
    subtitle: "Claim your daily loyalty reward",
    points: 10,
    state: "available" as const,
    icon: "calendar_today",
  },
  {
    id: 2,
    title: "Coffee Trivia",
    subtitle: "Test your knowledge on Arabica",
    points: 30,
    state: "locked" as const,
    icon: "quiz",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function HomePage() {
  return (
    <AppShell>
      {/* Top Bar */}
      <div className="bg-background-light/80 nav-blur dark:bg-background-dark/80 sticky top-0 z-50 flex items-center justify-between p-4 pb-2">
        <div className="flex size-12 shrink-0 items-center">
          <div className="border-primary aspect-square size-10 rounded-full border-2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${member.avatarUrl}")` }} />
        </div>
        <div className="flex flex-1 flex-col px-2">
          <p className="text-primary text-xs font-medium tracking-wider uppercase">{getGreeting()}</p>
          <h2 className="text-accent-dark text-lg leading-tight font-bold tracking-tight dark:text-white">{member.name}</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="text-accent-dark relative flex size-10 items-center justify-center rounded-full bg-white/50 dark:bg-white/10 dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
            <span className="bg-primary absolute top-2 right-2 flex h-2 w-2 rounded-full" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-32">
        {/* Tier Card */}
        <div className="p-4">
          <div className="bg-accent-dark flex flex-col items-stretch justify-start overflow-hidden rounded-xl border border-white/10 shadow-lg dark:bg-black">
            <div className="relative aspect-video w-full overflow-hidden">
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 to-transparent" />
              <div className="h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${tierSummary.bannerImageUrl}")` }} />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-primary rounded px-2 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase">Active Tier</span>
                <h3 className="mt-1 text-2xl font-extrabold text-white">{tierSummary.tierName}</h3>
              </div>
            </div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">Available Balance</p>
                  <p className="text-3xl leading-tight font-bold text-white">
                    {tierSummary.pointsBalance.toLocaleString()} <span className="text-primary text-sm">PTS</span>
                  </p>
                </div>
                <div className="bg-primary/20 rounded-lg p-2">
                  <span className="material-symbols-outlined filled text-primary text-3xl">workspace_premium</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-end justify-between gap-6">
                  <p className="text-sm font-medium text-white">Level 3 Status</p>
                  <p className="text-[10px] font-normal tracking-tight text-gray-400 uppercase">250 pts to Level 4</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${tierSummary.progressPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Missions */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-accent-dark text-xl font-extrabold tracking-tight dark:text-white">Daily Missions</h2>
          <Link to="/games" className="text-primary text-sm font-bold">
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-3 px-4 py-2">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`flex items-center gap-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/5 ${mission.state === "locked" ? "opacity-80" : ""}`}
            >
              <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
                <span className="material-symbols-outlined">{mission.icon}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-accent-dark text-base leading-tight font-bold dark:text-white">{mission.title}</p>
                <p className="mt-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">{mission.subtitle}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  className={`rounded px-2 py-1 text-[10px] font-black ${
                    mission.state === "available" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-primary/10 text-primary"
                  }`}
                >
                  +{mission.points} PTS
                </div>
                {mission.state === "locked" && <span className="material-symbols-outlined text-sm text-gray-300">lock</span>}
                {mission.state === "available" && <div className="bg-primary size-2 rounded-full" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between px-4 pt-6">
          <h2 className="text-accent-dark text-xl font-extrabold tracking-tight dark:text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 py-2">
          <Link
            to="/rewards"
            className="flex flex-col items-center gap-2 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-transform active:scale-95 dark:border-white/5 dark:bg-white/5"
          >
            <span className="material-symbols-outlined text-primary text-3xl">redeem</span>
            <span className="text-accent-dark text-sm font-bold dark:text-white">Rewards</span>
          </Link>
          <Link
            to="/games"
            className="flex flex-col items-center gap-2 rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-transform active:scale-95 dark:border-white/5 dark:bg-white/5"
          >
            <span className="material-symbols-outlined text-primary text-3xl">casino</span>
            <span className="text-accent-dark text-sm font-bold dark:text-white">Games</span>
          </Link>
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
