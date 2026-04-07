import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useCreateEnquiryMutation } from "../../api/bookingApi";
import { useGetCitiesQuery } from "../../api/serviceApi";
import { selectIsLoggedIn, selectUser } from "../../redux/authSlice";
import { selectLocation, selectHasLocation } from "../../redux/locationSlice";
import {
  FiX, FiMapPin, FiCalendar, FiClock, FiSend,
  FiAlertCircle, FiCheckCircle, FiEdit2,
} from "react-icons/fi";
import { MdOutlineLocationCity, MdOutlineHomeWork } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

async function searchArea(query) {
          const url = [
    "https://nominatim.openstreetmap.org/search",
    `?q=${encodeURIComponent(query + ", India")}`,
    "&format=json",
    "&limit=12",
    "&addressdetails=1",
    "&accept-language=en",
  ].join("");

  try {
    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    if (!res.ok) return [];
    const data = await res.json();

    const seen = new Set();
    const output = [];

    for (const r of data) {
                              const parts = r.display_name
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && s.toLowerCase() !== "india");

      if (parts.length === 0) continue;

            const BROAD = [
        "gujarat", "maharashtra", "rajasthan", "madhya pradesh", "uttar pradesh",
        "karnataka", "tamil nadu", "kerala", "andhra pradesh", "telangana",
        "west bengal", "bihar", "odisha", "punjab", "haryana", "delhi", "india",
      ];
      if (BROAD.includes(parts[0].toLowerCase())) continue;

            const label = parts.slice(0, 2).join(", ");

      if (seen.has(label)) continue;
      seen.add(label);

      output.push({
        label,
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
      });

      if (output.length >= 6) break;
    }

    return output;
  } catch {
    return [];
  }
}

