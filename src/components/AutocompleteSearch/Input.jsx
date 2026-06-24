// Reusable search input + suggestions dropdown
export const Input = ({searchTerm, setSearchTerm, showSuggestions , setShowSuggestions, filteredSuggestions, 
    handleSuggestionClick, activeIndex,loading}) => {
  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <i className=" ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base sm:text-lg" />

        <input
          type="text"
          value={searchTerm}
          // Delegate the value update to the parent component
          onChange={(e) => setSearchTerm(e.target.value)}
          // Open dropdown when user focuses the input
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search technology..."
          className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2
                    border-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
      </div>


      {/* Suggestions */}
      {showSuggestions && (
      <div className="mt-4 rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
         {/* Shows only when user typed and API request is running */}
         {loading && searchTerm.trim().length > 0 && (
           <p className="px-5 py-4 text-sm text-slate-500">Loading...</p>
         )}
         {/* Hide list while loading (when user typed). Show list for empty input (local suggestions). */}
         {(!loading || searchTerm.trim().length === 0) &&
           filteredSuggestions.map((item, index) => (
             <div
               key={item.id}
               // Click selects the suggestion in parent component
               onClick={() => handleSuggestionClick(item.title)}
               className={`px-5 py-4 hover:bg-indigo-50 cursor-pointer flex items-center justify-between ${activeIndex === index ? "bg-indigo-50" : "" }`}
             >
              <div className="flex items-center gap-2">
                <img src={item.thumbnail} className="w-10 h-10 object-cover rounded-full overflow-hidden border border-1 border-gray-100 bg-yellow-50 p-1 " />
                <span>{item.title}</span>
              </div>
               <i className="ri-arrow-right-up-line text-slate-400"></i>
             </div>
           ))}


        {/*
        <div className="px-5 py-4 bg-indigo-50 text-indigo-700 flex items-center justify-between">
          <span>React Router</span>
          <i className="ri-corner-down-left-line"></i>
        </div> */}
      </div>
      )}
    </>
  );
};
