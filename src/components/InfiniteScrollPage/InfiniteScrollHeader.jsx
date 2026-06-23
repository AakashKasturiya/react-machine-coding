export const InfiniteScrollHeader = () => {
  return (
    <div
      className="bg-white
      p-3 sm:p-5
      flex flex-col sm:flex-row
      items-start sm:items-center
      justify-between
      gap-3 sm:gap-0
      w-full
      "
    >
      {/* Left Side */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Icon */}
        <div
          className="
          h-11 w-11 sm:h-14 sm:w-14
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          to-purple-500
          flex
          items-center
          justify-center
          text-white
          text-2xl sm:text-3xl
          "
        >
          <i className="ri-infinity-line"></i>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-800 truncate">
            Infinite Scroll Feed
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm mt-1 line-clamp-2">
            Loading data automatically as you scroll
          </p>
        </div>
      </div>

      {/* Right Side */}
      <button
        className="
        h-10 w-10 sm:h-12 sm:w-12
        rounded-xl
        hover:bg-slate-100
        transition-all
        flex
        items-center
        justify-center
        text-xl sm:text-2xl
        text-indigo-500
        "
      >
        <i className="ri-menu-line"></i>
      </button>
    </div>
  );
};