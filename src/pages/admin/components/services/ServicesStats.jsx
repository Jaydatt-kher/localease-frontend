import { CheckCircle, Package, PlusCircle, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function ServicesStats({ stats, statsLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Services"
        value={stats ? stats.total.toLocaleString("en-IN") : "-"}
        icon={Package}
        iconColor="text-primary"
        iconBgColor="bg-primary-light"
        loading={statsLoading}
      />
      <KPICard
        title="Active Services"
        value={stats ? stats.active.toLocaleString("en-IN") : "-"}
        icon={CheckCircle}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        loading={statsLoading}
      />
      <KPICard
        title="Inactive Services"
        value={stats ? stats.inactive.toLocaleString("en-IN") : "-"}
        icon={XCircle}
        iconColor="text-danger"
        iconBgColor="bg-red-50"
        loading={statsLoading}
      />
      <KPICard
        title="New This Month"
        value={stats ? stats.newThisMonth.toLocaleString("en-IN") : "-"}
        icon={PlusCircle}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-50"
        loading={statsLoading}
      />
    </div>
  );
}
