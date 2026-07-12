export const Pagination = ({ currentPage, totalPages, totalUsers, pageSize, onPageChange }) => {
  const start = totalUsers > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(currentPage * pageSize, totalUsers);

  const handlePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="px-6 py-5 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold">{start}-{end}</span> of <span className="font-semibold">{totalUsers}</span> users
      </p>

      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="text-sm text-slate-700 font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <button
          className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};