export const RecentSearches = ({ recentSearch }) => {
  console.log(recentSearch);
  return (
    <>
      {recentSearch.length > 0  && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Recent Searches
            </h3>

            <div className="flex flex-wrap gap-2">
              {recentSearch.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-indigo-100 text-indigo-700 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
    </>
  );
};
