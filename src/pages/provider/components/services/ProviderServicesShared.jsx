import { FiPlus } from "react-icons/fi";
import { HiOutlineCollection } from "react-icons/hi";
import {
  MdOutlineAcUnit,
  MdOutlineCarpenter,
  MdOutlineCleaningServices,
  MdOutlineConstruction,
  MdOutlineElectricalServices,
  MdOutlineFormatPaint,
  MdOutlineSpa,
} from "react-icons/md";
import { LuWrench } from "react-icons/lu";

const ICON_MAP = {
  plumb: <LuWrench size={18} />,
  electr: <MdOutlineElectricalServices size={18} />,
  clean: <MdOutlineCleaningServices size={18} />,
  beauty: <MdOutlineSpa size={18} />,
  spa: <MdOutlineSpa size={18} />,
  carpent: <MdOutlineCarpenter size={18} />,
  paint: <MdOutlineFormatPaint size={18} />,
  ac: <MdOutlineAcUnit size={18} />,
  default: <MdOutlineConstruction size={18} />,
};

export function getCatIcon(name = "") {
  const key = Object.keys(ICON_MAP).find((iconKey) => name.toLowerCase().includes(iconKey));
  return ICON_MAP[key] || ICON_MAP.default;
}

export const DURATION_PRESETS = [30, 60, 90, 120, 180, 240];

export function formatDuration(mins) {
  if (mins < 60) {
    return `${mins} min`;
  }
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function SectionCard({ title, subtitle, icon, children, action }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
      {title || action ? (
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="w-9 h-9 rounded-xl bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
            ) : null}
            <div>
              {title ? <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark">{title}</h3> : null}
              {subtitle ? <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">{subtitle}</p> : null}
            </div>
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-foreground dark:text-foreground-dark mb-1.5 font-body">
      {children}
      {required ? <span className="text-red-500 ml-0.5">*</span> : null}
    </label>
  );
}

export function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light dark:bg-primary/10 flex items-center justify-center mb-4">
        <HiOutlineCollection size={28} className="text-primary" />
      </div>
      <h3 className="text-base font-display font-bold text-foreground dark:text-foreground-dark mb-1">No services added yet</h3>
      <p className="text-sm text-muted dark:text-muted-dark font-body mb-5 max-w-xs">
        Add the services you offer to start receiving enquiries from customers.
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors text-sm font-body"
      >
        <FiPlus size={16} /> Add Your First Service
      </button>
    </div>
  );
}
