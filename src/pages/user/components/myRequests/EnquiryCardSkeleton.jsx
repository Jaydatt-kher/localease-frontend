export default function EnquiryCardSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <div className="flex justify-between mb-3">
        <div className="skeleton h-4 w-40 rounded" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="skeleton h-3 w-52 rounded mb-2" />
      <div className="skeleton h-3 w-36 rounded" />
    </div>
  );
}
