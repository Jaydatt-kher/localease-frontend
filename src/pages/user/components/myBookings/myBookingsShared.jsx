export const TABS = [
  { label: "All", value: undefined },
  { label: "Upcoming", value: "confirmed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const STATUS = {
  confirmed: {
    label: "Confirmed",
    cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    bar: "#1A5EA8",
  },
  in_progress: {
    label: "In Progress",
    cls: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    bar: "#F59E0B",
  },
  completed: {
    label: "Completed",
    cls: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    bar: "#4CAF50",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    bar: "#EF4444",
  },
};

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
