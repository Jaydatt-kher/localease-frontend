import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheckCircle, FiMail, FiPhone, FiShield } from "react-icons/fi";
import { useResetPasswordMutation } from "../../../../api/authApi";
import { PwdInput } from "./PwdInput";

export function SecurityTab({ profile }) {
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [err, setErr] = useState({});

  const handleChange = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErr((prev) => ({ ...prev, [k]: "" }));
  };

  const handleSubmit = async () => {
    const newErr = {};
    if (!form.currentPassword) {
      newErr.currentPassword = "Required.";
    }
    if (form.newPassword.length < 6) {
      newErr.newPassword = "Minimum 6 characters.";
    }
    if (form.newPassword !== form.confirmPassword) {
      newErr.confirmPassword = "Passwords don't match.";
    }
    setErr(newErr);
    if (Object.keys(newErr).length > 0) {
      return;
    }

    try {
      await resetPassword({ email: profile?.email, newPassword: form.newPassword }).unwrap();
      toast.success("Password changed successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (e) {
      toast.error(e?.data?.message || "Failed to change password.");
    }
  };

  const statuses = [
    { label: "Email", value: profile?.email, verified: profile?.isEmailVerified, icon: <FiMail size={14} /> },
    { label: "Mobile", value: profile?.mobileNo || "Not added", verified: profile?.isMobileVerified, icon: <FiPhone size={14} /> },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-4">Verification Status</p>
        <div className="space-y-3">
          {statuses.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${item.verified ? "border-accent bg-accent-light dark:bg-accent/10" : "border-border dark:border-border-dark"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.verified ? "bg-accent text-white" : "bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark"}`}
              >
                {item.verified ? <FiCheckCircle size={14} /> : item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark">{item.label}</p>
                <p className="text-sm font-body text-foreground dark:text-foreground-dark truncate">{item.value}</p>
              </div>
              <span className={`text-xs font-body font-semibold shrink-0 ${item.verified ? "text-accent-hover" : "text-amber-600 dark:text-amber-400"}`}>
                {item.verified ? "Verified ✓" : "Not Verified"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-4">Change Password</p>
        <div className="space-y-4">
          <PwdInput
            label="Current Password"
            value={form.currentPassword}
            onChange={(v) => handleChange("currentPassword", v)}
            error={err.currentPassword}
            show={showCurrent}
            onToggle={() => setShowCurrent((prev) => !prev)}
          />
          <PwdInput
            label="New Password"
            value={form.newPassword}
            onChange={(v) => handleChange("newPassword", v)}
            error={err.newPassword}
            show={showNew}
            onToggle={() => setShowNew((prev) => !prev)}
          />
          <PwdInput
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={(v) => handleChange("confirmPassword", v)}
            error={err.confirmPassword}
            show={showConfirm}
            onToggle={() => setShowConfirm((prev) => !prev)}
          />
          {form.confirmPassword ? (
            <p className={`text-xs font-body ${form.newPassword === form.confirmPassword ? "text-accent-hover" : "text-red-500"}`}>
              {form.newPassword === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          ) : null}
          <button
            onClick={handleSubmit}
            disabled={resetting}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-body font-bold text-sm rounded-xl hover:bg-primary-hover disabled:opacity-60 transition-colors"
          >
            {resetting ? (
              <>
                <AiOutlineLoading3Quarters size={14} className="animate-spin" /> Updating...
              </>
            ) : (
              <>
                <FiShield size={14} /> Update Password
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-3 text-center">Use a strong password with at least 6 characters.</p>
      </div>
    </div>
  );
}
