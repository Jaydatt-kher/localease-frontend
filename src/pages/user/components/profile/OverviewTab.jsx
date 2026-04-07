import { useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiEdit2,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";
import { Avatar } from "./Avatar";
import { formatDate } from "./ProfileShared";

export function OverviewTab({ profile, onTabChange }) {
  const [copied, setCopied] = useState(false);

  const copyReferral = () => {
    if (!profile?.referralCode) {
      return;
    }
    navigator.clipboard.writeText(profile.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: "Total Bookings",
      value: profile?.totalBookings ?? 0,
      icon: <FiPackage size={18} />,
      color: "text-primary",
      bg: "bg-primary-light dark:bg-primary/10",
    },
    {
      label: "Completed",
      value: profile?.completedBookings ?? 0,
      icon: <FiCheckCircle size={18} />,
      color: "text-accent-hover",
      bg: "bg-accent-light dark:bg-accent/10",
    },
    {
      label: "Loyalty Points",
      value: profile?.loyaltyPoints ?? 0,
      icon: <IoStarOutline size={18} />,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
        <div className="h-24 bg-linear-to-r from-primary to-blue-400 dark:from-primary dark:to-blue-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <Avatar user={profile} size={80} />
            <button
              onClick={() => onTabChange("edit")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border dark:border-border-dark text-xs font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors mt-8"
            >
              <FiEdit2 size={12} /> Edit Profile
            </button>
          </div>

          <h2 className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark">{profile?.fullName || "-"}</h2>
          <p className="text-sm text-muted dark:text-muted-dark font-body">{profile?.email}</p>

          <div className="flex gap-2 mt-3 flex-wrap">
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full font-body ${profile?.isEmailVerified ? "bg-accent-light dark:bg-accent/10 text-accent-hover" : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"}`}
            >
              <MdOutlineVerified size={12} />
              {profile?.isEmailVerified ? "Email Verified" : "Email Unverified"}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full font-body ${profile?.isMobileVerified ? "bg-accent-light dark:bg-accent/10 text-accent-hover" : "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark"}`}
            >
              <FiPhone size={11} />
              {profile?.isMobileVerified ? "Mobile Verified" : "Mobile Not Verified"}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {profile?.mobileNo ? (
              <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark font-body">
                <FiPhone size={13} className="text-primary shrink-0" />
                {profile.mobileNo}
              </div>
            ) : null}
            {profile?.address ? (
              <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark font-body">
                <FiMapPin size={13} className="text-primary shrink-0" />
                {profile.address}
              </div>
            ) : null}
            <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark font-body">
              <FiCalendar size={13} className="text-primary shrink-0" />
              Member since {formatDate(profile?.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 text-center">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mx-auto mb-2`}>{stat.icon}</div>
            <p className={`text-2xl font-display font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {(profile?.loyaltyPoints ?? 0) > 0 ? (
        <div className="bg-linear-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border border-amber-200 dark:border-amber-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
            <FiStar size={22} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-base font-display font-bold text-amber-700 dark:text-amber-300">{profile.loyaltyPoints} Loyalty Points</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-body mt-0.5">
              Earn points on every completed booking. Redeem for discounts.
            </p>
          </div>
        </div>
      ) : null}

      {profile?.referralCode ? (
        <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">Your Referral Code</p>
          <p className="text-xs text-muted dark:text-muted-dark font-body mb-3">
            Share this code with friends. When they book, you both earn loyalty points.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-2.5 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
              <span className="font-mono font-bold text-sm text-primary tracking-widest">{profile.referralCode}</span>
            </div>
            <button
              onClick={copyReferral}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-body font-semibold transition-all shrink-0 ${copied ? "bg-accent text-white" : "border border-border dark:border-border-dark text-foreground dark:text-foreground-dark hover:border-primary hover:text-primary"}`}
            >
              {copied ? (
                <>
                  <FiCheck size={13} /> Copied!
                </>
              ) : (
                <>
                  <FiCopy size={13} /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
