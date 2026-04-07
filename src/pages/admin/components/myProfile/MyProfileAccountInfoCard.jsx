import { Calendar, Clock, User } from "lucide-react";

export function MyProfileAccountInfoCard({ accountCreatedDate, lastUpdateDate }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
      <div className="px-5 py-4 border-b border-border dark:border-border-dark flex items-center gap-3">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
          <Calendar className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">
          Account Information
        </h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-4">
          <div className="mt-0.5">
            <Clock className="w-4 h-4 text-muted dark:text-muted-dark opacity-60" />
          </div>
          <div>
            <p className="text-[11px] font-body text-muted dark:text-muted-dark uppercase tracking-widest font-semibold mb-0.5">
              Account Created
            </p>
            <p className="text-sm font-body text-foreground dark:text-foreground-dark">{accountCreatedDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-0.5">
            <User className="w-4 h-4 text-muted dark:text-muted-dark opacity-60" />
          </div>
          <div>
            <p className="text-[11px] font-body text-muted dark:text-muted-dark uppercase tracking-widest font-semibold mb-0.5">
              Last Profile Update
            </p>
            <p className="text-sm font-body text-foreground dark:text-foreground-dark">{lastUpdateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
