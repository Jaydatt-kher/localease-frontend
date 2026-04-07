import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useGetProviderPaymentsQuery } from "../../api/paymentApi";
import { FiDollarSign, FiCalendar, FiUser, FiInfo, FiRefreshCw } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MyPaymentsPage() {
    const { data: payments = [], isLoading, isError, refetch, isFetching } = useGetProviderPaymentsQuery();

    const [filter, setFilter] = useState("all");

        const filteredPayments = payments.filter((p) => {
        if (filter === "completed") return p.paymentStatus === "completed";
        if (filter === "pending") return p.paymentStatus === "pending";
        return true;
    });

    const totalEarnings = payments
        .filter(p => p.paymentStatus === "completed")
        .reduce((sum, p) => sum + p.providerEarning, 0);
        
    const pendingEarnings = payments
        .filter(p => p.paymentStatus === "pending")
        .reduce((sum, p) => sum + p.providerEarning, 0);

    const formatCurrency = (amount) => {
        return Number(amount).toLocaleString("en-IN");
    };

    const formatDate = (iso) => {
        return new Date(iso).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric"
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Navbar />
            
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                
                {}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark mb-1">
                             My Earnings & Payments
                        </h1>
                        <p className="text-sm font-body text-muted dark:text-muted-dark">
                             Track your earnings and payment history.
                        </p>
                    </div>
                    <button onClick={refetch} disabled={isFetching} className="flex items-center gap-1 text-sm font-body text-primary hover:text-primary-hover transition-colors font-semibold">
                        <FiRefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
                    </button>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 flex flex-col items-start shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-3">
                            <FiDollarSign size={20} />
                        </div>
                        <p className="text-sm font-body font-semibold text-muted dark:text-muted-dark mb-1">Total Earnings (Completed)</p>
                        <p className="text-3xl font-display font-extrabold text-foreground dark:text-foreground-dark flex items-center gap-1">
                             <TbCurrencyRupee size={28} /> {formatCurrency(totalEarnings)}
                        </p>
                        <p className="text-xs font-body text-muted dark:text-muted-dark mt-2">After 10% platform commission deducted.</p>
                    </div>
                    
                    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 flex flex-col items-start shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                            <FiInfo size={20} />
                        </div>
                        <p className="text-sm font-body font-semibold text-muted dark:text-muted-dark mb-1">Pending Earnings</p>
                        <p className="text-3xl font-display font-extrabold text-foreground dark:text-foreground-dark flex items-center gap-1">
                             <TbCurrencyRupee size={28} /> {formatCurrency(pendingEarnings)}
                        </p>
                        <p className="text-xs font-body text-muted dark:text-muted-dark mt-2">Payments initiated but not verified.</p>
                    </div>
                </div>

                {}
                <div className="flex items-center gap-2 mb-4 border-b border-border dark:border-border-dark pb-3">
                     {["all", "completed", "pending"].map((f) => (
                         <button
                             key={f}
                             onClick={() => setFilter(f)}
                             className={`px-4 py-1.5 text-xs font-body font-bold rounded-full capitalize transition-colors ${
                                  filter === f
                                      ? "bg-primary text-white"
                                      : "bg-background-light dark:bg-surface-dark text-muted dark:text-muted-dark border border-border dark:border-border-dark hover:border-primary hover:text-primary"
                             }`}
                         >
                             {f}
                         </button>
                     ))}
                </div>

                {}
                {isLoading ? (
                     <div className="flex justify-center items-center py-20">
                          <AiOutlineLoading3Quarters size={30} className="text-primary animate-spin" />
                     </div>
                ) : isError ? (
                     <div className="flex flex-col items-center justify-center py-20 text-muted dark:text-muted-dark">
                          <FiInfo size={30} className="mb-2 opacity-50" />
                          <p className="font-body text-sm">Failed to load payments.</p>
                     </div>
                ) : filteredPayments.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-20 text-muted dark:text-muted-dark bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark border-dashed">
                          <FiDollarSign size={30} className="mb-2 opacity-30" />
                          <p className="font-body text-sm">No payments found.</p>
                     </div>
                ) : (
                     <div className="space-y-4">
                          {filteredPayments.map(payment => (
                               <div key={payment._id} className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                   <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                                             <TbCurrencyRupee size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark flex items-center gap-2">
                                                 {payment.booking?.service?.name || "Service Booking"} 
                                                 <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                                                     payment.paymentStatus === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                 }`}>
                                                     {payment.paymentStatus}
                                                 </span>
                                            </p>
                                            <div className="flex items-center gap-3 text-xs font-body text-muted dark:text-muted-dark mt-1.5">
                                                 <span className="flex items-center gap-1"><FiUser size={12} /> {payment.user?.fullName}</span>
                                                 <span className="flex items-center gap-1"><FiCalendar size={12} /> {formatDate(payment.createdAt)}</span>
                                            </div>
                                            <p className="text-[10px] font-mono text-muted dark:text-muted-dark mt-1">Ref: {payment._id}</p>
                                        </div>
                                   </div>

                                   <div className="flex flex-col sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border dark:border-border-dark">
                                        <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1">Your Earning</p>
                                        <p className="text-xl font-display font-extrabold text-accent-hover flex items-center gap-0.5">
                                             <TbCurrencyRupee size={18} /> {formatCurrency(payment.providerEarning)}
                                        </p>
                                        <div className="flex items-center gap-1 text-[10px] font-body text-muted dark:text-muted-dark mt-1 capitalize border border-border dark:border-border-dark px-1.5 py-0.5 rounded">
                                             Paid via {payment.paymentMethod?.replace("_", " ")}
                                        </div>
                                   </div>
                               </div>
                          ))}
                     </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
}
