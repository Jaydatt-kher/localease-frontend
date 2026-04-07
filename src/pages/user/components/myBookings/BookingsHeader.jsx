import { TABS } from "./myBookingsShared";

export default function BookingsHeader({ activeTab, onSelectTab }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">
          My Bookings
        </h1>
        <p className="text-sm text-muted dark:text-muted-dark font-body mt-1">
          Track all your service appointments.
        </p>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={String(tab.value)}
              onClick={() => onSelectTab(tab.value)}
              className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-body font-semibold transition-colors ${
                activeTab === tab.value
                  ? "bg-primary border-primary text-white"
                  : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
