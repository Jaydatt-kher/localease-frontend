export function fmtCurrency(val) {
  if (val == null) return "₹0";
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
}

export function fmtNumber(val) {
  if (val == null) return "0";
  return val.toLocaleString("en-IN");
}

export function fmtLabel(str) {
  if (!str) return str;

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const d = new Date(`${str}T00:00:00`);
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  }

  if (/^\d{4}-\d{2}$/.test(str)) {
    const d = new Date(`${str}-01T00:00:00`);
    return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
  }

  return str;
}
