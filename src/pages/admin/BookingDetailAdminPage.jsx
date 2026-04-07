import { useNavigate, useParams } from "react-router-dom";
import { useGetAdminBookingByIdQuery } from "../../api/adminApi";
import { BookingDetailErrorState } from "./components/bookingDetail/BookingDetailErrorState";
import { BookingDetailHeader } from "./components/bookingDetail/BookingDetailHeader";
import { BookingDetailLoadingState } from "./components/bookingDetail/BookingDetailLoadingState";
import { BookingDetailMainPanels } from "./components/bookingDetail/BookingDetailMainPanels";
import { BookingDetailSidebarPanels } from "./components/bookingDetail/BookingDetailSidebarPanels";

export default function BookingDetailAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAdminBookingByIdQuery(id);
  const booking = data?.booking;

  if (isError) {
    return <BookingDetailErrorState onBack={() => navigate("/admin/bookings")} />;
  }

  return (
    <div className="space-y-6">
      <BookingDetailHeader
        isLoading={isLoading}
        booking={booking}
        onBack={() => navigate("/admin/bookings")}
      />

      {isLoading ? <BookingDetailLoadingState /> : null}

      {!isLoading && booking ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BookingDetailMainPanels booking={booking} />
          <BookingDetailSidebarPanels
            booking={booking}
            onViewUser={() => navigate(`/admin/users/${booking.user?._id}`)}
            onViewProvider={() => navigate(`/admin/providers/${booking.provider?._id}`)}
          />
        </div>
      ) : null}
    </div>
  );
}
