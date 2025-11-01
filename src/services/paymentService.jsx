import axios from 'axios';

const API_URL = '/api/payments';

// Backend se Razorpay order ID banane ke liye call karein
const createOrder = async (rentalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/create-order`, { rentalId }, config);
    return response.data;
};

// Payment safal hone ke baad use backend par verify karein
const verifyPayment = async (paymentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/verify-payment`, paymentData, config);
    return response.data;
};


const paymentService = {
    createOrder,
    verifyPayment,
};

export default paymentService;