import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useVerifyEmailMutation, useResendVerificationMutation } from "../api/authApi";
import { MdOutlineEmail } from "react-icons/md";
import { IoShieldCheckmarkOutline, IoArrowBack } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
    const emailToVerify = location.state?.email;
  const inputRefs = useRef([]);
  
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!emailToVerify) { toast.error("No email found. Please sign up first."); navigate("/signup", { replace: true }); }
  }, [emailToVerify, navigate]);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleInput = (e, i) => {
    if (!/^\d*$/.test(e.target.value)) { e.target.value = ""; return; }
    if (e.target.value && i < 5) inputRefs.current[i + 1]?.focus();
  };
  const handleKeyDown = (e, i) => { if (e.key === "Backspace" && !e.target.value && i > 0) inputRefs.current[i - 1]?.focus(); };
  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    digits.forEach((c, i) => { if (inputRefs.current[i]) inputRefs.current[i].value = c; });
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };
  const getOtp = () => inputRefs.current.map((el) => el?.value ?? "").join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = getOtp();
    if (otp.length < 6) { toast.error("Please enter the complete 6-digit code."); return; }
    try {
      const res = await verifyEmail({ email: emailToVerify, otp }).unwrap();
      toast.success(res.message || "Email verified!");
      navigate("/signin");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Verification failed.");
      inputRefs.current.forEach((el) => { if (el) el.value = ""; });
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendVerification({ email: emailToVerify }).unwrap();
      toast.success(res.message || "New OTP sent!");
      setTimer(60); setCanResend(false);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to resend.");
    }
  };

  if (!emailToVerify) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark font-body p-4 transition-colors duration-300">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="rounded-2xl p-8 bg-surface-dark border border-border-dark shadow-2xl relative overflow-hidden">

          {}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/10 pointer-events-none" />

          <button type="button" onClick={() => navigate("/signup")}
            className="flex items-center gap-1.5 text-sm text-muted-dark hover:text-foreground-dark transition-colors mb-6">
            <IoArrowBack size={16} /> Back to Sign Up
          </button>

          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-5 mx-auto">
            <IoShieldCheckmarkOutline size={28} className="text-blue-400" />
          </div>

          <h1 className="text-2xl font-display font-bold text-white text-center mb-2">Verify Your Email</h1>
          <p className="text-muted-dark text-sm text-center mb-1">We sent a 6-digit code to</p>
          <div className="flex items-center justify-center gap-2 mb-7">
            <MdOutlineEmail size={16} className="text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 font-mono">{emailToVerify}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-3 mb-6" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, i) => (
                <input key={i} ref={(el) => (inputRefs.current[i] = el)}
                  type="text" inputMode="numeric" maxLength={1}
                  className="otp-input" autoFocus={i === 0}
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)} />
              ))}
            </div>
            <button type="submit" className="btn-primary" disabled={isVerifying}>
              {isVerifying ? <ClipLoader size={20} color="white" /> : <><span>Verify Email</span><RiArrowRightLine size={18} /></>}
            </button>
          </form>

          <div className="text-center mt-5">
            {canResend ? (
              <button type="button" onClick={handleResend} disabled={isResending}
                className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50">
                <TbRefresh size={16} className={isResending ? "animate-spin" : ""} />
                {isResending ? "Sending…" : "Resend OTP"}
              </button>
            ) : (
              <p className="text-muted-dark text-sm">
                Resend OTP in <span className="font-mono font-bold text-blue-400">{timer}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}