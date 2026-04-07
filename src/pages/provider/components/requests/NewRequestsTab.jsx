import { FiAlertCircle, FiInbox, FiRefreshCw } from "react-icons/fi";
import { useGetNewRequestsQuery } from "../../../../api/providerApi";
import { NewRequestCard } from "./NewRequestCard";
import { CardSkeleton } from "./requestsShared";

export function NewRequestsTab() {
  const { data: requests = [], isLoading, isError, refetch, isFetching } =
    useGetNewRequestsQuery(undefined, { pollingInterval: 30000, refetchOnMountOrArgChange: true });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
        <FiAlertCircle size={36} className="text-red-400" />
        <p className="font-body text-sm">Failed to load requests.</p>
        <button onClick={refetch} className="text-primary text-sm font-semibold font-body hover:underline flex items-center gap-1">
          <FiRefreshCw size={13} /> Retry
        </button>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-muted dark:text-muted-dark">
        <div className="w-16 h-16 rounded-2xl bg-background-light dark:bg-surface-alt flex items-center justify-center">
          <FiInbox size={28} className="opacity-40" />
        </div>
        <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">No new requests</h3>
        <p className="text-sm font-body text-center max-w-xs">
          New service requests from customers will appear here. Make sure your profile is active and you have services listed.
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-5 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
        >
          <FiRefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-body text-muted dark:text-muted-dark">
          <span className="font-bold text-foreground dark:text-foreground-dark">{requests.length}</span> pending request{requests.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-1.5 text-xs font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors"
        >
          <FiRefreshCw size={13} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {requests.map((request) => (
        <NewRequestCard key={request._id} request={request} onIgnored={refetch} />
      ))}
    </div>
  );
}
