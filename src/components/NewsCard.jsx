import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { resolveMediaUrl } from "../utils/mediaUrl.js";
import { slugify } from "../utils/slugify.js";

function formatDate(dateStr) {
  if (!dateStr) return "Latest Update";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Latest Update";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getNewsSlug(item) {
  return item.slug?.trim() || slugify(item.title);
}

export default function NewsCard({ item }) {
  const thumbnail = resolveMediaUrl(item.thumbnailUrl);
  const slug = getNewsSlug(item);

  return (
    <Link
      to={`/news/${slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <article>
        <div className="relative h-56 overflow-hidden bg-patriotic-radial sm:h-64">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : null}
          <div
            className={`${
              thumbnail
                ? "absolute inset-0 flex items-start bg-gradient-to-t from-navy-950/50 to-transparent p-6"
                : "flex h-full flex-col justify-between p-6"
            } text-white`}
          >
            <span className="w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <CalendarDays size={17} />
            {formatDate(item.publishedAt)}
          </div>
          <h3 className="text-xl font-black leading-7 text-navy-950 transition group-hover:text-saffron-600">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{item.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-saffron-600">
            Read full story
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
