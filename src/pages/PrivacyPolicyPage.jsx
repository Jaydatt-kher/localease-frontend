import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PrivacyPolicyPage() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-body transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-fade-in-up">
        <h1 className="text-3xl font-display font-extrabold text-foreground dark:text-foreground-dark mb-2">🔐 Privacy Policy</h1>
        <p className="text-sm text-muted dark:text-muted-dark mb-10 pb-4 border-b border-border dark:border-border-dark">Last Updated: April 1, 2026</p>

        <article className="text-foreground dark:text-foreground-dark font-body leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">1. Introduction</h2>
            <p>Welcome to LocalEase (“Platform”, “we”, “our”, “us”). We value your privacy and are committed to protecting your personal information.</p>
            <p className="mt-2">This Privacy Policy explains how we collect, use, store, and protect your data when you use our platform.</p>
            <p className="mt-2">By using LocalEase, you agree to the practices described in this policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            
            <div className="ml-4 space-y-5">
              <div>
                <h3 className="text-lg font-semibold mb-2">2.1 Personal Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Profile information</li>
                  <li>Location (if shared)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2.2 Account Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Login credentials (encrypted)</li>
                  <li>Authentication details (including Google Auth via Firebase)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2.3 Usage Data</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Services you browse or book</li>
                  <li>Interaction history</li>
                  <li>Device and browser information</li>
                  <li>IP address</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2.4 Transaction Data</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Booking details</li>
                  <li>Payment status</li>
                  <li>Transaction history</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent-light/50 dark:bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm">👉 <strong>Note:</strong> We do NOT store sensitive payment details like card numbers.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">3. How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm">
              <li>Provide and manage services</li>
              <li>Process bookings and payments</li>
              <li>Facilitate communication between users and providers</li>
              <li>Send notifications and updates</li>
              <li>Improve platform performance and user experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">4. Sharing of Information</h2>
            <p className="mb-4">We may share your information with:</p>
            
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-base font-semibold mb-1">4.1 Service Providers</h3>
                <p className="text-sm text-muted dark:text-muted-dark">To complete bookings and service requests</p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1">4.2 Payment Gateways</h3>
                <p className="text-sm text-muted dark:text-muted-dark">To process transactions securely</p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-1">4.3 Third-Party Services</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Authentication providers (e.g., Firebase for Google login)</li>
                  <li>Email services (e.g., Nodemailer)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300">❌ We do NOT sell or rent your personal data to third parties.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">5. Data Security</h2>
            <p className="mb-3">We take appropriate security measures to protect your data, including:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm">
              <li>Encryption of sensitive information</li>
              <li>Secure authentication systems (JWT, Firebase)</li>
              <li>Controlled access to data</li>
            </ul>
            <p className="mt-4 text-sm text-muted dark:text-muted-dark italic">However, no system is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">6. Cookies & Tracking Technologies</h2>
            <p className="mb-3">We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Improve user experience</li>
              <li>Remember user preferences</li>
              <li>Analyze platform usage</li>
            </ul>
            <p className="text-sm">You can control or disable cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">7. User Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Request deletion of your account and data</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>
            <p className="text-sm">To exercise these rights, contact us at the email provided below.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">8. Data Retention</h2>
            <p className="mb-3">We retain your information only as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-3">
              <li>Provide services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
            </ul>
            <p className="text-sm">After that, your data may be securely deleted.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">9. Third-Party Services</h2>
            <p className="mb-3">LocalEase uses third-party services, including:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-4">
              <li><strong>Firebase</strong> – for Google authentication</li>
              <li><strong>Nodemailer</strong> – for email communication</li>
              <li><strong>Razorpay</strong> – for payment processing</li>
              <li><strong>Twilio</strong> (optional) – for SMS services</li>
            </ul>
            <p className="text-sm">These services have their own privacy policies, and we encourage you to review them.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">10. Children’s Privacy</h2>
            <p className="mb-2">LocalEase is not intended for individuals under the age of 18.</p>
            <p>We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">11. International Data Transfers</h2>
            <p>Your data may be stored or processed in servers located outside your country. By using our platform, you consent to such transfers.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">12. Changes to This Privacy Policy</h2>
            <p className="mb-2">We may update this Privacy Policy from time to time.</p>
            <p>Any changes will be posted on this page with an updated “Last Updated” date.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-3 text-primary">13. Limitation of Liability</h2>
            <p className="mb-3">LocalEase is not responsible for:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm">
              <li>Data breaches caused by third-party services</li>
              <li>Misuse of information by service providers</li>
              <li>Loss or unauthorized access beyond our control</li>
            </ul>
          </section>

          <section className="pt-4 mt-6 border-t border-border dark:border-border-dark">
            <h2 className="text-xl font-display font-bold mb-3 text-primary">14. Contact Us</h2>
            <p className="mb-2">If you have any questions or concerns about this Privacy Policy, please contact us:</p>
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
