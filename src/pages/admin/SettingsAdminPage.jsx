import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
} from "../../api/adminApi";
import { CommissionSettingsCard } from "./components/settings/CommissionSettingsCard";
import { IntegrationsCard } from "./components/settings/IntegrationsCard";
import { PlatformSettingsCard } from "./components/settings/PlatformSettingsCard";
import { SettingsHeader } from "./components/settings/SettingsHeader";
import { SettingsLoadingState } from "./components/settings/SettingsLoadingState";

export default function SettingsAdminPage() {
  const { data, isLoading } = useGetAdminSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateAdminSettingsMutation();

  const [platformName, setPlatformName] = useState("LocalEase");
  const [currency, setCurrency] = useState("INR");
  const [timeFormat, setTimeFormat] = useState("12-hour");

  const [commission, setCommission] = useState(15);
  const [minWalletBalance, setMinWalletBalance] = useState(100);
  const [cashOnServiceThreshold, setCashOnServiceThreshold] = useState(5000);

  useEffect(() => {
    if (data?.settings) {
      setPlatformName(data.settings.platformName || "LocalEase");
      setCurrency(data.settings.currency || "INR");
      setTimeFormat(data.settings.timeFormat || "12-hour");
      setCommission(Math.round((data.settings.platformCommissionRate || 0.15) * 100));
      setMinWalletBalance(data.settings.minWalletBalance || 100);
      setCashOnServiceThreshold(data.settings.cashOnServiceThreshold || 5000);
    }
  }, [data]);

  const handleSavePlatformSettings = async () => {
    try {
      await updateSettings({
        platformName,
        currency,
        timeFormat,
      }).unwrap();
      toast.success("Platform settings saved successfully!");
    } catch {
      toast.error("Failed to save platform settings.");
    }
  };

  const handleSaveCommissionSettings = async () => {
    try {
      await updateSettings({
        platformCommissionRate: commission / 100,
        minWalletBalance: Number(minWalletBalance),
        cashOnServiceThreshold: Number(cashOnServiceThreshold),
      }).unwrap();
      toast.success("Commission & Pricing saved successfully!");
    } catch {
      toast.error("Failed to save commission settings.");
    }
  };

  if (isLoading) {
    return <SettingsLoadingState />;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader />

      <PlatformSettingsCard
        platformName={platformName}
        onPlatformNameChange={setPlatformName}
        currency={currency}
        onCurrencyChange={setCurrency}
        timeFormat={timeFormat}
        onTimeFormatChange={setTimeFormat}
        isUpdating={isUpdating}
        onSave={handleSavePlatformSettings}
      />

      <CommissionSettingsCard
        commission={commission}
        onCommissionChange={setCommission}
        minWalletBalance={minWalletBalance}
        onMinWalletBalanceChange={setMinWalletBalance}
        cashOnServiceThreshold={cashOnServiceThreshold}
        onCashOnServiceThresholdChange={setCashOnServiceThreshold}
        isUpdating={isUpdating}
        onSave={handleSaveCommissionSettings}
      />

      <IntegrationsCard />
    </div>
  );
}
