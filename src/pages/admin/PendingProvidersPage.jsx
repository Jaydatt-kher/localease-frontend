import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useApproveProviderMutation,
  useGetProvidersQuery,
  useGetProviderStatsQuery,
  useRejectProviderMutation,
} from "../../api/adminApi";
import { PendingProvidersFilters } from "./components/pendingProviders/PendingProvidersFilters";
import { PendingProvidersHeader } from "./components/pendingProviders/PendingProvidersHeader";
import { PendingProvidersPagination } from "./components/pendingProviders/PendingProvidersPagination";
import { PendingProvidersTable } from "./components/pendingProviders/PendingProvidersTable";
import { ProviderDetailModal } from "./ProviderDetailModal";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function PendingProvidersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, cityFilter]);

  const { data: allData } = useGetProvidersQuery({
    page: 1,
    limit: 200,
    search: "",
    status: "pending",
  });

  const { data, isLoading, isFetching } = useGetProvidersQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: "pending",
  });

  const { data: statsData } = useGetProviderStatsQuery();
  const [approveProvider, { isLoading: approving }] = useApproveProviderMutation();
  const [rejectProvider, { isLoading: rejecting }] = useRejectProviderMutation();

  const isProcessing = approving || rejecting;

  const cityOptions = useMemo(() => {
    const allProviders = allData?.providers ?? [];
    return [...new Set(allProviders.map((provider) => provider.city?.name).filter(Boolean))].sort();
  }, [allData]);

  const providers = useMemo(() => {
    const currentProviders = data?.providers ?? [];
    if (cityFilter === "all") {
      return currentProviders;
    }
    return currentProviders.filter((provider) => provider.city?.name === cityFilter);
  }, [data, cityFilter]);

  const pagination = data?.pagination ?? {};
  const total = pagination.totalProviders ?? 0;
  const totalPages =
    cityFilter === "all"
      ? pagination.totalPages ?? 1
      : Math.ceil(providers.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex =
    cityFilter === "all"
      ? Math.min(page * ITEMS_PER_PAGE, total)
      : Math.min(page * ITEMS_PER_PAGE, providers.length);

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i += 1
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      range.unshift("...");
    }

    if (page + delta < totalPages - 1) {
      range.push("...");
    }

    return [1, ...range, totalPages];
  })();

  const handleApprove = useCallback(
    async (id) => {
      try {
        const response = await approveProvider(id).unwrap();
        toast.success(response.message || "Provider approved successfully.");
        setModalOpen(false);
        setSelectedProvider(null);
      } catch {
        toast.error("Failed to approve provider.");
      }
    },
    [approveProvider]
  );

  const handleReject = useCallback(
    async (id) => {
      try {
        const response = await rejectProvider(id).unwrap();
        toast.success(response.message || "Provider rejected.");
        setModalOpen(false);
        setSelectedProvider(null);
      } catch {
        toast.error("Failed to reject provider.");
      }
    },
    [rejectProvider]
  );

  const openModal = (provider) => {
    setSelectedProvider(provider);
    setModalOpen(true);
  };

  const pendingCount = statsData?.pending ?? 0;

  return (
    <>
      <ProviderDetailModal
        provider={selectedProvider}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProvider(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        approving={approving}
        rejecting={rejecting}
      />

      <div className="space-y-6">
        <PendingProvidersHeader
          pendingCount={pendingCount}
          onBack={() => navigate("/admin/providers")}
        />

        <PendingProvidersFilters
          search={search}
          onSearchChange={setSearch}
          cityFilter={cityFilter}
          onCityFilterChange={setCityFilter}
          cityOptions={cityOptions}
          isFetching={isFetching}
        />

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark overflow-hidden">
          <PendingProvidersTable
            isLoading={isLoading}
            providers={providers}
            search={search}
            cityFilter={cityFilter}
            onOpenModal={openModal}
            onApprove={handleApprove}
            onReject={handleReject}
            approving={approving}
            rejecting={rejecting}
            isProcessing={isProcessing}
          />

          <PendingProvidersPagination
            isLoading={isLoading}
            providersLength={providers.length}
            startIndex={startIndex}
            endIndex={endIndex}
            total={total}
            cityFilter={cityFilter}
            page={page}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            onPageSelect={(pageItem) => setPage(pageItem)}
          />
        </div>
      </div>
    </>
  );
}
