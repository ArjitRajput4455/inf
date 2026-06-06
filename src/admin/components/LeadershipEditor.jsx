import { useState } from "react";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { uploadLeadershipPhoto } from "../../services/adminApi.js";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
import { Field, ListEditor } from "./AdminFields.jsx";

function MemberCard({ member, index, onChange, onRemove, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const photoSrc = resolveMediaUrl(member.photoUrl);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const result = await onUpload(file);
      onChange({ ...member, photoUrl: result.data.photoUrl });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={member.name || "Member"}
              className="h-16 w-16 rounded-full object-cover object-top ring-2 ring-slate-100"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-navy-900 to-saffron-500 text-sm font-black text-white">
              Photo
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-navy-950">Member {index + 1}</p>
            <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">
              <UploadCloud size={14} />
              {uploading ? "Uploading..." : "Upload Photo (up to 25 MB)"}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="sr-only"
                onChange={handleFile}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
          aria-label="Remove member"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {error && <p className="mb-3 text-xs font-semibold text-red-600">{error}</p>}

      <Field label="Name" value={member.name} onChange={(v) => onChange({ ...member, name: v })} />
      <div className="mt-3">
        <Field label="Role" value={member.role} onChange={(v) => onChange({ ...member, role: v })} />
      </div>
      <div className="mt-3">
        <Field
          label="Photo URL (optional — auto-filled after upload)"
          value={member.photoUrl || ""}
          onChange={(v) => onChange({ ...member, photoUrl: v })}
        />
      </div>
      {member.photoUrl && (
        <button
          type="button"
          onClick={() => onChange({ ...member, photoUrl: "" })}
          className="mt-3 text-xs font-bold text-slate-500 hover:text-red-600"
        >
          Remove photo
        </button>
      )}
    </div>
  );
}

function MemberSection({ title, members, onChange, emptyMember }) {
  const updateMember = (index, value) => {
    const next = [...members];
    next[index] = value;
    onChange(next);
  };

  const removeMember = (index) => {
    onChange(members.filter((_, i) => i !== index));
  };

  const addMember = () => {
    onChange([...members, { ...emptyMember }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-navy-950">{title}</h3>
        <button
          type="button"
          onClick={addMember}
          className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white"
        >
          <Plus size={14} />
          Add Member
        </button>
      </div>
      {members.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
          No members yet. Click Add Member to create one.
        </p>
      ) : (
        members.map((member, index) => (
          <MemberCard
            key={`${title}-${index}`}
            member={member}
            index={index}
            onChange={(value) => updateMember(index, value)}
            onRemove={() => removeMember(index)}
            onUpload={uploadLeadershipPhoto}
          />
        ))
      )}
    </div>
  );
}

export default function LeadershipEditor({ content, setContent }) {
  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600">
        Upload photos, edit names and roles, or add/remove office bearers and spokespersons.
        Click Save Changes after updates.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <MemberSection
          title="Office Bearers"
          members={content.officeBearers || []}
          emptyMember={{ name: "", role: "", photoUrl: "" }}
          onChange={(officeBearers) => setContent({ ...content, officeBearers })}
        />
        <div className="space-y-8">
          <MemberSection
            title="Spokespersons"
            members={content.spokespersons || []}
            emptyMember={{ name: "", role: "SPOKESPERSON", photoUrl: "" }}
            onChange={(spokespersons) => setContent({ ...content, spokespersons })}
          />
          <ListEditor
            label="Join Teams"
            items={content.joinTeams || []}
            onChange={(v) => setContent({ ...content, joinTeams: v })}
          />
        </div>
      </div>
    </div>
  );
}
