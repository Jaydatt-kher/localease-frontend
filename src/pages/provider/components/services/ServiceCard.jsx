import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck, FiClock, FiEdit3, FiToggleLeft, FiToggleRight, FiTrash2, FiX } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { useUpdateProviderServiceMutation } from "../../../../api/providerApi";
import {
  DURATION_PRESETS,
  FieldLabel,
  formatDuration,
  getCatIcon,
} from "./ProviderServicesShared";

export function ServiceCard({ ps, onToggle, onDelete, togglingId, deletingId }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    price: ps.price,
    priceType: ps.priceType || "fixed",
    duration: ps.duration,
    description: ps.description || "",
  });

  const [updateProviderService, { isLoading: isSaving }] = useUpdateProviderServiceMutation();

  const serviceName = ps.serviceId?.name || "Unknown Service";
  const categoryName = ps.serviceId?.category?.name || "";

  const handleSave = async () => {
    if (editData.priceType !== "inspection" && (!editData.price || Number(editData.price) <= 0)) {
      toast.error(`Price is required for ${editData.priceType} pricing.`);
      return;
    }

    try {
      await updateProviderService({
        id: ps._id,
        price:
          editData.priceType === "inspection"
            ? editData.price
              ? Number(editData.price)
              : 0
            : Number(editData.price),
        priceType: editData.priceType,
        duration: Number(editData.duration),
        description: editData.description,
      }).unwrap();
      toast.success("Service updated.");
      setEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  return (
    <div
      className={`border border-border dark:border-border-dark rounded-2xl overflow-hidden transition-all ${
        !ps.isAvailable ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
          {getCatIcon(categoryName)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark leading-tight">
                {serviceName}
              </p>
              {categoryName ? (
                <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-light dark:bg-primary/10 text-primary font-body">
                  {categoryName}
                </span>
              ) : null}
            </div>

            <button
              onClick={() => onToggle(ps._id, ps.isAvailable)}
              disabled={togglingId === ps._id}
              className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-light dark:hover:bg-surface-alt border-border dark:border-border-dark"
              title={ps.isAvailable ? "Mark as unavailable" : "Mark as available"}
            >
              {togglingId === ps._id ? (
                <AiOutlineLoading3Quarters size={13} className="animate-spin text-muted dark:text-muted-dark" />
              ) : ps.isAvailable ? (
                <FiToggleRight size={16} className="text-accent" />
              ) : (
                <FiToggleLeft size={16} className="text-muted dark:text-muted-dark" />
              )}
              <span className={ps.isAvailable ? "text-accent-hover" : "text-muted dark:text-muted-dark"}>
                {ps.isAvailable ? "Active" : "Inactive"}
              </span>
            </button>
          </div>

          {!editing ? (
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
                <TbCurrencyRupee size={13} />
                {ps.price.toLocaleString("en-IN")}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
                <FiClock size={12} />
                {formatDuration(ps.duration)}
              </span>
              {ps.priceType ? (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full font-body capitalize ${
                    ps.priceType === "fixed"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : ps.priceType === "hourly"
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {ps.priceType === "inspection" ? "After Inspection" : ps.priceType}
                </span>
              ) : null}
            </div>
          ) : null}

          {!editing && ps.description ? (
            <p className="text-xs text-muted dark:text-muted-dark mt-2 leading-relaxed font-body line-clamp-2">
              {ps.description}
            </p>
          ) : null}
        </div>
      </div>

      {editing ? (
        <div className="px-4 pb-4 pt-0 border-t border-border dark:border-border-dark bg-background-light dark:bg-surface-alt space-y-4">
          <div className="grid grid-cols-2 gap-4 pt-4">
            {editData.priceType === "inspection" ? (
              <div className="col-span-2 flex items-start gap-2.5 p-3 rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                <IoWarningOutline size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300 font-body">
                  <span className="font-bold">Inspection pricing</span> - no upfront price shown. You quote the customer after your site visit.
                </p>
              </div>
            ) : (
              <div>
                <FieldLabel required>
                  Price (₹)
                  {editData.priceType === "hourly" ? (
                    <span className="text-xs font-normal text-muted dark:text-muted-dark ml-1">per hour</span>
                  ) : null}
                </FieldLabel>
                <div className="relative">
                  <TbCurrencyRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  <input
                    type="number"
                    min={1}
                    value={editData.price}
                    onChange={(e) => setEditData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder={editData.priceType === "hourly" ? "e.g. 300" : "e.g. 499"}
                    className="form-input form-input-icon"
                  />
                </div>
              </div>
            )}

            <div>
              <FieldLabel>Duration</FieldLabel>
              <select
                value={editData.duration}
                onChange={(e) => setEditData((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                className="form-input appearance-none cursor-pointer"
              >
                {DURATION_PRESETS.map((duration) => (
                  <option key={duration} value={duration}>
                    {formatDuration(duration)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <FieldLabel>Price Type</FieldLabel>
            <select
              value={editData.priceType}
              onChange={(e) => setEditData((prev) => ({ ...prev, priceType: e.target.value }))}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="fixed">Fixed - flat rate per visit</option>
              <option value="hourly">Hourly - charged per hour</option>
              <option value="inspection">After Inspection - price set on-site</option>
            </select>
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
              rows={2}
              maxLength={500}
              placeholder="Describe what's included in this service..."
              className="form-input resize-none"
            />
            <p className="text-xs text-muted dark:text-muted-dark mt-1 text-right font-body">
              {editData.description.length}/500
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 px-4 py-2 border border-border dark:border-border-dark rounded-xl text-sm font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors font-body"
            >
              <FiX size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors disabled:opacity-60 font-body"
            >
              {isSaving ? (
                <AiOutlineLoading3Quarters size={14} className="animate-spin" />
              ) : (
                <FiCheck size={14} />
              )}
              Save
            </button>
          </div>
        </div>
      ) : null}

      {!editing ? (
        <div className="flex border-t border-border dark:border-border-dark divide-x divide-border dark:divide-border-dark">
          <button
            onClick={() => setEditing(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-muted dark:text-muted-dark hover:text-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-colors font-body"
          >
            <FiEdit3 size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(ps._id)}
            disabled={deletingId === ps._id}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-muted dark:text-muted-dark hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 font-body"
          >
            {deletingId === ps._id ? <AiOutlineLoading3Quarters size={13} className="animate-spin" /> : <FiTrash2 size={13} />}
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}
