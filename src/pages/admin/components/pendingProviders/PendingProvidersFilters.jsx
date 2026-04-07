import { ChevronRight, Filter, Loader2, Search } from "lucide-react";

export function PendingProvidersFilters({
  search,
  onSearchChange,
  cityFilter,
  onCityFilterChange,
  cityOptions,
  isFetching,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm font-body bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
        />
        {isFetching ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
        ) : null}
      </div>

      <div className="relative sm:w-48">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
        <select
          value={cityFilter}
          onChange={(e) => onCityFilterChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 text-sm font-body bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer transition-colors"
        >
          <option value="all">All Locations</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted dark:text-muted-dark rotate-90 pointer-events-none" />
      </div>
    </div>
  );
}
