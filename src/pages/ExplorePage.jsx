import React, { useState, useEffect, useCallback } from 'react';
import itemService from '../services/itemService.jsx';
import ProductCard from '../components/item/ProductCard.jsx';
import Spinner from '../components/common/Spinner.jsx';

const ExplorePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sortBy: 'createdAt_desc',
    });

    const fetchAllItems = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const apiFilters = {
                minPrice: filters.minPrice || undefined,
                maxPrice: filters.maxPrice || undefined,
                sortBy: filters.sortBy,
            };
            const data = await itemService.getItems(apiFilters);
            setItems(data.items);
        } catch (err) {
            setError('Could not fetch products. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        // Debounce: API call ko optimize karne ke liye
        const handler = setTimeout(() => {
            fetchAllItems();
        }, 500);
        return () => clearTimeout(handler);
    }, [filters, fetchAllItems]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Explore All Products</h1>
            <div className="flex flex-col md:flex-row gap-10">
                {/* --- Filter Sidebar --- */}
                <aside className="md:w-1/4 lg:w-1/5">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
                        {/* Sort By */}
                        <div className="mb-6">
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-500 mb-2">Sort By</label>
                            <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="mt-1 block w-full p-2.5 border rounded-md">
                                <option value="createdAt_desc">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Price Range</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min" className="w-full p-2 border rounded-md text-center" />
                                <span className="text-gray-400">-</span>
                                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max" className="w-full p-2 border rounded-md text-center" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Items Grid --- */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex justify-center pt-20"><Spinner /></div>
                    ) : error ? (
                        <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
                    ) : items.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-700">No Items Found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map(item => <ProductCard key={item._id} product={item} />)}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExplorePage;
