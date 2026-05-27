import { NavLink } from "react-router-dom";
import CTAButton from "./CTAButton.jsx";

export default function MobileMenu({ links, onClose, theme = "dark" }) {
  const isLight = theme === "light";

  return (
    <div
      className={`border-t px-4 py-5 shadow-2xl backdrop-blur lg:hidden ${
        isLight ? "border-slate-200 bg-white/98" : "border-white/10 bg-navy-950/98"
      }`}
    >
      <nav className="grid gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? isLight
                    ? "bg-navy-950 text-white"
                    : "bg-white text-navy-950"
                  : isLight
                    ? "text-slate-700 hover:bg-slate-100 hover:text-navy-950"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`
            }
            style={({ isActive }) => ({
              color: isActive
                ? isLight
                  ? "#ffffff"
                  : "#041224"
                : isLight
                  ? "#334155"
                  : "#f8fafc",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <CTAButton to="/join" onClick={onClose} className="px-4">
          Join
        </CTAButton>
        <CTAButton to="/donate" variant="secondary" onClick={onClose} className="px-4">
          Donate
        </CTAButton>
      </div>
    </div>
  );
}
