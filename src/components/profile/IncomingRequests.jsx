// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext'; // Make sure this path is correct
// import rentalService from '../../services/rentalService';
// import Spinner from '../common/Spinner'; // Assuming you have a Spinner component

// const IncomingRequests = () => {
//     const { user } = useAuth(); // Get the user object from your AuthContext
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // This useEffect will run when the component loads, and whenever the 'user' object changes.
//     useEffect(() => {
//         // --- IMPORTANT ---
//         // Double-check what your user object looks like.
//         // You can uncomment the line below to see its structure in the console.
//         // console.log('User object from context:', user);

//         const fetchRequests = async () => {
//             // This is the most critical part. We only make the API call
//             // if we are sure that the user is logged in and we have a token.
//             if (user && user.token) {
//                 try {
//                     setLoading(true);
//                     setError(''); // Clear previous errors
//                     const data = await rentalService.getIncomingRequests(user.token);
                    
//                     // Filter for requests that are still pending
//                     setRequests(data.filter(req => req.status === 'pending'));

//                 } catch (err) {
//                     setError('Could not fetch requests. Please try again later.');
//                     console.error("Fetch error:", err);
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 // If there's no user or token, we don't attempt to fetch data.
//                 setLoading(false);
//             }
//         };

//         fetchRequests();
//     }, [user]); // The dependency array ensures this runs when the user logs in.

//     const handleStatusUpdate = async (id, status) => {
//         try {
//             // Optimistically remove the item from the UI
//             setRequests(prevRequests => prevRequests.filter(req => req._id !== id));
//             // Call the service to update the status in the backend
//             await rentalService.updateRentalStatus(id, status, user.token);
//         } catch (error) {
//             setError(`Failed to ${status} the request. Please refresh and try again.`);
//             console.error("Update error:", error);
//             // NOTE: In a real app, you might want to add the request back to the list if the API call fails.
//         }
//     };

//     if (loading) {
//         return <Spinner />;
//     }

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-6">Incoming Rental Requests</h2>
//             {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
//             {requests.length === 0 && !error ? (
//                 <p className="text-gray-500">You have no new rental requests.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {requests.map((req) => (
//                         <div key={req._id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-center">
//                             <div>
//                                 <p className="font-bold">{req.itemId.name}</p>
//                                 <p className="text-sm text-gray-600">
//                                     Requested by: <span className="font-semibold">{req.renterId.name}</span>
//                                 </p>
//                                 <p className="text-sm text-gray-500">
//                                     Dates: {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
//                                 </p>
//                             </div>
//                             <div className="flex gap-3 mt-4 md:mt-0">
//                                 <button 
//                                     onClick={() => handleStatusUpdate(req._id, 'accepted')}
//                                     className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
//                                 >
//                                     Accept
//                                 </button>
//                                 <button 
//                                     onClick={() => handleStatusUpdate(req._id, 'rejected')}
//                                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                                 >
//                                     Reject
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IncomingRequests;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import rentalService from '../../services/rentalService';
// import Spinner from '../common/Spinner';
// import { toast } from 'react-toastify';

