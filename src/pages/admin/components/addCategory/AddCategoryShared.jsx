import { Tag } from "lucide-react";

export const ORDER_PRESETS = [0, 1, 2, 3, 4, 5, 10];
export const ICON_QUICK_PICKS = ["🔧", "⚡", "🧹", "🌿", "🎨", "❄️", "🐛", "🏠", "🔒", "🚗", "💧", "🔑"];

export function FieldLabel({ children, required, hint }) {
  return (
    <div className="mb-1.5">
      <label className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
        {children}
        {required ? <span className="text-red-500 ml-0.5">*</span> : null}
      </label>
      {hint ? <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-0.5">{hint}</p> : null}
    </div>
  );
}

export function SectionCard({ icon: Icon, title, subtitle, iconBg, iconColor, children }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border dark:border-border-dark">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3>
          {subtitle ? <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">{subtitle}</p> : null}
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export function inputCls(err) {
  return `w-full px-3 py-2.5 text-sm rounded-xl font-body border
   bg-background-light dark:bg-background-dark
   text-foreground dark:text-foreground-dark
   placeholder:text-muted dark:placeholder:text-muted-dark
   focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
   transition-colors
   ${err ? "border-red-400" : "border-border dark:border-border-dark"}`;
}

export function IconPreview({ icon }) {
  if (!icon) {
    return (
      <div className="w-16 h-16 rounded-2xl bg-background-light dark:bg-surface-alt border-2 border-dashed border-border dark:border-border-dark flex items-center justify-center text-muted dark:text-muted-dark">
        <Tag className="w-6 h-6 opacity-40" />
      </div>
    );
  }

  const isUrl = icon.startsWith("http") || icon.startsWith("/");

  return (
    <div className="w-16 h-16 rounded-2xl bg-primary-light dark:bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
      {isUrl ? (
        <img
          src={icon}
          alt="Icon preview"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className="text-3xl leading-none">{icon}</span>
      )}
    </div>
  );
}
