import { FiSearch, FiSend, FiCheckSquare, FiStar } from "react-icons/fi";

const STEPS = [
  { num: "01", icon: <FiSearch size={22} />,      title: "Search a Service",       desc: "Browse categories or search by name. Filter by rating, price & availability.", color: "text-primary", bg: "bg-primary-light dark:bg-primary/10", border: "hover:border-primary" },
  { num: "02", icon: <FiSend size={22} />,         title: "Send Enquiry",           desc: "Share your requirement. Nearby verified providers send you competitive bids.",  color: "text-accent-hover", bg: "bg-accent-light dark:bg-accent/10", border: "hover:border-accent" },
  { num: "03", icon: <FiCheckSquare size={22} />,  title: "Accept the Best Bid",    desc: "Compare on price, rating & experience. Accept the bid that suits you best.",    color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", border: "hover:border-amber-400" },
  { num: "04", icon: <FiStar size={22} />,         title: "Review & Rebook",        desc: "Rate the provider after completion and earn loyalty points for next booking.",   color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", border: "hover:border-purple-400" },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">How LocalEase Works</h2>
          <p className="text-sm text-muted dark:text-muted-dark mt-2 font-body">Book a trusted professional in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {STEPS.map((step, i) => (
            <div key={step.num}
              className={`animate-fade-in-up relative bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all ${step.border}`}>
              {}
              <p className={`text-xs font-bold font-mono ${step.color} tracking-widest mb-4`}>{step.num}</p>
              {}
              <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center mb-4`}>
                <span className={step.color}>{step.icon}</span>
              </div>
              {}
              <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-2">{step.title}</h3>
              <p className="text-sm text-muted dark:text-muted-dark leading-relaxed font-body">{step.desc}</p>
              {}
              {i < STEPS.length - 1 && (
                <span className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark text-xl z-10 select-none">›</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "10,000+", label: "Verified Providers", emoji: "🛠️" },
  { value: "50,000+", label: "Happy Customers",    emoji: "😊" },
  { value: "4.8★",    label: "Average Rating",     emoji: "⭐" },
  { value: "25+",     label: "Service Categories", emoji: "📋" },
];

export function StatsSection() {
  return (
    <section className="py-14 bg-[#0A3D6F] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center stagger">
          {STATS.map((stat) => (
            <div key={stat.label} className="animate-fade-in-up">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-display font-extrabold text-white leading-none mb-1">{stat.value}</p>
              <p className="text-sm text-white/65 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}