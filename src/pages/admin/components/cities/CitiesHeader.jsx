import { PlusCircle } from "lucide-react";

export function CitiesHeader({ onAddCity }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">
          Manage Cities
        </h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          Manage cities available for service delivery
        </p>
      </div>
      <button
        onClick={onAddCity}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
      >
        <PlusCircle className="w-5 h-5 flex-shrink-0" />
        <span>Add City</span>
      </button>
    </div>
  );
}
