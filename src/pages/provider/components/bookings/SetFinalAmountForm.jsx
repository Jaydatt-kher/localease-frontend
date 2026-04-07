import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { TbCurrencyRupee } from "react-icons/tb";
import { useSetFinalAmountMutation } from "../../../../api/providerApi";

export function SetFinalAmountForm({ booking, onSuccess }) {
  const [hoursWorked, setHoursWorked] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [setAmount, { isLoading }] = useSetFinalAmountMutation();

  const isHourly = booking.priceType === "hourly";
  const isInspection = booking.priceType === "inspection";

  const preview =
    isHourly && hoursWorked && booking.quotedPrice
      ? parseFloat((booking.quotedPrice * Number(hoursWorked)).toFixed(2))
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { id: booking._id };

    if (isHourly) {
      if (!hoursWorked || Number(hoursWorked) <= 0) {
        toast.error("Enter valid hours worked.");
        return;
      }
      body.hoursWorked = Number(hoursWorked);
    } else {
      if (!finalAmount || Number(finalAmount) <= 0) {
        toast.error("Enter a valid final amount.");
        return;
      }
      body.finalAmount = Number(finalAmount);
    }

    try {
      const res = await setAmount(body).unwrap();
      toast.success(res?.message || "Final amount saved!");
      onSuccess?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to set amount.");
    }
  };

  if (!isHourly && !isInspection) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-border dark:border-border-dark space-y-3">
      <p className="text-xs font-display font-bold text-foreground dark:text-foreground-dark">
        {isHourly ? "Set Hours Worked" : "Set Final Amount After Inspection"}
      </p>

      {isHourly ? (
        <div>
          <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
            Hours Worked
          </label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            placeholder="e.g. 2.5"
            className="form-input"
          />
          {preview != null ? (
            <p className="text-xs font-body text-accent-hover mt-1.5 flex items-center gap-1">
              <FiCheckCircle size={12} /> Final = <TbCurrencyRupee size={11} className="inline" />{booking.quotedPrice} × {hoursWorked}h = <strong>₹{preview.toLocaleString("en-IN")}</strong>
            </p>
          ) : null}
        </div>
      ) : null}

      {isInspection ? (
        <div>
          <label className="block text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1.5">
            Final Amount (₹)
          </label>
          <div className="relative">
            <TbCurrencyRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
            <input
              type="number"
              min="1"
              value={finalAmount}
              onChange={(e) => setFinalAmount(e.target.value)}
              placeholder="e.g. 1200"
              className="form-input form-input-icon"
            />
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-xs font-body font-bold rounded-xl hover:bg-primary-hover disabled:opacity-60 transition-colors"
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters size={13} className="animate-spin" /> Saving...
          </>
        ) : (
          <>
            <FiCheckCircle size={13} /> Confirm Amount
          </>
        )}
      </button>
    </form>
  );
}
