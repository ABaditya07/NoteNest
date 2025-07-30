import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SortDropdown from "../components/SortDropdown";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm } = useSearch();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    api
      .get(`/?page=${page}&limit=9&search=${searchTerm}&sort=${sortField}_${sortOrder}`)
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch blogs.");
        setLoading(false);
      });
  }, [page, searchTerm, sortField, sortOrder]);

  return (
    <div className="bg-white py-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Nav underline */}
        <div className="border-b border-gray-300 mb-6">
          <ul className="flex space-x-8 justify-center text-gray-600 text-sm font-medium">
            <li className="pb-2 border-b-2 border-blue-600">Home</li>
            <li className="pb-2 hover:border-b-2 hover:border-blue-500 cursor-pointer">New Post</li>
            <li className="pb-2 hover:border-b-2 hover:border-blue-500 cursor-pointer">Your Posts</li>
            <li className="pb-2 hover:border-b-2 hover:border-blue-500 cursor-pointer">Saved</li>
          </ul>
        </div>

        <div className="text-center border-b border-gray-300 pb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-3">
            NoteNest – Your Voice, Your Stories 📢
          </h2>
          <p className="text-gray-600 text-lg">
            Share insights, connect with readers, and build your online presence with elegant storytelling.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <SortDropdown
            sortField={sortField}
            sortOrder={sortOrder}
            onChange={(field, order) => {
              setSortField(field);
              setSortOrder(order);
              setPage(1);
            }}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <p className="text-center col-span-full text-blue-600">Loading blogs...</p>}
          {error && <p className="text-center col-span-full text-red-600">{error}</p>}

          {!loading && blogs.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No blogs found.</p>
          )}

          {blogs.map((blog) => {
            const handleSave = async () => {
              try {
                const res = await api.put(`/${blog._id}/save`, { userId: user.id });
                setBlogs((prev) => prev.map((b) => (b._id === blog._id ? res.data : b)));
                const isSaved = res.data.savedBy.includes(user.id);
                toast[isSaved ? "success" : "info"](isSaved ? "Blog saved!" : "Blog unsaved.");
              } catch (err) {
                toast.error("Failed to save blog.");
              }
            };

            return (
              <div
                key={blog._id}
                className="bg-gray-50 border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {blog.tags?.[0] || "General"}
                    </span>
                  </div>
                  <Link to={`/blog/${blog._id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mt-3 hover:underline">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {blog.content.slice(0, 200)}...
                  </p>
                </div>

                <div className="flex justify-between items-center border-t pt-4 mt-auto">
                  <div className="flex gap-3 items-center">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorName}`}
                      alt="author avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">{blog.authorName}</p>
                      <p className="text-gray-500">Author</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    className={`text-xl transition ${
                      blog.savedBy?.includes(user.id)
                        ? "text-blue-600"
                        : "text-gray-400 hover:text-blue-500"
                    }`}
                  >
                    <i className="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
