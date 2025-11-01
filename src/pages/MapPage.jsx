// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// // Sample data for renters near a location (with real coordinates for Indore)
// const nearbyRenters = [
//     { id: 1, name: 'Sofa Set', position: { lat: 22.720, lng: 75.857 } }, 
//     { id: 2, name: 'Microwave', position: { lat: 22.718, lng: 75.860 } },
//     { id: 3, name: 'Study Table', position: { lat: 22.722, lng: 75.855 } }, 
//     { id: 4, name: 'Air Cooler', position: { lat: 22.719, lng: 75.858 } },
// ];

// // Map container style
// const containerStyle = {
//   width: '100%',
//   height: '600px'
// };

// // Center of the map (Indore)
// const center = {
//   lat: 22.7196,
//   lng: 75.8577
// };

// const MapPage = () => {
//     const { city } = useParams();
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//     });

//     if (!isLoaded) {
//         return <div>Loading Map...</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 text-center">
//             <h1 className="text-3xl font-bold mb-2">
//                 Rentals Near You in <span className="capitalize text-teal-600">{city}</span>
//             </h1>
//             <p className="text-gray-600 mb-6">Showing items available for rent within a 2km radius.</p>
            
//             <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden">
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={15}
//                 >
//                     {/* Your Location Marker */}
//                     <Marker position={center} title="You are here" />
                    
//                     {/* Nearby Renters Markers */}
//                     {nearbyRenters.map(renter => (
//                         <Marker 
//                             key={renter.id} 
//                             position={renter.position}
//                             title={renter.name}
//                         />
//                     ))}
//                 </GoogleMap>
//             </div>
//         </div>
//     );
// };

// export default MapPage;

// import React, { useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { GoogleMap, useJsApiLoader, Marker, Circle, OverlayView } from '@react-google-maps/api';

// // --- Sample Data (Asli app mein yeh backend se aayega) ---
// const sampleItems = [
//     { id: 1, name: 'Vintage Sofa', price: 850, user: { name: 'Riya', avatar: 'https://placehold.co/50x50/f9a8d4/4c1d95?text=R' }, position: { lat: 22.725, lng: 75.865 } },
//     { id: 2, name: 'Microwave Oven', price: 400, user: { name: 'Amit', avatar: 'https://placehold.co/50x50/a5b4fc/1e1b4b?text=A' }, position: { lat: 22.718, lng: 75.860 } },
//     { id: 3, name: 'Study Table', price: 300, user: { name: 'Priya', avatar: 'https://placehold.co/50x50/fde047/78350f?text=P' }, position: { lat: 22.722, lng: 75.855 } },
//     { id: 4, name: 'Mountain Bike', price: 600, user: { name: 'Karan', avatar: 'https://placehold.co/50x50/6ee7b7/064e3b?text=K' }, position: { lat: 22.719, lng: 75.858 } },
// ];

// // --- Map Styling ---
// const containerStyle = { width: '100%', height: '70vh' };
// const initialCenter = { lat: 22.7196, lng: 75.8577 }; // Indore Center
// const circleOptions = {
//     strokeColor: '#4A90E2',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#4A90E2',
//     fillOpacity: 0.15,
// };

// // --- Custom Marker ko Center Karne ke liye Function ---
// const getPixelPositionOffset = (width, height) => ({
//   x: -(width / 2),
//   y: -(height / 2),
// });


// const MapPage = () => {
//     const { city } = useParams();
//     const [map, setMap] = useState(null);
//     const [userLocation, setUserLocation] = useState(null);
//     const [selectedItem, setSelectedItem] = useState(null);

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//     });

//     const onLoad = useCallback(function callback(mapInstance) {
//         setMap(mapInstance);
//     }, []);

//     const onUnmount = useCallback(function callback(map) {
//         setMap(null);
//     }, []);

