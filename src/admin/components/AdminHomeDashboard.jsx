import { useEffect, useState } from "react";
import { fetchDashboardOverview } from "../../services/adminApi.js";

const typeStyles = {
  join: "bg-blue-100 text-blue-800",
  support: "bg-emerald-100 text-emerald-800",
  contact: "bg-violet-100 text-violet-800",
  donation: "bg-amber-100 text-amber-800",
};

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-black ${accent}`}>{value}</p>
    </div>
  );
}

function DataTable({ columns, rows, emptyMessage }) {
  if (!rows?.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-slate-100 hover:bg-slate-50/80">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-top text-slate-700">
                  {col.render ? col.render(row) : row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminHomeDashboard() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await fetchDashboardOverview();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {error}
      </p>
    );
  }

  const { stats, join, support, contact, donations, recentActivity } = data;
  const filteredActivity =
    filter === "all"
      ? recentActivity
      : recentActivity.filter((item) => item.type === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-navy-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Everyone who joined, requested support, contacted, or showed donation interest.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Join Requests" value={stats.joinCount} accent="text-blue-700" />
        <StatCard label="Support Requests" value={stats.supportCount} accent="text-emerald-700" />
        <StatCard label="Contact Messages" value={stats.contactCount} accent="text-violet-700" />
        <StatCard label="Donation Interest" value={stats.donationCount} accent="text-amber-700" />
      </div>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-navy-950">Recent Activity</h2>
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["join", "Join"],
              ["support", "Support"],
              ["contact", "Contact"],
              ["donation", "Donations"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  filter === id
                    ? "bg-navy-950 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivity.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No records yet.
                  </td>
                </tr>
              ) : (
                filteredActivity.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="border-t border-slate-100">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${typeStyles[item.type]}`}
                      >
                        {item.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy-950">{item.name}</td>
                    <td className="px-4 py-3">{item.detail}</td>
                    <td className="px-4 py-3">{item.phone || "—"}</td>
                    <td className="px-4 py-3">{item.email || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-navy-950">Join Requests</h2>
        <DataTable
          emptyMessage="No join requests yet."
          rows={join}
          columns={[
            { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
            { key: "fullName", label: "Name" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "state", label: "State" },
            { key: "district", label: "District" },
            { key: "interestedArea", label: "Interest" },
            { key: "message", label: "Message", render: (r) => r.message || "—" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-navy-950">Support Requests</h2>
        <DataTable
          emptyMessage="No support requests yet."
          rows={support}
          columns={[
            { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
            { key: "name", label: "Name" },
            { key: "phone", label: "Phone" },
            { key: "supportCategory", label: "Category" },
            {
              key: "requirementDescription",
              label: "Requirement",
              render: (r) => r.requirementDescription,
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-navy-950">Contact Messages</h2>
        <DataTable
          emptyMessage="No contact messages yet."
          rows={contact}
          columns={[
            { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "subject", label: "Subject" },
            { key: "message", label: "Message" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-navy-950">Donation Interest</h2>
        <DataTable
          emptyMessage="No donation interest yet."
          rows={donations}
          columns={[
            { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
            { key: "name", label: "Name" },
            { key: "amount", label: "Amount" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "note", label: "Note", render: (r) => r.note || "—" },
          ]}
        />
      </section>
    </div>
  );
}
