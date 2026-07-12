import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TableSkeleton } from "./TableSkeleton";

export const Table = ({ users, loading, error, handlerDelete, allSelect, selectAllHandler, clearAllHandler }) => {
  const confirmDeleteAll = () => {
    Swal.fire({
      title: 'Delete all users?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete all',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllHandler();
        Swal.fire({
          title: 'Deleted!',
          text: 'All users have been removed.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
           {allSelect && (
            <div className="flex justify-end px-6">
        <button
          type="button"
          className="
      px-5
      py-3
      rounded-xl
      border
      text-white
      bg-red-600
      hover:bg-red-800
      transition
    "
       onClick={confirmDeleteAll}
        >
          Delete All
        </button>
        </div>
           )}
 

        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input type="checkbox" checked={allSelect} onChange={(e)=>selectAllHandler(e.target.checked)} />
              </th>
              {["Name", "Email", "Age", "Gender", "Phone", " Address", "Actions"].map(
                (item, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-center font-semibold text-slate-700"
                  >
                    {item}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {loading && (
                 <TableSkeleton />
            )}

            {error && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="
                  border-t
                  border-slate-100
                  hover:bg-indigo-50
                  transition
                  "
                >
                  <td className="px-6 py-5">
                    <input type="checkbox" checked={allSelect} readOnly />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                      h-10
                      w-10
                      rounded-full
                      bg-indigo-100
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-indigo-600
                      "
                      >
                        <img src={user.image} alt={user.firstName} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {user.firstName + " " + user.lastName}
                        </h3>

                        <p className="text-sm text-slate-500">{user.company.department}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {user.email.length > 10 ? `${user.email.slice(0, 10)}...` : user.email}
                  </td>
                  <td className="px-6 py-5">{user.age}</td>
                  <td className="px-6 py-5">{user.gender}</td>
                  <td className="px-6 py-5">{user.phone}</td>
                  <td className="px-6 py-5">
                    <span
                      className="
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    bg-green-100
                    text-green-700
                    "
                    >
                      {user.address.country}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handlerDelete(user.id)}
                        className="
                        h-10
                        w-10
                        rounded-xl
                        bg-red-400
                        hover:bg-red-800
                        text-white
                        transition
                        "
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-10">
                  <div className="w-full flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                      <i className="ri-user-search-line text-2xl"></i>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-800">No users found</p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try a different search, sort, or filter to find users.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
