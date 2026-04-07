import { Skeleton } from "./dashboardShared";

export function DashboardStatCard({ icon, label, value, sub, colorClass, loading }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <div className="mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>{icon}</div>
      </div>
      {loading ? (
        <>
          <Skeleton className="h-7 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </>
      ) : (
        <>
          <p className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark leading-none mb-1">
            {value}
          </p>
          <p className="text-xs text-muted dark:text-muted-dark font-body">{label}</p>
          {sub ? <p className="text-xs text-accent-hover font-semibold font-body mt-1">{sub}</p> : null}
        </>
      )}
    </div>
  );
}
