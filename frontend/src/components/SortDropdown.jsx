// SortDropdown.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

const sortOptions = [
  { label: "Date", value: "createdAt", icon: <FaCalendarAlt /> },
  { label: "Title", value: "title", icon: <FaSortAlphaUp /> },
  { label: "Tag", value: "tags", icon: <FaTags /> },
];

const SortDropdown = ({ sortField, sortOrder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleOrder = (field) => {
    if (field === sortField) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      onChange(field, newOrder);
    } else {
      onChange(field, "asc");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end text-left pt-6" ref={dropdownRef}>
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-end items-center gap-2 px-4 py-2 text-sm font-medium bg-white border hover:border-gray-400 border-gray-400 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600"
      >
        Sort
        <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-12 p-1 w-44 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleOrder(opt.value)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 bg-white border-none hover:bg-gray-300 ${
                  sortField === opt.value ? "font-semibold" : ""
                }`}
              >
                <span className="flex gap-2 items-center">
                  {opt.icon} {opt.label}
                </span>
                {sortField === opt.value && (
                  <i
                    className={`fas fa-arrow-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
