import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../api/serviceApi";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";

const COLOR_THEMES = [
    { bg: "bg-primary-light dark:bg-primary/10", text: "text-primary", border: "hover:border-primary" },
    { bg: "bg-accent-light dark:bg-accent/10", text: "text-accent-hover", border: "hover:border-accent" },
    { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400", border: "hover:border-amber-400" },
    { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-300", border: "hover:border-purple-400" },
    { bg: "bg-rose-50 dark:bg-rose-900/20", text: "text-rose-600 dark:text-rose-400", border: "hover:border-rose-400" },
    { bg: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-700 dark:text-teal-400", border: "hover:border-teal-400" },
    { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "hover:border-orange-400" },
    { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-700 dark:text-indigo-300", border: "hover:border-indigo-400" },
];

function CategorySkeleton() {
    return (
        <div className="rounded-2xl border border-border dark:border-border-dark p-5 flex flex-col items-center gap-3">
            <div className="skeleton w-14 h-14 rounded-full" />
            <div className="skeleton w-20 h-3 rounded" />
            <div className="skeleton w-16 h-2.5 rounded" />
        </div>
    );
}

export default function CategoriesSection() {
    const navigate = useNavigate();
    const { data: categories = [], isLoading, isError } = useGetAllCategoriesQuery();

    return (
        <section className="py-12 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark">Browse by Category</h2>
                        <p className="text-sm text-muted dark:text-muted-dark mt-1 font-body">Pick a category to find the right professional</p>
                    </div>
                    <button onClick={() => navigate("/services")}
                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors font-body">
                        View all <FiArrowRight size={15} />
                    </button>
                </div>

                {}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted dark:text-muted-dark">
                        <FiAlertCircle size={36} className="text-red-400" />
                        <p className="font-body">Could not load categories. Please refresh.</p>
                    </div>
                )}

                {}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 stagger">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)
                        : categories.map((cat, idx) => {
                            const theme = COLOR_THEMES[idx % COLOR_THEMES.length];
                            return (
                                <button
                                    key={cat._id}
                                    onClick={() => navigate(`/services/category/${cat._id}`)}
                                    className={`animate-fade-in-up rounded-2xl border border-border dark:border-border-dark p-5 flex flex-col items-center gap-3
                      ${theme.bg} ${theme.border} hover:-translate-y-1 hover:shadow-md transition-all text-center cursor-pointer`}
                                >
                                    {}
                                    <div className="w-14 h-14 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center">
                                        <span className={`text-3xl ${theme.text}`}>{cat.icon}</span>
                                    </div>
                                    <div>
                                        <p className={`text-sm font-display font-bold ${theme.text} leading-tight`}>{cat.name}</p>
                                        {cat.description && (
                                            <p className="text-xs text-muted dark:text-muted-dark mt-1 line-clamp-2 font-body">{cat.description}</p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}