import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white text-center px-4">
      <ErrorOutline className="text-red-500" style={{ fontSize: 80 }} />
      <h1 className="text-5xl font-bold text-gray-800 mt-4">404</h1>
      <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
      <p className="text-md text-gray-500 mt-1 mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
