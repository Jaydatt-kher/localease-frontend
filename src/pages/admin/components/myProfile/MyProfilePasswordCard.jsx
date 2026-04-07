import { Loader2, Lock } from "lucide-react";

function PasswordInput({ id, value, onChange }) {
  return (
    <div className="relative">
      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted dark:text-muted-dark" />
      <input
        id={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );
}

export function MyProfilePasswordCard({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onUpdatePassword,
  updatingPassword,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-border-dark flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
              Change Password
            </h3>
            <p className="text-[13px] font-body text-muted dark:text-muted-dark mt-0.5">
              Ensure your account stays secure
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label htmlFor="current-password" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            Current Password
          </label>
          <PasswordInput id="current-password" value={currentPassword} onChange={onCurrentPasswordChange} />
        </div>

        <div>
          <label htmlFor="new-password" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            New Password
          </label>
          <PasswordInput id="new-password" value={newPassword} onChange={onNewPasswordChange} />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            Confirm New Password
          </label>
          <PasswordInput id="confirm-password" value={confirmPassword} onChange={onConfirmPasswordChange} />
        </div>

        <div className="pt-2">
          <button
            onClick={onUpdatePassword}
            disabled={updatingPassword}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground dark:bg-surface-alt text-surface-light dark:text-foreground-dark text-sm font-body font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 border border-transparent dark:border-border-dark transition-colors disabled:opacity-50"
          >
            {updatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
