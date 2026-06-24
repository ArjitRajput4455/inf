import { HeartHandshake, Landmark, Megaphone, QrCode, Users } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useContent } from "../context/ContentContext.jsx";
import { resolveMediaUrl } from "../utils/mediaUrl.js";
import defaultUpiQrCode from "../assets/infindiaqrcode.jpeg";
const contributionAreas = [
  {
    icon: Megaphone,
    title: "Outreach & Communication",
    description: "Help us reach more citizens with awareness campaigns and public dialogue.",
  },
  {
    icon: Users,
    title: "Training & Organization",
    description: "Support volunteer training, local coordination, and ground-level movement building.",
  },
  {
    icon: HeartHandshake,
    title: "Citizen Support",
    description: "Enable assistance programs, mentorship, and community service initiatives.",
  },
];

const bankDetails = [
  { label: "Account Name", value: "Indian National Federation Party, India" },
  { label: "Bank Name", value: "To be updated" },
  { label: "Account Number", value: "To be updated" },
  { label: "IFSC", value: "To be updated" },
];

export default function Donate() {
  const { donationPage } = useContent();
  const upiQrCode = resolveMediaUrl(donationPage?.qrCodeUrl) || defaultUpiQrCode;

  return (    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Donate and Support
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Your support helps build a stronger, united, and corruption-free public movement.
          </h1>
        </div>
      </section>

      <section className="section-padding subtle-grid">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contribute"
            title="Support INF INDIA's public-service work"
            description="Every contribution strengthens our outreach, citizen support, training, and ground-level organization. Choose the method that works best for you."
          />

          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {contributionAreas.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-500/10 text-saffron-600">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-7 shadow-card">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
                <QrCode size={28} />
              </div>
              <h2 className="text-2xl font-black text-navy-950">Pay via UPI</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Scan the QR code with any UPI app — PhonePe, Google Pay, Paytm, or your bank app —
                and contribute any amount you wish.
              </p>
              <div className="mt-6 flex justify-center rounded-3xl border border-slate-200 bg-white p-6">
                <img
                  src={upiQrCode}
                  alt="INF INDIA UPI QR code for donations"
                  className="h-64 w-64 max-w-full rounded-2xl object-contain"
                />
              </div>
              <ol className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                    1
                  </span>
                  Open your preferred UPI application
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                    2
                  </span>
                  Scan the QR code above
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                    3
                  </span>
                  Enter your contribution amount and complete the payment
                </li>
              </ol>
            </div>

            <div className="rounded-[2rem] bg-white p-7 shadow-card">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-500 text-white">
                <Landmark size={28} />
              </div>
              <h2 className="text-2xl font-black text-navy-950">Bank Transfer</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Prefer a direct bank transfer? Use the account details below via NEFT, RTGS, or
                IMPS from your bank.
              </p>
              <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-5">
                {bankDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-navy-950">{value}</p>
                  </div>
                ))}
              </div>
              <ol className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white">
                    1
                  </span>
                  Log in to your bank&apos;s net banking or mobile app
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white">
                    2
                  </span>
                  Add the beneficiary using the details above
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white">
                    3
                  </span>
                  Transfer your chosen amount and save the transaction reference
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-saffron-200 bg-saffron-50 p-6 text-center">
            <p className="text-sm font-semibold text-navy-950">
              Thank you for standing with INF INDIA. Your contribution fuels a people-first
              movement dedicated to integrity, unity, and public service.
            </p>
          </div>

          <p className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
            Disclaimer: Donation collection, PAN/receipt workflow, and statutory compliance
            details are being finalized with the authorized party team. Bank account details
            will be updated here once verified.
          </p>
        </div>
      </section>
    </>
  );
}
