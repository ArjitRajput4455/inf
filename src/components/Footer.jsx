import { Link } from "react-router-dom";
import { Camera, Globe2, Mail, MapPin, MessageCircle, Phone, Video } from "lucide-react";
import { useContent } from "../context/ContentContext.jsx";

const quickLinks = [
  ["About", "/about"],
  ["Initiatives", "/initiatives"],
  ["Leadership", "/leadership"],
  ["News", "/news"],
];

const supportLinks = [
  ["Join INF INDIA", "/join"],
  ["Donate", "/donate"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const { party, contact } = useContent();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-black text-navy-950">
                INF
              </div>
              <div>
                <p className="font-black uppercase tracking-wide">{party.shortName}</p>
                <p className="text-sm text-slate-300">{party.website}</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              {party.name}
            </p>
            <p className="mt-4 text-lg font-bold text-saffron-400">
              “{party.sloganHindi}”
            </p>
            <p className="mt-1 text-sm text-slate-300">“{party.sloganEnglish}”</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-saffron-400">
              Quick Links
            </h3>
            <div className="grid gap-3 text-sm text-slate-300">
              {quickLinks.map(([label, to]) => (
                <Link key={to} to={to} className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-saffron-400">
              Support
            </h3>
            <div className="grid gap-3 text-sm text-slate-300">
              {supportLinks.map(([label, to]) => (
                <Link key={to} to={to} className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-saffron-400">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-saffron-400" size={18} />
                {contact.address}
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-saffron-400" size={18} />
                  {contact.email}
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-saffron-400" size={18} />
                  {contact.phone}
              </p>
              <p className="flex gap-3">
                <Camera className="mt-0.5 shrink-0 text-saffron-400" size={18} />
                  {<a href="https://www.instagram.com/indiannationalfederationparty">Instagram Page</a>}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              {[Globe2, MessageCircle, Video].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-saffron-500"
                >
                  <Icon size={18} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {party.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
