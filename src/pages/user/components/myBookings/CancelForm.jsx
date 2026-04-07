import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { useCancelBookingMutation } from "../../../../api/bookingApi";

export default function CancelForm({ bookingId, onClose }) {
  const [reason, setReason] = useState("");
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();

  const handleCancel = async (e) => {
    e.stopPropagation();
    try {
      await cancelBooking({ id: bookingId, reason }).unwrap();
      toast.success("Booking cancelled successfully.");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to cancel booking.");
    }
  };

  return (
    <div
      className="mt-3 pt-3 border-t border-border dark:border-border-dark space-y-2"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark">Cancel Booking</p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        maxLength={200}
        placeholder="Reason for cancellation (optional)"
        className="w-full px-3 py-2 text-xs rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary resize-none font-body transition-colors"
      />
      <div className="flex gap-2">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-xs font-body font-bold rounded-xl hover:bg-red-600 disabled:opacity-60 transition-colors"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters size={12} className="animate-spin" /> Cancelling…
            </>
          ) : (
            <>
              <FiCheck size={12} /> Confirm Cancel
            </>
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="px-4 py-2 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
        >
          Keep Booking
        </button>
      </div>
    </div>
  );
}
