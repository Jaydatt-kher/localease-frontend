import { useState } from "react";
import { FiClock, FiEdit2, FiMapPin } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { BidForm } from "./BidForm";
import { fmtDate, STATUS_CFG, timeAgo } from "./requestsShared";

export function BidHistoryCard({ item }) {
  const [showUpdate, setShowUpdate] = useState(false);

  const enquiry = item.enquiry;
  const service = enquiry?.service;
  const location = enquiry?.location;
  const cfg = STATUS_CFG[item.status] ?? STATUS_CFG.pending;
  const canUpdate = item.status === "responded" && enquiry?.status === "open";

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
            {service?.name ?? "Service Request"}
          </p>
          <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">{timeAgo(item.createdAt)}</p>
        </div>
        <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border font-body ${cfg.cls}`}>
          {cfg.label}
        </span>
      </div>

      {location?.address ? (
        <div className="flex items-start gap-2 text-xs text-muted dark:text-muted-dark font-body mb-2">
          <FiMapPin size={12} className="shrink-0 mt-0.5 text-primary" />
          <span className="line-clamp-1">{location.address}</span>
        </div>
      ) : null}

      {item.status !== "pending" ? (
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {item.price != null ? (
            <span className="flex items-center gap-0.5 text-xs font-bold px-2.5 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
              <TbCurrencyRupee size={12} />{Number(item.price).toLocaleString("en-IN")}
              {item.priceType === "hourly" ? <span className="font-normal text-muted dark:text-muted-dark ml-0.5">/hr</span> : null}
            </span>
          ) : null}
          {item.priceType ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark font-body capitalize">
              {item.priceType === "inspection" ? "After Inspection" : item.priceType}
            </span>
          ) : null}
          {item.availableTime ? (
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark font-body">
              <FiClock size={11} /> {fmtDate(item.availableTime)}
            </span>
          ) : null}
        </div>
      ) : null}

      {item.message ? (
        <p className="text-xs text-muted dark:text-muted-dark font-body italic mb-3 line-clamp-2">"{item.message}"</p>
      ) : null}

      {canUpdate && !showUpdate ? (
        <button
          onClick={() => setShowUpdate(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
        >
          <FiEdit2 size={12} /> Update Bid
        </button>
      ) : null}

      {showUpdate ? (
        <BidForm
          request={{ _id: item._id, enquiry }}
          isUpdate
          existingBid={item}
          onSuccess={() => setShowUpdate(false)}
          onCancel={() => setShowUpdate(false)}
        />
      ) : null}
    </div>
  );
}
