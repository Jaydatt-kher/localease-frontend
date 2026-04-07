import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useBlockUserMutation,
  useGetUserByIdQuery,
  useUnblockUserMutation,
} from "../../api/adminApi";
import { UserProfileContactCard } from "./components/userProfile/UserProfileContactCard";
import { UserProfileErrorState } from "./components/userProfile/UserProfileErrorState";
import { UserProfileHeader } from "./components/userProfile/UserProfileHeader";
import { UserProfileHeroCard } from "./components/userProfile/UserProfileHeroCard";
import { UserProfileRecentBookings } from "./components/userProfile/UserProfileRecentBookings";
import { UserProfileStatsGrid } from "./components/userProfile/UserProfileStatsGrid";

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetUserByIdQuery(id);
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: unblocking }] = useUnblockUserMutation();

  const actioning = blocking || unblocking;

  const handleBlock = async () => {
    try {
      const res = await blockUser(id).unwrap();
      toast.success(res.message || "User blocked.");
    } catch {
      toast.error("Failed to block user.");
    }
  };

  const handleUnblock = async () => {
    try {
      const res = await unblockUser(id).unwrap();
      toast.success(res.message || "User unblocked.");
    } catch {
      toast.error("Failed to unblock user.");
    }
  };

  if (isError) {
    return <UserProfileErrorState onBack={() => navigate("/admin/users")} />;
  }

  const user = data?.user;
  const stats = data?.stats;
  const bookings = data?.recentBookings ?? [];

  return (
    <div className="space-y-6">
      <UserProfileHeader onBack={() => navigate("/admin/users")} />

      <UserProfileHeroCard
        isLoading={isLoading}
        user={user}
        actioning={actioning}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <UserProfileContactCard isLoading={isLoading} user={user} />
        </div>

        <div className="lg:col-span-2 space-y-5">
          <UserProfileStatsGrid isLoading={isLoading} stats={stats} />
          <UserProfileRecentBookings isLoading={isLoading} bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
