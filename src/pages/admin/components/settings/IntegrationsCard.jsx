import { CheckCircle, Clock, DollarSign, Mail, MessageSquare } from "lucide-react";

const INTEGRATIONS = [
  {
    name: "Email Service",
    provider: "Nodemailer",
    status: "Active",
    icon: Mail,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-50 dark:bg-blue-900/20",
    statusBadge: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    name: "Payment Gateway",
    provider: "Razorpay",
    status: "Connected",
    icon: DollarSign,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    iconBgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    statusBadge: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    name: "SMS Service",
    provider: "Twilio",
    status: "Active",
    icon: MessageSquare,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-50 dark:bg-purple-900/20",
    statusBadge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  {
    name: "Monitoring & APM",
    provider: "New Relic",
    status: "Optional",
    icon: CheckCircle,
    iconColor: "text-red-600 dark:text-red-400",
    iconBgColor: "bg-red-50 dark:bg-red-900/20",
    statusBadge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
];

export function IntegrationsCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground dark:text-foreground-dark">
            Integrations
          </h3>
          <p className="text-sm font-body text-muted dark:text-muted-dark">
            View connected services and integrations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.name}
            className="bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark rounded-xl p-4 transition-colors hover:border-primary/30"
          >
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 ${integration.iconBgColor} rounded-lg shrink-0`}>
                  <integration.icon className={`w-5 h-5 ${integration.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
                    {integration.name}
                  </h4>
                  <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
                    {integration.provider}
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-semibold border ${integration.statusBadge} ${
                    integration.statusBadge.includes("bg-gray")
                      ? "border-gray-200 dark:border-gray-700"
                      : "border-green-200 dark:border-green-900/50"
                  }`}
                >
                  {integration.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 flex items-start gap-3">
        <div className="text-amber-600 dark:text-amber-400 mt-0.5">
          <CheckCircle className="w-5 h-5" />
        </div>
        <p className="text-sm font-body text-amber-800 dark:text-amber-300 leading-relaxed">
          <span className="font-bold">Note:</span> Integration settings and API keys are managed in secure environment variables and cannot be modified from this interface.
        </p>
      </div>
    </div>
  );
}
