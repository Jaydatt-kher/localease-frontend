import { FiCheckCircle, FiDownload } from "react-icons/fi";

export default function PaymentSuccessCard({ serviceName, onDownload }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 text-center mb-6">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
        <FiCheckCircle size={32} />
      </div>
      <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark mb-2">
        Payment Successful!
      </h1>
      <p className="text-sm font-body text-muted dark:text-muted-dark mb-6">
        Your booking <strong>{serviceName}</strong> has been successfully completed.
      </p>

      <button
        onClick={onDownload}
        className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-light/50 dark:bg-primary/20 text-primary font-bold text-sm rounded-xl hover:bg-primary-light dark:hover:bg-primary/30 transition-colors mx-auto"
      >
        <FiDownload size={16} /> Download Invoice PDF
      </button>
    </div>
  );
}
