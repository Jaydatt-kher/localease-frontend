import { FiCheckCircle, FiImage, FiMapPin, FiUser } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

export const STEPS = [
  { id: 1, label: "Business Info", icon: <FiUser size={16} /> },
  { id: 2, label: "Service Area", icon: <FiMapPin size={16} /> },
  { id: 3, label: "Photos", icon: <FiImage size={16} /> },
  { id: 4, label: "Review", icon: <FiCheckCircle size={16} /> },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DEFAULT_AVAILABILITY = DAYS.map((day) => ({
  day,
  isOpen: day !== "Sun",
  startTime: "09:00",
  endTime: "18:00",
}));

export function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all font-display font-bold text-sm ${done ? "bg-accent border-accent text-white" : active ? "bg-primary border-primary text-white" : "bg-transparent border-border dark:border-border-dark text-muted dark:text-muted-dark"}`}
              >
                {done ? <IoCheckmarkCircle size={20} /> : step.icon}
              </div>
              <span
                className={`text-[11px] font-body hidden sm:block whitespace-nowrap ${active ? "text-primary font-semibold" : done ? "text-accent" : "text-muted dark:text-muted-dark"}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-1 mb-5 transition-colors ${current > step.id ? "bg-accent" : "bg-border dark:bg-border-dark"}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5 font-body">
      {children} {required ? <span className="text-red-500 ml-0.5">*</span> : null}
    </label>
  );
}

export function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 mb-5">
      {title || subtitle ? (
        <div className="mb-5 pb-4 border-b border-border dark:border-border-dark">
          {title ? <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3> : null}
          {subtitle ? <p className="text-sm text-muted dark:text-muted-dark mt-0.5 font-body">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
