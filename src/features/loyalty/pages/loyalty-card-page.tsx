import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { AppShell, BottomNav } from "@/components/layout";

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

// TODO: Replace mock data with authenticated user data from auth context/state.
// The firstName and other fields should be sourced from the logged-in user's profile.
const member: Member = {
  firstName: "Seb",
  tierName: "Elite",
  tierIcon: "workspace_premium",
  pointsBalance: 1250,
  pointsProgressPct: 69,
  benefits: ["Free Add-on", "Espro Elite"],
  memberSince: "Nov 2023",
  rewardsAvailableCount: 4,
  pointsValidityText: "Points valid for 12 months",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=ESPRO-MEMBER-12345&margin=0",
};

/** Inline topographical wavy lines for the card – positioned on the right side */
function CardTopoPattern() {
  return (
    <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
      <svg className="absolute top-[-10%] right-[-15%] h-[120%] w-[80%] fill-none" viewBox="0 0 400 500" preserveAspectRatio="none">
        {/* Flowing wavy lines – matching the login page topo style */}
        <path d="M350,0 Q380,80 300,130 T350,230 T280,330 T380,500" className="stroke-primary" strokeWidth="1.2" opacity="0.5" />
        <path d="M300,0 Q330,80 250,130 T300,230 T230,330 T330,500" className="stroke-primary" strokeWidth="1.2" opacity="0.45" />
        <path d="M250,0 Q280,80 200,130 T250,230 T180,330 T280,500" className="stroke-primary" strokeWidth="1.2" opacity="0.4" />
        <path d="M400,30 Q320,120 380,220 T320,320 T400,430" className="stroke-primary" strokeWidth="1.2" opacity="0.5" />
        <path d="M400,80 Q340,170 390,270 T330,370 T400,470" className="stroke-primary" strokeWidth="1.2" opacity="0.35" />
        <path d="M200,0 Q230,80 150,150 T200,250 T140,370 T230,500" className="stroke-primary" strokeWidth="1" opacity="0.25" />
      </svg>
    </div>
  );
}

/** Swipe-to-flip thresholds */
const SWIPE_OFFSET_THRESHOLD = 50; // px
const SWIPE_VELOCITY_THRESHOLD = 300; // px/s

export default function LoyaltyCardPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reduced-motion preference
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Drag tracking
  const dragX = useMotionValue(0);
  // Map horizontal drag offset to a subtle rotateY preview (max ±15°)
  const previewRotateY = useTransform(dragX, [-150, 0, 150], [-15, 0, 15]);

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);
    // Only flip if horizontal intent is dominant
    if (absX > absY && (absX > SWIPE_OFFSET_THRESHOLD || Math.abs(velocity.x) > SWIPE_VELOCITY_THRESHOLD)) {
      setIsFlipped((prev) => !prev);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  }, []);

  const flipDuration = prefersReducedMotion ? 0 : 0.5;

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
        {/* Swipe hint */}
        <p className="text-accent-dark/40 mb-4 text-center text-xs font-medium tracking-wide dark:text-white/40">Swipe card to flip</p>

        {/* Flippable Card */}
        <div className="flip-perspective mb-10 flex justify-center">
          <motion.div
            className="flip-inner relative h-135 w-[320px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
            style={{ rotateY: isFlipped ? undefined : previewRotateY }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: flipDuration, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            tabIndex={0}
            role="button"
            aria-label={isFlipped ? "Loyalty card back side. Swipe or press Enter to flip." : "Loyalty card front side. Swipe or press Enter to flip."}
            onKeyDown={handleKeyDown}
          >
            {/* Front face */}
            <div className="flip-face absolute inset-0" aria-hidden={isFlipped}>
              <CardFrontVisual member={member} />
            </div>

            {/* Back face */}
            <div className="flip-face flip-face-back absolute inset-0" aria-hidden={!isFlipped}>
              <CardBackVisual member={member} />
            </div>
          </motion.div>
        </div>

        {/* Contextual content below the card */}
        {!isFlipped ? <MembershipDetails member={member} /> : <ShareButton />}
      </main>

      <BottomNav />
    </AppShell>
  );
}

