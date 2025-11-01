//     // import React from 'react';
//     // import { Link } from 'react-router-dom';
    
//     // const ProductCard = ({ product }) => {
//     //   // Backend ka URL
//     //   const backendUrl = 'http://localhost:5000';
    
//     //   // Image ka poora URL banayein
//     //   const imageUrl = product.images && product.images.length > 0 
//     //     ? `${backendUrl}${product.images[0]}` 
//     //     : 'https://placehold.co/400x300/e2e8f0/334155?text=No+Image';
    
//     //   return (
//     //     <Link to={`/item/${product._id}`} className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl block">
//     //       <div className="w-full h-48 bg-gray-200">
//     //          <img 
//     //             src={imageUrl} // <-- Yahan badlav kiya gaya hai
//     //             alt={product.name} 
//     //             className="w-full h-full object-cover"
//     //             onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/334155?text=Image+Error'; }}
//     //         />
//     //       </div>
//     //       <div className="p-4">
//     //         <h3 className="font-semibold text-gray-800 truncate group-hover:text-teal-600">{product.name}</h3>
//     //         <p className="text-gray-600 mt-2">
//     //           Rent from <span className="font-bold text-lg text-gray-900">₹{product.pricePerDay}</span>/day
//     //         </p>
//     //       </div>
//     //     </Link>
//     //   );
//     // };
    
//     // export default ProductCard;

//     //chnage 1
    
// //     import React from 'react';
// // import { Link } from 'react-router-dom';

// // const ProductCard = ({ product }) => {
// //   // Har product ke liye ek unique, random image URL banayein
// //   // 'picsum.photos' ek free service hai jo random images deti hai
// //   // Hum product ID ka istemal kar rahe hain taaki har product ki image alag ho
// //   const dynamicImageUrl = `https://picsum.photos/seed/${product._id}/400/300`;

// //   return (
// //     <Link to={`/item/${product._id}`} className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl block">
// //       <div className="w-full h-48 bg-gray-200">
// //          <img 
// //             src={dynamicImageUrl} // <-- Yahan badlav kiya gaya hai
// //             alt={product.name} 
// //             className="w-full h-full object-cover"
// //         />
// //       </div>
// //       <div className="p-4">
// //         <h3 className="font-semibold text-gray-800 truncate group-hover:text-teal-600">{product.name}</h3>
// //         <p className="text-gray-600 mt-2">
// //           Rent from <span className="font-bold text-lg text-gray-900">₹{product.pricePerDay}</span>/day
// //         </p>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default ProductCard;
// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // // --- Flip Animation CSS ---
// // const styles = `
// //   .flip-card-container {
// //     background-color: transparent;
// //     width: 100%;
// //     min-height: 380px;
// //     perspective: 1000px;
// //     cursor: pointer;
// //   }

// //   .flip-card-inner {
// //     position: relative;
// //     width: 100%;
// //     height: 100%;
// //     transition: transform 0.6s;
// //     transform-style: preserve-3d;
// //   }

// //   .flip-card-container.flipped .flip-card-inner {
// //     transform: rotateY(180deg);
// //   }

// //   .flip-card-front,
// //   .flip-card-back {
// //     position: absolute;
// //     width: 100%;
// //     height: 100%;
// //     -webkit-backface-visibility: hidden; /* Safari */
// //     backface-visibility: hidden;
// //     border-radius: 0.75rem;
// //     box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
// //     overflow: hidden;
// //     display: flex;
// //     flex-direction: column;
// //   }

// //   .flip-card-back {
// //     background-color: #1a202c;
// //     color: white;
// //     transform: rotateY(180deg);
// //     justify-content: center;
// //     align-items: center;
// //     padding: 20px;
// //     text-align: center;
// //   }
// // `;

// // const ProductCard = ({ product }) => {
// //   const [isFlipped, setIsFlipped] = useState(false);

// //   if (!product || !product.user || !product.images || product.images.length === 0) {
// //     return null;
// //   }

// //   const handleFlip = (e) => {
// //     const tag = e.target.tagName.toLowerCase();
// //     if (tag === "a" || tag === "button") return; // prevent flip when clicking on links/buttons
// //     setIsFlipped(!isFlipped);
// //   };

// //   // 🔄 Auto flip back after 4 seconds
// //   useEffect(() => {
// //     let timer;
// //     if (isFlipped) {
// //       timer = setTimeout(() => {
// //         setIsFlipped(false);
// //       }, 4000); // 4 seconds
// //     }
// //     return () => clearTimeout(timer);
// //   }, [isFlipped]);

