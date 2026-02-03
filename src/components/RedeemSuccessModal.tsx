interface RedeemSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  statusProgress: number;
}

export default function RedeemSuccessModal({ isOpen, onClose, points, statusProgress }: RedeemSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dark:bg-background-dark fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-between bg-white">
      {/* Confetti decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary absolute top-[10%] left-[15%] h-2 w-2 rotate-12 rounded-sm opacity-60" />
        <div className="bg-primary absolute top-[15%] right-[20%] h-4 w-2 rotate-45 rounded-sm opacity-60" />
        <div className="bg-primary absolute top-[40%] left-[5%] h-3 w-3 -rotate-12 rounded-full opacity-60" />
        <div className="bg-primary absolute top-[35%] right-[10%] h-2 w-2 rotate-110 rounded-sm opacity-60" />
        <div className="bg-primary absolute bottom-[30%] left-[12%] h-2 w-2 rotate-45 rounded-sm opacity-60" />
        <div className="bg-primary absolute right-[15%] bottom-[45%] h-2 w-2 rotate-12 rounded-full opacity-60" />
        <div className="bg-primary absolute top-[60%] left-[25%] h-2 w-2 -rotate-45 rounded-sm opacity-60" />
        <div className="bg-primary absolute right-[30%] bottom-[20%] h-1 w-4 rotate-30 rounded-sm opacity-60" />
        <div className="bg-primary absolute top-[5%] left-[50%] h-2 w-2 rotate-90 rounded-sm opacity-60" />
      </div>

      {/* Main Content */}
      <div className="z-10 flex w-full flex-1 flex-col items-center justify-center px-8">
        {/* Success Icon */}
        <div className="relative mb-10">
          <div className="bg-primary flex h-24 w-24 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(250,129,18,0.3)]">
            <span className="material-symbols-outlined text-5xl font-bold text-white" style={{ fontVariationSettings: "'wght' 700" }}>
              check
            </span>
          </div>
          <div className="bg-primary absolute inset-0 h-24 w-24 scale-125 rounded-full opacity-20" />
        </div>

        {/* Title */}
        <h1 className="text-charcoal font-display mb-8 text-center text-2xl leading-tight font-extrabold dark:text-white">Payment &amp; Points Successful!</h1>

        {/* Transaction Card */}
        <div className="flex w-full max-w-[320px] flex-col items-center gap-2 rounded-2xl border border-gray-50 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/5 dark:bg-white/5">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Transaction Reward</p>
          <div className="flex items-center gap-2">
            <span className="text-primary font-display text-3xl font-extrabold">+{points}</span>
            <span className="text-charcoal text-lg font-bold dark:text-white">Espro Points</span>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 mt-4 flex items-center gap-2 rounded-full px-4 py-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <p className="text-primary text-xs font-bold">Elite Status Progress +{statusProgress}%</p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="z-10 flex w-full flex-col items-center gap-6 px-8 pb-12">
        <button onClick={onClose} className="bg-charcoal dark:text-charcoal h-16 w-full rounded-2xl text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] dark:bg-white">
          Back to Home
        </button>
        <button className="hover:text-charcoal text-sm font-bold text-gray-400 transition-colors dark:text-gray-500 dark:hover:text-white">View Receipt</button>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-1 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-200 dark:bg-white/20" />
    </div>
  );
}
