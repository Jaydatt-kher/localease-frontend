import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";

export default function ReviewFormLoadingState() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <AiOutlineLoading3Quarters size={30} className="animate-spin text-primary" />
      </main>
      <Footer />
    </div>
  );
}
