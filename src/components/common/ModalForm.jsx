export const ModalForm = () => {
  return (
    <>
      <form>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="project-name"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="Enter project name"
              className="w-full rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="project-desc"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="project-desc"
              rows={4}
              placeholder="Describe your project..."
              className="w-full rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </form>
    </>
  );
};
