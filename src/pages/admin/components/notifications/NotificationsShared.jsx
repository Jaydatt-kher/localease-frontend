export const TYPE_CFG = {
  NEW_ENQUIRY: {
    label: "New Enquiry",
    cls: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  },
  PROVIDER_BID: {
    label: "Provider Bid",
    cls: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  },
  BID_ACCEPTED: {
    label: "Bid Accepted",
    cls: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400 border-green-200 dark:border-green-800",
  },
  BID_REJECTED: {
    label: "Bid Rejected",
    cls: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400 border-red-200 dark:border-red-800",
  },
  BOOKING_CANCELLED: {
    label: "Booking Cancelled",
    cls: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  },
};

export function TypeBadge({ type }) {
  const cfg = TYPE_CFG[type] ?? {
    label: type,
    cls: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  };

  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-body font-semibold border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

export function StatusBadge({ isRead }) {
  return isRead ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-hover" /> Read
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Unread
    </span>
  );
}

export function RoleChip({ role }) {
  const isProvider = role === "provider";

  return (
    <span
      className={`text-[11px] font-body font-semibold ${
        isProvider
          ? "text-accent-hover dark:text-green-400"
          : "text-blue-600 dark:text-blue-400"
      }`}
    >
      {isProvider ? "Provider" : "User"}
    </span>
  );
}

export function truncateNotificationText(text, max = 60) {
  if (!text) {
    return "-";
  }

  return text.length > max ? `${text.slice(0, max)}...` : text;
}
