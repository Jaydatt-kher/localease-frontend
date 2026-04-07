import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaymentsPagination({
  totalPages,
  currentPage,
  pageNumbers,
  startIndex,
  endIndex,
  totalCount,
  onPrev,
  onNext,
  onPageSelect,
}) {
  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="px-4 py-3.5 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs font-body text-muted dark:text-muted-dark">
        Showing <span className="font-semibold text-foreground dark:text-foreground-dark">{startIndex + 1}</span>
        {" - "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">{endIndex}</span>
        {" of "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">{totalCount}</span> payments
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        {pageNumbers.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted dark:text-muted-dark">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageSelect(p)}
              className={`min-w-7.5 h-7 px-2 text-xs font-body font-semibold rounded-lg transition-colors
                ${
                  currentPage === p
                    ? "bg-primary text-white border border-primary"
                    : "border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400"
                }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={onNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
