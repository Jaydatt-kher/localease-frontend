import { CheckCircle, Clock, Image as ImageIcon, LayoutGrid, Loader2, Package } from "lucide-react";
import { LocalGalleryUploader } from "../../../../components/ui/ImageUploader";
import { DURATION_PRESETS, FieldLabel, fmtDuration, inputCls, SectionCard } from "./AddServiceShared";

export function BasicInfoSection({ form, errors, custom, onToggleCustom, onFieldChange }) {
  return (
    <SectionCard
      icon={Package}
      title="Basic Information"
      subtitle="Name, description and duration of the service"
      iconBg="bg-primary-light dark:bg-primary/10"
      iconColor="text-primary dark:text-blue-400"
    >
      <div className="space-y-5">
        <div>
          <FieldLabel required>Service Name</FieldLabel>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="e.g. Tap Repair, Deep Cleaning, AC Service"
            maxLength={80}
            className={inputCls(errors.name)}
          />
          {errors.name ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.name}</p> : null}
        </div>

        <div>
          <FieldLabel required hint="Describe what is included, ideal for customers browsing.">
            Description
          </FieldLabel>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Provide a clear, helpful description of this service..."
            className={`${inputCls(errors.description)} resize-none`}
          />
          <p className="text-[11px] text-right text-muted dark:text-muted-dark font-body mt-1">{form.description.length} chars</p>
          {errors.description ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.description}</p> : null}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <FieldLabel>Typical Duration</FieldLabel>
            <button
              type="button"
              onClick={onToggleCustom}
              className="text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              {custom ? "Use presets" : "Custom value"}
            </button>
          </div>

          {custom ? (
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted dark:text-muted-dark" />
              <input
                type="number"
                min={15}
                max={480}
                step={15}
                value={form.duration}
                onChange={(e) => onFieldChange("duration", Number(e.target.value))}
                placeholder="Minutes"
                className={`${inputCls(errors.duration)} pl-9`}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {DURATION_PRESETS.map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => onFieldChange("duration", duration)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-body font-semibold transition-all
                    ${
                      form.duration === duration
                        ? "bg-primary border-primary text-white"
                        : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary bg-background-light dark:bg-surface-alt"
                    }`}
                >
                  {fmtDuration(duration)}
                </button>
              ))}
            </div>
          )}

          <p className="text-xs font-body text-muted dark:text-muted-dark mt-1.5">
            Selected: <span className="font-semibold text-foreground dark:text-foreground-dark">{fmtDuration(Number(form.duration) || 0)}</span>
          </p>
          {errors.duration ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.duration}</p> : null}
        </div>
      </div>
    </SectionCard>
  );
}

export function CategoryLocationSection({
  form,
  errors,
  categories,
  cities,
  catsLoading,
  citiesLoading,
  onFieldChange,
}) {
  return (
    <SectionCard
      icon={LayoutGrid}
      title="Category and Location"
      subtitle="Assign this service to the right category and city"
      iconBg="bg-purple-50 dark:bg-purple-900/20"
      iconColor="text-purple-600 dark:text-purple-400"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel required>Service Category</FieldLabel>
          <select
            value={form.category}
            onChange={(e) => onFieldChange("category", e.target.value)}
            disabled={catsLoading}
            className={`${inputCls(errors.category)} appearance-none cursor-pointer`}
          >
            <option value="">{catsLoading ? "Loading..." : "Select a category"}</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.category}</p> : null}
        </div>

        <div>
          <FieldLabel required>City</FieldLabel>
          <select
            value={form.city}
            onChange={(e) => onFieldChange("city", e.target.value)}
            disabled={citiesLoading}
            className={`${inputCls(errors.city)} appearance-none cursor-pointer`}
          >
            <option value="">{citiesLoading ? "Loading..." : "Select a city"}</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
                {city.state ? ` - ${city.state}` : ""}
              </option>
            ))}
          </select>
          {errors.city ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.city}</p> : null}
        </div>
      </div>

      {form.category ? (
        <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary-light dark:bg-primary/10 border border-border dark:border-border-dark">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
            {categories.find((category) => category._id === form.category)?.name ?? "Category selected"}
          </p>
        </div>
      ) : null}
    </SectionCard>
  );
}

export function ImagesSection({ existingImages, newImages, onExistingChange, onNewChange }) {
  return (
    <SectionCard
      icon={ImageIcon}
      title="Service Images"
      subtitle="Upload photos to showcase this service (optional, up to 5)"
      iconBg="bg-blue-50 dark:bg-blue-900/20"
      iconColor="text-blue-600 dark:text-blue-400"
    >
      <LocalGalleryUploader
        existingImages={existingImages}
        newFiles={newImages}
        onExistingChange={onExistingChange}
        onNewFilesChange={onNewChange}
        maxImages={5}
      />
      <p className="text-xs font-body text-muted dark:text-muted-dark mt-3">
        Images are uploaded directly to Cloudinary. JPG, PNG, WebP - max 5 MB each.
      </p>
    </SectionCard>
  );
}

export function ServiceStatusSection({ form, onFieldChange }) {
  return (
    <SectionCard
      icon={CheckCircle}
      title="Service Status"
      subtitle="Control whether this service is visible to customers"
      iconBg="bg-accent-light dark:bg-accent/10"
      iconColor="text-accent-hover dark:text-green-400"
    >
      <div className="flex items-center justify-between p-4 bg-background-light dark:bg-surface-alt rounded-xl border border-border dark:border-border-dark">
        <div>
          <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
            {form.isAvailable ? "Active" : "Inactive"}
          </p>
          <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
            {form.isAvailable ? "Service is live - customers can browse and enquire." : "Service is hidden - not visible to customers."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onFieldChange("isAvailable", !form.isAvailable)}
          className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none shrink-0
            ${form.isAvailable ? "bg-accent" : "bg-border dark:bg-border-dark"}`}
          role="switch"
          aria-checked={form.isAvailable}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
              ${form.isAvailable ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>
    </SectionCard>
  );
}

export function AddServiceLoading() {
  return (
    <div className="flex items-center justify-center py-20 gap-3 text-muted dark:text-muted-dark">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <span className="text-sm font-body">Loading service data...</span>
    </div>
  );
}
