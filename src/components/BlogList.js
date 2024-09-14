// client/src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://blogpostsapi-1ui5.onrender.com/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog List</h1>
        <Link 
          to="/create" 
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/blogs/${blog._id}`} className="block p-4 hover:bg-gray-100">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.content.substring(0, blog?.content?.length < 50 ? blog?.content?.length /2: 50)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;