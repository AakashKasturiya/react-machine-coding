import { useEffect, useState } from "react";

export const ToastItem = ({ toastTypeData, toastCloseHandler }) => {
  const [progress, setProgress] = useState(100);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev <= 0) {
        clearInterval(interval);
        return 0;
      }

      return prev - 1;
    });
  }, 50);

  return () => clearInterval(interval);
}, []);



useEffect(() => {
  if (progress <= 0) {
    toastCloseHandler(toastTypeData.id);
  }
}, [progress, toastTypeData.id, toastCloseHandler]);

  return (
    <div
      className={`w-80 rounded-2xl shadow-xl border p-4 flex items-start justify-between gap-3 relative flex-col ${toastTypeData.borderColor} ${toastTypeData.bgColor} `}
    >
      <div>
        <h3
          className={`font-semibold ${toastTypeData.textColor} flex items-center gap-2`}
        >
          {toastTypeData.title}{" "}
          <i
            className={`${toastTypeData.icon} text-lg ${toastTypeData.textColor}`}
          ></i>
        </h3>

        <p className="text-sm text-slate-600 mt-1">{toastTypeData.message}</p>
      </div>

      <button
        className="cursor-pointer absolute top-2 right-2"
        onClick={() => toastCloseHandler(toastTypeData.id)}
      >
        <i className="ri-close-line text-lg"></i>
      </button>

      <div className="w-full bg-slate-200 h-[4px] rounded-full overflow-hidden">
        <div
          className={`h-full ${toastTypeData.buttonColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
