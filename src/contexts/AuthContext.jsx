// import React, { createContext, useState, useEffect, useContext } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     // Local storage se user data nikalne ki koshish karein
//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             return null;
//         }
//     });

//     // Jab user state badle, use local storage mein save karein
//     useEffect(() => {
//         if (user) {
//             localStorage.setItem('user', JSON.stringify(user));
//         } else {
//             localStorage.removeItem('user');
//         }
//     }, [user]);

//     const login = async (userData) => {
//         const response = await authService.login(userData);
//         if (response) {
//             setUser(response);
//         }
//         return response;
//     };

//     const logout = () => {
//         authService.logout();
//         setUser(null);
//     };
    
//     // YEH HISSA SABSE ZAROORI HAI 👇
//     const value = {
//         user,
//         setUser, // setUser ko yahan se bhejna zaroori hai
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

//chnage 2

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import authService from '../services/authService';

// // 1. Context ko create karein
// const AuthContext = createContext();

// // 2. Provider component banayein
// export const AuthProvider = ({ children }) => {
//     // User ki state ko manage karein, shuru mein local storage se data lene ki koshish karein
//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             console.error("Failed to parse user from localStorage", error);
//             return null;
//         }
//     });

//     // Jab bhi user state badle, use local storage mein save/remove karein
//     useEffect(() => {
//         try {
//             if (user) {
//                 localStorage.setItem('user', JSON.stringify(user));
//             } else {
//                 localStorage.removeItem('user');
//             }
//         } catch (error) {
//             console.error("Failed to save user to localStorage", error);
//         }
//     }, [user]);

//     // Login function (Error handling ke saath)
//     const login = async (userData) => {
//         try {
//             const response = await authService.login(userData);
//             setUser(response); // User state ko update karein
//             return response;
//         } catch (error) {
//             // Error ko aage bhej dein taaki login page use dikha sake
//             throw error;
//         }
//     };
    
//     // Register function (Aapke project ko complete karne ke liye)
//     const register = async (userData) => {
//         try {
//             const newUser = await authService.register(userData);
//             setUser(newUser);
//             return newUser;
//         } catch (error) {
//             throw error;
//         }
//     };

//     // Logout function
//     const logout = () => {
//         // authService.logout(); // Iski zaroorat nahi hai agar yeh sirf localStorage clear karta hai
//         setUser(null); // State ko null set karne se useEffect localStorage ko saaf kar dega
//     };
    
//     // Context ki value jo poore app me available hogi
//     // Hum 'setUser' ko direct nahi bhejte taaki state surakshit rahe
//     const value = {
//         user,
//         login,
//         register, // Register function ko bhi add karein
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // 3. Custom hook banayein context ko aasaani se use karne ke liye
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

//chnage 3

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import authService from '../services/authService';
// import axios from 'axios'; // Axios ko import karein

// // 1. Context ko create karein aur export karein
// export const AuthContext = createContext();

// // 2. Provider component banayein
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             return null;
//         }
//     });

//     useEffect(() => {
//         // Jab bhi user state badle, localStorage aur axios headers ko update karein
//         if (user && user.token) {
//             localStorage.setItem('user', JSON.stringify(user));
//             axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
//         } else {
//             localStorage.removeItem('user');
//             delete axios.defaults.headers.common['Authorization'];
//         }
//     }, [user]);

//     const login = async (userData) => {
//         try {
//             const response = await authService.login(userData);
//             setUser(response);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     };
    
//     const register = async (userData) => {
//         try {
//             const newUser = await authService.register(userData);
//             setUser(newUser);
//             return newUser;
//         } catch (error) {
//             throw error;
//         }
//     };

//     const logout = () => {
//         setUser(null);
//     };
    
//     const value = {
//         user,
//         login,
//         register,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // 3. Custom hook banayein
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // --- YAHI SABSE ZAROORI BADLAAV HAI ---
// // 4. Provider ko 'export default' karein
// export default AuthProvider;


//chnage 4

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import authService from '../services/authService';

// // 1. Create the context
// const AuthContext = createContext();

// // 2. Create the Provider component
// // This component will manage all authentication logic for your entire app.
// export const AuthProvider = ({ children }) => {
//     // Initialize user state by trying to read from localStorage.
//     // This makes sure the user stays logged in even after a page refresh.
//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             console.error("AuthContext: Failed to parse user from localStorage", error);
//             return null;
//         }
//     });

//     // This useEffect is the most important part.
//     // It runs automatically whenever the 'user' state changes.
//     useEffect(() => {
//         try {
//             if (user && user.token) {
//                 // If a user is logged in:
//                 // a) Save the complete user object to localStorage for persistence.
//                 localStorage.setItem('user', JSON.stringify(user));
                
//                 // b) Set the Authorization header for all future Axios requests.
//                 // This is the key fix for the "401 Unauthorized" error.
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
//             } else {
//                 // If the user is logged out (user is null):
//                 // a) Remove the user data from localStorage.
//                 localStorage.removeItem('user');
//                 // b) Delete the Authorization header from Axios defaults.
//                 delete axios.defaults.headers.common['Authorization'];
//             }
//         } catch (error) {
//             console.error("AuthContext: Failed to update localStorage/axios headers", error);
//         }
//     }, [user]);

