// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../services/adminService';
// import Spinner from '../components/common/Spinner';

// const UserListPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setLoading(true);
//                 const fetchedUsers = await adminService.getAllUsers();
//                 setUsers(fetchedUsers);
//             } catch (err) {
//                 setError(err.toString());
//                 toast.error(err.toString());
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     const handleDeleteUser = async (userId) => {
//         // NOTE: Humne confirm() ka use nahi kiya hai. Ek real app me yahan
//         // ek custom confirmation modal (dialog box) hona chahiye.
//         toast.warning(
//             <div>
//                 <p>Are you sure you want to delete this user?</p>
//                 <button 
//                     onClick={() => confirmDelete(userId)}
//                     className="bg-red-600 text-white px-3 py-1 rounded-md mt-2 mr-2"
//                 >
//                     Yes, Delete
//                 </button>
//             </div>, 
//             { autoClose: false, closeOnClick: true }
//         );
//     };

//     const confirmDelete = async (userId) => {
//         try {
//             const result = await adminService.deleteUser(userId);
//             toast.success(result.message);
//             // List se user ko remove karein taaki UI update ho jaaye
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     }

//     if (loading) return <Spinner />;
//     if (error && users.length === 0) return <p className="text-red-500 text-center">{error}</p>;

//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
//                             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {users.map(user => (
//                             <tr key={user._id} className="hover:bg-gray-50">
//                                 <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
//                                 <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
//                                 <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
//                                 <td className="py-4 px-6 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
//                                 <td className="py-4 px-6 whitespace-nowrap">
//                                     <button 
//                                         onClick={() => handleDeleteUser(user._id)}
//                                         className="text-red-600 hover:text-red-900 font-medium"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserListPage;


//**************** */ //21/9 fix code

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../services/adminService';
// import Spinner from '../components/common/Spinner';

// const UserListPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [searchQuery, setSearchQuery] = useState(''); // Search ke liye state

//     // Yeh useEffect users ko fetch karega jab component load hoga ya search query badlegi
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Pehli baar load hone par spinner dikhana zaroori hai
//                 if (searchQuery === '') setLoading(true);
                
//                 const fetchedUsers = await adminService.getAllUsers(searchQuery);
//                 setUsers(fetchedUsers);
//             } catch (err) {
//                 const errorMsg = err.toString();
//                 setError(errorMsg);
//                 toast.error(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Debouncing: User ke type karna band karne ke 500ms baad search hoga
//         const timerId = setTimeout(() => {
//             fetchUsers();
//         }, 500);

//         return () => clearTimeout(timerId); // Cleanup function
//     }, [searchQuery]); // Yeh tabhi chalega jab searchQuery badlegi

//     const confirmDelete = async (userId) => {
//         try {
//             const result = await adminService.deleteUser(userId);
//             toast.success(result.message);
//             // UI se user ko turant hatayein
//             setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     };

//     const handleDeleteUser = (userId) => {
//         // react-toastify ka use karke ek custom confirmation dialog
//         toast.warning(
//             ({ closeToast }) => (
//               <div>
//                 <p className="mb-2 font-semibold">Are you sure you want to delete this user?</p>
//                 <div className="flex justify-end gap-2">
//                   <button
//                     onClick={() => {
//                       confirmDelete(userId);
//                       closeToast();
//                     }}
//                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                   >
//                     Yes, Delete
//                   </button>
//                   <button
//                     onClick={closeToast}
//                     className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ),
//             {
//               position: "top-center",
//               autoClose: false,
//               closeOnClick: false,
//               draggable: false,
//             }
//           );
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
//                 {/* Search Bar UI */}
//                 <div className="w-full md:w-1/3">
//                     <input 
//                         type="text"
//                         placeholder="Search by name or email..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                 </div>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 {loading ? (
//                     <div className="p-10"><Spinner /></div>
//                 ) : error ? (
//                     <p className="text-red-500 text-center py-10">{error}</p>
//                 ) : (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {users.length > 0 ? users.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50">
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">
//                                         <button 
//                                             onClick={() => handleDeleteUser(user._id)}
//                                             className="text-red-600 hover:text-red-900 font-medium"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-10 text-gray-500">
//                                         No users found for this search.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserListPage;


//********** */ //22/9


//********* */

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../services/adminService';
// import Spinner from '../components/common/Spinner';

// const UserListPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 if (searchQuery === '') setLoading(true);
//                 const fetchedUsers = await adminService.getAllUsers(searchQuery);
//                 setUsers(fetchedUsers);
//             } catch (err) {
//                 const errorMsg = err.toString();
//                 setError(errorMsg);
//                 toast.error(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const timerId = setTimeout(() => { fetchUsers(); }, 500);
//         return () => clearTimeout(timerId);
//     }, [searchQuery]);

//     const confirmDelete = async (userId) => {
//         try {
//             const result = await adminService.deleteUser(userId);
//             toast.success(result.message);
//             setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     };

