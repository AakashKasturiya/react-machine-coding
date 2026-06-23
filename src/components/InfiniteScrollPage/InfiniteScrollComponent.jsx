import { ProductCard } from "./ProductCard";
import { Loader } from "./Loader";
import { useEffect, useState, useRef } from "react";
import { ProductSkeleton } from "./ProductSkeleton";
import { EndMessage } from "./EndMessage";
import { InfiniteScrollHeader } from "./InfiniteScrollHeader";

export const InfiniteScrollComponent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const loaderRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    setShowScrollToTop(top > 300);
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${page}`,
        );

        const data = await response.json();
        setError("");

        setProducts((prev) => {
          const uniqueProducts = data.products.filter(
            (product) => !prev.some((item) => item.id === product.id),
          );

          return [...prev, ...uniqueProducts];
        });

        if (data.products.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        setError("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  console.log(products);

  /**Old scollbar functionality */
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const bottom =
  //         window.innerHeight + window.scrollY >=
  //         document.documentElement.scrollHeight - 200;

  //       if (bottom && !loading && hasMore) {
  //         setPage((prev) => prev + 10);
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 10);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 1,
      },
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);
  return (
    <>
      <main className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 p-2 sm:p-6 flex items-center justify-center">
        <section
          className="relative flex flex-col w-full max-w-md h-[92vh] sm:h-[720px] max-h-full bg-white shadow-sm rounded-3xl border border-slate-200 overflow-hidden"
        >
          <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
            <InfiniteScrollHeader />
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <div className="space-y-4">
              {products.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}

              <div ref={loaderRef} className="">
                {loading && <ProductSkeleton />}
              </div>

              {!hasMore && <EndMessage />}
              {error && <div className="text-center text-red-500">{error}</div>}
            </div>
          </div>

          {showScrollToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <i className="ri-arrow-up-line text-xl"></i>
            </button>
          )}
        </section>
      </main>
    </>
  );
};
