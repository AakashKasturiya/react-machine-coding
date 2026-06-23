import { ProductCard } from "./ProductCard";
import { useEffect, useState, useRef } from "react";
import { ProductSkeleton } from "./ProductSkeleton";
import { EndMessage } from "./EndMessage";
import { InfiniteScrollHeader } from "./InfiniteScrollHeader";

export const InfiniteScrollComponent = () => {
  // Stores all products fetched so far (we append new pages to this array)
  const [products, setProducts] = useState([]);

  // `page` is used as the `skip` value for the API (0, 10, 20...)
  const [page, setPage] = useState(0);

  // True while an API request is in-flight
  const [loading, setLoading] = useState(false);

  // Controls whether the floating "scroll to top" button is visible
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // False when API returns less than the requested page size (means no more data)
  const [hasMore, setHasMore] = useState(true);

  // Stores a user-friendly error message when API request fails
  const [error, setError] = useState("");

  // Points to the "sentinel" element at the bottom of the list.
  // When it becomes visible, we load the next page.
  const loaderRef = useRef(null);

  // Points to the internal scrollable container (phone screen).
  // We use this as IntersectionObserver `root` so infinite-scroll works inside it.
  const scrollContainerRef = useRef(null);

  // Runs on scroll of the internal container.
  // Used only to toggle the "scroll to top" button.
  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    setShowScrollToTop(top > 300);
  };

  // Scroll the internal container back to the top
  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch products whenever `page` changes.
  // We append unique results to `products`.
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

  // Infinite scroll using IntersectionObserver:
  // - observes `loaderRef` inside `scrollContainerRef`
  // - when the loader is visible, we load next page
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
