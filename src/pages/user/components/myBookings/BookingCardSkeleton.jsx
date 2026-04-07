export default function BookingCardSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 border-l-4 border-l-border dark:border-l-border-dark">
      <div className="flex justify-between mb-2">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-4 w-44 rounded mb-1.5" />
      <div className="skeleton h-3 w-32 rounded mb-3" />
      <div className="skeleton h-3 w-56 rounded" />
    </div>
  );
}
