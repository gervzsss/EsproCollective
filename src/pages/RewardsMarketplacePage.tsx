import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell, BottomNav } from "../components/layout";

// Mock data
const member = {
  firstName: "Alex",
  tierName: "Gold Member Tier",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOjsN08Mmn0YhaxyQSyTtlIL1w9yEwNOTLzMkZ2C8Kb1hKD2l7o4RGhny8qZ1Im1Oqp-ssegWe1CGBATk8W0P6hl4hCGuSkpgWzD2PvWlnXfL1-ISv94ADGlGZxGrPFvlU7WWocYrQV0jc53HWwtlZ463FiQ-s0ZPNYLp2JG6FU9owCRc-6Xx69obXTMqxIIJ4ePCnBjnDNRVDbxw7ZYxxknY4NAm0YbwwCozjL5G_ogYmBB1_23HqTrFdlgSZptaEkfhcphd4f0y",
  pointsBalance: 1250,
  nextLevelPoints: 1300,
  progressPct: 80,
  nextRewardHint: "50 points away from a Free Latte!",
};

const categories = [
  { id: "all", label: "All" },
  { id: "drinks", label: "Drinks", icon: "local_drink" },
  { id: "food", label: "Food", icon: "bakery_dining" },
  { id: "merch", label: "Merch", icon: "shopping_bag" },
];

const rewards = [
  {
    id: 1,
    name: "Spring Blossom",
    pointsCost: 300,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMh_cLmnW73yEfARzX8zEr0O2XkYh9Dy_WPK7P3E42fHzRTZfroDRh5Fhc6ojiPN_S7m56HE-ENE5dICqUTPEmuxqzpjrSl_Anvkb-BCcFT566fEZ19_3QaKvxBL461pHVfgU61bYBUEo0bACKa0ANyai9nt2eAXCUEHQPfp1VtYk99JzI2UtS-HB5w6eeICQceyR7AGZ6Ug3AmnuS64Jdq46ICCbeqpu0E7ZDabL_vc1U9tOkqY1wTVSSbIRaOWVBUvaEYthk1MSA",
    available: true,
    categoryId: "drinks",
  },
  {
    id: 2,
    name: "Any Fresh Pastry",
    pointsCost: 150,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBROYDzeuWQWRJBx_wLW7XsixhAYtQd2jqDImE6aaJbPnp8J15GDbEou0zTnUE-OVGN5bp20BnYUVCVtTwjtJSPjgdumLS1FEmCNn4lQjdSNNkSosJl17O4i-TNOMGM2nIUuKtcSGrNVvks2hHCpwT4DyyUdKuBpWO8zlBIPWasXLLK7IoDbcpHwaRrFS-GRXD80OrohcVuET2R3jsVehEjvLLpCZHyKLASCfnPg4WcNwOeYk2Fx_R6mMr1HT18svF6Ujo1AjnlXImM",
    available: true,
    categoryId: "food",
  },
  {
    id: 3,
    name: "Espresso Tasting Set",
    pointsCost: 500,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmeDClxMwbGiMQD99-wakc6D5U2xYmQK-tVScvrTWwPAVhDzkOgueg7o4Yu2Z88FobjX-89JQ_w9piTAGXLxrHHnOET5ANp26JYnzf6tDiOlJQuf2lCdtjbxP1bGNCeKAIxbjTG-JOywnkQCOywnhu_3fLug9948cXxbLwrhlwKwBYo7-H-7Jz8gug29_2Wl3_FnjOLL1NoX6cVdYcLjZnT7V-PD7DpGCcgJ6PwyHoTikcs3Pybs8ggRR6wRumt89uRlH-AMSPWCBL",
    available: true,
    categoryId: "drinks",
  },
  {
    id: 4,
    name: "Collective Mug v.1",
    pointsCost: 2000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk48DxOm4GdD_ctX0dyNLfVamDOsOagUa3DG3SntM1zFnk9CyxvhlJtTHO13GU4inT-2bZ1Zcg1U59SgJ2tEhFctrpAygRmqhE7JBCLwM4jzQ8p_TPwScaiPVpCsIeVepPSXL6jJeJCEMtzOAUlItVRPVoGjQX50UXWZ4eAjcoWSwC0p6wq3DmILwU9J3JXMeYuPWHQZVdo2KHWZlGFaFBZLtHnp8vuIlhe6k3Cg69rrU7vXRZyPxgnadxC9Yt8znBttJivb1Za9lQ",
    available: false,
    categoryId: "merch",
    premium: true,
  },
];

