import { FiPackage, FiUser } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { RiArrowRightLine } from "react-icons/ri";
import { TbWallet } from "react-icons/tb";

export function SetupChecklist({ profile, servicesCount, onGoProfile, onGoServices }) {
  const steps = [
    {
      id: "profile",
      done: !!profile,
      label: "Create your provider profile",
      desc: "Business name, location and experience - done",
      icon: <FiUser size={15} />,
      action: null,
    },
    {
      id: "photo",
      done: !!profile?.profilePicture,
      label: "Upload a profile photo",
      desc: "Providers with photos get 2x more enquiries",
      icon: <FiUser size={15} />,
      action: onGoProfile,
    },
    {
      id: "services",
      done: servicesCount > 0,
      label: "Add your first service",
      desc: "Tell customers what you offer and your price",
      icon: <FiPackage size={15} />,
      action: onGoServices,
      cta: true,
    },
    {
      id: "payout",
      done:
        !!profile?.payoutSettings?.upiId ||
        !!profile?.payoutSettings?.bankDetails?.accountNumber,
      label: "Set up payout method",
      desc: "Add UPI ID or bank account to receive payments",
      icon: <TbWallet size={15} />,
      action: onGoProfile,
    },
  ];

  const completedCount = steps.filter((step) => step.done).length;
  const pct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-border-dark">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">Complete Your Setup</h3>
            <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
              {completedCount} of {steps.length} steps done
            </p>
          </div>
          <span className="text-2xl font-display font-extrabold text-primary">{pct}%</span>
        </div>
        <div className="w-full h-2 bg-background-light dark:bg-surface-alt rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="divide-y divide-border dark:divide-border-dark">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 px-6 py-4 ${step.action && !step.done ? "cursor-pointer hover:bg-background-light dark:hover:bg-surface-alt transition-colors" : ""}`}
            onClick={() => {
              if (!step.done) {
                step.action?.();
              }
            }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${step.done ? "bg-accent text-white" : "bg-border dark:bg-border-dark text-muted dark:text-muted-dark"}`}
            >
              {step.done ? <HiCheckBadge size={17} /> : step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold font-body ${step.done ? "line-through text-muted dark:text-muted-dark" : "text-foreground dark:text-foreground-dark"}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5 truncate">{step.desc}</p>
            </div>
            {step.done ? (
              <HiCheckBadge size={19} className="shrink-0 text-accent" />
            ) : step.action ? (
              <div
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors font-body ${step.cta ? "bg-primary text-white hover:bg-primary-hover" : "border border-border dark:border-border-dark text-primary hover:border-primary"}`}
              >
                {step.cta ? "Start" : "Go"} <RiArrowRightLine size={12} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
