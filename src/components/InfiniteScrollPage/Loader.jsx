export const Loader = () => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      p-6
      flex
      items-center
      gap-4
    "
    >
      <div
        className="
        w-12
        h-12
        border-4
        border-indigo-200
        border-t-indigo-600
        rounded-full
        animate-spin
      "
      ></div>

      <div>
        <h3 className="font-bold text-indigo-600">
          Loading...
        </h3>

        <p className="text-slate-500 text-sm">
          Fetching more products for you
        </p>
      </div>
    </div>
  );
};