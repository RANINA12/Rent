// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import rentalService from '../../services/rentalService';
// import paymentService from '../../services/paymentService';
// import reviewService from '../../services/reviewService';
// import Spinner from '../common/Spinner';
// import StarRating from '../common/StarRating';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // --- Review Modal Component (Isi file mein) ---
// const ReviewModal = ({ item, onClose, onReviewSubmit }) => {
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (rating === 0) return toast.error("Please select a star rating.");
//         setIsLoading(true);
//         try {
//             await onReviewSubmit(item._id, { rating, comment });
//             toast.success("Thank you for your review!");
//             onClose();
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not submit review.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Review "{item.name}"</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4"><label className="block text-center text-sm font-medium text-gray-700 mb-2">Your Rating</label><StarRating rating={rating} setRating={setRating} /></div>
//                     <div className="mb-6"><label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comments</label><textarea id="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="How was your experience?" required></textarea></div>
//                     <div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button><button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-600 text-white rounded-md">{isLoading ? 'Submitting...' : 'Submit Review'}</button></div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// // --- MyRentals Page Component ---
// const MyRentals = () => {
//     // --- States ---
//     const { user } = useAuth();
//     const [rentals, setRentals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [payingRentalId, setPayingRentalId] = useState(null);
//     const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//     const [selectedItemForReview, setSelectedItemForReview] = useState(null);

//     // --- Data Fetching ---
//     const fetchMyRentals = useCallback(async () => {
//         if (user?.token) {
//             try {
//                 setLoading(true);
//                 const data = await rentalService.getMyRentals(user.token);
//                 setRentals(data);
//             } catch (err) {
//                 setError('Failed to load your rentals.');
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setLoading(false);
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchMyRentals();
//     }, [fetchMyRentals]);
    
//     // --- Event Handlers ---
//     const handleOpenReviewModal = (item) => {
//         setSelectedItemForReview(item);
//         setIsReviewModalOpen(true);
//     };
    
//     const handleReviewSubmit = async (itemId, reviewData) => {
//         await reviewService.createReview(itemId, reviewData, user.token);
//         setRentals(prevRentals => prevRentals.map(r => r.itemId._id === itemId ? { ...r, alreadyReviewed: true } : r));
//     };

//     const handlePayment = async (rental) => {
//         setPayingRentalId(rental._id);
//         try {
//             const orderData = await paymentService.createOrder(rental._id, user.token);
//             const { data: order } = orderData;
//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "RentSmart",
//                 description: `Payment for ${rental.itemId.name}`,
//                 order_id: order.id,
//                 handler: async function (response) {
//                     const verifiedRental = await paymentService.verifyPayment({ ...response, rentalId: rental._id }, user.token);
//                     toast.success("Payment Successful! Your rental is confirmed.");
//                     setRentals(prevRentals => prevRentals.map(r => r._id === rental._id ? verifiedRental : r));
//                 },
//                 prefill: { name: user.name, email: user.email, contact: user.phone },
//                 theme: { color: "#0D9488" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();
//             rzp.on('payment.failed', function (response){ toast.error("Payment Failed. Please try again."); console.error(response.error); });
//         } catch (err) {
//             toast.error("Could not initiate payment.");
//         } finally {
//             setPayingRentalId(null);
//         }
//     };

//     const handleAcceptAgreement = async (rentalId) => {
//         try {
//             const updatedRental = await rentalService.acceptAgreement(rentalId, user.token);
//             toast.success("Agreement accepted!");
//             setRentals(prevRentals => 
//                 prevRentals.map(r => (r._id === rentalId ? updatedRental : r))
//             );
//         } catch (error) {
//             toast.error("Could not accept the agreement.");
//         }
//     };

//     const handleMarkComplete = async (rentalId) => {
//         try {
//             const updatedRental = await rentalService.markRentalComplete(rentalId, user.token);
//             toast.success("Marked as complete!");
//             setRentals(prevRentals => 
//                 prevRentals.map(r => (r._id === rentalId ? updatedRental : r))
//             );
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not mark as complete.");
//         }
//     };
    
//     // --- Helper Functions ---
//     if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

