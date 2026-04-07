import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetNearbyProvidersQuery } from "../../api/providerApi";
import { useUpdateUserLocationMutation } from "../../api/bookingApi";
import { setLocation, selectLocationCoords, selectHasLocation } from "../../redux/locationSlice";
import { selectIsLoggedIn, selectUser } from "../../redux/authSlice";
import { FiArrowRight, FiMapPin, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { HiCheckBadge } from "react-icons/hi2";
import ProviderServicesModal from "../provider/ProviderServicesModal";

function StarRating({ value = 0, count = 0 }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.floor(rounded)
          ? <IoStar key={i} size={12} className="text-yellow-400" />
          : <IoStarOutline key={i} size={12} className="text-yellow-300 dark:text-yellow-600" />
      )}
      <span className="text-xs text-muted dark:text-muted-dark font-body ml-1">
        {value > 0 ? value.toFixed(1) : "New"}{count > 0 ? ` (${count})` : ""}
      </span>
    </div>
  );
}

function Avatar({ name, size = 56 }) {
  const initials = name ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "?";
  return (
    <div
      className="rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary border-2 border-primary/20 flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </div>
  );
}

function ProviderCard({ provider, onView, onEnquire }) {
  const rating = provider.rating || {};

                                    const distanceM = provider.distanceFromUser;                           const hasDistance = distanceM != null;                                 const distKm = hasDistance ? (distanceM / 1000).toFixed(1) : null;    const distLabel = distKm === "0.0" ? "< 0.1 km" : `${distKm} km`;  
  return (
    <div className="w-64 flex-shrink-0 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
      <div className="flex gap-3 mb-3">
        <Avatar name={provider.businessName} size={52} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 truncate">
            <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark truncate">{provider.businessName || "Provider"}</p>
            {provider.isVerified && <HiCheckBadge size={16} className="text-accent flex-shrink-0" />}
          </div>
          <StarRating value={rating.average} count={rating.count} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {}
        {hasDistance && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-light dark:bg-primary/10 text-primary font-body">
            <FiMapPin size={11} />{distLabel}
          </span>
        )}
        {provider.experienceYears > 0 && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-background-light dark:bg-surface-alt text-muted dark:text-muted-dark border border-border dark:border-border-dark font-body">
            <FiBriefcase size={11} />{provider.experienceYears} yrs
          </span>
        )}
        {provider.completedJobs > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-light dark:bg-accent/10 text-accent-hover font-body">
            ✓ {provider.completedJobs} jobs
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => onView(provider._id)}
          className="flex-1 py-2 text-xs font-bold border border-border dark:border-border-dark text-foreground dark:text-foreground-dark rounded-xl hover:border-primary hover:text-primary transition-colors font-body">
          Profile
        </button>
        <button onClick={() => onEnquire(provider._id)}
          className="flex-1 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-1 font-body">
          <FiMessageSquare size={12} /> Enquire
        </button>
      </div>
    </div>
  );
}

function ProviderSkeleton() {
  return (
    <div className="w-64 flex-shrink-0 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-5">
      <div className="flex gap-3 mb-3">
        <div className="skeleton w-14 h-14 rounded-full" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
          <div className="skeleton h-3.5 w-4/5 rounded" />
          <div className="skeleton h-2.5 w-3/5 rounded" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
      <div className="skeleton h-9 rounded-xl" />
    </div>
  );
}

export default function NearbyProviders() {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user       = useSelector(selectUser);

  const coords    = useSelector(selectLocationCoords);
  const hasCoords = useSelector(selectHasLocation);

  const [updateUserLocation] = useUpdateUserLocationMutation();
  const [enquiryProviderId, setEnquiryProviderId] = useState(null);
  const [resolving, setResolving] = useState(!hasCoords);

  useEffect(() => {
    if (hasCoords) { setResolving(false); return; }
    if (!navigator.geolocation) { setResolving(false); return; }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        dispatch(setLocation({ lat, lng, label: "Current Location", address: "Current Location", isLive: true }));
        if (isLoggedIn) {
          try { await updateUserLocation({ lat, lng, address: "Current Location" }).unwrap(); }
          catch (_) {  }
        }
        setResolving(false);
      },
      () => setResolving(false),
      { timeout: 8000 }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: providers = [], isLoading } = useGetNearbyProvidersQuery(
    coords ? { lat: coords.lat, lng: coords.lng, radius: 10 } : {},
    { skip: !coords }
  );

  const showSkeletons = resolving || (isLoading && !!coords);

  if (!resolving && !coords) return null;

  return (
    <section className="py-12 bg-surface-light dark:bg-surface-dark border-t border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Providers Near You</h2>
            <p className="text-sm text-muted dark:text-muted-dark mt-1 font-body">
              Verified professionals within 10 km of your selected location
            </p>
          </div>
          <button onClick={() => navigate("/services")}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors font-body">
            See all <FiArrowRight size={15} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {showSkeletons
            ? Array.from({ length: 5 }).map((_, i) => <ProviderSkeleton key={i} />)
            : providers.length > 0
              ? providers.slice(0, 10).map((p) => (
                  <ProviderCard key={p._id} provider={p}
                    onView={(id) => navigate(`/providers/${id}`)}
                    onEnquire={(id) => {
                      if (!user) { navigate("/signup"); return; }
                      setEnquiryProviderId(id);
                    }} />
                ))
              : (
                <div className="flex-1 flex flex-col items-center justify-center py-10 gap-3 text-muted dark:text-muted-dark">
                  <FiMapPin size={36} className="text-primary/40" />
                  <p className="font-body text-sm">No providers found nearby. Try expanding the radius.</p>
                </div>
              )
          }
        </div>
      </div>
      {}
      {enquiryProviderId && (
        <ProviderServicesModal
          providerId={enquiryProviderId}
          onClose={() => setEnquiryProviderId(null)}
        />
      )}
    </section>
  );
}