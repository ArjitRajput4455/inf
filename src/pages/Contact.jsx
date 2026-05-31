import { Globe2, Mail, MapPin, MessageCircle, Phone, Video } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Contact() {
  const { contact } = useContent();

  return (    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Contact
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Reach out to INF INDIA for joining, support, media, or public queries.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Message"
              title="Send a message"
              description="The contact form is connected to the backend contact API."
            />
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-navy-950 p-7 text-white shadow-soft">
              <h2 className="text-2xl font-black">Office & Contact</h2>
              <div className="mt-6 space-y-4 text-slate-200">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-saffron-400" size={20} />
                  {contact.address}
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-0.5 shrink-0 text-saffron-400" size={20} />
                  {contact.email}
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-0.5 shrink-0 text-saffron-400" size={20} />
                  {contact.phone}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                {[Globe2, MessageCircle, Video].map((Icon, index) => (
                  <span
                    key={index}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-saffron-500"
                  >
                    <Icon size={19} />
                  </span>
                ))}
              </div>
            </div>

            <div className="flex h-80 items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-300 bg-slate-50 text-center shadow-card">
              <div>
                <MapPin className="mx-auto text-saffron-500" size={48} />
                <p className="mt-3 text-lg font-black text-navy-950">
                  Google Map Placeholder
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Embed official office map after address confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
