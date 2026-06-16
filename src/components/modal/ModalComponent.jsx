import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import {  useEffect } from "react";

import { createPortal } from "react-dom";

export const ModalComponent = ({setOpenModal, children}) => {

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpenModal(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [setOpenModal]);


/** Get the Modal Id form the root file */
  const modalRoot = document.getElementById("modal-root");

    return createPortal(
        <>
            <div aria-modal="true" role="dialog"
               className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
               <div onClick={()=>setOpenModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
               <div className="relative w-full max-w-lg transform rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5">      
                 <ModalHeader setOpenModal={setOpenModal}/>
                 
                 <ModalBody setOpenModal={setOpenModal} >
                    {children}
                 </ModalBody>

                 <ModalFooter setOpenModal={setOpenModal}/>
               </div>
             </div>
        </>,
       modalRoot
    )
}