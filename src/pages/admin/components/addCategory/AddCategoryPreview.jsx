import { IconPreview } from "./AddCategoryShared";

export function AddCategoryPreview({ form }) {
  if (!(form.name || form.icon)) return null;

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark uppercase tracking-wider mb-3">
        Customer Preview
      </p>
      <div className="inline-flex flex-col items-center gap-3 p-5 rounded-2xl border border-border dark:border-border-dark bg-primary-light/40 dark:bg-primary/5 hover:border-primary transition-colors w-40">
        <div className="w-14 h-14 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center">
          <IconPreview icon={form.icon} />
        </div>
        <div className="text-center">
          <p className="text-sm font-display font-bold text-primary leading-tight">{form.name || "Category Name"}</p>
          {form.featured ? (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mt-1 inline-block">
              Featured
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
