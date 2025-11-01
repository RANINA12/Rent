// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import postService from '../services/postService';
// import Spinner from '../components/common/Spinner';

// const BlogPage = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const data = await postService.getPosts();
//                 setPosts(data);
//             } catch (err) {
//                 setError('Could not fetch blog posts. Please try again later.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="text-center mb-12">
//                 <h1 className="text-4xl font-bold text-gray-800">The RentSmart Blog</h1>
//                 <p className="text-lg text-gray-600 mt-2">Tips, guides, and stories about smart renting and living.</p>
//             </div>
            
//             {posts.length === 0 ? (
//                 <p className="text-center text-gray-500">No articles found at the moment. Check back soon!</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {posts.map(post => (
//                         <Link to={`/blog/${post.slug}`} key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
//                             <img src={post.featuredImage.url} alt={post.title} className="w-full h-48 object-cover" />
//                             <div className="p-6">
//                                 <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{post.title}</h2>
//                                 <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
//                                 <div className="text-xs text-gray-500">
//                                     <span>By {post.author.name}</span> | <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BlogPage;


// rentsmart_frontend/src/pages/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../services/postService'; // Make sure this path is correct
import Spinner from '../components/common/Spinner'; // Make sure this path is correct

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Use the correct service function name
                const data = await postService.getAllPosts();
                setPosts(data);
            } catch (err) {
                setError('Could not fetch blog posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">The RentSmart Blog</h1>
                <p className="text-lg text-gray-600 mt-2">Tips, guides, and stories about smart renting in Indore.</p>
            </div>
            
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No articles found. Check back soon!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <Link to={`/blog/${post.slug}`} key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                            <img src={post.featuredImage.url} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                                <div className="text-xs text-gray-500">
                                    <span>By {post.author.name}</span> | <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogPage;