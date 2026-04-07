import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

export default function ProviderNotFoundState({ onBack }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
      <MdOutlineVerified size={48} className="text-muted dark:text-muted-dark opacity-30" />
      <h2 className="text-xl font-display font-bold text-foreground dark:text-foreground-dark">
        Provider not found
      </h2>
      <p className="text-sm text-muted dark:text-muted-dark font-body">
        This profile may have been removed or is no longer available.
      </p>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-body font-semibold rounded-xl hover:bg-primary-hover transition-colors"
      >
        <FiArrowLeft size={15} /> Go back
      </button>
    </main>
  );
}
