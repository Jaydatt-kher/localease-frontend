import { ChevronRight, Filter, Loader2, Search } from "lucide-react";

export function BookingsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  isFetching,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Booking ID, User, or Provider..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
          />
          {isFetching ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
          ) : null}
        </div>

        <div className="relative sm:w-44 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 pl-9 pr-8 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer transition-colors"
          >
            <option value="all">All Status</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted dark:text-muted-dark rotate-90 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
