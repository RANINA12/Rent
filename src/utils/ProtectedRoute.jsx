// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user, isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     // Agar user logged in nahi hai, to use login page par bhej do
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Agar route sirf admin ke liye hai aur user admin nahi hai
//   if (adminOnly && !user.isAdmin) {
//     // Use homepage par bhej do
//     return <Navigate to="/" replace />;
//   }

//   // Agar sab theek hai, to page ko dikhao
//   return children;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/common/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // AuthContext se user aur loading state lein
  const location = useLocation();

  // Agar context abhi bhi user data load kar raha hai, toh spinner dikhayein
  if (loading) {
    return <Spinner />;
  }

  // Agar loading poori ho chuki hai aur user nahi hai, toh login page par bhej dein
  if (!user) {
    // Redirect karte waqt, hum user ko bata rahe hain ki login ke baad kahan waapas aana hai
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar user hai, toh page (children) ko dikhayein
  return children;
};

export default ProtectedRoute;
