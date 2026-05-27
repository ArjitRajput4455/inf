import {
  Accessibility,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  ShieldCheck,
  UsersRound,
  Wheat,
} from "lucide-react";
import CTAButton from "./CTAButton.jsx";

const icons = {
  Accessibility,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  ShieldCheck,
  UsersRound,
  Wheat,
};

export default function InitiativeCard({ initiative }) {
  const Icon = icons[initiative.icon] || HandHeart;

  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-white transition group-hover:bg-saffron-500">
        <Icon size={30} />
      </div>
      <h3 className="text-xl font-black text-navy-950">{initiative.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
        {initiative.description}
      </p>
      <CTAButton to="/support" variant="dark" className="mt-6 w-fit px-5 py-2.5">
        Join Support
        <ArrowRight className="ml-2" size={16} />
      </CTAButton>
    </article>
  );
}
