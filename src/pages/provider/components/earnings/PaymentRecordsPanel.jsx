import { FiCheckCircle, FiClock, FiDownload, FiRefreshCw } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { Sk } from "./walletShared";

export function PaymentRecordsPanel({ payments, pmtLoading, refetchPmt, fmt, fmtDt }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Payment Records</h3>
        <button onClick={refetchPmt} className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-body font-semibold">
          <FiRefreshCw size={12} /> Refresh
        </button>
      </div>

      {pmtLoading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map((i) => <Sk key={i} className="h-14 w-full" />)}
        </div>
      ) : payments.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-2 text-muted dark:text-muted-dark">
          <TbCurrencyRupee size={32} className="opacity-30" />
          <p className="text-sm font-body">No payments yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-border dark:divide-border-dark">
          {payments.map((payment) => (
            <div key={payment._id} className="flex items-center gap-4 px-5 py-3.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${payment.paymentStatus === "completed" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"}`}
              >
                {payment.paymentStatus === "completed" ? <FiCheckCircle size={18} /> : <FiClock size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-body text-foreground dark:text-foreground-dark truncate">
                  {payment.booking?.service?.name || "Service Booking"}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-body text-muted dark:text-muted-dark capitalize">
                    via {payment.paymentMethod?.replace("_", " ")}
                  </span>
                  <span className="text-[10px] text-muted dark:text-muted-dark font-body">· {fmtDt(payment.createdAt)}</span>
                </div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <p className="text-sm font-display font-bold text-green-600 dark:text-green-400">+{fmt(payment.providerEarning)}</p>
                <a
                  href={`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/payments/${payment._id}/receipt`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] text-primary hover:text-primary-hover font-body font-semibold"
                >
                  <FiDownload size={11} /> Receipt
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
