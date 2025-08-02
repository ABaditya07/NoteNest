import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { useSearch } from "../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
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
  const [menuOpenId, setMenuOpenId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/?page=${page}&limit=9&search=${searchTerm}&sort=${sortField}_${sortOrder}`)
      .then((res) => {
        setBlogs(res.data?.blogs || []);
        setTotalPages(res.data?.totalPages || 1);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blogs.");
        setLoading(false);
      });
  }, [page, searchTerm, sortField, sortOrder]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="bg-base-600 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-start border-b pb-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-4xl text-gray-900">
            NoteNest – Your Voice, Your Stories, Your Platform✨
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Share your thoughts, insights, and experiences with the world...
          </p>
        </div>

        <SortDropdown
          sortField={sortField}
          sortOrder={sortOrder}
          onChange={(field, order) => {
            setSortField(field);
            setSortOrder(order);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && blogs.length > 0 && blogs.map((blog) => {
            const isAuthor = blog.authorName === user?.username;

            return (
              <div key={blog._id} className="relative bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs capitalize">
                    {blog.tags?.[0] || "General"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <Link to={`/blog/${blog._id}`} className="hover:text-blue-600 transition">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.content?.slice(0, 200)}...
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorName}`}
                      className="w-10 h-10 rounded-full"
                      alt="avatar"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{blog.authorName}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>

                  {isAuthor && (
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === blog._id ? null : blog._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </button>

                      {menuOpenId === blog._id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => navigate(`/edit/${blog._id}`)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(blog._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {!loading && blogs.length === 0 && <p>No blogs found.</p>}
        </div>

        {totalPages > 1 && (
          <div className="flex mt-8 justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded ${page === i + 1 ? "bg-gray-600 text-white" : "bg-gray-200"}`}
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
