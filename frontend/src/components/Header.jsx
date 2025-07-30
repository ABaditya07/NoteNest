import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  // Access the logout function and user data from AuthContext
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicked outside
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
    <header className="bg-gray-800 p-5 flex justify-between items-center">
      <Link to="/home" className="text-4xl font-bold text-white">
        Blogify
      </Link>

      {user && (
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          {" "}
          <span className="text-white">Welcome, {user.name}</span>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 top-10 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 transform transition-all duration-200 ease-out origin-top-right scale-95 opacity-0 animate-fade-in">
              <div className="p-5 flex items-center border-b">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="ml-2 text-start">
                  <p className="font-bold text-lg text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-start flex flex-col py-2 px-3 border-b">
                <NavLink to="/my-blogs" className="text-gray-600 p-2 rounded-md hover:bg-gray-200">
                  Your Posts
                </NavLink>
                <NavLink to="/create" className="text-gray-600 p-2 rounded-md hover:bg-gray-200">
                  New Post
                </NavLink>
                <NavLink to="/saved" className="text-gray-600 p-2 rounded-md hover:bg-gray-200">
                  Saved Posts
                </NavLink>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 my-3 flex mx-5"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
