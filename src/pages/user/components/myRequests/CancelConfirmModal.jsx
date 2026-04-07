import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiX } from "react-icons/fi";

export default function CancelConfirmModal({ enquiryName, onConfirm, onClose, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-sm bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
          <FiX size={22} className="text-red-500" />
        </div>

        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark text-center mb-1">
          Cancel Request?
        </h3>
        <p className="text-sm text-muted dark:text-muted-dark font-body text-center leading-relaxed mb-6">
          Are you sure you want to cancel your request for{" "}
          <span className="font-semibold text-foreground dark:text-foreground-dark">{enquiryName}</span>
          ? All pending bids will be rejected and this cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-body font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? <AiOutlineLoading3Quarters size={15} className="animate-spin" /> : <FiX size={14} />}
            {isLoading ? "Cancelling…" : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
