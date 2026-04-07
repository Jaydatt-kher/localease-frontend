import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAdminCategoryMutation,
  useGetAdminCategoriesQuery,
  useGetAdminCategoryStatsQuery,
  useUpdateAdminCategoryMutation,
} from "../../api/adminApi";
import { ConfirmDialog, EditCategoryModal } from "./components/serviceCategories/CategoryDialogs";
import { CategoryPagination } from "./components/serviceCategories/CategoryPagination";
import { CategoryStats } from "./components/serviceCategories/CategoryStats";
import { CategoryTable } from "./components/serviceCategories/CategoryTable";
import { CategoryToolbar } from "./components/serviceCategories/CategoryToolbar";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function ServiceCategoriesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data: stats, isLoading: statsLoading } = useGetAdminCategoryStatsQuery();
  const { data, isLoading, isFetching } = useGetAdminCategoriesQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
  });

  const [updateCategory, { isLoading: updating }] = useUpdateAdminCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteAdminCategoryMutation();

  const categories = data?.categories ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.pages ?? 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, total);
  const isActioning = updating || deleting;

  const handleToggle = useCallback(
    async (category) => {
      try {
        const response = await updateCategory({
          id: category._id,
          isActive: !category.isActive,
        }).unwrap();
        toast.success(response.message || `Category ${category.isActive ? "deactivated" : "activated"}.`);
      } catch {
        toast.error("Failed to update category status.");
      }
    },
    [updateCategory]
  );

  const handleDelete = useCallback(async () => {
    if (!confirm) return;

    try {
      const response = await deleteCategory(confirm.id).unwrap();
      toast.success(response.message || "Category deleted.");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category.");
    }

    setConfirm(null);
  }, [confirm, deleteCategory]);

  const handleEditSave = useCallback(
    async (formData) => {
      if (!editTarget?._id) return;

      try {
        const response = await updateCategory({ id: editTarget._id, ...formData }).unwrap();
        toast.success(response.message || "Category updated.");
        setEditTarget(null);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update category.");
      }
    },
    [editTarget, updateCategory]
  );

  const openAddCategoryPage = () => {
    navigate("/admin/categories/add");
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

      {editTarget ? (
        <EditCategoryModal
          category={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEditSave}
          saving={updating}
        />
      ) : null}

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">
            Service Categories
          </h1>
          <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
            Manage and organize service categories across the platform
          </p>
        </div>

        <CategoryStats stats={stats} statsLoading={statsLoading} />

        <CategoryToolbar
          search={search}
          statusFilter={statusFilter}
          isFetching={isFetching}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onAddCategory={openAddCategoryPage}
        />

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
          <CategoryTable
            categories={categories}
            isLoading={isLoading}
            search={search}
            itemsPerPage={ITEMS_PER_PAGE}
            isActioning={isActioning}
            onAddCategory={openAddCategoryPage}
            onEdit={setEditTarget}
            onToggle={handleToggle}
            onDelete={(category) => setConfirm({ id: category._id, name: category.name })}
          />

          <CategoryPagination
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
