import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { KPICard } from "../../KPICard";

export function BookingsKpiGrid({ totalBookingsCount, activeBookings, completedBookings, cancelledBookings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Bookings"
        value={totalBookingsCount.toLocaleString("en-IN")}
        icon={Calendar}
        iconColor="text-indigo-600"
        iconBgColor="bg-indigo-50"
      />
      <KPICard
        title="Active Bookings"
        value={activeBookings.toLocaleString("en-IN")}
        icon={Clock}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-50 dark:bg-blue-900/20"
      />
      <KPICard
        title="Completed Bookings"
        value={completedBookings.toLocaleString("en-IN")}
        icon={CheckCircle}
        iconColor="text-accent-hover dark:text-green-400"
        iconBgColor="bg-accent-light dark:bg-accent/10"
      />
      <KPICard
        title="Cancelled Bookings"
        value={cancelledBookings.toLocaleString("en-IN")}
        icon={XCircle}
        iconColor="text-danger"
        iconBgColor="bg-red-50 dark:bg-red-900/20"
      />
    </div>
  );
}
