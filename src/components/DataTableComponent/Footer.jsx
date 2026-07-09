export const Footer = ({users}) =>{
    return(
        <>
        <div className="px-6 py-5 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold">1-10</span> of <span className="font-semibold">{users.length}</span> users
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
              Previous
            </button>

            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
              1
            </button>

            <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
              2
            </button>

            <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
              3
            </button>

            <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
              Next
            </button>

          </div>

        </div>
        
        </>
    )
}