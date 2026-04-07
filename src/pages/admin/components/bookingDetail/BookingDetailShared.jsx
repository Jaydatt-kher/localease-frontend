import { Star } from "lucide-react";

export function fmtDate(iso) {
  if (!iso) {
    return "-";
  }

  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
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

export function fmtCurrency(val) {
  if (val == null) {
    return "-";
  }

  return `₹${Number(val).toLocaleString("en-IN")}`;
}

export function Skeleton({ className }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function SectionCard({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary-light dark:bg-primary/20",
  children,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border dark:border-border-dark flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3>
          {subtitle ? (
            <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border dark:border-border-dark last:border-0">
      <div className="w-8 h-8 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-muted dark:text-muted-dark" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
          {label}
        </p>
        <p
          className={`text-sm mt-0.5 wrap-break-word text-foreground dark:text-foreground-dark ${
            mono ? "font-mono" : "font-body"
          }`}
        >
          {value ?? "-"}
        </p>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    confirmed: {
      label: "Confirmed",
      cls: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    in_progress: {
      label: "In Progress",
      cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    completed: {
      label: "Completed",
      cls: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400",
      dot: "bg-accent-hover",
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400",
      dot: "bg-danger",
    },
  };

  const cfg = map[status] ?? {
    label: status,
    cls: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function PaymentBadge({ status }) {
  const map = {
    pending: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    completed: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400",
    failed: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400",
    refunded: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  };

  const label = status ? `${status.charAt(0).toUpperCase()}${status.slice(1)}` : "-";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-semibold ${
        map[status] ?? "bg-gray-100 dark:bg-gray-800 text-gray-600"
      }`}
    >
      {label}
    </span>
  );
}

export function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-border dark:text-border-dark"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
        {rating}/5
      </span>
    </div>
  );
}

export function Avatar({ name, photo, size = "md" }) {
  const sizeClass = size === "lg" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm";
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (photo) {
    return <img src={photo} alt={name} className={`${sizeClass} rounded-full object-cover shrink-0`} />;
  }

  return (
    <div className={`${sizeClass} rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0`}>
      <span className="font-display font-bold text-primary dark:text-blue-400">{initials}</span>
    </div>
  );
}

export function PriceTypeChip({ type }) {
  const map = {
    fixed: {
      label: "Fixed Price",
      cls: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    hourly: {
      label: "Hourly Rate",
      cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    },
    inspection: {
      label: "Inspection",
      cls: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
  };

  const cfg = map[type] ?? { label: type, cls: "bg-gray-100 dark:bg-gray-800 text-gray-600" };

  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-semibold ${cfg.cls}`}>{cfg.label}</span>;
}
