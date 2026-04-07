import { Star } from "lucide-react";

export function StarRow({ rating, size = "sm" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${cls} ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-border dark:text-border-dark"
          }`}
        />
      ))}
    </div>
  );
}
