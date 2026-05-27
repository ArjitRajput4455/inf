import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { supportCategories } from "../constants/content.js";
import { submitSupport } from "../services/api.js";
import CTAButton from "./CTAButton.jsx";

const initialState = {
  name: "",
  phone: "",
  email: "",
  state: "",
  district: "",
  supportCategory: "",
  requirementDescription: "",
  documentName: "",
};

export default function SupportForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files?.[0]?.name || value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await submitSupport(form);
      setStatus({ type: "success", message: data.message || "Submitted successfully" });
      setForm(initialState);
      event.currentTarget.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input className="field" id="name" name="name" value={form.name} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone</label>
          <input className="field" id="phone" name="phone" value={form.phone} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input className="field" id="email" name="email" type="email" value={form.email} onChange={update} />
        </div>
        <div>
          <label className="label" htmlFor="state">State</label>
          <input className="field" id="state" name="state" value={form.state} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="district">District</label>
          <input className="field" id="district" name="district" value={form.district} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="supportCategory">Support Category</label>
          <select className="field" id="supportCategory" name="supportCategory" value={form.supportCategory} onChange={update} required>
            <option value="">Select support category</option>
            {supportCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="requirementDescription">Description of Requirement</label>
          <textarea className="field min-h-36 resize-y" id="requirementDescription" name="requirementDescription" value={form.requirementDescription} onChange={update} required />
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="documentName">Upload Document</label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-saffron-500 hover:bg-saffron-500/5">
            <UploadCloud className="mb-3 text-saffron-500" size={32} />
            <span className="font-bold text-navy-950">
              {form.documentName || "Choose a document placeholder"}
            </span>
            <span className="mt-1 text-sm text-slate-500">
              File upload storage can be connected in the next backend phase.
            </span>
            <input id="documentName" name="documentName" type="file" className="sr-only" onChange={update} />
          </label>
        </div>
      </div>

      {status.message && (
        <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
          status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {status.message}
        </div>
      )}

      <CTAButton type="submit" disabled={loading} className="mt-6 w-full sm:w-auto">
        {loading ? "Submitting..." : "Submit Support Request"}
      </CTAButton>
    </form>
  );
}
