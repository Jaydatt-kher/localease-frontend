export default function ServiceInfoCard({ service }) {
  if (!service?.description) return null;

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <h2 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-2">Service</h2>
      <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">
        {service.name}
      </p>
      <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}
