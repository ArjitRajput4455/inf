import { adminNavItems } from "../navItems.js";

export default function AdminSidebar({ activeTab, onSelect }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-navy-900/20 bg-navy-950 text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron-400">
          INF INDIA
        </p>
        <p className="mt-1 text-lg font-black">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                active
                  ? "bg-saffron-500 text-white shadow-md"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
