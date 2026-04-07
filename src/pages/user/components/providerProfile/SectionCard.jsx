export default function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      {title && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border dark:border-border-dark">
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </div>
          )}
          <h2 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
