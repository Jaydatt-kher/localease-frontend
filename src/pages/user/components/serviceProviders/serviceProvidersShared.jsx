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
  plumb: <LuWrench size={24} />,
  electr: <MdOutlineElectricalServices size={24} />,
  clean: <MdOutlineCleaningServices size={24} />,
  beauty: <MdOutlineSpa size={24} />,
  spa: <MdOutlineSpa size={24} />,
  carpent: <MdOutlineCarpenter size={24} />,
  paint: <MdOutlineFormatPaint size={24} />,
  ac: <MdOutlineAcUnit size={24} />,
  default: <MdOutlineConstruction size={24} />,
};

export const getCatIcon = (name = "") => {
  const key = Object.keys(ICON_MAP).find((k) => name.toLowerCase().includes(k));
  return ICON_MAP[key] ?? ICON_MAP.default;
};

export const PRICE_TYPE_CONFIG = {
  fixed: {
    label: "Fixed",
    cls: "bg-accent-light dark:bg-accent/10 text-accent-hover",
  },
  hourly: {
    label: "/hr",
    cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  },
  inspection: {
    label: "Inspection",
    cls: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
  },
};

export const DEFAULT_FILTERS = {
  minPrice: "",
  maxPrice: "",
  priceTypes: [],
  minRating: 0,
  minExperience: "",
  sortBy: "rating",
};
