import { useState } from "react";
import { Plus, Trash2, UploadCloud, Video } from "lucide-react";
import { uploadNewsImage, uploadNewsVideo } from "../../services/adminApi.js";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
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

export default function NewsEditor({ content, setContent }) {
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState("");
  const newsPage = content.newsPage || {
    featuredVideoUrl: "",
    featuredVideoPosterUrl: "",
    featuredTitle: "",
    featuredSubtitle: "",
  };

  const updateNewsPage = (patch) => {
    setContent({
      ...content,
      newsPage: { ...newsPage, ...patch },
    });
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoError("");
    try {
      const result = await uploadNewsVideo(file);
      updateNewsPage({ featuredVideoUrl: result.data.videoUrl || result.data.fileUrl });
    } catch (err) {
      setVideoError(err.message);
    } finally {
      setVideoUploading(false);
      event.target.value = "";
    }
  };

  const updateNewsItem = (index, value) => {
    const newsItems = [...content.newsItems];
    newsItems[index] = value;
    setContent({ ...content, newsItems });
  };

  return (
    <div className="space-y-10">
      <p className="text-sm text-slate-600">
        Manage the featured video and thumbnail images for each announcement card.
        Click Save Changes when done.
      </p>

      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-black text-navy-950">Featured Video (top of News page)</h3>
        <p className="mt-1 text-sm text-slate-500">
          Upload MP4/WebM or paste a YouTube link. Uploaded videos autoplay muted on the public page.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field
            label="Video Title"
            value={newsPage.featuredTitle || ""}
            onChange={(v) => updateNewsPage({ featuredTitle: v })}
          />
          <Field
            label="Video Subtitle"
            value={newsPage.featuredSubtitle || ""}
            onChange={(v) => updateNewsPage({ featuredSubtitle: v })}
          />
        </div>

        <div className="mt-4">
          <Field
            label="Video URL (YouTube link or uploaded file path)"
            value={newsPage.featuredVideoUrl || ""}
            onChange={(v) => updateNewsPage({ featuredVideoUrl: v })}
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
          {newsPage.featuredVideoUrl && (
            <button
              type="button"
              onClick={() => updateNewsPage({ featuredVideoUrl: "" })}
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
            value={newsPage.featuredVideoPosterUrl || ""}
            onChange={(v) => updateNewsPage({ featuredVideoPosterUrl: v })}
            onUpload={uploadNewsImage}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-black text-navy-950">Announcement Cards</h3>
          <button
            type="button"
            onClick={() =>
              setContent({
                ...content,
                newsItems: [
                  ...content.newsItems,
                  { category: "Announcement", title: "", description: "", thumbnailUrl: "" },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white"
          >
            <Plus size={14} />
            Add Announcement
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
                aria-label="Remove announcement"
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
                label="Title"
                value={item.title}
                onChange={(v) => updateNewsItem(index, { ...item, title: v })}
              />
            </div>
            <div className="mt-4">
              <Field
                label="Description"
                multiline
                value={item.description}
                onChange={(v) => updateNewsItem(index, { ...item, description: v })}
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
