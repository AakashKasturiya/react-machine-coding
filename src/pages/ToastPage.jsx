import { useState } from "react";
import { ToastContainer } from "../components/toast/ToastContainer";
import { toastData } from "../components/toast/toastData";

export const ToastPage = () => {
  const [toastList, setToastList] = useState([]);
  const [position, setPosition] = useState("top-right");

  const toastHandler = (id) => {
    const getToastData = toastData.find((item) => item.id === id);
    if (!getToastData) return;

    setToastList((prev) =>
      prev.some((item) => item?.id === id) ? prev : [...prev, getToastData],
    );
  };

  const toastCloseHandler = (id) => {
    setToastList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Toast Notification System</h1>
          <div className="mb-6">
            <label
              htmlFor="toast-position"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Toast Position
            </label>

            <select
              id="toast-position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="top-right">📍 Top Right</option>
              <option value="top-left">📍 Top Left</option>
              <option value="bottom-right">📍 Bottom Right</option>
              <option value="bottom-left">📍 Bottom Left</option>
            </select>

            <p className="mt-2 text-xs text-slate-500">
              Choose where toast notifications will appear.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            {toastData.map((item) => (
              <button
                key={item.id}
                onClick={() => toastHandler(item.id)}
                className={`px-5 py-3 rounded-xl ${item.buttonColor} text-white cursor-pointer`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </main>

      {toastList.length > 0 && (
        <ToastContainer
          toastTypeData={toastList}
          position={position}
          toastCloseHandler={toastCloseHandler}
        />
      )}
    </>
  );
};
