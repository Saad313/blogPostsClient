// client/src/components/BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the spinner

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://blogpostsapi-1ui5.onrender.com/api/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  if (!blog) return <div className="text-center py-6"><ClipLoader color="#3498db" size={36} /></div>; // Use spinner

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-800 mb-4">{blog.content}</p>
      <p className="text-gray-600 mb-2"><strong>Author:</strong> {blog.author}</p>
      <p className="text-gray-600 mb-4"><strong>Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
      <Link 
        to={`/edit/${blog._id}`} 
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Edit
      </Link>
    </div>
  );
}

export default BlogDetail;
