import { ArrowLeft } from "lucide-react";

export function AddServiceHeader({ isEdit, onBack, onGoDashboard, onGoServices }) {
  return (
    <div className="space-y-3">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-body font-semibold text-muted dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </button>

      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">
          {isEdit ? "Edit Service" : "Add New Service"}
        </h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          {isEdit ? "Update service details" : "Create a new platform service for customers"}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-body text-muted dark:text-muted-dark">
        <span className="hover:text-primary cursor-pointer" onClick={onGoDashboard}>
          Dashboard
        </span>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer" onClick={onGoServices}>
          Services
        </span>
        <span>/</span>
        <span className="text-foreground dark:text-foreground-dark font-semibold">{isEdit ? "Edit" : "Add New"}</span>
      </div>
    </div>
  );
}
