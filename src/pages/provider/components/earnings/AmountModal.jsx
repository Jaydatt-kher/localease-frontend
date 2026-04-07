import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { fmt } from "./walletShared";

export function AmountModal({ title, subtitle, btnLabel, btnColor = "bg-primary hover:bg-primary-hover", onConfirm, onClose, maxAmount }) {
  const [amount, setAmount] = useState("");

  const submit = () => {
    const n = Number(amount);
    if (!n || n <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (maxAmount != null && n > maxAmount) {
      toast.error(`Maximum allowed: ${fmt(maxAmount)}`);
      return;
    }
    onConfirm(n);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground dark:text-muted-dark dark:hover:text-foreground-dark transition-colors">
            <FiX size={18} />
          </button>
        </div>
        <p className="text-sm text-muted dark:text-muted-dark font-body mb-4">{subtitle}</p>

        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark font-body text-sm">₹</span>
          <input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full pl-7 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border dark:border-border-dark rounded-xl font-body text-sm text-foreground dark:text-foreground-dark focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border dark:border-border-dark text-sm font-semibold font-body text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button onClick={submit} className={`flex-1 py-2.5 rounded-xl text-sm font-bold font-body text-white transition-all ${btnColor}`}>
            {btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
