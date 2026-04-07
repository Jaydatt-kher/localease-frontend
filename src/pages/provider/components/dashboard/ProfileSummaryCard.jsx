import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiCalendar, FiMapPin, FiSettings } from "react-icons/fi";
import { MdOutlineRadar, MdOutlineWorkHistory } from "react-icons/md";
import { HiCheckBadge } from "react-icons/hi2";
import { RatingStars } from "./RatingStars";
import { formatDate, Skeleton } from "./dashboardShared";

export function ProfileSummaryCard({ profile, loading }) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="h-20 bg-linear-to-r from-primary to-blue-400 dark:from-primary dark:to-blue-700" />

      <div className="px-5 pb-5">
        <div className="flex items-start justify-between">
          <div className="-mt-8 w-16 h-16 rounded-2xl border-4 border-surface-light dark:border-surface-dark overflow-hidden bg-primary-light dark:bg-border-dark flex items-center justify-center shrink-0">
            {loading ? (
              <Skeleton className="w-full h-full rounded-none" />
            ) : profile?.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-display font-extrabold text-primary">
                {profile?.businessName?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate("/provider/profile")}
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border dark:border-border-dark text-xs font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors font-body shrink-0"
          >
            <FiSettings size={12} /> Edit
          </button>
        </div>

        <div className="mt-3 mb-3">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark leading-tight">
                  {profile?.businessName || "-"}
                </h3>
                {profile?.isVerified ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
                    <HiCheckBadge size={12} /> Verified
                  </span>
                ) : profile ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-body">
                    <FiAlertCircle size={11} /> Pending
                  </span>
                ) : null}
              </div>
              <RatingStars value={profile?.rating?.average} count={profile?.rating?.count} />
            </>
          )}
        </div>

        {!loading ? (
          <div className="space-y-1.5 pt-3 border-t border-border dark:border-border-dark">
            {profile?.city?.name ? (
              <div className="flex items-center gap-2 text-xs text-muted dark:text-muted-dark font-body">
                <FiMapPin size={12} className="shrink-0 text-primary" />
                {profile.city.name}{profile.city.state ? `, ${profile.city.state}` : ""}
              </div>
            ) : null}
            {profile?.experienceYears > 0 ? (
              <div className="flex items-center gap-2 text-xs text-muted dark:text-muted-dark font-body">
                <MdOutlineWorkHistory size={12} className="shrink-0 text-primary" />
                {profile.experienceYears} yr{profile.experienceYears !== 1 ? "s" : ""} experience
              </div>
            ) : null}
            {profile?.serviceRadius ? (
              <div className="flex items-center gap-2 text-xs text-muted dark:text-muted-dark font-body">
                <MdOutlineRadar size={12} className="shrink-0 text-primary" />
                Serves within {profile.serviceRadius} km
              </div>
            ) : null}
            {profile?.joinedAt ? (
              <div className="flex items-center gap-2 text-xs text-muted dark:text-muted-dark font-body">
                <FiCalendar size={12} className="shrink-0 text-primary" />
                Member since {formatDate(profile.joinedAt)}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
