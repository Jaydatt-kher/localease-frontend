import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";

export function ProfileHeader({ onSave, isUpdating }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark mb-1">Business Profile</h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark">
          Manage your service details, working hours, and portfolio photos.
        </p>
      </div>
      <button
        onClick={onSave}
        disabled={isUpdating}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-60"
      >
        {isUpdating ? <AiOutlineLoading3Quarters size={16} className="animate-spin" /> : <FiCheckCircle size={16} />}
        Save Changes
      </button>
    </div>
  );
}
