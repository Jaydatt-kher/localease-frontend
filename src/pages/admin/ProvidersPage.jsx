import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useApproveProviderMutation,
  useBlockProviderMutation,
  useDeleteProviderMutation,
  useGetProvidersQuery,
  useGetProviderStatsQuery,
  useUnblockProviderMutation,
} from "../../api/adminApi";
import { ConfirmDialog } from "./components/providers/ProvidersDialogs";
import { ProvidersPagination } from "./components/providers/ProvidersPagination";
import { ProvidersStats } from "./components/providers/ProvidersStats";
import { ProvidersTable } from "./components/providers/ProvidersTable";
import { ProvidersToolbar } from "./components/providers/ProvidersToolbar";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProvidersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data: statsData, isLoading: statsLoading } = useGetProviderStatsQuery();
  const { data, isLoading, isFetching } = useGetProvidersQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
  });

  const [approveProvider, { isLoading: approving }] = useApproveProviderMutation();
  const [blockProvider, { isLoading: blocking }] = useBlockProviderMutation();
  const [unblockProvider, { isLoading: unblocking }] = useUnblockProviderMutation();
  const [deleteProvider, { isLoading: deleting }] = useDeleteProviderMutation();

  const providers = data?.providers ?? [];
  const pagination = data?.pagination ?? { totalProviders: 0, totalPages: 1, currentPage: 1 };
  const total = pagination.totalProviders ?? 0;
  const totalPages = pagination.totalPages ?? 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, total);
  const isActioning = approving || blocking || unblocking || deleting;
  const pendingCount = statsData?.pending ?? 0;

  const handleApprove = useCallback(
    async (id) => {
      try {
        const response = await approveProvider(id).unwrap();
        toast.success(response.message || "Provider approved.");
      } catch {
        toast.error("Failed to approve provider.");
      }
    },
    [approveProvider]
  );

  const handleBlock = useCallback(
    async (id) => {
      try {
        const response = await blockProvider(id).unwrap();
        toast.success(response.message || "Provider blocked.");
      } catch {
        toast.error("Failed to block provider.");
      }
    },
    [blockProvider]
  );

  const handleUnblock = useCallback(
    async (id) => {
      try {
        const response = await unblockProvider(id).unwrap();
        toast.success(response.message || "Provider unblocked.");
      } catch {
        toast.error("Failed to unblock provider.");
      }
    },
    [unblockProvider]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteProvider(id).unwrap();
        toast.success(response.message || "Provider deleted.");
      } catch {
        toast.error("Failed to delete provider.");
      }

      setConfirm(null);
    },
    [deleteProvider]
  );

  return (
    <>
      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.type === "delete" ? "Delete Provider?" : ""}
        message={
          confirm?.type === "delete"
            ? `"${confirm?.name}" will be soft-deleted. This action can be reversed.`
            : ""
        }
        confirmLabel="Delete"
        confirmClass="bg-danger hover:bg-red-700"
        onConfirm={() => handleDelete(confirm?.id)}
        onCancel={() => setConfirm(null)}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">
            Providers
          </h1>
          <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
            Manage and monitor all service providers in the platform
          </p>
        </div>

        <ProvidersStats statsData={statsData} statsLoading={statsLoading} />

        <ProvidersToolbar
          search={search}
          statusFilter={statusFilter}
          pendingCount={pendingCount}
          isFetching={isFetching}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPendingClick={() => navigate("/admin/providers/pending")}
        />

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
          <ProvidersTable
            providers={providers}
            isLoading={isLoading}
            search={search}
            statusFilter={statusFilter}
            itemsPerPage={ITEMS_PER_PAGE}
            isActioning={isActioning}
            onView={(provider) => navigate(`/admin/providers/${provider._id}`)}
            onApprove={(provider) => handleApprove(provider._id)}
            onBlock={(provider) => handleBlock(provider._id)}
            onUnblock={(provider) => handleUnblock(provider._id)}
            onDelete={(provider) =>
              setConfirm({ type: "delete", id: provider._id, name: provider.businessName })
            }
          />

          <ProvidersPagination
            isLoading={isLoading}
            total={total}
            startIndex={startIndex}
            endIndex={endIndex}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
