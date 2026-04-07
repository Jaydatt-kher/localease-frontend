import { FiAlignLeft, FiClock } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";

const TIPS = [
  {
    icon: <TbCurrencyRupee size={18} />,
    title: "Competitive Pricing",
    desc: "Check similar providers in your area and price competitively to attract more bookings.",
  },
  {
    icon: <FiClock size={18} />,
    title: "Accurate Duration",
    desc: "Setting realistic durations helps customers plan their day and reduces cancellations.",
  },
  {
    icon: <FiAlignLeft size={18} />,
    title: "Detailed Description",
    desc: "Services with descriptions get 3× more enquiries. Mention what's included and excluded.",
  },
];

export function ProviderServicesTips() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TIPS.map((tip) => (
        <div key={tip.title} className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary mb-3">
            {tip.icon}
          </div>
          <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1">{tip.title}</p>
          <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">{tip.desc}</p>
        </div>
      ))}
    </div>
  );
}
