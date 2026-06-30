import { useState } from "react";
import { submitContact } from "../services/api.js";
import CTAButton from "./CTAButton.jsx";

const initialState = {
  name: "",
  phone: "",
  alternatePhone: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updatePhone = (event) => {
    const { name, value } = event.target;
    const digitsOnly = value.replace(/\D/g, "");
    setForm((current) => ({ ...current, [name]: digitsOnly }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await submitContact(form);
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
          <label className="label" htmlFor="name">Name</label>
          <input className="field" id="name" name="name" value={form.name} onChange={update} required />
        </div>
        <div className="space-y-5">
          <div>
            <label className="label" htmlFor="phone">Phone</label>
            <input
              className="field"
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={form.phone}
              onChange={updatePhone}
            />
          </div>
          <div>
            <label className="label" htmlFor="alternatePhone">Alternate Number</label>
            <input
              className="field"
              id="alternatePhone"
              name="alternatePhone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={form.alternatePhone}
              onChange={updatePhone}
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input className="field" id="email" name="email" type="email" value={form.email} onChange={update} required />
        </div>
        <div>
          <label className="label" htmlFor="subject">Subject</label>
          <input className="field" id="subject" name="subject" value={form.subject} onChange={update} required />
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="message">Message</label>
          <textarea className="field min-h-36 resize-y" id="message" name="message" value={form.message} onChange={update} required />
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
        {loading ? "Sending..." : "Send Message"}
      </CTAButton>
    </form>
  );
}
