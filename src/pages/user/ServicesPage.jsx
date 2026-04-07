import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  useGetAllCategoriesQuery,
  useGetAllServicesQuery,
  useGetServicesByCategoryQuery,
  useSearchServiceQuery,
} from "../../api/serviceApi";
import ServicesGrid from "./components/services/ServicesGrid";
import ServicesHeader from "./components/services/ServicesHeader";
import ServicesSummary from "./components/services/ServicesSummary";

export default function ServicesPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const urlCategoryId = searchParams.get("categoryId") ?? categoryId ?? null;

  const [search, setSearch] = useState(urlQuery);
  const [debouncedQ, setDebouncedQ] = useState(urlQuery);
  const [activeCatId, setActiveCatId] = useState(urlCategoryId);

  const prevQRef = useRef(debouncedQ);
  const debounceRef = useRef(null);

  useEffect(() => {
    const newQ = searchParams.get("q") ?? "";
    const newCat = searchParams.get("categoryId") ?? categoryId ?? null;
    setSearch(newQ);
    setDebouncedQ(newQ);
    setActiveCatId(newCat);
    prevQRef.current = newQ;
  }, [searchParams.toString(), categoryId]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = search.trim();
      if (trimmed !== prevQRef.current) {
        setActiveCatId(null);
      }
      prevQRef.current = trimmed;
      setDebouncedQ(search);
    }, 380);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const { data: categories = [], isLoading: catsLoading } = useGetAllCategoriesQuery();

  const { data: allServices = [], isLoading: allLoading } =
    useGetAllServicesQuery(undefined, { skip: !!(activeCatId || debouncedQ.trim()) });

  const { data: searchResults = [], isLoading: searchLoading, isFetching: searchFetching } =
    useSearchServiceQuery(debouncedQ, { skip: !debouncedQ.trim() });

  const { data: catServices = [], isLoading: catLoading } =
    useGetServicesByCategoryQuery(activeCatId, { skip: !activeCatId });

  useEffect(() => {
    if (!debouncedQ.trim() || activeCatId) return;
    const matched = categories.find((c) =>
      c.name.toLowerCase().includes(debouncedQ.trim().toLowerCase())
    );
    if (matched) {
      setActiveCatId(matched._id);
      setSearch("");
      setDebouncedQ("");
      prevQRef.current = "";
    }
  }, [debouncedQ, categories]);

  const isAllTab = !activeCatId && !debouncedQ.trim();
  let services = [];
  let svcLoading = false;

  if (isAllTab) {
    services   = allServices;
    svcLoading = allLoading;
  } else if (debouncedQ.trim()) {
    services   = searchResults;
    svcLoading = searchLoading || searchFetching;
  } else {
    services   = catServices;
    svcLoading = catLoading;
  }

  const handleSelectService = (svc) => {
    navigate(`/services/${svc._id}`);
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedQ("");
    prevQRef.current = "";
  };

  const selectAllTab = () => {
    setActiveCatId(null);
    clearSearch();
  };

  const selectCategory = (catId) => {
    setActiveCatId(catId);
    clearSearch();
  };

  const activeCategoryName =
    activeCatId && categories.find((c) => c._id === activeCatId)
      ? categories.find((c) => c._id === activeCatId)?.name
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <ServicesHeader
        search={search}
        setSearch={setSearch}
        onClearSearch={clearSearch}
        isAllTab={isAllTab}
        onSelectAll={selectAllTab}
        categories={categories}
        catsLoading={catsLoading}
        activeCatId={activeCatId}
        onSelectCategory={selectCategory}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {!svcLoading && (
          <ServicesSummary
            services={services}
            activeCategoryName={activeCategoryName}
            query={debouncedQ.trim()}
          />
        )}

        <ServicesGrid
          svcLoading={svcLoading}
          services={services}
          onSelectService={handleSelectService}
        />
      </div>

      <Footer />
    </div>
  );
}