import { Bell, BellRing, Briefcase, CheckCheck } from "lucide-react";
import { KPICard } from "../../KPICard";

export function NotificationsKpiGrid({ total, unread, read, bidAccepted }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Notifications"
        value={total.toLocaleString("en-IN")}
        icon={Bell}
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBgColor="bg-indigo-50 dark:bg-indigo-900/20"
      />
      <KPICard
        title="Unread"
        value={unread.toLocaleString("en-IN")}
        icon={BellRing}
        iconColor="text-amber-600 dark:text-amber-400"
        iconBgColor="bg-amber-50 dark:bg-amber-900/20"
      />
      <KPICard
        title="Read"
        value={read.toLocaleString("en-IN")}
        icon={CheckCheck}
        iconColor="text-accent-hover dark:text-green-400"
        iconBgColor="bg-accent-light dark:bg-accent/10"
      />
      <KPICard
        title="Bid Accepted"
        value={bidAccepted.toLocaleString("en-IN")}
        icon={Briefcase}
        iconColor="text-primary dark:text-blue-400"
        iconBgColor="bg-primary-light dark:bg-primary/20"
      />
    </div>
  );
}
