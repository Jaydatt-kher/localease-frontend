import { FiStar } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import SectionCard from "./SectionCard";
import StarRow from "./StarRow";
import { fmtDate } from "./providerProfileShared";

export default function ReviewsSection({ reviews, ratingAvg, ratingCount, ratingDist }) {
  return (
    <SectionCard title={`Reviews ${ratingCount > 0 ? `(${ratingCount})` : ""}`} icon={<FiStar size={16} />}>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted dark:text-muted-dark">
          <IoStarOutline size={32} className="opacity-30" />
          <p className="text-sm font-body">No reviews yet. Be the first to book!</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row items-center gap-6 px-5 py-5 border-b border-border dark:border-border-dark">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <p className="text-5xl font-display font-extrabold text-foreground dark:text-foreground-dark">
                {ratingAvg?.toFixed(1) ?? "—"}
              </p>
              <StarRow value={ratingAvg} count={0} size={16} showCount={false} />
              <p className="text-xs text-muted dark:text-muted-dark font-body">
                {ratingCount} review{ratingCount !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex-1 w-full flex flex-col gap-1.5">
              {ratingDist.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-body text-muted dark:text-muted-dark w-3">{star}</span>
                  <IoStar size={11} className="text-yellow-400 shrink-0" />
                  <div className="flex-1 h-2 bg-background-light dark:bg-surface-alt rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] font-body text-muted dark:text-muted-dark w-6 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border dark:divide-border-dark">
            {reviews.map((review) => {
              const name = review.userId?.fullName ?? "Customer";
              const initial = name[0]?.toUpperCase() ?? "C";

              return (
                <div key={review._id} className="px-5 py-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary text-sm shrink-0">
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">
                        {name}
                      </p>
                      <div className="flex items-center gap-2">
                        <StarRow value={review.rating} count={0} size={12} showCount={false} />
                        <span className="text-xs text-muted dark:text-muted-dark font-body">
                          {fmtDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed pl-12">
                      {review.comment}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionCard>
  );
}
