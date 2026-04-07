import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function TermsAndConditionsPage() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-body transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-fade-in-up">
        <h1 className="text-3xl font-display font-extrabold text-foreground dark:text-foreground-dark mb-2">📄 Terms & Conditions</h1>
        <p className="text-sm text-muted dark:text-muted-dark mb-10 pb-4 border-b border-border dark:border-border-dark">Last Updated: April 1, 2026</p>

        <article className="text-foreground dark:text-foreground-dark font-body leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">1. Introduction</h2>
            <p>Welcome to LocalEase (“Platform”, “we”, “our”, “us”). These Terms and Conditions govern your use of our platform, including our website and related services.</p>
            <p className="mt-2">By accessing or using LocalEase, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">2. About LocalEase</h2>
            <p>LocalEase is a local service management platform that connects users with service providers. We act as an intermediary platform and do not directly provide services.</p>
            <p className="mt-2">All services listed on the platform are provided by independent third-party service providers.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">3. Eligibility</h2>
            <p className="mb-3">To use LocalEase, you must:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
            <p className="text-sm font-semibold">We reserve the right to suspend or terminate accounts that do not meet these requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">4. User Accounts</h2>
            <p className="mb-3">To access certain features, you must create an account.</p>
            <p className="mb-3">You agree to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
            <p className="text-sm font-semibold text-muted dark:text-muted-dark">We are not responsible for any loss resulting from unauthorized use of your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">5. Service Providers</h2>
            <p className="mb-3">Service providers listed on LocalEase are independent individuals or businesses.</p>
            <p className="mb-3">They are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Delivering services professionally</li>
              <li>Maintaining quality and safety</li>
              <li>Complying with applicable laws</li>
            </ul>
            <p className="text-sm text-amber-600 dark:text-amber-500">LocalEase does not guarantee the quality, safety, or legality of services provided by third-party providers.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">6. Bookings</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Users can request services through the platform</li>
              <li>Service providers may accept or reject requests</li>
              <li>A booking is confirmed only after mutual agreement</li>
            </ul>
            <p className="text-sm text-muted dark:text-muted-dark">LocalEase reserves the right to cancel or modify bookings in certain situations.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">7. Payments</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Payments may be processed through third-party payment gateways</li>
              <li>Users agree to pay all applicable charges for services</li>
              <li>LocalEase may charge a commission on transactions</li>
            </ul>
            <div className="mt-4 p-4 bg-accent-light/50 dark:bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm">👉 <strong>Note:</strong> We do not store sensitive payment information such as card details.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">8. Cancellations & Refunds</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Cancellation policies may vary depending on the service provider</li>
              <li>Refunds, if applicable, are subject to the provider’s policy</li>
              <li>LocalEase may assist in resolving disputes but is not responsible for refund decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">9. Reviews & Feedback</h2>
            <p className="mb-3">Users may submit reviews and ratings after completing a service.</p>
            <p className="mb-3">You agree that:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Reviews must be honest and respectful</li>
              <li>You will not post abusive, defamatory, or misleading content</li>
            </ul>
            <p className="text-sm">LocalEase reserves the right to remove any content that violates these guidelines.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">10. Prohibited Activities</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-4">
              <li>Use the platform for illegal purposes</li>
              <li>Post false or misleading information</li>
              <li>Attempt to hack, disrupt, or damage the platform</li>
              <li>Harass or abuse other users or service providers</li>
              <li>Engage in fraudulent activities</li>
            </ul>
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300">❌ Violation of these rules may result in account suspension or termination.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">11. Notifications</h2>
            <p className="mb-3">LocalEase may send notifications related to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Bookings</li>
              <li>Payments</li>
              <li>Account updates</li>
              <li>System alerts</li>
            </ul>
            <p className="text-sm text-muted dark:text-muted-dark">These notifications are system-generated and for informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">12. Intellectual Property</h2>
            <p className="mb-2">All content on LocalEase, including logos, design, and software, is the property of LocalEase or its licensors.</p>
            <p>You may not copy, modify, or distribute any part of the platform without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">13. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm">
              <li>LocalEase is not liable for any damages arising from the use of the platform</li>
              <li>We are not responsible for disputes between users and service providers</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">14. Disclaimer</h2>
            <p className="mb-3">LocalEase is provided on an “as is” and “as available” basis.</p>
            <p className="mb-3">We do not make any warranties regarding:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm">
              <li>Service quality</li>
              <li>Accuracy of information</li>
              <li>Availability of services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">15. Account Suspension & Termination</h2>
            <p className="mb-3">We reserve the right to suspend or terminate your account if:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>You violate these Terms</li>
              <li>You engage in suspicious or fraudulent activity</li>
              <li>You misuse the platform</li>
            </ul>
            <p className="text-sm text-red-600 dark:text-red-400">Termination may occur without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">16. Modifications to Terms</h2>
            <p className="mb-2">We may update or modify these Terms at any time.</p>
            <p>Continued use of the platform after changes implies acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">17. Third-Party Services</h2>
            <p className="mb-3">LocalEase integrates with third-party services such as:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li><strong>Payment gateways</strong></li>
              <li><strong>Authentication providers</strong> (e.g., Firebase)</li>
              <li><strong>Email services</strong> (e.g., Nodemailer)</li>
            </ul>
            <p className="text-sm text-muted dark:text-muted-dark">We are not responsible for the practices or policies of third-party services.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">18. Privacy</h2>
            <p>Your use of LocalEase is also governed by our Privacy Policy, which explains how we collect and use your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">19. Governing Law</h2>
            <p>These Terms shall be governed by and interpreted in accordance with the laws of your country/region.</p>
          </section>

          <section className="pt-4 mt-6 border-t border-border dark:border-border-dark">
            <h2 className="text-xl font-display font-bold mb-3 text-primary">20. Contact Us</h2>
            <p className="mb-2">If you have any questions about these Terms, you can contact us at:</p>
            <p className="text-lg font-semibold flex items-center gap-2 mt-3">
              📧 <a href="mailto:support@localease.com" className="text-primary hover:text-primary-hover transition-colors underline underline-offset-4">support@localease.com</a>
            </p>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
