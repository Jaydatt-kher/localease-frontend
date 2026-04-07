import { ChevronLeft, ChevronRight } from "lucide-react";

export function PendingProvidersPagination({
  isLoading,
  providersLength,
  startIndex,
  endIndex,
  total,
  cityFilter,
  page,
  totalPages,
  pageNumbers,
  onPrev,
  onNext,
  onPageSelect,
}) {
  if (isLoading || providersLength <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
      <p className="text-xs font-body text-muted dark:text-muted-dark">
        Showing <span className="font-semibold text-foreground dark:text-foreground-dark">{startIndex}</span>
        {" - "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">{endIndex}</span>
        {" of "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">
          {cityFilter === "all" ? total : providersLength}
        </span>{" "}
        providers
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        {pageNumbers.map((pageItem, i) =>
          pageItem === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted dark:text-muted-dark">
              ...
            </span>
          ) : (
            <button
              key={pageItem}
              onClick={() => onPageSelect(pageItem)}
              className={`min-w-7.5 h-7 px-2 text-xs font-body font-semibold rounded-lg transition-colors
                ${
                  page === pageItem
                    ? "bg-primary text-white"
                    : "border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400"
                }`}
            >
              {pageItem}
            </button>
          )
        )}

        <button
          onClick={onNext}
          disabled={page === totalPages || totalPages === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
