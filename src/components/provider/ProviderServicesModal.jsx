import { useState } from "react";
import { FiX, FiClock, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetProviderDetailsQuery } from "../../api/providerApi";
import EnquiryFormModal from "../enquiry/EnquiryFormModal";

const PRICE_TYPE = {
  fixed:      { label: "Fixed",      cls: "bg-accent-light dark:bg-accent/10 text-accent-hover" },
  hourly:     { label: "/hr",        cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" },
  inspection: { label: "After inspection", cls: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" },
};

function formatDuration(mins) {
  if (!mins) return null;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function Avatar({ name, size = 44 }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  return (
    <div
      className="rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary border-2 border-primary/20 flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </div>
  );
}

export default function ProviderServicesModal({ providerId, onClose }) {
  const [enquiryService, setEnquiryService] = useState(null); 
  const { data, isLoading, isError } = useGetProviderDetailsQuery(providerId, {
    skip: !providerId,
  });

    const provider = data?.provider ?? null;
  const services = data?.services ?? [];

  if (!providerId) return null;

  return (
    <>
      {}
      {!enquiryService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-2xl overflow-hidden">

            {}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-border-dark">
              <div>
                <h2 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
                  Choose a Service
                </h2>
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
                  Pick what you need from this provider
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {}
            {(isLoading || provider) && (
              <div className="flex items-center gap-3 px-5 py-3 bg-background-light dark:bg-surface-alt border-b border-border dark:border-border-dark">
                {isLoading ? (
                  <>
                    <div className="skeleton w-11 h-11 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="skeleton h-3.5 w-32 rounded" />
                      <div className="skeleton h-2.5 w-20 rounded" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar name={provider.businessName} size={44} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
                          {provider.businessName}
                        </p>
                        {provider.isVerified && (
                          <HiCheckBadge size={14} className="text-accent flex-shrink-0" />
                        )}
                      </div>
                      {provider.rating?.average > 0 && (
                        <p className="text-xs text-muted dark:text-muted-dark font-body">
                          ⭐ {provider.rating.average.toFixed(1)}
                          {provider.rating.count > 0 && ` (${provider.rating.count})`}
                          {provider.completedJobs > 0 && ` · ${provider.completedJobs} jobs`}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {}
            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col gap-0 divide-y divide-border dark:divide-border-dark">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-4">
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-3.5 w-36 rounded" />
                        <div className="skeleton h-2.5 w-52 rounded" />
                      </div>
                      <div className="skeleton h-8 w-20 rounded-xl flex-shrink-0" />
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center gap-2 py-10 text-muted dark:text-muted-dark">
                  <FiAlertCircle size={28} className="text-red-400" />
                  <p className="text-sm font-body">Could not load services. Please try again.</p>
                </div>
              ) : services.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-muted dark:text-muted-dark">
                  <FiAlertCircle size={28} className="opacity-30" />
                  <p className="text-sm font-body">This provider hasn't added any services yet.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border dark:divide-border-dark">
                  {services.map((svc) => {
                                                            const serviceDoc = svc.service ?? svc.serviceId ?? null;
                    const serviceId  = serviceDoc?._id ?? serviceDoc;
                    const name       = serviceDoc?.name ?? "Service";
                    const desc       = serviceDoc?.description ?? null;
                    const pt         = PRICE_TYPE[svc.priceType] ?? PRICE_TYPE.inspection;

                    return (
                      <li key={svc._id}>
                        <button
                          onClick={() => setEnquiryService({ _id: serviceId, name })}
                          className="w-full text-left flex items-center gap-3 px-5 py-4 hover:bg-primary-light dark:hover:bg-primary/10 transition-colors group"
                        >
                          {}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                              {name}
                            </p>
                            {desc && (
                              <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5 line-clamp-1">
                                {desc}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              {}
                              <span className="flex items-center gap-0.5 text-xs font-bold text-foreground dark:text-foreground-dark font-body">
                                <TbCurrencyRupee size={13} />
                                {svc.price != null ? svc.price.toLocaleString("en-IN") : "—"}
                              </span>
                              {}
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-body ${pt.cls}`}>
                                {pt.label}
                              </span>
                              {}
                              {svc.duration && (
                                <span className="flex items-center gap-1 text-[10px] text-muted dark:text-muted-dark font-body">
                                  <FiClock size={9} />{formatDuration(svc.duration)}
                                </span>
                              )}
                            </div>
                          </div>

                          {}
                          <div className="flex-shrink-0 flex items-center gap-1 text-xs font-body font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Enquire <FiArrowRight size={12} />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {}
            {!isLoading && services.length > 0 && (
              <div className="px-5 py-3 border-t border-border dark:border-border-dark">
                <p className="text-[11px] text-muted dark:text-muted-dark font-body text-center">
                  Tap a service to send your enquiry directly to this provider
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {enquiryService && (
        <EnquiryFormModal
          isOpen={true}
          onClose={() => {
            setEnquiryService(null);
            onClose();
          }}
          serviceId={enquiryService._id}
          serviceName={enquiryService.name}
          providerId={providerId}           />
      )}
    </>
  );
}