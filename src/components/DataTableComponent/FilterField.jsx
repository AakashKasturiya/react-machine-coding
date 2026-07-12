import { useState } from "react";

export default function FilterField({
    gender,
    setGender,
    age,
    setAge,
    department,
    setDepartment,
    clearFilters,
}) {
    const [filterToggle, setFilterToggle] = useState(false);

    const filterToggleFunction = () => {
          setFilterToggle(prev => !prev)
    }

  return (
    <div className="mb-6 mt-8">
         <div className="flex items-start justify-between gap-3 mt-6">
      <button onClick={filterToggleFunction} className="flex items-center gap-2 mb-5 cursor-pointer">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100">
            <i className="ri-filter-3-line text-xl text-indigo-600"></i>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
        <p className="text-sm text-slate-500">Find users and arrange them the way you need.</p>
        </div>
      </button>
         {filterToggle && (
                   <button
          type="button"
          className="
      px-5
      py-3
      rounded-xl
      border
      border-slate-200
      hover:bg-slate-100
      transition
    "
       onClick={clearFilters}
        >
          Reset Filters
        </button>
         )}


      
      </div>

        {filterToggle && (
          <section>  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gender */}

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Gender
          </label>

          <select
            className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-slate-200
        bg-white
        outline-none
        focus:ring-2
        focus:ring-indigo-100
        focus:border-indigo-400
      "
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Age */}

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Age
          </label>

          <select
            className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-slate-200
        bg-white
        outline-none
        focus:ring-2
        focus:ring-indigo-100
        focus:border-indigo-400
      "
            value={age}
            onChange={(e)=>setAge(e.target.value)}
          >
            <option value="">All Ages</option>
            <option value="18-25">18 - 25</option>
            <option value="26-35">26 - 35</option>
            <option value="36-45">36 - 45</option>
            <option value="45+">45+</option>
          </select>
        </div>

        {/* Department */}

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Department
          </label>

          <select
            className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-slate-200
        bg-white
        outline-none
        focus:ring-2
        focus:ring-indigo-100
        focus:border-indigo-400
      "
            value={department}
            onChange={(e)=>setDepartment(e.target.value)}
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

      </section>
        )}


    </div>
  );
}
