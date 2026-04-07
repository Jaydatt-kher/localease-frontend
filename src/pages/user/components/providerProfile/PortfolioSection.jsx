import { FiGrid } from "react-icons/fi";
import SectionCard from "./SectionCard";

export default function PortfolioSection({ gallery, onOpenImage }) {
  if (!gallery?.length) return null;

  return (
    <SectionCard title="Portfolio" icon={<FiGrid size={16} />}>
      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {gallery.map((url, i) => (
          <button
            key={i}
            onClick={() => onOpenImage(i)}
            className="aspect-square rounded-xl overflow-hidden border border-border dark:border-border-dark hover:opacity-90 hover:scale-[1.02] transition-all"
          >
            <img src={url} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
