import React from 'react';
import { Link } from 'react-router-dom';

// Step 1: Define the component as a constant or function without exporting it here.
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sorry, the page you are looking for does not exist, has been moved, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};

// Step 2: Export the component as the default at the end of the file.
export default NotFoundPage;