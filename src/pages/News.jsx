import NewsCard from "../components/NewsCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { newsItems, party } from "../constants/content.js";

const sections = [
  "Latest announcements",
  "Ground work updates",
  "Punjab Election 2027 updates",
  "Gallery/event cards",
];

export default function News() {
  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            News / Events
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Updates from INF INDIA, ground work, and Punjab Election 2027.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Updates"
            title="News, Announcements, and Events"
            description="Static frontend layout for official updates. It can later be connected to a CMS or backend news module."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => (
              <div key={section} className="rounded-[2rem] bg-white p-6 shadow-card">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron-600">
                  {party.shortName}
                </p>
                <h2 className="mt-4 text-xl font-black text-navy-950">{section}</h2>
                <div className="mt-5 h-36 rounded-3xl bg-patriotic-radial" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
