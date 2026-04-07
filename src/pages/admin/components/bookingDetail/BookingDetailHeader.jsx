import { ArrowLeft } from "lucide-react";
import { Skeleton, StatusBadge } from "./BookingDetailShared";

export function BookingDetailHeader({ isLoading, booking, onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onBack}
        className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
        aria-label="Back to bookings"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">
            Booking Detail
          </h1>
          {isLoading ? <Skeleton className="h-6 w-24" /> : booking ? <StatusBadge status={booking.bookingStatus} /> : null}
        </div>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          {isLoading ? "Loading..." : booking ? `ID: ${booking.bookingId}` : "-"}
        </p>
      </div>
    </div>
  );
}
