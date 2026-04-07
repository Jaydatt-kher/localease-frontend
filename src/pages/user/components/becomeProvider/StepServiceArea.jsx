import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircle, IoWarningOutline } from "react-icons/io5";
import { TbCurrentLocation, TbMapPin } from "react-icons/tb";
import { FieldLabel, SectionCard } from "./BecomeProviderShared";

export function StepServiceArea({ data, onChange }) {
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [manualMode, setManualMode] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange("serviceLocation", {
          coordinates: [pos.coords.longitude, pos.coords.latitude],
        });
        setGeoLoading(false);
        setManualMode(false);
        toast.success("Location detected successfully!");
      },
      () => {
        setGeoError("Location access denied. Please enter coordinates manually.");
        setGeoLoading(false);
        setManualMode(true);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const hasCoords =
    data.serviceLocation?.coordinates?.length === 2 &&
    (data.serviceLocation.coordinates[0] !== 0 || data.serviceLocation.coordinates[1] !== 0);

  return (
    <SectionCard title="Your Service Location" subtitle="Set your base location so customers can find you nearby">
      <div className="space-y-6">
        <div
          className={`rounded-2xl border-2 p-5 text-center transition-colors ${hasCoords ? "border-accent bg-accent-light dark:bg-accent/10" : "border-dashed border-border dark:border-border-dark"}`}
        >
          {hasCoords ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <IoCheckmarkCircle size={26} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-display font-bold text-accent-hover dark:text-green-400">Location Set!</p>
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-1">
                  Lat: <span className="font-mono">{data.serviceLocation.coordinates[1].toFixed(5)}</span>, Lng: <span className="font-mono">{data.serviceLocation.coordinates[0].toFixed(5)}</span>
                </p>
              </div>
              <button type="button" onClick={detectLocation} className="text-xs font-semibold text-accent-hover hover:underline font-body">
                Re-detect location
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary/10 flex items-center justify-center">
                <TbCurrentLocation size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Detect My Location</p>
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-1">
                  We need your location to show you in nearby search results.
                </p>
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={geoLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-60 font-body text-sm"
              >
                {geoLoading ? (
                  <>
                    <AiOutlineLoading3Quarters size={16} className="animate-spin" /> Detecting...
                  </>
                ) : (
                  <>
                    <TbCurrentLocation size={16} /> Use My Location
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {geoError ? (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <IoWarningOutline size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-300 font-body">{geoError}</p>
          </div>
        ) : null}

        <div>
          <button
            type="button"
            onClick={() => setManualMode((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors font-body"
          >
            <TbMapPin size={16} />
            {manualMode ? "Hide manual entry" : "Enter coordinates manually"}
          </button>

          {manualMode ? (
            <div className="mt-4 grid grid-cols-2 gap-4 animate-fade-in">
              <div>
                <FieldLabel required>Latitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={data.serviceLocation?.coordinates?.[1] || ""}
                  onChange={(e) =>
                    onChange("serviceLocation", {
                      coordinates: [
                        data.serviceLocation?.coordinates?.[0] || 0,
                        parseFloat(e.target.value) || 0,
                      ],
                    })
                  }
                  placeholder="e.g. 23.0225"
                  className="form-input font-mono"
                />
              </div>
              <div>
                <FieldLabel required>Longitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={data.serviceLocation?.coordinates?.[0] || ""}
                  onChange={(e) =>
                    onChange("serviceLocation", {
                      coordinates: [
                        parseFloat(e.target.value) || 0,
                        data.serviceLocation?.coordinates?.[1] || 0,
                      ],
                    })
                  }
                  placeholder="e.g. 72.5714"
                  className="form-input font-mono"
                />
              </div>
              <p className="col-span-2 text-xs text-muted dark:text-muted-dark font-body">
                You can find your coordinates at <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Maps</a> - Right-click your location - copy the lat/lng.
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-primary-light dark:bg-primary/10 border border-border dark:border-border-dark">
          <FiInfo size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted dark:text-muted-dark leading-relaxed font-body">
            Your exact location is only used to match you with customers within your service radius. Customers see your approximate area, not your precise address.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
