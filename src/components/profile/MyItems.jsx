
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Sahi services aur contexts ko import karein
import { useAuth } from '../../contexts/AuthContext';
import itemService from '../../services/itemService';
import Spinner from '../common/Spinner';

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('active');
    const { user } = useAuth();

    // Jab component load ho ya user badle, to uske items fetch karein
    useEffect(() => {
        const fetchUserItems = async () => {
            // Sunishchit karein ki user aur user ka token dono maujood hain
            if (user && user.token) {
                try {
                    setLoading(true);
                    // Humne jo naya getMyItems function banaya tha, use call karein
                    const userItems = await itemService.getMyItems(user.token);
                    setItems(userItems);
                } catch (err) {
                    const errorMessage = "Aapke items fetch nahi ho paye. Kripya dobara try karein.";
                    setError(errorMessage);
                    toast.error(errorMessage);
                    console.error("Failed to fetch user items:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                // Agar user logged in nahi hai, to loading band kar dein
                setLoading(false);
            }
        };

        fetchUserItems();
    }, [user]); // Yeh effect tabhi chalega jab user object badlega

    // Item delete karne ka function
    const handleDelete = async (itemId) => {
        if (window.confirm('Kya aap sach mein is item ko delete karna chahte hain?')) {
            try {
                await itemService.deleteItem(itemId, user.token);
                // State se item hatakar UI turant update karein
                setItems(prevItems => prevItems.filter(item => item._id !== itemId));
                toast.success('Item safaltapoorvak delete ho gaya!');
            } catch (err) {
                console.error("Failed to delete item:", err);
                toast.error('Item delete nahi ho paya.');
            }
        }
    };

    // Loading state
    if (loading) {
        return <div className="flex justify-center items-center p-8"><Spinner /></div>;
    }

    // Error state
    if (error) {
        return <p className="text-center text-red-500 p-8">{error}</p>;
    }

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full">
            {/* Page ka Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">My Items</h1>
                <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-600 transition duration-300">
                    + List New Item
                </Link>
            </div>

            {/* Active aur Rented Out Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'active'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab('rented')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'rented'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Rented Out
                    </button>
                </nav>
            </div>

            {/* Items ki List */}
            <div className="mt-6 space-y-4">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.images?.[0]?.url || 'https://placehold.co/100x100/e2e8f0/334155?text=No+Img'}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-600">₹{item.pricePerDay}/day</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <Link to={`/edit-item/${item._id}`} className="font-semibold text-blue-600 hover:underline">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(item._id)} className="font-semibold text-red-600 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Aapne abhi tak koi item list nahi kiya hai.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyItems;