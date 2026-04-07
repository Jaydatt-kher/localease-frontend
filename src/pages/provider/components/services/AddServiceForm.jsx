import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle, FiAlignLeft, FiClock, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { IoCheckmarkCircle, IoWarningOutline } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { useCreateProviderServiceMutation } from "../../../../api/providerApi";
import { useGetAllCategoriesQuery, useGetServicesByCategoryQuery } from "../../../../api/serviceApi";
import {
  DURATION_PRESETS,
  FieldLabel,
  formatDuration,
  getCatIcon,
} from "./ProviderServicesShared";

export function AddServiceForm({ existingServiceIds, onSuccess, onCancel }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("fixed");
  const [duration, setDuration] = useState(60);
  const [customDuration, setCustomDuration] = useState(false);
  const [description, setDescription] = useState("");

  const { data: categories = [], isLoading: catsLoading } = useGetAllCategoriesQuery();
  const { data: services = [], isLoading: svcsLoading } = useGetServicesByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const [createProviderService, { isLoading: isAdding }] = useCreateProviderServiceMutation();

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        const notAdded = !existingServiceIds.includes(service._id);
        const matchesSearch =
          !serviceSearch || service.name.toLowerCase().includes(serviceSearch.toLowerCase());
        return notAdded && matchesSearch;
      }),
    [services, existingServiceIds, serviceSearch]
  );

  const selectedServiceObj = services.find((service) => service._id === selectedService);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService) {
      toast.error("Please select a service.");
      return;
    }

    if (priceType !== "inspection") {
      if (!price || Number(price) <= 0) {
        toast.error("Please enter a valid price.");
        return;
      }
      if (Number(price) > 1000000) {
        toast.error("Price seems too high. Please recheck.");
        return;
      }
    }

    try {
      await createProviderService({
        serviceId: selectedService,
        price: priceType === "inspection" ? (price ? Number(price) : 0) : Number(price),
        priceType,
        duration: Number(duration),
        description: description.trim() || undefined,
      }).unwrap();

      toast.success("Service added to your profile!");
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to add service.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <FieldLabel required>1. Pick a Category</FieldLabel>
        {catsLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark font-body">
            <AiOutlineLoading3Quarters size={16} className="animate-spin" /> Loading categories...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => {
                  setSelectedCategory(category._id);
                  setSelectedService("");
                  setServiceSearch("");
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-semibold transition-all font-body ${
                  selectedCategory === category._id
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary bg-surface-light dark:bg-surface-dark"
                }`}
              >
                <span className={selectedCategory === category._id ? "text-white" : "text-primary"}>
                  {getCatIcon(category.name)}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCategory ? (
        <div className="animate-fade-in">
          <FieldLabel required>2. Select a Service</FieldLabel>

          <div className="relative mb-3">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
            <input
              type="text"
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              placeholder="Search services in this category..."
              className="form-input form-input-icon text-sm"
            />
          </div>

          {svcsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark font-body py-3">
              <AiOutlineLoading3Quarters size={16} className="animate-spin" /> Loading services...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="flex items-center gap-2 py-4 text-sm text-muted dark:text-muted-dark font-body">
              <FiAlertCircle size={16} />
              {services.length === 0
                ? "No services found in this category."
                : "All services in this category are already added, or no results match your search."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
              {filteredServices.map((service) => (
                <button
                  key={service._id}
                  type="button"
                  onClick={() => setSelectedService(service._id)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all font-body ${
                    selectedService === service._id
                      ? "bg-primary/8 dark:bg-primary/15 border-primary text-foreground dark:text-foreground-dark"
                      : "border-border dark:border-border-dark hover:border-primary bg-surface-light dark:bg-surface-dark text-foreground dark:text-foreground-dark"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold leading-tight">{service.name}</p>
                      {service.description ? (
                        <p className="text-xs text-muted dark:text-muted-dark mt-0.5 line-clamp-1">{service.description}</p>
                      ) : null}
                      {service.duration ? (
                        <p className="text-xs text-muted dark:text-muted-dark mt-1">~{formatDuration(service.duration)}</p>
                      ) : null}
                    </div>
                    {selectedService === service._id ? (
                      <IoCheckmarkCircle size={18} className="text-primary shrink-0 mt-0.5" />
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {selectedService ? (
        <div className="space-y-5 animate-fade-in">
          {selectedServiceObj ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-light dark:bg-primary/10 border border-border dark:border-border-dark">
              <IoCheckmarkCircle size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">{selectedServiceObj.name}</p>
                {selectedServiceObj.description ? (
                  <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">{selectedServiceObj.description}</p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="h-px bg-border dark:bg-border-dark" />
          <p className="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider font-body">
            3. Set Your Pricing &amp; Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {priceType === "inspection" ? (
              <div className="sm:col-span-2 flex items-start gap-2.5 p-3 rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                <IoWarningOutline size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300 font-body">
                    Inspection Pricing - No upfront price
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-body mt-0.5">
                    Customers will see "Price after inspection". You quote them on-site.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <FieldLabel required>
                  Your Price
                  {priceType === "hourly" ? (
                    <span className="text-xs font-normal text-muted dark:text-muted-dark ml-1">(per hour)</span>
                  ) : null}
                </FieldLabel>
                <div className="relative">
                  <TbCurrencyRupee size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  <input
                    type="number"
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={priceType === "hourly" ? "e.g. 300 per hour" : "e.g. 499"}
                    className="form-input form-input-icon"
                  />
                </div>
                <p className="text-xs text-muted dark:text-muted-dark mt-1 font-body">
                  {priceType === "hourly"
                    ? "Customers pay per hour of actual work."
                    : "Flat amount charged per visit."}
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <FieldLabel>Duration</FieldLabel>
                <button
                  type="button"
                  onClick={() => setCustomDuration((prev) => !prev)}
                  className="text-xs text-primary hover:text-primary-hover transition-colors font-semibold font-body"
                >
                  {customDuration ? "Use presets" : "Custom"}
                </button>
              </div>
              {customDuration ? (
                <div className="relative">
                  <FiClock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  <input
                    type="number"
                    min={15}
                    max={480}
                    step={15}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    placeholder="Minutes"
                    className="form-input form-input-icon"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {DURATION_PRESETS.map((durationPreset) => (
                    <button
                      key={durationPreset}
                      type="button"
                      onClick={() => setDuration(durationPreset)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all font-body ${
                        duration === durationPreset
                          ? "bg-primary border-primary text-white"
                          : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary bg-surface-light dark:bg-surface-dark"
                      }`}
                    >
                      {formatDuration(durationPreset)}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted dark:text-muted-dark mt-1.5 font-body">
                Selected: <span className="font-semibold text-foreground dark:text-foreground-dark">{formatDuration(duration)}</span>
              </p>
            </div>
          </div>

          <div>
            <FieldLabel>Price Type</FieldLabel>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="fixed">Fixed - flat rate per visit</option>
              <option value="hourly">Hourly - charged per hour</option>
              <option value="inspection">After Inspection - price set on-site</option>
            </select>
            <p className="text-xs text-muted dark:text-muted-dark mt-1 font-body">
              {priceType === "fixed" ? "Customers see a fixed price upfront." : null}
              {priceType === "hourly" ? "Price shown is your per-hour rate." : null}
              {priceType === "inspection" ? "Customers know pricing is determined after a visit." : null}
            </p>
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <div className="relative">
              <FiAlignLeft size={16} className="absolute left-3 top-3.5 text-muted dark:text-muted-dark" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Describe what's included - e.g. 'Includes labour only, spare parts charged extra. Free inspection on first visit.'"
                className="form-input form-input-icon resize-none"
              />
            </div>
            <p className="text-xs text-muted dark:text-muted-dark mt-1 text-right font-body">{description.length}/500</p>
          </div>

          {price && Number(price) > 0 ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-accent-light dark:bg-accent/10 border border-border dark:border-border-dark">
              <div>
                <p className="text-xs text-muted dark:text-muted-dark font-body">Customers will see</p>
                <p className="text-xl font-display font-extrabold text-accent-hover dark:text-green-400">
                  ₹{Number(price).toLocaleString("en-IN")}
                  {priceType === "hourly" ? (
                    <span className="text-sm font-body font-semibold text-muted dark:text-muted-dark ml-1">/hr</span>
                  ) : null}
                </p>
                <p className="text-xs text-muted dark:text-muted-dark font-body">
                  {formatDuration(duration)} · {selectedServiceObj?.name} · <span className="capitalize">{priceType === "inspection" ? "After Inspection" : priceType}</span>
                </p>
              </div>
              <IoCheckmarkCircle size={28} className="text-accent" />
            </div>
          ) : null}

          <div className="flex gap-3 pt-1">
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-border dark:border-border-dark rounded-xl font-semibold text-sm text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors font-body"
              >
                <FiX size={16} /> Cancel
              </button>
            ) : null}
            <button
              type="submit"
              disabled={isAdding}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm disabled:opacity-60 shadow-sm font-body"
            >
              {isAdding ? (
                <>
                  <AiOutlineLoading3Quarters size={18} className="animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <FiPlus size={18} /> Add Service
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
