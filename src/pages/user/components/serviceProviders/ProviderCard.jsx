import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { PRICE_TYPE_CONFIG } from "./serviceProvidersShared";
import { StarRow } from "./StarRow";

export function ProviderCard({ item, onEnquire, onView }) {
  const p = item.provider;
  const ptConfig = PRICE_TYPE_CONFIG[item.priceType] ?? PRICE_TYPE_CONFIG.inspection;
  const initials = p?.businessName
    ? p.businessName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary text-sm border-2 border-primary/20 shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {p?.businessName || "Provider"}
            </p>
            {p?.isVerified ? <HiCheckBadge size={15} className="text-accent shrink-0" /> : null}
          </div>
          <StarRow value={p?.rating?.average ?? null} count={p?.rating?.count ?? 0} />
        </div>
        <div className="shrink-0 text-right">
          <p className="text-base font-display font-extrabold text-foreground dark:text-foreground-dark leading-tight">
            {item.price != null ? `₹${item.price.toLocaleString("en-IN")}` : "-"}
          </p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-body ${ptConfig.cls}`}>
            {ptConfig.label}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(p?.experienceYears ?? 0) > 0 ? (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
            <FiBriefcase size={11} />
            {p.experienceYears} yrs
          </span>
        ) : null}
        {(p?.completedJobs ?? 0) > 0 ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
            ✓ {p.completedJobs} jobs
          </span>
        ) : null}
        {item.duration ? (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
            <FiClock size={11} />
            {item.duration < 60
              ? `${item.duration}m`
              : `${Math.floor(item.duration / 60)}h${item.duration % 60 ? ` ${item.duration % 60}m` : ""}`}
          </span>
        ) : null}
      </div>

      {item.description ? (
        <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>
      ) : null}

      <div className="flex gap-2">
        <button
          onClick={() => onView(p?._id)}
          className="flex-1 py-2 text-xs font-bold border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl hover:border-primary hover:text-primary transition-colors font-body"
        >
          View Profile
        </button>
        <button
          onClick={() => onEnquire(p?._id)}
          className="flex-1 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-1 font-body"
        >
          <FiMessageSquare size={12} /> Enquire
        </button>
      </div>
    </div>
  );
}
