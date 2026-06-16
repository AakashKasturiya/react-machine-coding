export const ModalButton = ({setOpenModal}) => {
  return (
    <>
      <button onClick={()=> setOpenModal((prev) => !prev)} className="px-6 py-3 rounded-xl bg-indigo-600
                   text-white font-medium shadow-lg hover:scale-105 
                   transition-all cursor-pointer">Create New Project
      </button>
    </>
  );
};
