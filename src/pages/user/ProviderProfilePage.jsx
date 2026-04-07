import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import EnquiryFormModal from "../../components/enquiry/EnquiryFormModal";
import { useGetProviderDetailsQuery } from "../../api/providerApi";
import { selectUser } from "../../redux/authSlice";
import { FiArrowLeft } from "react-icons/fi";
import AvailabilitySection from "./components/providerProfile/AvailabilitySection";
import GalleryLightbox from "./components/providerProfile/GalleryLightbox";
import MobileEnquiryBar from "./components/providerProfile/MobileEnquiryBar";
import PageSkeleton from "./components/providerProfile/PageSkeleton";
import PortfolioSection from "./components/providerProfile/PortfolioSection";
import ProviderHeroCard from "./components/providerProfile/ProviderHeroCard";
import ProviderNotFoundState from "./components/providerProfile/ProviderNotFoundState";
import ReviewsSection from "./components/providerProfile/ReviewsSection";
import ServicesSection from "./components/providerProfile/ServicesSection";
import StatsGrid from "./components/providerProfile/StatsGrid";

export default function ProviderProfilePage() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedSvcId, setSelectedSvcId] = useState(null);
  const [selectedSvcName, setSelectedSvcName] = useState("");
  const [galleryIdx, setGalleryIdx] = useState(null);
  const { data, isLoading, isError } = useGetProviderDetailsQuery(id);

  const provider = data?.provider;
  const services = data?.services ?? [];
  const reviews = data?.reviews ?? [];

  const openEnquiry = (svcId = null, svcName = "") => {
    if (!user) {
      navigate("/signup");
      return;
    }
    setSelectedSvcId(svcId);
    setSelectedSvcName(svcName);
    setEnquiryOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <Navbar />
        <main className="flex-1"><PageSkeleton /></main>
        <Footer />
      </div>
    );
  }

  if (isError || !provider) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <Navbar />
        <ProviderNotFoundState onBack={() => navigate(-1)} />
        <Footer />
      </div>
    );
  }

  const initials = provider.businessName
    ? provider.businessName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const ratingAvg = provider.rating?.average ?? null;
  const ratingCount = provider.rating?.count ?? 0;
  const hasRating = ratingAvg != null && ratingAvg > 0;
  const isVacation = provider.availability?.isVacationMode;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return {
      star,
      count,
      pct: reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors">
            <FiArrowLeft size={15} /> Back
          </button>

          <ProviderHeroCard
            provider={provider}
            isVacation={isVacation}
            initials={initials}
            ratingAvg={ratingAvg}
            ratingCount={ratingCount}
            user={user}
            onEnquiry={openEnquiry}
          />

          <StatsGrid provider={provider} hasRating={hasRating} ratingAvg={ratingAvg} />

          <ServicesSection
            services={services}
            isVacation={isVacation}
            providerBusinessName={provider.businessName}
            onEnquiry={openEnquiry}
          />

          <AvailabilitySection availability={provider.availability} isVacation={isVacation} />

          <PortfolioSection gallery={provider.gallery} onOpenImage={setGalleryIdx} />

          <ReviewsSection
            reviews={reviews}
            ratingAvg={ratingAvg}
            ratingCount={ratingCount}
            ratingDist={ratingDist}
          />
        </div>
      </main>

      <GalleryLightbox
        images={provider.gallery}
        currentIndex={galleryIdx}
        onClose={() => setGalleryIdx(null)}
        onPrev={() => setGalleryIdx((i) => (i - 1 + provider.gallery.length) % provider.gallery.length)}
        onNext={() => setGalleryIdx((i) => (i + 1) % provider.gallery.length)}
      />

      <MobileEnquiryBar
        isVacation={isVacation}
        user={user}
        businessName={provider.businessName}
        onEnquiry={openEnquiry}
      />

      <Footer />

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => {
          setEnquiryOpen(false);
          setSelectedSvcId(null);
          setSelectedSvcName("");
        }}
        serviceId={selectedSvcId}
        serviceName={selectedSvcName}
        providerId={id}
      />
    </div>
  );
}