import { Loader2, Trash2 } from "lucide-react";

export function ConfirmDialog({ open, name, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-2">
          Deactivate Service?
        </h3>
        <p className="text-sm font-body text-muted dark:text-muted-dark mb-5">
          <span className="font-semibold text-foreground dark:text-foreground-dark">"{name}"</span> will be
          marked as inactive and hidden from customers.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-body border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-body font-semibold text-white bg-danger hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
