import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "../services/adminApi.js";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-lg font-black text-navy-950">INF INDIA Admin</p>
            <p className="text-xs text-slate-500">Manage website content & submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
