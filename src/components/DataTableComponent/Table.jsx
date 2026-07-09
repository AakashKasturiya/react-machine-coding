import { TableSkeleton } from "./TableSkeleton";

export const Table = ({ users, loading, error, handlerDelete, allSelect, selectAllHandler }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input type="checkbox" onChange={(e)=>selectAllHandler(e.target.checked)} />
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
                    <input type="checkbox" checked={allSelect ? "checked" : ""} />
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

                        <p className="text-sm text-slate-500">{user.role}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">{user.email}</td>
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
                        className="
                        h-10
                        w-10
                        rounded-xl
                        bg-slate-100
                        hover:bg-indigo-100
                        transition
                        "
                      >
                        <i className="ri-edit-line"></i>
                      </button>

                      <button
                        onClick={() => handlerDelete(user.id)}
                        className="
                        h-10
                        w-10
                        rounded-xl
                        bg-red-50
                        hover:bg-red-100
                        text-red-500
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
              <p>Users is not Available !!</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
