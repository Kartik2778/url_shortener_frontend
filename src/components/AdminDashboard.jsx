import React, { useEffect, useState } from 'react';
import API from '../api/API';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserIds, setExpandedUserIds] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get('/api/admin/all-users'); 
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserUrls = async (userId) => {
    if (expandedUserIds.includes(userId)) {
      setExpandedUserIds(expandedUserIds.filter(id => id !== userId));
    } else {
      // Fetch URLs only if not already fetched
      if (!users.find(u => u.id === userId).urls) {
        try {
          const response = await API.get(`/api/admin/user-all-urls/${userId}`);
          console.log(response.data);
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.id === userId ? { ...user, urls: response.data } : user
            )
          );
        } catch (error) {
          console.error('Error fetching user URLs:', error);
        }
      }
      setExpandedUserIds([...expandedUserIds, userId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Admin Dashboard</h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="space-y-6">
            {users.map(user => (
              <div key={user.id} className="bg-white shadow-md rounded-xl border border-gray-200 p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{user.username}</h2>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Role: {user.role}</p>
                  </div>
                  <button
                    onClick={() => toggleUserUrls(user.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition"
                  >
                    {expandedUserIds.includes(user.id) ? (
                      <>
                        Hide URLs <ExpandLess className="ml-1" />
                      </>
                    ) : (
                      <>
                        View URLs <ExpandMore className="ml-1" />
                      </>
                    )}
                  </button>
                </div>

                {expandedUserIds.includes(user.id) && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    {user.urls && user.urls.length > 0 ? (
                      user.urls.map(url => (
                        <div
                          key={url.shortUrl}
                          className="bg-gray-50 p-3 rounded-lg border flex justify-between items-center"
                        >
                          <div>
                            <p className="text-blue-600 font-semibold break-all">{url.originalUrl}</p>
                            <p className="text-sm text-gray-500 break-all">
                              Short URL:{' '}
                              <a
                                href={`http://localhost:8080/${url.shortUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-purple-600"
                              >
                                {url.shortUrl}
                              </a>
                            </p>
                          </div>
                          <p className="text-sm text-gray-400">Clicks: {url.clickCount}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No URLs created.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
