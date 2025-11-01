// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams(); // URL se item ki ID nikalein
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [mainImage, setMainImage] = useState('');

//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 setLoading(true);
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//                 if (data.images && data.images.length > 0) {
//                     setMainImage(data.images[0].url);
//                 }
//             } catch (err) {
//                 setError('Could not load item details.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     if (loading) {
//         return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     }

//     if (error) {
//         return <p className="text-center text-red-500 mt-10">{error}</p>;
//     }

//     if (!item) {
//         return <p className="text-center mt-10">Item not found.</p>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                
//                 {/* --- Left Side: Image Gallery (Takes 3 columns on large screens) --- */}
//                 <div className="lg:col-span-3">
//                     <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-lg">
//                         <img 
//                             src={mainImage || 'https://placehold.co/800x600'} 
//                             alt={item.name}
//                             className="w-full h-[500px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//                         />
//                     </div>
//                     <div className="flex space-x-2">
//                         {item.images.map((img, index) => (
//                             <div 
//                                 key={index} 
//                                 className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img.url ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                 onClick={() => setMainImage(img.url)}
//                             >
//                                 <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* --- Right Side: Item & Owner Details (Takes 2 columns on large screens) --- */}
//                 <div className="lg:col-span-2">
//                     <div className="bg-white p-6 rounded-lg shadow-lg">
//                         <p className="text-teal-600 font-semibold capitalize">{item.category}</p>
//                         <h1 className="text-4xl font-bold text-gray-800 mt-1">{item.name}</h1>
                        
//                         <p className="text-4xl font-bold text-gray-900 my-6">
//                             ₹{item.price}
//                             <span className="text-lg font-normal text-gray-500">/{item.listingType === 'rent' ? 'day' : ''}</span>
//                         </p>

//                         <button className="w-full mt-4 bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-lg">
//                             Rent Now
//                         </button>
//                     </div>

//                     {/* --- Owner Details Section --- */}
//                     <div className="mt-8">
//                         <h3 className="font-bold text-lg mb-4 text-gray-700">Owner Information</h3>
//                         <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//                             <img 
//                                 src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                 alt={item.user.name}
//                                 className="w-16 h-16 rounded-full object-cover border-2 border-teal-200"
//                             />
//                             <div>
//                                 <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                 <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                             </div>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
            
//             {/* --- Full Description Section --- */}
//             <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">About this item</h2>
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//change 2

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text }) => (
//     <div className="flex items-center gap-2 text-sm text-gray-600">
//         <span className="text-teal-500">{icon}</span>
//         {text}
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0); // Image slideshow ke liye

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer); // Cleanup
//         }
//     }, [item]);

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
//                     {/* --- Left Side: Image Gallery --- */}
//                     <div>
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- Right Side: Item & Owner Details --- */}
//                     <div>
//                         <p className="text-teal-600 font-semibold capitalize">{item.category}</p>
//                         <h1 className="text-4xl font-bold text-gray-800 mt-1">{item.name}</h1>
                        
//                         <div className="my-6">
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>

//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                              <p className="text-4xl font-bold text-gray-900 mb-6">
//                                 ₹{item.price}
//                                 <span className="text-lg font-normal text-gray-500">/{item.listingType === 'rent' ? 'day' : ''}</span>
//                             </p>
//                             <button className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-lg">
//                                 Rent Now
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="mt-8">
//                             <div className="bg-white p-4 rounded-lg shadow-lg">
//                                 <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                     <img 
//                                         src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                         alt={item.user.name}
//                                         className="w-16 h-16 rounded-full object-cover"
//                                     />
//                                     <div>
//                                         <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                         <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                     </div>
//                                 </Link>
//                                 <div className="border-t my-4"></div>
//                                 <div className="space-y-2">
//                                     {item.user.verification?.status === 'verified' ? (
//                                         <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                     ) : (
//                                         <FeatureIcon icon="⏳" text="KYC Pending" />
//                                     )}
//                                     <FeatureIcon icon="📞" text={item.user.phone} />
//                                     <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//chnage 3

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text }) => (
//     <div className="flex items-center gap-2 text-sm text-gray-600">
//         <span className="text-teal-500">{icon}</span>
//         {text}
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
//                     {/* --- Left Side: Image Gallery --- */}
//                     <div>
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- Right Side: Item & Owner Details --- */}
//                     <div>
//                         <p className="text-teal-600 font-semibold capitalize">{item.category}</p>
//                         <h1 className="text-4xl font-bold text-gray-800 mt-1">{item.name}</h1>
                        
//                         <div className="my-6">
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>

//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                              <p className="text-4xl font-bold text-gray-900 mb-6">
//                                 ₹{item.price}
//                                 <span className="text-lg font-normal text-gray-500">/{item.listingType === 'rent' ? 'day' : ''}</span>
//                             </p>
//                             <button className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-lg">
//                                 Rent Now
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="mt-8">
//                             <div className="bg-white p-4 rounded-lg shadow-lg">
//                                 <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                     <img 
//                                         src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                         alt={item.user.name}
//                                         className="w-16 h-16 rounded-full object-cover"
//                                     />
//                                     <div>
//                                         <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                         <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                     </div>
//                                 </Link>
//                                 <div className="border-t my-4"></div>
//                                 <div className="space-y-2">
//                                     {item.user.verification?.status === 'verified' ? (
//                                         <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                     ) : (
//                                         <FeatureIcon icon="⏳" text="KYC Pending" />
//                                     )}
//                                     {/* Phone number yahan se hata diya hai 👇 */}
//                                     <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//chnage 4

// 


