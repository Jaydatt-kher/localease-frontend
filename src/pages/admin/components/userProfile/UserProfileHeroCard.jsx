import { CheckCircle, Loader2, ShieldCheck, ShieldOff, Star } from "lucide-react";
import { Avatar, StatusBadge, UserProfileSkeleton } from "./UserProfileShared";

export function UserProfileHeroCard({
  isLoading,
  user,
  actioning,
  onBlock,
  onUnblock,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6">
      {isLoading ? (
        <div className="flex items-start gap-5">
          <UserProfileSkeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1 space-y-3">
            <UserProfileSkeleton className="h-6 w-48" />
            <UserProfileSkeleton className="h-4 w-64" />
            <UserProfileSkeleton className="h-5 w-20" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar name={user?.fullName} size="lg" />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="text-xl font-display font-bold text-foreground dark:text-foreground-dark">
                {user?.fullName}
              </h2>
              <StatusBadge status={user?.status} />
              {user?.isEmailVerified ? (
                <span className="inline-flex items-center gap-1 text-xs font-body text-accent-hover dark:text-green-400">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </span>
              ) : null}
            </div>

            <p className="text-sm font-body text-muted dark:text-muted-dark">{user?.email}</p>

            {user?.loyaltyPoints > 0 ? (
              <div className="flex items-center gap-1.5 mt-2">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-body text-muted dark:text-muted-dark">
                  {user.loyaltyPoints} loyalty pts
                </span>
              </div>
            ) : null}
          </div>

          <div className="sm:ml-auto shrink-0">
            {user?.status === "active" ? (
              <button
                onClick={onBlock}
                disabled={actioning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-danger/40 text-danger dark:text-red-400 text-sm font-body font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition-colors"
              >
                {actioning ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldOff className="w-4 h-4" />}
                Block User
              </button>
            ) : (
              <button
                onClick={onUnblock}
                disabled={actioning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-accent/40 text-accent-hover dark:text-green-400 text-sm font-body font-semibold hover:bg-accent-light dark:hover:bg-accent/10 disabled:opacity-50 transition-colors"
              >
                {actioning ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                Unblock User
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
