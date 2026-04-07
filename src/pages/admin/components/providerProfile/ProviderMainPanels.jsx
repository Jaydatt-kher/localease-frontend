import { Briefcase, CheckCircle, Clock, Star } from "lucide-react";
import { fmtDate, Skeleton, StatCard } from "./ProviderProfilePrimitives";

export function ProviderMainPanels({ isLoading, stats, services, reviews }) {
  return (
    <div className="lg:col-span-2 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => <Skeleton key={idx} className="h-19" />)
        ) : (
          <>
            <StatCard
              label="Total Bookings"
              value={stats?.totalBookings ?? 0}
              icon={Briefcase}
              iconColor="text-primary"
              iconBg="bg-primary-light"
            />
            <StatCard
              label="Completed Jobs"
              value={stats?.completedJobs ?? 0}
              icon={CheckCircle}
              iconColor="text-accent-hover"
              iconBg="bg-accent-light"
            />
            <StatCard
              label="Active Bids"
              value={stats?.pendingEnquiries ?? 0}
              icon={Clock}
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
            />
          </>
        )}
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border dark:border-border-dark flex items-center justify-between">
          <div>
            <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Offered Services</h3>
            <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">Services listed by this provider</p>
          </div>
          {!isLoading ? (
            <span className="text-xs font-body font-semibold text-muted dark:text-muted-dark">{services.length} total</span>
          ) : null}
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-12" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-muted dark:text-muted-dark">
            <Briefcase className="w-8 h-8 opacity-25" />
            <p className="text-sm font-body">No services added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-100">
              <thead>
                <tr className="bg-background-light dark:bg-surface-alt">
                  {["Service", "Pricing Model", "Price", "Status"].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-border-dark">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-background-light dark:hover:bg-surface-alt transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                        {service.service?.name ?? "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-primary-light dark:bg-primary/20 text-primary dark:text-blue-400">
                        {service.priceType}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                        {service.price === 0 ? "As per bid" : `₹${service.price}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {service.isAvailable ? (
                        <span className="text-xs font-body font-semibold text-accent-hover dark:text-green-400">Available</span>
                      ) : (
                        <span className="text-xs font-body font-semibold text-muted dark:text-muted-dark">Unavailable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border dark:border-border-dark">
          <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Recent Reviews</h3>
          <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">Last 5 reviews from customers</p>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-16" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-muted dark:text-muted-dark">
            <Star className="w-8 h-8 opacity-25" />
            <p className="text-sm font-body">No reviews yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border dark:divide-border-dark">
            {reviews.map((review) => (
              <div key={review._id} className="px-5 py-4 hover:bg-background-light dark:hover:bg-surface-alt transition-colors">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-display font-bold text-primary dark:text-blue-400">
                        {(review.user?.name || review.user?.fullName || "U")[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                        {review.user?.name || review.user?.fullName || "Anonymous"}
                      </p>
                      <p className="text-xs font-body text-muted dark:text-muted-dark">{fmtDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-body font-bold text-foreground dark:text-foreground-dark">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-body text-muted dark:text-muted-dark leading-relaxed">
                  "{review.reviewText}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
