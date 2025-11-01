import React from 'react';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <div className="relative bg-gray-800 text-white">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
          alt="Community" 
          className="w-full h-80 object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold">About RentSmart</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">Making Life Easier, One Rental at a Time.</p>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your New Way of Living</h2>
            <p className="text-gray-600 leading-relaxed">
              RentSmart is more than just a rental platform; it's a community-driven marketplace built on trust and convenience. We started with a simple idea: to make high-quality goods accessible to everyone without the burden of ownership. Today, we're proud to be Indore's leading solution for hassle-free renting.
            </p>
          </div>

          {/* Mission, Vision, Values Section */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Our Mission */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <FiTarget className="mx-auto text-teal-500 h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">To provide a seamless and secure platform that connects item owners with renters, fostering a sustainable culture of sharing.</p>
            </div>
            {/* Our Vision */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <FiEye className="mx-auto text-teal-500 h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm">To be the most trusted and user-friendly rental ecosystem in every city, empowering individuals to live more with less.</p>
            </div>
            {/* Our Values */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <FiHeart className="mx-auto text-teal-500 h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Values</h3>
              <p className="text-gray-600 text-sm">Trust, Community, Sustainability, and Customer Delight are the pillars that guide every decision we make.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;