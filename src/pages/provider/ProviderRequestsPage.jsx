import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useGetNewRequestsQuery } from "../../api/providerApi";
import { MdOutlineNewReleases, MdOutlineWorkHistory } from "react-icons/md";
import { NewRequestsTab } from "./components/requests/NewRequestsTab";
import { BidHistoryTab } from "./components/requests/BidHistoryTab";

const TABS = [
  { id: "new", label: "New Requests", icon: <MdOutlineNewReleases size={17} /> },
  { id: "history", label: "Bid History", icon: <MdOutlineWorkHistory size={17} /> },
];

export default function ProviderRequestsPage() {
  const [activeTab, setActiveTab] = useState("new");
  const { data: newRequests = [] } = useGetNewRequestsQuery(undefined, { pollingInterval: 30000 });
  const pendingCount = newRequests.length;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <MdOutlineNewReleases size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark flex items-center gap-2">
                Service Requests
                {pendingCount > 0 ? (
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-body">
                    {pendingCount} new
                  </span>
                ) : null}
              </h1>
              <p className="text-sm text-muted dark:text-muted-dark font-body">
                Review customer enquiries and submit your bids.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-5 bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-2xl p-1.5 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-body font-semibold transition-all relative ${activeTab === tab.id ? "bg-primary text-white shadow-sm" : "text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"}`}
              >
                {tab.icon}
                {tab.label}
                {tab.id === "new" && pendingCount > 0 && activeTab !== "new" ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                    {pendingCount > 9 ? "9+" : pendingCount}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "new" ? <NewRequestsTab /> : null}
        {activeTab === "history" ? <BidHistoryTab /> : null}
      </main>

      <Footer />
    </div>
  );
}
