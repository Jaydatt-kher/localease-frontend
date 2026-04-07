import { FiCheckCircle, FiClock } from "react-icons/fi";
import { TbArrowsUpDown } from "react-icons/tb";

export function SummaryCards({ totalEarned, pendingEarned, totalCommission, fmt }) {
  const cards = [
    {
      label: "Total Earned",
      value: fmt(totalEarned),
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      icon: <FiCheckCircle size={18} />,
    },
    {
      label: "Pending",
      value: fmt(pendingEarned),
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      icon: <FiClock size={18} />,
    },
    {
      label: "Commission Paid",
      value: fmt(totalCommission),
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      icon: <TbArrowsUpDown size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
          <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-3`}>{card.icon}</div>
          <p className="text-xl font-display font-extrabold text-foreground dark:text-foreground-dark">{card.value}</p>
          <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
