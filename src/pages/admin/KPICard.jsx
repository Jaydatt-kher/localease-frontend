import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function KPICard({ title, value, icon: Icon, iconColor, iconBgColor, trend, loading }) {
  const trendVal = trend?.value;
  const isPositive = trend?.isPositive ?? true;
  const label = trend?.label ?? "vs last month";

  return (
    <div className="
      relative overflow-hidden rounded-2xl border border-border dark:border-border-dark
      bg-surface-light dark:bg-surface-dark
      p-5 flex flex-col gap-4
      shadow-sm hover:shadow-md transition-shadow duration-200
      animate-fade-in-up
    ">
      {}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark mb-1">
            {title}
          </p>
          {loading ? (
            <div className="skeleton h-8 w-28 rounded-lg" />
          ) : (
            <p className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {value}
            </p>
          )}
        </div>

        {}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgColor} dark:bg-opacity-20`}>
          {Icon && <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />}
        </div>
      </div>

      {}
      {trendVal !== undefined && (
        <div className="flex items-center gap-1.5">
          {loading ? (
            <div className="skeleton h-4 w-36 rounded" />
          ) : trendVal === null ? (
            <div className="flex items-center gap-1 text-muted dark:text-muted-dark">
              <Minus className="w-3.5 h-3.5" />
              <span className="text-xs font-body">No previous data</span>
            </div>
          ) : (
            <>
              <div className={`flex items-center gap-0.5 text-xs font-body font-bold px-1.5 py-0.5 rounded-full
                ${isPositive
                  ? "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400"
                }`}
              >
                {isPositive
                  ? <TrendingUp className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />
                }
                <span>{Math.abs(trendVal)}%</span>
              </div>
              <span className="text-xs font-body text-muted dark:text-muted-dark">{label}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
