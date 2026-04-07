import { useMemo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircle, IoWarningOutline } from "react-icons/io5";
import { TbCurrentLocation, TbMapPin } from "react-icons/tb";
import { FieldLabel, SectionCard } from "./ProfileShared";

export function ServiceLocationSection({ formData, onChange, detectLocation, geoLoading, geoError, manualMode, setManualMode }) {
  const hasCoords = useMemo(() => {
    return (
      formData.serviceLocation?.coordinates?.length === 2 &&
      (formData.serviceLocation.coordinates[0] !== 0 || formData.serviceLocation.coordinates[1] !== 0)
    );
  }, [formData.serviceLocation]);

  return (
    <SectionCard title="Service Location" subtitle="Your base location on the map">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div
          className={`rounded-2xl border-2 p-5 text-center transition-colors ${hasCoords ? "border-accent bg-accent-light dark:bg-accent/10" : "border-dashed border-border dark:border-border-dark"}`}
        >
          {hasCoords ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <IoCheckmarkCircle size={26} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-display font-bold text-accent-hover dark:text-green-400">Location Set</p>
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-1">
                  Lat: <span className="font-mono">{formData.serviceLocation.coordinates[1].toFixed(5)}</span>, Lng: <span className="font-mono">{formData.serviceLocation.coordinates[0].toFixed(5)}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={detectLocation}
                className="text-xs font-semibold text-accent-hover hover:underline font-body mt-1"
              >
                Update via GPS
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary/10 flex items-center justify-center">
                <TbCurrentLocation size={28} className="text-primary" />
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={geoLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover font-body text-sm disabled:opacity-50"
              >
                {geoLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <TbCurrentLocation size={16} />}
                Detect My Location
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t md:border-t-0 md:border-l border-border dark:border-border-dark pt-5 md:pt-0 md:pl-6">
          <button
            type="button"
            onClick={() => setManualMode((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover font-body"
          >
            <TbMapPin size={16} />
            {manualMode ? "Hide Manual Coordinates" : "Enter Coordinates Manually"}
          </button>

          {manualMode ? (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div>
                <FieldLabel>Latitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={formData.serviceLocation?.coordinates?.[1] || ""}
                  onChange={(e) =>
                    onChange("serviceLocation", {
                      coordinates: [formData.serviceLocation.coordinates[0], parseFloat(e.target.value) || 0],
                    })
                  }
                  className="form-input font-mono text-sm py-2"
                />
              </div>
              <div>
                <FieldLabel>Longitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={formData.serviceLocation?.coordinates?.[0] || ""}
                  onChange={(e) =>
                    onChange("serviceLocation", {
                      coordinates: [parseFloat(e.target.value) || 0, formData.serviceLocation.coordinates[1]],
                    })
                  }
                  className="form-input font-mono text-sm py-2"
                />
              </div>
            </div>
          ) : null}

          {geoError ? (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <IoWarningOutline size={18} className="text-amber-600 dark:text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-300 font-body">{geoError}</p>
            </div>
          ) : null}

          <div className="flex items-start gap-2 p-2 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
            <FiInfo size={14} className="text-muted dark:text-muted-dark mt-0.5 shrink-0" />
            <p className="text-xs text-muted dark:text-muted-dark font-body">
              Location is used only to find nearby customers and calculate service radius.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
