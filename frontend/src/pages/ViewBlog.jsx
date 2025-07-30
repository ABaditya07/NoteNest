import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/${id}`);
      setBlog(res.data);
    } catch (err) {
      setError("Blog not found or error fetching.", err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentAuthor || !comment) return alert("Both fields required");

    try {
      const res = await api.post(`/${id}/comment`, {
        author: commentAuthor,
        text: comment,
      });
      setBlog(res.data);
      setComment("");
      setCommentAuthor("");
    } catch (err) {
      alert("Failed to add comment", err.message);
    }
  };

  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;
  if (!blog) return <p className="text-center mt-6 text-gray-800">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mt-4 text-gray-800">{blog.title}</h1>
      <p className="mt-4 text-gray-700">{blog.content}</p>
      <p className="text-sm text-gray-500 mb-2">By {blog.authorName}</p>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Tags : </strong>
        {blog.tags.join(", ")}
      </div>
      <p className="text-sm text-gray-600 mb-2">Posted on {blog.createdAt} </p>

      {/* Comment Section */}
      <div className="border-t pt-3">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 text-left">
          Comments
        </h2>

        {blog.comments.length === 0 && <p>No comments yet.</p>}

        <ul className="space-y-2 mb-5">
          {blog.comments.map((c, idx) => (
            <li key={idx} className="border p-2 rounded text-left">
              <p className="text-sm text-gray-800">{c.text}</p>
              <p className="text-xs text-gray-500">- {c.author}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} className="space-y-3 mt-6 mb-6">
          <input
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            placeholder="Your name"
            className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={3}
            className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewBlog;
