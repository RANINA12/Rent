// import React, { createContext, useState, useEffect, useContext } from 'react';
// import itemService from '../services/itemService';

// const ItemContext = createContext();

// export const ItemProvider = ({ children }) => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null); // Error ke liye state

//     useEffect(() => {
//         const fetchAllItems = async () => {
//             try {
//                 setLoading(true);
//                 setError(null); // Har baar fetch se pehle error reset karein
//                 const data = await itemService.getItems(); // Maan rahe hain ki yeh service function hai
//                 setItems(data.items || []); // Agar data.items nahi hai toh empty array set karein
//             } catch (err) {
//                 console.error('Failed to load items:', err);
//                 setError('Sorry, we could not load the items right now.'); // User-friendly error message
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllItems();
//     }, []);

//     const addItem = (newItem) => {
//         setItems(prevItems => [newItem, ...prevItems]);
//     };

//     const value = {
//         items,
//         loading,
//         error, // Error ko context se provide karein
//         addItem,
//         // Yeh filter waala logic ab bhi kaam karega
//         featuredItems: items.filter(item => item.isFeatured),
//     };

//     return (
//         <ItemContext.Provider value={value}>
//             {children}
//         </ItemContext.Provider>
//     );
// };

// export const useItems = () => {
//     return useContext(ItemContext);
// };


// // change 2

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import itemService from '../services/itemService';

// const ItemContext = createContext();

// export const ItemProvider = ({ children }) => {
//     // Sirf featured items ke liye state banayein
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFeaturedItems = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 // YEH SABSE ZAROORI HAI: getItems() ke bajaye getFeaturedItems() ko call karein
//                 const data = await itemService.getFeaturedItems();
//                 if (data.success) {
//                     setFeaturedItems(data.items);
//                 } else {
//                     // Agar backend se success: false aata hai
//                     setError('Could not fetch featured items.');
//                     setFeaturedItems([]);
//                 }
//             } catch (err) {
//                 console.error('Failed to load featured items:', err);
//                 setError('Sorry, we could not load the items right now.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFeaturedItems();
//     }, []); // Yeh useEffect sirf ek baar component load hone par chalega
    
//     // Context ki value jo poore app me available hogi
//     const value = {
//         featuredItems,
//         loading,
//         error,
//     };

//     return (
//         <ItemContext.Provider value={value}>
//             {children}
//         </ItemContext.Provider>
//     );
// };

// // Custom hook jisse context ko aasaani se use kar sakte hain
// export const useItems = () => {
//     return useContext(ItemContext);
// };

//chnage 3

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import itemService from '../services/itemService';

// const ItemContext = createContext();

// export const ItemProvider = ({ children }) => {
//     // Sirf featured items ke liye state banayein
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFeaturedItems = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 // YEH SABSE ZAROORI HAI: getItems() ke bajaye getFeaturedItems() ko call karein
//                 const data = await itemService.getFeaturedItems();
                
//                 if (data.success && Array.isArray(data.items)) {
//                     setFeaturedItems(data.items);
//                 } else {
//                     // Agar backend se success: false ya galat data aata hai
//                     setError('Could not fetch featured items.');
//                     setFeaturedItems([]);
//                 }
//             } catch (err) {
//                 console.error('Failed to load featured items:', err);
//                 setError('Sorry, we could not load the items right now.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFeaturedItems();
//     }, []); // Yeh useEffect sirf ek baar component load hone par chalega
    
//     // Context ki value jo poore app me available hogi
//     const value = {
//         featuredItems,
//         loading,
//         error,
//     };

//     return (
//         <ItemContext.Provider value={value}>
//             {children}
//         </ItemContext.Provider>
//     );
// };

// // Custom hook jisse context ko aasaani se use kar sakte hain
// export const useItems = () => {
//     return useContext(ItemContext);
// };

//chnage 4

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import itemService from '../services/itemService';
// import { useLocation } from './LocationContext'; // LocationContext se city lene ke liye

// const ItemContext = createContext();

// export const ItemProvider = ({ children }) => {
//     const { city } = useLocation(); // LocationContext se city ka naam lein
//        console.log("2. City received in ItemContext:", city);
//     const [featuredItems, setFeaturedItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Jab tak city load na ho, tab tak data fetch na karein
//         if (!city) {
//             // Agar city nahi hai, loading ko false kar dein taaki message dikhe
//             setLoading(false);
//             return;
//         }

//         const fetchFeaturedItems = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 // Backend se city ke hisaab se featured items maangein
//                 const data = await itemService.getFeaturedItemsByCity(city);
                
//                 if (data.success && Array.isArray(data.items)) {
//                     setFeaturedItems(data.items);
//                 } else {
//                     setFeaturedItems([]);
//                 }
//             } catch (err) {
//                 console.error('Failed to load featured items:', err);
//                 setError('Could not load items for your city.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFeaturedItems();
//     }, [city]); // Yeh useEffect tab chalega jab city ki value badlegi
    
//     const value = { featuredItems, loading, error };

//     return (
//         <ItemContext.Provider value={value}>
//             {children}
//         </ItemContext.Provider>
//     );
// };

// export const useItems = () => {
//     return useContext(ItemContext);
// };

//chnage 5

import React, { createContext, useState, useEffect, useContext } from 'react';
// --- Yahan badlaav kiya gaya hai ---
import itemService from '../services/itemService';
import { useLocation } from './LocationContext'; // LocationContext se city lene ke liye

// 1. Context ko banayein aur export karein
export const ItemContext = createContext();

// 2. Provider component banayein
const ItemProvider = ({ children }) => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // LocationContext se 'selectedCity' lein
    const { selectedCity } = useLocation();

    useEffect(() => {
        // Yeh function featured items ko city ke hisaab se fetch karega
        const fetchFeatured = () => {
            // Jab tak city load na ho, tab tak data fetch na karein
            if (!selectedCity) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');
            itemService.getFeaturedItemsByCity(selectedCity)
                .then(data => {
                    // Service ab seedha array ('data') bhejti hai. Hum wahi set karenge.
                    setFeaturedItems(data);
                })
                .catch(err => {
                    setError(`Could not load items for ${selectedCity}.`);
                    console.error("Failed to fetch featured items:", err);
                    setFeaturedItems([]); // Error hone par khaali array set karein
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchFeatured();
    }, [selectedCity]); // Yeh tabhi chalega jab city badlegi

    const value = {
        featuredItems,
        loading,
        error,
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};

// 3. Custom hook banayein
export const useItems = () => {
    return useContext(ItemContext);
};

// 4. Provider ko 'export default' karein
export default ItemProvider;
