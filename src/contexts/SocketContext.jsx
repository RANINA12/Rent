import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext'; // AuthContext se user lene ke liye

// 1. Context ko banayein
const SocketContext = createContext();

// 2. Custom hook banayein
export const useSocket = () => {
    return useContext(SocketContext);
};

// 3. Provider component banayein
const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth(); // Logged-in user ki details lein

    useEffect(() => {
        // Sirf tabhi connect karein jab user logged-in ho
        if (user && user._id) {
            // Apne backend server se connect karein
            const newSocket = io("http://localhost:5000");
            setSocket(newSocket);

            // Backend ko user ki ID bhejein taaki socket aur user link ho sakein
            newSocket.emit('addUser', user._id);

            // Cleanup function: Jab component unmount ho ya user logout ho, toh disconnect karein
            return () => {
                newSocket.disconnect();
            };
        } else {
            // Agar user nahi hai, toh purane socket ko disconnect kar dein
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
        // Yeh effect 'user' par depend karta hai
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// --- YAHI SABSE ZAROORI BADLAAV HAI ---
// 4. Provider ko 'export default' karein
export default SocketProvider;