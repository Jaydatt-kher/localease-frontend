import { CheckCircle, Clock, DollarSign, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function PaymentsKpiGrid({ total, revenue, pending, failed }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Payments"
        value={total.toLocaleString("en-IN")}
        icon={DollarSign}
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBgColor="bg-indigo-50 dark:bg-indigo-900/20"
      />
      <KPICard
        title="Total Revenue"
        value={`₹${revenue.toLocaleString("en-IN")}`}
        icon={CheckCircle}
        iconColor="text-accent-hover dark:text-green-400"
        iconBgColor="bg-accent-light dark:bg-accent/10"
      />
      <KPICard
        title="Pending Payments"
        value={pending.toLocaleString("en-IN")}
        icon={Clock}
        iconColor="text-amber-600 dark:text-amber-400"
        iconBgColor="bg-amber-50 dark:bg-amber-900/20"
      />
      <KPICard
        title="Failed Payments"
        value={failed.toLocaleString("en-IN")}
        icon={XCircle}
        iconColor="text-danger dark:text-red-400"
        iconBgColor="bg-red-50 dark:bg-red-900/20"
      />
    </div>
  );
}
