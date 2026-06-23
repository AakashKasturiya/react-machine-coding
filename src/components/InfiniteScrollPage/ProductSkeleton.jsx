export const ProductSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>

            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>

              <div className="h-3 bg-gray-200 rounded w-full"></div>

              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};