import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFocusAreaIcon } from "../utils/focusAreaIcons.js";

export default function FocusAreaCard({ area }) {
  const Icon = getFocusAreaIcon(area.icon);
  const isClickable = area.pageEnabled;

  const content = (
    <>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white transition group-hover:bg-saffron-500">
        <Icon size={26} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-black text-navy-950">{area.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{area.summary}</p>
        {isClickable && (
          <p className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-saffron-600">
            Learn more
            <ArrowRight size={14} />
          </p>
        )}
      </div>
    </>
  );

  const className =
    "group flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-card";

  if (!isClickable) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link to={`/areas/${area.slug}`} className={className}>
      {content}
    </Link>
  );
}
