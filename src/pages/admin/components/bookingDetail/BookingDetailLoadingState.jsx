import { Skeleton } from "./BookingDetailShared";

export function BookingDetailLoadingState() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <Skeleton className="h-52" />
        <Skeleton className="h-44" />
        <Skeleton className="h-36" />
      </div>
      <div className="space-y-5">
        <Skeleton className="h-52" />
        <Skeleton className="h-44" />
      </div>
    </div>
  );
}