//chnage 5

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // Automatic Image Slideshow Logic
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // Real-time Price Calculation Logic
//     useEffect(() => {
//         if (startDate && endDate && item?.price) {
//             const start = new Date(startDate);
//             const end = new Date(endDate);
//             if (end > start) {
//                 const diffTime = Math.abs(end - start);
//                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Kam se kam 1 din
//                 setTotalPrice(diffDays * item.price);
//             } else {
//                 setTotalPrice(0);
//             }
//         }
//     }, [startDate, endDate, item]);

//     const maskPhoneNumber = (phone = '') => {
//         return phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     };

//     const handleCallClick = () => {
//         alert('To contact the owner, please call our secure helpline at 1800-123-4567. We will connect your call privately without sharing your number.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- Right Side: Item & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <p className="text-teal-600 font-semibold capitalize">{item.category}</p>
//                             <h1 className="text-4xl font-bold text-gray-800 mt-1">{item.name}</h1>
//                             <p className="text-gray-700 leading-relaxed mt-4">{item.description}</p>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Dates</h3>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="text-sm">From</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm">To</label>
//                                     <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? (
//                                     <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                 ) : (
//                                     <FeatureIcon icon="⏳" text="KYC Pending" />
//                                 )}
//                                 <FeatureIcon 
//                                     icon="📞" 
//                                     text={maskPhoneNumber(item.user.phone)} 
//                                     onClick={handleCallClick} 
//                                 />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//change 6

// 

//change 6


//chnage 7

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [mainImage, setMainImage] = useState('');
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//                 if (data.images && data.images.length > 0) {
//                     setMainImage(data.images[0].url);
//                 }
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // Real-time End Date & Price Calculation Logic
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     const handleDiscountRequest = () => {
//         alert('Your request for a discount has been sent to the owner. They will contact you shortly if they accept.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img.url ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setMainImage(img.url)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* --- Naya "Product Specifications" Section --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//chnage 8

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // --- Real-time End Date & Price Calculation Logic ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     const maskPhoneNumber = (phone = '') => {
//         return phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     };

//     const handleCallClick = () => {
//         alert('To contact the owner, please call our secure helpline at 1800-123-4567. We will connect your call privately without sharing your number.');
//     };
    
//     const handleDiscountRequest = () => {
//         alert('Your request for a discount has been sent to the owner. They will contact you shortly if they accept.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* --- Product Specifications Section --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? (
//                                     <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                 ) : (
//                                     <FeatureIcon icon="⏳" text="KYC Pending" />
//                                 )}
//                                 <FeatureIcon 
//                                     icon="📞" 
//                                     text={maskPhoneNumber(item.user.phone)} 
//                                     onClick={handleCallClick} 
//                                 />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//change 9

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // --- Real-time End Date & Price Calculation Logic ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     const maskPhoneNumber = (phone = '') => {
//         return phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     };

//     const handleCallClick = () => {
//         alert('To contact the owner, please call our secure helpline at 1800-123-4567. We will connect your call privately without sharing your number.');
//     };
    
//     const handleDiscountRequest = () => {
//         alert('Your request for a discount has been sent to the owner. They will contact you shortly if they accept.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* --- Product Specifications Section --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? (
//                                     <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                 ) : (
//                                     <FeatureIcon icon="⏳" text="KYC Pending" />
//                                 )}
//                                 <FeatureIcon 
//                                     icon="📞" 
//                                     text={maskPhoneNumber(item.user.phone)} 
//                                     onClick={handleCallClick} 
//                                 />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//change 10

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // --- Real-time End Date & Price Calculation Logic ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     const maskPhoneNumber = (phone = '') => {
//         return phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     };

//     const handleCallClick = () => {
//         alert('To contact the owner, please call our secure helpline at 1800-123-4567. We will connect your call privately without sharing your number.');
//     };
    
//     const handleDiscountRequest = () => {
//         alert('Your request for a discount has been sent to the owner. They will contact you shortly if they accept.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* --- Product Specifications Section --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? (
//                                     <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                 ) : (
//                                     <FeatureIcon icon="⏳" text="KYC Pending" />
//                                 )}
//                                 <FeatureIcon 
//                                     icon="📞" 
//                                     text={maskPhoneNumber(item.user.phone)} 
//                                     onClick={handleCallClick} 
//                                 />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//change 11
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Har 3 second mein image badlegi
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // --- Real-time End Date & Price Calculation Logic ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     const maskPhoneNumber = (phone = '') => {
//         return phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     };

//     const handleCallClick = () => {
//         alert('To contact the owner, please call our secure helpline at 1800-123-4567. We will connect your call privately without sharing your number.');
//     };
    
//     const handleDiscountRequest = () => {
//         alert('Your request for a discount has been sent to the owner. They will contact you shortly if they accept.');
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img 
//                                 src={mainImage || 'https://placehold.co/800x600'} 
//                                 alt={item.name}
//                                 className="w-full h-[500px] object-cover"
//                             />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div 
//                                     key={index} 
//                                     className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`}
//                                     onClick={() => setCurrentImageIndex(index)}
//                                 >
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* --- Product Specifications Section --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                         </div>

//                         {/* --- Interactive Rental Calculator --- */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* --- Owner "Trust Card" --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img 
//                                     src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} 
//                                     alt={item.user.name}
//                                     className="w-16 h-16 rounded-full object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? (
//                                     <FeatureIcon icon="✔️" text="KYC Verified Owner" />
//                                 ) : (
//                                     <FeatureIcon icon="⏳" text="KYC Pending" />
//                                 )}
//                                 <FeatureIcon 
//                                     icon="📞" 
//                                     text={maskPhoneNumber(item.user.phone)} 
//                                     onClick={handleCallClick} 
//                                 />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//chnage 11

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';
// import { toast } from 'react-toastify';

// // Chhote-chhote icons ke liye component
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// const ItemDetailsPage = () => {
//     const { id: itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ke liye states
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching Logic ---
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // --- Automatic Image Slideshow Logic ---
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000);
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // --- Real-time End Date & Price Calculation Logic ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
            
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);

