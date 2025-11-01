// import React, {useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// // [FIX] Import paths ko theek kiya gaya hai
// import adminService from '../../services/adminService';
// import Spinner from '../../components/common/Spinner';
// // NOTE: Charts ke liye yeh library install karni hogi: npm install recharts
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // --- Dashboard ke liye chhota Stat Card component ---
// const StatCard = ({ title, value, icon, color }) => (
//     <div className={`bg-white p-6 rounded-lg shadow-md flex items-center border-l-4 ${color}`}>
//         <div className="text-3xl mr-4">{icon}</div>
//         <div>
//             <p className="text-gray-500 text-sm font-medium">{title}</p>
//             <p className="text-2xl font-bold text-gray-800">{value}</p>
//         </div>
//     </div>
// );

// const AdminAnalyticsDashboard = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 // Humne controller me getStats function ko upgrade kiya tha
//                 const data = await adminService.getStats();
//                 setStats(data);
//             } catch (err) {
//                 toast.error("Could not load dashboard stats.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     if (loading) return <Spinner />;

//     return (
//         <div className="space-y-8">
//             <h1 className="text-3xl font-bold text-gray-800">Dashboard Analytics</h1>

//             {/* --- Stats Cards --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard title="Total Users" value={stats?.totalUsers ?? '...'} icon="👥" color="border-blue-500" />
//                 <StatCard title="Total Items" value={stats?.totalItems ?? '...'} icon="📦" color="border-green-500" />
//                 <StatCard title="Total Rentals" value={stats?.totalRentals ?? '...'} icon="🔄" color="border-purple-500" />
//                 <StatCard title="Pending KYC" value={stats?.pendingKyc ?? '...'} icon="⏳" color="border-yellow-500" />
//             </div>

//             {/* --- Charts --- */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-gray-700">New User Signups (Last 7 Days)</h2>
//                 {(stats?.userSignups && stats.userSignups.length > 0) ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={stats.userSignups} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="_id" />
//                             <YAxis allowDecimals={false} />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="count" fill="#14b8a6" name="New Users" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 ) : <p className="text-center text-gray-500 py-10">No recent signup data available.</p>}
//             </div>
//         </div>
//     );
// };

// export default AdminAnalyticsDashboard;


// import React, { useEffect, useState } from 'react';
// import adminService from '../../services/adminService';
// import { useAuth } from '../../contexts/AuthContext';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaUsers, FaBoxOpen, FaSyncAlt, FaExclamationTriangle } from 'react-icons/fa';

// // Stat Card Component
// const StatCard = ({ icon, title, value, color }) => (
//     <div className={`bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border-l-4 ${color}`}>
//         <div className="text-3xl">{icon}</div>
//         <div>
//             <p className="text-gray-500 text-sm font-medium">{title}</p>
//             <p className="text-2xl font-bold text-gray-800">{value}</p>
//         </div>
//     </div>
// );

// const AdminAnalyticsDashboard = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { user } = useAuth();

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const data = await adminService.getDashboardStats(user.token);
//                 setStats(data);
//             } catch (error) {
//                 console.error("Failed to fetch dashboard stats", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user?.token) {
//             fetchStats();
//         }
//     }, [user]);

//     if (loading) return <p>Loading analytics...</p>;
//     if (!stats) return <p>Could not load analytics data.</p>;

//     return (
//         <div className="space-y-8">
//             <h1 className="text-3xl font-bold text-gray-800">Dashboard Analytics</h1>
            
//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard icon={<FaUsers className="text-blue-500" />} title="Total Users" value={stats.totalUsers} color="border-blue-500" />
//                 <StatCard icon={<FaBoxOpen className="text-green-500" />} title="Total Items" value={stats.totalItems} color="border-green-500" />
//                 <StatCard icon={<FaSyncAlt className="text-purple-500" />} title="Total Rentals" value={stats.totalRentals} color="border-purple-500" />
//                 <StatCard icon={<FaExclamationTriangle className="text-yellow-500" />} title="Pending KYC" value={stats.pendingKYC} color="border-yellow-500" />
//             </div>

//             {/* New User Signups Chart */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">New User Signups (Last 7 Days)</h2>
//                 {stats.userSignups && stats.userSignups.length > 0 ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={stats.userSignups}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis allowDecimals={false} />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="count" stroke="#14B8A6" strokeWidth={2} name="New Users" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 ) : (
//                     <p className="text-center text-gray-500 py-10">No recent signup data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminAnalyticsDashboard;


//********************** */

import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { useAuth } from '../../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaBoxOpen, FaSyncAlt, FaExclamationTriangle } from 'react-icons/fa';
import Spinner from '../../components/common/Spinner';

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const AdminAnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    if (!stats) return <p className="text-center p-8">Could not load analytics data.</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Analytics</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaUsers className="text-blue-500" />} title="Total Users" value={stats.totalUsers} color="border-blue-500" />
                <StatCard icon={<FaBoxOpen className="text-green-500" />} title="Total Items" value={stats.totalItems} color="border-green-500" />
                <StatCard icon={<FaSyncAlt className="text-purple-500" />} title="Total Rentals" value={stats.totalRentals} color="border-purple-500" />
                <StatCard icon={<FaExclamationTriangle className="text-yellow-500" />} title="Pending KYC" value={stats.pendingKyc} color="border-yellow-500" />
            </div>

            {/* New User Signups Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">New User Signups (Last 7 Days)</h2>
                {stats.userSignups && stats.userSignups.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats.userSignups}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#14B8A6" strokeWidth={2} name="New Users" />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500 py-10">No recent signup data available.</p>
                )}
            </div>
        </div>
    );
};

export default AdminAnalyticsDashboard;