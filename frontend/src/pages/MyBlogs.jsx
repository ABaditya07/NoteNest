import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(`/my-blogs/${user.id}`);
        setMyBlogs(res.data.blogs || []);
      } catch (err) {
        setError("Failed to load your blogs: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBlogs();
    }
  }, [user]);

  const handleDelete = async (blogId) => {
    try {
      await api.delete(`/blog/${blogId}`);
      setMyBlogs((prev) => prev.filter((b) => b._id !== blogId));
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="bg-base-600 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-start border-b pb-8">
          <h2 className="text-4xl font-semibold text-gray-900">Your Blogs 📝</h2>
          <p className="mt-2 text-lg text-gray-600">Manage the blogs you've written</p>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-8">Loading your blogs...</p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-4">{error}</p>
        )}

        {!loading && myBlogs.length === 0 && (
          <p className="text-center text-gray-600 mt-8">You haven’t published any blogs yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {myBlogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-gray-100 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs capitalize">
                  {blog.tags?.[0] || "General"}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:underline">
                <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
              </h3>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {blog.content?.slice(0, 200)}...
              </p>

              <div className="flex justify-between items-center border-t pt-4">
                <Link to={`/edit/${blog._id}`} className="text-blue-600 hover:underline text-sm font-medium">✏️ Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:underline text-sm font-medium">
                  🗑️ Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
