import { FiChevronRight, FiClock, FiPackage, FiUser } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { PRICE_TYPE_LABEL, STATUS_CFG, fmtDateTime } from "./ProviderBookingsShared";

export function BookingCard({ booking, onClick }) {
  const cfg = STATUS_CFG[booking.bookingStatus] ?? STATUS_CFG.confirmed;

  return (
    <button
      onClick={() => onClick(booking._id)}
      className="w-full text-left bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 hover:border-primary hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <FiPackage size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {booking.service?.name ?? "Service Booking"}
            </p>
            <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border font-body flex items-center gap-1 ${cfg.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotCls} shrink-0`} />
              {cfg.label}
            </span>
          </div>

          <p className="text-xs font-body text-muted dark:text-muted-dark mb-2 flex items-center gap-1">
            <FiUser size={10} /> {booking.user?.fullName ?? "Customer"}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark font-body mb-2">
            <FiClock size={11} className="text-primary shrink-0" />
            {fmtDateTime(booking.scheduledTime)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {booking.finalAmount != null ? (
                <span className="flex items-center gap-0.5 text-sm font-display font-extrabold text-accent-hover">
                  <TbCurrencyRupee size={14} />{Number(booking.finalAmount).toLocaleString("en-IN")}
                  <span className="text-[10px] text-muted dark:text-muted-dark font-body font-normal ml-0.5">final</span>
                </span>
              ) : booking.quotedPrice != null ? (
                <span className="flex items-center gap-0.5 text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                  <TbCurrencyRupee size={13} />{Number(booking.quotedPrice).toLocaleString("en-IN")}
                  <span className="text-[10px] text-muted dark:text-muted-dark font-normal ml-0.5">
                    {booking.priceType === "hourly" ? "/hr" : "quoted"}
                  </span>
                </span>
              ) : (
                <span className="text-xs text-muted dark:text-muted-dark font-body italic">Price TBD</span>
              )}
              {booking.priceType ? (
                <span className="text-[10px] font-body px-2 py-0.5 rounded-full bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark">
                  {PRICE_TYPE_LABEL[booking.priceType] ?? booking.priceType}
                </span>
              ) : null}
            </div>
            <FiChevronRight size={15} className="text-muted dark:text-muted-dark group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </button>
  );
}
