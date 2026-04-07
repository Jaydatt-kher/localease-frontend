import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck, FiX } from "react-icons/fi";
import { useCancelProviderBookingMutation } from "../../../../api/bookingApi";

export function ProviderCancelForm({ bookingId, onSuccess }) {
  const [reason, setReason] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cancelBooking, { isLoading }] = useCancelProviderBookingMutation();

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await cancelBooking({ id: bookingId, reason }).unwrap();
      toast.success("Booking cancelled. Customer has been notified.");
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to cancel booking.");
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 dark:border-red-800/50 text-xs font-body font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full justify-center"
      >
        <FiX size={13} /> Cancel This Booking
      </button>
    );
  }

  return (
    <form onSubmit={handleCancel} className="space-y-3">
      <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark">Cancel Booking</p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        maxLength={200}
        placeholder="Reason for cancellation (optional - but recommended)"
        className="w-full px-3 py-2 text-xs rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary resize-none font-body transition-colors"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 text-white text-xs font-body font-bold rounded-xl hover:bg-red-600 disabled:opacity-60 transition-colors"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters size={12} className="animate-spin" /> Cancelling...
            </>
          ) : (
            <>
              <FiCheck size={12} /> Confirm Cancel
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 py-2 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
        >
          Keep
        </button>
      </div>
    </form>
  );
}
