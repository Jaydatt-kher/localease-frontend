export default function BookingsEmptyState({ activeTab, activeLabel, onViewRequests }) {
  return (
    <div className="flex flex-col items-center py-20 gap-4 text-muted dark:text-muted-dark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-30"
      >
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
      <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">
        No bookings found
      </h3>
      <p className="text-sm font-body text-center max-w-xs">
        {activeTab
          ? `No ${activeLabel?.toLowerCase() ?? activeTab} bookings yet.`
          : "Accept a provider's bid from My Requests to create a booking."}
      </p>
      <button
        onClick={onViewRequests}
        className="px-5 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover transition-colors"
      >
        View My Requests
      </button>
    </div>
  );
}
