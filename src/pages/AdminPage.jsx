// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';

// const AdminDashboardPage = () => {
//     const linkClasses = "block px-4 py-2 rounded-md text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors";
//     const activeLinkClasses = "bg-teal-500 text-white";

//     return (
//         <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
//             {/* --- Admin Sidebar --- */}
//             <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
//                 <div className="bg-white p-6 rounded-lg shadow-md h-full">
//                     <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
//                     <nav className="space-y-2">
//                         <NavLink 
//                             to="/admin" 
//                             end // 'end' prop zaroori hai taaki yeh sirf '/admin' par active ho
//                             className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
//                         >
//                             Dashboard
//                         </NavLink>
//                         <NavLink 
//                             to="/admin/users" 
//                             className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
//                         >
//                             Manage Users
//                         </NavLink>
//                         <NavLink 
//                             to="/admin/posts" 
//                             className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
//                         >
//                             Manage Posts
//                         </NavLink>
//                         {/* Yahaan aur links jod sakte hain */}
//                     </nav>
//                 </div>
//             </aside>

//             {/* --- Main Content Area --- */}
//             <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
//                 {/* Yahaan par nested routes (Dashboard stats, User list, etc.) render honge */}
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default AdminDashboardPage;


//**************** */

// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';

// // Yeh component Admin Panel ka main layout hai.
// // Isme ek sidebar hai aur ek content area jahan baaki ke admin pages (jaise User List) dikhenge.

// const AdminDashboardPage = () => {
//     // NavLink ke liye common styles
//     const linkStyle = "block px-4 py-2 rounded-md text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors font-medium";
//     const activeLinkStyle = "bg-teal-600 text-white";

//     return (
//         <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
//             {/* --- Admin Sidebar --- */}
//             <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
//                 <div className="bg-white p-6 rounded-lg shadow-md h-full sticky top-24">
//                     <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Menu</h2>
//                     <nav className="space-y-2">
//                         <NavLink 
//                             to="/admin/dashboard" 
//                             className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
//                         >
//                             Dashboard
//                         </NavLink>
//                         <NavLink 
//                             to="/admin/users" 
//                             className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
//                         >
//                             Manage Users
//                         </NavLink>
//                         <NavLink 
//                             to="/admin/posts" 
//                             className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
//                         >
//                             Manage Posts
//                         </NavLink>
//                         {/* Future me naye links yahan add honge, jaise "Manage Items" */}
//                     </nav>
//                 </div>
//             </aside>

//             {/* --- Main Content Area --- */}
//             <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
//                 {/* Nested routes (User list, etc.) yahan par <Outlet> ke andar render honge */}
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default AdminDashboardPage;


//************** */

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminPage = () => {
    // NavLink ke liye common styles
    const linkStyle = "block px-4 py-2 rounded-md text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors font-medium";
    const activeLinkStyle = "bg-teal-600 text-white";

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
            {/* --- Admin Sidebar --- */}
            <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                <div className="bg-white p-6 rounded-lg shadow-md h-full sticky top-24">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Menu</h2>
                    <nav className="space-y-2">
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            to="/admin/users" 
                            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                        >
                            Manage Users
                        </NavLink>
                        <NavLink 
                            to="/admin/kyc-requests" 
                            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                        >
                            KYC Verification
                        </NavLink>
                        <NavLink 
                            to="/admin/explorer" 
                            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                        >
                            Data Explorer
                        </NavLink>
                        <NavLink 
                            to="/admin/posts" 
                            className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                        >
                            Manage Posts
                        </NavLink>
                    </nav>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;
