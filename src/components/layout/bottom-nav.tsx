import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/home", icon: "home", label: "Home" },
  { to: "/card", icon: "credit_card", label: "Card" },
  { to: "/rewards", icon: "featured_seasonal_and_gifts", label: "Rewards" },
  { to: "/games", icon: "sports_esports", label: "Games" },
  { to: "/profile", icon: "account_circle", label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="bg-background-light dark:bg-background-dark fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-md border-t border-black/5 px-2 pt-2 pb-4 dark:border-white/10">
      <div className="relative flex items-center justify-between px-2">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="group flex w-14 flex-col items-center justify-center gap-1">
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-[26px] transition-colors ${isActive ? "text-primary" : "text-accent-dark/40 group-active:text-primary dark:text-white/40"}`}
                  style={isActive && item.icon === "home" ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className={`text-[10px] tracking-tight ${isActive ? "text-primary font-bold" : "text-accent-dark/40 group-active:text-primary font-medium dark:text-white/40"}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