//     const handleGetLiveLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const newPos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//                 setUserLocation(newPos);
//                 map.panTo(newPos);
//                 map.setZoom(15);
//             }, () => {
//                 alert('Error: The Geolocation service failed.');
//             });
//         } else {
//             alert("Error: Your browser doesn't support geolocation.");
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold mb-2">
//                     Rentals Near You in <span className="capitalize text-teal-600">{city}</span>
//                 </h1>
//                 <p className="text-gray-600 mb-4">Click the button to find items around your current location.</p>
//                 <button 
//                     onClick={handleGetLiveLocation}
//                     className="bg-teal-600 text-white font-bold py-2 px-6 rounded-full mb-6 hover:bg-teal-700 transition-colors"
//                 >
//                     📍 Use My Live Location
//                 </button>
//             </div>
            
//             <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden relative">
//                 {isLoaded ? (
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={initialCenter}
//                         zoom={14}
//                         onLoad={onLoad}
//                         onUnmount={onUnmount}
//                         options={{ streetViewControl: false, mapTypeControl: false }}
//                     >
//                         {/* User's Current Location and Radius Circle */}
//                         {userLocation && (
//                             <>
//                                 <Marker position={userLocation} title="You are here" />
//                                 <Circle center={userLocation} radius={2000} options={circleOptions} />
//                             </>
//                         )}

//                         {/* Custom Markers for Items */}
//                         {sampleItems.map(item => (
//                             <OverlayView
//                                 key={item.id}
//                                 position={item.position}
//                                 mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//                                 getPixelPositionOffset={getPixelPositionOffset}
//                             >
//                                 <div 
//                                     onClick={() => setSelectedItem(item)}
//                                     className="flex items-center bg-white p-1 rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-transform"
//                                 >
//                                     <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full" />
//                                     <span className="ml-2 mr-3 font-bold text-gray-800">₹{item.price}</span>
//                                 </div>
//                             </OverlayView>
//                         ))}
//                     </GoogleMap>
//                 ) : <div>Loading Map...</div>}

//                 {/* Animated Info Card */}
//                 {selectedItem && (
//                     <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-lg shadow-2xl flex items-center p-4 transition-all duration-300 ${selectedItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                         <img src="https://placehold.co/100x100/e2e8f0/334155?text=Item" alt={selectedItem.name} className="w-24 h-24 object-cover rounded-md" />
//                         <div className="ml-4 text-left">
//                             <h3 className="font-bold text-lg">{selectedItem.name}</h3>
//                             <p className="text-gray-600">Hosted by {selectedItem.user.name}</p>
//                             <p className="font-bold text-teal-600 mt-1">₹{selectedItem.price} / day</p>
//                         </div>
//                         <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MapPage;

// import React, { useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { GoogleMap, useJsApiLoader, Marker, Circle, OverlayView, Polygon } from '@react-google-maps/api';

// // --- Sample Data (Asli app mein yeh backend se aayega) ---
// const sampleItems = [
//   { id: 1, name: 'Vintage Sofa', price: 850, user: { name: 'Riya', avatar: 'https://placehold.co/50x50/f9a8d4/4c1d95?text=R' }, position: { lat: 22.725, lng: 75.865 }, area: "Vijay Nagar" },
//   { id: 2, name: 'Microwave Oven', price: 400, user: { name: 'Amit', avatar: 'https://placehold.co/50x50/a5b4fc/1e1b4b?text=A' }, position: { lat: 22.718, lng: 75.860 }, area: "Palasia" },
//   { id: 3, name: 'Study Table', price: 300, user: { name: 'Priya', avatar: 'https://placehold.co/50x50/fde047/78350f?text=P' }, position: { lat: 22.722, lng: 75.855 }, area: "Rajwada" },
//   { id: 4, name: 'Mountain Bike', price: 600, user: { name: 'Karan', avatar: 'https://placehold.co/50x50/6ee7b7/064e3b?text=K' }, position: { lat: 22.719, lng: 75.858 }, area: "Vijay Nagar" },
// ];

// // --- Map Styling ---
// const containerStyle = { width: '100%', height: '70vh' };
// const initialCenter = { lat: 22.7196, lng: 75.8577 }; // Indore Center
// const circleOptions = {
//   strokeColor: '#4A90E2',
//   strokeOpacity: 0.8,
//   strokeWeight: 2,
//   fillColor: '#4A90E2',
//   fillOpacity: 0.15,
// };

