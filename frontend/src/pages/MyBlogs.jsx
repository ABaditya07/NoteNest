import { useEffect, useState } from "react";
import { api } from "../api";
import { useSearch } from "../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SortDropdown from "../components/SortDropdown";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm } = useSearch();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const fetchBlogs = () => {
    api
      .get(
        `/?page=${page}&limit=9&search=${searchTerm}&author=${user.name}&sort=${sortField}_${sortOrder}`
      )
      .then((res) => {
        setMyBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch your blogs.", err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, searchTerm, sortField, sortOrder]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/${id}`);
      toast.success("Blog deleted successfully!");
      fetchBlogs(); // Refresh after delete
    } catch (err) {
      alert("Failed to delete blog", err.message);
      toast.error(
        err.response?.data?.message ||
          "Failed to delete blog, please try again."
      );
    }
  };

  return (
    <div className="bg-base-600 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center border-b pb-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            Your Posts 📝
          </h2>
        </div>

        <SortDropdown
          sortField={sortField}
          sortOrder={sortOrder}
          onChange={(field, order) => {
            setSortField(field);
            setSortOrder(order);
            setPage(1); // Reset to page 1 on new sort
          }}
        />

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:py-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading && (
            <p className="text-center text-gray-500">
              Loading blogs...
              <svg
                className="animate-spin h-5 w-5 text-gary-500 mr-2 ml-4 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {myBlogs.length > 0
            ? myBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="flex max-w-xl flex-col items-start justify-between bg-gray-100 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="bg-gray-500 px-3 py-1.5 rounded-full font-medium text-gray-50">
                      {blog.tags?.[0] || "General"}
                    </span>
                  </div>

                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-black hover:underline text-start">
                      <Link to={`/blog/${blog._id}`}>
                        <span className="absolute inset-0" />
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm text-gray-600 text-start">
                      {blog.content.slice(0, 200)}...
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center gap-x-4">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorName}`}
                      alt="author avatar"
                      className="size-10 rounded-full bg-base-200"
                    />
                    <div className="text-sm text-start">
                      <p className="font-semibold text-gray-900">
                        {blog.authorName}
                      </p>
                      <p className="text-gray-500">Author</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/edit/${blog._id}`)}
                      className="px-4 py-1 bg-green-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            : !loading && (
                <p className="text-center text-gray-500">No blogs found.</p>
              )}
        </div>
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1 ? "bg-gray-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
