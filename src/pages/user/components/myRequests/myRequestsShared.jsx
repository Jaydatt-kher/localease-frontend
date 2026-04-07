export const STATUS_CONFIG = {
  open: {
    label: "Open",
    cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  closed: {
    label: "Closed",
    cls: "bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400",
    dot: "bg-gray-400",
  },
  booked: {
    label: "Booked",
    cls: "bg-accent-light dark:bg-accent/10 text-accent-hover",
    dot: "bg-accent",
  },
};

export const TABS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Booked", value: "booked" },
  { label: "Closed", value: "closed" },
];

export function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
