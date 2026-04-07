import {
  MdOutlineConstruction,
  MdOutlineElectricalServices,
  MdOutlineCleaningServices,
  MdOutlineSpa,
  MdOutlineCarpenter,
  MdOutlineFormatPaint,
  MdOutlineAcUnit,
} from "react-icons/md";
import { LuWrench } from "react-icons/lu";

export const ICON_MAP = {
  plumb: <LuWrench size={22} />,
  electr: <MdOutlineElectricalServices size={22} />,
  clean: <MdOutlineCleaningServices size={22} />,
  beauty: <MdOutlineSpa size={22} />,
  spa: <MdOutlineSpa size={22} />,
  carpent: <MdOutlineCarpenter size={22} />,
  paint: <MdOutlineFormatPaint size={22} />,
  ac: <MdOutlineAcUnit size={22} />,
  default: <MdOutlineConstruction size={22} />,
};

export function getCatIcon(name = "") {
  const key = Object.keys(ICON_MAP).find((k) => name.toLowerCase().includes(k));
  return ICON_MAP[key] ?? ICON_MAP.default;
}
