// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import userService from '../../services/userService';
// import Spinner from '../common/Spinner';
// import { Link } from 'react-router-dom';

// const MyItems = () => {
//     const { user } = useAuth();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('active');

//     useEffect(() => {
//         const fetchItems = async () => {
//             if (user?.info?._id) {
//                 try {
//                     setLoading(true);
//                     const data = await userService.getUserItems(user.info._id);
//                     if (data.success) {
//                         setItems(data.items);
//                     }
//                 } catch (error) {
//                     console.error("Failed to fetch user items", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchItems();
//     }, [user]);

//     // Abhi ke liye, hum tabs ke liye data filter nahi kar rahe hain.
//     // Baad mein jab aapke paas item ka status hoga, tab aap yahan filter laga sakte hain.
//     const filteredItems = items; 

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
//                 <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">
//                     + List New Item
//                 </Link>
//             </div>

//             {/* --- Tabs --- */}
//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8" aria-label="Tabs">
//                     <button 
//                         onClick={() => setActiveTab('active')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'active' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Active
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('rented')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'rented' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Rented Out
//                     </button>
//                 </nav>
//             </div>

//             {/* --- Items List --- */}
//             {loading ? (
//                 <Spinner />
//             ) : filteredItems.length > 0 ? (
//                 <div className="space-y-4">
//                     {filteredItems.map(item => (
//                         <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
//                             <img 
//                                 src={item.images[0]?.url || 'https://placehold.co/100x100'} 
//                                 alt={item.name}
//                                 className="w-20 h-20 rounded-md object-cover"
//                             />
//                             <div className="ml-4 flex-grow">
//                                 <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">₹{item.price}/{item.listingType === 'rent' ? 'day' : ''}</p>
//                             </div>
//                             <div className="ml-4">
//                                 <button className="text-sm font-medium text-teal-600 hover:text-teal-800">Manage</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">You haven't listed any items yet.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyItems;

//change 2
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import itemService from '../../services/itemService';
// import userService from '../../services/userService';
// import Spinner from '../common/Spinner';
// import { Link } from 'react-router-dom';

// const MyItems = () => {
//     const { user } = useAuth();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('active');

//     // Items fetch karne ke liye function
//     const fetchItems = async () => {
//         if (user?._id) {
//             try {
//                 setLoading(true);
//                 const data = await userService.getUserItems(user._id);
//                 if (data.success) {
//                     setItems(data.items);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user items", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchItems();
//     }, [user]);

//     // Delete button ka logic
//     const handleDelete = async (itemId) => {
//         // User se confirmation poochein
//         if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
//             try {
//                 await itemService.deleteItem(itemId, user.token);
//                 // Item delete hone ke baad list ko refresh karein
//                 fetchItems(); 
//             } catch (error) {
//                 console.error("Failed to delete item", error);
//                 alert('Could not delete the item.');
//             }
//         }
//     };

//     const filteredItems = items; 

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
//                 <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">
//                     + List New Item
//                 </Link>
//             </div>

//             {/* --- Tabs --- */}
//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8">
//                     {/* ... tabs ka code ... */}
//                 </nav>
//             </div>

//             {/* --- Items List --- */}
//             {loading ? (
//                 <Spinner />
//             ) : filteredItems.length > 0 ? (
//                 <div className="space-y-4">
//                     {filteredItems.map(item => (
//                         <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
//                             <img 
//                                 src={item.images[0]?.url || 'https://placehold.co/100x100'} 
//                                 alt={item.name}
//                                 className="w-20 h-20 rounded-md object-cover"
//                             />
//                             <div className="flex-grow">
//                                 <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">₹{item.price}/{item.listingType === 'rent' ? 'day' : ''}</p>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 {/* Abhi ke liye Edit button item page par le jaayega */}
//                                 <Link to={`/item/edit/${item._id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</Link>
//                                 <button 
//                                     onClick={() => handleDelete(item._id)}
//                                     className="text-sm font-medium text-red-600 hover:text-red-800"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">You haven't listed any items yet.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyItems;

