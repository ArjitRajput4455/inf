import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Flag } from "lucide-react";
import CTAButton from "../components/CTAButton.jsx";
import MovementSlogan from "../components/MovementSlogan.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { getFocusAreaIcon } from "../utils/focusAreaIcons.js";

export default function FocusArea() {
  const { slug } = useParams();
  const { focusAreas, party } = useContent();
  const area = focusAreas.find((item) => item.slug === slug);

  if (!area) {
    return <Navigate to="/" replace />;
  }

  if (!area.pageEnabled) {
    return <Navigate to="/" replace />;
  }

  const Icon = getFocusAreaIcon(area.icon);

  return (
    <>
      <section className="bg-patriotic-radial py-16 text-white sm:py-20">
        <div className="container-page">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
                INF INDIA Priority Area
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                {area.title}
              </h1>
              <p className="mt-4 text-xl font-semibold text-slate-100">{area.tagline}</p>
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-white/10 shadow-2xl backdrop-blur">
              <Icon size={42} className="text-saffron-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-saffron-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-saffron-600">
              <Flag size={14} />
              Public Commitment
            </div>
            <p className="text-lg leading-8 text-slate-700">{area.intro}</p>
            <p className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-base font-semibold leading-8 text-navy-950">
              {area.summary}
            </p>
          </div>

          <div className="rounded-[2rem] border border-navy-900/10 bg-navy-950 p-8 text-white shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-saffron-300">
              Party Stand
            </p>
            <p className="mt-4 text-2xl font-black">{party.shortName}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {party.name} is committed to honest public service, unity, and accountable
              governance for every citizen.
            </p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <MovementSlogan party={party} light className="border-white/10 bg-white/5" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-card">
            <h2 className="text-2xl font-black text-navy-950">Our Commitments</h2>
            <ul className="mt-6 space-y-4">
              {area.commitments.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-saffron-500" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-card">
            <h2 className="text-2xl font-black text-navy-950">Ground Priorities</h2>
            <ul className="mt-6 space-y-4">
              {area.priorities.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <span className="text-lg font-black text-saffron-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-7 text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-patriotic-radial py-16 text-white">
        <div className="container-page text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Join the Movement
          </p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Stand with INF INDIA on {area.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-200">
            Become a volunteer, core team member, or supporter and help take this public
            commitment from vision to action on the ground.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton to="/join">Join INF INDIA</CTAButton>
            <CTAButton to="/donate" variant="secondary">
              Donate
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
