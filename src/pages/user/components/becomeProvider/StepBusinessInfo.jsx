import {
  MdOutlineBusinessCenter,
  MdOutlineLocationCity,
  MdOutlineWorkHistory,
} from "react-icons/md";
import { FieldLabel, SectionCard } from "./BecomeProviderShared";

export function StepBusinessInfo({ data, onChange, cities, citiesLoading }) {
  return (
    <div>
      <SectionCard title="Business Details" subtitle="Tell us about your professional profile">
        <div className="space-y-5">
          <div>
            <FieldLabel required>Business / Professional Name</FieldLabel>
            <div className="relative">
              <MdOutlineBusinessCenter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => onChange("businessName", e.target.value)}
                placeholder="e.g. Ramesh Plumbing Services"
                className="form-input form-input-icon"
                maxLength={80}
              />
            </div>
            <p className="text-xs text-muted dark:text-muted-dark mt-1 font-body">
              This is what customers will see when searching for your services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel>Years of Experience</FieldLabel>
              <div className="relative">
                <MdOutlineWorkHistory size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={data.experienceYears}
                  onChange={(e) => onChange("experienceYears", Number(e.target.value))}
                  className="form-input form-input-icon"
                  placeholder="e.g. 5"
                />
              </div>
            </div>

            <div>
              <FieldLabel required>Operating City</FieldLabel>
              <div className="relative">
                <MdOutlineLocationCity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                <select
                  value={data.city}
                  onChange={(e) => onChange("city", e.target.value)}
                  className="form-input form-input-icon appearance-none cursor-pointer"
                >
                  <option value="">{citiesLoading ? "Loading cities..." : "Select your city"}</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name} - {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <FieldLabel>Service Radius</FieldLabel>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={50}
                value={data.serviceRadius}
                onChange={(e) => onChange("serviceRadius", Number(e.target.value))}
                className="flex-1 accent-primary h-2 rounded-full cursor-pointer"
              />
              <div className="shrink-0 w-20 text-center">
                <span className="text-lg font-display font-bold text-primary">{data.serviceRadius}</span>
                <span className="text-xs text-muted dark:text-muted-dark font-body"> km</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted dark:text-muted-dark mt-1 font-body">
              <span>1 km</span>
              <span>25 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Weekly Availability" subtitle="Set your working hours for each day">
        <div className="space-y-3">
          {data.availability.map((day, idx) => (
            <div
              key={day.day}
              className={`grid grid-cols-[80px_1fr_1fr_auto] sm:grid-cols-[100px_1fr_1fr_auto] items-center gap-3 py-2 border-b border-border dark:border-border-dark last:border-0 ${!day.isOpen ? "opacity-50" : ""}`}
            >
              <span className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{day.day}</span>
              <input
                type="time"
                value={day.startTime}
                disabled={!day.isOpen}
                onChange={(e) => {
                  const updated = [...data.availability];
                  updated[idx] = { ...updated[idx], startTime: e.target.value };
                  onChange("availability", updated);
                }}
                className="form-input text-sm py-1.5 px-2 disabled:cursor-not-allowed"
              />
              <input
                type="time"
                value={day.endTime}
                disabled={!day.isOpen}
                onChange={(e) => {
                  const updated = [...data.availability];
                  updated[idx] = { ...updated[idx], endTime: e.target.value };
                  onChange("availability", updated);
                }}
                className="form-input text-sm py-1.5 px-2 disabled:cursor-not-allowed"
              />
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  onChange={(e) => {
                    const updated = [...data.availability];
                    updated[idx] = { ...updated[idx], isOpen: e.target.checked };
                    onChange("availability", updated);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-border dark:bg-border-dark rounded-full peer peer-checked:bg-accent relative transition-colors">
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
