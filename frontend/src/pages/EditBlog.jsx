import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    authorName: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => {
        const blog = res.data;
        setFormData({
          title: blog.title,
          content: blog.content,
          tags: blog.tags.join(', '),
          authorName: blog.authorName,
        });
      })
      .catch(() => {
        setError('Failed to load blog.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await api.put(`/blogs/${id}`, updatedData);
      toast.success("Changes saved successfully!");
      navigate('/my-blogs');
    } catch (err) {
      setError('Failed to update blog.');
      toast.error(err.response?.data?.message || "Update failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 mb-4">
      <div className="mx-auto text-center mb-8 border-b pb-8">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
          Edit Blog 
        </h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          rows={5}
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
        />
        <input
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          placeholder="Author Name"
          className="bg-gray-200 w-full border px-3 py-2 rounded text-gray-900 placeholder:text-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
