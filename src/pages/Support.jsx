import { HeartHandshake } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import SupportForm from "../components/SupportForm.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Support() {
  const { supportCategories } = useContent();

  return (
    <>
      <section className="bg-patriotic-radial py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron-300">
            Enroll for Support
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Submit your support requirement for guidance, assistance, or mentorship.
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Support Areas"
              title="Support categories"
              description="Select the most relevant category and describe your requirement clearly."
            />
            <div className="grid gap-4">
              {supportCategories.map((category) => (
                <div key={category} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-500 text-white">
                    <HeartHandshake size={22} />
                  </div>
                  <p className="font-black text-navy-950">{category}</p>
                </div>
              ))}
            </div>
          </div>
          <SupportForm />
        </div>
      </section>
    </>
  );
}
