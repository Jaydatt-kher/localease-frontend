import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import { SingleImageUploader } from "../../../../components/ui/ImageUploader";
import MobileVerifyField from "../../../../components/ui/MobileVerifyField";
import {
  useSendOtpMobileMutation,
  useUpdateMyProfileMutation,
  useVerifyOtpMobileMutation,
} from "../../../../api/userApi";
import { EditableField } from "./EditableField";

export function EditTab({ profile, refetch }) {
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();
  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMobileMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMobileMutation();
  const [photoUrl, setPhotoUrl] = useState(profile?.photoUrl ?? "");

  const handleSave = useCallback(
    async (field, value) => {
      try {
        await updateProfile({ [field]: value }).unwrap();
        toast.success("Profile updated!");
        refetch();
      } catch (e) {
        toast.error(e?.data?.message || "Failed to update.");
      }
    },
    [updateProfile, refetch]
  );

  const handleSaveMobile = async (newMobile) => {
    try {
      await updateProfile({ mobileNo: newMobile }).unwrap();
      toast.success("Mobile number saved! Verify it via OTP.");
      refetch();
    } catch (e) {
      toast.error(e?.data?.message || "Failed to save mobile number.");
    }
  };

  const handlePhotoSave = async (url) => {
    setPhotoUrl(url);
    try {
      await updateProfile({ photoUrl: url }).unwrap();
      toast.success("Photo updated!");
      refetch();
    } catch (e) {
      toast.error(e?.data?.message || "Failed to update photo.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6">
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-4">Profile Photo</p>
        <div className="flex items-center gap-6">
          <SingleImageUploader value={photoUrl} onUploaded={handlePhotoSave} folder="localease/profiles" label="Upload Photo" />
          <div className="flex-1">
            <p className="text-xs font-body text-muted dark:text-muted-dark leading-relaxed">
              A profile photo helps providers recognise you when they arrive. Use a clear, well-lit photo. JPG or PNG, max 5 MB.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl px-5 py-2">
        <EditableField
          label="Full Name"
          icon={<FiUser size={14} />}
          value={profile?.fullName}
          placeholder="Add your full name"
          onSave={(v) => handleSave("fullName", v)}
          saving={isLoading}
        />
        <EditableField
          label="Address"
          icon={<FiMapPin size={14} />}
          value={profile?.address}
          placeholder="Add your address"
          onSave={(v) => handleSave("address", v)}
          saving={isLoading}
        />

        <div className="flex items-start gap-3 py-4">
          <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <FiMail size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1">Email Address</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-body text-foreground dark:text-foreground-dark font-medium flex-1 truncate">{profile?.email}</p>
              {profile?.isEmailVerified ? (
                <span className="text-xs font-body font-semibold text-accent-hover flex items-center gap-1 shrink-0">
                  <HiCheckBadge size={13} />Verified
                </span>
              ) : (
                <span className="text-xs font-body font-semibold text-amber-600 shrink-0">Unverified</span>
              )}
            </div>
            <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-0.5">Email cannot be changed.</p>
          </div>
        </div>
      </div>

      <MobileVerifyField
        mobileNo={profile?.mobileNo}
        isMobileVerified={profile?.isMobileVerified}
        isSaving={isLoading}
        onSave={handleSaveMobile}
        onSendOtp={sendOtp}
        onVerifyOtp={verifyOtp}
        sendingOtp={sendingOtp}
        verifyingOtp={verifyingOtp}
      />

      <div className="hidden" aria-hidden>
        <FiPhone size={1} />
      </div>
    </div>
  );
}
