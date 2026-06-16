export const ModalHeader = ({setOpenModal}) => {
  return (
    <>
      <header className="flex items-center justify-between gap-4 p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold sm:text-xl">Create New Project</h2>
        <button onClick={()=>setOpenModal(false)}
          type="button"
          aria-label="Close dialog"
          className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer">
          <i className="ri-close-line"></i>
        </button>
      </header>
    </>
  );
};
