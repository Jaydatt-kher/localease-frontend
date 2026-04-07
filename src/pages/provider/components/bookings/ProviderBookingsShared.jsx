import { FiAlertCircle } from "react-icons/fi";

export function fmtDate(iso) {
  if (!iso) {
    return "-";
  }
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function fmtDateTime(iso) {
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

export const STATUS_CFG = {
  confirmed: {
    label: "Confirmed",
    dotCls: "bg-blue-500",
    cls: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700",
  },
  in_progress: {
    label: "In Progress",
    dotCls: "bg-amber-500",
    cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700",
  },
  completed: {
    label: "Completed",
    dotCls: "bg-green-500",
    cls: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700",
  },
  cancelled: {
    label: "Cancelled",
    dotCls: "bg-red-400",
    cls: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-700",
  },
};

export const PRICE_TYPE_LABEL = {
  fixed: "Fixed",
  hourly: "Hourly",
  inspection: "After Inspection",
};

export const PAYMENT_STATUS_CLS = {
  pending: "text-amber-600 dark:text-amber-400",
  completed: "text-green-600 dark:text-green-400",
  failed: "text-red-500",
  refunded: "text-purple-500",
};

export const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function CardSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="skeleton h-4 w-36 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="skeleton h-3 w-48 rounded" />
      <div className="skeleton h-3 w-32 rounded" />
    </div>
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-muted dark:text-muted-dark">
      <FiAlertCircle size={36} className="text-red-400" />
      <p className="font-body text-sm">Failed to load bookings.</p>
      <button onClick={onRetry} className="text-primary text-sm font-semibold font-body hover:underline">
        Retry
      </button>
    </div>
  );
}
