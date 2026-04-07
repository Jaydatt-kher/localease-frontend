export function DashboardHeader({ firstName, profile, isNewProvider }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-sm text-muted dark:text-muted-dark font-body mt-1">
              {isNewProvider
                ? "Let us set up your profile to start receiving bookings."
                : "Here is a summary of your provider activity."}
            </p>
          </div>
          {profile ? (
            <div
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold font-body ${profile.isActive ? "border-accent bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400" : "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"}`}
            >
              <span className={`w-2 h-2 rounded-full ${profile.isActive ? "bg-accent animate-pulse" : "bg-amber-500"}`} />
              {profile.isActive ? "Online" : "Offline"}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
