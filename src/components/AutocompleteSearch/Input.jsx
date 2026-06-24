export const Input = ({searchTerm, setSearchTerm, showSuggestions , filteredSuggestions, 
    handleSuggestionClick, activeIndex}) => {
  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <i className=" ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base sm:text-lg" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search technology..."
          className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2
                    border-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
      <div className="mt-4 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        
         {filteredSuggestions.map((item, index) => (
            <div key={item} onClick={()=>handleSuggestionClick(item)} className={`px-5 py-4 hover:bg-indigo-50 cursor-pointer flex items-center justify-between ${activeIndex === index ? "bg-indigo-50" : "" }`}>
               <span>{item}</span>
               <i className="ri-arrow-right-up-line text-slate-400"></i>
            </div>
         ))}


        {/* <div className="px-5 py-4 hover:bg-indigo-50 cursor-pointer flex items-center justify-between">
          <span>React JS</span>
          <i className="ri-arrow-right-up-line text-slate-400"></i>
        </div>

        <div className="px-5 py-4 hover:bg-indigo-50 cursor-pointer flex items-center justify-between">
          <span>Redux Toolkit</span>
          <i className="ri-arrow-right-up-line text-slate-400"></i>
        </div>

        <div className="px-5 py-4 bg-indigo-50 text-indigo-700 flex items-center justify-between">
          <span>React Router</span>
          <i className="ri-corner-down-left-line"></i>
        </div>

        <div className="px-5 py-4 hover:bg-indigo-50 cursor-pointer flex items-center justify-between">
          <span>React Query</span>
          <i className="ri-arrow-right-up-line text-slate-400"></i>
        </div> */}
      </div>
      )}
    </>
  );
};
