import { useEffect, useState } from "react";
import { useGetAdminPaymentsQuery, useGetAdminPaymentStatsQuery } from "../../api/adminApi";
import { PaymentsFilters } from "./components/payments/PaymentsFilters";
import { PaymentsHeader } from "./components/payments/PaymentsHeader";
import { PaymentsKpiGrid } from "./components/payments/PaymentsKpiGrid";
import { PaymentsPagination } from "./components/payments/PaymentsPagination";
import { PaymentsTable } from "./components/payments/PaymentsTable";

const ITEMS_PER_PAGE = 10;
const TABLE_HEADS = [
  "Payment ID",
  "Booking ID",
  "User",
  "Provider",
  "Amount",
  "Commission",
  "Method",
  "Status",
  "Date",
  "Actions",
];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function PaymentsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 350);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, methodFilter]);

  const { data: statsData } = useGetAdminPaymentStatsQuery();
  const { data: paymentsData, isLoading, isFetching } = useGetAdminPaymentsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
    method: methodFilter,
  });

  const currentPayments = paymentsData?.payments || [];
  const totalCount = paymentsData?.total || 0;
  const totalPages = paymentsData?.pages || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  const kpiTotal = statsData?.total || 0;
  const kpiRevenue = statsData?.totalRevenue || 0;
  const kpiPending = statsData?.pending || 0;
  const kpiFailed = statsData?.failed || 0;

  const fmtDate = (iso) => {
    if (!iso) {
      return "-";
    }

    return (
      new Date(iso).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " - " +
      new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const fmtAmount = (val) => {
    if (val == null) {
      return "-";
    }

    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i += 1
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    return [1, ...range, totalPages];
  })();

  return (
    <div className="space-y-6">
      <PaymentsHeader />

      <PaymentsKpiGrid
        total={kpiTotal}
        revenue={kpiRevenue}
        pending={kpiPending}
        failed={kpiFailed}
      />

      <PaymentsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
        methodFilter={methodFilter}
        onMethodChange={(value) => {
          setMethodFilter(value);
          setCurrentPage(1);
        }}
        isFetching={isFetching}
      />

      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        <PaymentsTable
          tableHeads={TABLE_HEADS}
          isLoading={isLoading}
          payments={currentPayments}
          fmtAmount={fmtAmount}
          fmtDate={fmtDate}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        <PaymentsPagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={totalCount}
          onPrev={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          onNext={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
          onPageSelect={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
