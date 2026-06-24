import { resolveMediaUrl } from "../utils/mediaUrl.js";
import { resolveFeaturedVideo } from "../utils/videoUrl.js";

export default function FeaturedNewsVideo({ page, party, eyebrow }) {
  const video = resolveFeaturedVideo(page?.featuredVideoUrl);
  const poster = resolveMediaUrl(page?.featuredVideoPosterUrl);

  return (
    <section className="bg-navy-950 text-white">
      <div className="container-page py-8 lg:py-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
              {eyebrow || `${party.shortName} — News & Events`}
            </p>
            <h1 className="mt-2 max-w-3xl text-2xl font-black leading-tight sm:text-4xl">
              {page?.featuredTitle || "Latest Updates & Public Message"}
            </h1>
            {page?.featuredSubtitle && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {page.featuredSubtitle}
              </p>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
          <div className="relative aspect-video w-full">
            {video.type === "youtube" && (
              <iframe
                title="INF INDIA featured news video"
                src={video.embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {video.type === "file" && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={video.fileUrl}
                poster={poster || undefined}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            )}

            {video.type === "none" && (
              <div className="absolute inset-0 flex items-center justify-center bg-patriotic-radial p-8 text-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron-300">
                    Featured Video
                  </p>
                  <p className="mt-3 max-w-lg text-lg font-semibold text-slate-200">
                    Upload a video or add a YouTube link from Admin → News & Events.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
