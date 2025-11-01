// rentsmart_frontend/src/pages/BlogPostPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import postService from '../services/postService';
import Spinner from '../components/common/Spinner'; // Make sure this path is correct

const BlogPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // FIX: 'getPosts' ko 'getPostBySlug' se badal diya gaya hai
        const data = await postService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Post not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
        fetchPost();
    }
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  if (error) return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;
  if (!post) return null; // Post na milne par kuch na dikhayein

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <article className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-6 flex items-center space-x-4">
          <span>By <strong className="text-gray-700">{post.author?.name || 'Admin'}</strong></span>
          <span className="text-gray-400">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <img 
          src={post.featuredImage.url} 
          alt={post.title} 
          className="w-full h-auto object-cover rounded-lg mb-8" 
        />
        {/* 'prose' class se content a se z tak automatically format ho jayega */}
        <div className="prose lg:prose-lg max-w-none text-gray-800">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
      <div className="text-center mt-8">
        <Link to="/blog" className="text-teal-600 font-semibold hover:underline">
          &larr; Back to All Blog Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;