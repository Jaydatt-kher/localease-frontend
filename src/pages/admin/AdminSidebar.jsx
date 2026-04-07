import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  FolderTree,
  Calendar,
  CreditCard,
  Star,
  Bell,
  Settings,
  MapPin,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",          href: "/admin" },
  { icon: Users,           label: "Users",               href: "/admin/users" },
  { icon: Briefcase,       label: "Providers",           href: "/admin/providers" },
  { icon: Package,         label: "Services",            href: "/admin/services" },
  { icon: FolderTree,      label: "Service Categories",  href: "/admin/categories" },
  { icon: MapPin,          label: "Cities",              href: "/admin/cities" },
  { icon: Calendar,        label: "Bookings",            href: "/admin/bookings" },
  { icon: CreditCard,      label: "Payments",            href: "/admin/payments" },
  { icon: Star,            label: "Reviews",             href: "/admin/reviews" },
  { icon: Bell,            label: "Notifications",       href: "/admin/notifications" },
  { icon: Settings,        label: "Settings",            href: "/admin/settings" },
];

export function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {}
      <aside
        className={`
          fixed left-0 z-30 flex flex-col
          w-64
          bg-surface-light dark:bg-surface-dark
          border-r border-border dark:border-border-dark
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ top: "68px", height: "calc(100vh - 68px)" }}
      >
        {}
        <div className="px-5 py-4 border-b border-border dark:border-border-dark flex items-center justify-between">
          <div>
            <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-muted dark:text-muted-dark">
              Admin Panel
            </p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {}
        <nav className="flex-1 overflow-y-auto p-3 no-scrollbar">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
                            const isActive =
                item.href === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-body font-medium transition-all duration-150
                      group relative
                      ${isActive
                        ? "bg-primary-light dark:bg-primary/15 text-primary dark:text-blue-400 font-semibold"
                        : "text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark"
                      }
                    `}
                  >
                    {}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary dark:bg-blue-400" />
                    )}
                    <item.icon className={`w-4.5 h-4.5 flex-shrink-0 transition-transform duration-150 ${isActive ? "" : "group-hover:scale-110"}`} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {}
        <div className="px-4 py-3 border-t border-border dark:border-border-dark">
          <p className="text-[11px] font-body text-muted dark:text-muted-dark text-center opacity-60">
            LocalEase Admin v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