//     const getStatusBadgeColor = (status) => {
//         switch (status) {
//             case 'accepted': return 'bg-yellow-100 text-yellow-800';
//             case 'paid': return 'bg-cyan-100 text-cyan-800';
//             case 'rejected': return 'bg-red-100 text-red-800';
//             case 'completed': return 'bg-blue-100 text-blue-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     // --- JSX Render ---
//     return (
//         <div>
//             {isReviewModalOpen && <ReviewModal item={selectedItemForReview} onClose={() => setIsReviewModalOpen(false)} onReviewSubmit={handleReviewSubmit} />}
//             <h2 className="text-2xl font-bold mb-6">My Rentals</h2>
//             {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
//             {!loading && rentals.length === 0 && !error ? ( <p className="text-gray-500">You haven't rented any items yet.</p> ) : (
//                 <div className="space-y-6">
//                     {rentals.map((rental) => {
//                         if (!rental.itemId || !rental.ownerId) return null;
//                         const imageUrl = rental.itemId.images?.[0]?.url || 'https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image';
//                         const isRentalPeriodOver = new Date(rental.endDate) < new Date();

//                         return (
//                             <div key={rental._id} className="bg-white p-4 rounded-lg shadow-md border">
//                                 <div className="flex flex-col sm:flex-row items-center gap-4">
//                                     <img src={imageUrl} alt={rental.itemId.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md" />
//                                     <div className="flex-grow text-center sm:text-left">
//                                         <Link to={`/item/${rental.itemId._id}`} className="font-bold hover:underline">{rental.itemId.name}</Link>
//                                         <p className="text-sm text-gray-600">Owner: <span className="font-semibold">{rental.ownerId.name}</span></p>
//                                         <p className="text-sm text-gray-500">Total Price: ₹{rental.totalPrice.toLocaleString()}</p>
//                                     </div>
//                                     <div className="flex items-center gap-4">
//                                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(rental.status)}`}>{rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}</span>
//                                         {rental.status === 'accepted' && <button onClick={() => handlePayment(rental)} disabled={payingRentalId === rental._id} className="bg-teal-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-600 shadow-sm transition-colors">{payingRentalId === rental._id ? 'Processing...' : 'Pay Now'}</button>}
//                                     </div>
//                                 </div>

//                                 {/* Digital Agreement Section */}
//                                 {(rental.status === 'paid' || rental.status === 'completed') && (
//                                     <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
//                                         <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
//                                         <div className="flex items-center gap-3">
//                                             <button onClick={() => rentalService.getAgreement(rental._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">View PDF</button>
//                                             {rental.renterAgreed ? (
//                                                 <span className="text-sm flex items-center gap-1 text-green-600 font-bold p-1">✓ Accepted</span>
//                                             ) : (
//                                                 <button onClick={() => handleAcceptAgreement(rental._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600">Accept</button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
                                
//                                 {/* Mark as Complete Section */}
//                                 {(rental.status === 'paid' && isRentalPeriodOver) && (
//                                     <div className="mt-4 pt-4 border-t text-center">
//                                         {rental.renterMarkedComplete ? (
//                                             <p className="text-sm text-gray-500 italic">Waiting for owner to confirm completion...</p>
//                                         ) : (
//                                             <button onClick={() => handleMarkComplete(rental._id)} className="bg-indigo-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-600 shadow-sm transition-colors">Mark as Complete</button>
//                                         )}
//                                     </div>
//                                 )}

//                                  {/* Review Button Section */}
//                                  {rental.status === 'completed' && !rental.alreadyReviewed && (
//                                      <div className="mt-4 pt-4 border-t text-center">
//                                         <button onClick={() => handleOpenReviewModal(rental.itemId)} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-blue-600">Leave a Review</button>
//                                      </div>
//                                  )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyRentals;

// //change 2

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import rentalService from '../../services/rentalService';
// import paymentService from '../../services/paymentService';
// import reviewService from '../../services/reviewService';
// import Spinner from '../common/Spinner';
// import StarRating from '../common/StarRating';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // --- Review Modal Component (Isi file mein) ---
// const ReviewModal = ({ item, onClose, onReviewSubmit }) => {
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (rating === 0) return toast.error("Please select a star rating.");
//         setIsLoading(true);
//         try {
//             await onReviewSubmit(item._id, { rating, comment });
//             toast.success("Thank you for your review!");
//             onClose();
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not submit review.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Review "{item.name}"</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4"><label className="block text-center text-sm font-medium text-gray-700 mb-2">Your Rating</label><StarRating rating={rating} setRating={setRating} /></div>
//                     <div className="mb-6"><label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comments</label><textarea id="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="How was your experience?" required></textarea></div>
//                     <div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button><button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-600 text-white rounded-md">{isLoading ? 'Submitting...' : 'Submit Review'}</button></div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// // --- MyRentals Page Component ---
// const MyRentals = () => {
//     // --- States ---
//     const { user } = useAuth();
//     const [rentals, setRentals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [payingRentalId, setPayingRentalId] = useState(null);
//     const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//     const [selectedItemForReview, setSelectedItemForReview] = useState(null);

