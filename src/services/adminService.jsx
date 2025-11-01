// import axios from 'axios';

// const API_URL = '/api/admin';

// /**
//  * @desc    Get dashboard stats (total users, items, etc.) for admin
//  * @param   {string} token - Admin's auth token
//  */
// const getStats = async (token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await axios.get(`${API_URL}/stats`, config);
//     return response.data;
// };

// /**
//  * @desc    Get all users for admin
//  * @param   {string} token - Admin's auth token
//  */
// const getAllUsers = async (token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await axios.get(`${API_URL}/users`, config);
//     return response.data;
// };
// /**
//  * Admin ke liye saare users ki list fetch karta hai.
//  * @returns {Promise<Array>} Users ka array
//  */
// const getUsers = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/users`);
//         return response.data.users; // Controller se users array return karein
//     } catch (error) {
//         // Error ko upar throw karein taaki component use handle kar sake
//         throw error.response?.data?.message || 'Failed to fetch users';
//     }
// };

// // Yahaan hum baad mein aur functions (jaise deleteUser, createPost) jodenge

// const adminService = {
//     getStats,
//     getAllUsers,
//      getUsers
// };

// export default adminService;


//*************** */

// import axios from 'axios';

// const API_URL = '/api/admin';

// // NOTE: Hum yahan token alag se nahi bhej rahe hain kyunki AuthContext
// // pehle se hi har request ke header me token daal raha hai.

// /**
//  * @desc    Admin ke liye dashboard stats (total users, items, etc.) fetch karta hai.
//  */
// const getStats = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/stats`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch dashboard stats';
//     }
// };

// /**
//  * @desc    Admin ke liye saare users ki list fetch karta hai.
//  */
// const getAllUsers = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/users`);
//         return response.data.users; // Sirf users ka array return karein
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch users';
//     }
// };

// /**
//  * @desc    Ek user ko uski ID se delete karta hai.
//  * @param   {string} userId - User ki ID jise delete karna hai.
//  */
// const deleteUser = async (userId) => {
//     try {
//         const response = await axios.delete(`${API_URL}/users/${userId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to delete user';
//     }
// };

// // Yahan aap future me items aur rentals ke liye bhi functions add kar sakte hain.

// const adminService = {
//     getStats,
//     getAllUsers,
//     deleteUser,
// };

// export default adminService;


// //************ */

// import axios from 'axios';

// const API_URL = '/api/admin';

// // NOTE: AuthContext pehle se hi har request me token bhej raha hai.

// /**
//  * @desc    Admin ke liye dashboard stats fetch karta hai.
//  */
// const getStats = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/stats`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch dashboard stats';
//     }
// };

// /**
//  * @desc    Admin ke liye saare users ki list (search ke saath) fetch karta hai.
//  * @param   {string} searchQuery - Naam, email, ya ID se search karne ke liye.
//  */
// const getAllUsers = async (searchQuery = '') => {
//     try {
//         const response = await axios.get(`${API_URL}/users?search=${searchQuery}`);
//         return response.data.users;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch users';
//     }
// };

// /**
//  * @desc    Ek user ko uski ID se delete karta hai.
//  * @param   {string} userId - User ki ID jise delete karna hai.
//  */
// const deleteUser = async (userId) => {
//     try {
//         const response = await axios.delete(`${API_URL}/users/${userId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to delete user';
//     }
// };

// /**
//  * @desc    [NEW] Data Explorer ke liye advanced query chalata hai.
//  * @param   {object} params - Query ke parameters (collection, field, operator, value).
//  */
// const runDataExplorer = async (params) => {
//     try {
//         const response = await axios.get(`${API_URL}/explorer`, { params });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to run the query';
//     }
// };

// const adminService = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     runDataExplorer, // [FIX] Naya function export kiya
// };

// export default adminService;

//****************** */

// import axios from 'axios';

// const API_URL = '/api/admin';

// // NOTE: AuthContext pehle se hi har request me token bhej raha hai.

// const getStats = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/stats`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch dashboard stats';
//     }
// };

// const getAllUsers = async (searchQuery = '') => {
//     try {
//         const response = await axios.get(`${API_URL}/users?search=${searchQuery}`);
//         return response.data.users;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch users';
//     }
// };
// const getDashboardStats = async (token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const { data } = await axios.get('/api/admin/stats', config);
//     return data;
// };

// const deleteUser = async (userId) => {
//     try {
//         const response = await axios.delete(`${API_URL}/users/${userId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to delete user';
//     }
// };

// const runDataExplorer = async (params) => {
//     try {
//         const response = await axios.get(`${API_URL}/explorer`, { params });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to run the query';
//     }
// };


// // --- [NEW] KYC Management Functions ---

// const getKycRequests = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/kyc-requests`);
//         return response.data.requests;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to fetch KYC requests';
//     }
// };

// const approveKyc = async (userId) => {
//     try {
//         const response = await axios.put(`${API_URL}/kyc-requests/${userId}/approve`);
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to approve KYC';
//     }
// };

// const rejectKyc = async (userId, reason) => {
//     try {
//         const response = await axios.put(`${API_URL}/kyc-requests/${userId}/reject`, { reason });
//         return response.data;
//     } catch (error) {
//         throw error.response?.data?.message || 'Failed to reject KYC';
//     }
// };


// const adminService = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     runDataExplorer,
//     // [FIX] Naye functions ko yahan export kiya gaya hai
//     getKycRequests,
//     getDashboardStats,
//     approveKyc,
//     rejectKyc,
// };

// export default adminService;


//******************** */

import axios from 'axios';

const API_URL = '/api/admin';

// NOTE: AuthContext is already sending the token with every request globally.

const getStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch dashboard stats';
    }
};

const getAllUsers = async (searchQuery = '') => {
    try {
        const response = await axios.get(`${API_URL}/users?search=${searchQuery}`);
        return response.data.users;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch users';
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete user';
    }
};

const runDataExplorer = async (params) => {
    try {
        const response = await axios.get(`${API_URL}/explorer`, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to run the query';
    }
};


// --- KYC Management Functions ---

const getKycRequests = async () => {
    try {
        console.log("error yaha hai");
        const response = await axios.get(`${API_URL}/kyc-requests`);
        // token nhi jaa raha 
        return response.data.requests;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || 'Failed to fetch KYC requests';
    }
};

const approveKyc = async (userId) => {
    try {
        const response = await axios.put(`${API_URL}/kyc-requests/${userId}/approve`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to approve KYC';
    }
};

const rejectKyc = async (userId, reason) => {
    try {
        // 'reason' ko request body me bhejna zaroori hai
        const response = await axios.put(`${API__URL}/kyc-requests/${userId}/reject`, { reason });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to reject KYC';
    }
};


const adminService = {
    getStats,
    getAllUsers,
    deleteUser,
    runDataExplorer,
    getKycRequests,
    approveKyc,
    rejectKyc,
};

export default adminService;