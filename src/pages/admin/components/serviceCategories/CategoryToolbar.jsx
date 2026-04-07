import { ChevronRight, Loader2, PlusCircle, Search } from "lucide-react";

export function CategoryToolbar({
  search,
  statusFilter,
  isFetching,
  onSearchChange,
  onStatusChange,
  onAddCategory,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark pointer-events-none" />
          <input
            type="text"
            placeholder="Search categories by name..."
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

        <div className="relative sm:w-44 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              w-full px-3 pr-8 py-2.5 text-sm font-body
              bg-background-light dark:bg-surface-alt
              border border-border dark:border-border-dark
              rounded-xl text-foreground dark:text-foreground-dark
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              appearance-none cursor-pointer transition-colors
            "
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted dark:text-muted-dark rotate-90 pointer-events-none" />
        </div>

        <button
          onClick={onAddCategory}
          className="
            flex items-center gap-2 px-4 py-2.5 bg-primary text-white
            text-sm font-body font-semibold rounded-xl
            hover:bg-primary-hover transition-colors shadow-sm whitespace-nowrap flex-shrink-0
          "
        >
          <PlusCircle className="w-4 h-4" /> Add Category
        </button>
      </div>
    </div>
  );
}
