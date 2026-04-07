import { IoStar, IoStarOutline } from "react-icons/io5";

export default function RatingStars({ rating, hover, setRating, setHover }) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          {star <= (hover || rating) ? (
            <IoStar size={40} className="text-yellow-400" />
          ) : (
            <IoStarOutline size={40} className="text-yellow-300 dark:text-yellow-600" />
          )}
        </button>
      ))}
    </div>
  );
}
