import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAdminServiceMutation,
  useGetAdminServiceStatsQuery,
  useGetAdminServicesQuery,
  useUpdateAdminServiceMutation,
} from "../../api/adminApi";
import { useGetAllCategoriesQuery, useGetCitiesQuery } from "../../api/serviceApi";
import { ConfirmDialog } from "./components/services/ServicesDialogs";
import { ServicesPagination } from "./components/services/ServicesPagination";
import { ServicesStats } from "./components/services/ServicesStats";
import { ServicesTable } from "./components/services/ServicesTable";
import { ServicesToolbar } from "./components/services/ServicesToolbar";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function ServicesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, catFilter, cityFilter]);

  const { data: stats, isLoading: statsLoading } = useGetAdminServiceStatsQuery();
  const { data, isLoading, isFetching } = useGetAdminServicesQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
    cityId: cityFilter,
    categoryId: catFilter,
  });
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: cities = [] } = useGetCitiesQuery();

  const [updateService, { isLoading: updating }] = useUpdateAdminServiceMutation();
  const [deleteService, { isLoading: deleting }] = useDeleteAdminServiceMutation();

  const services = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.pages ?? 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, total);
  const isActioning = updating || deleting;

  const handleToggle = useCallback(
    async (service) => {
      try {
        const response = await updateService({ id: service._id, isAvailable: !service.isAvailable }).unwrap();
        toast.success(response.message || `Service ${service.isAvailable ? "deactivated" : "activated"}.`);
      } catch {
        toast.error("Failed to update service status.");
      }
    },
    [updateService]
  );

  const handleDelete = useCallback(async () => {
    if (!confirm) return;

    try {
      const response = await deleteService(confirm.id).unwrap();
      toast.success(response.message || "Service deleted.");
    } catch {
      toast.error("Failed to delete service.");
    }

    setConfirm(null);
  }, [confirm, deleteService]);

  const openAddServicePage = () => {
    navigate("/admin/services/add");
  };

  return (
    <>
      <ConfirmDialog
        open={Boolean(confirm)}
        name={confirm?.name}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(null)}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Services</h1>
          <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
            Manage all platform services visible to customers
          </p>
        </div>

        <ServicesStats stats={stats} statsLoading={statsLoading} />

        <ServicesToolbar
          search={search}
          statusFilter={statusFilter}
          catFilter={catFilter}
          cityFilter={cityFilter}
          categories={categories}
          cities={cities}
          isFetching={isFetching}
          onSearchChange={setSearch}
          onCategoryChange={setCatFilter}
          onCityChange={setCityFilter}
          onStatusChange={setStatusFilter}
          onAddService={openAddServicePage}
        />

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
          <ServicesTable
            services={services}
            isLoading={isLoading}
            search={search}
            statusFilter={statusFilter}
            catFilter={catFilter}
            cityFilter={cityFilter}
            itemsPerPage={ITEMS_PER_PAGE}
            isActioning={isActioning}
            onAddService={openAddServicePage}
            onEdit={(service) => navigate(`/admin/services/edit/${service._id}`)}
            onToggle={handleToggle}
            onDelete={(service) => setConfirm({ id: service._id, name: service.name })}
          />

          <ServicesPagination
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
