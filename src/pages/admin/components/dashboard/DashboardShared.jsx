import { AlertCircle } from "lucide-react";
import { RANGES } from "./dashboardConfig";
import { fmtLabel } from "./dashboardUtils";

export function CustomTooltip({ active, payload, label, formatter, isDark }) {
  if (!active || !payload?.length) return null;

  const bg = isDark ? "#0F2440" : "#ffffff";
  const border = isDark ? "#1E3A5F" : "#E2E8F0";
  const text = isDark ? "#E2E8F0" : "#0A3D6F";
  const muted = isDark ? "#94A3B8" : "#4A6080";

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      }}
    >
      <p style={{ color: muted, fontSize: 11, marginBottom: 4, fontFamily: "DM Sans, sans-serif" }}>
        {fmtLabel(label) || label}
      </p>
      {payload.map((p, idx) => (
        <p key={idx} style={{ color: text, fontWeight: 700, fontSize: 13, fontFamily: "Outfit, sans-serif" }}>
          <span style={{ color: p.color }}>{p.name}: </span>
          {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export function RangeToggle({ selected, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
      {RANGES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all duration-150
            ${
              selected === key
                ? "bg-primary text-white shadow-sm"
                : "text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function ChartCard({ title, children, actions, loading }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-5 animate-fade-in-up">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3>
        {actions}
      </div>
      {loading ? <div className="skeleton rounded-xl" style={{ height: 280 }} /> : children}
    </div>
  );
}

export function EmptyChart({ message = "No data available yet" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted dark:text-muted-dark">
      <AlertCircle className="w-8 h-8 opacity-30" />
      <p className="text-sm font-body">{message}</p>
    </div>
  );
}

export function renderPieLabel({ cx, cy, midAngle, outerRadius, name, percent, isDark }) {
  if (percent < 0.04) return null;

  const RADIAN = Math.PI / 180;
  const r = outerRadius + 22;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill={isDark ? "#94A3B8" : "#4A6080"}
      style={{ fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
}
