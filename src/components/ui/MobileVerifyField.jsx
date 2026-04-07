import { useState } from "react";
import { toast } from "react-toastify";
import { FiPhone, FiCheck, FiX, FiEdit2, FiShield } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MobileVerifyField({
  mobileNo,
  isMobileVerified,
  isSaving,
  onSave,          onSendOtp,       onVerifyOtp,     sendingOtp,
  verifyingOtp,
}) {
  const [editMode, setEditMode]     = useState(false);
  const [draft,    setDraft]        = useState(mobileNo ?? "");
  const [otpMode,  setOtpMode]      = useState(false);
  const [otp,      setOtp]          = useState("");

    const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed || !/^\d{10}$/.test(trimmed)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    await onSave(trimmed);
    setEditMode(false);
    setOtpMode(false);
    setOtp("");
  };

  const handleCancel = () => {
    setDraft(mobileNo ?? "");
    setEditMode(false);
  };

    const handleSendOtp = async () => {
    if (!mobileNo) {
      toast.error("Please save a mobile number first before requesting an OTP.");
      return;
    }
    try {
            const result = await onSendOtp();
            if (result?.error) {
        toast.error(result.error?.data?.message || "Failed to send OTP.");
        return;
      }
      setOtpMode(true);
      setOtp("");
      toast.success("OTP sent to your mobile number via SMS!");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to send OTP.");
    }
  };

    const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    try {
      const result = await onVerifyOtp({ otp });
      if (result?.error) {
        toast.error(result.error?.data?.message || "Invalid or expired OTP.");
        return;
      }
      setOtpMode(false);
      setOtp("");
      toast.success("Mobile number verified successfully! ✅");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Invalid or expired OTP.");
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 space-y-4">
      {}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary">
          <FiPhone size={14} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Mobile Number</p>
          <p className="text-xs font-body text-muted dark:text-muted-dark">Used for OTP verification via SMS</p>
        </div>
        {}
        {isMobileVerified ? (
          <span className="flex items-center gap-1 text-xs font-body font-semibold px-2.5 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover">
            <HiCheckBadge size={13} /> Verified
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-body font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700">
            Not Verified
          </span>
        )}
      </div>

      {}
      {editMode ? (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-body text-muted dark:text-muted-dark">+91</span>
            <input
              type="tel"
              value={draft}
              onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit number"
              maxLength={10}
              autoFocus
              className="w-full pl-10 pr-3 py-2.5 text-sm font-body border border-primary rounded-xl bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none font-mono"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition-colors"
            title="Save number"
          >
            {isSaving ? <AiOutlineLoading3Quarters size={14} className="animate-spin" /> : <FiCheck size={14} />}
          </button>
          <button
            onClick={handleCancel}
            className="p-2.5 rounded-xl border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
            title="Cancel"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <p className={`text-sm font-body font-mono ${mobileNo ? "text-foreground dark:text-foreground-dark" : "text-muted dark:text-muted-dark italic"}`}>
            {mobileNo ? `+91 ${mobileNo}` : "No mobile number added"}
          </p>
          <button
            onClick={() => { setDraft(mobileNo ?? ""); setEditMode(true); }}
            className="flex-shrink-0 flex items-center gap-1 text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            <FiEdit2 size={11} /> Edit
          </button>
        </div>
      )}

      {}
      {!isMobileVerified && !editMode && (
        <div className="border-t border-border dark:border-border-dark pt-4 space-y-3">
          {!otpMode ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-body text-muted dark:text-muted-dark leading-relaxed">
                {mobileNo
                  ? "Send an OTP to verify this number via Twilio SMS."
                  : "Add a mobile number above, then verify it via OTP."}
              </p>
              <button
                onClick={handleSendOtp}
                disabled={sendingOtp || !mobileNo}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-body font-bold hover:bg-amber-600 disabled:opacity-50 transition-colors"
              >
                {sendingOtp
                  ? <><AiOutlineLoading3Quarters size={12} className="animate-spin" /> Sending…</>
                  : <><FiShield size={12} /> Send OTP</>}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-body text-muted dark:text-muted-dark">
                📩 OTP sent to <span className="font-mono font-semibold text-foreground dark:text-foreground-dark">+91 {mobileNo}</span>. Enter it below:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit OTP"
                  maxLength={6}
                  autoFocus
                  className="flex-1 px-4 py-2.5 text-sm font-mono border border-border dark:border-border-dark rounded-xl bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary tracking-widest text-center"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || otp.length !== 6}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-accent text-white text-xs font-body font-bold rounded-xl hover:bg-accent-hover disabled:opacity-50 transition-colors"
                >
                  {verifyingOtp
                    ? <><AiOutlineLoading3Quarters size={12} className="animate-spin" /> Verifying…</>
                    : <><FiCheck size={12} /> Verify</>}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="text-xs font-body text-primary hover:underline disabled:opacity-50"
                >
                  {sendingOtp ? "Sending…" : "Resend OTP"}
                </button>
                <button
                  onClick={() => { setOtpMode(false); setOtp(""); }}
                  className="text-xs font-body text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {}
      {isMobileVerified && (
        <p className="text-xs font-body text-accent-hover flex items-center gap-1.5">
          <HiCheckBadge size={13} />
          This number is verified. Change the number above to re-verify.
        </p>
      )}
    </div>
  );
}