// //   const formattedAddress = [product.user?.address?.city, product.user?.address?.state]
// //     .filter(Boolean)
// //     .join(", ");

// //   const formatCategory = (cat) =>
// //     cat ? cat.replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div
// //         role="button"
// //         tabIndex={0}
// //         className={`flip-card-container ${isFlipped ? "flipped" : ""}`}
// //         onClick={handleFlip}
// //         onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleFlip(e)}
// //       >
// //         <div className="flip-card-inner">
// //           {/* --- Front Side --- */}
// //           <div className="flip-card-front bg-white">
// //             <div className="w-full h-48 bg-gray-200 flex-shrink-0">
// //               <img
// //                 src={product.images[0].url}
// //                 alt={product.name}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <div className="p-4 text-left flex-grow flex flex-col justify-between">
// //               <div>
// //                 <h3 className="font-bold text-lg truncate">{product.name}</h3>
// //                 <p className="text-sm text-gray-500">{formatCategory(product.category)}</p>
// //               </div>
// //               <div className="mt-2 flex justify-between items-center">
// //                 <p className="text-xl font-bold text-gray-800">
// //                   ₹{product.price}
// //                   <span className="text-xs font-normal text-gray-500">
// //                     {product.listingType === "rent" ? "/day" : ""}
// //                   </span>
// //                 </p>
// //                 <p className="text-xs text-teal-500 font-semibold animate-pulse">
// //                   Click to Flip
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* --- Back Side --- */}
// //           <div className="flip-card-back">
// //             <img
// //               src={
// //                 product.user.avatar?.url ||
// //                 `https://ui-avatars.com/api/?name=${encodeURIComponent(
// //                   product.user.name
// //                 )}&background=0D9488&color=fff`
// //               }
// //               alt={product.user.name}
// //               onError={(e) =>
// //                 (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
// //                   product.user.name
// //                 )}&background=0D9488&color=fff`)
// //               }
// //               className="w-24 h-24 rounded-full border-4 border-teal-400 object-cover"
// //             />
// //             <h4 className="text-xl font-bold mt-3">{product.user.name}</h4>
// //             {formattedAddress && (
// //               <p className="text-teal-300 text-xs">{formattedAddress}</p>
// //             )}
// //             {product.user.bio && (
// //               <p className="text-sm mt-3 text-gray-300 italic">
// //                 "{product.user.bio}"
// //               </p>
// //             )}
// //             <Link
// //               to={`/profile/${product.user._id}`}
// //               onClick={(e) => e.stopPropagation()}
// //               className="mt-4 bg-teal-500 text-white px-4 py-1 rounded-full text-xs hover:bg-teal-600"
// //             >
// //               View Profile
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductCard;


// // src/components/item/ProductCard.jsx

// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import './ProductCard.css'; // 👈 CSS file ko yahan import karein

// // const ProductCard = ({ product }) => {
// //   const [isFlipped, setIsFlipped] = useState(false);
// //   const navigate = useNavigate();

// //   if (!product || !product.user || !product.images || product.images.length === 0) {
// //     return null;
// //   }

// //   useEffect(() => {
// //     let timer;
// //     if (isFlipped) {
// //       timer = setTimeout(() => setIsFlipped(false), 10000);
// //     }
// //     return () => clearTimeout(timer);
// //   }, [isFlipped]);

// //   const handleFlip = (e) => {
// //     e.stopPropagation();
// //     e.preventDefault();
// //     setIsFlipped(true);
// //   };

// //   const handleCardClick = () => {
// //     navigate(`/item/${product._id}`);
// //   };

// //   const truncateDescription = (text = '', wordLimit = 15) => {
// //     if (!text) return '';
// //     const words = text.split(' ');
// //     if (words.length > wordLimit) {
// //       return words.slice(0, wordLimit).join(' ') + '...';
// //     }
// //     return text;
// //   };

// //   const formattedAddress = [product.user?.address?.city, product.user?.address?.state]
// //     .filter(Boolean)
// //     .join(', ');

