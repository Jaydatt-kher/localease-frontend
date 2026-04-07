import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} from "../api/notifications.js";
import {
  FiBell, FiTrash2, FiCheck, FiInbox, FiAlertCircle, FiX,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const N_TYPE = {
  NEW_ENQUIRY: {
    label: "New Enquiry",
    emoji: "📋",
    color: "text-primary",
    bg: "bg-primary-light dark:bg-primary/15",
    border: "border-primary/20",
    badge: "bg-primary-light dark:bg-primary/20 text-primary",
  },
  PROVIDER_BID: {
    label: "Provider Bid",
    emoji: "💬",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  },
  BID_ACCEPTED: {
    label: "Bid Accepted",
    emoji: "🎉",
    color: "text-accent-hover",
    bg: "bg-accent-light dark:bg-accent/15",
    border: "border-accent/20",
    badge: "bg-accent-light dark:bg-accent/20 text-accent-hover",
  },
  BID_REJECTED: {
    label: "Bid Rejected",
    emoji: "❌",
    color: "text-muted dark:text-muted-dark",
    bg: "bg-background-light dark:bg-surface-alt",
    border: "border-border dark:border-border-dark",
    badge: "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark",
  },
};

const TABS = [
  { value: "all",       label: "All" },
  { value: "unread",    label: "Unread" },
  { value: "NEW_ENQUIRY",  label: "Enquiries" },
  { value: "PROVIDER_BID", label: "Bids" },
  { value: "BID_ACCEPTED", label: "Accepted" },
];

function getNotificationRoute(n) {
  switch (n.type) {
    case "NEW_ENQUIRY":
      return "/provider/requests";
    case "PROVIDER_BID":
      return n.enquiryId ? `/my-requests/${n.enquiryId}` : "/my-requests";
    case "BID_ACCEPTED":
      return n.bookingId ? `/provider/bookings/${n.bookingId}` : "/provider/bookings";
    case "BID_REJECTED":
      return "/provider/requests";
    default:
      return "/notifications";
  }
}

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} minute${m !== 1 ? "s" : ""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h !== 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d !== 1 ? "s" : ""} ago`;
}

function formatFullDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-4 p-5 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl">
      <div className="skeleton w-11 h-11 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3.5 w-40 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-2.5 w-20 rounded" />
      </div>
    </div>
  );
}

function ClearConfirmModal({ onConfirm, onClose, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-sm bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <FiTrash2 size={22} className="text-red-500" />
        </div>
        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark text-center mb-1">
          Clear All Notifications?
        </h3>
        <p className="text-sm text-muted dark:text-muted-dark font-body text-center leading-relaxed mb-6">
          This will permanently delete all your notifications. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-body font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading
              ? <AiOutlineLoading3Quarters size={14} className="animate-spin" />
              : <FiTrash2 size={13} />}
            {isLoading ? "Clearing…" : "Clear All"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ n, onRead, onDelete, deletingId }) {
  const navigate = useNavigate();
  const cfg = N_TYPE[n.type] ?? N_TYPE.BID_REJECTED;

  const handleClick = () => {
    if (!n.isRead) onRead(n._id);
    navigate(getNotificationRoute(n));
  };

  return (
    <div
      className={`relative group flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer
        hover:-translate-y-0.5 hover:shadow-md
        ${!n.isRead
          ? "bg-primary-light/50 dark:bg-primary/8 border-primary/25"
          : "bg-surface-light dark:bg-surface-dark border-border dark:border-border-dark"
        }`}
      onClick={handleClick}
    >
      {}
      {!n.isRead && (
        <span className="absolute top-4 right-14 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
      )}

      {}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5 ${cfg.bg}`}>
        {cfg.emoji}
      </div>

      {}
      <div className="flex-1 min-w-0">
        {}
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className={`text-sm font-display font-bold ${cfg.color} leading-tight`}>
            {n.title}
          </p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-body ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>

        {}
        <p className="text-sm font-body text-foreground dark:text-foreground-dark leading-relaxed">
          {n.body}
        </p>

        {}
        {n.senderName && (
          <p className="text-xs font-body text-muted dark:text-muted-dark mt-1">
            From: <span className="font-semibold">{n.senderName}</span>
          </p>
        )}

        {}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {n.meta?.serviceName && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark font-body">
              {n.meta.serviceName}
            </span>
          )}
          {n.meta?.preferredDate && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-muted dark:text-muted-dark font-body">
              📅 {n.meta.preferredDate} {n.meta.preferredTime}
            </span>
          )}
          {n.bookingRef && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary-light dark:bg-primary/15 text-primary font-body">
              {n.bookingRef}
            </span>
          )}
        </div>

        {}
        <p className="text-[11px] font-body text-muted dark:text-muted-dark mt-2 opacity-70"
           title={formatFullDate(n.createdAt)}>
          {timeAgo(n.createdAt)}
        </p>
      </div>

      {}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(n._id); }}
        disabled={deletingId === n._id}
        className="flex-shrink-0 p-1.5 rounded-lg text-muted dark:text-muted-dark
          opacity-0 group-hover:opacity-100 transition-all
          hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
          disabled:opacity-30 disabled:cursor-not-allowed mt-0.5"
        title="Delete notification"
      >
        {deletingId === n._id
          ? <AiOutlineLoading3Quarters size={14} className="animate-spin" />
          : <FiTrash2 size={14} />}
      </button>
    </div>
  );
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [showClearModal, setShowClearModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

    const queryArgs = (() => {
    if (activeTab === "unread")  return { page, limit: 20, unreadOnly: true };
    return { page, limit: 20 };
  })();

  const { data: envelope, isLoading, isError, refetch } =
    useGetNotificationsQuery(queryArgs, { refetchOnMountOrArgChange: true });

  const [markAsRead]    = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: markingAll }] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAll, { isLoading: clearing }] = useClearAllNotificationsMutation();

    const allNotifications = envelope?.data ?? [];
  const pagination       = envelope?.pagination ?? null;
  const unreadCount      = envelope?.unreadCount ?? 0;

    const displayed = (() => {
    if (["all", "unread"].includes(activeTab)) return allNotifications;
    return allNotifications.filter((n) => n.type === activeTab);
  })();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleRead = (id) => {
    markAsRead(id).catch(() => {});
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Failed to mark all as read.");
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteNotification(id).unwrap();
    } catch {
      toast.error("Could not delete notification.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAll().unwrap();
      toast.success("All notifications cleared.");
      setShowClearModal(false);
    } catch {
      toast.error("Failed to clear notifications.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      {}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                  <FiBell size={20} />
                </div>
                <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-body">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <p className="text-sm text-muted dark:text-muted-dark font-body">
                Stay updated on your enquiries, bids, and bookings.
              </p>
            </div>

            {}
            <div className="flex items-center gap-2 flex-shrink-0">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAll}
                  disabled={markingAll}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-foreground dark:text-foreground-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                >
                  {markingAll
                    ? <AiOutlineLoading3Quarters size={13} className="animate-spin" />
                    : <FiCheck size={13} />}
                  Mark all read
                </button>
              )}
              {allNotifications.length > 0 && (
                <button
                  onClick={() => setShowClearModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-xs font-body font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FiTrash2 size={13} /> Clear all
                </button>
              )}
            </div>
          </div>

          {}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors
                  ${activeTab === tab.value
                    ? "bg-primary border-primary text-white"
                    : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-3">

        {}
        {isLoading && Array.from({ length: 5 }).map((_, i) => (
          <NotificationSkeleton key={i} />
        ))}

        {}
        {isError && (
          <div className="flex flex-col items-center py-16 gap-3 text-muted dark:text-muted-dark">
            <FiAlertCircle size={36} className="text-red-400" />
            <p className="font-body text-sm">Failed to load notifications.</p>
            <button onClick={refetch} className="text-primary text-sm font-semibold font-body hover:underline">
              Try again
            </button>
          </div>
        )}

        {}
        {!isLoading && !isError && displayed.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-4 text-muted dark:text-muted-dark">
            <div className="w-16 h-16 rounded-2xl bg-background-light dark:bg-surface-alt flex items-center justify-center">
              <FiInbox size={28} className="opacity-40" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">
              {activeTab === "unread" ? "All caught up!" : "No notifications yet"}
            </h3>
            <p className="text-sm font-body text-center max-w-xs">
              {activeTab === "unread"
                ? "You have no unread notifications."
                : "Notifications will appear here when providers respond to your enquiries or customers accept your bids."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Go to Home
            </button>
          </div>
        )}

        {}
        {!isLoading && !isError && displayed.map((n) => (
          <NotificationCard
            key={n._id}
            n={n}
            onRead={handleRead}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        ))}

        {}
        {!isLoading && !isError && pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm font-body text-muted dark:text-muted-dark">
              Page{" "}
              <span className="font-semibold text-foreground dark:text-foreground-dark">
                {page}
              </span>{" "}
              of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />

      {}
      {showClearModal && (
        <ClearConfirmModal
          isLoading={clearing}
          onConfirm={handleClearAll}
          onClose={() => !clearing && setShowClearModal(false)}
        />
      )}
    </div>
  );
}