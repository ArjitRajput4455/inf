import { useEffect, useState } from "react";
import {
  fetchAdminContent,
  fetchContactSubmissions,
  fetchDashboardStats,
  fetchDonationSubmissions,
  fetchJoinSubmissions,
  fetchSupportSubmissions,
  resetAdminContent,
  updateAdminContent,
} from "../services/adminApi.js";

const tabs = [
  { id: "party", label: "Party & Slogans" },
  { id: "mission", label: "Mission & Vision" },
  { id: "objectives", label: "Objectives & Actions" },
  { id: "initiatives", label: "Initiatives" },
  { id: "leadership", label: "Leadership" },
  { id: "categories", label: "Form Categories" },
  { id: "news", label: "News & Events" },
  { id: "contact", label: "Contact Info" },
  { id: "submissions", label: "Submissions" },
];

function Field({ label, value, onChange, multiline = false }) {
  return (
    <div>
      <label className="label">{label}</label>
      {multiline ? (
        <textarea
          className="field min-h-28 resize-y"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className="field" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ListEditor({ label, items, onChange }) {
  const text = items.join("\n");
  return (
    <div>
      <label className="label">{label} (one item per line)</label>
      <textarea
        className="field min-h-36 resize-y font-mono text-sm"
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
      />
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("party");
  const [content, setContent] = useState(null);
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [contentRes, statsRes] = await Promise.all([
        fetchAdminContent(),
        fetchDashboardStats(),
      ]);
      setContent(contentRes.data);
      setStats(statsRes.data);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loadSubmissions = async () => {
    try {
      const [join, support, contact, donations] = await Promise.all([
        fetchJoinSubmissions(),
        fetchSupportSubmissions(),
        fetchContactSubmissions(),
        fetchDonationSubmissions(),
      ]);
      setSubmissions({
        join: join.data,
        support: support.data,
        contact: contact.data,
        donations: donations.data,
      });
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    if (activeTab === "submissions") loadSubmissions();
  }, [activeTab]);

  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      await updateAdminContent(content);
      setStatus("Content saved successfully. Refresh the public website to see updates.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!window.confirm("Reset all content to default values?")) return;
    try {
      const result = await resetAdminContent();
      setContent(result.data);
      setStatus("Content reset to defaults.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (loading || !content) {
    return <p className="text-slate-600">Loading admin dashboard...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy-950">Content Manager</h1>
          {stats && (
            <p className="mt-1 text-sm text-slate-600">
              Join: {stats.joinCount} | Support: {stats.supportCount} | Contact:{" "}
              {stats.contactCount} | Donations: {stats.donationCount}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {status && (
        <p className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {status}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeTab === tab.id
                ? "bg-navy-950 text-white"
                : "bg-white text-slate-700 shadow-sm"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-card">
        {activeTab === "party" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Party Name" value={content.party.name} onChange={(v) => setContent({ ...content, party: { ...content.party, name: v } })} />
            <Field label="Short Name" value={content.party.shortName} onChange={(v) => setContent({ ...content, party: { ...content.party, shortName: v } })} />
            <Field label="Website" value={content.party.website} onChange={(v) => setContent({ ...content, party: { ...content.party, website: v } })} />
            <Field label="Punjab 2027 Slogan" value={content.party.punjabSlogan} onChange={(v) => setContent({ ...content, party: { ...content.party, punjabSlogan: v } })} />
            <Field label="Slogan (Hindi)" value={content.party.sloganHindi} onChange={(v) => setContent({ ...content, party: { ...content.party, sloganHindi: v } })} />
            <Field label="Slogan (English)" value={content.party.sloganEnglish} onChange={(v) => setContent({ ...content, party: { ...content.party, sloganEnglish: v } })} />
          </div>
        )}

        {activeTab === "mission" && (
          <div className="grid gap-4">
            <Field label="Mission" multiline value={content.mission} onChange={(v) => setContent({ ...content, mission: v })} />
            <Field label="Vision" multiline value={content.vision} onChange={(v) => setContent({ ...content, vision: v })} />
          </div>
        )}

        {activeTab === "objectives" && (
          <div className="grid gap-4">
            <ListEditor label="Core Objectives" items={content.coreObjectives} onChange={(v) => setContent({ ...content, coreObjectives: v })} />
            <ListEditor label="Work Actions" items={content.workActions} onChange={(v) => setContent({ ...content, workActions: v })} />
          </div>
        )}

        {activeTab === "initiatives" && (
          <div className="space-y-6">
            {content.initiatives.map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 p-4">
                <Field label="Title" value={item.title} onChange={(v) => {
                  const initiatives = [...content.initiatives];
                  initiatives[index] = { ...item, title: v };
                  setContent({ ...content, initiatives });
                }} />
                <div className="mt-3">
                  <Field label="Icon (lucide name)" value={item.icon} onChange={(v) => {
                    const initiatives = [...content.initiatives];
                    initiatives[index] = { ...item, icon: v };
                    setContent({ ...content, initiatives });
                  }} />
                </div>
                <div className="mt-3">
                  <Field label="Description" multiline value={item.description} onChange={(v) => {
                    const initiatives = [...content.initiatives];
                    initiatives[index] = { ...item, description: v };
                    setContent({ ...content, initiatives });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leadership" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-black text-navy-950">Office Bearers</h3>
              {content.officeBearers.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 p-4">
                  <Field label="Name" value={item.name} onChange={(v) => {
                    const officeBearers = [...content.officeBearers];
                    officeBearers[index] = { ...item, name: v };
                    setContent({ ...content, officeBearers });
                  }} />
                  <div className="mt-3">
                    <Field label="Role" value={item.role} onChange={(v) => {
                      const officeBearers = [...content.officeBearers];
                      officeBearers[index] = { ...item, role: v };
                      setContent({ ...content, officeBearers });
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-navy-950">Spokespersons</h3>
              {content.spokespersons.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 p-4">
                  <Field label="Name" value={item.name} onChange={(v) => {
                    const spokespersons = [...content.spokespersons];
                    spokespersons[index] = { ...item, name: v };
                    setContent({ ...content, spokespersons });
                  }} />
                  <div className="mt-3">
                    <Field label="Role" value={item.role} onChange={(v) => {
                      const spokespersons = [...content.spokespersons];
                      spokespersons[index] = { ...item, role: v };
                      setContent({ ...content, spokespersons });
                    }} />
                  </div>
                </div>
              ))}
              <ListEditor label="Join Teams" items={content.joinTeams} onChange={(v) => setContent({ ...content, joinTeams: v })} />
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid gap-4">
            <ListEditor label="Support Categories" items={content.supportCategories} onChange={(v) => setContent({ ...content, supportCategories: v })} />
            <ListEditor label="Interested Areas (Join Form)" items={content.interestedAreas} onChange={(v) => setContent({ ...content, interestedAreas: v })} />
            <ListEditor label="Donation Amounts" items={content.donationAmounts} onChange={(v) => setContent({ ...content, donationAmounts: v })} />
          </div>
        )}

        {activeTab === "news" && (
          <div className="space-y-6">
            {content.newsItems.map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 p-4">
                <Field label="Category" value={item.category} onChange={(v) => {
                  const newsItems = [...content.newsItems];
                  newsItems[index] = { ...item, category: v };
                  setContent({ ...content, newsItems });
                }} />
                <div className="mt-3">
                  <Field label="Title" value={item.title} onChange={(v) => {
                    const newsItems = [...content.newsItems];
                    newsItems[index] = { ...item, title: v };
                    setContent({ ...content, newsItems });
                  }} />
                </div>
                <div className="mt-3">
                  <Field label="Description" multiline value={item.description} onChange={(v) => {
                    const newsItems = [...content.newsItems];
                    newsItems[index] = { ...item, description: v };
                    setContent({ ...content, newsItems });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Office Address" value={content.contact.address} onChange={(v) => setContent({ ...content, contact: { ...content.contact, address: v } })} />
            <Field label="Email" value={content.contact.email} onChange={(v) => setContent({ ...content, contact: { ...content.contact, email: v } })} />
            <Field label="Phone" value={content.contact.phone} onChange={(v) => setContent({ ...content, contact: { ...content.contact, phone: v } })} />
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-8">
            {[
              ["join", "Join Requests"],
              ["support", "Support Requests"],
              ["contact", "Contact Messages"],
              ["donations", "Donation Interest"],
            ].map(([key, title]) => (
              <div key={key}>
                <h3 className="mb-3 font-black text-navy-950">{title}</h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(submissions[key] || []).slice(0, 20).map((row) => (
                        <tr key={row._id} className="border-t border-slate-100">
                          <td className="px-4 py-3 whitespace-nowrap">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <pre className="whitespace-pre-wrap text-xs text-slate-600">
                              {JSON.stringify(row, null, 2)}
                            </pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
