import { useEffect } from "react";
import { StarRow } from "./ReviewsStars";

export function ReviewModal({ review, onClose }) {
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
              {review.service || "Service Review"}
            </h3>
            <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
              By {review.user} · for {review.provider}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            x
          </button>
        </div>

        <StarRow rating={review.rating} size="md" />

        <p className="text-sm font-body text-foreground dark:text-foreground-dark leading-relaxed border-l-2 border-primary/30 pl-3 italic">
          "{review.comment || "No comment provided."}"
        </p>

        <p className="text-xs font-body text-muted dark:text-muted-dark">
          {new Date(review.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
