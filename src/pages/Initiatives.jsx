import InitiativeCard from "../components/InitiativeCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { initiatives } from "../constants/content.js";

export default function Initiatives() {
  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Work Action / Initiatives
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Action areas built for farmers, youth, women, families, and public accountability.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="People First"
            title="Work Action on Ground"
            description="Every card below represents a focused support and public-service priority for INF INDIA."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.title} initiative={initiative} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <div className="rounded-[2rem] bg-navy-950 p-8 text-center text-white shadow-soft sm:p-12">
            <h2 className="text-3xl font-black sm:text-4xl">
              Want to work with an initiative?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-200">
              Join INF INDIA or enroll for support so the team can understand your
              area, requirement, and preferred participation.
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
