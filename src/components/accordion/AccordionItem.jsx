export const AccordionItem = ({ faq, openItems, accordionHandler }) => {
  return (
    <div className="space-y-4">
      {faq?.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => accordionHandler(item.id)}
              aria-expanded={isOpen}
              className="cursor-pointer flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-5 sm:py-5 md:px-6"
            >
              <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-sm font-bold text-violet-700 ring-8 ring-violet-50 sm:h-11 sm:w-11">
                  {item.id}
                </div>

                <h3 className="min-w-0 text-sm font-semibold leading-6 text-slate-900 sm:text-base md:text-lg">
                  {item.question}
                </h3>
              </div>

              <i
                className={`ri-arrow-down-s-line shrink-0 text-2xl text-slate-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-violet-600" : ""
                }`}
              />
            </button>

            {isOpen ? (
              <div className="border-t border-slate-100 bg-linear-to-br from-violet-50/90 to-sky-50/70 px-4 py-4 sm:px-5 sm:py-5 md:px-6">
                <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
};
