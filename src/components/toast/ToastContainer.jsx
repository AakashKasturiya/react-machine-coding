import { createPortal } from "react-dom";
import { ToastItem } from "./ToastItem";

const positionClasses = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
};

export const ToastContainer = ({
  toastTypeData,
  toastCloseHandler,
  position,
}) => {
  const getToastPortal = document.getElementById("toast-root");

  return createPortal(
    <>
      <div
        className={`fixed  flex flex-col
     gap-3 z-50 ${positionClasses[position]}`}
      >
        {toastTypeData?.map((item) => (
          <ToastItem
            key={item.id}
            toastTypeData={item}
            toastCloseHandler={toastCloseHandler}
          />
        ))}
      </div>
    </>,
    getToastPortal,
  );
};
