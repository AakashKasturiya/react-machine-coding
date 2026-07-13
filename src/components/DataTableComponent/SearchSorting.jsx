

import FilterField from "./FilterField";

export default function SearchSorting({
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
  order,
  setOrder,
  filterToggle,
  filterToggleFunction,
  gender,
  setGender,
  age,
  setAge,
  department,
  setDepartment,
  clearFilters,
  closeFilterPanel,
}) {
  const sortFields = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "email", label: "Email" },
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
  ];

  return (
    <div className="relative">
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

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 flex flex-col gap-4">
          <div>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                <option value="asc">Ascending ↑</option>
                <option value="desc">Descending ↓</option>
              </select>
            </div>
          </div>

          {sortBy && (
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 w-fit">
              {sortFields.find((f) => f.value === sortBy)?.label} · {order === "asc" ? "Ascending" : "Descending"}
            </div>
          )}
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={filterToggleFunction}
            className="w-full sm:w-auto flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-indigo-300"
            type="button"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100">
              <i className="ri-filter-3-line text-xl text-indigo-600"></i>
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-slate-900">Filters</h3>
              <p className="text-sm text-slate-500">Filter results in place.</p>
            </div>
          </button>

          <FilterField
            filterToggle={filterToggle}
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            department={department}
            setDepartment={setDepartment}
            clearFilters={clearFilters}
            onApply={closeFilterPanel}
          />
        </div>
      </div>
    </div>
  );
}