import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";
import { TbCurrencyRupee } from "react-icons/tb";
import { useGetMyBookingsQuery } from "../../../../api/bookingApi";
import { BOOKING_STATUS, formatDateTime, PAYMENT_STATUS } from "./ProfileShared";

export function PaymentsTab() {
  const { data: allBookings = [], isLoading, isError } = useGetMyBookingsQuery();
  const navigate = useNavigate();

  const bookings = allBookings.filter((b) => b.bookingStatus === "completed" || b.payment);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
            <div className="flex justify-between mb-3">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-5 w-20 rounded-full" />
            </div>
            <div className="skeleton h-3 w-48 rounded mb-2" />
            <div className="skeleton h-3 w-36 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
        <FiAlertCircle size={36} className="text-red-400" />
        <p className="font-body text-sm">Could not load payments. Please try again.</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
        <MdOutlinePayments size={48} className="opacity-30" />
        <p className="font-display font-bold text-foreground dark:text-foreground-dark">No payment history yet</p>
        <p className="text-sm font-body">Your completed booking payments will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => {
        const bs = BOOKING_STATUS[booking.bookingStatus] ?? BOOKING_STATUS.confirmed;
        const ps = PAYMENT_STATUS[booking.payment?.paymentStatus] ?? null;
        const amt = booking.finalAmount ?? booking.quotedPrice ?? null;

        return (
          <div
            key={booking._id}
            onClick={() => navigate(`/my-bookings/${booking._id}`)}
            className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
                  {booking.service?.name ?? "Service"}
                </p>
                <p className="text-xs text-muted dark:text-muted-dark font-body">
                  {booking.provider?.businessName ?? "Provider"} · {formatDateTime(booking.scheduledTime)}
                </p>
              </div>
              <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full font-body ${bs.cls}`}>{bs.label}</span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border dark:border-border-dark">
              <div className="flex items-center gap-1 text-base font-display font-extrabold text-foreground dark:text-foreground-dark">
                {amt != null ? (
                  <>
                    <TbCurrencyRupee size={17} />
                    {amt.toLocaleString("en-IN")}
                  </>
                ) : (
                  <span className="text-sm font-body text-muted dark:text-muted-dark">Amount pending</span>
                )}
              </div>
              <div className="text-right">
                {booking.payment ? (
                  <>
                    <p className={`text-xs font-body font-bold ${ps?.cls ?? "text-muted dark:text-muted-dark"}`}>
                      {ps?.label ?? booking.payment.paymentStatus}
                    </p>
                    <p className="text-[10px] text-muted dark:text-muted-dark font-body capitalize">
                      {booking.payment.paymentMethod?.replace("_", " ") ?? "-"}
                    </p>
                  </>
                ) : (
                  <p className="text-xs font-body text-muted dark:text-muted-dark">No payment record</p>
                )}
              </div>
            </div>

            <p className="text-[10px] text-muted dark:text-muted-dark font-mono mt-2">{booking.bookingId}</p>
          </div>
        );
      })}

      <div className="hidden" aria-hidden>
        <FiClock size={1} />
        <FiCheckCircle size={1} />
      </div>
    </div>
  );
}
