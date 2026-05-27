import { CalendarDays } from "lucide-react";

export default function NewsCard({ item }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="h-44 bg-patriotic-radial p-6 text-white">
        <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays size={17} />
          Latest Update
        </div>
        <h3 className="text-xl font-black leading-7 text-navy-950">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      </div>
    </article>
  );
}
