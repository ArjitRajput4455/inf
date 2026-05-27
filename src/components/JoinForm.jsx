import { useState } from "react";
import { interestedAreas } from "../constants/content.js";
import { submitJoin } from "../services/api.js";
import CTAButton from "./CTAButton.jsx";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  state: "",
  district: "",
  cityVillage: "",
  profession: "",
  age: "",
  interestedArea: "",
  message: "",
};

export default function JoinForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await submitJoin(form);
      setStatus({ type: "success", message: data.message || "Submitted successfully" });
      setForm(initialState);
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
          <label className="label" htmlFor="fullName">Full Name</label>
          <input className="field" id="fullName" name="fullName" value={form.fullName} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone Number</label>
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
          <label className="label" htmlFor="cityVillage">City/Village</label>
          <input className="field" id="cityVillage" name="cityVillage" value={form.cityVillage} onChange={update} />
        </div>
        <div>
          <label className="label" htmlFor="profession">Profession</label>
          <input className="field" id="profession" name="profession" value={form.profession} onChange={update} />
        </div>
        <div>
          <label className="label" htmlFor="age">Age</label>
          <input className="field" id="age" name="age" type="number" min="16" max="100" value={form.age} onChange={update} />
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="interestedArea">Interested Area</label>
          <select className="field" id="interestedArea" name="interestedArea" value={form.interestedArea} onChange={update} required>
            <option value="">Select interested area</option>
            {interestedAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="message">Message</label>
          <textarea className="field min-h-32 resize-y" id="message" name="message" value={form.message} onChange={update} />
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
        {loading ? "Submitting..." : "Submit Join Request"}
      </CTAButton>
    </form>
  );
}
