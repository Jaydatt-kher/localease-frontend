import { FiMessageSquare } from "react-icons/fi";
import BidCard from "./BidCard";

export default function BidsSection({
  isBooked,
  isOpen,
  bids,
  acceptingId,
  onViewProfile,
  onAccept,
}) {
  const heading = isBooked
    ? "Accepted Bid"
    : bids.length > 0
      ? `${bids.length} Provider Bid${bids.length !== 1 ? "s" : ""}`
      : "No Bids Yet";

  return (
    <div>
      <h2 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-3">
        {heading}
      </h2>

      {bids.length === 0 && !isBooked && (
        <div className="flex flex-col items-center py-12 gap-3 text-muted dark:text-muted-dark bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl">
          <FiMessageSquare size={36} className="opacity-30" />
          <p className="font-body text-sm text-center max-w-xs">
            {isOpen
              ? "Providers are reviewing your request. Check back soon."
              : "This enquiry was closed without any bids being accepted."}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <BidCard
            key={bid._id}
            bid={bid}
            isOpen={isOpen}
            acceptingId={acceptingId}
            onViewProfile={onViewProfile}
            onAccept={onAccept}
          />
        ))}
      </div>
    </div>
  );
}
