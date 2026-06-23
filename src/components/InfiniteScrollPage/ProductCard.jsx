export const ProductCard = ({ product }) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-sm
      p-3 sm:p-4
      flex flex-col sm:flex-row
      gap-3 sm:gap-4
      hover:shadow-lg
      transition-all
      duration-300
    "
    >
      {/* Product Image */}
      <div
        className="
        w-full sm:w-28
        h-44 sm:h-28
        rounded-2xl
        overflow-hidden
        bg-slate-100
        flex-shrink-0
      "
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
          {product.title}
        </h3>

        <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-2">
          ${product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          <i className="ri-star-fill text-yellow-400"></i>
          <i className="ri-star-fill text-yellow-400"></i>
          <i className="ri-star-fill text-yellow-400"></i>
          <i className="ri-star-fill text-yellow-400"></i>
          <i className="ri-star-half-fill text-yellow-400"></i>

          <span className="text-slate-500 ml-2 text-sm">
            {product.rating}
          </span>
        </div>

        {/* Button */}
        <button
          className="
          mt-4
          w-full sm:w-auto
          px-4 sm:px-6
          py-2
          bg-indigo-100
          text-indigo-600
          rounded-full
          font-medium
          hover:bg-indigo-200
          transition-all
        "
        >
          View Details
        </button>
      </div>
    </div>
  );
};