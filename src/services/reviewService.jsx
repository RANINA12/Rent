

import axios from 'axios';

const API_URL = '/api/reviews'; // Vite proxy ke liye relative path

// Ek item ke saare reviews fetch karein (Public)
const getItemReviews = async (itemId) => {
    if (!itemId) {
        // Agar itemId nahi hai to aage na badhein
        return [];
    }
    const response = await axios.get(`${API_URL}/${itemId}`);
    return response.data;
};

// Naya review create karein (Protected)
const createItemReview = async (itemId, reviewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/${itemId}`, reviewData, config);
    return response.data;
};

const reviewService = {
    getItemReviews,
    createItemReview,
};

export default reviewService;
