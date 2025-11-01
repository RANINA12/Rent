// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import itemService from '../services/itemService';
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';

// const CategoryPage = () => {
//     const { categoryName } = useParams();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchItemsByCategory = async () => {
//             try {
//                 setLoading(true);
//                 setError('');
//                 // Ab yeh direct backend se sirf category ke items laayega
//                 const data = await itemService.getItemsByCategory(categoryName);
//                 if (data.success) {
//                     setItems(data.items);
//                 }
//             } catch (err) {
//                 setError('Could not fetch items for this category.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchItemsByCategory();
//     }, [categoryName]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8 capitalize">
//                 {categoryName}
//             </h1>
//             {loading ? (
//                 <Spinner />
//             ) : error ? (
//                 <p className="text-center text-red-500">{error}</p>
//             ) : items.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {items.map(item => (
//                         <ProductCard key={item._id} product={item} />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500">No items found in this category yet.</p>
//             )}
//         </div>
//     );
// };

// export default CategoryPage;


//************************************************************* */




// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import itemService from '../services/itemService';
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';

// const CategoryPage = () => {
//     const { categoryName } = useParams();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const [filters, setFilters] = useState({
//         minPrice: '',
//         maxPrice: '',
//         sortBy: 'createdAt_desc', // Default sort
//     });

//     // Data fetch karne waala function
//     const fetchItems = useCallback(() => {
//         setLoading(true);
//         setError('');
//         itemService.getItemsByCategory(categoryName, filters)
//             .then(data => {
//                 // --- YAHAN HAI SABSE BADA BADLAAV ---
//                 // Service ab seedha array ('data') bhejti hai, isliye hum 'data.items' nahi use karenge
//                 setItems(data); 
//             })
//             .catch(err => {
//                 setError('Could not fetch items. Please try again.');
//                 console.error(err);
//                 setItems([]); // Error hone par items ko khaali kar dein
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [categoryName, filters]);

//     // Debouncing: Filter badalne ke 500ms baad data fetch karega
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             fetchItems();
//         }, 500);
//         return () => clearTimeout(handler);
//     }, [filters, fetchItems]);

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-4xl font-bold mb-8 capitalize text-gray-800">{categoryName}</h1>
            
//             <div className="flex flex-col md:flex-row gap-10">
//                 {/* --- FILTER SIDEBAR --- */}
//                 <aside className="md:w-1/4 lg:w-1/5">
//                     <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
//                         <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
                        
//                         <div className="mb-6">
//                             <label htmlFor="sortBy" className="block text-sm font-medium text-gray-500 mb-2">Sort By</label>
//                             <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500">
//                                 <option value="createdAt_desc">Newest First</option>
//                                 <option value="price_asc">Price: Low to High</option>
//                                 <option value="price_desc">Price: High to Low</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-500">Price Range (per Day)</label>
//                             <div className="flex items-center gap-2 mt-2">
//                                 <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min" className="w-full p-2 border border-gray-300 rounded-md text-center" />
//                                 <span className="text-gray-400">-</span>
//                                 <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max" className="w-full p-2 border border-gray-300 rounded-md text-center" />
//                             </div>
//                         </div>
//                     </div>
//                 </aside>

//                 {/* --- ITEMS GRID --- */}
//                 <main className="flex-1">
//                     {loading ? (
//                         <div className="flex justify-center items-center h-full pt-20"><Spinner /></div>
//                     ) : error ? (
//                         <p className="text-center text-red-500">{error}</p>
//                     ) : items.length === 0 ? (
//                         <div className="text-center py-16 bg-gray-50 rounded-lg">
//                             <h3 className="text-2xl font-semibold text-gray-700">No Items Found</h3>
//                             <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {items.map(item => (
//                                 <ProductCard key={item._id} product={item} />
//                             ))}
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import itemService from '../services/itemService';
import ProductCard from '../components/item/ProductCard';
import Spinner from '../components/common/Spinner';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State to manage all the filters
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sortBy: 'createdAt_desc', // Default sort option
    });

    // Function to fetch data from the backend
 // Function to fetch data from the backend
    const fetchItems = useCallback(() => {
        setLoading(true);
        setError('');
        // Pass the categoryName and filters to the service
        itemService.getItemsByCategory(categoryName, filters)
            .then(data => {
                // --- YAHI HAI FIX ---
                // 'data' object se 'items' array ko extract karo
                setItems(data.items || []); 
            })
            .catch(err => {
                setError('Could not fetch items. Please try again.');
                console.error(err);
                setItems([]); // Clear items on error
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryName, filters]);

    // This useEffect handles debouncing for filters.
    // It calls fetchItems 500ms after the user stops changing the filters.
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchItems();
        }, 500);
        // Cleanup function to clear the timeout
        return () => clearTimeout(handler);
    }, [filters, fetchItems]);

    // Generic handler to update the filters state
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 capitalize text-gray-800">{categoryName}</h1>
            
            <div className="flex flex-col md:flex-row gap-10">
                {/* --- FILTER SIDEBAR --- */}
                <aside className="md:w-1/4 lg:w-1/5">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
                        
                        <div className="mb-6">
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-500 mb-2">Sort By</label>
                            <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500">
                                <option value="createdAt_desc">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Price Range (per Day)</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min" className="w-full p-2 border border-gray-300 rounded-md text-center" />
                                <span className="text-gray-400">-</span>
                                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max" className="w-full p-2 border border-gray-300 rounded-md text-center" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- ITEMS GRID --- */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-full pt-20"><Spinner /></div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : items.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-700">No Items Found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map(item => (
                                <ProductCard key={item._id} product={item} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CategoryPage;