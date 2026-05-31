import { UsersRound } from "lucide-react";
import JoinForm from "../components/JoinForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Join() {
  const { joinTeams } = useContent();

  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Join INF INDIA
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Become part of a united, corruption-free, people-first movement.
          </h1>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Participation"
              title="Choose your area of service"
              description="Share your details and preferred interest area. The form is connected to the backend join request API."
            />
            <div className="grid gap-4">
              {joinTeams.map((team) => (
                <div key={team} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white">
                    <UsersRound size={22} />
                  </div>
                  <p className="font-black text-navy-950">{team}</p>
                </div>
              ))}
            </div>
          </div>
          <JoinForm />
        </div>
      </section>
    </>
  );
}
