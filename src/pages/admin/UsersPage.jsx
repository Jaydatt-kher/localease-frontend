import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useBlockUserMutation,
  useGetUserStatsQuery,
  useGetUsersQuery,
  useUnblockUserMutation,
} from "../../api/adminApi";
import { UsersFilters } from "./components/users/UsersFilters";
import { UsersPagination } from "./components/users/UsersPagination";
import { UsersStats } from "./components/users/UsersStats";
import { UsersTable } from "./components/users/UsersTable";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function UsersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data: statsData, isLoading: statsLoading } = useGetUserStatsQuery();
  const { data, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
  });

  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: unblocking }] = useUnblockUserMutation();

  const users = data?.users ?? [];
  const pagination = data?.pagination ?? { total: 0, page: 1, totalPages: 1 };
  const { totalPages, total } = pagination;
  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, total);
  const isActioning = blocking || unblocking;
  const tableLoading = isLoading;

  const handleBlock = useCallback(
    async (id) => {
      try {
        const response = await blockUser(id).unwrap();
        toast.success(response.message || "User blocked.");
      } catch {
        toast.error("Failed to block user.");
      }
    },
    [blockUser]
  );

  const handleUnblock = useCallback(
    async (id) => {
      try {
        const response = await unblockUser(id).unwrap();
        toast.success(response.message || "User unblocked.");
      } catch {
        toast.error("Failed to unblock user.");
      }
    },
    [unblockUser]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Users</h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          Manage and monitor all customers in the platform
        </p>
      </div>

      <UsersStats statsData={statsData} statsLoading={statsLoading} />

      <UsersFilters
        search={search}
        statusFilter={statusFilter}
        isFetching={isFetching}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <UsersTable
          users={users}
          isLoading={tableLoading}
          itemsPerPage={ITEMS_PER_PAGE}
          search={search}
          statusFilter={statusFilter}
          isActioning={isActioning}
          onViewUser={(user) => navigate(`/admin/users/${user._id}`)}
          onBlockUser={(user) => handleBlock(user._id)}
          onUnblockUser={(user) => handleUnblock(user._id)}
        />

        <UsersPagination
          tableLoading={tableLoading}
          total={total}
          startIndex={startIndex}
          endIndex={endIndex}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
