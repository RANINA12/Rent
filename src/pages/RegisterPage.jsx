// import React from "react";
// import Navbar from "../components/layout/Navbar.jsx";

// export default function RegisterPage() {
//   return (
//     <div>

//       <div className="container mx-auto mt-10">
//         <h1 className="text-2xl font-bold mb-4 text-center">Register Page</h1>
//         {/* Yaha tum form banaoge */}
//         <form className="space-y-4 max-w-md mx-auto">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import axios from "axios";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/auth/register", formData);
//       setMessage("✅ Registered successfully!");
//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "❌ Registration failed.");
//     }
//   };

//   return (
//     <div>

//       <div className="container mx-auto mt-10">
//         <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
//         <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             className="w-full border p-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full border p-2 rounded"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             className="w-full border p-2 rounded"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full border p-2 rounded"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="w-full border p-2 rounded"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//           >
//             Register
//           </button>
//         </form>
//         {message && <p className="text-center mt-4 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// }


// final change

import React, { useState, useEffect } from "react";
import axios from "axios";

// [NEW] Concept: Furnish your space instantly - Naya SVG Animation
const FurnishingIllustration = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 lg:p-12">
      <style>
        {`
          @keyframes gentle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes item-appear {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .sofa-person { animation: gentle-float 6s ease-in-out infinite; }
          .plant { animation: item-appear 1s ease-out 0.5s forwards; opacity:0; }
          .lamp { animation: item-appear 1s ease-out 1s forwards; opacity:0; }
          .frame { animation: item-appear 1s ease-out 1.5s forwards; opacity:0; }
        `}
      </style>
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sofa and Person */}
        <g className="sofa-person" filter="url(#soft-shadow)">
          {/* Sofa */}
          <rect x="100" y="180" width="200" height="60" rx="10" fill="#0d9488"/>
          <path d="M90 190 H 100 V 240 H 90 Z" fill="#14b8a6" />
          <path d="M310 190 H 300 V 240 H 310 Z" fill="#14b8a6" />
          <path d="M100 160 C 100 140, 120 140, 120 160 V 180 H 280 V 160 C 280 140, 300 140, 300 160 Z" fill="#14b8a6" />
          {/* Person */}
          <circle cx="200" cy="145" r="20" fill="#fde68a" />
          <path d="M180 165 H 220 V 200 H 180 Z" fill="#475569" />
        </g>
        
        {/* Plant */}
        <g className="plant" filter="url(#soft-shadow)">
          <rect x="50" y="210" width="40" height="30" rx="5" fill="#a3a3a3"/>
          <circle cx="60" cy="195" r="15" fill="#22c55e" />
          <circle cx="80" cy="195" r="15" fill="#4ade80" />
          <circle cx="70" cy="180" r="12" fill="#86efac" />
        </g>

        {/* Lamp */}
        <g className="lamp" filter="url(#soft-shadow)">
          <path d="M290 120 L350 120 L335 150 L305 150 Z" fill="#f59e0b" />
          <rect x="317" y="150" width="6" height="80" fill="#d4d4d4" />
          <rect x="300" y="230" width="40" height="5" rx="2" fill="#d4d4d4" />
        </g>

        {/* Picture Frame */}
        <g className="frame" filter="url(#soft-shadow)">
          <rect x="180" y="50" width="70" height="50" rx="5" fill="#f1f5f9" />
          <rect x="185" y="55" width="60" height="40" fill="#e0f2f1" />
           <path d="M195 80 L205 70 L215 85 L225 75 L235 90" stroke="#0d9488" fill="none" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", city: "", password: "", confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }
    try {
      const payload = {
        name: formData.name, email: formData.email, phone: formData.phone,
        password: formData.password, address: { city: formData.city },
      };
      const { data } = await axios.post("/api/auth/register", payload);
      setMessage("✅ Registered successfully! Redirecting...");
      localStorage.setItem("token", data.token);
      setTimeout(() => { window.location.assign('/'); }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center lg:p-8">
      <div className={`w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        <div className="w-full lg:w-1/2 bg-teal-50 hidden lg:flex items-center justify-center">
          <FurnishingIllustration />
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-500">
              Join our community and start renting smart!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="phone" type="text" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="city" type="text" placeholder="City" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
            
            <div>
              <button type="submit" className="w-full mt-4 px-4 py-3 font-bold text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-105 duration-300">
                Create Account
              </button>
            </div>
          </form>

          {message && (
            <p className={`text-center mt-4 font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-bold text-teal-600 hover:underline">
              Login here
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RegisterPage;

