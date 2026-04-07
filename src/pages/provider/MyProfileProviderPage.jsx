import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  useGetMyProviderProfileQuery,
  useProviderSendOtpMobileMutation,
  useProviderVerifyOtpMobileMutation,
  useUpdateProviderProfileMutation,
} from "../../api/providerApi";
import { useGetCitiesQuery } from "../../api/serviceApi";
import { useUpdateMyProfileMutation } from "../../api/userApi";
import { BusinessDetailsSection } from "./components/profile/BusinessDetailsSection";
import { MobileVerificationSection } from "./components/profile/MobileVerificationSection";
import { MediaSection } from "./components/profile/MediaSection";
import { ServiceLocationSection } from "./components/profile/ServiceLocationSection";
import { ProfileStatusSection } from "./components/profile/ProfileStatusSection";
import { WeeklyAvailabilitySection } from "./components/profile/WeeklyAvailabilitySection";
import { ProfileHeader } from "./components/profile/ProfileHeader";
import { DEFAULT_AVAILABILITY } from "./components/profile/ProfileShared";

export default function MyProfileProviderPage() {
  const { data: profileData, isLoading: profileLoading, refetch } = useGetMyProviderProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProviderProfileMutation();
  const [updateUserProfile] = useUpdateMyProfileMutation();
  const [providerSendOtp, { isLoading: sendingOtp }] = useProviderSendOtpMobileMutation();
  const [providerVerifyOtp, { isLoading: verifyingOtp }] = useProviderVerifyOtpMobileMutation();
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery();

  const [formData, setFormData] = useState({
    businessName: "",
    experienceYears: 0,
    city: "",
    serviceRadius: 10,
    serviceLocation: { coordinates: [0, 0] },
    profilePicture: "",
    gallery: [],
    availability: DEFAULT_AVAILABILITY,
    isActive: true,
  });

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        businessName: profileData.businessName || "",
        experienceYears: profileData.experienceYears || 0,
        city: profileData.city?._id || profileData.city || "",
        serviceRadius: profileData.serviceRadius || 10,
        serviceLocation: profileData.serviceLocation || { coordinates: [0, 0] },
        profilePicture: profileData.profilePicture || "",
        gallery: profileData.gallery || [],
        availability: profileData.availability?.days || DEFAULT_AVAILABILITY,
        isActive: profileData.isActive ?? true,
      });
    }
  }, [profileData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.businessName?.trim()) {
      toast.error("Business name is required to save changes.");
      return;
    }
    if (!formData.city) {
      toast.error("Please select an operating city.");
      return;
    }

    try {
      await updateProfile({
        ...formData,
        availability: { days: formData.availability },
      }).unwrap();
      toast.success("Business profile updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const handleSaveMobile = async (newMobile) => {
    try {
      const result = await updateUserProfile({ mobileNo: newMobile });
      if (result?.error) {
        toast.error(result.error?.data?.message || "Failed to save mobile number.");
        return;
      }
      toast.success("Mobile number saved! You can now verify it via OTP.");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to save mobile number.");
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleChange("serviceLocation", {
          coordinates: [pos.coords.longitude, pos.coords.latitude],
        });
        setGeoLoading(false);
        setManualMode(false);
        toast.success("Location detected successfully!");
      },
      () => {
        setGeoError("Location access denied. Please enter coordinates manually.");
        setGeoLoading(false);
        setManualMode(true);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted dark:text-muted-dark">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar hideSearch />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6 pb-20 animate-fade-in-up">
        <ProfileHeader onSave={handleUpdate} isUpdating={isUpdating} />

        <BusinessDetailsSection
          formData={formData}
          onChange={handleChange}
          cities={cities}
          citiesLoading={citiesLoading}
        />

        <MobileVerificationSection
          profile={profileData}
          onSaveMobile={handleSaveMobile}
          onSendOtp={providerSendOtp}
          onVerifyOtp={providerVerifyOtp}
          sendingOtp={sendingOtp}
          verifyingOtp={verifyingOtp}
        />

        <MediaSection formData={formData} onChange={handleChange} />

        <ServiceLocationSection
          formData={formData}
          onChange={handleChange}
          detectLocation={detectLocation}
          geoLoading={geoLoading}
          geoError={geoError}
          manualMode={manualMode}
          setManualMode={setManualMode}
        />

        <ProfileStatusSection
          isActive={formData.isActive}
          onToggle={() => handleChange("isActive", !formData.isActive)}
        />

        <WeeklyAvailabilitySection
          availability={formData.availability}
          onChangeAvailability={(updated) => handleChange("availability", updated)}
        />
      </main>

      <Footer />
    </div>
  );
}
