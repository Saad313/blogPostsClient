// client/src/components/BlogForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setAuthor(response.data.author);
        })
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = { title, content, author };

    if (isEditing) {
      axios.put(`http://localhost:5000/api/blogs/${id}`, blogData)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating blog:', error));
    } else {
      axios.post('http://localhost:5000/api/blogs', blogData)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating blog:', error));
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      axios.delete(`http://localhost:5000/api/blogs/${id}`)
        .then(() => navigate('/'))
        .catch(error => console.error('Error deleting blog:', error));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Blog' : 'Create Blog'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Blog
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
