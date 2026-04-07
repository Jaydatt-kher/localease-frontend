import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Loader2,
  MoreVertical,
  ShieldCheck,
  ShieldOff,
  User as UserIcon,
  XCircle,
} from "lucide-react";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0">
      <span className="text-xs font-display font-bold text-primary dark:text-blue-400">{initials}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold
      ${
        isActive
          ? "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400"
          : "bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-accent-hover" : "bg-danger"}`} />
      {isActive ? "Active" : "Blocked"}
    </span>
  );
}

function VerifiedBadge({ verified }) {
  return verified ? (
    <CheckCircle className="w-3.5 h-3.5 text-accent-hover dark:text-green-400" title="Verified" />
  ) : (
    <XCircle className="w-3.5 h-3.5 text-muted dark:text-muted-dark opacity-40" title="Not verified" />
  );
}

function ActionMenu({ user, onView, onBlock, onUnblock, isLoading }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        disabled={isLoading}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors disabled:opacity-40"
        aria-label="Actions"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
      </button>

      {open ? (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => {
              setOpen(false);
              onView(user);
            }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </button>

          <div className="mx-3 border-t border-border dark:border-border-dark" />

          {user.status === "active" ? (
            <button
              onClick={() => {
                setOpen(false);
                onBlock(user);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <ShieldOff className="w-4 h-4" />
              Block User
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                onUnblock(user);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-body text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Unblock User
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, idx) => (
        <td key={idx} className="px-4 py-3.5">
          <div className="skeleton h-4 rounded-md" style={{ width: idx === 0 ? 140 : idx === 1 ? 180 : 80 }} />
        </td>
      ))}
    </tr>
  );
}

export function UsersTable({
  users,
  isLoading,
  itemsPerPage,
  search,
  statusFilter,
  isActioning,
  onViewUser,
  onBlockUser,
  onUnblockUser,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {["User", "Email", "Phone", "Email Verified", "Status", "Bookings", "Joined", "Actions"].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, idx) => <SkeletonRow key={idx} />)
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">
                    {search || statusFilter !== "all" ? "No users match your filters." : "No users found."}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className={`group transition-colors hover:bg-background-light dark:hover:bg-surface-alt ${
                  user.status === "blocked" ? "opacity-70" : ""
                }`}
              >
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={user.fullName} />
                    <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                      {user.fullName || <UserIcon className="w-4 h-4" />}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">{user.email || "-"}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">{user.mobileNo || "-"}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <VerifiedBadge verified={user.isEmailVerified} />
                    <span className="text-xs font-body text-muted dark:text-muted-dark">
                      {user.isEmailVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {user.bookings ?? 0}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-body text-muted dark:text-muted-dark">{formatDate(user.joinedAt)}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <ActionMenu
                    user={user}
                    onView={onViewUser}
                    onBlock={onBlockUser}
                    onUnblock={onUnblockUser}
                    isLoading={isActioning}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
