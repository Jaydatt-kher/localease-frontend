export function CitiesPagination({
  totalPages,
  startIndex,
  pageSize,
  totalCount,
  currentPage,
  onPrev,
  onNext,
}) {
  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="px-4 py-3.5 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt flex items-center justify-between gap-4">
      <p className="text-xs font-body text-muted dark:text-muted-dark whitespace-nowrap">
        Showing <span className="font-semibold text-foreground dark:text-foreground-dark">{startIndex + 1}</span> to{" "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">
          {Math.min(startIndex + pageSize, totalCount)}
        </span>{" "}
        of <span className="font-semibold text-foreground dark:text-foreground-dark">{totalCount}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border border-border dark:border-border-dark rounded-lg text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 border border-border dark:border-border-dark rounded-lg text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
