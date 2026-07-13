import { useEffect, useMemo, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Pagination } from "../components/DataTableComponent/Pagination";
import { Table } from "../components/DataTableComponent/Table";
import { Toolbar } from "../components/DataTableComponent/Toolbar";
import { Header } from "../components/DataTableComponent/Header";

import { useDebounce } from "../hooks/useDebounce";

export const DataTableComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allSelect, setAllSelect] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");


  const debouncedSearch = useDebounce(searchInput, 500);

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getFetchUserData = async () => {
      try {
        setLoading(true);
        setError("");

        const skip = (currentPage - 1) * pageSize;
        let url = `https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`;

        if (debouncedSearch.trim()) {
          url = `https://dummyjson.com/users/search?q=${debouncedSearch}&limit=${pageSize}&skip=${skip}`;
        }

        if (sortBy) {
          url += `${debouncedSearch.trim() ? "&" : "&"}sortBy=${sortBy}&order=${order}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUsers(data.users || []);
        setTotalUsers(data.total || 0);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getFetchUserData();
  }, [debouncedSearch, sortBy, order, currentPage, pageSize]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (genderFilter && user.gender?.toLowerCase() !== genderFilter.toLowerCase()) {
        return false;
      }

      if (ageFilter) {
        const age = Number(user.age);
        if (ageFilter === "18-25" && (age < 18 || age > 25)) return false;
        if (ageFilter === "26-35" && (age < 26 || age > 35)) return false;
        if (ageFilter === "36-45" && (age < 36 || age > 45)) return false;
        if (ageFilter === "45+" && age < 45) return false;
      }

      if (departmentFilter && user.company?.department !== departmentFilter) {
        return false;
      }

      return true;
    });
  }, [users, genderFilter, ageFilter, departmentFilter]);

  const resetFilters = () => {
    setGenderFilter("");
    setAgeFilter("");
    setDepartmentFilter("");
  };

  const handlerDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#0f0707",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed){
          Swal.fire({
          title: "Deleted!",
          text: "Your user has been deleted.",
          icon: "success",
        });
        
        setUsers(prev =>
           prev.filter(user => user.id !== id)
        );
      }
    });

  };


  const selectAllHandler = (check) =>{
       setAllSelect(check);
  }

  const clearAllHandler = () => {
    setUsers([]);
    setAllSelect(false)
  }

  const totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 p-4 sm:p-6">
      <section className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-visible">
        {/* Header */}
        <Header />

        {/* Toolbar */}
        <Toolbar
          allSelect={allSelect}
          clearAllHandler={clearAllHandler}
          searchInput={searchInput}
          setSearchInput={handleSearchInputChange}
          sortBy={sortBy}
          setSortBy={handleSortByChange}
          order={order}
          setOrder={handleOrderChange}
          gender={genderFilter}
          setGender={setGenderFilter}
          age={ageFilter}
          setAge={setAgeFilter}
          department={departmentFilter}
          setDepartment={setDepartmentFilter}
          clearFilters={resetFilters}
        />

        {/* Table */}
        <Table users={filteredUsers} handlerDelete={handlerDelete} loading={loading} error={error} allSelect={allSelect} selectAllHandler={selectAllHandler} clearAllHandler={clearAllHandler} searchInput={searchInput} />

        {/* Footer */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
};