//     // --- Data Fetching ---
//     const fetchMyRentals = useCallback(async () => {
//         if (user?.token) {
//             try {
//                 setLoading(true);
//                 const data = await rentalService.getMyRentals(user.token);
//                 setRentals(data);
//             } catch (err) {
//                 setError('Failed to load your rentals.');
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setLoading(false);
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchMyRentals();
//     }, [fetchMyRentals]);
    
//     // --- Event Handlers ---
//     const handleOpenReviewModal = (item) => {
//         setSelectedItemForReview(item);
//         setIsReviewModalOpen(true);
//     };
    
//     const handleReviewSubmit = async (itemId, reviewData) => {
//         await reviewService.createReview(itemId, reviewData, user.token);
//         setRentals(prevRentals => prevRentals.map(r => r.itemId._id === itemId ? { ...r, alreadyReviewed: true } : r));
//     };

//     const handlePayment = async (rental) => {
//         setPayingRentalId(rental._id);
//         try {
//             const orderData = await paymentService.createOrder(rental._id, user.token);
//             const { data: order } = orderData;
//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "RentSmart",
//                 description: `Payment for ${rental.itemId.name}`,
//                 order_id: order.id,
//                 handler: async function (response) {
//                     const verifiedRental = await paymentService.verifyPayment({ ...response, rentalId: rental._id }, user.token);
//                     toast.success("Payment Successful! Your rental is confirmed.");
//                     setRentals(prevRentals => prevRentals.map(r => r._id === rental._id ? verifiedRental : r));
//                 },
//                 prefill: { name: user.name, email: user.email, contact: user.phone, },
//                 theme: { color: "#0D9488" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();
//             rzp.on('payment.failed', function (response){ toast.error("Payment Failed. Please try again."); console.error(response.error); });
//         } catch (err) {
//             toast.error("Could not initiate payment.");
//         } finally {
//             setPayingRentalId(null);
//         }
//     };

//     const handleAcceptAgreement = async (rentalId) => {
//         try {
//             const updatedRental = await rentalService.acceptAgreement(rentalId, user.token);
//             toast.success("Agreement accepted!");
//             setRentals(prevRentals => 
//                 prevRentals.map(r => (r._id === rentalId ? updatedRental : r))
//             );
//         } catch (error) {
//             toast.error("Could not accept the agreement.");
//         }
//     };

//     const handleMarkComplete = async (rentalId) => {
//         try {
//             const updatedRental = await rentalService.markRentalComplete(rentalId, user.token);
//             toast.success("Marked as complete!");
//             setRentals(prevRentals => 
//                 prevRentals.map(r => (r._id === rentalId ? updatedRental : r))
//             );
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not mark as complete.");
//         }
//     };
    
//     // --- Helper Functions ---
//     if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

//     const getStatusBadgeColor = (status) => {
//         switch (status) {
//             case 'accepted': return 'bg-yellow-100 text-yellow-800';
//             case 'paid': return 'bg-cyan-100 text-cyan-800';
//             case 'rejected': return 'bg-red-100 text-red-800';
//             case 'completed': return 'bg-blue-100 text-blue-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     // --- JSX Render ---
//     return (
//         <div>
//             {isReviewModalOpen && <ReviewModal item={selectedItemForReview} onClose={() => setIsReviewModalOpen(false)} onReviewSubmit={handleReviewSubmit} />}
//             <h2 className="text-2xl font-bold mb-6">My Rentals</h2>
//             {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
//             {!loading && rentals.length === 0 && !error ? ( <p className="text-gray-500">You haven't rented any items yet.</p> ) : (
//                 <div className="space-y-6">
//                     {rentals.map((rental) => {
//                         // --- BUG FIX: Check if item and images exist before rendering ---
//                         if (!rental.itemId || !rental.ownerId) return null;
//                         const imageUrl = rental.itemId.images?.[0]?.url || 'https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image';
//                         const isRentalPeriodOver = new Date(rental.endDate) < new Date();

