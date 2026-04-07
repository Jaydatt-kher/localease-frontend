import { FiInfo } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { SectionCard } from "./BecomeProviderShared";

function ReviewRow({ label, value, missing }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-border dark:border-border-dark last:border-0">
      <span className="text-sm text-muted dark:text-muted-dark font-body">{label}</span>
      <span
        className={`text-sm font-semibold font-body text-right max-w-[60%] ${missing ? "text-amber-500" : "text-foreground dark:text-foreground-dark"}`}
      >
        {missing ? "Not set (optional)" : value}
      </span>
    </div>
  );
}

export function StepReview({ data, cities }) {
  const city = cities.find((c) => c._id === data.city);
  const hasCoords = data.serviceLocation?.coordinates?.length === 2;

  return (
    <div className="space-y-5">
      <SectionCard title="Review Your Profile" subtitle="Double-check everything before submitting">
        {data.profilePicture ? (
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border dark:border-border-dark">
            <img src={data.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
            <div>
              <p className="font-display font-bold text-foreground dark:text-foreground-dark">{data.businessName || "-"}</p>
              <p className="text-sm text-muted dark:text-muted-dark font-body">{city?.name || "-"}</p>
            </div>
            <HiCheckBadge size={20} className="ml-auto text-accent" />
          </div>
        ) : null}

        <ReviewRow label="Business Name" value={data.businessName} missing={!data.businessName} />
        <ReviewRow
          label="City"
          value={city ? `${city.name}, ${city.state}` : "-"}
          missing={!data.city}
        />
        <ReviewRow
          label="Experience"
          value={`${data.experienceYears} year${data.experienceYears !== 1 ? "s" : ""}`}
          missing={!data.experienceYears}
        />
        <ReviewRow label="Service Radius" value={`${data.serviceRadius} km`} missing={false} />
        <ReviewRow
          label="Location"
          value={
            hasCoords
              ? `Lat ${data.serviceLocation.coordinates[1].toFixed(4)}, Lng ${data.serviceLocation.coordinates[0].toFixed(4)}`
              : "-"
          }
          missing={!hasCoords}
        />
        <ReviewRow label="Profile Photo" value="Uploaded ✓" missing={!data.profilePicture} />
        <ReviewRow
          label="Gallery Photos"
          value={`${data.gallery.length} photo${data.gallery.length !== 1 ? "s" : ""}`}
          missing={data.gallery.length === 0}
        />
        <ReviewRow
          label="Documents"
          value={data.documents.length > 0 ? `${data.documents.length} uploaded` : "None (optional)"}
          missing={false}
        />
        <ReviewRow
          label="Working Days"
          value={`${data.availability.filter((d) => d.isOpen).length} days/week`}
          missing={false}
        />
      </SectionCard>

      {data.gallery.length > 0 ? (
        <SectionCard title="Gallery Preview">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {data.gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-24 h-24 rounded-xl object-cover shrink-0 border border-border dark:border-border-dark"
              />
            ))}
          </div>
        </SectionCard>
      ) : null}

      <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary-light dark:bg-primary/10 border border-border dark:border-border-dark">
        <FiInfo size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">What happens next?</p>
          <p className="text-xs text-muted dark:text-muted-dark font-body mt-1 leading-relaxed">
            After submitting, our team will review your profile. You'll be notified once verified. In the meantime,
            you can add your services from the provider dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
