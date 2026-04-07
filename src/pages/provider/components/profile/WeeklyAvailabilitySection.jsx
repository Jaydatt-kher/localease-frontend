import { SectionCard } from "./ProfileShared";

export function WeeklyAvailabilitySection({ availability, onChangeAvailability }) {
  return (
    <SectionCard title="Weekly Availability" subtitle="Customers can only book you during these hours">
      <div className="space-y-3 lg:w-3/4">
        {availability.map((day, idx) => (
          <div
            key={day.day}
            className={`flex flex-wrap sm:grid sm:grid-cols-[100px_1fr_1fr_auto] items-center gap-3 py-3 border-b border-border dark:border-border-dark last:border-0 ${!day.isOpen ? "opacity-50" : ""}`}
          >
            <span className="w-16 sm:w-auto text-sm font-display font-bold text-foreground dark:text-foreground-dark">
              {day.day}
            </span>
            <input
              type="time"
              value={day.startTime}
              disabled={!day.isOpen}
              onChange={(e) => {
                const updated = [...availability];
                updated[idx] = { ...updated[idx], startTime: e.target.value };
                onChangeAvailability(updated);
              }}
              className="flex-1 sm:w-auto form-input text-sm py-1.5 px-2 disabled:cursor-not-allowed"
            />
            <input
              type="time"
              value={day.endTime}
              disabled={!day.isOpen}
              onChange={(e) => {
                const updated = [...availability];
                updated[idx] = { ...updated[idx], endTime: e.target.value };
                onChangeAvailability(updated);
              }}
              className="flex-1 sm:w-auto form-input text-sm py-1.5 px-2 disabled:cursor-not-allowed"
            />
            <label className="flex items-center cursor-pointer ml-auto sm:ml-0">
              <input
                type="checkbox"
                checked={day.isOpen}
                onChange={(e) => {
                  const updated = [...availability];
                  updated[idx] = { ...updated[idx], isOpen: e.target.checked };
                  onChangeAvailability(updated);
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-border dark:bg-border-dark rounded-full peer peer-checked:bg-accent relative transition-colors">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
              </div>
            </label>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
