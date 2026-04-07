import { FiCalendar, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import StarRow from "./StarRow";
import { fmtDate } from "./providerProfileShared";

export default function ProviderHeroCard({
  provider,
  isVacation,
  initials,
  ratingAvg,
  ratingCount,
  user,
  onEnquiry,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary to-blue-400 dark:from-primary dark:to-blue-700 relative">
        {isVacation && (
          <div className="absolute inset-0 bg-amber-900/60 flex items-center justify-center">
            <span className="text-amber-200 text-sm font-body font-semibold flex items-center gap-2">
              🏖️ Currently on Vacation Mode
            </span>
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="relative z-10 flex items-end justify-between -mt-10 mb-4">
          <div className="w-20 h-20 rounded-2xl border-4 border-surface-light dark:border-surface-dark overflow-hidden bg-primary-light dark:bg-border-dark flex items-center justify-center shrink-0">
            {provider.profilePicture ? (
              <img
                src={provider.profilePicture}
                alt={provider.businessName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-display font-extrabold text-primary">{initials}</span>
            )}
          </div>

          {!isVacation && (
            <button
              onClick={() => onEnquiry(null, provider.businessName)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-body font-bold rounded-2xl hover:bg-primary-hover transition-colors shadow-md text-sm"
            >
              <FiMessageSquare size={15} /> {user ? "Send Enquiry" : "Send Enquiry (Sign In)"}
            </button>
          )}
        </div>

        <div className="flex items-start flex-wrap gap-2 mb-2">
          <h1 className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark leading-tight">
            {provider.businessName}
          </h1>
          {provider.isVerified && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
              <HiCheckBadge size={13} /> Verified
            </span>
          )}
          {provider.isFeatured && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-body">
              ✨ Featured
            </span>
          )}
        </div>

        <StarRow value={ratingAvg} count={ratingCount} size={15} />

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
          {provider.city?.name && (
            <span className="flex items-center gap-1.5 text-sm text-muted dark:text-muted-dark font-body">
              <FiMapPin size={13} className="text-primary" />
              {provider.city.name}
              {provider.city.state ? `, ${provider.city.state}` : ""}
            </span>
          )}
          {provider.userId?.mobileNo && (
            <span className="text-sm text-muted dark:text-muted-dark font-body">
              📞 {provider.userId.mobileNo}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-muted dark:text-muted-dark font-body">
            <FiCalendar size={13} className="text-primary" />
            Member since {fmtDate(provider.joinedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
