import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useStartProviderJobMutation } from "../../../../api/bookingApi";

export function ProviderStartJobForm({ bookingId, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [startJob, { isLoading }] = useStartProviderJobMutation();

  const handleStart = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    try {
      await startJob({ id: bookingId, otp }).unwrap();
      toast.success("Job started successfully. Status updated to In Progress.");
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to start job.");
    }
  };

  return (
    <form onSubmit={handleStart} className="space-y-3 mt-2">
      <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark mb-1">Enter Start OTP from Customer</p>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="e.g. 1234"
          className="w-full px-3 py-2 text-xs rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary font-body transition-colors text-center font-mono tracking-widest"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-body font-bold rounded-xl hover:bg-primary-hover disabled:opacity-60 transition-colors"
        >
          {isLoading ? <AiOutlineLoading3Quarters size={12} className="animate-spin" /> : "Start Job"}
        </button>
      </div>
    </form>
  );
}
