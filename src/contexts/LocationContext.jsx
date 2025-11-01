// import React, { createContext, useState, useEffect, useContext } from 'react';

// const LocationContext = createContext();

// export const LocationProvider = ({ children }) => {
//     const [city, setCity] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Check karein ki user ne pehle se location save ki hai ya nahi
//         const savedCity = localStorage.getItem('userCity');
//         if (savedCity) {
//             setCity(savedCity);
//             setLoading(false);
//         } else {
//             // Agar nahi, toh location poochne ki koshish karein
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     // Reverse geocoding se city ka naam pata karein (ek free API ka istemal karke)
//                     try {
//                         const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
//                         const data = await response.json();
//                         const userCity = data.city || 'Indore'; // Default city
//                         setCity(userCity);
//                         localStorage.setItem('userCity', userCity);
//                     } catch (error) {
//                         setCity('Indore'); // Error hone par default city
//                     } finally {
//                         setLoading(false);
//                     }
//                 },
//                 () => {
//                     // Agar user permission nahi deta
//                     setCity('Indore'); // Default city set karein
//                     setLoading(false);
//                 }
//             );
//         }
//     }, []);

//   console.log("1. City determined in LocationContext:", city);

//     const value = { city, loading };

//     return (
//         <LocationContext.Provider value={value}>
//             {children}
//         </LocationContext.Provider>
//     );
// };

// export const useLocation = () => {
//     return useContext(LocationContext);
// };


//change 2

import React, { createContext, useState, useContext } from 'react';

// --- YAHI SABSE ZAROORI BADLAAV HAI ---
// 1. Context ko banayein aur 'export' karein
export const LocationContext = createContext();

// 2. Ek Provider component banayein jo poori app ko state dega
const LocationProvider = ({ children }) => {
    // Default sheher 'Indore' set karein. Navbar ka modal isey badal sakta hai.
    const [selectedCity, setSelectedCity] = useState('Indore'); 

    // Yeh value poori app mein available hogi
    const value = {
        selectedCity,
        setSelectedCity,
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};

// 3. Ek custom hook banayein taaki context ko istemaal karna aasan ho
export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};

export default LocationProvider;