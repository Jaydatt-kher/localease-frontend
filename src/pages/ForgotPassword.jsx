import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useForgotPasswordOtpMutation, useForgotPasswordVerifyOtpMutation, useResetPasswordMutation } from "../api/authApi";
import { MdOutlineEmail, MdOutlineLock, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { IoArrowBack, IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { HiCheckCircle } from "react-icons/hi";

function StepDot({ idx, current }) {
  const done   = current > idx;
  const active = current === idx;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-display border-2 transition-all
      ${done || active ? "bg-primary border-primary text-white" : "bg-transparent border-border dark:border-border-dark text-muted dark:text-muted-dark"}`}>
      {done ? <HiCheckCircle size={16} /> : idx}
    </div>
  );
}

function StepIndicator({ current }) {
  const labels = ["Email", "OTP", "Reset"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1">
            <StepDot idx={i + 1} current={current} />
            <span className={`text-[11px] font-body ${current === i + 1 ? "text-primary font-semibold" : current > i + 1 ? "text-accent" : "text-muted dark:text-muted-dark"}`}>
              {label}
            </span>
          </div>
          {i < 2 && <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${current > i + 1 ? "bg-primary" : "bg-border dark:bg-border-dark"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function PwdField({ id, label, value, onChange, show, onToggle, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">{label}</label>
      <div className="relative">
        <MdOutlineLock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
        <input type={show ? "text" : "password"} id={id} value={value} onChange={onChange}
          placeholder={placeholder} className="form-input form-input-icon pr-11" />
        <button type="button" onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors">
          {show ? <MdOutlineVisibilityOff size={19} /> : <MdOutlineVisibility size={19} />}
        </button>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPasswordOtp,       { isLoading: isSendingOtp }]  = useForgotPasswordOtpMutation();
  const [forgotPasswordVerifyOtp, { isLoading: isVerifyingOtp }]= useForgotPasswordVerifyOtpMutation();
  const [resetPassword,           { isLoading: isResetting }]   = useResetPasswordMutation();
  const [step,            setStep]            = useState(1);
  const [email,           setEmail]           = useState("");
  const [otp,             setOtp]             = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [timer,           setTimer]           = useState(60);
  const [canResend,       setCanResend]       = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    if (timer <= 0) { setCanResend(true); return; }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, step]);

  const handleSendOtp = async () => {
    if (!email.trim()) { toast.error("Please enter your email."); return; }
    try {
      const res = await forgotPasswordOtp({ email }).unwrap();
      toast.success(res.message || "OTP sent!"); setStep(2); setTimer(60); setCanResend(false);
    } catch (err) { toast.error(err?.data?.message || "Failed to send OTP."); }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) { toast.error("Please enter the OTP."); return; }
    try {
      const res = await forgotPasswordVerifyOtp({ email, otp }).unwrap();
      toast.success(res.message || "OTP verified!"); setStep(3);
    } catch (err) { toast.error(err?.data?.message || "Invalid OTP."); }
  };

  const handleResendOtp = async () => {
    try { await forgotPasswordOtp({ email }).unwrap(); toast.success("New OTP sent!"); setTimer(60); setCanResend(false); }
    catch (err) { toast.error(err?.data?.message || "Failed to resend."); }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match."); return; }
    try {
      const res = await resetPassword({ email, newPassword }).unwrap();
      toast.success(res.message || "Password reset! Please sign in."); navigate("/signin");
    } catch (err) { toast.error(err?.data?.message || "Reset failed."); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark font-body transition-colors duration-300">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="auth-card p-8">

          <button type="button" onClick={() => (step > 1 ? setStep((s) => s - 1) : navigate("/signin"))}
            className="flex items-center gap-1.5 text-sm text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors mb-6">
            <IoArrowBack size={16} /> {step > 1 ? "Back" : "Back to Sign In"}
          </button>

          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light dark:bg-border-dark mb-4">
              <IoShieldCheckmarkOutline size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark mb-1">Reset Password</h1>
            <p className="text-sm text-muted dark:text-muted-dark">
              {step === 1 && "Enter your email to receive an OTP"}
              {step === 2 && `OTP sent to ${email}`}
              {step === 3 && "Create your new password"}
            </p>
          </div>

          <StepIndicator current={step} />

          {}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="fp-email" className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Email Address</label>
                <div className="relative">
                  <MdOutlineEmail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  <input type="email" id="fp-email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" className="form-input form-input-icon"
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()} />
                </div>
              </div>
              <button type="button" onClick={handleSendOtp} className="btn-primary" disabled={isSendingOtp}>
                {isSendingOtp ? <ClipLoader size={20} color="white" /> : <><span>Send OTP</span><RiArrowRightLine size={18} /></>}
              </button>
            </div>
          )}

          {}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="fp-otp" className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5">Enter OTP</label>
                <input type="text" id="fp-otp" value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit code" maxLength={6}
                  className="form-input tracking-[0.35em] text-center font-mono font-bold text-lg"
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()} />
              </div>
              <button type="button" onClick={handleVerifyOtp} className="btn-primary" disabled={isVerifyingOtp}>
                {isVerifyingOtp ? <ClipLoader size={20} color="white" /> : <><span>Verify OTP</span><RiArrowRightLine size={18} /></>}
              </button>
              <div className="text-center">
                {canResend ? (
                  <button type="button" onClick={handleResendOtp} disabled={isSendingOtp}
                    className="flex items-center justify-center gap-1.5 mx-auto text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
                    <TbRefresh size={15} className={isSendingOtp ? "animate-spin" : ""} />
                    {isSendingOtp ? "Sending…" : "Resend OTP"}
                  </button>
                ) : (
                  <p className="text-sm text-muted dark:text-muted-dark">
                    Resend in <span className="font-mono font-bold text-primary">{timer}s</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <PwdField id="new-pw" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                show={showNew} onToggle={() => setShowNew((p) => !p)} placeholder="Enter a strong password" />
              <PwdField id="confirm-pw" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                show={showConfirm} onToggle={() => setShowConfirm((p) => !p)} placeholder="Repeat your password" />
              {confirmPassword && (
                <p className={`text-xs ${newPassword === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                  {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
              <button type="button" onClick={handleResetPassword} className="btn-primary"
                disabled={isResetting || (!!confirmPassword && newPassword !== confirmPassword)}>
                {isResetting ? <ClipLoader size={20} color="white" /> : <><span>Reset Password</span><RiArrowRightLine size={18} /></>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}