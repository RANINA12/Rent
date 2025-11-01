// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// // children = the page wrapped inside ProtectedRoute
// const PrivateRoute = ({ children, adminOnly = false }) => {
//   const { isAuthenticated, user } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (adminOnly && user?.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;


//**************** */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Is component ka naam ProtectedRoute rakhna zyada standard hai,
// lekin hum abhi ke liye privateRoute hi rakhenge.

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    // Step 1: Check karo ki user logged-in hai ya nahi.
    // [FIX] 'isAuthenticated' ki jagah seedha 'user' object check kiya.
    if (!user) {
        // Agar user logged-in nahi hai, to use login page par bhej do.
        return <Navigate to="/login" replace />;
    }

    // Step 2: Agar yeh route sirf admin ke liye hai, to check karo ki user admin hai ya nahi.
    // [FIX] 'user.role' ki jagah 'user.isAdmin' check kiya.
    if (adminOnly && !user.isAdmin) {
        // Agar user admin nahi hai, to use homepage par bhej do.
        return <Navigate to="/" replace />;
    }

    // Step 3: Agar sab kuch theek hai, to page ko render hone do.
    return children;
};

export default PrivateRoute;