import { FiClock, FiMessageSquare } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import SectionCard from "./SectionCard";
import { fmtDuration, PRICE_TYPE } from "./providerProfileShared";

export default function ServicesSection({
  services,
  isVacation,
  providerBusinessName,
  onEnquiry,
}) {
  if (services.length === 0) return null;

  return (
    <SectionCard title="Services Offered" icon={<TbCurrencyRupee size={16} />}>
      <div className="divide-y divide-border dark:divide-border-dark">
        {services.map((ps) => {
          const svc = ps.serviceId;
          const ptConf = PRICE_TYPE[ps.priceType] ?? PRICE_TYPE.inspection;

          return (
            <div key={ps._id} className="flex items-start gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-0.5">
                  {svc?.name ?? "Service"}
                </p>
                {svc?.description && (
                  <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed mb-2 line-clamp-2">
                    {svc.description}
                  </p>
                )}
                {ps.description && (
                  <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed mb-2 line-clamp-2 italic">
                    "{ps.description}"
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {ps.duration && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
                      <FiClock size={10} /> ~{fmtDuration(ps.duration)}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-2">
                <p className="text-base font-display font-extrabold text-foreground dark:text-foreground-dark">
                  ₹{ps.price?.toLocaleString("en-IN")}
                </p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-body ${ptConf.cls}`}>
                  {ptConf.label}
                </span>
                {!isVacation && (
                  <button
                    onClick={() => onEnquiry(svc?._id, svc?.name ?? providerBusinessName)}
                    className="flex items-center gap-1 text-xs font-body font-semibold px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    <FiMessageSquare size={11} /> Enquire
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
