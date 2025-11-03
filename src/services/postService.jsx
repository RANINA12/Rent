

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