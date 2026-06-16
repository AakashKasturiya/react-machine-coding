export const ModalFooter = ({ setOpenModal }) => {
  return (
    <>
      <footer className="p-5 sm:p-6 border-t border-gray-200">
        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:justify-end sm:items-center">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="cursor-pointer w-full rounded-xl border px-4 py-2 text-sm sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white sm:ml-3 sm:w-auto"
          >
            Create Project
          </button>
        </div>
      </footer>
    </>
  );
};
