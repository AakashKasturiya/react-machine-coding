export const TableSkeleton = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <tr
          key={index}
          className="border-t border-slate-100 animate-pulse"
        >
          <td className="px-6 py-5">
            <div className="h-4 w-4 bg-slate-200 rounded"></div>
          </td>

          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200"></div>

              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-3 w-20 bg-slate-100 rounded"></div>
              </div>
            </div>
          </td>

          <td className="px-6 py-5">
            <div className="h-4 w-44 bg-slate-200 rounded"></div>
          </td>

          <td className="px-6 py-5">
            <div className="h-4 w-28 bg-slate-200 rounded"></div>
          </td>

          <td className="px-6 py-5">
            <div className="h-6 w-24 rounded-full bg-slate-200"></div>
          </td>

          <td className="px-6 py-5">
            <div className="flex gap-2 justify-center">
              <div className="h-10 w-10 rounded-xl bg-slate-200"></div>
              <div className="h-10 w-10 rounded-xl bg-slate-200"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};