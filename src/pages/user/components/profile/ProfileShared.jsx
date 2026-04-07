import { FiAlertTriangle, FiEdit2 } from "react-icons/fi";
import {
  MdOutlineAccountCircle,
  MdOutlinePayments,
  MdOutlineSecurity,
} from "react-icons/md";

export function formatDate(iso) {
  if (!iso) {
    return "-";
  }
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso) {
  if (!iso) {
    return "-";
  }
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const TABS = [
  { id: "overview", label: "Overview", icon: <MdOutlineAccountCircle size={17} /> },
  { id: "edit", label: "Edit", icon: <FiEdit2 size={15} /> },
  { id: "security", label: "Security", icon: <MdOutlineSecurity size={17} /> },
  { id: "payments", label: "Payments", icon: <MdOutlinePayments size={17} /> },
  { id: "danger", label: "Account", icon: <FiAlertTriangle size={15} /> },
];

export const BOOKING_STATUS = {
  confirmed: { label: "Confirmed", cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  in_progress: { label: "In Progress", cls: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  completed: { label: "Completed", cls: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
  cancelled: { label: "Cancelled", cls: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
};

export const PAYMENT_STATUS = {
  pending: { label: "Pending", cls: "text-amber-600 dark:text-amber-400" },
  completed: { label: "Paid", cls: "text-green-600 dark:text-green-400" },
  failed: { label: "Failed", cls: "text-red-500" },
  refunded: { label: "Refunded", cls: "text-purple-600 dark:text-purple-400" },
};
