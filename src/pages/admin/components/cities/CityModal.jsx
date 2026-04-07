import { AlertCircle, Loader2, X } from "lucide-react";

export function CityModal({
  isOpen,
  editingCity,
  formData,
  setFormData,
  errors,
  states,
  creating,
  updating,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-foreground dark:text-foreground-dark">
            {editingCity ? "Edit City" : "Add New City"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="cityName"
              className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5"
            >
              City Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="cityName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border rounded-xl text-foreground dark:text-foreground-dark focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? "border-danger focus:ring-danger/20"
                  : "border-border dark:border-border-dark focus:border-primary focus:ring-primary/20"
              }`}
              placeholder="E.g. Mumbai"
            />
            {errors.name ? (
              <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5"
            >
              State <span className="text-danger">*</span>
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`w-full px-3 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border rounded-xl text-foreground dark:text-foreground-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-colors ${
                errors.state
                  ? "border-danger focus:ring-danger/20"
                  : "border-border dark:border-border-dark focus:border-primary focus:ring-primary/20"
              }`}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state ? (
              <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="w-3 h-3" /> {errors.state}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-2">
              Status
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: !formData.status })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 dark:focus:ring-offset-surface-dark ${
                  formData.status ? "bg-accent hover:bg-accent-hover" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.status ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm font-body text-muted dark:text-muted-dark">
                {formData.status ? "Active Platform Operations" : "Service Disabled Here"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-5 mt-2 border-t border-border dark:border-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-background-light dark:bg-surface-alt text-foreground dark:text-foreground-dark text-sm font-body font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-border dark:border-border-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || updating}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {creating || updating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {editingCity ? "Update City" : "Add City"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
