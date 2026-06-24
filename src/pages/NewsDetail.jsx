import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import CTAButton from "../components/CTAButton.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { resolveMediaUrl } from "../utils/mediaUrl.js";
import { slugify } from "../utils/slugify.js";

function formatDate(dateStr) {
  if (!dateStr) return "Latest Update";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Latest Update";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function findNewsItem(newsItems, slug) {
  return newsItems.find(
    (item) =>
      item.slug === slug ||
      slugify(item.title) === slug ||
      slugify(item.slug) === slug,
  );
}

export default function NewsDetail() {
  const { slug } = useParams();
  const { newsItems } = useContent();
  const item = findNewsItem(newsItems, slug);

  if (!item?.title?.trim()) {
    return <Navigate to="/news" replace />;
  }

  const thumbnail = resolveMediaUrl(item.thumbnailUrl);
  const paragraphs = (item.body || item.description || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="bg-patriotic-radial py-10 text-white sm:py-14">
        <div className="container-page">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
              {item.category}
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{item.title}</h1>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <CalendarDays size={17} />
              {formatDate(item.publishedAt)}
            </div>
            {item.description && (
              <p className="mt-5 text-lg leading-8 text-slate-100">{item.description}</p>
            )}
          </div>
        </div>
      </section>

      {thumbnail && (
        <section className="bg-white">
          <div className="container-page -mt-8 pb-4 sm:-mt-10">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-card">
              <img
                src={thumbnail}
                alt={item.title}
                className="max-h-[28rem] w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-page">
          <article className="mx-auto max-w-3xl">
            <div className="space-y-5 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-saffron-200 bg-saffron-50 p-6 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron-700">
                Stay Connected
              </p>
              <p className="mt-3 text-lg font-semibold text-navy-950">
                Follow official INF INDIA updates and join the movement for unity, integrity, and
                public service.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton to="/join">Join INF INDIA</CTAButton>
                <CTAButton to="/news" variant="secondary">
                  More News
                </CTAButton>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
