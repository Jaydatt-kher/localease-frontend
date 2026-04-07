import {
  AlertCircle,
  Clock,
  Eye,
  Loader2,
  MapPin,
  UserCheck,
  XCircle,
} from "lucide-react";

function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "P";

  return (
    <div className="h-9 w-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-display font-bold flex-shrink-0">
      {initials}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border dark:border-border-dark last:border-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="skeleton w-9 h-9 rounded-xl" />
          <div className="skeleton h-4 w-32 rounded-md" />
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <div className="skeleton h-4 w-44 rounded-md" />
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="skeleton h-4 w-28 rounded-md" />
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <div className="skeleton h-4 w-20 rounded-md" />
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="skeleton h-4 w-16 rounded-md" />
      </td>
      <td className="px-4 py-3">
        <div className="skeleton h-5 w-16 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <div className="skeleton h-8 w-28 rounded-lg ml-auto" />
      </td>
    </tr>
  );
}

export function PendingProvidersTable({
  isLoading,
  providers,
  search,
  cityFilter,
  onOpenModal,
  onApprove,
  onReject,
  approving,
  rejecting,
  isProcessing,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
              Name
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark hidden md:table-cell">
              Email
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark hidden lg:table-cell">
              Phone
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark hidden sm:table-cell">
              Location
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark hidden lg:table-cell">
              Experience
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
              Status
            </th>
            <th className="text-right px-4 py-3 text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : providers.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <Clock className="w-8 h-8 opacity-25" />
                  <p className="text-sm font-body">
                    {search || cityFilter !== "all"
                      ? "No pending providers match your filters."
                      : "No pending providers - all caught up!"}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            providers.map((provider) => (
              <tr
                key={provider._id}
                className="border-b border-border dark:border-border-dark last:border-0 hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={provider.businessName} />
                    <span className="font-body font-semibold text-foreground dark:text-foreground-dark whitespace-nowrap">
                      {provider.businessName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-muted dark:text-muted-dark hidden md:table-cell font-body">
                  {provider.userId?.email ?? "-"}
                </td>

                <td className="px-4 py-3 text-muted dark:text-muted-dark hidden lg:table-cell font-body">
                  {provider.userId?.mobileNo ?? "-"}
                </td>

                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex items-center gap-1 text-muted dark:text-muted-dark">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="font-body">{provider.city?.name ?? "-"}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-muted dark:text-muted-dark hidden lg:table-cell font-body">
                  {provider.experienceYears ? `${provider.experienceYears} yrs` : "-"}
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenModal(provider)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-semibold bg-primary-light dark:bg-primary/10 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    <button
                      onClick={() => onApprove(provider._id)}
                      disabled={isProcessing}
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400 hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white disabled:opacity-50 transition-colors"
                      title="Approve"
                    >
                      {approving ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onReject(provider._id)}
                      disabled={isProcessing}
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400 hover:bg-danger hover:text-white dark:hover:bg-danger dark:hover:text-white disabled:opacity-50 transition-colors"
                      title="Reject"
                    >
                      {rejecting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
