import { FiCalendar, FiInbox, FiPlus, FiSettings } from "react-icons/fi";
import { TbWallet } from "react-icons/tb";
import { QuickActionButton } from "./QuickActionButton";
import { formatCurrency } from "./dashboardShared";

export function QuickActionsCard({ activeBookingsCount, walletBalance }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border dark:border-border-dark">
        <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Quick Actions</h3>
      </div>
      <div className="p-3 space-y-2">
        <QuickActionButton
          icon={<FiPlus size={16} />}
          label="Add New Service"
          desc="Expand your service offerings"
          to="/provider/services"
        />
        <QuickActionButton
          icon={<FiInbox size={16} />}
          label="New Requests"
          desc="View incoming customer enquiries"
          to="/provider/requests"
        />
        <QuickActionButton
          icon={<FiCalendar size={16} />}
          label="View Bookings"
          desc="Manage your appointments"
          to="/provider/bookings"
          badge={activeBookingsCount > 0 ? activeBookingsCount : undefined}
        />
        <QuickActionButton
          icon={<TbWallet size={16} />}
          label="Earnings & Wallet"
          desc={`Balance: ${formatCurrency(walletBalance)}`}
          to="/provider/earnings"
        />
        <QuickActionButton
          icon={<FiSettings size={16} />}
          label="Edit Profile"
          desc="Update business details"
          to="/provider/profile"
        />
      </div>
    </div>
  );
}
