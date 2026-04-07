import { Phone } from "lucide-react";
import MobileVerifyField from "../../../../components/ui/MobileVerifyField";

export function MyProfileMobileVerificationCard({
  user,
  updatingProfile,
  onSaveMobile,
  onSendOtp,
  onVerifyOtp,
  sendingOtp,
  verifyingOtp,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-border-dark flex items-center gap-3">
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">
            Mobile Verification
          </h3>
          <p className="text-[13px] font-body text-muted dark:text-muted-dark mt-0.5">
            Verify your phone number via Twilio SMS OTP
          </p>
        </div>
      </div>
      <div className="p-6">
        <MobileVerifyField
          mobileNo={user?.mobileNo}
          isMobileVerified={user?.isMobileVerified}
          isSaving={updatingProfile}
          onSave={onSaveMobile}
          onSendOtp={onSendOtp}
          onVerifyOtp={onVerifyOtp}
          sendingOtp={sendingOtp}
          verifyingOtp={verifyingOtp}
        />
      </div>
    </div>
  );
}