// //   return (
// //     <div 
// //       className={`flip-card-container ${isFlipped ? 'flipped' : ''}`} 
// //       onClick={handleCardClick}
// //     >
// //       <div className="flip-card-inner">
// //         {/* --- Card ka Saamne ka Hissa --- */}
// //         <div className="flip-card-front bg-white">
// //           <div className="w-full h-48 bg-gray-200 flex-shrink-0">
// //               <img 
// //                   src={product.images[0].url} 
// //                   alt={product.name}
// //                   className="w-full h-full object-cover"
// //               />
// //           </div>
// //           <div className="p-4 text-left flex-grow flex flex-col justify-between">
// //             <div>
// //               <h3 className="font-bold text-lg truncate">{product.name}</h3>
// //               <p className="text-sm text-gray-500 capitalize">{product.category}</p>
// //               <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden">
// //                 {truncateDescription(product.description)}
// //               </p>
// //             </div>
// //             <div className="mt-2 flex justify-between items-center">
// //               <p className="text-xl font-bold text-gray-800">
// //                 ₹{product.price}
// //                 <span className="text-xs font-normal text-gray-500">/{product.listingType === 'rent' ? 'day' : ''}</span>
// //               </p>
// //               <button 
// //                 onClick={handleFlip} 
// //                 className="text-xs text-teal-500 font-semibold animate-pulse bg-transparent border-none p-0"
// //               >
// //                 Click for Details
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* --- Card ka Peeche ka Hissa --- */}
// //         <div className="flip-card-back">
// //           <img 
// //             src={product.user.avatar?.url || `https://ui-avatars.com/api/?name=${product.user.name.replace(' ', '+')}&background=0D9488&color=fff`} 
// //             alt={product.user.name}
// //             className="w-24 h-24 rounded-full border-4 border-teal-400 object-cover"
// //           />
// //           <h4 className="text-xl font-bold mt-3">{product.user.name}</h4>
// //           {formattedAddress && <p className="text-teal-300 text-xs mt-1">{formattedAddress}</p>}
// //           <p className="text-gray-400 text-sm mt-1">{product.user.phone}</p>
// //           <p className="text-sm mt-3 text-gray-300 italic">"{product.user.bio}"</p>
// //           <Link 
// //             to={`/profile/${product.user._id}`} 
// //             onClick={(e) => e.stopPropagation()}
// //             className="mt-4 bg-teal-500 text-white px-4 py-1 rounded-full text-xs hover:bg-teal-600"
// //           >
// //             View Profile
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;


// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // // Surakshit tarike se description ko chota karne wala function
// // const truncateDescription = (text = '', wordLimit = 15) => {
// //     if (!text) return 'No description available.'; // Agar description nahi hai to fallback
// //     const words = text.split(' ');
// //     if (words.length > wordLimit) {
// //         return words.slice(0, wordLimit).join(' ') + '...';
// //     }
// //     return text;
// // };

// // const ProductCard = ({ product }) => {
// //     const navigate = useNavigate();

// //     // Agar zaroori data nahi hai, to component render na karein
// //     if (!product || !product.user || !product.images || product.images.length === 0) {
// //         return null; // Isse app crash hone se bachega
// //     }

// //     const handleCardClick = () => {
// //         navigate(`/item/${product._id}`);
// //     };

// //     // --- User ka data surakshit tarike se istemal karein ---
// //     const userName = product.user.name || 'Anonymous User';
// //     const userBio = product.user.bio || 'No bio available.';
// //     const userPhone = product.user.phone || 'Not available';
// //     const formattedAddress = [product.user.address?.city, product.user.address?.state]
// //         .filter(Boolean)
// //         .join(', ');

// //     // --- YAHI PAR ERROR THA ---
// //     // Ab hum pehle check karte hain ki naam hai ya nahi, fir replace karte hain.
// //     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${userName.replace(/\s/g, '+')}&background=0D9488&color=fff`;

// //     return (
// //         <div 
// //             className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl block cursor-pointer"
// //             onClick={handleCardClick}
// //         >
// //             <div className="w-full h-48 bg-gray-200">
// //                 <img 
// //                     src={product.images[0].url} 
// //                     alt={product.name || 'Product Image'}
// //                     className="w-full h-full object-cover"
// //                 />
// //             </div>
// //             <div className="p-4">
// //                 <p className="text-sm text-gray-500 capitalize">{product.category || 'General'}</p>
// //                 <h3 className="font-semibold text-gray-800 truncate group-hover:text-teal-600 mt-1">{product.name || 'Untitled Item'}</h3>
// //                 <p className="text-xs text-gray-600 mt-2 h-10 overflow-hidden">
// //                     {truncateDescription(product.description)}
// //                 </p>
// //                 <div className="mt-4 flex justify-between items-center">
// //                     <p className="text-lg font-bold text-gray-900">
// //                         ₹{product.price.toLocaleString()}
// //                         <span className="text-xs font-normal text-gray-500">
// //                             /{product.priceType || 'day'}
// //                         </span>
// //                     </p>
// //                     <div className="flex items-center">
// //                         <img 
// //                             src={avatarUrl} 
// //                             alt={userName} // Fallback istemal karein
// //                             className="w-8 h-8 rounded-full object-cover border-2 border-white"
// //                         />
// //                         <span className="text-xs text-gray-500 ml-2">{userName}</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // // Surakshit tarike se description ko chota karne wala function
// // const truncateDescription = (text = '', wordLimit = 15) => {
// //     if (!text) return 'No description available.'; // Agar description nahi hai to fallback
// //     const words = text.split(' ');
// //     if (words.length > wordLimit) {
// //         return words.slice(0, wordLimit).join(' ') + '...';
// //     }
// //     return text;
// // };

