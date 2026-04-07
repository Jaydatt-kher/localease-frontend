import Navbar from "../../../../components/layout/Navbar";

export default function EnquiryLoadingState() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <div className="skeleton h-5 w-24 rounded" />
        <div className="skeleton h-40 rounded-2xl" />
        <div className="skeleton h-48 rounded-2xl" />
        <div className="skeleton h-48 rounded-2xl" />
      </main>
    </div>
  );
}
