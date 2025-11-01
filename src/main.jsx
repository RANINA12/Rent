// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // <-- Naya import
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { ItemProvider } from './contexts/ItemContext';
// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* Poori App ko BrowserRouter se wrap karein */}
//     <BrowserRouter>
//       <AuthProvider>
//         <ItemProvider>
//           <App />
//         </ItemProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

//chnage 2

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { AuthProvider } from "./contexts/AuthContext";
// import { ItemProvider } from "./contexts/ItemContext";
// import { LocationProvider } from "./contexts/LocationContext";
// import { SocketProvider } from "./contexts/SocketContext"; // 👈 Naya import
// import "./index.css";

// import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <LocationProvider>
//           <ItemProvider>
//             <SocketProvider> {/* 👈 Naya Provider */}
//               <App />
//             </SocketProvider>
//           </ItemProvider>
//         </LocationProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

//change 3

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// // --- Providers (Contexts) ---
// // NOTE: Saare providers ko bina curly braces ke import karein (default import)
// import AuthProvider from './contexts/AuthContext';
// import ItemProvider from './contexts/ItemContext';
// import LocationProvider from './contexts/LocationContext';
// import SocketProvider from './contexts/SocketContext';

// // --- Toastify CSS (Notifications ke liye) ---
// import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// // React 18 mein <React.StrictMode> zaroori hai
// // BrowserRouter ko App ke andar rakha gaya hai, jo best practice hai
// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <LocationProvider>
//         <ItemProvider>
//           <SocketProvider>
//             <App />
//           </SocketProvider>
//         </ItemProvider>
//       </LocationProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );

//change 4

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Yahan import karein
import App from './App';
import './index.css';

// --- Saare Providers ---
import {AuthProvider} from './contexts/AuthContext';
import ItemProvider from './contexts/ItemContext';
import LocationProvider from './contexts/LocationContext';
import SocketProvider from './contexts/SocketContext';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- YAHAN WRAP KAREIN */}
      <AuthProvider>
        <LocationProvider>
          <ItemProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </ItemProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

