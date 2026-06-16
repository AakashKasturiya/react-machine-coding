import { useState } from "react";
import { faq } from "../../data/faqData";
import { AccordionItem } from "./AccordionItem";
import { Header } from "./Header";


export const Accordion = () => {
  const [openItems, setopenItems] = useState([]);

  const accordionHandler = (id) => {
    setopenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_34%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-start justify-center sm:items-center">
        <section className="w-full rounded-3xl border border-white/10 bg-white/95 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.35)] backdrop-blur sm:p-6 md:p-10">
          <Header openItems={openItems} setopenItems={setopenItems} faq={faq} />

          <div className="mt-6 sm:mt-8">
            <div className="space-y-4">
              <AccordionItem
                faq={faq}
                accordionHandler={accordionHandler}
                openItems={openItems}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
