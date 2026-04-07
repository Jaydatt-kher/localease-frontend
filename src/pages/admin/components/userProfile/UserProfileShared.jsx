import { CheckCircle, Phone } from "lucide-react";

export function fmtDate(iso, opts = { day: "numeric", month: "short", year: "numeric" }) {
  if (!iso) {
    return "-";
  }

  return new Date(iso).toLocaleDateString("en-IN", opts);
}

export function fmtCurrency(val) {
  if (val == null) {
    return "-";
  }

  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(1)}L`;
  }

  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(1)}K`;
  }

  return `₹${val}`;
}

export function Avatar({ name, size = "lg" }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const sizeClass = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center flex-shrink-0`}
    >
      <span className="font-display font-bold text-primary dark:text-blue-400">{initials}</span>
    </div>
  );
}

export function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold ${
        isActive
          ? "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400"
          : "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-accent-hover" : "bg-danger"}`}
      />
      {isActive ? "Active" : "Blocked"}
    </span>
  );
}

const BOOKING_STATUS_STYLES = {
  completed: "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400",
  confirmed: "bg-primary-light dark:bg-primary/10 text-primary dark:text-blue-400",
  in_progress: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  cancelled: "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400",
};

export function BookingBadge({ status }) {
  const label =
    status === "in_progress" ? "In Progress" : `${status.charAt(0).toUpperCase()}${status.slice(1)}`;

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-body font-semibold ${BOOKING_STATUS_STYLES[status] ?? ""}`}
    >
      {label}
    </span>
  );
}

export function StatCard({ label, value, icon: Icon, iconColor, iconBg }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
          {label}
        </p>
        <p className="text-xl font-display font-bold text-foreground dark:text-foreground-dark leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border dark:border-border-dark last:border-0">
      <div className="w-8 h-8 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-muted dark:text-muted-dark" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
          {label}
        </p>
        <p className="text-sm font-body text-foreground dark:text-foreground-dark mt-0.5 break-words">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

export function UserProfileSkeleton({ className }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function UserVerificationRows({ user }) {
  return (
    <>
      <InfoRow icon={CheckCircle} label="Email Verified" value={user?.isEmailVerified ? "Yes ✓" : "No"} />
      <InfoRow icon={Phone} label="Phone Verified" value={user?.isMobileVerified ? "Yes ✓" : "No"} />
    </>
  );
}
