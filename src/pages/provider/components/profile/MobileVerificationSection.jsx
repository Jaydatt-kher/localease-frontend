import MobileVerifyField from "../../../../components/ui/MobileVerifyField";
import { SectionCard } from "./ProfileShared";

export function MobileVerificationSection({ profile, onSaveMobile, onSendOtp, onVerifyOtp, sendingOtp, verifyingOtp }) {
  return (
    <SectionCard title="Mobile Number" subtitle="Verify your phone number via Twilio SMS OTP">
      <MobileVerifyField
        mobileNo={profile?.mobileNo}
        isMobileVerified={profile?.isMobileVerified}
        isSaving={false}
        onSave={onSaveMobile}
        onSendOtp={onSendOtp}
        onVerifyOtp={onVerifyOtp}
        sendingOtp={sendingOtp}
        verifyingOtp={verifyingOtp}
      />
    </SectionCard>
  );
}
