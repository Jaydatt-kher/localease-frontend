import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteAdminNotificationMutation,
  useGetAdminNotificationsQuery,
  useGetAdminNotificationStatsQuery,
  useToggleNotificationReadMutation,
} from "../../api/adminApi";
import { NotificationsFilters } from "./components/notifications/NotificationsFilters";
import { NotificationsHeader } from "./components/notifications/NotificationsHeader";
import { NotificationsKpiGrid } from "./components/notifications/NotificationsKpiGrid";
import { NotificationsPagination } from "./components/notifications/NotificationsPagination";
import { NotificationsTable } from "./components/notifications/NotificationsTable";

const ITEMS_PER_PAGE = 10;
const TABLE_HEADS = ["Title", "Recipient", "Type", "Message", "Status", "Date", "Actions"];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function NotificationsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, typeFilter, statusFilter]);

  const { data: statsData } = useGetAdminNotificationStatsQuery();
  const { data: notifsData, isLoading, isFetching } = useGetAdminNotificationsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    type: typeFilter,
    status: statusFilter,
  });
  const [toggleRead] = useToggleNotificationReadMutation();
  const [deleteNotif] = useDeleteAdminNotificationMutation();

  const currentNotifs = notifsData?.notifications || [];
  const totalCount = notifsData?.total || 0;
  const totalPages = notifsData?.pages || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  const kpiTotal = statsData?.total || 0;
  const kpiUnread = statsData?.unread || 0;
  const kpiRead = statsData?.read || 0;
  const byType = statsData?.byType || {};

  const handleToggleRead = async (id) => {
    try {
      const res = await toggleRead(id).unwrap();
      toast.success(res.message || "Updated.");
    } catch {
      toast.error("Failed to update notification.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotif(id).unwrap();
      toast.success("Notification deleted.");
    } catch {
      toast.error("Failed to delete notification.");
    }
  };

  const fmtDate = (iso) => {
    if (!iso) {
      return "-";
    }

    return new Date(iso).toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i += 1
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    return [1, ...range, totalPages];
  })();

  return (
    <div className="space-y-6">
      <NotificationsHeader />

      <NotificationsKpiGrid
        total={kpiTotal}
        unread={kpiUnread}
        read={kpiRead}
        bidAccepted={byType.BID_ACCEPTED || 0}
      />

      <NotificationsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={(value) => {
          setTypeFilter(value);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
        isFetching={isFetching}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <NotificationsTable
          tableHeads={TABLE_HEADS}
          isLoading={isLoading}
          notifications={currentNotifs}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          onToggleRead={handleToggleRead}
          onDelete={handleDelete}
          fmtDate={fmtDate}
        />

        <NotificationsPagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={totalCount}
          onPrev={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          onNext={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
          onPageSelect={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
