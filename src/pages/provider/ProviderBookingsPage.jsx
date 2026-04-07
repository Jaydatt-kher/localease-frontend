import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { useGetProviderBookingsQuery } from "../../api/providerApi";
import { BookingCard } from "./components/bookings/BookingCard";
import { BookingDetailPanel } from "./components/bookings/BookingDetailPanel";
import {
  CardSkeleton,
  ErrorState,
  STATUS_CFG,
  STATUS_FILTERS,
} from "./components/bookings/ProviderBookingsShared";

export default function ProviderBookingsPage() {
  const { bookingId: urlBookingId } = useParams();
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedId, setSelectedId] = useState(urlBookingId ?? null);

  useEffect(() => {
    if (urlBookingId) setSelectedId(urlBookingId);
  }, [urlBookingId]);

  const { data: bookings = [], isLoading, isError, refetch, isFetching } =
    useGetProviderBookingsQuery(statusFilter || undefined, { refetchOnMountOrArgChange: true });

  const activeCount = bookings.filter(b => ["confirmed", "in_progress"].includes(b.bookingStatus)).length;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar hideSearch />

      <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <MdOutlineBookmarkAdded size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">
                My Bookings
              </h1>
              <p className="text-sm text-muted dark:text-muted-dark font-body">
                View and manage your confirmed service appointments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {STATUS_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`shrink-0 px-4 py-1.5 rounded-full border text-xs font-body font-semibold transition-all
                  ${statusFilter === value
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}

        {isError && !isLoading && <ErrorState onRetry={refetch} />}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-muted dark:text-muted-dark">
            <div className="w-16 h-16 rounded-2xl bg-background-light dark:bg-surface-alt flex items-center justify-center">
              <MdOutlineBookmarkAdded size={28} className="opacity-30" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">No bookings found</h3>
            <p className="text-sm font-body text-center max-w-xs">
              {statusFilter
                ? `No ${STATUS_CFG[statusFilter]?.label ?? statusFilter} bookings yet.`
                : "When customers confirm your bids, bookings will appear here."}
            </p>
            {statusFilter && (
              <button onClick={() => setStatusFilter("")} className="text-primary text-sm font-semibold font-body hover:underline">
                View all bookings
              </button>
            )}
          </div>
        )}


        {!isLoading && !isError && bookings.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-body text-muted dark:text-muted-dark">
                <span className="font-bold text-foreground dark:text-foreground-dark">{bookings.length}</span> booking{bookings.length !== 1 ? "s" : ""}
                {activeCount > 0 ? ` • ${activeCount} active` : ""}
              </p>
              <button
                onClick={refetch}
                className="flex items-center gap-1.5 text-xs font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors"
              >
                <FiRefreshCw size={12} className={isFetching ? "animate-spin" : ""} />
                {isFetching ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            {[...bookings]
              .sort((a, b) => {
                const priority = { in_progress: 0, confirmed: 1, completed: 2, cancelled: 3 };
                return (priority[a.bookingStatus] ?? 4) - (priority[b.bookingStatus] ?? 4)
                  || new Date(a.scheduledTime) - new Date(b.scheduledTime);
              })
              .map(b => (
                <BookingCard key={b._id} booking={b} onClick={setSelectedId} />
              ))
            }
          </div>
        )}
      </main>

      <Footer />

      {selectedId && (
        <BookingDetailPanel
          bookingId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
