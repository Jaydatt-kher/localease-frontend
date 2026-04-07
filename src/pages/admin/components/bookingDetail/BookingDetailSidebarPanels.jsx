import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { Avatar, fmtDate, fmtDateTime, InfoRow, SectionCard } from "./BookingDetailShared";

export function BookingDetailSidebarPanels({ booking, onViewUser, onViewProvider }) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Customer"
        subtitle="User who placed the booking"
        icon={User}
        iconColor="text-sky-600 dark:text-sky-400"
        iconBg="bg-sky-50 dark:bg-sky-900/20"
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border dark:border-border-dark">
          <Avatar name={booking.user?.fullName} photo={booking.user?.profilePicture} size="lg" />
          <div className="min-w-0">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {booking.user?.fullName || "-"}
            </p>
            <button onClick={onViewUser} className="text-xs font-body text-primary dark:text-blue-400 hover:underline mt-0.5">
              View Profile -&gt;
            </button>
          </div>
        </div>
        <InfoRow icon={Mail} label="Email" value={booking.user?.email} />
        <InfoRow icon={Phone} label="Phone" value={booking.user?.mobileNo || "Not provided"} />
      </SectionCard>

      <SectionCard
        title="Provider"
        subtitle="Service provider assigned"
        icon={Briefcase}
        iconColor="text-emerald-600 dark:text-emerald-400"
        iconBg="bg-emerald-50 dark:bg-emerald-900/20"
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border dark:border-border-dark">
          <Avatar name={booking.provider?.businessName} photo={booking.provider?.profilePhoto} size="lg" />
          <div className="min-w-0">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">
              {booking.provider?.businessName || "-"}
            </p>
            <button
              onClick={onViewProvider}
              className="text-xs font-body text-primary dark:text-blue-400 hover:underline mt-0.5"
            >
              View Profile -&gt;
            </button>
          </div>
        </div>
        <InfoRow icon={Mail} label="Email" value={booking.provider?.email} />
        <InfoRow icon={Phone} label="Phone" value={booking.provider?.phone || "Not provided"} />
      </SectionCard>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-3">Quick Info</h3>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            <span className="text-foreground dark:text-foreground-dark font-semibold">Booked: </span>
            {fmtDate(booking.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <p className="text-xs font-body text-muted dark:text-muted-dark">
            <span className="text-foreground dark:text-foreground-dark font-semibold">Scheduled: </span>
            {fmtDateTime(booking.scheduledTime)}
          </p>
        </div>
        {booking.completedAt ? (
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-hover shrink-0" />
            <p className="text-xs font-body text-muted dark:text-muted-dark">
              <span className="text-foreground dark:text-foreground-dark font-semibold">Completed: </span>
              {fmtDateTime(booking.completedAt)}
            </p>
          </div>
        ) : null}
        {booking.complaints ? (
          <div className="mt-3 pt-3 border-t border-border dark:border-border-dark">
            <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark mb-1">
              Complaint
            </p>
            <p className="text-xs font-body text-foreground dark:text-foreground-dark leading-relaxed">{booking.complaints}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
