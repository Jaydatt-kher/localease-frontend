import { FiAlertTriangle } from "react-icons/fi";
import { fmt } from "./walletShared";

export function WalletLowAlert({ walletBalance, minBalance, onAddMoney }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl">
      <FiAlertTriangle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-display font-bold text-red-700 dark:text-red-300">Wallet Below Minimum Balance</p>
        <p className="text-xs font-body text-red-600 dark:text-red-400 mt-0.5">
          Your balance ({fmt(walletBalance)}) is below the required minimum of <strong>{fmt(minBalance)}</strong>. You will not receive new service requests until you recharge.
        </p>
      </div>
      <button
        onClick={onAddMoney}
        className="shrink-0 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors"
      >
        Add Money
      </button>
    </div>
  );
}
