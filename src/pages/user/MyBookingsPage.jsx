import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useGetMyBookingsQuery } from "../../api/bookingApi";
import BookingCard from "./components/myBookings/BookingCard";
import BookingCardSkeleton from "./components/myBookings/BookingCardSkeleton";
import BookingsEmptyState from "./components/myBookings/BookingsEmptyState";
import BookingsErrorState from "./components/myBookings/BookingsErrorState";
import BookingsHeader from "./components/myBookings/BookingsHeader";
import { STATUS } from "./components/myBookings/myBookingsShared";

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(undefined);
  const [cancellingId, setCancellingId] = useState(null);

  const { data: bookings = [], isLoading, isError, refetch } = useGetMyBookingsQuery(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <BookingsHeader
        activeTab={activeTab}
        onSelectTab={(tabValue) => {
          setActiveTab(tabValue);
          setCancellingId(null);
        }}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-3">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <BookingCardSkeleton key={i} />)}

        {isError && <BookingsErrorState onRetry={refetch} />}

        {!isLoading && !isError && bookings.length === 0 && (
          <BookingsEmptyState
            activeTab={activeTab}
            activeLabel={STATUS[activeTab]?.label}
            onViewRequests={() => navigate("/my-requests")}
          />
        )}

        {bookings.map((b) => (
          <BookingCard
            key={b._id}
            b={b}
            isShowingCancel={cancellingId === b._id}
            onOpenDetail={(bookingId) => navigate(`/my-bookings/${bookingId}`)}
            onShowCancel={setCancellingId}
            onHideCancel={() => setCancellingId(null)}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}