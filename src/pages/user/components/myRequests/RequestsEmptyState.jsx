import { FiInbox } from "react-icons/fi";

export default function RequestsEmptyState({ activeTab, onBrowseServices }) {
  return (
    <div className="flex flex-col items-center py-20 gap-4 text-muted dark:text-muted-dark">
      <FiInbox size={48} className="opacity-30" />
      <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">
        {activeTab === "all" ? "No requests yet" : `No ${activeTab} requests`}
      </h3>
      <p className="text-sm font-body text-center max-w-xs">
        {activeTab === "all"
          ? "Send an enquiry from the services page and providers will respond with their bids."
          : `You don't have any ${activeTab} requests right now.`}
      </p>
      {activeTab === "all" && (
        <button
          onClick={onBrowseServices}
          className="px-5 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover transition-colors"
        >
          Browse Services
        </button>
      )}
    </div>
  );
}