// // const ProductCard = ({ product }) => {
// //     const navigate = useNavigate();

// //     // Agar zaroori data nahi hai, to component render na karein
// //     if (!product || !product.user || !product.images || product.images.length === 0) {
// //         return null; // Isse app crash hone se bachega
// //     }

// //     const handleCardClick = () => {
// //         navigate(`/item/${product._id}`);
// //     };

// //     // --- User ka data surakshit tarike se istemal karein ---
// //     const userName = product.user.name || 'Anonymous User';
// //     const userBio = product.user.bio || 'No bio available.';
// //     const userPhone = product.user.phone || 'Not available';
// //     const formattedAddress = [product.user.address?.city, product.user.address?.state]
// //         .filter(Boolean)
// //         .join(', ');

// //     // --- YAHI PAR ERROR THA ---
// //     // Ab hum pehle check karte hain ki naam hai ya nahi, fir replace karte hain.
// //     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${userName.replace(/\s/g, '+')}&background=0D9488&color=fff`;

// //     return (
// //         <div 
// //             className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl block cursor-pointer"
// //             onClick={handleCardClick}
// //         >
// //             <div className="w-full h-48 bg-gray-200">
// //                 <img 
// //                     src={product.images[0].url} 
// //                     alt={product.name || 'Product Image'}
// //                     className="w-full h-full object-cover"
// //                 />
// //             </div>
// //             <div className="p-4">
// //                 <p className="text-sm text-gray-500 capitalize">{product.category || 'General'}</p>
// //                 <h3 className="font-semibold text-gray-800 truncate group-hover:text-teal-600 mt-1">{product.name || 'Untitled Item'}</h3>
// //                 <p className="text-xs text-gray-600 mt-2 h-10 overflow-hidden">
// //                     {truncateDescription(product.description)}
// //                 </p>
// //                 <div className="mt-4 flex justify-between items-center">
// //                     <p className="text-lg font-bold text-gray-900">
// //                         ₹{product.price.toLocaleString()}
// //                         <span className="text-xs font-normal text-gray-500">
// //                             /{product.priceType || 'day'}
// //                         </span>
// //                     </p>
// //                     <div className="flex items-center">
// //                         <img 
// //                             src={avatarUrl} 
// //                             alt={userName} // Fallback istemal karein
// //                             className="w-8 h-8 rounded-full object-cover border-2 border-white"
// //                         />
// //                         <span className="text-xs text-gray-500 ml-2">{userName}</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;


// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // // Surakshit tarike se description ko chota karne wala function
// // const truncateDescription = (text, wordLimit = 15) => {
// //     if (!text || typeof text !== 'string') {
// //         return 'No description available.'; 
// //     }
// //     const words = text.split(' ');
// //     if (words.length > wordLimit) {
// //         return words.slice(0, wordLimit).join(' ') + '...';
// //     }
// //     return text;
// // };

// // const ProductCard = ({ product }) => {
// //     const [isFlipped, setIsFlipped] = useState(false);
// //     const navigate = useNavigate();

// //     // ✅ FINAL SAFETY CHECK: Agar zaroori data nahi hai, to component render na karein
// //     if (!product || !product.user || !product.images || product.images.length === 0) {
// //         return null; 
// //     }

// //     // Timer jo card ko 10 second baad wapas seedha kar dega
// //     useEffect(() => {
// //         let timer;
// //         if (isFlipped) {
// //             timer = setTimeout(() => setIsFlipped(false), 10000);
// //         }
// //         return () => clearTimeout(timer);
// //     }, [isFlipped]);

// //     // Card ko flip karne wala function
// //     const handleFlip = (e) => {
// //         e.stopPropagation(); // Isse card par click karne par item page nahi khulega
// //         e.preventDefault();
// //         setIsFlipped(prev => !prev);
// //     };

// //     // Card par click karke item page par jaane wala function
// //     const handleCardClick = () => {
// //         navigate(`/item/${product._id}`);
// //     };

