export const TabsHeader = ({isVertical, setIsVertical}) => {

  const layoutHandler = () =>{
    setIsVertical((prev)=> !prev)
  }
  return (
    <>
      <header className="px-8 py-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            React Learning Hub 🚀
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Explore different frontend technologies through tabs.
          </p>
        </div>
        <button
          onClick={() => layoutHandler()}
          className="px-5 py-2.5 rounded-xl font-medium
              shadow-md
              transition-all duration-300 bg-indigo-600 text-white cursor-pointer"
        >
          {isVertical ? "Switch to Horizontal Tabs" : "Switch to Vertical Tabs"}
        </button>
      </header>
    </>
  );
};
