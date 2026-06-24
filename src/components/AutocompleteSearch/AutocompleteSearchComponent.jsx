import { useEffect, useState, useRef } from "react";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import { Input } from "./Input";
import { RecentSearches } from "./RecentSearches";

const suggestions = [
{
      "id": 101,
      "title": "Apple AirPods Max Silver",
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp"
    },
    {
      "id": 104,
      "title": "Apple iPhone Charger",
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp"
    },
    {
      "id": 105,
      "title": "Apple MagSafe Battery Pack",
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp"
    },
    {
      "id": 107,
      "title": "Beats Flex Wireless Earphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp"
    },
];

export const AutoCompleteSearch = () => {
  // Current input value (what user is typing)
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced value (we call API using this value to avoid too many requests)
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Controls whether the dropdown list is visible
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Recent searches are stored in localStorage so they survive page refresh
  const [recentSearch, setRecentSearch] = useState(() => {
    try {
      const stored = localStorage.getItem("recentSearch");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, 5);
    } catch {
      return [];
    }
  });

  // Which suggestion is currently highlighted for keyboard navigation
  const [activeIndex, setActiveIndex] = useState(-1)

  // True while API request is running
  const [loading, setLoading] = useState(false);

  // Suggestions received from API (we store product objects)
  const [apiSuggestions, setApiSuggestions] = useState([]);

 // Wrapper ref to detect click outside and close dropdown
 const dropdownRef = useRef(null);

  // Local suggestions (used only when searchTerm is empty)
  const filteredSuggestions = suggestions.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  // Final suggestions list to display:
  // - if user typed something -> show API suggestions
  // - otherwise -> show local suggestions
  const displayedSuggestions = searchTerm.trim().length > 0 ? apiSuggestions : filteredSuggestions;

  // Called from <Input/> on every change
  const searchValue = (value) => {
    setSearchTerm(value);
    setShowSuggestions(true);

    // As soon as the user types, we switch to API-driven suggestions.
    // Clear previous results so we don't show stale suggestions.
    if (value.trim().length > 0) {
      setApiSuggestions([]);
      setLoading(true);
    } else {
      setApiSuggestions([]);
      setLoading(false);
    }

      setActiveIndex(-1); // reset selection
  };

  // When user selects a suggestion (mouse click)
  // We store only the title in recent searches.
  const handleSuggestionClick = (itemTitle) => {
    setSearchTerm(itemTitle);
    setShowSuggestions(false);
    setRecentSearch((prev) => {
      const updated = [itemTitle, ...prev.filter((search) => search !== itemTitle)].slice(0, 5);
      try {
        localStorage.setItem("recentSearch", JSON.stringify(updated));
      } catch {
        // ignore storage failures
      }
      return updated;
    });
  };

  // Keep recent searches synced to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("recentSearch", JSON.stringify(recentSearch.slice(0, 5)));
    } catch {
      // ignore storage failures (private mode, quota, etc.)
    }
  }, [recentSearch]);

  // Keyboard navigation for suggestions (ArrowUp/ArrowDown/Enter)
  useEffect(()=>{
    const keyNavigation = (e)=>{
        if (!showSuggestions) return;
        if (displayedSuggestions.length === 0) return;
        
        if(e.key === "ArrowDown"){
            setActiveIndex(prev => prev < displayedSuggestions.length-1  ? prev + 1 : 0);
        }
        if(e.key === "ArrowUp"){
            setActiveIndex(prev => prev >  0 ? prev - 1 : displayedSuggestions.length - 1);
        }
        if( e.key === "Enter" && activeIndex >= 0) {
            const item = displayedSuggestions[activeIndex];
            const itemTitle = item?.title;

            if (!itemTitle) return;

            setSearchTerm(itemTitle);
            setShowSuggestions(false);
            setRecentSearch((prev) => {
              const updated = [itemTitle, ...prev.filter((search) => search !== itemTitle)].slice(0, 5);
              try {
                localStorage.setItem("recentSearch", JSON.stringify(updated));
              } catch {
                // ignore storage failures
              }
              return updated;
            });
        }
    }

     window.addEventListener('keydown', keyNavigation);

     return ()=> window.removeEventListener('keydown', keyNavigation);

  },[ activeIndex,
  displayedSuggestions,
  showSuggestions])

  // Close suggestions dropdown when user clicks outside the component
  useEffect(()=>{
    const suggestionCloseOutside = (e) =>{
       if(!dropdownRef.current) return;
       if(!dropdownRef.current.contains(e.target)){
          setShowSuggestions(false)
       }
    }
    
   
    window.addEventListener('click', suggestionCloseOutside);
    return ()=>  window.removeEventListener('click', suggestionCloseOutside);

  },[])

  // Fetch API suggestions when debounced value changes
  useEffect(()=>{
    if (!debouncedSearch.trim()) {
      setApiSuggestions([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async()=>{
        try{
            setLoading(true);
            const response = await fetch(
              `https://dummyjson.com/products/search?q=${debouncedSearch}`,
              { signal },
            );
            const data = await response.json();
            setApiSuggestions((data?.products ?? []).map((p) => p));

        }catch(error){
           if (error?.name !== "AbortError") {
             console.log(error)
           }
        }finally{
            setLoading(false);
        }
        
    }

    fetchData();
    return () => controller.abort();
  },[debouncedSearch])

  // Debounce logic: update `debouncedSearch` 500ms after user stops typing
  useEffect(()=>{
    const timer = setTimeout(()=>{
         setDebouncedSearch(searchTerm);
    },500)

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 p-4 sm:p-6">
      <section ref={dropdownRef}
        className="w-full max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border
      border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <Header />

        {/* Body */}
        <div className="p-5 sm:p-8">
          <Input
            searchTerm={searchTerm}
            setSearchTerm={searchValue}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            filteredSuggestions={displayedSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            activeIndex={activeIndex}
            loading={loading}
          />

          {/* Recent Searches */}
          {(searchTerm.trim() === "" || (!showSuggestions && recentSearch.length > 0)) && (
            <RecentSearches recentSearch={recentSearch} />
          )}

          {/* Empty State */}
          {searchTerm.trim() && !loading && displayedSuggestions.length === 0 && (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
};
