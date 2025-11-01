import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import postService from '../../services/postService';
import { toast } from 'react-toastify';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling button
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('featuredImage', featuredImage);

    setIsSubmitting(true);
    try {
      // Call the service to create the post
      await postService.createPost(formData, user.token);
      toast.success('Post created successfully!');
      // Redirect to the posts list page
      navigate('/admin/posts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/admin/posts" className="text-teal-600 hover:underline mb-4 inline-block">
        &larr; Back to All Posts
      </Link>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
        
        {/* Title, Content, Category, Tags Fields remain the same... */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded-lg h-40" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags (comma-separated)</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Featured Image</label>
          <input type="file" id="image" onChange={(e) => setFeaturedImage(e.target.files[0])} className="w-full" required />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
          className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-400"
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;