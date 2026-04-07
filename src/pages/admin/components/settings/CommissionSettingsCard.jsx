import { Banknote, DollarSign, Loader2, Wallet } from "lucide-react";

export function CommissionSettingsCard({
  commission,
  onCommissionChange,
  minWalletBalance,
  onMinWalletBalanceChange,
  cashOnServiceThreshold,
  onCashOnServiceThresholdChange,
  isUpdating,
  onSave,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <DollarSign className="w-5 h-5 text-accent-hover dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground dark:text-foreground-dark">
            Commission & Pricing
          </h3>
          <p className="text-sm font-body text-muted dark:text-muted-dark">
            Set commission rates and wallet policies for providers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label htmlFor="commission" className="block text-sm font-body font-medium text-foreground dark:text-foreground-dark">
            Platform Commission:{" "}
            <span className="font-bold text-primary dark:text-blue-400">{commission}%</span>
          </label>
          <div className="max-w-md">
            <input
              id="commission"
              type="range"
              min="0"
              max="30"
              step="1"
              value={commission}
              onChange={(e) => onCommissionChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-border dark:bg-border-dark rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
          </div>
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            Percentage charged per completed booking
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/30 rounded-xl p-4 max-w-md">
            <p className="text-sm font-body text-indigo-800 dark:text-indigo-300 leading-relaxed">
              <span className="font-bold">Example:</span> For a ₹1,000 booking, platform earns{" "}
              <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                ₹{(1000 * commission) / 100}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="min-wallet" className="flex items-center gap-2 text-sm font-body font-medium text-foreground dark:text-foreground-dark">
              <Wallet className="w-4 h-4 text-muted dark:text-muted-dark" />
              Minimum Wallet Balance (₹)
            </label>
            <input
              id="min-wallet"
              type="number"
              min="0"
              value={minWalletBalance}
              onChange={(e) => onMinWalletBalanceChange(e.target.value)}
              className="max-w-xs w-full px-3 py-2 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <p className="text-xs font-body text-muted dark:text-muted-dark">
              Providers need this minimum balance to accept Cash on Service bookings.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="cos-threshold" className="flex items-center gap-2 text-sm font-body font-medium text-foreground dark:text-foreground-dark">
              <Banknote className="w-4 h-4 text-muted dark:text-muted-dark" />
              Max Cash-on-Service Limit (₹)
            </label>
            <input
              id="cos-threshold"
              type="number"
              min="0"
              value={cashOnServiceThreshold}
              onChange={(e) => onCashOnServiceThresholdChange(e.target.value)}
              className="max-w-xs w-full px-3 py-2 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Limit"
            />
            <p className="text-xs font-body text-muted dark:text-muted-dark">
              Bookings strictly require online payment if above this amount.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border dark:border-border-dark">
        <button
          onClick={onSave}
          disabled={isUpdating}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-body font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save Commission Settings
        </button>
      </div>
    </div>
  );
}
