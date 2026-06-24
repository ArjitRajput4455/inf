import NewsCard from "../components/NewsCard.jsx";
import FeaturedNewsVideo from "../components/FeaturedNewsVideo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function News() {
  const { newsPage, newsItems, party } = useContent();

  return (
    <>
      <FeaturedNewsVideo
        page={newsPage}
        party={party}
        eyebrow={`${party.shortName} — News & Events`}
      />

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Updates"
            title="News, Announcements, and Events"
            description="Official updates from INF INDIA — announcements, ground work, and Punjab Election 2027."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {newsItems
              .filter((item) => item.title?.trim())
              .map((item) => (
                <NewsCard
                  key={item.slug || item.title}
                  item={item}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
