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

    // Convert comma-separated tags string to array
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await api.post('/', blogData);
      toast.success("Blog published successfully!");
      
      navigate('/home'); // Redirect to home after blog is created
    } catch (err) {
      setError('Failed to create blog. Please try again.', err.message);
      toast.error(err.response?.data?.message || "Failed to publish blog, please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 mb-4">
       <div className="mx-auto text-center mb-8 border-b pb-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            New Blog 📚
          </h2>
        </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          rows={8}
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
        />
        <input
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Publishing..." : "Publish"} 
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