// //     // --- User ka data surakshit tarike se istemal karein ---
// //     const userName = product.user.name || 'Anonymous User';
// //     const userBio = product.user.bio || 'No bio available.';
// //     const formattedAddress = [product.user.address?.city, product.user.address?.state]
// //         .filter(Boolean)
// //         .join(', ');
    
// //     // ✅ CRASH FIX: Avatar URL ke liye surakshit logic
// //     const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
// //     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

// //     return (
// //         <div 
// //             className="flip-card-container h-full"
// //             onClick={handleCardClick}
// //             role="button"
// //             tabIndex={0}
// //             onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
// //         >
// //             <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
// //                 {/* --- Card ka Saamne ka Hissa --- */}
// //                 <div className="flip-card-front bg-white">
// //                     <div className="w-full h-48 bg-gray-200 flex-shrink-0">
// //                         <img 
// //                             src={product.images[0].url} 
// //                             alt={product.name || 'Product Image'}
// //                             className="w-full h-full object-cover"
// //                         />
// //                     </div>
// //                     <div className="p-4 flex flex-col flex-grow">
// //                         <h3 className="font-bold text-lg truncate">{product.name || "Untitled Item"}</h3>
// //                         <p className="text-sm text-gray-500 capitalize">{product.category || "General"}</p>
// //                         <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden flex-grow">
// //                             {truncateDescription(product.description)}
// //                         </p>
// //                         <div className="mt-2 flex justify-between items-center">
// //                             <p className="text-xl font-bold text-gray-800">
// //                                 ₹{product.price ? product.price.toLocaleString() : 'N/A'}
// //                                 <span className="text-xs font-normal text-gray-500">/{product.priceType || 'day'}</span>
// //                             </p>
// //                             <button 
// //                                 onClick={handleFlip} 
// //                                 className="text-xs text-teal-500 font-semibold animate-pulse bg-transparent border-none p-0 cursor-pointer"
// //                             >
// //                                 View Details
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* --- Card ka Peeche ka Hissa --- */}
// //                 <div className="flip-card-back">
// //                     <img 
// //                         src={avatarUrl} 
// //                         alt={userName}
// //                         className="w-24 h-24 rounded-full border-4 border-teal-400 object-cover"
// //                     />
// //                     <h4 className="text-xl font-bold mt-3">{userName}</h4>
// //                     {formattedAddress && <p className="text-teal-300 text-xs mt-1">{formattedAddress}</p>}
// //                     <p className="text-sm mt-3 text-gray-300 italic">"{userBio}"</p>
// //                     <Link 
// //                         to={`/public-profile/${product.user._id}`} 
// //                         onClick={(e) => e.stopPropagation()}
// //                         className="mt-4 bg-teal-500 text-white px-4 py-1 rounded-full text-xs hover:bg-teal-600"
// //                     >
// //                         View Profile
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;


// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import './ProductCard.css';

// // // Surakshit tarike se text ko chota karne wala function
// // const truncateText = (text, wordLimit = 10) => {
// //     if (!text || typeof text !== 'string') {
// //         return ''; // Agar text nahi hai to khaali string bhejein
// //     }
// //     const words = text.split(' ');
// //     if (words.length > wordLimit) {
// //         return words.slice(0, wordLimit).join(' ') + '...';
// //     }
// //     return text;
// // };

// // const ProductCard = ({ product }) => {
// //     const navigate = useNavigate();

// //     // Antim suraksha check: Agar zaroori data nahi hai, to component render na karein
// //     if (!product || !product.user || !product.images || product.images.length === 0) {
// //         return null; 
// //     }

// //     // --- User ka data surakshit tarike se istemal karein ---
// //     const userName = product.user.name || 'Anonymous User';
// //     const userBio = product.user.bio || 'No bio available.';
// //     const formattedAddress = [product.user.address?.city, product.user.address?.state]
// //         .filter(Boolean)
// //         .join(', ');
    
// //     // Avatar URL ke liye surakshit logic
// //     const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
// //     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

// //     return (
// //         <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl flex flex-col h-full">
// //             {/* Product Image Section */}
// //             <Link to={`/item/${product._id}`} className="block">
// //                 <div className="w-full h-48 bg-gray-200">
// //                     <img 
// //                         src={product.images[0].url} 
// //                         alt={product.name || 'Product Image'}
// //                         className="w-full h-full object-cover"
// //                     />
// //                 </div>
// //             </Link>

