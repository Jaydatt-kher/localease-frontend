import { FiArrowRight, FiCalendar, FiMapPin, FiX } from "react-icons/fi";
import CancelForm from "./CancelForm";
import { fmtDateTime, STATUS } from "./myBookingsShared";

export default function BookingCard({ b, isShowingCancel, onOpenDetail, onShowCancel, onHideCancel }) {
  const s = STATUS[b.bookingStatus] ?? STATUS.confirmed;
  const svcName = b.service?.name ?? "Service";
  const bizName = b.provider?.businessName ?? b.provider?.userId?.fullName ?? "Provider";
  const canCancel = b.bookingStatus === "confirmed";

  return (
    <div
      className="relative bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 border-l-4 transition-all hover:shadow-md"
      style={{ borderLeftColor: s.bar }}
    >
      <div className="cursor-pointer" onClick={() => !isShowingCancel && onOpenDetail(b._id)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-semibold text-muted dark:text-muted-dark">
            {b.bookingId ?? `#${String(b._id).slice(-6).toUpperCase()}`}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-body ${s.cls}`}>
              {s.label}
            </span>
            {!isShowingCancel && <FiArrowRight size={14} className="text-muted dark:text-muted-dark" />}
          </div>
        </div>

        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{svcName}</p>
        <p className="text-xs text-muted dark:text-muted-dark font-body mb-3">by {bizName}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted dark:text-muted-dark font-body">
          <span className="flex items-center gap-1.5">
            <FiCalendar size={11} />
            {fmtDateTime(b.scheduledTime)}
          </span>
          {b.bookingAddress?.text && (
            <span className="flex items-center gap-1.5 max-w-50 truncate">
              <FiMapPin size={11} />
              {b.bookingAddress.text}
            </span>
          )}
        </div>
      </div>

      {canCancel && !isShowingCancel && (
        <div className="mt-3 pt-3 border-t border-border dark:border-border-dark flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowCancel(b._id);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-800/50 text-xs font-body font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiX size={12} /> Cancel Booking
          </button>
        </div>
      )}

      {isShowingCancel && <CancelForm bookingId={b._id} onClose={onHideCancel} />}

      {b.bookingStatus === "cancelled" && b.cancellationReason && (
        <p className="mt-2 text-[11px] text-red-500 dark:text-red-400 font-body italic">
          Reason: {b.cancellationReason}
        </p>
      )}
    </div>
  );
}
