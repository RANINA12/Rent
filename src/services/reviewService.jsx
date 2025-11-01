// import axios from 'axios';

// const API_URL = '/api/reviews';

// /**
//  * @desc    Create a new review for an item
//  * @param   {string} itemId - The ID of the item being reviewed
//  * @param   {object} reviewData - { rating, comment }
//  * @param   {string} token - User's auth token
//  */
// const createReview = async (itemId, reviewData, token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     const response = await axios.post(`${API_URL}/${itemId}`, reviewData, config);
//     return response.data;
// };

// // --- YEH NAYA FUNCTION HAI ---
// /**
//  * @desc    Get all reviews for a specific item
//  * @param   {string} itemId - The ID of the item
//  */
// const getItemReviews = async (itemId) => {
//     const response = await axios.get(`${API_URL}/${itemId}`);
//     return response.data;
// };

// const reviewService = {
//     createReview,
//     getItemReviews, // 👈 Naye function ko yahaan export karein
// };

// export default reviewService;


//-----------------------------------

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