// //             {/* Product Details Section */}
// //             <div className="p-4 flex-grow">
// //                 <p className="text-sm text-gray-500 capitalize">{product.category || 'General'}</p>
// //                 <h3 className="font-semibold text-gray-800 truncate group-hover:text-teal-600 mt-1">
// //                     <Link to={`/item/${product._id}`}>{product.name || 'Untitled Item'}</Link>
// //                 </h3>
// //                 <p className="text-xs text-gray-600 mt-2 h-10 overflow-hidden">
// //                     {truncateText(product.description)}
// //                 </p>
// //                 <div className="mt-2 flex justify-between items-center">
// //                     <p className="text-lg font-bold text-gray-900">
// //                         ₹{product.price ? product.price.toLocaleString() : 'N/A'}
// //                         <span className="text-xs font-normal text-gray-500">
// //                             /{product.priceType || 'day'}
// //                         </span>
// //                     </p>
// //                     <Link to={`/item/${product._id}`} className="text-xs text-teal-500 font-semibold hover:text-teal-700">
// //                         View Details
// //                     </Link>
// //                 </div>
// //             </div>

// //             {/* Divider */}
// //             <div className="border-t border-gray-200 mx-4"></div>

// //             {/* User Details Section */}
// //             <div className="p-4">
// //                 <div className="flex items-center">
// //                     <img 
// //                         src={avatarUrl} 
// //                         alt={userName}
// //                         className="w-10 h-10 rounded-full object-cover"
// //                     />
// //                     <div className="ml-3">
// //                         <p className="text-sm font-semibold text-gray-800">{userName}</p>
// //                         <p className="text-xs text-gray-500">{formattedAddress}</p>
// //                     </div>
// //                 </div>
// //                 <p className="text-xs text-gray-500 italic mt-2 h-8 overflow-hidden">
// //                     "{truncateText(userBio)}"
// //                 </p>
// //                 <Link 
// //                     to={`/public-profile/${product.user._id}`} 
// //                     className="mt-3 w-full block text-center bg-teal-500 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-teal-600 transition-colors"
// //                 >
// //                     View Profile
// //                 </Link>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;



// //--------------------------------

// // src/components/ProductCard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ProductCard.css'; // 👈 Hum styling ke liye is file ka istemal karenge

// const ProductCard = ({ product }) => {
//     const [isFlipped, setIsFlipped] = useState(false);
//     const navigate = useNavigate();

//     // Agar zaroori data nahi hai, to component render na karein
//     if (!product || !product.user || !product.images || product.images.length === 0) {
//         return null;
//     }

//     // Yeh function card ko flip karega
//     const handleFlip = (e) => {
//         // Isse link/button par click karne se page navigate nahi hoga
//         e.stopPropagation();
//         e.preventDefault();
//         setIsFlipped(prev => !prev);
//     };
    
//     // Card par kahin bhi click karne par product page par jaayega
//     const handleNavigate = () => {
//         if (!isFlipped) { // Sirf tab navigate kare jab card seedha ho
//             navigate(`/item/${product._id}`);
//         } else {
//              setIsFlipped(false); // Agar card ulta hai to click karne par seedha ho jaye
//         }
//     };

//     // User ka data surakshit tarike se handle karein
//     const userName = product.user.name || 'Anonymous User';
//     const formattedAddress = [product.user.address?.city, product.user.address?.state]
//         .filter(Boolean)
//         .join(', ');
//     const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
//     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

//     return (
//         <div 
//             className="flip-card-container"
//             onClick={handleNavigate} // Poore card par click event
//             role="button"
//             tabIndex={0}
//         >
//             <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                
//                 {/* --- FRONT SIDE --- */}
//                 <div className="flip-card-front">
//                     <img 
//                         src={product.images[0].url} 
//                         alt={product.name}
//                         className="product-image"
//                     />
//                     <div className="product-details">
//                         <p className="product-category">{product.category || 'General'}</p>
//                         <h3 className="product-name">{product.name || 'Untitled Item'}</h3>

//                           <p className="product-description">
//                             {truncateText(product.description)}
//                         </p>

//                         <div className="price-section">
//                             <p className="product-price">
//                                 ₹{product.price ? product.price.toLocaleString() : 'N/A'}
//                                 <span className="price-type">/{product.priceType || 'day'}</span>
//                             </p>
//                             <button onClick={handleFlip} className="flip-button">
//                                 View Owner
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- BACK SIDE --- */}
//                 <div className="flip-card-back">
//                     <img 
//                         src={avatarUrl} 
//                         alt={userName}
//                         className="owner-avatar"
//                     />
//                     <h4 className="owner-name">{userName}</h4>
//                     {formattedAddress && <p className="owner-location">{formattedAddress}</p>}
//                     <p className="owner-bio">"{product.user.bio || 'No bio available.'}"</p>
//                     <a 
//                         href={`/public-profile/${product.user._id}`} 
//                         onClick={(e) => e.stopPropagation()} // Card ke click ko roke
//                         className="profile-button"
//                     >
//                         View Profile
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

