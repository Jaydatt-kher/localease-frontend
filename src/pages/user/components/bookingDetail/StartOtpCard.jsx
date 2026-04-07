import { FiCheckCircle } from "react-icons/fi";

export default function StartOtpCard({ show }) {
  if (!show) return null;

  return (
    <div className="bg-primary-light dark:bg-primary/10 border border-primary/20 rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
        <FiCheckCircle size={20} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-0.5">
          Start OTP
        </p>
        <p className="text-xs text-muted dark:text-muted-dark font-body">
          Share this with the provider when they arrive to begin the job.
        </p>
      </div>
      <p className="text-3xl font-mono font-extrabold text-primary tracking-[0.3em]">****</p>
      <p className="text-[11px] text-muted dark:text-muted-dark font-body">
        The OTP was shown when you confirmed the booking. Check your booking confirmation.
      </p>
    </div>
  );
}
