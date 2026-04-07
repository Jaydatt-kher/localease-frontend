export default function DetailRow({ label, value, mono = false }) {
  if (!value && value !== 0) return null;

  return (
    <div className="flex items-start justify-between py-2.5 border-b border-border dark:border-border-dark last:border-0">
      <span className="text-sm text-muted dark:text-muted-dark font-body shrink-0">{label}</span>
      <span
        className={`text-sm font-semibold text-foreground dark:text-foreground-dark text-right max-w-[60%] ${
          mono ? "font-mono" : "font-body"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
