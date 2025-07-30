import { NavLink } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleBlur = () => {
    // Clear the search input on blur
    setSearchTerm(""); // Clear input
  };

  return (
    <nav className="bg-gray-300 p-4 pl-5 pr-5 gap-5 flex flex-col md:flex-row justify-between items-center">
      <div className="flex gap-5 mb-2 md:mb-0">
        <NavLink to="/home" className="text-black hover:text-gray-800">
          Home
        </NavLink>
        <NavLink to="/my-blogs" className="text-black hover:text-gray-800">
          Your Posts
        </NavLink>
        <NavLink to="/create" className="text-black hover:text-gray-800">
          New Post
        </NavLink>
        <NavLink to="/saved" className="text-black hover:text-gray-700">
          Saved Posts
        </NavLink>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white px-2 py-1 border rounded-md w-full md:w-72 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </nav>
  );
};

export default Navbar;
