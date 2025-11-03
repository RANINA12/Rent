

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Yahan import karein
import App from './App';
import './index.css';

// --- Saare Providers ---
import { AuthProvider } from './contexts/AuthContext';
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

