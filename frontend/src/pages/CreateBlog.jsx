import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    authorName: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await api.post('/', blogData);
      toast.success("🎉 Blog published successfully!");
      navigate('/home');
    } catch (err) {
      setError('Failed to create blog. Please try again.');
      toast.error(err.response?.data?.message || "Failed to publish blog, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-md mt-10">
      <div className="text-center mb-8 border-b pb-6">
        <h2 className="text-4xl font-bold text-gray-800">Create New Blog 📝</h2>
        <p className="text-gray-500 mt-2">Share your thoughts with the world</p>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            name="content"
            placeholder="Write your blog content..."
            rows={8}
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Tags</label>
            <input
              name="tags"
              placeholder="e.g. tech, lifestyle, coding"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Author Name</label>
            <input
              name="authorName"
              placeholder="Your name"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
