import { useState } from "react";

export function fmtDate(iso, opts = { day: "numeric", month: "short", year: "numeric" }) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-IN", opts);
}

export function Avatar({ imageUrl, fallbackName, size = "lg" }) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0 overflow-hidden`}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt="profile"
          className="w-full h-full object-cover rounded-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-display font-bold text-primary dark:text-blue-400">
          {fallbackName?.charAt(0)?.toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}

export function StatusBadge({ isVerified, isBlocked }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400">
        <span className="w-1.5 h-1.5 rounded-full bg-danger" />
        Blocked
      </span>
    );
  }

  if (!isVerified) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-hover" />
      Approved
    </span>
  );
}

export function StatCard({ label, value, icon: Icon, iconColor, iconBg }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
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
      <div className="w-8 h-8 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center shrink-0 mt-0.5">
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

export function Skeleton({ className }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}
