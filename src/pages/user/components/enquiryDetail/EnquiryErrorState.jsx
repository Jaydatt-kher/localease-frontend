import Navbar from "../../../../components/layout/Navbar";
import { FiAlertCircle } from "react-icons/fi";

export default function EnquiryErrorState({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        <FiAlertCircle size={40} className="text-muted dark:text-muted-dark opacity-30" />
        <p className="font-body text-sm text-muted dark:text-muted-dark">Enquiry not found.</p>
        <button
          onClick={onBack}
          className="text-primary text-sm font-semibold font-body hover:underline"
        >
          ← Back to requests
        </button>
      </main>
    </div>
  );
}
