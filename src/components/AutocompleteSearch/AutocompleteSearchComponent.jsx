import { useEffect, useState, useRef } from "react";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import { Input } from "./Input";
import { RecentSearches } from "./RecentSearches";

const suggestions = [
  "React JS",
  "Redux Toolkit",
  "React Router",
  "React Query",
  "Next JS",
  "Node JS",
  "Express JS",
  "MongoDB",
  "Tailwind CSS",
];

export const AutoCompleteSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);

  const [activeIndex, setActiveIndex] = useState(-1)

 const dropdownRef = useRef(null);

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const searchValue = (value) => {
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);

      setActiveIndex(-1); // reset selection
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item);
    setShowSuggestions(false);
    setRecentSearch((prev) => {
      const updated = [item, ...prev.filter((search) => search !== item)];

      return updated.slice(0, 5);
    });
  };

  useEffect(()=>{
    const keyNavigation = (e)=>{
        if (!showSuggestions) return;
        
        if(e.key === "ArrowDown"){
            setActiveIndex(prev => prev < filteredSuggestions.length-1  ? prev + 1 : 0);
        }
        if(e.key === "ArrowUp"){
            setActiveIndex(prev => prev >  0 ? prev - 1 : filteredSuggestions.length - 1);
        }
        if( e.key === "Enter" && activeIndex >= 0) {
            const item = filteredSuggestions[activeIndex];

            setSearchTerm(item);
            setShowSuggestions(false);
            setRecentSearch((prev) => {
              const updated = [item, ...prev.filter((search) => search !== item)];
              return updated.slice(0, 5);
            });
        }
    }

     window.addEventListener('keydown', keyNavigation);

     return ()=> window.removeEventListener('keydown', keyNavigation);

  },[ activeIndex,
  filteredSuggestions,
  showSuggestions])

  
  useEffect(()=>{
    const suggestionCloseOutside = (e) =>{
       if(!dropdownRef.current.contains(e.target)){
          setShowSuggestions(false)
       }
    }
    
   
    window.addEventListener('click', suggestionCloseOutside);
    return ()=>  window.removeEventListener('click', suggestionCloseOutside);

  },[])

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
            filteredSuggestions={filteredSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            activeIndex={activeIndex}
          />

          {/* Recent Searches */}
          {(searchTerm.trim() === "" || (!showSuggestions && recentSearch.length > 0)) && (
            <RecentSearches recentSearch={recentSearch} />
          )}

          {/* Empty State */}
          {searchTerm.trim() && filteredSuggestions.length === 0 && (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
};
