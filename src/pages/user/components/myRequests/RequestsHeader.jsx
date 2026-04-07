import { TABS } from "./myRequestsShared";

export default function RequestsHeader({ activeTab, setActiveTab, counts }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">
          My Service Requests
        </h1>
        <p className="text-sm text-muted dark:text-muted-dark font-body mt-1">
          View all your enquiries and accept provider bids to book a service.
        </p>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const count = counts[tab.value] ?? 0;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors ${
                  isActive
                    ? "bg-primary border-primary text-white"
                    : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center ${
                      isActive
                        ? "bg-white/20 text-white"
                        : tab.value === "open"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : tab.value === "booked"
                            ? "bg-accent-light dark:bg-accent/10 text-accent-hover"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
