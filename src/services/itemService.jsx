//change 2
import axios from 'axios';

const API_URL = '/api/items';

/**
 * @desc    Fetch all items with optional filters (for Explore page)
 * @param   {object} filters - e.g., { minPrice, maxPrice, sortBy }
 */
const getItems = async (filters = {}) => {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
};

/**
 * @desc    Fetch featured items by city
 * @param   {string} city - The name of the city
 */
const getFeaturedItemsByCity = async (city) => {
    const response = await axios.get(`${API_URL}/featured`, { params: { city } });
    return response.data;
};

/**
 * @desc    Fetch items by category, with filters
 * @param   {string} categoryName - e.g., 'Furniture'
 * @param   {object} filters - e.g., { minPrice, maxPrice, sortBy }
 */
const getItemsByCategory = async (categoryName, filters = {}) => {
    const response = await axios.get(`${API_URL}/category/${categoryName}`, { params: filters });
    return response.data;
};

/**
 * @desc    Fetch a single item by its ID
 * @param   {string} id - The item's ID
 */
const getItemById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

/**
 * @desc    Create a new item
 * @param   {FormData} itemData - The form data including images
 * @param   {string} token - User's auth token
 */
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    // FIX: Naya item banane ke liye POST ka istemaal karein
    const response = await axios.post(API_URL, itemData, config);
    return response.data;
};

/**
 * @desc    Update an existing item
 * @param   {string} itemId - The ID of the item to update
 * @param   {object} itemData - The data to update
 * @param   {string} token - User's auth token
 */
const updateItem = async (itemId, itemData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}/${itemId}`, itemData, config);
    return response.data;
};

/**
 * @desc    Delete an item
 * @param   {string} itemId - The ID of the item to delete
 * @param   {string} token - User's auth token
 */
const deleteItem = async (itemId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${API_URL}/${itemId}`, config);
    return response.data;
};

/**
 * @desc    Get all items for the logged-in user
 * @param   {string} token - User's auth token
 */
const getMyItems = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/my-items`, config);
    return response.data;
};

/**
 * @desc    Get AI price suggestion
 * @param   {object} itemData - { category, itemAge }
 * @param   {string} token - User's auth token
 */
const getPriceSuggestion = async (itemData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(`${API_URL}/suggest-price`, itemData, config);
    return response.data;
};

const itemService = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getMyItems,
    getItemsByCategory,
    getFeaturedItemsByCity,
    getPriceSuggestion,
};

export default itemService;