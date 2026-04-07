import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { BookingRow } from "./BookingRow";
import { Skeleton } from "./dashboardShared";

export function RecentBookingsCard({ bookingsLoading, activeBookings, myServicesCount, onOpenAll }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary">
            <FiCalendar size={18} />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">Recent Bookings</h3>
            <p className="text-xs text-muted dark:text-muted-dark font-body">Upcoming and active appointments</p>
          </div>
        </div>
        <button
          onClick={onOpenAll}
          className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors font-body flex items-center gap-1"
        >
          View all <FiArrowRight size={13} />
        </button>
      </div>

      <div className="px-5 py-2">
        {bookingsLoading ? (
          <div className="space-y-3 py-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : activeBookings.length === 0 ? (
          <div className="py-10 flex flex-col items-center gap-2 text-muted dark:text-muted-dark">
            <FiCalendar size={28} className="opacity-40" />
            <p className="text-sm font-body">
              {myServicesCount === 0 ? "Add a service first to start receiving bookings." : "No upcoming bookings right now."}
            </p>
          </div>
        ) : (
          activeBookings.slice(0, 5).map((booking) => <BookingRow key={booking._id} booking={booking} />)
        )}
      </div>
    </div>
  );
}
