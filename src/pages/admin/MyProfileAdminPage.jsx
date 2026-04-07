import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAdminSendOtpMobileMutation,
  useAdminVerifyOtpMobileMutation,
  useGetAdminProfileQuery,
  useUpdateAdminPasswordMutation,
  useUpdateAdminProfileMutation,
} from "../../api/adminApi";
import { MyProfileAccountInfoCard } from "./components/myProfile/MyProfileAccountInfoCard";
import { MyProfileEditDetailsCard } from "./components/myProfile/MyProfileEditDetailsCard";
import { MyProfileHeader } from "./components/myProfile/MyProfileHeader";
import { MyProfileLoadingState } from "./components/myProfile/MyProfileLoadingState";
import { MyProfileMobileVerificationCard } from "./components/myProfile/MyProfileMobileVerificationCard";
import { MyProfilePasswordCard } from "./components/myProfile/MyProfilePasswordCard";
import { MyProfileSidebarProfileCard } from "./components/myProfile/MyProfileSidebarProfileCard";

export default function MyProfileAdminPage() {
  const { data: profileData, isLoading: profileLoading, refetch } = useGetAdminProfileQuery();
  const [updateProfile, { isLoading: updatingProfile }] = useUpdateAdminProfileMutation();
  const [updatePassword, { isLoading: updatingPassword }] = useUpdateAdminPasswordMutation();
  const [adminSendOtp, { isLoading: sendingOtp }] = useAdminSendOtpMobileMutation();
  const [adminVerifyOtp, { isLoading: verifyingOtp }] = useAdminVerifyOtpMobileMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (profileData?.user) {
      setName(profileData.user.fullName || "");
      setEmail(profileData.user.email || "");
      setPhone(profileData.user.mobileNo || "");
      setPhotoUrl(profileData.user.photoUrl || "");
    }
  }, [profileData]);

  const user = profileData?.user;

  const accountCreatedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "-";

  const lastUpdateDate = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "AD";

  const handleSaveProfile = async () => {
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      toast.error("Please fill name and email correctly");
      return;
    }

    try {
      await updateProfile({ fullName: name, email, mobileNo: phone || null, photoUrl }).unwrap();
      toast.success("Profile updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to update profile");
    }
  };

  const handleSaveMobile = async (newMobile) => {
    try {
      await updateProfile({
        fullName: name,
        email,
        mobileNo: newMobile,
        photoUrl,
      }).unwrap();
      setPhone(newMobile);
      toast.success("Mobile number saved! Verify it via OTP.");
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to save mobile number");
    }
  };

  const handlePhotoSave = async (url) => {
    setPhotoUrl(url);

    try {
      await updateProfile({
        fullName: name,
        email,
        mobileNo: phone || null,
        photoUrl: url,
      }).unwrap();
      toast.success("Photo updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to update photo");
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update password");
    }
  };

  if (profileLoading) {
    return <MyProfileLoadingState />;
  }

  return (
    <div className="space-y-6">
      <MyProfileHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in-up">
        <div className="space-y-6 xl:col-span-1">
          <MyProfileSidebarProfileCard
            photoUrl={photoUrl}
            initials={initials}
            name={name}
            email={email}
            onPhotoSave={handlePhotoSave}
          />

          <MyProfileAccountInfoCard
            accountCreatedDate={accountCreatedDate}
            lastUpdateDate={lastUpdateDate}
          />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <MyProfileEditDetailsCard
            name={name}
            email={email}
            phone={phone}
            onNameChange={setName}
            onEmailChange={setEmail}
            onSaveProfile={handleSaveProfile}
            updatingProfile={updatingProfile}
          />

          <MyProfileMobileVerificationCard
            user={user}
            updatingProfile={updatingProfile}
            onSaveMobile={handleSaveMobile}
            onSendOtp={adminSendOtp}
            onVerifyOtp={adminVerifyOtp}
            sendingOtp={sendingOtp}
            verifyingOtp={verifyingOtp}
          />

          <MyProfilePasswordCard
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onUpdatePassword={handleUpdatePassword}
            updatingPassword={updatingPassword}
          />
        </div>
      </div>
    </div>
  );
}
