import { FiPhone } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function ProviderCard({ provider, providerName, onOpenProfile }) {
  if (!provider) return null;

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <h2 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-4">Provider</h2>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary border-2 border-primary/20 shrink-0">
          {provider.profilePicture ? (
            <img
              src={provider.profilePicture}
              alt={providerName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            providerName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {providerName}
            </p>
            {provider.isVerified && <HiCheckBadge size={14} className="text-accent shrink-0" />}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.floor(provider.rating?.average ?? 0) ? (
                <IoStar key={i} size={11} className="text-yellow-400" />
              ) : (
                <IoStarOutline key={i} size={11} className="text-yellow-300 dark:text-yellow-600" />
              )
            )}
            <span className="text-xs text-muted dark:text-muted-dark font-body ml-0.5">
              {(provider.rating?.average ?? 0) > 0 ? provider.rating.average.toFixed(1) : "New"}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="shrink-0 text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Profile →
        </button>
      </div>

      {provider.userId?.mobileNo && (
        <a
          href={`tel:${provider.userId.mobileNo}`}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark text-sm font-body font-semibold text-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-colors"
        >
          <FiPhone size={14} /> {provider.userId.mobileNo}
        </a>
      )}
    </div>
  );
}
