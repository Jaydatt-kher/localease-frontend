import { MdOutlineBusinessCenter, MdOutlineLocationCity, MdOutlineWorkHistory } from "react-icons/md";
import { FieldLabel, SectionCard } from "./ProfileShared";

export function BusinessDetailsSection({ formData, onChange, cities, citiesLoading }) {
  return (
    <SectionCard title="Business Details" subtitle="Main information displayed to customers">
      <div className="space-y-5">
        <div>
          <FieldLabel required>Business / Professional Name</FieldLabel>
          <div className="relative">
            <MdOutlineBusinessCenter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => onChange("businessName", e.target.value)}
              placeholder="e.g. Ramesh Plumbing Services"
              className="form-input form-input-icon"
              maxLength={80}
            />
          </div>
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
                value={formData.experienceYears}
                onChange={(e) => onChange("experienceYears", Number(e.target.value))}
                className="form-input form-input-icon"
              />
            </div>
          </div>

          <div>
            <FieldLabel required>Operating City</FieldLabel>
            <div className="relative">
              <MdOutlineLocationCity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
              <select
                value={formData.city}
                onChange={(e) => onChange("city", e.target.value)}
                className="form-input form-input-icon appearance-none cursor-pointer border-r-8 border-transparent"
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
              value={formData.serviceRadius}
              onChange={(e) => onChange("serviceRadius", Number(e.target.value))}
              className="flex-1 accent-primary h-2 rounded-full cursor-pointer"
            />
            <div className="shrink-0 w-20 text-center">
              <span className="text-lg font-display font-bold text-primary">{formData.serviceRadius}</span>
              <span className="text-xs text-muted dark:text-muted-dark font-body"> km</span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