//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Helper Functions ---
//     const maskPhoneNumber = (phone = '') => phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const handleCallClick = () => alert('To contact the owner, please call our secure helpline at 1800-123-4567.');
//     const handleDiscountRequest = () => alert('Your request for a discount has been sent to the owner.');

//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             navigate('/login');
//             return;
//         }
//         if (!startDate) {
//             toast.error("Please select a start date.");
//             return;
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData, user.token);
//             toast.success("Rental request sent successfully!");
//             navigate('/profile/rentals');
//         } catch (error) {
//             toast.error("Could not send rental request.");
//         }
//     };

//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img src={mainImage || 'https://placehold.co/800x600'} alt={item.name} className="w-full h-[500px] object-cover" />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start">
//                                 <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">
//                                     ₹{item.price}<span className="text-sm font-normal text-gray-500">/{item.listingType === 'rent' ? 'day' : ''}</span>
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice}</p>
//                             </div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} alt={item.user.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? ( <FeatureIcon icon="✔️" text="KYC Verified Owner" /> ) : ( <FeatureIcon icon="⏳" text="KYC Pending" /> )}
//                                 <FeatureIcon icon="📞" text={maskPhoneNumber(item.user.phone)} onClick={handleCallClick} />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//chnage 12

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import itemService from '../services/itemService.jsx';
// import rentalService from '../services/rentalService.jsx';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import Spinner from '../components/common/Spinner.jsx';
// import { toast } from 'react-toastify';

// // --- Reusable UI Components ---

// // A small component for displaying feature icons consistently
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div 
//         className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`}
//         onClick={onClick}
//     >
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// // --- Main Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks Initialization ---
//     const { id: itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     // --- State Management ---
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // State for the Rental Calculator
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Side Effects (useEffect Hooks) ---

//     // Effect to fetch item data when the component mounts or itemId changes
//     useEffect(() => {
//         const fetchItem = async () => {
//             try {
//                 const data = await itemService.getItemById(itemId);
//                 setItem(data);
//             } catch (err) {
//                 setError('Could not load item details. It may have been removed.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItem();
//     }, [itemId]);

//     // Effect for the automatic image slideshow
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000); // Change image every 3 seconds
//             return () => clearInterval(timer); // Cleanup timer on unmount
//         }
//     }, [item]);

//     // Effect for real-time rental period and price calculation
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return; // Invalid date check

//             let end = new Date(start);
            
//             // Calculate end date based on duration type
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);

//             // Calculate total price based on the number of days
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers & Helper Functions ---

//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             navigate('/login');
//             return;
//         }
//         if (!startDate) {
//             toast.error("Please select a start date.");
//             return;
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData, user.token);
//             toast.success("Rental request sent successfully!");
//             navigate('/profile/rentals');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not send rental request.");
//         }
//     };

//     const maskPhoneNumber = (phone = '') => phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const handleCallClick = () => toast.info('To contact the owner, please call our secure helpline at 1800-123-4567.');
//     const handleDiscountRequest = () => toast.info('Your request for a discount has been sent to the owner.');

//     // --- Conditional Rendering ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     // --- JSX Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image Gallery & Details --- */}
//                     <div className="lg:col-span-3">
//                         <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                             <img src={mainImage || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                         </div>
//                         <div className="flex space-x-2 mb-8">
//                             {item.images.map((img, index) => (
//                                 <div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                     <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start">
//                                 <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">
//                                     ₹{item.price}<span className="text-sm font-normal text-gray-500">/{item.listingType === 'rent' ? 'day' : ''}</span>
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Rental Calculator Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">End Date (Auto-calculated)</label>
//                                     <input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly />
//                                 </div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-600">Total Rent:</p>
//                                 <p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
//                             </div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">
//                                 Send Rental Request
//                             </button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">
//                                 Request for a discount
//                             </button>
//                         </div>

//                         {/* Owner Details Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} alt={item.user.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? ( <FeatureIcon icon="✔️" text="KYC Verified Owner" /> ) : ( <FeatureIcon icon="⏳" text="KYC Pending" /> )}
//                                 <FeatureIcon icon="📞" text={maskPhoneNumber(item.user.phone)} onClick={handleCallClick} />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//change 13

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import itemService from '../services/itemService.jsx';
// import rentalService from '../services/rentalService.jsx';
// import reviewService from '../services/reviewService.jsx';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import Spinner from '../components/common/Spinner.jsx';
// import { toast } from 'react-toastify';

// // --- Reusable UI Components ---

// // Star rating dikhane ke liye
// const StarRatingDisplay = ({ rating }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// // Feature icons ke liye
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// // --- Main Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks Initialization ---
//     const { id: itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     // --- State Management ---
//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Side Effects (useEffect Hooks) ---

//     // Effect to fetch item and reviews data
//     useEffect(() => {
//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const itemData = await itemService.getItemById(itemId);
//                 const reviewsData = await reviewService.getItemReviews(itemId);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Could not load item details. It may have been removed.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // Effect for the automatic image slideshow
//     useEffect(() => {
//         if (item && item.images.length > 1) {
//             const timer = setInterval(() => {
//                 setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
//             }, 3000);
//             return () => clearInterval(timer);
//         }
//     }, [item]);