function CardFrontVisual({ member }: { member: Member }) {
  return (
    <div className="bg-accent-dark card-shadow dark:bg-cream dark:border-primary/10 relative flex h-full w-full flex-col overflow-hidden rounded-4xl border border-white/10">
      {/* Topographical Pattern */}
      <CardTopoPattern />

      <div className="relative z-10 flex h-full flex-col px-7 pt-8 pb-6">
        {/* Name – top left, large & bold */}
        <h3 className="text-espro-cream dark:text-accent-dark text-3xl font-extrabold tracking-tight">{member.firstName}</h3>

        {/* Center – Coffee Cup Illustration + Branding */}
        <div className="-mt-2 flex flex-1 flex-col items-center justify-center">
          <div className="relative mb-2 flex h-48 w-48 items-center justify-center">
            {/* Coffee pour + hand holding cup illustration */}
            <svg className="h-full w-full fill-none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 120 170">
              {/* Pour stream from top */}
              <line x1="60" y1="0" x2="60" y2="52" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="3.5" />
              {/* Splash drops */}
              <circle cx="52" cy="55" r="1.5" className="fill-espro-cream dark:fill-accent-dark" />
              <circle cx="68" cy="53" r="1.2" className="fill-espro-cream dark:fill-accent-dark" />
              <circle cx="56" cy="50" r="1" className="fill-espro-cream dark:fill-accent-dark" />
              {/* Coffee surface */}
              <ellipse cx="60" cy="62" rx="18" ry="4" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.5" />
              {/* Cup body */}
              <path d="M38 58 Q38 82 60 82 Q82 82 82 58" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="2" />
              <line x1="38" y1="58" x2="82" y2="58" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="2" />
              {/* Cup handle */}
              <path d="M82 64 Q92 64 92 73 Q92 82 82 82" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.8" />
              {/* Hand – palm & fingers wrapping under cup */}
              <path d="M35 95 Q30 88 38 82 Q42 78 48 80" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.8" />
              <path d="M85 95 Q90 88 82 82 Q78 78 72 80" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.8" />
              <path d="M35 95 Q38 102 50 105 Q60 107 70 105 Q82 102 85 95" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.8" />
              {/* Thumb */}
              <path d="M35 95 Q32 92 34 88" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="1.5" />
              {/* Wrist / base */}
              <path d="M50 105 Q50 115 48 125" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="2.5" />
              <path d="M70 105 Q70 115 72 125" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="2.5" />
              {/* Saucer / base */}
              <path d="M40 125 Q60 132 80 125" className="stroke-espro-cream dark:stroke-accent-dark" strokeWidth="2" />
              <rect x="52" y="132" width="16" height="22" rx="2" className="stroke-primary" strokeWidth="2" fill="none" />
            </svg>
          </div>
          {/* Brand text */}
          <div className="text-center">
            <h1 className="font-serif-bold text-espro-cream dark:text-accent-dark text-4xl tracking-tight">espro.</h1>
            <p className="font-script text-primary -mt-2 text-3xl">Collective</p>
          </div>
        </div>

        {/* Bottom Section – Points & Tier */}
        <div className="mt-auto">
          {/* Point Balance */}
          <div className="mb-2 flex items-end justify-between">
            <p className="text-espro-cream/70 dark:text-accent-dark/70 text-xs font-semibold">Point Balance</p>
            <p className="text-espro-cream dark:text-accent-dark text-xl font-bold">
              {member.pointsBalance.toLocaleString()} <span className="text-espro-cream/40 dark:text-accent-dark/40 text-[10px] font-black tracking-widest uppercase">pts</span>
            </p>
          </div>
          {/* Progress bar */}
          <div className="dark:bg-accent-dark/10 mb-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(250,129,18,0.5)]" style={{ width: `${member.pointsProgressPct}%` }} />
          </div>
          {/* Divider */}
          <div className="dark:bg-accent-dark/10 mb-4 h-px w-full bg-white/10" />
          {/* Loyalty Card label + Tier badge */}
          <div className="flex items-center justify-between">
            <p className="text-espro-cream dark:text-accent-dark text-[10px] font-extrabold tracking-[0.2em] uppercase">Espro Loyalty Card</p>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined filled text-primary text-2xl">{member.tierIcon}</span>
              <span className="text-primary text-[9px] font-black tracking-widest uppercase">{member.tierName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembershipDetails({ member }: { member: Member }) {
  return (
    <div className="mb-8 flex flex-col gap-6 px-2">
      <div>
        <h4 className="text-accent-dark/50 mb-2 px-1 py-2 text-xs leading-normal font-bold tracking-[0.2em] uppercase dark:text-white/50">Membership Details</h4>
        <div className="border-accent-dark/5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/5">
          <Link to="/tiers" className="group flex cursor-pointer items-center justify-between py-1">
            <span className="text-accent-dark/70 text-sm font-medium dark:text-white/60">Current Tier</span>
            <div className="flex items-center gap-2">
              <span className="text-primary text-sm font-bold">Espro {member.tierName}</span>
              <span className="material-symbols-outlined text-primary text-lg">chevron_right</span>
            </div>
          </Link>
          <div className="bg-accent-dark/5 h-px w-full dark:bg-white/10"></div>
          <div className="flex items-center justify-between py-1">
            <span className="text-accent-dark/70 text-sm font-medium dark:text-white/60">Next Tier Progress</span>
            <span className="text-accent-dark text-sm font-bold dark:text-white">550 pts remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBackVisual({ member }: { member: Member }) {
  return (
    <div className="bg-accent-dark card-shadow dark:bg-cream dark:border-primary/10 relative flex h-full w-full flex-col overflow-hidden rounded-4xl border border-white/10">
      {/* Topographical Pattern */}
      <CardTopoPattern />

      <div className="relative z-10 flex flex-col px-7 pt-8 pb-7">
        {/* QR Code – top center */}
        <div className="flex justify-center">
          <div className="aspect-square w-full max-w-44 overflow-hidden rounded-xl bg-white p-3 shadow-sm">
            <img src={member.qrCodeUrl} alt="Member QR Code" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Scan text */}
        <p className="text-espro-cream dark:text-accent-dark mt-4 text-center text-sm font-bold">Scan this card to collect stickers.</p>

        {/* Terms & conditions text */}
        <div className="mt-3">
          <p className="text-espro-cream/60 dark:text-accent-dark/70 text-[11px] leading-relaxed">
            Earn Espro Points with every purchase made using this Espro Collective QR Promo Card (the &ldquo;Card&rdquo;). The Card must be presented to redeem any reward. Earned points/stickers are
            non-transferable, and lost Cards (including any earned points/stickers) cannot be replaced. Use of this card is governed by and constitutes acceptance of the full Espro Cafe promo terms
            and conditions. For concerns, kindly message us on any social media accounts Espro Cafe.
          </p>
        </div>

        {/* Bottom – Brand logo */}
        <div className="mt-6">
          <div className="text-left">
            <h1 className="font-serif-bold text-espro-cream dark:text-accent-dark text-2xl leading-none tracking-tight">espro.</h1>
            <p className="font-script text-primary -mt-1 text-xl leading-none">Collective</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareButton() {
  return (
    <button className="border-accent-dark/10 mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border bg-white py-4 transition-all active:scale-[0.98] dark:border-white/10 dark:bg-white/5">
      <span className="material-symbols-outlined text-accent-dark/60 text-xl dark:text-white/60">share</span>
      <span className="text-accent-dark/80 text-sm font-bold dark:text-white/80">Share Pass to Wallet</span>
    </button>
  );
}
