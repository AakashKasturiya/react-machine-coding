export const HeaderDropdown = ({ selectInput }) => {
  return (
    <>
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-200">
        <div className="">
          <h1 className="text-3xl font-bold text-slate-800">
            Multi Select Dropdown 🚀
          </h1>
          <p className="text-slate-500 mt-2">
            Search and select multiple technologies.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100
            text-indigo-700 text-xs font-semibold"
        >
          {selectInput.length} Selected
        </span>
      </header>
    </>
  );
};
