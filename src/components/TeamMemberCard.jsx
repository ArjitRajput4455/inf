import { resolveMediaUrl } from "../utils/mediaUrl.js";
import { getLeadershipPhoto } from "../utils/leadershipPhotos.js";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join("");
}

export default function TeamMemberCard({ member }) {
  const photo =
    resolveMediaUrl(member.photoUrl) || getLeadershipPhoto(member.name);

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      {photo ? (
        <img
          src={photo}
          alt={member.name}
          className="mx-auto h-24 w-24 rounded-full object-cover object-top shadow-lg ring-2 ring-slate-100"
        />
      ) : (
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy-900 via-navy-700 to-saffron-500 text-xl font-black text-white shadow-lg">
          {initials(member.name)}
        </div>
      )}
      <h3 className="mt-5 text-lg font-black uppercase leading-7 text-navy-950">
        {member.name}
      </h3>
      <p className="mt-2 rounded-full bg-saffron-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-saffron-600">
        {member.role}
      </p>
    </article>
  );
}
