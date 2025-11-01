// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../../services/adminService.jsx';
// import Spinner from '../../components/common/Spinner.jsx';

// // --- Document Viewer Modal Component ---
// const KycDetailModal = ({ user, onClose, onApprove, onReject }) => {
//     const [reason, setReason] = useState('');

//     if (!user) return null;

//     const handleReject = () => {
//         if (!reason.trim()) {
//             return toast.error("Please provide a reason for rejection.");
//         }
//         onReject(user._id, reason);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">KYC Verification for {user.name}</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
//                 </div>
                
//                 <div className="space-y-4 mb-6">
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <h4 className="font-semibold mb-2">Aadhaar Card</h4>
//                             <a href={user.verification.aadhaarImage || '#'} target="_blank" rel="noopener noreferrer">
//                                 <img src={user.verification.aadhaarImage || 'https://placehold.co/400x250?text=Not+Uploaded'} alt="Aadhaar" className="w-full h-auto rounded-md border hover:opacity-80 transition-opacity" />
//                             </a>
//                         </div>
//                         <div>
//                             <h4 className="font-semibold mb-2">Selfie</h4>
//                             <a href={user.verification.selfieImage || '#'} target="_blank" rel="noopener noreferrer">
//                                 <img src={user.verification.selfieImage || 'https://placehold.co/400x250?text=Not+Uploaded'} alt="Selfie" className="w-full h-auto rounded-md border hover:opacity-80 transition-opacity" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* --- Rejection Section --- */}
//                 <div className="mb-6">
//                     <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">Rejection Reason (if any)</label>
//                     <textarea 
//                         id="rejectionReason"
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         rows="2"
//                         className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                         placeholder="e.g., Aadhaar card is not clear."
//                     />
//                 </div>

//                 {/* --- Action Buttons --- */}
//                 <div className="flex justify-end gap-4">
//                     <button onClick={handleReject} className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 disabled:bg-red-400" disabled={!reason.trim()}>
//                         Reject
//                     </button>
//                     <button onClick={() => onApprove(user._id)} className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">
//                         Approve
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Main KYC Page Component ---
// const KycManagementPage = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [selectedUser, setSelectedUser] = useState(null);

//     const fetchKycRequests = async () => {
//         try {
//             setLoading(true);
//             const data = await adminService.getKycRequests();
//             setRequests(data);
//         } catch (err) {
//             setError(err.toString());
//             toast.error(err.toString());
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchKycRequests();
//     }, []);

//     const updateRequestStatus = (userId) => {
//         setRequests(prev => prev.filter(req => req._id !== userId));
//         setSelectedUser(null);
//     };

//     const handleApprove = async (userId) => {
//         try {
//             const result = await adminService.approveKyc(userId);
//             toast.success(result.message);
//             updateRequestStatus(userId);
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     };

//     const handleReject = async (userId, reason) => {
//         try {
//             const result = await adminService.rejectKyc(userId, reason);
//             toast.success(result.message);
//             updateRequestStatus(userId);
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     };

//     if (loading) return <Spinner />;
//     if (error) return <p className="text-red-500 text-center">{error}</p>;

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">KYC Management</h1>
            
//             {requests.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">No pending KYC requests at the moment.</p>
//             ) : (
//                 <div className="overflow-x-auto bg-white rounded-lg shadow">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {requests.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50">
//                                     <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
//                                     <td className="py-4 px-6 text-gray-600">{user.email}</td>
//                                     <td className="py-4 px-6 text-center">
//                                         <button 
//                                             onClick={() => setSelectedUser(user)}
//                                             className="bg-teal-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition-colors"
//                                         >
//                                             Review Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
            
//             {selectedUser && (
//                 <KycDetailModal 
//                     user={selectedUser}
//                     onClose={() => setSelectedUser(null)}
//                     onApprove={handleApprove}
//                     onReject={handleReject}
//                 />
//             )}
//         </div>
//     );
// };

// export default KycManagementPage;


//******** */

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../../services/adminService.jsx';
// import Spinner from '../../components/common/Spinner.jsx';
// import { useAuth } from '../../contexts/AuthContext.jsx'; // <-- STEP 1: Import the useAuth hook

// // --- Document Viewer Modal Component ---
// // (No changes needed in this part, it's already perfect)
// const KycDetailModal = ({ user, onClose, onApprove, onReject }) => {
//     const [reason, setReason] = useState('');

//     if (!user) return null;

//     const handleReject = () => {
//         if (!reason.trim()) {
//             return toast.error("Please provide a reason for rejection.");
//         }
//         onReject(user._id, reason);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">KYC Verification for {user.name}</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
//                 </div>
                
//                 <div className="space-y-4 mb-6">
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <h4 className="font-semibold mb-2">Aadhaar Card</h4>
//                             <a href={user.verification.aadhaarImage || '#'} target="_blank" rel="noopener noreferrer">
//                                 <img src={user.verification.aadhaarImage || 'https://placehold.co/400x250?text=Not+Uploaded'} alt="Aadhaar" className="w-full h-auto rounded-md border hover:opacity-80 transition-opacity" />
//                             </a>
//                         </div>
//                         <div>
//                             <h4 className="font-semibold mb-2">Selfie</h4>
//                             <a href={user.verification.selfieImage || '#'} target="_blank" rel="noopener noreferrer">
//                                 <img src={user.verification.selfieImage || 'https://placehold.co/400x250?text=Not+Uploaded'} alt="Selfie" className="w-full h-auto rounded-md border hover:opacity-80 transition-opacity" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* --- Rejection Section --- */}
//                 <div className="mb-6">
//                     <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">Rejection Reason (if any)</label>
//                     <textarea 
//                         id="rejectionReason"
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         rows="2"
//                         className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                         placeholder="e.g., Aadhaar card is not clear."
//                     />
//                 </div>

