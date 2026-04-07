import { Briefcase, Calendar, CheckCircle, FileText, Mail, MapPin, Phone } from "lucide-react";
import { fmtDate, InfoRow, Skeleton } from "./ProviderProfilePrimitives";

export function ProviderSidebarPanels({ isLoading, provider, docs }) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Business Information</h3>
        <p className="text-xs font-body text-muted dark:text-muted-dark mb-4">Contact and account details</p>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex gap-3">
                <Skeleton className="w-8 h-8 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <InfoRow icon={Mail} label="Email" value={provider?.userId?.email} />
            <InfoRow icon={Phone} label="Phone" value={provider?.userId?.mobileNo || "Not provided"} />
            <InfoRow icon={MapPin} label="City" value={provider?.city?.name || "Not provided"} />
            <InfoRow
              icon={Briefcase}
              label="Experience"
              value={provider?.experienceYears ? `${provider.experienceYears} years` : "Not provided"}
            />
            <InfoRow
              icon={MapPin}
              label="Service Radius"
              value={provider?.serviceRadius ? `${provider.serviceRadius} km` : "-"}
            />
            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={fmtDate(provider?.joinedAt ?? provider?.createdAt, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <InfoRow
              icon={CheckCircle}
              label="Verification"
              value={provider?.isVerified ? "Verified" : "Pending verification"}
            />
          </div>
        )}
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Submitted Documents</h3>
        <p className="text-xs font-body text-muted dark:text-muted-dark mb-4">
          {isLoading ? "" : `${docs.length} document${docs.length !== 1 ? "s" : ""}`}
        </p>

        {isLoading ? (
          <Skeleton className="h-12" />
        ) : docs.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-border dark:border-border-dark rounded-xl text-muted dark:text-muted-dark">
            <FileText className="w-6 h-6 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-body">No documents submitted</p>
          </div>
        ) : (
          <div className="space-y-2">
            {docs.map((doc, idx) => (
              <a
                key={idx}
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-border dark:border-border-dark hover:bg-background-light dark:hover:bg-surface-alt text-primary dark:text-blue-400 text-sm font-body font-medium transition-colors"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">Document {idx + 1}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
