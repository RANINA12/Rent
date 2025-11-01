// import axios from 'axios';

// const API_URL = '/api/posts';

// /**
//  * @desc    Fetch all blog posts
//  */
// const getPosts = async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
// };

// /**
//  * @desc    Fetch a single blog post by its slug
//  * @param   {string} slug - The slug of the post
//  */
// const getPostBySlug = async (slug) => {
//     const response = await axios.get(`${API_URL}/${slug}`);
//     return response.data;
// };

// const postService = {
//     getPosts,
//     getPostBySlug,
// };

// export default postService;


// rentsmart_frontend/src/services/postService.js

// rentsmart_frontend/src/services/postService.js

// import axios from 'axios';

// const API_URL = '/api/posts';

// // Get all posts for admin
// const getAllPosts = async () => {
//   const { data } = await axios.get(API_URL);
//   return data;
// };

// // Delete a post by admin
// const deletePostAdmin = async (postId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const { data } = await axios.delete(`${API_URL}/${postId}`, config);
//   return data;
// };

// // --- NEW FUNCTION ADDED BELOW ---

// // Create a new post by admin
// const createPost = async (postData, token) => {
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data', // Important for file uploads
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const { data } = await axios.post(API_URL, postData, config);
//   return data;
// };

// // --- END OF NEW FUNCTION ---

// // Public user ke liye slug se post get karna
// const getPostBySlug = async (slug) => {
//     const response = await axios.get(`${API_OPI_URL}/${slug}`);
//     return response.data;
// };


// const postService = {
//   getAllPosts,
//   deletePostAdmin,
//   createPost, // Export the new function
//   getPostBySlug,
// };

// export default postService;


//******************* */

import axios from 'axios';

const API_URL = '/api/posts';

// Admin ke liye saare posts fetch karna
const getAllPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Admin ke liye post delete karna
const deletePostAdmin = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`${API_URL}/${postId}`, config);
  return data;
};

// Admin ke liye naya post create karna
const createPost = async (postData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(API_URL, postData, config);
  return data;
};

// Public user ke liye slug se post get karna
const getPostBySlug = async (slug) => {
    // FIX: Yahan 'API_OPI_URL' ki jagah 'API_URL' kar diya gaya hai
    const { data } = await axios.get(`${API_URL}/${slug}`);
    return data;
};

const postService = {
  getAllPosts,
  deletePostAdmin,
  createPost,
  getPostBySlug,
};

export default postService;