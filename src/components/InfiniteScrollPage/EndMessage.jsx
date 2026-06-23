export const EndMessage = () => {
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
        rounded-full
        bg-indigo-100
        flex
        items-center
        justify-center
      "
      >
        🎉
      </div>

      <div>
        <h3 className="font-bold text-indigo-600">
          You've reached the end!
        </h3>

        <p className="text-slate-500 text-sm">
          No more products to load
        </p>
      </div>
    </div>
  );
};