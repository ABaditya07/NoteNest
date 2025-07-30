// components/Navbar.jsx

import { NavLink } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleBlur = () => {
    setSearchTerm("");
  };

  const activeClass = "text-blue-600 font-semibold";
  const baseClass = "text-gray-700 hover:text-blue-500 transition";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left - Navigation Links */}
      <div className="flex gap-6 text-sm md:text-base">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? activeClass : baseClass
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/my-blogs"
          className={({ isActive }) =>
            isActive ? activeClass : baseClass
          }
        >
          Your Posts
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? activeClass : baseClass
          }
        >
          New Post
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            isActive ? activeClass : baseClass
          }
        >
          Saved Posts
        </NavLink>
      </div>

      {/* Right - Search Bar */}
      <div className="w-full md:w-80">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </nav>
  );
};

export default Navbar;