//     // Effect for real-time rental calculation
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.price) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;
//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
//             else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.price);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers & Helper Functions ---

//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             navigate('/login');
//             return;
//         }
//         if (!startDate) {
//             toast.error("Please select a start date.");
//             return;
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData, user.token);
//             toast.success("Rental request sent successfully!");
//             navigate('/profile/rentals');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not send rental request.");
//         }
//     };

//     const maskPhoneNumber = (phone = '') => phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const handleCallClick = () => toast.info('To contact the owner, please call our secure helpline at 1800-123-4567.');
//     const handleDiscountRequest = () => toast.info('Your request for a discount has been sent to the owner.');

//     // --- Conditional Rendering ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     const mainImage = item.images[currentImageIndex]?.url;

//     // --- JSX Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Side: Image, Specs, and Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg"><img src={mainImage || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" /></div>
//                             <div className="flex space-x-2">{item.images.map((img, index) => (<div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}><img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" /></div>))}</div>
//                         </div>

//                         {/* Product Specifications */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                         </div>

//                         {/* Customer Reviews Section */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user.avatar?.url || `https://ui-avatars.com/api/?name=${review.user.name.replace(' ', '+')}`} alt={review.user.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No reviews yet for this item.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Side: Rental & Owner Details --- */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Rental Calculator Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option><option value="years">Years</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date (Auto-calculated)</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                             <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">Request for a discount</button>
//                         </div>

//                         {/* Owner Details Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
//                                 <img src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} alt={item.user.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 {item.user.verification?.status === 'verified' ? ( <FeatureIcon icon="✔️" text="KYC Verified Owner" /> ) : ( <FeatureIcon icon="⏳" text="KYC Pending" /> )}
//                                 <FeatureIcon icon="📞" text={maskPhoneNumber(item.user.phone)} onClick={handleCallClick} />
//                                 <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//chnage 14

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // --- Yahan badlaav kiya gaya hai ---
// // Sahi import paths aapke folder structure ke anusaar
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Chhote Helper Components ---

// const StarRatingDisplay = ({ rating }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );


// const ItemDetailsPage = () => {
//     // --- Hooks & State ---
//     const { itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const itemData = await itemService.getItemById(itemId);
//                 const reviewsData = await reviewService.getItemReviews(itemId);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Could not load item details. It may have been removed.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
            
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Please select a start date.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData, user.token);
//             toast.success("Rental request sent successfully!");
//             navigate('/profile/rentals');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not send rental request.");
//         }
//     };

//     // --- Loading and Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
//     if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//     if (!item) return <p className="text-center mt-10">Item not found.</p>;

//     // --- JSX Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex space-x-2">
//                                 {item.images.map((img, index) => (
//                                     <div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6"><StarRatingDisplay rating={item.rating} /><span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span></div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3"><p className="font-semibold text-gray-800">{review.user?.name}</p><StarRatingDisplay rating={review.rating} /></div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No reviews yet for this item.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* --- Owner Card --- */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/profile/${item.owner?._id}`} className="flex items-center gap-4">
//                                 <img src={item.owner?.avatar?.url || `https://ui-avatars.com/api/?name=${item.owner?.name.replace(' ', '+')}`} alt={item.owner?.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.owner?.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.owner?.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={item.owner?.verification?.status === 'verified' ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={item.owner?.phone ? item.owner.phone.substring(0, 6) + 'XXXX' : 'Not Available'} onClick={() => toast.info('Contact owner via our secure helpline.')} />
//                                 <FeatureIcon icon="📍" text={`${item.owner?.address?.city}, ${item.owner?.address?.state}`} />
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//chnage 15

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Make sure your service paths are correct according to your folder structure
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Reusable UI Components ---

// const StarRatingDisplay = ({ rating = 0 }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );

// // --- Main Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks & State ---
//     const { itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 // Fetch both item and reviews at the same time
//                 const [itemData, reviewsData] = await Promise.all([
//                     itemService.getItemById(itemId),
//                     reviewService.getItemReviews(itemId)
//                 ]);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Could not load item details. It may have been removed.');
//                 console.error("Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration, 10));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration, 10));
            
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Please select a start date.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData); // Assuming token is handled by service
//             toast.success("Rental request sent successfully!");
//             navigate('/dashboard/my-rentals');
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Could not send rental request.");
//         }
//     };

//     // --- Loading and Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    
//     if (error) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center text-red-500">{error}</p>
//         </div>
//     );

//     if (!item) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center mt-10">Item not found.</p>
//         </div>
//     );

//     // --- JSX Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex space-x-2">
//                                 {item.images.map((img, index) => (
//                                     <div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user?.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No reviews yet for this item.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info (Sticky) --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* Owner Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/public-profile/${item.owner?._id}`} className="flex items-center gap-4">
//                                 <img src={item.owner?.avatar?.url || `https://ui-avatars.com/api/?name=${item.owner?.name.replace(' ', '+')}`} alt={item.owner?.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{item.owner?.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{item.owner?.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={item.owner?.isVerified ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={item.owner?.phone ? item.owner.phone.substring(0, 6) + 'XXXX' : 'Not Available'} onClick={() => toast.info('Contact owner via our secure helpline.')} />
//                                 <FeatureIcon icon="📍" text={`${item.owner?.address?.city}, ${item.owner?.address?.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;

//change 16

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Make sure these import paths are correct according to your folder structure
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Reusable UI Components ---

// const StarRatingDisplay = ({ rating = 0 }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );


// const ItemDetailsPage = () => {
//     // --- Hooks & State ---
//     const { id: itemId } = useParams(); // <-- YAHAN FIX KIYA GAYA HAI
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching ---
//     useEffect(() => {
//         // Ensure itemId exists before fetching
//         if (!itemId) {
//             setError("Item ID is missing from the URL.");
//             setLoading(false);
//             return;
//         }

