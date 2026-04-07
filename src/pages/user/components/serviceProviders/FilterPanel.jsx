import { FiCheckCircle, FiSliders } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";

const RATINGS = [
  { value: 0, label: "Any" },
  { value: 3, label: "3★+" },
  { value: 4, label: "4★+" },
  { value: 4.5, label: "4.5★+" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Best Rating" },
  { value: "priceAsc", label: "Price ↑" },
  { value: "priceDesc", label: "Price ↓" },
  { value: "experience", label: "Experience" },
];

const PRICE_TYPES = [
  { value: "fixed", label: "Fixed", desc: "Exact amount" },
  { value: "hourly", label: "Hourly", desc: "Pay per hour" },
  { value: "inspection", label: "Inspection", desc: "Quote after visit" },
];

export function FilterPanel({ filters, onChange, onReset, resultCount }) {
  const togglePriceType = (val) => {
    const cur = filters.priceTypes;
    onChange(
      "priceTypes",
      cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val]
    );
  };

  const isDefault =
    !filters.minPrice &&
    !filters.maxPrice &&
    filters.priceTypes.length === 0 &&
    filters.minRating === 0 &&
    !filters.minExperience &&
    filters.sortBy === "rating";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiSliders size={15} className="text-primary" />
          <span className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Filters</span>
          {!isDefault ? (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white font-body">Active</span>
          ) : null}
        </div>
        {!isDefault ? (
          <button onClick={onReset} className="text-xs font-body font-semibold text-primary hover:text-primary-hover">
            Reset all
          </button>
        ) : null}
      </div>

      <div>
        <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-2">Sort by</p>
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange("sortBy", opt.value)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-body font-semibold border transition-colors ${filters.sortBy === opt.value ? "bg-primary border-primary text-white" : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
            >
              {opt.label}
              {filters.sortBy === opt.value ? <FiCheckCircle size={12} /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border dark:bg-border-dark" />

      <div>
        <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-2">Minimum Rating</p>
        <div className="flex flex-col gap-1.5">
          {RATINGS.map((r) => (
            <button
              key={r.value}
              onClick={() => onChange("minRating", r.value)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-body font-semibold border transition-colors ${filters.minRating === r.value ? "bg-primary border-primary text-white" : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
            >
              <span className="flex items-center gap-1.5">
                {r.value > 0 ? (
                  <IoStar size={11} className={filters.minRating === r.value ? "text-yellow-200" : "text-yellow-400"} />
                ) : null}
                {r.label}
              </span>
              {filters.minRating === r.value ? <FiCheckCircle size={12} /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border dark:bg-border-dark" />

      <div>
        <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-2">Pricing Type</p>
        <div className="flex flex-col gap-2">
          {PRICE_TYPES.map((pt) => {
            const active = filters.priceTypes.includes(pt.value);
            return (
              <button
                key={pt.value}
                onClick={() => togglePriceType(pt.value)}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-colors ${active ? "bg-primary/8 dark:bg-primary/15 border-primary" : "border-border dark:border-border-dark hover:border-primary"}`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${active ? "bg-primary border-primary" : "border-muted dark:border-muted-dark"}`}>
                  {active ? <FiCheckCircle size={10} className="text-white" /> : null}
                </div>
                <div>
                  <p className={`text-xs font-body font-semibold ${active ? "text-primary" : "text-foreground dark:text-foreground-dark"}`}>
                    {pt.label}
                  </p>
                  <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-0.5">{pt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-border dark:bg-border-dark" />

      <div>
        <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-2">Price Range (₹)</p>
        <div className="grid grid-cols-2 gap-2">
          {["minPrice", "maxPrice"].map((key) => (
            <div key={key} className="relative">
              <TbCurrencyRupee size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
              <input
                type="number"
                min={0}
                value={filters[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={key === "minPrice" ? "Min" : "Max"}
                className="w-full pl-6 pr-2 py-2 text-xs rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary transition-colors font-body"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border dark:bg-border-dark" />

      <div>
        <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-2">Min Experience</p>
        <div className="flex flex-wrap gap-1.5">
          {[0, 1, 3, 5, 10].map((yr) => (
            <button
              key={yr}
              onClick={() => onChange("minExperience", yr === 0 ? "" : yr)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-body font-semibold transition-colors ${(yr === 0 ? !filters.minExperience : Number(filters.minExperience) === yr) ? "bg-primary border-primary text-white" : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary"}`}
            >
              {yr === 0 ? "Any" : `${yr}+ yrs`}
            </button>
          ))}
        </div>
      </div>

      {resultCount != null ? (
        <p className="text-xs text-muted dark:text-muted-dark font-body text-center pt-1">
          {resultCount} provider{resultCount !== 1 ? "s" : ""} match
        </p>
      ) : null}
    </div>
  );
}
