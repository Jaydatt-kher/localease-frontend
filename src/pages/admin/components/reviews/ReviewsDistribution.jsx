import { Star } from "lucide-react";

function barColor(rating) {
  switch (rating) {
    case 5:
      return "bg-accent-hover dark:bg-green-500";
    case 4:
      return "bg-blue-500 dark:bg-blue-400";
    case 3:
      return "bg-amber-500 dark:bg-amber-400";
    case 2:
      return "bg-orange-500 dark:bg-orange-400";
    case 1:
      return "bg-danger dark:bg-red-500";
    default:
      return "bg-gray-400";
  }
}

export function ReviewsDistribution({ distribution, total }) {
  const maxCount = Math.max(...distribution.map((item) => item.count), 1);

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">
        Rating Distribution
      </h3>
      <p className="text-xs font-body text-muted dark:text-muted-dark mb-4">
        Breakdown of all {total.toLocaleString("en-IN")} reviews
      </p>
      <div className="space-y-2.5">
        {distribution.map((item) => {
          const pct = total > 0 ? ((item.count / total) * 100).toFixed(0) : 0;
          const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

          return (
            <div key={item.rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-10 shrink-0">
                <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                  {item.rating}
                </span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>

              <div className="flex-1 bg-background-light dark:bg-surface-alt rounded-full h-7 overflow-hidden">
                <div
                  className={`h-full rounded-full flex items-center justify-end pr-2.5 transition-all duration-500 ${barColor(
                    item.rating
                  )}`}
                  style={{ width: `${barWidth}%`, minWidth: item.count > 0 ? "2rem" : 0 }}
                >
                  {item.count > 0 ? (
                    <span className="text-[11px] font-body font-semibold text-white">{item.count}</span>
                  ) : null}
                </div>
              </div>

              <div className="w-20 text-right shrink-0">
                <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                  {item.count} <span className="text-muted dark:text-muted-dark font-normal">({pct}%)</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
