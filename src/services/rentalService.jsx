import axios from 'axios';

const API_URL = '/api/rentals';

/**
 * @desc    Create a new rental order
 * @param   {object} rentalData - { itemId, startDate, endDate, totalPrice }
 * @param   {string} token - User's auth token
 */
const createRental = async (rentalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, rentalData, config);
    return response.data;
};

/**
 * @desc    Get rentals for the logged-in user (as a renter)
 * @param   {string} token - User's auth token
 */
const getMyRentals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/myrentals`, config);
    return response.data;
};

/**
 * @desc    Get incoming rental requests for the logged-in user (as an owner)
 * @param   {string} token - User's auth token
 */
const getIncomingRequests = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/incoming`, config);
    return response.data;
};

/**
 * @desc    Update the status of a rental request (accept/reject)
 * @param   {string} rentalId - The ID of the rental to update
 * @param   {string} status - The new status ('accepted' or 'rejected')
 * @param   {string} token - User's auth token
 */
const updateRentalStatus = async (rentalId, status, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.patch(
        `${API_URL}/${rentalId}`,
        { status },
        config
    );
    return response.data;
};

// --- YEH NAYE FUNCTIONS HAIN ---

/**
 * @desc    Fetch and open the rental agreement PDF
 * @param   {string} rentalId - The ID of the rental
 * @param   {string} token - User's auth token
 */
const getAgreement = async (rentalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for handling PDF files
    };
    const response = await axios.get(`${API_URL}/${rentalId}/agreement`, config);
    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank'); // Open the PDF in a new tab
};

/**
 * @desc    Mark the agreement as accepted by the user
 * @param   {string} rentalId - The ID of the rental
 * @param   {string} token - User's auth token
 */
const acceptAgreement = async (rentalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/${rentalId}/accept-agreement`, {}, config);
    return response.data;
};

const markRentalComplete = async (rentalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/${rentalId}/complete`, {}, config);
    return response.data;
};


const rentalService = {
    createRental,
    getMyRentals,
    getIncomingRequests,
    updateRentalStatus,
    getAgreement,      // 👈 Naya function
    acceptAgreement,   // 👈 Naya function
    markRentalComplete,
};

export default rentalService;