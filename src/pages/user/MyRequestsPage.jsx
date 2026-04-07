import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  useGetAllEnquiriesQuery,
  useCancelEnquiryMutation,
} from "../../api/bookingApi";
import { toast } from "react-toastify";
import CancelConfirmModal from "./components/myRequests/CancelConfirmModal";
import EnquiryCard from "./components/myRequests/EnquiryCard";
import EnquiryCardSkeleton from "./components/myRequests/EnquiryCardSkeleton";
import RequestsEmptyState from "./components/myRequests/RequestsEmptyState";
import RequestsErrorState from "./components/myRequests/RequestsErrorState";
import RequestsHeader from "./components/myRequests/RequestsHeader";

export default function MyRequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [cancelTarget, setCancelTarget] = useState(null); 
  const { data: enquiries = [], isLoading, isError, refetch } = useGetAllEnquiriesQuery();
  const [cancelEnquiry, { isLoading: cancelling }] = useCancelEnquiryMutation();

  const filtered = useMemo(() => {
    if (activeTab === "all") return enquiries;
    return enquiries.filter((e) => e.status === activeTab);
  }, [enquiries, activeTab]);

  const counts = useMemo(() => {
    const map = { all: enquiries.length };
    enquiries.forEach((e) => { map[e.status] = (map[e.status] ?? 0) + 1; });
    return map;
  }, [enquiries]);

  const openCancelModal = (enq) => {
    setCancelTarget({ id: enq._id, name: enq.service?.name ?? "this request" });
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelEnquiry(cancelTarget.id).unwrap();
      toast.success("Request cancelled successfully.");
      setCancelTarget(null);
    } catch (err) {
      toast.error(err?.data?.message || "Could not cancel request.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <RequestsHeader activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-3">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <EnquiryCardSkeleton key={i} />)}

        {isError && <RequestsErrorState onRetry={refetch} />}

        {!isLoading && !isError && filtered.length === 0 && (
          <RequestsEmptyState activeTab={activeTab} onBrowseServices={() => navigate("/services")} />
        )}

        {filtered.map((enq) => (
          <EnquiryCard
            key={enq._id}
            enq={enq}
            onOpenDetail={(enquiryId) => navigate(`/my-requests/${enquiryId}`)}
            onCancel={openCancelModal}
          />
        ))}
      </main>

      <Footer />

      {cancelTarget && (
        <CancelConfirmModal
          enquiryName={cancelTarget.name}
          isLoading={cancelling}
          onConfirm={handleConfirmCancel}
          onClose={() => !cancelling && setCancelTarget(null)}
        />
      )}
    </div>
  );
}