// // Indore Areas (Polygon boundaries - dummy approx)
// const indoreAreas = {
//   "Vijay Nagar": [
//     { lat: 22.75, lng: 75.87 },
//     { lat: 22.74, lng: 75.85 },
//     { lat: 22.73, lng: 75.86 },
//     { lat: 22.74, lng: 75.88 },
//   ],
//   "Palasia": [
//     { lat: 22.72, lng: 75.86 },
//     { lat: 22.72, lng: 75.84 },
//     { lat: 22.71, lng: 75.85 },
//     { lat: 22.71, lng: 75.87 },
//   ],
//   "Rajwada": [
//     { lat: 22.72, lng: 75.858 },
//     { lat: 22.721, lng: 75.854 },
//     { lat: 22.719, lng: 75.855 },
//     { lat: 22.719, lng: 75.859 },
//   ]
// };

// // Custom Marker ko Center Karne ke liye Function
// const getPixelPositionOffset = (width, height) => ({
//   x: -(width / 2),
//   y: -(height / 2),
// });

// const MapPage = () => {
//   const { city } = useParams();
//   const [map, setMap] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedArea, setSelectedArea] = useState("Vijay Nagar");

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//   });

//   const onLoad = useCallback(function callback(mapInstance) {
//     setMap(mapInstance);
//   }, []);

//   const onUnmount = useCallback(function callback() {
//     setMap(null);
//   }, []);

//   const handleGetLiveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const newPos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         // Indore bounds check
//         const indoreLatMin = 22.60, indoreLatMax = 22.80;
//         const indoreLonMin = 75.70, indoreLonMax = 76.10;
//         if (newPos.lat >= indoreLatMin && newPos.lat <= indoreLatMax &&
//           newPos.lng >= indoreLonMin && newPos.lng <= indoreLonMax) {
//           setUserLocation(newPos);
//           map.panTo(newPos);
//           map.setZoom(15);
//         } else {
//           alert("Outside Indore. Defaulting to Indore Center.");
//           setUserLocation(initialCenter);
//           map.panTo(initialCenter);
//           map.setZoom(14);
//         }
//       }, () => {
//         alert('Error: The Geolocation service failed.');
//       });
//     } else {
//       alert("Error: Your browser doesn't support geolocation.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">
//           Rentals Near You in <span className="capitalize text-teal-600">{city}</span>
//         </h1>
//         <p className="text-gray-600 mb-4">Click the button to find items around your current location.</p>

//         {/* Live Location Button */}
//         <button
//           onClick={handleGetLiveLocation}
//           className="bg-teal-600 text-white font-bold py-2 px-6 rounded-full mb-4 hover:bg-teal-700 transition-colors"
//         >
//           📍 Use My Live Location
//         </button>

//         {/* Area Filter Dropdown */}
//         <select
//           className="border rounded px-4 py-2"
//           value={selectedArea}
//           onChange={(e) => setSelectedArea(e.target.value)}
//         >
//           {Object.keys(indoreAreas).map(area => (
//             <option key={area} value={area}>{area}</option>
//           ))}
//         </select>
//       </div>

//       <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden relative">
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={initialCenter}
//             zoom={14}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//             options={{ streetViewControl: false, mapTypeControl: false }}
//           >
//             {/* User's Current Location */}
//             {userLocation && (
//               <>
//                 <Marker position={userLocation} title="You are here" />
//                 <Circle center={userLocation} radius={2000} options={circleOptions} />
//               </>
//             )}

//             {/* Selected Area Polygon */}
//             {selectedArea && (
//               <Polygon
//                 paths={indoreAreas[selectedArea]}
//                 options={{
//                   strokeColor: "#2563eb",
//                   strokeOpacity: 0.8,
//                   strokeWeight: 2,
//                   fillColor: "#60a5fa",
//                   fillOpacity: 0.25,
//                 }}
//               />
//             )}