export default function RewardsMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredRewards = selectedCategory === "all" ? rewards : rewards.filter((r) => r.categoryId === selectedCategory);

  return (
    <AppShell>
      {/* Header */}
      <header className="bg-background-light dark:bg-background-dark sticky top-0 z-50 flex items-center justify-between p-4 pb-2">
        <div className="flex size-12 shrink-0 items-center">
          <div className="border-primary/20 aspect-square size-10 rounded-full border-2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${member.avatarUrl}")` }} />
        </div>
        <h2 className="text-accent-dark flex-1 text-center text-lg leading-tight font-bold tracking-tight dark:text-white">
          <span className="font-serif-bold italic">espro.</span> <span className="font-script font-bold not-italic">Collective</span>
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="dark:bg-charcoal flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm">
            <span className="material-symbols-outlined text-accent-dark dark:text-white">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="no-scrollbar flex-1 overflow-y-auto pb-32">
        {/* Greeting */}
        <div className="px-4 pt-4 pb-1">
          <h3 className="text-accent-dark text-3xl leading-tight font-bold tracking-tight dark:text-white">Hello, {member.firstName}!</h3>
          <p className="text-sm font-medium text-[#9e7147] dark:text-[#c5a17e]">{member.tierName}</p>
        </div>

        {/* Balance Card */}
        <div className="p-4">
          <div className="rounded-xl border border-[#e9dbce]/50 bg-white p-5 shadow-sm dark:border-[#423122] dark:bg-[#322416]">
            <div className="mb-3 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold tracking-wider text-[#9e7147] uppercase dark:text-[#c5a17e]">Total Balance</p>
                <p className="text-accent-dark text-3xl font-bold dark:text-white">
                  {member.pointsBalance.toLocaleString()} <span className="text-sm font-medium text-[#9e7147]">pts</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-accent-dark text-sm font-semibold dark:text-white">Rewards to Unlock</p>
                <p className="text-primary text-xs font-bold">Next level: {member.nextLevelPoints.toLocaleString()} pts</p>
              </div>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#e9dbce] dark:bg-[#423122]">
              <div className="bg-primary h-full rounded-full" style={{ width: `${member.progressPct}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-[#9e7147] dark:text-[#c5a17e]">
              <span className="material-symbols-outlined text-sm">local_cafe</span>
              <p className="text-sm font-medium">{member.nextRewardHint}</p>
            </div>
          </div>
        </div>

        {/* Marketplace Header */}
        <div className="flex items-center justify-between px-4">
          <h3 className="text-accent-dark text-xl leading-tight font-bold tracking-tight dark:text-white">Marketplace</h3>
          <Link to="/rewards/history" className="text-primary text-sm font-bold">
            View History
          </Link>
        </div>

        {/* Category Chips */}
        <div className="no-scrollbar flex gap-3 overflow-x-auto p-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 ${
                selectedCategory === cat.id
                  ? "bg-primary shadow-primary/20 text-white shadow-md"
                  : "text-accent-dark border border-[#e9dbce]/50 bg-white dark:border-[#423122] dark:bg-[#322416] dark:text-white"
              }`}
            >
              {cat.icon && <span className="material-symbols-outlined text-lg">{cat.icon}</span>}
              <p className={`text-sm ${selectedCategory === cat.id ? "font-bold" : "font-medium"}`}>{cat.label}</p>
            </button>
          ))}
        </div>

        {/* Reward Grid */}
        <div className="grid grid-cols-2 gap-4 px-4 pb-8">
          {filteredRewards.map((reward) => (
            <div key={reward.id} className={`group flex flex-col gap-3 ${!reward.available ? "opacity-80" : ""}`}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#e9dbce]/50 bg-white shadow-sm dark:border-[#423122] dark:bg-[#322416]">
                <div className={`absolute inset-0 bg-cover bg-center ${!reward.available ? "grayscale" : ""}`} style={{ backgroundImage: `url("${reward.imageUrl}")` }} />
                {!reward.available && (
                  <div className="bg-background-dark/40 absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-white">lock</span>
                  </div>
                )}
                {reward.available && <div className="bg-primary absolute right-2 bottom-2 rounded-lg px-2 py-1 text-[10px] font-bold tracking-tight text-white uppercase">Available</div>}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-accent-dark text-sm leading-tight font-bold dark:text-white">{reward.name}</p>
                  {reward.premium && <span className="material-symbols-outlined text-primary text-[14px]">star</span>}
                </div>
                <p className={`mt-1 text-xs font-bold ${reward.available ? "text-primary" : "text-[#9e7147] dark:text-[#c5a17e]"}`}>{reward.pointsCost.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
