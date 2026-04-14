import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsProvider, selectIsAdmin, logout } from "../../redux/authSlice";
import { useSignOutMutation } from "../../api/authApi";
import ThemeToggle from "../ui/ThemeToggle";
import LocationSelector from "../ui/LocationSelector";
import {
  useGetUnreadCountQuery,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "../../api/notifications";
import {
  useGetProviderStatsQuery,
  useGetPendingProvidersQuery,
} from "../../api/adminApi";
import { useLazySearchUnifiedQuery } from "../../api/serviceApi";

import {
  FiSearch, FiMenu, FiX, FiChevronDown, FiLogOut,
  FiUser, FiBookmark, FiGrid, FiBell,
} from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { IoStarOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const N_TYPE = {
  NEW_ENQUIRY: {
    color: "text-primary",
    bg: "bg-primary-light dark:bg-primary/20",
    emoji: "📋",
  },
  PROVIDER_BID: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/25",
    emoji: "💬",
  },
  BID_ACCEPTED: {
    color: "text-accent-hover",
    bg: "bg-accent-light dark:bg-accent/20",
    emoji: "🎉",
  },
  BID_REJECTED: {
    color: "text-muted dark:text-muted-dark",
    bg: "bg-background-light dark:bg-surface-alt",
    emoji: "❌",
  },
};

function getNotificationRoute(n) {
  switch (n.type) {
    case "NEW_ENQUIRY":
            return "/provider/requests";
    case "PROVIDER_BID":
            return n.enquiryId ? `/my-requests/${n.enquiryId}` : "/my-requests";
    case "BID_ACCEPTED":
      return n.bookingId ? `/provider/bookings/${n.bookingId}` : "/provider/bookings";
    case "BID_REJECTED":
      return "/provider/requests";
    default:
      return "/notifications";
  }
}

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

    const { data: unreadCount = 0 } = useGetUnreadCountQuery(undefined, {
    pollingInterval: 30000,
  });

    const { data: envelope, isLoading } = useGetNotificationsQuery(
    { page: 1, limit: 6 },
    { skip: !open, refetchOnMountOrArgChange: true }
  );

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: markingAll }] = useMarkAllAsReadMutation();

  const notifications = envelope?.data ?? [];

    useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleItemClick = async (n) => {
    if (!n.isRead) {
      markAsRead(n._id).catch(() => {});
    }
    setOpen(false);
    navigate(getNotificationRoute(n));
  };

  const handleMarkAll = async () => {
    await markAllAsRead().unwrap().catch(() => {});
  };

  const cfg = (type) => N_TYPE[type] ?? N_TYPE.BID_REJECTED;

  return (
    <div className="relative" ref={panelRef}>
      {}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-border dark:border-border-dark bg-transparent text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
        aria-label="Notifications"
      >
        <FiBell size={17} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold font-body flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {}
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-80 sm:w-96 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark overflow-hidden z-50 animate-slide-down">

          {}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-border-dark">
            <div className="flex items-center gap-2">
              <FiBell size={15} className="text-primary" />
              <span className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-body">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAll}
                  disabled={markingAll}
                  className="text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors disabled:opacity-50"
                >
                  {markingAll ? "..." : "Mark all read"}
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
              >
                <FiX size={15} />
              </button>
            </div>
          </div>

          {}
          <div className="max-h-[420px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-muted dark:text-muted-dark">
                <AiOutlineLoading3Quarters size={18} className="animate-spin text-primary" />
                <span className="text-sm font-body">Loading…</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-muted dark:text-muted-dark">
                <FiBell size={28} className="opacity-25" />
                <p className="text-sm font-body">No notifications yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-border dark:divide-border-dark">
                {notifications.map((n) => {
                  const { color, bg, emoji } = cfg(n.type);
                  return (
                    <li key={n._id}>
                      <button
                        onClick={() => handleItemClick(n)}
                        className={`w-full text-left flex items-start gap-3 px-4 py-3.5 hover:bg-background-light dark:hover:bg-surface-alt transition-colors
                          ${!n.isRead ? "bg-primary-light/40 dark:bg-primary/5" : ""}`}
                      >
                        {}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5 ${bg}`}>
                          {emoji}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-xs font-body font-bold leading-tight ${color}`}>
                              {n.title}
                            </p>
                            {!n.isRead && (
                              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1" />
                            )}
                          </div>
                          <p className="text-xs font-body text-muted dark:text-muted-dark leading-snug mt-0.5 line-clamp-2">
                            {n.body}
                          </p>
                          <p className="text-[10px] font-body text-muted dark:text-muted-dark mt-1 opacity-70">
                            {timeAgo(n.createdAt)}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {}
          <div className="border-t border-border dark:border-border-dark">
            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center py-3 text-xs font-body font-semibold text-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-colors no-underline"
            >
              View all notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminNotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

    const { data: stats } = useGetProviderStatsQuery(undefined, {
    pollingInterval: 60000,
  });
  const pendingCount = stats?.pending ?? 0;

    const { data: pendingList = [], isLoading } = useGetPendingProvidersQuery(undefined, {
    skip: !open,
    refetchOnMountOrArgChange: true,
  });

    useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function timeAgoLocal(iso) {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  return (
    <div className="relative" ref={panelRef}>
      {}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-border dark:border-border-dark bg-transparent text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
        aria-label="Pending provider verifications"
      >
        <FiBell size={17} />
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold font-body flex items-center justify-center leading-none">
            {pendingCount > 99 ? "99+" : pendingCount}
          </span>
        )}
      </button>

      {}
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-80 sm:w-96 rounded-2xl shadow-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark overflow-hidden z-50 animate-slide-down">

          {}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-border-dark">
            <div className="flex items-center gap-2">
              <FiBell size={15} className="text-amber-500" />
              <span className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">
                Provider Verifications
              </span>
              {pendingCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-body">
                  {pendingCount} pending
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
            >
              <FiX size={15} />
            </button>
          </div>

          {}
          <div className="max-h-[360px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-muted dark:text-muted-dark">
                <AiOutlineLoading3Quarters size={18} className="animate-spin text-amber-500" />
                <span className="text-sm font-body">Loading…</span>
              </div>
            ) : pendingList.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-muted dark:text-muted-dark">
                <FiBell size={28} className="opacity-25" />
                <p className="text-sm font-body">No pending verifications</p>
              </div>
            ) : (
              <ul className="divide-y divide-border dark:divide-border-dark">
                {pendingList.map((p) => (
                  <li key={p._id}>
                    <button
                      onClick={() => { setOpen(false); navigate(`/admin/providers/${p._id}`); }}
                      className="w-full text-left flex items-start gap-3 px-4 py-3.5 hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
                    >
                      {}
                      <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/25 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                        🏢
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-body font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">
                            {p.businessName ?? "Unnamed Business"}
                          </p>
                          <span className="flex-shrink-0 text-[10px] font-body text-muted dark:text-muted-dark whitespace-nowrap">
                            {timeAgoLocal(p.joinedAt)}
                          </span>
                        </div>
                        <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
                          {p.city?.name ? `📍 ${p.city.name}` : "Location not set"} · Awaiting verification
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {}
          <div className="border-t border-border dark:border-border-dark">
            <button
              onClick={() => { setOpen(false); navigate("/admin/providers/pending"); }}
              className="flex items-center justify-center w-full py-3 text-xs font-body font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              View all pending providers →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function UserAvatar({ user, size = 32 }) {
  if (user?.photoUrl) {
    return (
      <img
        src={user.photoUrl}
        alt="Avatar"
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";
  return (
    <div
      className="rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary border-2 border-primary/20 flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </div>
  );
}

export default function Navbar({ hideSearch = false, title = "" }) {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();
  const user       = useSelector(selectUser);
  const isProvider = useSelector(selectIsProvider);
  const isAdmin    = useSelector(selectIsAdmin);
  const [signOut]  = useSignOutMutation();

  const isCustomer      = user && !isProvider && !isAdmin;
  const showLocSelector = isCustomer && !hideSearch;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [scrolled,     setScrolled]     = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef  = useRef(null);
  const searchRef    = useRef(null);
  const debounceRef  = useRef(null);

  const [triggerSearch, { data: suggestionData, isFetching: suggestionsLoading }] = useLazySearchUnifiedQuery();
  const suggestionCategories = suggestionData?.categories ?? [];
  const suggestionServices   = suggestionData?.services   ?? [];
  const hasSuggestions = suggestionCategories.length > 0 || suggestionServices.length > 0;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowSuggestions(false); }, [location.pathname]);

  const handleSearchChange = useCallback((val) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length >= 3) {
      debounceRef.current = setTimeout(() => {
        triggerSearch(val.trim());
        setShowSuggestions(true);
      }, 300);
    } else {
      setShowSuggestions(false);
    }
  }, [triggerSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim())
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSuggestionClick = (path) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(path);
  };

  const handleSignOut = async () => {
    try { await signOut().unwrap(); } finally { dispatch(logout()); navigate("/"); }
  };

  let navMenuItems = [];
  if (isAdmin) {
    navMenuItems = [
      { icon: <FiUser size={15} />, label: "My Profile", to: "/admin/profile" },
    ];
  } else if (isProvider) {
    navMenuItems = [
      { icon: <FiUser size={15} />,     label: "User Account",  to: "/profile" },
      { icon: <MdWorkOutline size={15} />, label: "Business Profile", to: "/provider/profile" },
      { icon: <FiBookmark size={15} />, label: "My Bookings", to: "/provider/bookings" },
      { icon: <FiGrid size={15} />,     label: "Requests", to: "/provider/requests" },
    ];
  } else {
    navMenuItems = [
      { icon: <FiUser size={15} />,     label: "My Profile",  to: "/profile" },
      { icon: <FiBookmark size={15} />, label: "My Bookings", to: "/my-bookings" },
      { icon: <FiGrid size={15} />,     label: "My Requests", to: "/my-requests" },
    ];
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[68px] bg-white/90 dark:bg-[#0A1628]/90 backdrop-blur-md border-b border-border dark:border-border-dark transition-all ${scrolled ? "shadow-md" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center gap-4">

          {}
          <Link to="/" className="flex-shrink-0 flex items-center no-underline">
            <img
              src="/logo.png"
              alt="LocalEase"
              className="h-20 w-auto object-contain"
              style={{ maxWidth: "200px" }}
            />
          </Link>

          {}
          {hideSearch ? (
            title ? (
              <span className="hidden md:block text-sm font-semibold text-muted dark:text-muted-dark font-body truncate">
                {title}
              </span>
            ) : null
          ) : (
            <div ref={searchRef} className="hidden md:block relative flex-1 max-w-[460px]">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-0 bg-background-light dark:bg-surface-alt rounded-full border border-border dark:border-border-dark px-4 py-1.5 hover:border-primary transition-colors"
              >
                <FiSearch size={16} className="text-muted dark:text-muted-dark flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => { if (searchQuery.trim().length >= 3 && hasSuggestions) setShowSuggestions(true); }}
                  placeholder="Search — plumber, AC repair..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-foreground dark:text-foreground-dark placeholder:text-muted dark:placeholder:text-muted-dark px-3 py-0.5 font-body"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim().length >= 3 && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-xl z-50 max-h-[420px] overflow-y-auto animate-slide-down">
                  {suggestionsLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted dark:text-muted-dark font-body">
                      <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse" />
                      Searching…
                    </div>
                  ) : !hasSuggestions ? (
                    <div className="px-4 py-4 text-xs text-muted dark:text-muted-dark font-body text-center">
                      No results for &quot;{searchQuery}&quot; — press Enter to search anyway
                    </div>
                  ) : (
                    <div>
                      {suggestionCategories.length > 0 && (
                        <div>
                          <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted dark:text-muted-dark uppercase tracking-widest font-body">
                            Categories
                          </p>
                          {suggestionCategories.map((cat) => (
                            <button
                              key={cat._id}
                              onMouseDown={() => handleSuggestionClick(`/services?categoryId=${cat._id}&categoryName=${encodeURIComponent(cat.name)}`)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary-light dark:hover:bg-primary/15 transition-colors text-left"
                            >
                              <div className="w-7 h-7 rounded-lg bg-primary-light dark:bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                                <FiGrid size={14} />
                              </div>
                              <div>
                                <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">{cat.name}</p>
                                <p className="text-[10px] font-body text-muted dark:text-muted-dark">Browse all services</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {suggestionServices.length > 0 && (
                        <div className={suggestionCategories.length > 0 ? "border-t border-border dark:border-border-dark" : ""}>
                          <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted dark:text-muted-dark uppercase tracking-widest font-body">
                            Services
                          </p>
                          {suggestionServices.map((svc) => (
                            <button
                              key={svc._id}
                              onMouseDown={() => handleSuggestionClick(`/services/${svc._id}`)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary-light dark:hover:bg-primary/15 transition-colors text-left"
                            >
                              <div className="w-7 h-7 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center text-muted dark:text-muted-dark flex-shrink-0">
                                <MdWorkOutline size={14} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark truncate">{svc.name}</p>
                                {svc.category?.name && (
                                  <p className="text-[10px] font-body text-muted dark:text-muted-dark">{svc.category.name}</p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        onMouseDown={() => handleSuggestionClick(`/services?q=${encodeURIComponent(searchQuery.trim())}`)}
                        className="w-full flex items-center gap-2 px-4 py-3 border-t border-border dark:border-border-dark text-xs font-body font-semibold text-primary hover:bg-primary-light dark:hover:bg-primary/15 transition-colors"
                      >
                        <FiSearch size={12} /> Search all results for &quot;{searchQuery}&quot;
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {}
          <div className="ml-auto flex items-center gap-2">

            {}
            {showLocSelector && (
              <div className="hidden md:block">
                <LocationSelector />
              </div>
            )}

            <ThemeToggle />

            {user ? (
              <>
            {}
            <div className="hidden md:block">
              {isAdmin ? <AdminNotificationBell /> : <NotificationBell />}
            </div>

                {}
                {!isProvider && !isAdmin && (
                  <Link
                    to="/become-provider"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <MdWorkOutline size={16} /> Become a Provider
                  </Link>
                )}

                {}
                {isProvider && (
                  <Link
                    to="/provider/dashboard"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border dark:border-border-dark text-foreground dark:text-foreground-dark text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    <RiDashboardLine size={16} /> Dashboard
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border dark:border-border-dark text-sm font-semibold hover:border-primary hover:text-primary transition-colors text-foreground dark:text-foreground-dark"
                  >
                    Admin
                  </Link>
                )}

                {}
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 border border-border dark:border-border-dark rounded-full pl-1 pr-3 py-1 hover:border-primary transition-colors bg-transparent"
                  >
                    <UserAvatar user={user} size={30} />
                    <span className="hidden md:block text-sm font-semibold text-foreground dark:text-foreground-dark max-w-[90px] truncate font-body">
                      {user.fullName?.split(" ")[0]}
                    </span>
                    <FiChevronDown
                      size={14}
                      className={`text-muted dark:text-muted-dark transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 w-56 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-xl p-1.5 z-50 animate-slide-down">
                      {}
                      <div className="px-3 py-2.5 border-b border-border dark:border-border-dark mb-1">
                        <p className="text-sm font-semibold text-foreground dark:text-foreground-dark truncate font-display">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-muted dark:text-muted-dark truncate font-body">
                          {user.email}
                        </p>
                        {user.loyaltyPoints > 0 && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <IoStarOutline size={12} className="text-yellow-500" />
                            <span className="text-xs text-muted dark:text-muted-dark font-body">
                              {user.loyaltyPoints} loyalty pts
                            </span>
                          </div>
                        )}
                      </div>

                      {navMenuItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-primary transition-colors no-underline font-body"
                        >
                          {item.icon} {item.label}
                        </Link>
                      ))}

                      {!isProvider && !isAdmin && (
                        <Link
                          to="/become-provider"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-accent-hover hover:bg-accent-light transition-colors no-underline my-1 font-body"
                        >
                          <MdWorkOutline size={15} /> Become a Provider
                        </Link>
                      )}

                      <div className="border-t border-border dark:border-border-dark mt-1 pt-1">
                        <button
                          onClick={() => { setDropdownOpen(false); handleSignOut(); }}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-body"
                        >
                          <FiLogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="hidden md:flex px-4 py-2 text-sm font-semibold border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-bold rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors">
                  Register
                </Link>
              </>
            )}

            {}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-xl border border-border dark:border-border-dark text-foreground dark:text-foreground-dark hover:border-primary transition-colors"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-[68px] left-0 right-0 bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark p-4 flex flex-col gap-3 animate-slide-down">
            {}
            {!hideSearch && (
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="form-input"
                />
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-xl font-bold flex-shrink-0">
                  <FiSearch size={18} />
                </button>
              </form>
            )}
            {}
            {showLocSelector && (
              <div className="flex">
                <LocationSelector />
              </div>
            )}

            {user ? (
              <>
                {!isProvider && !isAdmin && (
                  <Link to="/become-provider" className="flex items-center justify-center gap-2 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-colors">
                    <MdWorkOutline size={18} /> Become a Provider
                  </Link>
                )}

                {}
                <Link
                  to="/notifications"
                  className="flex items-center justify-center gap-2 py-3 border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary font-semibold transition-colors"
                >
                  <FiBell size={16} /> Notifications
                </Link>

                {!isAdmin && (
                  <>
                    <Link to={isProvider ? "/provider/bookings" : "/my-bookings"} className="py-3 text-center border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary font-semibold transition-colors">My Bookings</Link>
                    <Link to={isProvider ? "/provider/requests" : "/my-requests"} className="py-3 text-center border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary font-semibold transition-colors">{isProvider ? "Requests" : "My Requests"}</Link>
                  </>
                )}
                <Link to={isAdmin ? "/admin/profile" : "/profile"} className="py-3 text-center border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary font-semibold transition-colors">
                  {isProvider ? "User Account" : "Profile"}
                </Link>

                {isProvider && (
                  <>
                    <Link to="/provider/profile" className="py-3 text-center border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark hover:border-primary font-semibold transition-colors">
                      Business Profile
                    </Link>
                    <Link to="/provider/dashboard" className="py-3 text-center border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark font-semibold transition-colors">
                      Provider Dashboard
                    </Link>
                  </>
                )}

                <button
                  onClick={handleSignOut}
                  className="py-3 border border-red-200 dark:border-red-800 text-red-500 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="py-3 text-center border border-border dark:border-border-dark rounded-xl font-semibold text-foreground dark:text-foreground-dark">Sign In</Link>
                <Link to="/signup" className="py-3 text-center bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}

      {}
      <div className="h-[68px]" />
    </>
  );
}