//             {/* Custom Bubble Markers for Items in Selected Area */}
//             {sampleItems
//               .filter(item => item.area === selectedArea)
//               .map(item => (
//                 <OverlayView
//                   key={item.id}
//                   position={item.position}
//                   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//                   getPixelPositionOffset={getPixelPositionOffset}
//                 >
//                   <div
//                     onClick={() => setSelectedItem(item)}
//                     className="flex items-center bg-white p-2 rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-transform animate-bounce"
//                   >
//                     <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full" />
//                     <span className="ml-2 mr-3 font-bold text-gray-800">₹{item.price}</span>
//                   </div>
//                 </OverlayView>
//               ))}
//           </GoogleMap>
//         ) : <div>Loading Map...</div>}

//         {/* Animated Info Card */}
//         {selectedItem && (
//           <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-lg shadow-2xl flex items-center p-4 transition-all duration-300 ${selectedItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <img src="https://placehold.co/100x100/e2e8f0/334155?text=Item" alt={selectedItem.name} className="w-24 h-24 object-cover rounded-md" />
//             <div className="ml-4 text-left">
//               <h3 className="font-bold text-lg">{selectedItem.name}</h3>
//               <p className="text-gray-600">Hosted by {selectedItem.user.name}</p>
//               <p className="font-bold text-teal-600 mt-1">₹{selectedItem.price} / day</p>
//             </div>
//             <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapPage;


//***** */

//****** */

// =================================================================
// ONE-TIME SETUP FOR THIS PAGE (Ek Baar Setup Zaroori Hai)
// =================================================================
// Pehle, yeh command apne project ke terminal me chalayein:
//
//    npm install @react-google-maps/api
//
// Iske baad server ko restart karein (Ctrl+C dabakar, fir npm run dev).
// =================================================================

import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, Circle, OverlayView, Polygon } from '@react-google-maps/api';

// =================================================================
// --- === ACTION REQUIRED: API KEY SETUP === ---
// =================================================================
// Neeche di gayi line me "YOUR_GOOGLE_MAPS_API_KEY" ko apni asli
// Google Maps API Key se replace karein. Key ke bina map nahi chalega.
//
const GOOGLE_MAPS_API_KEY = "AIzaSyDqT96zbjphsDWK_4skUB2LPv7b5vRKozc";
//
// =================================================================

// --- Sample Data (In a real app, this would come from your backend API) ---
const sampleItems = [
    { id: 1, name: 'Vintage Sofa', price: 850, user: { name: 'Riya', avatar: 'https://placehold.co/50x50/f9a8d4/4c1d95?text=R' }, position: { lat: 22.745, lng: 75.875 }, area: "Vijay Nagar" },
    { id: 2, name: 'Microwave Oven', price: 400, user: { name: 'Amit', avatar: 'https://placehold.co/50x50/a5b4fc/1e1b4b?text=A' }, position: { lat: 22.715, lng: 75.865 }, area: "Palasia" },
    { id: 3, name: 'Study Table', price: 300, user: { name: 'Priya', avatar: 'https://placehold.co/50x50/fde047/78350f?text=P' }, position: { lat: 22.718, lng: 75.856 }, area: "Rajwada" },
    { id: 4, name: 'Mountain Bike', price: 600, user: { name: 'Karan', avatar: 'https://placehold.co/50x50/6ee7b7/064e3b?text=K' }, position: { lat: 22.735, lng: 75.862 }, area: "Vijay Nagar" },
];

// --- Map Styling & Configuration ---
const containerStyle = { width: '100%', height: '70vh' };
const initialCenter = { lat: 22.7196, lng: 75.8577 }; // Indore Center
const circleOptions = {
    strokeColor: '#4A90E2', strokeOpacity: 0.8, strokeWeight: 2,
    fillColor: '#4A90E2', fillOpacity: 0.15,
};

// --- Area Boundaries for Polygons ---
const indoreAreas = {
    "Vijay Nagar": [ { lat: 22.753, lng: 75.898 }, { lat: 22.758, lng: 75.882 }, { lat: 22.746, lng: 75.879 }, { lat: 22.742, lng: 75.895 }, ],
    "Palasia": [ { lat: 22.729, lng: 75.889 }, { lat: 22.730, lng: 75.877 }, { lat: 22.720, lng: 75.878 }, { lat: 22.721, lng: 75.890 }, ],
    "Rajwada": [ { lat: 22.721, lng: 75.858 }, { lat: 22.722, lng: 75.854 }, { lat: 22.717, lng: 75.853 }, { lat: 22.716, lng: 75.857 }, ]
};

