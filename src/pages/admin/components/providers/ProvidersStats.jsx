import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function ProvidersStats({ statsData, statsLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Providers"
        value={statsData ? statsData.total.toLocaleString("en-IN") : "-"}
        icon={Briefcase}
        iconColor="text-primary"
        iconBgColor="bg-primary-light"
        loading={statsLoading}
      />
      <KPICard
        title="Approved"
        value={statsData ? statsData.approved.toLocaleString("en-IN") : "-"}
        icon={CheckCircle}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        loading={statsLoading}
      />
      <KPICard
        title="Pending Approval"
        value={statsData ? statsData.pending.toLocaleString("en-IN") : "-"}
        icon={Clock}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
        loading={statsLoading}
      />
      <KPICard
        title="Blocked"
        value={statsData ? statsData.blocked.toLocaleString("en-IN") : "-"}
        icon={XCircle}
        iconColor="text-danger"
        iconBgColor="bg-red-50"
        loading={statsLoading}
      />
    </div>
  );
}
