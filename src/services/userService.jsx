import axios from 'axios';

const API_URL = '/api/users';
const RENTALS_API_URL = '/api/rentals';

// --- Profile ---

const getMyProfile = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${API_URL}/profile`, config);
    return response.data;
};

const updateMyProfile = async (profileData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(`${API_URL}/profile`, profileData, config);
    return response.data;
};

const updateMyAvatar = async (formData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    // Bas '/avatar' ko yahan se hata dein
    const response = await axios.put(`${API_URL}/profile`, formData, config);
    return response.data;
};
// --- Dashboard Stats ---

const getDashboardStats = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    // FIX: Changed API__URL to API_URL
    const response = await axios.get(`${API_URL}/stats`, config);
    return response.data;
};

// --- User's Items & Rentals ---

const getUserItems = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/${userId}/items`, config);
    return response.data;
};

const getMyRentals = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${RENTALS_API_URL}/myrentals`, config);
    return response.data;
};


// --- Service Object ---
const userService = {
    getMyProfile,
    updateMyProfile,
    updateMyAvatar,
    getDashboardStats,
    getUserItems,
    getMyRentals,
};

export default userService;