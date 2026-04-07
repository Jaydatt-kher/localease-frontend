import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { useGetMyProviderProfileQuery, useGetMyProviderServicesQuery } from "../../api/providerApi";
import { useGetProviderBookingsQuery } from "../../api/bookingApi";
import { useGetAdminSettingsQuery } from "../../api/paymentApi";
import Navbar from "../../components/layout/Navbar";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { NewProviderBanner } from "./components/dashboard/NewProviderBanner";
import { WalletLowAlert } from "./components/dashboard/WalletLowAlert";
import { StatsGrid } from "./components/dashboard/StatsGrid";
import { SetupChecklist } from "./components/dashboard/SetupChecklist";
import { RecentBookingsCard } from "./components/dashboard/RecentBookingsCard";
import { ServicesOverviewCard } from "./components/dashboard/ServicesOverviewCard";
import { ProfileSummaryCard } from "./components/dashboard/ProfileSummaryCard";
import { QuickActionsCard } from "./components/dashboard/QuickActionsCard";
import { VerificationNotice } from "./components/dashboard/VerificationNotice";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data: profile, isLoading: profileLoading } = useGetMyProviderProfileQuery();
  const { data: myServices = [], isLoading: servicesLoading } = useGetMyProviderServicesQuery();
  const { data: bookings = [], isLoading: bookingsLoading } = useGetProviderBookingsQuery();
  const { data: settings = {} } = useGetAdminSettingsQuery();

  const isNewProvider = !servicesLoading && myServices.length === 0;
  const activeBookings = bookings.filter((booking) => ["confirmed", "in_progress"].includes(booking.bookingStatus));
  const completedJobs = profile?.completedJobs ?? 0;
  const walletBalance = profile?.walletBalance ?? 0;
  const avgRating = profile?.rating?.average ?? 0;
  const activeServices = myServices.filter((service) => service.isAvailable).length;
  const firstName = user?.fullName?.split(" ")[0] || "there";
  const minBalance = settings.minWalletBalance ?? 100;
  const isWalletLow = !!profile && walletBalance < minBalance;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar hideSearch title="Provider Dashboard" />

      <DashboardHeader firstName={firstName} profile={profile} isNewProvider={isNewProvider} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isNewProvider && !servicesLoading ? (
          <NewProviderBanner onAddService={() => navigate("/provider/services")} />
        ) : null}

        {isWalletLow ? (
          <WalletLowAlert
            walletBalance={walletBalance}
            minBalance={minBalance}
            onAddMoney={() => navigate("/provider/earnings")}
          />
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid
              servicesLoading={servicesLoading}
              profileLoading={profileLoading}
              myServices={myServices}
              activeServices={activeServices}
              completedJobs={completedJobs}
              avgRating={avgRating}
              walletBalance={walletBalance}
            />

            {(isNewProvider || !profile?.profilePicture || !profile?.payoutSettings?.upiId) ? (
              <SetupChecklist
                profile={profile}
                servicesCount={myServices.length}
                onGoProfile={() => navigate("/provider/profile")}
                onGoServices={() => navigate("/provider/services")}
              />
            ) : null}

            <RecentBookingsCard
              bookingsLoading={bookingsLoading}
              activeBookings={activeBookings}
              myServicesCount={myServices.length}
              onOpenAll={() => navigate("/provider/bookings")}
            />

            <ServicesOverviewCard
              servicesLoading={servicesLoading}
              myServices={myServices}
              activeServices={activeServices}
              onManage={() => navigate("/provider/services")}
              onAddService={() => navigate("/provider/services")}
            />
          </div>

          <div className="space-y-6">
            <ProfileSummaryCard profile={profile} loading={profileLoading} />
            <QuickActionsCard activeBookingsCount={activeBookings.length} walletBalance={walletBalance} />
            <VerificationNotice profile={profile} onGoProfile={() => navigate("/provider/profile")} />
          </div>
        </div>
      </main>
    </div>
  );
}
