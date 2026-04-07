import { MdOutlineVerified } from "react-icons/md";

export function VerificationNotice({ profile, onGoProfile }) {
  if (!profile || profile.isVerified) {
    return null;
  }

  return (
    <div className="border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <MdOutlineVerified size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-display font-bold text-amber-700 dark:text-amber-300">Verification Pending</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-body mt-1 leading-relaxed">
            Your profile is under review. Once verified, you will get a badge and rank higher in search results.
          </p>
          {profile.documents?.length === 0 ? (
            <button
              onClick={onGoProfile}
              className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline font-body"
            >
              Upload documents to speed up verification →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
