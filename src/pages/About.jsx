import { Eye, Flag, Target } from "lucide-react";
import MissionVisionCard from "../components/MissionVisionCard.jsx";
import ObjectiveCard from "../components/ObjectiveCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { coreObjectives, mission, party, vision } from "../constants/content.js";

export default function About() {
  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
              About INF INDIA
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-5xl">
              {party.name}
            </h1>
            <p className="mt-6 text-2xl font-black text-saffron-300">
              “{party.sloganHindi}”
            </p>
            <p className="mt-2 text-lg text-slate-100">“{party.sloganEnglish}”</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            <MissionVisionCard title="Mission" text={mission} Icon={Target} />
            <MissionVisionCard title="Vision" text={vision} Icon={Eye} />
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <SectionHeading
            eyebrow="Core Objectives"
            title="What INF INDIA Stands For"
            description="The party's objectives are centered on dignity, accountability, employment, public welfare, and social justice."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreObjectives.map((objective) => (
              <ObjectiveCard key={objective}>{objective}</ObjectiveCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-950 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-saffron-500 shadow-2xl">
            <Flag size={50} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
              Punjab Election 2027
            </p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              “{party.punjabSlogan}”
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-200">
              A public message focused on meaningful work for youth and fair value
              for farmers, with accountable governance and practical development.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
