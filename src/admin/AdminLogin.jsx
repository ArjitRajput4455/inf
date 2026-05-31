import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, saveAdminToken } from "../services/adminApi.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await adminLogin(form);
      saveAdminToken(result.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-soft"
      >
        <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron-600">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-black text-navy-950">INF INDIA Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to update website text, leadership, news, and contact details.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              className="field"
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              className="field"
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-saffron-500 py-3 font-bold text-white hover:bg-saffron-600 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
