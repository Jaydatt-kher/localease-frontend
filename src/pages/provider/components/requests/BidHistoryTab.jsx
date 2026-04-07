import { useState } from "react";
import { FiAlertCircle, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { useGetMyBidHistoryQuery } from "../../../../api/providerApi";
import { BidHistoryCard } from "./BidHistoryCard";
import { CardSkeleton, HISTORY_STATUSES } from "./requestsShared";

export function BidHistoryTab() {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetMyBidHistoryQuery(
    { status: statusFilter || undefined, page, limit: 10 },
    { refetchOnMountOrArgChange: true }
  );

  const items = data?.data ?? [];
  const pagination = data?.pagination ?? null;

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
        <FiAlertCircle size={36} className="text-red-400" />
        <p className="font-body text-sm">Failed to load bid history.</p>
        <button onClick={refetch} className="text-primary text-sm font-semibold font-body hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {HISTORY_STATUSES.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors ${statusFilter === status.value ? "bg-primary border-primary text-white" : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {pagination ? (
        <p className="text-sm font-body text-muted dark:text-muted-dark">
          <span className="font-bold text-foreground dark:text-foreground-dark">{pagination.total}</span> total bid{pagination.total !== 1 ? "s" : ""}
        </p>
      ) : null}

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
          <FiEye size={32} className="opacity-30" />
          <p className="font-display font-bold text-foreground dark:text-foreground-dark">No bids yet</p>
          <p className="text-sm font-body text-center max-w-xs">
            {statusFilter
              ? `No bids with "${HISTORY_STATUSES.find((status) => status.value === statusFilter)?.label}" status.`
              : "You have not submitted any bids yet."}
          </p>
        </div>
      ) : null}

      {items.map((item) => <BidHistoryCard key={item._id} item={item} />)}

      {pagination && pagination.totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-sm font-body text-muted dark:text-muted-dark">
            Page <span className="font-bold text-foreground dark:text-foreground-dark">{page}</span> of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
            disabled={page === pagination.totalPages}
            className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
