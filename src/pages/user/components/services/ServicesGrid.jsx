import { FiSearch } from "react-icons/fi";
import ServiceCard from "./ServiceCard";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

export default function ServicesGrid({ svcLoading, services, onSelectService }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {svcLoading ? (
        Array.from({ length: 8 }).map((_, i) => <ServiceCardSkeleton key={i} />)
      ) : services.length === 0 ? (
        <div className="col-span-full flex flex-col items-center py-20 gap-3 text-muted dark:text-muted-dark">
          <FiSearch size={40} className="opacity-30" />
          <p className="font-body text-sm">No services found. Try a different search.</p>
        </div>
      ) : (
        services.map((svc) => (
          <ServiceCard key={svc._id} svc={svc} onClick={() => onSelectService(svc)} />
        ))
      )}
    </div>
  );
}
