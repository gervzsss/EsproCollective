interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: string;
  destructive?: boolean;
}

export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, icon, destructive = true }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-in zoom-in-95 fade-in w-full max-w-sm duration-200">
        <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#2a1f14]">
          {/* Icon */}
          {icon && (
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#ff4b4b]/10">
              <span className="material-symbols-outlined text-3xl text-[#ff4b4b]">{icon}</span>
            </div>
          )}

          {/* Content */}
          <div className="mb-6 text-center">
            <h3 className="text-accent-dark mb-2 text-xl font-bold dark:text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-white/60">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="text-accent-dark h-12 flex-1 rounded-xl bg-gray-100 font-semibold transition-colors hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`h-12 flex-1 rounded-xl font-semibold text-white transition-colors ${destructive ? "bg-[#ff4b4b] hover:bg-[#ff3333]" : "bg-primary hover:bg-primary/90"}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
