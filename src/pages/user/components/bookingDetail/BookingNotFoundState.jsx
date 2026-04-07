import { FiAlertCircle } from "react-icons/fi";

export default function BookingNotFoundState({ onBack }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
      <FiAlertCircle size={40} className="text-muted dark:text-muted-dark opacity-30" />
      <p className="font-body text-sm text-muted dark:text-muted-dark">Booking not found.</p>
      <button
        onClick={onBack}
        className="text-primary text-sm font-semibold font-body hover:underline"
      >
        ← My Bookings
      </button>
    </main>
  );
}
