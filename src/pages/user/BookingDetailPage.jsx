import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useGetBookingByIdQuery } from "../../api/bookingApi";
import { FiArrowLeft } from "react-icons/fi";
import { useInitiatePaymentMutation, useVerifyPaymentMutation, useGetAdminSettingsQuery } from "../../api/paymentApi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import BookingNotFoundState from "./components/bookingDetail/BookingNotFoundState";
import BookingSummaryCard from "./components/bookingDetail/BookingSummaryCard";
import CompleteAndPayCard from "./components/bookingDetail/CompleteAndPayCard";
import PageSkeleton from "./components/bookingDetail/PageSkeleton";
import ProviderCard from "./components/bookingDetail/ProviderCard";
import ServiceInfoCard from "./components/bookingDetail/ServiceInfoCard";
import StartOtpCard from "./components/bookingDetail/StartOtpCard";
import { PRICE_TYPE_LABELS, STATUS } from "./components/bookingDetail/bookingDetailShared";

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id);
  const [initiatePayment, { isLoading: isInitiating }] = useInitiatePaymentMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const [completeOtp, setCompleteOtp] = useState("");
  const { data: adminSettings } = useGetAdminSettingsQuery();
  const cashOnServiceThreshold = adminSettings?.cashOnServiceThreshold ?? 5000;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async (method) => {
    if (!completeOtp || completeOtp.length < 4) {
      toast.error("Please enter the completion OTP given by the provider.");
      return;
    }
    try {
      const res = await initiatePayment({ bookingId: id, completeOtp, paymentMethod: method }).unwrap();

      if (method === "cash_on_service") {
        toast.success("Payment marked as complete.");
        navigate(`/user/booking/${id}/complete`);
      } else if (method === "online") {
        const options = {
          key: res.data.keyId,
          amount: res.data.amount,
          currency: res.data.currency,
          name: "Service Marketplace",
          description: "Payment for Service",
          order_id: res.data.orderId,
          handler: async function (response) {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: res.data.paymentId,
              }).unwrap();
              toast.success("Payment verified successfully!");
              navigate(`/user/booking/${id}/complete`);
            } catch (error) {
              toast.error(error?.data?.message || "Failed to verify signature.");
            }
          },
          theme: { color: "#4F46E5" },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function () {
          toast.error("Payment failed. Please try again.");
        });
        rzp.open();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Payment initiation failed.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <Navbar /><main className="flex-1"><PageSkeleton /></main><Footer />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <Navbar />
        <BookingNotFoundState onBack={() => navigate("/my-bookings")} />
        <Footer />
      </div>
    );
  }

  const s = STATUS[booking.bookingStatus] ?? STATUS.confirmed;
  const provider = booking.provider;
  const service = booking.service;
  const providerName = provider?.businessName ?? provider?.userId?.fullName ?? "Provider";
  const isConfirmed = booking.bookingStatus === "confirmed";
  const otpUnused = booking.startOtp && !booking.startOtp.isUsed;

  const priceTypeLabel = PRICE_TYPE_LABELS[booking.priceType] ?? "Inspection";
  const showFinalAmount = booking.finalAmount != null;
  const showQuotedPrice = booking.quotedPrice != null && !showFinalAmount;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <button
          onClick={() => navigate("/my-bookings")}
          className="flex items-center gap-2 text-sm font-body font-semibold text-muted dark:text-muted-dark hover:text-primary transition-colors">
          <FiArrowLeft size={15} /> My Bookings
        </button>

        <BookingSummaryCard
          booking={booking}
          service={service}
          statusConfig={s}
          priceTypeLabel={priceTypeLabel}
          showQuotedPrice={showQuotedPrice}
          showFinalAmount={showFinalAmount}
        />

        <StartOtpCard show={isConfirmed && otpUnused} />

        <CompleteAndPayCard
          show={booking.bookingStatus === "in_progress" && booking.finalAmount != null}
          finalAmount={booking.finalAmount}
          cashOnServiceThreshold={cashOnServiceThreshold}
          completeOtp={completeOtp}
          setCompleteOtp={setCompleteOtp}
          onPay={handlePayment}
          isInitiating={isInitiating}
          isVerifying={isVerifying}
        />

        <ProviderCard
          provider={provider}
          providerName={providerName}
          onOpenProfile={() => navigate(`/providers/${provider._id}`)}
        />

        <ServiceInfoCard service={service} />

      </main>

      <Footer />
    </div>
  );
}