// --- Helper function to find the center of a polygon ---
const getPolygonCenter = (paths) => {
    if (!window.google || !window.google.maps) return initialCenter;
    const bounds = new window.google.maps.LatLngBounds();
    paths.forEach(path => {
        bounds.extend(new window.google.maps.LatLng(path.lat, path.lng));
    });
    const center = bounds.getCenter();
    return { lat: center.lat(), lng: center.lng() };
};


const MapPage = () => {
    const { city } = useParams();
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedArea, setSelectedArea] = useState("Vijay Nagar");

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const onLoad = useCallback(function callback(mapInstance) {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    useEffect(() => {
        if (map && selectedArea && indoreAreas[selectedArea]) {
            const center = getPolygonCenter(indoreAreas[selectedArea]);
            map.panTo(center);
            map.setZoom(15);
        }
    }, [selectedArea, map]);

    const handleGetLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
                setUserLocation(newPos);
                if(map) {
                    map.panTo(newPos);
                    map.setZoom(15);
                }
                setSelectedArea('');
            }, () => { console.error('Error: The Geolocation service failed.'); });
        } else { console.error("Error: Your browser doesn't support geolocation."); }
    };

    const handleAreaChange = (e) => {
        setSelectedItem(null);
        setUserLocation(null);
        setSelectedArea(e.target.value);
    };
    
    // Check for API key validity before rendering
    if (GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY") {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center p-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Map Configuration Error</h2>
                <p className="text-gray-700">Please provide a valid Google Maps API key in the `MapPage.jsx` file to continue.</p>
            </div>
        );
    }

    if (!isLoaded) return <div className="flex justify-center items-center h-screen">Loading Map...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Rentals Near You in <span className="capitalize text-teal-600">{city}</span></h1>
                <p className="text-gray-600 mb-4">Select an area or use your live location to find items.</p>
                <div className="flex justify-center items-center gap-4">
                    <button onClick={handleGetLiveLocation} className="bg-teal-600 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-700 transition-colors">📍 Use My Live Location</button>
                    <select value={selectedArea} onChange={handleAreaChange} className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                        {Object.keys(indoreAreas).map(area => (<option key={area} value={area}>{area}</option>))}
                    </select>
                </div>
            </div>

            <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden relative">
                <GoogleMap mapContainerStyle={containerStyle} center={initialCenter} zoom={14} onLoad={onLoad} onUnmount={onUnmount} options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}>
                    {userLocation && (<> <Marker position={userLocation} title="You are here" /> <Circle center={userLocation} radius={1500} options={circleOptions} /> </>)}
                    {selectedArea && indoreAreas[selectedArea] && (<Polygon paths={indoreAreas[selectedArea]} options={{ strokeColor: "#2563eb", strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#60a5fa", fillOpacity: 0.25 }}/>)}
                    {sampleItems.filter(item => !selectedArea || item.area === selectedArea).map(item => (
                        <OverlayView key={item.id} position={item.position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                            <div onClick={() => setSelectedItem(item)} className="flex items-center bg-white p-1 rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-transform absolute -translate-x-1/2 -translate-y-1/2">
                                <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full" />
                                <span className="ml-2 mr-3 font-bold text-gray-800">₹{item.price}</span>
                            </div>
                        </OverlayView>
                    ))}
                </GoogleMap>

                {selectedItem && (
                    <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-lg shadow-2xl flex items-center p-4 transition-all duration-300 ${selectedItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                        <img src={`https://placehold.co/100x100/e2e8f0/334155?text=${selectedItem.name.charAt(0)}`} alt={selectedItem.name} className="w-24 h-24 object-cover rounded-md" />
                        <div className="ml-4 flex-grow">
                            <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                            <p className="text-gray-600 text-sm">Hosted by {selectedIte.user.name}</p>
                            <p className="font-bold text-teal-600 mt-1 text-base">₹{selectedItem.price} / day</p>
                        </div>
                        <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapPage;
