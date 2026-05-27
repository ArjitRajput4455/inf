import { CheckCircle2 } from "lucide-react";

export default function ObjectiveCard({ children }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <CheckCircle2 className="mt-1 shrink-0 text-indiaGreen-500" size={22} />
      <p className="font-semibold leading-7 text-slate-700">{children}</p>
    </div>
  );
}
