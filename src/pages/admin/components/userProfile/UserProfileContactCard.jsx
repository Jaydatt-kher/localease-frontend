import { Calendar, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { fmtDate, InfoRow, UserProfileSkeleton, UserVerificationRows } from "./UserProfileShared";

export function UserProfileContactCard({ isLoading, user }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">
        Contact Information
      </h3>
      <p className="text-xs font-body text-muted dark:text-muted-dark mb-4">Account details at a glance</p>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <UserProfileSkeleton className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <UserProfileSkeleton className="h-2.5 w-16" />
                <UserProfileSkeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <InfoRow icon={Mail} label="Email" value={user?.email} />
          <InfoRow icon={Phone} label="Phone" value={user?.mobileNo || "Not provided"} />
          <InfoRow icon={MapPin} label="Address" value={user?.address || "Not provided"} />
          <InfoRow
            icon={Calendar}
            label="Member Since"
            value={fmtDate(user?.createdAt, { day: "numeric", month: "long", year: "numeric" })}
          />
          <UserVerificationRows user={user} />
        </div>
      )}
    </div>
  );
}
