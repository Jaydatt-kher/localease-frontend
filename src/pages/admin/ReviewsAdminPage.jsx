import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteAdminReviewMutation,
  useGetAdminReviewsQuery,
  useGetAdminReviewStatsQuery,
} from "../../api/adminApi";
import { ReviewModal } from "./components/reviews/ReviewModal";
import { ReviewsDistribution } from "./components/reviews/ReviewsDistribution";
import { ReviewsFilters } from "./components/reviews/ReviewsFilters";
import { ReviewsPagination } from "./components/reviews/ReviewsPagination";
import { ReviewsStats } from "./components/reviews/ReviewsStats";
import { ReviewsTable } from "./components/reviews/ReviewsTable";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function ReviewsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 350);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [modalReview, setModalReview] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, ratingFilter]);

  const { data: statsData } = useGetAdminReviewStatsQuery();
  const { data: reviewsData, isLoading, isFetching } = useGetAdminReviewsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    rating: ratingFilter,
  });
  const [deleteReview] = useDeleteAdminReviewMutation();

  const currentReviews = reviewsData?.reviews || [];
  const totalCount = reviewsData?.total || 0;
  const totalPages = reviewsData?.pages || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  const kpiTotal = statsData?.total || 0;
  const kpiAvg = statsData?.averageRating || 0;
  const kpiFiveStar = statsData?.fiveStar || 0;
  const kpiLow = statsData?.lowRatings || 0;
  const distribution =
    statsData?.ratingDistribution || [5, 4, 3, 2, 1].map((rating) => ({ rating, count: 0 }));

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteReview(id).unwrap();
        toast.success("Review deleted successfully.");
      } catch {
        toast.error("Failed to delete review.");
      }
    },
    [deleteReview]
  );

  const handleToggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Reviews</h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          Monitor and manage customer reviews and ratings across the platform
        </p>
      </div>

      <ReviewsStats kpiTotal={kpiTotal} kpiAvg={kpiAvg} kpiFiveStar={kpiFiveStar} kpiLow={kpiLow} />

      <ReviewsDistribution distribution={distribution} total={kpiTotal} />

      <ReviewsFilters
        searchQuery={searchQuery}
        ratingFilter={ratingFilter}
        isFetching={isFetching}
        onSearchChange={setSearchQuery}
        onRatingChange={setRatingFilter}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <ReviewsTable
          reviews={currentReviews}
          isLoading={isLoading}
          openDropdown={openDropdown}
          onToggleDropdown={handleToggleDropdown}
          onCloseDropdown={() => setOpenDropdown(null)}
          onDeleteReview={handleDelete}
          onOpenReview={setModalReview}
        />

        <ReviewsPagination
          totalPages={totalPages}
          currentPage={currentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      </div>

      {modalReview ? <ReviewModal review={modalReview} onClose={() => setModalReview(null)} /> : null}
    </div>
  );
}
