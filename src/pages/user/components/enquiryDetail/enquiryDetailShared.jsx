export const PRICE_TYPE_CONFIG = {
  fixed: {
    label: "Fixed",
    cls: "bg-accent-light dark:bg-accent/10 text-accent-hover",
  },
  hourly: {
    label: "/hr",
    cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  },
  inspection: {
    label: "Inspection",
    cls: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
  },
};

export const STATUS_CONFIG = {
  open: {
    label: "Open",
    cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  },
  closed: {
    label: "Closed",
    cls: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  },
  booked: {
    label: "Booked",
    cls: "bg-accent-light dark:bg-accent/10 text-accent-hover",
  },
};

export function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function fmtDateTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
