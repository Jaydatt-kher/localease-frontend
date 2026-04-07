import { AiOutlineLoading3Quarters } from "react-icons/ai";
import RatingStars from "./RatingStars";

export default function ReviewFormCard({
  providerName,
  onSubmit,
  rating,
  hover,
  setRating,
  setHover,
  comment,
  setComment,
  onSkip,
  isSubmitting,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6">
      <h2 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark mb-1">
        Rate Your Provider
      </h2>
      <p className="text-sm font-body text-muted dark:text-muted-dark mb-6">
        How was your experience with <strong>{providerName}</strong>?
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <RatingStars
          rating={rating}
          hover={hover}
          setRating={setRating}
          setHover={setHover}
        />

        <div>
          <label className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-2">
            Write a Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="What did you like or dislike? Details help others."
            className="w-full px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body text-sm transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 py-3 px-4 rounded-xl border border-border dark:border-border-dark text-foreground dark:text-foreground-dark font-bold font-body hover:bg-surface-alt transition-colors"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="flex-1 flex justify-center items-center py-3 px-4 bg-primary text-white rounded-xl font-bold font-body hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
