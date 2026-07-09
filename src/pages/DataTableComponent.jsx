import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Footer } from "../components/DataTableComponent/Footer";
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


  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const getFetchUserData = async () => {
      try {
        setLoading(true);
        setError("");

         let url = "https://dummyjson.com/users";

        if (debouncedSearch.trim()) {
            url = `https://dummyjson.com/users/search?q=${debouncedSearch}`;
          }

          if (sortBy) {
            url += `${debouncedSearch.trim() ? "&" : "?"}sortBy=${sortBy}&order=${order}`;
          }

        const res = await fetch(url);
       
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUsers(data.users);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getFetchUserData();
  }, [debouncedSearch, sortBy, order]);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 p-4 sm:p-6">
      <section className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Toolbar */}
        <Toolbar allSelect={allSelect} clearAllHandler={clearAllHandler} searchInput={searchInput}
         setSearchInput={setSearchInput} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>

        {/* Table */}
        <Table users={users} handlerDelete={handlerDelete} loading={loading} error={error} allSelect={allSelect} selectAllHandler={selectAllHandler} searchInput={searchInput} />

        {/* Footer */}
        <Footer users={users} />
      </section>
    </main>
  );
};
