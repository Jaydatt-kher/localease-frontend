import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  useGetEnquiryByIdQuery,
  useAcceptProviderBidMutation,
  useCancelEnquiryMutation,
} from "../../api/bookingApi";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import BidsSection from "./components/enquiryDetail/BidsSection";
import EnquiryErrorState from "./components/enquiryDetail/EnquiryErrorState";
import EnquiryLoadingState from "./components/enquiryDetail/EnquiryLoadingState";
import EnquirySummaryCard from "./components/enquiryDetail/EnquirySummaryCard";
import OtpSuccessModal from "./components/enquiryDetail/OtpSuccessModal";
import { STATUS_CONFIG } from "./components/enquiryDetail/enquiryDetailShared";

export default function EnquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acceptingId, setAcceptingId] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  const { data, isLoading, isError } = useGetEnquiryByIdQuery(id);
  const [acceptBid] = useAcceptProviderBidMutation();
  const [cancelEnquiry, { isLoading: cancelling }] = useCancelEnquiryMutation();

  const enquiry = data?.enquiryDetails;
  const bids = data?.bids ?? [];

  const handleAccept = async (responseId) => {
    if (!window.confirm("Accept this bid and confirm your booking?")) return;
    setAcceptingId(responseId);
    try {
      const result = await acceptBid(responseId).unwrap();
      setBookingResult(result.data);
      toast.success("Booking confirmed!");
    } catch (err) {
      toast.error(err?.data?.message || "Could not accept bid.");
    } finally {
      setAcceptingId(null);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancel this service request? All pending bids will be rejected.")) return;
    try {
      await cancelEnquiry(id).unwrap();
      toast.success("Enquiry cancelled.");
      navigate("/my-requests");
    } catch (err) {
      toast.error(err?.data?.message || "Could not cancel.");
    }
  };

  if (isLoading) return <EnquiryLoadingState />;

  if (isError || !enquiry) {
    return <EnquiryErrorState onBack={() => navigate("/my-requests")} />;
  }

  const statusCfg = STATUS_CONFIG[enquiry.status] ?? STATUS_CONFIG.closed;
  const isOpen = enquiry.status === "open";
  const isBooked = enquiry.status === "booked";

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <button
          onClick={() => navigate("/my-requests")}
          className="flex items-center gap-2 text-sm font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors"
        >
          <FiArrowLeft size={15} /> My Requests
        </button>

        <EnquirySummaryCard
          enquiry={enquiry}
          statusCfg={statusCfg}
          isOpen={isOpen}
          cancelling={cancelling}
          onCancel={handleCancel}
        />

        <BidsSection
          isBooked={isBooked}
          isOpen={isOpen}
          bids={bids}
          acceptingId={acceptingId}
          onViewProfile={(providerId) => navigate(`/providers/${providerId}`)}
          onAccept={handleAccept}
        />
      </main>

      <Footer />

      {bookingResult && (
        <OtpSuccessModal booking={bookingResult} onClose={() => setBookingResult(null)} />
      )}
    </div>
  );
}