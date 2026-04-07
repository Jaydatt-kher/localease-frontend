import { AlertCircle, MoreVertical, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { MethodBadge, StatusBadge } from "./PaymentsShared";

function PaymentDropdown({ payment, isOpen, onToggle, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const status = payment.paymentStatus;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="p-1.5 rounded-lg text-muted dark:text-muted-dark hover:bg-background-light dark:hover:bg-surface-alt hover:text-foreground dark:hover:text-foreground-dark transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-xl z-30 overflow-hidden animate-slide-down">
          {payment.bookingId ? (
            <a
              href={`/admin/bookings/${payment.bookingId}`}
              className="w-full text-left px-4 py-2 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-background-light dark:hover:bg-surface-alt transition-colors flex items-center gap-2"
              onClick={onClose}
            >
              View Booking
            </a>
          ) : null}

          {status === "completed" ? (
            <button
              className="w-full text-left px-4 py-2 text-sm font-body text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-t border-border dark:border-border-dark flex items-center gap-2"
              onClick={onClose}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Initiate Refund
            </button>
          ) : null}

          {status === "pending" ? (
            <button
              className="w-full text-left px-4 py-2 text-sm font-body text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-border dark:border-border-dark flex items-center gap-2"
              onClick={onClose}
            >
              <XCircle className="w-3.5 h-3.5" /> Mark as Failed
            </button>
          ) : null}

          {status === "failed" || status === "refunded" ? (
            <div className="px-4 py-2.5 text-xs font-body text-muted dark:text-muted-dark italic border-t border-border dark:border-border-dark">
              No actions available
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function PaymentsTable({
  tableHeads,
  isLoading,
  payments,
  fmtAmount,
  fmtDate,
  openDropdown,
  setOpenDropdown,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-262.5">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {tableHeads.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                {tableHeads.map((h) => (
                  <td key={h} className="px-4 py-3.5">
                    <div className="skeleton h-4 rounded-lg w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : payments.length === 0 ? (
            <tr>
              <td colSpan={tableHeads.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <AlertCircle className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">No payments found.</p>
                </div>
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment._id}
                className="group hover:bg-background-light dark:hover:bg-surface-alt transition-colors"
              >
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-mono text-muted dark:text-muted-dark">
                    #{String(payment._id).slice(-8).toUpperCase()}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  {payment.bookingId ? (
                    <a
                      href={`/admin/bookings/${payment.bookingId}`}
                      className="text-sm font-body font-semibold text-primary dark:text-blue-400 hover:underline"
                    >
                      {payment.bookingId}
                    </a>
                  ) : (
                    <span className="text-sm font-body text-muted dark:text-muted-dark">-</span>
                  )}
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {payment.user || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-foreground dark:text-foreground-dark">
                    {payment.provider || "-"}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {fmtAmount(payment.amount)}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                      {fmtAmount(payment.platformCommission)}
                    </span>
                    {payment.providerEarning != null ? (
                      <span className="text-[11px] font-body text-muted dark:text-muted-dark">
                        Provider: {fmtAmount(payment.providerEarning)}
                      </span>
                    ) : null}
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <MethodBadge method={payment.paymentMethod} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge status={payment.paymentStatus} />
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs font-body text-muted dark:text-muted-dark">
                    {fmtDate(payment.updatedAt || payment.createdAt)}
                  </span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap text-right">
                  <PaymentDropdown
                    payment={payment}
                    isOpen={openDropdown === payment._id}
                    onToggle={() =>
                      setOpenDropdown(openDropdown === payment._id ? null : payment._id)
                    }
                    onClose={() => setOpenDropdown(null)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
