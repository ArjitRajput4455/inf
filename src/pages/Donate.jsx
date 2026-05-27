import { useState } from "react";
import { BadgeIndianRupee, Landmark, QrCode } from "lucide-react";
import CTAButton from "../components/CTAButton.jsx";
import DonationCard from "../components/DonationCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { donationAmounts } from "../constants/content.js";
import { submitDonationInterest } from "../services/api.js";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(donationAmounts[0]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submitInterest = async () => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await submitDonationInterest({ amount: selectedAmount });
      setStatus({ type: "success", message: data.message || "Submitted successfully" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            description="Donations can help outreach, citizen support, training, communication, and ground-level organization."
          />
          <div className="grid gap-5 md:grid-cols-4">
            {donationAmounts.map((amount) => (
              <DonationCard
                key={amount}
                amount={amount}
                selected={selectedAmount === amount}
                onSelect={setSelectedAmount}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-7 shadow-card">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
                <QrCode size={28} />
              </div>
              <h2 className="text-2xl font-black text-navy-950">UPI QR Placeholder</h2>
              <div className="mt-5 flex h-64 items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
                <div>
                  <QrCode className="mx-auto text-slate-400" size={70} />
                  <p className="mt-3 font-bold text-slate-500">
                    Add official UPI QR after verification
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-7 shadow-card">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-500 text-white">
                <Landmark size={28} />
              </div>
              <h2 className="text-2xl font-black text-navy-950">Bank Details Placeholder</h2>
              <div className="mt-5 space-y-3 rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                <p><strong>Account Name:</strong> Indian National Federation Party, India</p>
                <p><strong>Bank Name:</strong> To be updated</p>
                <p><strong>Account Number:</strong> To be updated</p>
                <p><strong>IFSC:</strong> To be updated</p>
              </div>
              <CTAButton onClick={submitInterest} disabled={loading} className="mt-6 w-full">
                <BadgeIndianRupee className="mr-2" size={18} />
                {loading ? "Submitting..." : "Razorpay / Payment Gateway Placeholder"}
              </CTAButton>
              {status.message && (
                <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                  status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>

          <p className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
            Disclaimer: Donation collection, payment gateway activation, PAN/receipt
            workflow, and statutory compliance details should be finalized with the
            authorized party team before accepting live payments.
          </p>
        </div>
      </section>
    </>
  );
}
