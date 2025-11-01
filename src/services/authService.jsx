// import axios from 'axios';

// const API_URL = '/api/auth/';

// // Login
// const login = async (userData) => {
//   const response = await axios.post(API_URL + 'login', userData);
//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data));
//   }
//   return response.data;
// };

// // Logout
// const logout = () => {
//   localStorage.removeItem('user');
// };

// const authService = {
//   login,
//   logout,
// };

// export default authService;

// import axios from 'axios';

// // --- SABSE ZAROORI BADLAAV: API URL ---
// // Humare user routes '/api/users' par hain
// const API_URL = '/api/users';

// /**
//  * User ko register karne ke liye backend API ko call karein
//  * @param {object} userData - { name, email, password }
//  * @returns {Promise<object>} - User ka data token ke saath
//  */
// const register = async (userData) => {
//     // POST request /api/users/register par bhejega
//     const response = await axios.post(`${API_URL}/register`, userData);
//     // Service ka kaam sirf API se data laana hai.
//     // LocalStorage ko manage karne ka kaam AuthContext karega.
//     return response.data;
// };

// /**
//  * User ko login karne ke liye backend API ko call karein
//  * @param {object} userData - { email, password }
//  * @returns {Promise<object>} - User ka data token ke saath
//  */
// const login = async (userData) => {
//     // POST request /api/users/login par bhejega
//     const response = await axios.post(`${API_URL}/login`, userData);
//     // Hum yahan localStorage set nahi karenge. Yeh kaam AuthContext ka hai.
//     return response.data;
// };

// // NOTE: Logout ke liye API call ki zaroorat nahi hai,
// // kyunki yeh sirf frontend ki state badalta hai, jise AuthContext manage karta hai.

// const authService = {
//     register,
//     login,
// };

// export default authService;


//---------------------------------------------------

import axios from 'axios';

// API ka URL user routes ke liye set karein
const API_URL = '/api/users';

/**
 * Naye user ko register karne ke liye backend API ko call karta hai.
 * @param {object} userData - User ki details (name, email, password, etc.)
 * @returns {Promise<object>} - Backend se mila naya user object (token sahit)
 */
const register = async (userData) => {
    // POST request /api/users/register par bhejega
    const response = await axios.post(`${API_URL}/register`, userData);
    
    // Yeh function sirf backend se mile data ko waapas bhej dega.
    // LocalStorage me data save karne ka kaam AuthContext ka hai.
    return response.data;
};

/**
 * User ko login karne ke liye backend API ko call karta hai.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - Backend se mila user object (token sahit)
 */
const login = async (credentials) => {
    // POST request /api/users/login par bhejega
    const response = await axios.post(`${API_URL}/login`, credentials);

    // Yahan se backend se mila poora object (jisme token bhi hai)
    // AuthContext ko return kiya jaayega.
    return response.data;
};

// Logout ke liye alag se function ki zaroorat nahi hai, 
// kyonki AuthContext ise handle karta hai.

const authService = {
    register,
    login,
};

export default authService;