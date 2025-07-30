// components/Header.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/home" className="text-3xl font-extrabold text-blue-400 hover:text-blue-500 transition">
        NoteNest
      </Link>

      {user && (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-lg transition"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-gray-600"
            />
            <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
            <FaChevronDown className="text-xs" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 border rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 bg-gray-100 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
              </div>

              <nav className="flex flex-col px-3 py-2">
                <NavLink to="/my-blogs" className="px-3 py-2 rounded hover:bg-gray-100">
                  📚 Your Posts
                </NavLink>
                <NavLink to="/create" className="px-3 py-2 rounded hover:bg-gray-100">
                  ✍️ New Post
                </NavLink>
                <NavLink to="/saved" className="px-3 py-2 rounded hover:bg-gray-100">
                  💾 Saved Posts
                </NavLink>
              </nav>

              <div className="px-4 py-2 border-t bg-gray-50">
                <button
                  onClick={() => navigate("/logout")}
                  className="w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
                >
                  🔒 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
