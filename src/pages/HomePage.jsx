// import React, { useState, useEffect } from "react";
// import itemService from "../services/itemService";
// import ProductCard from "../components/item/ProductCard";
// import Spinner from "../components/common/Spinner";

// const HomePage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const data = await itemService.getItems();
//         console.log("API data:", data);

//         // ✅ Fix: Ensure we only set the array
//         if (Array.isArray(data)) {
//           setItems(data);
//         } else if (data.items && Array.isArray(data.items)) {
//           setItems(data.items);
//         } else {
//           setItems([]);
//         }
//       } catch (err) {
//         setError("Failed to fetch products. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-teal-50 py-12 md:py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
//             Renting Made Easy
//           </h1>
//           <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//             Find what you need, for as long as you need. Rent furniture,
//             appliances, electronics & more.
//           </p>
//         </div>
//       </div>

//       {/* Product Grid Section */}
//       <div className="bg-gray-50">
//         <div className="container mx-auto px-4 py-12">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
//             Trending Products
//           </h2>
//           {loading ? (
//             <Spinner />
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : items.length === 0 ? (
//             <p className="text-gray-500 text-center">No products available.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {items.map((item) => (
//                 <ProductCard key={item._id} product={item} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;
// import React, { useState, useEffect } from 'react';
// import itemService from '../services/itemService';
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { Link } from 'react-router-dom';

// // This can be fetched from an API in the future
// const categories = [
//   { name: 'Furniture', icon: '🛋️' },
//   { name: 'Appliances', icon: '🔌' },
//   { name: 'Electronics', icon: '💻' },
//   { name: 'Bikes', icon: '🚲' },
//   { name: 'Fitness', icon: '🏋️' },
//   { name: 'WFH', icon: '🏢' },
// ];

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const data = await itemService.getItems();
//         setItems(data);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   return (
//     <>
//       {/* === Hero Banner === */}
//       <div
//         className="relative bg-cover bg-center rounded-lg overflow-hidden mb-16"
//         style={{ backgroundImage: "url('https://placehold.co/1200x500/334155/e2e8f0?text=Affordable+Rentals!')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="relative container mx-auto px-4 py-24 md:py-32 text-white text-left">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Affordable beds,<br/> unmatched comfort!
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Choose from our wide range of collections<br/> starting at just Rs. 189/month.
//           </p>
//           <Link to="/items" className="bg-red-600 text-white px-10 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors text-lg">
//             Rent Now
//           </Link>
//         </div>
//       </div>

//       {/* === Trending Products Section (Moved Up) === */}
//       <div className="container mx-auto px-4 mb-16">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Trending Products</h2>
//         {loading ? (
//           <Spinner />
//         ) : error ? (
//           <p className="text-red-500 text-center">{error}</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {items.slice(0, 4).map((item) => ( // Show only first 4 items
//               <ProductCard key={item._id} product={item} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* === Category Browser (Moved Down) === */}
//       <div className="bg-gray-50 py-16 rounded-lg">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Browse by Category</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//             {categories.map((category) => (
//               <Link to={`/categories/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                 <div className="text-4xl mb-3">{category.icon}</div>
//                 <span className="font-semibold text-gray-700">{category.name}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

//animation 1

// import React, { useState } from "react";
// import { useItems } from "../contexts/ItemContext";
// import ProductCard from "../components/item/ProductCard";
// import Spinner from "../components/common/Spinner";
// import { Link } from "react-router-dom";
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Naye Interactive Section ke liye Data ---
// const experienceData = [
//   {
//     id: "renting",
//     title: "Smart Renting",
//     description:
//       "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.",
    
// //  videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4'
//    videoUrl : rentingVideo

//   },
//   {
//     id: "earning",
//     title: "Easy Earning",
//     description:
//       "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.",
//        videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4'
//   },
//   {
//     id: "community",
//     title: "Trusted Community",
//     description:
//       "Join thousands of verified members sharing and renting with confidence and security.",
//          videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4'
//   },
// ];

// // --- Baaki ke Helper Data ---
// const categories = [
//   { name: "Furniture", icon: "🛋️" },
//   { name: "Appliances", icon: "🔌" },
//   { name: "Electronics", icon: "💻" },
//   { name: "Bikes", icon: "🚲" },
// ];
// const features = [
//   {
//     icon: "ShieldCheck",
//     title: "Finest-Quality Products",
//     description:
//       "Quality matters to you, and us! That's why we do a strict quality-check for every product.",
//   },
//   {
//     icon: "Truck",
//     title: "Free Relocation",
//     description:
//       "Changing your house or even your city? We'll relocate your rented products for free.",
//   },
//   {
//     icon: "RefreshCw",
//     title: "Easy Return on Delivery",
//     description:
//       "If you don't like the product on delivery, you can return it right away—no questions asked.",
//   },
// ];

// const Icon = ({ name, className }) => {
//   const icons = {
//     ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//     Truck: <path d="M14 17.5V13H2V7h12v4.5l4-2.5v11l-4-2.5zM2 13h12" />,
//     RefreshCw: (
//       <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />
//     ),
//   };
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       {icons[name]}
//     </svg>
//   );
// };

// const Home = () => {
//   const { featuredItems, loading, error } = useItems();
//   const [activeTab, setActiveTab] = useState(experienceData[0].id);
//   const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//   return (
//   <div className="space-y-16 md:space-y-24">
//       <div
//         className="relative bg-cover bg-center rounded-lg overflow-hidden mb-16"
//         style={{
//           backgroundImage:
//             "url('https://placehold.co/1200x500/334155/e2e8f0?text=Your+Items,+Your+Earnings!')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="relative container mx-auto px-4 py-24 md:py-32 text-white text-left">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Got items lying around?
//             <br /> Start earning today!
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Join our community and turn your unused goods
//             <br /> into a new source of income.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Link
//               to="/items"
//               className="bg-red-600 text-white px-10 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors text-lg"
//             >
//               Rent Now
//             </Link>
//             <Link
//               to="/upload-item"
//               className="bg-white text-teal-600 px-10 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-lg"
//             >
//               Upload Item
//             </Link>
//           </div>
//         </div>
//       </div>  
//       {/* === Featured Products Section (Horizontal Scroll) === */}
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Featured Products
//         </h2>
//         {loading && <Spinner />}
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {!loading && !error && (
//           <div className="flex overflow-x-auto space-x-8 pb-4">
//             {featuredItems.length > 0 ? (
//               featuredItems.map((item) => (
//                 <div key={item._id} className="flex-shrink-0 w-72">
//                   <ProductCard product={item} />
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 w-full">
//                 No featured products available in your city yet.
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* === Interactive Video Section === */}
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-800">
//             An All-New Experience
//           </h2>
//           <p className="text-gray-600 mt-2">
//             More than just renting, it's a lifestyle.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           <div className="space-y-4">
//             {experienceData.map((tab) => (
//               <div
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
//                   activeTab === tab.id
//                     ? "bg-white shadow-xl border-teal-500 transform scale-105"
//                     : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"
//                 }`}
//               >
//                 <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                 <p className="text-gray-600 mt-1">{tab.description}</p>
//               </div>
//             ))}
//           </div>
//           <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96">
//             <video
//               key={activeExperience.videoUrl}
//               className="w-full h-full object-cover"
//               src={activeExperience.videoUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//             />
//           </div>
//         </div>
//       </div>

//       {/* === Why Choose Us Section === */}
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           There's more to renting
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//           {features.map((feature) => (
//             <div key={feature.title}>
//               <div className="flex justify-center mb-4">
//                 <div className="bg-teal-100 p-4 rounded-full">
//                   <Icon name={feature.icon} className="h-8 w-8 text-teal-600" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* === Category Browser === */}
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Browse by Category
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <Link
//               to={`/category/${category.name.toLowerCase()}`}
//               key={category.name}
//               className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
//             >
//               <div className="text-4xl mb-3">{category.icon}</div>
//               <span className="font-semibold text-gray-700">
//                 {category.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


//chnage 2

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// // --- Services, Contexts, and Components ---
// // NOTE: Import paths ko theek kiya gaya hai
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Page ke liye zaroori Data (Isey alag file mein bhi rakh sakte hain) ---
// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];

// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];

// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
// ];

// // --- Custom SVG Icon Component ---
// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <path d="m9 19-2 2h10l-2-2m-3-4v6H2V7h11v4l4-2v6l-4-2Z" />,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };


// const HomePage = () => {
//     // --- State Management ---
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
    
//     const { selectedCity } = useContext(LocationContext);
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchFeaturedItems = () => {
//             if (!selectedCity) return;
//             setLoading(true);
//             setError('');
//             axios.get(`/api/items/featured?city=${selectedCity}`)
//                 .then(response => {
//                     setFeaturedItems(response.data);
//                 })
//                 .catch(err => {
//                     setError(`Could not load items for ${selectedCity}.`);
//                     console.error("Failed to fetch featured items:", err);
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         };
//         fetchFeaturedItems();
//     }, [selectedCity]); // Yeh tabhi chalega jab city badlegi

//     return (
//         <div className="space-y-16 md:space-y-24">
//             {/* --- Hero Section --- */}
//             <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden mt-8 container mx-auto">
//                 <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//                 <div className="relative px-4 py-24 md:py-32 text-center">
//                     <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Items, Your Earnings</h1>
//                     <p className="text-lg md:text-xl mb-8">Join our community and turn your unused goods into a new source of income.</p>
//                     <div className="flex flex-wrap justify-center gap-4">
//                         <Link to="/category/Furniture" className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors text-lg">Rent Now</Link>
//                         <Link to="/upload-item" className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-lg">Upload Item</Link>
//                     </div>
//                 </div>
//             </div>

//             {/* --- Featured Products Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured in {selectedCity}</h2>
//                 {loading ? <Spinner /> : error ? <p className="text-red-500 text-center">{error}</p> :
//                 !loading && featuredItems.length === 0 ? (
//                     <p className="text-center text-gray-500 w-full">No featured products available in your city yet.</p>
//                 ) : (
//                     <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4">
//                         {featuredItems.map((item) => (
//                             <div key={item._id} className="flex-shrink-0 w-72"><ProductCard product={item} /></div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* --- Interactive Video Section --- */}
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                     <div className="space-y-4">
//                         {experienceData.map((tab) => (
//                             <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`}>
//                                 <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                 <p className="text-gray-600 mt-1">{tab.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience.videoUrl} className="w-full h-full object-cover" src={activeExperience.videoUrl} autoPlay muted loop playsInline /></div>
//                 </div>
//             </div>

//             {/* --- Why Choose Us Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                     {features.map((feature) => (
//                         <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                     ))}
//                 </div>
//             </div>

//             {/* --- Category Browser --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {categories.map((category) => (
//                         <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                             <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;



//change 3  //working 9/9/25

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// // --- Contexts, Components, aur Assets ---
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Page ke liye zaroori Data (Static Content) ---
// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];

// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];

// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
//     { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
// ];

// // --- Custom SVG Icon Component ---
// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <path d="m9 19-2 2h10l-2-2m-3-4v6H2V7h11v4l4-2v6l-4-2Z" />,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };

// const HomePage = () => {
//     // --- State Management ---
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
    
//     const { selectedCity } = useContext(LocationContext);
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchFeaturedItems = () => {
//             if (!selectedCity) {
//                 // Agar city select nahi hai, to loading band karein aur user ko batayein
//                 setLoading(false);
//                 setError("Please select a city to view featured products.");
//                 setFeaturedItems([]); // Purane items ko saaf karein
//                 return;
//             }
            
//             setLoading(true);
//             setError(''); // Purane error ko saaf karein
//             axios.get(`/api/items/featured?city=${selectedCity}`)
//                 .then(response => {
//                     setFeaturedItems(response.data);
//                 })
//                 .catch(err => {
//                     setError(`Could not load items for ${selectedCity}. Please try again.`);
//                     console.error("Failed to fetch featured items:", err);
//                     setFeaturedItems([]);
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         };
        
//         fetchFeaturedItems();
//     }, [selectedCity]); // Yeh tabhi chalega jab city badlegi

//     return (
   

//      <div className="space-y-16 md:space-y-24">
//       <div
//         className="relative bg-cover bg-center rounded-lg overflow-hidden mb-16"
//         style={{
//           backgroundImage:
//             "url('https://placehold.co/1200x500/334155/e2e8f0?text=Your+Items,+Your+Earnings!')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="relative container mx-auto px-4 py-24 md:py-32 text-white text-left">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Got items lying around?
//             <br /> Start earning today!
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Join our community and turn your unused goods
//             <br /> into a new source of income.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Link
//               to="/items"
//               className="bg-red-600 text-white px-10 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors text-lg"
//             >
//               Rent Now
//             </Link>
//             <Link
//               to="/upload-item"
//               className="bg-white text-teal-600 px-10 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-lg"
//             >
//               Upload Item
//             </Link>
//           </div>
//         </div>
//       </div>

//             {/* --- Featured Products Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
//                 <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
                
//                 {loading && <Spinner />}
//                 {error && <p className="text-red-500 text-center py-8">{error}</p>}
                
//                 {!loading && !error && featuredItems.length > 0 && (
//                     <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4">
//                         {featuredItems.map((item) => (
//                             <div key={item._id} className="flex-shrink-0 w-72">
//                                 <ProductCard product={item} />
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {!loading && !error && featuredItems.length === 0 && (
//                      <p className="text-center text-gray-500 py-8">No featured products available in {selectedCity} yet. Be the first to list an item!</p>
//                 )}
//             </div>

//             {/* --- Interactive Video Section --- */}
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                     <div className="space-y-4">
//                         {experienceData.map((tab) => (
//                             <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}>
//                                 <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                 <p className="text-gray-600 mt-1">{tab.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
//                 </div>
//             </div>

//             {/* --- Why Choose Us Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                     {features.map((feature) => (
//                         <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                     ))}
//                 </div>
//             </div>

//             {/* --- Category Browser --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                     {categories.map((category) => (
//                         <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                             <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;


//change 4  fix code 19-09-2025

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // --- Contexts, Components, aur Assets ---
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Static Data for the Page ---
// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];

// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];

// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
//     { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
// ];

// // --- Custom SVG Icon Component ---
// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <><rect x="2" y="7" width="16" height="12" rx="2" /><path d="M22 19H20V7h-4l-4-5h-2l-4 5H2v12h18Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };

// const HomePage = () => {
//     // --- State Management ---
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
    
//     const { selectedCity } = useContext(LocationContext);
//     const navigate = useNavigate();
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchFeaturedItems = () => {
//             if (!selectedCity) {
//                 setLoading(false);
//                 setError("Please select a city to view featured products.");
//                 setFeaturedItems([]);
//                 return;
//             }
            
//             setLoading(true);
//             setError('');
//             axios.get(`/api/items/featured?city=${selectedCity}`)
//                 .then(response => {
//                     setFeaturedItems(response.data);
//                 })
//                 .catch(err => {
//                     setError(`Could not load items for ${selectedCity}. Please try again.`);
//                     console.error("Failed to fetch featured items:", err);
//                     setFeaturedItems([]);
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         };
        
//         fetchFeaturedItems();
//     }, [selectedCity]);

//     return (
   
//      <div className="space-y-16 md:space-y-24">
//       <div
//         className="relative bg-cover bg-center rounded-lg overflow-hidden mb-16"
//         style={{
//           backgroundImage:
//             "url('https://placehold.co/1200x500/334155/e2e8f0?text=Your+Items,+Your+Earnings!')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 "></div>
//         <div className="relative container mx-auto px-4 py-24 md:py-32 text-white text-left">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             Got items lying around?
//             <br /> Start earning today!
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Join our community and turn your unused goods
//             <br /> into a new source of income.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Link
//               to="/explore"
//               className="bg-red-600 text-white px-10 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors text-lg"
//             >
//               Rent Now
//             </Link>
//             <Link
//               to="/upload-item"
//               className="bg-white text-teal-600 px-10 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-lg"
//             >
//               Upload Item
//             </Link>
//           </div>
//         </div>
//       </div>  

//             {/* --- Featured Products Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
//                 <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
                
//                 {loading && <Spinner />}
//                 {error && <p className="text-red-500 text-center py-8">{error}</p>}
                
//                 {!loading && !error && featuredItems.length > 0 && (
//                     <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4">
//                         {featuredItems.map((item) => (
//                             <div key={item._id} className="flex-shrink-0 w-80">
//                                 <ProductCard product={item} />
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {!loading && !error && featuredItems.length === 0 && (
//                      <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">No featured products available in {selectedCity} yet. Be the first to list an item!</p>
//                 )}
//             </div>

//             {/* --- Interactive Video Section --- */}
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                     <div className="space-y-4">
//                         {experienceData.map((tab) => (
//                             <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}>
//                                 <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                 <p className="text-gray-600 mt-1">{tab.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
//                 </div>
//             </div>

//             {/* --- Why Choose Us Section --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                     {features.map((feature) => (
//                         <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                     ))}
//                 </div>
//             </div>

//             {/* --- Category Browser --- */}
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                     {categories.map((category) => (
//                         <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                             <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;



//change 6

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// // --- Contexts, Components, and Assets ---
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Static Data for the Page ---
// const heroImages = [
//     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop', // Furniture
//     'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop', // Electronics
//     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop', // Appliances
//     'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop', // Bikes
// ];

// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];

// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];

// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
//     { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
// ];

// // --- Custom SVG Icon Component ---
// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <><rect x="2" y="7" width="16" height="12" rx="2" /><path d="M22 19H20V7h-4l-4-5h-2l-4 5H2v12h18Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };

// const HomePage = () => {
//     // --- State Management ---
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const { selectedCity } = useContext(LocationContext);
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     // --- Effect for Rotating Hero Banner Background ---
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, []);

//     // --- Effect for Fetching Data ---
//     useEffect(() => {
//         const fetchFeaturedItems = () => {
//             if (!selectedCity) {
//                 setLoading(false);
//                 setError("Please select a city to view featured products.");
//                 setFeaturedItems([]);
//                 return;
//             }
            
//             setLoading(true);
//             setError('');
//             axios.get(`/api/items/featured?city=${selectedCity}`)
//                 .then(response => setFeaturedItems(response.data))
//                 .catch(err => {
//                     setError(`Could not load items for ${selectedCity}. Please try again.`);
//                     console.error("Failed to fetch featured items:", err);
//                     setFeaturedItems([]);
//                 })
//                 .finally(() => setLoading(false));
//         };
        
//         fetchFeaturedItems();
//     }, [selectedCity]);

//     return (
//         // [FIX] Yeh naya wrapper div saare content ko center me rakhega
//         <div className="container mx-auto px-4 py-8">
//             <div className="space-y-16 md:space-y-24">
//                 {/* --- Hero Section with ROTATING Background --- */}
//                 <div
//                     className="relative z-10 w-full bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-1000"
//                     style={{ backgroundImage: `url(${heroImages[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//                 >
//                     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//                     <div className="relative px-6 py-24 md:px-12 text-center md:text-left">
//                         <div className="max-w-3xl mx-auto md:mx-0">
//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
//                                 Got items lying around?
//                                 <br />
//                                 <span className="text-teal-400">Start earning today!</span>
//                             </h1>
//                             <p className="mt-6 text-lg text-gray-200 max-w-2xl">
//                                 Join our community and turn your unused goods into a new source of income.
//                             </p>
//                             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                                 <Link to="/explore" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">
//                                     Rent Now
//                                 </Link>
//                                 <Link to="/upload-item" className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">
//                                     Upload Item
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Featured Products Section --- */}
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
//                     <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
                    
//                     {loading && <Spinner />}
//                     {error && <p className="text-red-500 text-center py-8">{error}</p>}
                    
//                     {!loading && !error && featuredItems.length > 0 && (
//                         <div className="flex overflow-x-auto space-x-8 pb-4">
//                             {featuredItems.map((item) => (
//                                 <div key={item._id} className="flex-shrink-0 w-80">
//                                     <ProductCard product={item} />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {!loading && !error && featuredItems.length === 0 && (
//                          <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">No featured products available in {selectedCity} yet.</p>
//                     )}
//                 </div>

//                 {/* --- Interactive Video Section --- */}
//                 <div>
//                     <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                         <div className="space-y-4">
//                             {experienceData.map((tab) => (
//                                 <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}>
//                                     <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                     <p className="text-gray-600 mt-1">{tab.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
//                     </div>
//                 </div>

//                 {/* --- Why Choose Us Section --- */}
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                         {features.map((feature) => (
//                             <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* --- Category Browser --- */}
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                         {categories.map((category) => (
//                             <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                                 <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;


// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// // --- Contexts, Components, and Assets ---
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Static Data (No changes here) ---
// const heroImages = [
//     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
// ];
// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];
// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];
// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
//     { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
// ];

// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <><rect x="2" y="7" width="16" height="12" rx="2" /><path d="M22 19H20V7h-4l-4-5h-2l-4 5H2v12h18Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };

// const HomePage = () => {
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const { selectedCity } = useContext(LocationContext);
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     useEffect(() => {
//         const timer = setInterval(() => { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length); }, 5000);
//         return () => clearInterval(timer);
//     }, []);

//     // =================================================================
//     //           [FINAL FIX] Data Fetching Logic
//     // =================================================================
//     useEffect(() => {
//         const fetchFeaturedItems = async () => {
//             if (!selectedCity || selectedCity.trim() === '') {
//                 setLoading(false);
//                 setError("Please select a city to view products.");
//                 setFeaturedItems([]);
//                 return;
//             }
//             
//             setLoading(true);
//             setError('');
//             try {
//                 const { data } = await axios.get(`/api/items/featured?city=${selectedCity}`);
//                 setFeaturedItems(data);
//             } catch (err) {
//                 console.error("Error fetching featured items:", err.response || err);
//                 setError(`Could not load items. Please try refreshing the page.`);
//                 setFeaturedItems([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         
//         fetchFeaturedItems();
//     }, [selectedCity]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="space-y-16 md:space-y-24">
//                 {/* Hero Section */}
//                 <div className="relative z-10 w-full bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-1000" style={{ backgroundImage: `url(${heroImages[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//                     <div className="relative px-6 py-24 md:px-12 text-center md:text-left">
//                         <div className="max-w-3xl mx-auto md:mx-0">
//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Got items lying around?<br /><span className="text-teal-400">Start earning today!</span></h1>
//                             <p className="mt-6 text-lg text-gray-200 max-w-2xl">Join our community and turn your unused goods into a new source of income.</p>
//                             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                                 <Link to="/explore" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Rent Now</Link>
//                                 <Link to="/upload-item" className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Upload Item</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Featured Products Section --- */}
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
//                     <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
//                     
//                     {loading && <Spinner />}
//                     {error && <p className="text-red-500 text-center py-8">{error}</p>}
//                     
//                     {!loading && !error && featuredItems.length > 0 && (
//                         <div className="flex overflow-x-auto space-x-8 pb-4">
//                             {featuredItems.map((item) => (
//                                 <div key={item._id} className="flex-shrink-0 w-80">
//                                     <ProductCard product={item} />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {!loading && !error && featuredItems.length === 0 && (
//                          <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">No featured products available in {selectedCity} yet.</p>
//                     )}
//                 </div>

//                 {/* --- Baaki ka section ... --- */}
//                  {/* ... (rest of the page remains the same) ... */}
//                  <div>
//                     <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                         <div className="space-y-4">
//                             {experienceData.map((tab) => (
//                                 <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}>
//                                     <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                     <p className="text-gray-600 mt-1">{tab.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
//                     </div>
//                 </div>
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                         {features.map((feature) => (
//                             <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                         ))}
//                     </div>
//                 </div>
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                         {categories.map((category) => (
//                             <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                                 <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;


// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// // --- Contexts, Components, and Assets ---
// import ProductCard from '../components/item/ProductCard';
// import Spinner from '../components/common/Spinner';
// import { LocationContext } from '../contexts/LocationContext';
// import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';

// // --- Static Data for the Page ---
// const heroImages = [
//     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop', // Furniture
//     'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop', // Electronics
//     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop', // Appliances
//     'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop', // Bikes
// ];

// const experienceData = [
//     { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand, delivered to your doorstep.", videoUrl: rentingVideo },
//     { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes, manage bookings, and start earning effortlessly.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
//     { id: "community", title: "Trusted Community", description: "Join thousands of verified members sharing and renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
// ];

// const features = [
//     { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
//     { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
//     { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
// ];

// const categories = [
//     { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
//     { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
//     { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
// ];

// // --- Custom SVG Icon Component ---
// const Icon = ({ name, className }) => {
//     const icons = {
//         ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//         Truck: <><rect x="2" y="7" width="16" height="12" rx="2" /><path d="M22 19H20V7h-4l-4-5h-2l-4 5H2v12h18Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
//         RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
//     };
//     return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
// };

// const HomePage = () => {
//     // --- State Management ---
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeTab, setActiveTab] = useState(experienceData[0].id);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const { selectedCity } = useContext(LocationContext);
//     const activeExperience = experienceData.find((tab) => tab.id === activeTab);

//     // --- Effect for Rotating Hero Banner Background ---
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, []);

//     // =================================================================
//     //                [FINAL FIX] Data Fetching Logic
//     // =================================================================
//     useEffect(() => {
//         const fetchFeaturedItems = async () => {
//             if (!selectedCity || selectedCity.trim() === '') {
//                 setLoading(false);
//                 setError("Please select a city to view products.");
//                 setFeaturedItems([]);
//                 return;
//             }
//             
//             setLoading(true);
//             setError('');
//             try {
//                 // Browser cache ko bypass karne ke liye unique parameter add kiya
//                 const cacheBuster = `_cb=${new Date().getTime()}`;
//                 const { data } = await axios.get(`/api/items/featured?city=${selectedCity}&${cacheBuster}`);
                
//                 // Debugging ke liye console log
//                 console.log("API Response for Featured Items:", data);
//                 
//                 setFeaturedItems(data);
//             } catch (err) {
//                 // Error ko aache se console par dikhayein
//                 console.error("Error fetching featured items:", err.response || err);
//                 setError(`Could not load items for ${selectedCity}. Please check the console.`);
//                 setFeaturedItems([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         
//         fetchFeaturedItems();
//     }, [selectedCity]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="space-y-16 md:space-y-24">
//                 {/* --- Hero Section --- */}
//                 <div className="relative z-10 w-full bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-1000" style={{ backgroundImage: `url(${heroImages[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//                     <div className="relative px-6 py-24 md:px-12 text-center md:text-left">
//                         <div className="max-w-3xl mx-auto md:mx-0">
//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Got items lying around?<br /><span className="text-teal-400">Start earning today!</span></h1>
//                             <p className="mt-6 text-lg text-gray-200 max-w-2xl">Join our community and turn your unused goods into a new source of income.</p>
//                             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                                 <Link to="/explore" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Rent Now</Link>
//                                 <Link to="/upload-item" className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Upload Item</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Featured Products Section --- */}
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
//                     <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
//                     
//                     {loading && <Spinner />}
//                     {error && <p className="text-red-500 text-center py-8">{error}</p>}
//                     
//                     {!loading && !error && featuredItems.length > 0 && (
//                         <div className="flex overflow-x-auto space-x-8 pb-4">
//                             {featuredItems.map((item) => (
//                                 <div key={item._id} className="flex-shrink-0 w-80">
//                                     <ProductCard product={item} />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {!loading && !error && featuredItems.length === 0 && (
//                          <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">No featured products available in {selectedCity} yet.</p>
//                     )}
//                 </div>

//                 {/* --- Baaki ka section ... --- */}
//                  {/* ... (rest of the page remains the same) ... */}
//                  <div>
//                     <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                         <div className="space-y-4">
//                             {experienceData.map((tab) => (
//                                 <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}>
//                                     <h3 className="font-bold text-xl text-gray-800">{tab.title}</h3>
//                                     <p className="text-gray-600 mt-1">{tab.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
//                     </div>
//                 </div>
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//                         {features.map((feature) => (
//                             <div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>
//                         ))}
//                     </div>
//                 </div>
//                 <div>
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                         {categories.map((category) => (
//                             <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
//                                 <div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;

//change for ppt 9/10

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- Contexts, Components, and Assets ---
import ProductCard from '../components/item/ProductCard';
import Spinner from '../components/common/Spinner';
import { LocationContext } from '../contexts/LocationContext';
import rentingVideo from '../assets/video/RentSmart_Animated_Video_Concepts.mp4';
import nikhilimg from '../assets/image/WhatsApp Image 2025-10-09 at 15.55.28_58a4a85c.jpg'
import nkimg from '../assets/image/WhatsApp Image 2025-10-09 at 15.25.01_8e9fe28f.jpg'
import ronakjat from '../assets/image/WhatsApp Image 2025-10-09 at 15.23.58_f1c7d2e6.jpg'
import nikunjimg from '../assets/image/WhatsApp Image 2025-10-09 at 15.53.06_d367e656.jpg'
import prateekimg from '../assets/image/IMG_20251009_155350[1].jpg'


// --- Static Data for the Page ---
const heroImages = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
];

const experienceData = [
    { id: "renting", title: "Smart Renting", description: "Discover a flexible way to live. Get top-quality products on demand.", videoUrl: rentingVideo },
    { id: "earning", title: "Easy Earning", description: "Turn your unused items into cash. List them in minutes and start earning.", videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4' },
    { id: "community", title: "Trusted Community", description: "Join thousands of verified members renting with confidence and security.", videoUrl: 'https://videos.pexels.com/video-files/853874/853874-sd_640_360_30fps.mp4' },
];

const features = [
    { icon: "ShieldCheck", title: "Finest-Quality Products", description: "Quality matters to you, and us! That's why we do a strict quality-check for every product." },
    { icon: "Truck", title: "Free Relocation", description: "Changing your house or even your city? We'll relocate your rented products for free." },
    { icon: "RefreshCw", title: "Easy Return", description: "If you don't like the product on delivery, you can return it right away—no questions asked." },
];

const categories = [
    { name: "Furniture", icon: "🛋️" }, { name: "Electronics", icon: "💻" },
    { name: "Appliances", icon: "🔌" }, { name: "Bikes", icon: "🚲" },
    { name: "Books", icon: "📚" }, { name: "Fitness", icon: "🏋️" },
];

const testimonials = [
    { name: "Ananya Sharma", location: "Mumbai", text: "Renting furniture was a breeze! The quality was top-notch and the delivery was on time. Highly recommend this platform.", image: "https://i.pravatar.cc/150?u=ananya" },
    { name: "Rohan Verma", location: "Delhi", text: "I listed my old DSLR camera and started earning from it within a week. The process is so simple and secure. Great way to make extra cash!", image: "https://i.pravatar.cc/150?u=rohan" },
    { name: "Priya Singh", location: "Bangalore", text: "As a student, I needed a bike for a few months. This was the most affordable and flexible option I could find. The community is very trustworthy.", image: "https://i.pravatar.cc/150?u=priya" },
];

// --- NEW: Team Data ---
const teamMembers = [
    { name: "NK Mudafale", role: "Fullstack Developer + Admin", image: nkimg },
    { name: "Nikunj Bisani", role: "Tester", image: nikunjimg },
    { name: "Ronak Jat", role: "Backend Developer + Admin", image: ronakjat },
    { name: "Pratik Jat", role: "Database Administrator", image: prateekimg },
    { name: "Nikhil Singh", role: "Accountant + Admin", image: nikhilimg},
];


// --- Custom SVG Icon Component ---
const Icon = ({ name, className }) => {
    const icons = {
        ShieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        Truck: <><rect x="2" y="7" width="16" height="12" rx="2" /><path d="M22 19H20V7h-4l-4-5h-2l-4 5H2v12h18Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
        RefreshCw: <path d="M3 2v6h6M21 12A9 9 0 0 0 6.49 4.56l-1.93 1.94M21 22v-6h-6M3 12a9 9 0 0 0 14.51 7.44l1.93-1.94" />,
    };
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
};

const HomePage = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(experienceData[0].id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { selectedCity } = useContext(LocationContext);
    const activeExperience = experienceData.find((tab) => tab.id === activeTab);

    useEffect(() => {
        const timer = setInterval(() => { setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length); }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            if (!selectedCity || selectedCity.trim() === '') {
                setLoading(false);
                setError("Please select a city to view products.");
                setFeaturedItems([]);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const cacheBuster = `_cb=${new Date().getTime()}`;
                const { data } = await axios.get(`/api/items/featured?city=${selectedCity}&${cacheBuster}`);
                setFeaturedItems(data);
            } catch (err) {
                console.error("Error fetching featured items:", err.response || err);
                setError(`Could not load items for ${selectedCity}. Please check the console.`);
                setFeaturedItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedItems();
    }, [selectedCity]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-16 md:space-y-24">
                {/* --- Hero Section --- */}
                <div className="relative z-10 w-full bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-1000" style={{ backgroundImage: `url(${heroImages[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative px-6 py-24 md:px-12 text-center md:text-left">
                        <div className="max-w-3xl mx-auto md:mx-0">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Got items lying around?<br /><span className="text-teal-400">Start earning today!</span></h1>
                            <p className="mt-6 text-lg text-gray-200 max-w-2xl">Join our community and turn your unused goods into a new source of income.</p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/explore" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Rent Now</Link>
                                <Link to="/upload-item" className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg shadow-md">Upload Item</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Featured Products Section --- */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
                    <p className="text-center text-gray-500 mb-10">Top picks from your city: <span className="font-semibold text-teal-600">{selectedCity || '...'}</span></p>
                    {loading && <Spinner />}
                    {error && <p className="text-red-500 text-center py-8">{error}</p>}
                    {!loading && !error && featuredItems.length > 0 && (
                        <div className="flex overflow-x-auto space-x-8 pb-4">
                            {featuredItems.map((item) => (
                                <div key={item._id} className="flex-shrink-0 w-80"><ProductCard product={item} /></div>
                            ))}
                        </div>
                    )}
                    {!loading && !error && featuredItems.length === 0 && (<p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">No featured products available in {selectedCity} yet.</p>)}
                </div>

                {/* --- Interactive Video Section --- */}
                <div>
                    <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800">An All-New Experience</h2><p className="text-gray-600 mt-2">More than just renting, it's a lifestyle.</p></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">{experienceData.map((tab) => (<div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${activeTab === tab.id ? "bg-white shadow-xl border-teal-500 transform scale-105" : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"}`} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}><h3 className="font-bold text-xl text-gray-800">{tab.title}</h3><p className="text-gray-600 mt-1">{tab.description}</p></div>))}</div>
                        <div className="bg-black rounded-lg shadow-2xl overflow-hidden h-96"><video key={activeExperience?.videoUrl} className="w-full h-full object-cover" src={activeExperience?.videoUrl} autoPlay muted loop playsInline /></div>
                    </div>
                </div>
                
                {/* --- Why Choose Us Section --- */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">There's more to renting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">{features.map((feature) => (<div key={feature.title}><div className="flex justify-center mb-4"><div className="bg-teal-100 p-4 rounded-full"><Icon name={feature.icon} className="h-8 w-8 text-teal-600" /></div></div><h3 className="text-xl font-semibold mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>))}</div>
                </div>

                {/* --- Testimonials Section --- */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{testimonials.map((testimonial, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform transform hover:-translate-y-2"><p className="text-gray-600 italic mb-4 flex-grow">"{testimonial.text}"</p><div className="flex items-center mt-auto pt-4 border-t border-gray-100"><img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" /><div><p className="font-semibold text-gray-800">{testimonial.name}</p><p className="text-sm text-gray-500">{testimonial.location}</p></div></div></div>))}</div>
                </div>

                {/* --- NEW: Meet Our Team Section --- */}
                <div className="bg-gray-50 py-16 rounded-lg">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="text-center p-4">
                                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg object-cover ring-4 ring-white" />
                                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                    <p className="text-teal-600">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Category Browser --- */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">{categories.map((category) => (<Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"><div className="text-4xl mb-3">{category.icon}</div><span className="font-semibold text-gray-700">{category.name}</span></Link>))}</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;