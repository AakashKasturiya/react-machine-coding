export const Header = ({ setopenItems, faq }) => {
  const isExpanded = faq.length > 0;
  const openCount = faq.length;

  const ExpandAllHandler = () => {
    setopenItems(faq.map((item) => item.id));
  };
  
  const CollapseAllHandler = () => {
    setopenItems([]);
  };

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:gap-5 sm:pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
          Help Center
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          FAQ
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Tap any question to expand the answer. You can open multiple items at once or use the actions to control all panels.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          type="button"
          onClick={ExpandAllHandler}
          disabled={!isExpanded}
          className="cursor-pointer w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-35"
        >
          Expand all
        </button>

        <button
          type="button"
          onClick={CollapseAllHandler}
          disabled={openCount === 0}
          className="cursor-pointer w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-35"
        >
          Collapse all
        </button>
      </div>
    </header>
  );
};
