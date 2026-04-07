import { FiPackage, FiPlus } from "react-icons/fi";

export function NewProviderBanner({ onAddService }) {
  return (
    <div className="mb-8 rounded-2xl overflow-hidden border border-primary/30 dark:border-primary/20 bg-gradient-to-br from-primary-light to-accent-light dark:from-primary/10 dark:to-accent/5">
      <div className="flex flex-col md:flex-row items-center gap-6 p-7">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shrink-0">
          <FiPackage size={36} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2 font-body">
            Profile Created Successfully
          </span>
          <h2 className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark mb-1">Now add your first service</h2>
          <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed max-w-md">
            Customers cannot find you until you add at least one service. It takes under 2 minutes.
          </p>
        </div>
        <button
          onClick={onAddService}
          className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-display font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-lg hover:-translate-y-0.5 text-sm"
        >
          <FiPlus size={18} /> Add Your First Service
        </button>
      </div>
    </div>
  );
}
