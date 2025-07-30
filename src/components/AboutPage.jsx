import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BrushIcon from '@mui/icons-material/Brush';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6 text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">About URL Shortener</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          Your simple and secure solution to shorten long URLs and track clicks – built for speed, reliability, and elegance.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🚀 Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Shorten long URLs with ease</li>
            <li>Track click analytics by date</li>
            <li>JWT-based secure access</li>
            <li>Role-based admin/user access</li>
            <li>Clean and responsive UI</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🛠 Tech Stack</h2>
          <div className="flex flex-wrap gap-4 text-gray-600 text-xl mt-2">
            <span className="flex items-center gap-2"><IntegrationInstructionsIcon className="text-sky-500" /> React</span>
            <span className="flex items-center gap-2"><BrushIcon className="text-cyan-500" /> Tailwind CSS</span>
            <span className="flex items-center gap-2"><CodeIcon className="text-green-600" /> Spring Boot</span>
            <span className="flex items-center gap-2"><StorageIcon className="text-blue-500" /> MySQL</span>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">👨‍💻 Developed by Kartik Kumar</h2>
        <p className="text-gray-600 mb-4">Passionate about full-stack development.</p>
        <div className="flex justify-center gap-6 text-2xl text-blue-600">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-black">
            <GitHubIcon fontSize="large" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
            <LinkedInIcon fontSize="large" />
          </a>
          <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
            <LanguageIcon fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