//change 3
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import userService from '../../services/userService';
// import Spinner from '../common/Spinner';
// import { Link } from 'react-router-dom';

// const MyItems = () => {
//     const { user } = useAuth();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('active');

//     useEffect(() => {
//         const fetchItems = async () => {
//             // Yahan galti thi: user.info._id ke bajaye user._id hona chahiye
//             if (user?._id) {
//                 try {
//                     setLoading(true);
//                     const data = await userService.getUserItems(user._id);
//                     if (data.success) {
//                         setItems(data.items);
//                     }
//                 } catch (error) {
//                     console.error("Failed to fetch user items", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 // Agar user object nahi hai, toh loading band kar dein
//                 setLoading(false);
//             }
//         };
//         fetchItems();
//     }, [user]);

//     // Abhi ke liye, hum tabs ke liye data filter nahi kar rahe hain.
//     const filteredItems = items; 

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
//                 <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">
//                     + List New Item
//                 </Link>
//             </div>

//             {/* --- Tabs --- */}
//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8" aria-label="Tabs">
//                     <button 
//                         onClick={() => setActiveTab('active')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'active' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Active
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('rented')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'rented' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Rented Out
//                     </button>
//                 </nav>
//             </div>

//             {/* --- Items List --- */}
//             {loading ? (
//                 <Spinner />
//             ) : filteredItems.length > 0 ? (
//                 <div className="space-y-4">
//                     {filteredItems.map(item => (
//                         <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
//                             <img 
//                                 src={item.images[0]?.url || 'https://placehold.co/100x100'} 
//                                 alt={item.name}
//                                 className="w-20 h-20 rounded-md object-cover"
//                             />
//                             <div className="ml-4 flex-grow">
//                                 <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">₹{item.price}/{item.listingType === 'rent' ? 'day' : ''}</p>
//                             </div>
//                             <div className="ml-4">
//                                 <button className="text-sm font-medium text-teal-600 hover:text-teal-800">Manage</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">You haven't listed any items yet.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyItems;

// 


//change 4

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import itemService from '../../services/itemService';
// import userService from '../../services/userService';
// import Spinner from '../common/Spinner';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const MyItems = () => {
//     const { user } = useAuth();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('active');

//     // Items fetch karne ke liye function
//     const fetchItems = async () => {
//         if (user?._id) {
//             try {
//                 setLoading(true);
//                 const data = await userService.getUserItems(user._id);
//                 if (data.success) {
//                     setItems(data.items);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user items", error);
//                 toast.error("Could not fetch your items.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchItems();
//     }, [user]);

//     // Delete button ka logic
//     const handleDelete = async (itemId) => {
//         // User se confirmation poochein
//         if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
//             try {
//                 await itemService.deleteItem(itemId, user.token);
//                 toast.success("Item deleted successfully!");
//                 // Item delete hone ke baad list ko refresh karein
//                 fetchItems(); 
//             } catch (error) {
//                 console.error("Failed to delete item", error);
//                 toast.error('Could not delete the item.');
//             }
//         }
//     };

//     const filteredItems = items; 

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
//                 <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600">
//                     + List New Item
//                 </Link>
//             </div>

//             {/* --- Tabs --- */}
//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8">
//                     {/* ... tabs ka code ... */}
//                 </nav>
//             </div>

//             {/* --- Items List --- */}
//             {loading ? (
//                 <Spinner />
//             ) : filteredItems.length > 0 ? (
//                 <div className="space-y-4">
//                     {filteredItems.map(item => (
//                         <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
//                             <img 
//                                 src={item.images[0]?.url || 'https://placehold.co/100x100'} 
//                                 alt={item.name}
//                                 className="w-20 h-20 rounded-md object-cover"
//                             />
//                             <div className="flex-grow">
//                                 <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">₹{item.price}/{item.listingType === 'rent' ? 'day' : ''}</p>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <Link to={`/item/edit/${item._id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</Link>
//                                 <button 
//                                     onClick={() => handleDelete(item._id)}
//                                     className="text-sm font-medium text-red-600 hover:text-red-800"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">You haven't listed any items yet.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyItems;


