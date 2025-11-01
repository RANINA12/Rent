import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import userService from '../../services/userService'; // userService ko import karein
import Spinner from '../common/Spinner';

// StatCard component (UI piece)
const StatCard = ({ icon, title, value, linkTo }) => (
    <Link to={linkTo} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
        <div className="bg-teal-100 text-teal-600 p-3 rounded-full text-2xl">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </Link>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeProducts: 0,
        requestsRaised: 0,
        totalEarnings: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    // useEffect hook API se data fetch karne ke liye
    useEffect(() => {
        const fetchStats = async () => {
            if (user?.token) {
                try {
                    const data = await userService.getDashboardStats(user.token);
                    if (data.success) {
                        setStats(data.stats);
                    }
                } catch (error) {
                    console.error("Failed to fetch dashboard stats", error);
                } finally {
                    setLoadingStats(false);
                }
            }
        };
        fetchStats();
    }, [user]);

    // User ke verification status ko sahi se access karein
    const verificationStatus = user?.verification?.status  ;

    // Dashboard.jsx
{/* <Link to="/profile/settings" className="bg-yellow-400 ...">
    {verificationStatus === 'unverified' ? 'Verify Now' : 'Check Status'}
</Link> */}

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
                <p className="text-gray-500 mt-1">Here's a quick look at your account today.</p>
            </div>

            {/* --- Smart Verification Status Section --- */}
            {verificationStatus && verificationStatus !== 'verified' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <p className="font-bold text-yellow-800">Complete Your Profile</p>
                            <p className="text-sm text-yellow-700">
                                {verificationStatus === 'unverified' 
                                    ? "Please complete your KYC verification to start renting or listing items." 
                                    : "Your verification is pending. We'll notify you soon."}
                            </p>
                        </div>
                        <div className="ml-4">
                            <Link to="/profile/settings" className="bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-500 whitespace-nowrap">
                                {verificationStatus === 'unverified' ? 'Verify Now' : 'Check Status'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Stats Cards Section (Live Data ke Saath) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    icon={'📦'} 
                    title="Total Active Products" 
                    value={loadingStats ? '...' : stats.activeProducts} 
                    linkTo="/profile/items"
                />
                <StatCard 
                    icon={'🔔'} 
                    title="Total Requests Raised" 
                    value={loadingStats ? '...' : stats.requestsRaised} 
                    linkTo="#"
                />
                <StatCard 
                    icon={'₹'} 
                    title="RentSmart Earnings" 
                    value={loadingStats ? '...' : `₹${stats.totalEarnings}`} 
                    linkTo="#"
                />
            </div>

            {/* --- Active Requests Section --- */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Requests</h2>
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">You don't have any active requests.</p>
                    <Link to="/items" className="mt-4 inline-block bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600">
                        Explore Items
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
