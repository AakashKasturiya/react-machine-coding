


export default function SearchSorting({searchInput,
  setSearchInput, sortBy, setSortBy, order, setOrder}) {

  const sortFields = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "email", label: "Email" },
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
  ];


  return (

      <div className="">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100">
           <i className="ri-seo-line text-xl text-indigo-600"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 leading-tight">
              Search &amp; Sort
            </h3>
            <p className="text-sm text-slate-500">
              Find users and arrange them the way you need.
            </p>
          </div>
        </div>

       <div className="flex items-center gap-4">        
        {/* Search */}
        <div className="">
          <label
            htmlFor="user-search"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Search users
          </label>
          <div className="relative">
            <input
              id="user-search"
              type="text"
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full  px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>
        </div>


        {/* Sort */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="grid grid-cols-2 sm:flex sm:items-end gap-3 w-full sm:w-auto">
            <div className="flex flex-col">
              <label
                htmlFor="sort-field"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Sort by
              </label>
              <select
                id="sort-field"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-44 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select field</option>
                {sortFields.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="sort-order"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Order
              </label>
              <select
                id="sort-order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                disabled={!sortBy}
                className="w-full sm:w-36 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                <option value="asc">Ascending ↑</option>
                <option value="desc">Descending ↓</option>
              </select>
            </div>
          </div>

          {sortBy && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 w-fit">
              {/* <ArrowUpDown size={12} /> */}
              {sortFields.find((f) => f.value === sortBy)?.label} ·{" "}
              {order === "asc" ? "Ascending" : "Descending"}
            </div>
          )}
        </div>
       </div>

      </div>

  );
}