//change 5

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import { useAuth } from '../../contexts/AuthContext';
// import itemService from '../../services/itemService';
// import userService from '../../services/userService';
// import Spinner from '../common/Spinner';

// const MyItems = () => {
//     const { user } = useAuth();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('active');

//     // Component ke load hone par ya user badalne par items fetch karein
//     useEffect(() => {
//         const fetchItems = async () => {
//             // Sunishchit karein ki user object aur token dono maujood hain
//             if (user?._id && user?.token) {
//                 try {
//                     setLoading(true);
                    
//                     // --- YAHI SABSE BADI GALTI THI ---
//                     // Hum yahan se user.token bhejna bhool gaye the.
//                     // Ab hum user ki ID aur TOKEN dono bhej rahe hain.
//                     const data = await userService.getUserItems(user._id, user.token);

//                     if (data && data.items) {
//                         setItems(data.items);
//                     } else {
//                         setItems([]);
//                     }
//                 } catch (error) {
//                     console.error("Failed to fetch user items:", error);
//                     toast.error("Could not fetch your items. Please try logging in again.");
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 // Agar user ya token nahi hai, to loading band kar dein.
//                 setLoading(false);
//             }
//         };
        
//         fetchItems();
//     }, [user]); // Jab bhi user object badlega, ye function fir se chalega

//     // Item delete karne ka function
//     const handleDelete = async (itemId) => {
//         if (window.confirm('Are you sure you want to delete this item?')) {
//             try {
//                 await itemService.deleteItem(itemId, user.token);
//                 toast.success("Item deleted successfully!");
//                 // State se item hatakar UI turant update karein
//                 setItems(prevItems => prevItems.filter(item => item._id !== itemId));
//             } catch (error) {
//                 console.error("Failed to delete item:", error);
//                 toast.error('Could not delete the item.');
//             }
//         }
//     };

//     const filteredItems = items;

//     return (
//         <div>
//             {/* Page Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
//                 <Link to="/upload-item" className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300">
//                     + List New Item
//                 </Link>
//             </div>

//             {/* Tabs Navigation */}
//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="flex space-x-8" aria-label="Tabs">
//                     <button 
//                         onClick={() => setActiveTab('active')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'active' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Active
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('rented')}
//                         className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                             activeTab === 'rented' 
//                             ? 'border-teal-500 text-teal-600' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                         }`}
//                     >
//                         Rented Out
//                     </button>
//                 </nav>
//             </div>

//             {/* Items List */}
//             <div>
//                 {loading ? (
//                     <Spinner />
//                 ) : filteredItems.length > 0 ? (
//                     <div className="space-y-4">
//                         {filteredItems.map(item => (
//                             <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row items-center gap-4">
//                                 <img 
//                                     src={item.images[0]?.url || 'https://placehold.co/100x100'} 
//                                     alt={item.name}
//                                     className="w-24 h-24 sm:w-20 sm:h-20 rounded-md object-cover"
//                                 />
//                                 <div className="flex-grow text-center sm:text-left">
//                                     <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
//                                     <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}/{item.priceType}</p>
//                                 </div>
//                                 <div className="flex items-center gap-4 mt-2 sm:mt-0">
//                                     <Link to={`/edit-item/${item._id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
//                                         Edit
//                                     </Link>
//                                     <button 
//                                         onClick={() => handleDelete(item._id)}
//                                         className="text-sm font-medium text-red-600 hover:text-red-800"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12 bg-gray-50 rounded-lg">
//                         <p className="text-gray-500">You haven't listed any items yet.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyItems;

//chnage 6

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
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'active' 
                            ? 'border-teal-500 text-teal-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Active
                    </button>
                    <button 
                        onClick={() => setActiveTab('rented')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'rented' 
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