import {
  LayoutDashboard,
  Flag,
  Target,
  ListChecks,
  Lightbulb,
  Users,
  Tags,
  Newspaper,
  Phone,
  LayoutGrid,
  IndianRupee,
} from "lucide-react";

export const adminNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "focusAreas", label: "Focus Areas", icon: LayoutGrid },
  { id: "party", label: "Party & Slogans", icon: Flag },
  { id: "mission", label: "Mission & Vision", icon: Target },
  { id: "objectives", label: "Objectives & Actions", icon: ListChecks },
  { id: "initiatives", label: "Initiatives", icon: Lightbulb },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "categories", label: "Form Categories", icon: Tags },
  { id: "news", label: "News & Events", icon: Newspaper },
  { id: "donate", label: "Donate Page", icon: IndianRupee },
  { id: "contact", label: "Contact Info", icon: Phone },
];

export const adminNavLabels = Object.fromEntries(
  adminNavItems.map((item) => [item.id, item.label]),
);
