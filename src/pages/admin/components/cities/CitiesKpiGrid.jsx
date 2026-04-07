import { CheckCircle, MapPin, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function CitiesKpiGrid({ total, active, inactive }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KPICard
        title="Total Cities"
        value={total.toLocaleString("en-IN")}
        icon={MapPin}
        iconBgColor="bg-blue-50 dark:bg-blue-900/20"
        iconColor="text-blue-600 dark:text-blue-400"
      />
      <KPICard
        title="Active Cities"
        value={active.toLocaleString("en-IN")}
        icon={CheckCircle}
        iconBgColor="bg-green-50 dark:bg-green-900/20"
        iconColor="text-green-600 dark:text-green-400"
      />
      <KPICard
        title="Inactive Cities"
        value={inactive.toLocaleString("en-IN")}
        icon={XCircle}
        iconBgColor="bg-red-50 dark:bg-red-900/20"
        iconColor="text-red-600 dark:text-red-400"
      />
    </div>
  );
}
