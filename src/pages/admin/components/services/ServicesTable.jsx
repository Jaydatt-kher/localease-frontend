import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Edit2,
  Image as ImageIcon,
  Loader2,
  MoreVertical,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

function StatusBadge({ isAvailable }) {
  return isAvailable ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-hover" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-danger" /> Inactive
    </span>
  );
}

function ServiceThumb({ images, name }) {
  const [err, setErr] = useState(false);
  const src = images?.[0];

  return (
    <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-primary-light dark:bg-primary/10 flex items-center justify-center border border-border dark:border-border-dark">
      {src && !err ? (
        <img src={src} alt={name} onError={() => setErr(true)} className="w-full h-full object-cover" />
      ) : (
        <ImageIcon className="w-4 h-4 text-primary dark:text-blue-400" />
      )}
    </div>
  );
}

function ActionMenu({ service, onEdit, onToggle, onDelete, actioning }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
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

      {open ? (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => handleAction(onEdit)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Edit2 className="w-4 h-4" /> Edit Service
          </button>

          <div className="mx-3 border-t border-border dark:border-border-dark" />

          <button
            onClick={() => handleAction(onToggle)}
            className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body transition-colors ${
              service.isAvailable
                ? "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                : "text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10"
            }`}
          >
            {service.isAvailable ? (
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
      ) : null}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, idx) => (
        <td key={idx} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded-md" style={{ width: idx === 0 ? 160 : idx === 1 ? 110 : 80 }} />
        </td>
      ))}
    </tr>
  );
}

function formatDuration(duration) {
  if (!duration && duration !== 0) return "-";
  if (duration < 60) return `${duration} min`;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes ? ` ${minutes}m` : ""}`;
}

export function ServicesTable({
  services,
  isLoading,
  search,
  statusFilter,
  catFilter,
  cityFilter,
  itemsPerPage,
  isActioning,
  onAddService,
  onEdit,
  onToggle,
  onDelete,
}) {
  const hasFilters = search || statusFilter || catFilter || cityFilter;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {["Service", "Category", "City", "Providers", "Duration", "Status", "Actions"].map((heading) => (
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
          ) : services.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">
                    {hasFilters ? "No services match your filters." : "No services found. Add your first service."}
                  </p>
                  {!hasFilters ? (
                    <button
                      onClick={onAddService}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Add Service
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr
                key={service._id}
                className="group hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <ServiceThumb images={service.images} name={service.name} />
                    <button
                      onClick={() => onEdit(service)}
                      className="text-sm font-body font-semibold text-primary dark:text-blue-400 hover:underline truncate max-w-[160px]"
                    >
                      {service.name}
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  {service.categoryName ? (
                    <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full bg-primary-light dark:bg-primary/10 text-primary dark:text-blue-400">
                      {service.categoryName}
                    </span>
                  ) : (
                    <span className="text-sm font-body text-muted dark:text-muted-dark">-</span>
                  )}
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">{service.cityName ?? "-"}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {service.totalProviders ?? 0}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">
                    {formatDuration(service.duration)}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge isAvailable={service.isAvailable} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <ActionMenu
                    service={service}
                    onEdit={() => onEdit(service)}
                    onToggle={() => onToggle(service)}
                    onDelete={() => onDelete(service)}
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
