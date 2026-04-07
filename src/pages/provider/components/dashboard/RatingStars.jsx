import { IoStar, IoStarOutline } from "react-icons/io5";

export function RatingStars({ value = 0, count = 0 }) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.floor(rounded) ? (
          <IoStar key={i} size={13} className="text-yellow-400" />
        ) : (
          <IoStarOutline key={i} size={13} className="text-yellow-300 dark:text-yellow-700" />
        )
      )}
      <span className="text-xs text-muted dark:text-muted-dark ml-1 font-body">
        {value > 0 ? value.toFixed(1) : "No ratings yet"}
        {count > 0 ? ` (${count})` : ""}
      </span>
    </div>
  );
}
