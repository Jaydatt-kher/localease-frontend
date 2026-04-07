import { FiBriefcase, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import StarRow from "./StarRow";
import { fmtDateTime, PRICE_TYPE_CONFIG } from "./enquiryDetailShared";

export default function BidCard({
  bid,
  isOpen,
  acceptingId,
  onViewProfile,
  onAccept,
}) {
  const p = bid.provider;
  const ptConf = PRICE_TYPE_CONFIG[bid.priceType] ?? PRICE_TYPE_CONFIG.inspection;
  const isAccepted = bid.status === "accepted_by_user";
  const initials = p?.businessName
    ? p.businessName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div
      className={`bg-surface-light dark:bg-surface-dark border rounded-2xl p-5 transition-all ${
        isAccepted
          ? "border-accent shadow-[0_0_0_2px_rgba(76,175,80,0.2)]"
          : "border-border dark:border-border-dark hover:border-primary/40"
      }`}
    >
      {isAccepted && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-accent-light dark:bg-accent/10 text-accent-hover text-xs font-body font-bold">
          <FiCheckCircle size={13} /> This bid was accepted — booking confirmed
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary text-sm border-2 border-primary/20 shrink-0">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {p?.businessName || "Provider"}
            </p>
            {p?.isVerified && <HiCheckBadge size={14} className="text-accent shrink-0" />}
          </div>
          <StarRow value={p?.rating?.average ?? null} />
        </div>

        <div className="shrink-0 text-right">
          <p className="text-lg font-display font-extrabold text-foreground dark:text-foreground-dark leading-tight">
            {bid.price != null ? `₹${bid.price.toLocaleString("en-IN")}` : "TBD"}
          </p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-body ${ptConf.cls}`}>
            {ptConf.label}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {(p?.experienceYears ?? 0) > 0 && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
            <FiBriefcase size={10} />
            {p.experienceYears} yrs exp
          </span>
        )}
        {(p?.completedJobs ?? 0) > 0 && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
            ✓ {p.completedJobs} jobs
          </span>
        )}
        {bid.availableTime && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-primary-light dark:bg-primary/10 text-primary font-body">
            <FiCalendar size={10} />
            {fmtDateTime(bid.availableTime)}
          </span>
        )}
      </div>

      {bid.message && (
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
          <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">
            <span className="font-semibold text-foreground dark:text-foreground-dark">Provider note: </span>
            {bid.message}
          </p>
        </div>
      )}

      {isOpen && !isAccepted && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onViewProfile(p?._id)}
            className="flex-1 py-2 text-xs font-bold border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl hover:border-primary hover:text-primary transition-colors font-body"
          >
            View Profile
          </button>
          <button
            onClick={() => onAccept(bid._id)}
            disabled={acceptingId === bid._id}
            className="flex-1 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 font-body disabled:opacity-60"
          >
            {acceptingId === bid._id ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Confirming…
              </span>
            ) : (
              <>
                <FiCheckCircle size={12} /> Accept &amp; Book
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
