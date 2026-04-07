import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiArrowLeft, FiPackage, FiPlus } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";

import {
  useDeleteProviderServiceMutation,
  useGetMyProviderServicesQuery,
  useUpdateProviderServiceMutation,
} from "../../api/providerApi";

import Navbar from "../../components/layout/Navbar";
import { AddServiceForm } from "./components/services/AddServiceForm";
import { ProviderServicesTips } from "./components/services/ProviderServicesTips";
import {
  EmptyState,
  SectionCard,
} from "./components/services/ProviderServicesShared";
import { ServiceCard } from "./components/services/ServiceCard";

export default function ProviderServicesPage() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState("all");
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data: myServices = [], isLoading, isError, refetch } = useGetMyProviderServicesQuery();
  const [updateProviderService] = useUpdateProviderServiceMutation();
  const [deleteProviderService] = useDeleteProviderServiceMutation();

  const existingServiceIds = myServices.map((providerService) => providerService.serviceId?._id || providerService.serviceId);

  const displayedServices = useMemo(() => {
    if (filterAvailable === "active") {
      return myServices.filter((service) => service.isAvailable);
    }
    if (filterAvailable === "inactive") {
      return myServices.filter((service) => !service.isAvailable);
    }
    return myServices;
  }, [myServices, filterAvailable]);

  const handleToggle = async (id, currentState) => {
    setTogglingId(id);
    try {
      await updateProviderService({ id, isAvailable: !currentState }).unwrap();
      toast.success(currentState ? "Service marked as inactive." : "Service is now active!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update availability.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this service from your profile? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteProviderService(id).unwrap();
      toast.success("Service removed.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to remove service.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar hideSearch />

      <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/provider/dashboard")}
              className="p-2 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
            >
              <FiArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">Manage Services</h1>
              <p className="text-sm text-muted dark:text-muted-dark font-body mt-0.5">
                {isLoading ? "Loading..." : `${myServices.length} service${myServices.length !== 1 ? "s" : ""} on your profile`}
              </p>
            </div>
            {!showAddForm && myServices.length > 0 ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm shadow-sm font-body"
              >
                <FiPlus size={16} /> Add Service
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {showAddForm ? (
          <SectionCard
            title="Add a New Service"
            subtitle="Select the service you offer and set your pricing"
            icon={<FiPlus size={18} />}
          >
            <AddServiceForm
              existingServiceIds={existingServiceIds}
              onSuccess={handleAddSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </SectionCard>
        ) : null}

        <SectionCard
          title="Your Services"
          subtitle="Toggle availability or edit pricing at any time"
          icon={<FiPackage size={18} />}
          action={
            myServices.length > 0 ? (
              <div className="flex items-center gap-1 p-1 bg-background-light dark:bg-surface-alt rounded-xl border border-border dark:border-border-dark">
                {[
                  { val: "all", label: "All" },
                  { val: "active", label: "Active" },
                  { val: "inactive", label: "Inactive" },
                ].map((filter) => (
                  <button
                    key={filter.val}
                    onClick={() => setFilterAvailable(filter.val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all font-body ${
                      filterAvailable === filter.val
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted dark:text-muted-dark hover:text-primary"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ) : null
          }
        >
          {isLoading ? (
            <div className="p-8 flex items-center justify-center gap-3 text-muted dark:text-muted-dark">
              <AiOutlineLoading3Quarters size={22} className="animate-spin text-primary" />
              <span className="text-sm font-body">Loading your services...</span>
            </div>
          ) : isError ? (
            <div className="p-8 flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
              <IoWarningOutline size={32} className="text-red-400" />
              <p className="text-sm font-body">Failed to load services.</p>
              <button onClick={refetch} className="text-sm font-semibold text-primary hover:underline font-body">
                Try again
              </button>
            </div>
          ) : myServices.length === 0 ? (
            <EmptyState onAdd={() => setShowAddForm(true)} />
          ) : displayedServices.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted dark:text-muted-dark font-body">
              No {filterAvailable} services found.
            </div>
          ) : (
            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedServices.map((providerService) => (
                <ServiceCard
                  key={providerService._id}
                  ps={providerService}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  togglingId={togglingId}
                  deletingId={deletingId}
                />
              ))}
            </div>
          )}
        </SectionCard>

        {myServices.length > 0 ? <ProviderServicesTips /> : null}
      </main>
    </div>
  );
}
