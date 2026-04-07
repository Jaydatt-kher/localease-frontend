import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import EnquiryFormModal from "../../components/enquiry/EnquiryFormModal";
import { useGetServiceDetailsQuery } from "../../api/serviceApi";
import { useGetFilteredProvidersQuery } from "../../api/providerApi";
import { selectLocationCoords } from "../../redux/locationSlice";
import { selectUser } from "../../redux/authSlice";
import {
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { FilterPanel } from "./components/serviceProviders/FilterPanel";
import { MassEnquiryBanner } from "./components/serviceProviders/MassEnquiryBanner";
import { MobileFilterDrawer } from "./components/serviceProviders/MobileFilterDrawer";
import { ProviderCard } from "./components/serviceProviders/ProviderCard";
import { ProviderCardSkeleton } from "./components/serviceProviders/ProviderCardSkeleton";
import { ServiceHeader } from "./components/serviceProviders/ServiceHeader";
import { DEFAULT_FILTERS } from "./components/serviceProviders/serviceProvidersShared";

export default function ServiceProvidersPage() {
  const { serviceId } = useParams();
  const navigate      = useNavigate();
  const coords        = useSelector(selectLocationCoords);
  const user          = useSelector(selectUser);

  const [filters,         setFilters]         = useState(DEFAULT_FILTERS);
  const [filterOpen,      setFilterOpen]       = useState(false);
  const [enquiryOpen,     setEnquiryOpen]      = useState(false);
  const [enquiryProvider, setEnquiryProvider]  = useState(null);
  const [massEnquiry, setMassEnquiry] = useState(false);
  const [page, setPage] = useState(1);
  const [imgError, setImgError] = useState(false);

    const openMassEnquiry = () => {
    if (!user) { navigate("/signup"); return; }
    setEnquiryProvider(null); setMassEnquiry(true); setEnquiryOpen(true);
  };
  const openSingleEnquiry = (pid) => {
    if (!user) { navigate("/signup"); return; }
    setEnquiryProvider(pid); setMassEnquiry(false); setEnquiryOpen(true);
  };
  const closeEnquiry = () => { setEnquiryOpen(false); setEnquiryProvider(null); setMassEnquiry(false); };

    const { data: service, isLoading: svcLoading } = useGetServiceDetailsQuery(serviceId);

    const filterArgs = {
    serviceId,
    sortBy: filters.sortBy,
    ...(Number(filters.minRating)  > 0  && { minRating:     filters.minRating }),
    ...(filters.minPrice          !== "" && { minPrice:      filters.minPrice }),
    ...(filters.maxPrice          !== "" && { maxPrice:      filters.maxPrice }),
    ...(filters.minExperience     !== "" && { minExperience: filters.minExperience }),
    ...(filters.priceTypes.length  > 0  && { priceType:     filters.priceTypes.join(",") }),
    ...(coords && { lat: coords.lat, lng: coords.lng, radius: 20000 }),
    page,
    limit: 10,
  };

  const { data: providerEnvelope, isLoading: provLoading, isFetching: provFetching } =
    useGetFilteredProvidersQuery(filterArgs);

  const providers  = providerEnvelope?.data       ?? [];
  const pagination = providerEnvelope?.pagination  ?? null;
  const total      = pagination?.total             ?? null;

  const handleFilterChange = useCallback((key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setPage(1);
  }, []);

  const handleFilterReset = () => { setFilters(DEFAULT_FILTERS); setPage(1); };

  const activeFilterCount =
    (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0) +
    filters.priceTypes.length + (filters.minRating > 0 ? 1 : 0) +
    (filters.minExperience ? 1 : 0) + (filters.sortBy !== "rating" ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <ServiceHeader
        navigate={navigate}
        svcLoading={svcLoading}
        service={service}
        total={total}
        activeFilterCount={activeFilterCount}
        setFilterOpen={setFilterOpen}
        imgError={imgError}
        setImgError={setImgError}
      />

      <MassEnquiryBanner
        svcLoading={svcLoading}
        service={service}
        openMassEnquiry={openMassEnquiry}
      />

      {}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">

          {}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 sticky top-17">
              <FilterPanel filters={filters} onChange={handleFilterChange} onReset={handleFilterReset} resultCount={total} />
            </div>
          </aside>

          {}
          <div className="flex-1 min-w-0">
            {(provLoading || provFetching)
              ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Array.from({ length: 6 }).map((_, i) => <ProviderCardSkeleton key={i} />)}</div>
              : providers.length === 0
                ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted dark:text-muted-dark">
                    <FiMapPin size={40} className="opacity-30" />
                    <div className="text-center">
                      <p className="font-display font-bold text-foreground dark:text-foreground-dark mb-1">No providers found</p>
                      <p className="text-sm font-body">Try loosening the filters or updating your location.</p>
                    </div>
                    {activeFilterCount > 0 && (
                      <button onClick={handleFilterReset} className="px-4 py-2 bg-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors">
                        Reset filters
                      </button>
                    )}
                  </div>
                )
                : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted dark:text-muted-dark font-body">
                        <span className="font-bold text-foreground dark:text-foreground-dark">{total ?? providers.length}</span> provider{(total ?? providers.length) !== 1 ? "s" : ""} available
                      </p>
                      <button
                        onClick={openMassEnquiry}
                        className="flex items-center gap-1.5 text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors"
                      >
                        <FiUsers size={13} /> Request all
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {providers.map(item => (
                        <ProviderCard
                          key={item.providerServiceId ?? item.provider?._id}
                          item={item}
                          onEnquire={pid => openSingleEnquiry(pid)}
                          onView={id => navigate(`/providers/${id}`)}
                        />
                      ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 mt-8">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                          className="px-4 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                          Previous
                        </button>
                        <span className="text-sm font-body text-muted dark:text-muted-dark">
                          Page <span className="font-semibold text-foreground dark:text-foreground-dark">{page}</span> of {pagination.totalPages}
                        </span>
                        <button onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages}
                          className="px-4 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )
            }
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleFilterReset={handleFilterReset}
        total={total}
      />

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={closeEnquiry}
        serviceId={serviceId}
        serviceName={service?.name}
        providerId={massEnquiry ? null : enquiryProvider}
      />

      <Footer />
    </div>
  );
}