import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useGetBookingByIdQuery } from "../../api/bookingApi";
import { useAddReviewMutation } from "../../api/reviewApi";
import { toast } from "react-toastify";
import PaymentSuccessCard from "./components/reviewForm/PaymentSuccessCard";
import ReviewFormCard from "./components/reviewForm/ReviewFormCard";
import ReviewFormLoadingState from "./components/reviewForm/ReviewFormLoadingState";
import ReviewFormNotFoundState from "./components/reviewForm/ReviewFormNotFoundState";

export default function ReviewFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!isLoading && !isError && booking && booking.bookingStatus !== "completed") {
    }
  }, [booking, isLoading, isError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1) {
      toast.error("Please provide a rating between 1 and 5 stars.");
      return;
    }

    try {
      await addReview({ bookingId: id, rating, comment }).unwrap();
      toast.success("Thank you! Your review has been submitted.");
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit review.");
    }
  };

  const handleDownloadReceipt = () => {
    if (!booking?.payment?._id) {
      toast.error("Payment ID not found.");
      return;
    }
    const downloadUrl = `http://localhost:8000/api/payments/${booking.payment._id}/receipt`;
    fetch(downloadUrl, {
      credentials: "include",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice_${booking.payment._id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        console.error("Download failed", err);
        toast.error("Failed to download receipt.");
      });
  };

  if (isLoading) return <ReviewFormLoadingState />;

  if (isError || !booking) {
    return <ReviewFormNotFoundState onBack={() => navigate("/my-bookings")} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-10">
        <PaymentSuccessCard
          serviceName={booking.service?.name}
          onDownload={handleDownloadReceipt}
        />

        <ReviewFormCard
          providerName={booking.provider?.businessName || booking.provider?.userId?.fullName}
          onSubmit={handleSubmit}
          rating={rating}
          hover={hover}
          setRating={setRating}
          setHover={setHover}
          comment={comment}
          setComment={setComment}
          onSkip={() => navigate("/my-bookings")}
          isSubmitting={isSubmitting}
        />
      </main>
      <Footer />
    </div>
  );
}
