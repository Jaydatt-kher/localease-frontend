import { Globe, Loader2 } from "lucide-react";

export function PlatformSettingsCard({
  platformName,
  onPlatformNameChange,
  currency,
  onCurrencyChange,
  timeFormat,
  onTimeFormatChange,
  isUpdating,
  onSave,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground dark:text-foreground-dark">
            Platform Settings
          </h3>
          <p className="text-sm font-body text-muted dark:text-muted-dark">
            Configure basic platform settings and preferences
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="platform-name" className="block text-sm font-body font-medium text-foreground dark:text-foreground-dark">
            Platform Name
          </label>
          <input
            id="platform-name"
            type="text"
            value={platformName}
            onChange={(e) => onPlatformNameChange(e.target.value)}
            className="max-w-md w-full px-3 py-2 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="Enter platform name"
          />
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            This name will appear across the platform
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="currency" className="block text-sm font-body font-medium text-foreground dark:text-foreground-dark">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="max-w-md w-full px-3 py-2 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer transition-colors"
          >
            <option value="INR">₹ INR - Indian Rupee</option>
            <option value="USD">$ USD - US Dollar</option>
            <option value="EUR">€ EUR - Euro</option>
            <option value="GBP">£ GBP - British Pound</option>
          </select>
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            Default currency for all transactions
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="time-format" className="block text-sm font-body font-medium text-foreground dark:text-foreground-dark">
            Time Format
          </label>
          <select
            id="time-format"
            value={timeFormat}
            onChange={(e) => onTimeFormatChange(e.target.value)}
            className="max-w-md w-full px-3 py-2 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer transition-colors"
          >
            <option value="12-hour">12-hour (AM/PM)</option>
            <option value="24-hour">24-hour</option>
          </select>
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            Display format for time across the platform
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border dark:border-border-dark">
        <button
          onClick={onSave}
          disabled={isUpdating}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-body font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save Platform Settings
        </button>
      </div>
    </div>
  );
}
