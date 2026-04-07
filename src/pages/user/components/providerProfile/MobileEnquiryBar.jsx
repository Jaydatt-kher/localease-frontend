import { FiMessageSquare } from "react-icons/fi";

export default function MobileEnquiryBar({ isVacation, user, businessName, onEnquiry }) {
  if (isVacation) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface-light dark:bg-surface-dark border-t border-border dark:border-border-dark px-4 py-3">
        <button
          onClick={() => onEnquiry(null, businessName)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-body font-bold rounded-2xl hover:bg-primary-hover transition-colors text-sm shadow-lg"
        >
          <FiMessageSquare size={16} />
          {user
            ? `Send Enquiry to ${businessName?.split(" ")[0]}`
            : "Send Enquiry (Sign In Required)"}
        </button>
      </div>
      <div className="h-20 md:hidden" />
    </>
  );
}
