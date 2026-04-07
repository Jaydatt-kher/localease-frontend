import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART, PIE_BOOKING, PIE_PROVIDER } from "./dashboardConfig";
import { fmtCurrency, fmtLabel } from "./dashboardUtils";
import { ChartCard, CustomTooltip, EmptyChart, RangeToggle, renderPieLabel } from "./DashboardShared";

export function BookingTrendsChart({ loading, data, range, onRangeChange, isDark, gridColor, axisColor }) {
  const key = range === "last12months" ? "month" : "date";

  return (
    <ChartCard title="Booking Trends" loading={loading} actions={<RangeToggle selected={range} onChange={onRangeChange} />}>
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey={key}
              stroke={axisColor}
              tick={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
              tickFormatter={fmtLabel}
            />
            <YAxis stroke={axisColor} tick={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }} allowDecimals={false} />
            <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDark} />} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
            <Line
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke={CHART.primary}
              strokeWidth={2.5}
              dot={{ fill: CHART.primary, r: 3.5, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

export function RevenueOverviewChart({ loading, data, range, onRangeChange, isDark, gridColor, axisColor }) {
  const key = range === "last12months" ? "month" : "date";

  return (
    <ChartCard title="Revenue Overview" loading={loading} actions={<RangeToggle selected={range} onChange={onRangeChange} />}>
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey={key}
              stroke={axisColor}
              tick={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
              tickFormatter={fmtLabel}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip cursor={false} content={(props) => <CustomTooltip {...props} isDark={isDark} formatter={fmtCurrency} />} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
            <Bar dataKey="revenue" name="Revenue" fill={CHART.accent} radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

export function StatusDistributionCharts({ providerData, bookingData, loadingProvider, loadingBooking, isDark }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Provider Status Distribution" loading={loadingProvider}>
        {providerData.length === 0 ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={providerData}
                cx="50%"
                cy="50%"
                outerRadius={95}
                labelLine={false}
                label={(props) => renderPieLabel({ ...props, isDark })}
                dataKey="value"
              >
                {providerData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_PROVIDER[idx % PIE_PROVIDER.length]} />
                ))}
              </Pie>
              <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDark} />} />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                  color: isDark ? "#94A3B8" : "#4A6080",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Booking Status Distribution" loading={loadingBooking}>
        {bookingData.length === 0 ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingData}
                cx="50%"
                cy="50%"
                outerRadius={95}
                labelLine={false}
                label={(props) => renderPieLabel({ ...props, isDark })}
                dataKey="value"
              >
                {bookingData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_BOOKING[idx % PIE_BOOKING.length]} />
                ))}
              </Pie>
              <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDark} />} />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                  color: isDark ? "#94A3B8" : "#4A6080",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

export function CategoryPopularityChart({ loading, data, isDark, gridColor, axisColor }) {
  return (
    <ChartCard title="Category Popularity (Top 5)" loading={loading}>
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(220, data.length * 52)}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
            <XAxis
              type="number"
              stroke={axisColor}
              tick={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
              allowDecimals={false}
            />
            <YAxis
              dataKey="category"
              type="category"
              stroke={axisColor}
              tick={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }}
              width={110}
            />
            <Tooltip cursor={false} content={(props) => <CustomTooltip {...props} isDark={isDark} />} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
            <Bar dataKey="count" name="Bookings" fill={CHART.purple} radius={[0, 6, 6, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
