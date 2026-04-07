import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { fmt } from "./walletShared";

export function WalletHeroCard({ walletBalance, minBalance, isLow, onAddMoney, onWithdraw }) {
  return (
    <div className="bg-gradient-to-br from-primary to-blue-500 dark:from-primary dark:to-blue-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-body opacity-80">Virtual Wallet Balance</p>
          <p className="text-4xl font-display font-extrabold mt-1">{fmt(walletBalance)}</p>
          <p className="text-xs font-body opacity-70 mt-1">
            Min. required: {fmt(minBalance)}
            {isLow ? <span className="ml-2 bg-red-500 px-1.5 py-0.5 rounded-full text-[10px] font-bold">LOW</span> : null}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
          <MdOutlineAccountBalanceWallet size={24} />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          id="add-money-btn"
          onClick={onAddMoney}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all"
        >
          <FiArrowUpRight size={16} /> Add Money
        </button>
        <button
          id="withdraw-btn"
          onClick={onWithdraw}
          disabled={walletBalance <= 0}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all"
        >
          <FiArrowDownLeft size={16} /> Withdraw
        </button>
      </div>
    </div>
  );
}
