import { useState } from "react";
import { getCatIcon } from "./servicesShared";

export default function ServiceCard({ svc, onClick }) {
  const firstImage = svc.images?.[0] ?? null;
  const [imgError, setImgError] = useState(false);
  const showImage = firstImage && !imgError;

  return (
    <button
      onClick={onClick}
      className="text-left bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="relative w-full aspect-video bg-primary-light dark:bg-primary/10 overflow-hidden">
        {showImage ? (
          <img
            src={firstImage}
            alt={svc.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary">{getCatIcon(svc.name)}</div>
        )}

        {svc.category?.name && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white font-body backdrop-blur-sm">
            {svc.category.name}
          </span>
        )}

        {svc.duration && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white font-body backdrop-blur-sm">
            ~{svc.duration < 60 ? `${svc.duration}m` : `${Math.floor(svc.duration / 60)}h`}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm font-display font-bold text-foreground dark:text-foreground-dark mb-1 line-clamp-1">
          {svc.name}
        </p>
        {svc.description && (
          <p className="text-xs text-muted dark:text-muted-dark font-body leading-relaxed line-clamp-2">
            {svc.description}
          </p>
        )}
        <p className="text-xs text-primary font-body font-semibold mt-3 group-hover:underline">See providers →</p>
      </div>
    </button>
  );
}
