import { TbCurrencyRupee, TbWallet } from "react-icons/tb";

const TAB_CONFIG = [
  { key: "wallet", label: "Wallet History", icon: <TbWallet size={14} /> },
  { key: "earnings", label: "Payment Records", icon: <TbCurrencyRupee size={14} /> },
];

export function WalletTabs({ tab, onChange }) {
  return (
    <div className="flex gap-1 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-1">
      {TAB_CONFIG.map((tabConfig) => (
        <button
          key={tabConfig.key}
          onClick={() => onChange(tabConfig.key)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold font-body transition-all ${tab === tabConfig.key ? "bg-primary text-white shadow-sm" : "text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"}`}
        >
          {tabConfig.icon} {tabConfig.label}
        </button>
      ))}
    </div>
  );
}
