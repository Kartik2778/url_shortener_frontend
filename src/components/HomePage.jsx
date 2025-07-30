import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  Bolt, 
  Security, 
  BarChart, 
  ContentCopy, 
  Check, 
  ArrowForward, 
  Language, 
  Group, 
  TrendingUp 
} from '@mui/icons-material';
import API from '../api/API';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi/UserContext';

const HomePage = () => {
  const url = useRef('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const {userData} = useContext(UserContext);

  const handleShorten = async () => {
    if(userData == null) {
      navigate('/login');
      return;
    }
    try{
      const originalUrl = {
        "originalUrl" : url.current.value
      }
      const response = await getShortenUrl(originalUrl);
      setShortenedUrl(`http://localhost:8080/${response.data.shortUrl}`)
    }
    catch(error) {
      console.log("error",error);
    }
  };

  const getShortenUrl = async (originalUrl) => {
    return await API.post('api/urls/shorten',originalUrl);
  }


  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Shorten URLs
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Amplify Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform long, unwieldy links into powerful, trackable short URLs. 
              Perfect for social media, email campaigns, and beyond.
            </p>
          </div>

          {/* URL Shortener Widget */}
          <div className={`transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="url"
                  placeholder="Enter your long URL here..."
                  ref={url}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleShorten}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Bolt />
                  <span>Shorten</span>
                </button>
              </div>
              
              {shortenedUrl && (
                <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20 flex items-center justify-between animate-fadeIn">
                  <span className="text-purple-300 font-mono">{shortenedUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="ml-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {copied ? <Check className="text-green-400" /> : <ContentCopy />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10M+</div>
              <div className="text-gray-400">Links Shortened</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">500K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">QuickLink</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Packed with powerful features to supercharge your link management strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bolt,
                title: "Lightning Fast",
                description: "Generate shortened links in milliseconds with our optimized infrastructure"
              },
              {
                icon: BarChart,
                title: "Advanced Analytics",
                description: "Track clicks, geographic data, and user behavior with detailed insights"
              },
              {
                icon: Security,
                title: "Enterprise Security",
                description: "Bank-level security with SSL encryption and fraud protection"
              },
              {
                icon: Language,
                title: "Global CDN",
                description: "99.9% uptime with servers worldwide for instant redirects"
              },
              {
                icon: Group,
                title: "Team Collaboration",
                description: "Share and manage links across your team with role-based access"
              },
              {
                icon: TrendingUp,
                title: "Smart Optimization",
                description: "AI-powered link optimization for maximum engagement rates"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Links?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of businesses already using QuickLink to boost their digital presence
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;