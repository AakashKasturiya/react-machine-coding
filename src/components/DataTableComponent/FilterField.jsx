

export default function FilterField({
  gender,
  setGender,
  age,
  setAge,
  department,
  setDepartment,
  clearFilters,
  filterToggle,
  onApply,
}) {
  return (
    <div className={`absolute z-50 top-full left-0 right-0 sm:right-0 sm:left-auto mt-3 mx-4 sm:mx-0 w-[min(100vw-2rem,40rem)] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl transition-all ${
        filterToggle ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Gender
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Age
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">All Ages</option>
            <option value="18-25">18 - 25</option>
            <option value="26-35">26 - 35</option>
            <option value="36-45">36 - 45</option>
            <option value="45+">45+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Department
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Accounting">Accounting</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
            <option value="Marketing">Marketing</option>
            <option value="Product Management">Product Management</option>
            <option value="Research and Development">Research and Development</option>
            <option value="Sales">Sales</option>
            <option value="Services">Services</option>
            <option value="Support">Support</option>
            <option value="Training">Training</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="text-sm text-slate-500">
          Select your filters and click Apply to close the panel.
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
