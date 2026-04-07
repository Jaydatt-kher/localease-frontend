import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAdminBookingStatsQuery,
  useGetAdminBookingsQuery,
} from "../../api/adminApi";
import { BookingsFilters } from "./components/bookings/BookingsFilters";
import { BookingsHeader } from "./components/bookings/BookingsHeader";
import { BookingsKpiGrid } from "./components/bookings/BookingsKpiGrid";
import { BookingsPagination } from "./components/bookings/BookingsPagination";
import { BookingsTable } from "./components/bookings/BookingsTable";

const ITEMS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function BookingsAdminPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data: statsData } = useGetAdminBookingStatsQuery();
  const { data: bookingsData, isLoading, isFetching } = useGetAdminBookingsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
  });

  const currentBookings = bookingsData?.bookings || [];
  const totalBookingsList = bookingsData?.total || 0;
  const totalPages = bookingsData?.pages || 0;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalBookingsList);

  const totalBookingsCount = statsData?.total || 0;
  const activeBookings = statsData?.active || 0;
  const completedBookings = statsData?.completed || 0;
  const cancelledBookings = statsData?.cancelled || 0;

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i += 1
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    return [1, ...range, totalPages];
  })();

  return (
    <div className="space-y-6">
      <BookingsHeader />

      <BookingsKpiGrid
        totalBookingsCount={totalBookingsCount}
        activeBookings={activeBookings}
        completedBookings={completedBookings}
        cancelledBookings={cancelledBookings}
      />

      <BookingsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
        isFetching={isFetching}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <BookingsTable
          currentBookings={currentBookings}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          onViewBooking={(bookingId) => navigate(`/admin/bookings/${bookingId}`)}
        />

        <BookingsPagination
          totalPages={totalPages}
          currentPage={currentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalBookingsList={totalBookingsList}
          pageNumbers={pageNumbers}
          onPrev={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          onNext={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
          onPageSelect={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
