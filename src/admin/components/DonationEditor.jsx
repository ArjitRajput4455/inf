import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadDonationQr } from "../../services/adminApi.js";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
import { Field } from "./AdminFields.jsx";

export default function DonationEditor({ content, setContent }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const donationPage = content.donationPage || { qrCodeUrl: "" };
  const qrPreview = resolveMediaUrl(donationPage.qrCodeUrl);

  const updateDonationPage = (patch) => {
    setContent({
      ...content,
      donationPage: { ...donationPage, ...patch },
    });
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const result = await uploadDonationQr(file);
      updateDonationPage({ qrCodeUrl: result.data.qrCodeUrl || result.data.fileUrl });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-7 text-slate-600">
        Upload the official UPI QR code shown on the public Donate page. After uploading, click
        &quot;Save Changes&quot; at the top so visitors see the updated image.
      </p>

      <div className="rounded-2xl border border-slate-200 p-5">
        <label className="label">UPI QR Code</label>
        <div className="mt-3 flex flex-wrap items-start gap-6">
          <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {qrPreview ? (
              <img
                src={qrPreview}
                alt="Donation QR preview"
                className="h-full w-full object-contain p-3"
              />
            ) : (
              <p className="px-4 text-center text-xs font-semibold text-slate-400">
                No QR uploaded — the site will use the default bundled image
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
              <UploadCloud size={14} />
              {uploading ? "Uploading..." : "Upload QR Image (up to 25 MB)"}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="sr-only"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            <Field
              label="QR Code URL (auto-filled after upload)"
              value={donationPage.qrCodeUrl || ""}
              onChange={(v) => updateDonationPage({ qrCodeUrl: v })}
            />

            {donationPage.qrCodeUrl && (
              <button
                type="button"
                onClick={() => updateDonationPage({ qrCodeUrl: "" })}
                className="text-xs font-bold text-slate-500 hover:text-red-600"
              >
                Remove QR — revert to default image
              </button>
            )}
          </div>
        </div>

        {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
      </div>
    </div>
  );
}
