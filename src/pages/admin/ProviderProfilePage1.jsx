import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import {
  useApproveProviderMutation,
  useBlockProviderMutation,
  useGetProviderByIdQuery,
  useRejectProviderMutation,
  useUnblockProviderMutation,
} from "../../api/adminApi";
import { ProviderMainPanels } from "./components/providerProfile/ProviderMainPanels";
import { ProviderProfileHeader } from "./components/providerProfile/ProviderProfileHeader";
import { ProviderOverviewCard } from "./components/providerProfile/ProviderOverviewCard";
import { ProviderSidebarPanels } from "./components/providerProfile/ProviderSidebarPanels";

export default function ProviderProfilePage1() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProviderByIdQuery(id);
  const [blockProvider, { isLoading: blocking }] = useBlockProviderMutation();
  const [unblockProvider, { isLoading: unblocking }] = useUnblockProviderMutation();
  const [approveProvider, { isLoading: approving }] = useApproveProviderMutation();
  const [rejectProvider, { isLoading: rejecting }] = useRejectProviderMutation();

  const actioning = blocking || unblocking || approving || rejecting;

  const runAction = useCallback(
    async (mutation, successMsg, errMsg) => {
      try {
        const response = await mutation(id).unwrap();
        toast.success(response.message || successMsg);
      } catch {
        toast.error(errMsg);
      }
    },
    [id]
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-muted dark:text-muted-dark">
        <AlertCircle className="w-12 h-12 opacity-30" />
        <p className="text-lg font-display font-semibold text-foreground dark:text-foreground-dark">
          Provider not found
        </p>
        <p className="text-sm font-body">This provider may have been deleted or the ID is invalid.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-body font-semibold hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const provider = data?.provider;
  const services = data?.services ?? [];
  const reviews = data?.reviews ?? [];
  const stats = data?.stats;
  const docs = provider?.documents ?? [];

  return (
    <div className="space-y-6">
      <ProviderProfileHeader onBack={() => navigate(-1)} />

      <ProviderOverviewCard
        isLoading={isLoading}
        provider={provider}
        actioning={actioning}
        blocking={blocking}
        unblocking={unblocking}
        approving={approving}
        rejecting={rejecting}
        onReject={() => runAction(rejectProvider, "Provider rejected.", "Failed to reject provider.")}
        onApprove={() => runAction(approveProvider, "Provider approved.", "Failed to approve provider.")}
        onUnblock={() => runAction(unblockProvider, "Provider unblocked.", "Failed to unblock provider.")}
        onBlock={() => runAction(blockProvider, "Provider blocked.", "Failed to block provider.")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProviderSidebarPanels isLoading={isLoading} provider={provider} docs={docs} />
        <ProviderMainPanels isLoading={isLoading} stats={stats} services={services} reviews={reviews} />
      </div>
    </div>
  );
}