function matchCityFromLabel(label, cities) {
  if (!label || !cities.length) return null;
  const parts = label.split(",").map((p) => p.trim().toLowerCase());
  return cities.find((c) => parts.some((p) => c.name.toLowerCase() === p)) ?? null;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function validateDate(v) {
  if (!v) return "Preferred date is required.";
  if (v < todayStr()) return "Date cannot be in the past.";
  return "";
}
function validateTime(v, d) {
  if (!v) return "Preferred time is required.";
  if (d === todayStr()) {
    const [h, m] = v.split(":").map(Number);
    const t = new Date(); t.setHours(h, m, 0, 0);
    if ((t - Date.now()) / 60000 < 30) return "Must be at least 30 min from now.";
  }
  return "";
}

function FieldLabel({ icon, children, required, hint }) {
  return (
    <div className="flex flex-col gap-0.5 mb-1.5">
      <label className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark flex items-center gap-1.5">
        {icon}{children}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-[11px] text-muted dark:text-muted-dark font-body leading-relaxed">{hint}</p>}
    </div>
  );
}

export default function EnquiryFormModal({
  isOpen, onClose, serviceId, serviceName = "Service", providerId = null,
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const userLoc = useSelector(selectLocation);
  const hasLocation = useSelector(selectHasLocation);
  const [createEnquiry, { isLoading: submitting }] = useCreateEnquiryMutation();
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery();

  const [cityId, setCityId] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [areaCoords, setAreaCoords] = useState(null);
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [areaSearching, setAreaSearching] = useState(false);
  const [areaEditing, setAreaEditing] = useState(false);
  const [flatNo, setFlatNo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState({});
  const [submitErr, setSubmitErr] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const areaTimer = useRef(null);
  const confirmedLabelRef = useRef("");
  const selectedCity = cities.find((c) => c._id === cityId);

    useEffect(() => {
    if (!isOpen) return;
    setFlatNo(""); setDate(todayStr()); setTime(""); setMessage("");
    setErr({}); setSubmitErr(""); setSubmitted(false);
    setAreaSuggestions([]); setAreaEditing(false);

    if (hasLocation && userLoc?.lat && userLoc?.lng && userLoc?.label && cities.length > 0) {
      const matched = matchCityFromLabel(userLoc.label, cities);
      setCityId(matched?._id ?? "");
      confirmedLabelRef.current = userLoc.label;
      setAreaInput(userLoc.label);
      setAreaCoords({ label: userLoc.label, lat: userLoc.lat, lng: userLoc.lng });
    } else {
      setCityId(""); setAreaInput(""); setAreaCoords(null);
      confirmedLabelRef.current = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hasLocation, cities.length]);

    useEffect(() => {
    clearTimeout(areaTimer.current);

        if (areaInput !== confirmedLabelRef.current) setAreaCoords(null);

    if (areaInput.trim().length < 3) { setAreaSuggestions([]); return; }
    if (areaInput === confirmedLabelRef.current) { setAreaSuggestions([]); return; }

    areaTimer.current = setTimeout(async () => {
      setAreaSearching(true);
      const results = await searchArea(areaInput);
      setAreaSuggestions(results);
      setAreaSearching(false);
    }, 400);

    return () => clearTimeout(areaTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaInput, cityId]);

  const handleCityChange = (val) => {
    setCityId(val);
    confirmedLabelRef.current = "";
    setAreaInput(""); setAreaCoords(null); setAreaSuggestions([]);
    setAreaEditing(true);
    setErr((e) => ({ ...e, city: "", area: "" }));
  };

  const handlePickArea = (s) => {
    confirmedLabelRef.current = s.label;     setAreaInput(s.label);
    setAreaCoords({ label: s.label, lat: s.lat, lng: s.lng });
    setAreaSuggestions([]);
    setAreaEditing(false);
    setErr((e) => ({ ...e, area: "" }));
  };

  const handleClearArea = () => {
    confirmedLabelRef.current = "";
    setAreaInput(""); setAreaCoords(null); setAreaSuggestions([]);
    setAreaEditing(true);
  };

  const handleDateChange = (v) => {
    setDate(v);
    setErr((e) => ({ ...e, date: validateDate(v), ...(time ? { time: validateTime(time, v) } : {}) }));
  };
  const handleTimeChange = (v) => {
    setTime(v);
    setErr((e) => ({ ...e, time: validateTime(v, date) }));
  };

  const handleSubmit = useCallback(async () => {
    const newErr = {
      city: cityId ? "" : "Please select a city.",
      area: areaCoords ? "" : areaInput.trim() ? "Please pick an area from the suggestions." : "Area / locality is required.",
      date: validateDate(date),
      time: validateTime(time, date),
    };
    setErr(newErr);
    if (Object.values(newErr).some(Boolean)) return;
    if (!isLoggedIn) { setSubmitErr("Please sign in to send an enquiry."); return; }
    if (!serviceId) { setSubmitErr("No service selected."); return; }
    setSubmitErr("");

    const fullAddress = [flatNo.trim(), areaCoords.label, selectedCity?.name].filter(Boolean).join(", ");

    try {
      await createEnquiry({
        serviceId,
        ...(providerId ? { providerId } : {}),
        prefferedDate: date, prefferedTime: time,
        message: message.trim() || undefined,
        location: { address: fullAddress, city: selectedCity?.name ?? "", lat: areaCoords.lat, lng: areaCoords.lng },
      }).unwrap();
      setSubmitted(true);
    } catch (e) {
      setSubmitErr(e?.data?.message || "Something went wrong. Please try again.");
    }
  }, [cityId, areaCoords, areaInput, flatNo, date, time, message, serviceId, providerId, isLoggedIn, createEnquiry, selectedCity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget && !submitting) onClose(); }}>
      <div className="w-full max-w-md rounded-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark shadow-2xl overflow-hidden">

        {}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-border-dark">
          <div>
            <h2 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">Request {serviceName}</h2>
            <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
              {providerId ? "Direct enquiry to selected provider" : "Sent to providers in your area"}
            </p>
          </div>
          <button onClick={onClose} disabled={submitting}
            className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark disabled:opacity-40 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-accent-light dark:bg-accent/10 flex items-center justify-center">
              <FiCheckCircle size={32} className="text-accent" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground dark:text-foreground-dark">Enquiry Sent!</h3>
            <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed">
              Providers near <span className="font-semibold text-foreground dark:text-foreground-dark">{areaCoords?.label}</span> will
              respond with their quotes. Check <span className="font-semibold text-primary">My Requests</span> to compare bids and book.
            </p>
            <button onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-body font-semibold text-sm hover:bg-primary-hover transition-colors">
              Done
            </button>
          </div>
        ) : (
          <div className="px-5 py-4 flex flex-col gap-4 max-h-[82vh] overflow-y-auto">

            {}
            {hasLocation && areaCoords && !areaEditing && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-light dark:bg-primary/10 border border-primary/20 text-xs font-body">
                <FiMapPin size={12} className="text-primary flex-shrink-0" />
                <span className="text-muted dark:text-muted-dark flex-1">
                  Location auto-filled — <span className="font-semibold text-foreground dark:text-foreground-dark">{areaCoords.label}</span>
                </span>
              </div>
            )}

            {}
            <div>
              <FieldLabel icon={<MdOutlineLocationCity size={14} className="text-primary" />} required>City</FieldLabel>
              {citiesLoading ? (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-sm text-muted dark:text-muted-dark font-body">
                  <AiOutlineLoading3Quarters size={13} className="animate-spin" /> Loading cities…
                </div>
              ) : (
                <select value={cityId} onChange={(e) => handleCityChange(e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm rounded-xl font-body appearance-none border
                    ${err.city ? "border-red-400" : cityId ? "border-accent" : "border-border dark:border-border-dark"}
                    bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark
                    outline-none focus:border-primary transition-colors cursor-pointer`}>
                  <option value="">Select your city…</option>
                  {cities.map((c) => <option key={c._id} value={c._id}>{c.name}{c.state ? ` — ${c.state}` : ""}</option>)}
                </select>
              )}
              {err.city && <p className="text-[11px] text-red-500 font-body flex items-center gap-1 mt-1"><FiAlertCircle size={11} />{err.city}</p>}
            </div>

            {}
            <div>
              <FieldLabel
                icon={<FiMapPin size={13} className="text-primary" />}
                required
                hint={areaCoords && !areaEditing ? undefined : "Type any area or locality — e.g. Majalpur, Bandra, Koramangala"}
              >
                Area / Locality
              </FieldLabel>

              {areaCoords && !areaEditing ? (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-accent bg-accent-light dark:bg-accent/10">
                  <FiCheckCircle size={14} className="text-accent flex-shrink-0" />
                  <span className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark flex-1 truncate">
                    {areaCoords.label}
                  </span>
                  <button onClick={handleClearArea}
                    className="flex items-center gap-1 text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors flex-shrink-0">
                    <FiEdit2 size={11} /> Change
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <input type="text" value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      placeholder="e.g. Majalpur, Bandra, Koramangala…"
                      autoFocus={areaEditing}
                      className={`w-full pl-3 pr-8 py-2.5 text-sm rounded-xl font-body border
                        ${err.area ? "border-red-400" : "border-border dark:border-border-dark"}
                        bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark
                        placeholder-muted dark:placeholder-muted-dark outline-none focus:border-primary
                        transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {areaSearching
                        ? <AiOutlineLoading3Quarters size={13} className="animate-spin text-muted dark:text-muted-dark" />
                        : areaInput
                          ? <button onClick={handleClearArea} className="text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"><FiX size={13} /></button>
                          : null}
                    </div>
                  </div>

                  {areaSuggestions.length > 0 && (
                    <ul className="mt-1 rounded-xl border border-border dark:border-border-dark overflow-hidden divide-y divide-border dark:divide-border-dark shadow-lg">
                      {areaSuggestions.map((s, i) => (
                        <li key={i}>
                          <button type="button" onClick={() => handlePickArea(s)}
                            className="w-full text-left px-3 py-2.5 text-sm font-body text-foreground dark:text-foreground-dark hover:bg-primary-light dark:hover:bg-primary/10 transition-colors flex items-center gap-2">
                            <FiMapPin size={11} className="text-primary flex-shrink-0" />
                            {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!areaSearching && areaInput.trim().length >= 3 &&
                    areaInput !== confirmedLabelRef.current && areaSuggestions.length === 0 && (
                      <p className="text-[11px] text-muted dark:text-muted-dark font-body mt-1">
                        No results found. Try a different spelling or shorter name.
                      </p>
                    )}
                </>
              )}
              {err.area && <p className="text-[11px] text-red-500 font-body flex items-center gap-1 mt-1"><FiAlertCircle size={11} />{err.area}</p>}
            </div>

            {}
            <div>
              <FieldLabel icon={<MdOutlineHomeWork size={14} className="text-primary" />}
                hint="Flat no, plot no, building, floor, landmark — helps the provider find you.">
                Flat / Plot / Building{" "}
                <span className="text-muted dark:text-muted-dark font-normal text-[11px]">(optional)</span>
              </FieldLabel>
              <input type="text" value={flatNo} onChange={(e) => setFlatNo(e.target.value)}
                placeholder="e.g. Flat 3B, Sunflower Apts  or  Plot 42, Sector 7"
                className="w-full px-3 py-2.5 text-sm rounded-xl font-body border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark outline-none focus:border-primary transition-colors"
              />
            </div>

            {}
            {areaCoords && !areaEditing && (
              <div className="px-3 py-2.5 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
                <p className="text-[11px] text-muted dark:text-muted-dark font-body mb-0.5">Provider will see:</p>
                <p className="text-xs font-body font-semibold text-foreground dark:text-foreground-dark">
                  {[flatNo.trim() || "your flat/plot", areaCoords.label, selectedCity?.name].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            {}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel icon={<FiCalendar size={12} className="text-primary" />} required>Date</FieldLabel>
                <input type="date" value={date} min={todayStr()} onChange={(e) => handleDateChange(e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm rounded-xl font-body border ${err.date ? "border-red-400" : "border-border dark:border-border-dark"} bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary transition-colors`}
                />
                {err.date && <p className="text-[11px] text-red-500 font-body flex items-center gap-1 mt-1"><FiAlertCircle size={10} />{err.date}</p>}
              </div>
              <div>
                <FieldLabel icon={<FiClock size={12} className="text-primary" />} required>Time</FieldLabel>
                <input type="time" value={time} onChange={(e) => handleTimeChange(e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm rounded-xl font-body border ${err.time ? "border-red-400" : "border-border dark:border-border-dark"} bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary transition-colors`}
                />
                {err.time && <p className="text-[11px] text-red-500 font-body flex items-center gap-1 mt-1"><FiAlertCircle size={10} />{err.time}</p>}
              </div>
            </div>
            <p className="text-[11px] text-muted dark:text-muted-dark font-body -mt-2">⚠️ Today's bookings must be at least 30 min from now.</p>

            {}
            <div>
              <FieldLabel>Notes <span className="text-muted dark:text-muted-dark font-normal text-[11px]">(optional)</span></FieldLabel>
              <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the issue, size of work, any specific requirements…"
                className="w-full px-3 py-2.5 text-sm rounded-xl font-body resize-none border border-border dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark placeholder-muted dark:placeholder-muted-dark outline-none focus:border-primary transition-colors"
              />
            </div>

            {submitErr && (
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-body">
                <FiAlertCircle size={14} className="mt-0.5 flex-shrink-0" /> {submitErr}
              </div>
            )}

            <button type="button" onClick={handleSubmit} disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body font-bold text-sm bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors">
              {submitting
                ? <><AiOutlineLoading3Quarters size={15} className="animate-spin" /> Sending…</>
                : <><FiSend size={15} /> Send Enquiry</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}