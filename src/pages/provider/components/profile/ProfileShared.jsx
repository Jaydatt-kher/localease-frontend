export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DEFAULT_AVAILABILITY = DAYS.map((day) => ({
  day,
  isOpen: day !== "Sun",
  startTime: "09:00",
  endTime: "18:00",
}));

export function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5 font-body">
      {children} {required ? <span className="text-red-500 ml-0.5">*</span> : null}
    </label>
  );
}

export function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 mb-6">
      {(title || subtitle) ? (
        <div className="mb-5 pb-4 border-b border-border dark:border-border-dark flex items-center justify-between">
          <div>
            {title ? <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3> : null}
            {subtitle ? <p className="text-sm text-muted dark:text-muted-dark mt-0.5 font-body">{subtitle}</p> : null}
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