//     // Login function
//     const login = async (credentials) => {
//         try {
//             const data = await authService.login(credentials);
//             // Set the user state. This will trigger the useEffect above.
//             setUser(data); 
//             return data;
//         } catch (error) {
//             // Pass the error up so the login form can display it
//             throw error; 
//         }
//     };
    
//     // Register function
//     const register = async (userData) => {
//         try {
//             const newUser = await authService.register(userData);
//             // Set the user state after successful registration.
//             setUser(newUser); 
//             return newUser;
//         } catch (error) {
//             throw error;
//         }
//     };

//     // Logout function
//     const logout = () => {
//         // Setting user to null will trigger the useEffect to clear everything.
//         setUser(null); 
//     };
    
//     // The value provided to all child components
//     const value = {
//         user,
//         login,
//         register,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // 3. Create a custom hook for easy access to the context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // 4. Export the provider as the default
// export default AuthProvider;


//change 5


//change 6

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import authService from '../services/authService';
// import userService from '../services/userService'; // <-- Naya import

// // 1. Create the authentication context
// const AuthContext = createContext();

// // 2. Create a custom hook for easy access to the context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // 3. Create the Provider component
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             console.error("AuthContext: Failed to parse user from localStorage on initial load.", error);
//             return null;
//         }
//     });

//     useEffect(() => {
//         try {
//             if (user && user.token) {
//                 localStorage.setItem('user', JSON.stringify(user));
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
//             } else {
//                 localStorage.removeItem('user');
//                 delete axios.defaults.headers.common['Authorization'];
//             }
//         } catch (error) {
//             console.error("AuthContext: Failed to update authentication state.", error);
//         }
//     }, [user]);

//     // Login function - UPDATED
//     const login = async (credentials) => {
//         try {
//             // Step 1: Login karein aur token prapt karein
//             const loginData = await authService.login(credentials);
//             const token = loginData.token;

//             if (token) {
//                 // Step 2: Us token ka istemaal karke poori user profile fetch karein
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                 const fullProfile = await userService.getMyProfile(token);

//                 // Step 3: AuthContext me poori profile aur token ek saath save karein
//                 setUser({ ...fullProfile, token: token });
//             }
            
//             return loginData;
//         } catch (error) {
//             delete axios.defaults.headers.common['Authorization'];
//             throw error;
//         }
//     };
    
//     // Register function - UPDATED
//     const register = async (userData) => {
//         try {
//             // Step 1: Register karein aur naya token prapt karein
//             const newUser = await authService.register(userData);
//             const token = newUser.token;

//             if (token) {
//                 // Step 2: Naye token ka istemaal karke poori profile fetch karein
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                 const fullProfile = await userService.getMyProfile(token);
                
//                 // Step 3: AuthContext me poori profile aur token save karein
//                 setUser({ ...fullProfile, token: token });
//             }
//             return newUser;
//         } catch (error) {
//             delete axios.defaults.headers.common['Authorization'];
//             throw error;
//         }
//     };

//     // Logout function
//     const logout = () => {
//         setUser(null); 
//     };
    
//     // The value object provided to all child components
//     const value = {
//         user,
//         setUser,
//         isAuthenticated: !!user,
//         isAdmin: user?.isAdmin || false,
//         login,
//         register,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

//chnage 7

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import authService from '../services/authService';
import userService from '../services/userService';

// 1. Create the authentication context
const AuthContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("AuthContext: Failed to parse user from localStorage on initial load.", error);
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            } else {
                localStorage.removeItem('user');
                delete axios.defaults.headers.common['Authorization'];
            }
        } catch (error) {
            console.error("AuthContext: Failed to update authentication state.", error);
        }
    }, [user]);

    // Login function - UPDATED with console.log
    const login = async (credentials) => {
        try {
            const loginData = await authService.login(credentials);
            const token = loginData.token;

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const fullProfile = await userService.getMyProfile(token);

                // --- DEBUGGING LOG ---
                console.log("LOGIN KE BAAD FETCH HUI PROFILE:", fullProfile);

                setUser({ ...fullProfile, token: token });
            }
            
            return loginData;
        } catch (error) {
            delete axios.defaults.headers.common['Authorization'];
            throw error;
        }
    };
    
    // Register function - UPDATED with console.log
    const register = async (userData) => {
        try {
            const newUser = await authService.register(userData);
            const token = newUser.token;

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const fullProfile = await userService.getMyProfile(token);
                
                // --- DEBUGGING LOG ---
                console.log("REGISTER KE BAAD FETCH HUI PROFILE:", fullProfile);

                setUser({ ...fullProfile, token: token });
            }
            return newUser;
        } catch (error) {
            delete axios.defaults.headers.common['Authorization'];
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        setUser(null); 
    };
    
    // The value object provided to all child components
    const value = {
        user,
        setUser,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;