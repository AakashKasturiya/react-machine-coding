export const Toolbar = ({
  allSelect,
  clearAllHandler,
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
  order,
  setOrder
}) => {


  
  return (
    <>
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="
                w-full
                pl-11
                pr-4  
                py-3
                rounded-xl
                border
                border-slate-200
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                "
            />
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Left */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Sort Users
                </h3>

                <p className="text-sm text-slate-500">
                  Sort users by different fields.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort By */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-slate-500 mb-1">
                    Sort By
                  </label>

                  <select onChange={(e)=>setSortBy(e.target.value)} value={sortBy}
                    className="
                       w-44
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2.5
        text-sm
        outline-none
        transition  
        focus:border-indigo-400
        focus:ring-2
        focus:ring-indigo-100
      "
                  >
                    <option value="">Select Field</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                  </select>
                </div>

                {/* Order */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-slate-500 mb-1">
                    Order
                  </label>

                  <select value={order} onChange={(e)=> setOrder(e.target.value)}
                    className="
        w-36
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2.5
        text-sm
        outline-none
        transition
        focus:border-indigo-400
        focus:ring-2
        focus:ring-indigo-100
      "
                  >
                    <option value="asc">Ascending ↑</option>
                    <option value="desc">Descending ↓</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="
                px-5
                py-3
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                transition
                "
            >
              Export CSV
            </button>

            <button
              className="
                px-5
                py-3
                rounded-xl
                bg-indigo-600
                text-white
                hover:bg-indigo-700
                transition
                "
            >
              + Add User
            </button>

            {allSelect && (
              <button
                onClick={clearAllHandler}
                className="px-5 py-3 rounded-xl
                      bg-slate-100 hover:bg-slate-200 transition"
              >
                Delete All
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