// const IncomingRequests = () => {
//     const { user } = useAuth();
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchRequests = async () => {
//             if (user?.token) {
//                 try {
//                     setLoading(true);
//                     const data = await rentalService.getIncomingRequests(user.token);
//                     setRequests(data);
//                 } catch (err) {
//                     setError('Could not fetch requests.');
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 setLoading(false);
//             }
//         };
//         fetchRequests();
//     }, [user]);

//     const handleStatusUpdate = async (id, status) => {
//         try {
//             await rentalService.updateRentalStatus(id, status, user.token);
//             setRequests(prev => prev.filter(req => req._id !== id));
//             toast.success(`Request has been ${status}.`);
//         } catch (error) {
//             toast.error(`Failed to ${status} the request.`);
//         }
//     };
    
//     // --- NAYA FUNCTION ---
//     const handleAcceptAgreement = async (rentalId) => {
//         try {
//             await rentalService.acceptAgreement(rentalId, user.token);
//             toast.success("Agreement accepted!");
//             setRequests(prev => prev.map(r => 
//                 r._id === rentalId ? { ...r, ownerAgreed: true } : r
//             ));
//         } catch (error) {
//             toast.error("Could not accept the agreement.");
//         }
//     };

//     if (loading) return <Spinner />;

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-6">Incoming Rental Requests</h2>
//             {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
//             {requests.length === 0 && !error ? (
//                 <p className="text-gray-500">You have no new rental requests.</p>
//             ) : (
//                 <div className="space-y-6">
//                     {requests.map((req) => (
//                         <div key={req._id} className="bg-white p-4 rounded-lg shadow-md border">
//                             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                                 <div>
//                                     <p className="font-bold text-lg">{req.itemId.name}</p>
//                                     <p className="text-sm text-gray-600">
//                                         Requested by: <span className="font-semibold">{req.renterId.name}</span>
//                                     </p>
//                                     <p className="text-sm text-gray-500">
//                                         Dates: {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
//                                     </p>
//                                 </div>
//                                 <div className="flex gap-3">
//                                     {req.status === 'pending' && (
//                                         <>
//                                             <button onClick={() => handleStatusUpdate(req._id, 'accepted')} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">Accept</button>
//                                             <button onClick={() => handleStatusUpdate(req._id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Reject</button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
                            
//                             {/* --- NAYA AGREEMENT SECTION --- */}
//                             {(req.status === 'paid' || req.status === 'completed') && (
//                                 <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
//                                     <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
//                                     <div className="flex items-center gap-3">
//                                         <button onClick={() => rentalService.getAgreement(req._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">View PDF</button>
//                                         {req.ownerAgreed ? (
//                                             <span className="text-sm flex items-center gap-1 text-green-600 font-bold p-1">✓ Accepted</span>
//                                         ) : (
//                                             <button onClick={() => handleAcceptAgreement(req._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600">Accept</button>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IncomingRequests;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import rentalService from '../../services/rentalService';
// import Spinner from '../common/Spinner';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const IncomingRequests = () => {
//     // --- States ---
//     const { user } = useAuth();
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     // --- Data Fetching ---
//     const fetchRequests = useCallback(async () => {
//         if (user?.token) {
//             try {
//                 setLoading(true);
//                 const data = await rentalService.getIncomingRequests(user.token);
//                 setRequests(data);
//             } catch (err) {
//                 setError('Could not fetch incoming requests.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setLoading(false);
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchRequests();
//     }, [fetchRequests]);

//     // --- Event Handlers ---

//     const handleStatusUpdate = async (id, status) => {
//         try {
//             await rentalService.updateRentalStatus(id, status, user.token);
//             // Request accept/reject hone ke baad list se hata dein
//             setRequests(prev => prev.filter(req => req._id !== id));
//             toast.success(`Request has been ${status}.`);
//         } catch (error) {
//             toast.error(`Failed to ${status} the request.`);
//         }
//     };
    
//     // --- YEH FUNCTION THEEK KIYA GAYA HAI ---
//     const handleAcceptAgreement = async (rentalId) => {
//         try {
//             // Backend se poora updated rental object milega
//             const updatedRental = await rentalService.acceptAgreement(rentalId, user.token);
//             toast.success("Agreement accepted by you!");
            
//             // State ko backend se mile naye, sahi data se update karein
//             setRequests(prev => 
//                 prev.map(r => (r._id === rentalId ? updatedRental : r))
//             );
//         } catch (error) {
//             toast.error("Could not accept the agreement.");
//         }
//     };

//     // --- JSX Render ---

//     if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-6">Incoming Requests</h2>
//             {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
//             {!loading && requests.length === 0 && !error ? (
//                 <p className="text-gray-500">You have no incoming requests at the moment.</p>
//             ) : (
//                 <div className="space-y-6">
//                     {requests.map((req) => {
//                         // Bug Fix: Check karein ki data maujood hai
//                         if (!req.itemId || !req.renterId) return null;

//                         return (
//                             <div key={req._id} className="bg-white p-4 rounded-lg shadow-md border">
//                                 <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                                     <div className="flex-grow">
//                                         <Link to={`/item/${req.itemId._id}`} className="font-bold text-lg hover:underline">{req.itemId.name}</Link>
//                                         <p className="text-sm text-gray-600">
//                                             Requested by: <span className="font-semibold">{req.renterId.name}</span>
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                             Dates: {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                     <div className="flex gap-3">
//                                         {req.status === 'pending' && (
//                                             <>
//                                                 <button onClick={() => handleStatusUpdate(req._id, 'accepted')} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-semibold shadow-sm">Accept</button>
//                                                 <button onClick={() => handleStatusUpdate(req._id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold shadow-sm">Reject</button>
//                                             </>
//                                         )}
//                                     </div>
//                                 </div>
                                
//                                 {/* Digital Agreement Section */}
//                                 {(req.status === 'paid' || req.status === 'completed') && (
//                                     <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
//                                         <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
//                                         <div className="flex items-center gap-3">
//                                             <button onClick={() => rentalService.getAgreement(req._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">View PDF</button>
//                                             {req.ownerAgreed ? (
//                                                 <span className="text-sm flex items-center gap-1 text-green-600 font-bold p-1">✓ You Accepted</span>
//                                             ) : (
//                                                 <button onClick={() => handleAcceptAgreement(req._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600">Accept</button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IncomingRequests;

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import rentalService from '../../services/rentalService';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const IncomingRequests = () => {
    // --- States ---
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- Data Fetching ---
    const fetchRequests = useCallback(async () => {
        if (user?.token) {
            try {
                setLoading(true);
                const data = await rentalService.getIncomingRequests(user.token);
                setRequests(data);
            } catch (err) {
                setError('Could not fetch incoming requests.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    // --- Event Handlers ---

    const handleStatusUpdate = async (id, status) => {
        try {
            await rentalService.updateRentalStatus(id, status, user.token);
            setRequests(prev => prev.filter(req => req._id !== id));
            toast.success(`Request has been ${status}.`);
        } catch (error) {
            toast.error(`Failed to ${status} the request.`);
        }
    };
    
    const handleAcceptAgreement = async (rentalId) => {
        try {
            const updatedRental = await rentalService.acceptAgreement(rentalId, user.token);
            toast.success("Agreement accepted by you!");
            setRequests(prev => prev.map(r => (r._id === rentalId ? updatedRental : r)));
        } catch (error) {
            toast.error("Could not accept the agreement.");
        }
    };

    const handleMarkComplete = async (rentalId) => {
        try {
            const updatedRental = await rentalService.markRentalComplete(rentalId, user.token);
            toast.success("Marked as complete!");
            setRequests(prev => prev.map(r => (r._id === rentalId ? updatedRental : r)));
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not mark as complete.");
        }
    };

    // --- JSX Render ---

    if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-cyan-100 text-cyan-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Incoming & Active Rentals</h2>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            {!loading && requests.length === 0 && !error ? (
                <p className="text-gray-500">You have no active rentals or incoming requests.</p>
            ) : (
                <div className="space-y-6">
                    {requests.map((req) => {
                        if (!req.itemId || !req.renterId) return null;
                        
                        return (
                            <div key={req._id} className="bg-white p-4 rounded-lg shadow-md border">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-grow">
                                        <Link to={`/item/${req.itemId._id}`} className="font-bold text-lg hover:underline">{req.itemId.name}</Link>
                                        <p className="text-sm text-gray-600">Renter: <span className="font-semibold">{req.renterId.name}</span></p>
                                        <p className="text-sm text-gray-500">Dates: {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(req.status)}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                                        {req.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(req._id, 'accepted')} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-semibold shadow-sm text-sm">Accept</button>
                                                <button onClick={() => handleStatusUpdate(req._id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold shadow-sm text-sm">Reject</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Digital Agreement Section */}
                                {(req.status === 'paid' || req.status === 'completed') && (
                                    <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2">
                                        <p className="text-sm font-semibold text-gray-700">Digital Agreement:</p>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => rentalService.getAgreement(req._id, user.token)} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">View PDF</button>
                                            {req.ownerAgreed ? (
                                                <span className="text-sm flex items-center gap-1 text-green-600 font-bold p-1">✓ You Accepted</span>
                                            ) : (
                                                <button onClick={() => handleAcceptAgreement(req._id)} className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600">Accept</button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* --- Mark as Complete Section --- */}
                                {req.status === 'paid' && (
                                    <div className="mt-4 pt-4 border-t text-center">
                                        {req.ownerMarkedComplete ? (
                                            <p className="text-sm text-gray-500 italic">You have marked this as complete. Waiting for renter...</p>
                                        ) : (
                                            <button onClick={() => handleMarkComplete(req._id)} className="bg-indigo-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-600 shadow-sm transition-colors">
                                                Mark as Complete
                                            </button>
                                        )}
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

export default IncomingRequests;