import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";

export default function ReviewFormNotFoundState({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20">
        <p>Booking not found.</p>
        <button onClick={onBack} className="text-primary mt-4">
          Back to my bookings
        </button>
      </main>
      <Footer />
    </div>
  );
}
