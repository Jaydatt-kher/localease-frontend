import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";
import Navbar from "../../components/layout/Navbar";
import { selectUser, updateUser } from "../../redux/authSlice";
import { useCreateProviderProfileMutation } from "../../api/providerApi";
import { useGetCitiesQuery } from "../../api/serviceApi";
import {
  DEFAULT_AVAILABILITY,
  STEPS,
  StepIndicator,
} from "./components/becomeProvider/BecomeProviderShared";
import { StepBusinessInfo } from "./components/becomeProvider/StepBusinessInfo";
import { StepServiceArea } from "./components/becomeProvider/StepServiceArea";
import { StepPhotos } from "./components/becomeProvider/StepPhotos";
import { StepReview } from "./components/becomeProvider/StepReview";

export default function BecomeProviderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery();
  const [createProviderProfile, { isLoading: isSubmitting }] = useCreateProviderProfileMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    experienceYears: 0,
    city: "",
    serviceRadius: 10,
    serviceLocation: { coordinates: [0, 0] },
    profilePicture: "",
    gallery: [],
    documents: [],
    availability: DEFAULT_AVAILABILITY,
  });

  useEffect(() => {
    if (user?.role === "serviceProvider") {
      toast.info("You already have a provider profile.");
      navigate("/provider/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.businessName.trim()) {
          toast.error("Please enter your business name.");
          return false;
        }
        if (!formData.city) {
          toast.error("Please select your city.");
          return false;
        }
        return true;
      case 2: {
        const coords = formData.serviceLocation?.coordinates;
        if (!coords || coords.length !== 2 || (coords[0] === 0 && coords[1] === 0)) {
          toast.error("Please set your service location before continuing.");
          return false;
        }
        return true;
      }
      case 3:
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    const payload = {
      businessName: formData.businessName.trim(),
      city: formData.city,
      experienceYears: formData.experienceYears,
      serviceRadius: formData.serviceRadius,
      serviceLocation: {
        coordinates: formData.serviceLocation.coordinates,
      },
      ...(formData.profilePicture && { profilePicture: formData.profilePicture }),
      ...(formData.gallery.length && { gallery: formData.gallery }),
      ...(formData.documents.length && { documents: formData.documents }),
      availability: {
        days: formData.availability,
      },
    };

    try {
      await createProviderProfile(payload).unwrap();
      dispatch(updateUser({ role: "serviceProvider" }));
      toast.success("Provider profile created! Welcome aboard 🎉");
      navigate("/provider/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />

      <div className="bg-surface-light dark:bg-surface-dark border-b border-border dark:border-border-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 dark:bg-accent/20 flex items-center justify-center">
              <MdOutlineBusinessCenter size={26} className="text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">Become a Provider</h1>
              <p className="text-sm text-muted dark:text-muted-dark font-body">Complete your profile to start receiving bookings</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <StepIndicator current={currentStep} />

        <div>
          {currentStep === 1 ? (
            <StepBusinessInfo data={formData} onChange={handleChange} cities={cities} citiesLoading={citiesLoading} />
          ) : null}
          {currentStep === 2 ? <StepServiceArea data={formData} onChange={handleChange} /> : null}
          {currentStep === 3 ? <StepPhotos data={formData} onChange={handleChange} /> : null}
          {currentStep === 4 ? <StepReview data={formData} cities={cities} /> : null}
        </div>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-border dark:border-border-dark">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-border dark:border-border-dark rounded-xl font-semibold text-sm text-foreground dark:text-foreground-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-body"
          >
            <FiArrowLeft size={16} /> Previous
          </button>

          <span className="text-xs text-muted dark:text-muted-dark font-body">
            Step <span className="font-semibold text-primary">{currentStep}</span> of {STEPS.length}
          </span>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm font-body"
            >
              Next <FiArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-colors text-sm shadow-md disabled:opacity-60 font-body"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters size={18} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <IoCheckmarkCircle size={18} /> Submit Profile
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
