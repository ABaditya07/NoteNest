// SavedBlogs.jsx
import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useSearch } from "../context/SearchContext";
import SortDropdown from "../components/SortDropdown";

const SavedBlogs = () => {
  const { user } = useContext(AuthContext);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm } = useSearch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const res = await api.get(
          `/saved/${user.id}?page=${page}&limit=9&search=${searchTerm}&sort=${sortField}_${sortOrder}`
        );
        setSavedBlogs(res.data?.savedBlogs || []);
        setTotalPages(res.data?.totalPages || 1);
      } catch (err) {
        setError("Failed to load saved blogs: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedBlogs();
  }, [page, searchTerm, sortOrder, sortField]);

  return (
    <div className="bg-base-600 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-start border-b pb-8">
          <h2 className="text-4xl font-semibold text-gray-900">Your Saved Posts 📝</h2>
          <p className="mt-2 text-lg text-gray-600">
            Explore the posts you've bookmarked for later reading.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {loading && (
            <div className="col-span-full text-center text-gray-500">
              Loading saved blogs...
              <svg className="animate-spin h-5 w-5 text-gray-500 ml-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          )}
          {error && <p className="col-span-full text-center text-red-500">{error}</p>}

          {savedBlogs.length > 0 ? (
            savedBlogs.map((blog) => (
              <article key={blog._id} className="bg-gray-100 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">{blog.tags?.[0] || "General"}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{blog.content.slice(0, 200)}...</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorName}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{blog.authorName}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await api.put(`/${blog._id}/save`, { userId: user.id });
                        setSavedBlogs((prev) => prev.filter((b) => b._id !== blog._id));
                        toast.info("Blog removed from saved.");
                      } catch (err) {
                        toast.error("Failed to unsave blog: " + err.message);
                      }
                    }}
                    className="text-gray-600 hover:text-red-500"
                    title="Unsave Blog"
                  >
                    <i className="fas fa-bookmark text-lg"></i>
                  </button>
                </div>
              </article>
            ))
          ) : (
            !loading && <p className="col-span-full text-center text-gray-500">You haven't saved any blogs yet.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  page === i + 1 ? "bg-gray-700 text-white" : "bg-white text-gray-700"
                }`}
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

export default SavedBlogs;
