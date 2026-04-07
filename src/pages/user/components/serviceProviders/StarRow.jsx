import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export function StarRow({ value, count, size = 13 }) {
  const hasRating = value != null && value > 0;
  const rounded = hasRating ? Math.round(value * 2) / 2 : 0;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = i < Math.floor(rounded);
        const half = !full && i < rounded;
        return full ? (
          <IoStar key={i} size={size} className="text-yellow-400" />
        ) : half ? (
          <IoStarHalf key={i} size={size} className="text-yellow-400" />
        ) : (
          <IoStarOutline key={i} size={size} className="text-yellow-300 dark:text-yellow-600" />
        );
      })}
      <span className="text-xs text-muted dark:text-muted-dark font-body ml-0.5">
        {hasRating ? `${value.toFixed(1)}${count > 0 ? ` (${count})` : ""}` : "New"}
      </span>
    </div>
  );
}
