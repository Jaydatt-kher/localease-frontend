import { Ban, BookOpen, CheckCircle, Clock, DollarSign } from "lucide-react";
import { fmtCurrency, StatCard, UserProfileSkeleton } from "./UserProfileShared";

export function UserProfileStatsGrid({ isLoading, stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => <UserProfileSkeleton key={i} className="h-[76px]" />)
      ) : (
        <>
          <StatCard
            label="Total Bookings"
            value={stats?.total ?? 0}
            icon={BookOpen}
            iconColor="text-primary"
            iconBg="bg-primary-light"
          />
          <StatCard
            label="Completed"
            value={stats?.completed ?? 0}
            icon={CheckCircle}
            iconColor="text-accent-hover"
            iconBg="bg-accent-light"
          />
          <StatCard
            label="In Progress"
            value={stats?.inProgress ?? 0}
            icon={Clock}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
          <StatCard
            label="Cancelled"
            value={stats?.cancelled ?? 0}
            icon={Ban}
            iconColor="text-danger"
            iconBg="bg-red-50"
          />
          <StatCard
            label="Total Spent"
            value={fmtCurrency(stats?.totalSpent)}
            icon={DollarSign}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
          />
        </>
      )}
    </div>
  );
}