// src/components/ProductCard.jsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ProductCard.css'; // Styling ke liye CSS file import karein

// // Description ko chhota karne ke liye helper function
// const truncateText = (text, wordLimit = 10) => {
//     if (!text || typeof text !== 'string') {
//         return '';
//     }
//     const words = text.split(' ');
//     if (words.length > wordLimit) {
//         return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
// };

// const ProductCard = ({ product }) => {
//     const [isFlipped, setIsFlipped] = useState(false);
//     const navigate = useNavigate();

//     // Agar product ka zaroori data nahi hai, to card na dikhayein
//     if (!product || !product.user || !product.images || product.images.length === 0) {
//         return null;
//     }

//     // "View Owner" button par click karne se card flip hoga
//     const handleFlip = (e) => {
//         e.stopPropagation(); // Parent ke click event (handleNavigate) ko rokne ke liye
//         e.preventDefault();
//         setIsFlipped(prev => !prev);
//     };
    
//     // Card par click karne se product details page par jaayega
//     const handleNavigate = () => {
//         if (!isFlipped) {
//             navigate(`/item/${product._id}`);
//         } else {
//              setIsFlipped(false); // Agar card ulta hai to click karne par seedha ho jayega
//         }
//     };

//     // Data ko surakshit tarike se use karne ke liye variables
//     const userName = product.user.name || 'Anonymous User';
//     const formattedAddress = [product.user.address?.city, product.user.address?.state]
//         .filter(Boolean)
//         .join(', ');
//     const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
//     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

//     return (
//         <div 
//             className="flip-card-container"
//             onClick={handleNavigate}
//             role="button"
//             tabIndex={0}
//         >
//             <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                
//                 {/* --- FRONT SIDE --- */}
//                 <div className="flip-card-front">
//                     <img 
//                         src={product.images[0].url} 
//                         alt={product.name}
//                         className="product-image"
//                     />
//                     <div className="product-details">
//                         <p className="product-category">{product.category || 'General'}</p>
//                         <h3 className="product-name">{product.name || 'Untitled Item'}</h3>
//                         <p className="product-description">
//                             {truncateText(product.description)}
//                         </p>
//                         <div className="price-section">
//                             <p className="product-price">
//                                 ₹{product.price ? product.price.toLocaleString() : 'N/A'}
//                                 <span className="price-type">/{product.priceType || 'day'}</span>
//                             </p>
//                             <button onClick={handleFlip} className="flip-button">
//                                 View Owner
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- BACK SIDE --- */}
//                 <div className="flip-card-back">
//                     <img 
//                         src={avatarUrl} 
//                         alt={userName}
//                         className="owner-avatar"
//                     />
//                     <h4 className="owner-name">{userName}</h4>
//                     {formattedAddress && <p className="owner-location">{formattedAddress}</p>}
//                     <p className="owner-bio">"{product.user.bio || 'No bio available.'}"</p>
//                     <a 
//                         href={`/public-profile/${product.user._id}`} 
//                         onClick={(e) => e.stopPropagation()}
//                         className="profile-button"
//                     >
//                         View Profile
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

// src/components/ProductCard.jsx

// import React, { useState, useEffect } from 'react'; // useEffect ko import karein
// import { useNavigate } from 'react-router-dom';
// import './ProductCard.css';

// // Description ko 15 shabdon tak seemit rakhega
// const truncateText = (text, wordLimit = 15) => { // <-- Word limit 10 se 15 kar di hai
//     if (!text || typeof text !== 'string') {
//         return '';
//     }
//     const words = text.split(' ');
//     if (words.length > wordLimit) {
//         return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
// };

// const ProductCard = ({ product }) => {
//     const [isFlipped, setIsFlipped] = useState(false);
//     const navigate = useNavigate();

//     // <-- YEH NAYA CODE ADD KIYA HAI -->
//     // Yeh useEffect card ko 5 second baad wapas flip kar dega
//     useEffect(() => {
//         let timer;
//         if (isFlipped) {
//             timer = setTimeout(() => {
//                 setIsFlipped(false);
//             }, 5000); // 5000 milliseconds = 5 seconds
//         }
//         // Cleanup function: Agar component unmount ho ya card pehle hi flip ho jaye
//         return () => clearTimeout(timer);
//     }, [isFlipped]); // Yeh effect tabhi chalega jab isFlipped ki value badlegi

//     if (!product || !product.user || !product.images || !product.images.length) {
//         return null;
//     }

