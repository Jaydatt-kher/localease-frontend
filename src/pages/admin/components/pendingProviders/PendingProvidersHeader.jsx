import { ArrowLeft } from "lucide-react";

export function PendingProvidersHeader({ pendingCount, onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onBack}
        className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
        aria-label="Back to Providers"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark flex items-center gap-2.5">
          Pending Providers
          {pendingCount > 0 ? (
            <span className="px-2.5 py-0.5 text-sm rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-body font-semibold">
              {pendingCount}
            </span>
          ) : null}
        </h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          Review and approve new provider registrations
        </p>
      </div>
    </div>
  );
}
