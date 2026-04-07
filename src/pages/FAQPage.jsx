import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FiChevronDown, FiSearch, FiMail } from "react-icons/fi";

const FAQ_CATEGORIES = [
  {
    id: "general",
    emoji: "🔹",
    label: "General",
    items: [
      {
        q: "What is LocalEase?",
        a: "LocalEase is a platform that connects users with verified local service providers for various services such as home maintenance, plumbing, electrical work, cleaning, appliance repair, and more.",
      },
      {
        q: "How does LocalEase work?",
        a: "Users can browse services, select a provider, and book services directly through the platform. Providers receive requests and complete the services. After completion, customers can leave ratings and reviews.",
      },
      {
        q: "Is LocalEase available in all locations?",
        a: "LocalEase is currently available in selected cities across India. Availability depends on verified service providers in your area. We are expanding rapidly — check the app to see if we serve your city.",
      },
    ],
  },
  {
    id: "user",
    emoji: "👤",
    label: "User Account",
    items: [
      {
        q: "How do I create an account?",
        a: "You can sign up using your email or Google account. Simply click on the Sign Up button on the homepage and follow the guided steps. Email verification may be required.",
      },
      {
        q: "How do I book a service?",
        a: (
          <ol className="list-decimal list-inside space-y-1.5 text-sm">
            <li>Browse available services on the platform</li>
            <li>Select a preferred provider from the list</li>
            <li>Choose your preferred date and time</li>
            <li>Confirm your booking and submit your requirements</li>
          </ol>
        ),
      },
      {
        q: "Can I cancel a booking?",
        a: "Yes, bookings can be cancelled from your bookings dashboard. However, cancellation policies may vary depending on the individual provider. Please review the provider's terms before cancelling.",
      },
      {
        q: "How do I make payments?",
        a: "Payments can be made using UPI, debit/credit card, net banking, wallet, or cash — depending on the provider's accepted methods. All digital payments go through a secure payment gateway.",
      },
      {
        q: "Are my payments secure?",
        a: "Yes, all payments are processed through secure third-party payment gateways (Razorpay). We never store your card details on our servers.",
      },
    ],
  },
  {
    id: "provider",
    emoji: "🧑‍🔧",
    label: "Service Providers",
    items: [
      {
        q: "How can I become a service provider?",
        a: "You can register as a provider by clicking 'Become a Provider' on the platform. Fill out the registration form, submit required documents for verification, and our team will review your application.",
      },
      {
        q: "How long does approval take?",
        a: "Approval depends on document verification and background checks. The process may take a few business days. You will be notified via email and in-app notification once approved.",
      },
      {
        q: "Can I choose which services to offer?",
        a: "Yes! After approval, you can select the services you wish to offer, set your own pricing, and manage your availability — all from your provider dashboard.",
      },
    ],
  },
  {
    id: "bookings",
    emoji: "📅",
    label: "Bookings & Services",
    items: [
      {
        q: "What happens after I book a service?",
        a: "The provider receives your request and confirms the booking. You will receive in-app and email notifications at every stage — confirmation, on the way, and service completed.",
      },
      {
        q: "Can I reschedule a booking?",
        a: "Rescheduling depends on the provider's availability and policies. You can initiate a reschedule request from your bookings dashboard and the provider will confirm or suggest alternatives.",
      },
      {
        q: "What if the provider cancels?",
        a: "If a provider cancels, you will be notified immediately. You can book another available provider for the same service or contact our support team for assistance at support@localease.com.",
      },
    ],
  },
  {
    id: "payments",
    emoji: "💳",
    label: "Payments & Refunds",
    items: [
      {
        q: "Are refunds available?",
        a: "Refunds depend on the cancellation policy and the specific service conditions. If you are eligible for a refund, it will be processed back to the original payment method within 5–7 business days.",
      },
      {
        q: "What if my payment fails?",
        a: "If your payment fails, the booking will not be confirmed. You can retry using the same or a different payment method. Your account will not be charged for failed transactions.",
      },
    ],
  },
  {
    id: "reviews",
    emoji: "⭐",
    label: "Reviews & Ratings",
    items: [
      {
        q: "Can I rate a service provider?",
        a: "Yes! After a service is marked as completed, you can leave a star rating and written review for the provider. Your feedback helps other customers make informed decisions.",
      },
      {
        q: "Can reviews be edited or deleted?",
        a: "You may be able to update your review within a limited timeframe after submission. Inappropriate, spam, or abusive reviews may be removed by our platform moderation team.",
      },
    ],
  },
  {
    id: "notifications",
    emoji: "🔔",
    label: "Notifications",
    items: [
      {
        q: "Will I receive notifications?",
        a: "Yes, you will receive real-time in-app notifications and email updates for booking confirmations, payment receipts, provider updates, and platform announcements.",
      },
    ],
  },
  {
    id: "privacy",
    emoji: "🔐",
    label: "Privacy & Security",
    items: [
      {
        q: "Is my personal data safe?",
        a: "Yes, we take security very seriously. LocalEase uses industry-standard encryption, secure authentication (JWT + Firebase), and never sells your personal data to third parties. Read our Privacy Policy for full details.",
      },
    ],
  },
  {
    id: "support",
    emoji: "📞",
    label: "Support",
    items: [
      {
        q: "How can I contact support?",
        a: (
          <span>
            You can reach our support team anytime via email at{" "}
            <a
              href="mailto:support@localease.com"
              className="text-primary hover:text-primary-hover underline underline-offset-4 font-semibold transition-colors"
            >
              📧 support@localease.com
            </a>
            . We aim to respond within 24 hours on business days.
          </span>
        ),
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle, index }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-primary/40 dark:border-primary/50 shadow-md shadow-primary/10"
          : "border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/30"
      } bg-surface-light dark:bg-surface-dark`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          {}
          <span
            className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-display font-bold flex items-center justify-center transition-colors duration-200 ${
              isOpen
                ? "bg-primary text-white"
                : "bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300"
            }`}
          >
            {index + 1}
          </span>
          <span className="text-sm sm:text-base font-display font-semibold text-foreground dark:text-foreground-dark group-hover:text-primary dark:group-hover:text-blue-300 transition-colors duration-200 leading-snug">
            {item.q}
          </span>
        </div>
        <FiChevronDown
          size={18}
          className={`flex-shrink-0 text-muted dark:text-muted-dark transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary dark:text-blue-300" : ""
          }`}
        />
      </button>

      {}
      <div
        style={{ height, overflow: "hidden", transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div ref={bodyRef}>
          <div className="px-5 pb-5 pt-1 text-sm text-muted dark:text-muted-dark font-body leading-relaxed border-t border-border dark:border-border-dark">
            <div className="pt-3">{item.a}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ category, openId, setOpenId, globalIndex }) {
  return (
    <section id={category.id}>
      {}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl" role="img" aria-label={category.label}>
          {category.emoji}
        </span>
        <h2 className="text-base sm:text-lg font-display font-bold text-foreground dark:text-foreground-dark">
          {category.label}
        </h2>
        <div className="flex-1 h-px bg-border dark:bg-border-dark" />
        <span className="text-xs text-muted dark:text-muted-dark font-body">
          {category.items.length} {category.items.length === 1 ? "question" : "questions"}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {category.items.map((item, i) => {
          const id = `${category.id}-${i}`;
          return (
            <AccordionItem
              key={id}
              item={item}
              index={globalIndex + i}
              isOpen={openId === id}
              onToggle={() => setOpenId(openId === id ? null : id)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const q = search.trim().toLowerCase();
  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        (activeTab === "all" || cat.id === activeTab) &&
        (!q ||
          item.q.toLowerCase().includes(q) ||
          (typeof item.a === "string" && item.a.toLowerCase().includes(q)))
    ),
  })).filter((cat) => cat.items.length > 0);

    const globalOffsets = {};
  let offset = 0;
  FAQ_CATEGORIES.forEach((cat) => {
    globalOffsets[cat.id] = offset;
    offset += cat.items.length;
  });

  const totalQuestions = FAQ_CATEGORIES.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-body transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {}
        <section className="relative overflow-hidden">
          {}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-24 left-1/4 w-80 h-80 rounded-full opacity-20 dark:opacity-10"
              style={{ background: "radial-gradient(circle, #1A5EA8 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15 dark:opacity-10"
              style={{ background: "radial-gradient(circle, #4CAF50 0%, transparent 70%)" }}
            />
          </div>
          {}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-15"
            style={{
              backgroundImage: "radial-gradient(circle, #1A5EA8 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 border border-primary/20 dark:border-primary/30">
              ❓ Help Center
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl font-display font-extrabold text-foreground dark:text-foreground-dark leading-tight">
              Frequently Asked{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1A5EA8, #4CAF50)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Questions
              </span>
            </h1>

            <p className="mt-4 text-muted dark:text-muted-dark text-base leading-relaxed max-w-xl mx-auto">
              Find quick answers to the most common questions about LocalEase — from
              booking your first service to managing your account.
            </p>

            {}
            <div className="mt-7 relative max-w-lg mx-auto">
              <FiSearch
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark pointer-events-none"
              />
              <input
                type="text"
                placeholder={`Search across ${totalQuestions} questions…`}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveTab("all"); }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border dark:border-border-dark bg-surface-light dark:bg-surface-dark text-foreground dark:text-foreground-dark text-sm font-body placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground dark:text-muted-dark dark:hover:text-foreground-dark transition-colors px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {}
        {!search && (
          <section className="sticky top-[68px] z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-border dark:border-border-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 min-w-max">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all duration-200 whitespace-nowrap ${
                    activeTab === "all"
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary/40 hover:text-primary dark:hover:text-blue-300"
                  }`}
                >
                  All ({totalQuestions})
                </button>
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all duration-200 whitespace-nowrap ${
                      activeTab === cat.id
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary/40 hover:text-primary dark:hover:text-blue-300"
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-display font-bold text-foreground dark:text-foreground-dark mb-2">
                No results found
              </p>
              <p className="text-sm text-muted dark:text-muted-dark">
                Try different keywords or{" "}
                <button
                  onClick={() => setSearch("")}
                  className="text-primary hover:underline font-semibold"
                >
                  clear the search
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {filteredCategories.map((cat) => (
                <CategorySection
                  key={cat.id}
                  category={cat}
                  openId={openId}
                  setOpenId={setOpenId}
                  globalIndex={globalOffsets[cat.id]}
                />
              ))}
            </div>
          )}
        </section>

        {}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            className="relative overflow-hidden rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #0F2440 0%, #1A5EA8 60%, #0a3d6f 100%)",
            }}
          >
            {}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white mx-auto mb-4">
                <FiMail size={22} />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                Still have questions?
              </h2>
              <p className="text-blue-200 text-sm mb-5 max-w-sm mx-auto">
                Can't find what you're looking for? Our support team is ready to help
                you out.
              </p>
              <a
                href="mailto:support@localease.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-display font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-lg no-underline"
              >
                <FiMail size={15} />
                support@localease.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
