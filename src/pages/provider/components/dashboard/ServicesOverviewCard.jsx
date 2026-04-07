import { FiArrowRight, FiPackage, FiPlus } from "react-icons/fi";
import { Skeleton } from "./dashboardShared";

export function ServicesOverviewCard({ servicesLoading, myServices, activeServices, onManage, onAddService }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary">
            <FiPackage size={18} />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">My Services</h3>
            <p className="text-xs text-muted dark:text-muted-dark font-body">
              {myServices.length === 0 ? "No services yet" : `${activeServices} active · ${myServices.length - activeServices} inactive`}
            </p>
          </div>
        </div>
        <button
          onClick={onManage}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors font-body"
        >
          Manage <FiArrowRight size={13} />
        </button>
      </div>

      {servicesLoading ? (
        <div className="p-5 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : myServices.length === 0 ? (
        <div className="py-10 flex flex-col items-center gap-3">
          <FiPackage size={28} className="text-muted dark:text-muted-dark opacity-40" />
          <p className="text-sm text-muted dark:text-muted-dark font-body">You have not added any services yet.</p>
          <button
            onClick={onAddService}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-hover transition-colors font-body"
          >
            <FiPlus size={14} /> Add Service
          </button>
        </div>
      ) : (
        <div className="divide-y divide-border dark:divide-border-dark">
          {myServices.slice(0, 4).map((service) => (
            <div key={service._id} className="flex items-center gap-3 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body truncate">
                  {service.serviceId?.name || "Service"}
                </p>
                <p className="text-xs text-muted dark:text-muted-dark font-body">
                  ₹{service.price?.toLocaleString("en-IN")} · {service.duration} min
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full font-body ${service.isAvailable ? "bg-accent-light dark:bg-accent/10 text-accent-hover" : "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark"}`}
              >
                {service.isAvailable ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
          {myServices.length > 4 ? (
            <button
              onClick={onManage}
              className="w-full py-3 text-xs font-semibold text-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-colors font-body"
            >
              View all {myServices.length} services →
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
