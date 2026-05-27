export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`mx-auto mb-10 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span
          className={`mb-3 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] ${
            light
              ? "bg-white/10 text-saffron-400"
              : "bg-saffron-500/10 text-saffron-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-black tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-8 sm:text-lg ${
            light ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
