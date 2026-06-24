import { useState } from "react";
import { Plus, Trash2, UploadCloud, Video } from "lucide-react";
import { uploadNewsImage, uploadNewsVideo } from "../../services/adminApi.js";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
import { slugify } from "../../utils/slugify.js";
import { Field } from "./AdminFields.jsx";

function ThumbnailUpload({ label, value, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const preview = resolveMediaUrl(value);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const result = await onUpload(file);
      onChange(result.data.thumbnailUrl || result.data.fileUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex flex-wrap items-start gap-4">
        <div className="h-36 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-40 sm:w-64">
          {preview ? (
            <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
              No image
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
            <UploadCloud size={14} />
            {uploading ? "Uploading..." : "Upload Image (up to 25 MB)"}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="sr-only"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
          <Field label="Thumbnail URL" value={value || ""} onChange={onChange} />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-bold text-slate-500 hover:text-red-600"
            >
              Remove thumbnail
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function VideoSection({ title, description, page, onChange }) {
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState("");

  const handleVideoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoError("");
    try {
      const result = await uploadNewsVideo(file);
      onChange({ featuredVideoUrl: result.data.videoUrl || result.data.fileUrl });
    } catch (err) {
      setVideoError(err.message);
    } finally {
      setVideoUploading(false);
      event.target.value = "";
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 p-5">
      <h3 className="text-lg font-black text-navy-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field
          label="Video Title"
          value={page.featuredTitle || ""}
          onChange={(v) => onChange({ featuredTitle: v })}
        />
        <Field
          label="Video Subtitle"
          value={page.featuredSubtitle || ""}
          onChange={(v) => onChange({ featuredSubtitle: v })}
        />
      </div>

      <div className="mt-4">
        <Field
          label="Video URL (YouTube link or uploaded file path)"
          value={page.featuredVideoUrl || ""}
          onChange={(v) => onChange({ featuredVideoUrl: v })}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white">
          <Video size={14} />
          {videoUploading ? "Uploading video..." : "Upload Video (up to 200 MB)"}
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className="sr-only"
            onChange={handleVideoUpload}
            disabled={videoUploading}
          />
        </label>
        {page.featuredVideoUrl && (
          <button
            type="button"
            onClick={() => onChange({ featuredVideoUrl: "" })}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
          >
            Clear video
          </button>
        )}
      </div>
      {videoError && <p className="mt-2 text-xs font-semibold text-red-600">{videoError}</p>}

      <div className="mt-5">
        <ThumbnailUpload
          label="Video Poster Image (optional — shown before video loads)"
          value={page.featuredVideoPosterUrl || ""}
          onChange={(v) => onChange({ featuredVideoPosterUrl: v })}
          onUpload={uploadNewsImage}
        />
      </div>
    </section>
  );
}

const emptyNewsItem = {
  slug: "",
  category: "Announcement",
  title: "",
  description: "",
  body: "",
  publishedAt: "",
  thumbnailUrl: "",
};

export default function NewsEditor({ content, setContent }) {
  const homePage = content.homePage || {
    featuredVideoUrl: "",
    featuredVideoPosterUrl: "",
    featuredTitle: "",
    featuredSubtitle: "",
  };
  const newsPage = content.newsPage || {
    featuredVideoUrl: "",
    featuredVideoPosterUrl: "",
    featuredTitle: "",
    featuredSubtitle: "",
  };

  const updateHomePage = (patch) => {
    setContent({
      ...content,
      homePage: { ...homePage, ...patch },
    });
  };

  const updateNewsPage = (patch) => {
    setContent({
      ...content,
      newsPage: { ...newsPage, ...patch },
    });
  };

  const updateNewsItem = (index, value) => {
    const newsItems = [...content.newsItems];
    newsItems[index] = value;
    setContent({ ...content, newsItems });
  };

  return (
    <div className="space-y-10">
      <p className="text-sm text-slate-600">
        Manage featured videos for the Home and News pages, plus full news articles shown on the
        News page. Click Save Changes when done.
      </p>

      <VideoSection
        title="Home Page Featured Video"
        description="Shown below the hero on the homepage. If no video is set here, the News page video is used as fallback."
        page={homePage}
        onChange={updateHomePage}
      />

      <VideoSection
        title="News Page Featured Video"
        description="Shown at the top of the News page. Upload MP4/WebM or paste a YouTube link."
        page={newsPage}
        onChange={updateNewsPage}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-navy-950">News Articles</h3>
            <p className="mt-1 text-sm text-slate-500">
              Each card links to its own detail page at /news/your-slug
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setContent({
                ...content,
                newsItems: [...content.newsItems, { ...emptyNewsItem }],
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white"
          >
            <Plus size={14} />
            Add Article
          </button>
        </div>

        {content.newsItems.map((item, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 p-5">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    newsItems: content.newsItems.filter((_, i) => i !== index),
                  })
                }
                className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                aria-label="Remove article"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Category"
                value={item.category}
                onChange={(v) => updateNewsItem(index, { ...item, category: v })}
              />
              <Field
                label="Published Date (YYYY-MM-DD)"
                value={item.publishedAt || ""}
                onChange={(v) => updateNewsItem(index, { ...item, publishedAt: v })}
              />
            </div>
            <div className="mt-4">
              <Field
                label="Title"
                value={item.title}
                onChange={(v) => updateNewsItem(index, { ...item, title: v })}
              />
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap items-end gap-3">
                <div className="min-w-0 flex-1">
                  <Field
                    label="URL Slug (used in /news/slug)"
                    value={item.slug || ""}
                    onChange={(v) => updateNewsItem(index, { ...item, slug: slugify(v) })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateNewsItem(index, { ...item, slug: slugify(item.title) })
                  }
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Generate from title
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Field
                label="Short Description (card preview)"
                multiline
                value={item.description}
                onChange={(v) => updateNewsItem(index, { ...item, description: v })}
              />
            </div>
            <div className="mt-4">
              <Field
                label="Full Article Body (separate paragraphs with a blank line)"
                multiline
                value={item.body || ""}
                onChange={(v) => updateNewsItem(index, { ...item, body: v })}
              />
            </div>
            <div className="mt-4">
              <ThumbnailUpload
                label="Card Thumbnail"
                value={item.thumbnailUrl || ""}
                onChange={(v) => updateNewsItem(index, { ...item, thumbnailUrl: v })}
                onUpload={uploadNewsImage}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
