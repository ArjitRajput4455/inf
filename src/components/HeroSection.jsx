import { BadgeIndianRupee, UserPlus } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";
import CTAButton from "./CTAButton.jsx";
import MovementSlogan from "./MovementSlogan.jsx";
import infHeroLogo from "../customs/inflogo-removebg-preview.png";

export default function HeroSection() {
  const { party } = useContent();

  return (
    <section className="theme-hero relative isolate overflow-hidden bg-patriotic-radial text-white">
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-indiaGreen-500/20 blur-3xl" />

      <div className="container-page grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-12 xl:gap-12">
        <div>
          <div className="hero-website-badge mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-saffron-300 backdrop-blur">
            People-first politics for unity, integrity, and accountable governance
          </div>
          <h1 className="max-w-4xl text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {party.name}
          </h1>
          <div className="mt-5 max-w-3xl border-l-4 border-saffron-500 pl-5">
            <p className="hero-quote-hindi text-xl font-black text-saffron-300 sm:text-2xl">
              “{party.sloganHindi}”
            </p>
            <p className="hero-quote-english mt-2 text-base font-semibold text-slate-100 sm:text-lg">
              “{party.sloganEnglish}”
            </p>
          </div>
          <div className="mt-5">
            <MovementSlogan party={party} light />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton to="/join">
              <UserPlus className="mr-2" size={18} />
              Join INF INDIA
            </CTAButton>
            <CTAButton to="/donate" variant="secondary">
              <BadgeIndianRupee className="mr-2" size={18} />
              Donate
            </CTAButton>
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[460px]">
          <div className="absolute h-[360px] w-[360px] rounded-full bg-white/54 blur-3xl lg:h-[460px] lg:w-[460px]" />
          <div className="absolute h-[480px] w-[480px] rounded-full bg-navy-500/22 blur-2xl lg:h-[580px] lg:w-[580px]" />
          <img
            src={infHeroLogo}
            alt={`${party.name} official logo`}
            className="hero-right-logo relative z-10 w-full max-w-[560px] object-contain lg:max-w-[650px]"
          />
        </div>
      </div>
    </section>
  );
}
