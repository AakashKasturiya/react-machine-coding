import { useState, useEffect, useRef } from "react";
import { HeaderDropdown } from "./HeaderDropdown";
import { Footer } from "./Footer";

const dropdownList = ["html", "css", "js", "php", "react"];
const MAX_SELECTION = 3;

export const MultiSelectComponent = () => {
  // Selected values (chips)
  const [selectInput, setSelectInput] = useState(["html"]);

  // Dropdown visibility
  const [optionShow, setOptionShow] = useState(false);

  // Error message (ex: max selection)
  const [error, setError] = useState("");

  // Search term for filtering options
  const [searchTerm, setSearchTerm] = useState("");

  // Keyboard navigation: highlighted option index within the filtered list
  const [activeIndex, setActiveIndex] = useState(0);

  // Container ref used for click-outside detection + focus scoping for keyboard events
  const dropdownRef = useRef(null);

  // Toggle select/unselect for an option with max selection constraint
  const handleChange = (id) => {
    if (!selectInput.includes(id) && selectInput.length >= MAX_SELECTION) {
      setError(`Maximum ${MAX_SELECTION} selections allowed`);
      return;
    }

    setError("");

    setSelectInput((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Remove a selected chip
  const removeSelectedItem = (id) => {
    setSelectInput((prev) => prev.filter((item) => item !== id));
  };

  // Select all available options
  const selectAllHandler = () => {
    setSelectInput(dropdownList);
  };

  // Clear all selections
  const removeAllHandler = () => {
    setSelectInput([]);
  };

  // Search filter for dropdown items
  const filteredList = dropdownList.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Keep keyboard highlight sane when dropdown closes or search filters reduce the list
  useEffect(() => {
    if (!optionShow) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > filteredList.length - 1) {
      setActiveIndex(0);
    }
  }, [optionShow, searchTerm, filteredList.length, activeIndex]);

  // Keyboard navigation (scoped to this component)
  // - ArrowUp/ArrowDown: move highlight (and open dropdown if closed)
  // - Enter: open dropdown if closed, otherwise select highlighted option
  // - Escape: close dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isFocusInside = dropdownRef.current?.contains(document.activeElement);
      if (!optionShow && !isFocusInside) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOptionShow(false);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();

        if (!optionShow) {
          setOptionShow(true);
          return;
        }

        const activeItem = filteredList[activeIndex];
        if (activeItem) handleChange(activeItem);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();

        if (!optionShow) {
          setOptionShow(true);
          return;
        }

        setActiveIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : prev));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        if (!optionShow) {
          setOptionShow(true);
          return;
        }

        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [optionShow, filteredList, activeIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const outsideCloseDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOptionShow(false);
        setSearchTerm("");
        setActiveIndex(0);
      }
    };

    window.addEventListener("mousedown", outsideCloseDropdown);

    return () => window.removeEventListener("mousedown", outsideCloseDropdown);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 flex items-center justify-center p-6">
        <section className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header: title + selected count */}
          <HeaderDropdown selectInput={selectInput} />

          {/* Body: input/chips + dropdown list + actions */}
          <div className="p-8" ref={dropdownRef}>
            {/* Input Area: chips + dropdown toggle */}
            <div
              onClick={() => setOptionShow((prev) => !prev)}
              className="
    min-h-[64px]
    w-full
    border-2
    border-slate-200
    rounded-2xl
    px-4
    py-3
    flex
    flex-wrap
    gap-2
    items-center
    cursor-pointer
  "
            >
              {selectInput.map((item) => (
                <div
                  key={item}
                  className="
               flex
               items-center
               gap-2
               bg-indigo-100
               text-indigo-700
               px-3
               py-1.5
               rounded-full
               text-sm
               font-medium
               "
                >
                  {item}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedItem(item);
                    }}
                    className="
         h-5
         w-5
         rounded-full
         bg-indigo-200
         flex
         items-center
         justify-center
         hover:bg-indigo-300
         transition-all
         "
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              ))}

              {selectInput.length === 0 && (
                <span className="text-slate-400">Select technologies...</span>
              )}

              <span className="ml-auto text-2xl">
                {optionShow ? (
                  <i className="ri-arrow-drop-up-line"></i>
                ) : (
                  <i className="ri-arrow-drop-down-line"></i>
                )}
              </span>
            </div>

            {/* Dropdown: search + filtered list */}
            {optionShow && (
              <div
                className="
           mt-4 rounded-2xl border border-slate-200 shadow-lg
            "
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Search technology..."
                  className="
        w-full
        px-4
        py-3
        border-b
        border-slate-200
        outline-none
      "
                />

                {filteredList.length === 0 && (
                  <div className="p-4 text-center text-slate-400">
                    No technology found
                  </div>
                )}
                {filteredList.map((item, index) => (
                  <div
                    key={item}
                    onClick={() => handleChange(item)}
                    className={`
               px-4
               py-3
               cursor-pointer
               transition-all
               hover:bg-indigo-50
               flex
               items-center
               justify-between
               ${activeIndex === index ? "bg-indigo-50" : ""}
               ${selectInput.includes(item) ? "bg-indigo-100" : ""}
               `}
                  >
                    <span>{item}</span>
                    {selectInput.includes(item) && (
                      <i className="ri-check-line text-xl"></i>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={selectAllHandler}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
              >
                Select All
              </button>
              <button
                onClick={removeAllHandler}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Clear All
              </button>
            </div>

            {/* Footer: errors */}
            <Footer error={error} />
          </div>
        </section>
      </main>
    </>
  );
};
