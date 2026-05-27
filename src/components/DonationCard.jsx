export default function DonationCard({ amount, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(amount)}
      className={`rounded-3xl border p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-card ${
        selected
          ? "border-saffron-500 bg-saffron-500 text-white"
          : "border-slate-200 bg-white text-navy-950"
      }`}
    >
      <span className="block text-sm font-black uppercase tracking-[0.2em] opacity-80">
        Support Amount
      </span>
      <span className="mt-3 block text-3xl font-black">{amount}</span>
    </button>
  );
}
