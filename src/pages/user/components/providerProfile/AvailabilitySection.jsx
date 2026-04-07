import { FiCalendar } from "react-icons/fi";
import SectionCard from "./SectionCard";
import { DAY_ORDER, fmtTime } from "./providerProfileShared";

export default function AvailabilitySection({ availability, isVacation }) {
  if (!availability?.days?.length) return null;

  const openDays = availability.days.filter((d) => d.isOpen);

  return (
    <SectionCard title="Availability" icon={<FiCalendar size={16} />}>
      {isVacation ? (
        <div className="flex items-center gap-2 m-5 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-sm font-body font-semibold">
          🏖️ Currently on vacation — not accepting enquiries
        </div>
      ) : (
        <div className="p-5">
          <p className="text-xs text-muted dark:text-muted-dark font-body mb-4">
            Open <span className="font-semibold text-foreground dark:text-foreground-dark">{openDays.length}</span> day
            {openDays.length !== 1 ? "s" : ""} a week
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
            {DAY_ORDER.map((dayName) => {
              const day = availability.days.find((d) => d.day === dayName);
              const isOpen = day?.isOpen ?? false;

              return (
                <div
                  key={dayName}
                  className="flex items-center justify-between py-2 border-b border-border dark:border-border-dark last:border-0"
                >
                  <span
                    className={`text-sm font-body font-semibold w-10 ${
                      isOpen ? "text-foreground dark:text-foreground-dark" : "text-muted dark:text-muted-dark"
                    }`}
                  >
                    {dayName}
                  </span>
                  {isOpen ? (
                    <span className="text-sm text-muted dark:text-muted-dark font-body">
                      {day.startTime && day.endTime
                        ? `${fmtTime(day.startTime)} – ${fmtTime(day.endTime)}`
                        : "Open"}
                    </span>
                  ) : (
                    <span className="text-xs text-muted dark:text-muted-dark font-body">Closed</span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-body ${
                      isOpen
                        ? "bg-accent-light dark:bg-accent/10 text-accent-hover"
                        : "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark"
                    }`}
                  >
                    {isOpen ? "Open" : "Off"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionCard>
  );
}