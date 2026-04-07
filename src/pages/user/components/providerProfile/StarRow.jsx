import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export default function StarRow({ value, count, size = 14, showCount = true }) {
  const hasRating = value != null && value > 0;
  const rounded = hasRating ? Math.round(value * 2) / 2 : 0;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = i < Math.floor(rounded);
        const half = !full && i < rounded;

        if (full) return <IoStar key={i} size={size} className="text-yellow-400" />;
        if (half) return <IoStarHalf key={i} size={size} className="text-yellow-400" />;

        return (
          <IoStarOutline
            key={i}
            size={size}
            className="text-yellow-300 dark:text-yellow-600"
          />
        );
      })}
      {showCount && (
        <span className="text-sm text-muted dark:text-muted-dark font-body ml-1">
          {hasRating
            ? `${value.toFixed(1)}${count > 0 ? ` (${count} reviews)` : ""}`
            : "No reviews yet"}
        </span>
      )}
    </div>
  );
}
