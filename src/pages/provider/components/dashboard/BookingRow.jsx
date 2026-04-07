import { useNavigate } from "react-router-dom";
import { formatDate, BOOKING_STATUS } from "./dashboardShared";

export function BookingRow({ booking }) {
  const navigate = useNavigate();
  const status = BOOKING_STATUS[booking.bookingStatus] || BOOKING_STATUS.confirmed;

  return (
    <div
      onClick={() => navigate(`/provider/bookings/${booking._id}`)}
      className="flex items-center gap-3 py-3 border-b border-border dark:border-border-dark last:border-0 cursor-pointer hover:bg-background-light dark:hover:bg-surface-alt px-1 rounded-xl transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body truncate">
          {booking.service?.name || "Service"}
        </p>
        <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">{formatDate(booking.scheduledTime)}</p>
      </div>
      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full font-body ${status.cls}`}>
        {status.label}
      </span>
    </div>
  );
}
