import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  FiShield,
  FiMessageSquare,
  FiLock,
  FiStar,
  FiMapPin,
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineHandshake } from "react-icons/md";

const PILLARS = [
  {
    icon: <FiShield size={26} />,
    title: "Verified Providers",
    desc: "Every professional on our platform undergoes thorough background and credential verification before being listed.",
  },
  {
    icon: <FiMessageSquare size={26} />,
    title: "Clear Communication",
    desc: "We foster direct, transparent dialogue between customers and professionals so expectations are always aligned.",
  },
  {
    icon: <FiLock size={26} />,
    title: "Secure Bookings",
    desc: "From inquiry to payment, every transaction is protected with industry-standard encryption and fraud prevention.",
  },
  {
    icon: <FiStar size={26} />,
    title: "Real Reviews",
    desc: "Authentic ratings and feedback from verified customers help you make informed decisions every time.",
  },
];

const FOR_WHOM = [
  {
    icon: <FiUsers size={28} />,
    title: "For Customers",
    color: "primary",
    points: [
      "Instantly find trusted local experts",
      "Compare offers before you commit",
      "Book with confidence, pay securely",
      "Leave genuine reviews after service",
    ],
  },
  {
    icon: <FiTrendingUp size={28} />,
    title: "For Service Providers",
    color: "accent",
    points: [
      "Expand visibility to thousands of customers",
      "Receive and manage bookings efficiently",
      "Grow your business on your own terms",
      "Build a verified, trustworthy reputation",
    ],
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 border border-primary/20 dark:border-primary/30">
      {children}
    </span>
  );
}

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-body transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        { }
        <section className="relative overflow-hidden">
          { }
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 dark:opacity-10"
              style={{ background: "radial-gradient(circle, #1A5EA8 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15 dark:opacity-10"
              style={{ background: "radial-gradient(circle, #4CAF50 0%, transparent 70%)" }}
            />
          </div>

          { }
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, #1A5EA8 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center animate-fade-in-up">
            <Badge>🏠 Our Story</Badge>

            <h1 className="mt-5 text-4xl sm:text-5xl font-display font-extrabold text-foreground dark:text-foreground-dark leading-tight">
              About{" "}
              <span className="text-primary">Local</span>
              <span className="text-accent">Ease</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted dark:text-muted-dark leading-relaxed max-w-2xl mx-auto">
              A local service platform built to make everyday life easier. We connect
              customers with trusted, verified professionals for essential services —
              from plumbing to appliance repair and everything in between.
            </p>

            { }
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-border dark:bg-border-dark" />
              <span className="text-primary text-lg">✦</span>
              <div className="h-px w-16 bg-border dark:bg-border-dark" />
            </div>
          </div>
        </section>

        { }
        { }

        { }
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-fade-in-up">
            <Badge>🎯 Our Mission</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-display font-bold text-foreground dark:text-foreground-dark">
              Removing the stress of finding reliable help
            </h2>
            <p className="mt-4 text-muted dark:text-muted-dark leading-relaxed">
              Our goal is simple — remove the stress of finding reliable help nearby.
              With LocalEase, users can search services, send requirements, compare
              offers, book confidently, and share genuine reviews after completion.
            </p>

            { }
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {["Search", "Send Requirements", "Compare Offers", "Book", "Review"].map(
                (step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-display font-bold shadow-md shadow-primary/30">
                      {i + 1}
                    </div>
                    <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                      {step}
                    </p>
                    {i < 4 && (
                      <div className="hidden sm:block absolute" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        { }
        <section className="bg-surface-light dark:bg-surface-dark border-y border-border dark:border-border-dark">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10">
              <Badge>🔒 What Makes Us Different</Badge>
              <h2 className="mt-4 text-2xl sm:text-3xl font-display font-bold text-foreground dark:text-foreground-dark">
                Trust, Transparency &amp; Convenience
              </h2>
              <p className="mt-3 text-muted dark:text-muted-dark max-w-xl mx-auto text-sm">
                We've built LocalEase around four non-negotiable principles that ensure
                every interaction on our platform is reliable and rewarding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
              {PILLARS.map((pillar, i) => (
                <div
                  key={i}
                  className="relative group p-6 rounded-2xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark hover:border-primary/50 dark:hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in-up overflow-hidden"
                >
                  { }
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2 translate-x-1/2"
                    style={{ background: "radial-gradient(circle, rgba(26,94,168,0.15) 0%, transparent 70%)" }}
                  />
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 flex items-center justify-center text-primary dark:text-blue-300 mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        { }
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge>👥 Who We Serve</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-display font-bold text-foreground dark:text-foreground-dark">
              Built for everyone in the ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOR_WHOM.map((card, i) => {
              const isPrimary = card.color === "primary";
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl p-7 border ${isPrimary
                      ? "border-primary/30 dark:border-primary/40 bg-primary/5 dark:bg-primary/10"
                      : "border-accent/30 dark:border-accent/40 bg-accent/5 dark:bg-accent/10"
                    }`}
                >
                  { }
                  <div
                    className={`absolute bottom-3 right-4 opacity-5 dark:opacity-10 ${isPrimary ? "text-primary" : "text-accent"
                      }`}
                    style={{ fontSize: "7rem" }}
                  >
                    {card.icon}
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isPrimary
                        ? "bg-primary/15 dark:bg-primary/25 text-primary dark:text-blue-300"
                        : "bg-accent/15 dark:bg-accent/25 text-accent dark:text-green-300"
                      }`}
                  >
                    {card.icon}
                  </div>

                  <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark mb-4">
                    {card.title}
                  </h3>

                  <ul className="space-y-2.5">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted dark:text-muted-dark">
                        <FiCheckCircle
                          size={15}
                          className={`flex-shrink-0 mt-0.5 ${isPrimary ? "text-primary dark:text-blue-400" : "text-accent dark:text-green-400"
                            }`}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        { }
        <section className="border-t border-border dark:border-border-dark">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
              style={{
                background: "linear-gradient(135deg, #0F2440 0%, #1A5EA8 50%, #0A3D6F 100%)",
              }}
            >
              { }
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <MdOutlineHandshake size={32} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                    More than a marketplace
                  </h2>
                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                    At LocalEase, we are building a reliable local ecosystem where
                    quality service and customer confidence go hand in hand. We believe
                    every home deserves access to trusted professionals, and every
                    skilled worker deserves the opportunity to grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        { }
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <div className="p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 flex items-center justify-center text-primary dark:text-blue-300 mx-auto mb-4">
              <FiMail size={22} />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground dark:text-foreground-dark mb-2">
              Need help or have questions?
            </h2>
            <p className="text-sm text-muted dark:text-muted-dark mb-5">
              Our team is here for you. Reach out and we'll get back to you promptly.
            </p>
            <a
              href="mailto:support@localease.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-display font-bold text-sm hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 no-underline"
            >
              <FiMail size={16} />
              support@localease.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
