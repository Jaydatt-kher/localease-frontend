import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { FiSearch, FiMapPin, FiGrid } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IoStarOutline } from "react-icons/io5";
import { RiFlashlightLine } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { selectHasLocation, selectLocation } from "../../redux/locationSlice";
import { useSearchUnifiedQuery, useGetAllCategoriesQuery } from "../../api/serviceApi";

export default function HeroSection() {
    const navigate    = useNavigate();
    const user        = useSelector(selectUser);
    const userLoc     = useSelector(selectLocation);
    const hasLocation = useSelector(selectHasLocation);

    const [query,    setQuery]    = useState("");
    const [inputVal, setInputVal] = useState("");       const [open,     setOpen]     = useState(false);
    const boxRef                  = useRef(null);

        const { data: allCategories = [] } = useGetAllCategoriesQuery();
    const quickChips = allCategories.slice(0, 6); 
        useEffect(() => {
        const t = setTimeout(() => setQuery(inputVal.trim()), 300);
        return () => clearTimeout(t);
    }, [inputVal]);

        const { data: suggestions, isFetching } = useSearchUnifiedQuery(query, {
        skip: query.length < 2,
    });
    const sugCategories = suggestions?.categories ?? [];
    const sugServices   = suggestions?.services   ?? [];
    const hasSuggestions = sugCategories.length > 0 || sugServices.length > 0;

        useEffect(() => {
        const handler = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
                if (sugCategories.length === 1 && sugServices.length === 0) {
            navigate(`/services?categoryId=${sugCategories[0]._id}&categoryName=${encodeURIComponent(sugCategories[0].name)}`);
        } else {
            navigate(`/services?q=${encodeURIComponent(inputVal.trim())}`);
        }
        setOpen(false);
    };

    const handleSelectCategory = (cat) => {
        navigate(`/services?categoryId=${cat._id}&categoryName=${encodeURIComponent(cat.name)}`);
        setOpen(false);
        setInputVal("");
    };

    const handleSelectService = (svc) => {
        navigate(`/services/${svc._id}`);
        setOpen(false);
        setInputVal("");
    };

    const handleQuickChip = (cat) => {
                navigate(`/services?categoryId=${cat._id}&categoryName=${encodeURIComponent(cat.name)}`);
    };

        const handleQuickSearch = (term) => {
        navigate(`/services?q=${encodeURIComponent(term)}`);
    };

    const firstName    = user?.fullName?.split(" ")[0] || "there";
    const locationLabel = hasLocation
        ? userLoc.label?.split(",").slice(0, 2).join(",").trim()
        : null;

    return (
        <section className="relative overflow-hidden bg-surface-light dark:bg-surface-dark py-16 pb-20">
            {}
            <div className="absolute inset-0 dot-pattern opacity-50" />
            {}
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/8 pointer-events-none" />
            {}
            <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-accent/8 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {}
                <div className="text-center mb-10 animate-fade-in-up">
                    <div className="inline-flex items-center gap-1.5 bg-primary-light dark:bg-border-dark border border-border dark:border-border-dark rounded-full px-4 py-1.5 text-xs font-semibold text-primary dark:text-blue-300 mb-5 font-body">
                        👋 Welcome back, {firstName}!
                    </div>
                    <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.25rem)] text-foreground dark:text-foreground-dark leading-tight mb-4">
                        Find <span className="gradient-text">Trusted Local</span>
                        <br />Services Near You
                    </h1>
                    <p className="text-[clamp(0.9375rem,2vw,1.125rem)] text-muted dark:text-muted-dark max-w-xl mx-auto leading-relaxed font-body">
                        Connect with verified plumbers, electricians, cleaners &amp; more — instantly book or get competitive quotes.
                    </p>
                    {locationLabel && (
                        <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-background-light dark:bg-background-dark border border-border dark:border-border-dark text-xs font-body text-muted dark:text-muted-dark">
                            <FiMapPin size={12} className="text-primary flex-shrink-0" />
                            Showing results near&nbsp;
                            <span className="font-semibold text-foreground dark:text-foreground-dark">{locationLabel}</span>
                            {userLoc.isLive && (
                                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold">
                                    LIVE
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {}
                <div className="animate-fade-in-up max-w-2xl mx-auto mb-6 relative" style={{ animationDelay: "100ms" }} ref={boxRef}>
                    <form onSubmit={handleSearch}
                        className={`flex items-center bg-surface-light dark:bg-surface-dark rounded-3xl px-5 py-2 transition-all gap-3
              ${open && inputVal.length >= 2
                                ? "border-2 border-primary shadow-[0_0_0_4px_rgba(26,94,168,0.12)]"
                                : "border-2 border-border dark:border-border-dark shadow-lg"}`}>
                        <FiMapPin size={20} className="text-muted dark:text-muted-dark flex-shrink-0" />
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => { setInputVal(e.target.value); setOpen(true); }}
                            onFocus={() => { if (inputVal.length >= 2) setOpen(true); }}
                            placeholder="Search services or categories… (e.g. Plumber, AC Repair)"
                            className="flex-1 bg-transparent border-none outline-none py-2 text-base text-foreground dark:text-foreground-dark placeholder:text-muted dark:placeholder:text-muted-dark font-body"
                        />
                        <button type="submit"
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-colors text-sm">
                            <FiSearch size={16} />
                            <span className="hidden sm:inline">Search</span>
                        </button>
                    </form>

                    {}
                    {open && inputVal.length >= 2 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-xl z-50 overflow-hidden">
                            {isFetching && (
                                <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted dark:text-muted-dark font-body">
                                    <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse" />
                                    Searching…
                                </div>
                            )}

                            {!isFetching && !hasSuggestions && (
                                <div className="px-4 py-4 text-xs text-muted dark:text-muted-dark font-body text-center">
                                    No results for "{inputVal}" — press Enter to search anyway
                                </div>
                            )}

                            {}
                            {sugCategories.length > 0 && (
                                <div>
                                    <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted dark:text-muted-dark uppercase tracking-widest font-body">
                                        Categories
                                    </p>
                                    {sugCategories.map(cat => (
                                        <button
                                            key={cat._id}
                                            onMouseDown={() => handleSelectCategory(cat)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary-light dark:hover:bg-primary/15 transition-colors text-left"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-primary-light dark:bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                                                <FiGrid size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">{cat.name}</p>
                                                <p className="text-[10px] font-body text-muted dark:text-muted-dark">Browse all services</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {}
                            {sugServices.length > 0 && (
                                <div className={sugCategories.length > 0 ? "border-t border-border dark:border-border-dark" : ""}>
                                    <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-muted dark:text-muted-dark uppercase tracking-widest font-body">
                                        Services
                                    </p>
                                    {sugServices.map(svc => (
                                        <button
                                            key={svc._id}
                                            onMouseDown={() => handleSelectService(svc)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary-light dark:hover:bg-primary/15 transition-colors text-left"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-background-light dark:bg-surface-alt flex items-center justify-center text-muted dark:text-muted-dark flex-shrink-0">
                                                <MdWorkOutline size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark truncate">{svc.name}</p>
                                                {svc.category?.name && (
                                                    <p className="text-[10px] font-body text-muted dark:text-muted-dark">{svc.category.name}</p>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {}
                            {hasSuggestions && (
                                <button
                                    onMouseDown={handleSearch}
                                    className="w-full flex items-center gap-2 px-4 py-3 border-t border-border dark:border-border-dark text-xs font-body font-semibold text-primary hover:bg-primary-light dark:hover:bg-primary/15 transition-colors"
                                >
                                    <FiSearch size={12} /> Search all results for "{inputVal}"
                                </button>
                            )}
                        </div>
                    )}

                    {}
                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                        <span className="text-xs text-muted dark:text-muted-dark self-center font-body">Quick:</span>
                        {quickChips.map((cat) => (
                            <button key={cat._id} onClick={() => handleQuickChip(cat)}
                                className="text-xs px-3 py-1.5 rounded-full bg-surface-light dark:bg-border-dark border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:bg-primary-light dark:hover:bg-primary/20 hover:text-primary hover:border-primary transition-all font-body">
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {}
                <div className="flex justify-center gap-8 flex-wrap">
                    {[
                        { icon: <HiOutlineShieldCheck size={18} className="text-primary" />, label: "Verified Providers" },
                        { icon: <IoStarOutline size={18} className="text-yellow-500" />, label: "Top Rated Services" },
                        { icon: <RiFlashlightLine size={18} className="text-accent" />, label: "Instant Booking" },
                    ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-sm font-semibold text-muted dark:text-muted-dark font-body">
                            {icon} {label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}