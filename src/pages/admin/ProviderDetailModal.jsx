import { useEffect } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  UserCheck,
  XCircle,
  Loader2,
  Shield,
} from "lucide-react";

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function Avatar({ name, size = "lg" }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "P";
  const sz = size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center flex-shrink-0`}>
      <span className="font-display font-bold text-primary dark:text-blue-400">{initials}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border dark:border-border-dark last:border-0">
      <div className="w-7 h-7 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-muted dark:text-muted-dark" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">{label}</p>
        <p className="text-sm font-body text-foreground dark:text-foreground-dark mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

export function ProviderDetailModal({ provider, open, onClose, onApprove, onReject, approving, rejecting }) {
    useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

    useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isProcessing = approving || rejecting;
  const docs = provider?.documents ?? [];

  return (
    <>
      {}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md
          bg-surface-light dark:bg-surface-dark
          border-l border-border dark:border-border-dark
          shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-border-dark flex-shrink-0">
          <h2 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
            Provider Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {}
        {!provider ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {}
            <div className="px-5 py-5 border-b border-border dark:border-border-dark">
              <div className="flex items-start gap-4">
                <Avatar name={provider.businessName} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark leading-tight break-words">
                    {provider.businessName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {}
                    {provider.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-body text-accent-hover dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-body text-amber-600 dark:text-amber-400">
                        <Clock className="w-3.5 h-3.5" /> Awaiting Approval
                      </span>
                    )}

                    {}
                    {provider.rating?.average > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-body text-foreground dark:text-foreground-dark">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        {provider.rating.average.toFixed(1)}
                        <span className="text-muted dark:text-muted-dark">({provider.rating.count})</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: "Jobs Done",   value: provider.completedJobs ?? 0, icon: Briefcase },
                  { label: "Experience",  value: provider.experienceYears ? `${provider.experienceYears} yrs` : "—", icon: Calendar },
                  { label: "Radius",      value: provider.serviceRadius ? `${provider.serviceRadius} km` : "—", icon: MapPin },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-background-light dark:bg-surface-alt rounded-xl p-3 text-center">
                    <Icon className="w-4 h-4 text-muted dark:text-muted-dark mx-auto mb-1" />
                    <p className="text-base font-display font-bold text-foreground dark:text-foreground-dark">{value}</p>
                    <p className="text-[10px] font-body text-muted dark:text-muted-dark mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="px-5 py-2">
              <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark py-2">
                Contact & Information
              </p>
              <InfoRow icon={Mail}     label="Email"    value={provider.userId?.email ?? provider.userId?.fullName ?? "—"} />
              <InfoRow icon={Phone}    label="Phone"    value={provider.userId?.mobileNo ?? "—"} />
              <InfoRow icon={MapPin}   label="City"     value={provider.city?.name ?? "—"} />
              <InfoRow icon={Calendar} label="Joined"   value={fmtDate(provider.joinedAt ?? provider.createdAt)} />
              <InfoRow icon={Shield}   label="Wallet"   value={provider.walletBalance != null ? `₹${provider.walletBalance}` : "—"} />
            </div>

            {}
            <div className="px-5 py-2 pb-5">
              <p className="text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark py-2">
                Submitted Documents ({docs.length})
              </p>
              {docs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border dark:border-border-dark p-5 text-center text-muted dark:text-muted-dark">
                  <FileText className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-body">No documents submitted</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {docs.map((doc, i) => (
                    <a
                      key={i}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border dark:border-border-dark hover:bg-background-light dark:hover:bg-surface-alt text-primary dark:text-blue-400 text-sm font-body font-medium transition-colors group"
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Document {i + 1}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {}
        {provider && !provider.isVerified && (
          <div className="flex-shrink-0 px-5 py-4 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt flex gap-3">
            {}
            <button
              onClick={() => onReject(provider._id)}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-danger/40 text-danger dark:text-red-400 text-sm font-body font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition-colors"
            >
              {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              Reject
            </button>

            {}
            <button
              onClick={() => onApprove(provider._id)}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-sm font-body font-semibold hover:bg-primary-hover disabled:opacity-50 transition-colors"
            >
              {approving ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
              Approve
            </button>
          </div>
        )}
      </div>
    </>
  );
}
