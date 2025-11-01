// rentsmart_frontend/src/pages/admin/ManagePostsPage.jsx

import React, { useEffect, useState } from 'react';
import postService from '../../services/postService';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'; // <-- 1. YEH IMPORT ADD KIYA GAYA HAI
import { toast } from 'react-toastify';

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Posts fetch nahi ho paye.");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (postId) => {
    if (!user) {
      toast.error('Authentication error. Please log in again.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePostAdmin(postId, user.token);
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success('Post successfully delete ho gaya!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Post delete nahi ho paya.');
      }
    }
  };

  if (loading) return <p className="text-center p-8">Loading posts...</p>;
  if (!user) return <p className="text-center p-8">Please log in to manage posts.</p>;

  return (
    <div className="container mx-auto p-4">
      {/* --- 2. YEH SECTION ADD KIYA GAYA HAI --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Link
          to="/admin/posts/new"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow"
        >
          + Add New Post
        </Link>
      </div>
      {/* --- END OF NEW SECTION --- */}

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Author</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Created At</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                  <td className="px-6 py-4 text-gray-600">{post.author?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePostsPage;