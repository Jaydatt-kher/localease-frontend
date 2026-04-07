import { FiCalendar, FiClock, FiMapPin, FiX } from "react-icons/fi";
import { fmtDate } from "./enquiryDetailShared";

export default function EnquirySummaryCard({
  enquiry,
  statusCfg,
  isOpen,
  cancelling,
  onCancel,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-lg font-display font-extrabold text-foreground dark:text-foreground-dark">
            {enquiry.service?.name ?? "Service Request"}
          </h1>
          <p className="text-xs text-muted dark:text-muted-dark font-body font-mono mt-0.5">
            #{String(enquiry._id).slice(-8).toUpperCase()}
          </p>
        </div>
        <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full font-body ${statusCfg.cls}`}>
          {statusCfg.label}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {enquiry.location?.address && (
          <div className="flex items-start gap-2 text-muted dark:text-muted-dark font-body">
            <FiMapPin size={13} className="text-primary mt-0.5 shrink-0" />
            <span>{enquiry.location.address}</span>
          </div>
        )}
        {enquiry.prefferedDate && (
          <div className="flex items-center gap-2 text-muted dark:text-muted-dark font-body">
            <FiCalendar size={13} className="text-primary" />
            {fmtDate(enquiry.prefferedDate)}
          </div>
        )}
        {enquiry.prefferedTime && (
          <div className="flex items-center gap-2 text-muted dark:text-muted-dark font-body">
            <FiClock size={13} className="text-primary" />
            {enquiry.prefferedTime}
          </div>
        )}
      </div>

      {enquiry.message && (
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
          <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">
            <span className="font-semibold text-foreground dark:text-foreground-dark">Your note: </span>
            {enquiry.message}
          </p>
        </div>
      )}

      {isOpen && (
        <button
          onClick={onCancel}
          disabled={cancelling}
          className="mt-4 flex items-center gap-1.5 text-xs font-body font-semibold text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          <FiX size={13} /> Cancel this request
        </button>
      )}
    </div>
  );
}
