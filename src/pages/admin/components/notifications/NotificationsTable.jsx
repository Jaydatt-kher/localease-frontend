import { AlertCircle, CheckCheck, MoreVertical, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  RoleChip,
  StatusBadge,
  truncateNotificationText,
  TypeBadge,
} from "./NotificationsShared";

function NotifDropdown({ notif, isOpen, onToggle, onClose, onToggleRead, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => {
              onClose();
              onToggleRead();
            }}
            className="w-full text-left px-4 py-2 text-sm font-body text-primary dark:text-blue-400 hover:bg-background-light dark:hover:bg-surface-alt transition-colors flex items-center gap-2"
          >
            {notif.isRead ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" /> Mark as Unread
              </>
            ) : (
              <>
                <CheckCheck className="w-3.5 h-3.5" /> Mark as Read
              </>
            )}
          </button>
          <button
            onClick={() => {
              onClose();
              onDelete();
            }}
            className="w-full text-left px-4 py-2 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-border dark:border-border-dark flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function NotificationsTable({
  tableHeads,
  isLoading,
  notifications,
  openDropdown,
  setOpenDropdown,
  onToggleRead,
  onDelete,
  fmtDate,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-230">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {tableHeads.map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                {tableHeads.map((heading) => (
                  <td key={heading} className="px-4 py-3.5">
                    <div className="skeleton h-4 rounded-lg w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : notifications.length === 0 ? (
            <tr>
              <td colSpan={tableHeads.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">No notifications found.</p>
                </div>
              </td>
            </tr>
          ) : (
            notifications.map((notif) => (
              <tr
                key={notif._id}
                className={`group transition-colors ${
                  !notif.isRead
                    ? "bg-amber-50/30 dark:bg-amber-900/10 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    : "hover:bg-background-light dark:hover:bg-surface-alt"
                }`}
              >
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span
                    className={`text-sm font-body font-semibold ${
                      !notif.isRead
                        ? "text-foreground dark:text-foreground-dark"
                        : "text-muted dark:text-muted-dark"
                    }`}
                  >
                    {notif.title}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                      {notif.recipient || notif.senderName || "-"}
                    </span>
                    <RoleChip role={notif.recipientRole} />
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <TypeBadge type={notif.type} />
                </td>

                <td className="px-4 py-3.5 max-w-55">
                  <span
                    className={`text-sm font-body ${
                      !notif.isRead
                        ? "text-foreground dark:text-foreground-dark"
                        : "text-muted dark:text-muted-dark"
                    }`}
                  >
                    {truncateNotificationText(notif.body)}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge isRead={notif.isRead} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-body text-muted dark:text-muted-dark">
                    {fmtDate(notif.createdAt)}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap text-right">
                  <NotifDropdown
                    notif={notif}
                    isOpen={openDropdown === notif._id}
                    onToggle={() =>
                      setOpenDropdown(openDropdown === notif._id ? null : notif._id)
                    }
                    onClose={() => setOpenDropdown(null)}
                    onToggleRead={() => onToggleRead(notif._id)}
                    onDelete={() => onDelete(notif._id)}
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
