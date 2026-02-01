import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/home", icon: "home", label: "Home" },
  { to: "/card", icon: "credit_card", label: "Card" },
  { to: "/rewards", icon: "redeem", label: "Rewards" },
  { to: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="border-charcoal/5 nav-blur dark:bg-background-dark/95 fixed bottom-0 left-1/2 z-50 h-20 w-full max-w-120 -translate-x-1/2 border-t bg-white/80 px-4 pt-2 pb-6 dark:border-white/10">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex flex-1 flex-col items-center gap-1 transition-colors ${isActive ? "text-primary" : "text-charcoal/40 hover:text-primary dark:text-white/40"}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[9px] font-bold tracking-tighter uppercase">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
