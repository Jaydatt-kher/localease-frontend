import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { fmtDate, fmtDateTime } from "./enquiryDetailShared";

export default function OtpSuccessModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-7 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-light dark:bg-accent/10 flex items-center justify-center">
          <FiCheckCircle size={32} className="text-accent" />
        </div>
        <h2 className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark">
          Booking Confirmed! 🎉
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark font-body">
          Show this OTP to the provider when they arrive to start the job.
        </p>

        <div className="w-full px-6 py-4 rounded-2xl bg-primary-light dark:bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted dark:text-muted-dark font-body mb-1">Your Start OTP</p>
          <p className="text-4xl font-mono font-extrabold text-primary tracking-[0.3em]">{booking.otp}</p>
          <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-2">
            Valid until {fmtDate(booking.otpExpires)}
          </p>
        </div>

        <div className="w-full text-left space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted dark:text-muted-dark font-body">
            <FiCalendar size={13} className="text-primary" />
            Scheduled: {fmtDateTime(booking.scheduledTime)}
          </div>
          <div className="flex items-center gap-2 text-muted dark:text-muted-dark font-body">
            <span className="text-primary text-xs">Ref:</span>
            <span className="font-mono text-xs">{booking.bookingRef}</span>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-border dark:border-border-dark rounded-xl text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/my-bookings";
            }}
            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-body font-bold hover:bg-primary-hover transition-colors"
          >
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
