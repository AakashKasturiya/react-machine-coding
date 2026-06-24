export const EmptyState = () =>{
    return(
        <>
        <div className=" mt-6 border-2 border-dashed border-slate-200
           rounded-2xl p-6 sm:p-10 text-center">
            <i className="ri-search-eye-line text-4xl sm:text-5xl text-slate-300"></i>

            <h3 className="mt-3 text-base sm:text-lg font-semibold text-slate-700">
              No Results Found
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Try searching for another technology.
            </p>
          </div>

        </>
    )
}