import { useEffect, useState } from "react";
import { api } from "../api";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
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
      .get(
        `/?page=${page}&limit=9&search=${searchTerm}&sort=${sortField}_${sortOrder}`
      )
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch blogs.", err.message);
        setLoading(false);
      });
  }, [page, searchTerm, sortField, sortOrder]);

  return (
    <div className="bg-base-600 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-start border-b pb-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-4xl text-gray-900">
            Blogify – Your Voice, Your Stories, Your Platform✨
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Share your thoughts, insights, and experiences with the world.
            Blogify empowers creators, storytellers, and thinkers to publish
            impactful content, connect with readers, and build a digital
            presence — all in one simple, elegant platform.
          </p>
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

          {blogs.length > 0
            ? blogs.map((blog) => {
                const handleSave = async () => {
                  try {
                    const res = await api.put(`/${blog._id}/save`, {
                      userId: user.id,
                    });
                    setBlogs((prevBlogs) =>
                      prevBlogs.map((b) => (b._id === blog._id ? res.data : b))
                    );

                    // Check if the user ID is in the updated savedBy array
                    const isSaved = res.data.savedBy.includes(user.id);
                    if (isSaved) {
                      toast.success("Blog saved successfully!");
                    } else {
                      toast.info("Blog removed from saved.");
                    }
                  } catch (err) {
                    toast.error(
                      err.response?.data?.message || "Failed to save blog"
                    );
                  }
                };

                return (
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

                    <div className="mt-6 flex w-full items-center justify-between relative">
                      <div className="flex items-center gap-4">
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

                      <button
                        onClick={handleSave}
                        className={`text-3xl absolute bottom-0 right-0 transition-colors duration-200 m-0 p-0 bg-gray-100 border-none focus:outline-none focus:ring-0 ${
                          blog.savedBy?.includes(user.id)
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        <i className="fas fa-bookmark"></i>
                      </button>
                    </div>
                  </article>
                );
              })
            : !loading && (
                <p className="text-center text-gray-500">No blogs found.</p>
              )}
        </div>
        <div className="flex mt-8 justify-center gap-3">
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

export default Home;
