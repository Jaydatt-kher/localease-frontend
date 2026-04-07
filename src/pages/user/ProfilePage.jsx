import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { selectIsProvider } from "../../redux/authSlice";
import { useGetMyProfileQuery } from "../../api/userApi";
import { TABS } from "./components/profile/ProfileShared";
import { OverviewTab } from "./components/profile/OverviewTab";
import { EditTab } from "./components/profile/EditTab";
import { SecurityTab } from "./components/profile/SecurityTab";
import { PaymentsTab } from "./components/profile/PaymentsTab";
import { DangerTab } from "./components/profile/DangerTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const isProvider = useSelector(selectIsProvider);

  const { data: profile, isLoading, isError, refetch } = useGetMyProfileQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar hideSearch={isProvider} />
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-4">
          <div className="skeleton h-40 rounded-2xl" />
          <div className="skeleton h-12 rounded-2xl" />
          <div className="skeleton h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <Navbar hideSearch={isProvider} />
        <p className="text-muted dark:text-muted-dark font-body">Could not load profile. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar hideSearch={isProvider} />

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 mb-6 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-semibold whitespace-nowrap transition-all shrink-0 ${activeTab === tab.id ? "bg-primary text-white shadow-sm" : "text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" ? <OverviewTab profile={profile} onTabChange={setActiveTab} /> : null}
        {activeTab === "edit" ? <EditTab profile={profile} refetch={refetch} /> : null}
        {activeTab === "security" ? <SecurityTab profile={profile} /> : null}
        {activeTab === "payments" ? <PaymentsTab /> : null}
        {activeTab === "danger" ? <DangerTab /> : null}
      </div>

      <Footer />
    </div>
  );
}
