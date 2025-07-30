import React from 'react';
import { Link } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center text-gray-400">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Link className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-white">QuickLink</span>
        </div>
        <p>&copy; 2025 QuickLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;