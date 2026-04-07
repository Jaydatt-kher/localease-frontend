import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export function QuickActionButton({ icon, label, desc, to, badge }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="relative flex items-center gap-3 w-full p-4 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
    >
      <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{label}</p>
        <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5 truncate">{desc}</p>
      </div>
      {badge ? (
        <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-body">
          {badge}
        </span>
      ) : null}
      <FiArrowRight size={15} className="shrink-0 text-muted dark:text-muted-dark group-hover:text-primary transition-colors" />
    </button>
  );
}