//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const [itemData, reviewsData] = await Promise.all([
//                     itemService.getItemById(itemId),
//                     reviewService.getItemReviews(itemId)
//                 ]);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Could not load item details. It may have been removed.');
//                 console.error("Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration, 10));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration, 10));
            
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Please log in to rent an item.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Please select a start date.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData);
//             toast.success("Rental request sent successfully!");
//             navigate('/dashboard/my-rentals');
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Could not send rental request.");
//         }
//     };

//     // --- Loading and Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    
//     if (error) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center text-red-500 text-lg">{error}</p>
//         </div>
//     );

//     if (!item) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center mt-10 text-gray-600">Item not found.</p>
//         </div>
//     );
    
//     // --- Safely access nested data ---
//     const owner = item.owner || {};
//     const ownerAddress = owner.address || {};

//     // --- JSX Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images?.[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {item.images?.map((img, index) => (
//                                     <div key={img._id || index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span className="capitalize">{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user?.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No reviews yet for this item.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info (Sticky) --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value > 0 ? e.target.value : 1)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* Owner Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/public-profile/${owner._id}`} className="flex items-center gap-4">
//                                 <img src={owner.avatar?.url || `https://ui-avatars.com/api/?name=${owner.name?.replace(' ', '+')}`} alt={owner.name} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{owner.name}</p>
//                                     <p className="text-sm text-gray-600 italic">"{owner.bio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={owner.isVerified ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={owner.phone ? owner.phone.substring(0, 6) + 'XXXX' : 'Not Available'} onClick={() => toast.info('Contact owner via our secure helpline.')} />
//                                 <FeatureIcon icon="📍" text={`${ownerAddress.city}, ${ownerAddress.state}`} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//change 17

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Dhyan dein: In paths ko apne project ke folder structure ke anusaar check kar lein
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Chhote Helper Components (File ke andar hi) ---

// // Star rating dikhane ke liye
// const StarRatingDisplay = ({ rating = 0 }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// // Feature icons ke liye
// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );


// // --- Mukhya Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks aur State Management ---
//     const { itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ka State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching (useEffect) ---
//     useEffect(() => {
//         if (!itemId) {
//             setError("Item ID URL mein nahi mila.");
//             setLoading(false);
//             return;
//         }

//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const [itemData, reviewsData] = await Promise.all([
//                     itemService.getItemById(itemId),
//                     reviewService.getItemReviews(itemId)
//                 ]);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Item details load nahi ho paye. Ho sakta hai item remove ho gaya ho.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation (useEffect) ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration, 10));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration, 10));
            
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Rent karne ke liye login karein.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Kripya start date chunein.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData);
//             toast.success("Rental request safaltapoorvak bhej di gayi hai!");
//             navigate('/dashboard/my-rentals');
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Rental request nahi bhej paaye.");
//         }
//     };

//     // --- Loading aur Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    
//     if (error) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center text-red-500 text-lg">{error}</p>
//         </div>
//     );

//     if (!item) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center mt-10 text-gray-600">Item nahi mila.</p>
//         </div>
//     );
    
//     // --- Data ko surakshit access karne ke liye variables ---
//     const owner = item.user || {};
//     const ownerAddress = owner.address || {};
//     const ownerName = owner.name || 'User';
//     const ownerBio = owner.bio || 'No bio available.';
//     const ownerPhone = owner.phone ? owner.phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const ownerLocation = ownerAddress.city && ownerAddress.state ? `${ownerAddress.city}, ${ownerAddress.state}` : 'Location not available';

//     // --- JSX (Final Layout) ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images?.[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {item.images?.map((img, index) => (
//                                     <div key={img._id || index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span className="capitalize">{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user?.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">Is item ke liye abhi koi review nahi hai.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info (Sticky) --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value > 0 ? e.target.value : 1)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* Owner Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/public-profile/${owner._id}`} className="flex items-center gap-4">
//                                 <img src={owner.avatar?.url || `https://ui-avatars.com/api/?name=${ownerName.replace(' ', '+')}`} alt={ownerName} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{ownerName}</p>
//                                     <p className="text-sm text-gray-600 italic">"{ownerBio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={owner.isVerified ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={ownerPhone} onClick={() => toast.info('Owner se contact karne ke liye request bhejein.')} />
//                                 <FeatureIcon icon="📍" text={ownerLocation} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//change 18

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Sahi import paths aapke folder structure ke anusaar
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Chhote Helper Components ---

// const StarRatingDisplay = ({ rating = 0 }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );


// // --- Mukhya Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks aur State Management ---
    
//     // YAHAN BADLAV KIYA GAYA HAI -------------------------------->
//     // URL se ':id' parameter ko nikal kar 'itemId' variable mein daala gaya hai
//     const { id: itemId } = useParams(); 
//     // <----------------------------------------------------------

//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ka State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching (useEffect) ---
//     useEffect(() => {
//         if (!itemId) {
//             setError("Item ID URL mein nahi mila.");
//             setLoading(false);
//             return;
//         }

//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const [itemData, reviewsData] = await Promise.all([
//                     itemService.getItemById(itemId),
//                     reviewService.getItemReviews(itemId)
//                 ]);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Item details load nahi ho paye. Ho sakta hai item remove ho gaya ho.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation (useEffect) ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration, 10));
//             else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration, 10));
            
