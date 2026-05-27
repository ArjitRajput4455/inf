export default function MissionVisionCard({ title, text, Icon }) {
  return (
    <article className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white transition group-hover:bg-saffron-500">
        <Icon size={26} />
      </div>
      <h3 className="text-2xl font-black text-navy-950">{title}</h3>
      <p className="mt-4 text-base leading-8 text-slate-600">{text}</p>
    </article>
  );
}
