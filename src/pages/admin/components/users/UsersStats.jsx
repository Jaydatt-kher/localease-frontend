import { CheckCircle, UserPlus, Users as UsersIcon, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function UsersStats({ statsData, statsLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
      <KPICard
        title="Total Users"
        value={statsData ? statsData.totalUsers.toLocaleString("en-IN") : "-"}
        icon={UsersIcon}
        iconColor="text-primary"
        iconBgColor="bg-primary-light"
        loading={statsLoading}
      />
      <KPICard
        title="Active Users"
        value={statsData ? statsData.activeUsers.toLocaleString("en-IN") : "-"}
        icon={CheckCircle}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        loading={statsLoading}
      />
      <KPICard
        title="Blocked Users"
        value={statsData ? statsData.blockedUsers.toLocaleString("en-IN") : "-"}
        icon={XCircle}
        iconColor="text-danger"
        iconBgColor="bg-red-50"
        loading={statsLoading}
      />
      <KPICard
        title="New This Month"
        value={statsData ? statsData.newThisMonth.toLocaleString("en-IN") : "-"}
        icon={UserPlus}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-50"
        trend={
          statsData
            ? {
                value: statsData.newThisMonthTrend,
                isPositive: (statsData.newThisMonthTrend ?? 0) >= 0,
              }
            : undefined
        }
        loading={statsLoading}
      />
    </div>
  );
}
