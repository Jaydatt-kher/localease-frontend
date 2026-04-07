import { FiCheckSquare, FiPackage } from "react-icons/fi";
import { IoStarOutline } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { DashboardStatCard } from "./DashboardStatCard";
import { formatCurrency } from "./dashboardShared";

export function StatsGrid({ servicesLoading, profileLoading, myServices, activeServices, completedJobs, avgRating, walletBalance }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <DashboardStatCard
        icon={<FiPackage size={18} />}
        label="Active Services"
        value={servicesLoading ? "-" : activeServices}
        sub={myServices.length > 0 ? `${myServices.length} total` : undefined}
        colorClass="bg-primary-light dark:bg-primary/10 text-primary"
        loading={servicesLoading}
      />
      <DashboardStatCard
        icon={<FiCheckSquare size={18} />}
        label="Completed Jobs"
        value={profileLoading ? "-" : completedJobs}
        colorClass="bg-accent-light dark:bg-accent/10 text-accent-hover"
        loading={profileLoading}
      />
      <DashboardStatCard
        icon={<IoStarOutline size={18} />}
        label="Avg. Rating"
        value={profileLoading ? "-" : avgRating > 0 ? `${avgRating.toFixed(1)}★` : "New"}
        colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
        loading={profileLoading}
      />
      <DashboardStatCard
        icon={<TbCurrencyRupee size={18} />}
        label="Wallet Balance"
        value={profileLoading ? "-" : formatCurrency(walletBalance)}
        colorClass="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
        loading={profileLoading}
      />
    </div>
  );
}
