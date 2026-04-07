import { AlertTriangle, MessageSquare, Star, TrendingUp } from "lucide-react";
import { KPICard } from "../../KPICard";

export function ReviewsStats({ kpiTotal, kpiAvg, kpiFiveStar, kpiLow }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Reviews"
        value={kpiTotal.toLocaleString("en-IN")}
        icon={MessageSquare}
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBgColor="bg-indigo-50 dark:bg-indigo-900/20"
      />
      <KPICard
        title="Average Rating"
        value={`${kpiAvg} / 5`}
        icon={Star}
        iconColor="text-amber-500 dark:text-yellow-400"
        iconBgColor="bg-amber-50 dark:bg-amber-900/20"
      />
      <KPICard
        title="5-Star Reviews"
        value={kpiFiveStar.toLocaleString("en-IN")}
        icon={TrendingUp}
        iconColor="text-accent-hover dark:text-green-400"
        iconBgColor="bg-accent-light dark:bg-accent/10"
      />
      <KPICard
        title="Low Ratings (<=2)"
        value={kpiLow.toLocaleString("en-IN")}
        icon={AlertTriangle}
        iconColor="text-danger dark:text-red-400"
        iconBgColor="bg-red-50 dark:bg-red-900/20"
      />
    </div>
  );
}
