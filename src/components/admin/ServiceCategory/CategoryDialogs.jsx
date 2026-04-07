import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Trash2, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export function ConfirmDialog({ open, name, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-2">
          Delete Category?
        </h3>
        <p className="text-sm font-body text-muted dark:text-muted-dark mb-5">
          <span className="font-semibold text-foreground dark:text-foreground-dark">"{name}"</span>{" "}
          will be permanently deleted. This action cannot be undone if the category has no services.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-body border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-body font-semibold text-white bg-danger hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditCategoryModal({ category, onClose, onSave, saving }) {
  const [form, setForm] = useState({
    name: category.name || "",
    icon: category.icon || "",
    description: category.description || "",
    displayOrder: category.displayOrder ?? 0,
    featured: category.featured ?? false,
    isActive: category.isActive ?? true,
  });

  useEffect(() => {
    setForm({
      name: category.name || "",
      icon: category.icon || "",
      description: category.description || "",
      displayOrder: category.displayOrder ?? 0,
      featured: category.featured ?? false,
      isActive: category.isActive ?? true,
    });
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Category name is required.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
          <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
            Edit Category
          </h3>
          <button
            onClick={onClose}
            className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
              Icon (emoji or URL)
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
              placeholder="icon or https://..."
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body resize-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
              Display Order
            </label>
            <input
              type="number"
              min={0}
              value={form.displayOrder}
              onChange={(e) => setForm((prev) => ({ ...prev, displayOrder: Number(e.target.value) }))}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body transition-colors"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.isActive ? "bg-accent" : "bg-border dark:bg-border-dark"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    form.isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                Active
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.featured ? "bg-amber-500" : "bg-border dark:bg-border-dark"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    form.featured ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                Featured
              </span>
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-body border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-body font-semibold text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
