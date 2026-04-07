import { useNavigate } from "react-router-dom";
import { useGetMyBookingsQuery } from "../../api/bookingApi";
import { FiCalendar, FiMapPin, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const STATUS = {
  confirmed:   { label: "Confirmed",   cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",   bar: "bg-primary" },
  in_progress: { label: "In Progress", cls: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300", bar: "bg-amber-500" },
  completed:   { label: "Completed",   cls: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400", bar: "bg-accent" },
  cancelled:   { label: "Cancelled",   cls: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",         bar: "bg-red-500" },
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function BookingCard({ booking, onClick }) {
  const s = STATUS[booking.bookingStatus] || STATUS.confirmed;
  const providerName = booking.provider?.businessName || booking.provider?.userId?.fullName || "Provider";
  const serviceName  = booking.service?.name || "Service";

  return (
    <div onClick={onClick}
      className={`relative bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 pl-5 cursor-pointer
        hover:translate-x-1 hover:shadow-md transition-all border-l-4 ${s.bar.replace("bg-", "border-l-[")}`}
      style={{ borderLeftWidth: "4px", borderLeftColor: s.bar.includes("primary") ? "#1A5EA8" : s.bar.includes("amber") ? "#F59E0B" : s.bar.includes("accent") ? "#4CAF50" : "#EF4444" }}>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-semibold text-muted dark:text-muted-dark">{booking.bookingId || `#${booking._id?.slice(-6)}`}</span>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.cls} font-body`}>{s.label}</span>
      </div>

      <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{serviceName}</p>
      <p className="text-xs text-muted dark:text-muted-dark mb-3 font-body">by {providerName}</p>

      <div className="flex flex-wrap gap-3">
        <span className="flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark font-body">
          <FiCalendar size={12} />{formatDate(booking.scheduledTime)}
        </span>
        {booking.bookingAddress?.text && (
          <span className="flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark max-w-[200px] truncate font-body">
            <FiMapPin size={12} />{booking.bookingAddress.text}
          </span>
        )}
      </div>

      <FiArrowRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
    </div>
  );
}

function BookingSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 pl-5 border-l-4 border-l-border dark:border-l-border-dark">
      <div className="flex justify-between mb-2">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-4 w-40 rounded mb-1.5" />
      <div className="skeleton h-3 w-28 rounded mb-3" />
      <div className="skeleton h-3 w-52 rounded" />
    </div>
  );
}

export default function RecentBookings() {
  const navigate = useNavigate();

  const { data: allBookings = [], isLoading, isError } = useGetMyBookingsQuery();

    const bookings = allBookings
    .filter((b) => ["confirmed", "in_progress"].includes(b.bookingStatus))
    .slice(0, 4);

  if (!isLoading && !isError && bookings.length === 0) return null;

  return (
    <section className="py-10 bg-background-light dark:bg-background-dark border-t border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Your Upcoming Bookings</h2>
            <p className="text-sm text-muted dark:text-muted-dark mt-1 font-body">Active appointments at a glance</p>
          </div>
          <button onClick={() => navigate("/my-bookings")}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors font-body">
            View all <FiArrowRight size={15} />
          </button>
        </div>

        {isError ? (
          <p className="text-center text-sm text-muted dark:text-muted-dark py-6 font-body">Could not load bookings.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <BookingSkeleton key={i} />)
              : bookings.map((b) => (
                  <BookingCard key={b._id} booking={b} onClick={() => navigate(`/my-bookings/${b._id}`)} />
                ))
            }
          </div>
        )}
      </div>
    </section>
  );
}