import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { useRespondToRequestMutation, useUpdateMyBidMutation } from "../../../../api/providerApi";
import { fmtDateInput, minDateTime, PRICE_TYPE_OPTS } from "./requestsShared";

export function BidForm({ request, isUpdate = false, existingBid, onSuccess, onCancel, initialPriceType }) {
  const [priceType, setPriceType] = useState(existingBid?.priceType ?? initialPriceType ?? "inspection");
  const [price, setPrice] = useState(existingBid?.price ?? "");
  const [availableTime, setAt] = useState(existingBid?.availableTime ? fmtDateInput(existingBid.availableTime) : "");
  const [message, setMessage] = useState(existingBid?.message ?? "");

  const [respond, { isLoading: responding }] = useRespondToRequestMutation();
  const [update, { isLoading: updating }] = useUpdateMyBidMutation();

  const isBusy = responding || updating;
  const needsPrice = priceType !== "inspection";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!availableTime) {
      toast.error("Please choose your available date & time.");
      return;
    }
    if (needsPrice && (!price || Number(price) <= 0)) {
      toast.error("Enter a valid price greater than 0.");
      return;
    }

    const body = {
      responseId: request._id,
      priceType,
      availableTime: new Date(availableTime).toISOString(),
      message: message.trim() || undefined,
    };

    if (needsPrice) {
      body.price = Number(price);
    }

    try {
      if (isUpdate) {
        await update(body).unwrap();
        toast.success("Bid updated successfully!");
      } else {
        await respond(body).unwrap();
        toast.success("Bid submitted! The customer will be notified.");
      }
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit bid.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 pt-4 border-t border-border dark:border-border-dark space-y-4"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark">
        {isUpdate ? "Update Your Bid" : "Submit Your Bid"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">Price Type</label>
          <select
            value={priceType}
            onChange={(e) => {
              setPriceType(e.target.value);
              if (e.target.value === "inspection") {
                setPrice("");
              }
            }}
            className="form-input appearance-none cursor-pointer"
          >
            {PRICE_TYPE_OPTS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
            {priceType === "hourly" ? "Hourly Rate (₹)" : "Price (₹)"}
            {!needsPrice ? <span className="text-muted dark:text-muted-dark font-normal ml-1">(optional)</span> : null}
          </label>
          <div className="relative">
            <TbCurrencyRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={priceType === "inspection" ? "Optional" : "e.g. 499"}
              className="form-input form-input-icon"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
          Your Available Date & Time <span className="text-red-400">*</span>
        </label>
        <input
          type="datetime-local"
          min={minDateTime()}
          value={availableTime}
          onChange={(e) => setAt(e.target.value)}
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
          Message <span className="font-normal text-muted dark:text-muted-dark">(optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          maxLength={300}
          placeholder="e.g. 'I can come earlier if needed. Parts not included.'"
          className="form-input resize-none"
        />
        <p className="text-[10px] text-muted dark:text-muted-dark font-body mt-0.5 text-right">{message.length}/300</p>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isBusy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-body font-bold rounded-xl hover:bg-primary-hover disabled:opacity-60 transition-colors"
        >
          {isBusy ? (
            <>
              <AiOutlineLoading3Quarters size={14} className="animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <FiCheck size={14} /> {isUpdate ? "Update Bid" : "Send Bid"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-border dark:border-border-dark text-sm font-body font-semibold text-muted dark:text-muted-dark hover:border-primary hover:text-primary transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
