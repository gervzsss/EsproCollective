import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: string;
}

export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, icon = "warning" }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!open) return;

    // Focus the confirm button when dialog opens
    confirmButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }

      // Simple focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-[#141414]/60 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />

      {/* Dialog */}
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description" className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="dark:bg-accent-dark relative flex w-full max-w-85 flex-col items-center overflow-hidden rounded-xl bg-white px-6 pt-8 pb-6 shadow-2xl">
          {/* Handle indicator */}
          <div className="absolute top-2 flex w-full justify-center">
            <div className="h-1.5 w-12 rounded-full bg-[#e9dbce]/60 dark:bg-white/10" />
          </div>

          {/* Icon */}
          <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'wght' 600" }}>
              {icon}
            </span>
          </div>

          {/* Title */}
          <h3 id="dialog-title" className="text-accent-dark pb-2 text-center text-2xl leading-tight font-bold tracking-tight dark:text-white">
            {title}
          </h3>

          {/* Description */}
          <p id="dialog-description" className="text-accent-dark/70 pb-8 text-center text-base leading-relaxed font-normal dark:text-white/70">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3">
            <button
              ref={confirmButtonRef}
              onClick={onConfirm}
              className="bg-primary flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl text-base leading-normal font-bold tracking-wide text-white transition-all hover:brightness-95"
            >
              <span className="truncate">{confirmLabel}</span>
            </button>
            <button
              onClick={onCancel}
              className="text-accent-dark flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#F5E7C6] text-base leading-normal font-bold tracking-wide transition-all hover:brightness-95 dark:bg-white/10 dark:text-white"
            >
              <span className="truncate">{cancelLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
