import { CheckCircle, FolderTree, Star, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function CategoryStats({ stats, statsLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Categories"
        value={stats ? stats.total.toLocaleString("en-IN") : "-"}
        icon={FolderTree}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
        loading={statsLoading}
      />
      <KPICard
        title="Active Categories"
        value={stats ? stats.active.toLocaleString("en-IN") : "-"}
        icon={CheckCircle}
        iconColor="text-accent-hover"
        iconBgColor="bg-accent-light"
        loading={statsLoading}
      />
      <KPICard
        title="Inactive Categories"
        value={stats ? stats.inactive.toLocaleString("en-IN") : "-"}
        icon={XCircle}
        iconColor="text-danger"
        iconBgColor="bg-red-50"
        loading={statsLoading}
      />
      <KPICard
        title="Featured"
        value={stats ? stats.featured.toLocaleString("en-IN") : "-"}
        icon={Star}
        iconColor="text-amber-600"
        iconBgColor="bg-amber-50"
        loading={statsLoading}
      />
    </div>
  );
}
