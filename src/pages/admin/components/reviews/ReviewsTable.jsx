import { useEffect, useRef } from "react";
import { AlertCircle, Eye, MoreVertical, Trash2 } from "lucide-react";
import { StarRow } from "./ReviewsStars";

const TABLE_HEADS = ["Review ID", "User", "Provider", "Service", "Rating", "Comment", "Date", "Actions"];

function formatDate(iso) {
  if (!iso) return "-";

  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncate(text, max = 55) {
  if (!text) return "-";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function rowHighlight(rating) {
  return rating <= 2
    ? "bg-red-50/40 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20"
    : "hover:bg-background-light dark:hover:bg-surface-alt";
}

function ReviewDropdown({ review, isOpen, onToggle, onClose, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          {review.bookingId ? (
            <a
              href={`/admin/bookings/${review.bookingId}`}
              onClick={onClose}
              className="w-full text-left px-4 py-2 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" /> View Booking
            </a>
          ) : null}
          <button
            onClick={() => {
              onClose();
              onDelete();
            }}
            className="w-full text-left px-4 py-2 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-border dark:border-border-dark flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Review
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SkeletonTable() {
  return Array.from({ length: 6 }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {TABLE_HEADS.map((heading) => (
        <td key={`${heading}-${rowIndex}`} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded-lg w-full" />
        </td>
      ))}
    </tr>
  ));
}

export function ReviewsTable({
  reviews,
  isLoading,
  openDropdown,
  onToggleDropdown,
  onCloseDropdown,
  onDeleteReview,
  onOpenReview,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px]">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {TABLE_HEADS.map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            <SkeletonTable />
          ) : reviews.length === 0 ? (
            <tr>
              <td colSpan={TABLE_HEADS.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">No reviews found.</p>
                </div>
              </td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr key={review._id} className={`group transition-colors ${rowHighlight(review.rating)}`}>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-mono text-muted dark:text-muted-dark">
                    #{String(review._id).slice(-8).toUpperCase()}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {review.user || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {review.provider || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">
                    {review.service || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <StarRow rating={review.rating} />
                    <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                      {review.rating}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3.5 max-w-[220px]">
                  <button
                    onClick={() => onOpenReview(review)}
                    className="text-sm font-body text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark text-left transition-colors"
                    title={review.comment}
                  >
                    {truncate(review.comment)}
                  </button>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-body text-muted dark:text-muted-dark">{formatDate(review.createdAt)}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap text-right">
                  <ReviewDropdown
                    review={review}
                    isOpen={openDropdown === review._id}
                    onToggle={() => onToggleDropdown(review._id)}
                    onClose={onCloseDropdown}
                    onDelete={() => onDeleteReview(review._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