//                         return (
//                             <div key={rental._id} className="bg-white p-4 rounded-lg shadow-md border">
//                                 <div className="flex flex-col sm:flex-row items-center gap-4">
//                                     <img src={imageUrl} alt={rental.itemId.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md" />
//                                     <div className="flex-grow text-center sm:text-left">
//                                         <Link to={`/item/${rental.itemId._id}`} className="font-bold hover:underline">{rental.itemId.name}</Link>
//                                         <p className="text-sm text-gray-600">Owner: <span className="font-semibold">{rental.ownerId.name}</span></p>
//                                         <p className="text-sm text-gray-500">Total Price: ₹{rental.totalPrice.toLocaleString()}</p>
//                                     </div>
//                                     <div className="flex items-center gap-4">
//                                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(rental.status)}`}>{rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}</span>
//                                         {rental.status === 'accepted' && <button onClick={() => handlePayment(rental)} disabled={payingRentalId === rental._id} className="bg-teal-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-600 shadow-sm transition-colors">{payingRentalId === rental._id ? 'Processing...' : 'Pay Now'}</button>}
//                                     </div>
//                                 </div>

//                                 {/* Digital Agreement Section */}
//                                 {(rental.status === 'paid' || rental.status === 'completed') && (
//                                     <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
//                                         <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
//                                         <div className="flex items-center gap-3">
//                                             <button onClick={() => rentalService.getAgreement(rental._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">View PDF</button>
//                                             {rental.renterAgreed ? (
//                                                 <span className="text-sm flex items-center gap-1 text-green-600 font-bold p-1">✓ Accepted</span>
//                                             ) : (
//                                                 <button onClick={() => handleAcceptAgreement(rental._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600">Accept</button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
                                
//                                 {/* Mark as Complete Section */}
//                                 {(rental.status === 'paid' && isRentalPeriodOver) && (
//                                     <div className="mt-4 pt-4 border-t text-center">
//                                         {rental.renterMarkedComplete ? (
//                                             <p className="text-sm text-gray-500 italic">Waiting for owner to confirm completion...</p>
//                                         ) : (
//                                             <button onClick={() => handleMarkComplete(rental._id)} className="bg-indigo-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-600 shadow-sm transition-colors">Mark as Complete</button>
//                                         )}
//                                     </div>
//                                 )}