//     const handleDeleteUser = (userId) => {
//         toast.warning(
//             ({ closeToast }) => (
//               <div>
//                 <p className="mb-2 font-semibold">Are you sure?</p>
//                 <div className="flex justify-end gap-2">
//                   <button onClick={() => { confirmDelete(userId); closeToast(); }} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">Delete</button>
//                   <button onClick={closeToast} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm">Cancel</button>
//                 </div>
//               </div>
//             ), { position: "top-center", autoClose: false, closeOnClick: false }
//           );
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
//                 <div className="w-full md:w-1/3">
//                     <input 
//                         type="text"
//                         placeholder="Search by name or email..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                 </div>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 {loading ? ( <div className="p-10"><Spinner /></div> ) : error ? ( <p className="text-red-500 text-center py-10">{error}</p> ) : (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {users.length > 0 ? users.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50">
//                                     {/* [FIX] Ab yahan poori MongoDB _id dikhegi */}
//                                     <td className="py-4 px-6 whitespace-nowrap font-mono text-gray-600 text-sm">{user._id}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">
//                                         <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr><td colSpan="5" className="text-center py-10 text-gray-500">No users found.</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserListPage;


//********* */

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../services/adminService';
// import Spinner from '../components/common/Spinner';
// const UserListPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 if (searchQuery === '') setLoading(true);
//                 const fetchedUsers = await adminService.getAllUsers(searchQuery);
//                 setUsers(fetchedUsers);
//             } catch (err) {
//                 const errorMsg = err.toString();
//                 setError(errorMsg);
//                 toast.error(errorMsg);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const timerId = setTimeout(() => { fetchUsers(); }, 500);
//         return () => clearTimeout(timerId);
//     }, [searchQuery]);

//     const confirmDelete = async (userId) => {
//         try {
//             const result = await adminService.deleteUser(userId);
//             toast.success(result.message);
//             setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
//         } catch (err) {
//             toast.error(err.toString());
//         }
//     };

//     const handleDeleteUser = (userId) => {
//         toast.warning(
//             ({ closeToast }) => (
//               <div>
//                 <p className="mb-2 font-semibold">Are you sure?</p>
//                 <div className="flex justify-end gap-2">
//                   <button onClick={() => { confirmDelete(userId); closeToast(); }} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">Delete</button>
//                   <button onClick={closeToast} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm">Cancel</button>
//                 </div>
//               </div>
//             ), { position: "top-center", autoClose: false, closeOnClick: false }
//           );
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
//                 <div className="w-full md:w-1/3">
//                     <input 
//                         type="text"
//                         placeholder="Search by ID, name, or email..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                 </div>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 {loading ? ( <div className="p-10"><Spinner /></div> ) : error ? ( <p className="text-red-500 text-center py-10">{error}</p> ) : (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                                 <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {users.length > 0 ? users.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50">
//                                     <td className="py-4 px-6 whitespace-nowrap font-mono text-gray-600 text-sm">
//                                         {/* [FIX] Ab yeh short ID ya fallback ID dikhayega */}
//                                         {user.user_id ? `#${user.user_id}` : `...${user._id.slice(-6)}`}
//                                     </td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
//                                     <td className="py-4 px-6 whitespace-nowrap">
//                                         <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr><td colSpan="5" className="text-center py-10 text-gray-500">No users found.</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserListPage;


//*********** */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// [FIX] Sahi import path, aapke folder structure ke hisaab se
import adminService from '../services/adminService.jsx'; 
import Spinner from '../components/common/Spinner.jsx';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (searchQuery === '') setLoading(true);
                const fetchedUsers = await adminService.getAllUsers(searchQuery);
                setUsers(fetchedUsers);
            } catch (err) {
                const errorMsg = err.toString();
                setError(errorMsg);
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        };

        const timerId = setTimeout(() => { fetchUsers(); }, 500);
        return () => clearTimeout(timerId);
    }, [searchQuery]);

    const confirmDelete = async (userId) => {
        try {
            const result = await adminService.deleteUser(userId);
            toast.success(result.message);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            toast.error(err.toString());
        }
    };

    const handleDeleteUser = (userId) => {
        toast.warning(
            ({ closeToast }) => (
              <div>
                <p className="mb-2 font-semibold">Are you sure?</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => { confirmDelete(userId); closeToast(); }} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">Delete</button>
                  <button onClick={closeToast} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm">Cancel</button>
                </div>
              </div>
            ), { position: "top-center", autoClose: false, closeOnClick: false }
          );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <div className="w-full md:w-1/3">
                    <input 
                        type="text"
                        placeholder="Search by ID, name, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                {loading ? ( <div className="p-10"><Spinner /></div> ) : error ? ( <p className="text-red-500 text-center py-10">{error}</p> ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length > 0 ? users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap font-mono text-gray-600 text-sm">{user._id}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-500">No users found.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserListPage;
