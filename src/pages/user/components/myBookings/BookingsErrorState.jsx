import { FiAlertCircle } from "react-icons/fi";

export default function BookingsErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center py-16 gap-3 text-muted dark:text-muted-dark">
      <FiAlertCircle size={36} className="text-red-400" />
      <p className="font-body text-sm">Failed to load bookings.</p>
      <button onClick={onRetry} className="text-primary text-sm font-semibold font-body hover:underline">
        Try again
      </button>
    </div>
  );
}
