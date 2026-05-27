import {
  BookOpenCheck,
  BriefcaseBusiness,
  HeartPulse,
  HandHeart,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import InitiativeCard from "../components/InitiativeCard.jsx";
import MissionVisionCard from "../components/MissionVisionCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { initiatives, mission, vision, workActions } from "../constants/content.js";

const highlights = [
  ["Farmers Support", Sprout],
  ["Youth Jobs", BriefcaseBusiness],
  ["Anti-Corruption", ShieldCheck],
  ["Women Self-Dependency", HandHeart],
  ["Healthcare", HeartPulse],
  ["Education", BookOpenCheck],
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(([label, Icon]) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-card"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white">
                  <Icon size={26} />
                </div>
                <p className="text-lg font-black text-navy-950">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mission & Vision"
            title="A Serious Public-Service Movement for a United Nation"
            description="INF INDIA is built around unity, honesty, dignity, employment, quality public systems, and equal opportunity."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <MissionVisionCard title="Mission" text={mission} Icon={ShieldCheck} />
            <MissionVisionCard title="Vision" text={vision} Icon={Sprout} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-950 text-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Work Action on Ground"
            title="Focused Work Areas"
            description="Practical public action built around the everyday needs of citizens, farmers, youth, workers, women, and families."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workActions.map((action, index) => (
              <div
                key={action}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
              >
                <span className="text-3xl font-black text-saffron-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg font-black">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Initiatives"
            title="People-First Priorities"
            description="Each initiative is designed to connect citizens with meaningful participation and support."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.slice(0, 6).map((initiative) => (
              <InitiativeCard key={initiative.title} initiative={initiative} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-patriotic-radial py-16 text-white">
        <div className="container-page">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
              Join Movement
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Build a corruption-free and united future with INF INDIA.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-200">
              Join as a volunteer, enroll for support, or contribute to the movement
              focused on youth, farmers, women, education, healthcare, and justice.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton to="/join">Join INF INDIA</CTAButton>
              <CTAButton to="/support" variant="secondary">
                Enroll for Support
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
