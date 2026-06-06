import { resolveMediaUrl } from "./mediaUrl.js";

export function isYoutubeUrl(url = "") {
  return /youtube\.com|youtu\.be/i.test(url);
}

export function getYoutubeEmbedUrl(url, { autoplay = true, mute = true } = {}) {
  if (!url) return null;

  const patterns = [
    /youtube\.com\/embed\/([^?&\s]+)/i,
    /youtube\.com\/watch\?v=([^&\s]+)/i,
    /youtu\.be\/([^?&\s]+)/i,
    /youtube\.com\/shorts\/([^?&\s]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      const params = new URLSearchParams({
        autoplay: autoplay ? "1" : "0",
        mute: mute ? "1" : "0",
        rel: "0",
        playsinline: "1",
      });
      return `https://www.youtube.com/embed/${match[1]}?${params.toString()}`;
    }
  }

  return null;
}

export function isUploadedVideoUrl(url = "") {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes("/uploads/news/");
}

export function resolveFeaturedVideo(url) {
  if (!url?.trim()) return { type: "none" };

  if (isYoutubeUrl(url)) {
    const embedUrl = getYoutubeEmbedUrl(url);
    return embedUrl ? { type: "youtube", embedUrl } : { type: "none" };
  }

  const fileUrl = resolveMediaUrl(url);
  if (fileUrl && isUploadedVideoUrl(url)) {
    return { type: "file", fileUrl };
  }

  if (fileUrl) {
    return { type: "file", fileUrl };
  }

  return { type: "none" };
}
