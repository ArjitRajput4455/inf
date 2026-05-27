import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { party } from "../constants/content.js";
import CTAButton from "./CTAButton.jsx";
import MobileMenu from "./MobileMenu.jsx";
import infLogo from "../customs/inflogo.jpeg";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Leadership", to: "/leadership" },
  { label: "Join", to: "/join" },
  { label: "Support", to: "/support" },
  { label: "Donate", to: "/donate" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("inf-theme") || "dark";
  });

  const isLight = theme === "light";

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLight);
    document.documentElement.classList.toggle("dark-theme", !isLight);
    localStorage.setItem("inf-theme", theme);
  }, [isLight, theme]);

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-xl backdrop-blur transition-colors ${
        isLight
          ? "border-slate-200 bg-white/95 shadow-slate-900/10"
          : "border-white/10 bg-navy-950/95 shadow-navy-950/15"
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-5">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg">
              <img
                src={infLogo}
                alt={`${party.shortName} logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p
                className={`truncate text-sm font-black uppercase tracking-wide sm:text-base ${
                  isLight ? "text-navy-950" : "text-white"
                }`}
              >
                {party.shortName}
              </p>
              <p
                className={`hidden truncate text-xs font-medium sm:block ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                Indian National Federation Party
              </p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                    isActive
                      ? isLight
                        ? "bg-navy-950 text-white"
                        : "bg-white text-navy-950"
                      : isLight
                        ? "text-slate-700 hover:bg-navy-950/5 hover:text-navy-950"
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

          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                isLight
                  ? "border-slate-200 bg-slate-100 text-navy-950 hover:bg-slate-200"
                  : "border-white/15 bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <CTAButton to="/join" className="px-4 py-2">
              Join
            </CTAButton>
            <CTAButton to="/donate" variant="secondary" className="px-4 py-2">
              Donate
            </CTAButton>
          </div>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition xl:hidden ${
              isLight
                ? "border-slate-200 bg-slate-100 text-navy-950 hover:bg-slate-200"
                : "border-white/15 bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${
              isLight
                ? "border-slate-200 text-navy-950 hover:bg-slate-100"
                : "border-white/15 text-white hover:bg-white/10"
            }`}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && <MobileMenu links={links} onClose={() => setOpen(false)} theme={theme} />}
    </header>
  );
}
