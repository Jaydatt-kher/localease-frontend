import { BookOpen } from "lucide-react";
import { BookingBadge, fmtCurrency, fmtDate, UserProfileSkeleton } from "./UserProfileShared";

const TABLE_HEADS = ["Booking ID", "Service", "Provider", "Date", "Status", "Amount"];

export function UserProfileRecentBookings({ isLoading, bookings }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border dark:border-border-dark">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Recent Bookings</h3>
        <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">Last 10 bookings</p>
      </div>

      {isLoading ? (
        <div className="p-5 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <UserProfileSkeleton key={i} className="h-12" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-14 text-muted dark:text-muted-dark">
          <BookOpen className="w-8 h-8 opacity-25" />
          <p className="text-sm font-body">No bookings yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-130">
            <thead>
              <tr className="bg-background-light dark:bg-surface-alt">
                {TABLE_HEADS.map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-border-dark">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-mono text-muted dark:text-muted-dark">
                      #{booking.bookingId?.slice(-8) ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-body text-foreground dark:text-foreground-dark truncate max-w-30 block">
                      {booking.serviceName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-body text-muted dark:text-muted-dark truncate max-w-30 block">
                      {booking.providerName}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-body text-muted dark:text-muted-dark">
                      {fmtDate(booking.scheduledTime)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <BookingBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                      {booking.amount != null ? fmtCurrency(booking.amount) : "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
