import { useCallback, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import {
  useGetWalletTransactionsQuery,
  useGetProviderPaymentsQuery,
  useRechargeWalletMutation,
  useVerifyRechargeMutation,
  useInitiateWithdrawalMutation,
  useGetAdminSettingsQuery,
} from "../../api/paymentApi";
import { useGetMyProviderProfileQuery } from "../../api/providerApi";
import { toast } from "react-toastify";
import { AmountModal } from "./components/earnings/AmountModal";
import { WalletLowAlert } from "./components/earnings/WalletLowAlert";
import { WalletHeroCard } from "./components/earnings/WalletHeroCard";
import { SummaryCards } from "./components/earnings/SummaryCards";
import { WalletTabs } from "./components/earnings/WalletTabs";
import { WalletHistoryPanel } from "./components/earnings/WalletHistoryPanel";
import { PaymentRecordsPanel } from "./components/earnings/PaymentRecordsPanel";
import { fmt, fmtDt } from "./components/earnings/walletShared";

export default function EarningsWalletPage() {
  const [tab, setTab] = useState("wallet");
  const [txPage, setTxPage] = useState(1);
  const [modal, setModal] = useState(null);

  const { data: profile } = useGetMyProviderProfileQuery();
  const { data: settings = {} } = useGetAdminSettingsQuery();

  const {
    data: walletData = { walletBalance: 0, transactions: [], pagination: {} },
    isLoading: txLoading,
    refetch: refetchTx,
  } = useGetWalletTransactionsQuery({ page: txPage });

  const {
    data: payments = [],
    isLoading: pmtLoading,
    refetch: refetchPmt,
  } = useGetProviderPaymentsQuery();

  const [rechargeWallet] = useRechargeWalletMutation();
  const [verifyRecharge] = useVerifyRechargeMutation();
  const [initiateWithdrawal] = useInitiateWithdrawalMutation();

  const walletBalance = profile?.walletBalance ?? 0;
  const minBalance = settings.minWalletBalance ?? 100;
  const isLow = walletBalance < minBalance;

  const totalEarned = payments
    .filter((payment) => payment.paymentStatus === "completed")
    .reduce((sum, payment) => sum + (payment.providerEarning || 0), 0);
  const pendingEarned = payments
    .filter((payment) => payment.paymentStatus === "pending")
    .reduce((sum, payment) => sum + (payment.providerEarning || 0), 0);
  const totalCommission = payments
    .filter((payment) => payment.paymentStatus === "completed")
    .reduce((sum, payment) => sum + (payment.platformCommission || 0), 0);

  const loadRazorpay = useCallback(
    () =>
      new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }),
    []
  );

  const handleRecharge = async (amount) => {
    setModal(null);
    try {
      const orderRes = await rechargeWallet({ amount }).unwrap();
      const orderData = orderRes.data;

      if (orderData.isMock) {
        const result = await verifyRecharge({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_MOCK_${Date.now()}`,
          razorpay_signature: "mock_signature_bypass",
          amount,
        }).unwrap();
        toast.success(result.message || `₹${amount} added to wallet (Mock Mode)`);
        refetchTx();
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Payment gateway failed to load. Check your internet connection.");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LocalEase",
        description: "Wallet Recharge",
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            const result = await verifyRecharge({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
            }).unwrap();
            toast.success(result.message || "Wallet recharged!");
            refetchTx();
          } catch (err) {
            toast.error(err?.data?.message || "Recharge verification failed.");
          }
        },
        theme: { color: "#6366f1" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Could not initiate recharge. Please try again.");
    }
  };

  const handleWithdraw = async (amount) => {
    setModal(null);
    try {
      const result = await initiateWithdrawal({ amount }).unwrap();
      toast.success(result.message || "Withdrawal processed!");
      refetchTx();
    } catch (err) {
      toast.error(err?.data?.message || "Withdrawal failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar hideSearch title="Earnings & Wallet" />

      {modal === "recharge" ? (
        <AmountModal
          title="Add Money to Wallet"
          subtitle="Enter the amount you want to add. This will be paid via Razorpay."
          btnLabel="Pay Now"
          btnColor="bg-primary hover:bg-primary-hover"
          onConfirm={handleRecharge}
          onClose={() => setModal(null)}
        />
      ) : null}

      {modal === "withdraw" ? (
        <AmountModal
          title="Withdraw from Wallet"
          subtitle={`Available: ${fmt(walletBalance)}. In test mode, funds are simulated.`}
          btnLabel="Withdraw"
          btnColor="bg-amber-500 hover:bg-amber-600"
          onConfirm={handleWithdraw}
          onClose={() => setModal(null)}
          maxAmount={walletBalance}
        />
      ) : null}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-foreground dark:text-foreground-dark">Earnings &amp; Wallet</h1>
          <p className="text-sm font-body text-muted dark:text-muted-dark mt-1">
            Manage your virtual wallet and track all earnings.
          </p>
        </div>

        {isLow ? (
          <WalletLowAlert
            walletBalance={walletBalance}
            minBalance={minBalance}
            onAddMoney={() => setModal("recharge")}
          />
        ) : null}

        <WalletHeroCard
          walletBalance={walletBalance}
          minBalance={minBalance}
          isLow={isLow}
          onAddMoney={() => setModal("recharge")}
          onWithdraw={() => setModal("withdraw")}
        />

        <SummaryCards
          totalEarned={totalEarned}
          pendingEarned={pendingEarned}
          totalCommission={totalCommission}
          fmt={fmt}
        />

        <WalletTabs tab={tab} onChange={setTab} />

        {tab === "wallet" ? (
          <WalletHistoryPanel
            walletData={walletData}
            txLoading={txLoading}
            refetchTx={refetchTx}
            txPage={txPage}
            setTxPage={setTxPage}
            fmt={fmt}
            fmtDt={fmtDt}
          />
        ) : null}

        {tab === "earnings" ? (
          <PaymentRecordsPanel
            payments={payments}
            pmtLoading={pmtLoading}
            refetchPmt={refetchPmt}
            fmt={fmt}
            fmtDt={fmtDt}
          />
        ) : null}
      </main>
    </div>
  );
}
