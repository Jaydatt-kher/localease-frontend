import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsProvider, selectIsAdmin } from "../../redux/authSlice";
import {
    FiMapPin, FiMail, FiPhone,
    FiTwitter, FiFacebook, FiInstagram, FiLinkedin,
} from "react-icons/fi";
import { MdOutlineBusinessCenter } from "react-icons/md";

const SERVICES_LINKS = [
    { label: "Browse Services", to: "/services" },
    { label: "Service Categories", to: "/services" },
    { label: "Nearby Providers", to: "/" },
    { label: "Book a Service", to: "/services" },
];

const COMPANY_LINKS = [
    { label: "About LocalEase", to: "/about" },
    { label: "How It Works", to: "/" },
    { label: "Become a Provider", to: "/become-provider" },
    { label: "Blog", to: "/" },
];

const SUPPORT_LINKS = [
    { label: "Help Center", to: "/faqs" },
    { label: "Contact Us", to: "/" },
    { label: "Report an Issue", to: "/" },
    { label: "FAQs", to: "/faqs" },
];

const LEGAL_LINKS = [
    { label: "Privacy Policy", to: "/privacy", target: "_blank" },
    { label: "Terms of Use", to: "/terms", target: "_blank" },
    ];

const SOCIAL = [
    { icon: <FiTwitter size={17} />, label: "Twitter", href: "#" },
    { icon: <FiFacebook size={17} />, label: "Facebook", href: "#" },
    { icon: <FiInstagram size={17} />, label: "Instagram", href: "#" },
    { icon: <FiLinkedin size={17} />, label: "LinkedIn", href: "#" },
];

function FooterColumn({ title, links }) {
    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">
                {title}
            </h4>
            <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            to={link.to}
                            className="text-sm text-muted dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors font-body no-underline"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    const isProvider = useSelector(selectIsProvider);
    const isAdmin = useSelector(selectIsAdmin);
    const year = new Date().getFullYear();

    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-border dark:border-border-dark">

            {}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                    {}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {}
                        <Link to="/" className="no-underline w-fit">
                            <img
                                src="/logo.png"
                                alt="LocalEase"
                                className="h-20 w-auto object-contain"
                                style={{ maxWidth: "200px" }}
                            />
                        </Link>

                        <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed max-w-xs">
                            Your trusted platform to discover, hire, and review local service professionals — from plumbers to painters, all in one place.
                        </p>

                        {}
                        <div className="flex flex-col gap-2">
                            {[
                                { icon: <FiMapPin size={13} />, text: "Serving cities across India" },
                                { icon: <FiMail size={13} />, text: "support@localease.in" },
                                { icon: <FiPhone size={13} />, text: "+91 98765 43210" },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-2 text-xs text-muted dark:text-muted-dark font-body">
                                    <span className="text-primary flex-shrink-0">{icon}</span>
                                    {text}
                                </div>
                            ))}
                        </div>

                        {}
                        <div className="flex items-center gap-2">
                            {SOCIAL.map(({ icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-8 h-8 rounded-xl border border-border dark:border-border-dark flex items-center justify-center text-muted dark:text-muted-dark hover:border-primary hover:text-primary dark:hover:text-blue-400 transition-colors"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {}
                    <FooterColumn title="Services" links={SERVICES_LINKS} />
                    <FooterColumn title="Company" links={COMPANY_LINKS} />
                    <FooterColumn title="Support" links={SUPPORT_LINKS} />
                </div>
            </div>

            {}
            {!isProvider && !isAdmin && (
                <div className="border-t border-border dark:border-border-dark bg-primary-light dark:bg-primary/8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                                <MdOutlineBusinessCenter size={16} className="text-white" />
                            </div>
                            <p className="text-sm font-body text-foreground dark:text-foreground-dark">
                                Are you a service professional?{" "}
                                <span className="font-semibold text-primary">Join 1000+ providers on LocalEase.</span>
                            </p>
                        </div>
                        <Link
                            to="/become-provider"
                            className="flex-shrink-0 px-4 py-2 rounded-xl bg-primary text-white text-xs font-body font-bold hover:bg-primary-hover transition-colors no-underline"
                        >
                            Become a Provider →
                        </Link>
                    </div>
                </div>
            )}

            {}
            <div className="border-t border-border dark:border-border-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-muted dark:text-muted-dark font-body">
                        © {year} LocalEase Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {LEGAL_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                target={link.target}
                                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                                className="text-xs text-muted dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 transition-colors font-body no-underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}