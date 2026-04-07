import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAdminKPIsQuery,
  useGetBookingsTrendQuery,
  useGetBookingStatusQuery,
  useGetCategoryPopularityQuery,
  useGetProviderStatusQuery,
  useGetRevenueTrendQuery,
} from "../../api/adminApi";
import { selectTheme } from "../../redux/themeSlice";
import {
  BookingTrendsChart,
  CategoryPopularityChart,
  RevenueOverviewChart,
  StatusDistributionCharts,
} from "./components/dashboard/DashboardCharts";
import { DashboardKpiGrid } from "./components/dashboard/DashboardKpiGrid";

export default function Dashboard() {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  const [bookingRange, setBookingRange] = useState("last7days");
  const [revenueRange, setRevenueRange] = useState("last7days");

  const { data: kpis, isLoading: kpiLoading } = useGetAdminKPIsQuery();
  const { data: btData, isLoading: btLoading } = useGetBookingsTrendQuery(bookingRange);
  const { data: rtData, isLoading: rtLoading } = useGetRevenueTrendQuery(revenueRange);
  const { data: provStatus, isLoading: psLoading } = useGetProviderStatusQuery();
  const { data: bkStatus, isLoading: bsLoading } = useGetBookingStatusQuery();
  const { data: catPop, isLoading: cpLoading } = useGetCategoryPopularityQuery();

  const bookingTrendData = btData?.data ?? [];
  const revenueTrendData = rtData?.data ?? [];
  const providerStatusData = provStatus ?? [];
  const bookingStatusData = bkStatus ?? [];
  const categoryData = catPop ?? [];

  const gridColor = isDark ? "#1E3A5F" : "#E5E7EB";
  const axisColor = isDark ? "#64748B" : "#6B7280";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Dashboard</h1>
        <p className="text-sm font-body text-muted dark:text-muted-dark mt-0.5">
          Welcome back. Here is what is happening across the platform.
        </p>
      </div>

      <DashboardKpiGrid kpis={kpis} kpiLoading={kpiLoading} />

      <BookingTrendsChart
        loading={btLoading}
        data={bookingTrendData}
        range={bookingRange}
        onRangeChange={setBookingRange}
        isDark={isDark}
        gridColor={gridColor}
        axisColor={axisColor}
      />

      <RevenueOverviewChart
        loading={rtLoading}
        data={revenueTrendData}
        range={revenueRange}
        onRangeChange={setRevenueRange}
        isDark={isDark}
        gridColor={gridColor}
        axisColor={axisColor}
      />

      <StatusDistributionCharts
        providerData={providerStatusData}
        bookingData={bookingStatusData}
        loadingProvider={psLoading}
        loadingBooking={bsLoading}
        isDark={isDark}
      />

      <CategoryPopularityChart
        loading={cpLoading}
        data={categoryData}
        isDark={isDark}
        gridColor={gridColor}
        axisColor={axisColor}
      />
    </div>
  );
}
