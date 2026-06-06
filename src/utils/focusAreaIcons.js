import {
  BookOpenCheck,
  BriefcaseBusiness,
  HandHeart,
  HeartPulse,
  ShieldCheck,
  Sprout,
} from "lucide-react";

export const focusAreaIconMap = {
  Sprout,
  BriefcaseBusiness,
  ShieldCheck,
  HandHeart,
  HeartPulse,
  BookOpenCheck,
};

export function getFocusAreaIcon(name) {
  return focusAreaIconMap[name] || Sprout;
}
