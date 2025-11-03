

//change 2
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import userService from '../services/userService';
import Spinner from '../components/common/Spinner';

const ProfilePage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getMyProfile(user.token);
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        if (user?.token) {
            fetchProfile();
        }
    }, [user]);

    // Sidebar ke links ka data
    const sidebarLinks = [
        { name: 'Dashboard', path: '/profile' },
        { name: 'My Items', path: '/profile/items' },
        { name: 'My Rentals', path: '/profile/rentals' },
        { name: 'Incoming Requests', path: '/profile/incoming-requests' }, // <<-- NAYA LINK
        { name: 'Settings', path: '/profile/settings' },
    ];

    if (loading) {
        return <Spinner />;
    }

    if (!profile) {
        return <p className="text-center text-red-500">Could not load profile.</p>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* --- Left Sidebar --- */}
            <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img
                        src={profile.avatar?.url || `https://ui-avatars.com/api/?name=${profile.name.replace(' ', '+')}&background=0D9488&color=fff`}
                        alt={profile.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-teal-500"
                    />
                    <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
                    <p className="text-sm text-gray-500">Joined on {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2">
                        {sidebarLinks.map(link => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${location.pathname === link.path
                                            ? 'bg-teal-500 text-white shadow-lg'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
                {/* Yahan par nested routes (Dashboard, My Items, etc.) render honge */}
                <Outlet />
            </main>
        </div>
    );
};

export default ProfilePage;