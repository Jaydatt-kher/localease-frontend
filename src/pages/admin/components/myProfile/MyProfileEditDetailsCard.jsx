import { Loader2, Mail, Phone, User } from "lucide-react";

function InputWithIcon({ id, type, value, onChange, icon: Icon, readOnly = false }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted dark:text-muted-dark" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full pl-10 pr-4 py-2.5 text-sm font-body bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-xl text-foreground dark:text-foreground-dark transition-colors ${
          readOnly
            ? "opacity-60 cursor-not-allowed"
            : "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        }`}
      />
    </div>
  );
}

export function MyProfileEditDetailsCard({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onSaveProfile,
  updatingProfile,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-border-dark flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary dark:text-blue-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
              Edit Profile Details
            </h3>
            <p className="text-[13px] font-body text-muted dark:text-muted-dark mt-0.5">
              Update your personal and contact information
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            Full Name
          </label>
          <InputWithIcon
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            icon={User}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            Email Address
          </label>
          <InputWithIcon
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            icon={Mail}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">
            Phone Number <span className="text-xs text-muted dark:text-muted-dark font-normal">(managed in Mobile section below)</span>
          </label>
          <InputWithIcon id="phone" type="tel" value={phone} icon={Phone} readOnly />
        </div>

        <div className="pt-2">
          <button
            onClick={onSaveProfile}
            disabled={updatingProfile}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {updatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
}
