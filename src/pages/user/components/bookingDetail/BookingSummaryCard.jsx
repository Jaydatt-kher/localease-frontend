import { FiCalendar, FiMapPin } from "react-icons/fi";
import DetailRow from "./DetailRow";
import { fmtDateTime } from "./bookingDetailShared";

export default function BookingSummaryCard({
  booking,
  service,
  statusConfig,
  priceTypeLabel,
  showQuotedPrice,
  showFinalAmount,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg font-display font-extrabold text-foreground dark:text-foreground-dark">
            {service?.name ?? "Booking"}
          </h1>
          <p className="text-xs font-mono text-muted dark:text-muted-dark mt-0.5">
            {booking.bookingId ?? `#${String(booking._id).slice(-8).toUpperCase()}`}
          </p>
        </div>
        <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full font-body ${statusConfig.cls}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="space-y-0">
        <DetailRow label="Scheduled" value={fmtDateTime(booking.scheduledTime)} />
        <DetailRow label="Address" value={booking.bookingAddress?.text} />
        <DetailRow label="Pricing" value={priceTypeLabel} />
        {showQuotedPrice && (
          <DetailRow
            label={booking.priceType === "hourly" ? "Rate" : "Quoted"}
            value={`₹${booking.quotedPrice?.toLocaleString("en-IN")}`}
          />
        )}
        {booking.priceType === "hourly" && booking.hoursWorked && (
          <DetailRow
            label="Hours Worked"
            value={`${booking.hoursWorked} hr${booking.hoursWorked !== 1 ? "s" : ""}`}
          />
        )}
        {showFinalAmount && (
          <DetailRow label="Final Amount" value={`₹${booking.finalAmount?.toLocaleString("en-IN")}`} />
        )}
        {!showFinalAmount && booking.priceType !== "fixed" && (
          <div className="flex items-start justify-between py-2.5 border-b border-border dark:border-border-dark last:border-0">
            <span className="text-sm text-muted dark:text-muted-dark font-body">Final Amount</span>
            <span className="text-sm font-body text-amber-600 dark:text-amber-400 font-semibold">
              {booking.priceType === "inspection" ? "After inspection" : "After job completion"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
