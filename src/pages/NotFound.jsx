import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full p-6">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="404 illustration"
            className="w-32 h-32"
          />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-500 mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
