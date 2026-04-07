import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectIsProvider, selectIsAdmin } from "../../redux/authSlice";
import {
  FiArrowRight, FiCheckCircle,
} from "react-icons/fi";
import {
  MdOutlineBusinessCenter,
  MdOutlineTrendingUp,
  MdOutlineSchedule,
  MdOutlinePayment,
} from "react-icons/md";

const PERKS = [
  { icon: <MdOutlineTrendingUp size={20} />,   title: "Grow Your Business",  desc: "Get a steady stream of customers in your area without spending on ads." },
  { icon: <MdOutlineSchedule size={20} />,     title: "Work on Your Terms",  desc: "Set your own hours, service radius, and availability. You're in control." },
  { icon: <MdOutlinePayment size={20} />,      title: "Get Paid Fast",       desc: "Receive payments directly to your bank or UPI account after every job." },
  { icon: <MdOutlineBusinessCenter size={20}/>,title: "Free to Join",        desc: "No upfront fees. Create your profile and start receiving enquiries today." },
];

export default function BecomeProviderBanner() {
  const navigate   = useNavigate();
  const user       = useSelector(selectUser);
  const isProvider = useSelector(selectIsProvider);
  const isAdmin    = useSelector(selectIsAdmin);

    if (isProvider || isAdmin) return null;

  return (
    <section className="py-16 bg-background-light dark:bg-background-dark border-t border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A3D6F] via-primary to-[#1a6abf] dark:from-[#061224] dark:via-[#0A3D6F] dark:to-primary p-8 md:p-12">

          {}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />

          {}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-accent/10 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {}
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white font-body">
                <MdOutlineBusinessCenter size={13} /> For Service Professionals
              </div>

              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-display font-extrabold text-white leading-tight">
                Turn Your Skills into
                <br />
                <span className="text-accent">a Thriving Business</span>
              </h2>

              <p className="text-white/75 text-base font-body leading-relaxed max-w-md">
                Join 1000+ verified professionals on LocalEase. Reach customers near you, manage bookings effortlessly, and grow your income — all in one place.
              </p>

              {}
              <div className="flex flex-col gap-2">
                {[
                  "Free profile — no upfront cost",
                  "Customers come to you",
                  "Payments secured & fast",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/85 font-body">
                    <FiCheckCircle size={15} className="text-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {}
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  onClick={() => navigate(user ? "/become-provider" : "/signup")}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-display font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-lg hover:-translate-y-0.5 text-sm"
                >
                  {user ? "Create Provider Profile" : "Get Started Free"}
                  <FiArrowRight size={16} />
                </button>

                {!user && (
                  <button
                    onClick={() => navigate("/signin")}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/25 text-white font-body font-semibold rounded-2xl hover:bg-white/15 transition-all text-sm backdrop-blur-sm"
                  >
                    Already have an account? Sign in
                  </button>
                )}
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERKS.map((perk) => (
                <div
                  key={perk.title}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm hover:bg-white/12 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    {perk.icon}
                  </div>
                  <p className="text-sm font-display font-bold text-white">{perk.title}</p>
                  <p className="text-xs text-white/65 font-body leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}