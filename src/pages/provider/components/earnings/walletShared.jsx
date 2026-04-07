export const fmt = (n = 0) => "₹" + Number(n).toLocaleString("en-IN");

export const fmtDt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const PURPOSE_LABEL = {
  commission_deduction: "Commission Deducted",
  platform_payout: "Online Payment Routed",
  wallet_recharge: "Wallet Recharged",
  wallet_withdrawal: "Withdrawal",
  refund_penalty: "Refund Penalty",
};

export const PURPOSE_COLOR = {
  commission_deduction: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
  platform_payout: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
  wallet_recharge: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  wallet_withdrawal: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
  refund_penalty: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
};

export function Sk({ className = "" }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}
