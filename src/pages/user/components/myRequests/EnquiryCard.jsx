import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { fmtDate, STATUS_CONFIG } from "./myRequestsShared";

export default function EnquiryCard({ enq, onOpenDetail, onCancel }) {
  const cfg = STATUS_CONFIG[enq.status] ?? STATUS_CONFIG.closed;
  const hasBids = enq.bidsReceived > 0;
  const isOpen = enq.status === "open";

  return (
    <div
      onClick={() => onOpenDetail(enq._id)}
      className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 cursor-pointer hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {enq.service?.name ?? "Service Request"}
            </p>
            {hasBids && isOpen && (
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-white font-body animate-pulse">
                <FiMessageSquare size={10} />
                {enq.bidsReceived} bid{enq.bidsReceived !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="text-xs text-muted dark:text-muted-dark font-mono">
            #{String(enq._id).slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full font-body ${cfg.cls}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
            {cfg.label}
          </span>

          {isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel(enq);
              }}
              className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Cancel request"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted dark:text-muted-dark font-body">
        {enq.location?.address && (
          <span className="flex items-center gap-1">
            <FiMapPin size={11} className="shrink-0" />
            {enq.location.address.slice(0, 40)}
            {enq.location.address.length > 40 ? "…" : ""}
          </span>
        )}
        {enq.prefferedDate && (
          <span className="flex items-center gap-1">
            <FiCalendar size={11} />
            {fmtDate(enq.prefferedDate)}
          </span>
        )}
        {enq.prefferedTime && (
          <span className="flex items-center gap-1">
            <FiClock size={11} />
            {enq.prefferedTime}
          </span>
        )}
      </div>

      {hasBids && isOpen && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-light dark:bg-primary/10 text-primary text-xs font-body font-semibold">
          <HiOutlineBadgeCheck size={14} />
          {enq.bidsReceived} provider{enq.bidsReceived !== 1 ? "s have" : " has"} responded — tap to
          compare &amp; book
          <FiArrowRight size={13} className="ml-auto" />
        </div>
      )}

      {isOpen && !hasBids && (
        <p className="mt-3 text-xs text-muted dark:text-muted-dark font-body italic">
          Waiting for providers to respond…
        </p>
      )}
    </div>
  );
}
