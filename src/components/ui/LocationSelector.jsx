import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMapPin, FiNavigation, FiSearch, FiX, FiChevronDown, FiLoader } from "react-icons/fi";
import { setLocation, selectLocation } from "../../redux/locationSlice";
import { selectIsLoggedIn } from "../../redux/authSlice";
import { useUpdateUserLocationMutation } from "../../api/bookingApi";   

async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`;
  const res  = await fetch(url, { headers: { "Accept-Language": "en" } });
  if (!res.ok) throw new Error("Reverse geocode failed");
  const data = await res.json();
  const { city, town, village, state, country } = data.address ?? {};
  const place = city || town || village || "Unknown";
  return {
    label:   `${place}, ${state ?? country ?? ""}`.trim(),
    address: data.display_name,
  };
}

async function forwardGeocode(query) {
  if (!query.trim()) return [];
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&accept-language=en`;
  const res  = await fetch(url, { headers: { "Accept-Language": "en" } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((r) => ({
    label: r.display_name,
    lat:   parseFloat(r.lat),
    lng:   parseFloat(r.lon),
  }));
}

export default function LocationSelector() {
  const dispatch   = useDispatch();
  const location   = useSelector(selectLocation);
  const isLoggedIn = useSelector(selectIsLoggedIn);

    const [updateUserLocation, { isLoading: isSaving }] = useUpdateUserLocationMutation();

  const [open,        setOpen]        = useState(false);
  const [tab,         setTab]         = useState("live");     const [gpsStatus,   setGpsStatus]   = useState("idle");     const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching,   setSearching]   = useState(false);

  const panelRef    = useRef(null);
  const searchTimer = useRef(null);

    useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

    useEffect(() => {
    if (tab !== "manual") return;
    clearTimeout(searchTimer.current);
    if (searchQuery.trim().length < 2) { setSuggestions([]); return; }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      const results = await forwardGeocode(searchQuery);
      setSuggestions(results);
      setSearching(false);
    }, 400);
    return () => clearTimeout(searchTimer.current);
  }, [searchQuery, tab]);

    const persistLocation = useCallback(async (lat, lng, address) => {
    if (!isLoggedIn) return;
    try {
      await updateUserLocation({ lat, lng, address }).unwrap();
    } catch (_) {
          }
  }, [isLoggedIn, updateUserLocation]);

    const handleLiveLocation = () => {
    if (!navigator.geolocation) { setGpsStatus("error"); return; }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lng } = pos.coords;
          const { label, address } = await reverseGeocode(lat, lng);
          dispatch(setLocation({ lat, lng, label, address, isLive: true }));
          await persistLocation(lat, lng, address);
          setGpsStatus("done");
          setTimeout(() => setOpen(false), 600);
        } catch {
          setGpsStatus("error");
        }
      },
      () => setGpsStatus("error"),
      { timeout: 10000 }
    );
  };

    const handleSelectSuggestion = async (suggestion) => {
    const { lat, lng, label } = suggestion;
    dispatch(setLocation({ lat, lng, label, address: label, isLive: false }));
    await persistLocation(lat, lng, label);
    setSuggestions([]);
    setSearchQuery("");
    setOpen(false);
  };

  const pillLabel = location.label
    ? location.label.length > 24 ? location.label.slice(0, 22) + "…" : location.label
    : "Select Location";

  return (
    <div className="relative" ref={panelRef}>

      {}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border dark:border-border-dark bg-surface-light dark:bg-surface-dark text-foreground dark:text-foreground-dark text-sm font-body font-medium hover:border-primary hover:text-primary transition-colors"
      >
        <FiMapPin size={14} className={location.label ? "text-primary" : "text-muted dark:text-muted-dark"} />
        <span>{pillLabel}</span>
        <FiChevronDown size={13} className="text-muted dark:text-muted-dark" />
      </button>

      {}
      {open && (
        <div className="absolute top-full mt-2 left-0 z-50 w-80 rounded-2xl shadow-xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark overflow-hidden">

          {}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-border-dark">
            <span className="text-sm font-display font-bold text-foreground dark:text-foreground-dark">Choose Location</span>
            <button onClick={() => setOpen(false)} className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark">
              <FiX size={16} />
            </button>
          </div>

          {}
          <div className="flex border-b border-border dark:border-border-dark text-sm font-body">
            {["live", "manual"].map((t) => (
              <button key={t}
                onClick={() => { setTab(t); setSuggestions([]); setSearchQuery(""); setGpsStatus("idle"); }}
                className={`flex-1 py-2.5 font-semibold transition-colors capitalize ${tab === t ? "text-primary border-b-2 border-primary" : "text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"}`}
              >
                {t === "live" ? "📍 Live GPS" : "🔍 Search City"}
              </button>
            ))}
          </div>

          {}
          <div className="p-4">

            {tab === "live" && (
              <div className="flex flex-col items-center gap-3 py-2">
                <p className="text-xs text-muted dark:text-muted-dark text-center font-body leading-relaxed">
                  We'll detect your current location using your device's GPS.
                </p>
                <button onClick={handleLiveLocation}
                  disabled={gpsStatus === "loading" || gpsStatus === "done"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body font-semibold text-sm bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                >
                  {gpsStatus === "loading" ? <><FiLoader size={15} className="animate-spin" /> Detecting…</>
                    : gpsStatus === "done"  ? <>✓ Location Set!</>
                    : <><FiNavigation size={15} /> Use My Live Location</>}
                </button>
                {gpsStatus === "error" && (
                  <p className="text-xs text-red-500 text-center font-body">
                    Could not detect location. Allow permission or search manually.
                  </p>
                )}
                {isSaving && <p className="text-xs text-muted dark:text-muted-dark font-body">Saving to your profile…</p>}
              </div>
            )}

            {tab === "manual" && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed">
                  Search any city or area — even one different from where you are.
                </p>
                <div className="relative">
                  <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" />
                  {searching && <FiLoader size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark animate-spin" />}
                  <input type="text" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Ahmedabad, Gujarat"
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark outline-none focus:border-primary font-body transition-colors"
                    autoFocus
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul className="flex flex-col divide-y divide-border dark:divide-border-dark rounded-xl border border-border dark:border-border-dark overflow-hidden">
                    {suggestions.map((s, i) => (
                      <li key={i}>
                        <button onClick={() => handleSelectSuggestion(s)}
                          className="w-full text-left px-3 py-2.5 text-xs font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 transition-colors flex items-start gap-2"
                        >
                          <FiMapPin size={12} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {isSaving && <p className="text-xs text-muted dark:text-muted-dark font-body">Saving to your profile…</p>}
              </div>
            )}
          </div>

          {}
          {location.label && (
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-light dark:bg-primary/10 text-primary text-xs font-body font-medium">
                <FiMapPin size={12} />
                <span className="truncate">{location.label}</span>
                {location.isLive && <span className="ml-auto flex-shrink-0 text-accent text-[10px] font-bold">LIVE</span>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}