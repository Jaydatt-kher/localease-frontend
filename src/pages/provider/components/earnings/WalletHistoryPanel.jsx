import { FiArrowDownLeft, FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { PURPOSE_COLOR, PURPOSE_LABEL, Sk } from "./walletShared";

export function WalletHistoryPanel({ walletData, txLoading, refetchTx, txPage, setTxPage, fmt, fmtDt }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Transaction History</h3>
        <button onClick={refetchTx} className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-body font-semibold">
          <FiRefreshCw size={12} /> Refresh
        </button>
      </div>

      {txLoading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Sk className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Sk className="h-4 w-40" />
                <Sk className="h-3 w-24" />
              </div>
              <Sk className="h-5 w-16" />
            </div>
          ))}
        </div>
      ) : walletData.transactions.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-2 text-muted dark:text-muted-dark">
          <MdOutlineAccountBalanceWallet size={32} className="opacity-30" />
          <p className="text-sm font-body">No transactions yet. Add money to get started.</p>
        </div>
      ) : (
        <div className="divide-y divide-border dark:divide-border-dark">
          {walletData.transactions.map((tx) => (
            <div key={tx._id} className="flex items-center gap-4 px-5 py-3.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.transactionType === "credit" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"}`}
              >
                {tx.transactionType === "credit" ? <FiArrowDownLeft size={18} /> : <FiArrowUpRight size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-body text-foreground dark:text-foreground-dark truncate">
                  {tx.description}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PURPOSE_COLOR[tx.purpose] || "text-muted"}`}>
                    {PURPOSE_LABEL[tx.purpose] || tx.purpose}
                  </span>
                  <span className="text-[10px] text-muted dark:text-muted-dark font-body">{fmtDt(tx.createdAt)}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-display font-bold ${tx.transactionType === "credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {tx.transactionType === "credit" ? "+" : "-"}
                  {fmt(tx.amount)}
                </p>
                <p className="text-[10px] text-muted dark:text-muted-dark font-body">Bal: {fmt(tx.closingBalance)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {walletData.pagination?.totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-border dark:border-border-dark">
          <button
            onClick={() => setTxPage((current) => Math.max(1, current - 1))}
            disabled={txPage === 1}
            className="px-3 py-1.5 text-xs font-semibold font-body rounded-lg border border-border dark:border-border-dark disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            ← Prev
          </button>
          <span className="text-xs text-muted dark:text-muted-dark font-body">
            Page {txPage} of {walletData.pagination.totalPages}
          </span>
          <button
            onClick={() => setTxPage((current) => Math.min(walletData.pagination.totalPages, current + 1))}
            disabled={txPage === walletData.pagination.totalPages}
            className="px-3 py-1.5 text-xs font-semibold font-body rounded-lg border border-border dark:border-border-dark disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            Next →
          </button>
        </div>
      ) : null}
    </div>
  );
}
