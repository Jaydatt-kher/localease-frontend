import { FiInfo } from "react-icons/fi";
import { SectionCard } from "./ProfileShared";

export function ProfileStatusSection({ isActive, onToggle }) {
  return (
    <SectionCard title="Profile Status" subtitle="Control whether you appear as available to customers">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body">
            {isActive ? "Online - Accepting Requests" : "Offline - Not Accepting Requests"}
          </p>
          <p className="text-xs text-muted dark:text-muted-dark font-body mt-1">
            {isActive
              ? "Customers can find you and send enquiries."
              : "You are hidden from search results. Toggle back to go online."}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ml-4 ${isActive ? "bg-accent" : "bg-border dark:bg-border-dark"}`}
          aria-checked={isActive}
          role="switch"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isActive ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
      </div>
      {!isActive ? (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <FiInfo size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-300 font-body">
            While offline, no new enquiries will be assigned to you. Existing bookings are not affected.
          </p>
        </div>
      ) : null}
    </SectionCard>
  );
}
