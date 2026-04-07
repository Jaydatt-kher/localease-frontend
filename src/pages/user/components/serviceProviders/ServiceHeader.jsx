import { FiArrowLeft, FiClock, FiFilter } from "react-icons/fi";
import { getCatIcon } from "./serviceProvidersShared";

export function ServiceHeader({
  navigate,
  svcLoading,
  service,
  total,
  activeFilterCount,
  setFilterOpen,
  imgError,
  setImgError,
}) {
  const firstImage = service?.images?.[0] ?? null;
  const showImage = firstImage && !imgError;

  return (
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-sm font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors mb-4"
        >
          <FiArrowLeft size={15} /> All Services
        </button>

        {svcLoading ? (
          <div className="flex gap-4">
            <div className="skeleton w-20 h-20 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="skeleton h-5 w-48 rounded" />
              <div className="skeleton h-3 w-72 rounded" />
              <div className="skeleton h-3 w-56 rounded" />
            </div>
          </div>
        ) : service ? (
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary-light dark:bg-primary/10 flex items-center justify-center shrink-0 border border-border dark:border-border-dark">
              {showImage ? (
                <img
                  src={firstImage}
                  alt={service.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary">{getCatIcon(service.name)}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark">
                    {service.name}
                  </h1>
                  {service.category?.name ? (
                    <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-light dark:bg-primary/10 text-primary font-body">
                      {service.category.name}
                    </span>
                  ) : null}
                </div>
                {total != null ? (
                  <span className="text-sm text-muted dark:text-muted-dark font-body shrink-0">
                    {total} provider{total !== 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>

              {service.description ? (
                <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed mt-2 line-clamp-2">
                  {service.description}
                </p>
              ) : null}

              {service.duration ? (
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-1.5 flex items-center gap-1">
                  <FiClock size={11} className="text-primary" />
                  Typical duration: ~
                  {service.duration < 60
                    ? `${service.duration} min`
                    : `${Math.floor(service.duration / 60)} hr${service.duration % 60 ? ` ${service.duration % 60} min` : ""}`}
                </p>
              ) : null}
            </div>

            <button
              onClick={() => setFilterOpen(true)}
              className="relative shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-foreground dark:text-foreground-dark hover:border-primary transition-colors lg:hidden"
            >
              <FiFilter size={14} /> Filters
              {activeFilterCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
