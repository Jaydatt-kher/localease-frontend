import { ChevronLeft, ChevronRight } from "lucide-react";

function buildPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const delta = 2;
  const range = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i += 1) {
    range.push(i);
  }

  if (currentPage - delta > 2) range.unshift("...");
  if (currentPage + delta < totalPages - 1) range.push("...");

  return [1, ...range, totalPages];
}

export function ReviewsPagination({
  totalPages,
  currentPage,
  startIndex,
  endIndex,
  totalCount,
  onPageChange,
}) {
  if (totalPages <= 0) return null;

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <div className="px-4 py-3.5 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs font-body text-muted dark:text-muted-dark">
        Showing <span className="font-semibold text-foreground dark:text-foreground-dark">{startIndex + 1}</span>
        {" - "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">{endIndex}</span>
        {" of "}
        <span className="font-semibold text-foreground dark:text-foreground-dark">{totalCount}</span> reviews
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        {pageNumbers.map((pageItem, idx) =>
          pageItem === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-xs text-muted dark:text-muted-dark">
              ...
            </span>
          ) : (
            <button
              key={pageItem}
              onClick={() => onPageChange(pageItem)}
              className={`min-w-7.5 h-7 px-2 text-xs font-body font-semibold rounded-lg transition-colors
                ${
                  currentPage === pageItem
                    ? "bg-primary text-white border border-primary"
                    : "border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400"
                }`}
            >
              {pageItem}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-semibold border border-border dark:border-border-dark rounded-lg text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
