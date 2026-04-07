import { FiCheckCircle } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { MdOutlineRadar, MdOutlineWorkHistory } from "react-icons/md";

export default function StatsGrid({ provider, hasRating, ratingAvg }) {
  const cards = [
    {
      icon: <FiCheckCircle size={16} />,
      label: "Jobs Done",
      value: provider.completedJobs > 0 ? provider.completedJobs : "New",
      cls: "text-accent-hover",
      bg: "bg-accent-light dark:bg-accent/10",
    },
    {
      icon: <IoStar size={16} />,
      label: "Rating",
      value: hasRating ? `${ratingAvg.toFixed(1)}★` : "New",
      cls: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: <MdOutlineWorkHistory size={16} />,
      label: "Experience",
      value: provider.experienceYears > 0 ? `${provider.experienceYears} yrs` : "New",
      cls: "text-primary",
      bg: "bg-primary-light dark:bg-primary/10",
    },
    {
      icon: <MdOutlineRadar size={16} />,
      label: "Service Radius",
      value: `${provider.serviceRadius ?? 10} km`,
      cls: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map(({ icon, label, value, cls, bg }) => (
        <div
          key={label}
          className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg} ${cls}`}>
            {icon}
          </div>
          <p className={`text-lg font-display font-extrabold ${cls}`}>{value}</p>
          <p className="text-xs text-muted dark:text-muted-dark font-body">{label}</p>
        </div>
      ))}
    </div>
  );
}
