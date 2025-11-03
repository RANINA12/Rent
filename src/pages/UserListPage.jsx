

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
                {loading ? (<div className="p-10"><Spinner /></div>) : error ? (<p className="text-red-500 text-center py-10">{error}</p>) : (
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
