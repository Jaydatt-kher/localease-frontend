import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import { IoReceiptOutline } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { useGetProviderBookingDetailQuery } from "../../../../api/providerApi";
import { useGenerateCompleteOtpMutation } from "../../../../api/bookingApi";
import {
  PAYMENT_STATUS_CLS,
  PRICE_TYPE_LABEL,
  STATUS_CFG,
  fmtDate,
  fmtDateTime,
} from "./ProviderBookingsShared";
import { ProviderCancelForm } from "./ProviderCancelForm";
import { ProviderStartJobForm } from "./ProviderStartJobForm";
import { SetFinalAmountForm } from "./SetFinalAmountForm";

export function BookingDetailPanel({ bookingId, onClose }) {
  const { data: booking, isLoading, isError, refetch } = useGetProviderBookingDetailQuery(bookingId, {
    skip: !bookingId,
  });
  const [generateOtp, { isLoading: isGeneratingOtp }] = useGenerateCompleteOtpMutation();
  const [completeOtpDisplay, setCompleteOtpDisplay] = useState(null);

  const canSetAmount =
    booking &&
    ["confirmed", "in_progress"].includes(booking.bookingStatus) &&
    booking.priceType !== "fixed" &&
    booking.finalAmount == null;

  const canCancel = booking?.bookingStatus === "confirmed";
  const canStartJob = booking?.bookingStatus === "confirmed";
  const canCompleteJob = booking?.bookingStatus === "in_progress" && booking?.finalAmount != null;

  const handleGenerateCompleteOtp = async () => {
    try {
      const res = await generateOtp(booking._id).unwrap();
      setCompleteOtpDisplay(res.otp);
      toast.success("Ready for payment! Show this code to the customer.");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to generate Complete OTP.");
    }
  };

  const statusCfg = STATUS_CFG[booking?.bookingStatus] ?? STATUS_CFG.confirmed;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background-light dark:bg-background-dark shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
          <div className="flex items-center gap-2">
            <IoReceiptOutline size={18} className="text-primary" />
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Booking Details</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors">
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-14 rounded-xl" />)}
            </div>
          ) : null}

          {isError ? (
            <div className="flex flex-col items-center gap-3 py-12 text-muted dark:text-muted-dark">
              <FiAlertCircle size={30} className="text-red-400" />
              <p className="text-sm font-body">Failed to load booking.</p>
              <button onClick={refetch} className="text-primary text-sm font-semibold hover:underline">Retry</button>
            </div>
          ) : null}

          {booking ? (
            <>
              <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border font-body ${statusCfg.cls}`}>
                    {statusCfg.label}
                  </span>
                  <span className="text-[10px] text-muted dark:text-muted-dark font-mono">{booking.bookingId}</span>
                </div>
                <p className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
                  {booking.service?.name ?? "Service"}
                </p>
                {booking.service?.description ? (
                  <p className="text-xs text-muted dark:text-muted-dark font-body mt-1 line-clamp-2">
                    {booking.service.description}
                  </p>
                ) : null}
              </div>

              <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FiCalendar size={15} />
                </div>
                <div>
                  <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-0.5">Scheduled Time</p>
                  <p className="text-sm font-body font-medium text-foreground dark:text-foreground-dark">
                    {fmtDateTime(booking.scheduledTime)}
                  </p>
                </div>
              </div>

              <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 space-y-3">
                <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark">Customer</p>
                {[
                  { icon: <FiUser size={13} />, value: booking.user?.fullName },
                  { icon: <FiPhone size={13} />, value: booking.user?.mobileNo },
                  { icon: <FiMail size={13} />, value: booking.user?.email },
                  { icon: <FiMapPin size={13} />, value: booking.user?.address },
                ]
                  .filter((row) => row.value)
                  .map((row, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-body">
                      <span className="text-primary shrink-0">{row.icon}</span>
                      <span className="text-foreground dark:text-foreground-dark">{row.value}</span>
                    </div>
                  ))}
              </div>

              <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 space-y-2">
                <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark mb-2">Pricing</p>
                <div className="flex items-center justify-between text-sm font-body">
                  <span className="text-muted dark:text-muted-dark">Price Type</span>
                  <span className="font-semibold text-foreground dark:text-foreground-dark capitalize">
                    {PRICE_TYPE_LABEL[booking.priceType] ?? booking.priceType ?? "-"}
                  </span>
                </div>
                {booking.quotedPrice != null ? (
                  <div className="flex items-center justify-between text-sm font-body">
                    <span className="text-muted dark:text-muted-dark">
                      {booking.priceType === "hourly" ? "Hourly Rate" : "Quoted Price"}
                    </span>
                    <span className="font-semibold text-foreground dark:text-foreground-dark flex items-center gap-0.5">
                      <TbCurrencyRupee size={14} />{Number(booking.quotedPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                ) : null}
                {booking.hoursWorked != null ? (
                  <div className="flex items-center justify-between text-sm font-body">
                    <span className="text-muted dark:text-muted-dark">Hours Worked</span>
                    <span className="font-semibold text-foreground dark:text-foreground-dark">{booking.hoursWorked}h</span>
                  </div>
                ) : null}
                {booking.finalAmount != null ? (
                  <div className="flex items-center justify-between pt-2 border-t border-border dark:border-border-dark">
                    <span className="text-sm font-body font-bold text-foreground dark:text-foreground-dark">Final Amount</span>
                    <span className="text-base font-display font-extrabold text-accent-hover flex items-center gap-0.5">
                      <TbCurrencyRupee size={16} />{Number(booking.finalAmount).toLocaleString("en-IN")}
                    </span>
                  </div>
                ) : null}
              </div>

              {booking.payment ? (
                <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark mb-2">Payment</p>
                  <div className="flex items-center justify-between text-sm font-body">
                    <span className="text-muted dark:text-muted-dark">Status</span>
                    <span className={`font-bold capitalize ${PAYMENT_STATUS_CLS[booking.payment.paymentStatus] ?? ""}`}>
                      {booking.payment.paymentStatus}
                    </span>
                  </div>
                  {booking.payment.paymentMethod ? (
                    <div className="flex items-center justify-between text-sm font-body">
                      <span className="text-muted dark:text-muted-dark">Method</span>
                      <span className="font-semibold text-foreground dark:text-foreground-dark capitalize">
                        {booking.payment.paymentMethod.replace("_", " ")}
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {booking.cancellationReason ? (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-2xl p-4">
                  <p className="text-xs font-body font-semibold text-red-600 dark:text-red-400 mb-1">Cancellation Reason</p>
                  <p className="text-sm font-body text-red-700 dark:text-red-300">{booking.cancellationReason}</p>
                </div>
              ) : null}

              {canSetAmount ? (
                <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                  <div className="flex items-start gap-2 mb-1">
                    <FiEdit2 size={14} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-xs font-body text-muted dark:text-muted-dark">
                      {booking.priceType === "hourly"
                        ? "Enter the hours you worked to calculate the final bill."
                        : "After inspecting the job site, set the agreed final price."}
                    </p>
                  </div>
                  <SetFinalAmountForm booking={booking} onSuccess={refetch} />
                </div>
              ) : null}

              {booking.finalAmount != null && !["completed", "cancelled"].includes(booking.bookingStatus) ? (
                <div className="flex items-start gap-2 p-3 bg-accent-light dark:bg-accent/10 border border-accent/30 rounded-xl">
                  <FiCheckCircle size={14} className="text-accent-hover mt-0.5 shrink-0" />
                  <p className="text-xs font-body text-accent-hover">
                    Final amount has been set. Waiting for the customer to confirm payment.
                  </p>
                </div>
              ) : null}

              {canStartJob ? (
                <div className="bg-primary-light dark:bg-primary/10 border border-primary/20 rounded-2xl p-4">
                  <p className="text-xs font-body text-primary font-semibold mb-2">Ready to work?</p>
                  <ProviderStartJobForm bookingId={booking._id} onSuccess={refetch} />
                </div>
              ) : null}

              {canCompleteJob && !booking.completedOtp?.isUsed ? (
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-2xl p-4 flex flex-col items-center">
                  <p className="text-xs font-body text-green-700 dark:text-green-400 font-semibold mb-3 text-center">
                    Job finished? Generate an OTP for the customer to complete the booking & pay.
                  </p>

                  {!completeOtpDisplay ? (
                    <button
                      onClick={handleGenerateCompleteOtp}
                      disabled={isGeneratingOtp}
                      className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white text-xs font-body font-bold rounded-xl hover:bg-green-600 disabled:opacity-60 transition-colors w-full justify-center"
                    >
                      {isGeneratingOtp ? (
                        <AiOutlineLoading3Quarters size={14} className="animate-spin" />
                      ) : (
                        "Generate Completion OTP"
                      )}
                    </button>
                  ) : (
                    <div className="bg-white dark:bg-zinc-800 border-2 border-green-400 border-dashed rounded-xl p-4 w-full text-center">
                      <p className="text-xs text-muted dark:text-muted-dark font-body uppercase font-bold tracking-widest mb-1">
                        Completion Code
                      </p>
                      <p className="text-3xl font-mono text-green-600 dark:text-green-400 font-bold tracking-[0.2em]">
                        {completeOtpDisplay}
                      </p>
                      <p className="text-[10px] text-muted font-body mt-2">
                        The customer must enter this in their app to pay and finalize the service.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {canCancel ? (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-2xl p-4">
                  <p className="text-xs font-body text-red-500 dark:text-red-400 mb-3">
                    Only cancel if you are unable to fulfil this booking. The customer will be notified.
                  </p>
                  <ProviderCancelForm bookingId={booking._id} onSuccess={refetch} />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
