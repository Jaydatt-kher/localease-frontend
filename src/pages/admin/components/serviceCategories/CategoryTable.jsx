import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Edit2,
  Loader2,
  MoreVertical,
  PlusCircle,
  Tag,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

function StatusBadge({ isActive }) {
  return isActive ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-hover" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-danger" /> Inactive
    </span>
  );
}

function CategoryIconDisplay({ icon }) {
  if (!icon) return <Tag className="w-4 h-4 text-muted dark:text-muted-dark" />;

  const isUrl = icon.startsWith("http") || icon.startsWith("/");
  if (isUrl) {
    return <img src={icon} alt="icon" className="w-7 h-7 rounded-lg object-cover" />;
  }

  return <span className="text-lg leading-none">{icon}</span>;
}

function ActionMenu({ category, onEdit, onToggle, onDelete, actioning }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleAction = (fn) => {
    setOpen(false);
    fn();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        disabled={actioning}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors disabled:opacity-40"
        aria-label="Actions"
      >
        {actioning ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => handleAction(onEdit)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Edit2 className="w-4 h-4" /> Edit Category
          </button>

          <div className="mx-3 border-t border-border dark:border-border-dark" />

          <button
            onClick={() => handleAction(onToggle)}
            className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body transition-colors ${
              category.isActive
                ? "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                : "text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10"
            }`}
          >
            {category.isActive ? (
              <>
                <ToggleLeft className="w-4 h-4" /> Deactivate
              </>
            ) : (
              <>
                <ToggleRight className="w-4 h-4" /> Activate
              </>
            )}
          </button>

          <button
            onClick={() => handleAction(onDelete)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 6 }).map((_, idx) => (
        <td key={idx} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded-md" style={{ width: idx === 0 ? 180 : idx === 1 ? 100 : 80 }} />
        </td>
      ))}
    </tr>
  );
}

export function CategoryTable({
  categories,
  isLoading,
  search,
  itemsPerPage,
  isActioning,
  onAddCategory,
  onEdit,
  onToggle,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {["Category", "Icon", "Services", "Order", "Status", "Actions"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, idx) => <SkeletonRow key={idx} />)
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">
                    {search ? "No categories match your search." : "No categories found. Add your first category."}
                  </p>
                  {!search && (
                    <button
                      onClick={onAddCategory}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Add Category
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category._id}
                className="group hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
              >
                <td className="px-4 py-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(category)}
                        className="text-sm font-body font-semibold text-primary dark:text-blue-400 hover:underline"
                      >
                        {category.name}
                      </button>
                      {category.featured && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                          Featured
                        </span>
                      )}
                    </div>
                    {category.description && (
                      <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5 truncate max-w-[260px]">
                        {category.description}
                      </p>
                    )}
                    <p className="text-[10px] font-mono text-muted dark:text-muted-dark mt-0.5 opacity-60">
                      /{category.slug}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center">
                    <CategoryIconDisplay icon={category.icon} />
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {category.totalServices ?? 0}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">
                    {category.displayOrder ?? 0}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge isActive={category.isActive} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <ActionMenu
                    category={category}
                    onEdit={() => onEdit(category)}
                    onToggle={() => onToggle(category)}
                    onDelete={() => onDelete(category)}
                    actioning={isActioning}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
