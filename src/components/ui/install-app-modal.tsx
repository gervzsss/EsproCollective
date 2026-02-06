import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface InstallAppModalProps {
  open: boolean;
  platform: "ios" | "android" | "unknown";
  canInstall: boolean;
  onInstall: () => void;
  onClose: () => void;
}

export default function InstallAppModal({ open, platform, canInstall, onInstall, onClose }: InstallAppModalProps) {
  // Prevent background scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationDuration = prefersReducedMotion ? 0 : 0.3;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="install-modal-title">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="relative mx-auto w-full max-w-md rounded-t-3xl bg-white shadow-2xl dark:bg-[#2a1f14]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: animationDuration,
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-12 rounded-full bg-gray-300 dark:bg-white/20" />
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
              {/* Header */}
              <div className="mb-5 flex items-center gap-4">
                {/* Icon */}
                <div className="bg-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-white">download</span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex-1">
                  <h2 id="install-modal-title" className="text-accent-dark text-xl font-bold tracking-tight dark:text-white">
                    Install Espro
                  </h2>
                  <p className="text-sm text-[#9e7147] dark:text-[#c5a17e]">Get the full app experience</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                  aria-label="Close install dialog"
                >
                  <span className="material-symbols-outlined text-accent-dark text-xl dark:text-white">close</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-accent-dark/80 mb-6 text-[15px] leading-relaxed dark:text-white/80">
                Add Espro Collective to your home screen for faster access, offline support, and a more app-like experience.
              </p>

              {/* Platform-specific content */}
              {platform === "ios" ? <IOSInstructions /> : <AndroidInstructions canInstall={canInstall} />}

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3">
                {platform === "ios" ? (
                  <button
                    onClick={onClose}
                    className="bg-charcoal dark:bg-primary flex h-14 w-full items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                  >
                    Got it
                  </button>
                ) : (
                  <button
                    onClick={onInstall}
                    disabled={!canInstall}
                    className="bg-primary flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-xl">download</span>
                    Install app
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 font-semibold text-gray-600 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function IOSInstructions() {
  return (
    <div className="rounded-2xl border border-black/5 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
      <p className="mb-3 text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase dark:text-white/40">On iPhone & iPad</p>

      <ol className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">1</span>
          <div className="flex flex-1 items-center gap-2 pt-0.5">
            <span className="text-accent-dark text-sm dark:text-white">
              Tap the <span className="font-semibold">Share</span> button
            </span>
            <span className="material-symbols-outlined text-primary text-lg">ios_share</span>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">2</span>
          <div className="flex flex-1 items-center gap-2 pt-0.5">
            <span className="text-accent-dark text-sm dark:text-white">
              Choose <span className="font-semibold">Add to Home Screen</span>
            </span>
            <span className="material-symbols-outlined text-primary text-lg">add_box</span>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">3</span>
          <span className="text-accent-dark flex-1 pt-0.5 text-sm dark:text-white">
            Tap <span className="font-semibold">Add</span>
          </span>
        </li>
      </ol>
    </div>
  );
}

function AndroidInstructions({ canInstall }: { canInstall: boolean }) {
  if (canInstall) {
    return (
      <div className="rounded-2xl border border-black/5 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
        <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-green-600 uppercase dark:text-green-400">Ready to install</p>
        <p className="text-accent-dark text-sm dark:text-white">
          Tap the <span className="font-semibold">Install app</span> button below to add Espro Collective to your home screen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5">
      <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase dark:text-white/40">How to install</p>
      <p className="text-accent-dark text-sm dark:text-white">
        Open the browser menu <span className="material-symbols-outlined text-primary inline-block align-middle text-base">more_vert</span> and tap <span className="font-semibold">Install app</span>{" "}
        or <span className="font-semibold">Add to Home Screen</span>.
      </p>
    </div>
  );
}