//             setEndDate(end.toISOString().split('T')[0]);
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Rent karne ke liye login karein.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Kripya start date chunein.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData);
//             toast.success("Rental request safaltapoorvak bhej di gayi hai!");
//             navigate('/dashboard/my-rentals');
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Rental request nahi bhej paaye.");
//         }
//     };

//     // --- Loading aur Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    
//     if (error) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center text-red-500 text-lg">{error}</p>
//         </div>
//     );

//     if (!item) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center mt-10 text-gray-600">Item nahi mila.</p>
//         </div>
//     );
    
//     // --- Data ko surakshit access karne ke liye variables ---
//     const owner = item.user || {};
//     const ownerAddress = owner.address || {};
//     const ownerName = owner.name || 'User';
//     const ownerBio = owner.bio || 'No bio available.';
//     const ownerPhone = owner.phone ? owner.phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const ownerLocation = ownerAddress.city && ownerAddress.state ? `${ownerAddress.city}, ${ownerAddress.state}` : 'Location not available';

//     // --- JSX (Final Layout) ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images?.[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {item.images?.map((img, index) => (
//                                     <div key={img._id || index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span className="capitalize">{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user?.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">Is item ke liye abhi koi review nahi hai.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info (Sticky) --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value > 0 ? e.target.value : 1)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option></select></div></div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* Owner Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/public-profile/${owner._id}`} className="flex items-center gap-4">
//                                 <img src={owner.avatar?.url || `https://ui-avatars.com/api/?name=${ownerName.replace(' ', '+')}`} alt={ownerName} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{ownerName}</p>
//                                     <p className="text-sm text-gray-600 italic">"{ownerBio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={owner.isVerified ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={ownerPhone} onClick={() => toast.info('Owner se contact karne ke liye request bhejein.')} />
//                                 <FeatureIcon icon="📍" text={ownerLocation} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//change 19

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Sahi import paths aapke folder structure ke anusaar
// import itemService from '../services/itemService';
// import rentalService from '../services/rentalService';
// import reviewService from '../services/reviewService';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // --- Chhote Helper Components ---

// const StarRatingDisplay = ({ rating = 0 }) => (
//     <div className="flex items-center">
//         {[...Array(5)].map((_, index) => (
//             <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//         ))}
//     </div>
// );

// const FeatureIcon = ({ icon, text, onClick }) => (
//     <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
//         <span className="text-teal-500 text-lg">{icon}</span>
//         <span>{text}</span>
//     </div>
// );


// // --- Mukhya Page Component ---

// const ItemDetailsPage = () => {
//     // --- Hooks aur State Management ---
//     const { id: itemId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [item, setItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // Rental Calculator ka State
//     const [startDate, setStartDate] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');
//     const [endDate, setEndDate] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     // --- Data Fetching (useEffect) ---
//     useEffect(() => {
//         if (!itemId) {
//             setError("Item ID URL mein nahi mila.");
//             setLoading(false);
//             return;
//         }

//         const fetchItemAndReviews = async () => {
//             try {
//                 setLoading(true);
//                 const [itemData, reviewsData] = await Promise.all([
//                     itemService.getItemById(itemId),
//                     reviewService.getItemReviews(itemId)
//                 ]);
//                 setItem(itemData);
//                 setReviews(reviewsData);
//             } catch (err) {
//                 setError('Item details load nahi ho paye. Ho sakta hai item remove ho gaya ho.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItemAndReviews();
//     }, [itemId]);

//     // --- Rental Price Calculation (useEffect) - THEEK KIYA GAYA ---
//     useEffect(() => {
//         if (startDate && duration > 0 && item?.pricePerDay) {
//             const start = new Date(startDate);
//             if (isNaN(start.getTime())) return;

//             let end = new Date(start);
//             // Yahan 'years' ka logic add kiya gaya hai
//             if (durationType === 'days') {
//                 end.setDate(start.getDate() + parseInt(duration, 10));
//             } else if (durationType === 'months') {
//                 end.setMonth(start.getMonth() + parseInt(duration, 10));
//             } else if (durationType === 'years') {
//                 end.setFullYear(start.getFullYear() + parseInt(duration, 10));
//             }
            
//             setEndDate(end.toISOString().split('T')[0]);
            
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
//             setTotalPrice(diffDays * item.pricePerDay);
//         } else {
//             setEndDate('');
//             setTotalPrice(0);
//         }
//     }, [startDate, duration, durationType, item]);

//     // --- Event Handlers ---
//     const handleRentalRequest = async () => {
//         if (!user) {
//             toast.error("Rent karne ke liye login karein.");
//             return navigate('/login');
//         }
//         if (!startDate) {
//             return toast.error("Kripya start date chunein.");
//         }
//         const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
//         try {
//             await rentalService.createRental(rentalData);
//             toast.success("Rental request safaltapoorvak bhej di gayi hai!");
//             navigate('/dashboard/my-rentals');
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Rental request nahi bhej paaye.");
//         }
//     };

//     // --- Loading aur Error States ---
//     if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    
//     if (error) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center text-red-500 text-lg">{error}</p>
//         </div>
//     );

//     if (!item) return (
//         <div className="flex justify-center items-center h-[50vh]">
//             <p className="text-center mt-10 text-gray-600">Item nahi mila.</p>
//         </div>
//     );
    
//     // --- Data ko surakshit access karne ke liye variables ---
//     const owner = item.user || {};
//     const ownerAddress = owner.address || {};
//     const ownerName = owner.name || 'User';
//     const ownerBio = owner.bio || 'No bio available.';
//     const ownerPhone = owner.phone ? owner.phone.substring(0, 6) + 'XXXX' : 'Not Available';
//     const ownerLocation = ownerAddress.city && ownerAddress.state ? `${ownerAddress.city}, ${ownerAddress.state}` : 'Location not available';

