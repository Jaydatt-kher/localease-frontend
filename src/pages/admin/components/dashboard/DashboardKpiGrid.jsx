import {
  Banknote,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { KPICard } from "../../KPICard";
import { fmtCurrency, fmtNumber } from "./dashboardUtils";

export function DashboardKpiGrid({ kpis, kpiLoading }) {
  const totalUsers = kpis ? fmtNumber(kpis.totalUsers) : "-";
  const activeProviders = kpis ? fmtNumber(kpis.activeProviders) : "-";
  const pendingProviders = kpis ? fmtNumber(kpis.pendingProviders) : "-";
  const totalBookings = kpis ? fmtNumber(kpis.totalBookings) : "-";
  const totalRevenue = kpis ? fmtCurrency(kpis.totalRevenue) : "-";
  const platformEarnings = kpis ? fmtCurrency(kpis.totalEarnings) : "-";
  const last30Bookings = kpis ? fmtNumber(kpis.bookingsLast30) : "-";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger">
      <KPICard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        iconColor="text-primary"
        iconBgColor="bg-primary-light"
        trend={kpis ? { value: kpis.usersTrend, isPositive: (kpis.usersTrend ?? 0) >= 0 } : undefined}
        loading={kpiLoading}
      />
      <KPICard
        title="Active Providers"
        value={activeProviders}
        icon={CheckCircle}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        trend={
          kpis ? { value: kpis.activeProvidersTrend, isPositive: (kpis.activeProvidersTrend ?? 0) >= 0 } : undefined
        }
        loading={kpiLoading}
      />
      <KPICard
        title="Pending Approval"
        value={pendingProviders}
        icon={Clock}
        iconColor="text-warning"
        iconBgColor="bg-amber-50"
        loading={kpiLoading}
      />
      <KPICard
        title="Total Bookings"
        value={totalBookings}
        icon={Calendar}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
        trend={kpis ? { value: kpis.bookingsTrend, isPositive: (kpis.bookingsTrend ?? 0) >= 0 } : undefined}
        loading={kpiLoading}
      />
      <KPICard
        title="Total Revenue"
        value={totalRevenue}
        icon={DollarSign}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        trend={kpis ? { value: kpis.revenueTrend, isPositive: (kpis.revenueTrend ?? 0) >= 0 } : undefined}
        loading={kpiLoading}
      />
      <KPICard
        title="Platform Earnings"
        value={platformEarnings}
        icon={Banknote}
        iconColor="text-green-600"
        iconBgColor="bg-green-50"
        trend={kpis ? { value: kpis.earningsTrend, isPositive: (kpis.earningsTrend ?? 0) >= 0 } : undefined}
        loading={kpiLoading}
      />
      <KPICard
        title="Bookings (Last 30 Days)"
        value={last30Bookings}
        icon={TrendingUp}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-50"
        loading={kpiLoading}
      />
    </div>
  );
}
