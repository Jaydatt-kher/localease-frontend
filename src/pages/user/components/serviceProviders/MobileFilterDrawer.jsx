import { FiX } from "react-icons/fi";
import { FilterPanel } from "./FilterPanel";

export function MobileFilterDrawer({
  filterOpen,
  setFilterOpen,
  filters,
  handleFilterChange,
  handleFilterReset,
  total,
}) {
  if (!filterOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface-light dark:bg-surface-dark border-l border-border dark:border-border-dark p-5 overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <span className="text-base font-display font-bold text-foreground dark:text-foreground-dark">Filters</span>
          <button
            onClick={() => setFilterOpen(false)}
            className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
          >
            <FiX size={20} />
          </button>
        </div>

        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          resultCount={total}
        />

        <button
          onClick={() => setFilterOpen(false)}
          className="w-full mt-5 py-3 bg-primary text-white font-body font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm"
        >
          Show Results
        </button>
      </div>
    </div>
  );
}
