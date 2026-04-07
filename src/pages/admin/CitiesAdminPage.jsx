import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetAdminCityStatsQuery,
  useGetAdminCitiesQuery,
  useCreateAdminCityMutation,
  useUpdateAdminCityMutation,
  useDeleteAdminCityMutation,
} from "../../api/adminApi";
import { CitiesHeader } from "./components/cities/CitiesHeader";
import { CitiesKpiGrid } from "./components/cities/CitiesKpiGrid";
import { CitiesPagination } from "./components/cities/CitiesPagination";
import { CitiesSearchBar } from "./components/cities/CitiesSearchBar";
import { CitiesTable } from "./components/cities/CitiesTable";
import { CityModal } from "./components/cities/CityModal";

function useDebounce(value, delay) {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
}

const ITEMS_PER_PAGE = 10;

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry"
];

export default function CitiesAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 350);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [formData, setFormData] = useState({ name: "", state: "", status: true });
  const [errors, setErrors] = useState({});

  useEffect(() => setCurrentPage(1), [debouncedSearch]);

  const { data: statsData } = useGetAdminCityStatsQuery();
  const { data: citiesData, isLoading, isFetching } = useGetAdminCitiesQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
  });

  const [createCity, { isLoading: creating }] = useCreateAdminCityMutation();
  const [updateCity, { isLoading: updating }] = useUpdateAdminCityMutation();
  const [deleteCity] = useDeleteAdminCityMutation();

  const cities = citiesData?.cities || [];
  const totalCount = citiesData?.total || 0;
  const totalPages = citiesData?.pages || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const stats = {
    total: statsData?.total || 0,
    active: statsData?.active || 0,
    inactive: statsData?.inactive || 0,
  };

  const handleAddCity = () => {
    setEditingCity(null);
    setFormData({ name: "", state: "", status: true });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditCity = (city) => {
    setEditingCity(city);
    setFormData({ name: city.name, state: city.state, status: city.status });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCity(null);
    setFormData({ name: "", state: "", status: true });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "City name is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingCity) {
        await updateCity({ id: editingCity._id, ...formData }).unwrap();
        toast.success("City updated successfully.");
      } else {
        await createCity(formData).unwrap();
        toast.success("City added successfully.");
      }
      handleCloseModal();
    } catch (err) {
      toast.error(err.data?.message || "Operation failed.");
    }
  };

  const handleToggleStatus = async (city) => {
    try {
      await updateCity({ id: city._id, status: !city.status }).unwrap();
      toast.success(`${city.name} status updated.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteCity = async (cityId) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      try {
        await deleteCity(cityId).unwrap();
        toast.success("City deleted successfully.");
      } catch (err) {
        toast.error(err.data?.message || "Failed to delete city.");
      }
    }
  };

  const TABLE_HEADS = ["City Name", "State", "Status", "Actions"];

  return (
    <div className="space-y-6">
      <CitiesHeader onAddCity={handleAddCity} />

      <CitiesKpiGrid total={stats.total} active={stats.active} inactive={stats.inactive} />

      <CitiesSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isFetching={isFetching}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <CitiesTable
          tableHeads={TABLE_HEADS}
          isLoading={isLoading}
          cities={cities}
          onToggleStatus={handleToggleStatus}
          onEditCity={handleEditCity}
          onDeleteCity={handleDeleteCity}
        />

        <CitiesPagination
          totalPages={totalPages}
          startIndex={startIndex}
          pageSize={ITEMS_PER_PAGE}
          totalCount={totalCount}
          currentPage={currentPage}
          onPrev={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          onNext={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        />
      </div>

      <CityModal
        isOpen={isModalOpen}
        editingCity={editingCity}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        states={INDIAN_STATES}
        creating={creating}
        updating={updating}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