//     // --- JSX (Final Layout) ---
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
//                     {/* --- Left Column: Images, Specs, Reviews --- */}
//                     <div className="lg:col-span-3 space-y-8">
//                         {/* Image Gallery */}
//                         <div>
//                             <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
//                                 <img src={item.images?.[currentImageIndex]?.url || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" />
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {item.images?.map((img, index) => (
//                                     <div key={img._id || index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}>
//                                         <img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
//                             <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
//                                 <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span className="capitalize">{item.category}</span></div>
//                             </div>
//                         </div>

//                         {/* Customer Reviews */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
//                             <div className="flex items-center gap-2 mb-6">
//                                 <StarRatingDisplay rating={item.rating} />
//                                 <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
//                             </div>
//                             <div className="space-y-6">
//                                 {reviews.length > 0 ? (
//                                     reviews.map(review => (
//                                         <div key={review._id} className="border-t pt-4">
//                                             <div className="flex items-center mb-2">
//                                                 <img src={review.user?.avatar?.url || `https://ui-avatars.com/api/?name=${review.user?.name.replace(' ', '+')}`} alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
//                                                 <div className="ml-3">
//                                                     <p className="font-semibold text-gray-800">{review.user?.name}</p>
//                                                     <StarRatingDisplay rating={review.rating} />
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700">{review.comment}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">Is item ke liye abhi koi review nahi hai.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- Right Column: Rental Card & Owner Info (Sticky) --- */}
//                     <div className="lg:col-span-2 space-y-8 sticky top-28 h-fit">
//                         {/* Rental Card */}
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
//                                 <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">₹{item.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
//                             </div>
//                             <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
//                             <div className="grid grid-cols-1 gap-4">
//                                 <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
//                                 <div>
//                                     <label className="text-sm font-medium">Duration</label>
//                                     <div className="flex mt-1">
//                                         <input type="number" value={duration} onChange={e => setDuration(e.target.value > 0 ? e.target.value : 1)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                         {/* Yahan 'years' ka option add kiya gaya hai */}
//                                         <select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
//                                             <option value="days">Days</option>
//                                             <option value="months">Months</option>
//                                             <option value="years">Years</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div><label className="text-sm font-medium">End Date</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
//                             </div>
//                             <div className="border-t my-4"></div>
//                             <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
//                             <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
//                         </div>

//                         {/* Owner Card */}
//                         <div className="bg-white p-4 rounded-lg shadow-lg">
//                             <Link to={`/public-profile/${owner._id}`} className="flex items-center gap-4">
//                                 <img src={owner.avatar?.url || `https://ui-avatars.com/api/?name=${ownerName.replace(' ', '+')}`} alt={ownerName} className="w-16 h-16 rounded-full object-cover" />
//                                 <div>
//                                     <p className="font-bold text-gray-800 text-lg">{ownerName}</p>
//                                     <p className="text-sm text-gray-600 italic">"{ownerBio}"</p>
//                                 </div>
//                             </Link>
//                             <div className="border-t my-4"></div>
//                             <div className="space-y-3">
//                                 <FeatureIcon icon="✔️" text={owner.isVerified ? "KYC Verified Owner" : "KYC Pending"} />
//                                 <FeatureIcon icon="📞" text={ownerPhone} onClick={() => toast.info('Owner se contact karne ke liye request bhejein.')} />
//                                 <FeatureIcon icon="📍" text={ownerLocation} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ItemDetailsPage;


//final change

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import itemService from '../services/itemService.jsx';
import rentalService from '../services/rentalService.jsx';
import reviewService from '../services/reviewService.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import Spinner from '../components/common/Spinner.jsx';
import { toast } from 'react-toastify';

// --- Reusable UI Components ---

const StarRatingDisplay = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
            <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const FeatureIcon = ({ icon, text, onClick }) => (
    <div className={`flex items-center gap-3 text-sm text-gray-700 ${onClick ? 'cursor-pointer hover:text-teal-600' : ''}`} onClick={onClick}>
        <span className="text-teal-500 text-lg">{icon}</span>
        <span>{text}</span>
    </div>
);

// --- Main Page Component ---

const ItemDetailsPage = () => {
    const { id: itemId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState(1);
    const [durationType, setDurationType] = useState('months');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchItemAndReviews = async () => {
            try {
                setLoading(true);
                const itemData = await itemService.getItemById(itemId);
                const reviewsData = await reviewService.getItemReviews(itemId);
                setItem(itemData);
                setReviews(reviewsData);
            } catch (err) {
                setError('Could not load item details. It may have been removed.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItemAndReviews();
    }, [itemId]);

    useEffect(() => {
        if (item && item.images.length > 1) {
            const timer = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [item]);

    // [FIX 1]: Yahan item.price ko item.pricePerDay se badla gaya hai
    useEffect(() => {
        if (startDate && duration > 0 && item?.pricePerDay) {
            const start = new Date(startDate);
            if (isNaN(start.getTime())) return;
            let end = new Date(start);
            if (durationType === 'days') end.setDate(start.getDate() + parseInt(duration));
            else if (durationType === 'months') end.setMonth(start.getMonth() + parseInt(duration));
            else if (durationType === 'years') end.setFullYear(start.getFullYear() + parseInt(duration));
            setEndDate(end.toISOString().split('T')[0]);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setTotalPrice(diffDays * item.pricePerDay);
        } else {
            setEndDate('');
            setTotalPrice(0);
        }
    }, [startDate, duration, durationType, item]);

    const handleRentalRequest = async () => {
        if (!user) {
            toast.error("Please log in to rent an item.");
            navigate('/login');
            return;
        }
        if (!startDate) {
            toast.error("Please select a start date.");
            return;
        }
        const rentalData = { itemId: item._id, startDate, endDate, totalPrice };
        try {
            await rentalService.createRental(rentalData, user.token);
            toast.success("Rental request sent successfully!");
            navigate('/profile/rentals');
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not send rental request.");
        }
    };

    const maskPhoneNumber = (phone = '') => phone.length >= 10 ? phone.substring(0, 6) + 'XXXX' : 'Not Available';
    const handleCallClick = () => toast.info('To contact the owner, please call our secure helpline at 1800-123-4567.');
    const handleDiscountRequest = () => toast.info('Your request for a discount has been sent to the owner.');

    if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!item) return <p className="text-center mt-10">Item not found.</p>;

    const mainImage = item.images[currentImageIndex]?.url;

    // [FIX 2]: Universal price logic yahan bhi use ki gayi hai
    const displayPrice = item.pricePerDay || item.sellingPrice || item.price;
    const priceLabel = (item.pricePerDay || item.price) ? '/day' : '';
    const isForRent = item.listingType === 'rent';

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
                    {/* --- Left Side: Image, Specs, and Reviews --- */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Image Gallery */}
                        <div>
                            <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg"><img src={mainImage || 'https://placehold.co/800x600/E2E8F0/4A5568?text=Image'} alt={item.name} className="w-full h-[500px] object-cover" /></div>
                            <div className="flex space-x-2">{item.images.map((img, index) => (<div key={index} className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-110' : 'border-transparent hover:border-teal-300'}`} onClick={() => setCurrentImageIndex(index)}><img src={img.url} alt={`${item.name} thumbnail ${index+1}`} className="w-full h-full object-cover" /></div>))}</div>
                        </div>

                        {/* Product Specifications */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Specifications</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between"><span className="font-semibold text-gray-600">Item Age:</span><span>{item.itemAge}</span></div>
                                <div className="flex justify-between"><span className="font-semibold text-gray-600">Defects:</span><span>{item.anyDefects}</span></div>
                                <div className="flex justify-between"><span className="font-semibold text-gray-600">Category:</span><span>{item.category}</span></div>
                            </div>
                            <div className="border-t my-4"></div>
                            <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        </div>

                        {/* Customer Reviews Section */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
                            <div className="flex items-center gap-2 mb-6">
                                <StarRatingDisplay rating={item.rating} />
                                <span className="text-gray-600 text-sm">({item.numReviews} Reviews)</span>
                            </div>
                            <div className="space-y-6">
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <div key={review._id} className="border-t pt-4">
                                            <div className="flex items-center mb-2">
                                                <img src={review.user.avatar?.url || `https://ui-avatars.com/api/?name=${review.user.name.replace(' ', '+')}`} alt={review.user.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div className="ml-3">
                                                    <p className="font-semibold text-gray-800">{review.user.name}</p>
                                                    <StarRatingDisplay rating={review.rating} />
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No reviews yet for this item.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Side: Rental & Owner Details --- */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Rental Calculator Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-4xl font-bold text-gray-800 capitalize">{item.name}</h1>
                                {/* [FIX 3]: Yahan par bhi 'displayPrice' ka istemal kiya gaya hai */}
                                <p className="text-lg font-bold text-teal-600 whitespace-nowrap mt-2">
                                    ₹{displayPrice?.toLocaleString()}
                                    <span className="text-sm font-normal text-gray-500">{priceLabel}</span>
                                </p>
                            </div>

                            {isForRent ? (
                                <>
                                    <h3 className="font-bold text-lg mb-4 text-gray-700">Select Rental Period</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div><label className="text-sm font-medium">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md mt-1"/></div>
                                        <div><label className="text-sm font-medium">Duration</label><div className="flex mt-1"><input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" /><select value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option><option value="years">Years</option></select></div></div>
                                        <div><label className="text-sm font-medium">End Date (Auto-calculated)</label><input type="date" value={endDate} className="w-full p-2 border rounded-md mt-1 bg-gray-200" readOnly /></div>
                                    </div>
                                    <div className="border-t my-4"></div>
                                    <div className="flex justify-between items-center"><p className="text-gray-600">Total Rent:</p><p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p></div>
                                    <button onClick={handleRentalRequest} className="w-full mt-4 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 text-lg transition-colors">Send Rental Request</button>
                                    <button onClick={handleDiscountRequest} className="w-full mt-2 text-sm text-teal-600 hover:underline">Request for a discount</button>
                                </>
                            ) : (
                                <button className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 text-lg transition-colors">
                                    Buy Now for ₹{displayPrice?.toLocaleString()}
                                </button>
                            )}
                        </div>

                        {/* Owner Details Card */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <Link to={`/profile/${item.user._id}`} className="flex items-center gap-4">
                                <img src={item.user.avatar?.url || `https://ui-avatars.com/api/?name=${item.user.name.replace(' ', '+')}`} alt={item.user.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{item.user.name}</p>
                                    <p className="text-sm text-gray-600 italic">"{item.user.bio}"</p>
                                </div>
                            </Link>
                            <div className="border-t my-4"></div>
                            <div className="space-y-3">
                                {item.user.verification?.status === 'verified' ? ( <FeatureIcon icon="✔️" text="KYC Verified Owner" /> ) : ( <FeatureIcon icon="⏳" text="KYC Pending" /> )}
                                <FeatureIcon icon="📞" text={maskPhoneNumber(item.user.phone)} onClick={handleCallClick} />
                                <FeatureIcon icon="📍" text={`${item.user.address.city}, ${item.user.address.state}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsPage;
