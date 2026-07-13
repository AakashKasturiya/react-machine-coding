import { useState } from "react";
import SearchSorting from "./SearchSorting";

export const Toolbar = ({
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
  order,
  setOrder,
  gender,
  setGender,
  age,
  setAge,
  department,
  setDepartment,
  clearFilters,
}) => {
  const [filterToggle, setFilterToggle] = useState(false);

  const filterToggleFunction = () => {
    setFilterToggle((prev) => !prev);
  };

  const closeFilterPanel = () => {
    setFilterToggle(false);
  };

  return (
    <>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6 mx-6 relative">
        <SearchSorting
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          filterToggle={filterToggle}
          filterToggleFunction={filterToggleFunction}
          gender={gender}
          setGender={setGender}
          age={age}
          setAge={setAge}
          department={department}
          setDepartment={setDepartment}
          clearFilters={clearFilters}
          closeFilterPanel={closeFilterPanel}
        />
      </div>
    </>
  );
};