//                                  {/* Review Button Section */}
//                                  {rental.status === 'completed' && !rental.alreadyReviewed && (
//                                      <div className="mt-4 pt-4 border-t text-center">
//                                         <button onClick={() => handleOpenReviewModal(rental.itemId)} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-blue-600">Leave a Review</button>
//                                      </div>
//                                  )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyRentals;

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import rentalService from '../../services/rentalService';
import paymentService from '../../services/paymentService';
import reviewService from '../../services/reviewService';
import Spinner from '../common/Spinner';
import StarRating from '../common/StarRating';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// --- Review Modal Component ---
const ReviewModal = ({ item, onClose, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error("Please select a star rating.");
        setIsLoading(true);
        try {
            await onReviewSubmit(item._id, { rating, comment });
            toast.success("Thank you for your review!");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not submit review.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Review "{item.name}"</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label className="block text-center text-sm font-medium text-gray-700 mb-2">Your Rating</label><StarRating rating={rating} setRating={setRating} /></div>
                    <div className="mb-6"><label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comments</label><textarea id="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="How was your experience?" required></textarea></div>
                    <div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button><button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-600 text-white rounded-md">{isLoading ? 'Submitting...' : 'Submit Review'}</button></div>
                </form>
            </div>
        </div>
    );
};


// --- MyRentals Page Component ---
const MyRentals = () => {
    // --- States ---
    const { user } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [payingRentalId, setPayingRentalId] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedItemForReview, setSelectedItemForReview] = useState(null);

    // --- Data Fetching ---
    const fetchMyRentals = useCallback(async () => {
        if (user?.token) {
            try {
                setLoading(true);
                const data = await rentalService.getMyRentals(user.token);
                setRentals(data);
            } catch (err) {
                setError('Failed to load your rentals.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMyRentals();
    }, [fetchMyRentals]);
    
    // --- Event Handlers ---
    const handleOpenReviewModal = (item) => {
        setSelectedItemForReview(item);
        setIsReviewModalOpen(true);
    };
    
    const handleReviewSubmit = async (itemId, reviewData) => {
        await reviewService.createReview(itemId, reviewData, user.token);
        setRentals(prev => prev.map(r => r.itemId._id === itemId ? { ...r, alreadyReviewed: true } : r));
    };

    const handlePayment = async (rental) => {
        setPayingRentalId(rental._id);
        try {
            const orderData = await paymentService.createOrder(rental._id, user.token);
            const { data: order } = orderData;
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "RentSmart",
                description: `Payment for ${rental.itemId.name}`,
                order_id: order.id,
                handler: async function (response) {
                    const verifiedRental = await paymentService.verifyPayment({ ...response, rentalId: rental._id }, user.token);
                    toast.success("Payment Successful! Your rental is confirmed.");
                    setRentals(prev => prev.map(r => r._id === rental._id ? verifiedRental : r));
                },
                prefill: { name: user.name, email: user.email, contact: user.phone },
                theme: { color: "#0D9488" }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
            rzp.on('payment.failed', (response) => toast.error(response.error.description || "Payment Failed."));
        } catch (err) {
            toast.error("Could not initiate payment.");
        } finally {
            setPayingRentalId(null);
        }
    };

    const handleAcceptAgreement = async (rentalId) => {
        try {
            const updatedRental = await rentalService.acceptAgreement(rentalId, user.token);
            toast.success("Agreement accepted!");
            setRentals(prev => prev.map(r => (r._id === rentalId ? updatedRental : r)));
        } catch (error) {
            toast.error("Could not accept the agreement.");
        }
    };
    
    // --- Helper Functions ---
    if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-cyan-100 text-cyan-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // --- JSX Render ---
    return (
        <div>
            {isReviewModalOpen && <ReviewModal item={selectedItemForReview} onClose={() => setIsReviewModalOpen(false)} onReviewSubmit={handleReviewSubmit} />}
            <h2 className="text-2xl font-bold mb-6">My Rentals</h2>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            {!loading && rentals.length === 0 && !error ? ( <p className="text-gray-500">You haven't rented any items yet.</p> ) : (
                <div className="space-y-6">
                    {rentals.map((rental) => {
                        if (!rental.itemId || !rental.ownerId) return null;
                        const imageUrl = rental.itemId.images?.[0]?.url || 'https://placehold.co/100x100?text=No+Image';
                        const isRentalPeriodOver = new Date(rental.endDate) < new Date();

                        return (
                            <div key={rental._id} className="bg-white p-4 rounded-lg shadow-md border">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <img src={imageUrl} alt={rental.itemId.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md" />
                                    <div className="flex-grow text-center sm:text-left">
                                        <Link to={`/item/${rental.itemId._id}`} className="font-bold hover:underline">{rental.itemId.name}</Link>
                                        <p className="text-sm text-gray-600">Owner: <span className="font-semibold">{rental.ownerId.name}</span></p>
                                        <p className="text-sm text-gray-500">Total Price: ₹{rental.totalPrice.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(rental.status)}`}>{rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}</span>
                                        {rental.status === 'accepted' && <button onClick={() => handlePayment(rental)} disabled={payingRentalId === rental._id} className="bg-teal-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-600 shadow-sm">{payingRentalId === rental._id ? 'Processing...' : 'Pay Now'}</button>}
                                    </div>
                                </div>

                                {(rental.status === 'paid' || rental.status === 'completed') && (
                                    <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
                                        <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => rentalService.getAgreement(rental._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md">View PDF</button>
                                            {rental.renterAgreed ? <span className="text-sm text-green-600 font-bold p-1">✓ Accepted</span> : <button onClick={() => handleAcceptAgreement(rental._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md">Accept</button>}
                                        </div>
                                    </div>
                                )}
                                 
                                {(rental.status === 'paid' && isRentalPeriodOver && !rental.alreadyReviewed) && (
                                     <div className="mt-4 pt-4 border-t text-center">
                                        <button onClick={() => handleOpenReviewModal(rental.itemId)} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg">Leave a Review</button>
                                     </div>
                                 )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyRentals;
