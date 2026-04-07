import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CompleteAndPayCard({
  show,
  finalAmount,
  cashOnServiceThreshold,
  completeOtp,
  setCompleteOtp,
  onPay,
  isInitiating,
  isVerifying,
}) {
  if (!show) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-2xl p-5 flex flex-col items-center text-center">
      <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">
        Job Complete? Ready to Pay?
      </p>
      <p className="text-xs font-body text-muted dark:text-muted-dark mb-4 max-w-sm">
        Ask the provider for the Completion OTP. Once entered, select your payment method to finalize
        the service. (Amount adds 10% platform commission)
      </p>
      <input
        type="text"
        maxLength={4}
        value={completeOtp}
        onChange={(e) => setCompleteOtp(e.target.value)}
        placeholder="e.g. 5678"
        className="w-full max-w-[200px] mb-4 px-3 py-2 text-xl rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-green-500 font-body transition-colors text-center font-mono tracking-widest"
      />
      <div className="flex w-full max-w-[300px] gap-2">
        {finalAmount < cashOnServiceThreshold && (
          <button
            onClick={() => onPay("cash_on_service")}
            disabled={isInitiating}
            className="flex-1 px-4 py-2 border border-green-500 text-green-600 dark:text-green-400 font-bold text-xs rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 disabled:opacity-60 transition-colors"
          >
            Pay Cash
          </button>
        )}
        <button
          onClick={() => onPay("online")}
          disabled={isInitiating}
          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl disabled:opacity-60 transition-colors flex justify-center items-center"
        >
          {isInitiating || isVerifying ? (
            <AiOutlineLoading3Quarters size={14} className="animate-spin" />
          ) : (
            "Pay Online"
          )}
        </button>
      </div>
    </div>
  );
}
