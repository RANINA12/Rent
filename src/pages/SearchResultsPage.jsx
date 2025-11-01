import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

// Ek basic card component items ko display karne ke liye
const ItemCard = ({ item }) => (
    <Link to={`/item/${item._id}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
        <div className="relative overflow-hidden aspect-square">
            <img 
                src={item.images[0]?.url || 'https://placehold.co/300x300?text=Item'} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-4">
            <p className="text-xs text-gray-500 uppercase">{item.category}</p>
            <h3 className="font-semibold text-gray-800 truncate mt-1">{item.name}</h3>
        </div>
    </Link>
);


const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [results, setResults] = useState({ items: [], users: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/search?q=${query}`);
                setResults(data);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setResults({ items: [], users: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return <div className="text-center py-20">Loading search results...</div>;
    }

    const hasResults = results.items.length > 0 || results.users.length > 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600 mb-8">
                Showing results for: <span className="font-semibold text-teal-600">"{query}"</span>
            </p>

            {hasResults ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.items.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700">No Results Found</h2>
                    <p className="text-gray-500 mt-2">Sorry, we couldn't find any items matching your search for "{query}".</p>
                    <Link to="/" className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-600">
                        Go Back to Homepage
                    </Link>
                </div>
            )}
        </div>
    );
};

// Yeh line zaroori hai. Iske bina error aata hai.
export default SearchResultsPage;