import SearchSorting from "./SearchSorting";
import FilterField from "./FilterField";

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
  return (
    <>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6 mx-6">
          <SearchSorting
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
          />
          <FilterField
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            department={department}
            setDepartment={setDepartment}
            clearFilters={clearFilters}
          />
      </div>
    </>
  );
};
