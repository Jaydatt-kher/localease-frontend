import { Banknote, CreditCard, DollarSign } from "lucide-react";

export function StatusBadge({ status }) {
  const cfg = {
    completed: {
      label: "Completed",
      dot: "bg-accent-hover",
      cls: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400",
    },
    pending: {
      label: "Pending",
      dot: "bg-amber-500",
      cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    },
    failed: {
      label: "Failed",
      dot: "bg-danger",
      cls: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400",
    },
    refunded: {
      label: "Refunded",
      dot: "bg-purple-500",
      cls: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
  }[status] ?? {
    label: status,
    dot: "bg-gray-400",
    cls: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function MethodBadge({ method }) {
  const cfg = {
    online: {
      label: "Online",
      icon: CreditCard,
      cls: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    },
    cash_on_service: {
      label: "Cash on Service",
      icon: Banknote,
      cls: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400 border-green-200 dark:border-green-800",
    },
  }[method] ?? {
    label: method,
    icon: DollarSign,
    cls: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  };

  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-body font-semibold border ${cfg.cls}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}
