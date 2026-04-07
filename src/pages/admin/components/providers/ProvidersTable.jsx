import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  ExternalLink,
  Loader2,
  MoreVertical,
  ShieldCheck,
  ShieldOff,
  Star,
  Trash2,
  UserCheck,
} from "lucide-react";

function deriveStatus(provider) {
  if (provider.isDeleted) return "deleted";
  if (provider.isBlocked) return "blocked";
  if (!provider.isVerified) return "pending";
  return "approved";
}

const STATUS_STYLES = {
  approved: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400",
  pending: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  blocked: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400",
  deleted: "bg-gray-100 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400",
};

const STATUS_DOT = {
  approved: "bg-accent-hover",
  pending: "bg-amber-500",
  blocked: "bg-danger",
  deleted: "bg-gray-400",
};

function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold ${
        STATUS_STYLES[status] ?? ""
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status] ?? ""}`} />
      {label}
    </span>
  );
}

function Rating({ value, count }) {
  if (!value && value !== 0) {
    return <span className="text-xs text-muted dark:text-muted-dark">-</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
        {Number(value).toFixed(1)}
      </span>
      {count != null ? <span className="text-xs text-muted dark:text-muted-dark">({count})</span> : null}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((segment) => segment[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "P";

  return (
    <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-display font-bold text-primary dark:text-blue-400">{initials}</span>
    </div>
  );
}

function ActionMenu({
  status,
  onApprove,
  onBlock,
  onUnblock,
  onDelete,
  onView,
  isLoading,
}) {
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
        disabled={isLoading}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors disabled:opacity-40"
        aria-label="Actions"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => handleAction(onView)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View Profile
          </button>

          <div className="mx-3 border-t border-border dark:border-border-dark" />

          {status === "pending" ? (
            <button
              onClick={() => handleAction(onApprove)}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10 transition-colors"
            >
              <UserCheck className="w-4 h-4" /> Approve
            </button>
          ) : null}

          {status === "approved" ? (
            <button
              onClick={() => handleAction(onBlock)}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <ShieldOff className="w-4 h-4" /> Block Provider
            </button>
          ) : null}

          {status === "blocked" ? (
            <button
              onClick={() => handleAction(onUnblock)}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" /> Unblock Provider
            </button>
          ) : null}

          {status !== "deleted" ? (
            <button
              onClick={() => handleAction(onDelete)}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 8 }).map((_, idx) => (
        <td key={idx} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded-md" style={{ width: idx === 0 ? 160 : idx === 1 ? 190 : 80 }} />
        </td>
      ))}
    </tr>
  );
}

export function ProvidersTable({
  providers,
  isLoading,
  search,
  statusFilter,
  itemsPerPage,
  isActioning,
  onView,
  onApprove,
  onBlock,
  onUnblock,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {["Business", "Email", "Phone", "City", "Rating", "Jobs Done", "Status", "Actions"].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, idx) => <SkeletonRow key={idx} />)
          ) : providers.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">
                    {search || statusFilter !== "all" ? "No providers match your filters." : "No providers found."}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            providers.map((provider) => {
              const status = deriveStatus(provider);

              return (
                <tr
                  key={provider._id}
                  className={`group transition-colors hover:bg-background-light dark:hover:bg-surface-alt ${
                    status === "blocked" || status === "deleted" ? "opacity-70" : ""
                  }`}
                >
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={provider.businessName} />
                      <div className="min-w-0">
                        <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark truncate max-w-[150px]">
                          {provider.businessName}
                        </p>
                        {provider.isVerified ? (
                          <div className="flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 text-primary dark:text-blue-400" />
                            <span className="text-[10px] font-body text-primary dark:text-blue-400">Verified</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-body text-muted dark:text-muted-dark">
                      {provider.userId?.email ?? "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-body text-muted dark:text-muted-dark">
                      {provider.userId?.mobileNo ?? "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-body text-muted dark:text-muted-dark">
                      {provider.city?.name ?? "-"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Rating value={provider.rating?.average} count={provider.rating?.count} />
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                      {provider.completedJobs ?? 0}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={status} />
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <ActionMenu
                      status={status}
                      onView={() => onView(provider)}
                      onApprove={() => onApprove(provider)}
                      onBlock={() => onBlock(provider)}
                      onUnblock={() => onUnblock(provider)}
                      onDelete={() => onDelete(provider)}
                      isLoading={isActioning}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
