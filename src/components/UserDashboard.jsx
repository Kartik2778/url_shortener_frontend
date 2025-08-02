import React, { useContext, useEffect, useState } from 'react';
import API from '../api/API';
import Graph from './Graph';
import { Delete, InsertChartOutlined } from '@mui/icons-material';
import testData from '../dummyData/data';
import { UserContext } from '../contextApi/UserContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [userUrls, setUserUrls] = useState([]);
  const [selectedAnalytics, setSelectedAnalytics] = useState(null);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) navigate('/');
  }, [userData, navigate]);

  const fetchUserUrls = async () => {
    try {
      const response = await API.get('/api/urls/all-shortenUrls');
      setUserUrls(response.data);
    } catch (error) {
      console.error('Error fetching user URLs:', error);
    }
  };

  const fetchAnalytics = (shortUrl) => {
    setSelectedAnalytics({
      data: testData,
      shortUrl,
    });

    // try {
    //   const today = new Date();
    //   const twoMonthsAgo = new Date();
    //   twoMonthsAgo.setMonth(today.getMonth() - 2);

    //   const response = await API.get(
    //     /api/urls/analytics?shortUrl=${shortUrl}&startDate=${twoMonthsAgo.toISOString()}&endDate=${today.toISOString()}
    //   );
    //   setSelectedAnalytics({ shortUrl, data: response.data });
    // } catch (error) {
    //   console.error('Error fetching analytics:', error);
    // }

  };

  const handleDelete = async (shortUrl) => {
    const confirm = window.confirm(`Are you sure you want to delete ${shortUrl}?`);
    if (!confirm) return;
    try {
      await API.delete(`/api/urls/delete/${shortUrl}`);
      fetchUserUrls();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  useEffect(() => {
    fetchUserUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Your Shortened URLs</h1>

        {userUrls.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You haven't created any short URLs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {userUrls.map((url) => (
              <div
                key={url.shortUrl}
                className="flex justify-between items-center bg-white shadow-md p-5 rounded-xl border border-gray-200"
              >
                <div className="flex flex-col max-w-[70%]">
                  <span className="text-lg font-semibold text-blue-600 break-words">
                    {url.originalUrl}
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    Short URL:{' '}
                    <a
                      href={`https://url-shortener-sb-ngxo.onrender.com/${url.shortUrl}`}
                      className="text-purple-600 underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0 mt-3 md:mt-0">
                  <button
                    onClick={() => fetchAnalytics(url.shortUrl)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition duration-200"
                  >
                    <InsertChartOutlined fontSize="small" className="mr-1" />
                    Analytics
                  </button>
                  <button
                    onClick={() => handleDelete(url.shortUrl)}
                    className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition duration-200"
                  >
                    <Delete fontSize="small" className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedAnalytics && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-700">
                Analytics for: <span className="text-purple-600">{selectedAnalytics.shortUrl}</span>
              </h2>
              <button
                onClick={() => setSelectedAnalytics(null)}
                className="text-sm text-gray-500 hover:text-red-500 transition"
              >
                Close
              </button>
            </div>
            <div className="h-[400px]">
              <Graph myUrlList={selectedAnalytics.data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
