export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-2">
          {title}
        </h3>
        <p className="text-sm font-body text-muted dark:text-muted-dark mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-body border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm font-body font-semibold text-white transition-colors ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
