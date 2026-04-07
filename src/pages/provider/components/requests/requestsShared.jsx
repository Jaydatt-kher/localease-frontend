export function timeAgo(iso) {
  if (!iso) {
    return "";
  }
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) {
    return "just now";
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${Math.floor(hours / 24)}d ago`;
}

export function fmtDate(iso) {
  if (!iso) {
    return "-";
  }
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function fmtDateInput(iso) {
  if (!iso) {
    return "";
  }
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const STATUS_CFG = {
  pending: {
    label: "Pending",
    cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700",
  },
  responded: {
    label: "Bid Sent",
    cls: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700",
  },
  accepted_by_user: {
    label: "Accepted ✓",
    cls: "bg-accent-light dark:bg-accent/15 text-accent-hover dark:text-green-400 border-accent/30",
  },
  rejected_by_user: {
    label: "Declined",
    cls: "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border-border dark:border-border-dark",
  },
};

export const PRICE_TYPE_OPTS = [
  { value: "fixed", label: "Fixed - flat rate" },
  { value: "hourly", label: "Hourly - per hour" },
  { value: "inspection", label: "After Inspection" },
];

export const HISTORY_STATUSES = [
  { value: "", label: "All" },
  { value: "responded", label: "Bid Sent" },
  { value: "accepted_by_user", label: "Accepted" },
  { value: "rejected_by_user", label: "Declined" },
  { value: "pending", label: "Pending" },
];

export function minDateTime() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function CardSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="skeleton h-4 w-40 rounded" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-3 w-56 rounded" />
      <div className="skeleton h-3 w-48 rounded" />
      <div className="flex gap-2 mt-2">
        <div className="skeleton h-9 w-28 rounded-xl" />
        <div className="skeleton h-9 w-20 rounded-xl" />
      </div>
    </div>
  );
}
