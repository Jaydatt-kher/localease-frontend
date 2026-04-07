import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck, FiClock, FiMapPin, FiMessageSquare, FiX } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { useIgnoreRequestMutation } from "../../../../api/providerApi";
import { BidForm } from "./BidForm";
import { timeAgo } from "./requestsShared";

const PRICE_TYPE_BADGE = {
  fixed: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700",
  hourly: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700",
  inspection: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700",
};

export function NewRequestCard({ request, onIgnored }) {
  const [showBid, setShowBid] = useState(false);
  const [confirming, setConfirm] = useState(false);
  const [ignore, { isLoading }] = useIgnoreRequestMutation();

  const enquiry = request.enquiry;
  const service = enquiry?.service;
  const location = enquiry?.location;
  const myPriceType = request.myPriceType;
  const myPrice = request.myPrice;

  if (!enquiry) {
    return null;
  }

  const preferredLabel = enquiry.prefferedDate
    ? `${new Date(enquiry.prefferedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}${enquiry.prefferedTime ? ` at ${enquiry.prefferedTime}` : ""}`
    : null;

  const handleIgnore = async () => {
    try {
      await ignore(request._id).unwrap();
      toast.success("Request ignored.");
      onIgnored?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to ignore.");
    } finally {
      setConfirm(false);
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
            {service?.name ?? "Service Request"}
          </p>
          <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
            {timeAgo(request.createdAt)} · New request
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700 font-body">
          Pending
        </span>
      </div>

      {myPriceType ? (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-body ${PRICE_TYPE_BADGE[myPriceType] ?? PRICE_TYPE_BADGE.inspection}`}>
            Your rate: {myPriceType === "inspection" ? "After Inspection" : myPriceType}
          </span>
          {myPrice != null && myPrice > 0 ? (
            <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
              <TbCurrencyRupee size={10} />{Number(myPrice).toLocaleString("en-IN")}{myPriceType === "hourly" ? "/hr" : ""}
            </span>
          ) : null}
        </div>
      ) : null}

      {location?.address ? (
        <div className="flex items-start gap-2 text-xs text-muted dark:text-muted-dark font-body mb-2">
          <FiMapPin size={12} className="shrink-0 mt-0.5 text-primary" />
          <span className="line-clamp-1">{location.address}</span>
        </div>
      ) : null}

      {enquiry?.message ? (
        <div className="flex items-start gap-2 text-xs font-body mb-3">
          <FiMessageSquare size={12} className="shrink-0 mt-0.5 text-muted dark:text-muted-dark" />
          <p className="text-foreground dark:text-foreground-dark italic line-clamp-2">"{enquiry.message}"</p>
        </div>
      ) : null}

      {preferredLabel ? (
        <div className="flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark font-body mb-3">
          <FiClock size={12} className="text-primary" />
          Customer prefers: <span className="font-semibold text-foreground dark:text-foreground-dark">{preferredLabel}</span>
        </div>
      ) : null}

      {!showBid ? (
        <div className="flex flex-wrap gap-2 mt-1">
          <button
            onClick={() => setShowBid(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-body font-bold rounded-xl hover:bg-primary-hover transition-colors"
          >
            <FiCheck size={13} /> Send Bid
          </button>

          {!confirming ? (
            <button
              onClick={() => setConfirm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-red-300 hover:text-red-500 transition-colors"
            >
              <FiX size={13} /> Ignore
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-body text-muted dark:text-muted-dark">Sure?</span>
              <button
                onClick={handleIgnore}
                disabled={isLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-body font-bold hover:bg-red-600 disabled:opacity-60 transition-colors"
              >
                {isLoading ? <AiOutlineLoading3Quarters size={12} className="animate-spin" /> : "Yes, ignore"}
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="px-3 py-1.5 rounded-xl border border-border dark:border-border-dark text-xs font-body text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <BidForm
          request={request}
          initialPriceType={myPriceType ?? "inspection"}
          onSuccess={() => setShowBid(false)}
          onCancel={() => setShowBid(false)}
        />
      )}
    </div>
  );
}
