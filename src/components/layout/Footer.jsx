


import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* RentSmart Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">RentSmart</h3>
            <p className="text-sm">Renting Made Easy. Your one-stop solution for all rental needs in Indore.</p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link to="/explore" className="hover:text-white">Products</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white text-2xl"><FaFacebook /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white text-2xl"><FaTwitter /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white text-2xl"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white text-2xl"><FaLinkedin /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RentSmart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;