import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import CitySelectorModal from './CitySelectorModal';
import axios from 'axios';

const Icon = ({ name, className }) => {
    const icons = {
        'MapPin': <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
        'ChevronDown': <path d="m6 9 6 6 6-6" />,
        'Search': <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
        'User': <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        'LogOut': <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></>,
        'Bell': <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
        'Shield': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        'TrendingUp': <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />,
        'Grid': <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
        'Clock': <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    };
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
};

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const socket = useSocket();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Indore');
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [liveResults, setLiveResults] = useState({ users: [], items: [] });
    const [popularResults, setPopularResults] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setLiveResults({ users: [], items: [] });
            return;
        }
        const fetchLiveResults = async () => {
            try {
                const { data } = await axios.get(`/api/search?q=${searchQuery}`);
                setLiveResults(data);
            } catch (error) { console.error("Live search failed:", error); }
        };
        const timerId = setTimeout(fetchLiveResults, 300);
        return () => clearTimeout(timerId);
    }, [searchQuery]);

    const handleSearchFocus = async () => {
        setDropdownVisible(true);
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(storedSearches);

        if (!popularResults && searchQuery.trim() === '') {
            try {
                const { data } = await axios.get('/api/search/popular');
                setPopularResults(data);
            } catch (error) {
                console.error("Failed to fetch popular results:", error);
            }
        }
    };

    const onResultClick = () => {
        setDropdownVisible(false);
        setSearchQuery('');
    };

    const saveSearchTerm = (term) => {
        if (!term) return;
        let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        searches = searches.filter(s => s.toLowerCase() !== term.toLowerCase());
        searches.unshift(term);
        localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 5)));
    };

    const executeSearch = (term) => {
        const cleanedTerm = term.trim();
        if (cleanedTerm) {
            saveSearchTerm(cleanedTerm);
            onResultClick();
            navigate(`/search?q=${cleanedTerm}`);
        }
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            executeSearch(searchQuery);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('getNotification', (data) => setNotifications((prev) => [data, ...prev]));
            return () => socket.off('getNotification');
        }
    }, [socket]);

    const handleLogout = () => { logout(); navigate('/login'); };
    const handleNotificationClick = (notification) => {
        setIsNotificationOpen(false);
        if (notification.type === 'new_request') navigate('/profile/incoming-requests');
        else if (notification.type === 'status_update') navigate('/profile/rentals');
    };

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Left Section */}
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-3xl font-bold text-teal-600">RentSmart</Link>
                            <NavLink to="/blog" className="hidden lg:block text-gray-700 font-semibold hover:text-teal-600">Blog</NavLink>
                            <div className="h-8 border-l border-gray-200"></div>
                            <div onClick={() => setIsModalOpen(true)} className="hidden md:flex items-center space-x-2 text-gray-700 cursor-pointer group">
                                <Icon name="MapPin" className="h-5 w-5 text-gray-500 group-hover:text-teal-600" />
                                <span className="font-medium">{selectedCity}</span>
                                <Icon name="ChevronDown" className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>

                        {/* Center Section: Search Bar */}
                        <div className="flex-1 max-w-2xl hidden lg:block">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <Icon name="Search" className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products (e.g. Sofa, TV...)"
                                    className="w-full py-3 pl-12 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={handleSearchFocus}
                                    onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
                                    onKeyDown={handleSearchSubmit}
                                />
                                {isDropdownVisible && (
                                    <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl z-50 border max-h-[70vh] overflow-y-auto p-4">
                                        {searchQuery.trim().length > 1 ? (
                                            <div>
                                                {liveResults.items.length > 0 ? (
                                                    <div className="py-2">
                                                        <h5 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Products</h5>
                                                        {liveResults.items.map(item => (
                                                            <Link key={item._id} to={`/item/${item._id}`} onClick={onResultClick} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                                                                <img src={item.images[0]?.url || 'https://placehold.co/40x40?text=I'} alt={item.name} className="h-10 w-10 rounded-md mr-4 object-cover" />
                                                                <span className="font-semibold">{item.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">No products found.</div>
                                                )}
                                            </div>
                                        ) : (
                                            popularResults ? (
                                                <div className="space-y-6">
                                                    {recentSearches.length > 0 && (
                                                        <div>
                                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Icon name="Clock" className="w-5 h-5 mr-2 text-teal-500" /> Recent Searches</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {recentSearches.map((term, index) => (
                                                                    <button key={index} onMouseDown={() => executeSearch(term)} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-teal-100 hover:text-teal-800 transition-colors">
                                                                        {term}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Icon name="TrendingUp" className="w-5 h-5 mr-2 text-teal-500" /> Popular Searches</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {popularResults.popularSearches.map(item => (
                                                                <button key={item.name} onMouseDown={() => executeSearch(item.name)} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-teal-100 hover:text-teal-800 transition-colors">
                                                                    {item.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 mb-3">Top Selling Products</h4>
                                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                            {popularResults.topProducts.map(item => (
                                                                <Link to={`/item/${item._id}`} key={item._id} onClick={onResultClick} className="group text-center">
                                                                    <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square group-hover:shadow-md transition-shadow">
                                                                        <img src={item.images[0]?.url || 'https://placehold.co/100x100?text=P'} alt={item.name} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <p className="text-xs font-semibold text-gray-600 truncate group-hover:text-teal-600">{item.name}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Icon name="Grid" className="w-5 h-5 mr-2 text-teal-500" /> Featured Categories</h4>
                                                        <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
                                                            {popularResults.featuredCategories.map(cat => (
                                                                <button key={cat.name} onMouseDown={() => executeSearch(cat.name)} className="bg-gray-100 text-gray-700 p-2 rounded-md text-sm font-medium hover:bg-teal-100 hover:text-teal-800 transition-colors text-center">
                                                                    {cat.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center p-4">Loading...</div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    {user.isAdmin && (
                                        <NavLink to="/admin" className="flex items-center space-x-2 text-red-600 font-semibold hover:text-red-800">
                                            <Icon name="Shield" className="h-6 w-6" />
                                            <span className='hidden md:inline'>Admin Panel</span>
                                        </NavLink>
                                    )}
                                    <div className="relative">
                                        <button onClick={() => setIsNotificationOpen(p => !p)} className="relative text-gray-600 hover:text-teal-600">
                                            <Icon name="Bell" className="h-6 w-6" />
                                            {notifications.length > 0 && (
                                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                                    {notifications.length}
                                                </span>
                                            )}
                                        </button>
                                        {isNotificationOpen && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border">
                                                <div className="p-3 font-bold border-b">Notifications</div>
                                                <ul className="py-1 max-h-80 overflow-y-auto">
                                                    {notifications.length > 0 ? (
                                                        notifications.map((n, index) => (
                                                            <li key={index} onClick={() => handleNotificationClick(n)} className="px-4 py-3 border-b text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{n.message}</li>
                                                        ))
                                                    ) : (
                                                        <li className="px-4 py-3 text-sm text-gray-500">No new notifications</li>
                                                    )}
                                                </ul>
                                                {notifications.length > 0 && (
                                                    <button onClick={() => { setNotifications([]); setIsNotificationOpen(false); }} className="w-full text-center py-2 text-sm text-teal-600 font-semibold hover:bg-gray-50 rounded-b-lg">Clear All</button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-8 border-l border-gray-200"></div>
                                    <Link to="/profile" className="flex items-center space-x-2 group">
                                        <Icon name="User" className="h-6 w-6 text-gray-500 group-hover:text-teal-600" />
                                        <span className="font-semibold text-gray-700 hidden sm:block group-hover:text-teal-600">{user.name}</span>
                                    </Link>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-red-600" title="Logout">
                                        <Icon name="LogOut" className="h-6 w-6" />
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="bg-teal-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-teal-600">Login / Signup</Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isModalOpen && <CitySelectorModal setSelectedCity={setSelectedCity} closeModal={() => setIsModalOpen(false)} />}
        </>
    );
};

export default Navbar;

