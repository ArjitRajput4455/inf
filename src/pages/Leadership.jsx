import SectionHeading from "../components/SectionHeading.jsx";
import TeamMemberCard from "../components/TeamMemberCard.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Leadership() {
  const { joinTeams, officeBearers, spokespersons } = useContent();

  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Leadership
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Professional leadership committed to unity, accountability, and social justice.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Office Bearers"
            title="National Office Bearers"
            description="Key office bearers of Indian National Federation Party, India."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeBearers.filter((member) => member.name?.trim()).map((member) => (
              <TeamMemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <SectionHeading
            eyebrow="Spokesperson"
            title="Official Spokespersons"
            description="Representatives for communication, public messages, and media interaction."
          />
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {spokespersons.filter((member) => member.name?.trim()).map((member) => (
              <TeamMemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-950 text-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Join INF INDIA"
            title="Core Teams"
            description="Structured participation areas for citizens who want to contribute to the movement."
            light
          />
          <div className="grid gap-5 md:grid-cols-3">
            {joinTeams.map((team) => (
              <div
                key={team}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron-500 text-2xl font-black">
                  {team[0]}
                </div>
                <h3 className="text-2xl font-black">{team}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
