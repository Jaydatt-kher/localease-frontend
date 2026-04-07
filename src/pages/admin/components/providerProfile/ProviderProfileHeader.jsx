import { ArrowLeft } from "lucide-react";

export function ProviderProfileHeader({ onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onBack}
        className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Provider Profile</h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          View and manage this provider account
        </p>
      </div>
    </div>
  );
}
