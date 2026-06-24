import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  fetchAdminContent,
  resetAdminContent,
  updateAdminContent,
} from "../services/adminApi.js";
import * as defaults from "../constants/content.js";
import { adminNavLabels } from "./navItems.js";
import { Field, ListEditor } from "./components/AdminFields.jsx";
import AdminHomeDashboard from "./components/AdminHomeDashboard.jsx";
import LeadershipEditor from "./components/LeadershipEditor.jsx";
import NewsEditor from "./components/NewsEditor.jsx";
import DonationEditor from "./components/DonationEditor.jsx";

function PageToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        enabled ? "bg-saffron-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
          enabled ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function AdminDashboard() {
  const { activeTab } = useOutletContext();
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === "dashboard" || content) return;

    (async () => {
      setLoading(true);
      try {
        const contentRes = await fetchAdminContent();
        setContent({
          ...contentRes.data,
          focusAreas: contentRes.data.focusAreas?.length
            ? contentRes.data.focusAreas
            : defaults.focusAreas,
          newsPage: contentRes.data.newsPage || defaults.newsPage,
          homePage: contentRes.data.homePage || defaults.homePage,
          newsEventSections: contentRes.data.newsEventSections?.length
            ? contentRes.data.newsEventSections
            : defaults.newsEventSections,
          donationPage: contentRes.data.donationPage || defaults.donationPage,
        });
      } catch (error) {
        setStatus(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab, content]);

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

  if (activeTab === "dashboard") {
    return <AdminHomeDashboard />;
  }

  if (loading || !content) {
    return <p className="text-slate-600">Loading content...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy-950">
            {adminNavLabels[activeTab] || "Content"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">Edit public website content for this section.</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-white"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-600 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {status && (
        <p
          className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            status.includes("successfully") || status.includes("defaults")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status}
        </p>
      )}

      <div className="rounded-[2rem] bg-white p-6 shadow-card">
        {activeTab === "focusAreas" && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600">
              Control homepage focus cards. When a page is enabled, visitors can click the
              card and open a dedicated policy page. When disabled, the card stays visible
              but is not clickable.
            </p>
            {(content.focusAreas || []).map((item, index) => (
              <div key={item.slug || index} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-navy-950">{item.title}</h3>
                    <p className="text-xs text-slate-500">/{item.slug}</p>
                  </div>
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    Show dedicated page
                    <PageToggle
                      enabled={!!item.pageEnabled}
                      onChange={(v) => {
                        const focusAreas = [...content.focusAreas];
                        focusAreas[index] = { ...item, pageEnabled: v };
                        setContent({ ...content, focusAreas });
                      }}
                    />
                  </label>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Field label="Title" value={item.title} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, title: v };
                    setContent({ ...content, focusAreas });
                  }} />
                  <Field label="Icon (Sprout, BriefcaseBusiness, etc.)" value={item.icon} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, icon: v };
                    setContent({ ...content, focusAreas });
                  }} />
                  <Field label="Tagline" value={item.tagline} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, tagline: v };
                    setContent({ ...content, focusAreas });
                  }} />
                  <Field label="Card Summary" value={item.summary} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, summary: v };
                    setContent({ ...content, focusAreas });
                  }} />
                </div>
                <div className="mt-4">
                  <Field label="Page Introduction" multiline value={item.intro} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, intro: v };
                    setContent({ ...content, focusAreas });
                  }} />
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <ListEditor label="Commitments" items={item.commitments || []} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, commitments: v };
                    setContent({ ...content, focusAreas });
                  }} />
                  <ListEditor label="Ground Priorities" items={item.priorities || []} onChange={(v) => {
                    const focusAreas = [...content.focusAreas];
                    focusAreas[index] = { ...item, priorities: v };
                    setContent({ ...content, focusAreas });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

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
          <LeadershipEditor content={content} setContent={setContent} />
        )}

        {activeTab === "categories" && (
          <div className="grid gap-4">
            <ListEditor label="Support Categories" items={content.supportCategories} onChange={(v) => setContent({ ...content, supportCategories: v })} />
            <ListEditor label="Interested Areas (Join Form)" items={content.interestedAreas} onChange={(v) => setContent({ ...content, interestedAreas: v })} />
            <ListEditor label="Donation Amounts" items={content.donationAmounts} onChange={(v) => setContent({ ...content, donationAmounts: v })} />
          </div>
        )}

        {activeTab === "news" && <NewsEditor content={content} setContent={setContent} />}

        {activeTab === "donate" && (
          <DonationEditor content={content} setContent={setContent} />
        )}

        {activeTab === "contact" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Office Address" value={content.contact.address} onChange={(v) => setContent({ ...content, contact: { ...content.contact, address: v } })} />
            <Field label="Email" value={content.contact.email} onChange={(v) => setContent({ ...content, contact: { ...content.contact, email: v } })} />
            <Field label="Phone" value={content.contact.phone} onChange={(v) => setContent({ ...content, contact: { ...content.contact, phone: v } })} />
          </div>
        )}
      </div>
    </div>
  );
}
