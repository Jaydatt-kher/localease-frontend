import { FiSend, FiUsers } from "react-icons/fi";

export function MassEnquiryBanner({ svcLoading, service, openMassEnquiry }) {
  if (svcLoading || !service) {
    return null;
  }

  return (
    <div className="border-b border-border dark:border-border-dark bg-linear-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <FiUsers size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Not sure which provider to pick?</p>
            <p className="text-xs text-muted dark:text-muted-dark font-body">
              Send your request to <span className="font-semibold text-primary">all nearby {service.name} providers</span> at once and compare quotes.
            </p>
          </div>
        </div>
        <button
          onClick={openMassEnquiry}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
        >
          <FiSend size={14} /> Request All Providers
        </button>
      </div>
    </div>
  );
}
