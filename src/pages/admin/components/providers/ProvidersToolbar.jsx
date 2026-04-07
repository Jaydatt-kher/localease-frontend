import { AlertCircle, ChevronRight, Filter, Loader2, Search } from "lucide-react";

export function ProvidersToolbar({
  search,
  statusFilter,
  pendingCount,
  isFetching,
  onSearchChange,
  onStatusChange,
  onPendingClick,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
          <input
            type="text"
            placeholder="Search by business name, email, or city..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2.5 text-sm font-body
              bg-background-light dark:bg-surface-alt
              border border-border dark:border-border-dark
              rounded-xl text-foreground dark:text-foreground-dark
              placeholder:text-muted dark:placeholder:text-muted-dark
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              transition-colors
            "
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
          )}
        </div>

        <div className="relative sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2.5 text-sm font-body
              bg-background-light dark:bg-surface-alt
              border border-border dark:border-border-dark
              rounded-xl text-foreground dark:text-foreground-dark
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              appearance-none cursor-pointer transition-colors
            "
          >
            <option value="all">All Providers</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted dark:text-muted-dark rotate-90 pointer-events-none" />
        </div>

        <button
          onClick={onPendingClick}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body font-semibold whitespace-nowrap transition-colors
            ${
              pendingCount > 0
                ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                : "bg-surface-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
            }`}
        >
          <AlertCircle className="w-4 h-4" />
          Pending ({pendingCount})
        </button>
      </div>
    </div>
  );
}
