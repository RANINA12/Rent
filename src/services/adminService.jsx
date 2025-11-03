

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