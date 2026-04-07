import { AlertCircle, MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";

function BookingDropdown({ booking, isOpen, onToggle, onClose, onViewDetails }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          <button
            onClick={() => {
              onClose();
              onViewDetails();
            }}
            className="w-full text-left px-4 py-2 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            View Details
          </button>
          {booking.status === "accepted" || booking.status === "pending" ? (
            <>
              <button className="w-full text-left px-4 py-2 text-sm font-body text-accent-hover dark:text-green-400 hover:bg-accent-light dark:hover:bg-accent/10 transition-colors border-t border-border dark:border-border-dark">
                Mark as Completed
              </button>
              <button className="w-full text-left px-4 py-2 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Cancel Booking
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function BookingStatusBadge({ status }) {
  switch (status) {
    case "accepted":
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Active
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-hover" /> Completed
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-red-50 dark:bg-red-900/20 text-danger dark:text-red-400">
          <span className="w-1.5 h-1.5 rounded-full bg-danger" /> Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" /> {status}
        </span>
      );
  }
}

export function formatBookingDateTime(dateString, timeString = null) {
  if (!dateString) {
    return "N/A";
  }

  const dateObj = new Date(dateString);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const displayTime =
    timeString ||
    dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${formattedDate} • ${displayTime}`;
}

export function formatBookingPrice(finalPrice, price) {
  const displayPrice = finalPrice !== null ? finalPrice : price;
  if (displayPrice === null || displayPrice === undefined) {
    return "N/A";
  }
  return `₹${displayPrice.toFixed(0)}`;
}

const TABLE_HEADS = ["Booking ID", "User", "Provider", "Service", "Date & Time", "Price", "Status", "Actions"];

export function BookingsTable({
  currentBookings,
  openDropdown,
  setOpenDropdown,
  onViewBooking,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {TABLE_HEADS.map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {currentBookings.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">No bookings found.</p>
                </div>
              </td>
            </tr>
          ) : (
            currentBookings.map((booking) => (
              <tr
                key={booking.id}
                className="group hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
              >
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <button
                    onClick={() => onViewBooking(booking.id)}
                    className="text-sm font-body font-semibold text-primary dark:text-blue-400 hover:underline"
                  >
                    {booking.id}
                  </button>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {booking.user}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {booking.provider}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {booking.service}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">
                    {formatBookingDateTime(booking.scheduledTime)}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {formatBookingPrice(booking.finalPrice, booking.price)}
                  </span>
                  {booking.finalPrice !== null && booking.finalPrice < booking.price && booking.price > 0 ? (
                    <span className="text-xs font-body text-muted dark:text-muted-dark line-through ml-1.5">
                      ₹{booking.price?.toFixed(0)}
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-right">
                  <BookingDropdown
                    booking={booking}
                    isOpen={openDropdown === booking.id}
                    onToggle={() => setOpenDropdown(openDropdown === booking.id ? null : booking.id)}
                    onClose={() => setOpenDropdown(null)}
                    onViewDetails={() => onViewBooking(booking.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
