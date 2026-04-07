import { AlertCircle, ArrowLeft } from "lucide-react";

export function BookingDetailErrorState({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-muted dark:text-muted-dark">
      <AlertCircle className="w-12 h-12 opacity-30" />
      <p className="text-lg font-display font-semibold text-foreground dark:text-foreground-dark">Booking not found</p>
      <p className="text-sm font-body">The booking ID may be invalid or the record was deleted.</p>
      <button
        onClick={onBack}
        className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-body font-semibold hover:bg-primary-hover transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Bookings
      </button>
    </div>
  );
}
