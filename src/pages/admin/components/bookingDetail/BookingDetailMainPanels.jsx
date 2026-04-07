import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  Hash,
  MapPin,
  MessageSquare,
  Package,
  ShieldAlert,
  Star,
  Wrench,
  XCircle,
} from "lucide-react";
import {
  fmtCurrency,
  fmtDate,
  fmtDateTime,
  InfoRow,
  PaymentBadge,
  PriceTypeChip,
  SectionCard,
  StarRating,
} from "./BookingDetailShared";

export function BookingDetailMainPanels({ booking }) {
  return (
    <div className="lg:col-span-2 space-y-5">
      <SectionCard
        title="Booking Summary"
        subtitle="Core booking information"
        icon={Hash}
        iconColor="text-primary dark:text-blue-400"
        iconBg="bg-primary-light dark:bg-primary/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <InfoRow icon={Hash} label="Booking ID" value={booking.bookingId} mono />
          <InfoRow icon={Calendar} label="Scheduled Date" value={fmtDateTime(booking.scheduledTime)} />
          <InfoRow icon={Package} label="Price Type" value={<PriceTypeChip type={booking.priceType} />} />
          <InfoRow
            icon={DollarSign}
            label="Quoted Price"
            value={
              booking.priceType === "hourly"
                ? `${fmtCurrency(booking.quotedPrice)}/hr`
                : fmtCurrency(booking.quotedPrice)
            }
          />
          {booking.priceType === "hourly" ? (
            <InfoRow
              icon={Clock}
              label="Hours Worked"
              value={
                booking.hoursWorked != null
                  ? `${booking.hoursWorked} hr${booking.hoursWorked !== 1 ? "s" : ""}`
                  : "Not set yet"
              }
            />
          ) : null}
          <InfoRow icon={DollarSign} label="Final Amount" value={fmtCurrency(booking.finalAmount)} />
          <InfoRow icon={MapPin} label="Service Address" value={booking.bookingAddress?.text} />
          <InfoRow icon={Calendar} label="Booked On" value={fmtDate(booking.createdAt)} />
          {booking.completedAt ? (
            <InfoRow icon={CheckCircle} label="Completed At" value={fmtDateTime(booking.completedAt)} />
          ) : null}
        </div>
      </SectionCard>

      <SectionCard
        title="Service"
        subtitle="Service booked by the customer"
        icon={Wrench}
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBg="bg-indigo-50 dark:bg-indigo-900/20"
      >
        <InfoRow icon={Wrench} label="Service Name" value={booking.service?.name} />
        {booking.service?.description ? (
          <InfoRow icon={FileText} label="Description" value={booking.service.description} />
        ) : null}
        {booking.enquiry?.description ? (
          <InfoRow icon={MessageSquare} label="Customer's Issue" value={booking.enquiry.description} />
        ) : null}
      </SectionCard>

      <SectionCard
        title="Payment"
        subtitle="Transaction & financial breakdown"
        icon={CreditCard}
        iconColor="text-violet-600 dark:text-violet-400"
        iconBg="bg-violet-50 dark:bg-violet-900/20"
      >
        {booking.payment ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow icon={CreditCard} label="Payment Status" value={<PaymentBadge status={booking.payment.paymentStatus} />} />
            <InfoRow icon={DollarSign} label="Amount Paid" value={fmtCurrency(booking.payment.amount)} />
            <InfoRow
              icon={Package}
              label="Method"
              value={booking.payment.paymentMethod === "cash_on_service" ? "Cash on Service" : "Online"}
            />
            <InfoRow icon={Hash} label="Transaction ID" value={booking.payment.transactionId || "N/A"} mono />
            <InfoRow icon={DollarSign} label="Platform Commission" value={fmtCurrency(booking.payment.platformCommission)} />
            <InfoRow icon={DollarSign} label="Provider Earning" value={fmtCurrency(booking.payment.providerEarning)} />
            {booking.payment.refund?.status !== "na" ? (
              <InfoRow icon={XCircle} label="Refund Status" value={booking.payment.refund?.status} />
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-muted dark:text-muted-dark">
            <CreditCard className="w-8 h-8 opacity-25" />
            <p className="text-sm font-body">No payment record yet</p>
          </div>
        )}
      </SectionCard>

      {booking.dispute?.isRaised ? (
        <SectionCard
          title="Dispute"
          subtitle="Dispute raised on this booking"
          icon={ShieldAlert}
          iconColor="text-danger dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-900/20"
        >
          <InfoRow icon={ShieldAlert} label="Dispute Status" value={booking.dispute.status} />
          <InfoRow icon={MessageSquare} label="Reason" value={booking.dispute.reason} />
          {booking.dispute.adminComment ? (
            <InfoRow icon={FileText} label="Admin Comment" value={booking.dispute.adminComment} />
          ) : null}
        </SectionCard>
      ) : null}

      {booking.review ? (
        <SectionCard
          title="Customer Review"
          subtitle="Rating left after service completion"
          icon={Star}
          iconColor="text-yellow-500"
          iconBg="bg-yellow-50 dark:bg-yellow-900/20"
        >
          <div className="space-y-3">
            <StarRating rating={booking.review.rating} />
            {booking.review.comment ? (
              <p className="text-sm font-body text-foreground dark:text-foreground-dark italic leading-relaxed border-l-2 border-primary/30 pl-3 mt-2">
                "{booking.review.comment}"
              </p>
            ) : null}
            <p className="text-xs font-body text-muted dark:text-muted-dark">
              {fmtDate(booking.review.createdAt)}
            </p>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
