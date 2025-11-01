import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

const ContactUsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-gray-600 leading-relaxed mb-12">
            We're here to help with any questions you may have.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-8">
            {/* Email Section */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                  <FiMail className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600 mt-1">For any queries, drop us an email.</p>
                <a href="mailto:nkmudafale192@gmail.com" className="text-teal-600 font-medium hover:underline break-all">
                  nkmudafale192@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                  <FiPhone className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Helpline Number</h3>
                <p className="text-gray-600 mt-1">Our support team is available 24/7.</p>
                <a href="tel:8103006948" className="text-teal-600 font-medium hover:underline">
                  +91 8103006948
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;