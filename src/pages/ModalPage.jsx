import { useState } from "react";
import { ModalButton } from "../components/modal/ModalButton";
import { ModalComponent } from "../components/modal/ModalComponent";
import { ModalForm } from "../components/common/ModalForm";

export const ModalPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && (
        <ModalComponent setOpenModal={setOpenModal}>
            <ModalForm/>
        </ModalComponent>
      )}
      <div className="flex items-center justify-center w-full min-h-screen">
         <ModalButton setOpenModal={setOpenModal} />
      </div>
    </>
  );
};
