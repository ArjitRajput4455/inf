export default function MovementSlogan({ party, className = "", light = false }) {
  const hindi = party.punjabSlogan || "युवा को काम, किसान को दाम";
  const english = party.movementSloganEnglish || "Work for youth, fair price for farmers";
  const punjabi = party.movementSloganPunjabi || "ਜਵਾਨਾਂ ਨੂੰ ਕੰਮ, ਕਿਸਾਨਾਂ ਨੂੰ ਦਾਮ";

  return (
    <div
      className={`space-y-2 rounded-3xl border px-5 py-4 shadow-2xl backdrop-blur ${
        light
          ? "border-white/15 bg-white/10"
          : "border-slate-200 bg-slate-50"
      } ${className}`}
    >
      <p
        className={`text-lg font-black sm:text-xl ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {english}
      </p>
      <p
        className={`text-base font-bold sm:text-lg ${
          light ? "text-saffron-300" : "text-saffron-600"
        }`}
      >
        {hindi}
      </p>
      <p
        className={`text-base font-bold sm:text-lg ${
          light ? "text-slate-100" : "text-navy-900"
        }`}
      >
        {punjabi}
      </p>
    </div>
  );
}