//                 {/* --- Action Buttons --- */}
//                 <div className="flex justify-end gap-4">
//                     <button onClick={handleReject} className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 disabled:bg-red-400" disabled={!reason.trim()}>
//                         Reject
//                     </button>
//                     <button onClick={() => onApprove(user._id)} className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">
//                         Approve
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // --- Main KYC Page Component ---
// const KycManagementPage = () => {
//     const { user } = useAuth(); // <-- STEP 2: Get the user object from the context
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [selectedUser, setSelectedUser] = useState(null);

//     // This useEffect now depends on 'user'. It will only run when 'user' is loaded.
//     useEffect(() => {
//         const fetchKycRequests = async () => {
//             try {
//                 setLoading(true);
//                 const data = await adminService.getKycRequests();
//                 setRequests(data);
//             } catch (err) {
//                 // Now we get the real error message from the server if the token is invalid
//                 const message = err.response?.data?.message || err.toString();
//                 setError(message);
//                 toast.error(message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // <-- STEP 3: Only fetch data if the user object (and thus the token) exists
//         if (user) {
//             fetchKycRequests();
//         } else {
//             // If there's no user, we shouldn't even try to fetch. Stop the loading spinner.
//             setLoading(false);
//         }
//     }, [user]); // <-- The dependency on 'user' is the most critical part of the fix

//     const updateRequestStatus = (userId) => {
//         setRequests(prev => prev.filter(req => req._id !== userId));
//         setSelectedUser(null);
//     };

//     const handleApprove = async (userId) => {
//         try {
//             const result = await adminService.approveKyc(userId);
//             toast.success(result.message);
//             updateRequestStatus(userId);
//         } catch (err) {
//             toast.error(err.response?.data?.message || err.toString());
//         }
//     };

//     const handleReject = async (userId, reason) => {
//         try {
//             const result = await adminService.rejectKyc(userId, reason);
//             toast.success(result.message);
//             updateRequestStatus(userId);
//         } catch (err) {
//             toast.error(err.response?.data?.message || err.toString());
//         }
//     };
    
//     // While the context is figuring out if the user is logged in, show a spinner.
//     if (loading) return <Spinner />;
    
//     // If there's an error (e.g., token expired), show the error.
//     if (error) return <p className="text-red-500 text-center p-10 bg-red-50 rounded-lg">{error}</p>;

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">KYC Management</h1>
            
//             {requests.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">No pending KYC requests at the moment.</p>
//             ) : (
//                 <div className="overflow-x-auto bg-white rounded-lg shadow">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {requests.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50">
//                                     <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
//                                     <td className="py-4 px-6 text-gray-600">{user.email}</td>
//                                     <td className="py-4 px-6 text-center">
//                                         <button 
//                                             onClick={() => setSelectedUser(user)}
//                                             className="bg-teal-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition-colors"
//                                         >
//                                             Review Documents
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
            
//             {selectedUser && (
//                 <KycDetailModal 
//                     user={selectedUser}
//                     onClose={() => setSelectedUser(null)}
//                     onApprove={handleApprove}
//                     onReject={handleReject}
//                 />
//             )}
//         </div>
//     );
// };

// export default KycManagementPage;


//********** */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import adminService from '../../services/adminService.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import KycDetailModal from '../admin/KycManagementPage';

const KycManagementPage = () => {
  const { user, logout } = useAuth();   // ✅ Include logout for token expiry handling
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchKycRequests = async () => {
      try {
        setLoading(true);
        const data = await adminService.getKycRequests();
        setRequests(data);
      } catch (err) {
        // console.log(err);
        const message = err.response?.data?.message || err.toString();
        // ✅ Token expired → auto logout
        if (err.response?.status === 401) {
          logout();
        }
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchKycRequests();
    } else {
      setLoading(false);
    }
  }, [user, logout]);

  const updateRequestStatus = (userId) => {
    setRequests(prev => prev.filter(req => req._id !== userId));
    setSelectedUser(null);
  };

  const handleApprove = async (userId) => {
    setActionLoading(true);
    try {
      const result = await adminService.approveKyc(userId);
      toast.success(result.message);
      updateRequestStatus(userId);
    } catch (err) {
      toast.error(err.response?.data?.message || err.toString());
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (userId, reason) => {
    setActionLoading(true);
    try {
      const result = await adminService.rejectKyc(userId, reason);
      toast.success(result.message);
      updateRequestStatus(userId);
    } catch (err) {
      toast.error(err.response?.data?.message || err.toString());
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <p className="text-red-500 text-center p-10 bg-red-50 rounded-lg">
        {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">KYC Management</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
          No pending KYC requests at the moment.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{u.name}</td>
                  <td className="py-4 px-6 text-gray-600">{u.email}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition-colors"
                    >
                      Review Documents
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <KycDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
};

export default KycManagementPage;
