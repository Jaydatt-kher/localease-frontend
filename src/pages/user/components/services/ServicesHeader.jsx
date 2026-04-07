import { FiSearch, FiX } from "react-icons/fi";

export default function ServicesHeader({
  search,
  setSearch,
  onClearSearch,
  isAllTab,
  onSelectAll,
  categories,
  catsLoading,
  activeCatId,
  onSelectCategory,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark sticky top-17 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
        <div className="relative flex-1 max-w-xl">
          <FiSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search — plumber, AC repair, cleaning…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-full border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark outline-none focus:border-primary transition-colors font-body"
          />
          {search && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={onSelectAll}
            className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors ${
              isAllTab
                ? "bg-primary border-primary text-white"
                : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"
            }`}
          >
            All
          </button>

          {catsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-7 w-20 rounded-full shrink-0" />
              ))
            : categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => onSelectCategory(cat._id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors ${
                    activeCatId === cat._id
                      ? "bg-primary border-primary text-white"
                      : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}
