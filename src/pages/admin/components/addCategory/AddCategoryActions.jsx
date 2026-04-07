import { CheckCircle, Loader2 } from "lucide-react";

export function AddCategoryActions({ creating, onCancel }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-body text-muted dark:text-muted-dark hidden sm:block">
          The category will be available for services after creation.
        </p>
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={onCancel}
            disabled={creating}
            className="px-5 py-2.5 rounded-xl text-sm font-body font-semibold border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-sm"
          >
            {creating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Creating...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" /> Create Category
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