//     const handleFlip = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         setIsFlipped(prev => !prev);
//     };
    
//     const handleNavigate = () => {
//         if (!isFlipped) {
//             navigate(`/item/${product._id}`);
//         } else {
//              setIsFlipped(false);
//         }
//     };

//     const userName = product.user.name || 'Anonymous User';
//     const formattedAddress = [product.user.address?.city, product.user.address?.state]
//         .filter(Boolean)
//         .join(', ');
//     const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
//     const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

//     return (
//         <div 
//             className="flip-card-container"
//             onClick={handleNavigate}
//             role="button"
//             tabIndex={0}
//         >
//             <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                
//                 {/* --- FRONT SIDE --- */}
//                 <div className="flip-card-front">
//                     <img 
//                         src={product.images[0].url} 
//                         alt={product.name}
//                         className="product-image"
//                     />
//                     <div className="product-details">
//                         <p className="product-category">{product.category || 'General'}</p>
//                         <h3 className="product-name">{product.name || 'Untitled Item'}</h3>
//                         <p className="product-description">
//                             {truncateText(product.description)}
//                         </p>
//                         <div className="price-section">
//                             <p className="product-price">
//                                 ₹{product.price ? product.price.toLocaleString() : 'N/A'}
//                                 <span className="price-type">/{product.priceType || 'day'}</span>
//                             </p>
//                             <button onClick={handleFlip} className="flip-button">
//                                 View Owner
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- BACK SIDE --- */}
//                 <div className="flip-card-back">
//                     <img 
//                         src={avatarUrl} 
//                         alt={userName}
//                         className="owner-avatar"
//                     />
//                     <h4 className="owner-name">{userName}</h4>
//                     {formattedAddress && <p className="owner-location">{formattedAddress}</p>}
//                     <p className="owner-bio">"{product.user.bio || 'No bio available.'}"</p>
//                     <a 
//                         href={`/public-profile/${product.user._id}`} 
//                         onClick={(e) => e.stopPropagation()}
//                         className="profile-button"
//                     >
//                         View Profile
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Aapki original CSS file

const truncateText = (text, wordLimit = 15) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
};

const ProductCard = ({ product }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (isFlipped) {
            timer = setTimeout(() => setIsFlipped(false), 5000);
        }
        return () => clearTimeout(timer);
    }, [isFlipped]);

    if (!product || !product.user || !product.images || !product.images.length) {
        return null;
    }

    const handleFlip = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsFlipped(prev => !prev);
    };
    
    const handleNavigate = () => {
        if (!isFlipped) {
            navigate(`/item/${product._id}`);
        } else {
            setIsFlipped(false);
        }
    };

    // =================================================================
    //                  [YAHAN PAR FINAL FIX HAI]
    // =================================================================
    // Yeh logic ab purane (product.price) aur naye (product.pricePerDay),
    // dono tarah ke products ko handle karegi.
    const displayPrice = product.pricePerDay || product.sellingPrice || product.price;
    const priceLabel = (product.pricePerDay || product.price) ? '/day' : '';
    // =================================================================

    const userName = product.user.name || 'Anonymous User';
    const formattedAddress = [product.user.address?.city, product.user.address?.state].filter(Boolean).join(', ');
    const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
    const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

    return (
        <div className="flip-card-container" onClick={handleNavigate} role="button" tabIndex={0}>
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                
                {/* --- FRONT SIDE --- */}
                <div className="flip-card-front">
                    <img src={product.images[0].url} alt={product.name} className="product-image" />
                    <div className="product-details">
                        <p className="product-category">{product.category || 'General'}</p>
                        <h3 className="product-name">{product.name || 'Untitled Item'}</h3>
                        <p className="product-description">{truncateText(product.description)}</p>
                        <div className="price-section">
                            {/* Price dikhane ke liye naye variables ka istemal */}
                            <p className="product-price">
                                ₹{displayPrice ? displayPrice.toLocaleString() : 'N/A'}
                                {displayPrice && <span className="price-type">{priceLabel}</span>}
                            </p>
                            <button onClick={handleFlip} className="flip-button">View Owner</button>
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="flip-card-back">
                    <img src={avatarUrl} alt={userName} className="owner-avatar" />
                    <h4 className="owner-name">{userName}</h4>
                    {formattedAddress && <p className="owner-location">{formattedAddress}</p>}
                    <p className="owner-bio">"{product.user.bio || 'No bio available.'}"</p>
                    <a href={`/public-profile/${product.user._id}`} onClick={(e) => e.stopPropagation()} className="profile-button">
                        View Profile
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
