import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectTheme } from "../../redux/themeSlice";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle({ className = "" }) {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const isDark = theme === "dark";

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-border-dark
        bg-surface-light dark:bg-surface-dark text-muted dark:text-muted-dark text-sm font-semibold font-body
        hover:border-primary hover:text-primary dark:hover:text-blue-400 dark:hover:border-primary transition-all ${className}`}
        >
            {isDark ? <MdOutlineLightMode size={16} className="text-yellow-400" /> : <MdDarkMode size={16} />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
        </button>
    );
}